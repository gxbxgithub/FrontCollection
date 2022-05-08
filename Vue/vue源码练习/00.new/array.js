/**
 * Vue是通过改写数组的七个方法（可以改变数组自身内容的方法）来实现对数组的响应式处理
 * 以 Array.prototype 为原型，创建一个新对象 arrayMthods
 * 然后在新对象 arrayMethods 上定义（改写）这些方法
 * 定义 数组 的原型指向 arrayMethods
 * 这就相当于用一个拦截器覆盖Array.prototype，每当使用Array原型上的方法操作数组时，其实执行的是拦截器中提供的方法。在拦截器中使用原生Array的原型方法去操作数组
 * 
 * Object.setPrototypeOf(obj, prototype) 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或null
 * Object.create(proto，[propertiesObject])方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 */
import def from "./def"

const arrayPrototype = Array.prototype

// 以 Array.prototype 为原型创建 arrayMethods
export const arrayMethods = Object.create(arrayPrototype)

const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  const original = arrayPrototype[methodName]

  // 定义新方法
  def(arrayMethods, methodName, function () {
    const result = original.apply(this, arguments)
    const args = [...arguments]
    const ob = this.__ob__

    // 有三种方法 push、unshift、splice能插入新项，要劫持（侦测）这些数据（插入新项）
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
    }

    if (inserted) {
      ob.observeArray(inserted)
    }
    return result
  }, false)
})