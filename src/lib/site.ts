// Business details shown across the site. Edit these in one place.
export const site = {
  name: "Legacy Locker",
  tagline: "Sports memorabilia marketplace",
  description:
    "Buy and sell authenticated sports memorabilia — signed balls, game-worn jerseys and graded cards from collectors you can trust.",
  address: { line1: "88 Dugout Lane, Suite 4", line2: "Chicago, IL 60614" },
  phone: "(312) 555-0187",
  phoneHref: "tel:+13125550187",
  email: "hello@legacylocker.com",
  hours: [
    { days: "Monday – Friday", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "10:00 am – 4:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
} as const;
