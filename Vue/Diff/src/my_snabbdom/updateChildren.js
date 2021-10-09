import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";

// 判断是否是同一个节点
function checkSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key
}

/**
 * 
 * @param {父节点} parentElm 
 * @param {旧的子元素} oldCh 
 * @param {新的子元素} newCh 
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log(oldCh, newCh);
  let oldStartIdx = 0 // 旧前
  let newStartIdx = 0 // 新前
  let oldEndIdx = oldCh.length - 1 // 旧后
  let newEndIdx = newCh.length - 1 // 新后
  let oldStartVnode = oldCh[0] // 旧前节点
  let oldEndVnode = oldCh[oldEndIdx] // 旧后节点
  let newStartVnode = newCh[0] // 旧前节点
  let newEndVnode = newCh[newEndIdx] // 旧后节点

  let keyMap = null

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('⭐️');

    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    }

    else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前 与 旧前
      console.log('①命中');
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后 与 旧后
      console.log('②命中');
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后 与 旧前
      console.log('③命中 移动节点到 旧后的后面');
      patchVnode(oldStartVnode, newEndVnode)
      // 移动节点
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前 与 旧后
      console.log('④命中 移动节点到 旧前的前面');
      patchVnode(oldEndVnode, newStartVnode)
      // 移动节点
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 四种都没有命中
      if (!keyMap) {
        keyMap = {}
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找当前项（newStartIdx）在 keyMap 中映射的下标
      const idxInOld = keyMap[newStartVnode.key]
      // 判断
      if (idxInOld == undefined) {
        // 如果idxInOld == undefined表示它是全新的项
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      } else {
        // 不是全新的项，需要移动
        const elmToMove = oldCh[idxInOld]
        patchVnode(elmToMove, newStartVnode)
        // 把这项设置为undefined，表示已经处理过了
        oldCh[idxInOld] = undefined
        // 移动
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      // 指针下移
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 循环结束了，继续看看有没有剩余的
  if (newStartIdx <= newEndIdx) {
    console.log('newCh 当中还有剩余节点');
    // 标杆 - 作为插入的标杆
    let before = oldCh[oldEndIdx + 1] ? oldCh[oldEndIdx + 1].elm : null
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('oldCh 当中还有剩余节点');
    // 批量删除 oldStartIdx 和 oldEndIdx 之间的节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }
}