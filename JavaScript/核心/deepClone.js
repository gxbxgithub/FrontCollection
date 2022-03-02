// 标准的深拷贝 => 引用数据类型（数组、对象）
function deepClone(source) {
  // [] => Array(基类)   {} => Object
  const targetObj = source.constructor === Array ? [] : {}
  for (let keys in source) {
    if (source[keys] && typeof source[keys] === 'object') {
      // 递归
      targetObj[keys] = deepClone(source[keys])
    } else {
      // 基本数据类型
      targetObj[keys] = source[keys]
    }
  }
  return targetObj
}