<template>
  <div class="kg-histinfo">
    <div class="chart-show-img">显示图表</div>
    <i class="el-icon-close hand" @click="close"></i>
    <!-- tabs-->
    <el-tabs class="kg-infos">
      <el-scrollbar v-if="txt == '专业'" class="test" style="padding-bottom:20px">
        <div class="imgInfo_box canvasBox" v-if="module2[0].type">
          <canvas id="img_shengao" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.shengao" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[1].type">
          <canvas id="img_tizhong" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.tizhong" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[2].type">
          <canvas id="img_BMI" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.BMI" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[3].type">
          <canvas id="img_gulingH" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingH" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[4].type">
          <canvas id="img_gulingW" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingW" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[5].type">
          <canvas id="img_gulingBMI" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingBMI" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[6].type">
          <canvas id="img_amend_shengao" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.shengao" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[6].type">
          <canvas id="img_amend" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.amend" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[7].type">
          <canvas id="img_RUSCHN" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.RUSCHN" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[8].type">
          <canvas id="img_TW3_C_RUS" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3_C_RUS" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[9].type">
          <canvas id="img_TW3CCarpal" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3CCarpal" alt />
        </div>
        <div class="imgInfo_box canvasBox" v-if="module2[10].type">
          <canvas id="img_TW3_C_RUS_wg" class="canvasSize"></canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3_C_RUS_wg" alt />
        </div>
      </el-scrollbar>

      <el-scrollbar v-else id="evaluationPic" class="test"></el-scrollbar>
    </el-tabs>
  </div>
</template>
<script>
import { drawFMPoint, drawPoint, $createPdf, foundPen } from "../../../../../public/static/js/tool.js";
import { imgInfo } from "../../../../../public/static/js/chratBackgroundImg.js";
export default {
  name: "ImgInfo",
  data() {
    return {
      pageInfo: {},
      glpj: {},
      txt: "通用",
      module1: [
        { type: false },
        { type: true },
        { type: true },
        { type: true },
        { type: true },
        { type: true },
        { type: true },
        { type: true }
      ],
      module2: [
        { type: true },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false },
        { type: false }
      ],
      canvasImgSrc: {
        mycanvas: null,
        shengao: null,
        tizhong: null,
        BMI: null,
        gulingH: null,
        gulingW: null,
        gulingBMI: null,
        amend: null,
        RUSCHN: null,
        TW3_C_RUS: null
      }
    };
  },
  props: {
    reportInfo: {
      type: String,
      default: ""
    }
  },
  watch: {
    module2: function(data) {
      this.initChartsImg2();
    }
  },
  mounted() {
    this.pageInfo = JSON.parse(
      sessionStorage.getItem("smartDiagnosticListHistory")
    )[0];
    this.pageInfo.childSex = this.pageInfo.childSex == 0 ? "男" : "女";
    this.getBonaMehod();
  },
  methods: {
    initChek(reprotName) {
      //初始dom块显示隐藏
      let json = JSON.parse(sessionStorage.getItem("reportSettings"));
      let reportSet = "";
      let content = [];
      let evaluate = [];
      if (this.glpj.value === "TW3-C RUS") {
        reportSet = json.ty.tw3c_report_item;
      } else if (this.glpj.value === "TW3-RUS" || this.glpj.value === "G-P") {
        reportSet = json.ty.tw3_report_item;
      } else {
        reportSet = json.ty.rc_report_item;
      }
      let rc = reportSet.split("|");
      if (sessionStorage.getItem("customReportSettings") !== null) {
        rc = sessionStorage.getItem("customReportSettings").split("|");
      }

      if (rc[0] !== undefined) {
        let rc_content = rc[0].split(",");
        for (let i = 0; i < rc_content.length; i++) {
          content.push(parseInt(rc_content[i]));
        }
      }
      if (rc[1] !== undefined) {
        let rc_evaluate = rc[1].split(",");

        for (let i = 0; i < rc_evaluate.length; i++) {
          evaluate.push(parseInt(rc_evaluate[i]));
        }
      }
      this.showModule(content, evaluate, reprotName);
    },
    showModule(agm1, agm2, reprotName) {
      this.txt = reprotName;
      this.module1.forEach((item, index) => {
        let type = { type: false };
        this.$set(this.module1, index, type);
      });
      agm1.forEach((item, index) => {
        let type = { type: true };
        this.$set(this.module1, item - 1, type);
      });
      this.module2.forEach((item, index) => {
        let type = { type: false };
        this.$set(this.module2, index, type);
      });
      agm2.forEach((item, index) => {
        let type = { type: true };
        this.$set(this.module2, item - 1, type);
      });
    },
    initChartsImg2() {
      //通用报告
      let sex = null;
      let str = "";
      let heightData = JSON.parse(
        sessionStorage.getItem("smartDiagnosticListHistory")
      );
      var reportInfo = JSON.parse(this.reportInfo)
      for (var i=0;i<heightData.length;i++) {
        if (reportInfo.diagnosticId==heightData[i].diagnosticId) {
          heightData = heightData.slice(i, heightData.length);
        }
      }
      if (this.pageInfo.childSex == "男") {
        sex = 0;
      } else {
        sex = 1;
      }
      if (this.module2[0].type) {
        // 身高百分位曲线图 diagnosticHeight   resultAge
        let heightArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticHeight)) {
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticHeight)) {
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.shengao = require(`../../../../../public/images/chart/noBone_4.svg`);
        } else {
          this.canvasImgSrc.shengao = require(`../../../../../public/images/chart/noBone_8.svg`);
        }
        imgInfo.general.shenGao_th[sex].id = "img_shengao";
        imgInfo.general.shenGao_th[sex].data = heightArr;
        drawPoint(imgInfo.general.shenGao_th[sex]);
      }
      if (this.module2[1].type) {
        // 体重百分位曲线图 diagnosticWeight
        let widthArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticWeight)) {
              widthArr.push({
                x: item.resultAge,
                y: item.diagnosticWeight
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticWeight)) {
              widthArr.push({
                x: item.resultAge,
                y: item.diagnosticWeight
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.tizhong = require(`../../../../../public/images/chart/tiZhong_th_m.svg`);
        } else {
          this.canvasImgSrc.tizhong = require(`../../../../../public/images/chart/tiZhong_th_w.svg`);
        }
        imgInfo.general.tiZhong_th[sex].id = "img_tizhong";
        imgInfo.general.tiZhong_th[sex].data = widthArr;
        drawPoint(imgInfo.general.tiZhong_th[sex]);
      }
      if (this.module2[2].type) {
        // BMI百分位曲线图 resultBmi
        let bmiArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.resultBmi)) {
              bmiArr.push({
                x: item.resultAge - 1,
                y: item.resultBmi - 11
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.resultBmi)) {
              bmiArr.push({
                x: item.resultAge - 1,
                y: item.resultBmi - 11
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.BMI = require(`../../../../../public/images/chart/BMI_th_m.svg`);
        } else {
          this.canvasImgSrc.BMI = require(`../../../../../public/images/chart/BMI_th_w.svg`);
        }
        imgInfo.general.BMI_th[sex].id = "img_BMI";
        imgInfo.general.BMI_th[sex].data = bmiArr;
        drawPoint(imgInfo.general.BMI_th[sex]);
      }
      if (this.module2[3].type) {
        //按骨龄身高百分位曲线图 diagnosticRusBoneage
        let gulingHArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticHeight
                )
              ) {
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 1,
                  y: item.diagnosticHeight - 70
                });
              }
            } else {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticHeight
                )
              ) {
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 1,
                  y: item.diagnosticHeight - 70
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticHeight
                )
              ) {
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticHeight - 80
                });
              }
            } else {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticHeight
                )
              ) {
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticHeight - 80
                });
              }
            }
          }
        });
        if (this.glpj.value == "RUS-CHN") {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_1.svg`);
          } else {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_2.svg`);
          }
          imgInfo.general.gulingH_th[sex].id = "img_gulingH";
          imgInfo.general.gulingH_th[sex].data = gulingHArr;
          drawPoint(imgInfo.general.gulingH_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_3.svg`);
          } else {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_4.svg`);
          }
          imgInfo.general.gulingH_th[sex + 2].id = "img_gulingH";
          imgInfo.general.gulingH_th[sex + 2].data = gulingHArr;
          drawPoint(imgInfo.general.gulingH_th[sex + 2]);
        }
      }
      if (this.module2[4].type) {
        //按骨龄体重百分位曲线图
        let gulingWArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticWeight
                )
              ) {
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 10
                });
              }
            } else {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticWeight
                )
              ) {
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 10
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticWeight
                )
              ) {
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 5
                });
              }
            } else {
              if (
                this.isEnablePush(
                  item.diagnosticRusBoneage,
                  item.diagnosticWeight
                )
              ) {
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 5
                });
              }
            }
          }
        });
        if (this.glpj.value == "RUS-CHN") {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_RUS_CHN_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_RUS_CHN_th_w.svg`);
          }
          imgInfo.general.gulingW_th[sex].id = "img_gulingW";
          imgInfo.general.gulingW_th[sex].data = gulingWArr;
          drawPoint(imgInfo.general.gulingW_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_TW3_C_RUS_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_TW3_C_RUS_th_w.svg`);
          }
          imgInfo.general.gulingW_th[sex + 2].id = "img_gulingW";
          imgInfo.general.gulingW_th[sex + 2].data = gulingWArr;
          drawPoint(imgInfo.general.gulingW_th[sex + 2]);
        }
      }
      if (this.module2[5].type) {
        //按骨龄BMI百分位曲线图
        let gulingBMIArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(item.diagnosticRusBoneage, item.resultBmi)
              ) {
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 11
                });
              }
            } else {
              if (
                this.isEnablePush(item.diagnosticRusBoneage, item.resultBmi)
              ) {
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 11
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if (
                this.isEnablePush(item.diagnosticRusBoneage, item.resultBmi)
              ) {
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 10
                });
              }
            } else {
              if (
                this.isEnablePush(item.diagnosticRusBoneage, item.resultBmi)
              ) {
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 10
                });
              }
            }
          }
        });
        if (this.glpj.value == "RUS-CHN") {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_RUS_CHN_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_RUS_CHN_th_w.svg`);
          }
          imgInfo.general.gulingBMI_th[sex].id = "img_gulingBMI";
          imgInfo.general.gulingBMI_th[sex].data = gulingBMIArr;
          drawPoint(imgInfo.general.gulingBMI_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_TW3_C_RUS_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_TW3_C_RUS_th_w.svg`);
          }
          imgInfo.general.gulingBMI_th[sex + 2].id = "img_gulingBMI";
          imgInfo.general.gulingBMI_th[sex + 2].data = gulingBMIArr;
          drawPoint(imgInfo.general.gulingBMI_th[sex + 2]);
        }
      }
      if (this.module2[6].type) {
        //父母身高修正的身高百分位数 resultTargetHeight resultMiddleheightSds
        let amendArr = [];
        heightData.forEach(item => {
          
          if (sex) {
            if (
              this.isEnablePush(item.resultMiddleHeight, item.resultHeightSds)
            ) {
              var Ynum= item.resultHeightSds.replace("大于", "").replace("小于", "")
              amendArr.push({
                x: item.resultMiddleHeight - 150,
                y: Number(Ynum) + 6
              });
            }
          } else {
            if (
              this.isEnablePush(item.resultMiddleHeight, item.resultHeightSds)
            ) {
              var Ynum= item.resultHeightSds.replace("大于", "").replace("小于", "")
              amendArr.push({
                x: item.resultMiddleHeight - 150,
                y: Number(Ynum) + 6
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.amend = require(`../../../../../public/images/chart/amendH_th_m.svg`);
        } else {
          this.canvasImgSrc.amend = require(`../../../../../public/images/chart/amendH_th_w.svg`);
        }
        imgInfo.general.amendH_th[sex].id = "img_amend";
        imgInfo.general.amendH_th[sex].data = amendArr;
        drawFMPoint(imgInfo.general.amendH_th[sex]);
        setTimeout(()=>{
        // 身高百分位曲线图 diagnosticHeight   resultAge
        let heightArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticHeight)) {
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticHeight)) {
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.shengao = require(`../../../../../public/images/chart/noBone_4.svg`);
        } else {
          this.canvasImgSrc.shengao = require(`../../../../../public/images/chart/noBone_8.svg`);
        }
        imgInfo.general.shenGao_th[sex].id = "img_amend_shengao";
        imgInfo.general.shenGao_th[sex].data = heightArr;
        drawPoint(imgInfo.general.shenGao_th[sex]);
        },1000);
      }
      if (this.module2[7].type) {
        //RUS-CHN百分位曲线图  diagnosticRusScore
        let euschnArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticRusScore)) {
              euschnArr.push({
                x: item.resultAge - 1,
                y: Number(item.diagnosticRusScore)
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticRusScore)) {
              euschnArr.push({
                x: item.resultAge - 1,
                y: Number(item.diagnosticRusScore)
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.RUSCHN = require(`../../../../../public/images/chart/RUS-CHN_th_m.svg`);
        } else {
          this.canvasImgSrc.RUSCHN = require(`../../../../../public/images/chart/RUS-CHN_th_w.svg`);
        }
        imgInfo.general.RUS_CHN_th[sex].id = "img_RUSCHN";
        imgInfo.general.RUS_CHN_th[sex].data = euschnArr;
        drawPoint(imgInfo.general.RUS_CHN_th[sex]);
      }
      if (this.module2[8].type) {
        //TW3-C RUS百分位曲线图
        let tW3_C_RUSArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticRusScore)) {
              tW3_C_RUSArr.push({
                x: item.resultAge - 1,
                y: Number(item.diagnosticRusScore)
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticRusScore)) {
              tW3_C_RUSArr.push({
                x: item.resultAge - 2,
                y: Number(item.diagnosticRusScore)
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.TW3_C_RUS = require(`../../../../../public/images/chart/TW3_C_RUS_m.svg`);
        } else {
          this.canvasImgSrc.TW3_C_RUS = require(`../../../../../public/images/chart/TW3_C_RUS_w.svg`);
        }
        imgInfo.general.TW3_C_RUS[sex].id = "img_TW3_C_RUS";
        imgInfo.general.TW3_C_RUS[sex].data = tW3_C_RUSArr;
        drawPoint(imgInfo.general.TW3_C_RUS[sex]);
      }
      if (this.module2[9].type) {
        //TW3CCarpal百分位曲线图
        let tW3CCarpalArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.diagnosticCarpalScore)) {
              tW3CCarpalArr.push({
                x: item.resultAge - 1,
                // y: Number(item.diagnosticRusScore)
                y: Number(item.diagnosticCarpalScore - 121)
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.diagnosticCarpalScore)) {
              tW3CCarpalArr.push({
                x: item.resultAge - 1,
                y: Number(item.diagnosticCarpalScore - 150)
                // y: Number(item.diagnosticRusScore)
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.TW3CCarpal = require(`../../../../../public/images/chart/TW3_C_Carpal_th_m.svg`);
        } else {
          this.canvasImgSrc.TW3CCarpal = require(`../../../../../public/images/chart/TW3_C_Carpal_th_w.svg`);
        }
        imgInfo.general.TW3_C_Carpal[sex].id = "img_TW3CCarpal";
        imgInfo.general.TW3_C_Carpal[sex].data = tW3CCarpalArr;
        drawPoint(imgInfo.general.TW3_C_Carpal[sex]);
      }
      if (this.module2[10].type) {
        //TW3-C RUS与腕骨骨龄差值 resultRusdiffcarpal
        let tW3_C_RUSArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.isEnablePush(item.resultAge, item.resultRusdiffcarpal)) {
              tW3_C_RUSArr.push({
                x: item.resultAge - 1,
                y: Number(item.resultRusdiffcarpal) + 3
              });
            }
          } else {
            if (this.isEnablePush(item.resultAge, item.resultRusdiffcarpal)) {
              tW3_C_RUSArr.push({
                x: item.resultAge - 1.5,
                y: Number(item.resultRusdiffcarpal) + 3.5
              });
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.TW3_C_RUS_wg = require(`../../../../../public/images/chart/TW3_C_RUS_wg_m.svg`);
        } else {
          this.canvasImgSrc.TW3_C_RUS_wg = require(`../../../../../public/images/chart/TW3_C_RUS_wg_w.svg`);
        }
        imgInfo.general.TW3_C_RUS_wg[sex].id = "img_TW3_C_RUS_wg";
        imgInfo.general.TW3_C_RUS_wg[sex].data = tW3_C_RUSArr;
        drawPoint(imgInfo.general.TW3_C_RUS_wg[sex]);
      }
    },
    getBonaMehod() {
      let temp = { name: "", value: "", leble1: "", leble2: "", leble3: "" };
      switch (this.pageInfo.diagnosticRusMethod) {
        case "RUS-CHN":
          temp.name = "中华-05";
          temp.value = "RUS-CHN";
          temp.leble1 = "RC";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "RC与TW3-C Carpal";
          break;
        case "TW3-C RUS":
          temp.name = "中华-05";
          temp.value = "TW3-C RUS";
          temp.leble1 = "TW3C RUS";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "TW3C RUS与TW3-C Carpal";
          break;
        case "TW3-RUS":
          temp.name = "TW3";
          temp.value = "TW3-RUS";
          temp.leble1 = "TW3-RUS";
          temp.leble2 = "TW3-Carpal";
          temp.leble3 = "TW3-RUS与TW3-Carpal";
          break;
        case "G-P":
          temp.name = "g-p";
          temp.value = "G-P";
          temp.leble1 = "g-p";
          break;
        default:
          temp.name = "中华-05";
          temp.value = "RUS-CHN";
          temp.leble1 = "RC";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "RC与TW3-C Carpal";
          break;
      }
      // 骨龄方法为rus-chn和tw3-c rus 骨龄评价方法为：中华-05
      // 骨龄方法为tw3-rus或gp       骨龄评价方法为：TW3或G-P

      this.glpj = temp;
    },
    close() {
      this.$emit("close");
    },
    //画图的时候使用，true表示可描点，false表示不能参与描点
    isEnablePush(par1, par2) {
      if (typeof par1 == "string") {
        if (par1.trim().length <= 0) {
          return false;
        } else if (par1.trim() == "undefined") {
          return false;
        }
      } else if(par1==0){
        return true;
      } else if (typeof par1 == "undefined" || !par1) {
        return false;
      }
      if (typeof par2 == "string") {
        if (par2.trim().length <= 0) {
          return false;
        } else if (par2.trim() == "undefined") {
          return false;
        }
      } else if(par2==0) {
        return true;
      } else if (typeof par2 == "undefined" || !par2) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

>>>.test img {
  width: 100%;
  margin-bottom: 6px;
}

#evaluationPic {
  width: 456px; /* no */
}

.canvasBox {
  width: 496px; /* no */
  height: 266px; /* no */
  position: relative;

  .canvasSize {
    width: 496px; /* no */
    height: 260px; /* no */
    position: absolute;
    z-index: 10;
    top: 6px; /* no */
    left: 0;
  }

  .canvasImgSize {
    width: 496px; /* no */
    height: 260px; /* no */
    position: absolute;
    z-index: 1;
    top: 6px; /* no */
    left: 0;
    background-color: #fff;
  }
}

.kg-histinfo {
  position: fixed;
  text-align: left;
  padding: 20px;
  background-color: rgba(242, 246, 252, 1);
  right: 20px;

  // z-index: 999
  // height (100vh -200px);
  // overflow scroll;
  /* height: calc(91vh - 150px); */
  i {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #999;
  }

  .chart-show-img {
    font-size: 18px;
  }

  i:hover {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #00aebb;
  }

  >>> .el-input__inner {
    padding-left: 70px;
    box-sizing: border-box;
  }

  >>> .el-input__prefix {
    line-height: 28px;
    border-right: 1px solid $lightBorderColor;
    padding-right: 5px;
    margin-right: 5px;
  }

  >>> .el-tabs__content {
    height: calc(92vh - 220px);
    overflow: auto;
  }

  .kg-infos {
    dl {
      padding: 20px 0;
      border-bottom: 1px solid $baseBorderColor;

      &:first-child {
        padding-top: 10px;
      }

      &:last-child {
        border-bottom: none;
      }

      dt {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      dd {
        line-height: 1.5;
        margin-bottom: 5px;
      }
    }

    .base-info {
      dd {
        border-bottom: 1px dotted $baseBorderColor;
      }
    }
  }

  // .report-sys-box {
  // height: calc(100vh / 2 - 80px);
  // overflow: auto;
  // }
  >>> .el-tabs__content::-webkit-scrollbar { /* 滚动条整体样式 */
    width: 6px; /* 高宽分别对应横竖滚动条的尺寸 */
    height: 6px;
  }

  >>> .el-tabs__content::-webkit-scrollbar-thumb { /* 滚动条里面小方块 */
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px #92eaf2;
    background: #92eaf2;
  }

  >>> .el-tabs__content::-webkit-scrollbar-track { /* 滚动条里面轨道 */
    -webkit-box-shadow: inset 0 0 5px #ffffff;
    border-radius: 10px;
    background: #f2f6fc;
  }
}
</style>
