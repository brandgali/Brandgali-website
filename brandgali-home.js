/* brandgali-home.js - the new homepage layout (hero banners, floating category tiles, sections).
   Loaded by index.html after brandgali-ui.js. Image slots: see IMAGES-GUIDE.md */
(function(){
const css = `
#oldPopular,#categories,#near-me,.hero{display:none!important}
.hs-tabs{position:absolute;left:-9999px}
#liveSalesRail{padding-top:2px}
#live-sales-section .section-head h2{font:800 19px Poppins,sans-serif!important;text-transform:uppercase;letter-spacing:.4px}
#live-sales-section .section-head h2 i{display:none}
.al-band{margin:34px 16px 6px!important;background:#FAF7F0!important;border:0!important;border-radius:28px!important;padding:26px!important}
.al-band h4{font:800 20px Poppins,sans-serif!important}
.hm-pills .chip.fol{background:#1B2A5E;color:#fff;border-color:#1B2A5E}
.hm-hero{display:grid;gap:12px;padding:10px 16px 4px;grid-template-columns:1fr 1fr}
.hb{position:relative;border-radius:22px;overflow:hidden;min-height:132px;padding:18px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;background-size:cover;background-position:center;text-shadow:0 1px 8px rgba(0,0,0,.25)}
.hb.big{grid-column:1/-1;min-height:190px}.hb b{font:800 20px/1.15 Poppins,sans-serif}.hb small{font-size:12.5px;opacity:.95}
.hb span{align-self:flex-start;margin-top:8px;background:#fff;color:var(--navy);border-radius:999px;padding:8px 14px;font:800 12px Inter,sans-serif;text-shadow:none}
.hb.b1{background-image:url(images/hero-live.jpg),url(images/hero-live.svg),linear-gradient(135deg,#1B2A5E,#3A4F9A)}
.hb.b2{background-image:url(images/hero-new.jpg),url(images/hero-new.svg),linear-gradient(135deg,#C9822B,#E8A33D)}
.hb.b3{background-image:url(images/hero-sale.jpg),url(images/hero-sale.svg),linear-gradient(135deg,#2F7F63,#52B08C)}
.ctiles{display:flex;gap:12px;overflow-x:auto;padding:14px 16px 8px;scrollbar-width:none}.ctiles::-webkit-scrollbar{display:none}
.ct{flex:none;width:92px;text-align:center;background:#fff;border-radius:20px;box-shadow:0 8px 22px rgba(27,42,94,.10);padding:9px;color:var(--navy)}
.ct-img{height:68px;border-radius:14px;background-size:cover;background-position:center;display:grid;place-items:center;font-size:24px;background-color:#F4EFE3}
.ct b{display:block;font:700 12px Inter,sans-serif;margin-top:8px}
.hm-pills{display:flex;gap:8px;overflow-x:auto;padding:8px 16px;scrollbar-width:none}.hm-pills::-webkit-scrollbar{display:none}
.hm-pills .chip{flex:none;white-space:nowrap;border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 15px;font:600 12.5px Inter,sans-serif;color:var(--navy);cursor:pointer}
.hm-sec{padding:26px 16px 0}
.hm-sh{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.hm-sh h2{font:800 19px Poppins,sans-serif;letter-spacing:.4px;color:var(--navy);text-transform:uppercase;margin:0}
.hm-tab{border:1px solid var(--line);background:#fff;border-radius:999px;padding:7px 14px;font:700 12px Inter,sans-serif;color:var(--navy);cursor:pointer}.hm-tab.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.hm-sh .va{margin-left:auto;font:700 12px Inter,sans-serif;text-decoration:underline;color:var(--navy)}
.bt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.bt{background:#fff;border:1px solid var(--line);border-radius:20px;padding:14px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--navy)}
.bt b{font:800 13px Poppins,sans-serif}.bt small{font-size:11px;color:var(--orange-deep);font-weight:700}.bt small.m{color:var(--muted)}
.dod{display:grid;gap:12px}.dod-b{border-radius:22px;padding:22px;color:#fff;background:linear-gradient(135deg,#1B2A5E,#3A4F9A);display:flex;flex-direction:column;gap:8px;align-items:flex-start;justify-content:center;min-height:200px}
.dod-b b{font:800 22px Poppins,sans-serif}.dod-b a{background:#E8A33D;color:var(--navy);border-radius:999px;padding:10px 18px;font:800 13px Inter,sans-serif}
.dod .hc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
@media(min-width:900px){
 #live-sales-section{max-width:1200px;margin-left:auto!important;margin-right:auto!important;padding:38px 32px 0!important}#live-sales-section .section-head h2{font-size:24px!important}
 .al-band{max-width:1136px;margin:44px auto 10px!important;padding:34px 44px!important}
 .hm-hero{grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;padding:18px 32px 4px;max-width:1200px;margin:0 auto}
 .hb.big{grid-column:1;grid-row:1/3;min-height:340px}.hb{padding:26px}.hb b{font-size:26px}.hb.big b{font-size:34px}
 .ctiles{max-width:1200px;margin:0 auto;padding:22px 32px 8px;overflow:visible;gap:16px}.ct{flex:1;width:auto}.ct-img{height:96px}.ct b{font-size:13px}
 .hm-pills,.hm-sec{max-width:1200px;margin-left:auto;margin-right:auto}.hm-pills{padding:10px 32px;flex-wrap:wrap}.hm-sec{padding:38px 32px 0}.hm-sh h2{font-size:24px}
 .bt-grid{grid-template-columns:repeat(6,1fr);gap:14px}.dod{grid-template-columns:1fr 2fr}.dod .hc-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
}
`;
const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
const st2 = document.createElement('style'); st2.textContent = `
.hm-hero{gap:8px!important;padding:8px 16px 2px!important}
.hb{min-height:78px!important;padding:11px 14px!important;border-radius:16px!important;gap:2px!important}.hb.big{min-height:104px!important}
.hb b{font-size:14.5px!important}.hb.big b{font-size:18px!important}.hb small{font-size:10.5px!important}.hb span{margin-top:5px!important;padding:5px 11px!important;font-size:10.5px!important}
.ctiles{padding:10px 16px 4px!important}.ct{width:78px!important;padding:7px!important;border-radius:16px!important}.ct-img{height:54px!important;font-size:20px!important}.ct b{font-size:11px!important;margin-top:6px!important}
#live-sales-section .section-head h2{font:800 14.5px Poppins,sans-serif!important;letter-spacing:.4px!important}#live-sales-section .section-head a{font-size:11px!important}
.hm-sec{padding-top:20px!important}.hm-sh{margin-bottom:10px!important;flex-wrap:nowrap!important;gap:6px!important}.hm-sh h2{font-size:14.5px!important;white-space:nowrap}.hm-tab{padding:5px 9px!important;font-size:11px!important}.hm-sh .va{font-size:11px!important;white-space:nowrap}
.bt-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:8px!important}.bt{padding:9px 4px!important;border-radius:16px!important;gap:4px!important}.bt b{font-size:11px!important}.bt small{font-size:9.5px!important}
.dod{gap:8px!important}.dod-b{min-height:0!important;padding:14px!important;gap:5px!important;border-radius:18px!important;flex-direction:row!important;align-items:center!important;flex-wrap:wrap}.dod-b b{font-size:16px!important}.dod-b a{padding:7px 14px!important;font-size:12px!important;margin-left:auto}
.dod .hc-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
.al-band{margin:14px 16px 2px!important;padding:14px!important;border-radius:20px!important}.al-band h4{font-size:15px!important}.al-band p{font-size:12px!important;margin-top:2px!important}.al-band .ic{width:34px!important;height:34px!important}.al-band .btn{margin-top:8px!important;padding:10px!important;font-size:13px!important;min-height:0!important}
@media(min-width:900px){
 .hm-hero{gap:14px!important;padding:16px 32px 4px!important}.hb{min-height:104px!important;padding:20px!important}.hb.big{min-height:220px!important}.hb b{font-size:20px!important}.hb.big b{font-size:28px!important}.hb small{font-size:13px!important}
 .ct{width:auto!important}.ct-img{height:84px!important}.ct b{font-size:13px!important}
 #live-sales-section .section-head h2{font-size:22px!important}.hm-sh h2{font-size:22px!important}.bt-grid{grid-template-columns:repeat(8,minmax(0,1fr))!important;gap:12px!important}.bt b{font-size:13px!important}
 .dod{grid-template-columns:1fr 2fr!important}.dod-b{flex-direction:column!important;align-items:flex-start!important;min-height:190px!important}.dod-b a{margin-left:0!important}.dod .hc-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
 .al-band{padding:20px 32px!important;max-width:1136px;margin:30px auto 6px!important}
}`; document.head.appendChild(st2);

const HOME_OK = /cushion|vase|lamp|rug|carpet|curtain|bed ?sheet|comforter|quilt|duvet|pillow|decor|frame|mirror|candle|throw|blanket|towel|sofa|table|chair|stool|planter|clock|basket|shelf|wall|light|bed\b|mattress|wardrobe|dinner|plate|mug|bowl|jar|tray|organi[sz]er|storage box|diffuser/i;
const NOT_HOME = new RegExp(BAD_ITEMS.source + '|unstitched|\\bsuit\\b|kurta|shirt|lawn|dress|shalwar|dupatta|frock|trouser|storage bag', 'i');
const TILES = [['Women','fa-person-dress','brands.html?aud=women','#E8EDF7'],['Men','fa-person','brands.html?aud=men','#E3EFE9'],['Kids','fa-child','brands.html?aud=kids','#FDF1DE'],
  ['Beauty','fa-spray-can-sparkles','brands.html?category=Cosmetics','#F3E6F0'],['Footwear','fa-shoe-prints','brands.html?category=Footwear','#EDEFF5'],
  ['Home Decor','fa-couch','brands.html?category=' + encodeURIComponent('Home Décor'),'#F4EFE3'],['Kitchen','fa-kitchen-set','brands.html?category=' + encodeURIComponent('Kitchen & Accessories'),'#E8F2EC'],
  ['Bags','fa-bag-shopping','brands.html?category=Bags','#FBEAE0'],['Lifestyle','fa-star','brands.html?category=Lifestyle','#EEF0E2']];

function allItems(){
  const out = [], seen = new Set();
  BRANDS.forEach(b => [brandProducts(b), b.newArrivalProducts || [], b.products || []].forEach((arr, src) => arr.forEach(p => {
    if(!p || !p.name || !p.url || seen.has(p.url)) return; seen.add(p.url);
    out.push({ b, p, src, off: productOffPct(cleanPriced(b, p)) || 0, aud: itemAud(b, p) });
  })));
  return out;
}
const COLORS = /\b(black|white|blue|navy|red|green|grey|gray|beige|brown|pink|yellow|orange|purple|maroon|olive|cream|ivory|tan|khaki|mustard|teal|multi|charcoal|camel|burgundy|golden|silver|peach|mint|lilac|sky|off)\b/g;
const baseName = n => String(n || '').toLowerCase().replace(/\s[-–|].*$/, '').replace(COLORS, '').replace(/\s+/g, ' ').trim();
// Shows a MIX: one product per style (not the same item in five colours), taking turns between brands.
function diversify(list, limit){
  const seen = new Set(), byBrand = new Map();
  list.forEach(i => { const k = i.b.id + '|' + baseName(i.p.name); if(seen.has(k)) return; seen.add(k); if(!byBrand.has(i.b.id)) byBrand.set(i.b.id, []); byBrand.get(i.b.id).push(i); });
  const q = [...byBrand.values()], out = [];
  while(out.length < limit && q.some(x => x.length)) q.forEach(x => { if(x.length && out.length < limit) out.push(x.shift()); });
  return out;
}
function prodSection(host, title, items, link, tabbed){
  if(items.length < 2) return;
  const sec = document.createElement('section'); sec.className = 'hm-sec';
  const tabs = tabbed ? ['women', 'men', 'kids'].filter(t => items.some(i => i.aud === t)) : [];
  let cur = tabs[0]; const max = matchMedia('(min-width:900px)').matches ? 12 : 8;
  sec.innerHTML = `<div class="hm-sh"><h2>${title}</h2>${tabs.map(t => `<button class="hm-tab" data-t="${t}" type="button">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}<a class="va" href="${link}">VIEW ALL</a></div><div class="hc-grid"></div>`;
  const draw = () => {
    const list = diversify(cur ? items.filter(i => i.aud === cur) : items, max);
    sec.querySelector('.hc-grid').innerHTML = list.map(i => homeCard(i.b, i.p)).join('');
    sec.querySelectorAll('.hm-tab').forEach(t => t.classList.toggle('on', t.dataset.t === cur));
  };
  sec.querySelectorAll('.hm-tab').forEach(t => t.addEventListener('click', () => { cur = t.dataset.t; draw(); }));
  draw(); host.appendChild(sec);
}
function brandSection(host, title, list, link){
  if(!list.length) return;
  const sec = document.createElement('section'); sec.className = 'hm-sec';
  sec.innerHTML = `<div class="hm-sh"><h2>${title}</h2><a class="va" href="${link}">VIEW ALL</a></div><div class="bt-grid">${list.slice(0, matchMedia('(min-width:900px)').matches ? 8 : 8).map(b => { const p = getMaxDiscountPercent(b); return `<a class="bt" href="brand.html?id=${b.id}">${brandBadgeHTML(b, 44)}<b>${b.name}</b>${isSaleLive(b) && p ? `<small>Up to ${p}% off</small>` : `<small class="m">${b.category}</small>`}</a>`; }).join('')}</div>`;
  host.appendChild(sec);
}
function catSection(host, items, title, cat, link, test, exclude){
  const mine = items.filter(i => i.b.category === cat && (!test || test.test(i.p.name)) && !(exclude && exclude.test(i.p.name))).sort((a, b) => b.off - a.off);
  if(mine.length >= 2) prodSection(host, title, mine, link, false);
  else brandSection(host, title, BRANDS.filter(b => b.category === cat), link);
}
/* If a tile has no uploaded photo (images/cat-*.jpg), show a real product picture from that category.
   These are the brands' own product images, linked straight from their sites (never copied or stored by us). */
function applyTilePhotos(tiles, items){
  const CLOTH = /kurta|shirt|frock|suit|dress|shalwar|kameez|trouser|jeans|jacket|tee|polo|hoodie|sweat|shorts|pants|tunic|kurti|abaya|coat|gown|lawn|co-ord|cardigan|top\b/i;
    const BAG = /\b(bag|tote|backpack|clutch|purse|satchel|wallet|handbag)\b/i;
  const test = { Women: i => i.aud === 'women' && i.b.category === 'Clothing' && CLOTH.test(i.p.name), Men: i => i.aud === 'men' && i.b.category === 'Clothing' && CLOTH.test(i.p.name),
    Kids: i => i.aud === 'kids' && i.b.category === 'Clothing' && CLOTH.test(i.p.name) && !BAD_ITEMS.test(i.p.name), Beauty: i => i.b.category === 'Cosmetics', Footwear: i => i.b.category === 'Footwear',
    'Home Decor': i => i.b.category === 'Home Décor' && !NOT_HOME.test(i.p.name) && HOME_OK.test(i.p.name), Kitchen: i => i.b.category === 'Kitchen & Accessories' && !BAD_ITEMS.test(i.p.name),
    Bags: i => BAG.test(i.p.name) || i.b.category === 'Bags', Lifestyle: i => i.b.category === 'Lifestyle' };
  tiles.querySelectorAll('.ct').forEach(a => {
    const k = a.dataset.k, box = a.querySelector('.ct-img'), probe = new Image();
    probe.onload = () => { box.querySelector('i') && (box.querySelector('i').style.display = 'none'); };      // your own photo found
    probe.onerror = () => {                                                                                      // none uploaded: use a product picture
      const pool = items.filter(i => i.p.image && test[k] && test[k](i)).sort((x, y) => y.off - x.off).slice(0, 6), pick = pool[Math.floor(Date.now() / 864e5) % (pool.length || 1)];
      if(pick){ const img = safeUrl(pick.p.image); if(img){ box.style.backgroundImage = `url("${img}")`; const ic = box.querySelector('i'); if(ic) ic.style.display = 'none'; } }
    };
    probe.src = `images/cat-${k.toLowerCase().replace(/\s/g, '-')}.jpg`;
  });
}
window.renderNewHome = function(){
  const top = document.getElementById('newHomeTop'), rest = document.getElementById('newHomeRest'); if(!top || !rest) return;
  top.innerHTML = ''; rest.innerHTML = '';
  const live = BRANDS.filter(isSaleLive), news = BRANDS.filter(isNewArrival), maxOff = Math.max(0, ...BRANDS.map(b => getMaxDiscountPercent(b) || 0));
  const hero = document.createElement('div'); hero.className = 'hm-hero';
  hero.innerHTML = `<a class="hb big b1" href="live-sales.html"><b>${live.length} sales live now</b><small>Follow a brand and get alerted the minute its sale starts.</small><span>See live sales</span></a>
    <a class="hb b2" href="brands.html?filter=new"><b>New in</b><small>${news.length} brand${news.length === 1 ? '' : 's'} with new arrivals</small></a>
    <a class="hb b3" href="live-sales.html"><b>${maxOff ? 'Up to ' + maxOff + '% off' : 'Sale'}</b><small>Biggest discounts today</small></a>`;
  top.appendChild(hero);
  const tiles = document.createElement('div'); tiles.className = 'ctiles';
  tiles.innerHTML = TILES.map(t => `<a class="ct" data-k="${t[0]}" href="${t[2]}"><div class="ct-img" style="background-image:url(images/cat-${t[0].toLowerCase().replace(/\s/g, '-')}.jpg);background-color:#fff"><i class="fa-solid ${t[1]}"></i></div><b>${t[0]}</b></a>`).join('');
  top.appendChild(tiles);
  const pl = popularList(8), pills = document.createElement('div'); pills.className = 'hm-pills';
  pills.innerHTML = '<span class="chip fol" id="folChip">&#9829; My Followed (' + getFollows().length + ')</span>' + pl.disc.concat(pl.items).map(s => `<span class="chip" data-q="${s[3]}">${s[0]}</span>`).join('');
  pills.addEventListener('click', e => { const c = e.target.closest('.chip'); if(!c) return; if(c.id === 'folChip'){ const t = document.querySelector('.hs-tab[data-tab="fol"]'); if(t) t.click(); window.scrollTo(0, 0); } else openSearchWith(c.dataset.q); });
  top.appendChild(pills);
  const live2 = document.querySelector('#live-sales-section h2'); if(live2) live2.innerHTML = '<i class="fa-solid fa-fire"></i> BrandGali Live Sales';

  const items = allItems();
  applyTilePhotos(tiles, items);
  const byOff = items.filter(i => i.off > 0).sort((a, b) => b.off - a.off);
  prodSection(rest, 'Hot Sellers', byOff, 'live-sales.html', true);
  brandSection(rest, 'Featured Brands', BRANDS.filter(b => b.featured), 'brands.html');
  brandSection(rest, 'Trending Brands', live.slice().sort((a, b) => (getMaxDiscountPercent(b) || 0) - (getMaxDiscountPercent(a) || 0)), 'live-sales.html');
  if(live.length){                       // Deal of the Day: rotates daily through the biggest live sales
    const top8 = live.slice().sort((a, b) => (getMaxDiscountPercent(b) || 0) - (getMaxDiscountPercent(a) || 0)).slice(0, 8);
    const b = top8[Math.floor(Date.now() / 864e5) % top8.length], mine = items.filter(i => i.b.id === b.id).slice(0, 3), pct = getMaxDiscountPercent(b);
    const sec = document.createElement('section'); sec.className = 'hm-sec';
    sec.innerHTML = `<div class="hm-sh"><h2>Deal of the Day</h2><a class="va" href="brand.html?id=${b.id}">VIEW ALL</a></div><div class="dod"><div class="dod-b">${brandBadgeHTML(b, 56)}<b>${b.name}</b><span>${pct ? 'Up to ' + pct + '% off' : 'Sale live now'}</span><a href="brand.html?id=${b.id}">Shop the sale</a></div><div class="hc-grid">${mine.map(i => homeCard(i.b, i.p)).join('')}</div></div>`;
    rest.appendChild(sec);
  }
  prodSection(rest, 'Trending Now', items.slice().sort((a, b) => (a.src === 1 ? 0 : 1) - (b.src === 1 ? 0 : 1)), 'brands.html?filter=new', true);
  prodSection(rest, 'Top Picks', items.filter(i => i.off > 0).sort((a, b) => (parsePKR(b.p.originalPrice) - parsePKR(b.p.currentPrice)) - (parsePKR(a.p.originalPrice) - parsePKR(a.p.currentPrice))), 'live-sales.html', true);
  catSection(rest, items, 'Beauty & Personal Care', 'Cosmetics', 'brands.html?category=Cosmetics');
  const frag = items.filter(i => ['Cosmetics', 'Lifestyle'].includes(i.b.category) && /\b(perfume|fragrance|attar|cologne|parfum|body mist|eau de (parfum|toilette))\b/i.test(i.p.name));
  prodSection(rest, 'Fragrances', frag, 'brands.html?category=Lifestyle', false);
  catSection(rest, items, 'Footwear', 'Footwear', 'brands.html?category=Footwear');
  catSection(rest, items, 'Home Decor', 'Home Décor', 'brands.html?category=' + encodeURIComponent('Home Décor'), HOME_OK, NOT_HOME);
  catSection(rest, items, 'Lifestyle', 'Lifestyle', 'brands.html?category=Lifestyle');
  catSection(rest, items, 'Bags & Accessories', 'Bags', 'brands.html?category=Bags');
  const al = document.querySelector('.al-card');
  if(al){ al.classList.add('al-band'); rest.insertAdjacentElement('afterend', al);
    const t = al.querySelector('h4'); if(t) t.textContent = "Follow a brand. We'll do the watching.";
    const p = al.querySelector('p'); if(p) p.textContent = 'Push and email alerts the minute a sale starts. Unfollow any time.'; }
};
})();
