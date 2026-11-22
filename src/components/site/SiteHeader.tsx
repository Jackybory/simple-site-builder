import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
            LL
          </span>
          <span className="hidden font-display text-2xl font-bold tracking-wide uppercase sm:inline">
            {site.name}
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="hero" size="sm" className="ml-2 hidden md:inline-flex">
            <Link to="/contact">Sell an item</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
