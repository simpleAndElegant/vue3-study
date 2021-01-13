import { TriggerOpTypes } from "./operation";

// 创建响应式的effect
let uid = 0;
let activeEffect;
const effectStack = []; // 栈结构

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options);
  effect();
  return effect;
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      // 防止死循环
      try {
        effectStack.push(effect);
        activeEffect = effect;
        return fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect.options = options;
  effect.id = uid++;
  effect.deps = []; // 依赖了哪些属性
  return effect;
}

const targetMap = new WeakMap();

export function track(target, type, key) {
  // a = [effect,effect]  b = [effect]
  // console.log(target)
  // console.log(key)
  if (activeEffect == undefined) {
    return; // 说明取值的属性 不依赖于 effect
  }
  let depsMap = targetMap.get(target); // 根据key 来进行取值
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect); // { "{name:'liangrui'}":{name:set(effect)}  }
    activeEffect.deps.push(dep); // 让这个effect 记录dep属性
  }
}

export function trigger(target, type, key, value, oldValue) {
  const depsMap = targetMap.get(target); // 获取当前对应的map
  if (!depsMap) {
    return;
  }
  console.log(depsMap);
  const run = (effects) => {
    if (effects) {
      effects.forEach((effect) => effect());
    }
  };
  if (key !== null) {
    // arr.push(4) [1,2,3    , 4]   push length
    run(depsMap.get(key));
  }

  if (type === TriggerOpTypes.ADD) { // 对数组新增属性 会触发length 对应的依赖 在取值的时候回对length属性进行依赖收集
    run(depsMap.get(Array.isArray(target) ? 'length' : ''));
  }
}
