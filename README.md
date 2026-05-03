# AidAtlas AI
Social-good resource navigator built for Quantum Sprint: For Social Good.

## Features
- Guided needs intake form
- AI-powered recommendations with structured output
- Fallback deterministic engine (no key required)
- Personalized action-plan dashboard
- Checklist/document prep view
- Urgency tagging + priority score
- Seeded demo cases
- Progress tracker

## Repo Tree
- `app/` UI pages and API routes
- `components/` reusable UI cards
- `lib/` AI engine, storage, and types
- `data/` seeded cases + persisted demo plans
- submission assets (`architecture.md`, `demo-script.md`, etc.)

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open `http://localhost:3000`.

## NVIDIA NIM Configuration
Set `NIM_API_KEY` in `.env.local`. If omitted or unavailable, app uses built-in fallback outputs.

## Deploy to Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```
Set env vars in Vercel project settings:
- `NIM_API_KEY`
- `NIM_MODEL` (optional)
