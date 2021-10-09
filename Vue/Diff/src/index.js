import h from './my_snabbdom/h.js'
import patch from './my_snabbdom/patch.js'

let container = document.getElementById('container')
let btn = document.getElementById('btn')

const myVnode = h('ul', {}, [
  h('li', { key: 'A' }, '嘻嘻1'),
  h('li', { key: 'B' }, '哈哈2'),
  h('li', { key: 'C' }, '嘿嘿3'),
  h('li', { key: 'D' }, '嘿嘿5'),
  h('li', { key: 'E' }, '嘿嘿6'),
])

const myVnode2 = h('ul', {}, [
  h('li', { key: 'Q' }, '嘻嘻QQQ'),
  h('li', { key: 'A' }, '嘻嘻1111'),
  h('li', { key: 'F' }, '嘿嘿4'),
  h('li', { key: 'B' }, '哈哈2'),
  h('li', { key: 'C' }, '嘿嘿3'),
  h('li', { key: 'D' }, '嘿嘿5'),
  h('li', { key: 'E' }, '嘿嘿6'),
])

console.log(myVnode)
patch(container, myVnode)

btn.onclick = function() {
  patch(myVnode, myVnode2)
}