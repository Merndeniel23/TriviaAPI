importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

if (workbox) {
    workbox.routing.registerRoute(
        new RegExp('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min'),
        new workbox.strategies.NetworkFirst()
    );
}