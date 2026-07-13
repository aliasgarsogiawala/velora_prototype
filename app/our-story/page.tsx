import type { Metadata } from "next";
import Link from "next/link";
import ScrollFX from "../components/scroll-fx";
import SiteNav from "../components/site-nav";
import StoryRoad from "./story-road";

export const metadata: Metadata = {
  title: "Our Story — Velora",
  description: "The road that made Velora — a decade of designing journeys around feelings.",
};

export default function OurStoryPage() {
  return <main className="story-page">
    <SiteNav />
    <header className="journeys-intro wrap"><p className="eyebrow" data-reveal="up">Our story</p><h1 data-reveal="skew">The road that<br /><em>made us.</em></h1><p data-reveal="right">Every company has a timeline. Ours is a road — follow it down and watch a decade of wandering unfold.</p></header>
    <StoryRoad />
    <section className="itinerary-end wrap"><p className="eyebrow" data-reveal="up">The next chapter</p><h2 data-drift="6">It begins<br /><em>with you.</em></h2><Link href="/enquire" className="footer-button" data-reveal="zoom">Write it with us ↗</Link></section>
    <ScrollFX />
  </main>;
}
