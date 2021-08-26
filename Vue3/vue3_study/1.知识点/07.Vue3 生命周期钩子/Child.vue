<template>
  <h3>Child 子级组件</h3>
  <p>msg: {{ msg }}</p>
  <button @click="update">更新数据</button>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

export default defineComponent({
  name: "Child",
  setup() {
    console.log("Vue3.x 中的 setup");

    const msg = ref("abc");
    const update = () => {
      msg.value += "===";
    };

    /**
     * Vue3.x 中的生命周期钩子
     */
    onBeforeMount(() => {
      console.log("Vue3.x - onBeforeMount");
    });
    onMounted(() => {
      console.log("Vue3.x - onMounted");
    });
    onBeforeUpdate(() => {
      console.log("Vue3.x - onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("Vue3.x - onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("Vue3.x - onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("Vue3.x - onUnmounted");
    });

    return {
      msg,
      update,
    };
  },

  // vue2.x 中的生命周期钩子
  beforeCreate() {
    console.log("2.x - beforeCreate");
  },
  created() {
    console.log("2.x - created");
  },
  beforeMount() {
    console.log("2.x - beforeMount");
  },
  mounted() {
    console.log("2.x - mounted");
  },
  beforeUpdate() {
    console.log("2.x - beforeUpdate");
  },
  updated() {
    console.log("2.x - updated");
  },
  /**
   * Vue3.x 中
   * beforeDestroy => beforeUnmount
   * destroyed => unmounted
   */
  // beforeDestroy() {
  //   console.log('2.x - beforeDestroy')
  // },
  // destroyed() {
  //   console.log('2.x - destroyed')
  // }
  beforeUnmount() {
    console.log("2.x - beforeDestroy => 3.x - beforeUnmount");
  },
  unmounted() {
    console.log("2.x - destroyed => 3.x - unmounted");
  },
});
</script>