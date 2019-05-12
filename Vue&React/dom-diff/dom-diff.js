let INDEX = 0; // 维护一个全局的 index，标记遍历顺序
function diff(oldTree, newTree) {
  let patches = {};

  // 递归遍历树，比较后的结果放到补丁包中
  treeWalker(oldTree, newTree, patches);

  return patches;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
function treeWalker(oldNode, newNode, patches) {
  // patches[INDEX] = [];

  if (!newNode) {
    // 节点被删除
    patches[INDEX] = [{
      type: REMOVE,
      index: INDEX
    }];
    onlyWalk(oldNode.children);
  } else if (isString(oldNode) && isString(newNode)) {
    // 比较文本的变化
    if (oldNode !== newNode) {
      patches[INDEX] = [{
        type: TEXT,
        text: newNode
      }]
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性更改，返回属性补丁包
    let attrs = diffAttr(oldNode.props, newNode.props);
    // 存在变化
    if (Object.keys(attrs).length > 0) {
      patches[INDEX] = [{
        type: ATTRS,
        attrs
      }];
    }
    diffChildren(oldNode.children, newNode.children, patches);
  } else {
    // 节点被替换
    patches[INDEX] = [{
      type: REPLACE,
      newNode
    }];
    onlyWalk(oldNode.children);
  }
}

function onlyWalk(node) {
  if (!node) return;
  INDEX++;
  onlyWalk(node.children);
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]; // 可能是 undefined 即删除了
    }
  }
  // 如果新增加了属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, idx) => {
    // INDEX 每次传递给 treeWalker 时，INDEX 是递增的
    INDEX++;
    treeWalker(child, newChildren[idx], patches);
  });
}

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]';
}