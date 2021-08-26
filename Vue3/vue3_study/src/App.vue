<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="todos" :delTodo="delTodo" :updateTodo="updateTodo" />
      <Footer
        :todos="todos"
        :checkAll="checkAll"
        :clearAllDoneTodos="clearAllDoneTodos"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from "vue";
// 引入子组件
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import List from "./components/List.vue";
// 引入接口
import { Todo } from "./types/todo";
// 引入工具类
import { saveTodos, readTodos } from "./utils/localStorageUtils";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Footer,
    List,
  },
  setup() {
    // const state = reactive<{ todos: Todo[] }>({
    //   todos: readTodos(),
    // });
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });

    onMounted(() => {
      setTimeout(() => {
        state.todos = readTodos();
      }, 1000);
    });

    // 添加数据
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo);
    };

    // 删除数据
    const delTodo = (index: number) => {
      console.log(state.todos[index]);
      state.todos.splice(index, 1);
    };

    // 更新数据
    const updateTodo = (todo: Todo, val: boolean) => {
      todo.done = val;
      console.log(todo);
    };

    // 全选和全不选的方法
    const checkAll = (isCheck: boolean) => {
      state.todos.forEach((todo) => {
        todo.done = isCheck;
      });
    };

    // 清理所有选中的数据
    const clearAllDoneTodos = () => {
      state.todos = state.todos.filter((todo) => !todo.done);
    };

    // 监视操作：如果todos数据发生变化，直接存储到浏览器缓存中
    // watch(
    //   () => state.todos,
    //   (value) => {
    //     // 保存到浏览器缓存
    //     saveTodos(value);
    //   },
    //   { deep: true }
    // );
    watch(() => state.todos, saveTodos, { deep: true });

    return {
      ...toRefs(state),
      addTodo,
      delTodo,
      updateTodo,
      checkAll,
      clearAllDoneTodos,
    };
  },
});
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>