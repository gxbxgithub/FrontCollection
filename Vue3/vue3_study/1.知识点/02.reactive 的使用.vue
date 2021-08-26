<template>
  <h2>reactive 的使用</h2>
  <h3>{{ user.name }}</h3>
  <h3>{{ user.age }}</h3>
  <h3>{{ user.gender }}</h3>
  <h3>{{ user.wife }}</h3>
  <hr />
  <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // reactive 作用：定义多个数据的响应式，reactive(obj) 返回的是一个 Proxy 代理对象，被代理的目标对象是 obj 对象
    const obj = {
      name: "小明",
      age: 20,
      wife: {
        name: "小甜甜",
        cars: ["奔驰", "宝马"],
      },
    };
    const user = reactive<any>(obj); // user => Proxy 代理对象

    function updateUser() {
      // user.name = "小红";
      user.gender = "男";
    }

    return {
      user,
      updateUser,
    };
  },
});
</script>
