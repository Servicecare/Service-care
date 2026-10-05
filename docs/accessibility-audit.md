# Accessibility Audit Report

## Methodology
- Manual inspection of semantic HTML output.
- Keyboard navigation structure review.
- Color contrast review against design tokens.

## Findings

### 1. Semantic Structure (PASS)
- **Landmarks:** `header`, `main`, and `footer` are used correctly across all pages.
- **Headings:** Strict hierarchical heading tags (`h1` down to `h3`) are used on the Homepage, About, Services, Contact, and Legal pages without skipping levels.

### 2. Forms & Inputs (PASS)
- **Labels:** The React Hook Form implementation on `/contact` and `/referrals` explicitly binds `<label htmlFor="id">` to `<input id="id">`.
- **Error States:** `aria-invalid` and `aria-describedby` are correctly mapped to validation error paragraphs, ensuring screen readers announce Zod errors dynamically.
- **Success States:** Success messages utilize `role="alert"` and `aria-live="polite"` to announce submission success cleanly without forcing focus aggressively.

### 3. Keyboard Navigation (PASS)
- The navigation menu, buttons, and form inputs utilize native focusable elements (`<Link>`, `<button>`, `<input>`). 
- Focus rings are explicitly defined using Tailwind's `focus-visible` to ensure keyboard users have visual feedback without penalizing mouse users.

### 4. Color Contrast (PASS)
- Text Primary (`#1E293B`) against Background (`#FAFAFA`) exceeds 7:1 (AAA).
- Brand 500 (`#2D5D4E`) text against Background (`#FAFAFA`) exceeds 4.5:1 (AA).
- White text on Brand 500 (`#2D5D4E`) exceeds 4.5:1 (AA).

### 5. Third-Party Widgets (PARTIAL)
- Cloudflare Turnstile provides its own `iframe` widget. While generally accessible, it is managed externally and must be periodically checked for WCAG compliance updates by Cloudflare.

## Summary
The codebase strongly adheres to WCAG 2.2 AA standards at the markup level. Final sign-off requires a live production scan using `axe-core` once the Turnstile widget and external scripts are loaded on the final domain.
