class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    // 要将原有的属性改成 get 和 set 的形式
    // data 必须是一个对象
    if (!data || typeof data !== 'object') {
      return;
    }

    // 要将数据一一劫持
    // 先获取到 data 的 key 和 value
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      // 深度劫持
      this.observe(data[key]);
    });
  }
  // 定义响应式数据
  defineReactive(obj, key, value) {
    let that = this;
    // 每个变化的数据都会对应一个观察者列表，存放所有更新操作
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 获取值时调用
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        // 更改值时调用的方法
        if (newVal != value) {
          // 在设置值为新对象时，也需要对里面的属性进行劫持
          that.observe(newVal);
          value = newVal;
          dep.notify(newVal);
        }
      }
    })
  }
}