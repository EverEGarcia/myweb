myWeb Portfolio

Personal portfolio website for Ever Eslí, built with Next.js, React, TypeScript, and Tailwind CSS.

Stack

Next.js App Router

React

TypeScript

Tailwind CSS

Zod validation

React Hook Form

Vitest

AWS CDK and SESv2 SDK in the isolated infra/ backend package

Calendly meeting scheduling

Local development
npm install
npm run dev


Open http://localhost:3000 to view the app.

GitHub Pages project site

The Pages workflow builds this repository for /myweb/ using:

NEXT_PUBLIC_BASE_PATH=/myweb

NEXT_PUBLIC_SITE_URL=https://everegarcia.github.io/myweb

Local builds leave the base path empty.

The workflow publishes the static out/ directory.

Contact

The portfolio provides several ways for visitors to get in touch:

Contact form

Direct email

WhatsApp, when configured

LinkedIn, when configured

GitHub

Embedded Calendly scheduling

Calendly is embedded directly into the Contact section so visitors can schedule a meeting without leaving the portfolio.

The contact form uses NEXT_PUBLIC_CONTACT_API_URL when a contact API endpoint is configured.

If the contact API is not configured, the form displays a message directing visitors to use the available direct contact method rather than making an invalid request.

Testing and validation

Run:

npm run lint
npm run typecheck
npm test
npm run build
npm run infra:build


The project uses a static export configuration and writes the production output to the out/ directory.

To synthesize the Phase 2 AWS infrastructure locally, set SES_FROM_ADDRESS to a verified sender and run:

npm run infra:synth


Synthesis does not deploy AWS resources.

Portfolio content

This portfolio highlights:

Software development

Cloud and IT learning

Data analytics

Professional technical support

Technical projects and professional experience

For complete professional history and career timeline, visit LinkedIn. Credential evidence and supporting documentation are available upon request.

armonicolat.com is an independent business entity/website and is completely outside the scope of this repository.

AWS / Phase 2

The AWS CDK backend and SES sender implementation are included as Phase 2 source code.

No AWS infrastructure is provisioned as part of the current static frontend deployment unless explicitly deployed separately.

Production email delivery requires:

A deployed contact API.

A verified SES sender identity.

NEXT_PUBLIC_CONTACT_API_URL configured with the production API endpoint.

Current release
v0.0.2

This release includes:

Updated portfolio content and profile data.

Updated Hero section.

Updated Contact section.

Embedded Calendly meeting scheduling.

Contact form improvements.

GitHub Pages static deployment support.

Updated project documentation.

Removal of personal email address from repository documentation.

Security

Sensitive credentials, API keys, environment files, and private configuration should never be committed to this repository.

Use environment variables for deployment-specific configuration.

The contact form includes client-side validation and a honeypot field. Server-side validation and rate limiting should also be enforced by the production contact API.

Static export

The application is configured with:

output: "export"


and is prepared for static hosting environments such as GitHub Pages.