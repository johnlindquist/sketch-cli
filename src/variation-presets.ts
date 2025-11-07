export const VARIATION_PRESETS = {
  material: {
    name: "Material Design",
    description: "Google's Material Design system principles",
    promptModifier: "Redesign this component following Material Design principles: elevated surfaces with shadows, bold colors with proper contrast, ripple effects for interactions, rounded corners (4-8px), floating action buttons, and Material Design's elevation system."
  },
  ios: {
    name: "iOS/Apple Design",
    description: "Apple's Human Interface Guidelines style",
    promptModifier: "Redesign this component following iOS/Apple design principles: subtle shadows and depth, San Francisco font style, translucent backgrounds with blur effects, simple borders (1px), iOS-style switches and controls, clean white space, and native iOS component patterns."
  },
  fluent: {
    name: "Fluent Design (Microsoft)",
    description: "Microsoft's Fluent Design System",
    promptModifier: "Redesign this component following Fluent Design System: acrylic materials with blur and transparency, reveal highlights on hover, depth and parallax effects, subtle animations, modern Segoe UI font style, and Microsoft's design language."
  },
  neumorphism: {
    name: "Neumorphic/Soft UI",
    description: "Soft, extruded UI elements with subtle shadows",
    promptModifier: "Redesign this component using neumorphism/soft UI: soft shadows creating embossed or extruded effects, subtle depth with inner and outer shadows, same-colored backgrounds and elements, minimal contrast, soft color palette, and tactile appearance."
  },
  glassmorphism: {
    name: "Glassmorphic/Frosted Glass",
    description: "Transparent, blurred glass-like effects",
    promptModifier: "Redesign this component using glassmorphism: frosted glass effect with backdrop blur, semi-transparent backgrounds (rgba with 10-40% opacity), subtle borders (1px with low opacity white), soft shadows, and vivid background colors showing through."
  },
  minimal: {
    name: "Minimalist",
    description: "Ultra-clean with maximum simplicity",
    promptModifier: "Redesign this component with minimalist principles: remove all unnecessary elements, use simple black/white/gray palette with one accent color, thin borders or no borders, ample white space, simple sans-serif typography, and focus on content over decoration."
  },
  bold: {
    name: "Bold & Vibrant",
    description: "High contrast with vivid colors",
    promptModifier: "Redesign this component with bold, vibrant styling: saturated colors with high contrast, thick borders (2-4px), large typography, strong shadows for depth, chunky buttons and controls, and eye-catching visual presence."
  },
  outlined: {
    name: "Outlined/Wireframe",
    description: "Border-focused with outlined elements",
    promptModifier: "Redesign this component using outlined style: prominent borders (2-3px) on all elements, minimal or no fill colors (mostly white/transparent backgrounds), outlined icons, border-based visual hierarchy, and clean line-based aesthetic."
  },
  gradient: {
    name: "Gradient Heavy",
    description: "Rich gradients and color transitions",
    promptModifier: "Redesign this component with gradient-heavy styling: vibrant color gradients as primary design element, smooth color transitions, gradient overlays on images, gradient borders or shadows, and colorful, modern aesthetic."
  },
  brutalist: {
    name: "Brutalist/Raw",
    description: "Harsh, unpolished, unconventional design",
    promptModifier: "Redesign this component with brutalist principles: raw, unpolished aesthetic, stark black and white or high contrast colors, thick borders and geometric shapes, monospace or unconventional fonts, asymmetric layouts, and intentionally rough appearance."
  },
  retro: {
    name: "Retro/Vintage",
    description: "Nostalgic design from past eras",
    promptModifier: "Redesign this component with retro/vintage styling: nostalgic color palettes (70s/80s/90s inspired), vintage typography, pixelated or low-fi elements, retro patterns or textures, and design elements that evoke specific historical periods."
  },
  flat: {
    name: "Flat Design 2.0",
    description: "Flat colors with subtle depth cues",
    promptModifier: "Redesign this component with flat design 2.0: flat colors without gradients, minimal shadows (if any, very subtle), simple shapes and clean edges, bright or pastel color palettes, crisp typography, but with subtle depth cues like light shadows or layering."
  },
  skeuomorphic: {
    name: "Skeuomorphic/Realistic",
    description: "Real-world textures and realistic styling",
    promptModifier: "Redesign this component with skeuomorphic styling: realistic textures and materials (leather, wood, metal), detailed shadows and highlights mimicking real objects, dimensional appearance with depth, glossy or textured surfaces, and design that mimics physical counterparts."
  },
  neon: {
    name: "Neon/Cyberpunk",
    description: "Glowing neon effects with dark backgrounds",
    promptModifier: "Redesign this component with neon/cyberpunk aesthetic: dark or black backgrounds, bright neon colors (cyan, magenta, green, yellow), glowing effects on text and borders, high contrast, futuristic typography, and synthwave-inspired visual style."
  },
  organic: {
    name: "Organic/Rounded",
    description: "Soft, flowing shapes inspired by nature",
    promptModifier: "Redesign this component with organic styling: rounded, flowing shapes with large border radius, soft shadows, curved edges throughout, natural color palettes (earth tones, pastels), blob-like forms, and nature-inspired aesthetic."
  },
  geometric: {
    name: "Geometric/Angular",
    description: "Sharp angles and geometric patterns",
    promptModifier: "Redesign this component with geometric styling: sharp angles and corners (minimal border radius), geometric shapes and patterns, triangular or hexagonal elements, precise alignments, mathematical proportions, and angular design language."
  },
  colorful: {
    name: "Maximalist Colors",
    description: "Multiple vibrant colors and playful design",
    promptModifier: "Redesign this component with maximalist color approach: use multiple vibrant colors throughout, playful color combinations, colorful borders and dividers, rainbow gradients, color-coded sections, and joyful, energetic color palette."
  },
  monochrome: {
    name: "Monochromatic",
    description: "Single color with variations in shade",
    promptModifier: "Redesign this component using monochromatic color scheme: choose one base color and use only variations of that color (tints, shades, tones), create hierarchy through different intensities of the same hue, minimal use of black/white, and cohesive single-color aesthetic."
  },
  elegant: {
    name: "Elegant/Luxury",
    description: "Sophisticated with premium feel",
    promptModifier: "Redesign this component with elegant, luxury styling: sophisticated color palette (black, white, gold, deep jewel tones), serif or refined fonts, generous white space, subtle animations, thin borders or delicate dividers, and premium, high-end appearance."
  },
  playful: {
    name: "Playful/Friendly",
    description: "Fun, approachable, whimsical design",
    promptModifier: "Redesign this component with playful, friendly styling: rounded shapes with large border radius, cheerful colors (bright but not harsh), friendly illustrations or icons, asymmetric layouts, fun micro-interactions, and warm, approachable aesthetic."
  }
} as const;

export type VariationPresetKey = keyof typeof VARIATION_PRESETS;

export function getVariationPromptModifier(preset: VariationPresetKey | string): string {
  if (preset in VARIATION_PRESETS) {
    return VARIATION_PRESETS[preset as VariationPresetKey].promptModifier;
  }
  // If it's a custom string, use it directly as the modifier
  return `Redesign this component with the following direction: ${preset}`;
}

export function listVariationPresets(): void {
  console.log('\n🎭 Available Variation Presets:\n');

  console.log('Design Systems:');
  ['material', 'ios', 'fluent'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });

  console.log('Modern Styles:');
  ['neumorphism', 'glassmorphism', 'minimal', 'flat'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });

  console.log('Visual Treatments:');
  ['bold', 'outlined', 'gradient', 'neon'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });

  console.log('Shape & Form:');
  ['organic', 'geometric', 'skeuomorphic', 'brutalist'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });

  console.log('Color Approaches:');
  ['colorful', 'monochrome', 'retro'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });

  console.log('Personality:');
  ['elegant', 'playful'].forEach(key => {
    const preset = VARIATION_PRESETS[key as VariationPresetKey];
    console.log(`  ${key.padEnd(20)} - ${preset.name}`);
    console.log(`  ${' '.repeat(23)}${preset.description}\n`);
  });
}
