import {
  contactHandler,
  type LambdaEvent,
} from "../../src/lambda/contactHandler";
import { SesEmailSender } from "./ses-email-sender";

interface ApiGatewayHttpApiEvent {
  body?: string | null;
  isBase64Encoded?: boolean;
}

const emailSender = new SesEmailSender();

export async function handler(event: ApiGatewayHttpApiEvent) {
  let body: LambdaEvent["body"] = event.body ?? null;
  if (body && event.isBase64Encoded) {
    body = Buffer.from(body, "base64").toString("utf8");
  }

  return contactHandler({ body }, emailSender);
}