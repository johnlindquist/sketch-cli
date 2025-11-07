# Color Palette System

**Type:** Feature Diagram
**Last Updated:** 2025-11-07
**Related Files:**
- `src/color-palettes.ts`
- `src/component.ts`
- `src/prompt-templates.ts` (future integration for website pages)

## Purpose

Demonstrates how the color palette system enables users to apply consistent, developer-friendly color schemes to both component variations and website designs, bridging the gap between popular code editor themes and UI design.

## Diagram

```mermaid
graph TB
    subgraph "Front-Stage: User Experience"
        A[User wants specific<br/>color scheme] -->|"Familiar theme names"| B[Select Color Palette]
        B -->|"e.g., 'dracula', 'nord',<br/>'tokyo-night'"| C{Palette Type}
        C -->|"Preset key"| D[20+ Curated Palettes]
        C -->|"Custom string"| E[User-Defined Colors]

        D --> F[Palette Applied to Design]
        E --> F

        F -->|"Developer-familiar colors<br/>in UI designs"| G[Consistent Brand/Theme<br/>Across Components]
    end

    subgraph "Palette Categories"
        H[VS Code Themes<br/>15 palettes] -->|"Dracula, Monokai, Nord,<br/>Tokyo Night, One Dark,<br/>Solarized, Night Owl,<br/>Cobalt2, Synthwave,<br/>Palenight, Ayu Dark,<br/>Shades of Purple,<br/>Catppuccin Mocha,<br/>Rose Pine, Gruvbox"| I[Popular Developer Themes]

        J[GitHub Themes<br/>2 palettes] -->|"GitHub Dark,<br/>GitHub Light"| K[Familiar Code Hosting]

        L[Material Design<br/>1 palette] -->|"Google Material<br/>color system"| M[Design System Standard]

        N[Retro Themes<br/>2 palettes] -->|"Gruvbox Dark,<br/>Gruvbox Light"| O[Warm Retro Aesthetic]
    end

    subgraph "Back-Stage: Palette Structure"
        P[COLOR_PALETTES Object] -->|"Key: palette slug"| Q[Palette Definition]
        Q --> R[name: Display Name]
        Q --> S[description: Visual Summary]
        Q --> T[promptModifier: Detailed Instructions]

        T --> U[Specific Hex Codes<br/>for each color role]
        T --> V[Color Usage Guidelines<br/>e.g., primary, accent, error]
        T --> W[Aesthetic Instructions<br/>e.g., glow effects, contrast]
    end

    subgraph "Palette Application Flow"
        X[getPalettePromptModifier] -->|"Lookup preset"| Y{Palette Exists?}
        Y -->|"Yes"| Z[Return promptModifier<br/>with specific colors]
        Y -->|"No"| AA[Return custom string<br/>as-is]

        Z --> AB[Inject into AI Prompt]
        AA --> AB

        AB --> AC[MANDATORY COLOR PALETTE Section<br/>in prompt]
        AC -->|"All colors must follow<br/>specified palette"| AD[Gemini applies colors<br/>to generated design]
    end

    subgraph "Palette Examples with Color Codes"
        AE[Dracula Palette] --> AF["Background: #282a36<br/>Pink: #ff79c6<br/>Cyan: #8be9fd<br/>Green: #50fa7b<br/>Text: #f8f8f2"]

        AG[Nord Palette] --> AH["Background: #2e3440<br/>Frost Blue: #88c0d0<br/>Aurora Green: #a3be8c<br/>Aurora Pink: #b48ead<br/>Text: #eceff4"]

        AI[Tokyo Night Palette] --> AJ["Background: #1a1b26<br/>Neon Cyan: #7aa2f7<br/>Magenta: #bb9af7<br/>Teal: #7dcfff<br/>Text: #c0caf5"]
    end

    B -.->|"Component variations"| X
    D -.->|"Palette metadata"| P
    I -.->|"Developer familiarity"| F
    K -.->|"Professional consistency"| F
    M -.->|"Design system alignment"| F
    O -.->|"Aesthetic variety"| F

    style A fill:#E8F5E9
    style G fill:#E8F5E9
    style F fill:#E8F5E9
    style P fill:#FFF3E0
    style X fill:#FFF3E0
    style AB fill:#FFF3E0

    classDef userImpact fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px
    classDef technical fill:#FFF3E0,stroke:#FF9800,stroke-width:2px
```

## Key Insights

**User Impact:**
- **Developer-friendly themes** bring familiar VS Code color schemes into UI design work
- **20+ curated palettes** eliminate need to manually specify color codes
- **Specific hex codes included** in prompts ensure authentic color reproduction
- **Consistent theming** across multiple component variations using same palette
- **Professional color combinations** vetted by millions of developers using these themes daily
- **Dark and light options** for different design contexts (e.g., Solarized Dark/Light, Gruvbox Dark/Light)
- **Custom palette support** allows unlimited user-defined color schemes

**Palette Organization:**
- **VS Code Themes (15):** Most popular code editor themes for developer familiarity
- **GitHub Themes (2):** Professional, widely-recognized color schemes
- **Material Design (1):** Google's design system for consistency with Material UI
- **Retro Themes (2):** Warm, nostalgic color palettes for vintage aesthetics

**Technical Implementation:**
- Each palette includes:
  - **Name**: Human-readable display name
  - **Description**: Visual summary of the color scheme
  - **promptModifier**: Detailed instructions with specific hex codes for AI
- `getPalettePromptModifier()` function handles preset lookup and custom fallback
- Palette modifier injected as "MANDATORY" section in AI prompts
- AI instructed that "All colors must follow the specified palette"
- Works with both component variations and website page generation (future)

**Color Specification Format:**
```
Background: #282a36 (dark purple)
Primary: #ff79c6 (vibrant pink)
Accent: #8be9fd (cyan)
Success: #50fa7b (green)
Text: #f8f8f2 (light gray)
+ Usage guidelines for each color role
```

**Usage Patterns:**
1. **Component with palette**: `bun run component ./button.png --palette dracula`
2. **Style + palette combo**: `bun run component ./card.png --style glassmorphism --palette nord`
3. **Custom palette**: `bun run component ./form.png --palette "warm earth tones with terracotta and sage"`
4. **List palettes**: `bun run component --list-palettes`

**Why Developer Themes?**
- Developers already love and trust these color schemes
- Proven color combinations with good contrast and accessibility
- Familiar aesthetic makes designs feel comfortable to technical teams
- Easy to communicate: "Use Dracula theme" vs describing hex codes
- Strong brand recognition (Nord, Dracula, Gruvbox have dedicated followings)

**Extensibility:**
- Add new palette: Create entry in COLOR_PALETTES object
- Include specific hex codes for primary, accent, background, text, etc.
- Provide usage guidelines and aesthetic notes
- Automatically available in CLI and interactive mode

**Future Enhancement:**
- Integration with website page generator (`src/index.ts`)
- Palette combinations with tuning presets for website designs
- Palette validation and preview before generation
- Export palette as CSS variables or design tokens

## Change History

- **2025-11-07:** Initial diagram created for color palette system
