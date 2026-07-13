import Link from "next/link";
import { journeys } from "../journey-data";
import ScrollFX from "../components/scroll-fx";

export default function JourneysPage() {
  return <main className="journeys-page">
    <nav className="solid-nav wrap" data-reveal="down"><Link className="brand" href="/">VELORA<span>°</span></Link><Link href="/" className="nav-back">← Home</Link></nav>
    <header className="journeys-intro wrap"><p className="eyebrow" data-reveal="up">The signature collection</p><h1 data-reveal="skew">Journeys that<br /><em>stay with you.</em></h1><p data-reveal="right">Each one begins with a place and is completed by the way it makes you feel.</p></header>
    <section className="collection wrap">
      {journeys.map((journey, index) => <Link href={`/journeys/${journey.slug}`} className="collection-card" key={journey.slug} data-reveal={index % 2 ? "right" : "left"}>
        <div className="collection-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(29,45,68,.85)), url(${journey.image})` }}><span>{journey.number}</span><span>{journey.duration}</span></div>
        <div className="collection-copy"><p>{journey.route}</p><h2>{journey.title}</h2><span>Discover the itinerary ↗</span></div>
      </Link>)}
    </section>
    <ScrollFX />
  </main>;
}
