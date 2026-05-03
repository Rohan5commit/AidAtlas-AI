# AidAtlas AI Architecture

## Stack
- Next.js App Router + TypeScript + Tailwind CSS
- API route: `/api/analyze`
- Data: local JSON (`data/plans.json`, `data/demoCases.json`)
- AI provider: NVIDIA NIM (optional), deterministic fallback engine

## Flow
1. User submits intake on landing page.
2. `/api/analyze` sends structured prompt to NVIDIA NIM if configured.
3. If NIM missing/fails, deterministic fallback plan is generated.
4. Plan persisted in JSON store.
5. User is redirected to dashboard `/plan/[id]`.

## Reliability
- Works fully without external key via fallback output.
- Limits stored plans to 50 entries for stable demo performance.

## Safety
- Includes explicit informational-use disclaimer.
