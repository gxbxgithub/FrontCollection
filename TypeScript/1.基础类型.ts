/**
 * 基础类型
 * boolean - 布尔
 * number - 数字
 * string - 字符串
 * undefined && null
 * 数组类型
 *    - let arr1: number[] = [10, 20, 30, 40]
 *    - let arr2: Array<number> = [10, 20, 30, 40]
 * 元组类型
 *    - let arr3: [string, number, boolean] = ['小甜甜', 100, false]
 * any - 任意类型：为编程阶段还不清楚类型的变量指定一个类型
 *    当一个数组中要存储多个数据，个数不确定，类型不确定，此时可以使用 any 类型定义数组
 *    - let arr: any[] = [100, '小甜甜', false]
 * enum - 枚举类型
 * void 类型：通常在函数声明时，放在括号后面，代表的是没有任何返回值
 * 
 * object 类型
 * 联合类型（Union Types）表示取值可以为多种类型中的一种
 */
(() => {
  // 布尔类型
  let isDone: boolean = false

  // 数字类型
  let a1: number = 10 // 十进制
  let a2: number = 0b1010  // 二进制
  let a3: number = 0o12 // 八进制
  let a4: number = 0xa // 十六进制

  // 字符创类型
  let str1: string = '窗前明月光'
  let str2: string = '疑是地上霜'
  console.log(`${str1}, ${str2}`)

  // undefined && null
  // 都可以作为其他类型的子类型，把 undefined 和 null 赋值给其他类型的变量，如：number 类型的变量
  let und: undefined = undefined
  let nll: null = null
  let num: number = undefined
  console.log(num);

  // 数组类型：数组定义后，里面的数据类型必须和定义数组时的类型一致
  // 定义方式1
  let arr1: number[] = [10, 20, 30, 40]
  console.log(arr1);
  // 定义方式2
  let arr2: Array<number> = [100, 200, 300]
  console.log(arr2);

  // 元组类型：在定义数组时，类型和数据的个数一开始就已经限定了
  let arr3: [string, number, boolean] = ['小甜甜', 100, false]
  console.log(arr3);

  // 枚举类型：每个数据值都可以叫元素，每个元素都有自己的编号，编号是从 0 开始的，依次递增 1，可以手动改枚举编号
  enum Color {
    red = 10,
    green,
    blue
  }
  let color: Color = Color.red

  // any 类型
  let str3: any = 100
  str3 = '小甜甜'
  // 当一个数组中要存储多个数据，个数不确定，类型不确定，此时可以使用 any 类型定义数组
  let arr4: any[] = [100, '小甜甜', false]
  // 这种情况没有报错信息，any类型有优点，也有缺点
  console.log(arr4[0].split(''))

  // void 类型：通常在函数声明时，放在括号后面，代表的是没有任何返回值
  function showMsg(): void {
    console.log('小甜甜')
  }

  // object 类型
  // 定义一个函数，参数是object类型，返回值是object类型
  function getObj(obj: object): object {
    console.log(obj)
    return {
      name: '卡卡西'
    }
  }
  console.log(getObj({ name: '佐助' }))
  console.log(getObj(new String('123')))
  console.log(getObj(String))

  // 联合类型（Union Types）表示取值可以为多种类型中的一种
  // 类型断言：告诉编译器，我知道我自己是什么类型，也知道自己在干什么
  //    - 方式1：<类型>变量名
  //    - 方式2：值 as 类型
  function getString(str: number | string): number {
    // 类型断言1：“尖括号”语法
    if ((<string>str).length) {
      // return (<string>str).length
      return (str as string).length
    }
    return str.toString().length
  }
  console.log(getString(123456))
  console.log(getString('12345'))

  // 类型推断
  /* 定义变量时赋值了, 推断为对应的类型 */
  let b9 = 123 // number
  // b9 = 'abc' // error

  /* 定义变量时没有赋值, 推断为any类型 */
  let b10  // any类型
  b10 = 123
  b10 = 'abc'
  
})();