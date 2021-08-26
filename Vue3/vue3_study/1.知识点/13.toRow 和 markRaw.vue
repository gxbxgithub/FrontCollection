<template>
  <div>toRow 和 markRaw</div>
  <button @click="testToRaw">测试toRaw</button>
  <button @click="testMarkRaw">测试markRaw</button>
  <hr />
  <h3>{{ state }}</h3>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, markRaw } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    /**
     * toRaw
     * - 返回由 reactive 或 readonly 方法转换成响应式代理的普通对象
     * - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新
     * 
     * markRaw
     * - 标记一个对象，使其永远不会转换为代理。返回对象本身
     */
    const state = reactive<any>({
      name: '小明',
      age: 20
    })

    const testToRaw = () => {
      // 把对象变成普通对象，数据变化，界面不变化
      const user = toRaw(state)
      user.name += '=='
      console.log(user)
    }
    const testMarkRaw = () => {
      const likes = ['吃', '喝']
      // likes 数组就不再是响应式的了
      state.likes = markRaw(likes)
      setInterval(() => {
        state.likes[0] += '--'
        console.log('定时器起来了')
      }, 1000)
    }

    return {
      state,
      testToRaw,
      testMarkRaw
    }
  },
});
</script>