<template>
  <h3>shallowReactive 和 shallowRef</h3>
  <button @click="updateEvent">更新数据</button>
  <hr />
  <h3>m1: {{ m1 }}</h3>
  <h3>m2: {{ m2 }}</h3>
</template>

<script lang="ts">
import { defineComponent, shallowReactive, shallowRef } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const m1 = shallowRef({
      name: '小明',
      car: {
        name: '奔驰',
        color: 'red'
      }
    })

    const m2 = shallowReactive({
      name: '小红',
      car: {
        name: '宝马',
        color: 'blue'
      }
    })

    const updateEvent = () => {
      /**
       * 什么时候用浅响应式呢?
       * - 一般情况下使用ref和reactive即可
       * - 如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
       * - 如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
       */
      
      /**
       * shallowRef：只处理了value的响应式, 不进行对象的reactive处理
       */
      // m1.value.name += '==='
      m1.value.car.name += '---'

      /**
       * shallowReactive：只处理了对象内最外层属性的响应式(也就是浅响应式)
       */
      // m2.name += '==='
      // m2.car.name += '---'
    }

    return {
      m1,
      m2,
      updateEvent
    }
  },
});
</script>