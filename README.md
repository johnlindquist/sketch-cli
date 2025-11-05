# Website Sketch Generator 🎨

A CLI tool for generating diverse, hand-drawn style website design sketches using AI. Creates 5 completely different design variations for any website type and page combination.

## Features

- **Flexible Website Types**: Works with any website concept (e-commerce, SaaS, portfolio, etc.)
- **Multiple Page Templates**: Home, About, Product, Cart, Contact, Sales, Blog
- **Design Variety**: Each generation creates 5 distinct design styles and approaches
- **Professional Elements**: Includes all essential page components and UI elements
- **Hand-Drawn Aesthetic**: Generates realistic marker sketch wireframes

## Installation

```bash
bun install
```

## Usage

### Basic Command Structure

```bash
bun run sketch <website-type> <page-type> [--execute]
```

### Examples

```bash
# Preview prompt for shoe marketplace homepage
bun run sketch "shoe marketplace" home

# Generate and execute gaming company about page
bun run sketch "gaming company" about --execute

# Create cart page for pet adoption site
bun run sketch "pet adoption" cart -e

# Sales page for SaaS product
bun run sketch "project management software" sales --execute

# Blog listing for cooking website
bun run sketch "recipe sharing" blog -e
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
2. **Style Randomization**: Selects 5 different design approaches (minimalist, bold, elegant, etc.)
3. **Variation Techniques**: Applies different sketch styles (wireframe, rough sketch, blueprint, etc.)
4. **Gemini Integration**: Passes the constructed prompt to `gemini --yolo` for image generation

## Design Styles Included

- Minimalist with whitespace
- Bold and modern
- Elegant and sophisticated
- Playful and energetic
- Professional corporate
- Editorial magazine-style
- Tech-forward with gradients
- Organic and natural
- Retro-inspired
- Experimental and artistic

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

## Tips

- Use quotes around website types with spaces: `"hair salon"`
- Add `--execute` to automatically run the gemini command
- Without `--execute`, the tool just shows the generated prompt
- Each run randomizes the 5 design variations for fresh results

## License

MIT
