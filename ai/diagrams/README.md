# Unified Impact Diagrams Index

This directory contains all diagrams for the **sketch-cli** project, following Diagram Driven Development (DDD) methodology.

## What is DDD?

Diagram Driven Development emphasizes creating diagrams that:
- Show **both** user-facing impact (Front-Stage) AND technical implementation (Back-Stage)
- Include impact annotations explaining how technical choices create user value
- Demonstrate user actions as entry/exit points
- Illustrate error paths and recovery options
- Stay synchronized with code changes

## Architecture Overview

### System Architecture
- **[System Architecture](architecture/arch-system-overview.md)** - High-level view of website page generator components and relationships, showing the value chain from user input to design output
- **[Dual Generator System](architecture/arch-dual-generator-system.md)** - How website and component generators coexist with shared infrastructure

## User Journeys

### Website Page Generation
- **[Website Page Design Journey](journeys/sequence-user-design-creation-journey.md)** - Complete user journey from initial concept to generated page mockups, highlighting reduced friction and rapid iteration

### Component Variation Generation
- **[Component Variation Journey](journeys/sequence-component-variation-journey.md)** - User workflow for generating multiple design variations from a reference component image

## Features

### Website Page Generator
- **[Prompt Generation Flow](features/feature-prompt-generation-flow.md)** - How user inputs are transformed into comprehensive AI prompts that generate 5 unique page design variations
- **[Page Customization System](features/feature-customization-system.md)** - Three-dimensional customization matrix (Page Type × Tuning × Platform) enabling precisely targeted designs without design expertise

### Component Variation Generator
- **[Component Variation System](features/feature-component-variation-system.md)** - Three-dimensional customization matrix (Component Type × Style × Palette) for exploring design directions from reference images
- **[Color Palette System](features/feature-color-palette-system.md)** - 20+ developer-friendly color palettes (Dracula, Nord, Tokyo Night, etc.) for consistent theming

## Project Overview

**sketch-cli** is a dual-purpose AI-powered design generation tool with two complementary commands:

### Website Page Generator (`bun run sketch`)
- **7 page types:** Home, About, Product, Cart, Contact, Sales, Blog
- **15 design tuning presets:** Creative, Minimal, Vibrant, Elegant, Dark, Brutalist, Luxe, Tech, Organic, Retro, Editorial, Accessible, Professional, Modern, Playful
- **10 platform presets:** Website, Mobile, Tablet, Watch, TV, Desktop, PWA, Kiosk, Car, VR
- **5 design variations per generation:** Ensures variety and design exploration

### Component Variation Generator (`bun run component`)
- **15 component types:** Button, Card, Form, Nav, Modal, Table, List, Header, Footer, Badge, Icon, Dropdown, Toggle, Toast, Avatar
- **20+ style presets:** Material, iOS, Fluent, Glassmorphism, Neumorphism, Minimal, Bold, Gradient, Neon, and more
- **20+ color palettes:** Dracula, Nord, Tokyo Night, Material, GitHub Dark/Light, Gruvbox, Synthwave, and more
- **Reference image input:** Iterate on existing component designs with new styles and colors
- **Configurable variation count:** Generate 1-10+ variations per run

### Shared Features
- **Dual interaction modes:** Direct CLI for power users, interactive prompts for beginners
- **Dry run mode:** Preview prompts before generation
- **Structured file naming:** Easy organization and comparison of variations

## Diagram Quick Reference

| Diagram | Purpose | When to Use |
|---------|---------|-------------|
| **Dual Generator System** | Understand how both tools coexist | Onboarding new developers, understanding project structure |
| **System Architecture** | Website page generator structure | Planning changes to website generation |
| **Website Page Journey** | Complete user workflow for pages | Understanding page generation UX |
| **Component Variation Journey** | Complete user workflow for components | Understanding component generation UX |
| **Prompt Generation Flow** | Website prompt construction | Debugging page prompts, adding page customization |
| **Page Customization System** | Page Type × Tuning × Platform matrix | Adding new page presets |
| **Component Variation System** | Component Type × Style × Palette matrix | Adding new component/style/palette presets |
| **Color Palette System** | How developer themes integrate | Adding new color palettes |

## How These Diagrams Connect

```
Dual Generator System (arch-dual-generator-system.md)
    ↓
    ├─ Website Generator Branch
    │   ↓
    │   Website Journey (sequence-user-design-creation-journey.md)
    │       ↓
    │       Uses → System Architecture (arch-system-overview.md)
    │                  ↓
    │                  Implements → Prompt Generation Flow (feature-prompt-generation-flow.md)
    │                                  ↓
    │                                  Powered by → Page Customization System (feature-customization-system.md)
    │
    └─ Component Generator Branch
        ↓
        Component Journey (sequence-component-variation-journey.md)
            ↓
            Uses → Component Variation System (feature-component-variation-system.md)
                       ↓
                       Powered by → Color Palette System (feature-color-palette-system.md)
```

## Maintaining These Diagrams

### When to Update

- **Code changes:** If implementation changes, update Back-Stage sections
- **UX changes:** If user experience changes, update Front-Stage sections
- **New features:** Create new feature diagrams or update existing ones
- **Bug fixes:** Update error paths and recovery flows if affected

### Update Checklist

When updating diagrams:
- [ ] Update "Last Updated" date
- [ ] Add entry to "Change History" section
- [ ] Verify Front-Stage and Back-Stage separation still exists
- [ ] Ensure impact annotations explain user value
- [ ] Update related file paths if files moved/renamed
- [ ] Check that all cross-references to other diagrams are valid

## Related Code Files

### Website Page Generator
- **Entry point:** `src/index.ts` - CLI parsing and execution flow
- **Prompt building:** `src/prompt-templates.ts` - Core prompt generation logic
- **Tuning presets:** `src/tuning-presets.ts` - 15 design aesthetic presets
- **Platform presets:** `src/platform-presets.ts` - 10 device/context targets

### Component Variation Generator
- **Entry point:** `src/component.ts` - Component generator CLI
- **Component types:** `src/component-types.ts` - 15 component definitions with focus areas
- **Style presets:** `src/variation-presets.ts` - 20+ design style presets
- **Color palettes:** `src/color-palettes.ts` - 20+ developer-friendly color schemes

### Shared Infrastructure
- **Dependencies:** `package.json` - Bun runtime and @inquirer/prompts

## Last Updated

**2025-11-07** - Major expansion for dual generator system:
- Added component variation journey showing reference-based workflow
- Added component variation system with 3D customization matrix (Component Type × Style × Palette)
- Added color palette system documenting 20+ developer-friendly themes
- Added dual generator architecture showing how both tools coexist
- Updated all existing diagrams to reflect "sketch-cli" project name
- Updated index with new diagram organization and cross-references

**2025-11-05** - Initial diagram set created with DDD principles:
- System architecture showing website generator value chain
- User journey for website page generation
- Prompt generation flow for website pages
- Page customization system with 3D preset matrix (1,050+ combinations)

---

*These diagrams are the single source of truth for system understanding. Keep them synchronized with code changes.*
