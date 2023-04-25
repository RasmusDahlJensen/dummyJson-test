const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

const assets = [
	"./index.html",
	"./fallback.html",
	"./app.js",
	"./assets/css/main.css",
	"./manifest.json",
];

const limitCacheSize = (cacheName, numAllowedFiles) => {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > numAllowedFiles) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles));
			}
		});
	});
};

//Install service worker
self.addEventListener("install", (event) => {
	// console.log("Service Worker has been installed", event);

	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			// console.log("Caching all assets", cache);
			cache.addAll(assets);
		})
	);
});

//Activate serviceworker
self.addEventListener("activate", (event) => {
	// console.log("Service worker has been activated", event);
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

// Fetch
self.addEventListener("fetch", (event) => {
	if (!(event.request.url.indexOf("http") === 0)) return;
	// console.log(event.request);

	event.respondWith(
		caches.match(event.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(event.request).then((fetchRes) => {
					return caches.open(dynamicCacheName).then((cache) => {
						cache.put(event.request.url, fetchRes.clone());
						limitCacheSize(dynamicCacheName, 2);
						return fetchRes;
					});
				})
			);
		})
	);
});
