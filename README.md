# Calendify

Calendify is a full-stack calendar management app built with Next.js. It combines scheduling, authentication, guest access, and account preferences into one workflow, with an experimental AI-assisted time-slot prediction feature.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- NextAuth v5 (Credentials, GitHub, Google)
- Prisma ORM + PostgreSQL
- Tailwind CSS v4 + Radix UI
- FullCalendar
- Zod + React Hook Form
- Resend (email verification + password reset)
- TensorFlow.js (experimental slot prediction)

## Core Features

- User authentication:
  - Email/password login
  - OAuth login with GitHub and Google
  - Email verification flow
  - Password reset flow
- Guest user flow with automatic guest record cleanup endpoint (`/api/cron`)
- Protected calendar area at `/calendar`
- Event data persisted in PostgreSQL with Prisma
- User preferences (`earliest` and `latest`) used by scheduling logic
- Experimental prediction action that loads a TensorFlow.js model from `/models/model.json`

## Project Structure

```text
src/
	app/
		(protected)/      # Authenticated area (calendar and protected UI)
		api/              # Route handlers (auth + cron)
		auth/             # Login/register/reset/verification pages
	actions/            # Server actions (auth, users, prediction, events)
	db/                 # Database helper functions
	components/         # Shared UI and feature components
	lib/                # Utilities (mail, tokens, dates, time slots)
prisma/
	schema.prisma       # Data model and datasource
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

AUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

RESEND_API_KEY=""

CRON_SECRET="replace-with-a-long-random-secret"
```

Notes:

- `DATABASE_URL` is required by Prisma.
- `AUTH_URL` is used when generating verification/reset email links.
- `CRON_SECRET` is required to authorize calls to `GET /api/cron`.

### 3. Prepare the database

```bash
npx prisma migrate dev
```

The project also runs `prisma generate` during `postinstall`.

### 4. Start the app

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Authentication and Routing Behavior

- Public routes include:
  - `/`
  - `/auth/new-verification`
  - `/api/cron`
- Auth routes include:
  - `/auth/login`
  - `/auth/register`
  - `/auth/error`
  - `/auth/reset`
- After successful login, users are redirected to `/calendar`.

## Cron Cleanup Endpoint

- Endpoint: `GET /api/cron`
- Auth: `Authorization: Bearer <CRON_SECRET>`
- Purpose: Deletes guest users older than the configured cutoff in server logic.

Example:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron
```

## Prisma Data Model (High Level)

- `User` (credentials/profile/preferences, guest flag)
- `Event` (calendar item metadata)
- `Part` (time segments for events)
- `Account`, `Session` (Auth.js adapter models)
- `VerificationToken`, `PasswordResetToken`

## Deployment Notes

- The repository includes `vercel.json`, so Vercel deployment is expected.
- Set all required environment variables in your deployment platform.
- Ensure PostgreSQL is reachable from the deployment environment.
- If using the prediction feature in production, host the TensorFlow model files under `/public/models`.

## Development Notes

- Runtime middleware is configured with `runtime: "nodejs"`.
- Prisma client output is generated to `src/generated/prisma`.
- Some AI/prediction code paths are marked experimental and may need additional hardening for production.
