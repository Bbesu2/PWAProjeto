const CACHE_NAME = 'my-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './Cadastro.html',
  './Atualizar.html',
  './PaginaInicial.html',
  './Usuario.html',
  '/PWAProjeto/icons/icon-48.png',
  '/PWAProjeto/icons/icon-256.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
