const V='hostefacil-v3';
const PRE=['./','tesseract.min.js','worker.min.js','tesseract-core-lstm.wasm.js','tesseract-core-simd-lstm.wasm.js','mrz.traineddata'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  const heavy=/\.(wasm\.js|traineddata)$|tesseract\.min\.js$|worker\.min\.js$/.test(u.pathname);
  if(heavy){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const c=x.clone();if(x.ok)caches.open(V).then(y=>y.put(e.request,c));return x})));return;}
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();if(r.ok)caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
});
