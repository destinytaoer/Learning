// 根据 diff 返回的补丁进行打补丁更新 DOM 操作
let allPatches;
// 遍历节点树的索引
let index = 0;
function patch(node, patches) {
  allPatches = patches;

  // 给某个元素打补丁
  nodeWalker(node);
}

function nodeWalker(node) {
  let curPatch = allPatches[index++];
  let childNodes = node.childNodes;
  childNodes.forEach(child => nodeWalker(child));
  // 先从其子节点开始打补丁，是一种后序深度遍历
  if (curPatch) {
    doPatch(node, curPatch);
  }
}

function doPatch(node, patches) {
  console.log(node, patches)
  patches.forEach(patch => {
    switch (patch.type) {
      case TEXT:
        node.textContent = patch.text;
      case ATTRS:
        for (let attr in patch.attrs) {
          let value = patch.attrs[attr];
          if (value) {
            setAttr(node, attr, value);
          } else {
            node.removeAttribute(attr);
          }
        }
        break;
      case REMOVE:
        console.log('remove', node);
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        // 替换节点可能是元素对象或者文本
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        
    }
  })
}