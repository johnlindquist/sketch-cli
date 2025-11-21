# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

sketch-cli is an AI-powered design mockup and component variation generator that creates multiple design variations using the Gemini CLI's image generation capabilities. The tool generates detailed prompts for AI image generation, enabling rapid exploration of different design directions for website pages and UI components.

## Core Commands

### Development
```bash
# Run website page generator
bun run sketch

# Run component variation generator
bun run component

# Direct website generation (non-interactive)
bun run sketch "shoe marketplace" home

# Direct component generation (non-interactive)
bun run component ./button.png
```

### Testing Commands
There are no formal tests in this project. Manual testing is done by running the generators with various options and inspecting the generated prompts and images.

## External Dependencies

This project relies on external CLI tools for actual image generation:
- **Gemini CLI** (`gemini`): Google's official Gemini CLI tool
- **nanobanana**: A Gemini CLI extension that provides the `/generate` command for AI image generation
- Commands are executed via `Bun.spawn(['gemini', '-m', model, '--yolo', prompt])`

The project does NOT handle image generation directly - it constructs detailed prompts and delegates to these external tools.

**Important**: The tool explicitly specifies a model (`-m` flag) to avoid the Gemini CLI's ClassifierStrategy routing bug that causes "Requested entity was not found" errors (see GitHub issues #12660, #12697). The default model is `gemini-2.5-flash`, configurable via the `SKETCH_GEMINI_MODEL` environment variable.

## Architecture

### Entry Points
- **src/index.ts**: Website page generator CLI (`bun run sketch`)
- **src/component.ts**: Component variation generator CLI (`bun run component`)

Both entry points follow the same pattern:
1. Parse CLI arguments OR enter interactive mode
2. Gather user inputs (website type, page type, design preferences, etc.)
3. Build detailed AI prompts using template builders
4. Execute prompts via Gemini CLI (`NANOBANANA_MODEL=gemini-3-pro-image-previewgemini -m <model> --yolo <prompt>`)

The `executeGeminiCommand()` function in both files handles the Gemini CLI invocation with automatic model selection.

### Preset System
The architecture uses a consistent preset system across multiple dimensions:

- **src/prompt-templates.ts**: Core page structure templates (PAGE_COMPONENTS), design styles, and the main `buildPrompt()` function
- **src/tuning-presets.ts**: Design direction presets (creative, professional, minimal, etc.) for website pages
- **src/platform-presets.ts**: Target platform presets (mobile, tablet, watch, tv, etc.)
- **src/variation-presets.ts**: Component style presets (material, ios, glassmorphism, etc.)
- **src/component-types.ts**: Component type definitions with focus areas (button, card, form, etc.)
- **src/color-palettes.ts**: Color palette presets (dracula, monokai, nord, tokyo-night, etc.)

Each preset file exports:
- A typed object containing preset definitions
- Helper functions to get prompt modifiers
- List functions to display available options to users

### Prompt Generation Strategy

The prompt builders create highly detailed, structured prompts that:
- Define the exact type of design to generate (page type or component type)
- Include mandatory modifiers (platform, design direction, color palette)
- Specify required UI elements based on page/component type
- Add extensive negative constraints (what NOT to include)
- Include file naming conventions with timestamps and slugs
- Add unique identifiers to ensure Gemini generates distinct files

Key insight: Prompts are extremely prescriptive to guide the AI toward producing single, clean design variations rather than comparison views or sketches.

### File Naming Convention

Generated images follow this pattern:
```
{website-slug}_{page-type}_{platform}_{tuning}_{timestamp}_v{number}.png
{component-type}_{style}_{timestamp}_v{number}.png
```

Timestamps format: `YYYYMMDD_HHMMSS`

### Interactive vs Direct Mode

Both tools support two execution modes:
- **Interactive mode**: Launched with no arguments, uses @inquirer/prompts to guide user through options
- **Direct mode**: All parameters passed as CLI arguments for scriptable, non-interactive execution

The interactive mode shows an equivalent CLI command after gathering inputs, teaching users the direct syntax.

## Code Conventions

- **Runtime**: Uses Bun exclusively (`#!/usr/bin/env bun` shebang)
- **Module system**: ESM (`"type": "module"` in package.json)
- **Imports**: Always use `.js` extension convention when importing from relative paths (TypeScript + ESM requirement)
- **Type safety**: TypeScript with strict typing (uses `as const` for preset objects)
- **Error handling**: Validates inputs, checks file existence, provides helpful error messages
- **CLI UX**: Uses emoji extensively for visual feedback, shows equivalent commands, supports --dry-run for preview

## Common Tasks

### Adding a New Page Type
1. Add entry to `PAGE_COMPONENTS` in `src/prompt-templates.ts`
2. Define the page name and required UI elements array
3. The system automatically exposes it in CLI help and interactive mode

### Adding a New Design Preset
1. Add entry to appropriate preset file (`tuning-presets.ts`, `variation-presets.ts`, etc.)
2. Include: name, description, and promptModifier
3. Export the type key and update the TypeScript union type
4. The system automatically includes it in `--list-*` commands and interactive mode

### Adding a New Color Palette
1. Add entry to `src/color-palettes.ts` with name, description, and colors array
2. The `getPalettePromptModifier()` function automatically formats it for prompts
3. Supports both preset keys and custom color strings via CLI

### Modifying Prompt Templates
Key considerations when editing `buildPrompt()` or `buildComponentPrompt()`:
- Maintain the extensive negative constraints (DO NOT sections)
- Keep the unique identifier system for Gemini's file generation
- Preserve the mandatory modifier sections (platform, tuning, palette)
- The prompts are carefully tuned to avoid common AI pitfalls (multiple variations in one image, sketches instead of designs, browser chrome, etc.)

## Project Structure Philosophy

- **Minimal dependencies**: Only @inquirer/prompts for interactive CLI, @types/bun for types
- **Prompt-centric**: The core value is in crafting detailed, effective AI prompts
- **Preset-driven**: Extensibility through preset configuration rather than code changes
- **CLI-first**: Designed for both interactive exploration and scriptable automation
- **Delegation model**: Image generation delegated to specialized external tools
