import observe from "./observe";

export default function defineReactive(data, key, value) {
  if (arguments.length === 2) {
    value = data[key]
  }

  // observe 子元素，形成递归
  let childOb = observe(value)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return value
    },
    set(newValue) {
      if (value === newValue) return;
      value = newValue;
      childOb = observe(newValue)
    }
  })
}