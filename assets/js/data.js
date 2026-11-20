/* ============================================================
   PORTFOLIO PROJECTS — edit this list to publish case studies.
   Each project gets a card on work.html and its own page at
   case-study.html?p=<id>.

   To use real photos, put them in /images/work/ and list them:
     cover:   'images/work/capsule-cover.jpg'
     gallery: ['images/work/capsule-1.jpg', ...]
   Leave them empty ('' / []) to show the drawn garment instead.
   Everything in [BRACKETS] is a placeholder to replace.
   ============================================================ */

window.TW_SHAPES = {
  tee: 'M68 22 L38 32 L8 64 L30 88 L50 74 L50 184 L150 184 L150 74 L170 88 L192 64 L162 32 L132 22 C126 38 115 46 100 46 C85 46 74 38 68 22 Z',
  hoodie: 'M70 30 C70 10 130 10 130 30 L160 40 L192 120 L170 130 L150 92 L150 186 L50 186 L50 92 L30 130 L8 120 L40 40 Z'
};

window.TW_PROJECTS = [
  {
    id: 'capsule',
    sample: true,
    category: 'Streetwear',
    title: '[Client] — streetwear capsule',
    summary: 'A heavyweight hoodie and tee capsule for an independent label’s first drop.',
    services: 'Cut & sew · Screen print · Private label',
    client: '[Client name]',
    quantity: '[X] pieces',
    timeline: '[X] weeks',
    shape: 'hoodie', bg: '#E3E9FF', fill: '#2F5BFF',
    cover: 'images/work/capsule.jpg', gallery: [],
    brief: '[What the client came to you with — their goal, deadline, budget and anything that made the project tricky.]',
    approach: '[How you solved it — fabric choice, sampling rounds, decoration method, labels and packaging.]',
    result: '[What was delivered and how it went — on time, sold out, reordered, customer feedback.]',
    quote: '[A short quote from this client about the result.]',
    quoteBy: '[Name], [Role] at [Client]'
  },
  {
    id: 'team-kit',
    sample: true,
    category: 'Teams',
    title: '[Client] — club team kit',
    summary: 'Performance tees and quarter-zips for a local sports club, with embroidered crests.',
    services: 'Activewear · Embroidery',
    client: '[Client name]', quantity: '[X] pieces', timeline: '[X] weeks',
    shape: 'tee', bg: '#FFF1B8', fill: '#161616',
    cover: 'images/work/team-kit.jpg', gallery: [],
    brief: '[The brief.]', approach: '[What you did.]', result: '[The result.]',
    quote: '[Client quote.]', quoteBy: '[Name], [Role] at [Client]'
  },
  {
    id: 'uniforms',
    sample: true,
    category: 'Corporate',
    title: '[Client] — staff uniforms',
    summary: 'Hard-wearing polos and overshirts for front-of-house staff across several sites.',
    services: 'Workwear · Embroidery · Private label',
    client: '[Client name]', quantity: '[X] pieces', timeline: '[X] weeks',
    shape: 'tee', bg: '#DCE5DD', fill: '#2F4A3A',
    cover: 'images/work/uniforms.jpg', gallery: [],
    brief: '[The brief.]', approach: '[What you did.]', result: '[The result.]',
    quote: '[Client quote.]', quoteBy: '[Name], [Role] at [Client]'
  },
  {
    id: 'tour-merch',
    sample: true,
    category: 'Merch',
    title: '[Client] — tour merch',
    summary: 'A fast-turnaround run of printed tees and hoodies for a music tour.',
    services: 'DTG · Screen print',
    client: '[Client name]', quantity: '[X] pieces', timeline: '[X] weeks',
    shape: 'tee', bg: '#161616', fill: '#FFD43B',
    cover: 'images/work/tour-merch.jpg', gallery: [],
    brief: '[The brief.]', approach: '[What you did.]', result: '[The result.]',
    quote: '[Client quote.]', quoteBy: '[Name], [Role] at [Client]'
  },
  {
    id: 'cafe-teamwear',
    sample: true,
    category: 'Hospitality',
    title: '[Client] — café team wear',
    summary: 'Branded aprons, tees and caps for a growing café group.',
    services: 'Cut & sew · Embroidery',
    client: '[Client name]', quantity: '[X] pieces', timeline: '[X] weeks',
    shape: 'hoodie', bg: '#F4F4F2', fill: '#2F4A3A',
    cover: 'images/work/cafe-teamwear.jpg', gallery: [],
    brief: '[The brief.]', approach: '[What you did.]', result: '[The result.]',
    quote: '[Client quote.]', quoteBy: '[Name], [Role] at [Client]'
  },
  {
    id: 'recycled-basics',
    sample: true,
    category: 'Streetwear',
    title: '[Client] — recycled basics',
    summary: 'Everyday basics in recycled-blend fabric for a sustainability-led brand.',
    services: 'Development · Cut & sew',
    client: '[Client name]', quantity: '[X] pieces', timeline: '[X] weeks',
    shape: 'hoodie', bg: '#2F4A3A', fill: '#FFFFFF',
    cover: 'images/work/recycled-basics.jpg', gallery: [],
    brief: '[The brief.]', approach: '[What you did.]', result: '[The result.]',
    quote: '[Client quote.]', quoteBy: '[Name], [Role] at [Client]'
  }
];
