# let

1. 变量不能重复声明
2. 块儿级作用域（ES5 中有 全局、函数、eval），let 声明的变量仅在代码块中有效
3. 不存在变量提升
4. 不影响作用域链

```javascript
{
  let name = '夜雨寒'
  function fn() {
    console.log(name) // fn块级作用域中没有，会向上级作用域找
  }
  fn()
}
```

# const

1. 一定要赋初始值
2. 块儿级作用域

# 解构赋值

```js
// 1. 数组的解构
const f4 = ['abc', 'def', 'ghi']
let [a, b, c] = f4

// 2. 对象解构
const zhao = {
  name: '小李',
  age: 28，
  xp: function() {
    console.log('xp')
  }
}
let {name, age, xp} = zhao
```

# 模板字符串 - 反引号

```js
// 1. 声明
let str = `我是一个字符串`
// 2. 内容可以直接换行
let str2 = `<ul>
              <li>123</li>
            </ul>`
// 3. 变量拼接
let lovest = '李四'
let hi = `hahaah, ${lovest}`
```

# 对象的简化写法

```js
let name = 'hah'
let age = 28
let student = {
  name, 
  age,
  improve() {
    console.log('函数的简化写法')
  }
}
```

# 箭头函数

```js
let fn = (a, b) => {
  return a + b;
}
let result = fn(1, 2)

// 1. this 是静态的，始终指向函数声明时所在的作用域下的 this 值
function getName = {
  console.log(this.name)
}
let getName2 = () => {
  console.log(this.name)
}

window.name = '测试name'
const school = {
  name: 'test name'
}

// 直接调用
getName() // 测试name
getName2() // 测试name

// call 方法调用
getName.call(school) // test name
getName2.call(school) // 测试name

// 2. 不能作为构造函数实例化对象
let Person = (name, age) => {
  this.name = name;
  this.age = age
}
let me = new Person('xiao', 30) // 报错：Person is not a constructor
console.log(me)

// 3. 不能使用 arguments 变量
let func = () => {
  console.log(arguments) // 报错：arguments is not defined
}
func(1, 2, 3)

// 4. 箭头函数的简写
//    1) 省略小括号，当形参有且只有一个的时候
let add = n => { return n + n; }
//    2) 省略花括号，当代码体只有一条语句的时候
let pow = n => n * n;
```

# 函数参数默认值设置

```js
// 1. 形参初始值
```