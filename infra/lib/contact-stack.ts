import {
  ArnFormat,
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  type StackProps,
} from "aws-cdk-lib";
import { AccessLogFormat } from "aws-cdk-lib/aws-apigateway";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
  HttpStage,
  LogGroupLogDestination,
} from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import path from "node:path";

export interface ContactStackProps extends StackProps {
  readonly sesFromAddress: string;
  readonly notificationEmail: string;
  readonly portfolioOrigin: string;
  readonly developmentOrigin: string;
}

function validateOrigin(origin: string, name: string): string {
  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    throw new Error(`${name} must be an absolute origin URL.`);
  }

  if (parsed.origin !== origin || !["http:", "https:"].includes(parsed.protocol)) {
    throw new Error(`${name} must contain only an http(s) origin without a path.`);
  }

  return origin;
}

export class ContactStack extends Stack {
  constructor(scope: Construct, id: string, props: ContactStackProps) {
    super(scope, id, props);

    if (!props.sesFromAddress.trim() || /[\r\n]/.test(props.sesFromAddress)) {
      throw new Error("sesFromAddress must be a non-empty, single-line verified SES identity.");
    }

    const portfolioOrigin = validateOrigin(props.portfolioOrigin, "portfolioOrigin");
    const developmentOrigin = validateOrigin(props.developmentOrigin, "developmentOrigin");

    const lambdaLogGroup = new LogGroup(this, "ContactLambdaLogs", {
      logGroupName: "/aws/lambda/myweb-contact-handler",
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.RETAIN,
    });
    const apiLogGroup = new LogGroup(this, "ContactApiAccessLogs", {
      logGroupName: "/aws/apigateway/myweb-contact-api",
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const role = new Role(this, "ContactLambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
    });

    role.addToPolicy(new PolicyStatement({
      actions: ["logs:CreateLogStream", "logs:PutLogEvents"],
      resources: [`${lambdaLogGroup.logGroupArn}:*`],
    }));

    const sesIdentityArn = this.formatArn({
      service: "ses",
      resource: "identity",
      resourceName: props.sesFromAddress,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
    });
    role.addToPolicy(new PolicyStatement({
      actions: ["ses:SendEmail"],
      resources: [sesIdentityArn],
    }));

    const contactFunction = new NodejsFunction(this, "ContactHandler", {
      entry: path.join(__dirname, "../lambda/contact.ts"),
      handler: "handler",
      runtime: Runtime.NODEJS_22_X,
      role,
      logGroup: lambdaLogGroup,
      memorySize: 256,
      timeout: Duration.seconds(10),
      environment: {
        SES_REGION: this.region,
        SES_FROM_ADDRESS: props.sesFromAddress,
        NOTIFICATION_EMAIL: props.notificationEmail,
      },
      bundling: {
        externalModules: [],
        minify: true,
        sourceMap: true,
        target: "node22",
      },
      projectRoot: path.join(__dirname, ".."),
      depsLockFilePath: path.join(__dirname, "../package-lock.json"),
    });

    const api = new HttpApi(this, "ContactApi", {
      apiName: "myweb-contact-api",
      description: "Phase 2 contact endpoint for the myWeb portfolio.",
      createDefaultStage: false,
      corsPreflight: {
        allowOrigins: [portfolioOrigin, developmentOrigin],
        allowMethods: [CorsHttpMethod.POST],
        allowHeaders: ["content-type"],
        maxAge: Duration.hours(1),
      },
    });

    api.addRoutes({
      path: "/contact",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration("ContactIntegration", contactFunction),
    });

    new HttpStage(this, "DefaultStage", {
      httpApi: api,
      stageName: "$default",
      autoDeploy: true,
      throttle: {
        rateLimit: 5,
        burstLimit: 10,
      },
      accessLogSettings: {
        destination: new LogGroupLogDestination(apiLogGroup),
        format: AccessLogFormat.custom(JSON.stringify({
          requestId: "$context.requestId",
          routeKey: "$context.routeKey",
          status: "$context.status",
        })),
      },
    });

    new CfnOutput(this, "ContactEndpoint", {
      description: "POST endpoint for the portfolio contact form.",
      value: `${api.apiEndpoint}/contact`,
    });
  }
}