# Responsive Layout System Rebuild

Goal: every section adapts fluidly to viewport — no fixed heights, no cramped/empty space, Zomato/Stripe-grade polish.

## Approach

Introduce a unified fluid layout system, then sweep every section to use it. No visual redesign — same look, just truly responsive.

### 1. Foundation (tokens + utilities)

Add to `src/index.css`:
- Fluid type scale via `clamp()`:
  - `--fs-display`: `clamp(2.25rem, 5vw + 1rem, 5.5rem)`
  - `--fs-h1`: `clamp(2rem, 3.5vw + 1rem, 4rem)`
  - `--fs-h2`: `clamp(1.5rem, 2vw + 1rem, 2.75rem)`
  - `--fs-h3`: `clamp(1.25rem, 1vw + 1rem, 1.75rem)`
  - `--fs-body`: `clamp(0.95rem, 0.4vw + 0.85rem, 1.125rem)`
  - `--fs-small`: `clamp(0.8rem, 0.2vw + 0.75rem, 0.9rem)`
- Fluid spacing:
  - `--space-section-y`: `clamp(3rem, 6vw, 7rem)`
  - `--space-section-x`: `clamp(1rem, 4vw, 4rem)`
  - `--space-gap`: `clamp(1rem, 2vw, 2.5rem)`
- Section min-height: `--section-min-h: min(100svh, 900px)` for hero only; other sections use content + padding.

Add utility classes:
- `.section-fluid` → `padding-block: var(--space-section-y); padding-inline: var(--space-section-x);`
- `.container-fluid` → `width: 100%; max-width: min(1400px, 95vw); margin-inline: auto;`
- `.text-display / .text-h1 / .text-h2 / .text-body` using the clamp tokens.

### 2. Tailwind config

Extend `tailwind.config.ts`:
- `fontSize`: `'fluid-display'`, `'fluid-h1'`, `'fluid-h2'`, `'fluid-h3'`, `'fluid-body'` mapped to the CSS vars.
- `spacing`: `'section-y'`, `'section-x'`, `'gap-fluid'`.
- `maxWidth`: `'fluid'` → `min(1400px, 95vw)`.

### 3. Section sweep

For each section component, replace:
- Fixed `py-24`, `py-32`, `min-h-screen` → `min-h-[60svh]` + `py-section-y`
- Fixed `px-4 md:px-8 lg:px-16` → `px-section-x`
- Hardcoded `text-4xl md:text-6xl lg:text-7xl` → `text-fluid-display` (or h1/h2 as appropriate)
- Fixed-width containers (`max-w-7xl`) → `max-w-fluid`
- Fixed image heights → aspect-ratio + `w-full h-auto object-cover`

Files to update:
- `src/components/Hero.tsx` — min-h-[88svh], fluid type, no fixed image heights
- `src/components/BrandShowcase.tsx`
- `src/components/sections/*` and `src/components/AudienceSection.tsx` (Features/About)
- `src/components/HowItWorks.tsx`
- `src/components/ScreenshotsSection.tsx` — keep coverflow config; only fix outer container padding + heading scale
- `src/components/OurWork.tsx`
- `src/components/DownloadAppSection.tsx` — already partially fluid; align to new tokens
- `src/components/Contact.tsx` (if present)
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx` — fluid horizontal padding

### 4. Image safety

Global rule in `index.css`:
```css
img, video { max-width: 100%; height: auto; display: block; }
```
(scoped so it doesn't break the coverflow card aspect ratios — those keep their explicit ratios).

### 5. Overflow guards

- `html, body { overflow-x: clip; }`
- Audit any `w-screen` usage → replace with `w-full`.

## Out of scope

- No color/typography/redesign changes.
- No content rewrites.
- Carousel behavior stays exactly as-is (only the wrapping section's padding/heading scale).
- No changes to routing or business logic.

## Verification

After edits, check the preview at 1920, 1366, 1024, 768, 414 widths — confirm no horizontal scroll, no cramped text, no oversized empty space.
