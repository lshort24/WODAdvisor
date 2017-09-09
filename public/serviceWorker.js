const version = 'v6';

self.addEventListener('install', event => {
   console.log('Installing WOD Advisor service worker version ' + version);

   // add our files to the cache
   event.waitUntil(
      caches.open(version).then((cache) => {
         return cache.addAll([
            '/wodadvisor/index.html',
            '/wodadvisor/logo.png',
            '/wodadvisor/static/js/main.52e3fe93.js',
            '/wodadvisor/static/css/main.160e3cd3.css'
         ]).catch((error) => {
            console.log('Add all failed with ' + error);
         });
      })
   );
});

self.addEventListener('activate', event => {
   // delete any caches that aren't the latest version
   event.waitUntil(
      caches.keys().then(keys => Promise.all(
         keys.map(key => {
            if (key !== version) {
               return caches.delete(key);
            }
         })
      )).then(() => {
         console.log('WOD Advisor service worker now ready to handle fetches!');
      })
   );
});

self.addEventListener('fetch', event => {
   event.respondWith(
      caches.match(event.request).then((resp) => {
         if (resp) {
            console.log('Found ' + event.request.url + ' in the WOD Advisor service worker cache.');
         }
         return resp || fetch(event.request).then((response) => {
            return caches.open(version).then((cache) => {
               console.log('Adding ' + event.request.url + ' to the WOD Advisor service worker cache.');
               cache.put(event.request, response.clone());
               return response;
            });
         });
      })
   );
});