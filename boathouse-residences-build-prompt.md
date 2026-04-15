# The Boathouse Residences — Claude Code Build Prompt

## Project Overview

Build a luxury property marketing website for **The Boathouse Residences** — a premium waterfront residential development. The site is a single-property microsite designed to attract high-net-worth buyers, generate enquiries, and communicate the lifestyle promise of harbourside living.

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Sanity CMS (v3, headless)
**Deployment:** Vercel
**Domain:** TBC (use `theboathouseresidences.com` as placeholder)

---

## Design Direction

### Aesthetic

Luxury coastal — restrained, warm, and tactile. Think linen-draped interiors with harbour light streaming through floor-to-ceiling glass. The design language bridges nautical heritage with contemporary architectural refinement. NOT a generic property template — this should feel like a boutique hospitality brand.

**Core design principles:**
- Generous whitespace — let images and typography breathe
- Warm, muted palette with natural texture cues (linen, driftwood, sand)
- Cinematic full-bleed imagery as the dominant visual element
- Subtle motion — slow fades, gentle parallax, refined scroll reveals (never flashy)
- Editorial typography hierarchy — large serif headings, refined sans body
- Every section transition should feel deliberate (alternating sand/white/image backgrounds)

### Design References

- **Primary wireframe:** See `the_boathouse_residences_landing_page.png` in the project root — follow this layout structure closely for the homepage
- **biancadrummoyne.com.au** — Luxury waterfront residential site. Reference: editorial typography, cinematic hero sections with video capability, elegant enquiry form integration, warm colour treatment over renders, sophisticated nav with transparent-to-solid scroll behaviour
- **beachhouse.nz** — NZ luxury coastal development. Reference: restrained minimalism, generous whitespace, considered use of natural textures, refined navigation, high-end material photography

### Colour Palette

Define in `tailwind.config.ts` as custom colours AND as CSS custom properties in `globals.css`. Nautical-inspired linen tones — calming, warm, beachhouse cues.

```css
:root {
  /* Primary */
  --color-sand:        #E8DFD3;   /* Warm sand/linen — primary background for content sections */
  --color-driftwood:   #C4B5A3;   /* Muted warm neutral — secondary backgrounds, card fills */
  --color-harbour:     #4A6670;   /* Deep teal-grey — headings, primary accents */
  --color-deep-navy:   #1E2D3D;   /* Dark navy — footer, nav overlays, contrast text */

  /* Supporting */
  --color-linen-white: #F5F1EC;   /* Off-white — page background, hero text overlays */
  --color-rope:        #A69178;   /* Warm tan — borders, subtle accents, hover states */
  --color-sea-foam:    #B8C9C3;   /* Muted green-grey — badges, status indicators */
  --color-salt:        #FAFAF8;   /* Near-white — alternate section backgrounds */
  --color-charcoal:    #2C2C2C;   /* Body text */

  /* Functional */
  --color-cta:         #8B7355;   /* Warm bronze — CTA buttons, links */
  --color-cta-hover:   #6E5A42;   /* Darker bronze hover */
  --color-available:   #6B8F71;   /* Green — "Available" badge */
  --color-under-offer: #C4A35A;   /* Amber — "Under Offer" badge */
  --color-sold:        #8B4D4D;   /* Muted red — "Sold" badge */
}
```

### Typography

Use Google Fonts via `next/font/google`. Pair a refined serif display face with a clean geometric sans.

- **Display / Headings:** `Cormorant Garamond` (weights: 300, 400, 500, 600) — elegant, editorial, luxury feel
- **Body / UI:** `Outfit` (weights: 300, 400, 500) — clean, modern, excellent readability at all sizes
- **Accent / Labels:** `Outfit` uppercase with generous letter-spacing (`tracking-[0.15em]` to `tracking-[0.2em]`)

**Type Scale:**
- Hero title: `text-5xl md:text-6xl lg:text-7xl`, Cormorant Garamond, font-weight 300–400
- Section headings: `text-3xl md:text-4xl lg:text-5xl`, Cormorant Garamond, font-weight 400, uppercase, tracked
- Subheadings: `text-xl md:text-2xl`, Cormorant Garamond, font-weight 500
- Body: `text-base md:text-lg`, Outfit, font-weight 300, leading-relaxed, text-charcoal
- Labels / nav links: `text-sm`, Outfit, font-weight 400, uppercase, tracked
- CTA buttons: `text-sm`, Outfit, font-weight 500, uppercase, tracked

---

## Image Assets

All images are pre-placed in `/public/images/` in the project workspace. Use `next/image` with proper `width`, `height`, and `alt` attributes for all images. Use `priority` prop on above-the-fold hero images. For CMS-managed images, use Sanity's image CDN with the `@sanity/image-url` package.

Reference images by their filenames in `/public/images/`. Use placeholder images from the folder for all static sections. Any CMS-managed content (residences, build updates, articles) should pull images from Sanity.

---

## Site Architecture & Pages

### Global Components

#### Navigation (Header)
- Fixed/sticky header with transparent background over hero, transitioning to `--color-linen-white` with subtle backdrop-blur on scroll
- Logo: "THE BOATHOUSE" (top line, larger) + "RESIDENCES" (second line, smaller, tracked) — left-aligned. Use Cormorant Garamond, font-weight 400. Render as styled text (not an image), linking to homepage
- Nav links (right-aligned, desktop): HOME | LIFESTYLE | RESIDENCES | VISION | ENQUIRE
- "ENQUIRE" link styled as a pill/rectangle CTA button in `--color-cta` with white text
- Mobile: Hamburger icon → full-screen overlay nav with large stacked links, dark background (`--color-deep-navy` at 95% opacity), smooth slide-in from right
- Scroll behaviour: On scroll past hero, nav background transitions from transparent → `--color-linen-white` with `box-shadow: 0 1px 0 rgba(0,0,0,0.05)`. Logo and links shift from white (over hero) to `--color-charcoal`
- Active page indicator: subtle bottom border on current nav link

#### Footer
- Background: `--color-deep-navy`
- Text: `--color-linen-white` / `--color-driftwood`
- Layout (desktop): Three columns
  - **Left column:** Developer logos (use placeholder images from `/public/images/` if available, or styled text placeholders)
  - **Centre column:** Social icons — Instagram + Facebook (use Lucide icons, `--color-driftwood`, hover to white)
  - **Right column:** Copyright line: "© 2025 The Boathouse Residences. All rights reserved."
- Contact details centred above columns: "Sales Suite Open Daily" / "123 Boathouse Way, Waterfront City" / "1300 BOATHOUSE" / "info@boathouseresidences.com"
- All contact details use Outfit, light weight, generous line-height
- Mobile: Stack vertically, centre-aligned

---

### Page 1: Homepage

Follow the wireframe layout structure precisely. Each section described top-to-bottom:

#### Section 1 — Hero
- Full-viewport-height (`h-screen`) image section
- Background: Full-bleed hero image from `/public/images/` — waterfront building exterior render
- Support for optional video background (MP4) — controlled via Sanity toggle. If video exists, autoplay muted loop with image fallback
- Overlay: Subtle dark gradient from bottom (`bg-gradient-to-t from-black/30 to-transparent`) to ensure nav readability
- No text overlay on the hero itself in the wireframe — keep it clean, cinematic, image-only (logo and nav sit on top)
- Smooth scroll-down indicator at bottom centre: thin animated chevron or line

#### Section 2 — The Boathouse Lifestyle (Introduction)
- Background: `--color-salt` (near-white)
- Centred text block, max-width `max-w-3xl`
- Heading: "THE BOATHOUSE LIFESTYLE" — `text-4xl md:text-5xl`, Cormorant Garamond, uppercase, tracked, `--color-harbour`
- Body paragraph beneath: ~3 lines of descriptive copy about the lifestyle proposition. Outfit light, `text-lg`, `--color-charcoal`, `leading-relaxed`
- Generous vertical padding: `py-24 md:py-32`
- Framer Motion: Fade-up on scroll into view (stagger heading then body)

#### Section 3 — Lifestyle Image (Full-Bleed)
- Full-width image section, no text overlay
- Image: Waterfront/harbour lifestyle shot — golden hour, boats on water, building in background
- Aspect ratio: roughly 16:9 on desktop, can crop taller on mobile
- Use `next/image` with `fill` and `object-cover`
- Optional: Very subtle parallax scroll effect (2–3% movement, not aggressive)

#### Section 4 — Architectural Vision
- Background: `--color-salt`
- Centred layout, `max-w-3xl`
- Heading: "ARCHITECTURAL VISION" — same styling as Section 2 heading
- Body paragraph: 2–3 lines about the architectural intent, natural materials, indoor-outdoor living
- CTA button below: "EXPLORE VISION" — pill-shaped, `--color-cta` background, white text, Outfit uppercase tracked. Hover: darken to `--color-cta-hover` with smooth transition. Links to `/vision` page
- Framer Motion: Fade-up on scroll

#### Section 5 — Coastal Living (Image Carousel)
- Background: `--color-linen-white`
- Heading: "COASTAL LIVING" — centred, same heading style
- Horizontal image carousel/slider below the heading
- Show 4 images side-by-side on desktop (with small gaps), 1.5 images visible on mobile (peek effect)
- Images: Lifestyle photography — couple walking on boardwalk, SUP boarding, harbour views, interior shots
- Navigation: Dot indicators below carousel (3 dots visible in wireframe). Optional subtle left/right arrows on hover
- Smooth snap-scroll or swipe-based carousel. Use a lightweight approach (CSS scroll-snap preferred, or Embla Carousel if needed)
- Generous vertical padding

#### Section 6 — Residences (Split Layout)
- Background: `--color-sand`
- Two-column layout on desktop (image left, text right), stacks on mobile
- Left: Large interior/exterior render showing living space with harbour view and boat
- Right:
  - Heading: "RESIDENCES" — `text-3xl md:text-4xl`, Cormorant Garamond, `--color-harbour`
  - Body paragraph: Description of residences — sanctuary of light and space, meticulously designed interiors, panoramic water views
  - Optional CTA: "VIEW RESIDENCES" linking to `/residences`
- Framer Motion: Image slides in from left, text fades up from right (triggered on scroll)

#### Section 7 — Enquiry Form
- Background: `--color-salt`
- Heading: "ENQUIRY NOW" — centred, uppercase, tracked
- Form fields in a single row on desktop (stacks 2×2 on tablet, single column on mobile):
  - First Name (text input)
  - Last Name (text input)
  - Email Address* (email input, required)
  - Phone Number* (tel input, required)
- Below fields: "How Did You Hear About Us?" — dropdown select with options: Direct Mail, Website, Social Media, Referral, Real Estate Portal, Other
- Submit button: Full-width on mobile, inline on desktop. `--color-cta` background, white text, "SUBMIT" label
- Form submission: POST to a Next.js API route (`/api/enquiry`) that:
  - Validates inputs server-side
  - Sends notification email (via Resend or similar — leave as a TODO with clear interface)
  - Stores lead in Sanity as a document type `enquiry`
  - Returns success/error response
- Success state: Replace form with "Thank you for your enquiry. Our team will be in touch shortly." message
- Below the form: Contact details block (same as footer — sales suite address, phone, email)

---

### Page 2: Lifestyle (`/lifestyle`)

A rich editorial page showcasing the waterfront living experience.

- **Hero:** Full-width lifestyle image (harbour/waterfront), with "LIFESTYLE" heading overlaid in white, centred
- **Content sections** (alternating layouts, CMS-managed from Sanity):
  - Each section has: heading, body text (rich text from Sanity Portable Text), and 1–2 images
  - Alternate between: image-left/text-right, full-bleed image, text-centred with image below
  - Content covers: waterfront living, marina access, dining & entertainment, community
- **Image gallery:** Masonry or uniform grid of lifestyle images at the bottom (managed in Sanity)
- Framer Motion scroll reveals throughout

### Page 3: Residences (`/residences`)

Showcase individual residences/units with status tracking.

- **Hero:** Full-width architectural render with "RESIDENCES" heading overlay
- **Introduction:** Centred text block — overview of the collection
- **Residence grid:**
  - Card-based layout, 2 columns on desktop, 1 on mobile
  - Each card (from Sanity `residence` document type):
    - Featured image (Sanity image)
    - Residence name/number
    - Key specs: bedrooms, bathrooms, parking, internal area (m²)
    - Status badge: "Available" (green) / "Under Offer" (amber) / "Sold" (muted red)
    - Brief description
    - "View Details" link → individual residence page (`/residences/[slug]`)
  - Cards have subtle hover lift effect (`hover:-translate-y-1 hover:shadow-lg`)
- **Individual Residence Page (`/residences/[slug]`):**
  - Full-width hero image
  - Specs bar: Bedrooms | Bathrooms | Car Spaces | Internal Area | External Area
  - Description (Portable Text from Sanity)
  - Image gallery (lightbox on click)
  - Floorplan image(s) if available
  - Status badge
  - Enquiry CTA linking to `/enquire` or scrolling to enquiry form
  - "Back to Residences" navigation link

### Page 4: Vision (`/vision`)

The architectural and design story.

- **Hero:** Full-width architectural render, "VISION" heading overlay
- **Content sections** (CMS-managed, Portable Text):
  - Architectural philosophy
  - Materials and finishes
  - Indoor-outdoor integration
  - Sustainability features (if applicable)
- Each section: rich text + image(s), alternating left/right layouts
- Optional: Embedded video (Vimeo/YouTube) for architectural flythrough
- CTA at bottom: "EXPLORE RESIDENCES" → `/residences`

### Page 5: Build Updates (`/updates`)

Monthly construction progress journal.

- **Hero:** Simple header with "BUILD UPDATES" heading, `--color-sand` background
- **Update feed:** Vertical timeline or blog-style list, newest first
- Each update entry (from Sanity `buildUpdate` document type):
  - Date (month/year)
  - Title
  - Photo carousel (multiple images per update, swipeable)
  - Notes/description (Portable Text)
  - Optional status milestone badge
- Pagination or "Load More" for older updates
- Individual update page not required — use expandable cards or anchor links

### Page 6: Enquire (`/enquire`)

Dedicated enquiry page (in addition to the homepage form section).

- Clean, focused layout
- Same form as homepage Section 7, but full-page treatment
- Split layout on desktop: form on right, key selling points or hero image on left
- Include: phone number, email, sales suite address with embedded Google Map
- "How Did You Hear About Us?" dropdown

---

## Sanity CMS Schema

### Document Types

```typescript
// schemas/residence.ts
{
  name: 'residence',
  title: 'Residence',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'status', title: 'Status', type: 'string',
      options: { list: ['Available', 'Under Offer', 'Sold'] } },
    { name: 'description', title: 'Description', type: 'blockContent' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'floorplans', title: 'Floorplans', type: 'array', of: [{ type: 'image' }] },
    { name: 'bedrooms', title: 'Bedrooms', type: 'number' },
    { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
    { name: 'parking', title: 'Car Spaces', type: 'number' },
    { name: 'internalArea', title: 'Internal Area (m²)', type: 'number' },
    { name: 'externalArea', title: 'External Area (m²)', type: 'number' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ]
}

// schemas/buildUpdate.ts
{
  name: 'buildUpdate',
  title: 'Build Update',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'content', title: 'Content', type: 'blockContent' },
    { name: 'images', title: 'Photo Carousel', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'milestone', title: 'Milestone Badge', type: 'string',
      description: 'Optional milestone label, e.g. "Foundation Complete", "Topped Out"' },
  ]
}

// schemas/homePage.ts
{
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroVideo', title: 'Hero Video (MP4 URL)', type: 'url',
      description: 'Optional — if set, plays as background video with heroImage as fallback' },
    { name: 'lifestyleHeading', title: 'Lifestyle Section Heading', type: 'string' },
    { name: 'lifestyleBody', title: 'Lifestyle Section Body', type: 'text' },
    { name: 'visionHeading', title: 'Vision Section Heading', type: 'string' },
    { name: 'visionBody', title: 'Vision Section Body', type: 'text' },
    { name: 'coastalLivingImages', title: 'Coastal Living Carousel Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'residencesImage', title: 'Residences Section Image', type: 'image',
      options: { hotspot: true } },
    { name: 'residencesHeading', title: 'Residences Section Heading', type: 'string' },
    { name: 'residencesBody', title: 'Residences Section Body', type: 'text' },
  ]
}

// schemas/lifestylePage.ts
{
  name: 'lifestylePage',
  title: 'Lifestyle Page',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'sections', title: 'Content Sections', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'blockContent' },
        { name: 'images', title: 'Images', type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }] },
        { name: 'layout', title: 'Layout', type: 'string',
          options: { list: ['imageLeft', 'imageRight', 'fullBleed', 'centred'] } },
      ]
    }]},
    { name: 'galleryImages', title: 'Gallery Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }] },
  ]
}

// schemas/visionPage.ts
{
  name: 'visionPage',
  title: 'Vision Page',
  type: 'document',
  fields: [
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'sections', title: 'Content Sections', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'blockContent' },
        { name: 'images', title: 'Images', type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }] },
        { name: 'layout', title: 'Layout', type: 'string',
          options: { list: ['imageLeft', 'imageRight', 'fullBleed', 'centred'] } },
      ]
    }]},
    { name: 'videoUrl', title: 'Video Embed URL', type: 'url' },
  ]
}

// schemas/enquiry.ts
{
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    { name: 'firstName', title: 'First Name', type: 'string' },
    { name: 'lastName', title: 'Last Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'source', title: 'How Did You Hear About Us', type: 'string' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
    { name: 'residence', title: 'Related Residence', type: 'reference',
      to: [{ type: 'residence' }],
      description: 'Optional — if enquiry came from a specific residence page' },
  ],
  readOnly: true,
}

// schemas/siteSettings.ts
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string' },
    { name: 'siteDescription', title: 'Site Description', type: 'text' },
    { name: 'contactEmail', title: 'Contact Email', type: 'string' },
    { name: 'contactPhone', title: 'Contact Phone', type: 'string' },
    { name: 'salesSuiteAddress', title: 'Sales Suite Address', type: 'text' },
    { name: 'instagramUrl', title: 'Instagram URL', type: 'url' },
    { name: 'facebookUrl', title: 'Facebook URL', type: 'url' },
    { name: 'developerLogos', title: 'Developer Logos', type: 'array', of: [{ type: 'image' }] },
    { name: 'ogImage', title: 'Default OG Image', type: 'image' },
    { name: 'disclaimer', title: 'Disclaimer Text', type: 'text' },
  ]
}

// schemas/blockContent.ts — reusable Portable Text definition
{
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    { type: 'block', styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
    ]},
    { type: 'image', options: { hotspot: true } },
  ]
}
```

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, nav, footer, metadata
│   ├── page.tsx                # Homepage
│   ├── lifestyle/
│   │   └── page.tsx
│   ├── residences/
│   │   ├── page.tsx            # Residences listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual residence
│   ├── vision/
│   │   └── page.tsx
│   ├── updates/
│   │   └── page.tsx            # Build updates
│   ├── enquire/
│   │   └── page.tsx            # Dedicated enquiry page
│   └── api/
│       └── enquiry/
│           └── route.ts        # Enquiry form handler
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Sticky nav with scroll-aware transparency
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx      # Full-screen mobile nav overlay
│   ├── ui/
│   │   ├── Button.tsx          # CTA button (variants: primary, outline, ghost)
│   │   ├── StatusBadge.tsx     # Available / Under Offer / Sold badge
│   │   ├── SectionHeading.tsx  # Reusable heading (Cormorant, uppercase, tracked)
│   │   ├── ImageCarousel.tsx   # Horizontal scroll carousel (CSS scroll-snap or Embla)
│   │   ├── ScrollReveal.tsx    # Framer Motion scroll-triggered fade-up wrapper
│   │   └── Lightbox.tsx        # Image lightbox for galleries
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero with optional video
│   │   ├── LifestyleIntro.tsx  # "The Boathouse Lifestyle" centred text section
│   │   ├── FullBleedImage.tsx  # Full-width image with optional parallax
│   │   ├── ArchitecturalVision.tsx  # Vision intro + CTA
│   │   ├── CoastalLiving.tsx   # Image carousel section
│   │   ├── ResidencesPreview.tsx    # Split layout residences teaser
│   │   └── EnquiryForm.tsx     # Enquiry form (reused on homepage + /enquire)
│   ├── residences/
│   │   ├── ResidenceCard.tsx   # Card for listing grid
│   │   ├── ResidenceGallery.tsx # Image gallery with lightbox
│   │   └── SpecsBar.tsx        # Horizontal specs (beds/baths/cars/area)
│   ├── updates/
│   │   └── UpdateCard.tsx      # Build update entry with carousel
│   └── shared/
│       ├── PortableTextRenderer.tsx  # Custom Sanity Portable Text renderer
│       └── SanityImage.tsx     # Wrapper for Sanity image URL builder
├── lib/
│   ├── sanity/
│   │   ├── client.ts           # Sanity client config
│   │   ├── queries.ts          # GROQ queries
│   │   └── image.ts            # Image URL builder
│   └── utils.ts                # Helpers (cn(), formatDate, etc.)
├── sanity/                     # Sanity Studio (embedded at /studio or standalone)
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── residence.ts
│   │   ├── buildUpdate.ts
│   │   ├── homePage.ts
│   │   ├── lifestylePage.ts
│   │   ├── visionPage.ts
│   │   ├── enquiry.ts
│   │   ├── siteSettings.ts
│   │   └── blockContent.ts
│   └── sanity.config.ts
└── styles/
    └── globals.css             # CSS vars, base styles, custom utilities
```

---

## Key GROQ Queries

```groq
// Homepage
*[_type == "homePage"][0] {
  heroImage,
  heroVideo,
  lifestyleHeading,
  lifestyleBody,
  visionHeading,
  visionBody,
  coastalLivingImages,
  residencesImage,
  residencesHeading,
  residencesBody
}

// All residences (listing)
*[_type == "residence"] | order(order asc) {
  _id,
  name,
  slug,
  status,
  featuredImage,
  bedrooms,
  bathrooms,
  parking,
  internalArea,
  description
}

// Single residence
*[_type == "residence" && slug.current == $slug][0] {
  ...,
  gallery,
  floorplans
}

// Build updates (newest first)
*[_type == "buildUpdate"] | order(date desc) {
  _id,
  title,
  date,
  content,
  images,
  milestone
}

// Site settings
*[_type == "siteSettings"][0]
```

---

## Animation & Interaction Patterns

Use Framer Motion throughout. Keep animations refined and restrained — luxury, not playful.

### Scroll Reveals
Create a reusable `<ScrollReveal>` wrapper component:
```tsx
// Default: fade up with slight Y translate
<ScrollReveal>
  <SectionHeading>...</SectionHeading>
</ScrollReveal>

// Props: delay, direction ('up' | 'left' | 'right'), duration, once (trigger once vs repeat)
```

**Settings:**
- Duration: `0.8s` default
- Ease: `[0.25, 0.1, 0.25, 1]` (smooth ease-out)
- Y offset: `30px` (subtle, not dramatic)
- Stagger children: `0.15s` delay between items
- Trigger: when element is 20% in viewport (`viewport={{ once: true, amount: 0.2 }}`)

### Navigation
- Background transition: `transition-all duration-500`
- Mobile menu: `AnimatePresence` with slide-in from right + fade overlay

### Hover Effects
- Buttons: background colour shift, `transition-colors duration-300`
- Cards: `hover:-translate-y-1 hover:shadow-lg transition-all duration-300`
- Images in cards: `hover:scale-105 transition-transform duration-700` (with `overflow-hidden` on parent)
- Nav links: subtle underline slide-in from left on hover

### Page Transitions
- Optional: Fade transition between pages using Framer Motion `AnimatePresence` in the root layout
- Keep it simple — `opacity` only, `0.3s` duration

---

## Performance & SEO Requirements

### Core Web Vitals
- All images via `next/image` with responsive `sizes` attribute
- Hero image: `priority` prop, serve WebP/AVIF via Next.js image optimisation
- Lazy load all below-fold images
- Use `loading="lazy"` on iframes (maps, video embeds)
- Minimise layout shift: always specify `width` and `height` or use `fill` with a sized container
- Font loading: `next/font/google` with `display: 'swap'` and `preload: true`

### SEO
- Dynamic `<title>` and `<meta name="description">` per page via Next.js `metadata` export
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter card meta tags
- Default OG image from Sanity `siteSettings`
- `robots.txt` and `sitemap.xml` via Next.js built-in generation
- Structured data (JSON-LD) on homepage: `RealEstateAgent` or `Organization` schema
- Canonical URLs on all pages
- Semantic HTML: proper heading hierarchy (single `h1` per page), `<nav>`, `<main>`, `<section>`, `<footer>`

### Responsive Breakpoints
Follow Tailwind defaults:
- Mobile: `< 768px` (base styles)
- Tablet: `md: 768px`
- Desktop: `lg: 1024px`
- Wide: `xl: 1280px`
- Ultra-wide: `2xl: 1536px` — cap content width at `max-w-7xl` centred

---

## Development Notes

### Dependencies
```json
{
  "dependencies": {
    "next": "^14",
    "react": "^18",
    "react-dom": "^18",
    "next-sanity": "latest",
    "@sanity/image-url": "latest",
    "@sanity/vision": "latest",
    "@portabletext/react": "latest",
    "sanity": "^3",
    "framer-motion": "^11",
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "tailwindcss": "^3",
    "postcss": "latest",
    "autoprefixer": "latest",
    "typescript": "^5",
    "@types/react": "^18",
    "@types/node": "^20"
  }
}
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=          # Server-side only — for writing enquiry documents
```

### Fallback Content (Use When Sanity Is Not Yet Connected)

When Sanity is not yet configured or no CMS data exists, render the site with hardcoded placeholder content so the frontend is fully previewable. Use the images from `/public/images/` and the following placeholder copy:

**Homepage:**
- Lifestyle heading: "THE BOATHOUSE LIFESTYLE"
- Lifestyle body: "Discover an unparalleled living experience where modern luxury meets coastal serenity. The Boathouse Residences offer a curated collection of waterfront homes, designed for those who appreciate the finer things in life. Wake up to panoramic views of the harbour, enjoy direct access to private marinas, and indulge in a lifestyle defined by elegance and ease."
- Vision heading: "ARCHITECTURAL VISION"
- Vision body: "Crafted by award-winning architects, our vision is a testament to seamless indoor-outdoor living. Blending natural materials with contemporary design to create an oasis of calm by the water."
- Residences heading: "RESIDENCES"
- Residences body: "Each residence is a sanctuary of light and space, with meticulously designed interiors and panoramic water views, offering the ultimate in modern luxury living."

**Contact details:**
- Sales Suite Open Daily
- 123 Boathouse Way, Waterfront City
- 1300 BOATHOUSE
- info@boathouseresidences.com

### Build Order
1. **Scaffold:** `npx create-next-app@latest` with TypeScript, Tailwind, App Router, src directory
2. **Tailwind config:** Extend with custom colours, fonts, animations
3. **Globals CSS:** CSS custom properties, base typography styles, smooth scroll
4. **Sanity setup:** `npm create sanity@latest` — embed studio at `/studio` route, define all schemas
5. **Sanity client + image builder:** `lib/sanity/client.ts`, `lib/sanity/image.ts`
6. **Global components:** Navigation (with scroll behaviour), Footer, MobileMenu
7. **Reusable UI:** Button, SectionHeading, ScrollReveal, StatusBadge
8. **Homepage:** Build all 7 sections top-to-bottom, wire to Sanity homepage query with fallback content
9. **Residences:** Listing page + individual residence pages, ResidenceCard, SpecsBar, Gallery
10. **Lifestyle + Vision pages:** Editorial layouts with PortableTextRenderer
11. **Build Updates:** Timeline/card layout with image carousels
12. **Enquiry page:** Full-page enquiry form + API route
13. **SEO:** Metadata, sitemap, robots.txt, JSON-LD
14. **Final pass:** Responsive QA, animation polish, Lighthouse audit

### Quality Checklist
- [ ] Navigation scroll transparency works smoothly
- [ ] Mobile menu opens/closes with animation, no scroll lock issues
- [ ] All images use `next/image` with proper sizing
- [ ] Hero video autoplay works (muted, loop, playsinline)
- [ ] Enquiry form validates and submits correctly
- [ ] Status badges render correct colours per status
- [ ] Carousel is touch-swipeable on mobile
- [ ] All scroll animations trigger correctly and only once
- [ ] Footer contact details match siteSettings
- [ ] Lighthouse score: 90+ Performance, 90+ Accessibility, 90+ SEO
- [ ] All pages render correctly at 375px, 768px, 1024px, 1440px
- [ ] Sanity Studio accessible and all schemas editable
- [ ] Favicon and OG image configured
- [ ] Fallback content renders correctly when Sanity is empty
