<template>
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :todo="todo" :key="todo.id" :delTodo="delTodo" :updateTodo="updateTodo" :index="index" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// 引入子组件
import Item from './Item.vue'

export default defineComponent({
  name: "List",
  components: {
    Item
  },
  props: ['todos', 'delTodo', 'updateTodo']
});
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>