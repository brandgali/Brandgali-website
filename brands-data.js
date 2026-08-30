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
  { id:'breakout',      name:'Breakout',             category:'Clothing', url:'https://breakout.com.pk/',      initial:'B', color:'navy',   featured:false }, // VERIFY url
  { id:'charizma',      name:'Charizma',             category:'Clothing', url:'https://houseofcharizma.com/',  initial:'C', color:'orange', featured:false },
  { id:'dceast',        name:'DC East',              category:'Clothing', url:'https://divinelycrafted.org/',  initial:'D', color:'teal',   featured:false }, // VERIFY — handle "Dc.east" and domain name don't obviously match, confirm this is the right site
  { id:'drappy',        name:'Drappy',               category:'Clothing', url:'https://drappy.pk/',            initial:'D', color:'navy',   featured:false },
  { id:'fitted',        name:'Fitted',               category:'Clothing', url:'https://fittedshop.com/',       initial:'F', color:'teal',   featured:false },
  { id:'imhaut',        name:'IM Haut',              category:'Clothing', url:'https://imhaut.com/',           initial:'I', color:'orange', featured:false },
  { id:'ivar',          name:'Ivar',                 category:'Clothing', url:'https://ivarclothing.com/',     initial:'I', color:'navy',   featured:false },
  { id:'khaadi',        name:'Khaadi',               category:'Clothing', url:'https://www.khaadi.com/',       initial:'K', color:'orange', featured:true },
  { id:'kiji',          name:'Kiji',                 category:'Clothing', url:'https://kijiretail.com/',       initial:'K', color:'teal',   featured:false }, // VERIFY category — generic name/domain, confirm what they actually sell
  { id:'kottonfruit',   name:'Kotton Fruit',         category:'Clothing', url:'https://www.kottonfruit.com/',  initial:'K', color:'navy',   featured:false },
  { id:'lakhany',       name:'Lakhany',              category:'Clothing', url:'https://lakhanyonline.com/',    initial:'L', color:'orange', featured:false }, // renamed from "Lakhany Home" and moved from Kitchen & Accessories
  { id:'limelight',     name:'Limelight',            category:'Clothing', url:'https://www.limelight.pk/',     initial:'L', color:'teal',   featured:false },
  { id:'lunaoutlet',    name:'Luna Outlet',          category:'Clothing', url:'https://luna-outlet.com/',      initial:'L', color:'navy',   featured:false },
  { id:'luso',          name:'Luso',                 category:'Clothing', url:'https://www.luso.com.pk/',      initial:'L', color:'orange', featured:false },
  { id:'mabsh',         name:'Mabsh',                category:'Clothing', url:'https://mabsh.pk/',             initial:'M', color:'teal',   featured:false },
  { id:'madofficial',   name:'MAD Official',         category:'Clothing', url:'https://madofficialstore.shop/', initial:'M', color:'navy',  featured:false }, // VERIFY — a couple similarly-named stores exist, confirm this is the right one
  { id:'mahhi',         name:'Mahhi',                category:'Clothing', url:'https://mahhi.com.pk/',         initial:'M', color:'orange', featured:false },
  { id:'nayadour',      name:'Naya Dour',            category:'Clothing', url:'https://nayadour.co/',          initial:'N', color:'teal',   featured:false },
  { id:'ninefigures',   name:'Nine Figures',         category:'Clothing', url:'https://ninefigures.com/',      initial:'N', color:'navy',   featured:false },
  { id:'outfitters',    name:'Outfitters',           category:'Clothing', url:'https://outfitters.com.pk/',    initial:'O', color:'teal',   featured:true },
  { id:'raiment61',     name:'Raiment61',            category:'Clothing', url:'https://raiment61.com/',        initial:'R', color:'navy',   featured:false },
  { id:'sanasafinaz',   name:'Sana Safinaz',         category:'Clothing', url:'https://www.sanasafinaz.com/',  initial:'S', color:'orange', featured:true },
  { id:'sapphire',      name:'Sapphire',             category:'Clothing', url:'https://pk.sapphireonline.pk/', initial:'S', color:'teal',   featured:true },
  { id:'shaffer',       name:'Shaffer',              category:'Clothing', url:'https://shaffer.store/',        initial:'S', color:'navy',   featured:false }, // VERIFY category — confirm what they sell
  { id:'sohasultan',    name:'Soha Sultan',          category:'Clothing', url:'https://sohasultan.com/',       initial:'S', color:'orange', featured:false },
  { id:'thecottonleaf', name:'The Cotton Leaf',      category:'Clothing', url:'https://thecottonleaf.pk/',     initial:'T', color:'teal',   featured:false },
  { id:'dirtylaundry',  name:'The Dirty Laundry',    category:'Clothing', url:'https://www.thedirtylaundry.pk/', initial:'T', color:'navy', featured:false },
  { id:'wearhype',      name:'Wear Hype',            category:'Clothing', url:'https://wearhype.co/',          initial:'W', color:'navy',   featured:false },
  { id:'wearlowkey',    name:'Wear Lowkey',          category:'Clothing', url:'https://lowkeypk.com/',         initial:'W', color:'orange', featured:false },
  { id:'zahstudio',     name:'Zah Studio',           category:'Clothing', url:'https://zahstudio.com.pk/',     initial:'Z', color:'teal',   featured:false },
  { id:'zephyrwaleed',  name:'Zephyr by Waleed',     category:'Clothing', url:'https://zephyrbywaleed.com/',   initial:'Z', color:'navy',   featured:false },

  // ---- Footwear (alphabetical) ----
  { id:'borjan',      name:'Borjan',      category:'Footwear', url:'https://www.borjan.com.pk/',  initial:'B', color:'navy',   featured:true },
  { id:'fhsofficial', name:'FHS Official', category:'Footwear', url:'https://fhsofficial.com/',   initial:'F', color:'orange', featured:false },
  { id:'giorgiovanti',name:'Giorgio Vanti',category:'Footwear', url:'https://giorgiovanti.com/',  initial:'G', color:'teal',   featured:false },
  { id:'inmysaaz',    name:'In My Saaz',  category:'Footwear', url:'https://saazstore.com/',      initial:'I', color:'navy',   featured:false },
  { id:'jutay',       name:'Jutay',       category:'Footwear', url:'https://jutay.co/',           initial:'J', color:'orange', featured:false }, // VERIFY category — "Jutay" means shoes, reasonably confident but confirm
  { id:'ndure',       name:'Ndure',       category:'Footwear', url:'https://www.ndure.com/',      initial:'N', color:'teal',   featured:false },
  { id:'onedegree',   name:'One Degree',  category:'Footwear', url:'https://onedegree.com.pk/',   initial:'O', color:'navy',   featured:false },
  { id:'servis',      name:'Servis',      category:'Footwear', url:'https://servis.pk/',          initial:'S', color:'orange', featured:false },
  { id:'stylo',       name:'Stylo',       category:'Footwear', url:'https://stylo.pk/',           initial:'S', color:'teal',   featured:true },
  { id:'tsmandco',    name:'TSM & Co',    category:'Footwear', url:'https://www.tsmco.com.pk/',   initial:'T', color:'navy',   featured:false },

  // ---- Home Décor (alphabetical) ----
  { id:'chenone',     name:'ChenOne',       category:'Home Décor', url:'https://chenone.com/',              initial:'C', color:'navy',   featured:true },
  { id:'cosmodecor',  name:'Cosmo Décor',   category:'Home Décor', url:'https://www.cosmodecorpk.com/',     initial:'C', color:'orange', featured:false },
  { id:'homeshopping',name:'Home Shopping', category:'Home Décor', url:'https://www.homeshopping.pk/',      initial:'H', color:'teal',   featured:false }, // VERIFY url
  { id:'interwood',   name:'Interwood',     category:'Home Décor', url:'https://interwood.pk/',             initial:'I', color:'navy',   featured:true },

  // ---- Lifestyle (alphabetical) ----
  { id:'alfatah',     name:'Al-Fatah',      category:'Lifestyle', url:'https://alfatah.pk/',     initial:'A', color:'navy',   featured:false }, // VERIFY url
  { id:'chasevalue',  name:'Chase Value',   category:'Lifestyle', url:'https://chasevalue.pk/',  initial:'C', color:'orange', featured:false },
  { id:'naheed',      name:'Naheed',        category:'Lifestyle', url:'https://www.naheed.pk/',  initial:'N', color:'teal',   featured:false },

  // ---- Kitchen & Accessories ----
  { id:'bhojascollection', name:'Bhojas Collection', category:'Kitchen & Accessories', url:'https://www.bhojascollections.com/', initial:'B', color:'teal', featured:false },

  // ---- Bags (alphabetical) ----
  { id:'fiore',       name:'Fioré',      category:'Bags', url:'https://fioure.com/',     initial:'F', color:'navy',   featured:false }, // category not fully confirmed — check this is actually a bags brand
  { id:'insignia',    name:'Insignia',   category:'Bags', url:'https://insignia.com.pk/', initial:'I', color:'orange', featured:false }, // VERIFY url
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
BRANDS.forEach(b => { b.status = null; b.live = null; });

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
    BRANDS.forEach(b => {
      const entry = statusMap[b.id];
      if(entry){
        b.status = entry.status || null;
        b.live = entry.live || null;
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

