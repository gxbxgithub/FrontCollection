<template>
  <h3>reactive 和 ref 的细节问题</h3>
  <p>m1: {{ m1 }}</p>
  <p>m2: {{ m2 }}</p>
  <p>m3: {{ m3 }}</p>
  <hr />
  <button @click="updateData">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "App",
  /**
   * reactive 和 ref 的细节问题
   * - Vue3 的 Composition API 中2个最重要的响应式 API（ref 和 reactive）
   * - ref 用来处理基本类型数据，reactive 用来处理对象（递归深度响应式）
   * - 如果用 ref 处理对象/数组，内部会自动将对象/数组转换为 reactive 的代理对象 Proxy
   * - ref 内部：通过给 value 属性添加 getter/setter 实现对数据的劫持
   * - reactive 内部：通过使用 Proxy 来实现对对象内部所有数据的劫持，并通过 Reflect 操作对象内部数据
   * - ref 的数据操作：在 js 中要 .value，在模板中不需要（内部解析模板时会自动添加 .value）
   */
  setup() {
    const m1 = ref("abc");
    const m2 = reactive({
      name: "小明",
      wife: {
        name: "小红",
      },
    });
    const m3 = ref({
      name: "小明",
      wife: {
        name: "小红",
      },
    });

    function updateData() {
      m1.value += "===";
      m2.wife.name += "===";
      m3.value.wife.name += "===";
    }

    return {
      m1,
      m2,
      m3,
      updateData,
    };
  },
});
</script>
