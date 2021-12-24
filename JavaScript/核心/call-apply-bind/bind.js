/**
 * 功能：给Fn绑定this为obj，并指定参数后面的n个参数
 * @param {*} Fn 
 * @param {*} obj 
 * @param  {...any} args 
 * @returns 
 */
function call(Fn, obj, ...args) {
  // 判断
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  // 为 obj 添加临时的方法
  obj.temp = Fn
  // 调用 temp 方法，此时 temp 函数中 this 指向 obj
  let result = obj.temp(...args)
  // 删除 temp 方法
  delete obj.temp
  return result
}

function bind(Fn, obj, ...args) {
  return function(...args2) {
    return call(Fn, obj, ...args, ...args2)
  }
}