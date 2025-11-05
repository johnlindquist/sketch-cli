# Customization System

**Type:** Feature Diagram
**Last Updated:** 2025-11-05
**Related Files:**
- `src/tuning-presets.ts`
- `src/platform-presets.ts`
- `src/prompt-templates.ts`
- `src/index.ts`

## Purpose

Demonstrates how the three-dimensional customization system (Page Type × Tuning × Platform) enables users to generate precisely targeted design variations without needing design expertise.

## Diagram

```mermaid
graph LR
    subgraph "Front-Stage: User Customization Choices"
        A[Select Page Type<br/>7 options] -->|"Defines content<br/>requirements"| D[Customization Matrix]
        B[Select Design Tuning<br/>15 presets + custom] -->|"Guides aesthetic<br/>direction"| D
        C[Select Platform<br/>10 targets + custom] -->|"Adapts UI for<br/>device/context"| D
        D -->|"Unique combination<br/>per generation"| E[Tailored Design Output]
    end

    subgraph "Page Type Dimension (Content)"
        F[Home Page] -->|"Hero, features,<br/>CTAs, footer"| G[Page-Specific<br/>UI Elements]
        H[Product Page] -->|"Gallery, specs,<br/>reviews, cart"| G
        I[Cart Page] -->|"Items, pricing,<br/>checkout, security"| G
        J[Sales Page] -->|"USP, testimonials,<br/>urgency, guarantee"| G
        K[Blog Page] -->|"Articles, sidebar,<br/>newsletter"| G
        L[About Page] -->|"Story, team,<br/>timeline, values"| G
        M[Contact Page] -->|"Form, map,<br/>info, social"| G
    end

    subgraph "Tuning Dimension (Aesthetics)"
        N[Creative] -->|"Experimental,<br/>bold, artistic"| O[Design Style<br/>Modifier]
        P[Minimal] -->|"Whitespace,<br/>simple, clean"| O
        Q[Vibrant] -->|"Saturated,<br/>energetic, dynamic"| O
        R[Elegant] -->|"Refined,<br/>sophisticated, luxury"| O
        S[Dark] -->|"Dark mode,<br/>dramatic, modern"| O
        T[Brutalist] -->|"Raw, stark,<br/>unconventional"| O
        U[+ 9 More Presets<br/>+ Custom Input] -->|"User-defined<br/>direction"| O
    end

    subgraph "Platform Dimension (Context)"
        V[Mobile App] -->|"Touch-friendly,<br/>portrait, bottom nav"| W[Platform-Specific<br/>Constraints]
        X[Smartwatch] -->|"Glanceable,<br/>large targets, minimal"| W
        Y[TV Interface] -->|"Distance viewing,<br/>remote control, 16:9"| W
        Z[Desktop App] -->|"Menu bars,<br/>toolbars, multi-panel"| W
        AA[VR/Spatial] -->|"3D depth,<br/>floating panels, gaze"| W
        AB[+ 5 More Presets<br/>+ Custom Input] -->|"User-defined<br/>platform"| W
    end

    G -->|"Ensures complete<br/>page structure"| D
    O -->|"Applies aesthetic<br/>consistency"| D
    W -->|"Adapts layout<br/>for device"| D

    E -->|"5 layout variations<br/>within constraints"| AC[Design Variation 1:<br/>Grid-based]
    E --> AD[Design Variation 2:<br/>Asymmetric]
    E --> AE[Design Variation 3:<br/>Single-column]
    E --> AF[Design Variation 4:<br/>Multi-column]
    E --> AG[Design Variation 5:<br/>Card-based]

    AC -->|"User picks<br/>best fit"| AH[Selected Design<br/>Direction]
    AD -->|"User picks<br/>best fit"| AH
    AE -->|"User picks<br/>best fit"| AH
    AF -->|"User picks<br/>best fit"| AH
    AG -->|"User picks<br/>best fit"| AH

    style A fill:#E3F2FD
    style B fill:#E3F2FD
    style C fill:#E3F2FD
    style D fill:#FFF3E0
    style E fill:#E8F5E9
    style AH fill:#E8F5E9

    classDef userChoice fill:#E3F2FD,stroke:#2196F3,stroke-width:2px
    classDef processing fill:#FFF3E0,stroke:#FF9800,stroke-width:2px
    classDef outcome fill:#E8F5E9,stroke:#4CAF50,stroke-width:2px
```

## Key Insights

**User Impact:**
- **7 × 15 × 10 = 1,050 possible preset combinations** before considering custom inputs
- **Page Type selection** ensures all essential UI elements are included automatically
- **Tuning presets** let non-designers apply professional aesthetic directions consistently
- **Platform presets** handle device-specific constraints (touch targets, viewing distance, etc.)
- **5 layout variations** per generation provide structural diversity within the chosen direction
- **Custom inputs** for tuning and platform support unlimited user-defined scenarios

**Customization Strategy:**
- **Hierarchical application:** Page Type → Platform → Tuning → Layout → Presentation
- **Preset system reduces cognitive load:** Users select from curated options instead of describing from scratch
- **Custom fallback:** Any string not matching a preset becomes a custom modifier
- **Randomization for variety:** When no tuning specified, system randomizes DESIGN_STYLES
- **Consistent naming:** File names encode all customization choices for easy retrieval

**Technical Implementation:**
- `getTuningPromptModifier()` looks up preset or passes through custom string
- `getPlatformPromptModifier()` looks up preset or passes through custom string
- `buildPrompt()` conditionally includes modifiers in final prompt
- Layout approaches change based on whether tuning is specified
- Presentation formats randomized independently for additional variety

**Design Principles:**
- **Separation of dimensions:** Page, tuning, and platform are orthogonal concerns
- **Progressive disclosure:** Users can start simple (just page type) and add complexity
- **Sensible defaults:** Website platform and no tuning provide neutral baseline
- **Extensibility:** New presets added by updating configuration objects

## Change History

- **2025-11-05:** Initial diagram created showing customization system with DDD principles
