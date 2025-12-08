
const CACHE_NAME = 'my-cache-v1';

const urlsToCache = [
  './',
  './index.html',
  './src/View/Cadastro.html',
  './src/View/Atualizar.html',
  './src/View/PaginaInicial.html',
  './src/View/Usuario.html',
  '/PWAProjeto/icons/icon-48.png',
  '/PWAProjeto/icons/icon-256.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
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