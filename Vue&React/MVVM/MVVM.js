
class MVVM {
  constructor(options) {
    // 先把可用的东西挂载到实例上
    this.$el = options.el;
    this.$data = options.data;

    // 如果有要编译的模板就开始编译
    if (this.$el) {
      // 数据劫持，就是把实例的所有属性改成 get set 方式
      new Observer(this.$data);
      this.proxyDate(this.$data);
      // 使用数据和元素进行编译，传入的 this 为 MVVM 实例
      new Compile(this.$el, this);
    }
  }
  proxyDate(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      })
    })
  }
}