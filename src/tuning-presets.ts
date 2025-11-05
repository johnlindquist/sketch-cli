export const TUNING_PRESETS = {
  creative: {
    name: "Creative & Artistic",
    description: "Experimental layouts, bold colors, unique visual elements",
    promptModifier: "Push creative boundaries with experimental layouts, bold color choices, artistic visual elements, and unconventional design patterns. Prioritize visual impact and memorable aesthetics over traditional conventions."
  },
  professional: {
    name: "Professional & Corporate",
    description: "Clean, trustworthy, business-focused designs",
    promptModifier: "Create professional, corporate-focused designs with clean layouts, trustworthy aesthetics, conservative color palettes, structured grids, and business-appropriate visual language. Emphasize credibility and professionalism."
  },
  minimal: {
    name: "Minimalist & Clean",
    description: "Maximum whitespace, simple typography, restrained design",
    promptModifier: "Embrace minimalism with abundant whitespace, simple typography, restrained color palettes (mostly monochrome with 1-2 accent colors), clean lines, and focus on content hierarchy. Less is more."
  },
  vibrant: {
    name: "Vibrant & Energetic",
    description: "Bold colors, dynamic layouts, high energy",
    promptModifier: "Design with vibrant, saturated colors, dynamic layouts, energetic visual rhythms, playful elements, and high-contrast designs that grab attention and convey excitement and vitality."
  },
  elegant: {
    name: "Elegant & Sophisticated",
    description: "Refined typography, subtle details, luxury feel",
    promptModifier: "Create elegant, sophisticated designs with refined serif typography, subtle textures and details, muted color palettes, generous spacing, and a premium, luxury aesthetic that conveys quality and refinement."
  },
  modern: {
    name: "Modern & Trendy",
    description: "Latest design trends, contemporary aesthetics",
    promptModifier: "Incorporate the latest web design trends: glassmorphism, neumorphism, gradient meshes, 3D elements, micro-interactions, bold typography, and contemporary design patterns that feel cutting-edge and current."
  },
  playful: {
    name: "Playful & Fun",
    description: "Friendly, approachable, lighthearted designs",
    promptModifier: "Design with a playful, fun aesthetic using rounded shapes, friendly illustrations, cheerful colors, approachable typography, and lighthearted visual elements that create a warm, welcoming experience."
  },
  dark: {
    name: "Dark Mode Focused",
    description: "Dark backgrounds, dramatic contrast, modern feel",
    promptModifier: "Design primarily in dark mode with dark backgrounds, dramatic contrast, luminous accent colors, subtle gradients, and modern dark UI patterns. Create depth through layering and subtle shadows."
  },
  brutalist: {
    name: "Brutalist & Raw",
    description: "Raw aesthetics, stark layouts, unconventional",
    promptModifier: "Embrace brutalist design principles with raw, unpolished aesthetics, stark layouts, monospace fonts, high contrast, minimal styling, exposed grid systems, and intentionally unconventional design choices."
  },
  luxe: {
    name: "Luxury & Premium",
    description: "High-end feel, sophisticated details, exclusive vibe",
    promptModifier: "Create luxury, premium designs with high-end aesthetics, sophisticated details, elegant typography, rich color palettes (gold, deep jewel tones), ample negative space, and an exclusive, refined visual language."
  },
  tech: {
    name: "Tech & Futuristic",
    description: "Cutting-edge, sci-fi inspired, digital-first",
    promptModifier: "Design with a futuristic, tech-forward aesthetic using sci-fi inspired elements, digital effects, neon accents, geometric patterns, holographic gradients, and a cutting-edge visual language."
  },
  organic: {
    name: "Organic & Natural",
    description: "Nature-inspired, flowing shapes, earthy tones",
    promptModifier: "Create organic, nature-inspired designs with flowing curves, natural shapes, earthy color palettes, botanical elements, hand-crafted aesthetics, and visual language inspired by the natural world."
  },
  retro: {
    name: "Retro & Vintage",
    description: "Nostalgic aesthetics, vintage typography, classic layouts",
    promptModifier: "Design with retro, vintage aesthetics featuring nostalgic color schemes, classic typography styles (70s/80s/90s era), vintage layout patterns, and design elements that evoke specific historical periods."
  },
  editorial: {
    name: "Editorial & Magazine-Style",
    description: "Typography-focused, grid-based, publishing aesthetic",
    promptModifier: "Create editorial, magazine-style designs with strong typographic hierarchy, grid-based layouts, large compelling imagery, pull quotes, sophisticated white space usage, and publishing-inspired visual language."
  },
  accessible: {
    name: "Accessibility Focused",
    description: "High contrast, clear hierarchy, inclusive design",
    promptModifier: "Prioritize accessibility with high contrast ratios, clear visual hierarchy, large touch targets, readable typography at all sizes, inclusive color choices, and designs that work well for users with diverse abilities."
  }
} as const;

export type TuningPresetKey = keyof typeof TUNING_PRESETS;

export function getTuningPromptModifier(preset: TuningPresetKey | string): string {
  if (preset in TUNING_PRESETS) {
    return TUNING_PRESETS[preset as TuningPresetKey].promptModifier;
  }
  // If it's a custom string, use it directly as the modifier
  return `Apply the following design direction: ${preset}`;
}

export function listTuningPresets(): void {
  console.log('\n📐 Available Tuning Presets:\n');
  Object.entries(TUNING_PRESETS).forEach(([key, preset]) => {
    console.log(`  ${key.padEnd(15)} - ${preset.name}`);
    console.log(`  ${' '.repeat(18)}${preset.description}\n`);
  });
}
