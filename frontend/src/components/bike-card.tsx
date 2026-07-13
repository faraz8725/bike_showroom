import { Link } from "@tanstack/react-router";
import { Gauge, MapPin } from "lucide-react";
import type { Bike } from "@/lib/bikes";
import { formatPrice, imageUrl } from "@/lib/bikes";

export function BikeCard({ bike }: { bike: Bike }) {
  const cover = bike.images[0];
  return (
    <Link
      to="/bikes/$id"
      params={{ id: bike.id }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-flame"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {cover ? (
          <img
            src={imageUrl(cover)}
            alt={`${bike.brand} ${bike.model}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">No photo</div>
        )}
        {bike.sold && (
          <span className="absolute left-3 top-3 rounded-md bg-destructive px-2 py-1 text-xs font-bold uppercase tracking-wider text-destructive-foreground">
            Sold
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-semibold backdrop-blur">
          {bike.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl uppercase tracking-wide">
            {bike.brand} {bike.model}
          </h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {bike.plate_number}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" /> {bike.km_driven.toLocaleString()} km
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {bike.location}
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-2">
          <span className="text-2xl font-bold text-gradient-flame">{formatPrice(Number(bike.price))}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">View →</span>
        </div>
      </div>
    </Link>
  );
}
