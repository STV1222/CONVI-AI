# AGENTS.md

## Cursor Cloud specific instructions

### Overview

CONVI-AI ("Light") is an AI-powered construction management showcase MVP. The primary product is the **frontend** (Next.js), which runs entirely on local mock data with no backend required for the demo flow.

There are three services plus a database, but only the frontend is required for the showcase:

| Service | Path | Port | Required for demo |
|---------|------|------|-------------------|
| Frontend (Next.js) | `frontend/` | 3000 | Yes |
| Backend (Express/Prisma) | `backend/` | 3001 | No (legacy) |
| AI Service (FastAPI) | `ai-service/` | 8000 | No (legacy) |
| PostgreSQL | docker-compose | 5432 | No (legacy) |

### Running the frontend

```bash
cd frontend && npm run dev
```

Lint and build commands are documented in `frontend/README.md` (`npm run lint`, `npm run build`).

### Backend / AI service (optional)

- The backend uses **Prisma 7** which requires `prisma.config.ts` for the database URL (the existing `schema.prisma` still has the old `url = env("DATABASE_URL")` syntax, which is incompatible with Prisma 7). This is a pre-existing issue in the repo.
- The AI service starts with `uvicorn main:app --host 0.0.0.0 --port 8000` from the `ai-service/` directory. The `uvicorn` binary installs to `~/.local/bin` — ensure that directory is on `PATH`.
- If running the backend locally, install PostgreSQL, create a `convi_ai` database, and set `DATABASE_URL` accordingly.

### Package manager

The project uses **npm** (lockfiles: `frontend/package-lock.json`, `backend/package-lock.json`).

### Node version

Node 22.x works. No `.nvmrc` or `.node-version` file is present.
