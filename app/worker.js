
console.log('I\'m a worker!');

const ASSET_CACHE = 'asset-cache-v2';

const assets = [
	'/index.html',
	'/assets/gayoso.jpg',
	'/assets/gayoso.faded.jpg',
	'/assets/icon.192.png',
	'/assets/icon.512.png',
	'/assets/podcasterz.png',
	'/lib/style.css'
];

const cacheAssets = async () => {
	const cache = await caches.open(ASSET_CACHE);
	return cache.addAll(assets);
};

// const fetchAndCache = async (request) => {
// 	const response = await fetch(request);
//
// 	if (!response || !response.ok) {
// 		return response;
// 	}
//
// 	const resToCache = response.clone();
//
// 	const cache = await caches.open(ASSET_CACHE);
// 	cache.put(request, resToCache);
//
// 	return response;
// };

const handleAssetRequest = async (event) => {
	const response = await caches.match(event.request);

	if (response) return response;
	return fetch(event.request, {mode: 'no-cors'});
};

const resetAssetCache = async () => {
	const cacheNames = await caches.keys();

	if (!cacheNames.includes(ASSET_CACHE)) return;
	caches.delete(ASSET_CACHE);
};

self.addEventListener('install', (event) => event.waitUntil(cacheAssets()));
self.addEventListener('fetch', (event) => event.respondWith(handleAssetRequest(event)));
self.addEventListener('activate', (event) => event.waitUntil(resetAssetCache()));
