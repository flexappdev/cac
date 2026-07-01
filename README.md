# CCA — Claude Certified Architect

[![Live on Vercel](https://img.shields.io/badge/live-cac--snowy.vercel.app-black?logo=vercel)](https://cac-snowy.vercel.app)
[![GitHub](https://img.shields.io/badge/github-flexappdev%2Fcca-181717?logo=github)](https://github.com/flexappdev/cca)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)

[![Watch on YouTube](https://img.youtube.com/vi/wyFS10ZiuKI/maxresdefault.jpg)](https://www.youtube.com/watch?v=wyFS10ZiuKI)

A complete study system for the **Claude Certified Architect (CCA)** track from Anthropic. It combines the long-form guide, captured course notes, cheat sheets, and a deployed study app in one repo.

- **Live:** [cac-snowy.vercel.app](https://cac-snowy.vercel.app)
- **Local:** `npm install && npm run dev` → http://localhost:24301

| Component | What it is |
|---|---|
| `/cca` skill | Claude Code skill that coaches you through exam prep |
| `src/` | Next.js 16 study dashboard with the imported 17-course library, progress tracking, and quiz review |
| [`guides/`](./guides/README.md) | Entry point for long-form guides and study references |
| [`courses/`](./courses/README.md) | Captured course notes, lesson indexes, and diagrams |
| [`cheat/`](./cheat/README.md) | Condensed cram sheets and quick-reference material |

---

## Start Here

| If you want to... | Open |
|---|---|
| Read the guide index | [guides/README.md](./guides/README.md) |
| Jump straight to the canonical exam guide | [docs/cca-guide.md](./docs/cca-guide.md) |
| Browse the captured course library | [courses/README.md](./courses/README.md) |
| Review the cheat sheets | [cheat/README.md](./cheat/README.md) |
| Launch the study dashboard | [src/](./src/) — run `npm run dev` |

---

## Study Surface

The repo now has four primary entry points:

- [`guides/README.md`](./guides/README.md) for long-form orientation and study paths
- [`docs/README.md`](./docs/README.md) for canonical source documents
- [`courses/README.md`](./courses/README.md) for the imported 17-course library
- [`cheat/README.md`](./cheat/README.md) for fast review material

The Next.js dashboard in [`src/`](./src/) mirrors the imported `courses/` content so the study dashboard and repo content stay aligned.

---

## Coverage

### 17 Imported Courses
The `courses/` folder currently includes 17 Anthropic course captures, ranging from `Claude 101` and `Claude Code 101` through MCP, subagents, agent skills, and AI fluency tracks.

### 5 Exam Domains
The quiz and long-form guide still map back to the five exam domains:

- Prompt Engineering & AI Fluency
- Claude Code Development
- Agentic Architecture
- Model Context Protocol
- Projects, Artifacts & Skills

---

## Suggested Flow

1. Start in [guides/README.md](./guides/README.md) to understand the overall study path.
2. Read the main guide in [docs/cca-guide.md](./docs/cca-guide.md).
3. Work through the imported course notes in [courses/README.md](./courses/README.md).
4. Use [cheat/CHEAT.md](./cheat/CHEAT.md) for review and memorisation.
5. Run `npm run dev` and open [http://localhost:24301](http://localhost:24301) for progress tracking and quiz practice.

---

## Key Links

| Resource | Purpose |
|---|---|
| [Guides index](./guides/README.md) | Long-form reference material in this repo |
| [Docs index](./docs/README.md) | Canonical source documents |
| [Courses index](./courses/README.md) | Lesson-by-lesson notes from captured training courses |
| [Cheat index](./cheat/README.md) | Fast review sheets and memorisation aids |
| [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) | Canonical code examples |
| [Skilljar Training Courses](https://anthropic.skilljar.com/) | Official Anthropic training modules |
| [claudecertifications.com](https://claudecertifications.com/) | Certification portal and reference material |
| [Live study app](https://cac-snowy.vercel.app) | Production deployment on Vercel |

---

## Repo Structure

```
cca/                        # github.com/flexappdev/cca → cac-snowy.vercel.app
├── README.md
├── LICENSE
├── package.json            # Next.js 16 app at repo root (Vercel auto-detects)
├── next.config.ts
├── vercel.json             # framework: nextjs (pinned for prod)
├── src/                    # Next.js dashboard — localhost:24301
│   ├── app/                # routes
│   ├── components/
│   ├── data/courses.json   # 5 domains, 30 lessons, 15 quiz questions
│   └── lib/
├── guides/
│   └── README.md           # Human-friendly guide index
├── docs/
│   ├── README.md           # Canonical docs index
│   └── cca-guide.md        # Comprehensive exam guide
├── courses/
│   ├── README.md           # Index of the 17 imported course folders
│   └── */index.md          # Per-course lesson navigation / capture status
├── .claude/
│   └── skills/
│       └── cca/
│           └── SKILL.md    # Claude Code /cca skill
└── cheat/
    ├── README.md           # Cheat-sheet index
    └── CHEAT.md            # Condensed quick-reference guide
```

---

## /cca Skill

The `/cca` Claude Code skill acts as an exam coach. Install it once, then invoke from any Claude Code session.

**Install:**
```bash
mkdir -p ~/.claude/skills/cca
curl -o ~/.claude/skills/cca/SKILL.md \
  https://raw.githubusercontent.com/flexappdev/cca/main/.claude/skills/cca/SKILL.md
```

Or manually: copy `.claude/skills/cca/SKILL.md` → `~/.claude/skills/cca/SKILL.md`

**Usage:**
```
/cca               # Status + what to study next
/cca quiz          # Random practice question
/cca domain 3      # Deep dive into exam domain 3
/cca cheat         # Compact cheat sheet
/cca app           # Launch study dashboard at localhost:24301
/cca plan          # Personalised study plan
/cca resources     # Curated links
```

---

## Roadmap

**Next goal:** Generate full lessons for each of the 17 courses — every lesson gets a written walkthrough plus a diagram, images, and a short video. The current `courses/` capture is just the outline scraped from Skilljar; the ambition is to turn it into a first-class studio-quality study library the app can serve directly.

- Text: expanded lesson notes per topic (in `courses/<n>-<slug>/<lesson>.md`)
- Diagrams: one editorial SVG per lesson (via `/abc-diagrams` skill)
- Images: hero + inline via `/iad` (Nano Banana / Runware)
- Video: 30–60s explainer via `/abc-videos` pipeline

---

## License

MIT — Mat Siems, 2026
