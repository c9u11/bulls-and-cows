console.log('Hello from service worker!');

const cacheData = 'BullsAndCows';
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/index.html',
        '/',
        '/users',
      ]);
    })
  );
});

this.addEventListener('fetch', (event) => {
  if (!navigator.onLine) {
    event.respondWith(async function () {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;

      const response = await event.preloadResponse;
      if (response) return response;

      return fetch(event.request);
    }());
  }
});