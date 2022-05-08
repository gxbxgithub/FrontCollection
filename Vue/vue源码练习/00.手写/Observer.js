import Watcher from './Watcher'
import Dep from './Dep'

class Observer {
  constructor(object) {
    this.object = object
    this.walk()
  }

  walk() {
    let _this = this
    Object.keys(this.object).forEach(key => {
      defineReactive(_this.object, key)
    })
  }
}

function defineReactive(obj, key, value = obj[key]) {
  const dep = new Dep()
  observe(value)
  Object.defineProperty(obj, key, {
    get() {
      console.log(`get ${key}`);
      dep.depend()
      return value
    },
    set(newVal) {
      console.log(`set ${key}`);
      if (value === newVal) return
      value = newVal
      observe(value)
      // 触发 watcher
      dep.notify()
    }
  })
}

function observe(data) {
  if (typeof data !== 'object') return
  new Observer(data)
}

const obj = { a: 1, b: { c: 2 } }
observe(obj);

console.log(obj);