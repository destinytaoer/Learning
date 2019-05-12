class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 如果能够获取到，才开始编译
      // 1. 先把这些真实的 DOM 移入内存中 fragment
      let fragment = this.node2fragment(this.el);
      // 2. 编译 => 提取想要的元素节点 v-* 和文本节点 {{}}
      this.compile(fragment);

      // 3. 把编译好的 fragment 放到页面中
      this.el.appendChild(fragment);
    }
  }
  /* 辅助方法 */
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDirective(name) {
    return name.slice(0, 2) === 'v-';
  }
  /* 核心方法 */
  node2fragment(node) {
    let fragment = document.createDocumentFragment();

    let firstChild;

    // 将真实 DOM 中的元素放入文档碎片中，就会从 DOM 树中移除该节点

    // 每次都将第一个节点移入内存中
    while (firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(fragment) {
    // 需要进行递归编译
    let childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      // 元素节点
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node);
        // 继续递归节点
        this.compile(node);
      } else {// 文本节点
        // 编译文本节点
        this.compileText(node);
      }
    })
  }
  compileElement(node) {
    // 带有指令 v-* 才进行操作
    // 获取节点的所有属性
    let attrs = node.attributes // 类数组
    Array.from(attrs).forEach(attr => {
      // {name: , value: }
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 取到对应的值放到节点中
        let expr = attr.value;
        let directive = attrName.slice(2);
        // 通过 node、 vm.$data，进行 expr 的执行
        DirectiveMap[directive](node, this.vm, expr);
      }
    })
  }
  compileText(node) {
    // 带有 {{}} 才进行操作
    // 取文本中的内容
    let expr = node.textContent; 
    let reg = /\{\{([^}]+)\}\}/g;

    if (reg.test(expr)) {
      // 通过 node vm.$data text， 进行  expr 的执行
      DirectiveMap['text'](node, this.vm, expr);
    }
  }
}

let updater = {
  // 文本更新
  textUpdater(node, value) {
    node.textContent = value;
  },
  // 输入框更新
  modelUpdater(node, value) {
    node.value = value;
  }
}

let DirectiveMap = {
  text(node, vm, expr) { // 文本处理
    let updateFn = updater['textUpdater'];
    
    let value = utils.getTextVal(vm, expr);

    // expr：{{a}} {{b}} 可能会有多个值
    expr.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
      new Watcher(vm, arg[1], (newValue) => {
        // 数据变化时，文本节点需要重新获取依赖的属性更新文本中的内容
        updateFn && updateFn(node, utils.getTextVal(vm, expr));
      });
    })
    

    updateFn && updateFn(node, value);
  },
  model(node, vm, expr) { // 输入框处理
    let updateFn = updater['modelUpdater'];
    
    let value = utils.getVal(vm, expr);

    // 当值变化后会将新值更新到页面中
    new Watcher(vm, expr, (newValue) => {
      updateFn && updateFn(node, newValue);
    });
    // 绑定输入框事件实现双向绑定
    node.addEventListener('input', e => {
      let newValue = e.target.value;
      utils.setVal(vm, expr, newValue);
    })
    updateFn && updateFn(node, value);
  }
}
