export const PLATFORM_PRESETS = {
  website: {
    name: "Website (Desktop)",
    description: "Traditional desktop website design",
    promptModifier: "Design for desktop/laptop screens with standard website conventions. Use typical desktop resolutions (1920x1080, 1440x900). Include full navigation, multiple columns where appropriate, and desktop-optimized layouts."
  },
  mobile: {
    name: "Mobile App",
    description: "Native mobile application interface",
    promptModifier: "Design as a native mobile app interface (iOS/Android style). Use mobile app conventions: bottom navigation, card-based layouts, gesture indicators, mobile-optimized typography, and portrait orientation. Screen size should be typical smartphone dimensions (375x812 or similar)."
  },
  tablet: {
    name: "Tablet App",
    description: "Tablet application interface",
    promptModifier: "Design for tablet devices with app conventions. Use tablet-optimized layouts that take advantage of the larger screen while maintaining touch-friendly interactions. Consider both portrait and landscape orientations. Screen size around 768x1024 or 1024x768."
  },
  watch: {
    name: "Smartwatch App",
    description: "Smartwatch/wearable interface",
    promptModifier: "Design for smartwatch/wearable devices. Use circular or square watch face conventions. Extremely simplified UI with large touch targets, minimal text, prominent icons, glanceable information, and single-focus screens. Size around 368x448 or similar watch dimensions."
  },
  tv: {
    name: "TV/Streaming App",
    description: "Smart TV or streaming device interface",
    promptModifier: "Design for TV/streaming platforms (Apple TV, Roku, Fire TV style). Use TV conventions: large text readable from distance, focus states for remote control navigation, horizontal carousels, cinematic imagery, and 16:9 aspect ratio (1920x1080)."
  },
  desktop: {
    name: "Desktop Application",
    description: "Native desktop software interface",
    promptModifier: "Design as a native desktop application (macOS/Windows style). Use desktop app conventions: menu bars, toolbars, sidebars, multi-panel layouts, keyboard shortcuts indicators, and desktop-specific UI patterns."
  },
  pwa: {
    name: "Progressive Web App",
    description: "Progressive web application",
    promptModifier: "Design as a Progressive Web App that works across devices. Combine web and app conventions with responsive design, app-like navigation, offline indicators, and installation prompts. Should feel native while being web-based."
  },
  kiosk: {
    name: "Kiosk Interface",
    description: "Public kiosk or terminal display",
    promptModifier: "Design for public kiosk/terminal use. Use large touch targets, high contrast, simple navigation, timeout warnings, accessibility features, and clear 'start over' options. Consider standing-distance viewing."
  },
  car: {
    name: "Car/Automotive Display",
    description: "In-vehicle infotainment system",
    promptModifier: "Design for automotive displays (CarPlay/Android Auto style). Prioritize glanceability, large buttons, voice control indicators, minimal distraction, high contrast for sunlight readability, and landscape orientation."
  },
  vr: {
    name: "VR/Spatial Interface",
    description: "Virtual reality or spatial computing",
    promptModifier: "Design for VR or spatial computing (Quest, Vision Pro style). Use 3D spatial conventions, depth, floating panels, gaze-based or hand-tracking interactions, and immersive environment considerations."
  }
} as const;

export type PlatformPresetKey = keyof typeof PLATFORM_PRESETS;

export function getPlatformPromptModifier(platform: PlatformPresetKey | string): string {
  if (platform in PLATFORM_PRESETS) {
    return PLATFORM_PRESETS[platform as PlatformPresetKey].promptModifier;
  }
  // If it's a custom string, use it directly as the modifier
  return `Design for the following platform/context: ${platform}`;
}

export function listPlatformPresets(): void {
  console.log('\n📱 Available Platform Presets:\n');
  Object.entries(PLATFORM_PRESETS).forEach(([key, preset]) => {
    console.log(`  ${key.padEnd(12)} - ${preset.name}`);
    console.log(`  ${' '.repeat(15)}${preset.description}\n`);
  });
}
