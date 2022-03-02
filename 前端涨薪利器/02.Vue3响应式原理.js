const arr = [1, 2, 3, 4]

console.log(Object.getOwnPropertyDescriptors(arr))
// {
//   '0': { value: 1, writable: true, enumerable: true, configurable: true },
//   '1': { value: 2, writable: true, enumerable: true, configurable: true },
//   '2': { value: 3, writable: true, enumerable: true, configurable: true },
//   '3': { value: 4, writable: true, enumerable: true, configurable: true },
//   length: { value: 4, writable: true, enumerable: false, configurable: false }
// }

// Vue3 没有采用 Object.defineProperty() 响应式
// 1. 因为 Object.defineProperty() 监测不到数组长度变化，只有属性的 configurable 为 true 时
// 2. 无法监测到对象的属性的新增和删除的（$set, $delete）

/**
 * vue3 基于 proxy 来做数据劫持代理。proxy 可以原生的智齿数组的响应式，不需要去重写数组的原型，还可以直接新增和删除属性。
 */
const target = {
  name: 'guoxb',
  age: 18
}

const proxy = new Proxy(target, {
  get: (target, key) => {
    console.log(`访问了 ${key}`);
  },
  set: (target, key, value) => {
    console.log(`设置了${key}`);
    target[key] = value
  }
})

proxy.name = 'huihui'
console.log(proxy.name);

// Vue2 对于监测数组：重写了数组的原型