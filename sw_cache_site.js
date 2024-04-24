/** 
 * Basic Service Worker to cache the site after fetching.
 * This helps to catch the site page until you visit it
 * */ 

//Cache names and assets
const cacheName = 'v2'

//Call the install event
self.addEventListener('install', function(e) {
    console.log(`Service Worker Installed Cache ${cacheName}`);
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
        fetch(e.request).then(res => {
            //Make a copy/clone of the server response
            const resClone = res.clone();
            // Open cache
            caches
                .open(cacheName)
                .then(cache => {
                    //Add response to cache
                    cache.put(e.request, resClone);
                });
            return res
        }).catch(err => caches.match(e.request).then(res => res))
    )

});