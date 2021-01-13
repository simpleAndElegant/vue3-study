import { reactive , effect } from './reactivity'

const state = reactive({ name: 'liangrui', age: 11, arr: [1, 2, 3] , test: 13});

// 调用push方法时  会先像数组中插入值 length  随后更新length



// state.age = 200;
// state.team = 'xiaohou'
// state.arr.push(4);

effect(()=>{
    console.log('值变化了！', state.age); // 没有触发value的依赖收集
})
effect(()=>{
    console.log('值变化了！', state.age + state.test); // 没有触发value的依赖收集
})

setTimeout(() => {
    state.age++
}, 1000)
  