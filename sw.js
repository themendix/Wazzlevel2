// Ce service worker ne fait qu'une chose : nettoyer une installation précédente
// (qui gardait en cache une ancienne version de l'app) puis se désinstaller.
// L'app n'utilise plus de service worker pour l'instant, le temps de stabiliser
// les mises à jour — voir README.md.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      const clientsList = await self.clients.matchAll({ type: "window" });
      clientsList.forEach((client) => {
        try {
          client.navigate(client.url);
        } catch (e) {
          /* ignore */
        }
      });

      await self.registration.unregister();
    })()
  );
});
