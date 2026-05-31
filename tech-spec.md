# Tech Spec — Harshil Sondagar Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.0 | UI framework |
| react-dom | ^18.3.0 | React DOM renderer |
| gsap | ^3.12.0 | Core animation engine, timelines, ScrollTrigger |
| locomotive-scroll | ^4.1.4 | Smooth scroll with parallax (v4.x for React compat) |
| three | ^0.160.0 | WebGL distortion effect on project images |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.3.0 | Vite React plugin |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| typescript | ^5.6.0 | Type checking |
| @types/react | ^18.3.0 | React type definitions |
| @types/react-dom | ^18.3.0 | React DOM type definitions |
| @types/three | ^0.160.0 | Three.js type definitions |

**Fonts** (loaded via Google Fonts `<link>` in `index.html`): Space Grotesk (300, 400, 500, 700), JetBrains Mono (400, 500). No npm font packages.

**Notably absent:** No shadcn/ui — this is a fully custom-designed portfolio with no standard UI patterns (no forms, dialogs, tables, dropdowns). All components are bespoke.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed header, scroll-aware background transition, mobile hamburger overlay. Scroll position tracked via Locomotive scroll event. |
| Footer | Custom | Shared footer with social links, back-to-top button, version stamp. |
| SmoothScrollProvider | Custom | Wrapper that initializes Locomotive Scroll, exposes instance via context for `scrollTo` calls. Handles resize refresh. |
| CustomCursor | Custom | Desktop-only fixed crosshair cursor. Hidden on touch devices. Separate from Locomotive. |
| AmbientDotCanvas | Custom | Fixed-position canvas with 60 drifting dots + mouse repulsion. Runs own rAF loop. Lives outside scroll container. |

### Sections

| Component | Source | Key Effects |
|-----------|--------|-------------|
| HeroSection | Custom | Character-level stagger reveal, video background, coordinate label mouse tracking, CSS-pulsing blueprint brackets |
| AboutSection | Custom | Line-level stagger reveal, portrait parallax, stat stagger |
| SkillsSection | Custom | Line-level stagger reveal, 6 StateRevealHover cards with staggered entrance |
| ExperienceSection | Custom | Line-level stagger reveal, 2 asymmetric blocks with image parallax, bullet point stagger |
| ProjectsSection | Custom | Line-level stagger reveal, 4 ProjectShowcase items with parallax + spotlight + optional Three.js distortion |
| EducationSection | Custom | Line-level stagger reveal, single card fade-in, CSS-pulsing CGPA pill |
| ContactSection | Custom | Word-level stagger reveal, StateRevealHover CTA with stacked contact links |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| StateRevealHover | Custom | Skills cards, Contact CTA | Pure CSS hover-driven horizontal wipe. No JS per instance. Mobile: tap-toggle. |
| StaggeredTextReveal | Custom | All 7 content sections + Hero name | Wraps children in overflow-hidden lines/characters. IntersectionObserver triggers CSS transitions. Three modes: `character`, `word`, `line`. |
| ProjectShowcase | Custom | ProjectsSection (×4) | Orchestrates image parallax, spotlight color reveal (mousemove), Three.js distortion (on-demand), text content layout. |
| DistortionPlane | Custom | ProjectShowcase | Three.js component: creates WebGL renderer + scene + camera + shader material on mouseenter. Disposes on mouseleave. One instance per hovered project image. |
| SectionNumber | Custom | All sections | Decorative "01", "02" etc. JetBrains Mono, amber. DRY. |
| EngineeringBracket | Custom | Hero, Education | CSS-animated L-shaped corner brackets. Pure decoration. |

### Hooks

| Hook | Purpose |
|------|---------|
| useLocomotive | Access Locomotive Scroll instance from context for `scrollTo`, `update`, refresh. |
| useMousePosition | Global normalized mouse coords (0–1) for coordinate label + cursor. Shared ref, not state. |
| useMediaQuery | Responsive breakpoint detection (mobile hover → tap, cursor disable, reduced motion). |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Ambient dot canvas + mouse repulsion | Raw Canvas 2D | Own rAF loop. 60 dots with sine-wave drift + spring-decay repulsion. Fixed canvas at z-index 1. | Medium |
| Custom cursor | CSS + JS | Fixed div, `transform: translate()` on mousemove. State transitions via CSS. `pointer-events: none`. | Low |
| Hero character stagger | CSS transitions + JS splitter | SplitText-like utility wraps each character. IntersectionObserver triggers CSS `translateY(100%)→0` with `transition-delay` per char. | Medium |
| Staggered text reveal (line/word) | CSS transitions + JS splitter | Same splitter pattern. Lines in overflow-hidden wrappers. IO triggers staggered delays. Three modes in one component. | Medium |
| Blueprint bracket pulse | CSS `@keyframes` | Opacity oscillation 0.2→0.4, 4s cycle, 1s stagger per corner. Pure CSS. | Low |
| Hero scroll indicator bob | CSS `@keyframes` | `translateY(0→8→0)`, 2s infinite ease-in-out. Pure CSS. | Low |
| Hero coordinate label | JS mousemove | Lightweight listener updates textContent with normalized coords. No React state. | Low |
| Nav background transition | JS scroll listener | Locomotive scroll event toggles class at hero threshold. CSS handles transition. | Low |
| Mobile menu overlay | CSS transitions | Full-screen overlay, transform/opacity transitions. State-managed open/close. | Low |
| Section default entrance | CSS transitions + IO | `opacity:0→1, translateY(60px)→0`. Shared IntersectionObserver utility with configurable threshold. | Low |
| State-reveal hover wipe | Pure CSS | `scaleX(0→1)` on hover with `transform-origin: 0% 50%`. Child content shifts via sibling selectors. Mobile: tap toggles `active` class. | Medium |
| Skill card staggered entrance | CSS transitions + IO | Same IO pattern, per-card delay via CSS custom property or nth-child. | Low |
| About portrait parallax | Locomotive `data-scroll-speed` | Attribute-driven parallax on image container. | Low |
| About stats stagger | CSS transitions + IO | Staggered fade-in, 0.15s between items. | Low |
| Experience image parallax | Locomotive `data-scroll-speed` | Per-block image speed attribute. | Low |
| Experience bullet stagger | CSS transitions + IO | Staggered fade-in within each block. | Low |
| **Project parallax (differential)** | Locomotive + GSAP ScrollTrigger | Locomotive handles base `data-scroll-speed` (text -0.25, image +0.35). GSAP ScrollTrigger adds scrubbed `scale(0.85→1.15)` on image container + `clipPath(inset→0)` on mask. ⚠️ Sync Locomotive position with ScrollTrigger via `scrollerProxy`. | High |
| **Project spotlight color reveal** | JS mousemove + CSS mask | Two image layers (grayscale top, color bottom). Top layer `mask-image: radial-gradient()` updated on mousemove within container. | Medium |
| **Project Three.js distortion** | Three.js + GSAP | On mouseenter: create WebGL renderer (alpha), simplex-noise vertex shader with `uDistortion` from mouse velocity, fade in `uOpacity`. On mouseleave: fade out, dispose renderer+scene. Mobile: skipped entirely. | High |
| Education CGPA pill pulse | CSS `@keyframes` | Border opacity oscillation 0.6→1.0, 3s cycle. Pure CSS. | Low |
| Contact word stagger | CSS transitions + JS splitter | Same splitter as hero but word-level mode. | Low |
| Back-to-top button | Locomotive `scrollTo` | Button calls `locomotive.scrollTo('#')`. Appear/hide via IO on contact section. | Low |

---

## State & Logic Plan

### Locomotive Scroll ↔ GSAP ScrollTrigger Bridge

Locomotive Scroll v4 hijacks native scroll. GSAP ScrollTrigger must be told where scroll position comes from. On init, call `ScrollTrigger.scrollerProxy('[data-scroll-container]', { scrollTop, getBoundingClientRect })` and wire Locomotive's `scroll` event to `ScrollTrigger.update()`. On route change (not applicable here — single page) or resize, call `ScrollTrigger.refresh()`. This is a one-time setup in `SmoothScrollProvider`.

### Three.js Lifecycle (Project Distortion)

Each `DistortionPlane` instance manages its own WebGL context lifecycle entirely independent of React render cycles:

- **Mount trigger**: `mouseenter` on the image wrapper. Creates `WebGLRenderer` (alpha, antialias false), `PerspectiveCamera`, `PlaneGeometry`, `ShaderMaterial` with simplex noise + `uDistortion`/`uOpacity` uniforms. Loads image texture from the DOM `<img>` src.
- **Animation**: Own rAF loop updates uniforms from mouse velocity. Runs only while hovered.
- **Unmount trigger**: `mouseleave`. GSAP tweens `uOpacity` to 0, then disposes renderer, geometry, material, texture. DOM image remains visible as fallback.
- **Critical**: Each project image gets its own renderer instance — no shared WebGL context. This prevents GPU memory leaks from accumulating unused contexts.

### Mouse Position as Shared Ref

The mouse position (normalized 0–1 for coordinate label, pixel coords for cursor + dot canvas) must be tracked via a single global `mousemove` listener writing to a shared ref object — **never React state**. Three consumers read from this ref every frame (cursor, dot canvas, coordinate label). Using state would cause 60fps re-renders. The ref object shape: `{ x: number, y: number, normX: number, normY: number }`.

### Tap-vs-Hover for StateRevealHover

`StateRevealHover` must support both hover (desktop) and tap (mobile). Strategy: always use an `active` CSS class. On desktop, `:hover` toggles the visual state via CSS alone — no JS. On mobile, `onClick` toggles the `active` class. Detect touch capability once at mount (check `'ontouchstart' in window`) to decide which behavior to apply. The `active` class duplicates the hover selectors.

---

## Other Key Decisions

### No React Three Fiber

Using raw Three.js (not R3F) for distortion because: (a) the effect is isolated to individual image containers, not a full 3D scene, (b) on-demand create/dispose maps more naturally to imperative Three.js, (c) avoids R3F's declarative overhead and reconciler for a simple shader plane.

### Locomotive v4 (not v5)

Using `locomotive-scroll@4.1.4` — the stable React-compatible version. v5 has breaking API changes and weaker React support. v4's `data-scroll-speed` / `data-scroll-delay` attributes integrate cleanly with React components.

### Single Canvas for All Dots

One fixed canvas element for all 60 ambient dots — not per-section. Dots are visible through sections with transparent/semi-transparent backgrounds and occluded by opaque sections naturally via z-index layering. No section-level canvas management needed.

### Image Asset Strategy

8 images + 3 videos total. All images use native `<img>` with `loading="lazy"` except hero video (eager). Project images use a two-layer technique (grayscale copy + color original) for the spotlight reveal — both layers reference the same source file, differentiated via CSS `filter`.
