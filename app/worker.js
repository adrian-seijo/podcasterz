
const ASSET_CACHE = 'cache-v6';

const assets = [
	'/',
	'/index.html',
	'/manifest.json',
	'/assets/gayoso.jpg',
	'/assets/gayoso.faded.jpg',
	'/assets/icon.192.png',
	'/assets/icon.512.png',
	'/assets/podcasterz.png',
	'/lib/style.css',
	'/lib/main.js',
	'/lib/state.js',
	'/lib/common/format.js',
	'/lib/common/renderPodcastDetail.js',
	'/lib/home/index.js',
	'/lib/home/render.js',
	'/lib/home/actions/search.js',
	'/lib/home/actions/topPodcasts.js',
	'/lib/podcast/index.js',
	'/lib/podcast/render.js',
	'/lib/podcast/actions/podcastDetails.js',
	'/lib/episode/index.js',
	'/lib/episode/render.js',
	'/lib/util/dom.js',
	'/lib/util/nav.js',
];

const cacheInit = async () => {
	// const {hostname} = self.location;
	// if (hostname === 'localhost') return;

	const cache = await caches.open(ASSET_CACHE);
	return cache.addAll(assets);
};

const copyResponse = async (response) => {
	const clone = response.clone();
	const body = await clone.blob();

	const {status, statusText, headers} = clone;
	const headerKeys = Array.from(headers.keys());

	return new Response(body, {
		status,
		statusText,
		headers: headerKeys.reduce((result, key) => {
			result[key] = headers.get(key);
			return result;
		}, {
			'last-fetched': (new Date()).toISOString()
		})
	});
};

const fetchAndCache = async (request) => {
	const response = await fetch(request);

	if (!response || !response.ok) {
		return response;
	}

	const resToCache = await copyResponse(response);

	const cache = await caches.open(ASSET_CACHE);
	cache.put(request, resToCache);

	return response;
};

const isOlderThanADay = (date) => {
	const now = new Date();
	now.setDate(now.getDate() - 1);
	return new Date(date) < now;
};

const handleRequest = async ({request}) => {
	const response = await caches.match(request);

	// We got a cache hit but it is from a function so check the last fetched date
	// to see how old it is. If it is older than a day we fetche and cache it and if not we retuern it
	if (response && response.url.includes('/.netlify/functions/')) {
		const lastFetched = response.headers.get('last-fetched');
		const cacheIsTooOld = isOlderThanADay(lastFetched);
		return cacheIsTooOld ? fetchAndCache(request) : response;
	}

	if (response) return response;

	// If it is a request to the same origin as the worker we fetch and cache
	if (request.url.startsWith(self.location.origin)) {
		return fetchAndCache(request);
	}

	return fetch(request);
};

/**
 * Gop through all the caches we have and delete the ones that don't match the current one
 * @async
 */
const deleteOldCaches = async () => {
	const cacheNames = await caches.keys();

	cacheNames
		.filter((name) => name !== ASSET_CACHE)
		.forEach((name) => caches.delete(name));
};

self.addEventListener('install', (event) => event.waitUntil(cacheInit()));
self.addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));
self.addEventListener('activate', (event) => event.waitUntil(deleteOldCaches()));
