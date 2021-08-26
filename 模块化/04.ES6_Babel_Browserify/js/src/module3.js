// 【默认暴露】可以暴露任意数据类型，暴露什么接收到的就是什么
// export default ...
export default {
  msg: '默认暴露',
  foo() {
    console.log('foo() module3');
  }
}