import { describe, expect, it, vi } from "vitest";
import { SesEmailSender } from "../infra/lambda/ses-email-sender";
import type { SendEmailParams } from "../src/lambda/contactHandler";

const params: SendEmailParams = {
  toAddress: "everesliga@gmail.com",
  fromAddress: "verified@example.com",
  replyTo: "sender@example.com",
  subject: "[Portfolio Contact] Hello",
  textBody: "Name: Alice\nEmail: sender@example.com\nMessage:\nHello",
};

describe("SesEmailSender", () => {
  it("sends a plain-text SESv2 message with the configured addresses", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const sender = new SesEmailSender({ sendEmail });

    await sender.send(params);

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail).toHaveBeenCalledWith({
      FromEmailAddress: params.fromAddress,
      Destination: { ToAddresses: [params.toAddress] },
      ReplyToAddresses: [params.replyTo],
      Content: {
        Simple: {
          Subject: { Data: params.subject, Charset: "UTF-8" },
          Body: { Text: { Data: params.textBody, Charset: "UTF-8" } },
        },
      },
    });
  });

  it("propagates SES failures for the handler to sanitize", async () => {
    const sendEmail = vi.fn().mockRejectedValue(new Error("SES private failure"));
    const sender = new SesEmailSender({ sendEmail });

    await expect(sender.send(params)).rejects.toThrow("SES private failure");
  });

  it("rejects CR/LF in email headers before calling SES", async () => {
    const sendEmail = vi.fn().mockResolvedValue(undefined);
    const sender = new SesEmailSender({ sendEmail });

    await expect(sender.send({ ...params, subject: "Hello\r\nBcc: bad@example.com" }))
      .rejects.toThrow("Invalid subject email header value.");
    expect(sendEmail).not.toHaveBeenCalled();
  });
});