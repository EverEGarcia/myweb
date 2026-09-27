/**
 * myWeb Portfolio — Contact Form Lambda Handler
 * Phase 1: Local implementation — no AWS SDK, no SES, no database.
 *
 * Architecture:
 *   Request → parseBody → validateInput (Zod) → honeyPotCheck
 *           → duplicateCheck → emailService.send → successResponse
 *
 * The EmailServiceInterface abstraction allows swapping MockEmailSender
 * (Phase 1) for SesEmailSender (future Phase 2) without changing handler logic.
 *
 * Security controls implemented:
 *   - Server-side Zod validation (schema shared with frontend)
 *   - Email header injection prevention (handled by schema transforms)
 *   - Honeypot field check
 *   - In-memory duplicate submission guard (best-effort; NOT reliable across
 *     multiple Lambda instances — documented limitation)
 *   - No PII logged
 *   - Sanitized error responses (no stack traces, no internal details)
 *   - Request body size guard (10 KB)
 */

import { contactSchema } from "../../lib/contactSchema";
import { ZodError } from "zod";

// ─── Types ────────────────────────────────────────────────────────────────────

/** Minimal API Gateway / local HTTP event shape */
export interface LambdaEvent {
  body: string | null;
  headers?: Record<string, string | undefined>;
  httpMethod?: string;
}

export interface LambdaResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

export interface SendEmailParams {
  toAddress: string;
  fromAddress: string;
  replyTo: string;
  subject: string;
  textBody: string;
}

/** Abstraction layer — swap implementations without changing handler */
export interface EmailServiceInterface {
  send(params: SendEmailParams): Promise<void>;
}

// ─── Mock email sender (Phase 1) ──────────────────────────────────────────────

export class MockEmailSender implements EmailServiceInterface {
  public readonly sentEmails: SendEmailParams[] = [];

  async send(params: SendEmailParams): Promise<void> {
    // Phase 1: record in memory for test assertions. Never log PII.
    this.sentEmails.push(params);
    // In a real environment this would call SES. Log only non-PII metadata.
    console.log("[MockEmailSender] Email queued (Phase 1 — no real delivery)");
  }
}

// ─── In-memory duplicate submission guard ────────────────────────────────────
// DOCUMENTED LIMITATION: This guard operates within a single Lambda execution
// context. It provides NO protection across:
//   - Multiple concurrent Lambda instances
//   - Lambda warm start restarts
//   - Distributed deployments
//
// It is a best-effort local optimisation only.
// A DynamoDB TTL-based deduplication can replace this in a future phase.

const DEDUP_WINDOW_MS = 60_000; // 60 seconds

interface DedupEntry {
  timestamp: number;
}

const dedupCache = new Map<string, DedupEntry>();

function buildDedupKey(email: string, subject: string): string {
  // Use email + subject as the key — avoids storing message content
  return `${email.toLowerCase()}::${subject.toLowerCase()}`;
}

function isDuplicate(key: string): boolean {
  const entry = dedupCache.get(key);
  if (!entry) return false;
  const age = Date.now() - entry.timestamp;
  if (age > DEDUP_WINDOW_MS) {
    dedupCache.delete(key);
    return false;
  }
  return true;
}

function recordSubmission(key: string): void {
  dedupCache.set(key, { timestamp: Date.now() });
}

function forgetSubmission(key: string): void {
  dedupCache.delete(key);
}

/** Exposed for testing — clears the dedup cache */
export function clearDedupCache(): void {
  dedupCache.clear();
}

// ─── Response helpers ─────────────────────────────────────────────────────────

const CORS_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
};

function successResponse(): LambdaResponse {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      message: "Your message has been received. I will get back to you soon.",
    }),
  };
}

function errorResponse(statusCode: number, userMessage: string): LambdaResponse {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: false,
      userMessage,
    }),
  };
}

/** Build sanitised validation error messages — no internal paths/schemas */
function buildValidationMessage(err: ZodError): string {
  const fields = err.errors.map((e) => e.message).join("; ");
  return `Validation failed: ${fields}`;
}

// ─── Main handler ─────────────────────────────────────────────────────────────

const MAX_BODY_BYTES = 10_240; // 10 KB

const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ?? "everesliga@gmail.com";
const FROM_ADDRESS =
  process.env.SES_FROM_ADDRESS ?? "everesliga@gmail.com";

export async function contactHandler(
  event: LambdaEvent,
  emailService: EmailServiceInterface
): Promise<LambdaResponse> {
  // 1. Reject missing body
  if (!event.body) {
    return errorResponse(400, "Request body is required.");
  }

  // 2. Body size guard
  if (Buffer.byteLength(event.body, "utf8") > MAX_BODY_BYTES) {
    return errorResponse(413, "Request body is too large.");
  }

  // 3. Parse JSON safely
  let raw: unknown;
  try {
    raw = JSON.parse(event.body);
  } catch {
    return errorResponse(400, "Invalid JSON. Please check your request.");
  }

  // 4. Validate with shared Zod schema
  let validated;
  try {
    validated = contactSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(422, buildValidationMessage(err));
    }
    // Unexpected — return generic error without exposing internals
    return errorResponse(500, "An unexpected error occurred. Please try again.");
  }

  // 5. Honeypot check — if filled, silently accept (do not reveal detection)
  if (validated._hp && validated._hp.length > 0) {
    return successResponse();
  }

  // 6. Duplicate submission check
  const dedupKey = buildDedupKey(validated.email, validated.subject);
  if (isDuplicate(dedupKey)) {
    // Return success to avoid leaking rate-limit information
    return successResponse();
  }

  // 7. Send email notification
  // NEVER include raw user content in email headers.
  // Visitor email goes to Reply-To only — not From or Cc.
  const emailText = [
    "New contact form submission from your portfolio website.",
    "",
    `Name:      ${validated.name}`,
    `Email:     ${validated.email}`,
    `Subject:   ${validated.subject}`,
    "",
    "Message:",
    validated.message,
    "",
    `Timestamp: ${new Date().toISOString()}`,
    `Source:    Portfolio Website`,
  ].join("\n");

  // Reserve the key before awaiting SES so concurrent requests in this
  // execution environment cannot both send the same submission.
  recordSubmission(dedupKey);

  try {
    await emailService.send({
      toAddress: NOTIFICATION_EMAIL,
      fromAddress: FROM_ADDRESS,
      replyTo: validated.email,
      subject: `[Portfolio Contact] ${validated.subject}`,
      textBody: emailText,
    });
  } catch {
    forgetSubmission(dedupKey);
    // Log internally without PII; return generic error to caller
    console.error("[contactHandler] Email service error (no details exposed)");
    return errorResponse(
      502,
      "Unable to send your message right now. Please try emailing directly."
    );
  }

  return successResponse();
}
