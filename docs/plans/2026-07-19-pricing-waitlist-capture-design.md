# Pricing waitlist capture design

## Approved outcome

The three unavailable credit packs stay visibly Coming soon, but their inert disabled controls become useful `Notify me` actions. Each action opens a compact, tier-specific email capture inside its own card. The user can join the Freelancer, Agency, or Studio waitlist without leaving Pricing, and submission is acknowledged in place.

Single Site remains the dominant card and the only purchase path. A quiet line beneath `Get 1 credit` reads `Secure checkout · Refund policy` to add reassurance at the moment of action without competing with the button.

## Interaction choice

Three approaches were considered:

1. **Inline progressive disclosure — selected.** `Notify me` expands the relevant card into an email field and `Join waitlist` action. It preserves the relationship between pack and intent, works well on mobile, and avoids interrupting comparison.
2. Modal capture. More visually prominent, but separates the form from the selected tier and adds focus-management overhead for a one-field action.
3. Permanently visible fields. Fastest to scan, but makes three-quarters of the pricing grid look like a lead-generation form and weakens Single Site checkout dominance.

The inline form is the smallest useful conversion surface. Only one form needs to be open at a time. The email input is required and uses native email validation. A prototype submission shows a tier-specific success message; production migration must send the address, selected pack, source page, and consent timestamp to the real waitlist service.

## Visual and accessibility contract

- Coming soon badges remain visible on all three packs.
- `Notify me` is an active secondary action, never styled like the emerald purchase action.
- Expanded forms use a visible email label, 44px-or-larger controls, native email input semantics, and a concise privacy note.
- The success state uses `role="status"` and confirms the exact tier.
- Agency retains `Most popular`, while Single Site continues to win through its green border, available-now badge, and solid emerald checkout action.
- Mobile expansion remains inside the selected card with no horizontal overflow.

