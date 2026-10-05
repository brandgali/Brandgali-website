/* brandgali-ui.js - load AFTER brands-data.js on every page. Does not change your brand list. */

/* =====================================================================
   BRANDGALI UI v2 - shared by every page: popular searches, followed-
   brands list, product cards (View In-App + Direct Store Link), product
   details popup, and the new sign-in / create-account popup.
===================================================================== */
(function(){
const css = `
.pop-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;align-items:center;font-size:12px;font-weight:700;color:var(--muted)}
.pop-chip{border:1px solid var(--line);background:#fff;color:var(--navy);border-radius:999px;padding:7px 12px;font:700 12px Inter,sans-serif;display:inline-flex;gap:6px;align-items:center;cursor:pointer}
.pop-chip i{color:var(--orange-deep)}
.search-overlay .search-head input{border:2px solid var(--orange);border-radius:18px;box-shadow:0 0 0 5px #FBE7C6;height:54px;padding:0 16px;font-size:16px;outline:0}
.ps-title{font:800 12px Inter,sans-serif;letter-spacing:1px;color:var(--muted);margin:22px 4px 12px;display:flex;gap:8px;align-items:center}
.ps-title i{color:var(--orange-deep)}
.ps-list{display:flex;flex-wrap:wrap;gap:9px}
.ps-chip{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1.5px solid var(--line);border-radius:999px;padding:10px 14px;font:700 14px Inter,sans-serif;color:var(--navy);cursor:pointer}
.ps-chip i{color:var(--orange-deep)}
.ps-chip em{font-style:normal;font-size:11px;background:#FDEBD3;color:var(--orange-deep);border-radius:99px;padding:3px 9px}
.p-card{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fff;display:flex;flex-direction:column}
.p-card .p-img{position:relative;height:110px;background:#F0F1F4;cursor:pointer;overflow:hidden}
.p-card .p-img img{width:100%;height:100%;object-fit:cover}
.p-detail-badge{position:absolute;right:6px;bottom:6px;background:rgba(18,24,58,.85);color:#fff;font:700 10px Inter,sans-serif;border-radius:7px;padding:4px 7px}
.p-card .p-body{padding:9px;display:flex;flex-direction:column;gap:5px;flex:1}
.p-card .p-name{font:600 12px/1.25 Inter,sans-serif;color:var(--navy)}
.p-card .p-price{font-size:12px}
.p-now{font-weight:800;color:var(--orange-deep)}.p-was{text-decoration:line-through;color:var(--muted);margin-left:5px;font-size:11px}
.p-off{align-self:flex-start;background:#FDEBD3;color:var(--orange-deep);font:800 10px Inter,sans-serif;border-radius:6px;padding:3px 7px}
.p-links{margin-top:auto;border-top:1px dashed var(--line);padding-top:7px;display:flex;flex-direction:column;gap:6px}
.p-link{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:6px;font:700 12px/1.2 Inter,sans-serif!important;color:var(--navy)}
.p-link.in-app{color:var(--teal-deep)}.p-link .fa-arrow-right{margin-left:auto}
.pm-back{position:fixed;inset:0;background:rgba(18,24,58,.55);z-index:9998;display:none}
.pm-sheet{position:fixed;left:0;right:0;bottom:0;max-width:520px;margin:0 auto;background:#fff;border-radius:24px 24px 0 0;z-index:9999;max-height:90vh;overflow:auto;padding:18px;display:none}
.pm-back.open,.pm-sheet.open{display:block}
.pm-sheet img{width:100%;max-height:280px;object-fit:cover;border-radius:16px;background:#F0F1F4}
.pm-sheet h3{font:800 18px Poppins,sans-serif;color:var(--navy);margin:12px 0 4px}
.pm-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0}
.pm-spec{font-size:13px;color:var(--muted);margin:6px 0}.pm-spec b{color:var(--navy)}
.pm-x{position:absolute;right:14px;top:14px;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);background:#fff;font-size:16px}
.account-backdrop{background:rgba(18,24,58,.6)}
.account-modal{top:50%!important;bottom:auto!important;max-width:440px;margin:0 auto;max-height:92vh;overflow:auto;border-radius:26px!important;padding:26px 22px!important;opacity:0;visibility:hidden;transform:translateY(-46%) scale(.97);transition:.2s}
.account-modal.open{opacity:1;visibility:visible;transform:translateY(-50%) scale(1)}
.ac2{text-align:center}.ac2 img{height:46px;margin-bottom:6px}
.ac2 h3{font:800 24px Poppins,sans-serif;color:var(--navy);margin:6px 0}
.ac2 .account-sub{color:var(--muted);font-size:14px;line-height:1.5}
.ac2-tabs{display:flex;border-bottom:2px solid var(--line);margin:18px 0}
.ac2-tab{flex:1;background:none;border:0;padding:12px;font:700 15px Inter,sans-serif;color:var(--muted);border-bottom:3px solid transparent;margin-bottom:-2px;cursor:pointer}
.ac2-tab.on{color:var(--navy);border-color:var(--orange)}
.ac2-google{width:100%;display:flex;gap:10px;justify-content:center;align-items:center;border:1.5px solid var(--line);background:#fff;border-radius:14px;padding:14px;font:700 15px Inter,sans-serif;color:var(--navy);cursor:pointer}
.ac2-or{display:flex;align-items:center;gap:10px;color:var(--muted);font:700 11px Inter,sans-serif;letter-spacing:1px;margin:16px 0}
.ac2-or:before,.ac2-or:after{content:"";flex:1;height:1px;background:var(--line)}
.ac2 label{display:flex;justify-content:space-between;text-align:left;font:700 13px Inter,sans-serif;color:var(--navy);margin:12px 0 6px}
.ac2 label a{color:var(--orange-deep)}
.ac2-field{position:relative}.ac2-field>i{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#9A9A9A}
.ac2-field input{width:100%;border:1.5px solid var(--line);border-radius:14px;padding:14px 40px 14px 40px;font-size:15px;background:#FAF8F3;box-sizing:border-box}
.ac2-field input:focus{border-color:var(--navy);outline:0;background:#fff}
.ac2-field .eye{left:auto;right:14px;cursor:pointer}
.ac2 .btn{margin-top:16px;padding:15px;font-size:16px;border-radius:14px}
.ac2-foot{border-top:1px solid var(--line);margin-top:18px;padding-top:14px;font-size:12px;color:var(--muted);text-align:left;display:flex;gap:10px}
.ac2-foot i{color:var(--teal)}
.qf-card{background:#fff;border:1px solid var(--line);border-radius:20px;padding:14px;margin:12px 0}
.qf-title{font:800 12px Inter,sans-serif;letter-spacing:1px;color:var(--muted);margin-bottom:10px}.qf-title i{color:var(--orange-deep)}
.qf-row,.bg-scroll{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px}
.qf-row::-webkit-scrollbar,.bg-scroll::-webkit-scrollbar{display:none}
.qf-row .filter-chip,.bg-scroll .filter-chip{white-space:nowrap}
.qf-sort{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--line);margin-top:10px;padding-top:12px;font-size:13px}
.qf-sort select,.bg-sort select{border:1px solid var(--line);background:#F4F0E8;border-radius:12px;padding:10px;font:700 13px Inter,sans-serif;color:var(--navy)}
.lc2{background:#fff;border:1px solid var(--line);border-radius:22px;padding:14px;margin-bottom:14px}
.lc2-head{display:flex;gap:12px;align-items:center}.lc2-head .nm{font:800 18px Poppins,sans-serif;color:var(--navy)}.lc2-head .nm i{color:var(--teal);font-size:14px}
.lc2-head .ct{font-size:13px;color:var(--muted)}.lc2-head .vd{margin-left:auto;font:800 12px Inter,sans-serif;color:var(--orange-deep);white-space:nowrap}
.lc2-hl{font:800 17px Poppins,sans-serif;color:var(--orange-deep);margin:12px 0 8px}
.chip-ok,.chip-lt{display:inline-flex;gap:5px;align-items:center;font:700 11px Inter,sans-serif;border-radius:8px;padding:5px 9px;margin-right:6px}
.chip-ok{background:#E6F4EC;color:#2E7D4F;border:1px solid #BFE0CC}.chip-lt{background:#FDEBD3;color:#C2570C;border:1px solid #F5CFA0}
.lc2-src{font-size:11px;color:var(--muted);word-break:break-all}.lc2-src a{color:var(--navy);font-weight:700}
.lc2-act{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.lc2-act .alt{border:1px solid var(--line);background:#fff;color:var(--navy);border-radius:10px;padding:9px 13px;font:700 12px Inter,sans-serif}
.bg-filters{display:block!important}.bg-sort{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin:12px 0;font:700 13px Inter,sans-serif;color:var(--muted)}
.bg-scroll{margin-top:8px}
.bgrid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.bc2{position:relative;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:14px;display:flex;flex-direction:column;gap:9px}
.bc2-top{display:flex;gap:10px;align-items:center}.bc2-top b{font:800 15px/1.15 Poppins,sans-serif;color:var(--navy);display:block}.bc2-top small{font-size:12px;color:var(--muted)}
.bc2-tag{align-self:flex-end;font:800 11px Inter,sans-serif;border-radius:99px;padding:5px 10px;background:#FDEBD3;color:var(--orange-deep)}.bc2-tag.new{background:#DDF2EA;color:var(--teal-deep)}
.bc2-btn{display:inline-flex;gap:6px;justify-content:center;align-items:center;border-radius:12px;padding:11px;font:800 13px Inter,sans-serif;text-align:center}
.bc2-btn.sale{background:var(--orange);color:#fff}.bc2-btn.grey{background:#EDE8E0;color:var(--navy)}
.bc2 .notify-btn{justify-content:center;padding:10px}
.hs-tabs{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:#EFEADF;border:1px solid var(--line);border-radius:18px;padding:6px;margin:14px 16px}
.hs-tab{border:0;background:transparent;border-radius:13px;padding:12px 6px;font:700 13px Inter,sans-serif;color:var(--muted);display:flex;gap:7px;justify-content:center;align-items:center;cursor:pointer}
.hs-tab.active{background:#fff;color:var(--navy);box-shadow:0 2px 8px rgba(18,24,58,.1)}.hs-tab i{color:var(--orange-deep)}
.hs-tab .cnt{background:#FDEBD3;color:var(--orange-deep);border-radius:99px;padding:2px 8px;font-size:11px}
.al-card{margin:0 16px 8px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:14px}
.al-card .row{display:flex;gap:12px}.al-card .ic{width:44px;height:44px;border-radius:12px;background:#FDEBD3;color:var(--orange-deep);display:grid;place-items:center;flex-shrink:0}
.al-card h4{font:800 15px Poppins,sans-serif;color:var(--navy)}.al-card h4 span{font:700 10px Inter,sans-serif;background:#E6F4EC;color:#2E7D4F;border-radius:6px;padding:3px 7px;margin-left:6px}
.al-card p{font-size:13px;color:var(--muted);margin:5px 0 0}.al-card .btn{margin-top:12px;padding:14px;font-size:14px;border-radius:12px}
.fp{margin:0 16px}.fp-empty{border:2px dashed var(--line);border-radius:24px;padding:28px 18px;text-align:center;background:#FFFDFA}
.fp-empty h3{font:800 18px Poppins,sans-serif;color:var(--navy);margin:10px 0 6px}.fp-empty p{color:var(--muted);font-size:14px}
.fp-empty .btn{margin-top:14px;display:block;width:100%;background:var(--orange)}.fp-empty .btn2{display:block;margin:10px auto 0;background:#EDE8E0;color:var(--navy);border-radius:12px;padding:12px 18px;font:700 14px Inter,sans-serif;width:max-content}
.lv-card{flex:0 0 78%;max-width:300px;background:#fff;border:1px solid var(--line);border-radius:20px;overflow:hidden}
.lv-top{background:linear-gradient(160deg,#1B2A5E,#12183A);height:104px;position:relative;display:grid;place-items:center}
.lv-off{position:absolute;left:10px;bottom:10px;background:var(--orange);color:var(--navy-deep);font:800 11px Inter,sans-serif;padding:5px 9px;border-radius:8px}
.lv-view{position:absolute;right:10px;top:10px;background:rgba(255,255,255,.18);color:#fff;font:700 10px Inter,sans-serif;border-radius:99px;padding:4px 9px}
.lv-body{padding:12px}.lv-body b{font:800 17px Poppins,sans-serif;color:var(--navy)}.lv-body small{display:block;color:var(--muted);font-size:12px;margin:3px 0 8px}
.bs-head{display:flex;gap:12px;align-items:center;padding:16px}.bs-head h1{font:800 22px Poppins,sans-serif;color:var(--navy)}.bs-head h1 i{color:var(--teal);font-size:16px}.bs-head small{color:var(--muted);font-size:14px}
.bs-banner{margin:0 16px;background:#FDF3E3;border:1px solid #F5D9A8;border-radius:18px;padding:14px}
.bs-banner h2{font:800 18px Poppins,sans-serif;color:var(--orange-deep);margin-bottom:8px}.bs-banner .meta{font-size:13px;color:var(--muted);margin-top:8px}
.bs-sec{padding:16px}.bs-sec .hd{display:flex;justify-content:space-between;align-items:center;font:800 15px Poppins,sans-serif;color:var(--navy)}.bs-sec .hd a{font:700 13px Inter,sans-serif;color:var(--orange-deep)}
.bs-sec .hint{font-size:13px;color:var(--muted);margin:6px 0}
.bs-empty{margin:0 16px;background:#F9F7F3;border:1px solid var(--line);border-radius:20px;padding:24px 16px;text-align:center}
.bs-empty h3{font:800 20px Poppins,sans-serif;color:var(--navy);margin:10px 0}.bs-empty p{color:var(--muted);font-size:14px;line-height:1.5}
.bs-visit{display:block;text-align:center;font:700 14px Inter,sans-serif;color:var(--navy);padding:14px;border-top:1px solid var(--line);margin:0 16px}
`;
const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

/* ---------- price helpers ---------- */
function parsePKR(v){ if(v==null) return null; const m = String(v).replace(/,/g,'').match(/\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; }
function productOffPct(p){
  const a = parsePKR(p.currentPrice), o = parsePKR(p.originalPrice);
  if(a && o && o > a) return Math.round((o - a) / o * 100);
  const m = String(p.discount || '').match(/(\d{1,2})\s*%/); return m ? +m[1] : null;
}
function brandProducts(b){
  const sp = (b.sale && Array.isArray(b.sale.products)) ? b.sale.products : [];
  return sp.filter(p => p && (p.name || p.image));
}
function brandHasItemUnder(b, limit){
  return isSaleLive(b) && brandProducts(b).concat(b.products || []).some(p => { const n = parsePKR(p.currentPrice); return n && n <= limit; });
}

/* ---------- product card + details popup ---------- */
window.__PREG = window.__PREG || {}; window.__PN = 0;
function productCardHTML(b, p, source){
  const key = b.id + '_' + (++window.__PN); window.__PREG[key] = { b, p };
  const url = p.url || (b.sale && b.sale.sourceUrl) || b.url;
  const off = productOffPct(p);
  const nm = (p.name || 'View product').replace(/"/g,'&quot;');
  const img = p.image ? `<img src="${p.image}" alt="${nm}" loading="lazy" onerror="this.style.display='none'">` : '';
  const price = p.currentPrice ? `<span class="p-now">${p.currentPrice}</span>${p.originalPrice ? `<span class="p-was">${p.originalPrice}</span>` : ''}` : (p.discount ? `<span class="p-now">${p.discount}</span>` : '');
  return `<div class="p-card" data-idx="${window.__PN}" data-price="${parsePKR(p.currentPrice) || ''}" data-off="${off || 0}">
    <div class="p-img" data-open-product="${key}">${img}<span class="p-detail-badge"><i class="fa-solid fa-eye"></i> Details</span></div>
    <div class="p-body">
      <div class="p-name">${p.name || 'View product'}</div>
      <div class="p-price">${price}</div>
      ${off ? `<span class="p-off">${off}% OFF</span>` : ''}
      <div class="p-links">
        <button type="button" class="p-link in-app" data-open-product="${key}"><i class="fa-solid fa-circle-info"></i> View In-App <i class="fa-solid fa-arrow-right"></i></button>
        <a class="p-link store" href="${url}" target="_blank" rel="noopener" data-gtm-brand="${b.id}" data-gtm-name="${b.name}" data-gtm-category="${b.category}" data-gtm-source="${source || 'product'}"><i class="fa-solid fa-arrow-up-right-from-square"></i> Direct Store Link</a>
      </div>
    </div></div>`;
}
function openProductModal(key){
  const e = window.__PREG[key]; if(!e) return; const { b, p } = e;
  let back = document.getElementById('pmBack');
  if(!back){ document.body.insertAdjacentHTML('beforeend', '<div class="pm-back" id="pmBack"></div><div class="pm-sheet" id="pmSheet"></div>'); back = document.getElementById('pmBack'); back.addEventListener('click', closeProductModal); }
  const url = p.url || (b.sale && b.sale.sourceUrl) || b.url;
  const a = parsePKR(p.currentPrice), o = parsePKR(p.originalPrice), off = productOffPct(p);
  const specs = [['Fabric',p.fabric],['Sizes',Array.isArray(p.sizes)?p.sizes.join(', '):p.sizes],['Colour',p.color],['Category',p.category],['Description',p.description]].filter(x => x[1]);
  document.getElementById('pmSheet').innerHTML = `<button class="pm-x" onclick="closeProductModal()" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    ${p.image ? `<img src="${p.image}" alt="">` : ''}
    <div class="pm-row" style="margin-top:12px">${brandBadgeHTML(b, 28)}<b style="color:var(--navy)">${b.name}</b></div>
    <h3>${p.name || 'Product'}</h3>
    <div class="pm-row"><span class="p-now" style="font-size:20px">${p.currentPrice || p.discount || ''}</span>${p.originalPrice ? `<span class="p-was">${p.originalPrice}</span>` : ''}${off ? `<span class="p-off">${off}% OFF</span>` : ''}</div>
    ${a && o && o > a ? `<p class="pm-spec"><b>You save:</b> PKR ${(o - a).toLocaleString('en-PK')}</p>` : ''}
    ${specs.map(x => `<p class="pm-spec"><b>${x[0]}:</b> ${x[1]}</p>`).join('')}
    <p class="pm-spec">Prices were read from ${b.name}'s own website and can change - confirm on the store before buying.</p>
    <a class="btn btn-block" style="display:block;text-align:center;margin-top:12px" href="${url}" target="_blank" rel="noopener">Direct Store Link <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    <a class="p-link" style="justify-content:center;margin-top:14px;color:var(--orange-deep)" href="brand.html?id=${b.id}">See all ${b.name} deals</a>`;
  back.classList.add('open'); document.getElementById('pmSheet').classList.add('open');
}
function closeProductModal(){ document.getElementById('pmBack')?.classList.remove('open'); document.getElementById('pmSheet')?.classList.remove('open'); }
document.addEventListener('click', function(e){
  const t = e.target.closest('[data-open-product]'); if(t){ e.preventDefault(); openProductModal(t.dataset.openProduct); }
});

/* ---------- followed brands (shared by Notify buttons + homepage tab) ---------- */
function getFollows(){ try{ return JSON.parse(localStorage.getItem('brandgali_follows') || '[]'); }catch(e){ return []; } }
function setFollowLocal(id, on){
  try{ let a = getFollows().filter(x => x !== id); if(on) a.push(id); localStorage.setItem('brandgali_follows', JSON.stringify(a)); }catch(e){}
  window.dispatchEvent(new Event('brandgali:followed'));
}
async function followBrands(ids){
  const email = getAccountEmail();
  if(!email){ window.dispatchEvent(new Event('brandgali:open-account')); return false; }
  const O = window.__oneSignalInstance;
  try{ await syncFollowIdentityToOneSignal(email); }catch(e){}
  for(const id of ids){ try{ if(O) await O.User.addTag('follow_' + id, 'true'); }catch(e){} setFollowLocal(id, true); }
  refreshNotifyButtonsUI(); return true;
}

/* ---------- search: popular searches + smarter queries ---------- */
/* ---- search over real product names (sale items, catalogue items, new arrivals) ---- */
const _normS = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
function _qTokens(q){ return String(q).toLowerCase().split(/\s+/).map(t => _normS(t).replace(/s$/, '')).filter(Boolean); }
function productNameMatches(name, q){
  const n = _normS(name), toks = _qTokens(q);
  return toks.length > 0 && toks.every(t => n.includes(t));
}
function allProductsOf(b){ return brandProducts(b).concat(b.products || [], b.newArrivalProducts || []).filter(p => p && p.name); }
function findProductMatch(b, q){ return allProductsOf(b).find(p => productNameMatches(p.name, q)); }

const _origSearchBrands = searchBrands;
searchBrands = function(query){
  const q = (query || '').toLowerCase().trim();
  let m = q.match(/(\d{1,2})\s*%/);
  if(m){
    // brands whose best discount is AT LEAST n%, lowest qualifying % first (30% off -> 30s on top, 50s and 70s after)
    const n = +m[1];
    return BRANDS.map(b => ({ b, pct: getMaxDiscountPercent(b) })).filter(x => x.pct !== null && x.pct >= n)
      .sort((x, y) => x.pct - y.pct || x.b.name.localeCompare(y.b.name)).map(x => ({ brand: x.b, reason: `Up to ${x.pct}% off` }));
  }
  m = q.match(/under\s*(?:pkr|rs\.?)?\s*([\d,]+)\s*(k?)/);
  if(m){ let n = parseInt(m[1].replace(/,/g, ''), 10); if(m[2] || n < 100) n *= 1000; return BRANDS.filter(b => brandHasItemUnder(b, n)).map(b => ({ brand: b, reason: `Items under PKR ${n.toLocaleString('en-PK')}` })); }
  const out = _origSearchBrands(query), seen = new Set(out.map(r => r.brand.id));
  BRANDS.forEach(b => {
    if(seen.has(b.id)) return;
    const p = findProductMatch(b, q);
    if(p) out.push({ brand: b, reason: `has "${p.name}"` });
  });
  return out;
};

/* ---- popular searches: only terms that really return brands right now ---- */
const POP_CANDIDATES = [
  ['Printed Lawn','Lawn','fa-sun','printed lawn'],['Embroidered Lawn','Lawn','fa-sun','embroidered lawn'],
  ['Co-ord Set','Pret','fa-shirt','co-ord set'],['Embroidered Shirt','Pret','fa-shirt','embroidered shirt'],
  ['Kurta','Menswear','fa-shirt','kurta'],['Tapered Pants','Bottoms','fa-shirt','tapered pants'],['Trousers','Bottoms','fa-shirt','trouser'],
  ['Sweatshirt','Winter','fa-shirt','sweatshirt'],['Hoodie','Winter','fa-shirt','hoodie'],['Polo Shirts','Trending','fa-shirt','polo'],
  ['T-Shirts','Casual','fa-shirt','t-shirt'],['Jeans','Denim','fa-shirt','jeans'],['Shawl','Winter','fa-shirt','shawl'],
  ['Sneakers','Footwear','fa-shoe-prints','sneaker'],['Slippers','Footwear','fa-shoe-prints','slipper'],['Sandals','Footwear','fa-shoe-prints','sandal'],
  ['Khussa','Footwear','fa-shoe-prints','khussa'],['Heels','Footwear','fa-shoe-prints','heel'],
  ['Perfume','Fragrance','fa-spray-can-sparkles','perfume'],['Bedsheet','Home','fa-bed','bed sheet'],['Cushion Covers','Home','fa-bed','cushion'],
  ['Lunch Box','Home','fa-bed','lunch box'],['Handbags','Bags','fa-bag-shopping','bag'],
];
const POP_DISCOUNTS = [['Flat 50% Off','Mega Deals','fa-fire','50%'],['Flat 40% Off','Hot','fa-bolt','40%'],['30% Off','Popular','fa-percent','30%'],['Under PKR 3,000','Budget','fa-wallet','under 3000']];
function popularList(limit){
  const items = POP_CANDIDATES.map(c => ({ c, n: searchBrands(c[3]).length })).filter(x => x.n > 0).sort((a, b) => b.n - a.n).slice(0, limit || 8).map(x => x.c);
  const disc = POP_DISCOUNTS.filter(d => searchBrands(d[3]).length > 0);
  return { items, disc };
}
function popularSearchesHTML(){
  const { items, disc } = popularList(8);
  const chip = s => `<span class="ps-chip" data-q="${s[3]}"><i class="fa-solid ${s[2]}"></i>${s[0]}<em>${s[1]}</em></span>`;
  return `<div class="ps-title"><i class="fa-solid fa-arrow-trend-up"></i> POPULAR SEARCHES</div><div class="ps-list">${items.map(chip).join('')}${disc.map(chip).join('')}</div>`;
}
function openSearchWith(q){
  document.getElementById('searchBtn')?.click();
  const inp = document.getElementById('searchInput'); if(!inp) return;
  inp.value = q; inp.dispatchEvent(new Event('input'));
}
function initSearchV2(){
  const input = document.getElementById('searchInput'), res = document.getElementById('searchResults');
  if(!input || !res) return;
  const show = () => { if(!input.value.trim()) res.innerHTML = popularSearchesHTML(); };
  ['searchBtn','heroSearchBtn','heroSearchBox'].forEach(id => document.getElementById(id)?.addEventListener('click', () => setTimeout(show, 0)));
  input.addEventListener('input', show);
  input.setAttribute('placeholder', 'Search polo shirts, 30% off, lawn...');
  res.addEventListener('click', e => { const c = e.target.closest('.ps-chip'); if(c){ input.value = c.dataset.q; input.dispatchEvent(new Event('input')); input.focus(); } });
}

/* ---------- sign-in / create-account popup ---------- */
function accountLoggedOutHTML(errorMsg){
  const isSignup = accountModalMode === 'signup';
  const logo = document.querySelector('.logo-link img')?.src || '';
  return `<div class="ac2">
    ${logo ? `<img src="${logo}" alt="BrandGali">` : ''}
    <h3>${isSignup ? 'Join BrandGali' : 'Sign in to BrandGali'}</h3>
    <p class="account-sub">Create an account to save your favourite Pakistani brands and get notified the minute their sales go live.</p>
    <div class="ac2-tabs"><button class="ac2-tab${isSignup ? '' : ' on'}" data-mode="login" type="button">Sign In</button><button class="ac2-tab${isSignup ? ' on' : ''}" data-mode="signup" type="button">Create Account</button></div>
    ${errorMsg ? `<p class="account-error">${errorMsg}</p>` : ''}
    <button class="ac2-google" id="acctGoogle" type="button"><svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg> Continue with Google</button>
    <div class="ac2-or">OR CONTINUE WITH EMAIL</div>
    <label>Email Address</label>
    <div class="ac2-field"><i class="fa-regular fa-envelope"></i><input type="email" id="accountEmailInput" placeholder="name@example.com" autocomplete="email"></div>
    <label>Password ${!isSignup ? '<a href="#" id="forgotPasswordLink">Forgot?</a>' : ''}</label>
    <div class="ac2-field"><i class="fa-solid fa-lock"></i><input type="password" id="accountPasswordInput" placeholder="At least 6 characters" autocomplete="${isSignup ? 'new-password' : 'current-password'}"><i class="fa-regular fa-eye eye" id="acctEye"></i></div>
    ${isSignup ? `<label>Confirm Password</label><div class="ac2-field"><i class="fa-solid fa-lock"></i><input type="password" id="accountPasswordConfirm" placeholder="Re-enter password" autocomplete="new-password"></div>` : ''}
    <button class="btn btn-block" id="accountSubmitBtn" type="button">${isSignup ? 'Create Account' : 'Sign In'}</button>
    <div class="ac2-foot"><i class="fa-solid fa-shield-halved"></i><span>Secured with Firebase Authentication. Credentials are cryptographically protected.</span></div>
  </div>`;
}
function wireAcctV2(){
  document.querySelectorAll('.ac2-tab').forEach(t => t.addEventListener('click', () => { accountModalMode = t.dataset.mode; refreshAccountModalUI(); }));
  document.getElementById('acctEye')?.addEventListener('click', () => { const i = document.getElementById('accountPasswordInput'); i.type = i.type === 'password' ? 'text' : 'password'; });
  document.getElementById('acctGoogle')?.addEventListener('click', async () => {
    const auth = getFirebaseAuth();
    try{ const r = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); if(r.user && r.user.email) await syncFollowIdentityToOneSignal(r.user.email); refreshAccountModalUI(); }
    catch(err){ refreshAccountModalUI(firebaseErrorMessage(err)); }
  });
}

/* ---------- hooks into existing functions (no edits to brands-data.js needed) ---------- */
const _wireBody = wireAccountModalBodyEvents;
wireAccountModalBodyEvents = function(){ _wireBody(); wireAcctV2(); };
const _wireUI = wireAccountUI;
wireAccountUI = function(){ _wireUI(); initSearchV2(); };
// keep the local followed list in step with Notify buttons (works for follow + unfollow)
document.addEventListener('click', function(e){
  const btn = e.target.closest('.notify-btn[data-notify-brand]'); if(!btn) return;
  const id = btn.dataset.notifyBrand;
  setTimeout(() => { if(getAccountEmail()) setFollowLocal(id, btn.classList.contains('following')); }, 900);
});
const _refreshNotify = refreshNotifyButtonsUI;
refreshNotifyButtonsUI = async function(){
  await _refreshNotify();
  try{ const a = getFollows(); document.querySelectorAll('.notify-btn.following[data-notify-brand]').forEach(b => { if(a.indexOf(b.dataset.notifyBrand) < 0) a.push(b.dataset.notifyBrand); }); localStorage.setItem('brandgali_follows', JSON.stringify(a)); window.dispatchEvent(new Event('brandgali:followed')); }catch(e){}
};

/* ---------- shared card pieces ---------- */
function verifiedChip(b){
  return '<span class="chip-ok"><i class="fa-solid fa-circle-check"></i> Verified</span>';
}
function brandCardV2HTML(b){
  const live = isSaleLive(b), isNew = isNewArrival(b);
  const tags = (live ? '<span class="bc2-tag"><i class="fa-solid fa-fire"></i> Sale Live</span>' : '') + (isNew ? '<span class="bc2-tag new"><i class="fa-solid fa-wand-magic-sparkles"></i> New Arrival</span>' : '');
  return `<article class="bc2">
    <div class="bc2-tags">${tags}</div>
    <div class="bc2-top">${brandBadgeHTML(b, 44)}<div class="bc2-name"><a href="brand.html?id=${b.id}"><b>${b.name}</b></a><small>${b.category} &bull; Retail</small></div></div>
    <div class="bc2-chips">${live ? `${verifiedChip(b)}<span class="chip-lt"><i class="fa-regular fa-clock"></i> Limited Time</span>` : ''}</div>
    <div class="bc2-actions">
      ${live ? `<a class="bc2-btn sale" href="brand.html?id=${b.id}"><i class="fa-solid fa-fire"></i> View Sale Deals</a>` : `<a class="bc2-btn grey" href="brand.html?id=${b.id}"><i class="fa-solid fa-tags"></i> Check Sales</a>`}
      ${notifyButtonHTML(b)}
    </div></article>`;
}


/* ---------- new-arrival product data (if the daily check provides it) ---------- */
const _loadSS = loadSalesStatus;
loadSalesStatus = async function(){
  await _loadSS();
  const m = window.SALES_STATUS || {};
  BRANDS.forEach(b => { const e = m[b.id]; b.newArrivalProducts = (e && Array.isArray(e.newArrivals)) ? e.newArrivals : []; if(b.newArrivalProducts.length) b.newArrival = true; });
};

/* ---------- sort for product grids (brand page) ---------- */
function initProductSort(){
  const grids = document.querySelectorAll('#brandContent .product-grid');
  const n = document.querySelectorAll('#brandContent .p-card').length;
  if(!grids.length || n < 2) return;
  grids[0].insertAdjacentHTML('beforebegin', `<div class="bg-sort" style="justify-content:space-between;"><span style="color:var(--navy);">${n} item${n === 1 ? '' : 's'}</span><label>Sort By: <select id="prodSort"><option value="def">Featured First</option><option value="plow">Lowest Price First</option><option value="phigh">Highest Price First</option><option value="dhigh">Highest Discount First</option><option value="dlow">Lowest Discount First</option></select></label></div>`);
  document.getElementById('prodSort').addEventListener('change', e => {
    const v = e.target.value, price = c => parseFloat(c.dataset.price) || null, off = c => +c.dataset.off || 0;
    grids.forEach(g => {
      const cards = Array.from(g.children);
      cards.sort((a, b) => {
        if(v === 'plow') return (price(a) ?? Infinity) - (price(b) ?? Infinity);
        if(v === 'phigh') return (price(b) ?? -1) - (price(a) ?? -1);
        if(v === 'dhigh') return off(b) - off(a);
        if(v === 'dlow') return (off(a) || Infinity) - (off(b) || Infinity);
        return a.dataset.idx - b.dataset.idx;
      });
      cards.forEach(c => g.appendChild(c));
    });
  });
}

/* ---------- v2.1 style fixes ---------- */
(function(){ const s = document.createElement('style'); s.textContent = `
.account-modal .ac2-field input{padding:14px 46px 14px 46px!important;margin:0!important;height:auto!important;border-radius:14px!important;width:100%!important}
.account-modal .ac2-field>i{z-index:2;pointer-events:none;font-size:15px}
.account-modal .ac2-field>i.eye{pointer-events:auto}
.bgrid2{grid-auto-rows:1fr;align-items:stretch}
.bc2{height:100%;box-sizing:border-box;min-height:262px}
.bc2-tags{display:flex;justify-content:flex-end;gap:5px;flex-wrap:wrap;min-height:26px}
.bc2-tag{align-self:auto;white-space:nowrap}
.bc2-top{min-height:56px}.bc2-top .brand-badge,.bc2-top img{flex-shrink:0}
.bc2-name{min-width:0}.bc2-name b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.bc2-chips{min-height:58px;display:flex;flex-direction:column;align-items:flex-start;gap:6px}
.bc2-chips .chip-ok,.bc2-chips .chip-lt{margin-right:0}
.bc2-actions{margin-top:auto;display:flex;flex-direction:column;gap:8px}
.alert-row .alert-name{flex:1}
.alert-row .notify-btn{margin-left:auto;justify-content:center;min-width:104px;flex-shrink:0}
`; document.head.appendChild(s); })();

/* ---------- v2.2: no focus-zoom on iPhone + more compact brand tiles ---------- */
(function(){ const s = document.createElement('style'); s.textContent = `
input,select,textarea{font-size:16px!important}
.ac2-field input{font-size:16px!important}
.bc2{min-height:218px!important;padding:12px!important;gap:6px!important;border-radius:18px!important}
.bc2-tags{min-height:20px!important}
.bc2-tag{font-size:10px!important;padding:3px 8px!important}
.bc2-top{min-height:46px!important;gap:8px!important}
.bc2-top b{font-size:14px!important}.bc2-top small{font-size:11px!important}
.bc2-chips{min-height:44px!important;gap:4px!important}
.bc2-chips .chip-ok,.bc2-chips .chip-lt{font-size:10px!important;padding:3px 7px!important}
.bc2-actions{gap:6px!important}
.bc2-btn{padding:9px!important;font-size:12px!important;border-radius:10px!important}
.bc2 .notify-btn{padding:8px!important;font-size:12px!important;border-radius:10px!important}
.bgrid2{gap:10px!important}
`; document.head.appendChild(s); })();
