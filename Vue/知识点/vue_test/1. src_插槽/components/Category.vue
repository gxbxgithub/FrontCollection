<template>
  <div>
    <!-- 默认插槽 -->
    <!-- <slot>如果没有内容，我会默认显示</slot> -->
    <hr />
    <!-- 具名插槽 -->
    <slot name="name"></slot>
    <slot name="list"></slot>
    <slot name="msg"></slot>
    <hr />
    <!-- 作用域插槽 -->
    <slot :newgames="newGames" msg="我是新的游戏"></slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      newGames: ['LOL手游', '王者荣耀']
    }
  }
}
</script>

<style scoped>

</style>