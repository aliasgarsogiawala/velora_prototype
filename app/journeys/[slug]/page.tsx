import Link from "next/link";
import { notFound } from "next/navigation";
import { journeyBySlug, journeys } from "../../journey-data";
import ScrollFX from "../../components/scroll-fx";
import SiteNav from "../../components/site-nav";

export function generateStaticParams() { return journeys.map(({ slug }) => ({ slug })); }

export default async function JourneyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = journeyBySlug(slug);
  if (!journey) notFound();
  return <main className="itinerary-page">
    <section className="itinerary-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(29,45,68,.8), rgba(29,45,68,.18)), url(${journey.image})` }}>
      <SiteNav variant="hero" />
      <div className="itinerary-hero-copy wrap"><p className="eyebrow" data-reveal="up">{journey.duration}</p><h1 data-reveal="skew">{journey.title}</h1><p data-reveal="up">{journey.eyebrow}</p></div>
    </section>
    <section className="itinerary-overview wrap"><div data-reveal="left"><p className="eyebrow">The route</p><h2>{journey.route}</h2></div><div data-reveal="right"><p>{journey.intro}</p><Link href={`/enquire?journey=${journey.slug}`} className="pill">Plan this journey ↗</Link></div></section>
    <section className="signature wrap"><p className="eyebrow" data-reveal="up">Velora signature experiences</p><div className="experience-list">{journey.experiences.map((experience, index) => <div key={experience} data-reveal="up"><span>0{index + 1}</span><p>{experience}</p></div>)}</div></section>
    <section className="day-section"><div className="wrap"><p className="eyebrow" data-reveal="up">A slower itinerary</p><h2 data-reveal="left">Days designed<br /><em>to breathe.</em></h2><div className="day-list">{journey.itinerary.map((item) => <article key={item.day} data-reveal="up"><span>{item.day}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div></div></section>
    <section className="itinerary-end wrap" id="enquire"><p className="eyebrow" data-reveal="up">Make it yours</p><h2 data-drift="6">Let&apos;s shape the<br /><em>way you go.</em></h2><Link href={`/enquire?journey=${journey.slug}`} className="footer-button" data-reveal="zoom">Speak to a travel designer ↗</Link></section>
    <ScrollFX />
  </main>;
}
