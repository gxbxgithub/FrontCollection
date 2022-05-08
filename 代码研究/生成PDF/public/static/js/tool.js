import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import $ from './jquery-2.0.0.min.js'
function $createPdf(targetDom, name,patient,val, isGray,callback) {
  if(isGray){
    targetDom.classList.add('pdfTable_gray')
  }else{
    targetDom.classList.add('pdfTable')
  }    
    console.log("time2",new Date().getSeconds());
   var pagenum=printingPage(targetDom,patient)
    console.log("time3",new Date().getSeconds());
    var tmpscale=1.6;
    if(pagenum==1){
      tmpscale=2.6;
    }else if(pagenum==2){
      tmpscale=2.4;
    }else if(pagenum==3){
      tmpscale=1.6;
    }
    html2canvas(targetDom, {
      scale: tmpscale, // 提升画面质量，但是会增加文件大小
      useCORS: true, // 允许跨域图片 当图片是链接地址时，需加该属性，否组无法显示图片
      imageTimeout: 1500, // 图片加载延迟，默认延迟为0，单位毫秒
      height: targetDom.scrollHeight, // canvas的高度设定
      width: targetDom.scrollWidth, // canvas的宽度设定
      dpi: window.devicePixelRatio*tmpscale, // 将分辨率提高到特定的DPI
    }).then(canvas => {
      // a4纸的尺寸[592.28,841.89]
      let pdfDom = document.getElementById('pdfDom')
      let pdf_fenye = document.getElementsByClassName('pdf_fenye')
      recoverDom(targetDom)
      if(isGray){
        targetDom.classList.remove('pdfTable_gray')
      }else{
        targetDom.classList.remove('pdfTable')
      }
      const A4_WIDTH = 595
      const A4_HEIGHT = 842
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageData =null;// canvas.toDataURL('image/jpeg', 1.0)
      setTimeout(() => {
        if(isGray){
          pageData=createGSCanvas(canvas);
        }else{
          pageData =canvas.toDataURL('image/jpeg', 1.0);
        }
      // 一页pdf html页面生成的canvas高度;
      let pageHeight = contentWidth / A4_WIDTH * A4_HEIGHT
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0
      // a4纸的尺寸[592.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      let imgWidth = A4_WIDTH
      let imgHeight = A4_WIDTH / contentWidth * contentHeight
      // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75
      let pdf = new JsPDF('', 'pt', 'a4')
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度
      // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= A4_HEIGHT
            // 避免添加空白页
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
        console.log("time4",new Date().getSeconds());
        if(val == '导出'){
          // 直接下载
          pdf.save(name + '.pdf')
          console.log("time5",new Date().getSeconds());
          callback(1)
        }else{
          // base64转成文件
          //let buffer = pdf.output('datauristring');
          let buffer = pdf.output('bloburl');  
          //let myfile = dataURLtoFile(buffer, name)
          // console.log("time5",new Date().getSeconds());
          // callback(1,buffer);
          var resumeWindow = document.getElementById("pdfview");          
          resumeWindow.src=buffer;  
          setTimeout(() => {
            resumeWindow.contentWindow.print(); 
            console.log("time5",new Date().getSeconds());
            callback(1,buffer);
          }, 1000);
          
        }
      }, 100);
    })
}
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
function printingPage (dom,patient) {//将处理好的打印模型输出到浏览器
  const A4_WIDTH = 595
  const A4_HEIGHT = 900
  let target = dom
  let HEIGHTNum = Math.ceil(target.scrollWidth / A4_WIDTH)
  let pageHeight = HEIGHTNum * 841 //放大后的高度  1684
  let lableListID = document.getElementsByClassName('content_list')
  let a4PageData = initPdfData(pageHeight,lableListID)
  let pageAllNum = a4PageData.length //总页数  
  let arr = []
  let imgType = ''
  let imgTest = ''
  let imgCode = ''
  let imgCodeTest = ''
  let imgSession = sessionStorage.getItem("QR")
      if(imgSession){
        imgCode = `
          <img style="height: 100%;width: 90px;display: inline-block;vertical-align: middle;" src="data:image/png;base64,${imgSession.substring(2,imgSession.length)}">
        `
        imgType = imgSession.substring(0,1)
        if(imgType == '1'){
          imgTest = '扫码建立随诊'
        }else{
          imgTest = '扫码——持续监测生长数据,获取个性管理方案'
        }
        imgCodeTest = `<span style="display: inline-block;vertical-align: middle;">${imgTest}</span>`
      }
 
  let pageHeader = `
    <div style="width:100%;height:50px;position:relative"></div>
  `
    let imgDom = `
                <div style="float: left;height: 90px;line-height:90px;position: absolute;top: 48px;margin-top: -45px">
                  ${imgCode}${imgCodeTest}
                </div>
    `
  a4PageData.forEach((a4item,index)=>{
    let newNode = document.createElement('div')
    $(newNode).addClass('a4Box')
    $(newNode).addClass('clearfix')
    $(newNode).css('height',pageHeight)
    $(newNode).css('position','relative')
    a4item.forEach((item,index)=>{
      $(newNode).append(item)
    })
    $(newNode).append(`
        <div style="width:100%;height:120px;line-height: 120px;border-top: 2px solid #353535;position:absolute;bottom:0">
          ${imgDom}
          <span style="float: right;font-size: 16px;color: #353535">${patient+' '}${index+1}/${pageAllNum}</span>
        </div>
      `)
    $(target).append(newNode)
  })
  return pageAllNum;
}
function initPdfData(pageHeight,lableListID){ //初始化dom数据
  let lableList = new Array()
  lableListID.forEach((item)=>{
    lableList.unshift(item)
  })
  let pageArr = foundA4(pageHeight,lableListID,lableList);
  return addA4content(pageHeight,lableListID,pageArr)
}
function recoverDom(dom){ // 打印完成后还原dom
  let target = dom
  let lableListID = document.getElementsByClassName('content_list')
  for(let i = 0 ; i <= lableListID.length ; i++){
    if(i<lableListID.length){
      $(target).find('.head').append(lableListID[i])
    }else{
      $(target).find('.a4Box').remove()
    }
  }
}
function foundA4(pageHeight,lableListID,lableList){//创建所有a4纸
  let pageArr = new Array(new Array());//第一层放页数，第二层为内容
  let pageNum = 1;
  let blankHeight = 0;//内容过高后换页留出的空白的高度
  for (let i = 0; i < lableList.length; i++) {
    if(lableListID[i].offsetTop+lableListID[i].offsetHeight+blankHeight+120*pageNum > pageHeight*pageNum){
      blankHeight += pageHeight*pageNum - 120*pageNum - lableListID[i].offsetTop - blankHeight
      pageArr.push([])
      i--
      pageNum++
    }
  }
  return pageArr
}
function addA4content(pageHeight,lableListID,pArr){//向已创建好的a4纸里填充dom
  let pageArr = pArr;
  let jNum = 0;//遍历dom时开始的地方
  let iNum = 0;//遍历dom时开始的地方
  let addBlankHeight = 0;//内容过高后换页留出的空白的高度
  for(let i = 0 ; i < pageArr.length ; i++){
    iNum++
    for (let j = jNum; j < lableListID.length; j++) {
        if(lableListID[j].offsetTop+lableListID[j].offsetHeight+addBlankHeight+120*iNum <= pageHeight*iNum){
          pageArr[i].push(lableListID[j])
        }else{
          addBlankHeight += pageHeight*iNum - 120*iNum - lableListID[j].offsetTop - addBlankHeight
          jNum = j;
          break
        }
    }
  }
  return pageArr
}
// 添加依赖模块
// npm install html2canvas --save
// npm install jspdf --save
// 页面引入 import {printingPage} from "../assets/tool/pdf.js"
// printingPage 参数：
// dom：需要导出的html片段， printingPage(this.$refs.targetDom)    或者js获取Id
// className：前端导出需要在分页附近插入空白内容防止内容被分页分割，所以这个参数添加到不希望被分割的dom上
// pdfName：导出pdf时的文件名
 
 
//示例
// heml
// <div class="box" ref="targetDom">
//           <div style="width: 500px;height: 500px;background: red" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: yellow" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: black" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: red" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: yellow" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: black" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: red" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: yellow" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: black" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: red" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: yellow" class="target-node-item"></div>
//           <div style="width: 500px;height: 500px;background: black" class="target-node-item"></div>
//           </br>
//       </div>
//
//js
//
// <script>
//     import {printingPage} from "../assets/tool/pdf.js"
//     export default {
//         methods：{
//             printing(dom,className) {
//                 let vm = this
//                 printingPage(vm.$refs.targetDom)
//             }
//         }
//     }
// </script>
//
//
//
 
 
// 描点连线
// w:2481     h:1300    top:56px   right:60px             bottom:138px           left:159px
// let option = {
//     id:'myCanvas', //canvas标签 id
//     imgName:'7-18.jpg', //图片名称
//     imgWidth:2481, //原图宽度
//     imgheight:1300, //原图高读
//     xScale:31,    //x轴刻度数 精度为0.5
//     yScale:20, //y轴刻度数 精度为0.5
//     top:57, //原图图表上边距
//     right:62, //原图图表右边距
//     bottom:142, //原图图表下边距
//     left:160, //原图图表左边距
//     data:[{x:1,y:3},{x:3,y:5},{x:7,y:9}]  //坐标点
// }
function drawPoint(option){
  // 获取画笔
  let aaa = new Promise(
    function (resolve, reject) {
      // var img = new Image()
      //     // img.src = require('../../public/images/chart/'+option.imgName)
      //     // img.src = require('../../public/images/chart/BMI百分位曲线图-处理VI-02.png')
      //     img.onload = function(){
            
      //     }
          resolve()
    }
  )
  aaa.then(img => {
        let c = document.getElementById(option.id);
        // 获取父级元素宽高
    let canvasWidth = 496
    let canvasHeight = 260
        // 设置canvas宽高
      // c.style.width =  canvasWidth+'px'
      // c.style.height =  canvasHeight+'px'
            c.setAttribute('width', canvasWidth)
            c.setAttribute('height', canvasHeight)
        let ctx = c.getContext("2d");
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            // ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
      // ctx.createPattern(img,'no-repeat')
        // 计算原图与现实尺寸比例
            let wfold = option.imgWidth/canvasWidth
            let hfold = option.imgheight/canvasHeight
        // 计算现实图表的四个边距
            let toTop = option.top/wfold
            let toLeft = option.left/wfold
            let toRight = option.right/hfold
            let toBottom = option.bottom/hfold
        // 拿到缩放后的x，y轴总长
            let xline = canvasWidth - toLeft - toRight
            let yline = canvasHeight - toTop - toBottom
        // 获取标尺每个刻度的长度
            let xScaleWidth =  xline/option.xScale
            let yScaleHeight =  yline/option.yScale
        // 查找图片0，0坐标
        // canvas坐标0，0是从左上角开始图片是从左下角，所以y设置坐标需要用减法
            let x = toLeft
            let y = yline+toTop
        // 设置绘制颜色
            ctx.fillStyle = "#000000";
        // 开始描点画线
    let optDataArr = []
    option.data.forEach((item,index)=>{
      var leftbool=false;
      var rightbool=false;
      var bottombool=false;
      var topbool=false;
      var firstnum=subAccuracy((x+xScaleWidth*item.x)+"");
      var threenum=subAccuracy((y-yScaleHeight*item.y)+"");
      var maxtoTop=subAccuracy(toTop+"");
      var mintoX=subAccuracy(x+"");
      if(x+xScaleWidth*item.x >= x){
        leftbool=true;
      }else if(firstnum >= mintoX){
        leftbool=true;
      }
      if(x+xScaleWidth*item.x<=xline+x){
        rightbool=true;
      }else if(firstnum<=xline+x){
        rightbool=true;
      }
      if(y-yScaleHeight*item.y<=y){
        bottombool=true;
      }else if(threenum<=y){
        bottombool=true;
      }
      if(y-yScaleHeight*item.y>=toTop){
        topbool=true;
      }else if(threenum>=maxtoTop){
        topbool=true;
      }
      if( leftbool && rightbool && bottombool && topbool){
        optDataArr.push(item)
      }
    })
      optDataArr.sort((a,b)=>{return a.x - b.x})
 
    
            optDataArr.forEach((item,index)=>{
            ctx.beginPath();
            let Fx = x+xScaleWidth*item.x
            let Fy = y-yScaleHeight*item.y
            ctx.arc(Fx,Fy,3,0,Math.PI*2,true);
            // ctx.arc(Fx,Fy,5,0,Math.PI*2,true);
            ctx.closePath();
      // let gr = ctx.createLinearGradient(Fx, Fy-3, Fx, Fy+5);
      //     gr.addColorStop(0, '#00A4B3');
      //     gr.addColorStop(1, '#00A4B3')
          ctx.fillStyle='#00A4B3';
                ctx.fill();
          ctx.beginPath();
          ctx.moveTo(Fx,Fy);
        if(optDataArr.length > index+1){
          ctx.lineTo(x+xScaleWidth*optDataArr[index+1].x,y-yScaleHeight*optDataArr[index+1].y);
        }
          ctx.lineWidth = 1.5;//线条的宽度
          // ctx.lineWidth = 2;//线条的宽度
          ctx.strokeStyle = "#00A4B3";//线条的颜色
          ctx.stroke();
        })
        ctx.fill();
  })
}
function drawFMPoint(option){
  // 获取画笔
  let aaa = new Promise(
    function (resolve, reject) {
      // var img = new Image()
      //     // img.src = require('../../public/images/chart/'+option.imgName)
      //     // img.src = require('../../public/images/chart/BMI百分位曲线图-处理VI-02.png')
      //     img.onload = function(){
            
      //     }
          resolve()
    }
  )
  aaa.then(img => {
        let c = document.getElementById(option.id);
        // 获取父级元素宽高
    let canvasWidth = 496
    let canvasHeight = 260
        // 设置canvas宽高
      // c.style.width =  canvasWidth+'px'
      // c.style.height =  canvasHeight+'px'
            c.setAttribute('width', canvasWidth)
            c.setAttribute('height', canvasHeight)
        let ctx = c.getContext("2d");
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            // ctx.drawImage(img,0,0,canvasWidth,canvasHeight);
      // ctx.createPattern(img,'no-repeat')
        // 计算原图与现实尺寸比例
            let wfold = option.imgWidth/canvasWidth
            let hfold = option.imgheight/canvasHeight
        // 计算现实图表的四个边距
            let toTop = option.top/wfold
            let toLeft = option.left/wfold
            let toRight = option.right/hfold
            let toBottom = option.bottom/hfold
        // 拿到缩放后的x，y轴总长
            let xline = canvasWidth - toLeft - toRight
            let yline = canvasHeight - toTop - toBottom
        // 获取标尺每个刻度的长度
            let xScaleWidth =  xline/option.xScale
            let yScaleHeight =  yline/option.yScale
        // 查找图片0，0坐标
        // canvas坐标0，0是从左上角开始图片是从左下角，所以y设置坐标需要用减法
            let x = toLeft
            let y = yline+toTop
        // 设置绘制颜色
            ctx.fillStyle = "#000000";
        // 开始描点画线
    let optDataArr = []
    option.data.forEach((item,index)=>{
      var leftbool=false;
      var rightbool=false;
      var bottombool=false;
      var topbool=false;
      var firstnum=subAccuracy((x+xScaleWidth*item.x)+"");
      var threenum=subAccuracy((y-yScaleHeight*item.y)+"");
      var maxtoTop=subAccuracy(toTop+"");
      var mintoX=subAccuracy(x+"");
      if(x+xScaleWidth*item.x >= x){
        leftbool=true;
      }else if(firstnum >= mintoX){
        leftbool=true;
      }
      if(x+xScaleWidth*item.x<=xline+x){
        rightbool=true;
      }else if(firstnum<=xline+x){
        rightbool=true;
      }
      if(y-yScaleHeight*item.y<=y){
        bottombool=true;
      }else if(threenum<=y){
        bottombool=true;
      }
      if(y-yScaleHeight*item.y>=toTop){
        topbool=true;
      }else if(threenum>=maxtoTop){
        topbool=true;
      }
      if( leftbool && rightbool && bottombool && topbool){
        optDataArr.push(item)
      }
    })
      optDataArr.sort((a,b)=>{return a.x - b.x})
 
    
            optDataArr.forEach((item,index)=>{
            ctx.beginPath();
            let Fx = x+xScaleWidth*item.x
            let Fy = y-yScaleHeight*item.y
            ctx.arc(Fx,Fy,3,0,Math.PI*2,true);
            ctx.closePath();
      // let gr = ctx.createLinearGradient(Fx, Fy-3, Fx, Fy+5);
      //     gr.addColorStop(0, '#00A4B3');
      //     gr.addColorStop(1, '#00A4B3')
          ctx.fillStyle='#00A4B3';
                ctx.fill();
          ctx.beginPath();
          ctx.moveTo(Fx,Fy);
        if(optDataArr.length > index+1){
          ctx.lineTo(x+xScaleWidth*optDataArr[index+1].x,y-yScaleHeight*optDataArr[index+1].y);
        }
          ctx.lineWidth = 1.5;//线条的宽度
          ctx.strokeStyle = "#00A4B3";//线条的颜色
          ctx.stroke();
        })
        ctx.fill();
  })
}
 
 
 
function foundPen(id,data,sex){
    let c = document.getElementById(id);
    console.log(data)
    let obj = {}
    obj.c = c;
    obj.ctx = c.getContext("2d");
    obj.left = 50 
    obj.top = 15 
    obj.right = c.width-45 
    obj.bottom = c.height-15 
    obj.bHeight = obj.bottom - obj.top
    obj.bWidth = obj.right - obj.left
    obj.itemHeight = obj.bHeight/10 //每个刻度的长度
    obj.itemWidth = obj.bWidth/4 //每个刻度的宽度
    foundChart(obj,sex,data)
    setTimeout(()=>{
      setData(obj,data)
    },100)
}
// ----设置数据
function setData(obj,data){
  data.forEach((item,index)=>{
    let left = obj.left + obj.itemWidth * index//x轴每个刻度的起始位置
    //let h = obj.itemHeight*item.baHeightper/10//靶身高
    let h2 = obj.itemHeight*item.heightper/10//身高
    //let y = obj.bottom-h 
    let y2 = obj.bottom-h2
    let w = obj.itemWidth/4
    let x = left + w*2
    let x2 = left + w*1.5
 
    //obj.ctx.fillStyle="#cdece2";//靶身高
    //obj.ctx.fillRect(x,y,w,h);
    //obj.ctx.stroke();
    obj.ctx.fillStyle="#00BCCD"; //身高
    obj.ctx.fillRect(x2,y2,w,h2);
    obj.ctx.stroke();
    // 日期----↓
    obj.ctx.font="11px 微软雅黑";
    obj.ctx.fillStyle ='#313131';
    obj.ctx.textBaseline="middle";
    obj.ctx.textAlign="center";
    obj.ctx.fillText(item.date,x+0,obj.bottom+10);
    //画文字背景
    obj.ctx.fillStyle="#ffffff"; //身高
    obj.ctx.fillRect(x-43,y2-10,87,11);
    obj.ctx.stroke();   
    // 百分位-----↓
    if(item.heightStr.includes("高于")||item.heightStr.includes("低于")){
      obj.ctx.font="9px 微软雅黑";
    }else{
      obj.ctx.font="11px 微软雅黑";
    }    
    obj.ctx.fillStyle ='#313131';
    obj.ctx.textBaseline="middle";
    obj.ctx.textAlign="center";
    if(item.heightperstr.includes('小于')){
      obj.ctx.fillText(item.heightStr+'cm'+'/小于'+item.heightper+'rd',x,y2-5);
    }else if(item.heightperstr.includes('大于')){
      obj.ctx.fillText(item.heightStr+'cm'+'/大于'+item.heightper+'th',x,y2-5);
    }else if(item.heightper==3){
      obj.ctx.fillText(item.heightStr+'cm'+'/3rd',x,y2-5);
    }else{
      obj.ctx.fillText(item.heightStr+'cm'+'/'+item.heightper+'th',x,y2-5);
    }
    // 身高-----↓
    // obj.ctx.font="bold 14px 微软雅黑";
    // obj.ctx.fillStyle ='#2C2D2E';
    // obj.ctx.textBaseline="middle";
    // obj.ctx.textAlign="center";
    // obj.ctx.fillText(+item.height+'cm',x,y2-30);
  })
}
// ----设置数据end
//---绘制图表
function foundChart(obj,sex,data){ //绘制图表
    let c = obj.c
    let ctx = obj.ctx
    let left = obj.left
    let top = obj.top 
    let right = obj.right 
    let bottom = obj.bottom 
    let bHeight = obj.bHeight
    let bWidth = obj.bWidth
    let itemHeight = obj.itemHeight //每个刻度的长度
    let scaleLine = [1,3,5,7,9] //需要显示的刻度线
    let txtArr = [] //需要显示的刻度线
    if(sex == '男'){
      txtArr = [['164.9cm','10th'],['169.4cm','30th'],['172.7cm','50th'],['175.9cm','70th'],['180.4cm','90th']]
    }else{
      txtArr = [['153.7cm','10th'],['157.7cm','30th'],['160.6cm','50th'],['163.5cm','70th'],['167.5cm','90th']]
    }
    ctx.clearRect(0,0,c.width,c.height);
    //     ctx.font="12px 微软雅黑";
    // ctx.fillStyle ='#666666';
    // ctx.textBaseline="middle";
    //ctx.fillText('身高',10,bottom+3);
    // ctx.font="12px 微软雅黑";
    // ctx.fillStyle ='#666666';
    // ctx.textBaseline="middle";
    //ctx.fillText('cm',20,bottom+20);
    scaleLine.forEach((item,index)=>{
      let arr = [{x:50,y:bottom-itemHeight*item},{x:c.width-45,y:bottom-itemHeight*item}] //线
      let txtArrP = [{x:0,y:bottom-itemHeight*item},{x:c.width-35,y:bottom-itemHeight*item}] //字
      if(item == 5) {
        initLine(ctx,"#84b7a7",2,arr) //50th线
      }else{
        initLine(ctx,"#999999",1,arr) //10th线
      }
      initText(ctx,txtArr[index],txtArrP) 
    })
    setTargetLine(obj, data)
    initLine(ctx,"#999999",'1',[{x:left,y:bottom},{x:right,y:bottom}]) //x轴    
}
function initLine(ctx,color,lineWidth,arr){//初始化图表画线
  ctx.beginPath();
  if(color == "#84b7a7"){
    ctx.setLineDash([8, 2]);
  }else{
    ctx.setLineDash([0, 0]);
  }
  ctx.lineWidth=lineWidth;
  ctx.strokeStyle=color; 
  ctx.moveTo(arr[0].x,arr[0].y);
  ctx.lineTo(arr[1].x,arr[1].y);
  ctx.stroke(); // 进行绘制
}
function initText(ctx,txtArr,arr){//初始化图表文字
  ctx.font="12px 微软雅黑";
  ctx.fillStyle ='#313131';
  ctx.textBaseline="middle";
  ctx.fillText(txtArr[0],arr[0].x,arr[0].y);
  ctx.fillText(txtArr[1],arr[1].x,arr[1].y);
}
function setTargetLine(obj, data) {//初始化靶身高线
  let ctx = obj.ctx
  let c = obj.c
  let bottom = obj.bottom
  let itemHeight = obj.itemHeight //每个刻度的长度
  let lineY = (parseFloat(data[0].baHeightper.replace("大于", "").replace("小于", "")) / 10).toFixed(1);
  let yval = (parseFloat(data[0].baHeightper.replace("大于", "").replace("小于", "")) / 10).toFixed(1);
  // for(let i=0; i< data.length; i++){
  //   if(data[i].currdia){
  //     yval = (parseFloat(data[i].baHeightper.replace("大于", "").replace("小于", "")) / 10).toFixed(1);
  //   }
  // }
  lineY = yval;
  let arr = [{ x: 50, y: bottom - itemHeight * lineY }, { x: c.width - 45, y: bottom - itemHeight * lineY }] //线
  ctx.beginPath();
  ctx.setLineDash([0, 0]);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#E46000";
  ctx.moveTo(arr[0].x, arr[0].y);
  ctx.lineTo(arr[1].x, arr[1].y);
  ctx.stroke(); // 进行绘制
}
function createGSCanvas(img){
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);
 
  //注意:getImageData只能操作与脚本位于同一个域中的图片
  var imgData = ctx.getImageData(0,0,img.width,img.height);
  for (var i=0;i<imgData.data.length;i+=4)
  {
  var R = imgData.data[i]; //R(0-255)
  var G = imgData.data[i+1]; //G(0-255)
  var B = imgData.data[i+2]; //G(0-255)
  var Alpha = imgData.data[i+3]; //Alpha(0-255)
  //浮点算法
  var gray = R*0.299 + G*0.587 + B*0.114;
  //整数算法
//  var gray = (R*299 + G*587 + B*114 + 500) / 1000;　
  //移位算法
//  var gray =(R*76+G*151+B*28)>>8;
  //平均值算法
//   var gray = (R+G+B)/3;
  //仅取绿色
//  var gray=G;
   imgData.data[i] = gray;
   imgData.data[i+1] = gray; 
   imgData.data[i+2] = gray; 
   imgData.data[i+3] = Alpha; 
  }
 ctx.putImageData(imgData,0,0);
  return canvas.toDataURL('image/jpeg', 1.0);
}
function subAccuracy(obj){
  if(obj.indexOf('.')>0){
    var tempArr=obj.split('.');
    if(tempArr[1].length>7){
      var s=tempArr[0]+"."+tempArr[1].substr(0,7);
      return parseFloat(s);
    }
  }else{
    return parseFloat(obj);
  }
}
//---绘制图表end---
 
//示例
// heml
// <canvas id="myCanvas" width="480" height="300"></canvas>
//
//js
// import {foundPen} from "../assets/tool/pdf.js"
//     let heightArr = [
//      {
//        date:'2020-1-1',
//        baHeight:'175.2',
//        baHeightper:'65.6',
//        height:'182.9',
//        heightper:'100',
//      }
//    ]
// foundPen('myCanvas',heightArr)
export {drawFMPoint,drawPoint,$createPdf,foundPen}