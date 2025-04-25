const CACHE = 'memorai-cache-v1';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll([
      '/', '/index.html', '/bundle.js', '/manifest.json'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
