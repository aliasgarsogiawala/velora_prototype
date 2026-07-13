export type Journey = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  duration: string;
  route: string;
  intro: string;
  image: string;
  experiences: string[];
  itinerary: { day: string; title: string; copy: string }[];
};

export const journeys: Journey[] = [
  {
    slug: "european-masterpiece", number: "01", title: "European Masterpiece", eyebrow: "Every destination. A different work of art.", duration: "16 days / 15 nights", route: "London · Paris · Belgium · Netherlands · Germany · Switzerland · Liechtenstein · Austria · Italy · Vatican City", intro: "From royal palaces to alpine peaks, experience Europe the Velora way - with time to linger at the places that stay with you.", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=85", experiences: ["Sunset Seine river cruise in Paris", "Private castle and garden immersion", "Black Forest cooking demonstration", "Rhine Falls scenic stop", "Milan fashion and culture walk", "Lake Como by private boat"], itinerary: [
      { day: "Day 01", title: "Welcome to London", copy: "A considered arrival and a gentle first evening in one of Europe’s great capitals." },
      { day: "Day 04", title: "Paris, after hours", copy: "Follow the Seine, pause for a private dinner, and let the city unfold at your pace." },
      { day: "Day 08", title: "Across the Alps", copy: "A scenic passage through Switzerland and Liechtenstein, with time for quiet mountain villages." },
      { day: "Day 13", title: "Italian light", copy: "Art, aperitivo and a slower rhythm through Italy’s storied cities." },
    ]
  },
  {
    slug: "norwegian-fjord-odyssey", number: "02", title: "Norwegian Fjord Odyssey", eyebrow: "Where the fjords meet the northern lights.", duration: "8 days / 7 nights", route: "Oslo · Flam · Stavanger · Bergen · Tromso", intro: "A signature Scandinavian expedition where majestic fjords, Arctic wilderness and luminous northern skies lead the way.", image: "https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=1800&q=85", experiences: ["Norway in a Nutshell scenic journey", "Flam Railway experience", "UNESCO fjord cruise", "Bergen funicular experience", "Tromso Northern Lights expedition", "Sami cultural encounter"], itinerary: [
      { day: "Day 01", title: "Arrival in Oslo", copy: "Settle into Norway’s capital with private transfers and an unhurried evening." },
      { day: "Day 03", title: "Flam railway & fjord", copy: "A classic rail passage opens out into a private cruise through Norway’s most dramatic waterway." },
      { day: "Day 05", title: "Bergen, between mountain and sea", copy: "Explore the city’s historic harbour and rise above it by funicular." },
      { day: "Day 07", title: "Under Arctic skies", copy: "Travel north for a deeply personal Northern Lights expedition." },
    ]
  },
  {
    slug: "london-britain", number: "03", title: "London & Britain", eyebrow: "Timeless elegance journey.", duration: "10 days / 9 nights", route: "London · Bath · Cotswolds · Lake District · Edinburgh", intro: "A refined exploration of Britain where royal heritage, countryside elegance, historic cities and cultural sophistication come together.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=85", experiences: ["Thames riverfront and royal London", "Westminster and evening city exploration", "Classic English heritage immersion", "Cotswolds countryside luxury", "Lake District landscapes", "Edinburgh’s cultural soul"], itinerary: [
      { day: "Day 01", title: "Arrival in London", copy: "Begin with a seamless arrival and a curated evening orientation by the Thames." },
      { day: "Day 03", title: "The English countryside", copy: "Drive into honey-stone villages and historic estates, with a long lunch held in reserve." },
      { day: "Day 06", title: "Lake District quiet", copy: "A slower day of water, walking and the lush contours of northern England." },
      { day: "Day 09", title: "Edinburgh stories", copy: "End among literary lanes, a private table and the city’s enduring grandeur." },
    ]
  },
  {
    slug: "switzerland-alpine-signature", number: "04", title: "Switzerland Alpine Signature", eyebrow: "Snow-draped alpine landscapes. Panoramic railways.", duration: "10 days / 9 nights", route: "Zurich · Lucerne · Interlaken · Zermatt · St. Moritz", intro: "A journey through glacier views, lakefront stays and refined Swiss hospitality, curated at a slow and luxurious pace.", image: "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1800&q=85", experiences: ["Curated Swiss scenic train experiences", "Glacier dining and Jungfraujoch", "Lakeside luxury stays", "Panoramic Glacier Express journey", "Exclusive mountain access", "Slow travel focused itinerary"], itinerary: [
      { day: "Day 01", title: "Arrival in Zurich", copy: "A polished arrival, lakefront orientation and a first taste of the city’s quiet elegance." },
      { day: "Day 03", title: "Lucerne & the high Alps", copy: "Move through cinematic mountain landscapes with time set aside for a mountain-top table." },
      { day: "Day 06", title: "The Glacier Express", copy: "Spend the day in panoramic comfort as Switzerland opens up outside your carriage." },
      { day: "Day 09", title: "St. Moritz, softly", copy: "A final alpine pause in a place built for considered pleasure." },
    ]
  },
];

export const journeyBySlug = (slug: string) => journeys.find((journey) => journey.slug === slug);
