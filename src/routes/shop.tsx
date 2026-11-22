import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, sports } from "@/lib/listings";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: `Shop Memorabilia — ${site.name}` },
      { name: "description", content: "Browse authenticated signed baseballs, framed jerseys, graded cards and Premier League kit." },
      { property: "og:title", content: `Shop Memorabilia — ${site.name}` },
      { property: "og:description", content: "Browse authenticated signed baseballs, framed jerseys, graded cards and Premier League kit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [sport, setSport] = useState<(typeof sports)[number]>("All");
  const shown = sport === "All" ? listings : listings.filter((l) => l.sport === sport);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
      <p className="eyebrow">The shop</p>
      <h1 className="mt-3 text-6xl font-extrabold md:text-7xl">Every item, authenticated.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Hand-checked pieces from collectors across the country. See something you like? Ask us about it.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by sport">
        {sports.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSport(s)}
            aria-pressed={sport === s}
            className={cn(
              "rounded-full border-2 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider transition-colors",
              sport === s
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-foreground/40",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
