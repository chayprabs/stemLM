# stem**LM**

**Solve STEM problems the right way, every time.**

[www.stemlm.app](https://www.stemlm.app)

stemLM is a structured learning overlay for STEM students. It works alongside AI chatbots (ChatGPT, Gemini, Claude) to deliver curriculum-aligned, step-by-step solutions -- so you get the missing intermediate steps, not just the final answer.

Now in **private beta**. Free forever during beta.

---

## The Problem

AI gives you answers, but skips the 3-4 intermediate steps where you actually get stuck:

- No domain-specific structure -- circuits need different layouts than calculus proofs
- Solutions disappear into chat history with nothing to revise from
- You copy the answer but still can't explain the method

## How It Works

1. **Ask your question** in ChatGPT, Claude, or Gemini as you normally would
2. **Click the stemLM button** before sending
3. **stemLM maps your question** to a specific topic, chapter, and subtopic using a unique taxonomy key (e.g. `STEM-PHY-03-07-02`)
4. **Get a structured solution** in a side panel with step-by-step breakdowns, formulas, diagrams, and verification steps

## Key Features

- **Step-by-step solutions** -- every intermediate step is shown, not skipped
- **Curriculum-aligned frameworks** -- solutions follow the exact methodology your course expects
- **Works with your existing AI tools** -- ChatGPT, Gemini, and Claude supported
- **Unique taxonomy system** -- every STEM topic has a globally unique key across Physics, Chemistry, Math, Biology, CS, Electronics, Mechanical, and Civil Engineering
- **Workspace demo** -- try interactive guided walkthroughs at [stemlm.app/workspace](https://www.stemlm.app/workspace)

## Subjects Covered

Physics | Chemistry | Mathematics | Biology | Computer Science | Electronics | Mechanical Engineering | Civil Engineering

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | React, Tailwind CSS |
| Fonts | Inter, JetBrains Mono, Geist |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/stemLM.git
cd stemLM

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
stemLM/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Landing page
│   ├── workspace/        # Interactive demo workspace
│   ├── database/         # Taxonomy browser
│   ├── privacy/          # Privacy policy
│   ├── terms/            # Terms of service
│   └── api/              # API routes
├── components/           # React components
├── lib/                  # Design tokens, site data
├── data/                 # Taxonomy data
└── hooks/                # Custom React hooks
```

---

## Co-founders

- **Chaitanya Prabuddha**
- **Rohit Gupta**
- **Abhishek**

## License

All rights reserved.
