import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, formatPrice, getWhatsAppUrl, type Currency } from "@/lib/listings";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { item?: string } => ({
    item: typeof search.item === "string" ? search.item : undefined,
  }),
  head: ({ search }) => {
    const item = search?.item ? listings.find((l) => l.id === search.item) : undefined;
    if (item) {
      return {
        meta: [
          { title: `${item.title} — ${site.name}` },
          { name: "description", content: item.description },
          { property: "og:title", content: `${item.title} — ${site.name}` },
          { property: "og:description", content: item.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      };
    }
    return {
      meta: [
        { title: `Shop Memorabilia — ${site.name}` },
        { name: "description", content: "Browse signed Premier League shirts, footballs, trading cards and more." },
        { property: "og:title", content: `Shop Memorabilia — ${site.name}` },
        { property: "og:description", content: "Browse signed Premier League shirts, footballs, trading cards and more." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
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

  const relatedItems = useMemo(() => {
    if (!selected) return [];
    const sameClub = listings.filter((l) => l.id !== selected.id && l.club === selected.club);
    const sameCat = listings.filter((l) => l.id !== selected.id && l.club !== selected.club && l.category === selected.category);
    const others = listings.filter((l) => l.id !== selected.id && l.club !== selected.club && l.category !== selected.category);
    return [...sameClub, ...sameCat, ...others].slice(0, 4);
  }, [selected]);

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

  /* -------------------------------------------------------------
     DEDICATED FULL-PAGE PRODUCT SHOWCASE (when an item is selected)
     ------------------------------------------------------------- */
  if (selected) {
    return (
      <div className="mx-auto max-w-6xl px-5 pt-8 pb-24 md:pt-12">
        {/* Navigation & Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeDetail}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-xs font-bold text-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <span aria-hidden="true">←</span> Back to Vault
            </button>
            <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <Link to="/shop" search={{}} className="transition-colors hover:text-primary">
                Vault
              </Link>
              <span>/</span>
              <span>{selected.club}</span>
              <span>/</span>
              <span className="max-w-[200px] truncate font-semibold text-foreground md:max-w-xs">
                {selected.title}
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-border/80 bg-card p-1 shadow-sm">
              <span className="pl-2.5 pr-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                Currency
              </span>
              {currencies.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-bold transition-all",
                    currency === c
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <span className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs font-bold text-muted-foreground">
              REF: {selected.reference}
            </span>
          </div>
        </div>

        {/* Main 2-Column Product Showcase */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Visual Showcase & Specifications */}
          <div className="space-y-6 lg:col-span-7">
            {/* Museum Showcase Frame */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 p-6 shadow-2xl sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_75%)]" />

              {/* Floating Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {selected.tag && (
                    <span className="rounded-full bg-primary px-3.5 py-1 text-xs font-bold tracking-wide text-primary-foreground shadow-md">
                      {selected.tag}
                    </span>
                  )}
                  <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                    Verified Authentic
                  </span>
                </div>
                <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">
                  1 of 1 Vault Item
                </span>
              </div>

              {/* Centerpiece Image Showcase */}
              <div className="relative flex min-h-[360px] items-center justify-center py-8 sm:min-h-[460px]">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="max-h-[460px] w-auto max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Frame Footer Bar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
                <span className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-emerald-400" />
                  Museum Archival Conservation Standard
                </span>
                <span>Physical Display Mount Included</span>
              </div>
            </div>

            {/* Authenticity Certificate Card */}
            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-card to-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl" aria-hidden="true">🛡️</span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Official Certificate of Authenticity (COA)</h3>
                    <p className="text-xs text-muted-foreground">Certified Sports Memorabilia Provenance Dossier</p>
                  </div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.68rem] font-bold tracking-wider text-primary uppercase">
                  Authenticated
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="rounded-xl border border-border/70 bg-secondary/40 p-4">
                  <p className="font-semibold text-foreground">
                    {selected.coa || selected.authentication}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {selected.provenance}
                  </p>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Every piece in the Legacy Locker vault is individually verified by independent certified sports memorabilia authenticators. Backed by our lifetime 100% money-back authenticity guarantee.
                </p>
              </div>
            </div>

            {/* Specifications & Inclusions Grid */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Piece Specifications & Inclusions
              </h3>
              <dl className="mt-4 divide-y divide-border/40 text-xs">
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Club / Association</dt>
                  <dd className="font-semibold text-foreground">{selected.club}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Memorabilia Type</dt>
                  <dd className="font-semibold text-foreground">{selected.category}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Condition Rating</dt>
                  <dd className="font-semibold text-foreground">{selected.condition}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Display Mounting</dt>
                  <dd className="max-w-xs text-right font-semibold text-foreground">
                    {selected.category === "Football"
                      ? "Custom acrylic display case with engraved brass plaque"
                      : selected.category === "Shirt"
                      ? "Museum-grade timber presentation frame with UV-filtering glass"
                      : "Beckett Gem Mint 10 tamper-proof protective acrylic slab"}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Vault Reference ID</dt>
                  <dd className="font-mono font-bold text-foreground">{selected.reference}</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-bold text-muted-foreground">Shipping Logistics</dt>
                  <dd className="font-semibold text-foreground">{selected.shipping}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Acquisition & Concierge (Sticky) */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
            {/* Title & Narrative */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase">
                  {selected.club}
                </span>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  {selected.category}
                </span>
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {selected.title}
              </h1>
              <p className="text-sm font-semibold text-primary">
                {selected.detail}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
            </div>

            {/* Valuation & Actions Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="flex items-baseline justify-between border-b border-border/40 pb-5">
                <div>
                  <span className="block text-[0.7rem] font-bold tracking-wider text-muted-foreground uppercase">
                    Guaranteed Value
                  </span>
                  <span className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                    {formatPrice(selected.price, currency)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                    Vault Available
                  </span>
                  <span className="mt-0.5 block text-[0.68rem] text-muted-foreground">
                    Ready for immediate dispatch
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {!offerMode ? (
                  <>
                    <a
                      href={`/contact?subject=${encodeURIComponent(`Acquisition Enquiry: ${selected.title} (${selected.reference})`)}`}
                      className="flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-md transition-all hover:opacity-90 active:scale-[0.99]"
                    >
                      Enquire to Acquire Piece
                    </a>

                    <button
                      type="button"
                      onClick={() => setOfferMode(true)}
                      className="flex w-full items-center justify-center rounded-xl border border-border/80 bg-secondary px-6 py-3 text-xs font-bold tracking-wider text-foreground uppercase transition-colors hover:bg-secondary/70"
                    >
                      Make a Private Offer
                    </button>

                    <a
                      href={getWhatsAppUrl(selected, undefined, currency)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-6 py-3 text-xs font-bold text-primary transition-colors hover:bg-primary/20"
                    >
                      <span>💬</span> Chat with Concierge on WhatsApp
                    </a>
                  </>
                ) : (
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold tracking-wider text-foreground uppercase">
                        Make a Private Offer
                      </p>
                      <button
                        type="button"
                        onClick={() => setOfferMode(false)}
                        className="text-xs font-semibold text-muted-foreground underline hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Submit your valuation in {currency}. Our acquisitions desk responds to serious collector offers within 2 hours.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder={`Offer in ${currency}...`}
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
                  </div>
                )}
              </div>

              {/* Purchase Trust Bullets */}
              <div className="mt-6 space-y-2 border-t border-border/40 pt-4 text-[0.75rem] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">✓</span>
                  <span>Free fully insured worldwide courier shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">✓</span>
                  <span>Physical display mounting & tamper-proof COA included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">✓</span>
                  <span>14-day private inspection period with escrow protection</span>
                </div>
              </div>
            </div>

            {/* Buyer Guarantees Card */}
            <div className="space-y-3.5 rounded-2xl border border-border/80 bg-card p-5">
              <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Legacy Locker Protections
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <span className="text-base" aria-hidden="true">🛡️</span>
                  <div>
                    <p className="font-bold text-foreground">100% Lifetime Authenticity Guarantee</p>
                    <p className="text-[0.72rem] text-muted-foreground">Every piece guaranteed authentic for life with full refund coverage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base" aria-hidden="true">📦</span>
                  <div>
                    <p className="font-bold text-foreground">White-Glove Archival Packaging</p>
                    <p className="text-[0.72rem] text-muted-foreground">Shipped in custom reinforced foam crates with impact telemetry.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-base" aria-hidden="true">🔒</span>
                  <div>
                    <p className="font-bold text-foreground">Private Bank Wire & Escrow</p>
                    <p className="text-[0.72rem] text-muted-foreground">Discreet high-value payment processing with private client discretion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces from the Collection */}
        {relatedItems.length > 0 && (
          <section className="mt-20 border-t border-border/50 pt-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Curated Selection</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                  Related Pieces from the Vault
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="text-xs font-bold text-primary hover:underline"
              >
                Browse Full Vault Collection →
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedItems.map((item) => (
                <ListingCard key={item.id} item={item} currency={currency} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  /* -------------------------------------------------------------
     DEFAULT CATALOG VIEW (when no item is selected)
     ------------------------------------------------------------- */
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
          <span className="pl-3 pr-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">
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
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground uppercase">
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
          <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground uppercase">
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
        <span className="mb-2 block text-xs font-bold tracking-wider text-muted-foreground uppercase">
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
                ? "border-primary/50 bg-primary/10 font-semibold text-primary"
                : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Filter Status */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
        <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase" aria-live="polite">
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
            className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-bold tracking-wider text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
