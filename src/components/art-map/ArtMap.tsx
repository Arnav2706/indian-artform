import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Compass, MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { artCategories, artLocations } from "@/data/artLocations";
import type { ArtCategory, ArtLocation } from "@/types/art";

const InteractiveMap = lazy(() => import("./InteractiveMap"));

type Filter = "All" | ArtCategory;

export function ArtMap({ selected, onSelect }: { selected: ArtLocation | null; onSelect: (location: ArtLocation) => void }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => setMapReady(true), []);
  const visible = useMemo(() => artLocations.filter((location) => filter === "All" || location.categories.includes(filter)), [filter]);
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return artLocations.filter((location) => [location.name, location.state, location.artForm, ...location.categories].some((value) => value.toLowerCase().includes(term)));
  }, [query]);

  const choose = (location: ArtLocation) => { onSelect(location); setQuery(location.name); setSearchOpen(false); };

  return (
    <section id="map" className="scroll-mt-20 bg-foreground py-20 text-background sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="section-kicker text-gold">THE LIVING ATLAS</p>
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">Explore art across India</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-background/70">Select a marker to enter a place, period and artistic tradition. Filter the map or search by city, state and art form.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-background/65"><Compass className="h-5 w-5 text-gold" /><span>8 curated destinations</span></div>
        </div>

        <div className="mb-5 grid gap-4 xl:grid-cols-[minmax(18rem,1fr)_auto] xl:items-center">
          <div className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-foreground/55" />
            <Input aria-label="Search art, city or region" value={query} onFocus={() => setSearchOpen(true)} onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }} placeholder="Search art, city or region…" className="h-12 border-background/15 bg-background pl-11 text-foreground shadow-none placeholder:text-foreground/50" />
            {searchOpen && query && <div className="absolute top-[calc(100%+0.5rem)] z-[1001] w-full overflow-hidden rounded-md border border-border bg-background text-foreground shadow-2xl">
              {results.length ? results.map((location) => <button key={location.id} type="button" onClick={() => choose(location)} className="grid w-full grid-cols-[auto_1fr] items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-muted"><MapPin className="h-4 w-4 text-primary" /><span><strong className="block text-sm">{location.name}</strong><span className="text-xs text-muted-foreground">{location.state} · {location.artForm}</span></span></button>) : <p className="px-4 py-4 text-sm text-muted-foreground">No destinations found.</p>}
            </div>}
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filter map locations">
            {artCategories.map((category) => <Button key={category} type="button" size="sm" variant={filter === category ? "gold" : "museumDark"} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</Button>)}
          </div>
        </div>

        <div className="map-stage grid overflow-hidden rounded-lg border border-background/10 bg-background lg:grid-cols-[minmax(0,2fr)_minmax(20rem,1fr)]">
          <div className="relative h-[32rem] min-w-0 lg:h-[43rem]">
            {mapReady ? <Suspense fallback={<div className="grid h-full place-items-center bg-muted text-foreground"><span className="animate-pulse">Opening the map…</span></div>}><InteractiveMap locations={visible} selected={selected} onSelect={onSelect} /></Suspense> : <div className="grid h-full place-items-center bg-muted text-foreground"><span className="animate-pulse">Opening the map…</span></div>}
            <div className="absolute bottom-7 left-4 z-[500] hidden rounded-md border border-border bg-background/95 p-3 text-foreground shadow-lg backdrop-blur sm:block">
              <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">Art form legend</p>
              <div className="flex flex-wrap gap-3 text-xs"><span><i className="legend-dot bg-primary" /> Painting</span><span><i className="legend-dot bg-terracotta" /> Architecture</span><span><i className="legend-dot bg-saffron" /> Folk</span><span><i className="legend-dot bg-charcoal" /> Tribal</span></div>
            </div>
          </div>
          <aside className="min-w-0 bg-background text-foreground" aria-live="polite">
            {selected ? <div key={selected.id} className="animate-panel-in flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-[18rem]"><img src={selected.image} alt={selected.imageAlt} width={1200} height={800} className="h-full w-full object-cover" /><div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-foreground/65 to-transparent" /><p className="absolute bottom-5 left-6 text-xs font-bold uppercase text-background">{selected.state}</p></div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">{selected.categories.map((category) => <span key={category} className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase text-primary">{category}</span>)}</div>
                <h3 className="mt-5 font-display text-4xl">{selected.name}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{selected.artForm}</p>
                <p className="mt-1 text-xs uppercase text-muted-foreground">{selected.period}</p>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{selected.description}</p>
                <div className="mt-5 border-l-2 border-gold pl-4"><p className="text-xs font-bold uppercase text-primary">Historical significance</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{selected.historicalSignificance}</p></div>
                <div className="mt-auto pt-7"><Button asChild variant="museum" className="w-full"><Link to="/art/$artId" params={{ artId: selected.id }}><Sparkles /> View Full Story</Link></Button></div>
              </div>
            </div> : <div className="grid min-h-[28rem] h-full place-items-center p-10 text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/20 bg-muted"><MapPin className="h-6 w-6 text-primary" /></span><h3 className="mt-6 font-display text-3xl">Begin your journey</h3><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">Select a location on the map to begin your journey through Indian art.</p></div></div>}
          </aside>
        </div>
      </div>
    </section>
  );
}
