/**
 * webpack 打包图片
 */
// 1. js中创建图片引入：file-loader默认会在内部生成一张图片到build目录下，把生成的图片名字返回回来
import img1 from '../imgs/icon_paw.png' // 引入图片，返回一个新的图片地址
let image = new Image()
image.src = img1
document.body.appendChild(image)

// 2. css 中引入图片
// 3. html 中引入图片：html-withimg-loader

// class Module3 {
//   name = 'module3'
// }
// console.log('module3')

// module.exports = 'module3'