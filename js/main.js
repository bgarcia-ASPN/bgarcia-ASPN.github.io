if('serviceWorker' in navigator){
    console.log('Service Worker supported.');
    window.addEventListener('load', function(){
        navigator.serviceWorker
            .register('../service-worker.js')
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log(`Service Worker Error ${err}`));
    });
}