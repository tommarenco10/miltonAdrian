# Portfolio Implementation Specification

## Project Overview

**Portfolio for:** Milton Adrian Cañete  
**Role:** Video Producer & Cinematographer  
**Location:** Buenos Aires, Argentina  
**Tech Stack:** HTML5, TypeScript, Tailwind CSS, Vite

---

## Owner Information

| Field | Value |
|---|---|
| **Name** | Milton Adrian Cañete |
| **Phone** | +54 9 11 6740-2983 |
| **Email** | miltonadrian@gmail.com |
| **Instagram** | @milton__adrian |
| **YouTube** | https://www.youtube.com/@miltoncanete9692 |
| **Profile Image** | `portfolioImage.png` |

---

## Design Inspiration

### From Ana M Amortegui (anamamortegui.com)
- Extreme minimalism (black/white palette)
- Clean navigation (Work / About / Contact)
- Large-scale imagery with cinematic aspect ratios
- Grid-based portfolio with numbered projects
- Professional bio section

### From Tim Flower (timflower.co.nz)
- Animated grid lines on page load
- Hover-to-autoplay video previews (muted)
- Numbered project list with clean typography
- Category filters (pill-style buttons)
- Detailed project pages with crew/equipment

---

## Categories (from videoclips.md)

| Category | Video Count |
|---|---|
| Videoclips | 18 unique |
| Live Session | 15 unique |
| Recitales | 6 unique |
| Feature Films | 2 |
| Behind the Scenes | 1 |
| Deportes | 1 |
| Social Media | 1 |
| **Total** | **~44 unique** |

---

## Information Architecture

```
/ (Home)
├── Hero (name, title, profile image)
├── Featured Work (6-8 random video placeholders)
├── Brief bio teaser
└── Contact CTA

/work (Portfolio)
├── Category navigation (sticky sidebar or top tabs)
├── Projects grouped by category
│   ├── Videoclips
│   ├── Live Session
│   ├── Recitales
│   ├── Feature Films
│   ├── Behind the Scenes
│   ├── Deportes
│   └── Social Media
└── Each project: thumbnail/video + title + year

/work/[project-slug] (Project Detail)
├── Title
├── Category
├── Year
├── Description
└── Video Link (embedded YouTube)

/about
├── Profile image (portfolioImage.png)
├── Bio / artist statement
└── Equipment (optional, if desired later)

/contact
├── Phone: +54 9 11 6740-2983
├── Email: miltonadrian@gmail.com
├── Instagram: @milton__adrian
└── YouTube: @miltoncanete9692
```

---

## Sitemap

```
┌──────────────────────────────────────────────┐
│              HOME (/)                        │
│  • Hero: name + title + profile image        │
│  • Featured Work: 6-8 video placeholders     │
│  • Bio teaser + CTA                          │
│  • Contact CTA                               │
└──────────┬───────────────────────────────────┘
           │
    ┌──────┼──────────┬──────────────┐
    │      │          │              │
┌───▼──┐ ┌▼────┐ ┌───▼───┐ ┌───────▼──────┐
│ WORK │ │ABOUT│ │CONTACT│ │PROJECT DETAIL │
│      │ │     │ │       │ │              │
│Grouped│ │Photo│ │Phone  │ │• Title       │
│by    │ │Bio  │ │Email  │ │• Category    │
│cate- │ │     │ │Insta  │ │• Year        │
│gory: │ │     │ │YouTube│ │• Description │
│• Vid-│ │     │ │       │ │• Video embed │
│  eoc-│ │     │ │       │ │              │
│  lips│ │     │ │       │ │[← Prev]      │
│• Live│ │     │ │       │ │[Next →]      │
│  Ses-│ │     │ │       │ │              │
│  sion│ │     │ │       │ │              │
│• Re- │ │     │ │       │ │              │
│  cita│ │     │ │       │ │              │
│  les │ │     │ │       │ │              │
│• Fea-│ │     │ │       │ │              │
│  ture│ │     │ │       │ │              │
│  Films│ │     │ │       │ │              │
│• BTS │ │     │ │       │ │              │
│• Dep-│ │     │ │       │ │              │
│  orte│ │     │ │       │ │              │
│• Soc-│ │     │ │       │ │              │
│  ial │ │     │ │       │ │              │
└──────┘ └─────┘ └───────┘ └──────────────┘
```

---

## Wireframes

### Homepage

```
┌──────────────────────────────────────────────────────────────┐
│  [MILTON ADRIAN]                    [WORK] [ABOUT] [CONTACT] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐                                                │
│  │  PROFILE │   MILTON ADRIAN CAÑETE                         │
│  │  IMAGE   │   Video Producer & Cinematographer             │
│  │          │                                                │
│  └──────────┘   Based in Buenos Aires, Argentina             │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FEATURED WORK                                               │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │             │
│  │            │  │            │  │            │             │
│  │ Title      │  │ Title      │  │ Title      │             │
│  │ Category   │  │ Category   │  │ Category   │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │             │
│  │            │  │            │  │            │             │
│  │ Title      │  │ Title      │  │ Title      │             │
│  │ Category   │  │ Category   │  │ Category   │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  [VIEW ALL WORK →]                                           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Brief bio text... [ABOUT →]                                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [GET IN TOUCH →]                                            │
└──────────────────────────────────────────────────────────────┘
```

### Work Page (grouped by category)

```
┌──────────────────────────────────────────────────────────────┐
│  [MILTON ADRIAN]                    [WORK] [ABOUT] [CONTACT] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  WORK                                                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [ALL] [VIDEOCLIPS] [LIVE SESSION] [RECITALES]       │   │
│  │ [FEATURE FILMS] [BTS] [DEPORTES] [SOCIAL MEDIA]     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  VIDEOCLIPS ─────────────────────────────────────────────    │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │             │
│  │ Title      │  │ Title      │  │ Title      │             │
│  │ 2024       │  │ 2023       │  │ 2024       │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│  ...                                                         │
│                                                              │
│  LIVE SESSION ───────────────────────────────────────────    │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │  │ ▶ [VIDEO]  │             │
│  │ Title      │  │ Title      │  │ Title      │             │
│  │ 2024       │  │ 2023       │  │ 2022       │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│  ...                                                         │
│                                                              │
│  RECITALES ──────────────────────────────────────────────    │
│  ...                                                         │
│                                                              │
│  FEATURE FILMS ──────────────────────────────────────────    │
│  ...                                                         │
│                                                              │
│  BEHIND THE SCENES ──────────────────────────────────────    │
│  ...                                                         │
│                                                              │
│  DEPORTES ───────────────────────────────────────────────    │
│  ...                                                         │
│                                                              │
│  SOCIAL MEDIA ───────────────────────────────────────────    │
│  ...                                                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Project Detail Page

```
┌──────────────────────────────────────────────────────────────┐
│  [MILTON ADRIAN]                    [WORK] [ABOUT] [CONTACT] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │              YOUTUBE VIDEO EMBED                     │   │
│  │                                                      │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  PROJECT TITLE                                               │
│  Videoclips • 2024                                           │
│                                                              │
│  Description text goes here. A brief paragraph about the     │
│  project, the creative vision, and the production details.   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [← PREVIOUS]                              [NEXT →]         │
└──────────────────────────────────────────────────────────────┘
```

### About Page

```
┌──────────────────────────────────────────────────────────────┐
│  [MILTON ADRIAN]                    [WORK] [ABOUT] [CONTACT] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐                                             │
│  │             │   ABOUT                                     │
│  │  portfolio  │                                             │
│  │  Image.png  │   Milton Adrian Cañete is a video producer  │
│  │             │   and cinematographer based in Buenos Aires │
│  │             │   with experience in music videos, live     │
│  └─────────────┘   sessions, feature films, documentaries,   │
│                   and commercial content...                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Contact Page

```
┌──────────────────────────────────────────────────────────────┐
│  [MILTON ADRIAN]                    [WORK] [ABOUT] [CONTACT] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  CONTACT                                                     │
│                                                              │
│  For new projects and collaborations:                        │
│                                                              │
│  Phone:    +54 9 11 6740-2983                                │
│  Email:    miltonadrian@gmail.com                            │
│                                                              │
│  Social:                                                     │
│  [Instagram: @milton__adrian]                                │
│  [YouTube: @miltoncanete9692]                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Design System

### Color Palette

```
Primary:    #000000 (Black)
Secondary:  #FFFFFF (White)
Accent:     #666666 (Gray)
Background: #FAFAFA (Off-white)
Text:       #1A1A1A (Near-black)
```

### Typography

```
HEADINGS:  Inter / Helvetica Neue, 700 weight
BODY:      Inter / Helvetica Neue, 400 weight
MONO:      JetBrains Mono (for numbers, technical details)

SCALE:
- Hero title:    4rem / 64px
- H1:            3rem / 48px
- H2:            2rem / 32px
- H3:            1.5rem / 24px
- Body:          1rem / 16px
- Small:         0.875rem / 14px
- Caption:       0.75rem / 12px
```

### Animation Strategy

| Trigger | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page load | Grid lines draw in | 800ms | ease-out |
| Scroll into view | Fade in + slide up | 600ms | ease-out |
| Hover project | Video preview plays | 200ms | linear |
| Click project | Page transition fade | 400ms | ease-in-out |
| Filter change | Grid items shuffle | 300ms | ease-out |

### Responsive Breakpoints

```
Mobile:    < 640px  (single column, stacked nav)
Tablet:    640-1024px (2-column grid)
Desktop:   > 1024px (3-column grid, full nav)
Wide:      > 1440px (larger images, more whitespace)
```

---

## Technology Stack

### Core
- **HTML5** — Semantic structure
- **TypeScript** — Type-safe components
- **Tailwind CSS** — Utility-first styling
- **Vite** — Fast dev server, optimized builds

### Recommended Libraries
- **GSAP** — Smooth animations, scroll triggers
- **Lenis** — Smooth scrolling (optional)
- **YouTube IFrame API** — Video embeds with control
- **Vite Plugin PWA** — Offline support (optional)

---

## Content Strategy

### Placeholder Content

Since real project details are missing, each project will use:

| Field | Placeholder |
|---|---|
| **Title** | Generated from category + number (e.g., "Videoclip 01", "Live Session 03") |
| **Category** | From `videoclips.md` section headers |
| **Year** | Random between 2022-2025 |
| **Description** | Short lorem-style text about the production |
| **Video Link** | Real YouTube URL from `videoclips.md` |

### Featured Work

6-8 random videos picked from across categories for homepage showcase.

---

## Implementation Notes

### File Structure

```
/
├── index.html
├── /src
│   ├── main.ts
│   ├── /components
│   │   ├── Header.ts
│   │   ├── Footer.ts
│   │   ├── Hero.ts
│   │   ├── FeaturedWork.ts
│   │   ├── ProjectGrid.ts
│   │   ├── ProjectCard.ts
│   │   ├── VideoPlayer.ts
│   │   └── CategoryFilter.ts
│   ├── /pages
│   │   ├── Home.ts
│   │   ├── Work.ts
│   │   ├── ProjectDetail.ts
│   │   ├── About.ts
│   │   └── Contact.ts
│   ├── /data
│   │   └── projects.ts (generated from videoclips.md)
│   ├── /styles
│   │   └── main.css
│   └── /utils
│       ├── router.ts
│       ├── animations.ts
│       └── youtube.ts
├── /public
│   ├── portfolioImage.png
│   └── /videos (if needed)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── architecture.md
```

### Key Features

1. **Single Page Application (SPA)** — Client-side routing for smooth transitions
2. **Video Previews** — YouTube embeds with autoplay on hover (muted)
3. **Category Grouping** — Projects organized by type with filter navigation
4. **Responsive Design** — Mobile-first approach
5. **Smooth Animations** — GSAP for scroll-triggered animations
6. **SEO Optimized** — Meta tags, semantic HTML, structured data

### Performance Considerations

- Lazy load videos (only load when in viewport)
- Use YouTube thumbnail API for preview images
- Optimize images with modern formats (WebP)
- Minimize bundle size with tree-shaking
- Implement code splitting for routes

---

## Next Steps

1. Initialize Vite + TypeScript + Tailwind project
2. Set up routing system
3. Create data structure for projects (parse videoclips.md)
4. Build core components (Header, Footer, Hero)
5. Implement Home page with Featured Work
6. Build Work page with category grouping
7. Create Project Detail page
8. Build About and Contact pages
9. Add animations and transitions
10. Optimize for performance and SEO
11. Deploy to production

---

*Document version: 1.0*  
*Last updated: 2026-02-24*
