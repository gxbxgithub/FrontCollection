<template>
  <h2>setup 和 ref 的基本使用</h2>
  <h3>{{ count }}</h3>
  <button @click="updateCount">更新数据</button>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'App',
  /**
   * vue2 的实现
   */
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   updateCount() {
  //     this.count ++
  //   }
  // }

  /**
   * vue3 的实现
   * - setup 是 组合API（Composition API）的入口函数
   */
  setup() {
    // ref 作用：定义一个响应式的数据，一般用来定义一个【基本类型】的响应式数据
    let count = ref(0) // 创建一个包含响应式数据的引用对象（reference）=> count 是 Ref 类型
    function updateCount() {
      count.value ++ // js 中操作数据：count.value
    }
    return {
      count,
      updateCount
    }
  }
});
</script>
