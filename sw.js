importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

if (workbox) {
    workbox.routing.registerRoute(
        new RegExp('https://opentdb.com/api.php?amount=10'),
        new workbox.strategies.NetworkFirst()
    );
}