/**
 * patch: 修补操作，比较新旧节点，更新DOM树
 * 
 * 上树操作有两种
 * 1. insertBefore
 * 2. appendChild
 */
import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVnode from './patchVnode.js'

export default function (oldVnode, newVnode) {
  // 1. 判断传入的 oldVnode 是 DOM节点 还是 虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 2. 将 DOM节点 包装成 虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 3. 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.sel == newVnode.sel && oldVnode.key == newVnode.key) {
    // 【精细化比较 diff】
    patchVnode(oldVnode, newVnode)
  } else {
    // 4. 暴力插入新节点，删除旧节点
    let newVnodeElm = createElement(newVnode)
    let oldVnodeElm = oldVnode.elm
    if (newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
    }
    oldVnodeElm.parentNode.removeChild(oldVnodeElm)
  }
}