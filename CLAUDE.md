# CLAUDE.md

## Project Overview

This project aims to translate a Figma design into a production-ready
website while maintaining **maximum visual fidelity to the Figma MCP
source**.

The AI agent must treat **Figma MCP as the single source of truth for
layout, spacing, typography, colors, and component structure**.

The goal is not just to reproduce the design visually, but to produce
**clean, scalable, and highly optimized code** suitable for future
iterations and animations.

This is also a **learning project**, so the agent should briefly explain
what it is doing during implementation.

---

# Core Principles

## 1. Figma MCP is the Design Source of Truth

When implementing UI:

- Always prioritize **visual fidelity to Figma MCP**
- Extract and replicate:
  - layout structure
  - spacing
  - typography
  - colors
  - component hierarchy
  - responsive behavior inferred from the design

Avoid inventing styles unless necessary.

If something is unclear in the design:

1. Infer logically from surrounding components
2. Maintain visual consistency with the rest of the layout
3. Document the assumption

---

# Code Quality

The project should prioritize:

| Principle               | Description                                |
| ----------------------- | ------------------------------------------ |
| Clean Code              | Readable, well-structured, maintainable    |
| Scalability             | Components designed for reuse              |
| Performance             | Avoid unnecessary JS, optimize rendering   |
| Separation of concerns  | UI, logic, and styles clearly separated    |
| Predictability          | Consistent naming and structure            |

Avoid:

- monolithic components
- duplicated UI logic
- unnecessary abstractions
- premature optimization

---

# Visual Fidelity Rules

When translating Figma to code:

1. Preserve spacing relationships
2. Respect typography scale
3. Maintain alignment and layout structure
4. Recreate component hierarchy
5. Match colors and visual weight

Use **design tokens when possible**.

Example tokens:

```
spacing
colors
typography
border-radius
shadow
```

---

# Animation Readiness

Even if elements are static for now, they **must be structured to
support future animations**.

Guidelines:

- Avoid DOM structures that make animation difficult
- Keep components **isolated and predictable**
- Prefer **single-responsibility elements**
- Avoid deeply nested wrappers unless necessary

Animations will be implemented using GSAP + ScrollTrigger (primary) and Framer Motion (page transitions). See CONTEXT.md for the full stack.

Structure components in a way that makes animation integration simple.

---

# Performance Expectations

The website should aim to be **highly optimized**.

Priorities:

- minimal JavaScript bundle
- optimized images
- lazy loading when possible
- semantic HTML
- accessible markup
- efficient component rendering

Prefer:

- server components when applicable
- static generation when possible
- optimized assets

---

# Responsive Design

This project **is not mobile-first**, but must function well across all
screen sizes.

The agent should:

1. Implement layouts based on the desktop design
2. Adapt layouts responsively for:
   - tablet
   - smaller desktops
   - mobile

Ensure:

- layout stability
- readable typography
- proper spacing

Breakpoints should be handled using Tailwind utilities.

---

# Implementation Process

When implementing a feature or section:

1. Analyze the Figma MCP structure
2. Identify component boundaries
3. Implement reusable components
4. Apply styling via Tailwind
5. Ensure responsiveness
6. Keep DOM structure animation-friendly

---

# Code Explanation Requirement

Since this is a learning project, the agent should explain what it is
doing while coding.

Guidelines:

- Explain **the intention of the code**
- Avoid unnecessary low-level details
- Focus on **conceptual understanding**

Example explanation style:

Good:
> "I'm creating a reusable Button component that mirrors the design from
> Figma. This allows the same style to be reused across different
> sections of the site."

Avoid:
- explaining every line of code
- overly technical jargon

---

# Component Philosophy

Prefer **small, reusable components**.

Example structure:

```
components/
  Button
  Navbar
  Hero
  Card
  Footer
```

Avoid large page components with mixed responsibilities.

---

# File Structure

Suggested project structure:

```
app/
components/
styles/
lib/
public/
```

Example:

```
components/
  ui/
  layout/
  sections/
```

---

# Naming Conventions

Use consistent naming.

Examples:

```
HeroSection
FeatureCard
PrimaryButton
NavigationBar
```

Avoid vague names like:

```
Box
Container2
Stuff
```

---

# When Unsure

If the design is ambiguous:

1. Follow the closest Figma pattern
2. Choose the simplest solution
3. Document the reasoning briefly

---

# Goal

The final output should be a website that is:

- visually faithful to the Figma design
- cleanly structured
- easy to animate later
- scalable for future features
- optimized for performance
