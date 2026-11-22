import baseball from "@/assets/item-baseball.jpg";
import jersey from "@/assets/item-jersey.jpg";
import card from "@/assets/item-card.jpg";
import football from "@/assets/item-football.jpg";
import redShirt from "@/assets/pl-red-jersey-framed.jpg";
import matchBall from "@/assets/pl-signed-ball.jpg";
import programme from "@/assets/pl-programme.jpg";
import blueShirt from "@/assets/pl-blue-jersey-framed.jpg";

export type Listing = {
  id: string;
  title: string;
  sport: "Baseball" | "Basketball" | "Football" | "Premier League";
  detail: string;
  price: number;
  image: string;
};

// Filter chips on the shop page. Every listing sport must appear here.
export const sports: Array<"All" | Listing["sport"]> = [
  "All",
  "Baseball",
  "Basketball",
  "Football",
  "Premier League",
];

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
  {
    id: "man-utd-signed-shirt",
    title: "Manchester United signed home shirt, framed",
    sport: "Premier League",
    detail: "Red home kit · shadow box with brass plaque",
    price: 4200,
    image: redShirt,
  },
  {
    id: "liverpool-signed-ball",
    title: "Liverpool team-signed match ball",
    sport: "Premier League",
    detail: "11 signatures · carved wooden stand",
    price: 3100,
    image: matchBall,
  },
  {
    id: "arsenal-signed-programme",
    title: "Arsenal signed vintage matchday programme",
    sport: "Premier League",
    detail: "Team photo cover · cotton gloves included",
    price: 950,
    image: programme,
  },
  {
    id: "chelsea-signed-shirt",
    title: "Chelsea signed home shirt, framed",
    sport: "Premier League",
    detail: "Blue home kit · wooden frame with glass",
    price: 2750,
    image: blueShirt,
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
