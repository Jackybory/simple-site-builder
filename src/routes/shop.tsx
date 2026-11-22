import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, formatPrice, type Listing } from "@/lib/listings";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { item?: string } => ({
    item: typeof search.item === "string" ? search.item : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Shop Memorabilia — ${site.name}` },
      { name: "description", content: "Browse authenticated signed baseballs, framed jerseys, graded cards and more." },
      { property: "og:title", content: `Shop Memorabilia — ${site.name}` },
      { property: "og:description", content: "Browse authenticated signed baseballs, framed jerseys, graded cards and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shop,
});

const sports: Array<"All" | Listing["sport"]> = ["All", "Baseball", "Basketball", "Football"];
const categories = ["All", ...Array.from(new Set(listings.map((item) => item.category)))];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

const fieldClass =
  "w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring";

function Shop() {
  const { item: selectedId } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState<(typeof sports)[number]>("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");

  const selected = listings.find((l) => l.id === selectedId) ?? null;

  const shown = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = listings.filter((l) => {
      const matchesSport = sport === "All" || l.sport === sport;
      const matchesCategory = category === "All" || l.category === category;
      const matchesSearch =
        query.length === 0 ||
        [l.title, l.detail, l.description, l.category].some((t) => t.toLowerCase().includes(query));
      return matchesSport && matchesCategory && matchesSearch;
    });
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [search, sport, category, sort]);

  const hasFilters = search.trim().length > 0 || sport !== "All" || category !== "All" || sort !== "featured";

  const clearFilters = () => {
    setSearch("");
    setSport("All");
    setCategory("All");
    setSort("featured");
  };

  const closeDetail = () => navigate({ search: {} });

  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
      <p className="eyebrow">The shop</p>
      <h1 className="mt-3 text-4xl font-extrabold sm:text-6xl md:text-7xl">Every item, authenticated.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Hand-checked pieces from collectors across the country. Browse, view the full details, and enquire about anything you like.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Search the collection</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category or keyword"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Sort by</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className={fieldClass}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by sport">
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

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              category === c
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
          Showing {shown.length} of {listings.length} items
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border border-border px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary/10"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {shown.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((l) => (
            <ListingCard key={l.id} item={l} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border-2 border-border bg-card p-10 text-center">
          <h2 className="text-3xl font-bold">No items match your filters</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Try a different search term, category, or sport.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:opacity-90"
          >
            Clear filters
          </button>
        </div>
      )}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="listing-detail-title"
          onClick={closeDetail}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-t-xl border border-border bg-card sm:rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <img src={selected.image} alt={selected.title} className="aspect-square w-full object-cover" />
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">
                      {selected.sport} · {selected.category}
                    </p>
                    <h2 id="listing-detail-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">
                      {selected.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeDetail}
                    className="rounded-full border border-border px-3 py-1 text-sm font-bold hover:bg-muted"
                    aria-label="Close item details"
                  >
                    Close
                  </button>
                </div>

                <p className="mt-4 text-lg text-muted-foreground">{selected.description}</p>
                <p className="mt-6 font-display text-4xl font-extrabold">{formatPrice(selected.price)}</p>

                <dl className="mt-6 space-y-3 text-sm">
                  {(
                    [
                      ["Reference", selected.reference],
                      ["Condition", selected.condition],
                      ["Authentication", selected.authentication],
                      ["Provenance", selected.provenance],
                      ["Shipping", selected.shipping],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label}>
                      <dt className="font-bold uppercase tracking-wide text-muted-foreground">{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={`/contact?subject=${encodeURIComponent(`${selected.title} (${selected.reference})`)}`}
                  className="mt-8 block rounded-md bg-primary px-6 py-3 text-center text-base font-bold uppercase tracking-wide text-primary-foreground hover:opacity-90"
                >
                  Enquire about this item
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
