# Threadworks — custom apparel website

A plain HTML/CSS/JS website. No build step: open `index.html`, or upload the whole folder to any web host (GitHub Pages, Netlify, cPanel, etc.).

"Threadworks" is a placeholder name. Anything in `[BRACKETS]` (prices, minimum order, turnaround times, contact details, client names) is a placeholder to replace.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero slideshow, services, process, recent work, products |
| `services.html` | Services + decoration comparison table |
| `products.html` | Products with category filter |
| `work.html` | Portfolio — project cards with filter |
| `case-study.html?p=<id>` | One case study (filled in from `assets/js/data.js`) |
| `about.html` | Story, values, process, FAQ |
| `quote.html` | Quote request form |

## Hero slideshow — add your 5 photos

Save five photos in the `images/` folder with these exact names:

```
images/hero-1.jpg
images/hero-2.jpg
images/hero-3.jpg
images/hero-4.jpg
images/hero-5.jpg
```

Any photo that is missing shows the drawn garment instead. Captions and speed are set in `index.html` (`data-caption="…"` on each slide, `data-seconds="4"` on the slideshow). Best size: about 1200 × 1500 px, under 400 KB each.

## Publishing portfolio projects / case studies

Open `assets/js/data.js` and copy one of the project blocks. Each project automatically gets a card on the Work page (and the first three show on Home) plus its own case-study page. Set `sample: false` once it's a real project to remove the "Sample case study" label. Put project photos in `images/work/` and list them as `cover` and `gallery`.

## Quote form

The form checks for a name and email, then shows a thank-you message. **It does not send anything yet.** To receive enquiries, sign up for a form service (for example Formspree, Basin or Netlify Forms) and put the URL it gives you into `action=""` on the `<form>` in `quote.html`.

## Brand

- Thread Blue `#2F5BFF` · Signal Yellow `#FFD43B` · Studio Green `#2F4A3A` · Ink Black `#161616` · White `#FFFFFF`
- Font: Inter Tight (Google Fonts)
- Logo: option 5, "Needle loop" (inline SVG in each page header and footer, icon in `assets/img/favicon.svg`)

All colours live at the top of `assets/css/style.css`.
