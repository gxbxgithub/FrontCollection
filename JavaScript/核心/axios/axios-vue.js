/**
 * 对 axios 进行二次封装
 * 目的是为了让 axios 发送请求时，具有其它的功能
 * 操作：
 * 1. 配置基础路径和超时限制
 * 2. 添加进度条信息
 * 3. 返回的响应不需要从data中取数据，而是响应就是我们要的数据
 * 4. 统一处理请求错误，具体请求可以选择处理和不处理
 */

import axios from 'axios'
// 引入 nprogress 相关文件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios.create() 创建一个新的和 axios 相同功能的实例
const service = axios.create({
  // 1. 配置基础路径和超时限制
  baseURL: '/api',
  timeout: 20000
});

// 请求拦截器
service.interceptors.request.use(
  // 请求拦截器成功的回调
  config => {
    // 这里可以添加额外功能，也可以给请求头添加需要的数据
    // 2. 添加进度条信息
    NProgress.start() // 开启进度条
    return config
  }
  // 失败的回调一般不写
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    NProgress.done() // 结束进度条
    // 3. 返回的响应不需要从data中取数据，而是响应就是我们要的数据
    return response.data
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
    // return new Promise(() => {}) 返回的 pending 状态的 promise，代表中断 promise 链
  }
);

export default service