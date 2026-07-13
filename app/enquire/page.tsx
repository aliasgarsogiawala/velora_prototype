import { Suspense } from "react";
import type { Metadata } from "next";
import ScrollFX from "../components/scroll-fx";
import SiteNav from "../components/site-nav";
import EnquiryForm from "./enquiry-form";

export const metadata: Metadata = {
  title: "Enquire — Velora",
  description: "Begin a private journey with a Velora travel designer.",
};

export default function EnquirePage() {
  return <main className="enquire-page">
    <SiteNav />
    <header className="enquire-intro wrap"><p className="eyebrow" data-reveal="up">Begin a journey</p><h1 data-reveal="skew">Tell us where<br /><em>your heart wanders.</em></h1><p data-reveal="right">Share a few details and one of our travel designers will craft a private proposal made only for you.</p></header>
    <section className="enquire-body wrap">
      <aside className="enquire-aside" data-reveal="left">
        <div><p className="eyebrow">What happens next</p><ol className="enquire-steps"><li><span>01</span>We read every word and match you to a designer.</li><li><span>02</span>A private, no-obligation proposal within a day.</li><li><span>03</span>We refine together until it feels effortless.</li></ol></div>
        <div className="enquire-contact"><p className="eyebrow">Prefer to talk</p><a href="mailto:hello@velorajourneys.in">hello@velorajourneys.in ↗</a><a href="https://www.velorajourneys.in" target="_blank" rel="noreferrer">velorajourneys.in ↗</a></div>
      </aside>
      <div className="enquire-formwrap" data-reveal="right">
        <Suspense fallback={null}><EnquiryForm /></Suspense>
      </div>
    </section>
    <ScrollFX />
  </main>;
}
