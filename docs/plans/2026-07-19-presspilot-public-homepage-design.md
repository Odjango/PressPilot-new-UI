# PressPilot Public Homepage Design

**Date:** 2026-07-19  
**Status:** Approved through delegated design authority  
**Scope:** Standalone new-UI repository only; production PressPilot remains untouched.

## Objective

Create the complete public PressPilot homepage in the approved product UI system. The page must explain one idea immediately: a short business brief becomes a complete, install-ready WordPress website that the customer can edit and own.

## Selected direction: Product transformation

The homepage opens with a visual transformation from structured business inputs into a finished website. This direction was selected over an editorial-first page and a gallery-first page because it makes the product mechanism understandable before asking the visitor to explore examples or pricing.

The visual signature is a quiet transformation rail: business name, logo, and language enter on one side; a finished branded website appears on the other. It is product-specific and replaces generic AI decoration.

## Information architecture

1. Compact public header
2. Hero with exact locked positioning and transformation visual
3. Product proof strip
4. Studio product demo
5. Website examples gallery
6. How PressPilot works
7. Included capabilities
8. One-time pricing
9. Final action and footer

## Visual system

- **Canvas:** deep navy-black with restrained emerald haze and subtle structural planes.
- **Surfaces:** quiet navy panels with thin semantic borders; no excessive glass.
- **Accent:** PressPilot emerald for primary actions, current states, and proof.
- **Secondary accent:** restrained cyan only for small metadata or transitions.
- **Typography:** Host Grotesk throughout. Weight 750–800 is reserved for the hero and conversion headings; utility copy stays comfortably spaced.
- **Shape language:** 12–18px radii for application surfaces; small pills only for real metadata.
- **Motion:** one short hero transformation sequence and restrained hover response. Reduced motion shows the completed static state.

## Content and copy

Use the locked copy from `PressPilot_UI_Copy_Action_Polish_Handoff_v1.md`:

- “Your business, turned into a complete WordPress website.”
- “Ready in minutes · $29.99 once · No subscription”
- Primary action: “Start in Studio”
- Secondary action: “See how it works”
- Navigation: How it works, Website examples, Pricing, Help, Sign in, Start in Studio

Public copy uses “website,” not “theme,” except inside technically required WordPress installation instructions.

## Page components

- `MarketingHome`
- `MarketingHeader`
- `HomeHero`
- `TransformationPreview`
- `ProductDemoSection`
- `WebsiteExamples`
- `HowItWorks`
- `IncludedFeatures`
- `PricingSection`
- `MarketingFooter`

Shared existing primitives remain reusable: `AmbientBackground`, PressPilot brand mark, semantic tokens, website preview styling, action treatments, and responsive conventions.

## Routing and data

- `/` renders the public homepage.
- `/studio` renders the existing approved Studio prototype.
- Homepage CTAs point to `/studio` inside the standalone prototype.
- Example sites use local static sample data and local visual assets. Production gallery data remains deferred.

## Responsive behavior

- Desktop uses a two-column hero with the transformation preview beside the copy.
- Tablet stacks hero copy above the preview while retaining the full website result.
- Mobile collapses navigation, uses a single-column transformation story, and keeps primary actions at least 44px high.
- No horizontal page scrolling.

## Accessibility and motion

- Semantic landmarks and section headings.
- Visible keyboard focus and correctly labeled navigation/actions.
- Sufficient contrast for primary and muted text.
- `prefers-reduced-motion` disables transformation and hover motion.
- Decorative background layers remain `aria-hidden` and non-interactive.

## States and failure handling

The homepage prototype has no external requests. Website examples are local and complete, avoiding blank gallery cards. Future production gallery integration must add loading, empty, retry, and error states without changing the approved layout hierarchy.

## Testing

- Unit test routing and locked hero copy.
- Browser checks for desktop, tablet, and mobile layout with no horizontal overflow.
- Keyboard focus and reduced-motion checks.
- Generate full-page desktop, tablet, and mobile screenshots and inspect them visually.
- Run the production build and the complete existing Studio regression suite.

## Deferred integration

- Production homepage replacement
- Production authentication and sign-in routing
- Current gallery-preview system
- Analytics
- Remote media and final supplied hero samples
- Production Studio route integration
