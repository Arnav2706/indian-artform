import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Landmark, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { artLocations } from "@/data/artLocations";

export const Route = createFileRoute("/story/$locationId")({
  loader: ({ params }) => {
    const location = artLocations.find((l) => l.id === params.locationId);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData: location }) => ({
    meta: [
      { title: \`\${location.name} - Indian Art Story\` },
      { name: "description", content: location.shortDescription },
      { property: "og:title", content: location.name },
      { property: "og:description", content: location.shortDescription },
      { property: "og:image", content: location.image },
    ],
  }),
  component: StoryComponent,
});

function StoryComponent() {
  const location = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background pb-20">
      <header className="fixed inset-x-0 top-0 z-[1100] border-b border-background/15 bg-foreground/90 text-background backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60">
              <span className="text-lg text-gold">✦</span>
            </span>
            <span className="font-display text-lg">Indian Art Map</span>
          </Link>
          <Button asChild variant="ghost" className="text-background hover:bg-background/10 hover:text-gold">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Map
            </Link>
          </Button>
        </div>
      </header>

      <div className="pt-18">
        <div className="relative aspect-[21/9] min-h-[400px] w-full overflow-hidden">
          <img
            src={location.image}
            alt={location.imageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl p-7 text-background sm:p-10">
            <p className="text-sm font-bold uppercase tracking-wider text-gold">
              {location.state} • {location.period}
            </p>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl">
              {location.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-background/80">
              {location.artForm}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-10">
              <section>
                <p className="section-kicker">THE FULL STORY</p>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {location.description}
                </p>
              </section>

              <section>
                <h3 className="flex items-center gap-3 font-display text-3xl">
                  <Landmark className="h-6 w-6 text-primary" />
                  Historical Context
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {location.historicalSignificance}
                </p>
              </section>

              <section>
                <h3 className="font-display text-3xl">Cultural Significance</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {location.culturalSignificance}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl bg-muted p-8 shadow-sm">
                <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-primary">
                  <Palette className="h-5 w-5" />
                  Artistic Characteristics
                </h3>
                <ul className="mt-6 space-y-4">
                  {location.keyFeatures.map((feature) => (
                    <li key={feature} className="flex gap-3 text-muted-foreground">
                      <span className="text-gold mt-1">◆</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-4 border-gold pl-6 py-2">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Famous Examples
                </p>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  {location.famousExamples.join(" • ")}
                </p>
              </div>

              <div className="rounded-xl border border-gold/30 bg-gold/5 p-8">
                <div className="flex items-center gap-3 text-primary">
                  <Lightbulb className="h-6 w-6" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Did you know?
                  </span>
                </div>
                <p className="mt-4 text-lg italic leading-relaxed text-foreground/90">
                  {location.interestingFact}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-border pt-12 text-center">
            <Button asChild size="lg" variant="gold">
              <Link to="/">
                Explore More Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
