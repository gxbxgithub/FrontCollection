## 1. BFC（Block formatting context 块级格式化上下文）

```html
<!-- 用这段代码来解释上面那段BFC定义的话，就应该是这个意思：
#HM_bfc1是一块BFC区域，这块区域包含了box2、box3、box4、box5，也就是所有#HM_bfc1的子元素。
同时#HM_bfc2也创造了一块BFC区域，包含了box6，box7，box8。
注意，第一个box1的BFC，只包括box1的子元素box2345，不包括box678。
#HM_bfc2这个BFC同样也仅仅是包括自己的子元素box678。 -->
<div class="box1" id="HM_bfc1">
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5" id="HM_bfc2">
        <div class="box6"></div>
        <div class="box7"></div>
        <div class="box8"></div>
    </div>
</div>
```

1. 定义：一个独立的渲染区域，规定了内部Block-level Box如何布局，并且与这个区域外毫不相干。

2. 特点：

（1）每一个BFC区域只包括其子元素，不包括其子元素的子元素；
（2）每一个BFC区域都是独立隔绝的，互不影响。

3. 如何创建BFC

（1）float的值不是none
（2）position的值不是static或relative
（3）display的值是inlint-block、flex或inline-flex
（4）overflow: hidden

4. BFC可解决的问题

（1）BFC可以取消盒子margin塌陷
（2）BFC可以阻止元素被浮动元素覆盖