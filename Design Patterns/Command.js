~(function() {
  var CarManager = {
    // 请求信息
    requestInfo(model, id) {
      return `The information for ${model} with ID ${id} is foobar`;
    },
    // 订购汽车
    buyVehicle(model, id) {
      return `You have successfully purchased Item ${id}, a ${model}`;
    },
    // 组织一个 view
    arrangeViewing(model, id) {
      return `You have successfully booked a viewing of ${model} (${id})`;
    }
  };

  // 一个对象集合了几个行为，我们只需要调用 CarManager 中相应的方法就可以触发行为。
  // 但是，这在某些情况下是不利的，如果 CarManager 里的核心 API 改变了，这将要求程序里所有直接访问这些方法的对象都需要进行修改。
  // 这可能被视为一个耦合层，它实际上最大程度地违反了松耦合对象的 OOP 方法论
  // 这时候，我们可以抽象一个执行方法，接受一个行为以及该行为需要的任意数据作为参数
  CarManager.execute = (action, ...arg) => {
    return CarManager[action] && CarManager[action](...arg);
  };
  // 这就给了我们一个统一的接口来触发不同的行为
  console.log(CarManager.execute('buyVehicle', '宝马', 'x5'));
})();
