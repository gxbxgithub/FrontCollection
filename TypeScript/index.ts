/**
 * 类型注解
 */
(() => {
  function showMsg(msg: string) {
    return '窗前明月光，' + msg
  }
  let msg = ''//[1, 2]
  console.log(showMsg(msg))
})();

/**
 * 枚举
 */
(() => {
  enum Score { A, B, C }
  let score: Score = Score.B
  console.log(score);
})();

/**
 * 接口：是一种能力，一种约束
 */
(() => {
  // 定义一个接口
  interface IPerson {
    firstName: string,
    lastName: string
  }
  // 输出姓名 
  function showFullName(person: IPerson) {
    return person.firstName + '_' + person.lastName;
  }
  // 定义一个对象
  const person = {
    firstName: '东方',
    lastName: '不败'
  }
  console.log(showFullName(person))
})();

/**
 * 类
 */
(() => {
  // 定义一个接口
  interface IPerson {
    firstName: string,
    lastName: string
  }

  // 定义一个类型
  class Person {
    // 定义公共的字段（属性）
    firstName: string
    lastName: string
    fullName: string
    // 定义一个构造函数
    constructor (firstName: string, lastName: string) {
      // 更新属性数据
      this.firstName = firstName
      this.lastName = lastName
      // 姓名
      this.fullName = this.firstName + '_' + this.lastName
    }
  }

  // 定义一个函数
  function showFullName(person: IPerson) {
    return person.firstName + '_' + person.lastName
  }

  // 实例化对象
  const person = new Person('诸葛', '孔明')
  console.log(showFullName(person))
})();