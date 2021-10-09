import createElement from "./createElement"
import updateChildren from "./updateChildren"

// 对比同一个虚拟节点
export default function patchVnode(oldVnode, newVnode) {
  // 5. 如果 oldVnode 和 newVnode 是同一个对象，什么都不做
  if (oldVnode === newVnode) return
  // 6. 不同，判断 newVnode 中有没有 text 属性，如果有 text 属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 7. 判断 newVnode 和 oldVnode 的 text 是否相同
    if (newVnode.text != oldVnode.text) {
      // 如果newVnode中的text和oldVnode的text不同，那么直接让新text写入老elm中即可。
      // 如果oldVnode中是children，也会立即消失
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 8. newVnode 没有 text 属性 有 children 属性；判断 oldVnode 有没有 children 属性
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 10. oldVnode有children属性 最复杂的情况，新老节点都有children
      /**
       * 视频教程：https://www.bilibili.com/video/BV1v5411H7gZ?p=12&spm_id_from=pageDriver
       * 
       * 四种命中查找：
       * 1. 新前与旧前
       * 2. 新后与旧后
       * 3. 新后与旧前（命中，新前指向节点 -> 旧后之后）
       * 4. 新前与旧后（命中，新前指向节点 -> 旧前之前）
       * 
       * 命中一种就不再往下判断了
       * 都没有命中，就需要用循环来寻找了，移动到旧前之前
       */
       updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 9. oldVnode 没有 children 属性 说明有 text;  newVnode 有 children 属性
      // 清空 oldVnode 内容，加入新的节点
      oldVnode.elm.innerHTML = ''
      for (let ch of newVnode.children) {
        let chDom = createElement(ch)
        oldVnode.elm.appendChild(chDom)
      }
    }
  }
}




/**
 * 尝试写法
// 10. oldVnode有children属性 最复杂的情况，新老节点都有children
// 所有未处理的节点的开头
let un = 0
for (let i = 0; i < newVnode.children.length; i ++) {
  let ch = newVnode.children[i]
  let isExist = false
  for (let j = 0; j < oldVnode.children.length; j ++) {
    let oldCh = oldVnode.children[j]
    if (oldCh.sel === ch.sel && oldCh.key === ch.key) {
      isExist = true
      break
    }
  }
  if (!isExist) {
    console.log(ch, i);
    // 创建节点 && 更新ch的elm && 上树
    let dom = createElement(ch)
    ch.elm = dom
    if (un < oldVnode.children.length) {
      oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
    } else {
      oldVnode.elm.appendChild(dom)
    }
  } else {
    // 处理的节点指针下移
    un ++
  }
}
 */