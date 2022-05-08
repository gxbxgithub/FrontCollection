class Dep {
  constructor() {
    this.subs = []
  }
  depend() {
    if (window.target) {
      this.subs.push(window.target)
    }
  }
  notify() {
    const subs = [...this.subs]
    subs.forEach(watcher => watcher.update())
  }
}

// Dep.target = null

export default Dep