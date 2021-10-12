import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue 的构造函数
function Vue (options) {
  // 判断 vue 是不是 new 出来的
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }

  // 初始化
  this._init(options)
}

initMixin(Vue)        // 挂载 初始化方法( _init )
stateMixin(Vue)       // 挂载 状态处理方法
eventsMixin(Vue)      // 挂载 事件的方法
lifecycleMixin(Vue)   // 挂载 生命周期方法
renderMixin(Vue)      // 挂载 与渲染有关的方法

export default Vue
