<template>
  <div>ref 的另一个作用：获取页面中的元素</div>
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"

export default defineComponent({
  name: "App",
  setup() {
    const inputRef = ref<HTMLElement | null>(null)
    onMounted(() => {
      inputRef.value && inputRef.value.focus() // 自动获取焦点
    })
    return {
      inputRef
    }
  }
})
</script>