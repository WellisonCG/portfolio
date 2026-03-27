# PROJECT_CONTEXT.md

## Project Overview

This project is the development of a new version of a personal design
portfolio website.

A previous version of this portfolio already exists, but this project
rebuilds it **from scratch** with a modern frontend architecture,
improved performance, and richer visual interactions.

The visual design will be created in **Figma**, and the implementation
should follow the design through **Figma MCP**, which acts as the visual
source of truth.

The goal is to produce a portfolio that is:

-   visually refined
-   highly performant
-   scalable
-   easy to expand in the future

------------------------------------------------------------------------

# Project Goals

The portfolio should present design work through a **fluid, interactive,
and visually engaging experience**.

Key characteristics of the website:

-   smooth navigation
-   elegant transitions
-   subtle microinteractions
-   scroll-triggered animations
-   strong visual hierarchy
-   fast loading times

The experience should balance **visual richness and performance**.

------------------------------------------------------------------------

# Portfolio Structure

The website will consist of two primary page types.

  Page           Purpose
  -------------- ------------------------------------------------
  Home           Introduction and overview of selected projects
  Project Page   Detailed case study for a specific project

Each project page should allow structured storytelling including:

-   project context
-   problem definition
-   process
-   visual artifacts
-   outcomes or learnings

The system should allow **new projects to be added easily in the
future**.

------------------------------------------------------------------------

# Bilingual Strategy

The portfolio will support two languages:

-   English
-   Portuguese

However, development should follow this order:

### Phase 1

Build the **entire portfolio in English**.

### Phase 2

After the English version is complete, implement the **Portuguese
version**.

The architecture should be designed so localization can be added
**without large refactors**.

------------------------------------------------------------------------

# Visual Experience

Visual experience is an important part of this portfolio.

The site should include:

-   microinteractions
-   animated transitions
-   scroll-triggered animations
-   subtle motion design
-   fluid layout transitions

Animations should enhance the experience **without harming
performance**.

Animation technologies confirmed for this project:

-   **GSAP + ScrollTrigger** — primary animation library for scroll-driven and timeline animations
-   **Framer Motion** — page transitions only
-   CSS animations — for simple, performant micro-interactions

Components should be structured so animations can be **easily added or
expanded later**.

------------------------------------------------------------------------

# Performance Expectations

Despite animations and visual effects, the website must remain **fast
and efficient**.

Key priorities:

-   fast page loads
-   small JavaScript bundles
-   optimized images
-   smooth animation performance
-   efficient rendering

The experience should remain fluid across:

-   desktop
-   laptop
-   tablet
-   mobile

------------------------------------------------------------------------

# Responsiveness

The design is primarily desktop-oriented but must adapt across screen
sizes.

Target environments:

  Device    Expectation
  --------- ------------------------------------
  Desktop   Primary design reference
  Laptop    Clean layout adaptation
  Tablet    Maintain hierarchy and readability
  Mobile    Fully usable experience

------------------------------------------------------------------------

# Scalability

The architecture should allow the portfolio to grow easily.

The system should support:

-   adding new projects
-   adding new pages
-   expanding animations
-   evolving layouts
-   updating content without breaking structure

Ideally, adding a new project should require **minimal structural
changes**.

------------------------------------------------------------------------

# Content Model

Projects should behave like **flexible case studies**.

Content sections may include:

-   text blocks
-   images
-   galleries
-   full-width visuals
-   videos
-   diagrams
-   metrics or outcomes

Layouts should support **rich storytelling formats**.

------------------------------------------------------------------------

# Design Source

The visual design will be created in **Figma**.

Implementation should follow **Figma MCP** as the primary design
reference.

Important aspects to extract from Figma:

-   layout structure
-   spacing
-   typography
-   color usage
-   component hierarchy
-   responsive behavior

------------------------------------------------------------------------

# Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js (App Router)     |
| Styling          | TailwindCSS + CSS tokens |
| Animation        | GSAP + ScrollTrigger     |
| Page Transitions | Framer Motion            |
| Content          | MDX                      |
| i18n             | next-intl                |
| Icons            | Lucide / SVG             |
| Deployment       | Vercel                   |

------------------------------------------------------------------------

# Development Philosophy

Implementation priorities:

1.  Visual fidelity to Figma
2.  Clean and reusable component architecture
3.  Performance optimization
4.  Animation readiness
5.  Maintainability

------------------------------------------------------------------------

# Future Expansion

The portfolio may evolve to include:

-   additional case studies
-   experimental interaction pages
-   writing or articles
-   visual explorations
-   interactive experiences

Therefore the architecture should remain **flexible and modular**.

------------------------------------------------------------------------

# Expected Outcome

The final product should be:

-   a modern interactive design portfolio
-   visually engaging
-   performant
-   scalable
-   easy to maintain
-   ready for production deployment