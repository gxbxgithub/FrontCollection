/**
 * 阶乘函数：从1到n连续自然数相乘的积
 * 符号n!表示 5! = 5 * 4 * 3 * 2 * 1
 * 5! = 5 * 4!
 * 4! = 4 * 3!
 * 3! = 3 * 2!
 * 2! = 2 * 1!
 * 1! = 1
 */
const jiecheng = n => {
  // 终止条件
  if (n == 1) return 1
  return n * jiecheng(n - 1)
}
console.log(jiecheng(5));


/**
 * 斐波那契数列：1 1 2 3 5 8 13 21 34 ...
 * 特点：从第3位开始，每一项都等于前两项之和
 * 问题：求出某一位的斐波那契值
 */
const fibonaqi = n => {
  // 终止条件
  if (n <= 1) return n
  return fibonaqi(n - 1) + fibonaqi(n - 2)
}
console.log(fibonaqi(10));


/**
 * 不用循环寻找数组中最大值 - 递归（拆，分，合）
 */
const array = [12, 1213, 54, 80, 1, 45, 90, 998]
const findMax = arr => {
  // 终止条件
  if (arr.length == 1) return arr[0]
  // 拆
  const half = Math.floor(arr.length / 2)
  // 分
  const leftArr = arr.slice(0, half)
  const rightArr = arr.slice(half)
  const leftMax = findMax(leftArr)
  const rightMax = findMax(rightArr)
  // 合
  return leftMax > rightMax ? leftMax : rightMax
}
console.log(findMax(array));