class Dep {
  constructor() {
    // 观察者列表
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify(newVal) {
    this.subs.forEach(watcher => watcher.update(newVal));
  }
}