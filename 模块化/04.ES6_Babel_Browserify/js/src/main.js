/**
 * 引入其他的模块
 * - 语法：import xxx from 'xxx';
 */
import { foo, bar } from './module1'
import { fun, fun2 } from './module2'
import module3 from './module3'
import $ from 'jquery'

foo()
bar()
fun()
fun2() 

console.log(module3.msg);
module3.foo()

$('body').css('background', 'green')