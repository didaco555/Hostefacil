const V='hostefacil-v1';
const PRE=['./','vendor/tesseract.min.js','vendor/worker.min.js','vendor/tesseract-core-lstm.wasm.js','vendor/tesseract-core-simd-lstm.wasm.js','vendor/mrz.traineddata'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.includes('/vendor/')){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return;}
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
