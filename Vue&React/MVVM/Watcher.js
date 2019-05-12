// 观察者的目的就是页面中出现数据的地方都增加一个观察者，当数据变化后执行对应的方法。
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;

    // 获取旧值
    this.value = this.get();
  }
  get() {
    Dep.target = this;
    let value = utils.getVal(this.vm, this.expr);
    Dep.target = null;
    return value;
  }
  // 对外暴露的方法
  update(newVal) {
    let oldVal = this.value;
    if (newVal != oldVal) {
      this.cb(newVal); // 对应 watch 的 callback
    }
  }
}
// 新值和旧值的比对，如果发生变化就调用更新方法 vm.$data expr
// Vue 中的 watch 都是利用 Watcher
// vm.$watch(vm, 'a', function(params) {
//   
// })
// {
//   watch() {

//   }
// }