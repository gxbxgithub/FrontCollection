import { ref, onMounted, onBeforeUnmount } from 'vue'

export default function () {
  const x = ref(-1)
  const y = ref(-1)
  const clickHandle = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener('click', clickHandle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', clickHandle)
  })

  return {
    x, y
  }
}