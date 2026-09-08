# What changed in this update

Everything that worked before still works exactly the same. Here's what's new.

## 1. The homepage no longer has a "Live Right Now" strip

That section has been removed. In its place, the top of the homepage now has
two clear buttons side by side:

- **Explore Brands** → the full brand directory (unchanged)
- **Live Sales** → the new dedicated Live Sales page

The "Live Sales" link in the menu (and in the mobile menu) now goes to that
new page too, on every page of the site. The scrolling sale ticker across
the very top of the homepage is unchanged.

## 2. New page: `live-sales.html`

A full page listing every sale that's live right now, in the same look and
feel as the rest of the site. For each brand it shows:

- The brand's logo, name and category
- A "Live now" marker and the discount headline
- **The actual products in that sale** — photo, product name, price now,
  price before, and the discount percentage — each one linking straight to
  that product on the brand's own website
- A "Shop the sale" button and the "Notify Me" button, exactly as elsewhere
- The sale page the information came from

## 3. The daily check now collects real product information

`scraper.js` still does everything it used to. On top of that, when it finds
a live sale it now also looks for that brand's own sale or clearance page,
opens it, and reads the products on it.

**Nothing is ever made up.** If a brand blocks automated visits, or its sale
page can't be read, that brand still appears on the Live Sales page — with a
short, honest note explaining products couldn't be read, and a direct link to
the brand's sale page. No placeholder products, no stock photos, no guessed
prices, ever. Prices, images and discounts are shown only when they were
genuinely found on the brand's own site.

This works best for Shopify-based stores (a large share of Pakistani brands)
and for sites that publish standard product data for Google. Elsewhere it
will often find nothing, which is handled gracefully as described above.

## 4. `sales-status.json` has a new, richer shape

Each brand's entry keeps its existing `status` and `live` fields (so nothing
that relied on them breaks) and gains a new `sale` block holding the sale
page link and the products found. Older entries without that block still
work fine. Full details are in `SETUP-AUTOMATION.md`.

## Files to upload to GitHub

Upload all of these, keeping the same folder structure:

```
index.html            (changed)
brands.html           (changed — menu links)
live-sales.html       (NEW)
brands-data.js        (changed)
scraper.js            (changed)
sales-status.json     (changed — new shape; the daily check overwrites it anyway)
robots.txt
OneSignalSDKWorker.js
SETUP-AUTOMATION.md          (updated)
SETUP-PUSH-NOTIFICATIONS.md  (updated)
WHATS-NEW.md                 (this file)
.github/workflows/check-sales.yml
```

Note the workflow file is now correctly named `check-sales.yml` inside
`.github/workflows/` — GitHub only picks it up at that exact path.

## One thing to remember

If you've already set up push notifications, your OneSignal App ID and your
Google Analytics Measurement ID need pasting into `live-sales.html` too — the
same two placeholders as in the other pages (`YOUR-ONESIGNAL-APP-ID` and
`G-XXXXXXXXXX`). All pages must use the same IDs.
