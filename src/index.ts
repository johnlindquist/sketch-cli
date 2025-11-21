#!/usr/bin/env bun

import { input, select, confirm } from '@inquirer/prompts';
import { buildPrompt, PAGE_COMPONENTS, type PageType } from './prompt-templates';
import { TUNING_PRESETS, getTuningPromptModifier, listTuningPresets, type TuningPresetKey } from './tuning-presets';
import { PLATFORM_PRESETS, getPlatformPromptModifier, listPlatformPresets, type PlatformPresetKey } from './platform-presets';
import { COLOR_PALETTES, getPalettePromptModifier, listColorPalettes, type ColorPaletteKey } from './color-palettes';

interface SketchOptions {
  websiteType: string;
  pageType: PageType;
  dryRun?: boolean;
  tuning?: string;
  reference?: string;
  platform?: string;
  palette?: string;
  count?: number;
  sequential?: boolean;
  interactive?: boolean;
}

function showHelp() {
  console.log(`
🎨 Website Sketch Generator

USAGE:
  bun run sketch [options]                           # Interactive mode
  bun run sketch <website-type> <page-type> [flags]  # Direct mode

ARGUMENTS:
  website-type    Type of website (e.g., "shoe marketplace", "gaming company", "hair salon")
  page-type       Page to design: ${Object.keys(PAGE_COMPONENTS).join(', ')}

FLAGS:
  --dry-run               Show generated prompts without executing (default: execute immediately)
  --count, -c <number>    Number of design variations to generate (default: 5)
  --sequential            Generate variations one at a time (default: parallel)
  --tuning, -t <value>    Apply design tuning preset or custom direction
  --palette <value>       Apply color palette (dracula, monokai, nord, github-dark, etc.)
  --reference, -r <path>  Path to reference image for visual inspiration
  --platform, -p <value>  Target platform (website, mobile, tablet, watch, tv, etc.)
  --list-tuning           List all available tuning presets
  --list-palettes         List all available color palettes
  --list-platforms        List all available platform presets
  --help, -h              Show this help message

TUNING PRESETS:
  creative, professional, minimal, vibrant, elegant, modern, playful, dark,
  brutalist, luxe, tech, organic, retro, editorial, accessible
  (use --list-tuning for descriptions)

COLOR PALETTES:
  dracula, monokai, one-dark, nord, github-dark, synthwave, tokyo-night,
  gruvbox-dark, solarized-dark, material, catppuccin-mocha, and more
  (use --list-palettes for all options and descriptions)

PLATFORM PRESETS:
  website, mobile, tablet, watch, tv, desktop, pwa, kiosk, car, vr
  (use --list-platforms for descriptions)

EXAMPLES:
  # Interactive mode (prompts for all options)
  bun run sketch

  # Generate and execute shoe marketplace homepage (executes by default)
  bun run sketch "shoe marketplace" home

  # Preview prompts without executing
  bun run sketch "gaming company" about --dry-run

  # Generate with creative tuning
  bun run sketch "gaming company" about --tuning creative

  # Use reference image for inspiration
  bun run sketch "hair salon" home -r ~/Downloads/inspiration.jpg

  # Combine tuning and reference
  bun run sketch "pet adoption" cart -t dark -r ./mockup.png

  # Design for mobile platform
  bun run sketch "fitness tracker" home -p mobile

  # Design smartwatch interface
  bun run sketch "meditation app" home --platform watch -t minimal

  # Generate 10 variations instead of 5
  bun run sketch "hair salon" home --count 10

  # Use Dracula color palette
  bun run sketch "developer tools" home --palette dracula

  # Combine palette with tuning
  bun run sketch "crypto exchange" product --palette tokyo-night --tuning tech

  # Use custom color palette
  bun run sketch "art gallery" home --palette "deep burgundy #8B0000, gold #FFD700, cream #FFFDD0"

  # Use custom tuning direction
  bun run sketch "tech startup" sales -t "cyberpunk aesthetic with neon colors"

  # List available tuning presets
  bun run sketch --list-tuning

  # List available color palettes
  bun run sketch --list-palettes

  # List available platform presets
  bun run sketch --list-platforms

AVAILABLE PAGE TYPES:
  home      - Main landing page with hero and featured content
  about     - Company story, team, and mission
  product   - Individual product detail page
  cart      - Shopping cart with items and checkout
  contact   - Contact form and information
  sales     - Marketing/sales landing page with conversion focus
  blog      - Blog listing or article feed
`);
}

function parseArgs(): SketchOptions | null {
  const args = process.argv.slice(2);

  // Check for list flags
  if (args.includes('--list-tuning')) {
    listTuningPresets();
    return null;
  }

  if (args.includes('--list-palettes')) {
    listColorPalettes();
    return null;
  }

  if (args.includes('--list-platforms')) {
    listPlatformPresets();
    return null;
  }

  // Check for help
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  // Interactive mode if no args
  if (args.length === 0) {
    return { websiteType: '', pageType: 'home', interactive: true };
  }

  // Parse flags
  const dryRun = args.includes('--dry-run');
  const sequential = args.includes('--sequential');

  let tuning: string | undefined;
  const tuningIndex = args.findIndex(arg => arg === '--tuning' || arg === '-t');
  if (tuningIndex !== -1 && args[tuningIndex + 1]) {
    tuning = args[tuningIndex + 1];
  }

  let reference: string | undefined;
  const referenceIndex = args.findIndex(arg => arg === '--reference' || arg === '-r');
  if (referenceIndex !== -1 && args[referenceIndex + 1]) {
    reference = args[referenceIndex + 1];
  }

  let platform: string | undefined;
  const platformIndex = args.findIndex(arg => arg === '--platform' || arg === '-p');
  if (platformIndex !== -1 && args[platformIndex + 1]) {
    platform = args[platformIndex + 1];
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
    arg !== tuning &&
    arg !== reference &&
    arg !== platform &&
    arg !== palette &&
    arg !== (count?.toString())
  );

  if (positionalArgs.length < 2) {
    console.error('❌ Error: Both website-type and page-type are required\n');
    showHelp();
    return null;
  }

  const websiteType = positionalArgs[0];
  const pageType = positionalArgs[1] as PageType;

  if (!Object.keys(PAGE_COMPONENTS).includes(pageType)) {
    console.error(`❌ Error: Invalid page type "${pageType}"`);
    console.error(`   Valid options: ${Object.keys(PAGE_COMPONENTS).join(', ')}\n`);
    return null;
  }

  return { websiteType, pageType, dryRun, tuning, reference, platform, palette, count, sequential };
}


async function interactiveMode(): Promise<SketchOptions> {
  console.log('\n🎨 Website Sketch Generator - Interactive Mode\n');

  // Get website type
  const websiteType = await input({
    message: 'What type of website?',
    default: 'shoe marketplace',
  });

  // Get page type
  const pageTypeChoices = [
    ...Object.entries(PAGE_COMPONENTS).map(([key, value]) => ({
      name: `${value.name} (${key})`,
      value: key,
    })),
    { name: 'Custom (enter your own)', value: '__custom__' },
  ];

  let pageType: PageType = await select({
    message: 'Select page type:',
    choices: pageTypeChoices,
  }) as PageType;

  if (pageType === '__custom__' as any) {
    console.log('\n⚠️  Custom page types will use homepage structure as base.');
    pageType = 'home';
  }

  // Get tuning preference
  const tuningChoices = [
    { name: 'None (use default variety)', value: 'none' },
    ...Object.entries(TUNING_PRESETS).map(([key, preset]) => ({
      name: `${preset.name} - ${preset.description}`,
      value: key,
    })),
    { name: 'Custom (enter your own)', value: '__custom__' },
  ];

  const tuningSelection = await select({
    message: 'Select design tuning:',
    choices: tuningChoices,
  });

  let tuning: string | undefined;
  if (tuningSelection === '__custom__') {
    tuning = await input({
      message: 'Enter custom tuning direction:',
    });
  } else if (tuningSelection !== 'none') {
    tuning = tuningSelection;
  }

  // Get platform
  const platformChoices = [
    { name: 'Desktop Website (default)', value: 'none' },
    ...Object.entries(PLATFORM_PRESETS).map(([key, preset]) => ({
      name: `${preset.name} - ${preset.description}`,
      value: key,
    })),
    { name: 'Custom (enter your own)', value: '__custom__' },
  ];

  const platformSelection = await select({
    message: 'Select target platform:',
    choices: platformChoices,
  });

  let platform: string | undefined;
  if (platformSelection === '__custom__') {
    platform = await input({
      message: 'Enter custom platform description:',
    });
  } else if (platformSelection !== 'none') {
    platform = platformSelection;
  }

  // Get color palette
  const paletteChoices = [
    { name: 'None (use default colors)', value: 'none' },
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
      message: 'Enter custom color palette (e.g., "red #FF0000, blue #0000FF"):',
    });
  } else if (paletteSelection !== 'none') {
    palette = paletteSelection;
  }

  // Get reference image
  const reference = await input({
    message: 'Reference image path (optional):',
  });

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

  // Sequential or parallel?
  const sequential = await confirm({
    message: 'Generate variations sequentially (slower but less resource intensive)?',
    default: false,
  });

  return {
    websiteType,
    pageType,
    dryRun,
    tuning,
    reference: reference || undefined,
    platform,
    palette,
    count,
    sequential,
  };
}

async function executeGeminiCommand(prompt: string, captureOutput = false): Promise<string | void> {
  // Use explicit model to avoid ClassifierStrategy routing bug
  // See: https://github.com/google-gemini/gemini-cli/issues/12660
  const model = process.env.SKETCH_GEMINI_MODEL || 'gemini-2.5-flash';

  if (captureOutput) {
    const proc = Bun.spawn(['gemini', '-m', model, '--yolo', prompt], {
      stdout: 'pipe',
      stderr: 'inherit',
      stdin: 'inherit',
      env: {
        ...process.env,
        NANOBANANA_MODEL: 'gemini-3-pro-image-preview',
      },
    });

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode !== 0) {
      console.error(`\n❌ Gemini command failed with exit code ${exitCode}`);
      process.exit(exitCode);
    }

    return output.trim();
  } else {
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
}

async function copyImageToWorkspace(imagePath: string): Promise<string> {
  const fs = await import('fs');
  const path = await import('path');

  // Create temp directory in workspace if it doesn't exist
  const tempDir = path.resolve(process.cwd(), '.temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // Copy image to temp directory
  const filename = path.basename(imagePath);
  const destPath = path.join(tempDir, filename);

  fs.copyFileSync(imagePath, destPath);

  return destPath;
}

async function describeReferenceImage(imagePath: string): Promise<string> {
  // Copy image to workspace for Gemini CLI access
  const workspaceImagePath = await copyImageToWorkspace(imagePath);

  console.log(`🔍 Analyzing reference image: ${imagePath}`);
  console.log(`📋 Copied to workspace: ${workspaceImagePath}\n`);

  const prompt = `Analyze this image in complete detail @${workspaceImagePath}

Provide a comprehensive description that captures:

1. LAYOUT & COMPOSITION:
   - Overall layout structure and grid system
   - Content organization and hierarchy
   - Spacing, padding, and visual rhythm
   - Element positioning and alignment

2. VISUAL DESIGN:
   - Color palette (specific colors used)
   - Typography (font styles, sizes, weights)
   - Visual style and aesthetic (modern, minimal, bold, etc.)
   - Design patterns and UI conventions used

3. UI ELEMENTS:
   - All interactive elements (buttons, links, forms, etc.)
   - Navigation structure
   - Content sections and their relationships
   - Icons, imagery, and graphics

4. DESIGN DETAILS:
   - Shadows, borders, and effects
   - Corner radius and shapes
   - Visual accents and highlights
   - Texture or background treatments

5. CONTENT STRUCTURE:
   - Text hierarchy and readability
   - Image placement and treatment
   - Call-to-action emphasis
   - Information density

Be specific about colors (hex codes if identifiable), measurements, and visual relationships. This description will guide AI to create variations that preserve the reference's core design language.`;

  const description = await executeGeminiCommand(prompt, true) as string;

  console.log(`✅ Reference image analysis complete\n`);
  console.log(`${'─'.repeat(80)}`);
  console.log('📝 Reference Image Description:');
  console.log(`${'─'.repeat(80)}`);
  console.log(description);
  console.log(`${'─'.repeat(80)}\n`);

  return description;
}

async function main() {
  const parsedOptions = parseArgs();

  if (!parsedOptions) {
    process.exit(0);
  }

  const options = parsedOptions.interactive
    ? await interactiveMode()
    : parsedOptions;

  const { websiteType, pageType, dryRun, tuning, reference, platform, palette, count, sequential } = options;

  // Copy reference image to workspace if provided
  let workspaceReferencePath: string | undefined;
  if (reference) {
    workspaceReferencePath = await copyImageToWorkspace(reference);
    console.log(`📋 Copied reference image to workspace: ${workspaceReferencePath}\n`);
  }

  // Get reference description if reference image is provided
  let referenceDescription: string | undefined;
  if (reference && !dryRun) {
    referenceDescription = await describeReferenceImage(reference);
  }

  // Get modifiers if specified
  const tuningModifier = tuning ? getTuningPromptModifier(tuning) : undefined;
  const platformModifier = platform ? getPlatformPromptModifier(platform) : undefined;
  const paletteModifier = palette ? getPalettePromptModifier(palette) : undefined;
  const variationCount = count || 5;

  console.log(`\n🎨 Generating ${variationCount} design variation${variationCount > 1 ? 's' : ''} for: ${websiteType} - ${pageType} page`);
  if (platform) {
    const platformName = platform in PLATFORM_PRESETS
      ? PLATFORM_PRESETS[platform as PlatformPresetKey].name
      : 'Custom';
    console.log(`📱 Platform: ${platformName}`);
  }
  if (tuning) {
    const presetName = tuning in TUNING_PRESETS
      ? TUNING_PRESETS[tuning as TuningPresetKey].name
      : 'Custom';
    console.log(`📐 Tuning: ${presetName}`);
  }
  if (palette) {
    const paletteName = palette in COLOR_PALETTES
      ? COLOR_PALETTES[palette as ColorPaletteKey].name
      : 'Custom';
    console.log(`🎨 Palette: ${paletteName}`);
  }
  if (reference) {
    console.log(`🖼️  Reference: ${reference}`);
  }

  console.log();

  if (dryRun) {
    console.log('📋 Generated prompts (dry run - not executing):\n');

    for (let i = 1; i <= variationCount; i++) {
      const prompt = buildPrompt(websiteType, pageType, i, tuningModifier, workspaceReferencePath, platformModifier, paletteModifier, referenceDescription);

      console.log(`${'─'.repeat(80)}`);
      console.log(`Variation ${i}/${variationCount}:`);
      console.log(`${'─'.repeat(80)}`);
      console.log(prompt);
      console.log(`${'─'.repeat(80)}\n`);
    }

    console.log('💡 Tip: Remove --dry-run to execute the gemini command automatically');

    // Show equivalent CLI command if coming from interactive mode
    if (parsedOptions.interactive) {
      const commandParts = ['bun run sketch', `"${websiteType}"`, pageType];
      if (platform) commandParts.push(`--platform "${platform}"`);
      if (tuning) commandParts.push(`--tuning "${tuning}"`);
      if (palette) commandParts.push(`--palette "${palette}"`);
      if (reference) commandParts.push(`--reference "${reference}"`);
      if (count) commandParts.push(`--count ${count}`);
      if (sequential) commandParts.push('--sequential');
      if (dryRun) commandParts.push('--dry-run');

      console.log(`\n💡 To run this again without interactive prompts, use:\n   ${commandParts.join(' ')}`);
    }
  } else {
    const mode = sequential ? 'sequentially' : 'in parallel';
    console.log(`🚀 Generating ${variationCount} designs ${mode}...\n`);

    if (sequential) {
      // Sequential execution (original behavior)
      for (let i = 1; i <= variationCount; i++) {
        const prompt = buildPrompt(websiteType, pageType, i, tuningModifier, workspaceReferencePath, platformModifier, paletteModifier, referenceDescription);

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
    } else {
      // Parallel execution (new default)
      const prompts = Array.from({ length: variationCount }, (_, i) => {
        const variationNumber = i + 1;
        return buildPrompt(websiteType, pageType, variationNumber, tuningModifier, workspaceReferencePath, platformModifier, paletteModifier, referenceDescription);
      });

      // Show all prompts
      prompts.forEach((prompt, i) => {
        console.log(`${'─'.repeat(80)}`);
        console.log(`📝 Variation ${i + 1}/${variationCount} Prompt:`);
        console.log(`${'─'.repeat(80)}`);
        console.log(prompt);
        console.log(`${'─'.repeat(80)}\n`);
      });

      console.log(`🎨 Generating all ${variationCount} variations in parallel...\n`);

      // Execute all in parallel
      await Promise.all(prompts.map(prompt => executeGeminiCommand(prompt)));
    }

    console.log(`\n✨ All ${variationCount} variations generated successfully!`);

    // Show equivalent CLI command if coming from interactive mode
    if (parsedOptions.interactive) {
      const commandParts = ['bun run sketch', `"${websiteType}"`, pageType];
      if (platform) commandParts.push(`--platform "${platform}"`);
      if (tuning) commandParts.push(`--tuning "${tuning}"`);
      if (palette) commandParts.push(`--palette "${palette}"`);
      if (reference) commandParts.push(`--reference "${reference}"`);
      if (count) commandParts.push(`--count ${count}`);
      if (sequential) commandParts.push('--sequential');

      console.log(`\n💡 To run this again without interactive prompts, use:\n   ${commandParts.join(' ')}`);
    }
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
