export const PAGE_COMPONENTS = {
  home: {
    name: "homepage",
    elements: [
      "prominent hero section with large headline and call-to-action",
      "primary navigation bar with logo placement and menu items",
      "featured content grid showcasing key offerings with imagery",
      "trust indicators or social proof section",
      "value proposition highlights in cards or columns",
      "prominent search or filtering interface",
      "footer with sitemap, contact info, and secondary links"
    ]
  },
  about: {
    name: "about page",
    elements: [
      "header navigation matching site structure",
      "company story or mission statement section with imagery",
      "team member profiles with photos and descriptions",
      "timeline or milestone visualization",
      "values or culture showcase in visual format",
      "statistics or achievements display",
      "contact information or office location section",
      "footer consistent with site design"
    ]
  },
  product: {
    name: "product detail page",
    elements: [
      "breadcrumb navigation trail",
      "large product image gallery with thumbnails",
      "product title, price, and rating display",
      "detailed description and specifications section",
      "prominent 'Add to Cart' or purchase button",
      "quantity selector and size/variant options",
      "related products or recommendations carousel",
      "customer reviews and ratings section",
      "shipping and return policy information"
    ]
  },
  cart: {
    name: "shopping cart page",
    elements: [
      "simplified header navigation",
      "itemized list of cart contents with product images",
      "quantity adjusters for each item",
      "price breakdown showing subtotal, tax, shipping",
      "promo code or discount input field",
      "prominent checkout button",
      "estimated delivery information",
      "recommended products or upsells section",
      "security badges and payment method icons"
    ]
  },
  contact: {
    name: "contact page",
    elements: [
      "page header with contact heading",
      "contact form with name, email, subject, message fields",
      "contact information display (phone, email, address)",
      "embedded map showing location",
      "social media links and icons",
      "business hours information",
      "alternative contact methods",
      "FAQ or common inquiries section"
    ]
  },
  sales: {
    name: "sales landing page",
    elements: [
      "attention-grabbing headline with unique selling proposition",
      "hero image or video showcasing the offer",
      "benefit-focused bullet points or feature highlights",
      "social proof section with testimonials and reviews",
      "pricing table with package comparison",
      "urgency indicators (countdown timer, limited availability)",
      "multiple strategically-placed call-to-action buttons",
      "money-back guarantee or risk reversal section",
      "FAQ addressing common objections",
      "final call-to-action before footer"
    ]
  },
  blog: {
    name: "blog listing page",
    elements: [
      "header with blog title and navigation",
      "featured article highlight at top",
      "grid or list of article cards with thumbnails",
      "article preview text and metadata (date, author, category)",
      "sidebar with categories, tags, and search",
      "pagination or infinite scroll controls",
      "newsletter signup form",
      "popular or trending posts section"
    ]
  }
} as const;

export const DESIGN_STYLES = [
  "minimalist with lots of whitespace and clean typography",
  "bold and modern with strong geometric shapes and vibrant colors",
  "elegant and sophisticated with serif fonts and subtle textures",
  "playful and energetic with rounded shapes and dynamic layouts",
  "professional and corporate with structured grid and conservative palette",
  "editorial-focused with large typography and magazine-style layout",
  "tech-forward with gradients, glassmorphism, and modern UI patterns",
  "organic and natural with curved shapes and earthy tones",
  "retro-inspired with vintage typography and nostalgic design elements",
  "experimental and artistic with asymmetric layouts and creative compositions"
];

export const PRESENTATION_FORMATS = [
  "high-fidelity Figma design mockup with polished UI elements, no browser chrome",
  "realistic website design showing only the webpage content without browser UI",
  "digital wireframe with clean vector shapes and typography, content only",
  "interactive prototype view showing hover states and UI details, no device frame",
  "pixel-perfect web design mockup showing pure website interface"
];

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

export function buildPrompt(
  websiteType: string,
  pageType: keyof typeof PAGE_COMPONENTS,
  tuningModifier?: string,
  referenceImagePath?: string,
  platformModifier?: string
): string {
  const page = PAGE_COMPONENTS[pageType];
  const randomFormats = getRandomItems(PRESENTATION_FORMATS, 5);

  const elementsList = page.elements.map(el => `  - ${el}`).join('\n');

  // Layout variation approaches - different when tuning is specified vs not
  const layoutApproaches = tuningModifier
    ? [
        'Grid-based layout with structured columns',
        'Asymmetric layout with dynamic content placement',
        'Single-column centered layout with focus on hierarchy',
        'Multi-column magazine-style layout',
        'Card-based modular layout system'
      ]
    : getRandomItems(DESIGN_STYLES, 5);

  const platformSection = platformModifier
    ? `\n\nPLATFORM TARGET (MANDATORY - MUST BE APPLIED TO ALL 5 DESIGNS):\n${platformModifier}\n`
    : '';

  const tuningSection = tuningModifier
    ? `\n\nDESIGN DIRECTION (MANDATORY - MUST BE APPLIED TO ALL 5 DESIGNS):\n${tuningModifier}\n\nAll 5 designs must follow this design direction while exploring different layout approaches and compositions within this style.\n`
    : '';

  const referenceSection = referenceImagePath
    ? `\n\nREFERENCE IMAGE FOR INSPIRATION:\nUse this image as visual inspiration for design style, color palette, layout approach, and overall aesthetic: ${referenceImagePath}\nAdapt and remix elements from this reference while creating variations.\n`
    : '';

  const varietyInstruction = tuningModifier || platformModifier
    ? 'Create 5 different layout variations that all adhere to the specified design direction and platform requirements:'
    : 'Create 5 completely different professional website design mockups, each with a distinct visual approach:';

  // Generate naming scheme
  const timestamp = generateTimestamp();
  const websiteSlug = slugify(websiteType);
  const pageSlug = pageType;
  const platformSlug = platformModifier ? slugify(platformModifier.split(':')[0].substring(0, 20)) : 'web';
  const tuningSlug = tuningModifier ? slugify(tuningModifier.split('.')[0].substring(0, 20)) : 'default';

  const baseFilename = `${websiteSlug}_${pageSlug}_${platformSlug}_${tuningSlug}_${timestamp}`;

  const namingSection = `\n\nFILE NAMING CONVENTION:
Save each of the 5 generated images with the following naming pattern:
- ${baseFilename}_v1.png
- ${baseFilename}_v2.png
- ${baseFilename}_v3.png
- ${baseFilename}_v4.png
- ${baseFilename}_v5.png

Where:
- "${websiteSlug}" = website/app type
- "${pageSlug}" = page type
- "${platformSlug}" = platform target${tuningModifier ? `\n- "${tuningSlug}" = design direction` : ''}
- "${timestamp}" = generation timestamp (current: ${new Date().toLocaleString()})
- "v1-v5" = variation number
\n`;

  return `/generate ${varietyInstruction}

TYPE: ${websiteType} ${page.name}${platformSection}${tuningSection}${referenceSection}${namingSection}

REQUIRED UI ELEMENTS FOR ALL DESIGNS:
${elementsList}

LAYOUT VARIATION APPROACHES (explore different structures while maintaining design direction):
1. ${layoutApproaches[0]}
2. ${layoutApproaches[1]}
3. ${layoutApproaches[2]}
4. ${layoutApproaches[3]}
5. ${layoutApproaches[4]}

PRESENTATION FORMAT:
Each design should be rendered as:
1. ${randomFormats[0]}
2. ${randomFormats[1]}
3. ${randomFormats[2]}
4. ${randomFormats[3]}
5. ${randomFormats[4]}

CRITICAL REQUIREMENTS:
- Create fully realized, professional website designs (NOT paper sketches or hand-drawn wireframes)
- Use actual UI elements: buttons, images, typography, icons, colors, and modern web design patterns
- Show realistic content with proper hierarchy, spacing, and visual balance
- Include representative imagery, color schemes, and typography appropriate for a ${websiteType}
- Each design must look like a real, production-ready website layout
- Vary the layout structure and composition (grid-based vs. asymmetric vs. single-column vs. multi-column)
- Display as digital mockups that could be implemented as actual websites
- If design direction is specified, ALL 5 variations must follow that direction while exploring different layouts
- If platform is specified, ALL 5 designs must be appropriate for that platform
- Ensure each design is immediately recognizable as a ${websiteType} ${page.name}
- Provide variety through different layouts and compositions, NOT by abandoning the specified design direction

DO NOT INCLUDE:
- Hand-drawn sketches, marker drawings, or pen-and-paper wireframes
- Photographed paper with annotations or notes
- Blueprint-style technical drawings
- Rough concept sketches or gestural drawings
- Any appearance of physical paper, notebooks, or sketchbooks
- Visible marker strokes, pen lines, or hand-drawn elements
- Design annotations, arrows, or handwritten notes
- Low-fidelity gray-box wireframes without visual design
- Browser chrome, address bars, URL bars, browser tabs, or window frames
- Operating system UI elements, title bars, or window controls
- Browser bookmarks, extensions, or browser navigation buttons
- Any browser interface elements (back/forward buttons, reload, favorites, etc.)

INSTEAD, CREATE:
- Polished, high-fidelity digital designs showing ONLY the website content
- Full-color UI with realistic imagery and graphics
- Professional typography and modern web design aesthetics
- Actual website interfaces that look ready to launch
- Clean mockups focused entirely on the website design itself
- Direct view of the website without any browser or device framing`;
}

function getRandomItems<T>(array: readonly T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export type PageType = keyof typeof PAGE_COMPONENTS;
