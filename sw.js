const CACHE_NAME = 'sshihabb007-pwa-v12';
const STATIC_ASSETS = [
    './',
    './css/style.css',
    './js/theme.js',
    './js/load-components.js',
    './js/shihab-security.js',
    './asset/fav.png',
    './currency-converter/',
    './currency-converter/index.html',
    './currency-converter/style.css',
    './currency-converter/script.js',
    './currency-converter/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    // Do not cache heavy files or external requests
    if (requestUrl.pathname.endsWith('.wasm') || requestUrl.pathname.endsWith('.wav') || requestUrl.pathname.endsWith('.pdf')) {
        return;
    }

    if (event.request.method !== 'GET') {
        return;
    }

    // Stale-While-Revalidate Strategy
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const networkFetch = fetch(event.request).then((response) => {
                // Update cache with new response
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Fallback if offline and network fails
            });

            // Return cached response immediately if available, otherwise wait for network
            return cachedResponse || networkFetch;
        })
    );
});
