import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, FileText, Gauge, MapPin, ShieldCheck, User, XCircle } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { fetchBike, formatPrice, imageUrl } from "@/lib/bikes";

export function BikeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { data: bike, isLoading } = useQuery({
    queryKey: ["bike", id],
    queryFn: () => fetchBike(id),
  });

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <div className="mx-auto max-w-6xl p-8">
          <div className="h-96 animate-pulse rounded-xl bg-card" />
        </div>
      </>
    );
  }

  if (!bike) {
    return (
      <>
        <SiteHeader />
        <div className="mx-auto max-w-6xl p-8 text-center">
          <p className="font-display text-3xl uppercase">Bike not found</p>
          <Link to="/" className="mt-4 inline-block text-primary underline">
            Back to inventory
          </Link>
        </div>
      </>
    );
  }

  const cover = bike.images[active] ?? bike.images[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card">
              {cover ? (
                <img src={imageUrl(cover)} alt={`${bike.brand} ${bike.model}`} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-muted-foreground">No photo</div>
              )}

              {bike.sold && (
                <span className="absolute left-4 top-4 rounded-md bg-destructive px-3 py-1 text-sm font-bold uppercase text-destructive-foreground">
                  Sold
                </span>
              )}
            </div>

            {bike.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {bike.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActive(i)}
                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                      i === active ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={imageUrl(img)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {bike.year} • {bike.plate_number}
              </p>
              <h1 className="mt-2 font-display text-4xl uppercase leading-tight sm:text-5xl">
                {bike.brand} {bike.model}
              </h1>
              <p className="mt-4 text-4xl font-bold text-gradient-flame">{formatPrice(Number(bike.price))}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Stat icon={Gauge} label="Kilometers" value={`${bike.km_driven.toLocaleString()} km`} />
              <Stat icon={MapPin} label="Location" value={bike.location} />
              <Stat icon={User} label="Owner" value={`${bike.owner_number}${ordinal(bike.owner_number)}`} />
              <Stat icon={ShieldCheck} label="Condition" value={bike.condition} />
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-display text-lg uppercase tracking-wide">
                <FileText className="h-4 w-4 text-primary" /> Papers & Compliance
              </h3>

              <dl className="space-y-2 text-sm">
                <Row label="Registration Number" value={<span className="font-mono">{bike.plate_number}</span>} />
                <Row label="Papers Status" value={bike.papers_status} />
                <Row
                  label="Chalaan"
                  value={
                    bike.chalaan_cleared ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" /> Cleared
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-destructive">
                        <XCircle className="h-4 w-4" /> Pending
                      </span>
                    )
                  }
                />
              </dl>
            </div>

            {bike.description && (
              <div>
                <h3 className="mb-2 font-display text-lg uppercase tracking-wide">Description</h3>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{bike.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-1 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

