---
name: Faceless Dialectic
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5b5'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#998f81'
  outline-variant: '#4d463a'
  surface-tint: '#e3c285'
  primary: '#e5c487'
  on-primary: '#402d00'
  primary-container: '#c8a96e'
  on-primary-container: '#533d0c'
  inverse-primary: '#735b28'
  secondary: '#c8c6c2'
  on-secondary: '#30312d'
  secondary-container: '#474743'
  on-secondary-container: '#b6b5b0'
  tertiary: '#cbc8c8'
  on-tertiary: '#313030'
  tertiary-container: '#afadac'
  on-tertiary-container: '#424141'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea3'
  primary-fixed-dim: '#e3c285'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#594312'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  pull-quote:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.15em
spacing:
  unit: 8px
  container-max: 1120px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is built for a platform of deep inquiry and dialectical synthesis. It embodies an **Academic Magazine** aesthetic merged with a **Mysterious Night** atmosphere. The brand personality is intellectual, cloistered, and rigorous, evoking the feeling of a private library or a midnight symposium.

The visual style is a blend of **High-End Editorial Minimalism** and **Modern Dark Mode**. It prioritizes "The Word" above all else, using generous negative space and a restricted palette to focus the user’s attention on AI-generated discourse. There are no decorative images; the architecture of the information—its weight, scale, and rhythm—is the primary visual interest.

## Colors

The palette is rooted in a "Deep Night" environment. The primary interaction color is **Matte Gold**, used sparingly to highlight synthesis and crucial actions.

- **Background:** A near-black `#0A0A0A` to minimize eye strain and create a void-like depth.
- **Surface:** A subtle elevation to `#111111` for containers, defined by sharp `#222222` borders rather than shadows.
- **Typography:** Primary text is **Warm Cream**, which provides high legibility without the harshness of pure white, maintaining the "aged parchment" feel within a digital space.
- **Accents:** Matte Gold is reserved for active states, signifying "Illumination" or "Truth."

## Typography

This design system treats typography as the sole graphic element. 

- **Headlines:** Use **Playfair Display**. It provides the "Academic" authority required. Large display headings should use tighter letter spacing to feel like a premium masthead.
- **Body Text:** Use **DM Sans**. It is clean, understated, and stays out of the way of the content, allowing for long-form reading without fatigue.
- **Pull-Quotes:** These are the "Hero" elements of the system. Rendered in large, italicized Playfair Display in Matte Gold, they break the rhythm of the text to highlight dialectical synthesis.
- **Labels:** Meta-information (dates, tags, AI confidence scores) should be in uppercase, tracked-out DM Sans to provide a systematic, "archival" feel.

## Layout & Spacing

The layout philosophy follows a **Fixed Editorial Grid**. Content is centered with wide margins to mimic the layout of a physical journal. 

- **Grid:** A 12-column system is used, but content typically occupies the central 8 columns for maximum readability.
- **Vertical Rhythm:** A strict 8px baseline grid ensures that even in a complex dialectical argument, the layout feels structured and intentional.
- **Section Gaps:** Use large vertical gaps (120px+) between major thematic shifts to give the reader "mental room" to process the information.
- **Responsiveness:** On mobile, margins shrink to 20px, and typography scales down to maintain a single-column, distraction-free reading experience.

## Elevation & Depth

In keeping with the "Faceless" and "Academic" narrative, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than physical shadows.

- **The Void:** The base layer is the `#0A0A0A` background.
- **The Desk:** Interactive surfaces or cards use `#111111` with a constant `1px` border of `#222222`. 
- **Focus:** When an element is active or hovered, the border color may shift to Matte Gold.
- **No Shadows:** Shadows are strictly avoided. All depth is "flat," relying on the contrast between the deep black and the warm cream text to create visual hierarchy.

## Shapes

The design system utilizes **Sharp (0)** roundedness. Every element—buttons, inputs, cards, and containers—features 0px corner radii. This reinforces the institutional, rigorous, and architectural nature of the platform. The hard edges suggest a lack of "softness" in the dialectical process, emphasizing precision and structural integrity.

## Components

### Buttons
Buttons are either "Ghost" or "Solid."
- **Primary:** Solid Matte Gold background with `#0A0A0A` text. Sharp corners.
- **Secondary:** Transparent background with a `1px` `#222222` border. Text in Warm Cream. On hover, the border turns Gold.

### Cards
Cards are used for article previews or dialectical threads. They feature the `#111111` surface and `#222222` border. No padding on the outer container if they are "inset" into a list; otherwise, a generous 32px internal padding.

### Input Fields
Inputs are minimalist: a single 1px line at the bottom or a full borderless `#111111` box. The focus state is indicated by the Matte Gold color replacing the default border or an underline.

### Chips & Tags
Tags for topics or AI models are small, sharp rectangles. They use the `label-caps` typography style. Backgrounds are `#222222` with Cream text.

### Lists
Lists are separated by thin `1px` `#222222` horizontal rules. They do not use bullets; they use numerical markers or Matte Gold vertical accents to denote hierarchy.

### The Dialectic Divider
A unique component: a horizontal line that splits into two and rejoins, used to separate conflicting viewpoints in a discussion. It uses the Matte Gold color.