# stemLM — Full Product Specification

## What is stemLM?

stemLM is a structured learning overlay for STEM students. It works as a browser extension that intercepts questions sent to AI chatbots (ChatGPT, Gemini, Claude) and injects a structured playbook prompt — so the AI responds using an exact, curriculum-aligned step-by-step framework. The extension then extracts and displays the AI's response in a clean, structured side panel.

The companion website (`stemlm.com`) serves as:
1. A marketing and waitlist capture landing page
2. A public `/database` page where anyone can browse the full taxonomy of subjects, chapters, topics, subtopics, and their solving frameworks

---

## The Core Mechanic — How It Works

### Step 1: User asks a question
User types a STEM question into ChatGPT, Gemini, or Claude as normal.

### Step 2: User clicks the stemLM button
A small stemLM button is injected into the chatbot UI (next to the send button, like a Grammarly overlay). When clicked, it:
- Identifies which chatbot the user is on
- Injects a structured prompt file (2–3KB) along with the user's original question
- The injected prompt instructs the AI to: identify the exact topic, call the stemLM API to get the framework for that topic, and respond using that exact framework with a unique key embedded in the response

### Step 3: User presses send
The combined message (user question + injected prompt) is submitted to the AI.

### Step 4: Extension panel opens
As the AI begins responding, the stemLM Chrome extension automatically opens a side panel taking up 2/5 of the screen horizontally.

### Step 5: Response extraction
The extension reads the AI's response as it streams in. It parses the response looking for the embedded unique taxonomy key (format: `STEM-{SUBJECT}-{CH}-{TOPIC}-{SUBTOPIC}`, example: `STEM-PHY-03-07-02`).

### Step 6: Framework lookup
Once the key is found, the extension calls the stemLM API:
`GET /api/topic/{key}`
This returns the exact step-by-step framework for that topic.

### Step 7: Structured display
The extension panel renders the solution in a clean, structured way — following both the AI's response content and the framework structure simultaneously. Each step is shown sequentially with the correct formula, method, and verification steps.

### Step 8: User actions
From the panel, the user can:
- **Download** the full solution as a formatted file (one click)
- **Select any text** in the panel and ask the AI a follow-up question about that specific part
- **Copy** individual steps or the full solution
- **See the topic tag** and browse to the `/database` page for that topic

---

## The Unique Key System

Every topic in the taxonomy has a unique key. This key is the backbone of the entire system.

### Format
```
STEM-{SUBJECT}-{CHAPTER}-{TOPIC}-{SUBTOPIC}
```

### Rules
- All uppercase
- Hyphen-separated
- Subject: 2–4 letter abbreviation (PHY, CHEM, MATH, BIO, CS, EE, ME, CE)
- Chapter: 2-digit zero-padded number (01–99)
- Topic: 2-digit zero-padded number (01–99)
- Subtopic: 2-digit zero-padded number (01–99)

### Examples
```
STEM-PHY-03-07-02   → Physics, Ch3, Topic 7, Subtopic 2 (Projectile Motion → Range → Effect of angle)
STEM-MATH-01-04-01  → Mathematics, Ch1, Topic 4, Subtopic 1 (Algebra → Quadratic → Discriminant method)
STEM-CHEM-05-02-03  → Chemistry, Ch5, Topic 2, Subtopic 3 (Thermodynamics → Enthalpy → Hess's Law)
STEM-CS-02-08-01    → Computer Science, Ch2, Topic 8, Subtopic 1 (Algorithms → Sorting → Merge Sort)
```

### Key rules
- Keys are globally unique — no two topics share the same key
- Keys never change once assigned — they are permanent identifiers
- The key is embedded in the AI's response inside a special comment block that the extension parses
- Format in AI response: `<!-- STEMLM_KEY: STEM-PHY-03-07-02 -->`

---

## Database / Taxonomy Structure

### Database schema (Supabase / PostgreSQL)

**Table: `topics`**
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
key         TEXT UNIQUE NOT NULL        -- "STEM-PHY-03-07-02"
subject     TEXT NOT NULL               -- "Physics"
subject_code TEXT NOT NULL             -- "PHY"
chapter_num  INTEGER NOT NULL           -- 3
chapter_name TEXT NOT NULL             -- "Motion in a Plane"
topic_num    INTEGER NOT NULL           -- 7
topic_name   TEXT NOT NULL             -- "Projectile Motion"
subtopic_num INTEGER NOT NULL          -- 2
subtopic_name TEXT NOT NULL            -- "Horizontal Range"
tags         TEXT[]                    -- ["kinematics", "JEE", "NEET", "mechanics"]
difficulty   TEXT                      -- "medium" | "hard" | "easy"
created_at   TIMESTAMP DEFAULT now()
updated_at   TIMESTAMP DEFAULT now()
```

**Table: `frameworks`**
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
topic_key    TEXT NOT NULL REFERENCES topics(key)
steps        JSONB NOT NULL             -- ordered array of step objects (see below)
formulas     TEXT[]                     -- LaTeX formula strings
prerequisites TEXT[]                   -- keys of prerequisite topics
common_mistakes TEXT[]                 -- list of common errors students make
exam_tips    TEXT                      -- brief exam strategy note
updated_at   TIMESTAMP DEFAULT now()
```

**Step object shape (inside `steps` JSONB array):**
```json
{
  "order": 1,
  "title": "Resolve components",
  "instruction": "Break the initial velocity into horizontal and vertical components",
  "formula": "u_x = u\\cos\\theta, \\quad u_y = u\\sin\\theta",
  "note": "Always resolve before substituting — never skip this step",
  "type": "setup" | "calculation" | "verification" | "substitution"
}
```

---

## API Endpoints

Base URL: `/api`

### `GET /api/topic/[key]`
Returns the full topic details and framework for a given key.

Request: `GET /api/topic/STEM-PHY-03-07-02`

Response:
```json
{
  "key": "STEM-PHY-03-07-02",
  "subject": "Physics",
  "chapter": "Motion in a Plane",
  "topic": "Projectile Motion",
  "subtopic": "Horizontal Range",
  "tags": ["kinematics", "JEE", "mechanics"],
  "difficulty": "medium",
  "framework": {
    "steps": [...],
    "formulas": ["R = \\frac{u^2 \\sin 2\\theta}{g}"],
    "prerequisites": ["STEM-PHY-03-06-01"],
    "common_mistakes": ["Forgetting to resolve components", "Using wrong angle"],
    "exam_tips": "Always write the formula before substituting. Check units."
  }
}
```

### `GET /api/search?q={query}`
Fuzzy search across topic names, subject, chapter, subtopic.

Response: array of matching topic objects (without framework steps).

### `POST /api/resolve`
Called by the injected prompt from inside the AI. Receives the AI's identified topic description and returns the best-matching key and framework.

Request body:
```json
{
  "description": "projectile motion range formula physics",
  "subject_hint": "physics"
}
```

Response: same shape as `/api/topic/[key]`

### `GET /api/subjects`
Returns the full list of subjects with chapter counts.

### `GET /api/subjects/[subject_code]/chapters`
Returns all chapters for a subject.

### `GET /api/subjects/[subject_code]/chapters/[chapter_num]/topics`
Returns all topics and subtopics for a chapter.

---

## The Injected Prompt File

This is the 2–3KB file that gets prepended to the user's question.
It lives at `packages/prompt-template/template.txt`.

The prompt must:
1. Tell the AI to identify the exact topic of the question
2. Tell the AI to call `POST /api/resolve` with the topic description
3. Tell the AI to embed the returned key in its response as `<!-- STEMLM_KEY: {key} -->`
4. Tell the AI to structure its entire response following the framework steps returned by the API
5. Tell the AI to produce a JSON-annotated response with step markers that the extension can parse
6. Keep the key embedding invisible to the user (HTML comment)

Template file content:
```
[STEMLM SYSTEM PROMPT - DO NOT DISPLAY THIS TO THE USER]

You are answering a STEM question. Before responding, you MUST:

1. IDENTIFY the exact topic of the question below. Be specific — name the subject, chapter, and subtopic.

2. CALL this API endpoint to get the exact solving framework:
   POST https://stemlm.com/api/resolve
   Body: { "description": "{your identified topic}", "subject_hint": "{subject}" }

3. EMBED the returned key invisibly in your response exactly like this:
   <!-- STEMLM_KEY: STEM-XXX-00-00-00 -->
   Place this at the very start of your response, before any visible text.

4. FOLLOW the framework steps returned by the API exactly in order.
   Structure your visible response with clear step numbers and titles matching the framework.

5. FORMAT each step as:
   **Step {n}: {title}**
   {instruction and working}

The user's question follows. Answer it completely using the framework.
[END STEMLM SYSTEM PROMPT]
```

---

## Website Pages

### `/` — Landing page

Sections in order:
1. **Nav** — logo, links (How it works, Database, Extension), Join waitlist CTA button
2. **Hero** — headline, subtext, primary CTA (Get early access), secondary CTA (Browse database →), social proof line ("Free during beta · Works with ChatGPT, Gemini & Claude")
3. **Preview strip** — side-by-side mockup: chatbot on left, stemLM panel on right showing structured steps
4. **How it works** — 3-column card grid: Ask → Click stemLM → Get structured solution
5. **Database teaser** — show the taxonomy tree structure, stats (subjects, topics, frameworks), link to /database
6. **Waitlist CTA section** — dark background, email input, submit button, note ("Free during beta")
7. **Footer** — logo, links

### `/database` — Taxonomy browser

Layout:
- Left sidebar: collapsible subject → chapter tree navigation
- Main area: topic cards for the selected chapter
- Each topic card shows: topic name, subtopic count, tags (as pills), difficulty badge, key (monospace)
- Click a topic card → expand to show the full framework steps inline
- Search bar at top filters across all topics in real time
- No authentication required — fully public

URL structure:
- `/database` → shows all subjects
- `/database/[subject]` → shows chapters for subject
- `/database/[subject]/[chapter]` → shows topics for chapter
- `/database/[subject]/[chapter]/[topic-key]` → shows full framework for topic

---

## Chrome Extension

### Files structure
```
apps/extension/
├── manifest.json
├── src/
│   ├── background.ts        — Service worker (MV3)
│   ├── content.ts           — Injected into ChatGPT/Gemini/Claude tabs
│   ├── injector.ts          — Injects the prompt file before user message
│   ├── extractor.ts         — Extracts LLM response from DOM, finds key
│   ├── panel/
│   │   ├── Panel.tsx        — Main 2/5 side panel component
│   │   ├── StepView.tsx     — Renders individual steps
│   │   ├── SelectAsk.tsx    — Handles text selection → ask AI
│   │   └── DownloadBtn.tsx  — One-click download to formatted file
│   └── utils/
│       ├── keyParser.ts     — Regex to extract STEMLM_KEY from DOM
│       └── formatter.ts     — Formats step data for display
```

### Supported chatbot platforms
- ChatGPT (`chat.openai.com`)
- Gemini (`gemini.google.com`)
- Claude (`claude.ai`)

### Manifest V3 permissions required
- `activeTab`
- `scripting`
- `storage`
- `sidePanel`

### Panel behavior
- Opens automatically when a stemLM-injected response starts streaming
- Takes 2/5 of the horizontal screen width as a Chrome side panel
- Renders steps sequentially as each step is detected in the stream
- Download button exports to: clean HTML file (one-click, no LaTeX needed)
- Select-and-ask: user highlights text → button appears → sends selection as follow-up to AI

---

## Data Collection Plan (for taxonomy)

To build the initial database:
1. Gather complete slide material and handouts from STEM departments of 20+ universities globally (different backgrounds, countries, curricula)
2. Include JEE/NEET syllabus, A-level, AP, IB, and university-level material
3. Merge all content
4. Extract all unique topic names and organize into the hierarchy
5. Write solving frameworks for each topic (manual + AI-assisted)
6. Seed the database using `data/scripts/seed.py`

Data scripts live in `data/scripts/`:
- `merge.py` — merges raw slide/PDF content
- `deduplicate.py` — finds unique topics across all sources
- `build_tree.py` — constructs the subject→chapter→topic→subtopic tree
- `seed.py` — seeds Supabase from `data/taxonomy/tree.json`

---

## Tech Stack

| Part              | Technology                        |
|-------------------|-----------------------------------|
| Website frontend  | Next.js 14+ (App Router), TypeScript |
| Styling           | Tailwind CSS                      |
| Backend / API     | Next.js API routes                |
| Database          | PostgreSQL via Supabase           |
| ORM               | Supabase JS client                |
| Extension         | Chrome MV3, React, TypeScript     |
| Monorepo          | npm workspaces (or Turborepo)     |
| Deployment        | Vercel (website), Chrome Web Store (extension) |
| Fonts             | Inter, Geist, JetBrains Mono (via @fontsource) |
| Icons             | Lucide React                      |
| Package manager   | npm                               |

---

## Environment Variables

Create `.env.local` (never commit this) with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Create `.env.example` (commit this) with the same keys but empty values.

---

## Folder Structure (complete)

```
stemlm/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              ← Landing page "/"
│   │   └── layout.tsx
│   ├── database/
│   │   ├── page.tsx              ← /database root
│   │   └── [subject]/
│   │       ├── page.tsx
│   │       └── [chapter]/
│   │           ├── page.tsx
│   │           └── [key]/
│   │               └── page.tsx
│   ├── api/
│   │   ├── topic/[key]/route.ts
│   │   ├── resolve/route.ts
│   │   ├── search/route.ts
│   │   └── subjects/route.ts
│   ├── layout.tsx                ← Root layout with fonts
│   └── globals.css
├── components/
│   ├── home-page.tsx
│   ├── waitlist-modal.tsx
│   ├── stem-diagrams.tsx
│   ├── reveal.tsx
│   └── ui/                      ← Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Input.tsx
├── lib/
│   ├── supabase.ts
│   ├── design-tokens.ts
│   ├── taxonomy.ts
│   └── matcher.ts
├── data/
│   ├── raw/                      ← gitignored
│   ├── processed/
│   ├── taxonomy/
│   │   └── tree.json
│   └── scripts/
│       ├── merge.py
│       ├── deduplicate.py
│       ├── build_tree.py
│       └── seed.py
├── DESIGN_SYSTEM.md              ← Created by design system prompt
├── PRODUCT_SPEC.md               ← This file
├── .env.example
├── .env.local                    ← gitignored
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## What Codex should do with this file

1. Save this entire document as `PRODUCT_SPEC.md` at the project root
2. Read through it fully before writing any code
3. When building any feature, refer to this spec for behavior and API contracts
4. When building any UI, refer to `DESIGN_SYSTEM.md` for all visual decisions
5. Never invent new API endpoints — only use the ones defined here
6. Never invent new color values — only use the tokens from `lib/design-tokens.ts`
7. When in doubt about structure, check the folder structure section above

Do NOT run npm install. Do NOT modify any existing working components. Do NOT delete any files.
