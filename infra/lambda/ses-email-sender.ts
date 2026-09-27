import {
  SESv2Client,
  SendEmailCommand,
  type SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";
import type {
  EmailServiceInterface,
  SendEmailParams,
} from "../../src/lambda/contactHandler";

export interface SesEmailTransport {
  sendEmail(input: SendEmailCommandInput): Promise<void>;
}

class AwsSesEmailTransport implements SesEmailTransport {
  private readonly client = new SESv2Client({
    region: process.env.SES_REGION ?? "us-east-1",
  });

  async sendEmail(input: SendEmailCommandInput): Promise<void> {
    await this.client.send(new SendEmailCommand(input));
  }
}

function assertSingleLineHeader(value: string, field: string): void {
  if (/[\r\n]/.test(value)) {
    throw new Error(`Invalid ${field} email header value.`);
  }
}

export class SesEmailSender implements EmailServiceInterface {
  constructor(private readonly transport: SesEmailTransport = new AwsSesEmailTransport()) {}

  async send(params: SendEmailParams): Promise<void> {
    assertSingleLineHeader(params.toAddress, "recipient");
    assertSingleLineHeader(params.fromAddress, "sender");
    assertSingleLineHeader(params.replyTo, "reply-to");
    assertSingleLineHeader(params.subject, "subject");

    await this.transport.sendEmail({
      FromEmailAddress: params.fromAddress,
      Destination: {
        ToAddresses: [params.toAddress],
      },
      ReplyToAddresses: [params.replyTo],
      Content: {
        Simple: {
          Subject: {
            Data: params.subject,
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Data: params.textBody,
              Charset: "UTF-8",
            },
          },
        },
      },
    });
  }
}