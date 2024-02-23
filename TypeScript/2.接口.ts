/**
 * 接口：是对象的状态（属性）和行为（方法）的抽象（描述）
 * 作为：对象类型、函数类型、类
 */
(() => {
  // 定义一个接口，该接口作为person对象的类型使用，限定或者是约束该对象中的属性数据
  interface IPerson {
    readonly id: number,  // 只读属性
    name: string,
    age: number,
    sex?: string          // 可选属性
  }

  // 定义一个对象，该对象的类型就是定义的接口 IPerson
  let person: IPerson = {
    id: 1,
    name: 'guoxb',
    age: 30,
    // sex: '男'
  }
})();

/**
 * 函数类型：通过接口的方式作为函数的类型来使用
 */
(() => {
  // 定义一个接口
  interface ISearchFunc {
    // 定义一个调用签名
    (source: string, subString: string): boolean
  }
  // 定义一个函数，该函数类型就是上面定义的接口
  const searchString: ISearchFunc = function (source: string, subString: string): boolean {
    return source.search(subString) > -1
  }

  // 调用函数
  console.log(searchString('我又学会了', '我')) 
})();

/**
 * 类 类型：类的类型可以通过接口来实现
 */
(() => {
  // ** 1. 定义一个接口 **
  interface IFly {
    // 该方法没有任何的实现(方法中什么都没有)
    fly()
  }
  // 定义一个类，这个类的类型就是上面定义的接口
  class Person implements IFly {
    // 实现接口中的方法
    fly() {
      console.log('i can fly')
    }
  }
  // 实例化对象
  const person = new Person()
  person.fly()



  // ** 2. 再定义一个接口 **
  interface ISwim {
    swim()
  }
  // 定义一个类，这个类的类型是 IFly 和 ISwim（一个类可以实现多个接口）
  class Person2 implements IFly, ISwim {
    fly() {
      console.log('i can fly too')
    }
    swim() {
      console.log('i also can swim')
    }
  }
  // 实例化对象
  const person2 = new Person2()
  person2.fly()
  person2.swim()



  // ** 3. 定义一个接口，继承其他的多个接口 **
  interface IMyFlyAndSwim extends IFly, ISwim { }
  // 定义一个类，实现 IMyFlyAndSwim 接口
  class Person3 implements IMyFlyAndSwim {
    fly() {
      console.log('i can fly too too')
    }
    swim() {
      console.log('i also can fly swim too too')
    }
  }
  const person3 = new Person3()
  person3.fly()
  person3.swim()

  // 总结：接口和接口之间叫继承(extends)，类和接口之间叫实现(implements)
})();