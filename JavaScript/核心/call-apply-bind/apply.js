/**
 * 功能：执行Fn，使this为obj，并将args数组中的元素传给Fn
 * @param {*} Fn 
 * @param {*} obj 
 * @param {*} args 
 * @returns 
 */
function apply(Fn, obj, args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = Fn
  let result = obj.temp(...args)
  delete obj.temp
  return result
}