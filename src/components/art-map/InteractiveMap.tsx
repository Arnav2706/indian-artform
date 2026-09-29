"use client";

import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import type { ArtLocation } from "@/types/art";
import "leaflet/dist/leaflet.css";

function FlyToSelection({ selected }: { selected: ArtLocation | null }) {
  const map = useMap();
  useEffect(() => {
    if (selected) map.flyTo([selected.latitude, selected.longitude], 7, { duration: 1.4 });
  }, [map, selected]);
  return null;
}

function markerIcon(location: ArtLocation, selected: boolean) {
  const category = location.categories.includes("Tribal Art") ? "tribal" : location.categories.includes("Folk Art") ? "folk" : location.categories.includes("Architecture") ? "architecture" : "painting";
  return L.divIcon({
    className: "art-marker-shell",
    html: `<span class="art-marker art-marker--${category}${selected ? " is-selected" : ""}"><span></span></span>`,
    iconSize: [42, 48],
    iconAnchor: [21, 44],
    popupAnchor: [0, -42],
  });
}

interface InteractiveMapProps {
  locations: ArtLocation[];
  selected: ArtLocation | null;
  onSelect: (location: ArtLocation) => void;
}

export default function InteractiveMap({ locations, selected, onSelect }: InteractiveMapProps) {
  return (
    <MapContainer center={[22.5, 79]} zoom={5} minZoom={4} maxBounds={[[5, 61], [38, 98]]} className="h-full w-full" scrollWheelZoom>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyToSelection selected={selected} />
      {locations.map((location) => (
        <Marker key={location.id} position={[location.latitude, location.longitude]} icon={markerIcon(location, selected?.id === location.id)} eventHandlers={{ click: () => onSelect(location) }}>
          <Popup className="art-popup">
            <div className="min-w-48">
              <p className="font-display text-lg text-foreground">{location.name}</p>
              <p className="mt-0.5 text-xs uppercase text-muted-foreground">{location.state}</p>
              <p className="mt-2 text-sm text-foreground">{location.artForm}</p>
              <div className="mt-3 flex gap-3">
                <button type="button" className="text-sm font-semibold text-primary underline-offset-4 hover:underline" onClick={() => onSelect(location)}>Select</button>
                <Link to="/art/$artId" params={{ artId: location.id }} className="text-sm font-semibold text-primary underline-offset-4 hover:underline">Full Story →</Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
