function axios({ method, url, params, data }) {
  method = method.toUpperCase()
  return new Promise((resolve, reject) => {
    // 1. 创建对象
    const xhr = new XMLHttpRequest()
    // 2. 初始化
    // 处理 params 对象 a=100&b=200
    let str = ''
    for (let k in params) {
      str += `${k}=${params[k]}&`
    }
    str = str.slice(0, -1)
    xhr.open(method, url + '?' + str)
    // 3. 发送
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      // Content-type mime 类型设置
      xhr.setRequestHeader('Content-type', 'application/json')
      // 设置请求体
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
    // 4. 处理结果
    // 设置响应结果类型为 JSON
    xhr.responseType = 'json'
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ status: xhr.status, message: xhr.statusText, body: xhr.response })
        } else {
          reject(new Error('请求失败，失败状态码为' + xhr.status))
        }
      }
    }
  })
}

axios.get = function (url, options) {
  let config = Object.assign(options, { method: 'GET', url: url })
  return axios(config)
}

axios.post = function (url, options) {
  let config = Object.assign(options, { method: 'POST', url: url })
  return axios(config)
}

axios.put = function (url, options) {
  let config = Object.assign(options, { method: 'PUT', url: url })
  return axios(config)
}

axios.delete = function (url, options) {
  let config = Object.assign(options, { method: 'DELETE', url: url })
  return axios(config)
}