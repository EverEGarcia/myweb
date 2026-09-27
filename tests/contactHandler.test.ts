/**
 * Tests for the local Lambda contact handler.
 * Phase 1: Uses MockEmailSender — no real AWS/SES calls.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  contactHandler,
  MockEmailSender,
  clearDedupCache,
  type LambdaEvent,
} from "@/src/lambda/contactHandler";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeEvent(body: unknown): LambdaEvent {
  return { body: JSON.stringify(body) };
}

const validBody = {
  name: "Alice Smith",
  email: "alice@example.com",
  subject: "Test subject",
  message: "This is a valid test message with enough characters.",
};

// ─── Setup ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  clearDedupCache();
});

// ─── Valid submission ─────────────────────────────────────────────────────────

describe("contactHandler — valid submission", () => {
  it("returns 200 for a valid submission", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent(validBody), sender);
    expect(res.statusCode).toBe(200);
  });

  it("calls email service exactly once for a valid submission", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails).toHaveLength(1);
  });

  it("includes portfolio source in notification email body", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails[0].textBody).toContain("Portfolio Website");
  });

  it("does NOT include visitor email in the From field", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails[0].fromAddress).not.toBe(validBody.email);
  });

  it("sets visitor email as Reply-To, not From", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails[0].replyTo).toBe(validBody.email);
  });

  it("prefixes subject with [Portfolio Contact]", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails[0].subject).toMatch(/^\[Portfolio Contact\]/);
  });

  it("response body contains success: true", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent(validBody), sender);
    const body = JSON.parse(res.body) as { success: boolean };
    expect(body.success).toBe(true);
  });

  it("response includes Content-Type header", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent(validBody), sender);
    expect(res.headers["Content-Type"]).toBe("application/json");
  });
});

// ─── Missing body ─────────────────────────────────────────────────────────────

describe("contactHandler — missing body", () => {
  it("returns 400 when body is null", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler({ body: null }, sender);
    expect(res.statusCode).toBe(400);
  });

  it("does not call email service when body is null", async () => {
    const sender = new MockEmailSender();
    await contactHandler({ body: null }, sender);
    expect(sender.sentEmails).toHaveLength(0);
  });
});

// ─── Malformed JSON ───────────────────────────────────────────────────────────

describe("contactHandler — malformed JSON", () => {
  it("returns 400 for non-JSON string body", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler({ body: "not json at all" }, sender);
    expect(res.statusCode).toBe(400);
  });

  it("returns 400 for truncated JSON", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler({ body: '{"name": "Alice"' }, sender);
    expect(res.statusCode).toBe(400);
  });

  it("does not expose parse error details in response", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler({ body: "{{bad}}" }, sender);
    const body = JSON.parse(res.body) as { userMessage?: string };
    expect(body.userMessage).not.toMatch(/SyntaxError/i);
    expect(body.userMessage).not.toMatch(/JSON\.parse/i);
  });
});

// ─── Invalid fields ───────────────────────────────────────────────────────────

describe("contactHandler — validation failures", () => {
  it("returns 422 for missing name", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, name: "" }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for invalid email format", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, email: "not-an-email" }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for missing subject", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, subject: "" }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for message too short", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, message: "Hi" }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for name exceeding 100 characters", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, name: "N".repeat(101) }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for subject exceeding 200 characters", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, subject: "S".repeat(201) }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("returns 422 for message exceeding 2000 characters", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, message: "M".repeat(2001) }), sender);
    expect(res.statusCode).toBe(422);
  });

  it("does not call email service on validation failure", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent({ ...validBody, email: "bad" }), sender);
    expect(sender.sentEmails).toHaveLength(0);
  });

  it("does not expose internal field names or paths in error", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, name: "" }), sender);
    const body = JSON.parse(res.body) as { userMessage: string };
    // Should not contain TypeScript property paths or schema internals
    expect(body.userMessage).not.toMatch(/ZodError/i);
  });
});

// ─── Oversized body ───────────────────────────────────────────────────────────

describe("contactHandler — body size limit", () => {
  it("returns 413 for body exceeding 10 KB", async () => {
    const sender = new MockEmailSender();
    const bigBody = "x".repeat(10_241);
    const res = await contactHandler({ body: bigBody }, sender);
    expect(res.statusCode).toBe(413);
  });
});

// ─── Honeypot ─────────────────────────────────────────────────────────────────
// The schema accepts any _hp value; the HANDLER does the silent discard.
// This means bots receive a normal 200 success response — no hint of detection.

describe("contactHandler — honeypot", () => {
  it("returns 200 when honeypot is filled (silent discard, not a 422)", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(
      makeEvent({ ...validBody, _hp: "bot-was-here" }),
      sender
    );
    expect(res.statusCode).toBe(200);
  });

  it("does NOT send email when honeypot is filled", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent({ ...validBody, _hp: "bot-was-here" }), sender);
    expect(sender.sentEmails).toHaveLength(0);
  });

  it("response body has success: true when honeypot filled (no detection leak)", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(
      makeEvent({ ...validBody, _hp: "filled" }),
      sender
    );
    const body = JSON.parse(res.body) as { success: boolean };
    expect(body.success).toBe(true);
  });
});

// ─── Duplicate submission ─────────────────────────────────────────────────────

describe("contactHandler — duplicate submission guard", () => {
  it("returns 200 for a duplicate within 60s window (silent accept)", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    const res = await contactHandler(makeEvent(validBody), sender);
    expect(res.statusCode).toBe(200);
  });

  it("sends email only once for duplicate within window", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    await contactHandler(makeEvent(validBody), sender);
    expect(sender.sentEmails).toHaveLength(1);
  });

  it("deduplicates concurrent submissions before sending", async () => {
    const sender = new MockEmailSender();
    let releaseSend: (() => void) | undefined;
    sender.send = async (params) => {
      sender.sentEmails.push(params);
      await new Promise<void>((resolve) => {
        releaseSend = resolve;
      });
    };

    const firstSubmission = contactHandler(makeEvent(validBody), sender);
    const secondResponse = await contactHandler(makeEvent(validBody), sender);

    expect(secondResponse.statusCode).toBe(200);
    expect(sender.sentEmails).toHaveLength(1);
    releaseSend?.();
    expect((await firstSubmission).statusCode).toBe(200);
  });

  it("allows a retry when the email service fails", async () => {
    const sender = new MockEmailSender();
    sender.send = async () => {
      throw new Error("temporary failure");
    };

    const failedResponse = await contactHandler(makeEvent(validBody), sender);
    sender.send = async (params) => {
      sender.sentEmails.push(params);
    };
    const retryResponse = await contactHandler(makeEvent(validBody), sender);

    expect(failedResponse.statusCode).toBe(502);
    expect(retryResponse.statusCode).toBe(200);
    expect(sender.sentEmails).toHaveLength(1);
  });

  it("sends email for a different email+subject combination", async () => {
    const sender = new MockEmailSender();
    await contactHandler(makeEvent(validBody), sender);
    await contactHandler(
      makeEvent({ ...validBody, email: "bob@example.com" }),
      sender
    );
    expect(sender.sentEmails).toHaveLength(2);
  });
});

// ─── Error sanitisation ───────────────────────────────────────────────────────

describe("contactHandler — error sanitisation", () => {
  it("never exposes stack traces in error responses", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler({ body: "bad json" }, sender);
    expect(res.body).not.toMatch(/at Object\./);
    expect(res.body).not.toMatch(/node_modules/);
  });

  it("returns sanitised 502 when email service throws", async () => {
    const failingSender: MockEmailSender = new MockEmailSender();
    // Override send to simulate an SES failure
    failingSender.send = async () => {
      throw new Error("SES InternalServerError: upstream timeout");
    };
    const res = await contactHandler(makeEvent(validBody), failingSender);
    expect(res.statusCode).toBe(502);
    // Must not leak the internal SES error message
    expect(res.body).not.toContain("SES InternalServerError");
    expect(res.body).not.toContain("upstream timeout");
  });

  it("502 response body does not contain stack trace", async () => {
    const failingSender: MockEmailSender = new MockEmailSender();
    failingSender.send = async () => {
      throw new Error("Internal failure");
    };
    const res = await contactHandler(makeEvent(validBody), failingSender);
    expect(res.body).not.toMatch(/Error:/);
    expect(res.body).not.toMatch(/at \w/);
  });

  it("422 response has success: false", async () => {
    const sender = new MockEmailSender();
    const res = await contactHandler(makeEvent({ ...validBody, email: "bad" }), sender);
    const body = JSON.parse(res.body) as { success: boolean };
    expect(body.success).toBe(false);
  });
});

// ─── Header injection ─────────────────────────────────────────────────────────
// The schema strips \r\n characters from name and subject.
// This prevents CRLF injection into email HEADERS (From, Subject, To).
// The sanitised text may still appear in the plain-text body, which is safe
// because the body is not parsed as headers.

describe("contactHandler — header injection", () => {
  it("name with \\r\\n reaches email service without CR/LF characters", async () => {
    const sender = new MockEmailSender();
    await contactHandler(
      makeEvent({ ...validBody, name: "Alice\r\nBcc: attacker@evil.com" }),
      sender
    );
    expect(sender.sentEmails).toHaveLength(1);
    const body = sender.sentEmails[0].textBody;
    expect(body).toContain("Name:      AliceBcc: attacker@evil.com");
    expect(body).not.toMatch(/\r\n.*Bcc:/);
    expect(sender.sentEmails[0].subject).not.toMatch(/[\r\n]/);
  });

  it("subject with \\n is stripped of LF — subject line has no newlines", async () => {
    const sender = new MockEmailSender();
    await contactHandler(
      makeEvent({ ...validBody, subject: "Hello\nX-Header: injected" }),
      sender
    );
    expect(sender.sentEmails).toHaveLength(1);
    expect(sender.sentEmails[0].subject).toBe("[Portfolio Contact] HelloX-Header: injected");
    expect(sender.sentEmails[0].subject).not.toMatch(/[\r\n]/);
  });
});
