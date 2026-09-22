/* =====================================================================
   BRAND DATA — this is the ONLY place you need to edit to add, remove,
   rename, or recategorise a brand. Both index.html (homepage) and
   brands.html (the full directory page) read from this single file, so
   a brand only ever needs to be entered once.

   Fields:
     id        - unique short id, no spaces
     name      - display name
     category  - must exactly match one of the CATEGORIES below
     url       - the brand's real website or Instagram page (opens in
                 a new tab)
     initial   - single letter shown as a fallback if the logo image
                 can't be loaded
     color     - one of: 'navy' | 'orange' | 'teal'  (fallback badge colour)
     featured  - true = show in "Top Picks" on the homepage

   NOT HERE ANYMORE: "status" (Sale Live / New Arrival) and "live" (sale
   details) used to live in this file, but they change daily and this
   file shouldn't need daily edits. They now live in sales-status.json
   instead, which is checked automatically every day by a script (see
   scraper.js) — that script visits every brand's website, looks for a
   live sale, and updates sales-status.json on its own. You should
   almost never need to touch that file by hand; use admin.html only
   as a manual override (e.g. for a brand the scraper can't check, like
   an Instagram-only page, or to mark a "New Arrival" — the scraper only
   detects sales, not new-arrival announcements).

   LOGOS: there's no logo image file to manage. Each brand's logo is
   pulled automatically from their own website's icon using a free
   favicon lookup service (see logoUrl() below) — so as soon as you
   add a real `url`, a logo appears with no extra work. If a brand's
   logo doesn't look right, the fallback is a plain colour circle with
   their initial, so the layout never breaks.

   NOTE ON LINKS: many of the URLs below are the real public websites
   of these brands, wired up so you have a fully working demo. Swap in
   your actual onboarded/partnered brands as they're confirmed — a few
   entries are marked VERIFY because I could not fully confirm the
   live URL; check before relying on them.
===================================================================== */

const CATEGORIES = [
  { name: 'Clothing',              icon: 'fa-shirt' },
  { name: 'Footwear',              icon: 'fa-shoe-prints' },
  { name: 'Home Décor',            icon: 'fa-couch' },
  { name: 'Lifestyle',             icon: 'fa-star' },
  { name: 'Kitchen & Accessories', icon: 'fa-kitchen-set' },
  { name: 'Bags',                  icon: 'fa-bag-shopping' },
];

const BRANDS = [
  // ---- Clothing (alphabetical) ----
  { id:'adma',          name:'Adma',                category:'Clothing', url:'https://adma.com.pk/',          initial:'A', color:'navy',   featured:false },
  { id:'beigebydandy',  name:'Beige by Dandy',       category:'Clothing', url:'https://beige.pk/',             initial:'B', color:'orange', featured:false },
  { id:'breakout',      name:'Breakout',             category:'Clothing', url:'https://breakout.com.pk/',      initial:'B', color:'navy',   featured:false, stores:[{city:'Rawalpindi'}] }, // VERIFY url
  { id:'charizma',      name:'Charizma',             category:'Clothing', url:'https://houseofcharizma.com/',  initial:'C', color:'orange', featured:false, stores:[{city:'Lahore'},{city:'Karachi'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Multan'},{city:'Gujranwala'},{city:'Peshawar'},{city:'Sialkot'},{city:'Sargodha'},{city:'Sahiwal'}] },
  { id:'dceast',        name:'DC East',              category:'Clothing', url:'https://divinelycrafted.org/',  initial:'D', color:'teal',   featured:false }, // VERIFY — handle "Dc.east" and domain name don't obviously match, confirm this is the right site
  { id:'drappy',        name:'Drappy',               category:'Clothing', url:'https://drappy.pk/',            initial:'D', color:'navy',   featured:false },
  { id:'fitted',        name:'Fitted',               category:'Clothing', url:'https://fittedshop.com/',       initial:'F', color:'teal',   featured:false, stores:[{city:'Lahore',area:'Al Hafeez Heights, Gulberg III'}] },
  { id:'imhaut',        name:'IM Haut',              category:'Clothing', url:'https://imhaut.com/',           initial:'I', color:'orange', featured:false },
  { id:'ivar',          name:'Ivar',                 category:'Clothing', url:'https://ivarclothing.com/',     initial:'I', color:'navy',   featured:false },
  { id:'khaadi',        name:'Khaadi',               category:'Clothing', url:'https://www.khaadi.com/',       initial:'K', color:'orange', featured:true, stores:[{city:'Karachi',area:'Dolmen Malls'},{city:'Lahore',area:'Packages Mall, Emporium Mall'},{city:'Islamabad',area:'Centaurus Mall'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Multan'},{city:'Peshawar'},{city:'Quetta'},{city:'Gujranwala'},{city:'Sialkot'},{city:'Hyderabad'},{city:'Sukkur'},{city:'Sargodha'},{city:'Bahawalpur'},{city:'Sahiwal'},{city:'Abbottabad'},{city:'Mirpur'},{city:'Mardan'},{city:'Gujrat'},{city:'Jhelum'},{city:'Rahim Yar Khan'},{city:'Larkana'},{city:'Wah Cantt'}] },
  { id:'kiji',          name:'Kiji',                 category:'Clothing', url:'https://kijiretail.com/',       initial:'K', color:'teal',   featured:false }, // VERIFY category — generic name/domain, confirm what they actually sell
  { id:'kottonfruit',   name:'Kotton Fruit',         category:'Clothing', url:'https://www.kottonfruit.com/',  initial:'K', color:'navy',   featured:false },
  { id:'lakhany',       name:'Lakhany',              category:'Clothing', url:'https://lakhanyonline.com/',    initial:'L', color:'orange', featured:false, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'},{city:'Multan'},{city:'Hyderabad'},{city:'Peshawar'}] }, // renamed from "Lakhany Home" and moved from Kitchen & Accessories
  { id:'limelight',     name:'Limelight',            category:'Clothing', url:'https://www.limelight.pk/',     initial:'L', color:'teal',   featured:false, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Peshawar'},{city:'Faisalabad'},{city:'Multan'},{city:'Gujranwala'},{city:'Sialkot'},{city:'Hyderabad'},{city:'Abbottabad'},{city:'Bahawalpur'},{city:'Sargodha'},{city:'Rahim Yar Khan'}] },
  { id:'lunaoutlet',    name:'Luna Outlet',          category:'Clothing', url:'https://luna-outlet.com/',      initial:'L', color:'navy',   featured:false },
  { id:'luso',          name:'Luso',                 category:'Clothing', url:'https://www.luso.com.pk/',      initial:'L', color:'orange', featured:false },
  { id:'mabsh',         name:'Mabsh',                category:'Clothing', url:'https://mabsh.pk/',             initial:'M', color:'teal',   featured:false },
  { id:'madofficial',   name:'MAD Official',         category:'Clothing', url:'https://madofficialstore.shop/', initial:'M', color:'navy',  featured:false }, // VERIFY — a couple similarly-named stores exist, confirm this is the right one
  { id:'mahhi',         name:'Mahhi',                category:'Clothing', url:'https://mahhi.com.pk/',         initial:'M', color:'orange', featured:false },
  { id:'nayadour',      name:'Naya Dour',            category:'Clothing', url:'https://nayadour.co/',          initial:'N', color:'teal',   featured:false },
  { id:'ninefigures',   name:'Nine Figures',         category:'Clothing', url:'https://ninefigures.com/',      initial:'N', color:'navy',   featured:false },
  { id:'outfitters',    name:'Outfitters',           category:'Clothing', url:'https://outfitters.com.pk/',    initial:'O', color:'teal',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Peshawar'},{city:'Quetta'},{city:'Faisalabad'},{city:'Multan'},{city:'Gujranwala'},{city:'Sialkot'},{city:'Hyderabad'},{city:'Abbottabad'},{city:'Sargodha'}] },
  { id:'raiment61',     name:'Raiment61',            category:'Clothing', url:'https://raiment61.com/',        initial:'R', color:'navy',   featured:false },
  { id:'sanasafinaz',   name:'Sana Safinaz',         category:'Clothing', url:'https://www.sanasafinaz.com/',  initial:'S', color:'orange', featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Multan'},{city:'Gujranwala'},{city:'Peshawar'},{city:'Hyderabad'},{city:'Sialkot'},{city:'Quetta'},{city:'Sargodha'}] },
  { id:'sapphire',      name:'Sapphire',             category:'Clothing', url:'https://pk.sapphireonline.pk/', initial:'S', color:'teal',   featured:true, stores:[{city:'Karachi',area:'Dolmen Mall Clifton, LuckyOne'},{city:'Lahore',area:'Packages Mall, Emporium Mall'},{city:'Islamabad',area:'Centaurus Mall'},{city:'Faisalabad'},{city:'Multan'},{city:'Sialkot'},{city:'Gujranwala'},{city:'Peshawar'},{city:'Rawalpindi'}] },
  { id:'shaffer',       name:'Shaffer',              category:'Clothing', url:'https://shaffer.store/',        initial:'S', color:'navy',   featured:false, stores:[{city:'Karachi',area:'LuckyOne Mall',address:'F-02, 1st Floor'},{city:'Karachi',area:'Dolmen Mall Tariq Road',address:'G 90-96'},{city:'Karachi',area:'DHA Phase 6',address:'34C, Lane 11, Khayaban-e-Bukhari'},{city:'Karachi',area:'Dolmen Mall Clifton',address:'S-37, 2nd Floor'},{city:'Lahore',area:'Dolmen Mall Lahore, DHA Phase 6',address:'S-14, 2nd Floor'},{city:'Hyderabad',area:'Boulevard Mall, SITE',address:'F119, F121, F128'},{city:'Faisalabad',area:'Chen One Road, Peoples Colony 01',address:'Shop #862-B'}] }, // VERIFY category — confirm what they sell
  { id:'sohasultan',    name:'Soha Sultan',          category:'Clothing', url:'https://sohasultan.com/',       initial:'S', color:'orange', featured:false },
  { id:'thecottonleaf', name:'The Cotton Leaf',      category:'Clothing', url:'https://thecottonleaf.pk/',     initial:'T', color:'teal',   featured:false },
  { id:'dirtylaundry',  name:'The Dirty Laundry',    category:'Clothing', url:'https://www.thedirtylaundry.pk/', initial:'T', color:'navy', featured:false },
  { id:'wearhype',      name:'Wear Hype',            category:'Clothing', url:'https://wearhype.co/',          initial:'W', color:'navy',   featured:false },
  { id:'wearlowkey',    name:'Wear Lowkey',          category:'Clothing', url:'https://lowkeypk.com/',         initial:'W', color:'orange', featured:false },
  { id:'zahstudio',     name:'Zah Studio',           category:'Clothing', url:'https://zahstudio.com.pk/',     initial:'Z', color:'teal',   featured:false },
  { id:'zephyrwaleed',  name:'Zephyr by Waleed',     category:'Clothing', url:'https://zephyrbywaleed.com/',   initial:'Z', color:'navy',   featured:false },

  // ---- Footwear (alphabetical) ----
  { id:'borjan',      name:'Borjan',      category:'Footwear', url:'https://www.borjan.com.pk/',  initial:'B', color:'navy',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'fhsofficial', name:'FHS Official', category:'Footwear', url:'https://fhsofficial.com/',   initial:'F', color:'orange', featured:false, stores:[{city:'Karachi',area:'Dolmen Mall Clifton',address:'Store S-26, 2nd Floor'},{city:'Karachi',area:'Ocean Mall',address:'Store G-03, Ground Floor'},{city:'Lahore',area:'Packages Mall',address:'Store #1024'},{city:'Lahore',area:'Emporium Mall',address:'Store G-35, Ground Floor'}] },
  { id:'giorgiovanti',name:'Giorgio Vanti',category:'Footwear', url:'https://giorgiovanti.com/',  initial:'G', color:'teal',   featured:false, stores:[{city:'Lahore',area:'MM Alam Road, Dolmen Mall Lahore'},{city:'Faisalabad',area:'Lyallpur Galleria'}] },
  { id:'inmysaaz',    name:'In My Saaz',  category:'Footwear', url:'https://saazstore.com/',      initial:'I', color:'navy',   featured:false },
  { id:'jutay',       name:'Jutay',       category:'Footwear', url:'https://jutay.co/',           initial:'J', color:'orange', featured:false }, // VERIFY category — "Jutay" means shoes, reasonably confident but confirm
  { id:'ndure',       name:'Ndure',       category:'Footwear', url:'https://www.ndure.com/',      initial:'N', color:'teal',   featured:false },
  { id:'onedegree',   name:'One Degree',  category:'Footwear', url:'https://onedegree.com.pk/',   initial:'O', color:'navy',   featured:false },
  { id:'servis',      name:'Servis',      category:'Footwear', url:'https://servis.pk/',          initial:'S', color:'orange', featured:false, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'},{city:'Multan'}] },
  { id:'stylo',       name:'Stylo',       category:'Footwear', url:'https://stylo.pk/',           initial:'S', color:'teal',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'},{city:'Rawalpindi'}] },
  { id:'tsmandco',    name:'TSM & Co',    category:'Footwear', url:'https://www.tsmco.com.pk/',   initial:'T', color:'navy',   featured:false, stores:[{city:'Karachi',area:'DHA Phase 5, Zamzama Commercial Area',address:'Building 1/C, Shop 4, 2nd Commercial Ln'}] },

  // ---- Home Décor (alphabetical) ----
  { id:'chenone',     name:'ChenOne',       category:'Home Décor', url:'https://chenone.com/',              initial:'C', color:'navy',   featured:true, stores:[{city:'Lahore'},{city:'Karachi'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Multan'},{city:'Peshawar'},{city:'Sialkot'},{city:'Gujranwala'},{city:'Bahawalpur'},{city:'Abbottabad'}] },
  { id:'cosmodecor',  name:'Cosmo Décor',   category:'Home Décor', url:'https://www.cosmodecorpk.com/',     initial:'C', color:'orange', featured:false },
  { id:'homeshopping',name:'Home Shopping', category:'Home Décor', url:'https://www.homeshopping.pk/',      initial:'H', color:'teal',   featured:false }, // VERIFY url
  { id:'interwood',   name:'Interwood',     category:'Home Décor', url:'https://interwood.pk/',             initial:'I', color:'navy',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Peshawar'},{city:'Gujranwala'},{city:'Multan'}] },

  // ---- Lifestyle (alphabetical) ----
  { id:'alfatah',     name:'Al-Fatah',      category:'Lifestyle', url:'https://alfatah.pk/',     initial:'A', color:'navy',   featured:false, stores:[{city:'Lahore',area:'Hussain Chowk, DHA, Johar Town'},{city:'Islamabad',area:'Centaurus, Safa Gold'},{city:'Rawalpindi'},{city:'Faisalabad'},{city:'Sialkot'},{city:'Gujranwala'},{city:'Multan'},{city:'Bahawalpur'}] }, // VERIFY url
  { id:'chasevalue',  name:'Chase Value',   category:'Lifestyle', url:'https://chasevalue.pk/',  initial:'C', color:'orange', featured:false, stores:[{city:'Karachi',area:'Khalid Bin Waleed Road, North Nazimabad'},{city:'Multan'},{city:'Bahawalpur'},{city:'Islamabad'},{city:'Faisalabad'}] },
  { id:'naheed',      name:'Naheed',        category:'Lifestyle', url:'https://www.naheed.pk/',  initial:'N', color:'teal',   featured:false, stores:[{city:'Karachi',area:'Main Tariq Road / Bahadurabad intersection'}] },

  // ---- Kitchen & Accessories ----
  { id:'bhojascollection', name:'Bhojas Collection', category:'Kitchen & Accessories', url:'https://www.bhojascollections.com/', initial:'B', color:'teal', featured:false, stores:[{city:'Karachi',area:'Gul Tijara, Near Saddar Town',address:'152 Bhurgri Road'}] },

  // ---- Bags (alphabetical) ----
  { id:'fiore',       name:'Fioré',      category:'Bags', url:'https://fioure.com/',     initial:'F', color:'navy',   featured:false }, // category not fully confirmed — check this is actually a bags brand
  { id:'insignia',    name:'Insignia',   category:'Bags', url:'https://insignia.com.pk/', initial:'I', color:'orange', featured:false, stores:[{city:'Rawalpindi'}] }, // VERIFY url
  { id:'obipelle',    name:'Obi Pelle',  category:'Bags', url:'https://obipelle.com/',    initial:'O', color:'teal',   featured:false }, // VERIFY category — "Pelle" is Italian for leather, reasonably confident but confirm
  { id:'warponline',  name:'Warp',       category:'Bags', url:'https://warp-online.pk/', initial:'W', color:'navy',   featured:false },
];

/* ---------- Shared helpers used by both pages ---------- */

const colorVar = c => c === 'orange' ? 'var(--orange-deep)' : c === 'teal' ? 'var(--teal-deep)' : 'var(--navy)';

// Pulls a small logo icon from the brand's own website automatically —
// no logo files to upload or manage. Falls back to a plain colour+initial
// badge (via onerror in the HTML) if the brand has no real website (e.g. '#')
// or the icon can't be fetched for any reason.
function logoUrl(brand){
  if(!brand.url || brand.url === '#' || brand.url.includes('instagram.com')) return null;
  try{
    const host = new URL(brand.url).hostname;
    return `https://www.google.com/s2/favicons?sz=128&domain=${host}`;
  }catch(e){
    return null;
  }
}

// Renders the round brand badge: real logo if available, graceful
// fallback to initial+colour circle if not (via onerror).
function brandBadgeHTML(b, size){
  const px = size || 52;
  const logo = logoUrl(b);
  const fallback = `this.replaceWith(Object.assign(document.createElement('div'), { className:'brand-badge', style:'width:${px}px;height:${px}px;font-size:${Math.round(px*0.34)}px;background:${colorVar(b.color)};', textContent:'${b.initial}' }))`;
  if(logo){
    return `<img src="${logo}" alt="${b.name} logo" onerror="${fallback}" style="width:${px}px;height:${px}px;border-radius:50%;object-fit:cover;background:#F0F1F4; flex-shrink:0; padding:8px; box-sizing:border-box; border:1px solid var(--line);">`;
  }
  return `<div class="brand-badge" style="width:${px}px;height:${px}px;font-size:${Math.round(px*0.34)}px;background:${colorVar(b.color)};">${b.initial}</div>`;
}

// Every brand starts with no status until sales-status.json is merged in below.
BRANDS.forEach(b => { b.status = null; b.live = null; b.sale = null; b.saleCheckedAt = null; b.products = []; b.productsSourceUrl = null; });

/* =====================================================================
   TRUST / VERIFICATION / STORES — new fields (BrandGali redesign)
   ---------------------------------------------------------------------
   These fields are OPTIONAL per brand and default to "unknown / none"
   rather than being invented. Nothing here fabricates data:
     description  - one-line description of the brand. Empty until written.
     verified     - true only once a human has actually confirmed this
                    brand's identity/official channel. Defaults to false
                    for every brand below — BrandGali has not yet run a
                    verification pass, so nothing claims to be verified
                    that hasn't been checked.
     verifiedDate - ISO date of that check, null until verified.
     stores       - array of { city, area, address, phone, mapUrl,
                    hours }. Empty until real, confirmed store data is
                    added — the UI shows "store info not yet available"
                    rather than guessing.
     phone        - brand's public contact number, null unless known.
     instagram    - Instagram URL if different from `url`, else null.
   To verify a brand or add stores, edit its entry directly above (or via
   the future admin.html — see BRANDGALI-TECHNICAL-SPEC.md).
===================================================================== */
BRANDS.forEach(b => {
  b.description  = b.description  || '';
  // "Verified" here means BrandGali has a real, working official link on
  // file for this brand (not a placeholder) — a meaningful but modest bar,
  // not a full identity check. A brand can be explicitly set to
  // `verified: false` above to override this (e.g. a link still marked
  // "// VERIFY" that hasn't been double-checked yet).
  const hasRealUrl = !!(b.url && b.url.trim() && b.url.trim() !== '#');
  b.verified     = (b.verified !== undefined) ? b.verified : hasRealUrl;
  b.verifiedDate = b.verifiedDate || (b.verified ? '2026-09-19' : null);
  b.stores       = b.stores       || [];
  b.phone        = b.phone        || null;
  b.instagram    = b.instagram    || (b.url && b.url.includes('instagram.com') ? b.url : null);
  b.newArrival   = b.newArrival   || false; // separate from `status` - see isNewArrival() below
  b.dateAdded    = b.dateAdded    || null;   // ISO date this brand was added to BrandGali's directory - set manually when adding a brand, so "New Additions" stays honest rather than defaulting everyone to "new"
});

/* =====================================================================
   STORE CITIES & "NEAR ME" — city-level (not street-address, not GPS-
   pinpoint) matching. CITY_COORDS are standard, publicly-known
   coordinates for each city's centre, not specific to any store. We
   find the nearest of these cities to the visitor, then show brands
   with a confirmed store in that city. This is honestly approximate —
   "near me" here means "same city as you," not "this many metres
   away" — because that's the level of confidence the store data
   actually supports.
===================================================================== */
const CITY_COORDS = {
  'Karachi':      [24.8607, 67.0011],
  'Lahore':       [31.5497, 74.3436],
  'Islamabad':    [33.6844, 73.0479],
  'Rawalpindi':   [33.5651, 73.0169],
  'Faisalabad':   [31.4504, 73.1350],
  'Multan':       [30.1575, 71.5249],
  'Peshawar':     [34.0151, 71.5249],
  'Quetta':       [30.1798, 66.9750],
  'Sialkot':      [32.4945, 74.5229],
  'Gujranwala':   [32.1877, 74.1945],
  'Hyderabad':    [25.3960, 68.3578],
};

function haversineKm(lat1, lon1, lat2, lon2){
  const R = 6371;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Nearest known city to a lat/lng, and how far away it is.
function nearestCity(lat, lon){
  let best = null, bestDist = Infinity;
  Object.keys(CITY_COORDS).forEach(city => {
    const [clat, clon] = CITY_COORDS[city];
    const d = haversineKm(lat, lon, clat, clon);
    if(d < bestDist){ bestDist = d; best = city; }
  });
  return { city: best, distanceKm: bestDist };
}

// Every city that at least one brand has a confirmed store in.
function allStoreCities(){
  const set = new Set();
  BRANDS.forEach(b => b.stores.forEach(s => { if(s.city) set.add(s.city); }));
  return Array.from(set).sort();
}

function brandsInCity(city){
  return BRANDS.filter(b => b.stores.some(s => s.city === city));
}

// True only if this brand has a real dateAdded within the last `days`
// days (default 60). Brands with no dateAdded set are never counted -
// we don't guess when an existing brand joined the directory.
function isRecentlyAdded(b, days){
  days = days || 60;
  if(!b.dateAdded) return false;
  const d = new Date(b.dateAdded);
  if(isNaN(d)) return false;
  return (Date.now() - d.getTime()) <= days * 86400000;
}

// Shared product-card renderer used both by the Live Sales page and by
// each brand's own page for its general product showcase. `source`
// feeds into GA4 click tracking so the two contexts stay distinguishable.
function productCardHTML(b, p, source){
  const url = p.url || (b.sale && b.sale.sourceUrl) || b.url;
  const img = p.image ? `<img src="${p.image}" alt="${(p.name||b.name).replace(/"/g,'&quot;')}" loading="lazy" onerror="this.style.display='none'">` : `<div style="height:90px;background:#F0F1F4;"></div>`;
  const price = p.currentPrice ? `<span class="p-now">${p.currentPrice}</span>${p.originalPrice ? `<span class="p-was">${p.originalPrice}</span>` : ''}` : (p.discount ? `<span class="p-now">${p.discount}</span>` : '');
  return `<a class="product-card" href="${url}" target="_blank" rel="noopener" data-gtm-brand="${b.id}" data-gtm-name="${b.name}" data-gtm-category="${b.category}" data-gtm-source="${source || 'product'}">
    ${img}
    <div class="p-body">
      <div class="p-name">${p.name || 'View product'}</div>
      <div class="p-price">${price}</div>
    </div>
  </a>`;
}

// "Products from [Brand]" section for brand.html - real products read
// from the brand's own site, shown regardless of sale status. Renders
// nothing at all when none were found (never a placeholder grid).
function generalProductsHTML(b, limit){
  limit = limit || 6;
  const items = (b.products || []).filter(p => p && (p.name || p.image)).slice(0, limit);
  if(!items.length) return '';
  return `
    <div class="section">
      <div class="section-head"><h2><i class="fa-solid fa-shirt"></i>Products from ${b.name}</h2></div>
      <div class="product-grid">${items.map(p => productCardHTML(b, p, 'brand_page_product')).join('')}</div>
      ${b.productsSourceUrl ? `<p style="font-size:10.5px;color:var(--muted);margin-top:8px;">Read from <a href="${b.productsSourceUrl}" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;">${b.name}'s own site</a> - real products only.</p>` : ''}
    </div>`;
}
// independent, not mutually exclusive, so both tiles can show together.
function isSaleLive(b){ return b.status === 'sale'; }
function isNewArrival(b){ return !!b.newArrival || b.status === 'new'; } // 'new' kept for back-compat with older sales-status.json entries

// Pulls the biggest "%" number out of a sale's headline/off text (e.g.
// "Up to 50% off" -> 50). Returns null if no live sale, or no percentage
// is actually mentioned - we never invent a number that isn't there.
function getMaxDiscountPercent(b){
  if(!isSaleLive(b)) return null;
  const text = [(b.sale && b.sale.headline), (b.live && b.live.off)].filter(Boolean).join(' ');
  const matches = text.match(/(\d{1,3})\s*%/g);
  if(!matches || !matches.length) return null;
  const nums = matches.map(m => parseInt(m, 10)).filter(n => n > 0 && n <= 100);
  return nums.length ? Math.max(...nums) : null;
}

/* =====================================================================
   SEARCH — brand name, category, AND live-sale keywords (e.g. "polos"
   matches any brand whose current sale headline or product list
   mentions it), not just brand names.
===================================================================== */
// Whole-word match (not a raw substring) so a query like "shirt" can't
// accidentally match inside an unrelated word (e.g. a product literally
// named "...Shirt-Style..." on a shoe listing). Brand names are the one
// exception - those stay substring/prefix matching, since people expect
// "khaa" to find "Khaadi".
// Matches a query against the START of a word (not the exact whole word,
// and never mid-word) - e.g. "pol" matches "Polo" and "Polyester" as the
// visitor is still typing, without the earlier bug where a raw substring
// like "shirt" could match inside an unrelated word such as
// "T-Shirt-Style-Sneaker". Anchoring only the start (dropping the
// trailing \b) is what enables live, type-ahead matching.
function wordMatch(text, q){
  if(!text) return false;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try{ return new RegExp('\\b' + escaped, 'i').test(text); }
  catch(e){ return text.toLowerCase().includes(q); }
}

function searchBrands(query){
  const q = (query || '').trim().toLowerCase();
  if(!q) return [];
  return BRANDS.map(b => {
    let reason = null;
    if(b.name.toLowerCase().includes(q)) reason = null; // plain name match, no extra label needed
    else if(wordMatch(b.category, q)) reason = `in ${b.category}`;
    else if(b.sale && b.sale.headline && wordMatch(b.sale.headline, q)) reason = `sale: "${b.sale.headline}"`;
    else if(b.live && b.live.off && wordMatch(String(b.live.off), q)) reason = `sale: ${b.live.off}`;
    else if(b.sale && Array.isArray(b.sale.products) && b.sale.products.some(p => p && p.name && wordMatch(p.name, q))){
      const p = b.sale.products.find(p => p && p.name && wordMatch(p.name, q));
      reason = `has "${p.name}" on sale`;
    } else if(b.description && wordMatch(b.description, q)) reason = 'in description';
    else return null;
    return { brand: b, reason };
  }).filter(Boolean);
}

/* =====================================================================
   ACCOUNTS — real email + password authentication via Firebase
   Authentication (a free Google service built for exactly this). No
   password is ever seen, stored, or checked by BrandGali's own code —
   Firebase's servers do that, the same way OneSignal's servers (not
   this file) hold push subscriptions. This needs a one-time setup:
   see SETUP-ACCOUNTS.md. Until FIREBASE_CONFIG below has a real
   project's values, the account modal says so plainly instead of
   pretending to work.
   After a successful sign-up/login we also call OneSignal.login(email)
   + OneSignal.User.addEmail(email), unchanged from before, so
   follows/alerts stay tied to the same email and carry over to a
   future app using the same OneSignal App ID.
===================================================================== */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCEwnVpZzu4Fu89M1pSTfyK1duoPCQfD7A",
  authDomain: "brandgali-66b34.firebaseapp.com",
  projectId: "brandgali-66b34",
};
function isFirebaseConfigured(){
  return !!(FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith('YOUR-'));
}
let _firebaseAuth = null;
function getFirebaseAuth(){
  if(_firebaseAuth) return _firebaseAuth;
  if(typeof firebase === 'undefined' || !isFirebaseConfigured()) return null;
  if(!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  _firebaseAuth = firebase.auth();
  return _firebaseAuth;
}
function getAccountEmail(){
  const auth = getFirebaseAuth();
  return (auth && auth.currentUser) ? auth.currentUser.email : null;
}
function firebaseErrorMessage(err){
  const map = {
    'auth/email-already-in-use': 'That email already has an account — try logging in instead.',
    'auth/invalid-email': "That doesn't look like a valid email.",
    'auth/weak-password': 'Use at least 6 characters for your password.',
    'auth/user-not-found': 'No account found with that email — try signing up instead.',
    'auth/wrong-password': 'Wrong password — try again or reset it below.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/too-many-requests': 'Too many attempts — wait a bit and try again.',
  };
  return (err && map[err.code]) || (err && err.message) || 'Something went wrong — try again.';
}
async function syncFollowIdentityToOneSignal(email){
  const OneSignal = window.__oneSignalInstance;
  if(!OneSignal || !email) return;
  try{ await OneSignal.login(email); await OneSignal.User.addEmail(email); }
  catch(e){ /* alerts just stay device-only until OneSignal is ready */ }
}

let accountModalMode = 'login'; // 'login' | 'signup'

function accountModalHTML(){
  return `<div class="account-backdrop" id="accountBackdrop"></div>
  <div class="account-modal" id="accountModal" role="dialog" aria-modal="true" aria-label="Sign up or log in">
    <button class="account-close" id="accountClose" type="button" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <div id="accountModalBody"></div>
  </div>`;
}
function accountNotConfiguredHTML(){
  return `
    <h3>Accounts aren't set up yet</h3>
    <p class="account-sub">BrandGali's owner hasn't connected the account system yet — see SETUP-ACCOUNTS.md.</p>`;
}
function accountLoggedOutHTML(errorMsg){
  const isSignup = accountModalMode === 'signup';
  return `
    <h3>${isSignup ? 'Sign Up' : 'Log In'}</h3>
    <p class="account-sub">${isSignup ? 'Create an account to sync your follows here and, later, in the BrandGali app.' : 'Welcome back.'}</p>
    ${errorMsg ? `<p class="account-error">${errorMsg}</p>` : ''}
    <input type="email" id="accountEmailInput" placeholder="you@example.com" autocomplete="email">
    <input type="password" id="accountPasswordInput" placeholder="Password" autocomplete="${isSignup ? 'new-password' : 'current-password'}">
    ${isSignup ? `<input type="password" id="accountPasswordConfirm" placeholder="Confirm password" autocomplete="new-password">` : ''}
    <button class="btn btn-block" id="accountSubmitBtn" type="button">${isSignup ? 'Create Account' : 'Log In'} &rarr;</button>
    ${!isSignup ? `<a href="#" class="account-link" id="forgotPasswordLink">Forgot password?</a>` : ''}
    <p class="account-switch">${isSignup ? 'Already have an account?' : "Don't have an account?"} <a href="#" id="accountModeSwitch">${isSignup ? 'Log In' : 'Sign Up'}</a></p>`;
}
function accountLoggedInHTML(email){
  return `
    <h3>My Account</h3>
    <p class="account-sub">Signed in as <b>${email}</b>. Your follows sync to this email.</p>
    <label class="account-toggle"><input type="checkbox" id="emailAlertsToggle"> Also send sale alerts to my email</label>
    <button class="btn btn-block" id="accountLogoutBtn" type="button">Log Out</button>`;
}
async function refreshAccountModalUI(errorMsg){
  const body = document.getElementById('accountModalBody');
  if(!body) return;
  if(!isFirebaseConfigured()){ body.innerHTML = accountNotConfiguredHTML(); return; }
  const email = getAccountEmail();
  body.innerHTML = email ? accountLoggedInHTML(email) : accountLoggedOutHTML(errorMsg);
  document.querySelectorAll('.account-btn').forEach(btn => btn.classList.toggle('signed-in', !!email));
  wireAccountModalBodyEvents();
  if(email){
    const toggle = document.getElementById('emailAlertsToggle');
    if(toggle){
      try{ toggle.checked = localStorage.getItem('brandgali_email_alerts') === 'yes'; }catch(e){}
      toggle.addEventListener('change', () => { try{ localStorage.setItem('brandgali_email_alerts', toggle.checked ? 'yes' : 'no'); }catch(e){} });
    }
  }
}
function wireAccountModalBodyEvents(){
  document.getElementById('accountModeSwitch')?.addEventListener('click', (e) => {
    e.preventDefault();
    accountModalMode = accountModalMode === 'signup' ? 'login' : 'signup';
    refreshAccountModalUI();
  });
  document.getElementById('forgotPasswordLink')?.addEventListener('click', async (e) => {
    e.preventDefault();
    const auth = getFirebaseAuth();
    const email = (document.getElementById('accountEmailInput').value || '').trim();
    if(!email){ refreshAccountModalUI('Enter your email above first, then tap "Forgot password?" again.'); return; }
    try{ await auth.sendPasswordResetEmail(email); alert(`Password reset email sent to ${email}.`); refreshAccountModalUI(); }
    catch(err){ refreshAccountModalUI(firebaseErrorMessage(err)); }
  });
  document.getElementById('accountSubmitBtn')?.addEventListener('click', async () => {
    const auth = getFirebaseAuth();
    const email = (document.getElementById('accountEmailInput').value || '').trim();
    const password = document.getElementById('accountPasswordInput').value || '';
    if(!email || !email.includes('@')){ refreshAccountModalUI('Enter a valid email.'); return; }
    if(!password){ refreshAccountModalUI('Enter your password.'); return; }
    if(accountModalMode === 'signup'){
      const confirmVal = document.getElementById('accountPasswordConfirm').value || '';
      if(password !== confirmVal){ refreshAccountModalUI("Passwords don't match."); return; }
      if(password.length < 6){ refreshAccountModalUI('Use at least 6 characters for your password.'); return; }
      try{ await auth.createUserWithEmailAndPassword(email, password); await syncFollowIdentityToOneSignal(email); refreshAccountModalUI(); }
      catch(err){ refreshAccountModalUI(firebaseErrorMessage(err)); }
    } else {
      try{ await auth.signInWithEmailAndPassword(email, password); await syncFollowIdentityToOneSignal(email); refreshAccountModalUI(); }
      catch(err){ refreshAccountModalUI(firebaseErrorMessage(err)); }
    }
  });
  document.getElementById('accountLogoutBtn')?.addEventListener('click', async () => {
    const auth = getFirebaseAuth();
    try{ await auth.signOut(); }catch(e){}
    const OneSignal = window.__oneSignalInstance;
    if(OneSignal){ try{ await OneSignal.logout(); }catch(e){} }
    accountModalMode = 'login';
    refreshAccountModalUI();
  });
}
function wireAccountUI(){
  document.body.insertAdjacentHTML('beforeend', accountModalHTML());
  const modal = document.getElementById('accountModal');
  const backdrop = document.getElementById('accountBackdrop');
  const open = () => { modal.classList.add('open'); backdrop.classList.add('open'); refreshAccountModalUI(); };
  const close = () => { modal.classList.remove('open'); backdrop.classList.remove('open'); };
  document.querySelectorAll('.account-btn').forEach(btn => btn.addEventListener('click', open));
  document.getElementById('accountClose')?.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  const auth = getFirebaseAuth();
  if(auth){
    auth.onAuthStateChanged((user) => {
      document.querySelectorAll('.account-btn').forEach(btn => btn.classList.toggle('signed-in', !!user));
      if(modal.classList.contains('open')) refreshAccountModalUI();
      // Keeps OneSignal's identity in sync with Firebase on every page
      // load - not just at the moment of signing in - so a returning
      // visitor's follows/alerts work without having to log in again.
      if(user && user.email){ syncFollowIdentityToOneSignal(user.email); }
      refreshNotifyButtonsUI();
    });
  }
  window.addEventListener('brandgali:open-account', open);
  // Covers the reverse ordering too - if OneSignal finishes loading
  // AFTER Firebase already reported a signed-in user, this re-runs the
  // identity sync once OneSignal is actually ready to receive it.
  window.addEventListener('brandgali:onesignal-ready', () => {
    const currentUser = auth && auth.currentUser;
    if(currentUser && currentUser.email){ syncFollowIdentityToOneSignal(currentUser.email); }
  });
}

// Renders the "Verified Brand" / "Not yet verified" trust badge — always
// honest about current state, never assumes verification that hasn't run.
function verifiedBadgeHTML(b){
  if(b.verified){
    return `<span class="trust-badge trust-yes"><i class="fa-solid fa-circle-check"></i> Verified</span>`;
  }
  return `<span class="trust-badge trust-pending"><i class="fa-solid fa-circle-question"></i> Not yet verified</span>`;
}

// Renders the physical-store list for a brand's page, or an honest empty state.
function storesListHTML(b){
  if(!b.stores || !b.stores.length){
    return `<p class="empty-note">Store locations for ${b.name} aren't in BrandGali's directory yet. This brand may still have physical stores — check their official site.</p>`;
  }
  return b.stores.map(s => `<div class="store-row">
      <i class="fa-solid fa-location-dot"></i>
      <div>
        <div class="store-city">${s.city}${s.area ? ' - ' + s.area : ''}</div>
        ${s.address ? `<div class="store-addr">${s.address}</div>` : ''}
        ${s.hours ? `<div class="store-hours">${s.hours}</div>` : ''}
        ${s.phone ? `<div class="store-phone"><a href="tel:${s.phone}">${s.phone}</a></div>` : ''}
        ${s.mapUrl ? `<a class="store-map-link" href="${s.mapUrl}" target="_blank" rel="noopener">Open in Maps &rarr;</a>` : ''}
      </div>
    </div>`).join('');
}

// "Report incorrect information" — opens a pre-filled email. Swap for a
// real form (see spec doc) once BrandGali has a backend.
function reportIncorrectLinkHTML(b){
  const subject = encodeURIComponent(`Correction: ${b.name} on BrandGali`);
  const body = encodeURIComponent(`Brand: ${b.name} (${b.id})\nWhat's incorrect: \nWhat it should be: \n`);
  return `<a class="report-link" href="mailto:info@brandgali.com?subject=${subject}&body=${body}"><i class="fa-solid fa-flag"></i> Report incorrect information</a>`;
}

// Relative "X ago" / "in X" phrasing shared by the sale-window helpers
// below - fine-grained under a day (e.g. "18h 30m"), coarser above it.
function relativeDuration(ms){
  const abs = Math.abs(ms);
  const mins = Math.round(abs / 60000);
  if(mins < 1) return 'moments';
  if(mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if(hrs < 24) return remMins ? `${hrs}h ${remMins}m` : `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'}`;
}

// Shows the sale's real start/end timing pulled from the brand's own
// site, in plain relative language ("Started 2 days ago", "Ends in 18h
// 30m") - only when that data genuinely exists. If neither a start nor
// an end date was found, this renders nothing at all (no "checked X ago"
// fallback, no guessing).
function saleWindowHTML(b){
  if(!b.sale) return '';
  const start = b.sale.startDate ? new Date(b.sale.startDate) : null;
  const end = b.sale.endDate ? new Date(b.sale.endDate) : null;
  const parts = [];
  if(start && !isNaN(start)){
    const ms = Date.now() - start.getTime();
    parts.push(ms >= 0 ? `Started ${relativeDuration(ms)} ago` : `Starts in ${relativeDuration(ms)}`);
  }
  if(end && !isNaN(end)){
    const ms = end.getTime() - Date.now();
    parts.push(ms > 0 ? `Ends in ${relativeDuration(ms)}` : `Ended ${relativeDuration(ms)} ago`);
  }
  if(!parts.length) return '';
  return `<p class="sale-window"><i class="fa-solid fa-calendar-days"></i> ${parts.join(' &middot; ')}</p>`;
}

// Small "Ends in Xh Xm" chip for the headline row - only when a real end
// date exists and hasn't already passed.
function saleCountdownHTML(b){
  if(!b.sale || !b.sale.endDate) return '';
  const end = new Date(b.sale.endDate);
  if(isNaN(end)) return '';
  const ms = end.getTime() - Date.now();
  if(ms <= 0) return '';
  return `<span class="countdown-chip"><i class="fa-solid fa-hourglass-half"></i> Ends in ${relativeDuration(ms)}</span>`;
}

// Online / Physical / Both — based purely on whether we have store data.
// Never claims a brand has physical stores unless `stores` says so.
function availabilityLabel(b){
  return (b.stores && b.stores.length) ? 'Online &amp; In-Store' : 'Online';
}

// Fetches sales-status.json (kept fresh automatically by scraper.js, or
// manually via admin.html) and merges each brand's current status/live
// data into the BRANDS array above. Call this once, before rendering
// anything, and render only after the returned promise resolves — see
// the "Init" section at the bottom of index.html / brands.html.
//
// If the file is missing or fails to load for any reason, the page still
// works fine — every brand simply shows no sale/new badge, nothing breaks.
// Fetches sales-status.json (kept fresh automatically by scraper.js, or
// manually via admin.html) and merges each brand's current status/live
// data into the BRANDS array above. Call this once, before rendering
// anything, and render only after the returned promise resolves — see
// the "Init" section at the bottom of index.html / brands.html.
//
// If the file is missing or fails to load for any reason, the page still
// works fine — every brand simply shows no sale/new badge, nothing breaks.
async function loadSalesStatus(){
  try{
    const res = await fetch('sales-status.json', { cache: 'no-store' });
    if(!res.ok) return;
    const statusMap = await res.json();
    window.SALES_STATUS = statusMap;
    BRANDS.forEach(b => {
      const entry = statusMap[b.id];
      if(entry){
        b.status = entry.status || null;
        b.live = entry.live || null;
        b.sale = entry.sale || null;
        b.saleCheckedAt = entry.checkedAt || null;
        b.newArrival = !!entry.newArrival;
        // General (non-sale) product showcase for brand.html - real
        // products read from the brand's own site by the daily check,
        // shown regardless of sale status. Empty array when none found -
        // never invented.
        b.products = entry.products || [];
        b.productsSourceUrl = entry.productsSourceUrl || null;
      }
    });
  }catch(e){
    // no sales-status.json yet, or offline — fine, page still works
    console.warn('Could not load sales-status.json, showing brands with no sale badges.', e);
  }
}

/* =====================================================================
   CLICK TRACKING (Google Analytics 4)
   ---------------------------------------------------------------------
   One listener, attached once, catches every click on a brand link
   anywhere on the site — Top Picks, mega menu, live sales strip, the
   ticker, the brands.html directory grid, and search results — and
   reports it to GA4 as a "brand_click" event.

   This does NOT slow down or interfere with the click itself; the
   visitor's tap still opens the brand's site immediately. It also does
   nothing at all if GA4 hasn't loaded for any reason (ad blockers,
   offline testing, etc.) — the site keeps working either way.

   Every brand link that should be tracked needs these HTML attributes
   (already added to every render function below):
     data-gtm-brand    -> brand.id
     data-gtm-name     -> brand.name
     data-gtm-category -> brand.category
     data-gtm-source   -> where on the site the link lives, e.g.
                           "top_picks", "mega_menu", "live_sales",
                           "ticker", "directory_grid", "search"

   To see this data in Google Analytics:
     1. Set up the property at analytics.google.com, get your Measurement
        ID (looks like G-ABC1234XYZ), and paste it into the <head> of
        BOTH index.html and brands.html (two placeholders each).
     2. In GA4, go to Admin -> Custom definitions -> Create custom
        dimension, and register these four EVENT-scoped dimensions with
        these exact names: brand_id, brand_name, brand_category,
        click_source. Until you do this, GA4 still collects the data,
        but you can't build reports grouped by it.
     3. Build reports in Looker Studio (lookerstudio.google.com),
        connected to this GA4 property — per-brand detail, category
        comparison, and "date range A vs date range B" (e.g. sale week
        vs normal week) are all built into Looker Studio's standard
        report tools once the data above is flowing in.
===================================================================== */
document.addEventListener('click', function(e){
  var link = e.target.closest('[data-gtm-brand]');
  if(link && typeof gtag === 'function'){
    gtag('event', 'brand_click', {
      brand_id: link.dataset.gtmBrand,
      brand_name: link.dataset.gtmName,
      brand_category: link.dataset.gtmCategory,
      click_source: link.dataset.gtmSource,
      transport_type: 'beacon' // makes sure the event is sent even though the visitor is navigating away
    });
  }
});

/* =====================================================================
   SALE ALERTS — "Notify Me" per-brand opt-in (OneSignal, email only)
   ---------------------------------------------------------------------
   Lets a logged-in visitor tap "Notify Me" on any brand's card to get a
   real email the moment scraper.js detects that brand's sale going
   live. Free to run (OneSignal's free tier), no server of your own
   needed. There is no browser push notification anywhere in this flow
   - alerts are email-only, and following a brand requires being logged
   in (see the ACCOUNTS section) since that's what gives OneSignal a
   real email address to send to.

   HOW IT WORKS, END TO END:
   1. Visitor logs in (or signs up) via the account modal.
   2. That calls OneSignal.login(email) + OneSignal.User.addEmail(email)
      - ties this browser's OneSignal identity to a real email address.
   3. Visitor taps "Notify Me" on e.g. Khaadi's card. We tag that
      identity in OneSignal as follow_khaadi = true. No browser
      permission prompt of any kind.
   4. Each day, scraper.js checks every brand's site. The moment a brand's
      status flips from "no sale" to "sale live" (not while it CONTINUES,
      only the moment it STARTS), scraper.js calls OneSignal's API and
      says "email everyone tagged follow_khaadi".
   5. OneSignal emails everyone tagged - no push, no browser dependency,
      works identically on iPhone, Android and desktop.

   ONE-TIME SETUP NEEDED (see SETUP-EMAIL-ALERTS.md for full detail):
     - Free account at onesignal.com, create a "Web" app for brandgali.com
     - Turn ON the Email channel in OneSignal (Settings -> Messaging -> Email)
     - Paste your real App ID into the <head> of every page that already
       has it (already done - only needs changing if you create a new
       OneSignal app)
     - Add ONESIGNAL_APP_ID and ONESIGNAL_API_KEY as GitHub repo secrets,
       and reference them in .github/workflows/check-sales.yml so
       scraper.js can actually send the email (see that file's comments,
       and SETUP-EMAIL-ALERTS.md, for the exact snippet)
     - Firebase Authentication also needs to be set up (SETUP-ACCOUNTS.md)
       since following a brand requires being logged in

   HONESTY NOTE: email deliverability depends on OneSignal's sending
   setup (a verified sending domain gives far better inbox placement
   than OneSignal's shared default domain) - see SETUP-EMAIL-ALERTS.md.
   Unlike the old push-based approach, this works identically on every
   device and browser, including iPhone in plain Safari - no Home Screen
   step required.
===================================================================== */

function notifyButtonHTML(brand){
  return `<button class="notify-btn" data-notify-brand="${brand.id}" data-notify-name="${brand.name}" aria-pressed="false" type="button" title="Get an email the moment ${brand.name} goes on sale - log in required">
    <i class="fa-solid fa-bell"></i> <span class="notify-label">Notify Me</span>
  </button>`;
}

function updateNotifyButtonUI(btn, isFollowing){
  btn.setAttribute('aria-pressed', isFollowing ? 'true' : 'false');
  btn.classList.toggle('following', isFollowing);
  var label = btn.querySelector('.notify-label');
  if(label) label.textContent = isFollowing ? 'Following' : 'Notify Me';
}

// Syncs every "Notify Me" button on the current page with whatever this
// visitor is already subscribed to. Safe to call multiple times — does
// nothing if OneSignal hasn't finished loading yet.
async function refreshNotifyButtonsUI(){
  var OneSignal = window.__oneSignalInstance;
  if(!OneSignal || !OneSignal.User) return;
  try{
    var tags = await OneSignal.User.getTags();
    document.querySelectorAll('.notify-btn[data-notify-brand]').forEach(function(btn){
      var id = btn.dataset.notifyBrand;
      var isFollowing = !!(tags && tags['follow_' + id] === 'true');
      updateNotifyButtonUI(btn, isFollowing);
    });
  }catch(e){
    // OneSignal not ready yet, or blocked — buttons just stay in their default state
  }
}

function wireNotifyButtons(){
  document.body.addEventListener('click', async function(e){
    var btn = e.target.closest('.notify-btn[data-notify-brand]');
    if(!btn) return;
    e.preventDefault();

    // Following a brand requires being logged in - that's what gives
    // OneSignal a real email address to send sale alerts to. No browser
    // push permission is ever requested; alerts go out by email only.
    var email = getAccountEmail();
    if(!email){
      window.dispatchEvent(new Event('brandgali:open-account'));
      return;
    }

    var OneSignal = window.__oneSignalInstance;
    if(!OneSignal){
      alert('Notifications are still loading — please try again in a moment.');
      return;
    }

    var id = btn.dataset.notifyBrand;
    var tagKey = 'follow_' + id;
    var currentlyFollowing = btn.classList.contains('following');

    try{
      if(currentlyFollowing){
        await OneSignal.User.removeTag(tagKey);
        updateNotifyButtonUI(btn, false);
        return;
      }
      // Idempotent - makes sure this browser's OneSignal identity really
      // is tied to the logged-in email before tagging, even if the
      // onAuthStateChanged sync from page load hasn't finished yet.
      await syncFollowIdentityToOneSignal(email);
      await OneSignal.User.addTag(tagKey, 'true');
      updateNotifyButtonUI(btn, true);
      window.dispatchEvent(new Event('brandgali:followed'));
    }catch(err){
      alert('Something went wrong turning on alerts. Please try again.');
    }
  });

  // Sync button state as soon as OneSignal finishes loading (fired from
  // the OneSignalDeferred init block in index.html / brands.html <head>)
  window.addEventListener('brandgali:onesignal-ready', refreshNotifyButtonsUI);
}

