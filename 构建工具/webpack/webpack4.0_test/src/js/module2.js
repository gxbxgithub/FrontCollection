function foo() {
  let array = [1, 2, 3, 4].map(item => {
    return item + 10
  })
  console.log(array)
}


/**
 * 高级语法 - 装饰器
 */
@log
class Person {
  name = 'guoxb'
}
const user = new Person()
console.log('user.name = ', user.name)
function log(target) {
  console.log(target, '15')
}

export { foo }