// Business details shown across the site. Edit these in one place.
// PLACEHOLDERS: replace the address and phone number with your real details before publishing.
export const site = {
  name: "Legacy Locker",
  tagline: "Sports memorabilia marketplace",
  description:
    "Buy and sell authenticated sports memorabilia — signed shirts, match-worn kit and collectable footballs from collectors you can trust.",
  address: { line1: "12 Example Street", line2: "London, E1 0AA" },
  phone: "020 7946 0000",
  phoneHref: "tel:+442079460000",
  email: "hello@legacylocker.com",
  hours: [
    { days: "Monday – Friday", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "10:00 am – 4:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
} as const;
