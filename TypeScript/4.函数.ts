/**
 * 【函数】：封装了一些重复使用的代码，在需要的时候直接调用即可
 */
(() => {
  function add(x: string, y: string): string {
    return x + y
  }
  function add2(x: number, y: number): number {
    return x + y
  }
  const result1: string = add('111', '222')
  const result2: number = add2(1, 2)

  // 函数的完整写法
  // (x: number, y: number) => number 当前函数的类型
  // function (x: number, y: number): number { return x + y } 相当于符合上面这个函数类型的值
  const add3: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y
  }
})();


/**
 * 【可选参数】：函数声明时，参数使用?修饰
 * 【默认参数】：函数声明时，参数使用了默认值
 */
(() => {
  // firstName: string = '东方' 默认参数
  // lastName?: string 可选参数
  const getFullName = function (firstName: string = '东方', lastName?: string): string {
    if (lastName) {
      return firstName + '_' + lastName
    } else {
      return firstName
    }
  }

  getFullName()
  getFullName('诸葛')
  getFullName('诸葛', '孔明')
})();


/**
 * 【剩余参数】（rest参数）
 */
(() => {
  // ...args: string[] ---> 剩余的参数，放在了一个字符串数组中 args 里面
  function showMsg(str: string, str2: string, ...args: string[]) {
    console.log(str) // a
    console.log(str2) // b
    console.log(args) // [c, d, e]
  }
  showMsg('a', 'b', 'c', 'd', 'e')
})();


/**
 * 【函数重载】：函数名字相同，函数的参数及个数不同
 */
(() => {
  // 函数重载声明 - 如果没有此声明，下面 add(100, '真好') 不会报红
  function add(x: string, y: string): string
  function add(x: number, y: number): number

  // 函数声明
  function add(x: string | number, y: string | number): string | number {
    if (typeof x === 'string' && typeof y === 'string') {
      return x + y
    } else if (typeof x === 'number' && typeof y === 'number') {
      return x + y
    }
  }
  // 函数调用
  add('诸葛', '孔明')
  add(10, 20)
  // 此时，如果传入的是非法的数据，ts应该提示错误信息，这是需要加上【函数重载声明】
  add(100, '真好')
})();