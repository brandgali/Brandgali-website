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
  // ---- Clothing ----
  { id:'khaadi',      name:'Khaadi',        category:'Clothing', url:'https://www.khaadi.com/',            initial:'K', color:'orange', featured:true },
  { id:'sapphire',    name:'Sapphire',      category:'Clothing', url:'https://pk.sapphireonline.pk/',       initial:'S', color:'teal',   featured:true },
  { id:'sanasafinaz', name:'Sana Safinaz',  category:'Clothing', url:'https://www.sanasafinaz.com/',        initial:'S', color:'teal',   featured:true },
  { id:'outfitters',  name:'Outfitters',    category:'Clothing', url:'https://outfitters.com.pk/',          initial:'O', color:'navy',   featured:true },
  { id:'breakout',    name:'Breakout',      category:'Clothing', url:'https://breakout.com.pk/',            initial:'B', color:'orange', featured:false }, // VERIFY url
  { id:'limelight',   name:'Limelight',     category:'Clothing', url:'https://www.limelight.pk/',           initial:'L', color:'teal',   featured:false },

  // ---- Footwear ----
  { id:'stylo',       name:'Stylo',         category:'Footwear', url:'https://styloshoes.com/',             initial:'S', color:'orange', featured:true },
  { id:'borjan',      name:'Borjan',        category:'Footwear', url:'https://www.borjan.com.pk/',          initial:'B', color:'teal',   featured:true },
  { id:'metroshoes',  name:'Metro Shoes',   category:'Footwear', url:'https://metroshoes.com.pk/',          initial:'M', color:'navy',   featured:false }, // VERIFY url
  { id:'servis',      name:'Servis',        category:'Footwear', url:'https://servisgroup.com/',            initial:'S', color:'orange', featured:false },
  { id:'ndure',       name:'Ndure',         category:'Footwear', url:'https://www.ndure.com/',              initial:'N', color:'teal',   featured:false },

  // ---- Home Décor ----
  { id:'interwood',   name:'Interwood',     category:'Home Décor', url:'https://interwood.pk/',             initial:'I', color:'navy',   featured:true },
  { id:'chenone',     name:'ChenOne',       category:'Home Décor', url:'https://chenone.com/',              initial:'C', color:'orange', featured:true },
  { id:'homeshopping',name:'Home Shopping', category:'Home Décor', url:'https://www.homeshopping.pk/',      initial:'H', color:'teal',   featured:false }, // VERIFY url
  { id:'cosmodecor',  name:'Cosmo Décor',   category:'Home Décor', url:'#',                                  initial:'C', color:'navy',   featured:false }, // VERIFY url — placeholder, replace with real site

  // ---- Lifestyle ----
  { id:'alfatah',     name:'Al-Fatah',      category:'Lifestyle', url:'https://alfatah.pk/',                initial:'A', color:'orange', featured:false }, // VERIFY url
  { id:'chasevalue',  name:'Chase Value',   category:'Lifestyle', url:'#',                                  initial:'C', color:'teal',   featured:false }, // VERIFY url — placeholder
  { id:'naheed',      name:'Naheed',        category:'Lifestyle', url:'https://www.naheed.pk/',             initial:'N', color:'navy',   featured:false },

  // ---- Kitchen & Accessories ----
  { id:'signature',   name:'Signature',     category:'Kitchen & Accessories', url:'#', initial:'S', color:'orange', featured:false }, // VERIFY url — placeholder
  { id:'lakhany',     name:'Lakhany Home',  category:'Kitchen & Accessories', url:'#', initial:'L', color:'teal',   featured:false }, // VERIFY url — placeholder
  { id:'kitchenco',   name:'The Kitchen Co.', category:'Kitchen & Accessories', url:'#', initial:'K', color:'navy', featured:false }, // VERIFY url — placeholder

  // ---- Online-Only Clothing / Streetwear (submitted brands, no physical store) ----
  // NOTE: these are real prospective brands, not placeholders. I have NOT invented any
  // "Sale Live" / "New Arrival" status for them — that would be a false claim about a real
  // business. Update `status` / `live` / `featured` yourself once you know their actual
  // situation. A few had no findable dedicated website, so their real Instagram page is
  // used instead — these are marked VERIFY; swap in a website link if/when they get one.
  { id:'fitted',        name:'Fitted',              category:'Clothing', url:'https://instagram.com/fitted', initial:'F', color:'navy',   featured:false }, // VERIFY — Instagram-only, handle not fully confirmed
  { id:'ninefigures',   name:'Nine Figures',        category:'Clothing', url:'https://ninefigures.com/',      initial:'N', color:'orange', featured:false },
  { id:'zephyrwaleed',  name:'Zephyr by Waleed',    category:'Clothing', url:'https://zephyrbywaleed.com/',   initial:'Z', color:'teal',   featured:false },
  { id:'madofficial',   name:'MAD Official',        category:'Clothing', url:'https://madofficialstore.shop/', initial:'M', color:'navy',  featured:false }, // VERIFY — a couple similarly-named stores exist, confirm this is the right one
  { id:'raiment61',     name:'Raiment61',           category:'Clothing', url:'https://raiment61.com/',        initial:'R', color:'orange', featured:false },
  { id:'adma',          name:'Adma',                category:'Clothing', url:'https://instagram.com/adma.officialpk', initial:'A', color:'teal', featured:false }, // VERIFY — Instagram-only
  { id:'wearlowkey',    name:'Wear Lowkey',         category:'Clothing', url:'https://instagram.com/wearlowkey.pk', initial:'W', color:'navy', featured:false }, // VERIFY — Instagram-only
  { id:'luso',          name:'Luso',                category:'Clothing', url:'https://instagram.com/luso.official', initial:'L', color:'orange', featured:false }, // VERIFY — Instagram-only
  { id:'mabsh',         name:'Mabsh',               category:'Clothing', url:'https://instagram.com/mabsh.store', initial:'M', color:'teal', featured:false }, // VERIFY — Instagram-only
  { id:'wearhype',      name:'Wear Hype',           category:'Clothing', url:'https://instagram.com/wearhype', initial:'W', color:'orange', featured:false }, // VERIFY — Instagram-only
  { id:'lunaoutlet',    name:'Luna Outlet',         category:'Clothing', url:'https://instagram.com/lunaoutlet_official', initial:'L', color:'navy', featured:false }, // VERIFY — Instagram-only
  { id:'ivar',          name:'Ivar',                category:'Clothing', url:'https://instagram.com/ivar', initial:'I', color:'teal', featured:false }, // VERIFY — name too generic to confirm the right account
  { id:'nayadour',      name:'Naya Dour',           category:'Clothing', url:'https://instagram.com/naya.dour', initial:'N', color:'orange', featured:false }, // VERIFY — Instagram-only
  { id:'dirtylaundry',  name:'The Dirty Laundry',   category:'Clothing', url:'https://instagram.com/thedirtylaundry.pk', initial:'D', color:'navy', featured:false }, // VERIFY — Instagram-only

  // ---- Bags ----
  { id:'insignia',    name:'Insignia',      category:'Bags', url:'https://insignia.com.pk/',                initial:'I', color:'orange', featured:false }, // VERIFY url
  { id:'charizma',    name:'Charizma',      category:'Bags', url:'#',                                        initial:'C', color:'teal',   featured:false }, // VERIFY url — placeholder
  { id:'fiore',       name:'Fioré',         category:'Bags', url:'#',                                        initial:'F', color:'navy',   featured:false }, // VERIFY url — placeholder
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
