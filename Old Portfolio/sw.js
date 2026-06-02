// Service Worker - Offline Support & Caching
const CACHE_NAME = "portfolio-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/offline.html",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log("Cache error:", err))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network First Strategy
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip external requests (Google Analytics, etc.)
  if (
    event.request.url.includes("google") ||
    event.request.url.includes("external")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((response) => {
          return response || caches.match("/offline.html");
        });
      })
  );
});

// Background Sync (Optional - for contact form)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-contact") {
    event.waitUntil(syncContact());
  }
});

async function syncContact() {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pendingData),
    });
    if (response.ok) {
      pendingData = null;
    }
  } catch (err) {
    console.log("Sync failed:", err);
  }
}

// Push Notifications (Optional)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "/icon-192x192.png",
    badge: "/badge-72x72.png",
    tag: "notification",
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification("Portfolio Alert", options)
  );
});
