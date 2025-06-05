# Ostlii Site

This repository hosts the static landing page for **Ostlii – Strategic AI Agency & Ecosystem Operator**.

## Structure

- `index.html` – main landing page  
- `privacy.html` – data‑handling policy  
- `.nojekyll` – disables Jekyll processing on GitHub Pages  
- `CNAME` – custom domain mapping to **ostlii.com**  
- `robots.txt` & `sitemap.xml` – basic SEO files  
- `assets/` – (future) images, icons, CSS

## Development

All edits are done directly on the `main` branch. GitHub Pages is configured to deploy from `main` at the repo root.

## License

© 2025 Ostlii. All rights reserved.

## Deployment Clean Confirmation

> **No third‑party eCommerce or Shopify code** exists in this repository.  
> All assets are served exclusively from:  
> – `github.com/OSTLII/ostliis`  
> – `htmlpreview.github.io`  
> – `image.thum.io`  
>  
> If a Shopify URL appears in any browser warning, it’s due to cached DNS, HSTS, or an unrelated tab—**not** this codebase.

## Demo App

The `demo-app/` folder contains a lightweight prototype of the proximity-based
"Pulse Circles" concept. Open `demo-app/index.html` in any modern browser to
try the three-lens interface and signal-to-echo flow. It uses Leaflet for the
map and stores signals in-memory for demonstration purposes.
