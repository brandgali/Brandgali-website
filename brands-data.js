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
  { id:'khaadi',        name:'Khaadi',               category:'Clothing', url:'https://www.khaadi.com/',       initial:'K', color:'orange', featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'kiji',          name:'Kiji',                 category:'Clothing', url:'https://kijiretail.com/',       initial:'K', color:'teal',   featured:false }, // VERIFY category — generic name/domain, confirm what they actually sell
  { id:'kottonfruit',   name:'Kotton Fruit',         category:'Clothing', url:'https://www.kottonfruit.com/',  initial:'K', color:'navy',   featured:false },
  { id:'lakhany',       name:'Lakhany',              category:'Clothing', url:'https://lakhanyonline.com/',    initial:'L', color:'orange', featured:false }, // renamed from "Lakhany Home" and moved from Kitchen & Accessories
  { id:'limelight',     name:'Limelight',            category:'Clothing', url:'https://www.limelight.pk/',     initial:'L', color:'teal',   featured:false, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'}] },
  { id:'lunaoutlet',    name:'Luna Outlet',          category:'Clothing', url:'https://luna-outlet.com/',      initial:'L', color:'navy',   featured:false },
  { id:'luso',          name:'Luso',                 category:'Clothing', url:'https://www.luso.com.pk/',      initial:'L', color:'orange', featured:false },
  { id:'mabsh',         name:'Mabsh',                category:'Clothing', url:'https://mabsh.pk/',             initial:'M', color:'teal',   featured:false },
  { id:'madofficial',   name:'MAD Official',         category:'Clothing', url:'https://madofficialstore.shop/', initial:'M', color:'navy',  featured:false }, // VERIFY — a couple similarly-named stores exist, confirm this is the right one
  { id:'mahhi',         name:'Mahhi',                category:'Clothing', url:'https://mahhi.com.pk/',         initial:'M', color:'orange', featured:false },
  { id:'nayadour',      name:'Naya Dour',            category:'Clothing', url:'https://nayadour.co/',          initial:'N', color:'teal',   featured:false },
  { id:'ninefigures',   name:'Nine Figures',         category:'Clothing', url:'https://ninefigures.com/',      initial:'N', color:'navy',   featured:false },
  { id:'outfitters',    name:'Outfitters',           category:'Clothing', url:'https://outfitters.com.pk/',    initial:'O', color:'teal',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'raiment61',     name:'Raiment61',            category:'Clothing', url:'https://raiment61.com/',        initial:'R', color:'navy',   featured:false },
  { id:'sanasafinaz',   name:'Sana Safinaz',         category:'Clothing', url:'https://www.sanasafinaz.com/',  initial:'S', color:'orange', featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'sapphire',      name:'Sapphire',             category:'Clothing', url:'https://pk.sapphireonline.pk/', initial:'S', color:'teal',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'shaffer',       name:'Shaffer',              category:'Clothing', url:'https://shaffer.store/',        initial:'S', color:'navy',   featured:false }, // VERIFY category — confirm what they sell
  { id:'sohasultan',    name:'Soha Sultan',          category:'Clothing', url:'https://sohasultan.com/',       initial:'S', color:'orange', featured:false },
  { id:'thecottonleaf', name:'The Cotton Leaf',      category:'Clothing', url:'https://thecottonleaf.pk/',     initial:'T', color:'teal',   featured:false },
  { id:'dirtylaundry',  name:'The Dirty Laundry',    category:'Clothing', url:'https://www.thedirtylaundry.pk/', initial:'T', color:'navy', featured:false },
  { id:'wearhype',      name:'Wear Hype',            category:'Clothing', url:'https://wearhype.co/',          initial:'W', color:'navy',   featured:false },
  { id:'wearlowkey',    name:'Wear Lowkey',          category:'Clothing', url:'https://lowkeypk.com/',         initial:'W', color:'orange', featured:false },
  { id:'zahstudio',     name:'Zah Studio',           category:'Clothing', url:'https://zahstudio.com.pk/',     initial:'Z', color:'teal',   featured:false },
  { id:'zephyrwaleed',  name:'Zephyr by Waleed',     category:'Clothing', url:'https://zephyrbywaleed.com/',   initial:'Z', color:'navy',   featured:false },

  // ---- Footwear (alphabetical) ----
  { id:'borjan',      name:'Borjan',      category:'Footwear', url:'https://www.borjan.com.pk/',  initial:'B', color:'navy',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },
  { id:'fhsofficial', name:'FHS Official', category:'Footwear', url:'https://fhsofficial.com/',   initial:'F', color:'orange', featured:false },
  { id:'giorgiovanti',name:'Giorgio Vanti',category:'Footwear', url:'https://giorgiovanti.com/',  initial:'G', color:'teal',   featured:false },
  { id:'inmysaaz',    name:'In My Saaz',  category:'Footwear', url:'https://saazstore.com/',      initial:'I', color:'navy',   featured:false },
  { id:'jutay',       name:'Jutay',       category:'Footwear', url:'https://jutay.co/',           initial:'J', color:'orange', featured:false }, // VERIFY category — "Jutay" means shoes, reasonably confident but confirm
  { id:'ndure',       name:'Ndure',       category:'Footwear', url:'https://www.ndure.com/',      initial:'N', color:'teal',   featured:false },
  { id:'onedegree',   name:'One Degree',  category:'Footwear', url:'https://onedegree.com.pk/',   initial:'O', color:'navy',   featured:false },
  { id:'servis',      name:'Servis',      category:'Footwear', url:'https://servis.pk/',          initial:'S', color:'orange', featured:false, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'},{city:'Multan'}] },
  { id:'stylo',       name:'Stylo',       category:'Footwear', url:'https://stylo.pk/',           initial:'S', color:'teal',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'},{city:'Rawalpindi'}] },
  { id:'tsmandco',    name:'TSM & Co',    category:'Footwear', url:'https://www.tsmco.com.pk/',   initial:'T', color:'navy',   featured:false },

  // ---- Home Décor (alphabetical) ----
  { id:'chenone',     name:'ChenOne',       category:'Home Décor', url:'https://chenone.com/',              initial:'C', color:'navy',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'},{city:'Faisalabad'}] },
  { id:'cosmodecor',  name:'Cosmo Décor',   category:'Home Décor', url:'https://www.cosmodecorpk.com/',     initial:'C', color:'orange', featured:false },
  { id:'homeshopping',name:'Home Shopping', category:'Home Décor', url:'https://www.homeshopping.pk/',      initial:'H', color:'teal',   featured:false }, // VERIFY url
  { id:'interwood',   name:'Interwood',     category:'Home Décor', url:'https://interwood.pk/',             initial:'I', color:'navy',   featured:true, stores:[{city:'Karachi'},{city:'Lahore'},{city:'Islamabad'}] },

  // ---- Lifestyle (alphabetical) ----
  { id:'alfatah',     name:'Al-Fatah',      category:'Lifestyle', url:'https://alfatah.pk/',     initial:'A', color:'navy',   featured:false, stores:[{city:'Karachi'},{city:'Lahore'}] }, // VERIFY url
  { id:'chasevalue',  name:'Chase Value',   category:'Lifestyle', url:'https://chasevalue.pk/',  initial:'C', color:'orange', featured:false },
  { id:'naheed',      name:'Naheed',        category:'Lifestyle', url:'https://www.naheed.pk/',  initial:'N', color:'teal',   featured:false, stores:[{city:'Karachi'}] },

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
BRANDS.forEach(b => { b.status = null; b.live = null; b.sale = null; b.saleCheckedAt = null; });

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

// A brand can be BOTH on sale AND have new arrivals at once - these are
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
function searchBrands(query){
  const q = (query || '').trim().toLowerCase();
  if(!q) return [];
  return BRANDS.map(b => {
    let reason = null;
    if(b.name.toLowerCase().includes(q)) reason = null; // plain name match, no extra label needed
    else if(b.category.toLowerCase().includes(q)) reason = `in ${b.category}`;
    else if(b.sale && b.sale.headline && b.sale.headline.toLowerCase().includes(q)) reason = `sale: "${b.sale.headline}"`;
    else if(b.live && b.live.off && String(b.live.off).toLowerCase().includes(q)) reason = `sale: ${b.live.off}`;
    else if(b.sale && Array.isArray(b.sale.products) && b.sale.products.some(p => p && p.name && p.name.toLowerCase().includes(q))){
      const p = b.sale.products.find(p => p && p.name && p.name.toLowerCase().includes(q));
      reason = `has "${p.name}" on sale`;
    } else if(b.description && b.description.toLowerCase().includes(q)) reason = 'in description';
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
  authDomain: "http://brandgali-66b34.firebaseapp.com",
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
    auth.onAuthStateChanged(() => {
      document.querySelectorAll('.account-btn').forEach(btn => btn.classList.toggle('signed-in', !!auth.currentUser));
      if(modal.classList.contains('open')) refreshAccountModalUI();
    });
  }
  window.addEventListener('brandgali:followed', () => {
    if(getAccountEmail()) return;
    try{
      if(localStorage.getItem('brandgali_account_prompted') === 'yes') return;
      localStorage.setItem('brandgali_account_prompted', 'yes');
    }catch(e){}
    setTimeout(open, 700);
  });
}

// Renders the "Verified Brand" / "Not yet verified" trust badge — always
// honest about current state, never assumes verification that hasn't run.
function verifiedBadgeHTML(b){
  if(b.verified){
    const d = b.verifiedDate ? ` on ${b.verifiedDate}` : '';
    return `<span class="trust-badge trust-yes"><i class="fa-solid fa-circle-check"></i> Verified Brand${d}</span>`;
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
   PUSH NOTIFICATIONS — "Notify Me" per-brand opt-in (OneSignal)
   ---------------------------------------------------------------------
   Lets a visitor tap "Notify Me" on any brand's card to get a real push
   notification the moment scraper.js detects that brand's sale going
   live. Free to run (OneSignal's free tier), no server of your own
   needed.

   HOW IT WORKS, END TO END:
   1. Visitor taps "Notify Me" on e.g. Khaadi's card.
   2. Browser shows its native "Allow notifications?" prompt (first time
      only, then remembered).
   3. Once allowed, we tag that visitor in OneSignal as follow_khaadi = true.
      Nothing else changes for them — no account, no email, no login.
   4. Each day, scraper.js checks every brand's site. The moment a brand's
      status flips from "no sale" to "sale live" (not while it CONTINUES,
      only the moment it STARTS), scraper.js calls OneSignal's API and
      says "notify everyone tagged follow_khaadi".
   5. OneSignal delivers the push notification to every subscribed device.

   ONE-TIME SETUP NEEDED (see SETUP-PUSH-NOTIFICATIONS.md for full detail):
     - Free account at onesignal.com, create a "Web" app for brandgali.com
     - Paste your real App ID into the <head> of index.html AND brands.html
       (replacing YOUR-ONESIGNAL-APP-ID — must match exactly in both files)
     - Upload OneSignalSDKWorker.js to your site's root (same folder as
       index.html) — a fixed filename/location OneSignal requires
     - Add ONESIGNAL_APP_ID and ONESIGNAL_API_KEY as GitHub repo secrets,
       and reference them in .github/workflows/check-sales.yml so
       scraper.js can actually send the notification (see that file's
       comments, and SETUP-PUSH-NOTIFICATIONS.md, for the exact snippet)

   HONESTY NOTE: not every visitor will allow notifications — that's
   normal, expect a fraction of visitors to opt in, not everyone. iOS
   Safari only supports this if the visitor has added your site to their
   Home Screen first (a real limitation on iPhones specifically).
===================================================================== */

function notifyButtonHTML(brand){
  return `<button class="notify-btn" data-notify-brand="${brand.id}" data-notify-name="${brand.name}" aria-pressed="false" type="button">
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

    var OneSignal = window.__oneSignalInstance;
    if(!OneSignal){
      alert('Notifications are still loading — please try again in a moment. If this keeps happening, notifications may not be fully set up on this site yet.');
      return;
    }

    var id = btn.dataset.notifyBrand;
    var name = btn.dataset.notifyName;
    var tagKey = 'follow_' + id;
    var currentlyFollowing = btn.classList.contains('following');

    if(currentlyFollowing){
      await OneSignal.User.removeTag(tagKey);
      updateNotifyButtonUI(btn, false);
      return;
    }

    try{
      var alreadyAllowed = OneSignal.Notifications.permission;
      if(!alreadyAllowed){
        var granted = await OneSignal.Notifications.requestPermission();
        if(!granted){
          alert('Notifications are blocked for this site. To get alerts for ' + name + ', allow notifications for this site in your browser settings, then tap Notify Me again.');
          return;
        }
      }
      await OneSignal.User.addTag(tagKey, 'true');
      updateNotifyButtonUI(btn, true);
      window.dispatchEvent(new Event('brandgali:followed'));
    }catch(err){
      alert('Something went wrong turning on notifications. Please try again.');
    }
  });

  // Sync button state as soon as OneSignal finishes loading (fired from
  // the OneSignalDeferred init block in index.html / brands.html <head>)
  window.addEventListener('brandgali:onesignal-ready', refreshNotifyButtonsUI);
}


/* =====================================================================
   iOS "Add to Home Screen" NOTIFICATION NUDGE

   Why this exists: on iPhone and iPad, Apple does NOT allow a website
   open in Safari to send push notifications at all. The only way it
   works is if the visitor first saves the site to their Home Screen
   (Share -> Add to Home Screen) and then opens it from that icon.
   Tapping "Notify Me" in plain Safari therefore cannot succeed, no
   matter what permission prompt appears — so we explain the real steps
   instead of pretending a prompt is enough.

   Behaviour:
   - Shown ONLY on iPhone / iPad / iPod in Safari, and only when the
     site is NOT already running from the Home Screen.
   - Never shown on Android or desktop.
   - Shown once. "Got it" is remembered in localStorage forever.
   - A small, quiet "iPhone notifications" link is added to the footer
     so anyone can bring the guide back later.
   - Notify Me itself is untouched — this only adds an explanation.
===================================================================== */
(function(){
  var STORAGE_KEY = 'brandgali_ios_push_tip_dismissed';

  function isIosDevice(){
    var ua = navigator.userAgent || '';
    var iOldStyle = /iPhone|iPad|iPod/.test(ua) && !window.MSStream;
    // iPadOS 13+ reports itself as a Mac; a touch screen gives it away.
    var iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return iOldStyle || iPadOS;
  }

  function isIosSafari(){
    if(!isIosDevice()) return false;
    var ua = navigator.userAgent || '';
    // Rule out the in-app browsers and third-party wrappers, which have
    // their own (also unsupported) behaviour.
    if(/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(ua)) return false;
    if(/FBAN|FBAV|Instagram|Line\/|Twitter/.test(ua)) return false;
    return /Safari/.test(ua) || isStandalone();
  }

  function isStandalone(){
    return window.navigator.standalone === true ||
           (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  }

  function dismissed(){
    try{ return localStorage.getItem(STORAGE_KEY) === 'yes'; }catch(e){ return false; }
  }
  function remember(){
    try{ localStorage.setItem(STORAGE_KEY, 'yes'); }catch(e){}
  }

  function injectStyles(){
    if(document.getElementById('ios-push-tip-styles')) return;
    var css = document.createElement('style');
    css.id = 'ios-push-tip-styles';
    css.textContent = [
      '.ios-tip-backdrop{position:fixed;inset:0;background:rgba(12,18,40,0.55);z-index:9998;opacity:0;transition:opacity .25s ease;}',
      '.ios-tip-backdrop.show{opacity:1;}',
      '.ios-tip{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;background:#fff;border-radius:18px;padding:20px 18px 18px;box-shadow:0 18px 50px rgba(10,15,40,0.28);transform:translateY(140%);transition:transform .3s cubic-bezier(.2,.8,.3,1);max-width:520px;margin:0 auto;max-height:80vh;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
      '.ios-tip.show{transform:translateY(0);}',
      '.ios-tip h3{font-family:"Poppins",sans-serif;font-size:17px;margin:0 0 8px;color:#101941;}',
      '.ios-tip p{font-size:14px;line-height:1.5;color:#4B5170;margin:0 0 12px;}',
      '.ios-tip ol{position:relative;z-index:1;margin:0 0 14px 18px;padding:0;list-style:decimal;}',
      '.ios-tip li{position:static;z-index:auto;font-size:14px;line-height:1.45;color:#4B5170;margin-bottom:7px;}',
      '.ios-tip .ios-tip-share{display:inline-flex;align-items:center;gap:5px;font-weight:600;color:#101941;}',
      '.ios-tip-actions{display:flex;gap:10px;position:sticky;bottom:0;background:#fff;padding-top:8px;z-index:3;}',
      '.ios-tip-actions button{flex:1;border:0;border-radius:12px;padding:12px 14px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;}',
      '.ios-tip-got{background:#F26522;color:#fff;}',
      '.ios-tip-later{background:#EEF0F6;color:#3A3F5C;}',
      '.ios-tip-footer-link{background:none;border:0;padding:0;font:inherit;font-size:13px;color:#8A8FB0;cursor:pointer;text-decoration:underline;}',
      '.ios-tip-footer-link:hover{color:#F26522;}'
    ].join('');
    document.head.appendChild(css);
  }

  var backdropEl = null, tipEl = null;

  function closeTip(persist){
    if(persist) remember();
    if(tipEl) tipEl.classList.remove('show');
    if(backdropEl) backdropEl.classList.remove('show');
    setTimeout(function(){
      if(tipEl && tipEl.parentNode) tipEl.parentNode.removeChild(tipEl);
      if(backdropEl && backdropEl.parentNode) backdropEl.parentNode.removeChild(backdropEl);
      tipEl = null; backdropEl = null;
    }, 320);
  }

  function showTip(){
    if(tipEl) return;
    injectStyles();

    backdropEl = document.createElement('div');
    backdropEl.className = 'ios-tip-backdrop';
    backdropEl.addEventListener('click', function(){ closeTip(false); });

    tipEl = document.createElement('div');
    tipEl.className = 'ios-tip';
    tipEl.setAttribute('role', 'dialog');
    tipEl.setAttribute('aria-modal', 'true');
    tipEl.setAttribute('aria-label', 'How to get sale alerts on iPhone');
    tipEl.innerHTML =
      '<h3>Get sale alerts on your iPhone</h3>' +
      '<p>On iPhone and iPad, Apple only allows alerts once BrandGali is saved to your Home Screen. Safari on its own can\'t send them.</p>' +
      '<ol>' +
        '<li>Tap the <span class="ios-tip-share">Share <i class="fa-solid fa-arrow-up-from-bracket"></i></span> button at the bottom of Safari.</li>' +
        '<li>Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.</li>' +
        '<li>Open BrandGali from the new icon on your Home Screen.</li>' +
        '<li>Tap <strong>Notify Me</strong> on any brand and allow alerts.</li>' +
      '</ol>' +
      '<div class="ios-tip-actions">' +
        '<button type="button" class="ios-tip-later">Not now</button>' +
        '<button type="button" class="ios-tip-got">Got it</button>' +
      '</div>';

    document.body.appendChild(backdropEl);
    document.body.appendChild(tipEl);
    requestAnimationFrame(function(){
      backdropEl.classList.add('show');
      tipEl.classList.add('show');
    });

    tipEl.querySelector('.ios-tip-got').addEventListener('click', function(){ closeTip(true); });
    tipEl.querySelector('.ios-tip-later').addEventListener('click', function(){ closeTip(false); });
  }

  // Public: lets the footer link (or anything else) reopen the guide.
  window.showIosPushGuide = showTip;

  function addFooterLink(){
    if(!isIosSafari() || isStandalone()) return;
    var bar = document.querySelector('.footer-bottom');
    if(!bar || bar.querySelector('.ios-tip-footer-link')) return;
    injectStyles();
    var wrap = document.createElement('span');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ios-tip-footer-link';
    btn.textContent = 'Alerts on iPhone: how it works';
    btn.addEventListener('click', function(){ showTip(); });
    wrap.appendChild(btn);
    bar.appendChild(wrap);
  }

  function init(){
    addFooterLink();
    if(!isIosSafari()) return;      // Android + desktop: never shown
    if(isStandalone()) return;      // already added to Home Screen
    if(dismissed()) return;         // already said "Got it"
    setTimeout(showTip, 1800);      // let the page settle first
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
