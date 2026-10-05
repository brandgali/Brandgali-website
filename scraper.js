/* =====================================================================
   SCRAPER — checks every brand's website for a live sale, once a day,
   and (new) tries to collect the REAL products in that sale.

   You should not need to edit this file. It's run automatically by
   GitHub Actions (see .github/workflows/check-sales.yml) on a daily
   schedule — you don't need to run it yourself, and you don't need
   Node.js installed on your own computer for it to work.

   WHAT IT DOES:
   - Reads the brand list out of brands-data.js
   - Skips any brand whose url is '#' (no real site yet) or an
     Instagram link (can't be reliably scraped — Instagram requires a
     login to view content, so those brands are left to admin.html)
   - Visits each remaining brand's homepage and searches the visible
     text for sale-related wording (see SALE_PATTERNS below)
   - If a match is found: marks that brand as "sale", with a short
     snippet of the matching text as the discount description
   - NEW: then looks for that brand's actual sale/clearance page, opens
     it, and tries to read the real products on it — product name,
     product link, image, original price, current price and discount.
     Whatever it can read goes into sales-status.json and is shown on
     live-sales.html.
   - If no match is found: clears any previous "sale" status for that
     brand (so an ended sale disappears from the site on its own).
     A manually-set "new" (New Arrival) status is left alone.
   - NEW ARRIVALS: also looks for each brand's New Arrivals page (or,
     on Shopify stores, products published in the last 3 weeks) and
     writes newArrival / newArrivals into sales-status.json. The site
     shows a New Arrival tag from that.
   - Writes everything to sales-status.json, which the website reads
     on every page load

   NOTHING IS EVER INVENTED. This is the single most important rule in
   this file. If a brand blocks automated visits, hides its products
   behind JavaScript, or simply can't be read for any reason, the brand
   is still listed as "sale live" (so shoppers don't miss it) but with
   an empty products list and a plain-English `note` explaining that
   products couldn't be read. live-sales.html shows that note instead
   of products. No placeholder products, no stock photos, no guessed
   prices — ever.

   HONESTY NOTE: sale detection is keyword-based, not a perfect
   understanding of each website. It will occasionally miss a real sale
   (if a brand phrases it unusually, or hides it behind JavaScript that
   doesn't appear in the raw page source) or flag a false positive (a
   brand mentioning "student discount" year-round, for example). Product
   collection works best on Shopify-based stores (a large share of
   Pakistani brands) and on sites that publish standard structured
   product data; elsewhere it will often find nothing, which is handled
   gracefully. Treat it as a strong first pass that removes almost all
   the daily manual checking — spot-check the results occasionally
   rather than trusting it as 100% infallible.
===================================================================== */

const fs = require('fs');
const path = require('path');

const BRANDS_DATA_PATH = path.join(__dirname, 'brands-data.js');
const OUTPUT_PATH = path.join(__dirname, 'sales-status.json');

const MAX_PRODUCTS = 8;       // how many products to show per brand on live-sales.html
const NEW_ARRIVAL_DAYS = 21;   // a product counts as a "new arrival" if the brand published it within this many days
const REQUEST_TIMEOUT = 12000; // ms before giving up on a single page

// Phrases that indicate an active sale. Checked case-insensitively unless
// noted. Add more phrases here any time if you notice the scraper missing
// a brand's usual wording.
//
// IMPORTANT: a bare, case-insensitive match on the word "sale" was
// deliberately left OUT of this list. Almost every fashion e-commerce site
// has a permanent "Sale" link in its main navigation menu (a category page
// that always exists, discount or not) — matching on that word alone would
// falsely flag nearly every brand as having a live sale, every single day.
// The patterns below all require a more specific, higher-confidence signal
// (a percentage, a named sale event, or a genuinely shouted "SALE" in caps,
// which is far more banner-like than a quiet nav link).
const SALE_PATTERNS = [
  /\b\d{1,3}\s?%\s?(off|discount)/i,
  /flat\s?\d{1,3}\s?%/i,
  /up\s?to\s?\d{1,3}\s?%/i,
  /\bclearance\b/i,
  /\bBOGO\b/i,
  /buy\s?1\s?get\s?1/i,
  /buy\s?one\s?get\s?one/i,
  /\bmega\s?sale\b/i,
  /\bflash\s?sale\b/i,
  /\bend\s?of\s?season\b/i,
  /\bEOSS\b/i,
  /\bSALE\b/, // no 'i' flag on purpose — only matches genuinely all-caps "SALE",
              // more likely a shouted banner than a quiet lowercase/title-case nav link
];

// Words that, if found right next to a "sale"-style match, suggest it's
// NOT a real current promotion (nav links, historical blog posts, etc.)
// — keeps false positives down a little.
const NEGATIVE_CONTEXT = [
  /no\s?sale/i,
  /sale\s?(has\s?)?ended/i,
  /out\s?of\s?stock/i,
];

// Link paths that usually lead to a brand's sale/clearance listing page.
const SALE_LINK_PATTERNS = [
  /\/collections\/sale\b/i,
  /\/collections\/[a-z0-9-]*sale[a-z0-9-]*\b/i,
  /\/collections\/[a-z0-9-]*clearance[a-z0-9-]*\b/i,
  /\/collections\/[a-z0-9-]*discount[a-z0-9-]*\b/i,
  /\/sale\b/i,
  /\/clearance\b/i,
  /\/on-sale\b/i,
  /\/offers?\b/i,
  /\/deals?\b/i,
];

function extractBrandsFromDataFile(){
  const content = fs.readFileSync(BRANDS_DATA_PATH, 'utf8');
  const match = content.match(/const BRANDS = \[([\s\S]*?)\n\];/);
  if(!match) throw new Error('Could not find BRANDS array in brands-data.js');
  const block = match[1];

  const entries = [];
  const entryRegex = /\{\s*id:'([^']+)'[^}]*?name:'([^']+)'[^}]*?url:'([^']*)'[^}]*?\}/g;
  let m;
  while((m = entryRegex.exec(block)) !== null){
    entries.push({ id: m[1], name: m[2], url: m[3] });
  }
  return entries;
}

function isScrapable(url){
  if(!url || url === '#') return false;
  if(url.includes('instagram.com')) return false;
  if(!url.startsWith('http')) return false;
  return true;
}

async function fetchWithTimeout(url, ms, extraHeaders){
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms || REQUEST_TIMEOUT);
  try{
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        ...(extraHeaders || {}),
      },
      redirect: 'follow',
    });
    return res;
  } finally {
    clearTimeout(timeout);
  }
}

function stripHtml(html){
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(s){
  return String(s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

/* The matched phrase on its own (e.g. "Flat 51% Off"), tidied up for use
   as a short headline on live-sales.html. The longer surrounding snippet
   is still kept in `live.off` so nothing that relied on it changes. */
function findSaleHeadline(text){
  for(const pattern of SALE_PATTERNS){
    const match = pattern.exec(text);
    if(!match) continue;
    const nearby = text.slice(Math.max(0, match.index - 60), match.index + 60);
    if(NEGATIVE_CONTEXT.some(neg => neg.test(nearby))) continue;
    let phrase = match[0].replace(/\s+/g, ' ').trim();
    if(phrase === phrase.toUpperCase() && phrase.length > 4){
      phrase = phrase.charAt(0) + phrase.slice(1).toLowerCase();
    }
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }
  return null;
}

function findSaleSnippet(text){
  for(const pattern of SALE_PATTERNS){
    const match = pattern.exec(text);
    if(!match) continue;
    const idx = match.index;
    const start = Math.max(0, idx - 30);
    const end = Math.min(text.length, idx + match[0].length + 40);
    let snippet = text.slice(start, end).trim();

    // skip if this specific spot looks like negative context
    const nearby = text.slice(Math.max(0, idx - 60), idx + 60);
    if(NEGATIVE_CONTEXT.some(neg => neg.test(nearby))) continue;

    if(snippet.length > 70) snippet = snippet.slice(0, 70).trim() + '…';
    return snippet;
  }
  return null;
}

/* =====================================================================
   FINDING THE SALE PAGE
   Looks through the homepage's links for the most likely "sale" listing
   page. Returns an absolute URL, or null if nothing convincing is found
   (in which case the brand's homepage is used as the source link).
===================================================================== */
function findSalePageUrl(html, baseUrl){
  const hrefs = [];
  const linkRegex = /<a\b[^>]*href=["']([^"']+)["']/gi;
  let m;
  while((m = linkRegex.exec(html)) !== null){
    hrefs.push(m[1]);
  }

  for(const pattern of SALE_LINK_PATTERNS){
    for(const href of hrefs){
      if(!pattern.test(href)) continue;
      if(/\/(cart|account|login|blogs?|pages\/(privacy|terms))/i.test(href)) continue;
      try{
        const abs = new URL(decodeEntities(href), baseUrl);
        if(abs.hostname !== new URL(baseUrl).hostname) continue; // stay on the brand's own site
        abs.hash = '';
        return abs.href;
      }catch(e){ /* malformed href, ignore */ }
    }
  }
  return null;
}

/* ---------- Price sanity guard ----------
   Shopify stores with multi-currency ("Markets") quote prices in the
   VISITOR's currency, and GitHub's servers are not in Pakistan - so a
   Rs 17,700 jacket can come back as 82 (US dollars) and then get a
   "Rs" label stuck on it. Pakistani brands price in PKR, where real
   items virtually never cost under Rs 150, so if the typical price is
   tiny we know the currency is wrong and we DROP the prices rather
   than show wrong ones. The product itself (name, photo, link) is kept. */
function stripPricesIfSuspicious(products, label){
  if(!products || !products.length) return products;
  const nums = products.map(p => parseFloat(String(p.currentPrice || '').replace(/[^0-9.]/g, ''))).filter(n => isFinite(n) && n > 0).sort((a, b) => a - b);
  if(!nums.length) return products;
  const median = nums[Math.floor(nums.length / 2)];
  if(median >= 150) return products;
  console.log(`     ⚠ ${label}: prices look like a foreign currency (median ${median}) - hiding prices rather than showing wrong ones`);
  return products.map(p => ({ ...p, currentPrice: null, originalPrice: null, discount: null }));
}
// Ask Shopify for the Pakistan storefront (PKR) instead of the server's own country.
const PK_HEADERS = { 'Cookie': 'localization=PK; cart_currency=PKR', 'Accept-Language': 'en-PK,en;q=0.9' };

/* ---------- New-arrival page finder ---------- */
const NEW_LINK_PATTERNS = [/new[-_]?arrivals?/i, /\/new[-_]?in\b/i, /whats?[-_]?new/i, /just[-_]?landed/i, /latest[-_]?(arrivals|collection)/i, /\/collections\/new\/?$/i];
function findNewArrivalsUrl(html, baseUrl){
  const hrefs = [];
  const re = /<a\b[^>]*href=["']([^"']+)["']/gi;
  let m;
  while((m = re.exec(html)) !== null) hrefs.push(m[1]);
  for(const pattern of NEW_LINK_PATTERNS){
    for(const href of hrefs){
      if(!pattern.test(href)) continue;
      if(/\/(cart|account|login|blogs?|pages\/(privacy|terms))/i.test(href)) continue;
      try{
        const abs = new URL(decodeEntities(href), baseUrl);
        if(abs.hostname !== new URL(baseUrl).hostname) continue;
        abs.hash = '';
        return abs.href;
      }catch(e){ /* ignore malformed href */ }
    }
  }
  return null;
}

/* ---------- Price helpers ---------- */

function detectCurrency(html){
  if(/["']?(currency|priceCurrency)["']?\s*[:=]\s*["']PKR["']/i.test(html)) return 'Rs';
  if(/\bPKR\b/.test(html)) return 'Rs';
  if(/["']?priceCurrency["']?\s*[:=]\s*["']USD["']/i.test(html)) return '$';
  return ''; // unknown — show the bare number rather than guess a currency
}

function formatPrice(amount, currency){
  const n = Number(amount);
  if(!isFinite(n) || n <= 0) return null;
  const rounded = Math.round(n);
  const withCommas = rounded.toLocaleString('en-US');
  return currency ? `${currency} ${withCommas}` : withCommas;
}

function discountLabel(original, current){
  const o = Number(original), c = Number(current);
  if(!isFinite(o) || !isFinite(c) || o <= 0 || c <= 0 || c >= o) return null;
  const pct = Math.round((1 - c / o) * 100);
  return pct >= 1 ? `-${pct}%` : null;
}

function buildProduct({ name, url, image, original, current, currency }){
  // A product is only kept if we genuinely read a name and a link for it.
  // Everything else is optional and simply omitted when missing.
  if(!name || !url) return null;
  const p = {
    name: decodeEntities(name).slice(0, 120),
    url,
    image: image || null,
    originalPrice: (Number(original) > Number(current)) ? formatPrice(original, currency) : null,
    currentPrice: formatPrice(current, currency),
    discount: discountLabel(original, current),
  };
  return p;
}

/* =====================================================================
   PRODUCT COLLECTION — method 1: Shopify's own products.json
   A very large share of Pakistani brands run on Shopify, which publishes
   a machine-readable version of every collection at
   <collection-url>/products.json. It's the brand's own public data, and
   it gives exact titles, images, current price and compare-at (original)
   price — no guessing at all.
===================================================================== */
async function productsFromShopify(salePageUrl, currency, opts){
  opts = opts || {};
  let jsonUrl;
  try{
    const u = new URL(salePageUrl);
    if(!/\/collections\//i.test(u.pathname)) return null;
    u.pathname = u.pathname.replace(/\/$/, '') + '/products.json';
    u.search = '?limit=40&country=PK' + (opts.sort ? '&sort_by=' + opts.sort : '');
    jsonUrl = u.href;
  }catch(e){ return null; }

  try{
    const res = await fetchWithTimeout(jsonUrl, null, PK_HEADERS);
    if(!res.ok) return null;
    const ct = res.headers.get('content-type') || '';
    if(!ct.includes('json')) return null;
    const data = await res.json();
    if(!data || !Array.isArray(data.products)) return null;

    const origin = new URL(salePageUrl).origin;
    const out = [];
    const cutoff = opts.maxAgeDays ? Date.now() - opts.maxAgeDays * 86400000 : null;
    for(const prod of data.products){
      if(cutoff){
        const t = new Date(prod.published_at || prod.created_at || 0).getTime();
        if(!t || t < cutoff) continue; // too old to be a "new arrival"
      }
      // Sold-out products are skipped entirely (a shopper can't buy them).
      const variants = Array.isArray(prod.variants) ? prod.variants : [];
      const inStock = variants.filter(v => v && v.available !== false);
      if(variants.length && !inStock.length) continue;
      // Use the cheapest variant that is actually in stock, with ITS compare-at price,
      // not just whichever variant happens to be listed first.
      const variant = inStock.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price))[0] || null;
      const image = Array.isArray(prod.images) && prod.images[0] ? prod.images[0].src : null;
      const current = variant ? variant.price : null;
      const original = variant ? variant.compare_at_price : null;
      const p = buildProduct({
        name: prod.title,
        url: prod.handle ? `${origin}/products/${prod.handle}` : null,
        image,
        original,
        current,
        currency: 'Rs',
      });
      if(p) out.push(p);
      if(out.length >= MAX_PRODUCTS) break;
    }
    return (out.length || opts.maxAgeDays) ? stripPricesIfSuspicious(out, new URL(salePageUrl).hostname) : null; // with an age filter, an empty list is a real answer ("nothing new")
  }catch(e){
    return null;
  }
}

/* =====================================================================
   PRODUCT COLLECTION — method 2: structured data (JSON-LD)
   Many non-Shopify stores publish schema.org Product / ItemList data in
   the page for Google. If it's there, it's the brand's own description
   of its own products, so it's safe to use.
===================================================================== */
function productsFromJsonLd(html, pageUrl, currency){
  const blocks = [];
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while((m = regex.exec(html)) !== null){
    try{ blocks.push(JSON.parse(m[1].trim())); }catch(e){ /* malformed JSON-LD, skip */ }
  }

  const products = [];
  const visit = (node) => {
    if(!node || products.length >= MAX_PRODUCTS) return;
    if(Array.isArray(node)){ node.forEach(visit); return; }
    if(typeof node !== 'object') return;

    const type = node['@type'];
    const types = Array.isArray(type) ? type : [type];

    if(types.includes('Product')){
      const offers = Array.isArray(node.offers) ? node.offers[0] : node.offers;
      let url = node.url || (offers && offers.url) || null;
      try{ url = url ? new URL(url, pageUrl).href : null; }catch(e){ url = null; }
      let image = Array.isArray(node.image) ? node.image[0] : node.image;
      if(image && typeof image === 'object') image = image.url || image.contentUrl || null;
      try{ image = image ? new URL(image, pageUrl).href : null; }catch(e){ image = null; }

      // highPrice on an AggregateOffer is the dearest VARIANT, not an original price,
      // so it must never be treated as a "was" price. Only an explicit list/strike price counts.
      let original = null;
      const specs = offers && offers.priceSpecification ? [].concat(offers.priceSpecification) : [];
      const list = specs.find(sp => sp && /list|strike|msrp/i.test(String(sp.priceType || '')));
      if(list) original = list.price;
      const cur = offers && offers.priceCurrency;
      const pkr = cur === 'PKR' || (!cur && currency === 'Rs');
      const p = buildProduct({
        name: node.name,
        url,
        image,
        original: pkr ? original : null,
        current: pkr && offers ? (offers.price || offers.lowPrice) : null, // foreign/unknown currency -> no price shown
        currency: 'Rs',
      });
      if(p) products.push(p);
    }

    ['itemListElement', 'item', '@graph', 'mainEntity', 'hasPart'].forEach(key => {
      if(node[key]) visit(node[key]);
    });
  };
  blocks.forEach(visit);
  return products.length ? stripPricesIfSuspicious(products.slice(0, MAX_PRODUCTS), new URL(pageUrl).hostname) : null;
}

/* =====================================================================
   Collect products for one brand's sale.
   Returns { sourceUrl, products, note } — products is always an array
   (possibly empty), note explains an empty array in plain English.
===================================================================== */
async function collectSaleDetails(brand, homepageHtml){
  const salePageUrl = findSalePageUrl(homepageHtml, brand.url);
  const target = salePageUrl || brand.url;

  let html = homepageHtml;
  let fetchedSalePage = false;

  if(salePageUrl){
    try{
      const res = await fetchWithTimeout(salePageUrl);
      if(res.ok){
        html = await res.text();
        fetchedSalePage = true;
      }
    }catch(e){ /* sale page unreachable — fall back to homepage data below */ }
  }

  const currency = detectCurrency(html);

  let products = await productsFromShopify(target, currency);
  if(!products) products = productsFromJsonLd(html, target, currency);

  if(products && products.length){
    return { sourceUrl: target, products, note: null };
  }

  const note = !salePageUrl
    ? "We could not find a dedicated sale page on this brand's website, so we can't list individual products here. The sale itself is live — tap through to see everything on offer."
    : !fetchedSalePage
      ? "This brand's sale page could not be opened by our automatic check (some sites block automated visits). The sale is live — tap through to browse it directly."
      : "This brand's sale page doesn't publish product details in a way our automatic check can read. The sale is live — tap through to see everything on offer.";

  return { sourceUrl: target, products: [], note };
}

/* =====================================================================
   GENERAL PRODUCT SHOWCASE — a handful of real products from each
   brand's own site, shown on their BrandGali page (brand.html) below
   the Visit Official Site / Notify Me buttons, regardless of whether
   that brand currently has anything on sale. Same honesty rules as sale
   products: only ever real products actually read from the brand's own
   site, never invented, no stock photos, no placeholder prices.
===================================================================== */
async function collectGeneralProducts(brand, homepageHtml){
  const currency = detectCurrency(homepageHtml || '');
  let products = null;
  let sourceUrl = brand.url;

  // Most Pakistani brands on Shopify expose their full catalogue at
  // /collections/all/products.json regardless of what's linked from the
  // homepage - try that first since it's the most reliable, real data,
  // straight from the brand's own store.
  try{
    const allUrl = new URL('/collections/all', brand.url).href;
    products = await productsFromShopify(allUrl, currency);
    if(products) sourceUrl = allUrl;
  }catch(e){ /* invalid URL for this brand, skip this method */ }

  // Fall back to whatever structured product data is already published
  // on the homepage itself (schema.org Product / ItemList, meant for
  // Google - same data source used elsewhere in this file).
  if(!products && homepageHtml){
    products = productsFromJsonLd(homepageHtml, brand.url, currency);
  }

  return { sourceUrl, products: products || [] };
}

async function checkBrand(brand){
  try{
    const res = await fetchWithTimeout(brand.url);
    if(!res.ok) return { id: brand.id, ok: false, reason: `HTTP ${res.status}` };
    const html = await res.text();
    const text = stripHtml(html);
    const snippet = findSaleSnippet(text);
    if(snippet){
      return { id: brand.id, ok: true, hasSale: true, snippet, headline: findSaleHeadline(text), html };
    }
    return { id: brand.id, ok: true, hasSale: false, html };
  }catch(e){
    return { id: brand.id, ok: false, reason: e.message };
  }
}

/* =====================================================================
   SALE EMAIL — tells OneSignal to email everyone who tapped "Notify Me"
   on this specific brand, the moment its sale goes live.

   BrandGali sends alerts by email only — there is no browser push
   notification anymore. Following a brand requires being logged in
   (see brands-data.js's ACCOUNTS section), which is what gives OneSignal
   a real email address to send to via OneSignal.User.addEmail(email).

   Only ever called once per sale (see the "wasAlreadyOnSale" check in
   main() below) — followers get emailed when a sale STARTS, not once
   per day for as long as it continues.

   Needs two environment variables to actually send anything:
     ONESIGNAL_APP_ID   - from onesignal.com, Settings -> Keys & IDs
     ONESIGNAL_API_KEY  - same page, the REST API Key (keep this secret —
                           add it as a GitHub Actions secret, never commit
                           it in plain text to the repo)

   If either is missing, this silently does nothing except log a note —
   the rest of the scraper (sale detection, sales-status.json) keeps
   working normally either way.
===================================================================== */
async function sendSaleNotification(brand, snippet, landingUrl){
  const appId = process.env.ONESIGNAL_APP_ID;
  const apiKey = process.env.ONESIGNAL_API_KEY;

  if(!appId || !apiKey){
    console.log(`  (sale email skipped for ${brand.id} — ONESIGNAL_APP_ID / ONESIGNAL_API_KEY not set)`);
    return;
  }

  const shopUrl = landingUrl || brand.url;
  const bodyText = snippet ? snippet : 'A new sale just went live — check it out before it ends.';

  try{
    const res = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        app_id: appId,
        // Only reaches people tagged follow_<brandId> = 'true' - i.e.
        // people who specifically tapped "Notify Me" on this brand while
        // logged in. No `contents`/`headings` fields here on purpose -
        // those are the push-notification fields; providing only
        // email_subject/email_body sends this as an email, never a push.
        filters: [{ field: 'tag', key: `follow_${brand.id}`, relation: '=', value: 'true' }],
        channel_for_external_user_ids: 'email',
        email_subject: `${brand.name}'s sale is live!`,
        email_body: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;">
            <h2 style="color:#1B2A5E;">${brand.name}'s sale is live</h2>
            <p style="color:#333;font-size:15px;line-height:1.5;">${bodyText}</p>
            <p style="margin:24px 0;">
              <a href="${shopUrl}" style="background:#F08A1E;color:#fff;padding:12px 22px;border-radius:30px;text-decoration:none;font-weight:bold;">Shop The Sale &rarr;</a>
            </p>
            <p style="color:#999;font-size:12px;">You're getting this because you followed ${brand.name} on BrandGali. Unfollow any time from the brand's page.</p>
          </div>`,
      }),
    });
    const data = await res.json();
    if(data.errors){
      console.log(`  ⚠ sale email for ${brand.id} failed:`, JSON.stringify(data.errors));
    } else {
      console.log(`  📧 sale email sent for ${brand.id} (${data.recipients ?? 0} recipients)`);
    }
  }catch(e){
    console.log(`  ⚠ sale email for ${brand.id} errored:`, e.message);
  }
}

/* =====================================================================
   NEW ARRIVALS — real products only, never invented.
   Order of attempts:
     1. A dedicated new-arrivals page linked from the homepage
        (Shopify products.json, then structured data). Anything listed
        on the brand's own "New Arrivals" page counts.
     2. Common Shopify collection names (/collections/new-arrivals ...).
     3. Shopify's newest products (/collections/all, newest first) that
        the brand published within the last NEW_ARRIVAL_DAYS days.
   Returns { ok, products, sourceUrl }. ok=false means "couldn't tell"
   (site blocked us etc.) - the caller keeps the previous result instead
   of wiping it. ok=true with no products means "checked, nothing new".
===================================================================== */
async function collectNewArrivals(brand, homepageHtml){
  const currency = detectCurrency(homepageHtml || '');
  const tryUrl = async (u) => {
    let p = await productsFromShopify(u, currency);
    if(!p){
      try{
        const res = await fetchWithTimeout(u);
        if(res.ok) p = productsFromJsonLd(await res.text(), u, currency);
      }catch(e){ /* ignore */ }
    }
    return p && p.length ? p : null;
  };

  // 1. dedicated page linked from the homepage
  const linked = homepageHtml ? findNewArrivalsUrl(homepageHtml, brand.url) : null;
  if(linked){
    const p = await tryUrl(linked);
    if(p) return { ok: true, products: p, sourceUrl: linked };
  }
  // 2. usual Shopify collection handles
  for(const handle of ['new-arrivals', 'new-arrival', 'new-in', 'new', 'just-landed']){
    let u; try{ u = new URL('/collections/' + handle, brand.url).href; }catch(e){ break; }
    const p = await productsFromShopify(u, currency);
    if(p && p.length) return { ok: true, products: p, sourceUrl: u };
  }
  // 3. newest products that are genuinely recent
  try{
    const allUrl = new URL('/collections/all', brand.url).href;
    const fresh = await productsFromShopify(allUrl, currency, { sort: 'created-descending', maxAgeDays: NEW_ARRIVAL_DAYS });
    if(fresh) return { ok: true, products: fresh.slice(0, MAX_PRODUCTS), sourceUrl: allUrl };
  }catch(e){ /* fall through */ }

  return { ok: false, products: [], sourceUrl: null };
}

async function main(){
  const brands = extractBrandsFromDataFile();
  const scrapable = brands.filter(b => isScrapable(b.url));
  console.log(`Checking ${scrapable.length} of ${brands.length} brands (others skipped: '#' placeholder or Instagram-only)...`);

  let existing = {};
  if(fs.existsSync(OUTPUT_PATH)){
    try{ existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8')); }catch(e){ existing = {}; }
  }

  const results = {};
  // copy over any entries the scraper doesn't touch (Instagram-only / '#' brands,
  // and anything manually set via admin.html) so they aren't wiped out
  for(const [id, entry] of Object.entries(existing)){
    const brand = brands.find(b => b.id === id);
    if(!brand || !isScrapable(brand.url)){
      results[id] = entry;
    }
  }

  // check scrapable brands one at a time with a short delay, to be a polite,
  // low-load visitor rather than hammering every site at once
  for(const brand of scrapable){
    const result = await checkBrand(brand);
    const now = new Date().toISOString();

    if(!result.ok){
      console.log(`  ⚠ ${brand.id}: could not check (${result.reason}) — leaving previous status as-is`);
      if(existing[brand.id]) results[brand.id] = existing[brand.id];
      continue;
    }

    // General product showcase for brand.html - collected every run,
    // regardless of sale status. If this particular run can't find any
    // (site temporarily blocked us, catalogue endpoint down, etc.) we
    // keep whatever was found on a previous successful run rather than
    // wiping out real products just because of a transient miss.
    const general = await collectGeneralProducts(brand, result.html);
    const previousProducts = (existing[brand.id] && existing[brand.id].products) || [];
    const previousProductsUrl = (existing[brand.id] && existing[brand.id].productsSourceUrl) || null;
    const productsForOutput = general.products.length ? general.products : previousProducts;
    const productsSourceForOutput = general.products.length ? general.sourceUrl : (previousProductsUrl || general.sourceUrl);
    if(general.products.length){
      console.log(`     ↳ ${general.products.length} general product(s) read from ${general.sourceUrl}`);
    }

    // New arrivals - collected every run, sale or not.
    const prevEntry = existing[brand.id] || {};
    const arr = await collectNewArrivals(brand, result.html);
    let arrivalFields;
    if(arr.ok){
      arrivalFields = { newArrival: arr.products.length > 0, newArrivals: arr.products, newArrivalsSourceUrl: arr.sourceUrl };
      if(arr.products.length) console.log(`     ↳ ${arr.products.length} new arrival(s) from ${arr.sourceUrl}`);
    } else {
      // couldn't tell today - keep whatever we knew before rather than flip-flopping
      arrivalFields = { newArrival: !!prevEntry.newArrival, newArrivals: prevEntry.newArrivals || [], newArrivalsSourceUrl: prevEntry.newArrivalsSourceUrl || null };
    }
    // a New Arrival badge set by hand in admin.html is never cleared by the scraper
    if(prevEntry.source === 'manual' && prevEntry.newArrival) arrivalFields.newArrival = true;

    if(result.hasSale){
      const wasAlreadyOnSale = existing[brand.id] && existing[brand.id].status === 'sale';
      console.log(`  🔥 ${brand.id}: sale detected — "${result.snippet}"`);

      const details = await collectSaleDetails(brand, result.html);
      if(details.products.length){
        console.log(`     ↳ ${details.products.length} product(s) read from ${details.sourceUrl}`);
      } else {
        console.log(`     ↳ no product details available (${details.note})`);
      }

      results[brand.id] = {
        status: 'sale',
        // `live` is kept exactly as before so the homepage, directory and
        // any older code keep working unchanged.
        live: { off: result.snippet, ends: 'Check site for current details', percent: 60 },
        // `sale` is the new, richer block used by live-sales.html.
        sale: {
          headline: result.headline || result.snippet,
          sourceUrl: details.sourceUrl,
          products: details.products,
          productsFound: details.products.length,
          note: details.note,
        },
        // General (non-sale) catalogue products - shown on brand.html
        // under Visit Official Site / Notify Me, sale or no sale.
        products: productsForOutput,
        productsSourceUrl: productsSourceForOutput,
        ...arrivalFields,
        checkedAt: now,
        source: 'auto',
      };

      if(!wasAlreadyOnSale){
        // sale just STARTED (wasn't on sale yesterday) — notify subscribers now.
        // If it was already on sale yesterday too, stay quiet — nobody wants a
        // repeat notification every single day a sale continues.
        await sendSaleNotification(brand, result.snippet, details.sourceUrl);
      }
    } else {
      const prev = existing[brand.id];
      if(prev && prev.status === 'new' && prev.source === 'manual'){
        // don't clobber a manually-set "New Arrival" badge — scraper only handles sales
        console.log(`  ·  ${brand.id}: no sale found, keeping manual "New Arrival" status`);
        results[brand.id] = { ...prev, products: productsForOutput, productsSourceUrl: productsSourceForOutput, ...arrivalFields, checkedAt: now };
      } else {
        console.log(`  -  ${brand.id}: no sale found`);
        if(productsForOutput.length || arrivalFields.newArrival){
          // No sale, but we do have real products to show on brand.html —
          // still worth an entry for that alone.
          results[brand.id] = {
            status: null,
            live: null,
            products: productsForOutput,
            productsSourceUrl: productsSourceForOutput,
            ...arrivalFields,
            checkedAt: now,
            source: 'auto',
          };
        }
        // otherwise simply omit — no entry means nothing to show, same as before
      }
    }

    await new Promise(r => setTimeout(r, 800)); // small politeness delay between requests
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2) + '\n');
  console.log(`\nDone. Wrote ${Object.keys(results).length} entries to sales-status.json`);
}

main().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
