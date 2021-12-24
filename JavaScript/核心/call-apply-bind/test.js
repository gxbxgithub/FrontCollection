function call(Fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = Fn
  let result = obj.temp(...args)
  delete obj.temp
  return result
}

function apply(Fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = Fn
  let result = obj.temp(...args)
  delete obj.temp
  return result
}

function bind(Fn, obj, ...args) {
  return function (...args2) {
    return call(Fn, obj, ...args, ...args2)
  }
}