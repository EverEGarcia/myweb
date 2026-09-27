# Architecture

## Current Implementation

This project is a Next.js App Router portfolio built with React and TypeScript. The app uses a data-driven architecture where content is stored in the `data/` folder and rendered by reusable UI components in `components/`.

### Frontend stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod for validation
- React Hook Form for the contact form

### High-level flow
1. The homepage in `app/page.tsx` composes the portfolio sections.
2. Section components such as Hero, About, Skills, Projects, Experience, Education, Languages, Credentials, and Contact read data from `data/*.ts`.
3. Contact form input is validated with the shared schema in `lib/contactSchema.ts`.
4. When `NEXT_PUBLIC_CONTACT_API_URL` is configured, the browser posts required contact fields to that endpoint; the variable is empty by default.
5. The shared handler in `src/lambda/contactHandler.ts` validates input, checks the honeypot and in-memory duplicate guard, and returns sanitized responses.
6. `MockEmailSender` is used in local tests. The production Lambda wrapper uses `SesEmailSender` from `infra/lambda/`.

## Phase 2 implementation (not deployed)

The isolated CDK app in `infra/` defines an API Gateway HTTP API, `POST /contact` route, Node.js Lambda, CloudWatch log groups, and SES sender role permission. API CORS is restricted to the configured portfolio and development origins. The default stage uses throttling; access logs omit request bodies and contact data.

- `EmailServiceInterface`
- `MockEmailSender`
- `SesEmailSender`

Submissions are not persisted. Deduplication is in-memory per Lambda execution environment and best-effort, not distributed protection. SES sender verification and production access may be required before real delivery works.

## Architecture

Visitor → GitHub Pages → Static Next.js Portfolio → API Gateway HTTP API → Lambda → EmailServiceInterface → Amazon SES → everesliga@gmail.com

This is the target architecture. Its infrastructure and backend source are implemented, but no AWS resources are deployed and SES delivery has not been tested.

## Static export status

The app is configured for static export using `output: "export"` in `next.config.ts`, which is compatible with GitHub Pages hosting and other static hosting targets.
