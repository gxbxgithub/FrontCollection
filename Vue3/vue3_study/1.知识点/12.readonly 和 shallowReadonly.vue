<template>
  <div>readonly 和 shallowReadonly</div>
  <button @click="update">更新数据</button>
  <hr />
  <h3>{{ m1 }}</h3>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    /**
     * readonly
     * - 深度只读数据
     * - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理
     * - 只读代理是深层的：访问的任何嵌套 property 也是只读的
     * 
     * shallowReadonly
     * - 浅只读数据
     * - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
     */

    const user = reactive({
      name: "小明",
      wife: {
        name: "小红",
        age: 29,
      },
    });
    // const m1 = readonly(user);
    const m1 = shallowReadonly(user);

    const update = () => {
      m1.name = "aaa";
      m1.wife.name = "aaa";
    };

    return { m1, update };
  },
});
</script>

<style scoped>
</style>