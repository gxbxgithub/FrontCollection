// 引入css
import './src/css/main.css'
import './src/css/main.less'

// 引入js
import module1 from './src/js/module1'
import { foo } from './src/js/module2'
import module3 from './src/js/module3_image'
import module4 from './src/js/module4_jquery'

foo()
console.log(module1.msg)
module1.sayHi('guoxb')
// console.log(module3);
console.log(module4);