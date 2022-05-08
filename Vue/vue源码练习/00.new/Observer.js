/**
 * 1. 将一个正常的object转换为每个层级的属性都是响应式（可以被侦测）的object
 * 2. Observer 类会附加到每一个被侦测的object上，一旦被附加，Observer会将object所有属性转换成getter/setter的形式
 * 3. __ob__的作用可以用来标记当前value是否已经被Observer转换成了响应式数据了；而且可以通过value.__ob__来访问Observer的实例
 */
import def from './def'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe'

export default class Observer {
  constructor(value) {
    // 给实例添加__ob__属性，值是当前Observer的实例，不可枚举
    def(value, __ob__, this, false)

    // 将一个正常的object转换为每个层级的属性都是响应式（可以被侦测）的object
    if (Array.isArray(value)) {
      // 将数组原型指向 arrayMethods
      Object.setPrototypeOf(value, arrayMethods) // 等价于 value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value);
    }
  }

  // 对象遍历方式
  walk(value) {
    for (let key in value) {
      defineReactive(value, key)
    }
  }

  // 数组遍历方式
  observeArray(arr) {
    for (let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }
  }
}