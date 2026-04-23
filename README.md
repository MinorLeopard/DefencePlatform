# Bharat Defence Network

A polished, investor-ready MVP demo of a national defence innovation ecosystem platform. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

> **Note:** This is a front-end demonstration. All startups, problems, members, projects, grants, and metrics are fictional/sample content for illustrative purposes. No government endorsement implied.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript 5
- Tailwind CSS + custom dark theme
- Framer Motion for restrained animations
- lucide-react icons, Inter / Space Grotesk / JetBrains Mono
- Local typed data files under `data/`

## Structure

```
app/
  page.tsx                     # Landing
  problems/                    # Marketplace + [slug] detail
  projects/                    # Repos + [slug] detail
  startups/                    # Startups · grants · patents
  creators/                    # Reels grid
  community/                   # Public forum preview
  community/private/           # Members-only rooms
  summit/                      # Summit + events
  about/                       # Mission & leadership
  contact/                     # Partnership form
  login/                       # Mock auth UI
  dashboard/                   # Member dashboard + shell layout
  assistant/                   # Members-only AI assistant workspace
components/
  ui/                          # Primitives (Card, Badge, Stat, etc.)
  layout/                      # Navbar, Footer, MemberShell
  landing/                     # Landing sections (Hero, Metrics, etc.)
  cards/                       # ProblemCard, ProjectCard, StartupCard
  filters/                     # Filter bars + filtered grids
  page/                        # Generic page hero
data/                          # Typed sample data (problems, projects, ...)
lib/                           # cn(), formatters
```

## Run locally

```bash
npm install
npm run dev
```

The app runs on <http://localhost:3000>.

## Deploy to Vercel

Option A — CLI:

```bash
npx vercel
```

Option B — dashboard:

1. Push this repository to GitHub.
2. In the Vercel dashboard, click *Add New Project* and import the repo.
3. Framework is auto-detected as Next.js. No environment variables are required.
4. Click *Deploy*.

No build configuration needed beyond what's in `package.json` and `vercel.json`.

## Content guardrails

- No classified or sensitive operational content.
- No explicit weapon construction instructions.
- Fictional but realistic sample content.
- Clear demo framing in the footer.
