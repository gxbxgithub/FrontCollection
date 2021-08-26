// 引入 axios
import axios from 'axios'

// 发送 ajax 请求
import { ref } from 'vue'
export default function <T>(url: string) {
  const loading = ref(true)
  const data = ref<T | null>(null)
  const errorMsg = ref('')

  // 发送请求
  axios.get(url).then(response => {
    loading.value = false
    data.value = response.data
  }).catch(error => {
    loading.value = false
    errorMsg.value = error.message || '未知错误'
  })

  return {
    loading,
    data,
    errorMsg
  }
}