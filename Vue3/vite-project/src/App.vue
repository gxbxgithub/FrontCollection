<template>
  <img alt="Vue logo" src="./assets/logo.png" />

  <hr />

  <h1 ref="h1" :name="name">{{ name }}</h1>
  <ul>
    <li v-for="child in children">{{ child.name }}</li>
  </ul>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs, watch, ref } from "@vue/runtime-core";
import _ from 'lodash'
export default defineComponent({
  name: "App",
  setup(props, context) {

    console.log(context);

    const refsData = reactive({
      name: "guoxb",
      children: [
        {
          name: "guoxx",
        },
      ],
      a: {
        b: 1,
      },
    });

    const { name, children, a } = toRefs(refsData);

    console.log(name.value, children.value, a.value.b);

    const state = reactive({
      id: 1,
      attributes: {
        name: "",
      },
    });

    watch(
      () => _.cloneDeep(state),
      (state, prevState) => {
        console.log("deep", state, prevState);
      },
      { deep: true }
    );

    state.attributes.name = 'Alex'


    const h1 = ref(null)
    onMounted(() => {
      console.log(h1.value);
    })

    return {
      ...toRefs(refsData),
      h1
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
