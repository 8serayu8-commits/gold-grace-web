const CACHE_NAME = 'jadtra-v1.2.0';
const STATIC_CACHE = 'jadtra-static-v1.2.0';
const DYNAMIC_CACHE = 'jadtra-dynamic-v1.2.0';

const STATIC_ASSETS = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/blog',
  '/tax-calculator',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

const API_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STATIC_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// Install event - cache static assets with error handling
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker v1.2.0');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
        // Continue installation even if caching fails
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker v1.2.0');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback and crash prevention
self.addEventListener('fetch', (event) => {
  try {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests and chrome extensions
    if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
      return;
    }

    // Handle different types of requests with error handling
    if (url.origin === self.location.origin) {
      // Same-origin requests
      if (STATIC_ASSETS.includes(url.pathname) || url.pathname === '/') {
        // Static assets - cache first strategy
        event.respondWith(cacheFirst(request).catch(() => networkOnly(request)));
      } else if (url.pathname.startsWith('/blog/') || url.pathname.startsWith('/tax-calculator')) {
        // Dynamic pages - network first strategy
        event.respondWith(networkFirst(request).catch(() => cacheFirst(request)));
      } else {
        // Other same-origin requests - stale while revalidate
        event.respondWith(staleWhileRevalidate(request).catch(() => networkOnly(request)));
      }
    } else {
      // Cross-origin requests - network only
      event.respondWith(networkOnly(request));
    }
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    // Fallback to network if anything fails
    event.respondWith(networkOnly(event.request));
  }
});

// Cache strategies
function cacheFirst(request) {
  return caches.match(request)
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          const responseClone = response.clone();
          caches.open(STATIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone);
            });
          
          return response;
        });
    });
}

function networkFirst(request) {
  return fetch(request)
    .then((response) => {
      if (!response || response.status !== 200) {
        return caches.match(request);
      }
      
      const responseClone = response.clone();
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          cache.put(request, responseClone);
        });
      
      return response;
    })
    .catch(() => {
      return caches.match(request);
    });
}

function staleWhileRevalidate(request) {
  return caches.open(DYNAMIC_CACHE)
    .then((cache) => {
      return cache.match(request)
        .then((response) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            });
          
          return response || fetchPromise;
        });
    });
}

function networkOnly(request) {
  return fetch(request);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions, analytics, etc.
  return Promise.resolve();
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const options = {
    body: event.data.text(),
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('JADTRA Consulting', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

function syncContent() {
  // Sync blog content, tax rates, etc.
  return fetch('/api/sync-content')
    .then(response => response.json())
    .then(data => {
      // Update cache with fresh content
      return caches.open(DYNAMIC_CACHE)
        .then(cache => {
          return Promise.all(
            Object.keys(data).forEach(key => {
              cache.put(new Request(key), new Response(JSON.stringify(data[key])));
            })
          );
        });
    });
}
