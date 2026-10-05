# Design System: Service for Life Care

## Core Philosophy
- **Warm & Human:** Reflected in earthy/natural color tones, approachable typography, and curved but structured UI elements.
- **Premium & Professional:** High readability, generous whitespace, strong grid structures, and editorial layouts.
- **Accessible & Inclusive:** High contrast typography, clear focus states, and scalable font sizes.

## Typography
- **Primary (Headings):** `Outfit` (or a similar modern geometric sans-serif). Gives a friendly, contemporary feel.
- **Secondary (Body):** `Inter` or system sans-serif. Highly readable for long-form text and accessible at small sizes.
- **Scale:**
  - H1: 3rem (48px) - Bold, tight tracking
  - H2: 2.25rem (36px) - Semi-bold
  - H3: 1.5rem (24px) - Medium
  - Body: 1.125rem (18px) - Regular
  - Small: 0.875rem (14px) - Regular

## Color Palette
- **Primary Brand (Trust/Nature):**
  - Primary 500: `#2D5D4E` (Deep Natural Green)
  - Primary 50: `#F2F6F5` (Very light green for backgrounds)
- **Secondary/Accent (Warmth):**
  - Accent 500: `#D96C4E` (Restrained terracotta/coral)
- **Neutral (Surfaces & Text):**
  - Base White: `#FFFFFF`
  - Off-White Background: `#FAFAFA`
  - Text Primary: `#1E293B` (Deep Charcoal, not pure black)
  - Text Secondary: `#475569` (Muted Slate)

## Spacing & Grid
- Base scale of 4px (Tailwind default).
- Generous padding in sections (e.g., `py-16` or `py-24`).
- Max container width for editorial layout: `max-w-7xl` (1280px).

## Components

### Buttons
- **Primary:** Solid `#2D5D4E` background, white text, subtle hover state (slightly lighter/darker), `rounded-full` for approachability.
- **Secondary:** Outline with `#2D5D4E` border and text, transparent background.
- **Focus State:** 2px offset ring, color `#D96C4E`.

### Cards
- Clean, minimal borders (`border-gray-200`) or subtle drop shadows (`shadow-sm` on rest, `shadow-md` on hover).
- Generous internal padding (`p-6` or `p-8`).
- Rounded corners (`rounded-2xl`).

### Forms
- Large touch targets (minimum 44px height).
- Clear, visible borders (`border-gray-300`).
- Label positioned above input, bolded slightly.
- Distinct error states (red border and text) with aria-live announcements.

## Motion & Transitions
- Keep animations subtle.
- Use `transition-all duration-300 ease-in-out` for hover states.
- Respect `prefers-reduced-motion` at the CSS level.
