# Lab Manual — Auth0 Integration (Use Tutorials, Adapt to Our App)

## Goal

You will integrate **Auth0** into the Express app provided by your instructor, so users can **log in**, access **protected pages**, and **log out**.

The two links below are your **main implementation references**.
Sometimes they **won’t match our project exactly** (different file names, CommonJS vs ES Modules, etc.). Your job is to **adapt** the tutorial steps to our app.

### Main reference tutorials (use these first)

1. Auth0 official Express tutorial:

* [https://auth0.com/blog/create-a-simple-and-secure-node-express-app/](https://auth0.com/blog/create-a-simple-and-secure-node-express-app/)

2. Passport + Auth0 strategy guide:

* [https://medium.com/jungletronics/seamless-auth-with-auth0-express-and-passport-a-quick-guide-21d57d784e9d](https://medium.com/jungletronics/seamless-auth-with-auth0-express-and-passport-a-quick-guide-21d57d784e9d)
If you hit a gap where the tutorials don’t directly answer your exact problem:

* Ask AI targeted questions , or
* Ask me ! (recommended).

---

## What Auth0 does (in simple terms)

* **Auth0 handles the login screen and identity verification** (including social logins like Google).
* Your app **redirects** the user to Auth0 to log in.
* Auth0 sends the user back to your app via a **callback URL**.
* Your app then creates a **session** (so the user stays logged in) and can protect routes.

### Third‑party authentication

Instead of storing passwords in *your* database:

* The user logs in with a trusted third party (Google, GitHub, etc.) through Auth0.
* Your app receives a verified identity result (profile/tokens) and uses that to create a session.

---

## IMPORTANT: Things to watch out for (your #1 checklist)

### 1) `require` vs `import`

Many tutorials use **CommonJS**:

```js
const express = require("express");
```

Our course projects often use **ES Modules**:

```js
import express from "express";
```

If the tutorial uses `require`, convert it to `import`.

**Common conversions:**

* `const passport = require("passport")` → `import passport from "passport"`
* `const session = require("express-session")` → `import session from "express-session"`
* `require("dotenv").config()` → `import "dotenv/config"`

If you see `module.exports` in a tutorial, we typically use `export default`.

### 2) File names won’t match

Tutorials may use `index.js` or `server.js`.
We may use **`app.js`**.

* Don’t panic.
* Find where our Express app is created (where `const app = express()` / `const app = express();` is).
* That’s where most Auth0 setup will go.


### 3) `.env` must match YOUR setup

Every student must use **their own Auth0 credentials**.

* Never commit `.env` to GitHub.
* Make sure `.gitignore` includes `.env`.

### 5) “Secret Diary Entries” must be stored in YOUR database

You must persist diary entries in **your own database** (MongoDB or the database your instructor assigned).

* Your `.env` must contain your database connection string.
* Your app must read it from `process.env`.
