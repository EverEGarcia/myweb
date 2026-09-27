import { App, assertions } from "aws-cdk-lib";
import { describe, expect, it } from "vitest";
import { ContactStack } from "../lib/contact-stack";

const { Match, Template } = assertions;

describe("ContactStack", () => {
  const template = Template.fromStack(new ContactStack(new App(), "TestContactStack", {
    sesFromAddress: "verified-sender@example.com",
    notificationEmail: "everesliga@gmail.com",
    portfolioOrigin: "https://everegarcia.github.io",
    developmentOrigin: "http://localhost:3000",
  }));

  it("defines a POST /contact HTTP API route", () => {
    template.hasResourceProperties("AWS::ApiGatewayV2::Route", {
      RouteKey: "POST /contact",
    });
  });

  it("restricts CORS to the portfolio and local development origins", () => {
    template.hasResourceProperties("AWS::ApiGatewayV2::Api", {
      CorsConfiguration: Match.objectLike({
        AllowOrigins: [
          "https://everegarcia.github.io",
          "http://localhost:3000",
        ],
        AllowMethods: ["POST"],
        AllowHeaders: ["content-type"],
      }),
    });
  });

  it("configures stage throttling and access logs", () => {
    template.hasResourceProperties("AWS::ApiGatewayV2::Stage", {
      DefaultRouteSettings: {
        ThrottlingBurstLimit: 10,
        ThrottlingRateLimit: 5,
      },
      AccessLogSettings: Match.objectLike({
        DestinationArn: Match.anyValue(),
        Format: Match.stringLikeRegexp("requestId"),
      }),
    });
  });

  it("limits SES permissions to the configured sender identity", () => {
    const policies = template.findResources("AWS::IAM::Policy");
    const statements = Object.values(policies).flatMap((policy) =>
      (policy.Properties.PolicyDocument.Statement as Array<Record<string, unknown>>)
    );
    const sesStatement = statements.find((statement) => statement.Action === "ses:SendEmail");

    expect(sesStatement).toBeDefined();
    expect(sesStatement?.Effect).toBe("Allow");
    const resourceArn = JSON.stringify(sesStatement?.Resource);
    expect(resourceArn).toContain(":identity/verified-sender@example.com");
    expect(resourceArn).not.toContain("*");
  });

  it("sets Lambda email configuration and API access log retention", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      Runtime: "nodejs22.x",
      Environment: {
        Variables: {
          SES_FROM_ADDRESS: "verified-sender@example.com",
          NOTIFICATION_EMAIL: "everesliga@gmail.com",
        },
      },
    });

    template.hasResourceProperties("AWS::Logs::LogGroup", {
      LogGroupName: "/aws/apigateway/myweb-contact-api",
      RetentionInDays: 30,
    });
  });
});