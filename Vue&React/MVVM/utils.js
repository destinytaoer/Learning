let utils = {
  // 获取实例上对应的数据
  getVal(vm, expr) {
    expr = expr.split('.');
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
      return this.getVal(vm, arg[1]);
    })
  },
  setVal(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        prev[next] = value;
      }
      return prev[next];
    }, vm.$data);
  }
}