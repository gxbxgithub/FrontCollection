<template>
  <h3>customRef 的使用</h3>
  <input type="text" v-model="content" /><br />
  {{ content }}
</template>

<script lang="ts">
import { customRef, defineComponent, ref } from "vue";

// 自定义 hook 防抖函数
function useDebouncedRef<T>(value: T, delay = 200) {
  let timeoutId: number
  return customRef((track, trigger) => {
    return {
      get() {
        // 告诉 Vue 追踪数据
        track()
        return value
      },
      set(newValue: T) {
        // 清理定时器
        clearTimeout(timeoutId)
        // 开启定时器
        timeoutId = setTimeout(() => {
          value = newValue
          // 告诉 Vue 更新界面
          trigger()
        }, delay);
      }
    }
  })
}

export default defineComponent({
  name: "App",
  setup() {
    // const content = ref("abc");
    const content = useDebouncedRef('abc', 200)
    return {
      content,
    };
  },
});
</script>