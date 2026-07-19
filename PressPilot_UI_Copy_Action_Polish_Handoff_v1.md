# PressPilot Landing Page Copy, Actions & Interface Polish
## Coding Agent Handoff — Version 1

**Scope:** Review and replace the public landing-page copy, terminology, loading states, calls to action, and interaction polish so the product matches the new PressPilot positioning.

**Current state note:** The new website gallery previews are still loading in the supplied screenshot. The blank white cards are not approved visual content. Implement deliberate loading, retry, and fallback states rather than styling around the temporary blank cards.

---

## 1. Locked product persona

PressPilot is an install-ready WordPress website builder.

The user gives PressPilot:

- Business name
- Business description
- Logo
- Website language

PressPilot creates:

- Website structure and pages
- Business-specific copy
- Business-relevant royalty-free images
- Brand colors derived from the logo
- Website layouts
- A complete WordPress website ZIP

The user can install the website on any WordPress host and edit it with WordPress Full Site Editing.

### Public terminology

Use:

- website
- WordPress website
- install-ready WordPress website
- complete WordPress website
- website ZIP
- editable in WordPress
- Start in Studio

Avoid:

- theme, except where technically unavoidable
- template generator
- output
- AI-generated theme
- single theme
- production-ready theme
- client-safe theme
- Build My Site
- Get Studio

---

## 2. Voice

The new voice should be:

- Direct
- Human
- Specific
- Confident without absolute claims
- Clear to non-technical business owners
- Credible to agencies and WordPress professionals

Do not use generic AI-SaaS language, exaggerated certainty, or developer-heavy explanations in primary marketing copy.

### Claims to soften

Replace absolute claims such as:

- “Zero Editor Errors”
- “No broken blocks”
- “Generated in under 30 seconds”

With accurate, defensible language such as:

- “Built to avoid editor errors”
- “Validated WordPress block structure”
- “Ready in minutes”

Only restore an exact speed claim if it has been measured and approved.

---

## 3. Global copy replacements

- `theme` → `website` or `WordPress website`
- `FSE block theme` → `install-ready WordPress website` in primary copy
- `FSE` → `WordPress Full Site Editing` on first technical mention
- `Build My Site` → `Start in Studio`
- `Get Studio` → `Start in Studio`
- `Generated` → `Built`, `Created`, or `Ready`, depending on context
- `Output` → `Website`, `Preview`, or `Download`
- `Documentation` → `Help` in the main navigation
- `Single Theme` → `Complete WordPress Website`
- `Premium DALL-E hero image` → `Business-specific royalty-free images`

---

## 4. Header navigation

### Replace the current navigation with

- How it works
- Website examples
- Pricing
- Help
- Sign in
- Start in Studio

### Behavior

- `How it works` scrolls to the process section
- `Website examples` scrolls to the gallery
- `Pricing` scrolls to pricing
- `Help` opens the customer-facing help area, not developer documentation
- `Start in Studio` is the primary action

Keep the header compact and readable. Use the official PressPilot logo only.

---

## 5. Metadata and SEO copy

### Page title

**PressPilot — Install-Ready WordPress Websites Built Around Your Brand**

### Meta description

**Tell PressPilot about your business, upload your logo, and choose a language. Receive a complete WordPress website with copy, images, and brand styling for $29.99 once—no subscription.**

### Structured-data application description

**PressPilot builds complete, install-ready WordPress websites from a business brief, logo, and language choice. Copy, images, brand styling, and editable WordPress pages are included.**

### Application category

Use `BusinessApplication` unless a more accurate approved category already exists.

---

## 6. Hero section — exact final copy

### Trust strip

**Install-ready · Editable in WordPress · 7 languages**

### Headline

**Your business, turned into a complete WordPress website.**

Recommended green emphasis:

**WordPress website**

### Supporting copy

**Tell PressPilot about the business, upload the logo, and choose a language. PressPilot creates the pages, copy, images, and brand styling—then delivers an install-ready WordPress website you can edit and own.**

### Value line

**Ready in minutes · $29.99 once · No subscription**

### Primary CTA

**Start in Studio**

### Secondary CTA

**See how it works**

### Reassurance line

**Works with any WordPress host. Arabic included with full RTL support.**

### Remove

- AI-Generated
- FSE-Validated
- Client-Safe
- Build My Site
- Generated in under 30 seconds
- Narrow copy aimed only at agencies and WordPress professionals

---

## 7. Product demo section

### Eyebrow

**Product demo**

### Heading

**Watch PressPilot build a website**

### Supporting copy

**See the path from a short business brief to a complete WordPress website.**

### Play action

**Play product demo**

### Interaction polish

- Use the real Studio preview as the video poster
- Show a visible play state and keyboard focus state
- On hover, enlarge the play button very slightly and brighten the border
- Open the demo in a modal or inline expanded player
- Do not autoplay audio
- Respect reduced-motion settings
- Use one controlled push-in toward the website preview, not simultaneous movement across every layer

---

## 8. Website gallery

### Eyebrow

**Website examples**

### Heading

**See what PressPilot builds**

### Supporting copy

**Explore website directions across industries, languages, and brand styles—all created in PressPilot.**

### Filter labels

- Industry
- Language
- Style

### Default options

- All industries
- All languages
- All styles

### Card actions

Primary:

**Open preview**

Secondary, only when useful:

**View details**

Do not use tiny unlabeled icon actions as the only controls.

### Gallery note

**Preview websites are demonstration examples created to show PressPilot’s range of layouts, industries, and languages.**

---

## 9. Gallery loading, empty, and error states

The current blank white preview cards are temporary loading states and must be replaced.

### Loading state

Use a dark preview skeleton matching the final card ratio.

Visible text:

**Loading website preview…**

After a longer delay:

**This preview is taking longer than expected.**

Action:

**Open in a new tab**

### Error state

Heading:

**Preview unavailable right now**

Supporting copy:

**The website preview could not be loaded. Try again or open it in a new tab.**

Actions:

- Try again
- Open in a new tab

### Empty filter state

Heading:

**No matching websites yet**

Supporting copy:

**Try another industry, language, or style.**

Action:

**Clear filters**

### Loading polish

- Never flash a large white rectangle on the dark page
- Preserve the final preview aspect ratio
- Use a restrained shimmer or progress line
- Fade the real preview in only after it is ready
- Keep card labels and actions stable while the preview loads
- Lazy-load offscreen cards
- Pause animated previews when offscreen

---

## 10. Feature section — exact replacement copy

### Eyebrow

**What PressPilot handles**

### Heading

**Everything needed before you install**

### Supporting copy

**PressPilot handles the website structure, branding, copy, images, and WordPress-ready packaging—so you can move from business brief to complete website without assembling it by hand.**

### Card 1

**Built for the WordPress editor**

Validated block structures help keep navigation, templates, and sections working as expected in the WordPress Site Editor.

### Card 2

**Full Site Editing built in**

Headers, footers, templates, and page sections remain editable with WordPress Full Site Editing.

### Card 3

**WooCommerce-ready layouts**

When a project needs a store, PressPilot prepares shop, product, cart, and checkout layouts for WooCommerce.

### Card 4

**Layouts matched to the business**

PressPilot chooses structures for restaurants, services, portfolios, stores, and more—not one generic layout for every business.

### Card 5

**Download and install**

Receive a clean website ZIP ready to upload to your WordPress host. No separate builder account is required.

### Card 6

**Colors pulled from your logo**

Upload the logo and PressPilot builds a coordinated website palette from its brand colors.

### Card 7

**Copy and images included**

PressPilot creates business-specific page copy and royalty-free images you can keep and edit.

### Card 8

**Multiple hero directions**

Review full-bleed, split, centered, and minimal hero layouts before choosing the website direction.

### Interaction polish

- Use a subtle border lift and soft emerald highlight on hover
- Do not make every card glow continuously
- Allow the feature title to sharpen or brighten on hover
- Keep body copy stationary
- Maintain strong contrast and visible keyboard focus

---

## 11. Five-step process accordion — exact replacement copy

### Heading

**From business brief to WordPress website—in 5 steps**

### Step 1

**Tell us about the business**

Add the business name and a short description. PressPilot uses them to plan the website.

### Step 2

**Choose the website direction**

Select the business type and website language. Arabic websites use a complete RTL layout.

### Step 3

**Add the brand**

Upload the logo. PressPilot extracts its colors and applies them across the website.

### Step 4

**Review the website**

Compare layouts, preview the pages, and adjust the direction before downloading.

### Step 5

**Download and install**

Download the complete website ZIP and upload it to any WordPress host.

### Accordion polish

- Keep one step active
- Animate only the active panel
- Do not animate every image at once
- Use clear progress feedback
- Preserve keyboard navigation
- Keep all step descriptions visible on mobile
- Do not use “blank canvas,” “brand DNA,” or “production-ready theme” in the public copy

---

## 12. Replace the duplicate lower process section

The page currently tells the process twice: once in the five-step accordion and again in a separate three-step section.

Do not keep two competing process explanations.

Repurpose the lower three-card section as:

### Heading

**What you receive**

### Supporting copy

**A complete WordPress website package built for your business and ready to install.**

### Card 1

**Complete website structure**

Pages, header, footer, navigation, and WordPress templates are included.

### Card 2

**Business-specific content**

PressPilot creates the copy and royalty-free images around the business brief.

### Card 3

**Install-ready download**

Receive one clean WordPress ZIP that stays editable in the Site Editor.

---

## 13. Pricing section — exact final copy

### Heading

**One website. One clear price.**

### Supporting copy

**Pay once. No subscription. Download the website when it is ready.**

### Card title

**Complete WordPress Website**

### Price

**$29.99 once**

### Included list

- Install-ready WordPress website ZIP
- Pages, header, footer, and website templates
- Business-specific copy and royalty-free images
- Brand colors extracted from your logo
- Multiple website layout options
- Editable with WordPress Full Site Editing
- 7-day download access

### Primary CTA

**Start in Studio**

### Reassurance

**Works with any WordPress host.**

### Remove

- Single Theme
- Complete FSE theme ZIP file
- Premium DALL-E hero image
- Build My Site

---

## 14. Final CTA section — exact final copy

### Heading

**Bring the business. PressPilot will build the website.**

### Supporting copy

**$29.99 once. No subscription. 7 languages, including Arabic with full RTL support.**

### CTA

**Start in Studio**

### Supporting URL

**presspilotapp.com/studio**

### Interaction polish

- Let the CTA appear after the supporting line, not before it
- Use a restrained emerald halo behind the CTA group
- Shift the arrow slightly on hover
- Use a subtle pressed state on click
- Do not animate the headline, background, and button simultaneously

---

## 15. Footer

Recommended navigation:

- How it works
- Website examples
- Pricing
- Help
- Contact
- Privacy
- Terms

Use the official logo.

Do not place essential CTA, price, or product proof only in the footer.

---

## 16. FAQ and structured-data replacement copy

### What do I get?

A complete install-ready WordPress website ZIP with pages, navigation, header, footer, templates, business-specific copy, and royalty-free images.

### Is this a subscription?

No. PressPilot costs $29.99 for one website. There is no recurring subscription.

### Do I need to know how to code?

No. Tell PressPilot about the business, upload the logo, and choose a language. PressPilot builds the website.

### Can I edit the website afterward?

Yes. The website remains editable with WordPress Full Site Editing.

### Will it work with my WordPress host?

Yes. You can upload the website ZIP to any standard WordPress host.

### Which languages are supported?

English, French, Spanish, German, BR-Portuguese, Italian, and Arabic. Arabic websites use a complete RTL layout.

### Are the images mine to use?

The images included with the website are royalty-free and can be used with the website.

---

## 17. Page-wide interaction polish

### Hero

- Animate the green headline emphasis once on entry
- Add a subtle arrow shift to the primary CTA
- Keep the background slow and independent of the text
- Provide reduced-motion fallback

### Demo

- Controlled play-button response
- Modal or inline expansion
- One slow preview push-in

### Gallery

- Filter chips have a clear selected state
- Cards lift 2–4 px on hover
- Border becomes slightly brighter
- A visible “Open preview” action appears
- Loading skeletons match the final cards
- Do not autoplay every live preview

### Feature cards

- Subtle pointer-following highlight is optional
- No constant animated glow
- Keyboard focus must match hover visibility

### Process

- One active step at a time
- Progress updates as the step changes
- Mobile stack remains readable without hover

### Pricing

- Keep the price and CTA visually grouped
- Use one accent line, not multiple glowing borders
- CTA arrow shifts slightly on hover

### Final CTA

- Use the Calm Brand Pulse background scenario
- Keep the center readable
- Do not let fog or bloom cross the CTA text

---

## 18. Background mapping

Use the separate PressPilot Background System handoff.

- Hero → Creation Portal
- Five-step process → Intelligence Flow
- Gallery → Generative Landscape
- Pricing and final CTA → Calm Brand Pulse

The current cyan radial gradient and temporary green ribbon are placeholders. Do not spend time polishing them as final assets.

---

## 19. Implementation order for the coding agent

1. Audit all current public copy and locate every occurrence of “theme.”
2. Replace metadata and structured data.
3. Update header, hero, and primary CTA language.
4. Implement gallery loading, empty, and error states.
5. Replace feature-card copy.
6. Replace five-step process copy.
7. Repurpose the duplicate lower process section.
8. Replace pricing copy.
9. Replace final CTA and footer language.
10. Add restrained interaction polish.
11. Integrate the approved background assets after the visual masters are delivered.
12. Test desktop, tablet, mobile, keyboard, reduced motion, and Arabic/RTL.

Do not rewrite app business logic, generation logic, payments, or data loading while performing the copy pass.

---

## 20. Quality gate

Do not consider the copy and polish pass complete until:

- “Theme” is removed from primary public-facing copy
- The page clearly says PressPilot builds a complete WordPress website
- The main CTA is consistently “Start in Studio”
- The price is consistently $29.99 once
- “No subscription” appears near conversion actions
- The 7 supported languages are stated accurately
- Arabic RTL is stated accurately
- Gallery loading does not show white blank cards
- Every loading state has a retry or fallback path
- Copy is readable on mobile
- All actions have hover, focus, pressed, and disabled states
- Reduced-motion behavior is implemented
- No absolute speed or zero-error claim remains unless verified
- The old duplicate process story has been removed or repurposed
- The final CTA uses the new PressPilot language
