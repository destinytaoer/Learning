// self 代表当前的 Service Worker(sw)
// 安装
self.addEventListener('install', e => {
  console.log('install', e)
  // e.waitUntil(new Promise(resolve => {
  //   setTimeout(resolve, 2000);
  // }));
  // 直接停止旧版本,激活新版本
  e.waitUntil(self.skipWaiting());
})
// 激活
self.addEventListener('activate', e => {
  console.log('activate', e)
  // 使得所有页面的首次渲染受到 sw 的控制
  e.waitUntil(self.clients.claim());
})
// 捕获请求
self.addEventListener('fetch', e => {
  console.log('fetch', e)
})
