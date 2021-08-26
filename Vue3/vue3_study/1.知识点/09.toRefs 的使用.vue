<template>
  <div>toRefs 的使用</div>
  <hr>
  <p>姓名：{{ user.name }}</p>
  <p>年龄：{{ user.age }}</p>
  <hr>
  <!-- toRefs -->
  <h3>toRefs</h3>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    /**
     * toRefs(user2)
     * - 作用: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
     * - 应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行【分解使用】
     */
    
    const user = reactive({
      name: "自来也",
      age: 47,
    });

    const user2 = reactive({
      name: "佐助",
      age: 20,
    })
    setInterval(() => {
      user2.name += '==='
    }, 2000)

    return {
      user,
      ...toRefs(user2),
      // ...users 这种分解使用内部属性不是响应式的
    };
  },
});
</script>