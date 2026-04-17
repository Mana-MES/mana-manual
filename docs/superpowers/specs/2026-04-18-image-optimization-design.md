# Image Optimization Design
**Date:** 2026-04-18  
**Goal:** Reduce page load weight by converting all PNG/JPG images to lossless WebP and adding lazy loading to below-the-fold images.

---

## Context

- Static multi-page site (Vite), 41 images in `artwork/`, total 6.9MB
- `background.png` (1.7MB) used as CSS `background-image` in `.hero-bg` style block
- All other images used as `<img src="artwork/...">` tags
- `mana_logo.png` at root used in nav + hero — must not be lazy-loaded
- Target: lossless quality only, no visible degradation

---

## Architecture

```
vite build → inject-seo.js → optimize-images.js
```

**Build command** (`package.json`):
```json
"build": "vite build && node scripts/inject-seo.js && node scripts/optimize-images.js"
```

**New file:**
```
scripts/optimize-images.js   ← post-build: convert images + update HTML refs + lazy-load
```

**New dependency:**
```
sharp   (npm install sharp --save-dev)
```

---

## What optimize-images.js Does

### Step 1 — Convert images
- Glob all `.png`, `.jpg`, `.jpeg` files recursively in `dist/`
- For each: convert to lossless WebP using `sharp().webp({ lossless: true })`
- Save as same path with `.webp` extension
- Delete the original file

### Step 2 — Update HTML references
For each `.html` file in `dist/`:
- Replace all `src="...foo.png"` → `src="...foo.webp"` (img tags)
- Replace all `src="...foo.jpg"` / `.jpeg` → same with `.webp`
- Replace all CSS `url('...foo.png')` → `url('...foo.webp')` (covers background-image)
- Replace all CSS `url("...foo.png")` → `url("...foo.webp")` (double-quote variant)

### Step 3 — Add lazy loading
- Add `loading="lazy"` to all `<img>` tags whose `src` does NOT contain `mana_logo`
- Skip tags that already have `loading=` attribute

---

## Skips & Edge Cases

| File type | Action |
|-----------|--------|
| `.ttf` font files | Untouched |
| `mana_logo.png` → `mana_logo.webp` | Converted, but NOT lazy-loaded |
| CSS `url()` in `<style>` blocks | Updated (regex covers both quote styles) |
| Already-converted `.webp` files | Not re-processed (glob only matches png/jpg) |

---

## Expected Savings

| File | Before | Expected After |
|------|--------|---------------|
| `background.png` | 1.7MB | ~0.9–1.1MB |
| `bulkupload2.png` | 254KB | ~130–180KB |
| Total artwork (41 files) | 6.9MB | ~3.5–4.5MB |

Actual savings depend on image content — lossless WebP typically cuts 30–50% from PNG.

---

## Out of Scope

- Lossy compression (user specified lossless only)
- Responsive images / `srcset` (not needed for this use case)
- SVG optimization
- Font subsetting
