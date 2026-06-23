# AI Website Growth Agent Platform

A production-style SaaS application for generating, previewing, editing, saving, and managing AI-powered landing page strategies.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- OpenAI-compatible AI generation
- Vercel-ready project structure

## Features

- Landing page generator form with validation
- AI-generated SEO title, meta description, hero copy, CTA, pain points, benefits, FAQ, three page variations, and personalization ideas
- Deterministic local fallback when no `OPENAI_API_KEY` is configured
- Dashboard with search, status filters, saved page cards, empty states, and mock analytics
- Page detail editor with status management
- Landing page preview renderer
- Section regeneration endpoint
- Copy-to-clipboard and HTML export
- Seed data for portfolio demos

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Environment

Set `DATABASE_URL` to a PostgreSQL database connection string. Supabase works well:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres?schema=public"
OPENAI_API_KEY="sk..."
OPENAI_MODEL="gpt-4o-mini"
```

`OPENAI_API_KEY` is optional for local development. Without it, the app returns realistic fallback output so the full product flow remains testable.

## Useful Commands

```bash
npm run dev
npm run build
npm run typecheck
npm run db:generate
npm run db:push
npm run db:seed
```

## Project Structure

```text
app/                  App Router pages and API routes
components/           Reusable dashboard, generator, preview, and UI components
lib/actions/          Server actions for persistence workflows
lib/ai/               Prompt templates, AI client, fallback generator
lib/db/               Prisma client and database mappers
lib/schemas/          Zod validation schemas
lib/utils/            Formatting, class merging, and export helpers
prisma/               Database schema and seed data
types/                Shared TypeScript domain types
```

## Portfolio Notes

This project demonstrates full-stack product engineering: typed forms, structured AI output, database-backed workflows, editable generated content, server actions, API routes, dashboard UX, and deployment-ready configuration.
