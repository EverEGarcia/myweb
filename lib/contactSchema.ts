import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Contact form validation schema — shared by frontend and Lambda handler.
//
// Security notes:
//   - Max lengths prevent oversized payloads.
//   - Email validated by Zod's built-in email check (RFC 5321).
//   - _hp is the honeypot field. The schema accepts any string value so the
//     handler can silently discard bot submissions without revealing detection
//     via a validation error. The handler checks _hp AFTER schema validation.
//   - Newlines in name/subject/email are stripped to prevent header injection.
//   - No HTML accepted — all fields are plain text strings.
// ─────────────────────────────────────────────────────────────────────────────

/** Strip characters that would enable email header injection */
function stripHeaderInjection(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

export const contactSchema = z.object({
  name: z
    .string()
    .transform(stripHeaderInjection)
    .pipe(
      z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be 100 characters or fewer")
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email must be 254 characters or fewer")
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase().trim()),

  subject: z
    .string()
    .transform(stripHeaderInjection)
    .pipe(
      z
        .string()
        .min(1, "Subject is required")
        .max(200, "Subject must be 200 characters or fewer")
    ),

  message: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must be 2000 characters or fewer")
    ),

  // Honeypot field — accept any string value (including non-empty).
  // The HANDLER checks this value and silently discards bot submissions.
  // If the schema rejected non-empty _hp, the bot would receive a 422 error
  // that reveals the honeypot's existence. Silent 200 is the correct behaviour.
  _hp: z.string().optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;

/** Validate and return typed result. Throws ZodError on failure. */
export function validateContactInput(raw: unknown): ContactSchema {
  return contactSchema.parse(raw);
}
