"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { journeys } from "../journey-data";

export default function EnquiryForm() {
  const params = useSearchParams();
  const preset = params.get("journey") ?? "";
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="enquiry-thanks" data-reveal="zoom">
        <p className="eyebrow">Enquiry received</p>
        <h2>Thank you.<br /><em>We&apos;ll be in touch.</em></h2>
        <p>One of our travel designers will reach out within one working day to begin shaping your journey.</p>
        <button type="button" className="pill" onClick={() => setSubmitted(false)}>Send another enquiry ↗</button>
      </div>
    );
  }

  return (
    <form
      className="enquiry-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone <span>(optional)</span></label>
          <input id="phone" name="phone" type="tel" placeholder="+00 00000 00000" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="journey">Journey of interest</label>
          <select id="journey" name="journey" defaultValue={preset}>
            <option value="">Not sure yet</option>
            {journeys.map((j) => (
              <option key={j.slug} value={j.slug}>{j.title}</option>
            ))}
            <option value="bespoke">Something bespoke</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="travellers">Travellers</label>
          <input id="travellers" name="travellers" type="number" min={1} defaultValue={2} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="dates">Preferred dates <span>(optional)</span></label>
        <input id="dates" name="dates" type="text" placeholder="e.g. Spring 2027, flexible" />
      </div>
      <div className="field">
        <label htmlFor="message">Tell us about your dream trip</label>
        <textarea id="message" name="message" rows={4} placeholder="Occasion, pace, the feeling you're after…" />
      </div>
      <button type="submit" className="footer-button enquiry-submit">Send enquiry ↗</button>
    </form>
  );
}
