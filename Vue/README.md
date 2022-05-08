# 数据代理

1. 数据代理：通过vm对象来代理data对象中属性的操作
2. 好处：更加方便的操作data中的数据
3. 原理：(1)通过 Object.defineProperty() 把data对象中所有属性添加到vm上；
        (2)为每一个添加到vm上的属性，都指定一个getter/setter；
        (3)在getter/setter内部去操作data中对应的属性

# 响应式原理

1. `Vue` 遍历 `data` 对象所有的 `property` => 使用 `Object.defineProperty` 把这些 `property` 转为 `getter/setter`
2. 这些 `getter/setter` 让 `Vue` 能够追踪依赖，在 `property` 被访问和修改时通知变更
3. 每个组件实例都对应一个 `watcher` 实例，在组件渲染过程中把“接触”过的数据 `property` 记录为依赖
4. 之后当依赖项的 `setter` 触发时，会通知 `watcher`，从而使它关联的组件重新渲染

![响应式原理](./assets/响应式原理.png)

# Vue.nextTick()

`Vue` 在更新 `DOM` 时是异步执行的。
只要侦听到数据变化，`Vue` 将开启一个队列，并缓冲同一事件循环中发生的所有数据变更。
如果同一个 `watcher` 被多次触发，只会被推入到队列中一次。
这种在缓冲时去除重复数据对于避免不必要的计算和 `DOM` 操作是非常重要的。
然后，在下一个的事件循环`“tick”`中，`Vue` 刷新队列并执行实际 (已去重的) 工作。
`Vue` 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

# Vue中的事件修饰符

1. prevent: 阻止默认事件（ event.preventDefault() 或 @click.prevent ）
2. stop: 阻止事件冒泡（ event.stopPropagation() 或 @click.stop ）
3. once: 事件只触发一次
4. capture: 使用事件的捕获模式
5. self: 只有 event.target 是当前操作的元素时才触发事件
6. passive: 事件的默认行为立即执行，无需等待事件回调执行完毕

# computed 和 watch 的区别

1. computed 能完成的功能，watch 都可以完成
2. watch 能完成的功能，computed 不一定能完成，例如：watch 可以进行异步操作

# Vue 生命周期

## 1. 一旦进入页面或组件，会执行哪些生命周期，顺序

* beforeCreate 进行了一些必要初始化操作（全局配置和根实例属性初始化）
* created 完成数据代理和动态数据绑定，属性和方法的运算，watch/event 事件回调
* beforeMount 
* mounted

## 2. 在哪个阶段有 $el，在哪个阶段有 $data

| 周期 | $el | $data |
| --- | --- | --- | 
| beforeCreate | 无 | 无 |
| created | 无 | 有 |
| beforeMount | 无 | 有 |
| mounted | 有 | 有 |

## 3. 如果加入 keep-alive 会多两个生命周期，第一次进入组件会执行哪些生命周期，第二次或第n次呢？

* activated 被 keep-alive 缓存的组件激活时调用。
* deactivated 被 keep-alive 缓存的组件失活时调用

```js
// 第一次进入组件会执行
beforeCreate
created
beforeMount
mounted
activated

// 第二次或第n次进入组件
activated
```

## 4. 父子组件生命周期执行顺序

1. 加载过程

`父 beforeCreate - created - beforeMount`

`子 beforeCreate - created - beforeMount - mounted`

`父 mounted`

2. 子组件更新过程

`父 beforeUpdate - 子 beforeUpdate - 子 updated - 父 updated`

3. 销毁过程

`父 beforeDestroy - 子 beforeDestroy - 子 destroyed - 父 destroyed`

## 5. 对 keey-alive 的了解

1. 是什么

vue 系统自带的一个组件

2. 使用场景

用来缓存组件，提升项目性能


# 父子组件间传值

1. 父组件 -> 子组件

* 属性传值
* provide/inject

2. 子组件 -> 父组件

* $emit & $on

3. 兄弟组件间传值

* 中央事件总线
* vuex

# props 和 data 优先级

`props > methods > data > computed > watch`

# Vue 路由

## 路由模式

两种模式：`history` 和 `hash`

区别

1. 表现形式不同

```
history: http://localhost:8080/about
hash: http://localhost:8080/#/about
```

2. 跳转请求

history: http://localhost:8080/id 找不到这个页面的时候  ===> 发送请求
hash: 不会发送请求

3. 打包后前端自测要使用hash，如果使用history会出现空白页

## 介绍一下 SPA 以及 SPA 缺点

SPA： 单页面应用

缺点：

1. SEO 优化不好
2. 性能不是特别好

## 路由传值

```
// 1. 显式
// http://localhost:8080/about?a=1
this.$router.push({
        path: '/about',
        query: {
                a: 1
        }
})

this.$route.query

// 2. 隐式
// http://localhost:8080/about
this.$router.push({
        path: '/about',
        params: {
                a: 1
        }
})

this.$route.params
```

## 编程式导航

```js
this.$router.push('main'); // 字符串 - 路径
this.$router.push({ path: "main" }); // 对象
this.$router.push({name: 'Main', params: {name: 'guoxb'}}); // 命名的路由
this.$router.push({ name: "Main", query: { name: "guoxb" } });
// 注意：如果提供了 path，params 会被忽略
```

## 导航守卫

分三大类：全局、路由独享、组件内

1. 全局

beforeEach, beforeResolve, afterEach

2. 路由独享

beforeEnter

3. 组件内

beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。