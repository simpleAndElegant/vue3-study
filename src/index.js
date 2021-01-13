import { reactive } from './reactivity'

const state = reactive({ name: 'liangrui', age: 11, arr: [1, 2, 3] });

// 调用push方法时  会先像数组中插入值 length  随后更新length



state.age = 200;
state.team = 'xiaohou'
