# Setting Up Real Accounts (Firebase Authentication)

This turns on a real Sign Up / Log In system — an email **and a password**,
checked properly, not just an email address. The password is never seen,
stored, or checked by BrandGali's own code; Google's Firebase service does
that part, the same way OneSignal (not this file) holds push subscriptions.

Firebase's free plan comfortably covers a site this size — no card required
to get started, and you won't hit its limits until tens of thousands of
monthly active users.

This is a one-time, ~10 minute setup.

---

## Step 1 — Create a free Firebase project

1. Go to **console.firebase.google.com** → sign in with any Google account
2. Click **Add project** (or **Create a project**)
3. Name it (e.g. "BrandGali") → continue through the prompts (you can turn
   off Google Analytics for the project if asked — you already have your
   own GA4 setup, no need for a second one)
4. Click **Create project**, then wait for it to finish setting up

## Step 2 — Turn on Email/Password sign-in

1. In your new project, go to **Build → Authentication** in the left menu
2. Click **Get started**
3. Under **Sign-in method**, click **Email/Password**
4. Toggle it **Enabled** → **Save**

That's the only sign-in method the site uses; you don't need to enable
Google/Facebook/etc. unless you want to add those later yourself.

## Step 3 — Register a Web App to get your config

1. Still in the Firebase console, click the **gear icon → Project settings**
2. Scroll to **Your apps** → click the **</>** (Web) icon
3. Give it a nickname (e.g. "BrandGali Web") → **Register app**
4. You'll see a code block containing a `firebaseConfig` object — you only
   need three values from it:
   - `apiKey`
   - `authDomain`
   - `projectId`

This `apiKey` is fine to be public in your website's code — like your
OneSignal App ID, it just identifies which project to connect to. Security
is enforced by Firebase itself (the sign-in method you enabled, and
optionally the "Authorized domains" list under Authentication → Settings),
not by keeping this value secret.

## Step 4 — Paste your config into the site (4 files, must match exactly)

In **all four** of `index.html`, `brands.html`, `live-sales.html` and
`brand.html`, open `brands-data.js` — wait, actually just edit
`brands-data.js` itself once, since all four pages load it from there.
Find this block near the top of the "ACCOUNTS" section:

```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR-FIREBASE-API-KEY",
  authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
};
```

Replace the three placeholder values with the real ones from Step 3. Because
every page loads `brands-data.js`, you only need to do this once.

## Step 5 — Add your domain to Firebase's allow-list

1. Firebase console → **Authentication → Settings → Authorized domains**
2. Your Netlify domain (e.g. `brandgali.com` and/or `your-site.netlify.app`)
   needs to be on this list, or sign-in will fail with a
   `auth/unauthorized-domain` error
3. `localhost` is included by default, useful if you ever test locally

## Step 6 — Deploy and test

1. Commit the changed `brands-data.js` the same way as always
2. Once live, tap the account icon (top right, next to search) on any page
3. Try **Sign Up** with a real email and a password (6+ characters) —
   you should land on "My Account," signed in
4. Tap **Log Out**, then **Log In** again with the same email/password to
   confirm it round-trips correctly
5. Try **Forgot password?** — you should get a real password-reset email
   from Firebase within a minute or two (check spam the first time)

## What you get automatically, no extra work

- Firebase handles password hashing, storage, and session tokens — none of
  that lives in this codebase
- After signing up or logging in, the site also calls
  `OneSignal.login(email)` and `OneSignal.User.addEmail(email)` — unchanged
  from before — so follows and sale alerts stay tied to that same email,
  and will carry over to a future BrandGali app that signs the visitor in
  with the same email

## What this does NOT give you (yet)

- A "My BrandGali" dashboard showing followed brands, order-style history,
  etc. — the account system today only handles identity (who's signed in)
  and syncing follows via OneSignal, not a full profile page
- Managing users (resetting someone's password for them, deleting an
  account) — for now, do that from the Firebase console under
  **Authentication → Users**
- Social login (Google/Facebook/Apple) — only email+password is wired up;
  Firebase supports those too if you want to add them later

## If something doesn't work

- **"Accounts aren't set up yet" message never goes away**: the config in
  `brands-data.js` still has the `YOUR-` placeholder values — double-check
  Step 4
- **`auth/unauthorized-domain` error on sign-up**: your live domain isn't
  in Firebase's authorized domains list — see Step 5
- **Password reset email never arrives**: check spam; Firebase sends these
  directly, delivery is usually near-instant but can occasionally take a
  few minutes
