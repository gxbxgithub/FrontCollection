/**
 * 【类】：可以理解为模板，通过模板可以实例化对象
 * 面向对象的编程思想
 */
(() => {
  // 类的定义及使用
  class Person {
    // 属性
    name: string
    age: number
    gender: string

    // 构造函数：为了将来实例化对象的时候，可以直接对属性的值进行初始化
    constructor(name: string = '小甜甜', age: number = 16, gender: string = '女') {
      this.name = name
      this.age = age
      this.gender = gender
    }

    // 定义实例方法
    sayHi(msg: string) {
      console.log(`大家好，我是${this.name}，今年${this.age}岁，是个${this.gender}孩子`)
    }
  }
  // 实例化对象
  const person = new Person()
  person.sayHi('介绍下你自己：')
})();


/**
 * 【继承】：类与类之间的关系
 */
(() => {
  // 类的定义及使用
  class Person {
    // 属性
    name: string
    age: number
    gender: string

    // 构造函数：为了将来实例化对象的时候，可以直接对属性的值进行初始化
    constructor(name: string = '小甜甜', age: number = 16, gender: string = '女') {
      this.name = name
      this.age = age
      this.gender = gender
    }

    // 定义实例方法
    sayHi(msg: string) {
      console.log(`大家好，我是${this.name}，今年${this.age}岁，是个${this.gender}孩子`)
    }
  }

  // 定义一个类，继承自 Person
  class Student extends Person {
    constructor(name: string = '大明', age: number = 26, gender: string = '男') {
      // 调用父类的构造函数，使用 super
      super(name, age, gender)
    }

    // 定义实例方法
    sayHi(msg: string) {
      // 调用父类中的方法
      super.sayHi('哈哈，你好')
    }
  }

  // 实例化 Person
  const person = new Person()
  console.log(person.sayHi('hello'))

  // 实例化 Student
  const student = new Student()
  console.log(student.sayHi('hi'))
})();


/**
 * 【多态】：父类型的引用指向了子类型的对象，不同类型的对象针对相同的方法，产生了不同的行为
 * const dog: Animal = new Dog('大黄')
 */
(() => {
  // 定义一个父类
  class Animal {
    name: string
    constructor(name: string) {
      this.name = name
    }
    run(distance: number = 0) {
      console.log(`${this.name}跑了${distance}米！`)
    }
  }

  // 定义子类
  class Dog extends Animal {
    constructor(name: string) {
      super(name)
    }
    run(distance: number = 5) {
      super.run(distance)
    }
  }
  class Pig extends Animal {
    constructor(name: string) {
      super(name)
    }
    run(distance: number = 5) {
      super.run(distance)
    }
  }

  const dog: Animal = new Dog('大黄')
  dog.run()
  const pig: Animal = new Pig('小黑')
  pig.run()

  function showRun(ani: Animal) {
    ani.run()
  }
  showRun(dog)
  showRun(pig)

})();


/**
 * 【修饰符】（类中的成员的修饰符）：描述类中的成员（属性，构造函数，方法）的可访问性
 * 类中的成员访问修饰符
 * - public（默认）：公共的，任何位置都可以访问的
 * - private：私有的，外部 和 子类 都无法访问
 * - protected：受保护的，外部无法访问，子类可以访问
 */
(() => {
  class Person {
    name: string                  // public name: string
    constructor(name: string) {   // public constructor(name: string) {
      this.name = name
    }
    eat() {                       // public eat() {
      console.log('吃吃吃-', this.name)
    }
  }

  const person = new Person('大蛇丸')
  person.eat()
  console.log(person.name)
})();


/**
 * 【readonly】 修饰符：是一个关键字，对类中的【属性成员】进行修饰，修饰后，该属性成员就不能在外部随意修改了
 * 构造函数中是可以对只读属性就行修改的
 */
(() => {
  // 【知识点1】修饰符 修饰 属性成员
  class Person {
    readonly name: string
    constructor(name: string) {
      this.name = name
    }
    sayHi() {
      console.log('hello')
    }
  }
  const person = new Person('小甜甜')
  // person.name = '大甜甜' // 无法分配到 "name" ，因为它是只读属性
  console.log(person.name)

  // 【知识点2】修饰符 修饰 构造函数中的参数
  class Person2 {
    // 构造函数中的name参数，一旦被readonly修饰，那么该参数可以叫【参数属性】
    // 构造函数中的name参数，一旦被readonly修饰，那么 Person2 中就有了一个 name 的属性成员，这个属性是【只读的】
    // 构造函数中的name参数，还可以被 public，private，protected 修饰
    constructor(readonly name: string) {
      // this.name = name
    }
  }
  const person2 = new Person2('小甜甜')
  // person2.name = '大甜甜'

})();


/**
 * 【存取器】：通过 getter 和 setter 有效控制对象中的成员访问
 */
(() => {
  class Person {
    firstName: string
    lastName: string
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName
      this.lastName = lastName
    }
    // 读取器
    get fullName() {
      return this.firstName + '_' + this.lastName
    }
    // 设置器
    set fullName(val) {
      let names = val.split('_')
      this.firstName = names[0]
      this.lastName = names[1]
    }
  }
})();


/**
 * 【静态成员】：在类中通过 static 修饰的属性或方法
 * 静态成员在使用时，直接用类名调用【类名.】
 */
(() => {
  class Person {
    // 类中默认有一个内置的 name 属性，所以会出现错误提示
    // static name: string
    static name1: string
    constructor(name: string) {
      // 此时 this 是实例对象，name1 是静态属性，不能通过实例对象直接访问静态属性
      // this.name1 = name1
      Person.name1 = name
    }
    static sayHi() {
      console.log('萨瓦迪卡')
    }
  }
  console.log(Person.name1)
  console.log(Person.sayHi())
})();


/**
 * 【抽象类】：包含抽象方法（抽象方法一般没有任何具体内容的实现），也可以包含实例方法
 * 抽象类是不能被实例化的
 * 抽象类是为了让子类进行实例化 及 实现内部的抽象方法
 * 目的&作用：为子类服务
 */
(() => {
  // 定义一个抽象类
  abstract class Animal {
    // 抽象属性
    // abstract name: string
    // 抽象方法
    abstract eat()

    // 实例方法
    sayHi() {
      console.log('你好')
    }
  }

  // 定义一个子类（派生类）
  class Dog extends Animal {
    // 重新实现抽象类中的方法
    eat() {
      console.log('舔着吃')
    }
  }

  const dog = new Dog()
  dog.eat()
})();