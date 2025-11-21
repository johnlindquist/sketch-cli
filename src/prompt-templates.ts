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
  variationNumber: number,
  tuningModifier?: string,
  referenceImagePath?: string,
  platformModifier?: string,
  paletteModifier?: string,
  referenceDescription?: string
): string {
  const page = PAGE_COMPONENTS[pageType];
  const randomFormat = getRandomItems(PRESENTATION_FORMATS, 1)[0];

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
    : DESIGN_STYLES;

  // Pick a specific layout approach for this variation
  const layoutApproach = layoutApproaches[(variationNumber - 1) % layoutApproaches.length];

  const platformSection = platformModifier
    ? `\n\nPLATFORM TARGET (MANDATORY):\n${platformModifier}\n`
    : '';

  const tuningSection = tuningModifier
    ? `\n\nDESIGN DIRECTION (MANDATORY):\n${tuningModifier}\n\nThis design must follow this design direction.\n`
    : '';

  const paletteSection = paletteModifier
    ? `\n\nCOLOR PALETTE (MANDATORY):\n${paletteModifier}\n\nAll colors in this design must follow the specified palette.\n`
    : '';

  const referenceSection = referenceImagePath
    ? `\n\nREFERENCE IMAGE (CRITICAL): @${referenceImagePath}

MANDATORY: This reference image is your PRIMARY design guide. You MUST:
- Follow the reference's overall layout structure and composition approach
- Match the visual hierarchy and content organization shown in the reference
- Adopt the same design language, UI patterns, and aesthetic sensibility
- Mirror the spacing, density, and visual rhythm of the reference
- Use similar typography scale, weight distribution, and text treatment
- Apply comparable color usage patterns and visual accent strategies
- Maintain the same level of visual complexity and detail
- Preserve the reference's approach to imagery, graphics, and decorative elements
- The reference image defines the CORE DESIGN DIRECTION for this page

Your design should feel like a natural variation of the reference, not a completely different approach.
Apply the specified design direction and color palette AS MODIFICATIONS to the reference's foundation, not as replacements for it.

${referenceDescription ? `\n\nDETAILED REFERENCE ANALYSIS:\n${referenceDescription}\n\nUse this detailed analysis to understand and replicate the reference's design approach.` : ''}\n`
    : '';

  const layoutSection = `\n\nLAYOUT APPROACH FOR THIS VARIATION:\n${layoutApproach}\n`;

  // Generate naming scheme
  const timestamp = generateTimestamp();
  const websiteSlug = slugify(websiteType);
  const pageSlug = pageType;
  const platformSlug = platformModifier ? slugify(platformModifier.split(':')[0].substring(0, 20)) : 'web';
  const tuningSlug = tuningModifier ? slugify(tuningModifier.split('.')[0].substring(0, 20)) : 'default';

  const filename = `${websiteSlug}_${pageSlug}_${platformSlug}_${tuningSlug}_${timestamp}_v${variationNumber}.png`;

  const namingSection = `\n\nFILE NAMING:\nSave this design as: ${filename}\n`;

  // Add unique identifier to make prompt unique for Gemini's filename generation
  const uniqueId = `${websiteSlug}_${pageSlug}_v${variationNumber}_${timestamp}`;

  return `/generate ${uniqueId} Create ONE single, complete ${websiteType} ${page.name} design variation ${variationNumber}.

TYPE: ${websiteType} ${page.name}${platformSection}${tuningSection}${paletteSection}${layoutSection}${referenceSection}${namingSection}

REQUIRED UI ELEMENTS:
${elementsList}

PRESENTATION FORMAT:
Render this design as: ${randomFormat}

CRITICAL REQUIREMENTS:
- CREATE EXACTLY ONE COMPLETE PAGE DESIGN - not multiple pages side-by-side
- DO NOT create comparison views, grids of variations, or multiple pages in a single image
- This should be ONE standalone, complete page design
- Create fully realized, professional website designs (NOT paper sketches or hand-drawn wireframes)
- Use actual UI elements: buttons, images, typography, icons, colors, and modern web design patterns
- Show realistic content with proper hierarchy, spacing, and visual balance
- Include representative imagery, color schemes, and typography appropriate for a ${websiteType}
- This design must look like a real, production-ready website layout
- Display as a digital mockup that could be implemented as an actual website
- Ensure this design is immediately recognizable as a ${websiteType} ${page.name}

DO NOT INCLUDE:
- Multiple pages or design variations shown side-by-side in the same image
- Comparison grids showing different design options together
- Split-screen views with multiple page layouts
- Before/after comparisons or design evolution sequences
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
- ONE SINGLE PAGE DESIGN - a complete, standalone page layout
- Polished, high-fidelity digital design showing ONLY the website content
- Full-color UI with realistic imagery and graphics
- Professional typography and modern web design aesthetics
- Actual website interface that looks ready to launch
- Clean mockup focused entirely on the website design itself
- Direct view of the website without any browser or device framing

REMINDER: Generate exactly ONE image file containing ONE complete ${page.name} design.`;
}

function getRandomItems<T>(array: readonly T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export type PageType = keyof typeof PAGE_COMPONENTS;
