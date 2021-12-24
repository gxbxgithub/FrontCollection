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