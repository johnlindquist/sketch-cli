# Unified Impact Diagrams Index

This directory contains all diagrams for the **Website Sketch Generator** project, following Diagram Driven Development (DDD) methodology.

## What is DDD?

Diagram Driven Development emphasizes creating diagrams that:
- Show **both** user-facing impact (Front-Stage) AND technical implementation (Back-Stage)
- Include impact annotations explaining how technical choices create user value
- Demonstrate user actions as entry/exit points
- Illustrate error paths and recovery options
- Stay synchronized with code changes

## Architecture Overview

### System Architecture
- **[System Architecture](architecture/arch-system-overview.md)** - High-level view of all system components and their relationships, showing the value chain from user input to design output

## User Journeys

### Design Creation Flow
- **[User Design Creation Journey](journeys/sequence-user-design-creation-journey.md)** - Complete user journey from initial concept to generated design sketches, highlighting reduced friction and rapid iteration

## Features

### Core Functionality
- **[Prompt Generation Flow](features/feature-prompt-generation-flow.md)** - How user inputs are transformed into comprehensive AI prompts that generate 5 unique design variations

### Customization System
- **[Customization System](features/feature-customization-system.md)** - Three-dimensional customization matrix (Page Type × Tuning × Platform) enabling precisely targeted designs without design expertise

## Project Overview

The Website Sketch Generator is a CLI tool that generates diverse, professional website design mockups using AI. Key capabilities:

- **7 page types:** Home, About, Product, Cart, Contact, Sales, Blog
- **15 design tuning presets:** Creative, Minimal, Vibrant, Elegant, Dark, Brutalist, Luxe, Tech, Organic, Retro, Editorial, Accessible, Professional, Modern, Playful
- **10 platform presets:** Website, Mobile, Tablet, Watch, TV, Desktop, PWA, Kiosk, Car, VR
- **Dual interaction modes:** Direct CLI for power users, interactive prompts for beginners
- **5 design variations per generation:** Ensures variety and design exploration
- **Reference image support:** Visual inspiration for color/layout guidance

## Diagram Quick Reference

| Diagram | Purpose | When to Use |
|---------|---------|-------------|
| **System Architecture** | Understand overall system structure | Onboarding new developers, planning major changes |
| **User Design Creation Journey** | See complete user workflow | Understanding user experience, identifying friction points |
| **Prompt Generation Flow** | Understand prompt construction | Debugging prompt issues, adding new customization options |
| **Customization System** | Grasp the customization matrix | Adding new presets, understanding option interactions |

## How These Diagrams Connect

```
User Journey (sequence-user-design-creation-journey.md)
    ↓
    Uses → System Architecture (arch-system-overview.md)
               ↓
               Implements → Prompt Generation Flow (feature-prompt-generation-flow.md)
                               ↓
                               Powered by → Customization System (feature-customization-system.md)
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

- **Entry point:** `src/index.ts` - CLI parsing and execution flow
- **Prompt building:** `src/prompt-templates.ts` - Core prompt generation logic
- **Tuning presets:** `src/tuning-presets.ts` - 15 design aesthetic presets
- **Platform presets:** `src/platform-presets.ts` - 10 device/context targets
- **Dependencies:** `package.json` - Bun runtime and @inquirer/prompts

## Last Updated

**2025-11-05** - Initial diagram set created with DDD principles:
- System architecture showing value chain from input to output
- User journey highlighting dual interaction modes and iteration workflow
- Prompt generation flow demonstrating 7-section prompt construction
- Customization system illustrating 3D preset matrix (1,050+ combinations)

---

*These diagrams are the single source of truth for system understanding. Keep them synchronized with code changes.*
