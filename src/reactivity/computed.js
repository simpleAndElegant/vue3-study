import { isFunction } from "../shared/utils";
import { effect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operation";


export function  computed(getterOrOptions) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {}
  }else{
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
  }
  let dirty = true;
  let computed;
  let value;

  let runner = effect(getter,{
    lazy:true,
    computed:true,
    scheduler:()=>{
      if(!dirty){
        dirty = true; // 等会就算属性依赖的值发生变化后 就会执行这个scheduler
        trigger(computed,TriggerOpTypes.SET,'value')
      }
    }
  })

  computed = {
    get value(){
      if(dirty){
        value = runner();
        dirty = false;
        track(computed, TrackOpTypes.GET, 'value')
      }
      return value;
    },
    set value(newValue){
      setter(newValue);
    }    
  }

  return computed;


}