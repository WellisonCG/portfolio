# Responsive Rules — Portfolio Home

---

## BREAKPOINT REFERENCE

| Prefix | Min width | Context                           |
|--------|-----------|-----------------------------------|
| –      | 0px       | Mobile                            |
| sm     | 640px     | Large mobile / small tablet       |
| md     | 768px     | Tablet                            |
| lg     | 1024px    | Small desktop / laptop            |
| xl     | 1280px    | Full Figma design — DO NOT CHANGE |

---

## FILE MAP

| Section        | File                                          |
|----------------|-----------------------------------------------|
| Page wrapper   | `app/page.tsx`                                |
| NavigationBar  | `components/layout/NavigationBar.tsx`         |
| HeroSection    | `components/sections/HeroSection.tsx`         |
| ProjectsSection| `components/sections/ProjectsSection.tsx`     |
| ProjectCard    | `components/ui/ProjectCard.tsx`               |
| MarqueeBanner  | `components/sections/MarqueeBanner.tsx`       |
| AboutSection   | `components/sections/AboutSection.tsx`        |
| CTASection     | `components/sections/CTASection.tsx`          |
| Footer         | `components/layout/Footer.tsx`                |

---

## GLOBAL RULES

### xl+ (≥1280px) — PROTECTED
Do not change. Inherits from `lg:` values already in code (since `lg:` covers xl+).

### Lateral padding (< xl)
- Minimum 40px each side on all section containers.
- Pattern: `px-10 xl:px-[figma-value]` — where `xl:` restores the Figma padding.
- If `lg:` already sets a Figma-correct padding (> 40px), keep it. The `xl:` override is only needed when `lg:` value differs from Figma.
- Remove any `md:` padding overrides that conflict — do not stack padding sources.
- **Absolute elements** (Hero avatar, cursor, notes, CTA avatar) are exempt. They must only not cause horizontal overflow.

### Overflow
- No horizontal overflow on any breakpoint.
- No excessive blank space at the bottom of the page.

### Drag & drop
- **Below lg (< 1024px):** disable all drag interactions on avatar and notes.
- Remove `cursor-grab` / `cursor-grabbing` styling below lg.
- Implementation: check `window.innerWidth < 1024` before activating drag state, or conditionally omit pointer handlers via a prop/flag.

---

## PRE-EXECUTION STATE ANALYSIS

Read this before touching any file. Items marked ✅ are already correct. Items marked ❌ need changes.

### HeroSection
- ✅ CassettePlayer: `hidden lg:block` — correct (visible lg+)
- ✅ "nothing here" label: `hidden lg:block` — correct (visible lg+)
- ✅ Avatar sizing: `w-[200px] md:w-[250px] lg:w-[300px]` — correct
- ✅ Resize animation skips at lg check already present
- ❌ Notes: `hidden lg:block` → must be `hidden xl:block` (overflows at 1024px viewport)
- ❌ Avatar visibility: always visible → must be `hidden sm:block` (hide below 640px)
- ❌ Speech bubble + arrow: inside drag div, always visible → extract as separate sibling, `hidden lg:block`
- ❌ Cursor: always visible → `hidden md:block` (hide below 768px)
- ❌ Drag handlers: always active → disable below lg
- ❌ Phase check: `window.innerWidth < 768` → must be `window.innerWidth < 1024`
- ❌ Container padding: `px-4 lg:px-[98px]` → `px-10 xl:px-[98px]`
- ❌ GSAP cursor offsets: hardcoded → dynamic via `getBoundingClientRect()` at lg

### ProjectsSection
- ❌ Direction: `md:flex-row` → `lg:flex-row` (single column at md, two at lg+)
- ❌ Padding: `px-4 md:px-0` → `px-10 xl:px-0`

### MarqueeBanner
- ✅ Text scale: `text-[24px] md:text-[36px] lg:text-[48px]` — correct
- ❌ Section padding: `px-8` (32px) < 40px → `px-10 xl:px-8`
- ❌ SVG: fixed `height="136"` → scale dynamically with text container

### AboutSection
- ✅ Text scale: `text-[28px] md:text-[38px] lg:text-[48px]` — correct
- ❌ Direction: `flex-col-reverse md:flex-row` → `flex-col lg:flex-row` (text first; two columns only at lg+)
- ❌ Padding: `px-4 md:px-[40px] lg:px-[79px]` → `px-10 lg:px-[79px]` (remove md override)
- ❌ Photo: `md:w-[300px]` in single-column layout → remove, keep `w-full` until `lg:w-[408px]`
- ❌ Text widths: `md:w-[360px]` / `md:w-[440px]` → remove md overrides, keep `lg:` only

### CTASection
- ✅ Card internal padding: `p-[20px] md:p-[32px] lg:p-[40px]` — correct
- ✅ Text scales: already have md/lg steps — correct
- ❌ Section padding: `px-4 lg:px-0 lg:pl-[92px]` → `px-10 lg:px-0 lg:pl-[92px]`
- ❌ Avatar: `hidden lg:block` → `hidden md:block`, with position change between md and lg (see rules below)

### Footer
- ✅ Direction: `flex-col md:flex-row` — correct (horizontal from md+)
- ✅ Text scales — correct
- ❌ Padding: `px-4 md:px-0` → `px-10 xl:px-0`

### NavigationBar
- ✅ No changes needed — hamburger at md works correctly

---

## RULES BY BREAKPOINT

### xl+ (≥1280px) — DO NOT CHANGE

---

### lg (1024px – 1279px)

**HeroSection**
- Container: `px-10 xl:px-[98px]`
- Avatar: visible, `sm:block` applies from sm+, no drag
- Speech bubble + arrow: visible (`lg:block`)
- Notes: hidden (`xl:block` only)
- Cursor: visible, idle + resize animation, **dynamic offsets** (see Technical Rules)
- Cassette player: visible (`lg:block`) ✅

**ProjectsSection**
- Two columns: `lg:flex-row`
- Padding: `px-10 xl:px-0`

**MarqueeBanner**
- Padding: `px-10 xl:px-8`
- SVG: scales with text container

**AboutSection**
- Two columns: `lg:flex-row`
- Padding: `px-10 lg:px-[79px]`
- Photo: `lg:h-[468px] lg:w-[408px]`

**CTASection**
- Section: `px-10 lg:px-0 lg:pl-[92px]`
- Avatar: visible, `left: -92px`, centered vertically (`top: calc(50% + 0.9px) -translate-y-1/2`)

**Footer**
- Padding: `px-10 xl:px-0`

---

### md (768px – 1023px)

**HeroSection**
- Speech bubble + arrow: hidden
- Cursor: visible, idle float only (resize skipped)
- Avatar: visible, no drag
- Notes: hidden
- Cassette player: hidden

**ProjectsSection**
- Single column (`flex-col`)
- Padding: `px-10`

**AboutSection**
- Single column (`flex-col`), text first (DOM order: text → photo)
- Photo: `md:h-[360px] w-full`
- Padding: `px-10`

**CTASection**
- Avatar: visible, **bottom-left position**:
  - `bottom: -30px, left: 0` relative to the card
  - Overlaps the bottom-left corner of the card
  - Avatar's feet poke 30px below the card's bottom edge
  - Must not overlap any text (text is centered, avatar is at corner)
  - Exempt from 40px padding rule (absolute element)
- Section: `px-10`

**Footer**
- Horizontal row
- Padding: `px-10`

---

### sm (640px – 767px)

**HeroSection**
- Avatar: visible, smaller size, no drag, no speech bubble, no arrow
- Cursor: hidden (`md:block` means it only appears from 768px)
- Notes: hidden
- Cassette player: hidden

**AboutSection**
- Single column, text first, photo below

---

### Default / Mobile (< 640px)

**HeroSection**
- Avatar: hidden (`hidden sm:block`)
- Cursor: hidden
- Notes: hidden
- Cassette player: hidden
- Keep: text block + WELLISON box + tagline + scroll indicator

**CTASection**
- Avatar: hidden (covered by `hidden md:block`)

**AboutSection**
- Single column, text first, photo below

---

## TECHNICAL RULES

### 40px Padding — Implementation Pattern
```
px-10 xl:px-[figma-value]
```
- Audit before applying: if a section already has `md:` or `lg:` overrides that would result in ≠ 40px below xl, remove those intermediate overrides.
- Do not combine with additional padding on inner wrappers.

### Dynamic Cursor Animation
- **xl+ (≥1280px):** use existing hardcoded GSAP values (`x: -509, y: -122`, etc.) — calibrated for 1200px layout. Do not change.
- **lg (1024–1279px):** calculate offsets at runtime on every "resizing" phase entry:
  ```ts
  const boxRect    = wellisonBoxRef.current.getBoundingClientRect();
  const cursorRect = cursorRef.current.getBoundingClientRect();
  // Target: cursor's BR corner → box's TL corner
  const targetX = boxRect.left   - cursorRect.right;
  const targetY = boxRect.top    - cursorRect.bottom;
  ```
  Pass `targetX / targetY` to the GSAP timeline instead of `-509 / -122`.
  The fix-fallen-state branch uses similar delta logic relative to current position.
- **md and below (< 1024px):** `setPhase("idle")` immediately. Change the existing `window.innerWidth < 768` check to `window.innerWidth < 1024`.
- **Idle float:** keep current small relative offsets (±14px). No dynamic recalculation needed.

### Speech Bubble + Arrow — Extraction
- Currently nested inside the avatar's draggable div.
- Extract as a **sibling div** inside the avatar container (not inside the drag-wired div with the image).
- Apply `hidden lg:block` to the bubble container.
- The drag handlers must reference only the avatar image div, not the bubble.

### Drag Handlers — Conditional
- Avatar and notes drag: disable below lg.
- Simplest approach: pass `pointerEvents` conditionally, or check `window.innerWidth < 1024` inside `onPointerDown` before activating drag state. Either is acceptable.

### MarqueeBanner SVG — Responsive Scaling
- Remove fixed `height="136"` from `<svg>`.
- Apply `className="... inset-0 w-full h-full"` (absolute, fills container).
- Add `preserveAspectRatio="xMidYMid meet"` — scales the oval proportionally inside the container while keeping it centered.
- The `div.relative` container height is driven by the `h2` text. The SVG fills that height.
- Result: oval scales with the text at every breakpoint.

### CTA Avatar — Dual Position
- Use inline style for position since values differ between md and lg.
- At lg: `{ left: "-92px", top: "calc(50% + 0.9px)" }` + `-translate-y-1/2` (current behavior) ✅
- At md: needs different position. Options:
  - Use a wrapper that swaps between two absolute positioning strategies via Tailwind.
  - Or: render two separate avatar divs, one `hidden md:block lg:hidden` (md position) and one `hidden lg:block` (lg position).
  - Preferred: two separate divs to avoid JS-based positioning logic.

---

## VISUAL REVIEW PROTOCOL

After every round of code changes, run the screenshot + analysis loop before committing.
This loop repeats until no issues remain.

### Toolchain
- **Playwright** (global, Chromium) — `scripts/screenshot.js`
- **Read tool** — reads PNG screenshots for visual analysis
- **RESPONSIVE.md** — ground truth for expected behavior

### Viewports captured (9 shots)
| File | Width | Context |
|------|-------|---------|
| `375-mobile.png`   | 375px  | Mobile center |
| `639-sm-max.png`   | 639px  | Last mobile pixel |
| `640-sm-min.png`   | 640px  | First sm pixel |
| `767-md-max.png`   | 767px  | Last sm pixel |
| `768-md-min.png`   | 768px  | First md pixel |
| `1023-lg-max.png`  | 1023px | Last md pixel |
| `1024-lg-min.png`  | 1024px | First lg pixel |
| `1279-xl-max.png`  | 1279px | Last lg pixel |
| `1280-xl-min.png`  | 1280px | xl / Figma design |

### Loop
```
1. npm run dev   (background, port 3000)
2. node scripts/screenshot.js
3. Read each PNG → visual analysis
4. Log all issues found (overflow, wrong visibility, padding, layout breaks, typography)
5. Fix issues in code
6. Re-run screenshot.js → re-analyze
7. Repeat until zero issues remain
8. Commit fixes
```

### What to look for in each screenshot
- **Horizontal overflow** — any element bleeding past viewport edge
- **Padding < 40px** — content too close to viewport edge below xl
- **Wrong visibility** — elements that should be hidden are visible (or vice versa)
- **Layout breaks** — columns stacking/unstacking at wrong breakpoint
- **Typography** — text too large/small, line breaks at awkward places
- **Spacing** — gaps that are too tight or too loose for the viewport
- **Avatar/CTA** — correct position at each breakpoint
- **SVG oval** — scales proportionally with text at all sizes
- **Obvious design polish** — anything that looks unintentional or cheap

---

## COMMIT STRATEGY

One commit per section when all breakpoint work for that section is done.

```
fix(responsive): HeroSection — 40px padding, dynamic cursor, visibility rules
fix(responsive): ProjectsSection — lg flex-row, 40px padding
fix(responsive): MarqueeBanner — SVG scaling, 40px padding
fix(responsive): AboutSection — single column md, flex-col lg, 40px padding
fix(responsive): CTASection — avatar bottom-left md, 40px padding
fix(responsive): Footer — 40px padding
```

---

## VERIFICATION CHECKLIST

Run through this after all sections are done. Every item must pass before stopping.

### Global
- [ ] No section has lateral padding < 40px below xl
- [ ] No horizontal overflow on any breakpoint
- [ ] xl+ classes unchanged from current state
- [ ] No double-padding (stacked px-10 + inner padding on same axis)

### NavigationBar
- [ ] No changes made ✅

### HeroSection
- [ ] Container: `px-10 xl:px-[98px]` applied
- [ ] Avatar hidden below sm (`hidden sm:block`)
- [ ] Avatar has no drag handlers active below lg
- [ ] Avatar has no `cursor-grab` / `cursor-grabbing` below lg
- [ ] Speech bubble + arrow extracted as sibling, `hidden lg:block`
- [ ] Notes: `hidden xl:block`
- [ ] Cursor: `hidden md:block`
- [ ] Cassette player: `hidden lg:block` (unchanged) ✅
- [ ] "nothing here" label: `hidden lg:block` (unchanged) ✅
- [ ] `window.innerWidth < 1024` (was < 768) in phase check
- [ ] GSAP cursor at lg uses `getBoundingClientRect()` delta, not hardcoded values
- [ ] GSAP cursor at xl still uses hardcoded values unchanged

### ProjectsSection
- [ ] `lg:flex-row` (was `md:flex-row`)
- [ ] `px-10 xl:px-0` applied
- [ ] Single column below lg ✅ (consequence of `lg:flex-row`)
- [ ] Two columns at lg+ ✅

### MarqueeBanner
- [ ] Section: `px-10 xl:px-8`
- [ ] SVG: `height` attribute removed, `inset-0 w-full h-full` applied, `preserveAspectRatio="xMidYMid meet"` added
- [ ] Text remains centered at all breakpoints

### AboutSection
- [ ] `flex-col lg:flex-row` (was `flex-col-reverse md:flex-row`)
- [ ] Text column appears first in stacked layout (DOM order: text → photo)
- [ ] `px-10 lg:px-[79px]` applied (no `md:` padding override)
- [ ] Photo: `md:w-[300px]` removed, `w-full` below lg
- [ ] Text widths: `md:w-[360px]` / `md:w-[440px]` removed, only `lg:w-` kept

### CTASection
- [ ] Section: `px-10 lg:px-0 lg:pl-[92px]`
- [ ] Avatar at lg: `hidden lg:block`, `left: -92px`, centered vertically (unchanged)
- [ ] Avatar at md: `hidden md:block lg:hidden`, `bottom: -30px, left: 0` relative to card
- [ ] Avatar not visible below md
- [ ] Avatar does not overlap any text content at md

### Footer
- [ ] `px-10 xl:px-0` applied (was `px-4 md:px-0`)
- [ ] Horizontal layout from md+ unchanged ✅
