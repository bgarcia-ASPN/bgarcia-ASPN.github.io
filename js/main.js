if('serviceWorker' in navigator){
    console.log('Service Worker supported.');
    window.addEventListener('load', function(){
        navigator.serviceWorker
            .register('../service-worker.js')
            // .then(reg => console.log('Service Worker Registered'))
            .then(function(reg) {
                console.log('Service Worker Registered')
                return reg.sync.getTags();
            }).then(function(tags) { 
                if (tags.includes('syncTest')) console.log("There's already a background sync pending");
            })
            .catch(err => console.log(`Service Worker Error ${err}`));
        });
    // navigator.serviceWorker.ready.then(function(swRegistration) {
    //     return swRegistration.sync.register('myFirstSync');
    // });
}
var _testInterval;
var logElem = document.querySelector('#log');

document.addEventListener("DOMContentLoaded", function(event) {
    startTimer();
});

    
document.querySelector('.register').addEventListener('click', function(event) {
    event.preventDefault();
    startTimer();
  });

document.querySelector('.stop').addEventListener('click', function(event) {
    event.preventDefault();
    if(_testInterval)
    {
        clearInterval(_testInterval);   
        log('Timer stopped');
    }
});


function sendNotification(){
    new Promise(function(resolve, reject) {
        Notification.requestPermission(function(result) {
          if (result !== 'granted') return reject(Error("Denied notification permission"));
          resolve();
        })
      }).then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(reg) {
        return reg.sync.register('syncTest');
      }).then(function() {
        log('Sync event fired.');
      }).catch(function(err) {
        console.log('It broke');
        console.log(err.message);
      });
};

function log(msg) {
    let p = document.createElement('p');
    p.textContent = msg;
    logElem.appendChild(p);
    console.log(msg);
}

function startTimer(){
    let timer = parseInt(document.querySelector('#timer').value) * 1000;
    if(timer != 0 || timer != null){
        _testInterval = setInterval(sendNotification, timer);
        log('Timer started');
    }
}