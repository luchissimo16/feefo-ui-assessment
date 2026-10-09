# Feefo Product Rating Card

React/TypeScript implementation of the Feefo Product Rating card for the technical assessment.

## Stack

React, TypeScript, Vite, Vitest, React Testing Library, CSS Modules.

## Setup

```bash
npm install
npm run dev
```


## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | Lint with oxlint |

## Design notes

- Review counts drive bar widths (`count / totalReviews`); the average is derived, not hard-coded.
- Component tree: `ProductRatingCard` → `RatingSummary` / `ProductRatingBrand` / `RatingDistribution`.
- Stars are SVG tiles with fractional fill; styling uses CSS Modules and shared CSS variables.
- Semantic HTML and visually hidden text support screen readers; decorative stars are `aria-hidden`.

## Assumptions

- Presentational card only — no interactive ratings, filters, or tooltips.
- Distribution is always normalised to 5→1; missing categories get `count: 0`.
- Qualitative labels use simple bands (e.g. ≥ 4.5 → `EXCELLENT`).
- Brand lock-up is a local text + mark recreation (no official logo asset was provided).
