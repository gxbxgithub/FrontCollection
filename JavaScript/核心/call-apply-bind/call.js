/**
 * 功能：执行Fn，使this为obj，并将后面的n个参数传给Fn
 * @param {要执行的函数} Fn 
 * @param {函数运行时this指向的对象} obj 
 * @param  {...any} args 
 * @returns 
 */
function call(Fn, obj, ...args) {
  // 判断：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。
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