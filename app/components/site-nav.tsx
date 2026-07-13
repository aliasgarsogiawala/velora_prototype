import Link from "next/link";

// One navbar for every page. `hero` sits over a dark background image (white text);
// `solid` sits on the light page background (dark text).
export default function SiteNav({ variant = "solid" }: { variant?: "hero" | "solid" }) {
  return (
    <nav className={`site-nav wrap ${variant === "hero" ? "hero-nav" : "solid-nav"}`} data-reveal="down">
      <Link className="brand" href="/">VELORA<span>°</span></Link>
      <div className="nav-links">
        <Link href="/journeys">Journeys</Link>
        <Link href="/about">About us</Link>
        <Link href="/our-story">Our story</Link>
        <Link href="/enquire">Contact</Link>
      </div>
      <Link className="nav-cta" href="/enquire">Begin a journey <span className="arrow" aria-hidden="true">↗</span></Link>
    </nav>
  );
}
