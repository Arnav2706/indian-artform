# Dedicated Art Story Pages

## Goal
Replace the oversized “View Full Story” popup with a dedicated, readable page for each of the eight art destinations.

## What will change
- Add one reusable destination page that loads the selected artwork from the existing shared destination data.
- Change “View Full Story” to open that destination’s page instead of a popup.
- Add clear back navigation to the interactive map and links between the eight destinations.
- Keep the map selection experience on the home page unchanged.
- Remove the no-longer-needed story popup code.

## Page design
- A compact image-led introduction with the destination name, state, art form, and period.
- Comfortable single-page reading sections for history, cultural significance, artistic characteristics, examples, and the featured fact.
- Restrained motion and readable line lengths without requiring browser zoom changes.
- Responsive layout for laptop, tablet, and mobile screens.

## Technical details
- Add a dynamic `/art/$artId` page using the IDs already stored in `src/data/artLocations.ts`.
- Use typed TanStack links for navigation.
- Add destination-specific page titles and social descriptions.
- Show a proper not-found state for invalid destination links.

## Verification
- Open all eight destination pages and confirm their content and images match the map data.
- Test navigation from the map and destination cards.
- Check laptop views at 80% and 100%, plus tablet and mobile widths, for overflow, clipping, and unreadable sizing.
- Confirm the preview builds without errors.
