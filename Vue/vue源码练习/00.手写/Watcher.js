class Watcher {
  // vue1.x 中 key 是数据字符串，如：a.b
  // vue2.x 中 key 存储的是渲染函数
  constructor(data, key, cb) {
    this.data = data
    this.key = key
    this.cb = cb
    this.value = this.get()
  }

  get() {
    window.target = this
    const value = this.data[key]
    window.target = null
    return value
  }
  update() {
    const oldValue = this.value
    this.value = this.data[this.key]
    this.cb.call(this.data, this.value, oldValue)
  }
}

export default Watcher