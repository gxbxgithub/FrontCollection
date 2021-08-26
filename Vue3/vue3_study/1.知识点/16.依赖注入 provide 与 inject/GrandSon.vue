<template>
  <div>GrandSon 孙子组件</div>
  <h3 :style="{color}">颜色：{{ color }}</h3>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue"

export default defineComponent({
  name: "App",
  setup() {
    // 注入的操作
    const color = inject('color')
    return {
      color
    }
  }
})
</script>

<style scoped>

</style>