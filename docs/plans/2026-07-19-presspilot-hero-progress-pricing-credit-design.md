# PressPilot hero progress and credit pricing design

## Confirmed product contracts

### Hero-image generation

- Step 1 collects the business brief and does not start image generation.
- Continuing from Step 1 starts the existing production hero-image job and opens Step 2.
- Step 2 immediately shows the existing PressPilot background image plus the existing generation progress.
- The layout and typography choices remain usable while generation runs; generation does not create another step or block the user.
- When the hero image is ready, it replaces the PressPilot background in the same preview area.
- The prototype may simulate progress for review, but the coding-agent handoff must connect the UI to the current production job, progress events, and PressPilot background asset.

### Launch pricing

- Pricing uses a credit model: one credit builds one complete website.
- Credits never expire and there is no subscription.
- Four packs are visible so the long-term product model is clear.
- Single Site ($29.99, one credit) is the only available launch purchase and has the only active buy control.
- Freelancer ($74.99), Agency ($199.99), and Studio ($449.99) remain fully described but show an explicit Coming soon state with disabled purchase controls.
- Agency retains its Most popular badge even while unavailable.

## Visual treatment

Step 2 receives a compact generation rail between the page introduction and the layout atlas. It communicates progress without taking attention away from choosing a layout. During generation, the image region inside each layout miniature uses a branded PressPilot placeholder treatment; when ready, the existing completed hero treatment replaces it in place.

Pricing uses a four-card atlas. The live Single Site card has the clearest contrast and active emerald action. Upcoming packs remain legible but quieter, with visible Coming soon labels and unmistakably disabled actions. The FAQ and closing call to action use the supplied pricing copy.

## Accessibility and responsiveness

- Generation status uses `role="status"`, `aria-live="polite"`, and a semantic progress element.
- Disabled packs use native disabled buttons; no hidden or clickable disabled links.
- All active actions retain a minimum 44px target.
- Desktop shows four pricing tiers in one scan; narrower widths collapse to two and then one column.
- RTL direction and reduced-motion behavior remain supported.
