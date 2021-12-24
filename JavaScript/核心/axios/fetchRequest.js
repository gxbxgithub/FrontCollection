function fetchRequest(url, timeout) {
  return function({method, params, data}) {
    method = method.toUpperCase()
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      let str = ''
      for (let k in params) {
        str += `${k}=${params[k]}&`
      }
      str = str.slice(0, -1)
      xhr.open(method, url + '?' + str)
      if (method == 'POST' || method == 'DELETE' || method == 'PUT') {
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSON.stringify(data))
      } else {
        xhr.send()
      }
      setTimeout(() => {
        reject(new Error('超时'))
      }, timeout);
      xhr.responseType = 'json'
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({status: xhr.status, msg: xhr.statusText, data: xhr.response})
          } else {
            reject(new Error(xhr.statusText))
          }
        }
      }
    })
  }
}