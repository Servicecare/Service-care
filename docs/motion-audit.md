# Motion Audit — Service for Life Care

> **Last updated:** 2026-10-02
> **Status:** Implementation complete. MotionConfig global guard applied.

---

## 1. Header / Navigation

- **Current behaviour:** Static CSS layout with `hover:text-accent-500` and background blur. Mobile menu previously opened instantly.
- **Problem:** Abrupt mobile menu open/close. No interaction continuity.
- **Animation opportunity:** Soft AnimatePresence fade + spring slide-in for mobile menu panel.
- **Recommended motion:** Opacity fade for overlay, x-axis spring slide for panel.
- **Purpose:** Make mobile interaction understandable and communicate state change clearly.
- **Reduced-motion behaviour:** `shouldReduceMotion` check: instant open with `duration: 0` transition, no x-transform.
- **Performance concern:** Backdrop-blur kept static (not animated). Only opacity and transform animated.
- **Implementation status:** ✅ **Complete** — `MobileNav.tsx` with `AnimatePresence`, spring slide, reduced-motion guard.

---

## 2. Hero Section

- **Current behaviour:** Appeared instantly on load with no entry hierarchy.
- **Problem:** Eye not guided through headline → text → CTA progression.
- **Animation opportunity:** Restrained stagger entrance sequence.
- **Recommended motion:** Headline fades up 15px → supporting text → CTA row. Short durations (0.4–0.6s).
- **Purpose:** Establish hierarchy. Guide attention down the page organically.
- **Reduced-motion behaviour:** `shouldReduceMotion` returns static div — no transform, no stagger.
- **Performance concern:** Transform and opacity only. No layout triggers.
- **Implementation status:** ✅ **Complete** — `AnimatedHero.tsx` + `AnimatedHeroItem.tsx` with stagger variants.

---

## 3. Trust Section

- **Current behaviour:** Static row of NDIS/location badges.
- **Problem:** Could feel disconnected from scroll entry.
- **Animation opportunity:** `whileInView` opacity fade on scroll.
- **Recommended motion:** `AnimatedSection type="fade"` — short opacity transition on viewport entry.
- **Purpose:** Provide subtle feedback that the user entered a new content block.
- **Reduced-motion behaviour:** `shouldReduceMotion` returns static `<section>`.
- **Performance concern:** Low — opacity only.
- **Implementation status:** ✅ **Complete** — wrapped with `AnimatedSection type="fade"` in `page.tsx`.

---

## 4. Service Cards

- **Current behaviour:** Basic CSS `shadow-sm hover:shadow-md`. Generic interaction.
- **Problem:** Lacked premium feel; no visual clickability cue.
- **Animation opportunity:** Subtle elevation (y-offset) on hover, opacity/y entrance on scroll.
- **Recommended motion:** `whileInView opacity+y reveal`, `whileHover={{ y: -4 }}` spring.
- **Purpose:** Interaction feedback to communicate clickability. Establish card hierarchy.
- **Reduced-motion behaviour:** Returns static `<div>` — standard CSS hover applies.
- **Performance concern:** `transform: translateY` is compositor-friendly. No layout triggers.
- **Implementation status:** ✅ **Complete** — `AnimatedCard.tsx` used on all 3 service cards in `page.tsx`.

---

## 5. Care Approach & Community Access (Image/Text Sections)

- **Current behaviour:** Static layout. Long scroll felt monotonous.
- **Problem:** No entry feedback for new content blocks during scroll.
- **Animation opportunity:** Viewport-based `fadeUp` reveal on section entry.
- **Recommended motion:** `AnimatedSection type="fadeUp"` — content fades and shifts up 15px on viewport entry.
- **Purpose:** Preserve spatial continuity. Reward scrolling.
- **Reduced-motion behaviour:** Returns static `<section>`.
- **Performance concern:** `once: true` ensures no repeat animations. No image layout shift.
- **Implementation status:** ✅ **Complete** — both sections wrapped with `AnimatedSection` in `page.tsx`.

---

## 6. Referral CTA Section

- **Current behaviour:** Static background CTA block.
- **Problem:** Abrupt appearance at the bottom of the page.
- **Animation opportunity:** Fade in on viewport entry.
- **Recommended motion:** `AnimatedSection type="fade"` — simple opacity reveal.
- **Purpose:** Guide attention to the final conversion point.
- **Reduced-motion behaviour:** Static section.
- **Performance concern:** Low.
- **Implementation status:** ✅ **Complete** — wrapped with `AnimatedSection type="fade"` in `page.tsx`.

---

## 7. Forms (Contact & Referral)

- **Current behaviour:** Errors and success messages appeared instantly (jarring).
- **Problem:** Instant DOM insertions for alerts felt harsh in a healthcare context.
- **Animation opportunity:** `AnimatePresence` height/opacity reveal for errors. Opacity transition for success.
- **Recommended motion:** `AnimatedFormAlert` — height 0→auto + opacity 0→1 at 0.3s. Exit reverses.
- **Purpose:** Provide gentle state-change feedback. No violent shaking.
- **Reduced-motion behaviour:** Returns visible/hidden `<div>` instantly — no animation.
- **Performance concern:** Height animation mitigated by short duration (0.3s). Acceptable for feedback.
- **Implementation status:** ✅ **Complete** — `AnimatedFormAlert.tsx` used in both `ContactForm.tsx` and `ReferralForm.tsx`.

---

## 8. Buttons

- **Current behaviour:** Standard CSS `transition-all`. No press feedback.
- **Problem:** Basic web behaviour — no immediate tactile response.
- **Animation opportunity:** `whileTap={{ scale: 0.98 }}` micro-interaction.
- **Recommended motion:** Subtle scale reduction on press (0.98). Duration 0.1s.
- **Purpose:** Immediate touch/click feedback. Communicates "I registered your press".
- **Reduced-motion behaviour:** `whileTap` is `undefined` when `shouldReduceMotion` is true.
- **Performance concern:** None — compositor-handled.
- **Implementation status:** ✅ **Complete** — `AnimatedButton.tsx` used in both forms.

---

## 9. Footer

- **Current behaviour:** Static layout.
- **Problem:** None identified.
- **Animation opportunity:** None needed. Footer is a calm, closing section.
- **Recommended motion:** Keep static. CSS hover only.
- **Purpose:** Maintain calm closing section consistent with care brand.
- **Reduced-motion behaviour:** N/A — no Motion used.
- **Performance concern:** None.
- **Implementation status:** ✅ **Complete** (No Motion planned — correct decision).

---

## 10. Global Reduced Motion Guard

- **Implementation:** `MotionConfig reducedMotion="user"` added to `src/app/layout.tsx`.
- **Effect:** When OS `prefers-reduced-motion: reduce` is set, Motion automatically reduces all transitions.
- **Secondary guard:** All animated components also call `useReducedMotion()` and return static fallbacks.
- **Implementation status:** ✅ **Complete**.

---

## Intentionally Rejected

| Animation | Reason for Rejection |
|---|---|
| Scroll Parallax | Motion sickness risk. Heavy main-thread cost. Not appropriate for care audience. |
| Count-up Statistics | No real verified statistics available. Fake metrics not permitted. |
| Constant pulse / glow on CTAs | Creates false urgency. Not appropriate for healthcare context. |
| 3D card transforms | Overly theatrical. Contradicts brand tone (calm, trust, human). |
| Heavy image masking/clips | Adds complexity without meaningful UX value. |
| Celebratory confetti on form success | Inappropriate for care service context. |
| Paragraph-level scroll reveals | Animation density abuse. Only section-level reveals permitted. |
| Page transitions (route-level) | Risk of browser navigation interference. Delay perception. Not worth cost. |
