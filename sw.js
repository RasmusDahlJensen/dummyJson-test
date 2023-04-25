// Define the cache names for the static and dynamic caches
const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

// Define the assets that need to be cached
const assets = [
	"./index.html",
	"./fallback.html",
	"./app.js",
	"./assets/css/main.css",
	"./manifest.json",
];

// Function to limit the cache size
const limitCacheSize = (cacheName, numAllowedFiles) => {
	caches.open(cacheName).then((cache) => {
		cache.keys().then((keys) => {
			if (keys.length > numAllowedFiles) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numAllowedFiles));
			}
		});
	});
};

// Install service worker
self.addEventListener("install", (event) => {
	// console.log("Service Worker has been installed", event);

	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			// console.log("Caching all assets", cache);
			cache.addAll(assets);
		})
	);
});

// Activate service worker
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

// Fetch event listener
self.addEventListener("fetch", (event) => {
	// Limit the size of the dynamic cache
	limitCacheSize(dynamicCacheName, 2);

	// If the request is not over http/https, ignore it
	if (!(event.request.url.indexOf("http") === 0)) return;

	event.respondWith(
		caches.match(event.request).then((cacheRes) => {
			// If the cache has the requested resource, return it
			if (cacheRes) {
				return cacheRes;
			} else if (event.request.headers.get("accept").includes("text/html")) {
				// If the request is for an HTML file, return the fallback page
				return caches.match("./fallback.html");
			} else {
				// Otherwise, fetch the resource and add it to the dynamic cache
				return fetch(event.request).then((fetchRes) => {
					return caches.open(dynamicCacheName).then((cache) => {
						cache.put(event.request.url, fetchRes.clone());
						limitCacheSize(dynamicCacheName, 2);
						return fetchRes;
					});
				});
			}
		})
	);
});
