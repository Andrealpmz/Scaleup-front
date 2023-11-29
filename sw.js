const STATIC_CACHE = "static-v1";

const APP_SHELL = [
  "./",
  "./index.html",
  "./src/styles.css",
  "./src/main.ts",
  "./src/assets/images/logo.png",
];

self.addEventListener("Instalar", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  e.waitUntil(cacheStatic);
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res || fetch(e.request);
      })
  );
});