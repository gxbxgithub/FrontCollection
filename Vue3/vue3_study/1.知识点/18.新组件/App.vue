<template>
  <!-- 1. Fragment (片段) -->
  <!-- 
    1. Vue2 中：组件必须有一个根标签
    2. Vue3 中：组件可以没有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中
    3. 好处：减少标签层级，减小内存占用
   -->

  <!-- 2. Teleport (瞬移) -->
  <!-- 
    可以让组件的 html 在父组件界面外特定标签下插入显示
   -->
  <teleport to="body">
    <h3>我被显示在了父组件外的body中</h3>
  </teleport>

  <!-- 3. Suspense (不确定的) -->
  <!-- 它们允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验 -->
  <Suspense>
    <!-- 异步组件 -->
    <!-- <template v-slot:default> -->
    <template #default>
      <!-- 注意：此处必须放一个根node，否则不显示。会报错：<Suspense> slots expect a single root node. -->
      <div>
        <h3>我是内容</h3>
        <AsyncComp />
      </div>
    </template>

    <template v-slot:fallback>
      <h3>Loading...</h3>
    </template>
  </Suspense>
  <hr />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
// 异步组件 引入方式
const AsyncComp = defineAsyncComponent(() => import("./AsyncComp.vue"));

// 同步组件 引入方式
// import AsyncComp from './AsyncComp.vue'

export default defineComponent({
  name: "App",
  components: {
    AsyncComp,
  }
});
</script>