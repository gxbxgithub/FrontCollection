<template>
  <h3>toRef 使用及特点</h3>
  <button @click="update">更新数据</button>
  <p>state: {{ state }}</p>
  <p>age: {{ age }}</p>
  <p>money: {{ money }}</p>
  <hr />
  <h3>Child</h3>
  <p>父级 state: {{ state2 }}</p>
  <Child :state="state2" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef } from "vue";
import Child from "./Child.vue";

export default defineComponent({
  name: "App",
  components: {
    Child,
  },
  setup() {
    const state = reactive({
      age: 5,
      money: 50,
    });

    const age = toRef(state, "age");
    const money = ref(state.money);
    console.log("age:", age);
    console.log("money:", money);

    const update = () => {
      // 源响应式数据中的属性 与 toRef 的数据同步发生改变
      // state.age += 10;
      // console.log(age)

      // 源响应式数据中的属性 与 ref 数据 不同步
      state.money += 50;
      money.value += 10;
      console.log(money);
    };

    // Child
    const state2 = reactive({
      name: '小红',
      age: 10
    })

    return {
      state,
      age,
      money,
      state2,
      update,
    };
  },
});
</script>