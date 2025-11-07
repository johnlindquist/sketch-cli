#!/usr/bin/env bun

import { input, select, confirm } from '@inquirer/prompts';
import { COMPONENT_TYPES, type ComponentTypeKey } from './component-types';
import { VARIATION_PRESETS, getVariationPromptModifier, listVariationPresets, type VariationPresetKey } from './variation-presets';
import { COLOR_PALETTES, getPalettePromptModifier, listColorPalettes, type ColorPaletteKey } from './color-palettes';
import { existsSync } from 'fs';
import { resolve } from 'path';

interface ComponentOptions {
  imagePath: string;
  componentType?: ComponentTypeKey;
  description?: string;
  dryRun?: boolean;
  style?: string;
  palette?: string;
  count?: number;
  interactive?: boolean;
}

function showHelp() {
  console.log(`
🎨 Component Variation Generator

Generate multiple design variations of UI components from a reference image.

USAGE:
  bun run component [options]                    # Interactive mode
  bun run component <image-path> [flags]         # Direct mode with image

ARGUMENTS:
  image-path      Path to the component image (required)

FLAGS:
  --dry-run               Show generated prompts without executing
  --count, -c <number>    Number of variations to generate (default: 5)
  --type, -t <value>      Component type (button, card, form, nav, modal, etc.)
  --description <text>    Custom component description
  --style, -s <value>     Variation style preset (material, ios, glassmorphism, etc.)
  --palette <value>       Apply color palette (dracula, monokai, nord, etc.)
  --list-styles           List all available variation style presets
  --list-types            List all available component types
  --list-palettes         List all available color palettes
  --help, -h              Show this help message

COMPONENT TYPES:
  button, card, form, nav, modal, table, list, header, footer,
  badge, icon, dropdown, toggle, toast, avatar
  (use --list-types for descriptions)

VARIATION STYLES:
  material, ios, fluent, neumorphism, glassmorphism, minimal, bold,
  gradient, neon, organic, elegant, playful, and more
  (use --list-styles for all options)

COLOR PALETTES:
  dracula, monokai, nord, github-dark, tokyo-night, synthwave, etc.
  (use --list-palettes for all options)

EXAMPLES:
  # Interactive mode (prompts for all options)
  bun run component

  # Generate variations from button image
  bun run component ./button.png

  # Generate with Material Design style
  bun run component ./card.png --style material

  # Specify component type
  bun run component ./widget.png --type button --description "primary CTA button"

  # Apply color palette
  bun run component ./form.png --palette dracula

  # Combine style and palette
  bun run component ./modal.png --style glassmorphism --palette nord

  # Generate 10 variations
  bun run component ./nav.png --count 10

  # Preview without executing
  bun run component ./button.png --style ios --dry-run

  # List available styles
  bun run component --list-styles

  # List component types
  bun run component --list-types

  # List color palettes
  bun run component --list-palettes

HOW IT WORKS:
  1. Provide a reference image of your component
  2. Select (or specify) the component type
  3. Choose variation styles to explore different design approaches
  4. The tool generates multiple variations maintaining the component's purpose
     while exploring different visual treatments

TIPS:
  - Start with a clean screenshot of your component
  - Use --description to provide context about the component's purpose
  - Try different styles to explore diverse design directions
  - Combine styles with color palettes for unique results
`);
}

function parseArgs(): ComponentOptions | null {
  const args = process.argv.slice(2);

  // Check for list flags
  if (args.includes('--list-styles')) {
    listVariationPresets();
    return null;
  }

  if (args.includes('--list-types')) {
    listComponentTypes();
    return null;
  }

  if (args.includes('--list-palettes')) {
    listColorPalettes();
    return null;
  }

  // Check for help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  // Interactive mode if no args
  if (args.length === 0) {
    return { imagePath: '', interactive: true };
  }

  // Parse flags
  const dryRun = args.includes('--dry-run');

  let componentType: ComponentTypeKey | undefined;
  const typeIndex = args.findIndex(arg => arg === '--type' || arg === '-t');
  if (typeIndex !== -1 && args[typeIndex + 1]) {
    const typeArg = args[typeIndex + 1];
    if (Object.keys(COMPONENT_TYPES).includes(typeArg)) {
      componentType = typeArg as ComponentTypeKey;
    } else {
      console.error(`❌ Error: Invalid component type "${typeArg}"`);
      console.error(`   Valid options: ${Object.keys(COMPONENT_TYPES).join(', ')}\n`);
      return null;
    }
  }

  let description: string | undefined;
  const descIndex = args.findIndex(arg => arg === '--description');
  if (descIndex !== -1 && args[descIndex + 1]) {
    description = args[descIndex + 1];
  }

  let style: string | undefined;
  const styleIndex = args.findIndex(arg => arg === '--style' || arg === '-s');
  if (styleIndex !== -1 && args[styleIndex + 1]) {
    style = args[styleIndex + 1];
  }

  let palette: string | undefined;
  const paletteIndex = args.findIndex(arg => arg === '--palette');
  if (paletteIndex !== -1 && args[paletteIndex + 1]) {
    palette = args[paletteIndex + 1];
  }

  let count: number | undefined;
  const countIndex = args.findIndex(arg => arg === '--count' || arg === '-c');
  if (countIndex !== -1 && args[countIndex + 1]) {
    const parsedCount = parseInt(args[countIndex + 1], 10);
    if (isNaN(parsedCount) || parsedCount < 1) {
      console.error('❌ Error: --count must be a positive integer\n');
      return null;
    }
    count = parsedCount;
  }

  // Filter out flags to get positional arguments
  const positionalArgs = args.filter(arg =>
    !arg.startsWith('-') &&
    arg !== componentType &&
    arg !== description &&
    arg !== style &&
    arg !== palette &&
    arg !== (count?.toString())
  );

  if (positionalArgs.length < 1) {
    console.error('❌ Error: Image path is required\n');
    showHelp();
    return null;
  }

  const imagePath = positionalArgs[0];

  // Validate image path exists
  const resolvedPath = resolve(imagePath);
  if (!existsSync(resolvedPath)) {
    console.error(`❌ Error: Image file not found: ${imagePath}\n`);
    return null;
  }

  return { imagePath, componentType, description, dryRun, style, palette, count };
}

function listComponentTypes(): void {
  console.log('\n🧩 Available Component Types:\n');
  Object.entries(COMPONENT_TYPES).forEach(([key, type]) => {
    console.log(`  ${key.padEnd(15)} - ${type.name}`);
    console.log(`  ${' '.repeat(18)}${type.description}\n`);
  });
}

async function interactiveMode(): Promise<ComponentOptions> {
  console.log('\n🎨 Component Variation Generator - Interactive Mode\n');

  // Get image path
  const imagePath = await input({
    message: 'Path to component image:',
    validate: (value) => {
      const resolvedPath = resolve(value);
      if (!existsSync(resolvedPath)) {
        return `File not found: ${value}`;
      }
      return true;
    }
  });

  // Get component type
  const componentTypeChoices = [
    { name: 'Auto-detect (AI will determine type)', value: '__auto__' },
    ...Object.entries(COMPONENT_TYPES).map(([key, value]) => ({
      name: `${value.name} - ${value.description}`,
      value: key,
    })),
  ];

  const componentTypeSelection = await select({
    message: 'Select component type:',
    choices: componentTypeChoices,
  });

  const componentType = componentTypeSelection === '__auto__' ? undefined : componentTypeSelection as ComponentTypeKey;

  // Get custom description if needed
  let description: string | undefined;
  if (!componentType) {
    const needsDescription = await confirm({
      message: 'Add custom description for the component?',
      default: false,
    });

    if (needsDescription) {
      description = await input({
        message: 'Describe this component:',
      });
    }
  }

  // Get variation style
  const styleChoices = [
    { name: 'Mixed (variety of styles)', value: '__mixed__' },
    ...Object.entries(VARIATION_PRESETS).map(([key, preset]) => ({
      name: `${preset.name} - ${preset.description}`,
      value: key,
    })),
    { name: 'Custom (enter your own)', value: '__custom__' },
  ];

  const styleSelection = await select({
    message: 'Select variation style:',
    choices: styleChoices,
  });

  let style: string | undefined;
  if (styleSelection === '__custom__') {
    style = await input({
      message: 'Enter custom style direction:',
    });
  } else if (styleSelection !== '__mixed__') {
    style = styleSelection;
  }

  // Get color palette
  const paletteChoices = [
    { name: 'None (keep original colors)', value: '__none__' },
    ...Object.entries(COLOR_PALETTES).map(([key, preset]) => ({
      name: `${preset.name} - ${preset.description}`,
      value: key,
    })),
    { name: 'Custom (enter your own)', value: '__custom__' },
  ];

  const paletteSelection = await select({
    message: 'Select color palette:',
    choices: paletteChoices,
  });

  let palette: string | undefined;
  if (paletteSelection === '__custom__') {
    palette = await input({
      message: 'Enter custom color palette:',
    });
  } else if (paletteSelection !== '__none__') {
    palette = paletteSelection;
  }

  // Get count
  const countInput = await input({
    message: 'Number of variations to generate:',
    default: '5',
  });
  const count = parseInt(countInput, 10);

  // Dry run?
  const dryRun = await confirm({
    message: 'Dry run only (show prompts without executing)?',
    default: false,
  });

  return {
    imagePath,
    componentType,
    description,
    dryRun,
    style,
    palette,
    count,
  };
}

function buildComponentPrompt(
  imagePath: string,
  componentType: ComponentTypeKey | undefined,
  description: string | undefined,
  variationNumber: number,
  styleModifier?: string,
  paletteModifier?: string
): string {
  const timestamp = generateTimestamp();
  const componentTypeSlug = componentType || 'component';
  const styleSlug = styleModifier ? slugify(styleModifier.split('.')[0].substring(0, 20)) : 'var';
  const filename = `${componentTypeSlug}_${styleSlug}_${timestamp}_v${variationNumber}.png`;

  // Build component-specific instructions
  let componentInstructions = '';
  if (componentType && COMPONENT_TYPES[componentType]) {
    const component = COMPONENT_TYPES[componentType];
    componentInstructions = `\nCOMPONENT TYPE: ${component.name}\n\nFOCUS AREAS FOR THIS COMPONENT:\n${component.focusAreas.map(area => `- ${area}`).join('\n')}\n`;
  } else if (description) {
    componentInstructions = `\nCOMPONENT DESCRIPTION: ${description}\n`;
  }

  const styleSection = styleModifier
    ? `\n\nDESIGN STYLE (MANDATORY):\n${styleModifier}\n\nThis variation MUST follow this design style direction.\n`
    : `\n\nDESIGN APPROACH:\nCreate a unique variation exploring different visual treatments while maintaining the component's functionality.\n`;

  const paletteSection = paletteModifier
    ? `\n\nCOLOR PALETTE (MANDATORY):\n${paletteModifier}\n\nAll colors must follow the specified palette.\n`
    : '';

  const uniqueId = `${componentTypeSlug}_v${variationNumber}_${timestamp}`;

  return `/generate ${uniqueId} Create ONE single component design variation ${variationNumber} based on the reference image.

REFERENCE IMAGE: ${imagePath}

Analyze the reference image to understand the component's purpose, structure, and current design.${componentInstructions}${styleSection}${paletteSection}

FILE NAMING:
Save this variation as: ${filename}

CRITICAL REQUIREMENTS:
- CREATE EXACTLY ONE COMPONENT VARIATION - not multiple versions side-by-side
- Maintain the component's core functionality and purpose
- Keep the same component type and use case as the reference
- Preserve key interactive elements (buttons, inputs, etc.)
- Focus on visual design exploration, not structural changes
- Create a production-ready component design
- Show the component in its primary state (default, not hover/active unless specified)
- Use realistic content (not lorem ipsum - use appropriate labels/text)
- Consider responsive sizing and touch targets
- Include proper spacing and alignment

DO NOT:
- Create comparison views or multiple variations in one image
- Change the fundamental purpose or type of the component
- Show browser chrome, device frames, or window decorations
- Include design annotations, arrows, or documentation
- Show before/after comparisons
- Create multiple state variations in one image (unless it's a states showcase)
- Generate low-fidelity wireframes or sketches
- Include measurement guides or specs

INSTEAD, CREATE:
- ONE SINGLE COMPONENT VARIATION as a clean, isolated design
- Polished, high-fidelity UI component
- Clear, professional presentation on neutral background
- Component shown at appropriate scale for clarity
- Focus entirely on the component design itself
- Visual design that could be implemented immediately

The goal is to explore different visual design directions for this component while maintaining its core purpose and usability.`;
}

function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function executeGeminiCommand(prompt: string): Promise<void> {
  // Use explicit model to avoid ClassifierStrategy routing bug
  // See: https://github.com/google-gemini/gemini-cli/issues/12660
  const model = process.env.SKETCH_GEMINI_MODEL || 'gemini-2.5-flash';

  const proc = Bun.spawn(['gemini', '-m', model, '--yolo', prompt], {
    stdout: 'inherit',
    stderr: 'inherit',
    stdin: 'inherit',
  });

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    console.error(`\n❌ Gemini command failed with exit code ${exitCode}`);
    process.exit(exitCode);
  }
}

async function main() {
  const parsedOptions = parseArgs();

  if (!parsedOptions) {
    process.exit(0);
  }

  const options = parsedOptions.interactive
    ? await interactiveMode()
    : parsedOptions;

  const { imagePath, componentType, description, dryRun, style, palette, count } = options;

  const styleModifier = style ? getVariationPromptModifier(style) : undefined;
  const paletteModifier = palette ? getPalettePromptModifier(palette) : undefined;
  const variationCount = count || 5;

  console.log(`\n🎨 Generating ${variationCount} variation${variationCount > 1 ? 's' : ''} from: ${imagePath}`);
  if (componentType) {
    console.log(`🧩 Component: ${COMPONENT_TYPES[componentType].name}`);
  } else if (description) {
    console.log(`🧩 Description: ${description}`);
  }
  if (style) {
    const styleName = style in VARIATION_PRESETS
      ? VARIATION_PRESETS[style as VariationPresetKey].name
      : 'Custom';
    console.log(`🎭 Style: ${styleName}`);
  }
  if (palette) {
    const paletteName = palette in COLOR_PALETTES
      ? COLOR_PALETTES[palette as ColorPaletteKey].name
      : 'Custom';
    console.log(`🎨 Palette: ${paletteName}`);
  }

  // Show equivalent CLI command if coming from interactive mode
  if (parsedOptions.interactive) {
    const commandParts = ['bun run component', `"${imagePath}"`];
    if (componentType) commandParts.push(`--type ${componentType}`);
    if (description) commandParts.push(`--description "${description}"`);
    if (style) commandParts.push(`--style "${style}"`);
    if (palette) commandParts.push(`--palette "${palette}"`);
    if (count) commandParts.push(`--count ${count}`);
    if (dryRun) commandParts.push('--dry-run');

    console.log(`\n💡 To run this again without interactive prompts, use:\n   ${commandParts.join(' ')}`);
  }

  console.log();

  if (dryRun) {
    console.log('📋 Generated prompts (dry run - not executing):\n');

    for (let i = 1; i <= variationCount; i++) {
      const prompt = buildComponentPrompt(imagePath, componentType, description, i, styleModifier, paletteModifier);

      console.log(`${'─'.repeat(80)}`);
      console.log(`Variation ${i}/${variationCount}:`);
      console.log(`${'─'.repeat(80)}`);
      console.log(prompt);
      console.log(`${'─'.repeat(80)}\n`);
    }

    console.log('💡 Tip: Remove --dry-run to execute the gemini command automatically');
  } else {
    console.log('🚀 Generating component variations...\n');

    for (let i = 1; i <= variationCount; i++) {
      const prompt = buildComponentPrompt(imagePath, componentType, description, i, styleModifier, paletteModifier);

      console.log(`${'─'.repeat(80)}`);
      console.log(`📝 Variation ${i}/${variationCount} Prompt:`);
      console.log(`${'─'.repeat(80)}`);
      console.log(prompt);
      console.log(`${'─'.repeat(80)}\n`);

      console.log(`🎨 Generating variation ${i}/${variationCount}...\n`);
      await executeGeminiCommand(prompt);

      if (i < variationCount) {
        console.log(`\n✅ Variation ${i} complete! Moving to next variation...\n`);
      }
    }

    console.log(`\n✨ All ${variationCount} variations generated successfully!`);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
