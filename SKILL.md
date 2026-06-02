---
name: ajinkya-portfolio-design-system
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards for Ajinkya's personal developer portfolio. Use when creating or updating UI rules, component specifications, or design-system documentation for the portfolio site.
---

<!-- PORTFOLIO_DS_MANAGED_START -->

# Ajinkya Furange — Portfolio Design System

## Mission
Deliver implementation-ready design-system guidance for a developer portfolio that communicates technical excellence, bold ambition, and creative engineering — inspired by the editorial brutalism of grids.obys.agency.

## Brand
- Product/brand: Ajinkya Furange — Portfolio
- Owner: Ajinkya Furange (Computer Engineering, Mumbai)
- Audience: Recruiters, hiring managers, fellow engineers, AI/ML community
- Product surface: Personal portfolio / single-page application
- Positioning: Confident, technically sharp, creatively distinct — not another template portfolio

## Style Foundations
- Visual style: Editorial brutalism — dark, stark, typographically dominant, grid-disciplined
- Aesthetic direction: High-contrast black canvas with oversized display type; sparse color accent; structured yet kinetic layout
- Main font family: `font.family.display=Space Mono` (headers, hero, labels) / `font.family.body=DM Mono` (body, code, metadata)
- Font size base: `font.size.base=10px`
- Font weight base: `font.weight.base=400`
- Line height base: `font.lineHeight.base=1.3`

### Typography Scale
| Token | Value | Usage |
|---|---|---|
| `font.size.nano` | 10px | Labels, tags, metadata |
| `font.size.xs` | 12px | Captions, timestamps |
| `font.size.sm` | 14px | Body text, descriptions |
| `font.size.md` | 16px | Card text, nav items |
| `font.size.lg` | 24px | Section subtitles |
| `font.size.xl` | 48px | Section titles |
| `font.size.2xl` | 96px | Hero line 2 |
| `font.size.3xl` | 160px | Hero line 1 (name, clipped) |

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `color.surface.base` | `#080808` | Page background |
| `color.surface.card` | `#111111` | Card/panel backgrounds |
| `color.surface.overlay` | `#161616` | Hover overlays, modals |
| `color.border.default` | `#2a2a2a` | Grid lines, dividers |
| `color.border.active` | `#ffffff` | Active/focused borders |
| `color.text.primary` | `#f0f0f0` | Primary body text |
| `color.text.secondary` | `#888888` | Meta, captions, labels |
| `color.text.inverse` | `#080808` | Text on accent bg |
| `color.accent.primary` | `#c8f135` | CTAs, highlights, cursor dot |
| `color.accent.secondary` | `#ffffff` | High-emphasis elements |
| `color.accent.dim` | `#c8f13520` | Hover fill, subtle glow |

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
| `motion.duration.instant` | 80ms | Micro-feedback |
| `motion.duration.fast` | 200ms | State transitions |
| `motion.duration.base` | 400ms | Component enters |
| `motion.duration.slow` | 700ms | Page transitions, reveals |
| `motion.duration.crawl` | 1200ms | Hero entrance stagger |
| `motion.ease.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | All reveals |
| `motion.ease.inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | Hover transitions |

### Layout Tokens
| Token | Value |
|---|---|
| `layout.grid.columns` | 12 |
| `layout.grid.gutter` | 24px (desktop) / 16px (mobile) |
| `layout.maxWidth` | 1440px |
| `layout.section.paddingY` | 96px (desktop) / 48px (mobile) |

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required on all interactive elements
- Focus-visible rules required — use `outline: 2px solid color.accent.primary` at `2px` offset
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- All animations must respect `prefers-reduced-motion`

## Writing Tone
Terse, technical, confident. No filler words. Numbers and results over adjectives.
Examples:
- ✅ "1st Place — Microsoft AI Agent Sprint, Mumbai 2024"
- ✅ "Built RAG pipeline. Reduced query latency by 40%."
- ❌ "A passionate developer with a love for building innovative solutions."

## Rules: Do
- Use semantic tokens, not raw hex values in all component guidance.
- Every component must define states: `default`, `hover`, `focus-visible`, `active`, `disabled`.
- Responsive behavior must be specified — design desktop-first, then compress to mobile.
- Accessibility acceptance criteria must be testable in implementation.
- Animations must enhance scannability, not distract from content.
- Oversized type is a layout element — treat large headings as visual architecture.
- Grid lines (`color.border.default`) are structural — use them as visible separators to reinforce the grid aesthetic.

## Rules: Don't
- Do not use purple gradients, rounded hero cards, or pastel color schemes.
- Do not use Inter, Roboto, Poppins, or any generic system-UI font.
- Do not use shadows as the primary depth mechanism — use contrast and borders.
- Do not introduce one-off spacing values outside the spacing scale.
- Do not ship any component without explicit state rules for focus-visible.
- Do not center-align body copy blocks.
- Do not use decorative icons as substitutes for clear text labels.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, edge-case handling, and responsive notes.
6. End with a QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior for all interactive components
- Include spacing and typography token requirements
- Include long-content, overflow, and empty-state handling
- Include known page component density: project cards (6–8), skill tags (20+), nav links (4–5), CTAs (2)

## Quality Gates
- Every non-negotiable rule must use "must"
- Every recommendation should use "should"
- Every accessibility rule must be testable in implementation
- Prefer system consistency over local visual exceptions
- Every motion effect must have a `prefers-reduced-motion` fallback

<!-- PORTFOLIO_DS_MANAGED_END -->
