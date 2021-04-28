"use strict";

const resourcesToCache = [
  "/",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/js/vendors~main.chunk.js",
  "/static/js/main.chunk.js"
];

const cacheVersion = "v1";

function handleInstall(e) {
  e.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll(resourcesToCache);
    })
  );
}

function handleFetch(e) {
  const isNeedToCache =
    e.request.url.startsWith("http") &&
    e.request.method === "GET" &&
    resourcesToCache.some(r => e.request.url.endsWith(r));

  if (!isNeedToCache) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(e.request).then(function(response) {
          let responseClone = response.clone();

          caches.open(cacheVersion).then(function(cache) {
            cache.put(e.request, responseClone);
          });

          return response;
        });
      }
    })
  );
}

function handleActivate(e) {
  var cacheKeeplist = [cacheVersion];

  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
}

self.addEventListener("install", handleInstall);
self.addEventListener("fetch", handleFetch);
self.addEventListener("activate", handleActivate);
