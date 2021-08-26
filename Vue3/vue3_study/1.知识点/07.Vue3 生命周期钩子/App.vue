<template>
  <h3>App 父级组件</h3>
  <button @click="isShow = !isShow">切换显示</button>
  <hr>
  <Child v-if="isShow"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Child from './Child.vue'

export default defineComponent({
  name: 'App',
  components: {
    Child
  },
  setup() {
    const isShow = ref(true)
    return { isShow }
  }
})

</script>