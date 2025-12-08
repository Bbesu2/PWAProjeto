
const CACHE_NAME = 'my-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './src/View/Cadastro.html',
  './src/View/Atualizar.html',
  './src/View/PaginaInicial.html',
  './src/View/Usuario.html',
  './PWAProjeto/icons/icon-48.png',
  './PWAProjeto/icons/icon-256.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {

      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});