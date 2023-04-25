const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
	"/index.html",
	"/fallback.html",
	"./app.js",
	"./assets/css/main.css",
	"/manifest.json",
];

//Åben og limit cache
const limitCacheSize = (cacheName, numAllowedFiles) => {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > numAllowedFiles) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles));
			}
		});
	});
};

// Install Service Worker
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			cache.addAll(assets);
		})
	);
});

// Install Service Worker
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== staticCacheName)
					.map((key) => caches.delete(key))
			);
		})
	);
});

// Fetch event
self.addEventListener("fetch", (event) => {
	// Kontroller svar på request
});
