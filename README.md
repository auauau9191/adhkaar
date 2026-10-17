# Azkorlar · Азкары

Morning and evening adhkar as an installable phone app, in Uzbek (Latin and Cyrillic) and Russian, with the reciter's audio and word-by-word highlighting.

| Page | Link to share |
|---|---|
| Morning — Ertalabki azkorlar · Утренние азкары | `…/sabah.html` |
| Evening — Kechki azkorlar · Вечерние азкары | `…/masa.html` |

Add `?lang=uz`, `?lang=uzc` or `?lang=ru` to a link to open it in a specific language (for example in a Russian-language Telegram group). Otherwise the page uses the phone's language the first time and remembers the reader's choice after that.

## Publish on GitHub Pages

1. Delete the old files from the repository: `index.html`, `kechki-azkorlar.html`, `utrennie-azkary.html`, `vechernie-azkary.html`, and the old `og-*.png` images.
2. Upload **everything in this folder** to the repository root, keeping the `assets` folder as it is. On github.com: *Add file → Upload files*, then drag in the folder contents.
3. Optional but recommended: also upload the four files from `old-links/` to the root. They are tiny redirects, so links you already shared in Telegram open the new pages in the right language. Its `index.html` also makes the bare repository address open morning or evening based on the time of day.
4. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.

Keep the folder structure exactly as it is. `sw.js` must sit next to the two pages for offline mode to work.

## Telegram previews

Each page has a bilingual preview card (`assets/og-sabah.png`, `assets/og-masa.png`). If Telegram shows no image:

- In `sabah.html` and `masa.html`, change `content="assets/og-…png"` in the two `og:image` / `twitter:image` lines to the full address, e.g. `https://USERNAME.github.io/REPO/assets/og-sabah.png`.
- Telegram caches previews. Send the link to **@WebpageBot** to refresh it, or add `?v=2` to the link once.

## Installing on a phone

- **iPhone:** open the page in Safari → Share → *Add to Home Screen*.
- **Android:** open in Chrome → the page offers *Install*, or menu ⋮ → *Add to Home screen*.

Morning and evening install as two separate icons (sun and crescent). In the app, *Settings → Use without internet* saves the audio to the phone.

## Updating later

Edit and re-upload the pages. Installed apps pick up the new version the next time they're opened online.
