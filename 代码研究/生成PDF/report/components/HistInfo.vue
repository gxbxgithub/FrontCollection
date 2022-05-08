<template>
  <div class="kg-histinfo">
    <i class="el-icon-close hand" @click="close"></i>
    <el-select size="mini" v-model="value" style="width: 240px;" @change="changeDate">
      <template slot="prefix">诊断日期</template>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.diagnoseTime"
        :value="item.diagnosticId"
      ></el-option>
    </el-select>
    <!-- tabs-->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="kg-infos">
      <el-tab-pane label="诊断信息" name="first">
        <el-scrollbar>
          <dl class="base-info">
            <dt>基本信息</dt>
            <dd>性别:{{smartDiagnostic.childSex==0?"男":"女"}}</dd>
            <dd>身高:{{smartDiagnostic.diagnosticHeight!=null ?smartDiagnostic.diagnosticHeight+"cm":""}}</dd>
            <dd>身高百分位：{{smartDiagnostic.resultHeightPer!=null ?smartDiagnostic.resultHeightPer+"th":""}}</dd>
            <dd>身高增长速度：{{smartDiagnostic.ltdHeightSpeedbyage!=null ?smartDiagnostic.ltdHeightSpeedbyage+"cm/yr":""}}</dd>
            <dd>体重:{{smartDiagnostic.diagnosticWeight!=null ?smartDiagnostic.diagnosticWeight+"kg":""}}</dd>
            <dd>BMI:{{smartDiagnostic.resultBmi!=null ?smartDiagnostic.resultBmi+"kg":""}}</dd>
            <dd>体重增长速度：{{smartDiagnostic.ltdWeightSpeedbyage!=null ?smartDiagnostic.ltdWeightSpeedbyage+"kg/yr":""}}</dd>
            <dd>年龄：{{smartDiagnostic.resultAge!=null ?smartDiagnostic.resultAge+"岁":""}}</dd>
            <dd
              v-if="smartDiagnostic.diagnosticRusMethod!='G-P'"
            >骨龄: {{smartDiagnostic.diagnosticRusBoneage!=null ?smartDiagnostic.diagnosticRusBoneage+"岁":""}}</dd>
            <dd
              v-if="smartDiagnostic.diagnosticRusMethod=='G-P'"
            >骨龄: {{smartDiagnostic.diagnosticGpBoneage!=null ?smartDiagnostic.diagnosticGpBoneage:""}}</dd>
            <dd>骨龄百分位：{{smartDiagnostic.resultRusboneagePer!=null ?smartDiagnostic.resultRusboneagePer+"th":""}}</dd>
            <dd>骨龄身高增长速度：{{smartDiagnostic.ltdHeightSpeedbybage!=null ?smartDiagnostic.ltdHeightSpeedbybage+"cm/yr":""}}</dd>
            <dd>骨龄增长速度：{{smartDiagnostic.ltdRusboneageSpeed!=null ?smartDiagnostic.ltdRusboneageSpeed+"岁/年":""}}</dd>
            <dd>腕骨骨龄：{{smartDiagnostic.diagnosticCarpalBoneage!=null ?smartDiagnostic.diagnosticCarpalBoneage+"岁":""}}</dd>
            <dd>骨龄减腕骨骨龄：{{smartDiagnostic.resultRusdiffcarpal!=null ?smartDiagnostic.resultRusdiffcarpal+"岁":""}}</dd>
            <dd>预测成年身高:{{smartDiagnostic.resultForeastHeight!=null ?smartDiagnostic.resultForeastHeight+"cm":""}}</dd>
            <dd>靶身高：{{smartDiagnostic.resultTargetHeight!=null?smartDiagnostic.resultTargetHeight +" cm":""}}</dd>
          </dl>
          <dl>
            <dt>病史</dt>
            <dd>过敏史：{{smartDiagnostic.diagnosticAllergyHistory!=null?smartDiagnostic.diagnosticAllergyHistory:""}}</dd>
            <dd>家族发育史：{{smartDiagnostic.diagnosticFamilyHistory!=null&&smartDiagnostic.diagnosticFamilyHistory!=''?smartDiagnostic.diagnosticFamilyHistory:""}}</dd>
          </dl>
          <dl v-if="smartDiagnostic.childSex==0">
            <dt>第二性征</dt>
            <dd>外生殖器等级：{{smartDiagnostic.diagnosticPenisGrade!=null?smartDiagnostic.diagnosticPenisGrade+"级":""}}</dd>
            <dd>阴毛等级：{{smartDiagnostic.diagnosticPubicGrade!=null?smartDiagnostic.diagnosticPubicGrade+"级":""}}</dd>
            <dd>睾丸体积{{diagnosticTestisMesureName}}：{{smartDiagnostic.diagnosticTestisVolume!=null?smartDiagnostic.diagnosticTestisVolume+"ml":""}}</dd>
          </dl>
          <dl v-else>
            <dt>第二性征</dt>
            <dd>乳房等级：{{smartDiagnostic.diagnosticBreastGrade!=null?smartDiagnostic.diagnosticBreastGrade+"级":""}}</dd>
            <dd>阴毛等级：{{smartDiagnostic.diagnosticPubicGrade!=null?smartDiagnostic.diagnosticPubicGrade+"级":""}}</dd>
            <dd>初潮年龄：{{smartDiagnostic.diagnosticMenarcheAge!=null?smartDiagnostic.diagnosticMenarcheAge+"岁":""}}</dd>
          </dl>
          <!-- <dl>
          <dt>第二性征</dt>
          <dd>外生殖器等级：1级</dd>
          <dd>阴毛等级：1级</dd>
          <dd>睾丸体积：25ml</dd>
          </dl>-->
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="诊断意见" name="second">
        <el-scrollbar>
          <dl>
            <!-- <dt>结论</dt> -->
            <!-- 1、适宜孕龄儿(AGA)，足月新生儿。 -->
            <!-- <dd>{{smartDiagnostic.resultBirthEvaluate}}</dd> -->
            <dd v-html="smartDiagnostic.resultConclusion"></dd>
            <!-- 2、遗传潜力一般。身高未达到遗传水平，可能存在影响生长的因素！ -->
            <!-- <dd>{{smartDiagnostic.resultBirthEvaluate}}</dd> -->
            <!-- <dd>3、体型粗壮，体重较高，会引起骨龄加速。</dd> -->
          </dl>
          <!-- <dl> -->
          <!-- <dt>建议</dt> -->
          <!-- <dd v-html="smartDiagnostic.resultSuggest"></dd> -->
          <!-- <dd>1、严格控制体重增长，每周同一时段测量体重，观察体重变化。</dd>
          <dd>2、进行内分泌检查，排除性早熟。至少每3个月或半年检测骨龄。</dd>-->
          <!-- </dl> -->
          <!-- <dl> -->
          <!-- <dt>方案</dt> -->
          <!-- <dd v-html="smartDiagnostic.resultProject"></dd> -->
          <!-- <dd>1、定期监测生长，至少每个月（建议：生日日期）测量一次身高；每周测量体重并进行评价。</dd>
          <dd>2、饮食：少吃生长期短的肉类和水产品以及高热量、高盐分、高糖分的食物，不吃保健品。</dd>
          <dd>3、运动：强度以孩子出汗为准（心跳140次/分）。</dd>-->
          <!-- </dl> -->
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "HistInfo",
  data() {
    return {
      options: [],
      value: "",
      activeName: "first",
      smartDiagnostic: {},
      diagnosticTestisMesureName:""
    };
  },
  mounted() {
    this.getHistory();
  },
  methods: {
    //按照日期查找
    changeDate() {
      var tempval = this.value;
      this.$axios
        .get("/api/api-inspection-center/report/history/" + this.value + "/detail")
        .then(res => {
          if (res.code == 0) {
            this.smartDiagnostic = res.data;
            this.exchangeDiagnosticTestisMesureToName(this.smartDiagnostic);
            if (
              tempval ==
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticId
            ) {
              this.smartDiagnostic.resultConclusion =
                "<span style='color:#C0C4CC;display:inline;'>暂无，请在报告页面的诊断意见功能栏编写当前诊断意见并保存！</span>";
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //睾丸体积测量方法：0表示睾丸模型测量，1表示超生图测量，2表示卡尺测量
    exchangeDiagnosticTestisMesureToName(obj) {
      switch (obj.diagnosticTestisMethod) {
        case 0:
          this.diagnosticTestisMesureName = "(睾丸模型测量)";
          break;
        case 1:
          this.diagnosticTestisMesureName = "(超生图测量)";
          break;
        case 2:
          this.diagnosticTestisMesureName = "(卡尺测量)";
          break;
      }
    },
    //获取历史记录
    getHistory() {
      if (sessionStorage.getItem("serverDiagnosticModel") == null) {
        return;
      }
      var childData = {
        childId: JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).childId
      };
      this.$axios
        .get(
          "/api/api-inspection-center/screeningData/history", {params:childData})
        .then(res => {
          if (res.code == 0) {
            // let tempHistoryDiagnosticInfos = res.data.historyDiagnosticInfos.filter(
            //   item => {
            //     return (
            //       item.diagnosticId !=
            //       JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            //         .diagnosticId
            //     );
            //   }
            // );
            let tempHistoryDiagnosticInfos = res.data.historyDiagnosticInfos.map(
              item => {
                if (
                  item.diagnosticId ==
                  JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticId
                ) {
                  this.value = "" + item.diagnosticId;
                  item.diagnoseTime = "当前诊断";
                  item.resultConclusion =
                    "<span style='color:#C0C4CC;display:inline;'>暂无，请在报告页面的诊断意见功能栏编写当前诊断意见并保存！</span>";
                }
                return item;
              }
            );
            this.options = tempHistoryDiagnosticInfos;
            //this.options = res.data.historyDiagnosticInfos;
            //this.value = "" + res.data.historyDiagnosticInfos[0].diagnosticId;
            this.$axios
              .get("/api/api-inspection-center/report/history/" + this.value + "/detail")
              .then(res => {
                if (res.code == 0) {
                  this.smartDiagnostic = res.data;
                  this.exchangeDiagnosticTestisMesureToName(this.smartDiagnostic);
                  if (
                    this.value ==
                    JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                      .diagnosticId
                  ) {
                    this.smartDiagnostic.resultConclusion =
                      "<span style='color:#C0C4CC;display:inline;'>暂无，请在报告页面的诊断意见功能栏编写当前诊断意见并保存！</span>";
                  }
                }
              })
              .catch(err => {
                this.$message.error(err);
              });
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    handleClick(tab, event) {},
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

.kg-histinfo {
  position: fixed;
  text-align: left;
  padding: 20px;
  background-color: rgba(242, 246, 252, 1);
  right: 20px;
  width: 400px;
  /*height: calc(90vh - 150px);*/
  //z-index: 999;

  // height (100vh -200px);
  // overflow scroll;
  i {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 20px;
    color: $placeholderTextColor;
  }

  i:hover {
    position: absolute;
    right: 5px;
    top: 5px;
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
    height: calc(94vh - 280px);
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
