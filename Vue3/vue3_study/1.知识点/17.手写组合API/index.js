/**
 * 【shallowReactive(浅的劫持，浅的监视，浅的响应数据) 与 reactive(深的) 】
 */
// 定义一个 reactiveHandler 处理对象
const reactiveHandler = {
  // 获取属性值
  get(target, property) {
    if (property === '_is_reactive') return true
    const result = Reflect.get(target, property)
    console.log('拦截了读取数据', property, result);
    return result
  },
  // 修改/添加属性值
  set(target, property, value) {
    const result = Reflect.set(target, property, value)
    console.log('拦截了修改/添加数据', property, value);
    return result
  },
  // 删除某个属性
  deleteProperty(target, property) {
    const result = Reflect.deleteProperty(target, property)
    console.log('拦截了删除数据', property, result);
    return result
  }
}
// 定义一个 shallowReactive 函数，传入一个目标对象
function shallowReactive(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本数据类型，直接返回
  return target
}
// 定义一个 reactive 函数，传入一个目标对象
function reactive(target) {
  if (target && typeof target === 'object') {
    // 对数组或者是对象中所有的数据进行 reactive 递归处理
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        // 数组数据进行遍历操作
        target[index] = reactive(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本数据类型，直接返回
  return target
}



/**
 * 【shallowReadonly】
 */
// 定义一个 readonlyHandler 处理对象
const readonlyHandler = {
  get(target, property) {
    if (property === '_is_readonly') return true
    const result = Reflect.get(target, property)
    console.log('拦截到了读取数据', property, result);
    return result
  },
  set(target, property, value) {
    console.warn('只能读取数据，不能修改或添加数据');
    return true
  },
  deleteProperty(target, property) {
    console.warn('只能读取数据，不能删除数据');
    return true
  }
}
// 定义一个 shallowReadonly 函数
function shallowReadonly(target) {
  if (target && typeof target === 'object') {
    return new Proxy(target, readonlyHandler)
  }
  return target
}
// 定义一个 readonly 函数
function readonly(target) {
  if (target && typeof target === 'object') {
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    } else {
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })
    }
    return new Proxy(target, readonlyHandler)
  }
  return target
}



/**
 * 【shallowRef 与 ref】
 */
// 定义一个 shalloRef 函数（const person = shallowRef({...});  person.value.name...）
function shallowRef(target) {
  return {
    _is_ref: true, // 标识当前对象是 ref 对象
    _value: target,
    get value() {
      console.log('拦截到了读取数据');
      return this._value
    },
    set value(newVal) {
      console.log('拦截到了修改数据，准备更新界面', newVal);
      this._value = newVal
    }
  }
}
// 定义一个 ref 函数（const person = ref({...});  person.value.name...）
function ref(target) {
  target = reactive(target)
  return {
    _is_ref: true, // 标识当前对象是 ref 对象
    _value: target,
    get value() {
      console.log('拦截到了读取数据');
      return this._value
    },
    set value(newVal) {
      console.log('拦截到了修改数据，准备更新界面', newVal);
      this._value = newVal
    }
  }
}



/**
 * 【响应式数据的判断】
 */
// 判断是否是 ref 对象
function isRef(obj) {
  return obj && obj._is_ref
}
// 判断是否是 reactive 对象
function isReactive(obj) {
  return obj && obj._is_reactive
}
// 判断是否是 readonly 对象
function isReadonly(obj) {
  return obj && obj._is_readonly
}
// 判断是否是 proxy 对象
function isProxy(obj) {
  return isReactive(obj) || isReadonly(obj)
}