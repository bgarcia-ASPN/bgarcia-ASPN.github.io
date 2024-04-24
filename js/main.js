if('serviceWorker' in navigator){
    console.log('Service Worker supported.');
    window.addEventListener('load', function(){
        navigator.serviceWorker
            .register('../sw_cache_site.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log(`ServiceWorker Error ${err}`));
    });
}