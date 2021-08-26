<template>
  <div>Child 子级组件</div>
  <p>msg: {{ msg }}</p>
  <button @click="emitXxx">传递数据</button>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  emits: ['xxx'],
  name: "Child",
  props: ["msg"],
  // props 参数：是一个对象，里面有父级组件向子级组件传递的数据，是 props 接收到的所有属性
  // context 参数：是一个对象，里面有 attrs 对象（包含当前组件标签上没有在props配置中声明的所有属性，相当于 this.$attrs）；emit 对象（用于自定义事件分发，相当于 this.$emit）
  setup(props, context) {
    console.log(props);
    console.log(context);

    // 按钮点击事件的回调函数
    function emitXxx() {
      context.emit("xxx", '++');
    }

    return {
      emitXxx,
    };
  },
});
</script> 