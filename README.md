# sketch-cli

AI-powered design mockup and component variation generator. Generate multiple design variations of website pages and UI components using AI image generation.

## Features

- **Website Page Generation**: Create complete page designs (home, about, product, cart, contact, sales, blog)
- **Component Variations**: Generate design variations of individual UI components
- **Design Presets**: Apply curated design styles (Material, iOS, glassmorphism, neumorphism, etc.)
- **Color Palettes**: Use popular color schemes (Dracula, Nord, Tokyo Night, Monokai, etc.)
- **Platform Targeting**: Design for different platforms (web, mobile, tablet, watch, TV, etc.)
- **Reference Images**: Use existing designs as visual inspiration
- **Interactive & CLI Modes**: Choose between guided prompts or direct command execution

## Installation

```bash
bun install
```

## Usage

### Website Page Generation

Generate complete website page designs:

```bash
# Interactive mode
bun run sketch

# Direct mode - generates 5 variations by default
bun run sketch "shoe marketplace" home

# With design tuning
bun run sketch "gaming company" about --tuning creative

# With color palette
bun run sketch "crypto exchange" product --palette tokyo-night

# Target specific platform
bun run sketch "fitness tracker" home --platform mobile

# Use reference image for inspiration
bun run sketch "hair salon" home --reference ~/inspiration.jpg

# Generate more variations
bun run sketch "pet adoption" cart --count 10

# Preview prompts without executing
bun run sketch "tech startup" sales --dry-run
```

### Component Variations

Generate design variations of UI components:

```bash
# Interactive mode
bun run component

# Generate variations from a component image
bun run component ./button.png

# Specify component type
bun run component ./widget.png --type button

# Apply design style
bun run component ./card.png --style material

# Apply color palette
bun run component ./form.png --palette dracula

# Combine style and palette
bun run component ./modal.png --style glassmorphism --palette nord

# Generate 10 variations
bun run component ./nav.png --count 10

# Preview without executing
bun run component ./button.png --style ios --dry-run
```

## Available Options

### Page Types
- `home` - Main landing page with hero and featured content
- `about` - Company story, team, and mission
- `product` - Individual product detail page
- `cart` - Shopping cart with items and checkout
- `contact` - Contact form and information
- `sales` - Marketing/sales landing page with conversion focus
- `blog` - Blog listing or article feed

### Component Types
- `button`, `card`, `form`, `nav`, `modal`, `table`, `list`
- `header`, `footer`, `badge`, `icon`, `dropdown`, `toggle`
- `toast`, `avatar`

### Design Tuning Presets
- `creative` - Experimental layouts, bold colors
- `professional` - Clean, trustworthy, business-focused
- `minimal` - Maximum whitespace, simple typography
- `vibrant` - Bold colors, dynamic layouts
- `elegant` - Refined typography, luxury feel
- `modern` - Latest design trends
- `playful` - Friendly, approachable
- `dark` - Dark mode focused
- `brutalist` - Raw, unconventional
- And more... (use `--list-tuning` to see all)

### Component Style Presets
- `material` - Google Material Design
- `ios` - Apple iOS/HIG style
- `glassmorphism` - Frosted glass effects
- `neumorphism` - Soft UI with shadows
- `minimal` - Ultra-clean simplicity
- `bold` - High contrast, vibrant
- And more... (use `--list-styles` to see all)

### Color Palettes
- VS Code themes: `dracula`, `monokai`, `one-dark`, `nord`, `tokyo-night`, `synthwave`
- GitHub themes: `github-dark`, `github-light`
- Retro themes: `gruvbox-dark`, `gruvbox-light`
- And more... (use `--list-palettes` to see all)

### Platform Presets
- `website` - Desktop website design
- `mobile` - Native mobile app interface
- `tablet` - Tablet application
- `watch` - Smartwatch/wearable
- `tv` - Smart TV/streaming interface
- And more... (use `--list-platforms` to see all)

## Command Reference

### Website Generator
```bash
bun run sketch [website-type] [page-type] [options]

Options:
  --dry-run               Show prompts without executing
  --count, -c <number>    Number of variations (default: 5)
  --tuning, -t <value>    Design tuning preset
  --palette <value>       Color palette
  --reference, -r <path>  Reference image path
  --platform, -p <value>  Target platform
  --list-tuning           List all tuning presets
  --list-palettes         List all color palettes
  --list-platforms        List all platforms
  --help, -h              Show help
```

### Component Generator
```bash
bun run component [image-path] [options]

Options:
  --dry-run               Show prompts without executing
  --count, -c <number>    Number of variations (default: 5)
  --type, -t <value>      Component type
  --description <text>    Custom description
  --style, -s <value>     Variation style preset
  --palette <value>       Color palette
  --list-styles           List all style presets
  --list-types            List all component types
  --list-palettes         List all color palettes
  --help, -h              Show help
```

## How It Works

1. You provide website type, page type, or component image
2. Choose design direction, style presets, and color palettes
3. The tool generates detailed AI prompts
4. Multiple design variations are created automatically
5. Each variation explores different visual approaches while maintaining functionality

## Examples

```bash
# Create a minimalist shoe marketplace homepage with Nord colors
bun run sketch "shoe marketplace" home --tuning minimal --palette nord

# Generate Material Design button variations
bun run component ./button.png --style material --count 5

# Design a mobile fitness app homepage with dark mode
bun run sketch "fitness tracker" home --platform mobile --tuning dark

# Create luxury e-commerce product pages
bun run sketch "jewelry store" product --tuning luxe --palette rose-pine
```

## Requirements

- [Bun](https://bun.sh/) runtime
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) - Official Google Gemini CLI
- [nanobanana](https://github.com/gemini-cli-extensions/nanobanana) - Gemini CLI extension for AI image generation

### Installing nanobanana

1. **Install the Gemini CLI extension:**
   ```bash
   gemini extensions install https://github.com/gemini-cli-extensions/nanobanana
   ```

2. **Set up your API key:**
   ```bash
   export NANOBANANA_GEMINI_API_KEY="your-api-key-here"
   # Or use one of these alternatives:
   # export NANOBANANA_GOOGLE_API_KEY="your-api-key-here"
   # export GEMINI_API_KEY="your-api-key-here"
   # export GOOGLE_API_KEY="your-api-key-here"
   ```

3. **Restart the Gemini CLI** to activate the `/generate` command

For detailed authentication setup, see the [Gemini CLI authentication documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/authentication.md).

## License

MIT
