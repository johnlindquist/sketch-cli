# Website Sketch Generator 🎨

A CLI tool for generating diverse, professional website design mockups using AI. Generates multiple distinct design variations by calling Gemini separately for each variation with unique prompts and specifications.

## Features

- **Flexible Website Types**: Works with any website concept (e-commerce, SaaS, portfolio, etc.)
- **Multiple Page Templates**: Home, About, Product, Cart, Contact, Sales, Blog
- **20+ Color Palettes**: Developer-familiar themes (Dracula, Nord, Tokyo Night, GitHub, Material, etc.)
- **Design Variety**: Generates multiple distinct design variations (default: 5, customizable)
- **Sequential Generation**: Calls Gemini separately for each variation with unique layout approaches
- **Professional Elements**: Includes all essential page components and UI elements
- **Execute by Default**: Generates immediately unless `--dry-run` is specified

## Installation

```bash
bun install
```

## Usage

### Basic Command Structure

```bash
bun run sketch <website-type> <page-type> [options]
```

### Examples

```bash
# Generate shoe marketplace homepage (executes by default, 5 variations)
bun run sketch "shoe marketplace" home

# Preview prompts without executing
bun run sketch "gaming company" about --dry-run

# Create 10 variations for pet adoption cart page
bun run sketch "pet adoption" cart --count 10

# Use Dracula color palette
bun run sketch "developer tools" home --palette dracula

# Combine palette, tuning, and platform
bun run sketch "crypto exchange" product --palette tokyo-night --tuning tech --platform mobile

# Use custom color palette
bun run sketch "art gallery" home --palette "burgundy #8B0000, gold #FFD700, cream #FFFDD0"

# Single variation for quick testing
bun run sketch "recipe sharing" blog --count 1
```

## Available Page Types

| Page Type | Description |
|-----------|-------------|
| `home` | Main landing page with hero section, featured content, and CTAs |
| `about` | Company story, team profiles, mission, and values |
| `product` | Product detail with images, specs, pricing, and reviews |
| `cart` | Shopping cart with items, pricing breakdown, and checkout |
| `contact` | Contact form, location map, and contact information |
| `sales` | Marketing landing page with conversion-focused elements |
| `blog` | Blog listing with article cards and sidebar |

## How It Works

1. **Dynamic Prompt Generation**: Combines website type with page-specific components
2. **Sequential Variation**: Generates each design separately with unique layout approaches
3. **Layout Cycling**: Rotates through design styles (minimalist, bold, elegant, grid-based, asymmetric, etc.)
4. **Color Palette Application**: Applies developer-familiar color schemes (VS Code themes, GitHub, Material Design)
5. **Multiple Gemini Calls**: Calls `gemini --yolo` separately for each variation to ensure distinct designs
6. **Unique Filenames**: Each variation gets a unique filename with timestamp and variation number

## Color Palettes

By default, no color palette is applied (AI chooses colors naturally). You can optionally specify a palette:

**VS Code Themes:**
- Dracula, Monokai, One Dark, Nord, Tokyo Night
- Night Owl, Cobalt2, Synthwave '84, Palenight
- Ayu Dark, Shades of Purple, Catppuccin Mocha, Rosé Pine
- Solarized Dark/Light, Gruvbox Dark/Light

**GitHub & Material:**
- GitHub Dark, GitHub Light
- Material Design

**Custom Palettes:**
Provide your own color scheme with hex codes

View all palettes with descriptions:
```bash
bun run sketch --list-palettes
```

## Design Styles (Tuning Presets)

- Creative & Artistic, Professional & Corporate
- Minimalist & Clean, Vibrant & Energetic
- Elegant & Sophisticated, Modern & Trendy
- Playful & Fun, Dark Mode Focused
- Brutalist & Raw, Luxury & Premium
- Tech & Futuristic, Organic & Natural
- Retro & Vintage, Editorial & Magazine-Style
- Accessibility Focused

View all tuning presets with descriptions:
```bash
bun run sketch --list-tuning
```

## Customization

### Adding New Page Types

Edit `src/prompt-templates.ts` and add to `PAGE_COMPONENTS`:

```typescript
mypage: {
  name: "my custom page",
  elements: [
    "element 1 description",
    "element 2 description",
    // ...
  ]
}
```

### Modifying Design Styles

Update the `DESIGN_STYLES` array in `src/prompt-templates.ts`:

```typescript
export const DESIGN_STYLES = [
  "your custom style description",
  // ...
];
```

## Requirements

- [Bun](https://bun.sh) runtime
- `gemini` CLI tool (must be available in PATH)

## Project Structure

```
.
├── src/
│   ├── index.ts              # CLI entry point
│   └── prompt-templates.ts   # Prompt generation logic
├── package.json
└── README.md
```

## Command-Line Options

- `--dry-run` - Preview prompts without executing (default: executes immediately)
- `--count, -c <number>` - Number of variations (default: 5)
- `--tuning, -t <preset>` - Design tuning preset or custom direction
- `--palette <preset>` - Color palette (omit for AI-chosen colors)
- `--platform, -p <preset>` - Target platform (website, mobile, tablet, etc.)
- `--reference, -r <path>` - Reference image for visual inspiration
- `--list-tuning` - List all tuning presets
- `--list-palettes` - List all color palettes
- `--list-platforms` - List all platform presets

## Tips

- Use quotes around website types with spaces: `"hair salon"`
- Executes immediately by default - use `--dry-run` to preview prompts first
- Use `--count` to control how many variations to generate (default: 5)
- Each variation gets a different layout approach for true variety
- Lower count (1-3) for quick testing, higher count (10+) for extensive exploration
- Omit `--palette` to let AI choose colors naturally

## License

MIT
