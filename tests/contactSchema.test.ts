/**
 * Tests for the shared Zod contact validation schema.
 */

import { describe, it, expect } from "vitest";
import { contactSchema, validateContactInput } from "@/lib/contactSchema";
import { ZodError } from "zod";

const validInput = {
  name: "Alice Smith",
  email: "alice@example.com",
  subject: "Hello there",
  message: "This is a test message with enough characters.",
};

// ─── Valid input ──────────────────────────────────────────────────────────────

describe("contactSchema — valid input", () => {
  it("accepts a well-formed submission", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("normalises email to lowercase", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "ALICE@EXAMPLE.COM" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("alice@example.com");
  });

  it("accepts _hp when empty string (real user)", () => {
    const result = contactSchema.safeParse({ ...validInput, _hp: "" });
    expect(result.success).toBe(true);
  });

  it("accepts _hp when absent", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("accepts _hp with any value (handler does silent discard, not schema)", () => {
    // Schema accepts any _hp value — the handler checks it and silently discards
    // bot submissions without revealing honeypot detection via a 422 error.
    const result = contactSchema.safeParse({ ...validInput, _hp: "bot-value" });
    expect(result.success).toBe(true);
  });

  it("strips leading/trailing whitespace from name", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "  Alice  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Alice");
  });

  it("rejects a name that becomes empty after normalization", () => {
    for (const name of ["   ", "\n\n", "\r\n"]) {
      expect(contactSchema.safeParse({ ...validInput, name }).success).toBe(false);
    }
  });

  it("rejects a subject that becomes empty after normalization", () => {
    for (const subject of ["   ", "\n\n", "\r\n"]) {
      expect(contactSchema.safeParse({ ...validInput, subject }).success).toBe(false);
    }
  });

  it("rejects a message shorter than ten characters after trimming", () => {
    for (const message of ["   ", "\n\n", "\r\n", "          short  "]) {
      expect(contactSchema.safeParse({ ...validInput, message }).success).toBe(false);
    }
  });
});

// ─── Missing required fields ──────────────────────────────────────────────────

describe("contactSchema — missing required fields", () => {
  it("rejects missing name", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing subject", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing message", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "" });
    expect(result.success).toBe(false);
  });
});

// ─── Email validation ─────────────────────────────────────────────────────────

describe("contactSchema — email validation", () => {
  it("rejects plaintext non-email", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "notanemail" });
    expect(result.success).toBe(false);
  });

  it("rejects email missing domain", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "user@" });
    expect(result.success).toBe(false);
  });

  it("rejects email missing @", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "userexample.com" });
    expect(result.success).toBe(false);
  });

  it("rejects email with spaces", () => {
    const result = contactSchema.safeParse({ ...validInput, email: "user @example.com" });
    expect(result.success).toBe(false);
  });
});

// ─── Field length limits ──────────────────────────────────────────────────────

describe("contactSchema — max length enforcement", () => {
  it("rejects name > 100 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "A".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts name exactly 100 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, name: "A".repeat(100) });
    expect(result.success).toBe(true);
  });

  it("rejects email > 254 characters", () => {
    // Build an email that is exactly 255 characters:
    // local-part = 248 chars, @ = 1, domain = "x.com" = 5 → total 254 + 1 extra char in local
    // Simplest: "a" * 249 + "@x.com" = 255 chars
    const longEmail = "a".repeat(249) + "@x.com";
    expect(longEmail.length).toBe(255);
    const result = contactSchema.safeParse({ ...validInput, email: longEmail });
    expect(result.success).toBe(false);
  });

  it("rejects subject > 200 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "S".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("accepts subject exactly 200 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, subject: "S".repeat(200) });
    expect(result.success).toBe(true);
  });

  it("rejects message > 2000 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "M".repeat(2001) });
    expect(result.success).toBe(false);
  });

  it("accepts message exactly 2000 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "M".repeat(2000) });
    expect(result.success).toBe(true);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({ ...validInput, message: "Hi" });
    expect(result.success).toBe(false);
  });
});

// ─── Header injection prevention ─────────────────────────────────────────────

describe("contactSchema — header injection prevention", () => {
  it("strips \\r\\n from name — result does not contain CR/LF characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "Alice\r\nBcc: attacker@evil.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      // The CR and LF characters themselves are removed; text is on one line
      expect(result.data.name).not.toMatch(/\r/);
      expect(result.data.name).not.toMatch(/\n/);
    }
  });

  it("strips \\n from subject — result does not contain LF characters", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "Hello\nX-Injected: header",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.subject).not.toMatch(/\n/);
    }
  });

  it("name transform produces a single-line string when injection attempted", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "Alice\r\nBcc: evil@example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      // After stripping CR/LF, the result is one line (no newline-separated headers)
      const lines = result.data.name.split("\n");
      expect(lines).toHaveLength(1);
    }
  });
});

// ─── validateContactInput helper ─────────────────────────────────────────────

describe("validateContactInput", () => {
  it("throws ZodError for invalid input", () => {
    expect(() => validateContactInput({ name: "", email: "bad" })).toThrow(ZodError);
  });

  it("returns parsed data for valid input", () => {
    const result = validateContactInput(validInput);
    expect(result.name).toBe(validInput.name);
    expect(result.email).toBe(validInput.email);
  });
});
