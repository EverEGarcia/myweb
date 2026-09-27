import { App } from "aws-cdk-lib";
import { ContactStack } from "../lib/contact-stack";

const sesFromAddress = process.env.SES_FROM_ADDRESS;
if (!sesFromAddress) {
  throw new Error("SES_FROM_ADDRESS must be set to a verified SES sender identity.");
}

const app = new App();

new ContactStack(app, "MyWebContactStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.SES_REGION ?? process.env.CDK_DEFAULT_REGION ?? "us-east-1",
  },
  sesFromAddress,
  notificationEmail: process.env.NOTIFICATION_EMAIL ?? "everesliga@gmail.com",
  portfolioOrigin: process.env.PORTFOLIO_ORIGIN ?? "https://everegarcia.github.io",
  developmentOrigin: process.env.DEVELOPMENT_ORIGIN ?? "http://localhost:3000",
});