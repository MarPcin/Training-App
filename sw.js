const CACHE = 'training-v3';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.add('./'))
  );
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

// Timer notification scheduling
let notifTimer = null;

self.addEventListener('message', e => {
  if (e.data.type === 'SCHEDULE_NOTIF') {
    if (notifTimer) { clearTimeout(notifTimer); notifTimer = null; }
    const { delayMs, name } = e.data;
    const delay = Math.max(0, delayMs);
    notifTimer = setTimeout(() => {
      notifTimer = null;
      self.registration.showNotification('\u23f1 Rest done!', {
        body: 'Time to get back to ' + name + ' \u2014 next set!',
        icon: './apple-touch-icon-180.png',
        badge: './apple-touch-icon-180.png',
        tag: 'rest-timer',
        renotify: true,
        requireInteraction: false,
        vibrate: [200, 100, 200]
      });
    }, delay);
  }
  if (e.data.type === 'CANCEL_NOTIF') {
    if (notifTimer) { clearTimeout(notifTimer); notifTimer = null; }
  }
});
