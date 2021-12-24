function axios({method, url, params, data}) {
  method = method.toUpperCase()
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    let str = ''
    for (const key in params) {
      str += `${key}=${params[key]}&`
    }
    str = str.slice(0, -1)
    xhr.open(method, url + '?' + str)

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      xhr.setRequestHeader('Content-type', 'application/json')
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
    xhr.responseType = 'json'
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({status: xhr.status, msg: xhr.statusText, data: xhr.response})
        } else {
          reject(new Error('请求报错，状态码为：', xhr.status))
        }
      }
    }
  })
}

axios.get = function(url, options) {
  let config = Object.assign(options, {url, method: 'GET'})
  return axios(config)
}