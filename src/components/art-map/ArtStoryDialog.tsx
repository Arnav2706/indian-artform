import { Landmark, Lightbulb, Palette } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { ArtLocation } from "@/types/art";

export function ArtStoryDialog({ location, onClose }: { location: ArtLocation | null; onClose: () => void }) {
  return <Dialog open={Boolean(location)} onOpenChange={(open) => { if (!open) onClose(); }}>
    {location && <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto border-gold/30 bg-background p-0">
      <div className="relative aspect-[16/7] overflow-hidden"><img src={location.image} alt={location.imageAlt} width={1200} height={800} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-linear-to-t from-foreground/85 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-background sm:p-10"><p className="text-xs font-bold uppercase text-gold">{location.state} · {location.period}</p><DialogTitle className="mt-2 font-display text-4xl sm:text-5xl">{location.name}</DialogTitle><DialogDescription className="mt-2 text-background/75">{location.artForm}</DialogDescription></div></div>
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_.9fr]">
        <div><p className="section-kicker">THE FULL STORY</p><p className="mt-4 leading-7 text-muted-foreground">{location.description}</p><h3 className="mt-7 flex items-center gap-2 font-display text-2xl"><Landmark className="h-5 w-5 text-primary" /> Historical context</h3><p className="mt-3 leading-7 text-muted-foreground">{location.historicalSignificance}</p><h3 className="mt-7 font-display text-2xl">Cultural significance</h3><p className="mt-3 leading-7 text-muted-foreground">{location.culturalSignificance}</p></div>
        <div className="space-y-6"><div className="rounded-md bg-muted p-6"><h3 className="flex items-center gap-2 text-sm font-bold uppercase text-primary"><Palette className="h-4 w-4" /> Artistic characteristics</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{location.keyFeatures.map((feature) => <li key={feature} className="flex gap-2"><span className="text-gold">◆</span>{feature}</li>)}</ul></div><div className="border-l-2 border-gold pl-5"><p className="text-xs font-bold uppercase text-primary">Famous examples</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{location.famousExamples.join(" · ")}</p></div><div className="rounded-md border border-gold/35 bg-gold/10 p-5"><Lightbulb className="h-5 w-5 text-primary" /><p className="mt-3 text-sm leading-6 text-foreground"><strong>Did you know?</strong> {location.interestingFact}</p></div></div>
      </div>
    </DialogContent>}
  </Dialog>;
}
