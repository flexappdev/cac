# CCA — Claude Certified Architect

[![Live on Vercel](https://img.shields.io/badge/live-cac--snowy.vercel.app-black?logo=vercel)](https://cac-snowy.vercel.app)
[![GitHub](https://img.shields.io/badge/github-flexappdev%2Fcca-181717?logo=github)](https://github.com/flexappdev/cca)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org)
[![Version](https://img.shields.io/badge/version-v2.1-blue)](#v21-changelog)

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

### 17 Imported Courses · 168 Lessons
The `courses/` folder currently includes 17 Anthropic course captures (141 lessons with full ~530-word markdown notes, 27 outline-only lessons) ranging from `Claude 101` and `Claude Code 101` through MCP, subagents, agent skills, and AI fluency tracks. Every lesson renders in the dashboard with a hero image, diagram, and video link.

### 5 Exam Domains
The quiz and long-form guide still map back to the five exam domains:

- Prompt Engineering & AI Fluency
- Claude Code Development
- Agentic Architecture
- Model Context Protocol
- Projects, Artifacts & Skills

---

## v2.1 Changelog

- **Global top header** — sticky bar shows `CCA · v2.1` on the left and a Sun/Moon theme toggle on the right; theme toggle moved out of the footer to a single canonical slot.
- **Full lesson assets on every page** — extended the lesson schema with `diagram` / `image` / `video` fields. Each of the 168 lessons now renders (a) a course-branded SVG hero, (b) a diagram (topic PNG for the 141 captured lessons, generated inline SVG for the 27 outline lessons), (c) a video link card to Anthropic's YouTube channel (per-lesson video IDs can be added via `scripts/lesson-videos.json`).
- **Prebuild asset pipeline** — `scripts/generate-lesson-assets.mjs` regenerates `public/lessons/**` from source PNGs under `courses/**` on every `npm run dev` / `npm run build`. Generated media is gitignored so the repo stays lean; Vercel rebuilds it on each deploy.
- **Bug fix** — the lesson detail page was resolving markdown paths at `../` (from the pre-flatten layout) and reading files outside the repo. Fixed to resolve at `process.cwd()`.

_Follow-up:_ move generated media to `s3://com27/cca/lessons/` via `/abc-s3` once the central S3 credentials are rotated (current keys return `InvalidAccessKeyId`).

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
│   ├── data/courses.json   # 17 courses, 168 lessons, 15 quiz questions
│   └── lib/
├── scripts/
│   ├── generate-lesson-assets.mjs   # runs on prebuild + predev
│   └── lesson-videos.json           # optional per-lesson YouTube ID overrides
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

v2.1 delivered the first pass of the full-lessons ambition. Next milestones:

- ✅ **Text (v2.1)** — captured notes per topic in `courses/<n>-<slug>/<lesson>.md` (141 lessons at ~530 words avg; 27 outline-only)
- ✅ **Diagrams (v2.1)** — one diagram per lesson (topic PNG for captured, generated SVG for outline)
- ✅ **Images (v2.1)** — course-branded SVG hero per lesson
- ✅ **Video (v2.1)** — YouTube channel link card per lesson (per-lesson video IDs land via `scripts/lesson-videos.json`)
- ⏳ **v2.2** — swap SVG heroes for `/iad` Nano Banana raster heroes; upload media to `s3://com27/cca/lessons/` via `/abc-s3`
- ⏳ **v2.3** — 30–60s explainer video per lesson via `/abc-videos` pipeline
- ⏳ **v2.4** — long-form editorial diagrams via `/abc-diagrams` skill (replaces the current topic PNGs for the 141 captured lessons)

---

## License

MIT — Mat Siems, 2026
