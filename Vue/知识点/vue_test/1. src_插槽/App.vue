<template>
  <div id="app">
    <Category>
      <!-- 放入默认插槽 -->
      <!-- <h1>默认插槽</h1>
      <ul>
        <li v-for="game in games">{{ game }}</li>
      </ul> -->

      <!-- 放入具名插槽 -->
      <h1 slot="name">具名插槽</h1>
      <ul slot="list">
        <li v-for="game in games">{{ game }}</li>
      </ul>
      <!-- <template slot="msg"> -->
      <template v-slot:msg>
        <h4>游戏列表</h4>
        <h4>具名插槽的template写法</h4>
      </template>
    </Category>

    <Category>
      <!-- 放入作用域插槽 -->
      <template slot-scope="{ newgames, msg }">
        <h1>作用域插槽</h1>
        <ol slot="list">
          <li v-for="game in newgames">{{ game }}</li>
        </ol>
        <h4>{{ msg }}</h4>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";

export default {
  name: "App",
  components: {
    Category,
  },
  data() {
    return {
      games: ["英雄联盟", "地下城与勇士", "穿越火线"],
    };
  },
};
</script>

<style scoped>
ul {
  color: #fff;
  background: green;
  width: 100px;
}
</style>
