// self 代表当前的 Service Worker(sw)
const CACHE_NAME = 'cache-v1';// 缓存版本号, 每次都会更新, 这里只是演示
// 安装
self.addEventListener('install', e => {
  console.log(caches)
  console.log('install', e)
  // e.waitUntil(new Promise(resolve => {
  //   setTimeout(resolve, 2000);
  // }));
  // 直接停止旧版本,激活新版本
  // e.waitUntil(self.skipWaiting());
  // 打开缓存空间并写入资源到缓存中
  e.waitUntil(caches.open(CACHE_NAME).then(cache => {
    // 写入缓存
    // 资源列表应该在项目构建期间自动得到, 而不是手动维护
    cache.addAll([
      '/pwa/'
    ])
  }))
})
// 激活
self.addEventListener('activate', e => {
  console.log('activate', e)
  // 使得所有页面的首次渲染受到 sw 的控制
  // e.waitUntil(self.clients.claim());
  // 清理上一版本的缓存缓存
  e.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }))
  }))
})
// 捕获请求
self.addEventListener('fetch', e => {
  console.log('fetch', e)
  // 打开缓存空间查询对应资源, 并会返回查询结果
  // 如果没有查找到相关资源, 则发起请求, 返回请求结果
  e.respondWith(caches.open(CACHE_NAME).then(cache => {
    // match 查询缓存资源
    return cache.match(e.request).then(response => {
      if (response) {
        return response
      }
      return fetch(e.request).then(response => {
        // 获取资源后, 将其加入缓存中
        cache.put(e.request, response.clone());
        return response;
      })
    })
  }))
})
