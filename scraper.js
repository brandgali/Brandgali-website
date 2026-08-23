/* =====================================================================
   SCRAPER — checks every brand's website for a live sale, once a day.

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
   - If no match is found: clears any previous "sale" status for that
     brand (so an ended sale disappears from the site on its own).
     A manually-set "new" (New Arrival) status is left alone, since
     the scraper only ever looks for sales, not new-arrival wording.
   - Writes everything to sales-status.json, which the website reads
     on every page load

   HONESTY NOTE: this is keyword-based detection, not a perfect
   understanding of each website. It will occasionally miss a real sale
   (if a brand phrases it unusually, or hides it behind JavaScript that
   doesn't appear in the raw page source) or flag a false positive (a
   brand mentioning "student discount" year-round, for example). Treat
   it as a strong first pass that removes almost all the daily manual
   checking — spot-check the results occasionally rather than trusting
   it as 100% infallible.
===================================================================== */

const fs = require('fs');
const path = require('path');

const BRANDS_DATA_PATH = path.join(__dirname, 'brands-data.js');
const OUTPUT_PATH = path.join(__dirname, 'sales-status.json');

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

function extractBrandsFromDataFile(){
  const content = fs.readFileSync(BRANDS_DATA_PATH, 'utf8');
  const match = content.match(/const BRANDS = \[([\s\S]*?)\n\];/);
  if(!match) throw new Error('Could not find BRANDS array in brands-data.js');
  const block = match[1];

  const entries = [];
  const entryRegex = /\{\s*id:'([^']+)'[^}]*?url:'([^']*)'[^}]*?\}/g;
  let m;
  while((m = entryRegex.exec(block)) !== null){
    entries.push({ id: m[1], url: m[2] });
  }
  return entries;
}

function isScrapable(url){
  if(!url || url === '#') return false;
  if(url.includes('instagram.com')) return false;
  if(!url.startsWith('http')) return false;
  return true;
}

async function fetchWithTimeout(url, ms){
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try{
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
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

    // tidy up the snippet a bit
    snippet = snippet.replace(/^[a-z]*\s/i, m => m); // no-op, kept simple on purpose
    if(snippet.length > 70) snippet = snippet.slice(0, 70).trim() + '…';
    return snippet;
  }
  return null;
}

async function checkBrand(brand){
  try{
    const res = await fetchWithTimeout(brand.url, 12000);
    if(!res.ok) return { id: brand.id, ok: false, reason: `HTTP ${res.status}` };
    const html = await res.text();
    const text = stripHtml(html);
    const snippet = findSaleSnippet(text);
    if(snippet){
      return { id: brand.id, ok: true, hasSale: true, snippet };
    }
    return { id: brand.id, ok: true, hasSale: false };
  }catch(e){
    return { id: brand.id, ok: false, reason: e.message };
  }
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

    if(result.hasSale){
      console.log(`  🔥 ${brand.id}: sale detected — "${result.snippet}"`);
      results[brand.id] = {
        status: 'sale',
        live: { off: result.snippet, ends: 'Check site for current details', percent: 60 },
        checkedAt: now,
        source: 'auto',
      };
    } else {
      const prev = existing[brand.id];
      if(prev && prev.status === 'new' && prev.source === 'manual'){
        // don't clobber a manually-set "New Arrival" badge — scraper only handles sales
        console.log(`  ·  ${brand.id}: no sale found, keeping manual "New Arrival" status`);
        results[brand.id] = prev;
      } else {
        console.log(`  -  ${brand.id}: no sale found`);
        // simply omit — no entry means no badge shown
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
