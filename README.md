# Azkorlar · Азкары

Morning and evening adhkar as an installable phone app, in Uzbek (Latin and Cyrillic) and Russian, with the reciter's audio and word-by-word highlighting.

| Page | Link to share |
|---|---|
| Morning — Ertalabki azkorlar · Утренние азкары | https://auauau9191.github.io/adhkaar/sabah.html |
| Evening — Kechki azkorlar · Вечерние азкары | https://auauau9191.github.io/adhkaar/masa.html |
| Either, by time of day | https://auauau9191.github.io/adhkaar/ |

Add `?lang=uz`, `?lang=uzc` or `?lang=ru` to a link to open it in a specific language (for example in a Russian-language Telegram group). Otherwise the page uses the phone's language the first time and remembers the reader's choice after that.

## Publish on GitHub Pages

1. In the `adhkaar` repository, delete the `old-links` folder.
2. Upload **everything in this folder** to the repository root (*Add file → Upload files*), replacing `sabah.html`, `masa.html` and `sw.js` and adding `index.html`.
3. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. The site appears at https://auauau9191.github.io/adhkaar/ within a minute or two.

Keep the folder structure exactly as it is. `sw.js` must sit next to the two pages for offline mode to work.

## Telegram previews

Each page has a bilingual preview card (`assets/og-sabah.png`, `assets/og-masa.png`), already linked by full address. Telegram caches previews: if one looks wrong, send the link to **@WebpageBot**, or add `?v=2` to the link once.

## Installing on a phone

- **iPhone:** open the page in Safari → Share → *Add to Home Screen*.
- **Android:** open in Chrome → the page offers *Install*, or menu ⋮ → *Add to Home screen*.

Morning and evening install as two separate icons (sun and crescent). In the app, *Settings → Use without internet* saves the audio to the phone.

## Updating later

Edit and re-upload the pages. Installed apps pick up the new version the next time they're opened online.
