function setAttr(node, key, value) {
  let formEL = ['input', 'textarea', 'select'];
  // 处理函数
  let processFnMap = {
    'value': () => {
      if (formEL.includes(node.tagName.toLowerCase())) {
        // 设置值时，需要考虑 input 等表单元素
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
    },
    'style': () => {
      node.style.cssText = value;
    }
  }
  if (processFnMap[key]) {
    processFnMap[key].call(this);
    return;
  }
  // 默认处理
  node.setAttribute(key, value);
}
function render(vDom) {
  let el = document.createElement(vDom.type);
  
  // 设置属性
  let props = vDom.props;
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      setAttr(el, key, props[key]);
    }
  }
  vDom.children.forEach(child => {
    // child 可能是元素，也可能是文本
    child = (child instanceof Element) ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  })

  return el;
}

function renderDom(el, target) {
  target.appendChild(el);
}