# Motion Review — Service for Life Care

> **Review type:** Design Taste / UI/UX / Motion / Accessibility / Performance
> **Date:** 2026-10-02
> **Reviewer:** Motion implementation audit against spec

---

## Component Review Matrix

| Component | Animation | Purpose | Duration | Easing / Spring | Reduced Motion | Performance | Status |
|---|---|---|---|---|---|---|---|
| `MobileNav.tsx` | Overlay: opacity 0→1. Panel: x 100%→0 spring slide | Communicate open/close state. Make interaction understandable | 0.2s overlay / spring (damping 25, stiffness 200) | spring | `duration: 0` / no x-transform | Compositor: transform+opacity only | ✅ PASS |
| `AnimatedHero.tsx` | Stagger container: `staggerChildren: 0.2s` | Guide attention through hero hierarchy | 0.6s per child | `[0.4, 0, 0.2, 1]` ease | Static `<div>` fallback | transform+opacity only | ✅ PASS |
| `AnimatedHeroItem.tsx` | `opacity 0→1, y 15→0` | Establish headline → text → CTA entry sequence | 0.6s | `[0.4, 0, 0.2, 1]` ease | Static `<div>` fallback | transform+opacity only | ✅ PASS |
| `AnimatedSection.tsx` | `whileInView` fadeUp or fade | Section entrance to reward scroll, preserve spatial continuity | 0.4s | `[0.0, 0, 0.2, 1]` ease-enter | Static `<section>` fallback | viewport-gated, once:true | ✅ PASS |
| `AnimatedCard.tsx` | Scroll: opacity+y reveal. Hover: y -4px spring | Interaction feedback; communicate clickability | 0.4s reveal / spring hover | spring (stiffness 100, damping 20) | Static `<div>` fallback | transform+opacity only | ✅ PASS |
| `AnimatedFormAlert.tsx` | `AnimatePresence` height 0→auto + opacity 0→1 | Form state feedback: error/success messaging | 0.3s | `[0.4, 0, 0.2, 1]` ease | Instant static show/hide | Height animation (short duration, acceptable) | ✅ PASS |
| `AnimatedButton.tsx` | `whileTap scale 0.98` | Press/click confirmation micro-interaction | 0.1s | default | `whileTap: undefined` | Compositor-only | ✅ PASS |
| `layout.tsx` | `MotionConfig reducedMotion="user"` | Global OS-level prefers-reduced-motion guard | N/A | N/A | Automatically disables across all components | None | ✅ PASS |

---

## Before / After Summary

### MobileNav
- **Before:** Menu opened instantly with no animation. Abrupt state change.
- **After:** Backdrop fades in (0.2s), panel slides from right via spring. Exit reverses.
- **Why:** State changes (open/close) benefit from motion to communicate what happened.
- **Accessibility impact:** Positive — `aria-expanded` maintained. Focus remains manageable. Reduced-motion path instant.
- **Performance impact:** Neutral — compositor-only animation.

### Hero Section
- **Before:** All content appeared simultaneously on load. No visual hierarchy.
- **After:** Sequential stagger: headline → supporting text → CTAs. 0.2s intervals. Editorial feel.
- **Why:** Guides the eye through the hierarchy, establishing the page narrative.
- **Accessibility impact:** Positive — content all in DOM, not hidden from screen readers. Reduced-motion path renders instantly.
- **Performance impact:** Neutral — no layout triggers.

### Service Cards
- **Before:** Static CSS shadow hover. Generic feeling.
- **After:** Scroll entrance (opacity+y), subtle hover elevation (y -4px spring).
- **Why:** Communicates interactivity. Mild spring elevation signals "this is clickable and responds to you".
- **Accessibility impact:** Neutral — hover animation is decoration only. Content always accessible.
- **Performance impact:** Neutral — compositor-friendly `transform: translateY`.

### Form Alerts
- **Before:** Errors / success messages appeared instantly. Jarring in healthcare context.
- **After:** Gentle height/opacity reveal. Exit smoothly collapses.
- **Why:** State-change feedback should feel calm and clear in a care environment.
- **Accessibility impact:** Positive — `role="alert"` and `aria-live="polite"` maintained. Screen readers get the message regardless.
- **Performance impact:** Minor — height animation (short, 0.3s). Accepted for UX value.

---

## Design Taste Assessment

| Dimension | Rating | Notes |
|---|---|---|
| Visual rhythm | ✅ Good | Consistent stagger timing across all reveal animations |
| Motion rhythm | ✅ Good | Short durations (0.2–0.6s). Nothing lingers. |
| Consistency | ✅ Good | All animations draw from `src/lib/motion.ts` tokens |
| Accessibility | ✅ Good | Dual-guard: `MotionConfig reducedMotion="user"` + per-component `useReducedMotion` |
| Performance | ✅ Good | No layout-triggering animations detected. Transform+opacity prioritised. |
| Professionalism | ✅ Good | Motion feels gentle, human, trustworthy. Appropriate for care brand. |
| Density | ✅ Good | High quality, low quantity. Only meaningful interactions animated. |

---

## Accessibility Review

| Requirement | Status |
|---|---|
| `prefers-reduced-motion` respected | ✅ Via `MotionConfig` + `useReducedMotion` |
| Keyboard navigation unaffected | ✅ All focus states intact |
| Screen reader content always in DOM | ✅ Content not hidden by animation |
| `aria-expanded` on mobile nav | ✅ Present in `MobileNav.tsx` |
| `role="alert"` on form alerts | ✅ Present in `AnimatedFormAlert.tsx` |
| `aria-live="polite"` on form alerts | ✅ Present in `AnimatedFormAlert.tsx` |
| Hover-only functionality | ✅ None — all interactions work without hover |
| Touch device compatibility | ✅ `whileTap` works on touch. No hover-only patterns. |

---

## MotionScore (Manual Equivalent)

MotionScore is not available as an automated CLI tool in this environment. Manual equivalent analysis:

| Metric | Assessment |
|---|---|
| Render cost | Low — all animations use `transform` and `opacity`. Compositor-handled. |
| Layout triggering | Acceptable — `AnimatedFormAlert` height expansion is the only layout-triggering animation, mitigated by short duration (0.3s) and infrequency (form submit only). |
| Compositor behaviour | ✅ All scroll/hover/entry animations are compositor-friendly |
| Animation frequency | Low — no continuous/looping animations. Entry plays once, hover responds to interaction only. |
| Performance risk | None detected |

---

## Issues Found and Resolved

1. **Missing `MotionConfig reducedMotion="user"`** — Found in `layout.tsx`. Fixed in this session.
2. **`motion-audit.md` implementation statuses** — All were "Pending" despite completed work. Updated to reflect actual status.
3. **`motion-review.md`** — Did not exist. Created now.

---

## Remaining Concerns

- `docs/motion-final-report.md` needs to be updated with actual build results once `npm run build` is verified.
- The `about` and `services` pages are minimal stubs (client-confirmed content pending). Animation can be added when those pages are fully built.
