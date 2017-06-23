//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('install', function (event) {
    var version = 'v4';

    console.log('Installing ' + version + ' ...');
    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    event.waitUntil(
        caches.open(version).then(function (cache) {
            //noinspection JSUnresolvedFunction
            return cache.addAll([
                'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
                'https://maxcdn.bootstrapcdn.com/bootstrap/latest/fonts/glyphicons-halflings-regular.woff2',
                '/wodadvisor/favicon.ico',
                '/wodadvisor/index.html',
                '/wodadvisor/logo.png',
                '/wodadvisor/static/css/main.160e3cd3.css',
                '/wodadvisor/static/js/main.241b9847.js'

            ]).catch(function (error) {
                console.log('Add all failed with ' + error);
            });
        })
    );
});

//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('activate', function (event) {
    var version = 'v4',
        cacheWhitelist = [version];

    console.log(`Activating ${version}...`);

    //noinspection JSUnresolvedFunction, JSUnresolvedVariable
    event.waitUntil(
        //noinspection JSUnresolvedVariable
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                console.log('Processing key ' + key);
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('Removing key ' + key + ' from cache');
                    //noinspection JSUnresolvedVariable
                    return caches.delete(key);
                }
            }));
        })
    );
});


//noinspection ThisExpressionReferencesGlobalObjectJS
this.addEventListener('fetch', function (event) {
    var version = 'v4';

    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
    event.respondWith(
        caches.match(event.request).then(function (resp) {
            if (resp) {
                console.log('Found ' + event.request.url + ' in the cache.');
            }
            return resp || fetch(event.request).then(function (response) {
                    //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                    return caches.open(version).then(function (cache) {
                        console.log('Adding ' + event.request.url + ' to the cache.');
                        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
        })
    );
});


