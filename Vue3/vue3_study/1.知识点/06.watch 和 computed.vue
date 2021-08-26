<template>
  <h3>计算属性与监视</h3>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏：<input
      type="text"
      placeholder="请输入姓氏"
      v-model="user.firstName"
    /><br />
    名字：<input type="text" placeholder="请输入名字" v-model="user.lastName" />
  </fieldset>
  <fieldset>
    <legend>计算属性与监视 de 演示</legend>
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName2" /><br />
    姓名：<input type="text" placeholder="显示姓名" v-model="fullName3" />
  </fieldset>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch, ref, watchEffect } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const user = reactive({
      firstName: "东方",
      lastName: "不败",
    });

    /**
     * Vue3 中的计算属性
     * - 如果只传入一个回调函数，表示的是 get
     */
    // 第一个姓名
    const fullName1 = computed(() => {
      return user.firstName + "_" + user.lastName;
    });
    // 第二个姓名
    const fullName2 = computed({
      get() {
        return user.firstName + "_" + user.lastName;
      },
      set(val: string) {
        const names = val.split("_");
        user.firstName = names[0];
        user.lastName = names[1];
      },
    });

    /**
     * 监视1【watch】 --- 监视指定的数据
     * - immediate: true 表示默认会执行一次
     * - deep: true 深度监视
     * 
     * 监视2【watchEffect】 --- 监视回调函数中引用到的 响应式属性
     * - 不需要设置 immediate，默认会执行一次
     * - 返回一个用于停止这个监听的函数，不需要监听的时候直接调用这个函数就可以停止监听
     */
    // 第三个姓名
    const fullName3 = ref("");
    // 【监视1】
    // 1. 监视一个属性
    // watch(user, ({ firstName, lastName }) => {
    //   fullName3.value = firstName + "_" + lastName;
    // }, {immediate: true, deep: true});

    // 2. 监视多个属性
    // ❎ 这种写法是错误的，因为 firstName 和 lastName 不是响应式的数据，所以回调代码不会执行
    // watch([user.firstName, user.lastName], () => {})

    // 对于非响应式的数据，需要这么写 ()=>属性
    watch([() => user.firstName, () => user.lastName, fullName3], (newValue, oldValue) => {
      fullName3.value = newValue[0] + "_" + newValue[1];
    })


    // 【监视2】
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    };
  },
});
</script>