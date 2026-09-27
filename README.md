# myWeb Portfolio

Owner: Ever Eslí  |  Contact: everesliga@gmail.com

This project is a Next.js portfolio for Ever Eslí built with React, TypeScript, Tailwind CSS, and a data-driven component layout. Phase 1 is the static frontend and local contact flow. Phase 2 contact infrastructure is implemented as AWS CDK code but has not been deployed.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod validation
- React Hook Form
- Vitest
- AWS CDK and SESv2 SDK in the isolated `infra/` backend package

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## GitHub Pages project site

The Pages workflow builds this repository for `/myweb/` by setting `NEXT_PUBLIC_BASE_PATH=/myweb` and `NEXT_PUBLIC_SITE_URL=https://everegarcia.github.io/myweb`. Local builds leave the base path empty. The workflow publishes the static `out/` directory; the project-site URL is not claimed live until verified.

## Testing and validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run infra:build
```

The project uses a static export configuration and writes to the `out/` directory. To synthesize the Phase 2 template locally, set `SES_FROM_ADDRESS` to a verified sender and run `npm run infra:synth`. Synthesis does not deploy resources.

## Portfolio content

This portfolio highlights software development, cloud and IT learning, data analytics, and professional technical support work.

For complete professional history and career timeline, visit LinkedIn. Credential evidence and supporting documentation are available upon request.

armonicolat.com is an independent business entity/website and completely outside the scope of this repository.

Phase 1 is restricted to local development and static build validation; no AWS infrastructure is provisioned in this phase.

## Current status

The frontend and local contact flow are Phase 1. The CDK backend and SES sender implementation are Phase 2 source code, not deployed infrastructure. No AWS resources have been provisioned and production email delivery has not been tested. `NEXT_PUBLIC_CONTACT_API_URL` remains empty until a real endpoint is deployed; with it unset, the form directs visitors to email directly. SES identity verification is a manual prerequisite and has not been performed by the agent.

## Static export

The app is configured with `output: "export"` and is prepared for static hosting environments such as GitHub Pages.
