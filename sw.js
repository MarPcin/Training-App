const CACHE = 'training-v3';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add('./')));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return res;
    }))
  );
});

// Show notification on demand from page
self.addEventListener('message', e => {
  if (e.data.type === 'SHOW_NOTIF') {
    const name = e.data.name || 'exercise';
    self.registration.showNotification('\u23f1 Rest done!', {
      body: 'Time to get back to ' + name + ' \u2014 next set!',
      icon: './apple-touch-icon-180.png',
      badge: './apple-touch-icon-180.png',
      tag: 'rest-timer',
      renotify: true,
      vibrate: [200, 100, 200]
    });
  }
});
