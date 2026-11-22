import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, formatPrice, getWhatsAppUrl, type Currency } from "@/lib/listings";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { item?: string } => ({
    item: typeof search.item === "string" ? search.item : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Shop Memorabilia — ${site.name}` },
      { name: "description", content: "Browse signed Premier League shirts, footballs, trading cards and more." },
      { property: "og:title", content: `Shop Memorabilia — ${site.name}` },
      { property: "og:description", content: "Browse signed Premier League shirts, footballs, trading cards and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Shop,
});

const clubs = ["All", ...Array.from(new Set(listings.map((item) => item.club)))];
const categories = ["All", ...Array.from(new Set(listings.map((item) => item.category)))];
const currencies: Currency[] = ["GBP", "USD", "EUR"];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

type SortOption = (typeof sortOptions)[number]["value"];

const fieldClass =
  "w-full rounded-xl border border-input/80 bg-card px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20";

function Shop() {
  const { item: selectedId } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [search, setSearch] = useState("");
  const [club, setClub] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [currency, setCurrency] = useState<Currency>("GBP");
  const [offerMode, setOfferMode] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");

  const selected = listings.find((l) => l.id === selectedId) ?? null;

  const shown = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = listings.filter((l) => {
      const matchesClub = club === "All" || l.club === club;
      const matchesCategory = category === "All" || l.category === category;
      const matchesSearch =
        query.length === 0 ||
        [l.title, l.detail, l.description, l.category, l.club, l.reference, l.tag ?? ""].some((t) =>
          t.toLowerCase().includes(query)
        );
      return matchesClub && matchesCategory && matchesSearch;
    });
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [search, club, category, sort]);

  const hasFilters =
    search.trim().length > 0 || club !== "All" || category !== "All" || sort !== "featured" || currency !== "GBP";

  const clearFilters = () => {
    setSearch("");
    setClub("All");
    setCategory("All");
    setSort("featured");
    setCurrency("GBP");
  };

  const closeDetail = () => {
    setOfferMode(false);
    setOfferAmount("");
    navigate({ search: {} });
  };

  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">The Vault</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Every piece, authenticated.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
            Signed and match-worn Premier League memorabilia. Browse museum-grade pieces with verified provenance.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-card p-1 shadow-sm">
          <span className="pl-3 pr-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Currency
          </span>
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold transition-all",
                currency === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Search The Locker
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by player, club, shirt or reference (e.g. Haaland, LL-2006)..."
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Sort by
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={fieldClass}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Club Filter Pills */}
      <div className="mt-6">
        <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Club
        </span>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by club">
          {clubs.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setClub(c)}
              aria-pressed={club === c}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide transition-all",
                club === c
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/80 bg-card text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "rounded-full border px-3.5 py-1 text-xs font-medium transition-colors",
              category === c
                ? "border-primary/50 bg-primary/10 text-primary font-semibold"
                : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filter Status */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground" aria-live="polite">
          Showing {shown.length} of {listings.length} authenticated items
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-primary hover:underline"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Grid */}
      {shown.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((l) => (
            <ListingCard key={l.id} item={l} currency={currency} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
          <h2 className="text-2xl font-bold">No pieces match your search</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Try adjusting your club, category, or search keywords.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-bold tracking-wider uppercase text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="listing-detail-title"
          onClick={closeDetail}
        >
          <div
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-border/80 bg-card shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square w-full bg-secondary/50">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="size-full object-cover sm:rounded-l-3xl"
                />
                {selected.tag && (
                  <span className="absolute top-4 left-4 rounded-full bg-primary/95 px-3 py-1 text-xs font-bold tracking-wide text-primary-foreground shadow-sm backdrop-blur-md">
                    {selected.tag}
                  </span>
                )}
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {selected.club} · {selected.category} · Ref: {selected.reference}
                    </p>
                    <h2 id="listing-detail-title" className="mt-2 text-2xl font-extrabold sm:text-3xl">
                      {selected.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeDetail}
                    className="grid size-9 place-items-center rounded-full border border-border/80 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close item details"
                  >
                    ✕
                  </button>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Guaranteed Price:</span>
                  <span className="font-display text-4xl font-extrabold text-foreground">
                    {formatPrice(selected.price, currency)}
                  </span>
                </div>

                {/* Authenticity Certificate Card */}
                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-primary">🛡️ Verified Provenance</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-foreground">
                    {selected.coa || selected.authentication}
                  </p>
                </div>

                {/* Specifications List */}
                <dl className="mt-5 space-y-2.5 text-xs border-t border-border/50 pt-4">
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <dt className="font-bold text-muted-foreground">Condition</dt>
                    <dd className="font-medium text-right">{selected.condition}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <dt className="font-bold text-muted-foreground">Provenance</dt>
                    <dd className="font-medium text-right">{selected.provenance}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-bold text-muted-foreground">Shipping</dt>
                    <dd className="font-medium text-right">{selected.shipping}</dd>
                  </div>
                </dl>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-2.5">
                  {!offerMode ? (
                    <>
                      <div className="flex gap-2">
                        <a
                          href={`/contact?subject=${encodeURIComponent(`${selected.title} (${selected.reference})`)}`}
                          className="flex-1 rounded-xl bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:opacity-90"
                        >
                          Enquire About Piece
                        </a>
                        <button
                          type="button"
                          onClick={() => setOfferMode(true)}
                          className="rounded-xl border border-border/80 bg-secondary/80 px-4 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
                        >
                          Make an Offer
                        </button>
                      </div>

                      {/* WhatsApp Direct Concierge */}
                      <a
                        href={getWhatsAppUrl(selected, undefined, currency)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-center text-xs font-bold text-emerald-600 transition-colors hover:bg-emerald-500/20 dark:text-emerald-400"
                      >
                        💬 Chat with Concierge on WhatsApp
                      </a>
                    </>
                  ) : (
                    <div className="rounded-xl border border-border bg-muted/40 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                        Make an Offer on this Piece
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Enter your offer in {currency} below. Our acquisitions team responds within 2 hours.
                      </p>
                      <div className="mt-3 flex gap-2">
                        <input
                          type="number"
                          value={offerAmount}
                          onChange={(e) => setOfferAmount(e.target.value)}
                          placeholder={`Offer amount in ${currency}...`}
                          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                        <a
                          href={getWhatsAppUrl(
                            selected,
                            offerAmount ? parseFloat(offerAmount) : undefined,
                            currency
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
                        >
                          Send Offer
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOfferMode(false)}
                        className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
