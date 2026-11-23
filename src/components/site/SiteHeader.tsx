import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "The Vault" },
  { to: "/about", label: "Provenance & Story" },
  { to: "/contact", label: "Contact / Consign" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid size-9 place-items-center rounded-lg bg-primary font-display text-base font-extrabold text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
            LL
          </span>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight uppercase sm:text-2xl text-foreground">
              {site.name}
            </span>
            <span className="hidden text-[0.65rem] font-semibold text-muted-foreground uppercase tracking-widest sm:block -mt-1">
              Historic Memorabilia Archives
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
              activeProps={{ className: "!text-primary !bg-primary/10" }}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="hero" size="sm" className="ml-2 hidden rounded-full text-xs font-bold md:inline-flex">
            <Link to="/contact">Consign a Piece</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
