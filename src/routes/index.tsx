import { createFileRoute } from "@tanstack/react-router";
import { MuseumHome } from "@/components/art-map/MuseumHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interactive Indian Art Map — Explore India Through Art" },
      { name: "description", content: "Explore eight important destinations in Indian art history through an interactive map, from Ajanta murals to living folk traditions." },
      { property: "og:title", content: "Interactive Indian Art Map" },
      { property: "og:description", content: "Journey through India’s art, heritage and culture on an interactive museum map." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MuseumHome,
});
