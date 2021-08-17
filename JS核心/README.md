# JS 核心

## reload 重载
问题：js中不支持标准的重载写法，因为js不允许多个同名函数同时存在；
解决：js中借助 arguments 对象来实现重载
定义：每个函数内自带的，专门接受所有传入函数的实参值列表的类数组对象

```
function pay() {
  // arguments 接收参数
}
pay()
pay(1)
pay(2, 3 )
```