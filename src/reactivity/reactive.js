import { isObject } from "../shared/utils";
import { mutableHandler } from './baseHandlers'
export function reactive(target) {
  // 创建响应式对象 包含Map/Set
  return createReactiveObject(target,mutableHandler);
}

function createReactiveObject(target,baseHandler){
  if(!isObject(target)){ // 不是对象直接返回即可
      return target;
  }
  const observed = new Proxy(target,baseHandler);
  return observed;
}