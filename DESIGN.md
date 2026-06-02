# Ajinkya Furange — Portfolio Design System

## Mission
Create an implementation-ready, token-driven portfolio that feels like a design artifact in itself — editorial, brutalist, technically uncompromising — built to make recruiters and engineers remember the work, not the template.

---

## Brand
- **Product/brand:** Ajinkya Furange — Portfolio
- **URL:** ajinkyafurange.dev (or custom domain)
- **Audience:** Technical recruiters, hiring managers at AI/SaaS companies, peer engineers
- **Product surface:** Single-page portfolio / personal site
- **Tone positioning:** Earned confidence. Results-driven. Zero fluff.

---

## Style Foundations

- **Visual style:** Editorial brutalism — dark canvas, typographically dominant, grid-disciplined, kinetic on scroll
- **Inspiration:** grids.obys.agency — large structured type, stark contrast, visible grid lines, controlled motion
- **Main font stack:**
  - Display / headings: `font.family.display=Space Mono`
  - Body / metadata: `font.family.body=DM Mono`
  - Fallback: `monospace`
- **Base type:** `font.size.base=10px`, `font.weight.base=400`, `font.lineHeight.base=1.3`

### Typography Scale

| Token | Value | Use Case |
|---|---|---|
| `font.size.nano` | 10px | Tags, index numbers, metadata |
| `font.size.xs` | 12px | Timestamps, captions |
| `font.size.sm` | 14px | Body paragraphs, descriptions |
| `font.size.md` | 16px | Card bodies, nav items |
| `font.size.lg` | 24px | Section subtitles, card titles |
| `font.size.xl` | 48px | Section headings |
| `font.size.2xl` | 96px | Hero secondary line |
| `font.size.3xl` | 160px | Hero name — oversized, clipped or full |

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `color.surface.base` | `#080808` | Canvas / page background |
| `color.surface.card` | `#111111` | Project card, panel bg |
| `color.surface.overlay` | `#161616` | Hover state fill, drawer bg |
| `color.border.default` | `#2a2a2a` | Grid lines, section dividers |
| `color.border.active` | `#ffffff` | Focused / active element border |
| `color.text.primary` | `#f0f0f0` | Body text, card text |
| `color.text.secondary` | `#888888` | Metadata, labels, timestamps |
| `color.text.inverse` | `#080808` | Text on accent background |
| `color.accent.primary` | `#c8f135` | CTA buttons, cursor dot, hover lines |
| `color.accent.secondary` | `#ffffff` | High-emphasis labels |
| `color.accent.dim` | `#c8f13520` | Subtle hover fills, glows |

> **Extraction note:** Palette is intentionally low-diversity. The accent (`#c8f135`) is the single active color — avoid introducing additional hues.

### Spacing Scale

| Token | Value |
|---|---|
| `space.1` | 4px |
| `space.2` | 8px |
| `space.3` | 12px |
| `space.4` | 16px |
| `space.6` | 24px |
| `space.8` | 32px |
| `space.12` | 48px |
| `space.16` | 64px |
| `space.24` | 96px |
| `space.32` | 128px |

### Motion Tokens

| Token | Value | Usage |
|---|---|---|
| `motion.duration.instant` | 80ms | Button feedback, tag hover |
| `motion.duration.fast` | 200ms | Border color, text color transitions |
| `motion.duration.base` | 400ms | Card reveal, nav fade |
| `motion.duration.slow` | 700ms | Section entrance |
| `motion.duration.crawl` | 1200ms | Hero stagger sequence |
| `motion.ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | All scroll reveals |
| `motion.ease.inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | Hover transitions |

### Layout

| Token | Value |
|---|---|
| `layout.grid.columns` | 12 |
| `layout.grid.gutter` | 24px (desktop) / 16px (mobile) |
| `layout.maxWidth` | 1440px |
| `layout.section.paddingY` | 96px desktop / 48px mobile |

---

## Accessibility

- **Target:** WCAG 2.2 AA minimum
- Keyboard-first interactions required on all interactive elements
- Focus-visible: `outline: 2px solid color.accent.primary; outline-offset: 2px`
- Contrast minimum: 4.5:1 body text, 3:1 large/display text
- All CSS animations and transitions must include `@media (prefers-reduced-motion: reduce)` fallbacks
- Skip-to-content link must be the first focusable element on every page

---

## Page Architecture

### Sections (in order)
1. **Hero** — Full-viewport; oversized name (3xl); role/tagline at md; two CTAs; noise texture overlay; scroll indicator
2. **About** — Two-column grid; left: short bio (3–4 lines max); right: skill constellation or tag cloud
3. **Projects** — Grid of project cards (6–8); filterable by tag; each card: title, stack tags, one-line result, hover reveals CTA
4. **Achievements** — Numbered list or editorial table; 1st Place Microsoft AI Sprint, VJTI Top 10, certifications
5. **Experience / Timeline** — Horizontal or vertical timeline; internship entries; each: role, company, duration, 2–3 bullet results
6. **Contact** — Minimal form or direct links row; email, GitHub, LinkedIn; one bold CTA line

---

## Component Rules

### Hero
- **Intent:** Create instant recognition and brand authority in under 3 seconds.
- Name must render at `font.size.3xl` (160px desktop) using `font.family.display`
- Role label must render in `font.size.md` with `color.text.secondary`, uppercase, letter-spacing `0.15em`
- Background: `color.surface.base` with SVG grain noise overlay at 3–5% opacity
- CTAs: one filled (accent), one outlined (white border); see Button rules below
- Entrance animation: stagger name → role → CTAs over `motion.duration.crawl`; respect `prefers-reduced-motion`
- Custom cursor: 8px dot in `color.accent.primary`; 40px ring that follows with 120ms lag

### Navigation
- **Intent:** Persistent orientation anchor; never compete with content.
- Fixed to top; full-width; `color.surface.base` background at 95% opacity with `backdrop-filter: blur(8px)`
- Height: 56px desktop / 48px mobile
- Logo / name: left-aligned, `font.size.md`, `font.family.display`
- Nav links: right-aligned, `font.size.sm`, uppercase, `letter-spacing: 0.1em`
- Active state: underline in `color.accent.primary`, 1px, full width
- Hover state: color transitions to `color.text.primary` from `color.text.secondary` in `motion.duration.fast`
- Mobile: hamburger icon; full-screen overlay nav; links stagger-reveal on open
- Keyboard: all links must be reachable via Tab; Enter/Space activates; Escape closes mobile overlay

**States:**
| State | Style |
|---|---|
| Default | `color.text.secondary` |
| Hover | `color.text.primary` |
| Active / current | `color.accent.primary` underline |
| Focus-visible | `outline: 2px solid color.accent.primary` |

### Project Card
- **Intent:** Communicate project value at a glance; invite exploration.
- Background: `color.surface.card`
- Border: `1px solid color.border.default`
- Padding: `space.8` (32px)
- Title: `font.size.lg`, `font.family.display`, `color.text.primary`
- Stack tags: inline chips, `font.size.nano`, uppercase, `color.text.secondary`, `border: 1px solid color.border.default`
- Result line: one sentence, `font.size.sm`, `color.text.secondary`, italic
- Hover state: border transitions to `color.accent.primary`; background transitions to `color.surface.overlay`; CTA arrow reveals with slide-in (`motion.duration.fast`)
- Focus-visible: `outline: 2px solid color.accent.primary; outline-offset: 2px`
- Empty state: placeholder card with dashed border; text "Coming soon"
- Overflow: title truncates at 2 lines with ellipsis; result line truncates at 1 line

**States:**
| State | Border | Background |
|---|---|---|
| Default | `color.border.default` | `color.surface.card` |
| Hover | `color.accent.primary` | `color.surface.overlay` |
| Focus-visible | `color.accent.primary` outline | `color.surface.overlay` |
| Active (click) | `color.border.active` | `color.surface.overlay` |

### Button
- **Intent:** Drive action — primary CTA or secondary navigation.

**Variants:**
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary (filled) | `color.accent.primary` | `color.text.inverse` | none |
| Secondary (outline) | transparent | `color.text.primary` | `1px solid color.border.active` |
| Ghost | transparent | `color.text.secondary` | none |
| Disabled | `color.border.default` | `color.text.secondary` | none |

- Height: 44px; padding: `space.4 space.8` (16px 32px)
- Font: `font.size.sm`, `font.family.display`, uppercase, `letter-spacing: 0.08em`
- Transition: background + color in `motion.duration.fast` with `motion.ease.inout`
- Hover (primary): darken accent by 10%; translate Y by -1px
- Focus-visible: `outline: 2px solid color.accent.primary; outline-offset: 3px`
- Disabled: `cursor: not-allowed`; pointer events none
- Minimum touch target: 44×44px

### Skill / Stack Tag
- **Intent:** Communicate technical breadth at a glance.
- Inline or wrapping pill; `font.size.nano`, uppercase, `letter-spacing: 0.1em`
- Border: `1px solid color.border.default`
- Background: transparent (default), `color.accent.dim` (hover)
- Padding: `space.1 space.3` (4px 12px)
- Transition: background in `motion.duration.instant`
- Tags must not truncate — allow wrapping

### Section Heading
- **Intent:** Orient the reader immediately.
- Index number (01, 02…): `font.size.nano`, `color.text.secondary`, left of heading, `space.4` gap
- Heading text: `font.size.xl`, `font.family.display`, `color.text.primary`, uppercase
- Underline rule: `1px solid color.border.default`, full section width, below heading
- Top padding before heading: `space.24` (96px)

### Achievements / Table Row
- **Intent:** Prove credentials without prose.
- Tabular layout; left: index / year; center: achievement title; right: context / location
- Font: `font.size.sm`, `font.family.body`
- Row border-bottom: `1px solid color.border.default`
- Hover: row background transitions to `color.surface.overlay`
- Accent row (1st place, top honors): title in `color.accent.primary`

### Contact Section
- **Intent:** Remove all friction from reaching out.
- Large call-to-action headline: `font.size.2xl`, e.g. "Let's build something."
- Links row: email, GitHub, LinkedIn — horizontal, `font.size.sm`, `color.text.secondary`
- Hover: link color transitions to `color.accent.primary` with 1px underline
- No contact form required; direct link to mailto: is preferred
- Social icons: use text labels, not icon-only (accessibility)

---

## Writing Tone

Terse, technical, confident. Numbers over adjectives. Results over descriptions.

| ✅ Use | ❌ Avoid |
|---|---|
| "1st Place — Microsoft AI Agent Sprint" | "Award-winning developer" |
| "RAG pipeline — 40% latency reduction" | "Passionate about AI innovation" |
| "Azure AI Agent Service, Node.js, GSAP" | "Experienced with modern tech stacks" |
| "Top 10 nationally — VJTI ML Challenge" | "Proven track record of excellence" |

---

## Anti-Patterns and Prohibited Implementations

| Pattern | Reason |
|---|---|
| Purple-to-blue gradient hero | Generic AI portfolio trope |
| Rounded hero card with avatar photo | Template aesthetic |
| Inter / Roboto / Poppins fonts | Zero distinctiveness |
| Box shadows as primary depth mechanism | Doesn't fit dark brutalist aesthetic |
| Off-scale spacing (e.g., 20px, 36px) | Breaks grid rhythm |
| Hidden or absent focus indicators | WCAG failure |
| Centered body copy | Breaks reading flow on content-heavy screens |
| Animated elements without `prefers-reduced-motion` fallback | Accessibility violation |
| Skill section as circular radar charts | Misleading and visually weak |
| "Download Resume" as the only CTA | Missed conversion on other hire signals |

---

## Known Page Component Density
- Project cards: 6–8
- Skill/stack tags: 20–30
- Nav links: 4–5
- Primary CTA buttons: 2 (hero + contact)
- Achievement rows: 4–6
- Section headings: 6

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column; hero name drops to `font.size.xl`; nav becomes overlay |
| Tablet | 640px–1024px | 2-column project grid; hero name at `font.size.2xl` |
| Desktop | > 1024px | 3-column project grid; hero name at `font.size.3xl`; full layout |

---

## QA Checklist

### Visual
- [ ] All colors use semantic tokens — no raw hex in component code
- [ ] All spacing uses scale tokens — no arbitrary values
- [ ] All typography uses scale tokens and correct font families
- [ ] Accent color (`color.accent.primary`) appears on ≤3 elements per viewport
- [ ] Grid lines visible at all section breaks
- [ ] Hero name renders at correct scale on all three breakpoints

### Interaction
- [ ] All hover states transition within `motion.duration.fast` (200ms)
- [ ] All reveal animations use `motion.ease.out`
- [ ] Custom cursor renders in `color.accent.primary`
- [ ] Scroll-triggered reveals fire correctly on all modern browsers

### Accessibility
- [ ] All interactive elements reachable via Tab
- [ ] All focus-visible states render 2px `color.accent.primary` outline
- [ ] Contrast ratios pass WCAG AA for all text/background combinations
- [ ] All animations disabled under `prefers-reduced-motion: reduce`
- [ ] Skip-to-content link is first focusable element
- [ ] No icon-only interactive elements without accessible labels

### Content
- [ ] Zero filler phrases ("passionate", "innovative", "solutions-oriented")
- [ ] Every project card includes a one-line result statement
- [ ] Every achievement includes year and context
- [ ] All external links open in `_blank` with `rel="noopener noreferrer"`

### Performance
- [ ] Fonts loaded via `font-display: swap`
- [ ] No layout shift (CLS) during font load
- [ ] Animation frames do not drop below 60fps on mid-range devices
- [ ] Images (if any) served as WebP with explicit width/height attributes
