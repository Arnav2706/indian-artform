export type ArtCategory = "Painting" | "Architecture" | "Sculpture" | "Folk Art" | "Tribal Art";

export interface ArtLocation {
  id: string;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
  artForm: string;
  categories: ArtCategory[];
  period: string;
  shortDescription: string;
  description: string;
  historicalSignificance: string;
  culturalSignificance: string;
  keyFeatures: string[];
  famousExamples: string[];
  interestingFact: string;
  image: string;
  imageAlt: string;
}
