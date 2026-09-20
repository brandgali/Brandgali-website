# Setting Up Sale Alerts (Email Only)

Push notifications have been removed. "Notify Me" now only works for
**logged-in visitors**, and alerts are sent by **email**, not a browser
push notification. This guide covers what changed and the one setup step
that's different from before.

If you already completed `SETUP-PUSH-NOTIFICATIONS.md` and
`SETUP-ACCOUNTS.md`, most of the plumbing is already in place — this is a
shorter guide than either of those.

---

## What changed, in plain terms

- Tapping "Notify Me" now requires being logged in (see `SETUP-ACCOUNTS.md`
  if you haven't set up accounts yet — this is a hard requirement now,
  not optional).
- No browser permission prompt appears anywhere, on any device.
- The iPhone "Add to Home Screen" popup is gone — it was only needed for
  push, which no longer exists. Email works identically on iPhone,
  Android, and desktop, in any browser, with zero special steps.
- `scraper.js` now calls OneSignal's Email API instead of its Push API
  when a sale goes live. Same trigger (the moment a sale starts, not
  every day it continues), same `ONESIGNAL_APP_ID`/`ONESIGNAL_API_KEY`
  secrets — nothing new to add to GitHub.

## Step 1 — Turn on the Email channel in OneSignal

1. Go to your OneSignal dashboard (the same app you already created)
2. Left menu → **Settings → Messaging → Email**
3. Click **Configure** (or **Get Started**, depending on OneSignal's
   current wording) and turn the channel on

That's the only mandatory step — OneSignal can send email through its own
shared sending domain right away, no DNS changes required to get started.

## Step 2 — (Strongly recommended) verify a sending domain

Sending from OneSignal's shared/default domain works, but a meaningful
share of that mail can land in spam, and it can't say "From: BrandGali
<alerts@brandgali.com>" — it'll show OneSignal's own address instead.

To fix that:
1. Still in **Settings → Messaging → Email**, look for **Custom sending
   domain** (or **Verify a domain**)
2. Add `brandgali.com` (or a subdomain like `mail.brandgali.com`)
3. OneSignal gives you a handful of DNS records (SPF, DKIM, sometimes a
   tracking CNAME) — add these in whichever service manages
   `brandgali.com`'s DNS (likely wherever you bought the domain, or
   Netlify DNS if you use that)
4. Wait for OneSignal to show the domain as **Verified** (can take a few
   minutes to a few hours depending on DNS propagation)
5. Set your **From name** and **From address** (e.g. "BrandGali Alerts"
   / `alerts@brandgali.com`)

Until this is done, emails still send — they just come from OneSignal's
own domain and are more likely to land in spam. This step is what fixes
that; it's optional to launch, worth doing soon after.

## Step 3 — Test it

Fastest way to test without waiting for a real sale:

1. Make sure you're logged into BrandGali with a real account (see
   `SETUP-ACCOUNTS.md`) and have tapped "Notify Me" on at least one brand
2. In OneSignal's dashboard: **Messages → New Email**
3. Under "Audience," filter by tag — e.g. `follow_khaadi` equals `true`
4. Write a test subject/body, send it
5. Check the inbox of the email you signed up with (and spam folder, the
   first time)

Once that works, the automated path — `scraper.js` detecting a real sale
and calling OneSignal's Email API itself — is already fully wired and
needs no separate testing.

## What to expect, realistically

- **Deliverability depends on Step 2.** Skipping domain verification
  isn't broken, just noticeably worse for inbox placement.
- **Only logged-in followers get alerted**, by design — following now
  requires an account specifically so alerts can reliably reach an email
  inbox instead of depending on a browser staying subscribed to push.
- **One email per sale start, not per day.** Same behavior as before —
  a week-long sale only triggers one email, when it begins.

## Cleanup (optional, not required)

`OneSignalSDKWorker.js` was only needed for push. It's harmless to leave
in your repo, but you can delete it if you want a tidier file list —
nothing on the site references it anymore.

## If something doesn't work

- **"Notify Me" opens the login modal instead of following**: that's
  correct, expected behavior now — logging in is required first
- **Tapped Notify Me while logged in, but no email ever arrives for a
  real sale**: check the GitHub Action's run log for `scraper.js` — it
  prints either `📧 sale email sent for <brand> (N recipients)` or a
  specific error/skip reason for each brand with a detected sale
- **Test email from Step 3 never arrives**: check spam first; if it's
  still missing, revisit Step 2 — an unverified sending domain is the
  most common cause of silently-dropped mail
