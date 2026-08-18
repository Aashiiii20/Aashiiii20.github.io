# Aashiya Bi Portfolio

A single-page personal portfolio site. Plain HTML, CSS and vanilla JS. No build step, no dependencies.

## Structure

```
index.html                    all page content
assets/css/styles.css         design system + layout
assets/js/main.js             nav, scroll reveal, stat counters
assets/img/                   portrait images + favicon
```

## Run it locally

Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy

The site is a plain static folder, so any host works.

### GitHub Pages (personal site URL)

Naming the repo `<your-handle>.github.io` serves it from the root of your own
github.io domain. Run these signed in as **your own** GitHub account:

```bash
# 1. create an EMPTY public repo named <your-handle>.github.io at github.com/new
#    (do not add a README, licence or .gitignore)

# 2. from this folder:
git remote add origin https://github.com/<your-handle>/<your-handle>.github.io.git
git branch -M main
git push -u origin main
```

Pages builds automatically for a `<handle>.github.io` repo. The site is live at
`https://<your-handle>.github.io` within a minute or two. If it does not appear,
open Settings, then Pages, and set Source to "Deploy from a branch", branch
`main`, folder `/ (root)`.

For any later change: `git add -A && git commit -m "update" && git push`.

### Other hosts

Drag the whole folder into [Netlify Drop](https://app.netlify.com/drop), or:

```bash
npx vercel --prod          # Vercel
npx netlify deploy --prod  # Netlify
```

## Editing

- **Text**: everything lives in `index.html`, grouped by commented sections (`HERO`, `ABOUT`, `WORK`, …).
- **Colours**: the palette is at the top of `styles.css` under `:root` (`--accent` is the copper).
- **Photos**: replace the files in `assets/img/` keeping the same names, or update the `src` attributes.
