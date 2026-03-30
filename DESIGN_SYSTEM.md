# stemLM Design System

## Brand Identity

**Product name:** stemLM  
**Tagline:** Solve STEM problems the right way, every time  
**Audience:** Engineering and STEM students globally  
**Personality:** Precise. Structured. Intelligent. Clean. Trustworthy.  
**Positioning:** A structured thinking layer that sits on top of AI tools — not the AI itself, but the method.

---

## Logo

### Wordmark
- Text: `stemLM`
- Always lowercase `stem`, always uppercase `LM`
- Never write `StemLM`, `Stemlm`, `STEMLM`, or `stem lm`
- Font: Geist (weight 500)
- The `LM` portion uses the primary accent color `#0EA5A0`

### Icon Mark
- Concept: A minimal branching fork — one line splitting into two or three output lines
- Represents the core product structure: subject → chapter → topic → subtopic
- Must be readable at 16×16px (Chrome extension favicon)
- Renders in: primary teal on dark bg, dark bg on light surfaces
- SVG format only — no raster versions
- Never use: atoms, molecules, beakers, brains, circuit boards, gradients inside the mark

### Safe Space
- Always maintain padding of at least 1× the icon height around the logo
- Never place the logo on a busy or patterned background
- Never rotate, skew, outline, or add drop shadows to the logo

---

## Color System

### Base Palette (Dark-first — extension panel is always dark)

| Token name         | Hex       | Usage                                              |
|--------------------|-----------|----------------------------------------------------|
| `--color-bg`       | `#0C0C0F` | Page background, extension panel background        |
| `--color-surface`  | `#141418` | Cards, modals, sidebar panels                      |
| `--color-surface-2`| `#1A1A22` | Elevated cards, hover states on surfaces           |
| `--color-border`   | `#1E1E24` | All borders and dividers                           |
| `--color-border-2` | `#2A2A35` | Emphasized borders, active outlines                |

### Text

| Token name           | Hex       | Usage                                 |
|----------------------|-----------|---------------------------------------|
| `--color-text-1`     | `#F0F0F2` | Primary text, headings                |
| `--color-text-2`     | `#8A8A9A` | Secondary text, labels, captions      |
| `--color-text-3`     | `#4A4A5A` | Disabled, placeholder, hint text      |

### Accent Colors

| Token name             | Hex       | Usage                                                        |
|------------------------|-----------|--------------------------------------------------------------|
| `--color-accent`       | `#0EA5A0` | Primary CTA buttons, links, active nav, logo `LM`, key tags |
| `--color-accent-hover` | `#0D9490` | Hover state of accent                                        |
| `--color-accent-dim`   | `#0EA5A015`| Accent background tint (badges, selected rows)              |
| `--color-amber`        | `#F59E0B` | Highlighted steps, formula callouts, "insight" moments only  |
| `--color-amber-dim`    | `#F59E0B15`| Amber background tint                                       |

### Semantic Colors

| Token name          | Hex       | Usage                          |
|---------------------|-----------|--------------------------------|
| `--color-success`   | `#22C55E` | Correct answers, completed steps|
| `--color-warning`   | `#F59E0B` | Caution states                 |
| `--color-error`     | `#EF4444` | Errors, wrong answers          |

### Website Light Mode (landing page only)

| Token name              | Hex       | Usage                        |
|-------------------------|-----------|------------------------------|
| `--color-bg-light`      | `#F8F9FC` | Page background              |
| `--color-surface-light` | `#FFFFFF` | Cards                        |
| `--color-border-light`  | `#E2E8F0` | Borders                      |
| `--color-text-1-light`  | `#0F1117` | Primary text                 |
| `--color-text-2-light`  | `#64748B` | Secondary text               |

### Color Rules
- NEVER use more than 2 accent colors on any single screen
- Amber is for annotation only — never use it for buttons or navigation
- Never use pure `#000000` or `#FFFFFF` — always use the token values above
- Never add gradients to backgrounds, buttons, or cards
- The accent `#0EA5A0` is teal — do not substitute with blue or green

---

## Typography

### Font Stack

| Role        | Font           | Weight(s)   | Fallback              |
|-------------|----------------|-------------|------------------------|
| Wordmark    | Geist          | 500         | Inter, sans-serif      |
| UI / Body   | Inter          | 400, 500    | system-ui, sans-serif  |
| Monospace   | JetBrains Mono | 400         | 'Courier New', monospace|

All three are free and open source. Import from Google Fonts or Fontsource (npm packages preferred for Next.js).

### Font Size Scale

| Token         | Size  | Line height | Usage                              |
|---------------|-------|-------------|-------------------------------------|
| `--text-xs`   | 11px  | 1.5         | Badges, key labels, metadata        |
| `--text-sm`   | 13px  | 1.6         | Captions, secondary content         |
| `--text-base` | 15px  | 1.7         | Body text, step descriptions        |
| `--text-lg`   | 18px  | 1.5         | Card titles, section subheadings    |
| `--text-xl`   | 22px  | 1.3         | Section headings                    |
| `--text-2xl`  | 28px  | 1.25        | Page headings                       |
| `--text-3xl`  | 36px  | 1.15        | Hero headline (desktop)             |
| `--text-4xl`  | 48px  | 1.1         | Hero headline large breakpoint      |

### Weight Rules
- Use 400 for all body text
- Use 500 for headings, labels, button text, wordmark
- NEVER use 600, 700, or 800 — they look too heavy against the dark background
- NEVER use italic except for mathematical variables in formulas

### Typography Rules
- Sentence case everywhere — never Title Case except for the `stemLM` wordmark itself
- Letter-spacing: `-0.3px` on headings 22px and above, `0` on body
- Paragraph max-width: `640px` for reading comfort
- Monospace font is ONLY for: taxonomy keys (`STEM-PHY-03-07-02`), inline code, formula tokens

---

## Spacing System

Base unit: `4px`

| Token       | Value | Usage                                 |
|-------------|-------|---------------------------------------|
| `--space-1` | 4px   | Tight gaps (icon + label)             |
| `--space-2` | 8px   | Internal component padding (compact)  |
| `--space-3` | 12px  | Standard internal padding             |
| `--space-4` | 16px  | Card padding, list item spacing       |
| `--space-5` | 20px  | Section internal spacing              |
| `--space-6` | 24px  | Between components                    |
| `--space-8` | 32px  | Section gaps                          |
| `--space-10`| 40px  | Large section spacing                 |
| `--space-12`| 48px  | Page horizontal padding               |
| `--space-16`| 64px  | Section vertical padding              |
| `--space-20`| 80px  | Hero vertical padding                 |

---

## Border Radius

| Token        | Value | Usage                              |
|--------------|-------|------------------------------------|
| `--radius-sm`| 6px   | Badges, pills, small chips         |
| `--radius-md`| 10px  | Buttons, inputs, small cards       |
| `--radius-lg`| 14px  | Cards, panels, modals              |
| `--radius-xl`| 20px  | Large cards, CTA sections          |

---

## Component Patterns

### Buttons

**Primary button:**
- Background: `--color-accent`
- Text: white, 500 weight, 14px
- Padding: 10px 20px
- Radius: `--radius-md`
- Hover: `--color-accent-hover`
- No box shadows, no gradients

**Secondary button:**
- Background: transparent
- Border: 0.5px solid `--color-border-2`
- Text: `--color-text-2`, 14px
- Hover: background `--color-surface-2`

**Ghost button:**
- No background, no border
- Text: `--color-text-2`
- Hover: text becomes `--color-text-1`

### Cards
- Background: `--color-surface`
- Border: 0.5px solid `--color-border`
- Radius: `--radius-lg`
- Padding: 20px 24px
- No drop shadows

### Inputs
- Background: `--color-surface`
- Border: 0.5px solid `--color-border`
- Radius: `--radius-md`
- Padding: 10px 14px
- Font size: 14px
- Focus ring: 1.5px solid `--color-accent`
- No box shadow

### Badges / Tags
- Background: `--color-accent-dim`
- Text: `--color-accent`, 11px, weight 500
- Padding: 3px 8px
- Radius: `--radius-sm`
- For taxonomy keys: use monospace font

### Step items (extension panel)
- Step number circle: 20px diameter, background `--color-accent-dim`, text `--color-accent`
- Step title: 13px, weight 500, `--color-text-1`
- Step body: 13px, weight 400, `--color-text-2`
- Vertical connector: 1px dashed `--color-border-2`

---

## Icon Style
- Use Lucide icons exclusively (already in the project as `lucide-react`)
- Size: 16px for inline/UI icons, 20px for nav, 24px for feature icons
- Stroke width: 1.5px always
- Color: inherit from text color token, never hardcoded

---

## Animation
- Duration: 150ms for micro (hover, focus), 250ms for transitions, 350ms for page elements
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (standard), `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Never animate color, width, or height — only transform and opacity
- Always wrap in `@media (prefers-reduced-motion: no-preference)`

---

## What to NEVER do
- No gradients anywhere (backgrounds, buttons, text, borders)
- No box shadows (except 0 0 0 Npx focus rings)
- No emojis in UI (use Lucide icons)
- No ALL CAPS text (except taxonomy key display)
- No rounded corners on border-left/right only accents
- No pure black or pure white — use tokens
- No more than 2 accent colors per screen
- No fonts other than Inter, Geist, JetBrains Mono
- No color outside the defined palette
- No font weights other than 400 and 500
