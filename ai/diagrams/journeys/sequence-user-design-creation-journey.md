# User Design Creation Journey

**Type:** Sequence Diagram
**Last Updated:** 2025-11-05
**Related Files:**
- `src/index.ts`
- `src/prompt-templates.ts`

## Purpose

Shows the complete user journey from initial concept to generated design sketches, highlighting how the tool reduces friction in the design ideation process and enables rapid iteration.

## Diagram

```mermaid
sequenceDiagram
    actor User as Designer/Developer
    participant CLI as CLI Interface
    participant Parser as Argument Parser
    participant Interactive as Interactive Mode
    participant Builder as Prompt Builder
    participant Gemini as Gemini AI
    participant FS as File System

    Note over User,FS: Front-Stage: User Experience Flow

    User->>CLI: bun run sketch [args]

    alt No Arguments Provided
        Note over User,Interactive: BENEFIT: Lower barrier to entry<br/>for new users
        CLI->>Interactive: Launch interactive mode
        Interactive->>User: Prompt: "What type of website?"
        User->>Interactive: "shoe marketplace"
        Interactive->>User: Prompt: "Select page type"
        User->>Interactive: "home"
        Interactive->>User: Prompt: "Select design tuning"
        User->>Interactive: "vibrant"
        Interactive->>User: Prompt: "Select platform"
        User->>Interactive: "mobile"
        Interactive->>User: Prompt: "Reference image path?"
        User->>Interactive: (optional path or skip)
        Interactive->>User: Prompt: "Execute immediately?"
        User->>Interactive: Yes
        Interactive->>User: Shows equivalent CLI command<br/>for future direct use
    else Direct Arguments
        Note over User,Parser: BENEFIT: Fast workflow for<br/>experienced users
        CLI->>Parser: Parse arguments
        Parser->>Parser: Validate website type
        Parser->>Parser: Validate page type
        Parser->>Parser: Extract flags (tuning, platform, etc.)
    end

    Note over Builder,Gemini: Back-Stage: Prompt Construction

    CLI->>Builder: buildPrompt(websiteType, pageType, options)
    Builder->>Builder: Load PAGE_COMPONENTS[pageType]
    Builder->>Builder: Apply tuning modifier (if specified)
    Builder->>Builder: Apply platform modifier (if specified)
    Builder->>Builder: Generate 5 layout approaches
    Builder->>Builder: Generate 5 presentation formats
    Builder->>Builder: Create file naming scheme
    Builder-->>CLI: Complete AI prompt string

    alt Preview Mode (no --execute)
        Note over User,CLI: BENEFIT: User can review/modify<br/>prompt before generation
        CLI->>User: Display generated prompt
        CLI->>User: "Tip: Add --execute to run"
        User->>User: Reviews prompt<br/>Decides if satisfactory
    else Execute Mode (--execute)
        Note over User,FS: BENEFIT: Instant gratification<br/>End-to-end automation
        CLI->>User: Display prompt preview
        CLI->>Gemini: gemini --yolo [prompt]
        Note over Gemini: AI generates 5 design variations<br/>following all specifications
        Gemini->>FS: Save 5 design images<br/>with structured naming
        FS-->>User: website_page_platform_tuning_timestamp_v1-5.png
        User->>User: Reviews 5 designs<br/>Selects preferred direction
    end

    alt User wants different variations
        Note over User,CLI: BENEFIT: Randomization ensures<br/>fresh results each run
        User->>CLI: bun run sketch [same args] --execute
        Note over Builder: New random design styles &<br/>presentation formats selected
        Builder-->>Gemini: Different prompt (same direction,<br/>new layout variations)
        Gemini->>FS: Save 5 NEW design variations
    end

    Note over User: User has multiple design options<br/>to choose from or iterate on
```

## Key Insights

**User Impact:**
- **Two interaction modes** support both beginners (interactive) and power users (direct CLI)
- **Interactive mode shows equivalent CLI command** to teach users the direct syntax
- **Preview mode** lets users validate the prompt before spending AI credits
- **Execute mode** provides end-to-end automation for experienced users
- **Randomization** ensures running the same command twice produces fresh design variations
- **Structured file naming** makes it easy to find and compare design variations later

**Technical Enablers:**
- `parseArgs()` validates all inputs before proceeding
- Interactive mode uses `@inquirer/prompts` for user-friendly input collection
- `buildPrompt()` encapsulates all prompt generation logic
- `Bun.spawn()` executes Gemini CLI with proper process handling
- Error handling provides clear feedback when Gemini fails

**Error Recovery:**
- Invalid page types show list of valid options
- Missing required arguments trigger help display
- Gemini failures return exit codes to the user
- File system errors from Gemini are visible in stderr

## Change History

- **2025-11-05:** Initial diagram created showing user journey with DDD principles
