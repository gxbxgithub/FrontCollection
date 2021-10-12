# 数据驱动模型

Vue 的执行流程：

1. 获得模板：模板中有“坑”
2. 利用 Vue 构造函数中所提供的数据来“填坑”，得到可以在页面中显示的标签
3. 将标签替换页面中原来有坑的标签

Vue 利用 我们提供的数据 和 页面中模板 生成一个新的 HTML 标签，替换到了 页面中放置模板的位置

# 虚拟 DOM

目标：

1. 怎么将真正的 DOM 转化为 虚拟 DOM
2. 怎么将虚拟 DOM 转化为 真正的 DOM

思路与深拷贝类似

# 函数柯里化

- [函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

概念：
1. 柯里化：一个函数有多个参数，传入**一个**参数，生成一个新函数，由新函数接收剩下的参数来运行得到结构。
2. 偏函数：一个函数有多个参数，传入**一部分**参数，生成一个新函数，由新函数接收剩下的参数来运行得到结构。
3. 高阶函数：一个函数参数是一个函数，该函数对参数这个函数进行加工，得到一个函数，这个加工用的函数就是高阶函数。

为什么要使用柯里化？ 为了提升性能，使用柯里化可以缓存一部分能力。

使用两个案例来说明：

1. 判断元素
2. 虚拟 DOM 的 render 方法

1. 判断元素

Vue 本质上使用 HTML 的字符串作为模板的，将字符串模板 转换为 AST（抽象语法树），再转换为 VNode。
- 模板 -> AST
- AST -> VNode
- VNode -> DOM

哪一个阶段最消耗性能？

最消耗性能的是字符串解析（模板 -> AST）

在 Vue 中每一个标签可以是真正的 HTML 标签，也可以是自定义组件，问怎么区分？？？

在 Vue 源码中其实将所有可以用的 HTML 标签已经存起来了

需要一个函数，判断一个标签名是否为 内置的标签
```js
let tags = 'div, p, a, img, ul, li'.split(',');
function isHTMLTag ( tagName ) {
    tagName = tagName.toLowerCase();
    if (tags.indexOf(tagName) > -1) return true;
    return false;
}
```

如果有 6 中内置标签，而模板中有 10 个标签需要判断，那么最坏的情况需要 60 次循环。

柯里化的做法：

```js
let tags = 'div, p, a, img, ul, li'.split(',');

function makeMap (keys) {
    let set = {}; // 集合
    keys.forEach(key => set[key] = true);

    return function( tagName ) {
        return !!set[ tagName.toLowerCase() ];
    }
}

let isHTMLTag = makeMap( tags ); // 返回的函数
```

2. 虚拟 DOM 的 render 方法

思考：vue 项目 *模板 转化为 AST* 需要执行几次？？？

1. 页面一开始加载需要渲染
2. 每一个属性数据发生变化的时候 要渲染
3. watch，computed 等等

解决：虚拟 DOM 缓存起来，生成一个函数，函数只需要传入数据就可以得到真正的 DOM