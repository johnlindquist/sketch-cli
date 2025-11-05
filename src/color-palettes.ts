export const COLOR_PALETTES = {
  // VS Code Themes
  'dracula': {
    name: "Dracula",
    description: "Dark purple background with vibrant pink and cyan accents",
    promptModifier: "Use the Dracula color palette: dark purple backgrounds (#282a36), vibrant pink (#ff79c6) for primary actions, cyan (#8be9fd) for links and highlights, green (#50fa7b) for success states, and foreground text in light gray (#f8f8f2). Create a dark, vibrant aesthetic."
  },
  'monokai': {
    name: "Monokai",
    description: "Dark charcoal with bright yellow, green, and pink highlights",
    promptModifier: "Use the Monokai color palette: dark charcoal background (#272822), bright yellow (#e6db74) for primary elements, vibrant green (#a6e22e) for success/highlights, hot pink (#f92672) for accents, and orange (#fd971f) for secondary actions. Create a bold, high-contrast dark theme."
  },
  'one-dark': {
    name: "One Dark",
    description: "Soft dark gray with blue and orange accents",
    promptModifier: "Use the One Dark color palette: soft dark gray background (#282c34), blue (#61afef) for primary actions, orange (#d19a66) for highlights, green (#98c379) for success states, red (#e06c75) for errors, and light gray (#abb2bf) for text. Create a balanced, comfortable dark theme."
  },
  'solarized-dark': {
    name: "Solarized Dark",
    description: "Blue-gray base with warm accent colors",
    promptModifier: "Use the Solarized Dark palette: blue-gray base (#002b36), teal (#2aa198) for primary, yellow (#b58900) for warnings, orange (#cb4b16) for accents, magenta (#d33682) for highlights, and beige (#93a1a1) for text. Create a scientifically-designed, easy-on-eyes dark theme."
  },
  'solarized-light': {
    name: "Solarized Light",
    description: "Cream base with the same warm Solarized accents",
    promptModifier: "Use the Solarized Light palette: cream base (#fdf6e3), teal (#2aa198) for primary, yellow (#b58900) for warnings, orange (#cb4b16) for accents, magenta (#d33682) for highlights, and dark gray (#657b83) for text. Create a warm, sophisticated light theme."
  },
  'nord': {
    name: "Nord",
    description: "Arctic-inspired blues and cool grays",
    promptModifier: "Use the Nord color palette: dark blue-gray (#2e3440) for backgrounds, frost blue (#88c0d0) for primary actions, aurora green (#a3be8c) for success, aurora pink (#b48ead) for highlights, aurora orange (#d08770) for warnings, and snow white (#eceff4) for text. Create a cool, arctic-inspired aesthetic."
  },
  'github-dark': {
    name: "GitHub Dark",
    description: "GitHub's dark mode colors",
    promptModifier: "Use GitHub Dark palette: dark navy (#0d1117) backgrounds, bright blue (#58a6ff) for primary actions, green (#3fb950) for success, orange (#d29922) for warnings, red (#f85149) for errors, and light gray (#c9d1d9) for text. Create a professional, familiar GitHub aesthetic."
  },
  'github-light': {
    name: "GitHub Light",
    description: "GitHub's light mode colors",
    promptModifier: "Use GitHub Light palette: white (#ffffff) backgrounds, blue (#0969da) for primary actions, green (#1a7f37) for success, orange (#bf8700) for warnings, red (#cf222e) for errors, and dark gray (#24292f) for text. Create a clean, professional GitHub-style interface."
  },
  'material': {
    name: "Material",
    description: "Google Material Design colors",
    promptModifier: "Use Material Design palette: deep blue (#1976d2) for primary, pink (#e91e63) for accents, teal (#009688) for secondary actions, orange (#ff9800) for highlights, and follow Material Design elevation and shadow principles. Create a bold, modern Google Material aesthetic."
  },
  'night-owl': {
    name: "Night Owl",
    description: "Rich navy with warm gold and teal accents",
    promptModifier: "Use Night Owl palette: rich navy (#011627) backgrounds, soft teal (#7fdbca) for primary elements, warm gold (#ecc48d) for highlights, coral (#ef5350) for errors, purple (#c792ea) for accents, and light blue-gray (#d6deeb) for text. Create a sophisticated, developer-friendly night theme."
  },
  'cobalt2': {
    name: "Cobalt2",
    description: "Electric blue backgrounds with bright yellow accents",
    promptModifier: "Use Cobalt2 palette: deep cobalt blue (#193549) backgrounds, electric blue (#0088ff) for primary, bright yellow (#ffc600) for highlights and CTAs, hot pink (#ff0088) for accents, orange (#ff9d00) for warnings, and white (#ffffff) for text. Create a vibrant, energetic theme."
  },
  'tokyo-night': {
    name: "Tokyo Night",
    description: "Deep purple-gray with neon cyan and purple",
    promptModifier: "Use Tokyo Night palette: deep purple-gray (#1a1b26) backgrounds, neon cyan (#7aa2f7) for primary, bright magenta (#bb9af7) for accents, teal (#7dcfff) for links, green (#9ece6a) for success, and light gray (#c0caf5) for text. Create a modern, neon-inspired night aesthetic."
  },
  'synthwave': {
    name: "Synthwave '84",
    description: "Retro 80s neon with purple, pink, and cyan",
    promptModifier: "Use Synthwave '84 palette: dark purple (#262335) backgrounds, hot pink (#ff7edb) and cyan (#72f1b8) gradients, neon purple (#b381c5) for accents, bright yellow (#ffe261) for highlights. Add subtle glow effects and create a retro 80s/90s aesthetic with neon vibes."
  },
  'gruvbox-dark': {
    name: "Gruvbox Dark",
    description: "Warm retro dark brown with vibrant earth tones",
    promptModifier: "Use Gruvbox Dark palette: warm dark brown (#282828) backgrounds, bright orange (#fe8019) for primary, yellow (#fabd2f) for highlights, aqua (#8ec07c) for success, red (#fb4934) for errors, and cream (#ebdbb2) for text. Create a warm, retro-inspired dark theme."
  },
  'gruvbox-light': {
    name: "Gruvbox Light",
    description: "Warm cream base with earthy accent colors",
    promptModifier: "Use Gruvbox Light palette: warm cream (#fbf1c7) backgrounds, dark orange (#d65d0e) for primary, dark yellow (#b57614) for highlights, dark aqua (#427b58) for success, dark red (#9d0006) for errors, and dark brown (#3c3836) for text. Create a warm, comfortable retro light theme."
  },
  'palenight': {
    name: "Palenight",
    description: "Soft purple-gray with pastel accents",
    promptModifier: "Use Palenight palette: soft purple-gray (#292d3e) backgrounds, soft cyan (#89ddff) for primary, purple (#c792ea) for accents, green (#c3e88d) for success, red (#f07178) for errors, and light lavender (#959dcb) for text. Create a soft, elegant night theme with pastel tones."
  },
  'ayu-dark': {
    name: "Ayu Dark",
    description: "Modern dark with warm orange accents",
    promptModifier: "Use Ayu Dark palette: modern dark gray (#0a0e14) backgrounds, bright orange (#ff8f40) for primary actions, yellow (#ffb454) for highlights, green (#b8cc52) for success, blue (#59c2ff) for links, and light gray (#b3b1ad) for text. Create a modern, warm dark aesthetic."
  },
  'shades-of-purple': {
    name: "Shades of Purple",
    description: "Rich purple with vibrant pink and orange",
    promptModifier: "Use Shades of Purple palette: rich purple (#2d2b55) backgrounds, vibrant pink (#ff628c) for primary, bright orange (#fad000) for highlights, purple (#a599e9) for accents, green (#3ad900) for success, and white (#ffffff) for text. Create a bold, vibrant purple-dominant theme."
  },
  'catppuccin-mocha': {
    name: "Catppuccin Mocha",
    description: "Soft dark with pastel mauve and peach",
    promptModifier: "Use Catppuccin Mocha palette: soft dark gray (#1e1e2e) backgrounds, pastel mauve (#cba6f7) for primary, soft peach (#fab387) for accents, pastel green (#a6e3a1) for success, pastel red (#f38ba8) for errors, and light gray (#cdd6f4) for text. Create a cozy, pastel-themed dark interface."
  },
  'rose-pine': {
    name: "Rosé Pine",
    description: "Muted purple with soft rose accents",
    promptModifier: "Use Rosé Pine palette: muted purple-gray (#191724) backgrounds, soft rose (#ebbcba) for primary, muted gold (#f6c177) for highlights, pine green (#9ccfd8) for accents, love red (#eb6f92) for errors, and soft white (#e0def4) for text. Create an elegant, muted aesthetic."
  }
} as const;

export type ColorPaletteKey = keyof typeof COLOR_PALETTES;

export function getPalettePromptModifier(palette: ColorPaletteKey | string): string {
  if (palette in COLOR_PALETTES) {
    return COLOR_PALETTES[palette as ColorPaletteKey].promptModifier;
  }
  // If it's a custom string, use it directly as the modifier
  return `Use the following custom color palette: ${palette}`;
}

export function listColorPalettes(): void {
  console.log('\n🎨 Available Color Palettes:\n');

  console.log('VS Code Themes:');
  ['dracula', 'monokai', 'one-dark', 'solarized-dark', 'solarized-light', 'nord', 'night-owl', 'cobalt2', 'tokyo-night', 'synthwave', 'palenight', 'ayu-dark', 'shades-of-purple', 'catppuccin-mocha', 'rose-pine'].forEach(key => {
    const palette = COLOR_PALETTES[key as ColorPaletteKey];
    console.log(`  ${key.padEnd(20)} - ${palette.name}`);
    console.log(`  ${' '.repeat(23)}${palette.description}\n`);
  });

  console.log('GitHub Themes:');
  ['github-dark', 'github-light'].forEach(key => {
    const palette = COLOR_PALETTES[key as ColorPaletteKey];
    console.log(`  ${key.padEnd(20)} - ${palette.name}`);
    console.log(`  ${' '.repeat(23)}${palette.description}\n`);
  });

  console.log('Material Design:');
  ['material'].forEach(key => {
    const palette = COLOR_PALETTES[key as ColorPaletteKey];
    console.log(`  ${key.padEnd(20)} - ${palette.name}`);
    console.log(`  ${' '.repeat(23)}${palette.description}\n`);
  });

  console.log('Retro Themes:');
  ['gruvbox-dark', 'gruvbox-light'].forEach(key => {
    const palette = COLOR_PALETTES[key as ColorPaletteKey];
    console.log(`  ${key.padEnd(20)} - ${palette.name}`);
    console.log(`  ${' '.repeat(23)}${palette.description}\n`);
  });
}
