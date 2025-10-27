const cacheName = "";
const urlsToCache = [

]

self.addEventListener("install", (event)=>{
    console.log("sw intsall");
    event.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
        return cache.addAll(urlsToCache)       
        }
        )
    )
})
self.addEventListener("fetch", (event)=>{
    console.log("sw fetch");
    if(event.request.url.includes('/')){
        event.respoondWith(
            fetch(event.request)
            .then(networkResponse => {
                return caches
                .open(cacheName)
                .then(cache =>{
                    cache.put(event.request, networkResponse.clone())
                    return networkResponse;
                })
            }).catch(()=>{
                return caches
                .match(event.request)
                .then(cachedRespose => {
                    if(cachedRespose){
                        return cachedRespose
                    }else{
                        return new Response(JSON.stringify([]), {headers: {'Content-type' : 'application/json'}})
                    }
                })
            })
        )
    }
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
            return response || fetch(event.request);
        })
    )
})
self.addEventListener("active", (event)=>{
    console.log("sw activate");
    const cacheWhiteList =[cacheName]
    event.waitUtil(
        caches.keys().then(cacheNames=> {
            return Promise.all(cacheNames.map(cacheName =>{
                if(![cacheWhiteList].includes(cacheName)){
                    return caches.delete(cacheName);
                }
            }))
        }
        )
    )
})