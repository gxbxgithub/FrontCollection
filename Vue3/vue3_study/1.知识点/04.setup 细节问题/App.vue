<template>
  <h3>App 父级组件</h3>
  <h5>msg: {{ msg }}</h5>
  <h5>count: {{ count }}</h5>
  <button @click="msg += '==='">更新数据</button>
  <hr />
  <Child :msg="msg" @xxx="xxx" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Child from "./components/Child.vue";

export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  data() {
    return {
      count: 10,
    };
  },
  mounted() {
    console.log(this)
  },
  /**
   * setup 细节问题
   * - 在 beforeCreate 生命周期回调之前执行，仅执行一次
   * - setup 执行时，当前组件还没有创建出来，意味着：实例对象 this 不能用
   * - 其实所有的 Compositon API 相关的回调函数也都不可以使用 this
   *
   * setup 返回值
   * - 返回一个对象，内部的 属性和方法 提供给 html 模板使用
   * - setup 中对象内部属性和 data 函数中 return 对象的属性会合并为组件对象的属性
   * - setup 中对象内部方法和 methods 对象中的方法会合并为组件对象的方法
   * 
   * setup 参数
   * - props 参数：是一个对象，里面有父级组件向子级组件传递的数据，是 props 接收到的所有属性
   * - context 参数：是一个对象
   *   - attrs 对象（包含当前组件标签上没有在props配置中声明的所有属性，相当于 this.$attrs）
   *   - emit 对象（用于自定义事件分发，相当于 this.$emit）
   */
  setup() {
    const msg = ref("what are you doing?");

    function xxx(message: string) {
      console.log(message)
      msg.value += message
    }

    return {
      msg,
      xxx
    };
  },
});
</script>
