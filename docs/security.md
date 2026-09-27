# Security

## Validation

The contact flow uses a shared Zod schema defined in `lib/contactSchema.ts`.

Key protections:
- required field validation
- email format validation
- maximum length enforcement for name, email, subject, and message
- CR/LF stripping to reduce email header injection risk
- honeypot field acceptance and silent rejection in the handler
- duplicate-request cache to reduce abuse and repeated submissions

## Error handling

The handler returns sanitized user-facing messages and never exposes stack traces or internal schema details to visitors.

## Local and backend status

The API endpoint is unconfigured by default and no submissions are persisted. Unit tests use `MockEmailSender`. The SESv2 adapter is implemented but has not been deployed or tested against SES. Duplicate suppression is in-memory per Lambda execution environment, not a distributed limiter.

## Phase 2 backend controls

- API Gateway CORS allows only the exact portfolio and configured development origins; credentials and wildcard origins are disabled.
- The HTTP API stage has throttling. Access logs include request ID, route key, and status only, not request bodies, names, email addresses, or IP addresses.
- Lambda SES permission is scoped to the configured verified sender identity. CloudWatch write permissions are scoped to the pre-created Lambda log group.
- The SESv2 adapter sends UTF-8 plain-text content and rejects CR/LF in email header values. AWS credentials come from the Lambda execution role.

## Environment safety

`NEXT_PUBLIC_*` variables are browser-visible. The contact API URL is a public endpoint, not a secret. SES sender, notification recipient, and region settings remain server-side and never use the `NEXT_PUBLIC_` prefix. No static AWS credentials are required or configured.

## Important caution

Client-side validation and a local mock sender do not provide production security guarantees. A real production backend must still be implemented separately for email sending, request verification, and reliable anti-abuse controls.
