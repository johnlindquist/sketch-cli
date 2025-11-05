# System Architecture Overview

**Type:** Architecture Diagram
**Last Updated:** 2025-11-05
**Related Files:**
- `src/index.ts`
- `src/prompt-templates.ts`
- `src/tuning-presets.ts`
- `src/platform-presets.ts`
- `package.json`

## Purpose

Provides a high-level view of how the Website Sketch Generator system components work together to transform user intent into AI-generated design sketches, showing the value chain from user input to design output.

## Diagram

```mermaid
graph TB
    subgraph "User Entry Points"
        A[CLI Direct Mode<br/>bun run sketch args]
        B[CLI Interactive Mode<br/>bun run sketch]
    end

    subgraph "Core Processing Layer"
        C[Argument Parser<br/>parseArgs]
        D[Interactive Prompt Flow<br/>interactiveMode]
        E[Prompt Builder<br/>buildPrompt]
    end

    subgraph "Configuration Data"
        F[PAGE_COMPONENTS<br/>7 page types with<br/>required UI elements]
        G[TUNING_PRESETS<br/>15 design style presets]
        H[PLATFORM_PRESETS<br/>10 platform targets]
        I[DESIGN_STYLES<br/>10 style descriptors]
        J[PRESENTATION_FORMATS<br/>5 rendering approaches]
    end

    subgraph "External Services"
        K[Gemini CLI<br/>--yolo mode]
        L[File System<br/>Design image storage]
    end

    subgraph "User Outcomes"
        M[Design Preview<br/>Prompt validation]
        N[5 Design Variations<br/>Organized by naming<br/>convention]
        O[Design Selection<br/>Preferred direction]
    end

    A -->|"Parses flags and<br/>positional args"| C
    B -->|"Collects inputs<br/>with prompts"| D
    C -->|"Validated options"| E
    D -->|"Validated options"| E

    E -->|"Looks up page-specific<br/>elements"| F
    E -->|"Applies style<br/>modifiers"| G
    E -->|"Adapts for device<br/>constraints"| H
    E -->|"Randomizes for<br/>variety"| I
    E -->|"Randomizes for<br/>diversity"| J

    F -->|"Ensures completeness"| E
    G -->|"Guides aesthetics"| E
    H -->|"Targets context"| E
    I -->|"Creates variety"| E
    J -->|"Diversifies outputs"| E

    E -->|"Complete AI prompt"| M
    M -->|"User approves<br/>(--execute flag)"| K

    K -->|"Generates images<br/>from prompt"| L
    L -->|"Structured files:<br/>type_page_platform_tuning_timestamp_v#"| N
    N -->|"User evaluates<br/>options"| O

    O -.->|"Iteration: Refine<br/>and regenerate"| A
    O -.->|"Iteration: Try different<br/>customizations"| B

    style A fill:#E3F2FD
    style B fill:#E3F2FD
    style M fill:#E8F5E9
    style N fill:#E8F5E9
    style O fill:#E8F5E9
    style E fill:#FFF3E0
    style K fill:#FCE4EC

    classDef userEntry fill:#E3F2FD,stroke:#2196F3,stroke-width:2px
    classDef outcome fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px
    classDef core fill:#FFF3E0,stroke:#FF9800,stroke-width:2px
    classDef external fill:#FCE4EC,stroke:#E91E63,stroke-width:2px
```

## Key Insights

**User Impact:**
- **Dual entry modes** support different user skill levels and workflow preferences
- **5 configuration datasets** provide rich customization without requiring design expertise
- **Structured output naming** enables systematic organization and comparison of design variations
- **Iterative workflow** encourages exploration and refinement of design directions
- **Preview before execution** prevents wasted AI credits on unwanted prompts

**System Architecture Principles:**
- **Separation of concerns:** Parsing, building, and execution are distinct phases
- **Data-driven design:** All customization options defined in reusable configuration objects
- **Randomization strategy:** Uses `getRandomItems()` to ensure fresh results each run
- **External dependency:** Relies on Gemini CLI being installed and accessible in PATH
- **File-based output:** Generated images saved to filesystem with descriptive names

**Configuration Extensibility:**
- New page types added via `PAGE_COMPONENTS` object
- New design presets added via `TUNING_PRESETS` object
- New platform targets added via `PLATFORM_PRESETS` object
- Custom user inputs supported via string pass-through

**External Integration Points:**
- **Gemini CLI:** Required dependency for image generation
- **Bun runtime:** Execution environment for TypeScript
- **File system:** Storage for generated design images
- **@inquirer/prompts:** Interactive user input collection

## Change History

- **2025-11-05:** Initial architecture diagram created with DDD principles
