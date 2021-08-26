<template>
  <div>依赖注入 provide 与 inject</div>
  <h3>当前的颜色：{{ color }}</h3>
  <button @click="color = 'red'">红色</button>
  <button @click="color = 'blue'">蓝色</button>
  <button @click="color = 'green'">绿色</button>
  <hr />
  <Son />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "vue";
import Son from "./Son.vue";

export default defineComponent({
  name: "App",
  components: {
    Son,
  },
  setup() {
    const color = ref("red");

    // 提供数据
    provide('color', color)

    return {
      color,
    };
  },
});
</script>

<style scoped>
</style>