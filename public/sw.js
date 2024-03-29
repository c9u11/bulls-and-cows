console.log('Hello from service worker!');

const cacheData = 'BullsAndCows';
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        '/static/js/main.d651aa26.js',
        '/static/css/main.d19daf27.css',
        '/index.html',
        '/',
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

      return fetch(event.request.clone());
    }());
  }
});