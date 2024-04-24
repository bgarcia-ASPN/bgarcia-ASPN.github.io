/** 
 * Basic Service Worker to cache static files to be available when offline
 * */ 

//Cache names and assets
const cacheName = 'v1'

const cacheAssets = [
    'index.html',
    'about.html',
    '/js/main.js'
];

//Call the install event
self.addEventListener('install', function(e) {
    console.log(`Service Worker Installed Cache ${cacheName}`);

    //When installing the SW, we want to cache the assets we indicated
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => {self.skipWaiting()})
    );
});

//Call the activate event
self.addEventListener('activate', function(e) {
    console.log('Service Worker Activated');

    //When activate event we want to clean old unwanted caches
    e.waitUntil(
         //.then() uses an object with all cache names in nav App. Returns a Promise where we want to delete old caches that is not the current one we are storing
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log(`Service Worker Clearing Old Cache: ${cache}`)
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
});

//Call the fetch event. Whenever a request is made this is called
self.addEventListener('fetch', function(e) {
    console.log('Service Worker Fetching');

    //When fetch event we check if the livesite is available. If not, we call the cache files. That's why is inside the .catch()
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )

});