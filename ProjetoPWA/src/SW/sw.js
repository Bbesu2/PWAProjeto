self.addEventListener('install', event => {
    console.log('sw ./ => installing...');

    event.waitUntil(
        caches.open('static-v1').then(cache => cache.add('/cat.svg'))
    );
    
    console.log("sw ./ =>  install event detected e cat.svg cacheado!!!");
    
});


self.addEventListener('activate', event => {
    console.log('sw ./ => Evento activate ocorreu, agora pronto pra interceptar fetches');
});


self.addEventListener('fetch', event => {
    console.log("sw ./ => Detectei um evento fetch para o recurso abaixo:");
    console.log("sw ./ => "+event.request.url);
    
    const url = new URL(event.request.url);
    
    if (url.origin == location.origin && url.pathname == '/dog.svg') {
        event. respondWith(caches.match('/cat.svg'));
    }
});