import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

        <div className="flex items-center gap-2">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>

          <Button
            asChild
            variant="hero"
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link to="/contact">Sell an item</Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: true }}
                className="rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "!text-primary" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Button asChild variant="hero" className="mt-2">
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Sell an item
              </Link>
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
