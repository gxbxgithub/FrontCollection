## Vue2 和 Vue3 比较
1. 2020.09 发布的正式版
2. Vue3 支持大多数的 Vue2 的特性
3. Vue3 中设计了一套强大的组合 API 代替了 Vue2 中的 options API，复用性更强了
4. 更好的支持 TS
5. 最主要：Vue3 中使用了 Proxy 配合 Reflect 代替了 Vue2 中的 Object.defineProperty() 方法实现数据的响应式（数据代理）
6. 重写了虚拟 DOM，速度更快了
7. 新的组件：Fragment(片段) / Teleport(瞬移) / Suspense(不确定)
8. 设计了新的脚手架工具 Vite
9. 在传统的 Vue Options API中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 ，滚动条反复上下移动；Vue3 使用 Compisition API 更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起