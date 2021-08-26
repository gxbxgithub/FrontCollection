<template>
  <div>Son 儿子组件</div>
  <hr>
  <GrandSon />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import GrandSon from './GrandSon.vue'

export default defineComponent({
  name: "App",
  components: {
    GrandSon
  }
})
</script>

<style scoped>

</style>