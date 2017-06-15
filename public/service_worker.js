//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('install', function(event) {
   var version = 'v3';

   console.log('Installing ' + version + ' ...');
   event.waitUntil(
      caches.open(version).then(function(cache) {
         return cache.addAll([
            '/wodadvisor/index.html',
            '/wodadvisor/logo.png'
         ]).catch(function(error) {
            console.log('Add all failed with ' + error);
         });
      })
   );
});

//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('activate', function(event) {
   var version = 'v3',
       cacheWhitelist = [version];

   console.log('Activating v2...');

   event.waitUntil(
      caches.keys().then(function(keyList) {
         return Promise.all(keyList.map(function(key) {
            console.log('Processing key ' + key);
            if (cacheWhitelist.indexOf(key) === -1) {
               console.log('Removing key ' + key + ' from cache');
               return caches.delete(key);
            }
         }));
      })
   );
});


//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('fetch', function(event) {
   var version = 'v3';

   event.respondWith(
      caches.match(event.request).then(function(resp) {
         if (resp) {
            console.log('Found ' + event.request.url + ' in the cache.');
         }
         return resp || fetch(event.request).then(function(response) {
               return caches.open(version).then(function(cache) {
                  console.log('Adding ' + event.request.url + ' to the cache.');
                  cache.put(event.request, response.clone());
                  return response;
               });
            });
      })
   );
});


