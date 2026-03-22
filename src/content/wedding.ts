/**
 * Central place for wedding copy, dates, and imagery.
 * UPDATE: Replace all placeholder names, dates, addresses, and image URLs before going live.
 */

// --- Couple & hero ------------------------------------------------------------
export const coupleNames = "Alexandra & Jordan"; // UPDATE
/** Short label for the sticky nav logo */
export const navMonogram = "A & J"; // UPDATE
export const weddingDateLabel = "Saturday, June 14, 2026"; // UPDATE
/** ISO string for countdown target (local wedding day start — adjust TZ as needed) */
export const countdownTargetIso = "2026-06-14T15:00:00.000Z"; // UPDATE ceremony start in UTC or use Z

/** Hero background — use your photo in /public or a remote URL allowed in next.config */
export const heroBackgroundImage = {
  src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  alt: "Couple holding hands — replace with your photo", // UPDATE alt text
};

// --- Ceremony ----------------------------------------------------------------
export const ceremony = {
  title: "Wedding Ceremony", // UPDATE
  churchName: "St. Mary's Cathedral", // UPDATE
  addressLines: ["123 Faith Avenue", "Quezon City, Metro Manila 1100", "Philippines"], // UPDATE
  dateLabel: "Saturday, June 14, 2026", // UPDATE
  timeLabel: "4:00 PM", // UPDATE
};

// --- Reception ----------------------------------------------------------------
export const reception = {
  venueName: "The Grand Ballroom at Azure Hall", // UPDATE
  addressLines: ["456 Celebration Road", "Makati City, Metro Manila 1200", "Philippines"], // UPDATE
  dateLabel: "Saturday, June 14, 2026", // UPDATE
  timeLabel: "6:30 PM", // UPDATE
};

/** UPDATE: Paste Google Maps embed iframe `src` from Share > Embed map */
export const receptionMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.6!2d121.02!3d14.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzAwLjAiTiAxMjHCsDAxJzEyLjAiRQ!5e0!3m2!1sen!2sph!4v1";

/** UPDATE: Link to open venue in Google Maps app / web */
export const receptionMapsLink =
  "https://www.google.com/maps/search/?api=1&query=The+Grand+Ballroom+Makati";

// --- Theme & dress code -------------------------------------------------------
export const themeHeadline = "Garden Romance"; // UPDATE
export const themeDescription =
  "Soft neutrals, blush florals, and candlelight. Think timeless, breathable, and photo-ready."; // UPDATE

export const colorPalette: { name: string; hex: string }[] = [
  { name: "Ivory", hex: "#FAF8F6" },
  { name: "Blush", hex: "#E8C4C4" },
  { name: "Sage", hex: "#9CAF88" },
  { name: "Champagne", hex: "#C9A87C" },
  { name: "Deep green", hex: "#2F3D2E" },
];

export const guestAttire = {
  title: "Guest attire",
  lines: [
    "Cocktail or semi-formal attire in the palette above.",
    "Ladies: midi or floor-length dresses; comfortable heels appreciated.",
    "Gentlemen: suit or blazer with dress trousers.",
  ],
};

export const sponsorAttire = {
  title: "Ninong, Ninang & major sponsors",
  lines: [
    "Barong Tagalog or formal dark suit for gentlemen.",
    "Filipiniana, formal gown, or long dress in ivory, blush, or champagne tones for ladies.",
  ],
};

// --- Entourage ----------------------------------------------------------------
export type EntourageGroup = {
  category: string;
  names: string[];
};

export const entourage: EntourageGroup[] = [
  {
    category: "Principal sponsors / Major sponsors",
    names: ["Mr. & Mrs. Juan Dela Cruz", "Mr. & Maria Santos"], // UPDATE
  },
  { category: "Best man", names: ["Michael Reyes"] },
  { category: "Maid / Matron of honor", names: ["Sophia Lim"] },
  { category: "Bridesmaids", names: ["Emma Cruz", "Lia Tan", "Nina Park"] },
  { category: "Groomsmen", names: ["David Ko", "Chris Vega", "Noah Patel"] },
  { category: "Candle sponsors", names: ["Tito Ramon & Tita Rosa"] },
  { category: "Cord sponsors", names: ["Uncle Ben & Auntie Clara"] },
  { category: "Veil sponsors", names: ["Kuya Marco & Ate Denise"] },
  { category: "Ring bearer", names: ["Little Lucas"] },
  { category: "Bible bearer", names: ["Little Mateo"] },
  { category: "Flower girls", names: ["Chloe", "Mia"] },
  { category: "Officiating pastor / priest", names: ["Rev. Fr. Miguel Santos"] },
];

// --- Calendar (for RSVP success — UPDATE to match ceremony) -------------------
export const calendarEvent = {
  title: "Alexandra & Jordan — Wedding", // UPDATE
  description: "Ceremony and celebration. Details on our invitation site.", // UPDATE
  location: `${ceremony.churchName}, ${ceremony.addressLines.join(", ")}`,
  startIso: "2026-06-14T08:00:00.000Z", // UPDATE — align with ceremony (example UTC)
  endIso: "2026-06-14T12:00:00.000Z", // UPDATE
};

// --- Optional: background music -----------------------------------------------
export const backgroundMusic = {
  /** Set to null to hide the music control */
  src: null as string | null, // e.g. "/audio/our-song.mp3" — UPDATE
};

// --- Optional: guest welcome via ?guest=Name ----------------------------------
export function getGuestWelcome(searchParams: { guest?: string | string[] }): string | null {
  const g = searchParams.guest;
  if (!g) return null;
  const name = Array.isArray(g) ? g[0] : g;
  if (!name?.trim()) return null;
  return decodeURIComponent(name.trim());
}
