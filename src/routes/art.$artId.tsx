import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Landmark, Lightbulb, MapPin, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { artLocations } from "@/data/artLocations";

export const Route = createFileRoute("/art/$artId")({
  loader: ({ params }) => {
    const location = artLocations.find((item) => item.id === params.artId);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.name} — Indian Art & Heritage`
      : "Art Destination Not Found — Interactive Indian Art Map";
    const description = loaderData?.shortDescription ?? "Explore India’s art, heritage and culture.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ArtNotFound,
  component: ArtDestinationPage,
});

function ArtDestinationPage() {
  const location = Route.useLoaderData();
  const currentIndex = artLocations.findIndex((item) => item.id === location.id);
  const previous = artLocations.at((currentIndex - 1 + artLocations.length) % artLocations.length) ?? location;
  const next = artLocations.at((currentIndex + 1) % artLocations.length) ?? location;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-[1100] border-b border-background/15 bg-foreground/95 text-background backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Indian Art Map home">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-lg text-gold">✦</span>
            <span className="truncate font-display text-lg">Indian Art Map</span>
          </Link>
          <Button asChild size="sm" variant="museumDark">
            <Link to="/" hash="map"><ArrowLeft /> Back to map</Link>
          </Button>
        </div>
      </header>

      <article>
        <section className="relative flex min-h-[34rem] items-end overflow-hidden bg-foreground pt-18 text-background sm:min-h-[40rem]">
          <img src={location.image} alt={location.imageAlt} width={1200} height={800} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/45 to-foreground/10" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
            <div className="max-w-4xl animate-hero-in">
              <p className="text-xs font-bold uppercase text-gold">{location.state} · {location.period}</p>
              <h1 className="mt-3 font-display text-5xl leading-tight sm:text-7xl">{location.name}</h1>
              <p className="mt-3 max-w-2xl text-base text-background/80 sm:text-xl">{location.artForm}</p>
              <div className="mt-6 flex flex-wrap gap-2">{location.categories.map((category) => <span key={category} className="rounded-full border border-background/25 bg-foreground/35 px-3 py-1 text-xs font-semibold uppercase backdrop-blur">{category}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(17rem,.7fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="section-kicker">THE FULL STORY</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{location.description}</p>

              <div className="mt-12 border-t border-border pt-9">
                <h2 className="flex items-center gap-3 font-display text-3xl sm:text-4xl"><Landmark className="h-6 w-6 shrink-0 text-primary" /> Historical context</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{location.historicalSignificance}</p>
              </div>

              <div className="mt-12 border-t border-border pt-9">
                <h2 className="font-display text-3xl sm:text-4xl">Cultural significance</h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{location.culturalSignificance}</p>
              </div>
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
              <section className="rounded-md bg-muted p-6 sm:p-7">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><Palette className="h-4 w-4 shrink-0" /> Artistic characteristics</h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">{location.keyFeatures.map((feature) => <li key={feature} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3"><span className="text-gold">◆</span><span>{feature}</span></li>)}</ul>
              </section>
              <section className="border-l-2 border-gold px-5 py-1">
                <h2 className="text-xs font-bold uppercase text-primary">Famous examples</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{location.famousExamples.join(" · ")}</p>
              </section>
              <section className="rounded-md border border-gold/40 bg-gold/10 p-6">
                <Lightbulb className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm leading-7"><strong>Did you know?</strong> {location.interestingFact}</p>
              </section>
            </aside>
          </div>
        </section>
      </article>

      <nav aria-label="More art destinations" className="border-y border-border bg-muted">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2">
          <Link to="/art/$artId" params={{ artId: previous.id }} className="group min-w-0 bg-muted px-5 py-8 transition-colors hover:bg-background sm:px-8">
            <span className="flex items-center gap-2 text-xs font-bold uppercase text-primary"><ArrowLeft className="h-4 w-4" /> Previous destination</span>
            <span className="mt-2 block truncate font-display text-2xl">{previous.name}</span>
          </Link>
          <Link to="/art/$artId" params={{ artId: next.id }} className="group min-w-0 bg-muted px-5 py-8 text-left transition-colors hover:bg-background sm:px-8 sm:text-right">
            <span className="flex items-center gap-2 text-xs font-bold uppercase text-primary sm:justify-end">Next destination <ArrowRight className="h-4 w-4" /></span>
            <span className="mt-2 block truncate font-display text-2xl">{next.name}</span>
          </Link>
        </div>
      </nav>

      <footer className="bg-foreground py-10 text-background">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-8">
          <div className="min-w-0"><p className="font-display text-xl">Interactive Indian Art Map</p><p className="mt-1 text-xs text-background/55">Exploring India’s artistic heritage, one region at a time.</p></div>
          <Button asChild variant="gold"><Link to="/" hash="map"><MapPin /> Explore the map</Link></Button>
        </div>
      </footer>
    </main>
  );
}

function ArtNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-5 text-center">
      <div>
        <p className="section-kicker">DESTINATION NOT FOUND</p>
        <h1 className="mt-4 font-display text-5xl">This story is not in the collection.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">Return to the interactive map to discover the eight featured art destinations.</p>
        <Button asChild variant="museum" className="mt-8"><Link to="/" hash="map"><ArrowLeft /> Back to map</Link></Button>
      </div>
    </main>
  );
}