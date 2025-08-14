
const CACHE = 'dania-v1';
const CORE = ["index.html", "index-search-pwa-buybar.html", "grazie.html", "manifest.webmanifest", "logo.jpg", "astuccio.jpg", "B.jpg", "nata-per-sbuffare.jpg", "nel-dubbio-polemizzo.jpg", "oggi-mordo.jpg", "oggi-mordo2.jpg", "porta-uncinetti.jpg", "spazzolino.jpg", "spazzolino1.jpg", "tonica-come-il-gin.jpg"];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE.filter(Boolean).map(u => new Request(u, {cache:'reload'})))));

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
