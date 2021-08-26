<template>
  <h3>AsyncComp 子级组件</h3>
  <p>内容：{{ msg }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AsyncComp",
  // setup() {
  //   // 1. 返回 Promise 的方式
  //   // return new Promise((resolve, reject) => {
  //   //   setTimeout(() => {
  //   //     resolve({ msg: "abc" });
  //   //   }, 2000);
  //   // });

  //   // 2. 返回 异步请求 的方式
  //   // return axios.get('/address.json').then(res => {
  //   //   return {
  //   //     msg: res.data
  //   //   }
  //   // })
  // },

  // 3. async && await 方式
  async setup() {
    const result = await axios.get("/address.json");
    return {
      msg: result.data,
    };
  },
});
</script>