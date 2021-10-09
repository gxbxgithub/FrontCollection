export default function createElement(vnode) {
  // 1. 根据虚拟节点sel选择器属性 创建一个DOM节点，这个节点现在是孤儿节点
  let domNode = document.createElement(vnode.sel)
  // 2. 判断是文本 还是 有子节点
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.children == 0)) {
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 3. 递归创建子节点
    for (let ch of vnode.children) {
      let chDom = createElement(ch)
      domNode.appendChild(chDom)
    }
  }
  // 4. 补充虚拟节点 elm 属性
  vnode.elm = domNode
  // 5. 返回 domNode 对象
  return vnode.elm
}