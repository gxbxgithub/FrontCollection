import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
  toVNode,
} from "snabbdom";

let myVnode = h('a', { props: { href: 'http://haoyunbang.cn', target: '_blank' } }, '好孕帮')
let patch = init([classModule, propsModule, styleModule, eventListenersModule])
let container = document.getElementById('container')
patch(container, myVnode)