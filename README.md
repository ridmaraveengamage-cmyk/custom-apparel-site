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

## Images

All current photos (hero slideshow, product cards, case-study covers, studio photo) were generated with ChatGPT as stand-ins. Swap in real photos of your own work by saving them over the same file names:

- `images/hero-1.jpg` … `hero-5.jpg` — slideshow, portrait 4:5
- `images/products/*.jpg` — product cards, square
- `images/work/<project id>.jpg` — case-study covers, landscape 4:3
- `images/about-studio.jpg` — About page, portrait

## Hero slideshow — swap the 5 photos

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

Enquiries are emailed by [FormSubmit](https://formsubmit.co) (free, no account). The form checks for a name and email, sends everything (including attached files) to FormSubmit, then FormSubmit sends the visitor back to `quote.html?sent=1`, which shows the thank-you message.

- **First use:** the very first enquiry triggers a one-time "Activate form" email from FormSubmit. Click the button in it, or no enquiries are delivered.
- **Hide the email address:** after activating, FormSubmit sends a random code. Replace the email address in the form's `action="https://formsubmit.co/…"` in `quote.html` with that code.
- Spam protection: a hidden "honeypot" field (`_honey`). Settings live in the hidden `_subject`, `_template`, `_captcha` and `_next` fields.

## Brand

- Thread Blue `#2F5BFF` · Signal Yellow `#FFD43B` · Studio Green `#2F4A3A` · Ink Black `#161616` · White `#FFFFFF`
- Font: Inter Tight (Google Fonts)
- Logo: option 5, "Needle loop" (inline SVG in each page header and footer, icon in `assets/img/favicon.svg`)

All colours live at the top of `assets/css/style.css`.
