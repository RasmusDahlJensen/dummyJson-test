const staticCacheName = "site-static-v1";

caches.open("my-cache").then(function (cache) {
	// Cache er åben
});

// Array med filer
const assets = [
	"/index.html",
	"/fallback.html",
	"./app.js",
	"./assets/css/main.css",
	"/manifest.json",
];

// Install Service Worker
self.addEventListener("install", (event) => {
	// console.log("Service Worker has been installed");
	event.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			// console.log("Caching all assets", cache);
			cache.addAll(assets);
		})
	);
});

// Install Service Worker
self.addEventListener("activate", (event) => {
	// console.log("Service Worker has been activated");
});

// Fetch event
// Fetch event
self.addEventListener("fetch", (event) => {
	// Kontroller svar på request
});
