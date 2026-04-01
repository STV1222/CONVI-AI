# CONVI-AI

`Light` is a polished showcase MVP for an AI-powered construction management platform. It is designed for demos with investors, construction companies, partners, and prospective clients.

The experience focuses on:

- portfolio and project visibility
- site progress tracking
- work allocation and subcontractor coordination
- procurement and material risk monitoring
- safety and quality oversight
- equipment and maintenance visibility
- a simulated AI intelligence layer and copilot

## What Was Built

The showcase includes:

- a marketing landing page at `/`
- a premium portfolio dashboard at `/dashboard`
- project list and project detail views
- site progress, work allocation, providers, procurement, safety and quality, equipment, AI copilot, and settings pages
- rich in-memory mock data for projects, providers, work packages, procurement, safety records, equipment assets, and AI alerts
- charts and AI callouts designed to feel investor-demo ready

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- local mock data only

## Quick Start

The showcase runs entirely from the frontend and does not require the legacy backend or database for the demo flow.

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

To validate the app:

```bash
cd frontend
npm run lint
npm run build
```

## App Structure

Key folders in `frontend`:

- `pages`
  - marketing page and all demo routes
- `components`
  - reusable shell, chart, and UI primitives
- `data/mock.ts`
  - showcase seed data and derived dashboard data
- `types/light.ts`
  - shared TypeScript interfaces for projects, providers, procurement, safety, equipment, and copilot
- `lib/format.ts`
  - small presentation helpers for badges, labels, and formatting
- `styles/globals.css`
  - global theme and base styling

## Core Routes

- `/` marketing landing page
- `/dashboard` main command center
- `/projects` projects overview
- `/projects/[id]` project detail
- `/site-progress`
- `/work-allocation`
- `/providers`
- `/procurement`
- `/safety-quality`
- `/equipment`
- `/ai-copilot`
- `/settings`

## Mocked Vs Functional

Functional in the MVP:

- navigation across all pages
- consistent design system and responsive layout
- static charts and dashboards
- project detail drill-down
- interactive AI copilot prompt switching
- realistic tables, cards, status badges, and health indicators

Mocked for showcase purposes:

- AI insights and copilot responses
- all project, provider, procurement, safety, and equipment data
- notifications, summaries, and recommendations
- photo upload and drone/image analysis placeholders
- settings and access request flows
- any backend persistence, authentication, or CRUD behavior

## Demo Script

Use this 2 to 3 minute story for presentations:

1. Start on `/` and position Light as a construction operating system with an AI layer on top. Mention the value proposition: better visibility, coordination, and faster decisions.
2. Open `/dashboard` and explain that executives and project managers can instantly see active projects, delays, budget pressure, safety signals, procurement issues, and AI alerts in one command center.
3. Open `/projects` and then a detail page such as `Aurora Tower`. Show how a manager can understand progress, blockers, providers, procurement, safety, and AI recommendations in seconds.
4. Move to `/site-progress` and `/work-allocation` to show how field updates and crew coordination connect directly to project outcomes.
5. Open `/providers` or `/procurement` and show that Light surfaces supplier and subcontractor issues before they affect milestones.
6. Finish on `/ai-copilot` and ask one of the prebuilt questions like “Which projects are at highest delay risk?” to reinforce the AI-led decision support story.

## Notes

- This repo still contains older backend and legacy MVP code, but the current showcase experience is centered on the `frontend` app.
- The showcase is intentionally optimized for storytelling and presentation quality rather than production readiness.
