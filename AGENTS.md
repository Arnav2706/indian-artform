<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->


## Project architecture
- Keep all destination content in `src/data/artLocations.ts`; map, cards, search, panels, and dialogs must render from this source to prevent factual drift.
- Keep Leaflet in the client-only map component; the page loads it lazily to preserve server rendering.
- Render long-form destination stories through `/art/$artId` pages instead of overlays so they remain readable at normal browser zoom.
