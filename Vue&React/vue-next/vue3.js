// 设置缓存, 原始对象和查询对象之间的映射
let toProxy = new WeakMap(); // 根据原始对象查询响应对象
let toRaw = new WeakMap(); // 根据响应对象查询原始对象

function isObejct(val) {
  return val !== null && typeof val === 'object';
}

const baseHandler = {
  get(target, key) {
    const val = Reflect.get(target, key);

    // 依赖收集
    track(target, key);

    return isObejct(val) ? reactive(val) : val;
  },
  set(target, key, val) {
    const info = {
      oldValue: target[key],
      newValue: val
    };

    const res = Reflect.set(target, key, val);

    // 触发更新
    trigger(target, key, info);

    return res;
  }
};

function reactive(target) {
  // 查询缓存
  let observed = toProxy.get(target);
  if (observed) {
    // 如果找到了这个对象的响应对象, 则返回响应对象
    return observed;
  }
  if (toRaw.get(target)) {
    // 如果这个对象本身就是响应对象, 直接返回即可
    return target;
  }

  // 设置代理, 生成响应对象
  observed = new Proxy(target, baseHandler);

  // 进行缓存
  toProxy.set(target, observed);
  toRaw.set(observed, target);

  return observed;
}

// 存储 effect
let effectStack = [];
// 缓存
let targetMap = new WeakMap();

/**
 * track 收集依赖, 形成以下数据结构
 * WeakMap {
 *   target: Map {
 *     key: Set[effect]
 *   }
 * }
 */
function track(target, key) {
  let effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depsMap = targetMap.get(target);
    if (depsMap === undefined) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }
    let dep = depsMap.get(key);
    if (dep === undefined) {
      dep = new Set();
      depsMap.set(key, dep);
    }
    // 做依赖收集
    if (!dep.has(effect)) {
      dep.add(effect);
      effect.deps.push(dep);
    }
  }
}

/**
 * trigger 触发更新
 */
function trigger(target, key, info) {
  // 获取所有依赖
  let depsMap = targetMap.get(target);
  if (depsMap === undefined) {
    return;
  }
  const effects = new Set();
  const computedRunners = new Set();
  if (key) {
    let deps = depsMap.get(key);

    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect);
      } else {
        effects.add(effect);
      }
    });
  }
  let run = effect => effect();
  effects.forEach(run);
  computedRunners.forEach(run);
}

function effect(fn, options = {}) {
  let e = createReactiveEffect(fn, options);

  // 如果这个 effect 不是 computed, 添加的时候就会执行一次
  if (!e.lazy) {
    e();
  }
  return e;
}

function createReactiveEffect(fn, options) {
  const effect = function effect(...args) {
    return run(effect, fn, args);
  };
  effect.deps = [];
  effect.computed = options.computed;
  effect.lazy = options.lazy;
  return effect;
}

function run(effect, fn, args) {
  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect);
      return fn(...args);
    } finally {
      effectStack.pop();
    }
  }
}

function computed(fn) {
  const runner = effect(fn, {
    computed: true,
    lazy: true // 首次不运行
  });

  return {
    effect: runner,
    get value() {
      return runner();
    }
  };
}
