import { reactive , effect , computed } from './reactivity'

const state = reactive({ name: 'liangrui', age: 12, arr: [1, 2, 3] , test: 13});

// 调用push方法时  会先像数组中插入值 length  随后更新length



// state.age = 200;
// state.team = 'xiaohou'
// state.arr.push(4);

// effect(()=>{
//     console.log('值变化了！', state.age); // 没有触发value的依赖收集
// })
// effect(()=>{
//     console.log('值变化了！', state.age + state.test); // 没有触发value的依赖收集
// })

// setTimeout(() => {
//     state.age++
// }, 1000)

// let myAge = computed(() => {
//     console.log('computed执行了')
//     return state.age * 2
// })

let myAge = computed({
  get: () => state.age + 1,
  set: val => {
    state.age = val - 1;
  }
})
console.log(myAge.value)
myAge.value = 1
console.log(state.age)
// state.age = 12
// myAge.value = 100

// effect(() => {
//     console.log(myAge.value)
// })

// state.age = 100






  