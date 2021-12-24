/**
 * 定义：
 * 每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。
 * 原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为【原型链】。
 * 
 * 名称：
 * - prototype: 原型
 * - __proto__: 原型链（链接点）
 * 
 * 从属关系：
 * prototype -> 函数的一个属性，是一个对象
 * __proto__ -> 对象 Object 的属性，是一个对象
 * 对象的__proto__保存着该对象构造函数的prototype
 * 
 */

function Person() {
    this.a = 1
    this.b = 2
}

console.log('-------------- Person --------------');
let person = new Person()
console.log('Person.prototype ---', Person.prototype);
console.log(person.__proto__ === Person.prototype);
console.log();


console.log('-------------- Student --------------');
class Student extends Person {
  constructor() {
    super()
    this.c = 3
  }
}
let student = new Student()
console.log(student.a, student.c);
console.log(student.hasOwnProperty('a'));