# Component Variation Creation Journey

**Type:** Sequence Diagram
**Last Updated:** 2025-11-07
**Related Files:**
- `src/component.ts`
- `src/component-types.ts`
- `src/variation-presets.ts`
- `src/color-palettes.ts`

## Purpose

Shows the complete user journey for generating UI component variations from a reference image, highlighting how the tool enables rapid design exploration without requiring design expertise.

## Diagram

```mermaid
sequenceDiagram
    actor User as Designer/Developer
    participant CLI as CLI Interface
    participant Parser as Argument Parser
    participant Interactive as Interactive Mode
    participant Builder as Component Prompt Builder
    participant Gemini as Gemini AI
    participant FS as File System

    Note over User,FS: Front-Stage: User Experience Flow

    User->>CLI: bun run component [args]

    alt No Arguments Provided
        Note over User,Interactive: BENEFIT: Guided workflow for<br/>component exploration
        CLI->>Interactive: Launch interactive mode
        Interactive->>User: Prompt: "Path to component image"
        User->>Interactive: "./button.png"
        Interactive->>User: Prompt: "Select component type"
        User->>Interactive: "Button/CTA" (or auto-detect)
        Interactive->>User: Prompt: "Select variation style"
        User->>Interactive: "Material Design"
        Interactive->>User: Prompt: "Select color palette"
        User->>Interactive: "Dracula" (or none)
        Interactive->>User: Prompt: "Number of variations?"
        User->>Interactive: "5"
        Interactive->>User: Prompt: "Dry run only?"
        User->>Interactive: No
        Interactive->>User: Shows equivalent CLI command<br/>for future direct use
    else Direct Arguments with Image
        Note over User,Parser: BENEFIT: Fast iteration for<br/>experienced users
        CLI->>Parser: Parse arguments and flags
        Parser->>Parser: Validate image path exists
        Parser->>Parser: Validate component type (if specified)
        Parser->>Parser: Extract style and palette flags
        Parser->>Parser: Parse variation count
    end

    Note over Builder,Gemini: Back-Stage: Prompt Construction

    loop For each variation (1 to count)
        CLI->>Builder: buildComponentPrompt(image, type, style, palette, variationNumber)
        Builder->>Builder: Load COMPONENT_TYPES[type] focus areas
        Builder->>Builder: Apply variation style modifier (if specified)
        Builder->>Builder: Apply color palette modifier (if specified)
        Builder->>Builder: Create unique file naming scheme
        Builder-->>CLI: Complete component variation prompt

        alt Dry Run Mode
            Note over User,CLI: BENEFIT: Preview prompts<br/>before generation
            CLI->>User: Display prompt preview
        else Execute Mode
            Note over User,FS: BENEFIT: Automated generation<br/>of multiple variations
            CLI->>User: Display prompt preview
            CLI->>Gemini:NANOBANANA_MODEL=gemini-3-pro-image-preview gemini --yolo [prompt]
            Note over Gemini: AI generates component variation<br/>following style and palette
            Gemini->>FS: Save component variation image<br/>with structured naming
            FS-->>User: componentType_style_timestamp_v#.png
        end
    end

    alt Execute Mode Complete
        User->>User: Reviews all variations<br/>side-by-side
        Note over User: BENEFIT: Multiple design directions<br/>enable informed choice
        User->>User: Selects preferred variation(s)<br/>or identifies new direction
    end

    alt User wants different style/palette
        Note over User,CLI: BENEFIT: Easy to explore<br/>different aesthetic directions
        User->>CLI: bun run component ./button.png --style ios --palette nord
        Note over Builder: Different style and palette<br/>produce distinct variations
        Builder-->>Gemini: New prompts with different<br/>design direction
        Gemini->>FS: Save NEW variations with<br/>different aesthetic
    end

    Note over User: User has explored multiple<br/>design directions for component
```

## Key Insights

**User Impact:**
- **Reference-based approach** enables users to iterate on existing designs rather than start from scratch
- **Component type selection** ensures AI focuses on appropriate design considerations (e.g., touch targets for buttons)
- **20+ variation style presets** provide instant access to different design systems (Material, iOS, Glassmorphism, etc.)
- **20+ color palette presets** enable rapid color scheme exploration with developer-friendly themes
- **Configurable variation count** allows users to generate as many or as few options as needed
- **Dry run mode** prevents wasted AI credits when experimenting with prompt parameters
- **Structured file naming** makes it easy to track which style/palette produced which variation

**Technical Enablers:**
- `buildComponentPrompt()` constructs focused prompts emphasizing component-specific design considerations
- **COMPONENT_TYPES** provides 15 component definitions with type-specific focus areas
- **VARIATION_PRESETS** offers 20 style presets with detailed design system instructions
- **COLOR_PALETTES** includes 20+ curated color schemes with specific color codes
- **Reference image path** passed directly to Gemini for visual context
- **Unique identifiers** in prompts ensure Gemini generates distinct files per variation

**Error Recovery:**
- Invalid image paths detected before generation begins
- Invalid component types show list of valid options
- Missing required arguments trigger comprehensive help display
- Gemini failures return exit codes with error context
- File system errors from Gemini visible in stderr

**Workflow Flexibility:**
- Start with any existing component screenshot or mockup
- Auto-detect component type or specify explicitly for better focus
- Mix and match styles with color palettes for unique combinations
- Generate 1 variation for quick tests or 10+ for comprehensive exploration
- Interactive mode teaches CLI syntax for future automation

## Change History

- **2025-11-07:** Initial diagram created for component variation feature
