const photo = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const AREAS = [
  'New Cairo',
  'Sheikh Zayed',
  'New Capital',
  'North Coast',
  'Zamalek',
  '6th of October',
]

export const TYPES = ['Villa', 'Apartment', 'Chalet', 'Townhouse', 'Penthouse']

export const properties = [
  {
    id: 'fifth-villa',
    title: 'Corner villa, Fifth Settlement',
    area: 'New Cairo',
    location: 'New Cairo, Egypt',
    type: 'Villa',
    intent: 'sale',
    beds: 4,
    baths: 4,
    areaSqm: 320,
    price: 14500000,
    summary:
      'A quiet corner plot with a private garden, a driver room, and a finished roof. Ten minutes from AUC and the Middle Ring Road.',
    photos: [
      photo('photo-1613490493576-7fde63acd811'),
      photo('photo-1600585154340-be6161a56a0c'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
  },
  {
    id: 'zayed-garden',
    title: 'Garden apartment, compound',
    area: 'Sheikh Zayed',
    location: 'Sheikh Zayed, Egypt',
    type: 'Apartment',
    intent: 'sale',
    beds: 3,
    baths: 2,
    areaSqm: 165,
    price: 6200000,
    summary:
      'Ground-floor apartment opening onto a landscaped garden. Compound security, a clubhouse, and schools inside the same gate.',
    photos: [
      photo('photo-1600596542815-ffad4c1539a9'),
      photo('photo-1600607687939-ce8a6c25118c'),
      photo('photo-1560448204-e02f11c3d0e2'),
    ],
  },
  {
    id: 'lagoon-chalet',
    title: 'Lagoon chalet, first row',
    area: 'North Coast',
    location: 'North Coast, Egypt',
    type: 'Chalet',
    intent: 'sale',
    beds: 3,
    baths: 2,
    areaSqm: 180,
    price: 9800000,
    summary:
      'First-row chalet on a calm lagoon, with a shared beach and a finished kitchen. Delivery is complete, not off-plan.',
    photos: [
      photo('photo-1499793983690-e29da59ef1c2'),
      photo('photo-1615571022219-eb45cf7faa9d'),
      photo('photo-1507525428034-b723cf961d3e'),
    ],
  },
  {
    id: 'capital-penthouse',
    title: 'Skyline penthouse, New Capital',
    area: 'New Capital',
    location: 'New Administrative Capital, Egypt',
    type: 'Penthouse',
    intent: 'sale',
    beds: 4,
    baths: 3,
    areaSqm: 280,
    price: 11200000,
    summary:
      'Top-floor penthouse with a wide terrace facing the green river. Two covered parking spaces and a private elevator lobby.',
    photos: [
      photo('photo-1545324418-cc1a3fa10c00'),
      photo('photo-1512917774080-9991f1c4c750'),
      photo('photo-1600566753190-17f0baa2a6c3'),
    ],
  },
  {
    id: 'october-townhouse',
    title: 'Family townhouse with roof',
    area: '6th of October',
    location: '6th of October, Egypt',
    type: 'Townhouse',
    intent: 'sale',
    beds: 4,
    baths: 3,
    areaSqm: 240,
    price: 7400000,
    summary:
      'Middle townhouse on a short street, with a nanny room and a roof set up for evenings. Near Mall of Arabia.',
    photos: [
      photo('photo-1564013799919-ab600027ffc6'),
      photo('photo-1570129477492-45c003edd2be'),
      photo('photo-1600047509807-ba8f99d2cdbc'),
    ],
  },
  {
    id: 'zamalek-nile',
    title: 'Nile-view apartment',
    area: 'Zamalek',
    location: 'Zamalek, Cairo',
    type: 'Apartment',
    intent: 'sale',
    beds: 2,
    baths: 2,
    areaSqm: 140,
    price: 8900000,
    summary:
      'A renovated apartment with a direct Nile balcony, high ceilings, and a building elevator. Walk to the Gezira Club.',
    photos: [
      photo('photo-1502672260266-1c1ef2d93688'),
      photo('photo-1493809842364-78817add7ffb'),
      photo('photo-1522708323590-d24dbb6b0267'),
    ],
  },
  {
    id: 'rent-fifth',
    title: 'Furnished apartment, Fifth Settlement',
    area: 'New Cairo',
    location: 'New Cairo, Egypt',
    type: 'Apartment',
    intent: 'rent',
    beds: 2,
    baths: 2,
    areaSqm: 120,
    price: 35000,
    summary:
      'Move-in ready, with linen, a equipped kitchen, and covered parking. One-year contract, paid quarterly.',
    photos: [
      photo('photo-1560448204-e02f11c3d0e2'),
      photo('photo-1502672260266-1c1ef2d93688'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
  },
  {
    id: 'rent-zayed-villa',
    title: 'Family villa with pool',
    area: 'Sheikh Zayed',
    location: 'Sheikh Zayed, Egypt',
    type: 'Villa',
    intent: 'rent',
    beds: 4,
    baths: 4,
    areaSqm: 350,
    price: 85000,
    summary:
      'Standalone villa inside a gated compound, private pool, and a maid’s room. Available from the first of next month.',
    photos: [
      photo('photo-1580587771525-78b9dba3b914'),
      photo('photo-1613490493576-7fde63acd811'),
      photo('photo-1600607687939-ce8a6c25118c'),
    ],
  },
  {
    id: 'rent-coast',
    title: 'Summer chalet, first row',
    area: 'North Coast',
    location: 'North Coast, Egypt',
    type: 'Chalet',
    intent: 'rent',
    beds: 2,
    baths: 2,
    areaSqm: 110,
    price: 55000,
    summary:
      'July and August weeks, or the full season. First row, lagoon view, and a resort beach a short walk away.',
    photos: [
      photo('photo-1615571022219-eb45cf7faa9d'),
      photo('photo-1499793983690-e29da59ef1c2'),
      photo('photo-1507525428034-b723cf961d3e'),
    ],
  },
  {
    id: 'rent-capital',
    title: 'City apartment, downtown towers',
    area: 'New Capital',
    location: 'New Administrative Capital, Egypt',
    type: 'Apartment',
    intent: 'rent',
    beds: 1,
    baths: 1,
    areaSqm: 75,
    price: 18000,
    summary:
      'A bright one-bedroom in a finished tower, close to the government district. Suitable for a single professional.',
    photos: [
      photo('photo-1486406146926-c627a92ad1ab'),
      photo('photo-1522708323590-d24dbb6b0267'),
      photo('photo-1545324418-cc1a3fa10c00'),
    ],
  },
  {
    id: 'hyde-park-villa',
    title: 'Garden villa, Hyde Park',
    area: 'New Cairo',
    location: 'New Cairo, Egypt',
    type: 'Villa',
    intent: 'sale',
    beds: 5,
    baths: 5,
    areaSqm: 360,
    price: 16800000,
    summary: 'A new-phase villa with a private garden and a payment plan over six years. Delivery is scheduled, with the clubhouse already open.',
    photos: [
      photo('photo-1600585154526-990dced4db0d'),
      photo('photo-1600585154340-be6161a56a0c'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
  },
  {
    id: 'sahel-new',
    title: 'Lagoon chalet, delivery 2027',
    area: 'North Coast',
    location: 'North Coast, Egypt',
    type: 'Chalet',
    intent: 'sale',
    beds: 3,
    baths: 2,
    areaSqm: 150,
    price: 8900000,
    summary: 'Off-plan chalet on the lagoon, with a seven-year plan and a finished beach already open to owners.',
    photos: [
      photo('photo-1615571022219-eb45cf7faa9d'),
      photo('photo-1499793983690-e29da59ef1c2'),
      photo('photo-1507525428034-b723cf961d3e'),
    ],
  },
]

const tags = {
  'fifth-villa': { market: 'resale', compound: 'Mivida', featured: true },
  'zayed-garden': { market: 'resale', compound: 'Allegria', featured: true },
  'lagoon-chalet': { market: 'resale', compound: 'Hacienda Bay', featured: false },
  'capital-penthouse': { market: 'new', compound: 'Mountain View iCity', featured: true },
  'october-townhouse': { market: 'resale', compound: 'Allegria', featured: false },
  'zamalek-nile': { market: 'resale', compound: null, featured: true },
  'rent-fifth': { market: 'resale', compound: 'Mivida', featured: false },
  'rent-zayed-villa': { market: 'resale', compound: 'Allegria', featured: false },
  'rent-coast': { market: 'resale', compound: 'Hacienda Bay', featured: false },
  'rent-capital': { market: 'new', compound: 'Mountain View iCity', featured: false },
  'hyde-park-villa': { market: 'new', compound: 'Hyde Park', featured: true },
  'sahel-new': { market: 'new', compound: 'Hacienda Bay', featured: true },
}

for (const property of properties) {
  Object.assign(property, { market: 'resale', compound: null, featured: false }, tags[property.id])
}

export const compounds = [
  {
    id: 'mivida',
    name: 'Mivida',
    area: 'New Cairo',
    market: 'resale',
    line: 'Finished villas and garden apartments inside a gated compound.',
    image: photo('photo-1600585154340-be6161a56a0c', 1200),
  },
  {
    id: 'allegria',
    name: 'Allegria',
    area: 'Sheikh Zayed',
    market: 'resale',
    line: 'Golf compound with townhouses and apartments ready to move into.',
    image: photo('photo-1600596542815-ffad4c1539a9', 1200),
  },
  {
    id: 'mountain-view',
    name: 'Mountain View iCity',
    area: 'New Capital',
    market: 'new',
    line: 'New towers on the green river, with plans still open.',
    image: photo('photo-1486406146926-c627a92ad1ab', 1200),
  },
  {
    id: 'hyde-park',
    name: 'Hyde Park',
    area: 'New Cairo',
    market: 'new',
    line: 'New-phase villas with a clubhouse that is already open.',
    image: photo('photo-1600585154526-990dced4db0d', 1200),
  },
  {
    id: 'hacienda',
    name: 'Hacienda Bay',
    area: 'North Coast',
    market: 'new',
    line: 'Lagoon chalets, some delivered and some still on a plan.',
    image: photo('photo-1507525428034-b723cf961d3e', 1200),
  },
]

export const areaGuides = [
  {
    name: 'New Cairo',
    line: 'Fifth Settlement, compounds, and family villas.',
    image: photo('photo-1600585154340-be6161a56a0c', 1200),
  },
  {
    name: 'Sheikh Zayed',
    line: 'Gated communities west of the city.',
    image: photo('photo-1600596542815-ffad4c1539a9', 1200),
  },
  {
    name: 'New Capital',
    line: 'New towers along the green river.',
    image: photo('photo-1486406146926-c627a92ad1ab', 1200),
  },
  {
    name: 'North Coast',
    line: 'Chalets on the lagoon and the sea.',
    image: photo('photo-1507525428034-b723cf961d3e', 1200),
  },
  {
    name: 'Zamalek',
    line: 'Quiet streets and Nile balconies.',
    image: photo('photo-1539768942893-daf53e448371', 1200),
  },
  {
    name: '6th of October',
    line: 'Townhouses near the malls and schools.',
    image: photo('photo-1564013799919-ab600027ffc6', 1200),
  },
]

export function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function areaBySlug(slug) {
  return areaGuides.find((area) => slugify(area.name) === slug) ?? null
}

export function propertyById(id) {
  return properties.find((property) => property.id === id) ?? null
}

export function filtersToSearch(filters) {
  const params = new URLSearchParams()
  if (filters.intent && filters.intent !== 'buy') params.set('intent', filters.intent)
  if (filters.area && filters.area !== 'all') params.set('area', filters.area)
  if (filters.type && filters.type !== 'all') params.set('type', filters.type)
  if (filters.sort && filters.sort !== 'featured') params.set('sort', filters.sort)
  const query = params.toString()
  return query ? `?${query}` : ''
}

export function readFilters(params) {
  const intent = params.get('intent')
  const area = params.get('area')
  const type = params.get('type')
  const sort = params.get('sort')
  return {
    intent: intent === 'rent' ? 'rent' : 'buy',
    area: AREAS.includes(area) ? area : 'all',
    type: TYPES.includes(type) ? type : 'all',
    sort: sort === 'price-asc' || sort === 'price-desc' ? sort : 'featured',
  }
}

export function formatPrice(property) {
  const amount = new Intl.NumberFormat('en-US').format(property.price)
  return {
    amount: `EGP ${amount}`,
    period: property.intent === 'rent' ? '/ month' : '',
  }
}

export function filterProperties(list, filters, saved, showSaved) {
  let next = list.filter((property) =>
    showSaved ? saved.includes(property.id) : filters.intent === 'buy' ? property.intent === 'sale' : property.intent === 'rent',
  )
  if (filters.area !== 'all') next = next.filter((property) => property.area === filters.area)
  if (filters.type !== 'all') next = next.filter((property) => property.type === filters.type)
  if (filters.market && filters.market !== 'all') next = next.filter((property) => property.market === filters.market)
  if (filters.compound && filters.compound !== 'all') next = next.filter((property) => property.compound === filters.compound)
  if (filters.sort === 'price-asc') next = [...next].sort((a, b) => a.price - b.price)
  if (filters.sort === 'price-desc') next = [...next].sort((a, b) => b.price - a.price)
  return next
}
