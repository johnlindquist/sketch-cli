export const COMPONENT_TYPES = {
  button: {
    name: "Button/CTA",
    description: "Primary, secondary, or tertiary action buttons",
    focusAreas: [
      "button shape, border radius, and sizing",
      "text treatment, font weight, and case (uppercase, sentence case)",
      "hover and active states with visual feedback",
      "icon placement and spacing (left, right, icon-only)",
      "color scheme for different button states (primary, secondary, disabled)",
      "padding and internal spacing for text and icons",
      "shadow, border, or outline treatments"
    ]
  },
  card: {
    name: "Card Component",
    description: "Content cards with image, text, and actions",
    focusAreas: [
      "card layout structure (vertical, horizontal, media placement)",
      "image aspect ratios and treatment",
      "content hierarchy (title, description, metadata)",
      "spacing and padding within the card",
      "hover states and elevation changes",
      "action placement (buttons, links at bottom or overlay)",
      "border, shadow, and background treatments"
    ]
  },
  form: {
    name: "Form Input",
    description: "Text inputs, selects, textareas, and form controls",
    focusAreas: [
      "input field styling (borders, backgrounds, fills)",
      "label positioning (floating, above, inline)",
      "placeholder text treatment",
      "focus states with clear visual indicators",
      "error and validation message styling",
      "helper text and character counter placement",
      "icon integration (prefix, suffix icons)"
    ]
  },
  nav: {
    name: "Navigation Menu",
    description: "Navigation bars, menus, and navigation components",
    focusAreas: [
      "navigation layout (horizontal, vertical, hamburger)",
      "menu item styling and spacing",
      "active/current page indicators",
      "hover and focus states for links",
      "dropdown or submenu treatments",
      "logo placement and sizing",
      "mobile responsive hamburger menu design"
    ]
  },
  modal: {
    name: "Modal/Dialog",
    description: "Modal dialogs, popups, and overlays",
    focusAreas: [
      "modal sizing and positioning on screen",
      "header, body, and footer sections",
      "close button placement and styling",
      "backdrop/overlay treatment",
      "content padding and spacing",
      "action button placement (right-aligned, spread, centered)",
      "entry and exit animation suggestions"
    ]
  },
  table: {
    name: "Data Table",
    description: "Tables for displaying structured data",
    focusAreas: [
      "header row styling and emphasis",
      "cell padding and alignment",
      "row striping or hover states",
      "sort indicators for sortable columns",
      "action column with icons or buttons",
      "responsive table approach (scroll, cards, collapse)",
      "border treatments between cells and rows"
    ]
  },
  list: {
    name: "List Item",
    description: "List items for vertical lists or feeds",
    focusAreas: [
      "list item layout structure",
      "avatar or icon placement and sizing",
      "primary and secondary text hierarchy",
      "metadata and timestamp placement",
      "action buttons or menu placement (right side, overlay)",
      "divider or separator treatment between items",
      "hover and selected states"
    ]
  },
  header: {
    name: "Page Header",
    description: "Hero sections, page headers, or banners",
    focusAreas: [
      "headline typography and hierarchy",
      "subheading and supporting text treatment",
      "CTA button placement and prominence",
      "background treatment (solid, gradient, image)",
      "content alignment (centered, left-aligned)",
      "spacing and vertical rhythm",
      "image or illustration integration"
    ]
  },
  footer: {
    name: "Footer Section",
    description: "Site footer with links and information",
    focusAreas: [
      "column structure and link organization",
      "social media icon styling and placement",
      "newsletter signup integration",
      "copyright and legal text treatment",
      "logo placement in footer",
      "background color and contrast with page",
      "spacing between footer sections"
    ]
  },
  badge: {
    name: "Badge/Tag/Chip",
    description: "Small status indicators, tags, or labels",
    focusAreas: [
      "badge shape (rounded, pill, square)",
      "size variations (small, medium, large)",
      "color schemes for different statuses (success, warning, error, info)",
      "icon integration within badge",
      "removable badges with close button",
      "border vs filled vs outlined styles",
      "text treatment and letter spacing"
    ]
  },
  icon: {
    name: "Icon Button/Icon",
    description: "Icon-based controls and indicators",
    focusAreas: [
      "icon style (outlined, filled, rounded, sharp)",
      "sizing and touch target area",
      "background treatment (circle, square, none)",
      "hover and active states",
      "color schemes for different contexts",
      "shadow or elevation for floating action buttons",
      "badge or notification dot integration"
    ]
  },
  dropdown: {
    name: "Dropdown/Select Menu",
    description: "Dropdown menus and select components",
    focusAreas: [
      "trigger button styling",
      "dropdown menu positioning and sizing",
      "menu item hover and selected states",
      "dividers between menu sections",
      "icons or checkmarks for selected items",
      "search integration for long lists",
      "shadow and elevation for floating menu"
    ]
  },
  toggle: {
    name: "Toggle/Switch/Checkbox",
    description: "Toggle switches, checkboxes, and radio buttons",
    focusAreas: [
      "toggle switch shape and sizing",
      "on/off state visual differentiation",
      "animation transition between states",
      "label placement and alignment",
      "disabled state appearance",
      "color schemes for active state",
      "focus ring or outline for accessibility"
    ]
  },
  toast: {
    name: "Toast/Notification",
    description: "Toast messages and notification banners",
    focusAreas: [
      "notification positioning on screen",
      "icon placement and meaning (success, error, info, warning)",
      "message text hierarchy",
      "action button or dismiss button placement",
      "background color schemes by notification type",
      "shadow and elevation",
      "progress indicator for auto-dismiss timing"
    ]
  },
  avatar: {
    name: "Avatar/Profile Picture",
    description: "User avatars and profile images",
    focusAreas: [
      "shape variations (circle, rounded square, square)",
      "size variations for different contexts",
      "border and ring treatments",
      "online status indicator placement",
      "placeholder treatment for missing images",
      "badge or icon overlay (verified, premium)",
      "group avatar stacking approach"
    ]
  }
} as const;

export type ComponentTypeKey = keyof typeof COMPONENT_TYPES;
