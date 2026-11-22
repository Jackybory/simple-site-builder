import baseball from "@/assets/item-baseball.jpg";
import jersey from "@/assets/item-jersey.jpg";
import card from "@/assets/item-card.jpg";
import football from "@/assets/item-football.jpg";

export type Listing = {
  id: string;
  title: string;
  sport: "Baseball" | "Basketball" | "Football";
  detail: string;
  price: number;
  image: string;
};

// Sample listings shown on the site.
export const listings: Listing[] = [
  {
    id: "team-signed-baseball",
    title: "1950s team-signed baseball",
    sport: "Baseball",
    detail: "20+ signatures · display cube included",
    price: 2450,
    image: baseball,
  },
  {
    id: "framed-23-jersey",
    title: "Signed #23 home jersey, framed",
    sport: "Basketball",
    detail: "Shadow box · certificate of authenticity",
    price: 3800,
    image: jersey,
  },
  {
    id: "graded-qb-card",
    title: "Vintage quarterback rookie card",
    sport: "Football",
    detail: "Graded 7 · protective slab",
    price: 1150,
    image: card,
  },
  {
    id: "team-signed-football",
    title: "Championship team-signed football",
    sport: "Football",
    detail: "Original leather · wooden stand",
    price: 2900,
    image: football,
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
