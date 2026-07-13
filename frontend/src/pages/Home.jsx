import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ShieldCheck, Sparkles, Wrench } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { BikeCard } from "@/components/bike-card";
import { fetchBikes } from "@/lib/bikes";
import heroBike from "@/assets/hero-bike.jpg";

export function Home() {
  const { data: bikes, isLoading } = useQuery({
    queryKey: ["bikes"],
    queryFn: fetchBikes,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroBike}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.16 0.01 60 / 0.4) 0%, oklch(0.12 0.01 60 / 0.95) 90%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-36">
          <p className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Certified Pre-Owned
          </p>
          <h1 className="font-display text-5xl leading-none sm:text-7xl md:text-8xl">
            RIDE THE <span className="text-gradient-flame">LEGEND</span>
            <br /> AGAIN.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Handpicked used motorcycles with verified papers, transparent plate details and cleared chalaans. What you see is what you ride home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-flame px-6 py-3 font-semibold uppercase tracking-wide text-flame-foreground shadow-flame transition-transform hover:scale-[1.02]"
            >
              Browse Inventory <ChevronDown className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Verified Papers", desc: "RC, insurance & PUC on file" },
              { icon: Sparkles, title: "Chalaan Cleared", desc: "Zero pending challans" },
              { icon: Wrench, title: "Workshop Checked", desc: "Full mechanical inspection" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur">
                <f.icon className="h-6 w-6 text-primary" />
                <p className="mt-3 font-display text-lg uppercase tracking-wide">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory */}
      <section id="inventory" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Inventory</p>
            <h2 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">Available Bikes</h2>
          </div>
          <p className="text-sm text-muted-foreground">{bikes ? `${bikes.length} listed` : ""}</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-xl bg-card" />
            ))}
          </div>
        ) : bikes && bikes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bikes.map((b) => (
              <BikeCard key={b.id} bike={b} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card/40 p-12 text-center">
            <p className="font-display text-2xl uppercase">Garage is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              No bikes listed yet. Check back soon — new inventory drops weekly.
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Ironforge Motors. All rides reserved.
        </div>
      </footer>
    </div>
  );
}

