/**
 * 【泛型】：
 * 在定义函数、接口、类的时候不能预先确定要使用的数据的类型；
 * 而是在使用函数、接口、类的时候才能确定数据的类型
 */
(() => {
  // 根据数据和数量产生一个数组
  function getArr<T>(value: T, count: number): T[] {
    const arr: T[] = []
    for (let i = 0; i < count; i++) {
      arr.push(value)
    }
    return arr
  }
  const arr1 = getArr<number>(8, 3)
  const arr2 = getArr<string>('hello', 3)
})();


/**
 * 多个泛型参数的函数：函数中有多个泛型的参数
 */
(() => {
  function getMsg<K, V>(value1: K, value2: V): [K, V] {
    return [value1, value2]
  }
  const arr1 = getMsg<number, string>(123, '456')
  console.log(arr1[0].toFixed(), arr1[1].split(''))
})();


/**
 * 【泛型接口】
 * 在定义接口时, 为接口中的属性或方法定义泛型类型
 * 在使用接口时, 再指定具体的泛型类型
 */
(() => {
  // 定义一个泛型接口
  interface IBaseCRUD<T> {
    list: Array<T> // T[]
    add: (t: T) => void
    getById: (id: number) => T
  }

  // 创建一个用户类
  class User {
    id?: number
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  }
  class UserCRUD implements IBaseCRUD<User> {
    list: Array<User> = []
    add(user: User): void {
      user.id = Date.now() + Math.random()
      this.list.push(user)
    }
    getById(id: number): User {
      return this.list.find(user => user.id === id)
    }
  }

  const userCRUD = new UserCRUD()
  userCRUD.add(new User('tom', 22))
  userCRUD.add(new User('jerry', 20))
  console.log(userCRUD.list)
})();


/**
 * 【泛型类】：
 * 定义一个类，类中【属性的类型】不确定；方法中【参数返回值类型】不确定
 */
(() => {
  class GenericNumber<T> {
    defaultValue: T
    add: (x: T, y: T) => T
  }
  // 在实例化时，再确定泛型的类型
  const g1: GenericNumber<number> = new GenericNumber<number>()
  g1.defaultValue = 100
  g1.add = function (x, y) {
    return x + y
  }
  console.log(g1.add(10, 20))

  // 在实例化时，再确定泛型的类型
  const g2: GenericNumber<string> = new GenericNumber<string>()
  g2.defaultValue = '哈哈'
  g2.add = function (x, y) {
    return x + y
  }
  console.log(g2.add('哈哈', '你好'))
})();


/**
 * 【泛型约束】
 * 如果我们直接对一个泛型参数取 length 属性, 会报错, 因为这个泛型根本就不知道它有这个属性
 */
(() => {
  // 定义一个接口，用来约束将来某个类型中必须要有 length 这个属性
  interface ILength {
    // 接口中有一个属性 length
    length: number
  }

  // 将来传进来的 T，必须要有 length 属性
  function getLength<T extends ILength>(x: T): number {
    return x.length
  }

  getLength<string>('字符串')
  // getLength<number>(100) // 类型“number”不满足约束“ILength”
})();