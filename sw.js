/* Azkor offline worker — version 37753a094f
   - pages, fonts, icons: precached; pages are network-first so updates arrive, cache when offline
   - audio: served from the "azkor-audio-v1" cache once the user taps "Download", with Range support
     (iPhone Safari always requests audio in byte ranges)                                        */
const CORE = "azkor-core-37753a094f";
const AUDIO = "azkor-audio-v1";
const FILES = [
 "sabah.html",
 "masa.html",
 "assets/masa-ru.webmanifest",
 "assets/masa-uz.webmanifest",
 "assets/masa-uzc.webmanifest",
 "assets/sabah-ru.webmanifest",
 "assets/sabah-uz.webmanifest",
 "assets/sabah-uzc.webmanifest",
 "assets/fonts/amiri-arabic.woff2",
 "assets/fonts/inter-cyrillic-ext.woff2",
 "assets/fonts/inter-cyrillic.woff2",
 "assets/fonts/inter-latin-ext.woff2",
 "assets/fonts/inter-latin.woff2",
 "assets/fonts/literata-cyrillic-ext-italic.woff2",
 "assets/fonts/literata-cyrillic-ext.woff2",
 "assets/fonts/literata-cyrillic-italic.woff2",
 "assets/fonts/literata-cyrillic.woff2",
 "assets/fonts/literata-latin-ext-italic.woff2",
 "assets/fonts/literata-latin-ext.woff2",
 "assets/fonts/literata-latin-italic.woff2",
 "assets/fonts/literata-latin.woff2",
 "assets/icons/masa-180.png",
 "assets/icons/masa-192.png",
 "assets/icons/masa-512.png",
 "assets/icons/masa-64.png",
 "assets/icons/masa-maskable-512.png",
 "assets/icons/masa.svg",
 "assets/icons/sabah-180.png",
 "assets/icons/sabah-192.png",
 "assets/icons/sabah-512.png",
 "assets/icons/sabah-64.png",
 "assets/icons/sabah-maskable-512.png",
 "assets/icons/sabah.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CORE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((ks) => Promise.all(ks.filter((k) => k.startsWith("azkor-core-") && k !== CORE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

async function rangeFrom(cached, req) {
  const range = req.headers.get("range");
  if (!range) return cached;
  const buf = await cached.arrayBuffer(), size = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  let start = m && m[1] ? +m[1] : 0, end = m && m[2] ? +m[2] : size - 1;
  if (m && !m[1] && m[2]) { start = size - +m[2]; end = size - 1; }
  end = Math.min(end, size - 1);
  if (start >= size || start > end) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  return new Response(buf.slice(start, end + 1), { status: 206, statusText: "Partial Content", headers: {
    "Content-Type": cached.headers.get("Content-Type") || "audio/mp4", "Content-Length": String(end - start + 1),
    "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes" } });
}

self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.endsWith(".m4a")) {
    e.respondWith(caches.open(AUDIO).then((c) => c.match(url.href)).then((hit) => hit ? rangeFrom(hit, req) : fetch(req)));
    return;
  }
  if (req.mode === "navigate" || url.pathname.endsWith(".html")) {
    e.respondWith(fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CORE).then((c) => c.put(url.pathname.split("/").pop() ? new Request(url.origin + url.pathname) : req, copy)); }
      return res;
    }).catch(() => caches.match(url.origin + url.pathname, { ignoreSearch: true }).then((r) => r || caches.match(req, { ignoreSearch: true }))));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
    if (res.ok && /\/assets\//.test(url.pathname)) { const copy = res.clone(); caches.open(CORE).then((c) => c.put(req, copy)); }
    return res;
  })));
});
