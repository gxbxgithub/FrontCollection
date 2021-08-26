<template>
  <li @mouseenter="mouseHandler(true)" @mouseleave="mouseHandler(false)" :style="{backgroundColor: bgColor, color: myColor}">
    <label>
      <input type="checkbox" v-model="isDone" />
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteTodo">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
// 引入类型
import { Todo } from "../types/todo";

export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true
    },
    delTodo: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    updateTodo: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const bgColor = ref('white')
    const myColor = ref('black')
    const isShow = ref(false)
    // 鼠标进入和离开的回调函数
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        // 鼠标进入
        bgColor.value = 'pink'
        myColor.value = 'green'
        isShow.value = true
      } else {
        // 鼠标离开
        bgColor.value = 'white'
        myColor.value = 'black'
        isShow.value = false
      }
    }

    // 删除
    const deleteTodo = () => {
      // 提示
      if (window.confirm('确定要删除吗？')) {
        console.log(props.index)
        props.delTodo(props.index)
      }
    }

    // 计算属性
    const isDone = computed({
      get() {
        return props.todo.done
      },
      set(val) {
        props.updateTodo(props.todo, val)
      }
    })

    return {
      bgColor,
      myColor,
      isShow,
      isDone,
      mouseHandler,
      deleteTodo
    }
  }
});
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  /* display: none; */
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>