<template>
  <div>子级 state_name: {{ state_name }}</div>
  <div>子级 state：{{ state }}</div>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRef } from "vue";

export default defineComponent({
  name: "App",
  props: ["state"],
  setup(props) {
    console.log(props.state);
    
    // 拷贝 state 响应式数据中的 name 属性单独操作，不影响 state 中的 name（不影响父级中 state 的 name 属性）
    const state_name = ref(props.state.name)
    const update = () => {
      state_name.value += '123'
    }
    
    /*
    const state2 = ref(JSON.parse(JSON.stringify(props.state)))
    const update = () => {
      state2.value.name += '--'
    };
    */
    return {
      state_name,
      // state2,
      update,
    };
  },
});
</script>