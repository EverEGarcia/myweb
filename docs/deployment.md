# Deployment

## Verification workflow

The project is validated with the following commands in order:

1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`

These checks verify linting, TypeScript correctness, test health, and static export generation.

## Static export

The app is configured for static export and writes to the `out/` directory.
The GitHub Actions workflow builds the repository project site using `NEXT_PUBLIC_BASE_PATH=/myweb`, so its expected URL is `https://everegarcia.github.io/myweb/`. Local development leaves the base path unset. The URL is not considered live until verified after Pages is enabled for the repository.

## Current Phase 2 status

The CDK stack, HTTP API route, Lambda wrapper, SESv2 adapter, tests, and documentation are implemented. They have not been deployed, and SES email delivery has not been tested.

## Local infrastructure validation

Install isolated infrastructure dependencies with `npm install --prefix infra`. Set `SES_FROM_ADDRESS` to a verified SES identity, then run:

```bash
npm run infra:build
npm run infra:synth
```

These commands typecheck and synthesize locally; they do not provision AWS resources. Set `PORTFOLIO_ORIGIN` and `DEVELOPMENT_ORIGIN` to exact origins. Defaults are `https://everegarcia.github.io` and `http://localhost:3000`.

## Future deployment procedure

1. Select the AWS account and `SES_REGION`, and manually verify `everesliga@gmail.com` as the SES sender identity. Request SES production access if required for delivery to unverified recipients. Sender verification has not been performed by the agent.
2. Configure `SES_FROM_ADDRESS`, `NOTIFICATION_EMAIL`, `SES_REGION`, `PORTFOLIO_ORIGIN`, and `DEVELOPMENT_ORIGIN`. Use the AWS credential chain; do not add static keys.
3. From `infra/`, run `npx cdk synth` and inspect the template, then run `npx cdk diff` before `npx cdk deploy`.
4. Use the `ContactEndpoint` stack output for `NEXT_PUBLIC_CONTACT_API_URL`, then rebuild and publish the static `out/` directory.

The endpoint has throttling, exact-origin CORS, minimal access logs, sender-identity-scoped SES permission, and no database. Rollback requires restoring the prior CDK revision and rebuilding the frontend with its matching API endpoint. No deployment steps have been executed.

## Development console note

Some browser extensions may inject attributes such as `bis_skin_checked` into nested elements before React hydrates. The root HTML and body retain hydration warning suppression, but nested extension-injected attributes can still produce development-only warnings. Verify suspected application hydration issues with extensions disabled; no additional nested suppression is applied.
