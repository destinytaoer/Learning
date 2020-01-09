// 简单实现 createElement
function ReactElement(type, props) {
  this.type = type;
  this.props = props;
}

function createElement(type, props, ...children) {
  if (children.length === 1) {
    children = children[0]
  }
  return new ReactElement(type, {...props, children})
}

// 实现 render 函数
let render = (reactEl, container) => {
  let { type, props } = reactEl;
  let el = document.createElement('type');
  for (let key in props) {
    if (key === 'children') {
      if (!Array.isArray(props[key])) {
        props[key] = [props[key]]
      }
      props[key].forEach(item => {
        if (typeof item === 'object') {
          render(item, el);
        } else {
          el.appendChild(document.createTextNode(item))
        }
      })
    } else if (key === 'className') {
      el.setAttribute('class', props[key])
    } else {
      el.setAttribute(key, props[key]);
    }
  }
  container.appendChild(el);
}