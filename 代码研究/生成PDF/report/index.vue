<template>
<div>
  <!-- 历史骨龄 -->
    <el-dialog
      :title="'历史骨龄对照' + this.pageModel.diagnosticRusMethod"
      :visible.sync="dialogVisible"
      width="80%"
      custom-class="kg-dialog"
      top="30px"
      :lock-scroll="false"
    >
      <!-- //历史骨龄TW3 TW3C弹框状态
      //历史骨龄G-P弹框状态-->
      <el-form>
        <div class="boneAge_tp" v-show="historyBoneGradeFlag != 3">
          <div class="boneAge_tp_f">
            <div class="kg_bone_box">
              <div class="kg_bone_title">
                <span>
                  <!-- qqqqqqqqqqq -->
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item style="margin-bottom: 0">
                      <el-select
                        placeholder
                        v-model="evaluationInReportDiagnosticId"
                        @change="changeEvvaluationInReport"
                        size="mini"
                      >
                        <el-option
                          v-for="(item, o) in evaluationInReportList"
                          :key="item.diagnosticId"
                          :label="item.diagnosticDiagnoseTime"
                          :value="item.diagnosticId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </span>
                <span>
                  评价日期：
                  <span v-text="evaluationInReport.diagnosticDiagnoseTime"></span>
                </span>
                <span style="margin-left:15px">
                  掌指骨骨龄：
                  <span
                    v-text="
                      evaluationInReport.rusBoneAge == null
                        ? ''
                        : evaluationInReport.rusBoneAge + '岁'
                    "
                  ></span>
                </span>
              </div>
              <!-- <img :src="evaluationInReportXimg" alt="X光片" class="boneAge_img" /> -->
              <div style="height: 70vh">
                <div
                  class="images"
                  v-viewer="{
                    inline: true,
                    toolbar: false,
                    button: false,
                    navbar: false,
                    title: false,
                  }"
                >
                  <img
                    :src="evaluationInReportXimg"
                    alt="X光片"
                    style="opacity: 0"
                    class="boneAge_img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="boneAge_ck">
            <div class="historic_r">
              <div class="historic_r_f">骨等级</div>
              <el-row v-for="(item, p) in historyBoneAgeDataEv" :key="p">
                <el-col>
                  <div>
                    <el-select
                      v-model="evaluationInReport[item.name + 'Level']"
                      :clearable="selfclearable"
                      filterable
                      remote
                      size="mini"
                      :disabled="true"
                      @keyup="nextFocus($event, index)"
                      @keydown="changeValue(index)"
                      class="border-input"
                      placeholder
                    >
                      <el-option
                        v-for="(item, o) in item.grades"
                        :key="o"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="historic_r2">
              <div class="historic_r_f">骨骺</div>
              <el-row v-for="(item, o) in historyBoneAgeData" :key="o">
                <el-col>{{ item.title }}</el-col>
              </el-row>
            </div>
            <div>
              <div class="dialog_db">
                <div class="historic_r_f">骨等级</div>
                <el-row v-for="(item, p) in historyBoneAgeData" :key="p">
                  <el-select
                    v-model="pageModel['diagnostic' + item.name]"
                    :clearable="selfclearable"
                    filterable
                    remote
                    :remote-method="selectSeek"
                    size="mini"
                    :disabled="true"
                    :ref="'dia' + 'diagnostic' + item.name"
                    :tempName="'dia' + 'diagnostic' + item.name"
                    placeholder
                  >
                    <el-option
                      v-for="(item, o) in item.grades"
                      :key="o"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-row>
              </div>
            </div>
          </div>
          <div class="boneAge_tp_f">
            <div class="kg_bone_box">
              <div class="kg_bone_title">
                <span>
                  评价日期：
                  <span v-text="pageModel.diagnosticDiagnoseTime"></span>
                  <!-- <el-select
                          placeholder
                          v-model="pageModel.diagnosticDiagnoseTime"
                          size="mini"
                          disabled
                        >
                          <el-option
                            :label="pageModel.diagnosticDiagnoseTime"
                            :value="pageModel.diagnosticDiagnoseTime"
                          ></el-option>
                  </el-select>-->
                </span>
                <span style="margin-left:15px">
                  掌指骨骨龄：
                  <span
                    v-show="historyBoneGradeFlag == 0"
                    v-text="
                      (pageModel.diagnosticRusBoneage == null
                        ? ''
                        : pageModel.diagnosticRusBoneage) + '岁'
                    "
                  ></span>
                  <span
                    v-show="historyBoneGradeFlag == 1"
                    v-text="
                      (pageModel.diagnosticRusBoneage == null
                        ? ''
                        : pageModel.diagnosticRusBoneage) + '岁'
                    "
                  ></span>
                  <span
                    v-show="historyBoneGradeFlag == 2"
                    v-text="
                      (pageModel.diagnosticRusBoneage == null
                        ? ''
                        : pageModel.diagnosticRusBoneage) + '岁'
                    "
                  ></span>
                </span>
              </div>
              <div id="currentimgdiv">
                <!-- <img :src="diaformcurrentimg" alt="X光片" class="boneAge_img" /> -->
                <div style="height: 70vh">
                  <div
                    class="images"
                    v-viewer="{
                      inline: true,
                      toolbar: false,
                      button: false,
                      navbar: false,
                      title: false,
                    }"
                  >
                    <img :src="diaformcurrentimg" alt="X光片" style="opacity: 0" class="boneAge_img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="boneAge_tp" v-show="historyBoneGradeFlag == 3">
          <div class="boneAge_tp_f">
            <div class="kg_bone_box">
              <div class="kg_bone_title">
                <span>
                  <el-form :inline="true" class="demo-form-inline">
                    <el-form-item style="margin-bottom: 0">
                      <el-select
                        placeholder
                        v-model="evaluationInReportDiagnosticId"
                        @change="changeEvvaluationInReport"
                        size="mini"
                      >
                        <el-option
                          v-for="(item, o) in evaluationInReportList"
                          :key="item.diagnosticId"
                          :label="item.diagnosticDiagnoseTime"
                          :value="item.diagnosticId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </span>
                <span>
                  评价日期：
                  <span v-text="evaluationInReport.diagnosticDiagnoseTime"></span>
                </span>
                <span style="margin-left:15px">
                  掌指骨骨龄：
                  <span v-text="evaluationInReport.rusBoneAgeTwelve"></span>
                </span>
              </div>
              <div>
                <!-- 历史<img :src="evaluationInReportXimg" alt="X光片" class="boneAge_img" /> -->
                <div style="height: 70vh">
                  <div
                    class="images"
                    v-viewer="{
                      inline: true,
                      toolbar: false,
                      button: false,
                      navbar: false,
                      title: false,
                    }"
                  >
                    <img
                      :src="evaluationInReportXimg"
                      alt="X光片"
                      style="opacity: 0"
                      class="boneAge_img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="boneAge_tp_f">
            <div class="kg_bone_box">
              <div class="kg_bone_title">
                <span>
                  评价日期：
                  <span v-text="pageModel.diagnosticDiagnoseTime"></span>
                </span>
                <span
                  v-show="
                    pageModel.diagnosticGpBoneage != null &&
                    pageModel.diagnosticGpBoneage != ''
                  "
                  style="margin-left:15px"
                >
                  掌指骨骨龄：
                  <span v-text="pageModel.diagnosticGpBoneage"></span>
                </span>
              </div>
              <div>
                <!-- 历史<img :src="diaformcurrentimg" alt="X光片" class="boneAge_img" /> -->
                <div style="height: 70vh">
                  <div
                    class="images"
                    v-viewer="{
                      inline: true,
                      toolbar: false,
                      button: false,
                      navbar: false,
                      title: false,
                    }"
                  >
                    <img :src="diaformcurrentimg" alt="X光片" style="opacity: 0" class="boneAge_img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        </span>
      </el-form>
    </el-dialog>
  <div
    class="kg-report"
    :class="{'kg-report_zoom':isZoom}"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="loadingtext"
  >
    <div class="steps">
      <div class="line"></div>
      <nav-steps
        :nav-index="2"
        @toBoneagepageEvent="toBoneagepage"
        @toInquiryformpageEvent="toInquiryformpage"
      ></nav-steps>
    </div>
    <el-scrollbar class="content">
      <div class="wrap">
        <Professional
          v-show="showProfessional"
          :reportInfo="reportInfo"
          :reportContent="reportContent"
          ref="myChildP"
          :showProfessionalPrint="showProfessionalPrint"
        ></Professional>
        <General
          :class="{'kg-report_zoom':isChildZoom}"
          v-show="showGeneral"
          ref="myChildG"
          :reportInfo="reportInfo"
          :reportContent="reportContent"
          :showGeneralPrint="showGeneralPrint"
        ></General>
        <!-- table -->
        <div class="sidebar" style="width:400px" v-if="showSide">
          <hist-info @close="isShow"></hist-info>
        </div>
        <div class="sidebar" v-if="showPicSide">
          <img-info ref="showImg" :reportInfo="reportInfo" @close="isShowPic"></img-info>
        </div>
        <!--- siderbar -->
      </div>
      <el-dialog
        :visible.sync="showDialog"
        :before-close="hideDialog"
        title="提示"
        width="300px"
        custom-class="kg-dialog"
      >
        <div style="padding-top: 30px">
          <table style="text-align: center; margin: 0 auto">
            <tr>
              <td>
                打印的报告中会显示二维码
                <br />
                <br />请通知患者扫码确认随诊关系
              </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="this.hideDialog">确定</el-button>
        </span>
      </el-dialog>
      <!-- 加载全部页面的PDF是一个for循环,不能指定用来打印的ref -->
      <div ref="printContent">
        <Pdf
          v-for="i in pdfOptions.numPages"
          :key="i"
          :src="pdfOptions.pdfUrl"
          :page="i"
          v-show="isShowSinglePagePdf"
          @page-loaded="pageLoaded($event)"
          @error="pdfError($event)"
        />
        <!-- 这种写法默认只加载第一页,pdf隐藏,打印用的 -->
        <Pdf :src="pdfOptions.pdfUrl" ref="pdfcontent" v-show="isShowSinglePagePdf" />
      </div>
      <report-detail-set
        title="显示更多报告信息"
        :show="showReportDetailSetHandle"
        :diagnosticId="diagnosticId"
        @showModules="showModule"
        @close="showReportDetailSetHandle = false"
        ref="showInfo"
        :reportSource="reprotName"
      />
    </el-scrollbar>
    <!--- foot -->
    <div :class="[isActive ? 'foot' : 'foot2']">
      <el-button
        type="primary"
        size="medium"
        @click="onFollowup"
        :disabled="suiZhenFlag"
        v-track-event="{ category: '生成报告-确定随诊', action: 'click' }"
      >确定随诊</el-button>
      <el-button
        type="primary"
        plain
        size="medium"
        v-show="guanPianChaKanFlag"
        @click="showHistoryBoneAge"
        v-track-event="{ category: '生成报告-查看骨龄', action: 'click' }"
      >查看骨龄</el-button>
      <el-button
        type="primary"
        plain
        size="medium"
        @click="onShowSide"
        :disabled="isbtnHistory"
        v-track-event="{ category: '生成报告-查看诊断', action: 'click' }"
      >查看诊断</el-button>
      <div class="kg-block" v-track-event="{ category: '生成报告-复诊日期', action: 'click' }">
        <span>复诊日期</span>
        <el-date-picker
          style="width: 133px"
          v-model="value1"
          type="date"
          placeholder="复诊日期"
          size="medium"
          clear-icon="el-input_icon"
          value-format="yyyy-MM-dd"
          @change="this.saveFollowupTime"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <el-button
        type="success"
        size="medium"
        @click="changeReport"
        v-track-event="{ category: '生成报告-切换报告', action: 'click' }"
      >切换到{{ reprotName }}报告</el-button>
      <el-button
        type="primary"
        plain
        size="medium"
        @click="showSetting"
        v-track-event="{ category: '生成报告-报告内容设置', action: 'click' }"
      >报告内容设置</el-button>
      <el-button
        v-show="get && healthFlag"
        type="primary"
        plain
        size="medium"
        @click="toHealthDetail"
      >查看运动处方</el-button>
      <el-button
        v-show="get && !healthFlag"
        type="primary"
        plain
        size="medium"
        @click="toHealth"
      >开具运动处方</el-button>
      <!--<el-button type="success" size="mini" @click="saveReport" v-track-event="{category:'生成报告-保存报告', action:'click'}">保存报告</el-button>-->
      <div
        class="kg-block hand"
        v-if="reprotName == '专业'"
        @click="chekGeneralFn('打印预览')"
        v-track-event="{ category: '生成报告-打印预览', action: 'click' }"
      >
        <i class="el-icon-printer"></i>打印预览
      </div>
      <div
        class="kg-block hand"
        v-else
        @click="previewPrint"
        v-track-event="{ category: '生成报告-打印预览', action: 'click' }"
      >
        <i class="el-icon-printer"></i>打印预览
      </div>
      <div class="kg-block hand" @click="chekGeneralFn('导出')" v-if="reprotName == '专业'">
        <img class="pdf-img" src="@/assets/img/pdf-img.png" /> 导出PDF
      </div>
      <div class="kg-block hand" @click="getPdf" v-else>
        <img class="pdf-img" src="@/assets/img/pdf-img.png" /> 导出PDF
      </div>
    </div>
    <el-dialog
      title="快捷支付"
      :visible.sync="departmentIsPay_flag"
      width="30%"
      :before-close="departmentIsPay_close"
      custom-class="kg-dialog"
    >
      <el-row>
        <div class="pay-num">
          应支付
          <span>{{ payPrice }}</span>元
        </div>
        <div class="kg-pay-ewm">
          <div class="pay-zfbwx">
            <div style>支付宝</div>
            <img class="pay-ewm" :src="saasClientPay_zhifubao" alt="二维码加载失败,请关闭重新打开" />
            <img class="pay-ewm-i" src="@/assets/img/zfbpay.png" alt v-show="saasClientPay_zhifubao_flag" />
          </div>
          <div class="pay-zfbwx">
            <div>微信</div>
            <img class="pay-ewm" :src="saasClientPay_weixin" alt="二维码加载失败,请关闭重新打开" />
            <img class="pay-ewm-i2" src="@/assets/img/wxpay.png" alt v-show="saasClientPay_weixin_flag" />
          </div>
        </div>
      </el-row>
    </el-dialog>
    <!-- 支付成功的弹框 -->
    <el-dialog
      title="支付成功"
      :visible.sync="dialogVisible_zhifu"
      width="20%"
      custom-class="kg-dialog"
      :before-close="dialogVisible_sure"
    >
      <div class="pay-sucess el-icon-success">支付成功</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible_sure">确 定</el-button>
      </span>
    </el-dialog>    
    <!-- 生长发育问题 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible_problem"
      width="30%"
      :before-close="handleClose_problem"
      custom-class="kg-dialog"
    >
      <div class="first-panle">
        <div class="first-f-p" v-for="(item, index) in problemList" :key="index">
          <el-row v-if="index % 2 == 0">
            <el-col :span="12">
              {{ item.name }}:
              <span :style="{ color: item.objStyle }">
                {{
                item.value
                }}
              </span>
            </el-col>
            <el-col v-if="index < problemList.length - 1" :span="12">
              {{ problemList[index + 1].name }}:
              <span
                :style="{ color: problemList[index + 1].objStyle }"
              >{{ problemList[index + 1].value }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="gz-title">跟踪方法</div>
      <div class="first-panle">
        <div class="first-f-p">
          <el-tooltip placement="bottom" effect="light">
            <div slot="content">
              选择后，打印的报告中会显示二维码,
              <br />请告知患者扫码确认随诊关系
            </div>
            <el-checkbox class="first-f-n" :disabled="disabled_problem" v-model="checked_problem">随诊</el-checkbox>
          </el-tooltip>
          <span style="margin-left:90px;margin-right:10px;padding-right:1px">复诊日期</span>
          <el-date-picker
            v-model="valueTime"
            type="date"
            placeholder="复诊日期"
            style="width: 135px;"
            size="medium"
            value-format="yyyy-MM-dd"
            clear-icon="el-input_icon"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_problem_close">取 消</el-button>
        <el-button type="primary" @click="problem_submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
// import Lockr from "lockr";
import NavSteps from "../components/NavSteps";
import HistInfo from "./components/HistInfo";
import ImgInfo from "./components/ImgInfo";
import ReportDetailSet from "@/components/report/ReportDetailSet";
import { buildingRelationships, getRelationships } from "@/api/work/followup";
import {
  getQR,
  saveFollowupTime,
  saveReport,
  getImg,
  getPdf,
  getPdfName,
  historyReport
} from "@/api/work/report";
import eventEnquiry from "@/event/eventEnquiry.js";
import { saveUnfinishedArchivesAPI } from "@/api/work/list";
import Pdf from "vue-pdf";
import md5 from "js-md5";
//下拉框的选项值
import boneGradesS from "../boneage/constants/boneGradeS";
import moment from "moment";
import { queryReportparams } from "@/api/work/report";

export default {
  name: "Report",
  data() {
    return {
      reportContent:'',
      isZoom: false,
      isChildZoom: false,
      valueTime: "",
      disabled_problem: false,
      checked_problem: false,
      problemList: [],
      dialogVisible_problem: false,
      // 历史骨龄 -开始
      evaluationInReportDiagnosticIdNull: "",
      evaluationInReportListNull: [],
      //腕骨等级字典
      guanPianChaKanFlag: false,
      form: {},
      carpalBoneName: "Tzg,Gg,Yg,Sjg,Zg,Ddjg,Xdjg",
      selfclearable: false,
      //历史骨等级选中的数据对应的光片
      evaluationInReportXimg: require("@/assets/img/X-none.png"),
      diaformcurrentimg: "",
      //骨等级字典
      historyBoneAgeDataEv: {
        title: "",
        name: "rg",
        grade: []
      },
      //骨等级字典
      historyBoneAgeData: {
        title: "",
        name: "rg",
        grade: []
      },
      pageModel: "",
      diagnosticRusMethod: "",
      dialogVisible: false,
      historyBoneGradeFlag: false,
      evaluationInReportDiagnosticId: "",
      evaluationInReportList: [],
      evaluationInReport: "",
      diagnosticTime: "",
      // RUS-CHN RUS&Carpal骨等级列表
      rcBoneGrades: boneGradesS.rcBoneGrades,

      // TW3-C RUS&Carpal骨等级列表
      tw3cBoneGrades: boneGradesS.tw3cBoneGrades,

      // TW3 RUS&Carpal骨等级列表
      tw3BoneGrades: boneGradesS.tw3BoneGrades,

      // RUS-CHN RUS&Carpal骨等级列表EV
      rcBoneGradeEvs: boneGradesS.rcBoneGradeEvs,

      // TW3-C RUS&Carpal骨等级列表EV
      tw3cBoneGradeEvs: boneGradesS.tw3cBoneGradeEvs,

      // TW3 RUS&Carpal骨等级列表EV
      tw3BoneGradeEvs: boneGradesS.tw3BoneGradeEvs,
      //骨等级字典
      historyBoneAgeData: {
        title: "",
        name: "rg",
        grade: []
      },
      // 历史骨龄 - 结束
      pickerOptions: {},
      pdfOptions: {
        numPages: 0,
        pdfUrl: ""
      },
      isShowSinglePagePdf: false,
      isbtnHistory: false,
      value1: "",
      showSide: false,
      isActive: true,
      // hospitalId: Lockr.get("loginUserInfo").doctorUserAllVO.hospitalId + "",
      hospitalId:
        JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
          .hospitalId + "",
      departmentId:
        JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
          .departmentId + "",
      // departmentId:
      //   Lockr.get("loginUserInfo").doctorUserAllVO.departmentId + "",
      showDialog: false,
      showReportDetailSetHandle: false,
      diagnosticId: "1",
      showProfessional: false,//表示呈现专业报告
      showGeneral: true,//表示呈现通用报告
      images: "",
      reprotName: "通用",
      reportInfo: "",
      showPrintDialog: false,
      showProfessionalPrint: false,
      showGeneralPrint: false,
      reportType: 1,
      reportSettings: "",
      rusMethod: "",
      childId: "",
      smartDiagnosticList: "",
      loading: false,
      showPicSide: false,
      departmentIsPay_flag: false,
      saasClientPay_weixin: "",
      saasClientPay_zhifubao: "",
      saasClientPay_zhifubao_flag: true,
      saasClientPay_weixin_flag: true,
      payPrice: "",
      dialogVisible_zhifu: false,
      pay_timer: "",
      payUnfinished: null,
      timer: "",
      checkupId: "",
      healthFlag: false,
      message_flag: true,
      suiZhenFlag: true,
      loadingtext: '正在加载中...'
    };
  },
  beforeDestroy() {
    try {
      clearInterval(this.pay_timer);
    } catch (ex) {
      console.log(ex);
    }
    try {
     //关闭定时
      clearInterval(this.timer);
    } catch (ex) {
      console.log(ex);
    }
  },
  created() {
    sessionStorage.setItem("pageindex", 2);
    this.reportInfo = sessionStorage.getItem("serverDiagnosticModel");
    this.childId = JSON.parse(this.reportInfo).childId;
    this.diagnosticId = JSON.parse(this.reportInfo).diagnosticId;
    eventEnquiry.$off("saveResultEvent");
    eventEnquiry.$on("saveResultEvent", message => {
      // this.$nextTick(() => {
      //   let suffix = "Professional";
      //   if (this.reportType === 0) {
      //     suffix = "General";
      //   }
      //   let conclusion = document.getElementById("conclusionHtml" + suffix)
      //     .innerHTML;
      //   let suggest = ""; // document.getElementById("suggestHtml" + suffix).innerHTML;
      //   let scheme = ""; // document.getElementById("schemeHtml" + suffix).innerHTML;
      //   sessionStorage.removeItem("customReportSettings");
      //   saveReport({
      //     diagnosticId: this.diagnosticId,
      //     resultConclusion: conclusion,
      //     resultSuggest: suggest,
      //     resultProject: scheme
      //   });
      // });
    });

    this.showPic();

    eventEnquiry.$off("saveSuggest");
    eventEnquiry.$on("saveSuggest", mm => {
      this.saveReport(mm);
    });
    this.getHistoryEvaluationinReport();
    //问题儿童
    this.encapsulation();
    //获取最后一次复诊时间
  },
  components: {
    NavSteps,
    HistInfo,
    Pdf,
    General: () => import("./components/General"),
    Professional: () => import("./components/Professional"),
    ReportDetailSet,
    ImgInfo
  },
  mounted() {
    this.init();
    if(sessionStorage.getItem("reportType") == 1){
      this.showProfessional = true;
      this.showGeneral = false;
    }else{
      this.showProfessional = false;
      this.showGeneral = true;
    }
    this.getHistory();
    let historydiagnosticId = sessionStorage.getItem("historydiagnosticId");
    if(historydiagnosticId){
      this.historydiagnosticId = historydiagnosticId
      this.historyReport()
    }
    this.$axios
      .get(
        "/api/api-basic-service-center/system/getTime",
        {},{ headers: { "Content-Type": "application/json;charset=UTF-8" } }
      ).then((res) => {
        var nowDate = res.data.split(' ')[0];
        var cc = new Date(nowDate).getTime()
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() < cc;
          }
        };
      });
  },
  watch: {
    showPicSide: function(val) {
      if (window.screen.availWidth < 1920) {
        this.isZoom = val;
      }
      if(val){
        this.showSide = false
      }
    },
    showSide: function(val) {
      if (window.screen.availWidth < 1920) {
        this.isActive = !val;
        this.isChildZoom = val;
      }
      if(val){
        this.showPicSide = false
      }
    },

  },
  computed: {
    get() {
      return this.$store.getters.is_health;
    }
  },
  methods: {
    //获取历史诊断
    historyReport(){
      historyReport(this.historydiagnosticId).then(res => {
        this.reportContent = res.data
        sessionStorage.removeItem("historydiagnosticId");
      })
    },
    showModule(agm1, agm2) {
      if (this.reprotName == "专业") {
        let arr = [];
        this.$refs.myChildG.showModule(agm1, agm2);
        new Promise((res, reg) => {
          res();
        })
          .then(() => {
            for (var i = 0; i < agm2.length; i++) {
              if (agm2[i] === agm2[i]) {
                arr.push(agm2[i]);
              }
            }
          })
          .then(() => {
            if (arr.length > 0) {
              this.showPicSide = true;
              this.isActive = false;
            } else {
              this.showPicSide = false;
              this.isActive = true;
            }
          })
          .then(() => {
            this.$refs.showImg.initChek(this.reprotName);
          });
        // setTimeout(()=>{},50)
      }
    },
    chekGeneralFn(val) {
      this.isActive = false;
      this.showPicSide = false;
      this.$refs.myChildG.reportPdf(val);
    },
    dialogVisible_problem_close() {
      this.dialogVisible_problem = false;
      if (this.valueTime != this.value1) {
        this.valueTime = this.value1;
      }
      this.checked_problem = false;
    },
    //当鼠标滑到随诊的checkbox框的时候要提示信息
    keySubmitBtn() {
      if (this.message_flag) {
        this.message_flag = false;
        var that = this;
        this.$message({
          // type: 'warning',
          showClose: true,
          message: "打印的报告中会显示二维码,请通知患者扫码确认随诊关系",
          onClose: function() {
            that.message_flag = true;
          }
        });
      }
    },
    // 检查是否 随诊
    async getfuzhen() {
      return getRelationships({ childId: this.childId }).then(res => {
        //true 随诊,false 非随诊
        if (res.data) {
          this.checked_problem = true;
          this.suiZhenFlag = true;
          return true;
        } else {
          this.checked_problem = false;
          this.suiZhenFlag = false;
        }
      });
    },
    //获取最后一次复诊时间
    async getrevisit() {
      return this.$axios
        .get(
          "/api/api-inspection-center/recordrevisitclinic/isRevisit/"+ this.childId,
          {},
          { headers: { "Content-Type": "application/json;charset=UTF-8" } }
        )
        .then(res => {
          //获取最后一次的诊断时间
          if (res.data != null && res.data.length > 0) {
            var list = res.data;
            for(var i =0;i<list.length;i++ ){
              console.log(this.diagnosticId,list[i].diagnosticId)
              if(this.diagnosticId == list[i].diagnosticId){
                this.value1 = list[i].revisitTime;
                this.valueTime = this.value1;
              }
            }
            // this.value1 = res.data[res.data.length - 1].revisitTime;
            // this.valueTime = this.value1;
            return res.data[res.data.length - 1];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //问题弹框的确认按钮
    problem_submit() {
      //随诊
      if (this.checked_problem) {
        //随诊二维码
        this.getQR(1);
        //儿童和医生建立随诊关系
        buildingRelationships({ childId: this.childId }).then(res => {});
      }
      //复诊
      if (this.valueTime != null && this.valueTime.trim().length > 0) {
        this.value1 = this.valueTime;
        this.saveFollowupTime();
      }
      this.dialogVisible_problem = false;
    },
    //将数据进行封装
    async encapsulation() {
      // "骨龄百分位":resultRusboneagePer
      // "身高百分位":resultHeightPer

      // "体重形态":resultFatstate
      // "身高":resultSomatotype  暂时不用

      // 骨龄减年龄 resultRusboneagediffage
      var show_flag = false;

      //封装
      var data = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      var methond = data.diagnosticRusMethod;
      this.problemList = [];
      if (data.resultHeightPer != null) {
        var obj = {
          name: "身高百分位",
          value: data.resultHeightPer
        };
        if (
          data.resultHeightPer.includes("大于") ||
          data.resultHeightPer.includes("小于")
        ) {
          obj.objStyle = "#FB4D79";
          show_flag = true;
        } else {
          obj.objStyle = "#606266";
        }
        if (data.resultHeightPer.includes("小于3")) {
          obj.value = data.resultHeightPer + "rd";
        } else if(data.resultHeightPer=="3.0"||data.resultHeightPer=="3"){
          obj.value = "3rd";
        }else {
          obj.value = data.resultHeightPer + "th";
        }
        this.problemList.push(obj);
      }
      if (data.resultFatstate != null) {
        var obj = {
          name: "体重状态",
          value: data.resultFatstate
        };
        if (
          data.resultFatstate.includes("严重体瘦") ||
          data.resultFatstate.includes("肥胖")
        ) {
          obj.objStyle = "#FB4D79";
          show_flag = true;
        }
        if (
          data.resultFatstate.includes("中度体瘦") ||
          data.resultFatstate.includes("超重")
        ) {
          obj.objStyle = "#FFBF00";
          show_flag = true;
        }
        if (
          data.resultFatstate.includes("轻度体瘦") ||
          data.resultFatstate.includes("正常")
        ) {
          obj.objStyle = "#606266";
        }
        this.problemList.push(obj);
      }
      //RUS-CHN，TW3-C RUS，TW3-RUS，G-P
      // rus-chn和tw3c骨龄报告
      //  g-p和tw3骨龄报告
      if (methond == "RUS-CHN" || methond == "TW3-C RUS") {
        if (data.resultRusboneagePer != null) {
          var obj_gulin = {
            name: "骨龄百分位",
            value: data.resultRusboneagePer
          };
          if (
            data.resultRusboneagePer.includes("大于") ||
            data.resultRusboneagePer.includes("小于")
          ) {
            obj_gulin.objStyle = "#FB4D79";
            show_flag = true;
          } else {
            obj_gulin.objStyle = "#606266";
          }
          if (data.resultRusboneagePer.includes("小于3")) {
            obj_gulin.value = data.resultRusboneagePer + "rd";
          } else if(data.resultRusboneagePer=="3.0"||data.resultRusboneagePer=="3"){
            obj_gulin.value = "3rd";
          } else {
            obj_gulin.value = data.resultRusboneagePer + "th";
          }
          this.problemList.push(obj_gulin);
        }
        if (data.resultRusboneagediffage != null) {
          var obj_jian = {
            name: "骨龄减年龄",
            value:
              data.resultRusboneagediffage +
              " 岁 " +
              (data.resultBaState == null ? "" : data.resultBaState)
          };
          if (Math.abs(data.resultRusboneagediffage) > 2) {
            obj_jian.objStyle = "#FB4D79";
            show_flag = true;
          } else {
            obj_jian.objStyle = "#606266";
          }
          this.problemList.push(obj_jian);
        }
      } else if (methond == "G-P" || methond == "TW3-RUS") {
        if (data.resultRusboneagediffage != null) {
          var obj_jian = {
            name: "骨龄减年龄",
            value:
              data.resultRusboneagediffage +
              " 岁 " +
              (data.resultBaState == null ? "" : data.resultBaState)
          };
          if (Math.abs(data.resultRusboneagediffage) > 2) {
            obj_jian.objStyle = "#FB4D79";
            show_flag = true;
          } else {
            obj_jian.objStyle = "#606266";
          }
          this.problemList.push(obj_jian);
        }
      }
      var time = await this.getrevisit();
      var fuzhen = await this.getfuzhen();
      if (show_flag) {
        if (!(fuzhen && time != null)) {
          this.timer = setTimeout(() => {
            //设置延迟执行
            this.dialogVisible_problem = true;
          }, 1000);
        }
      }
    },
    //发育问题的关闭窗口
    handleClose_problem() {
      this.dialogVisible_problem = false;
    },
    //评价方法（1：RUS_CHN；2：TW3-C RUS；3：TW3 RUS；4：G-P）
    changeRusMethodStyleToStr(rus) {
      var tempstyle = 0;
      switch (rus) {
        case 1:
          tempstyle = "RUS-CHN";
          break;
        case 2:
          tempstyle = "TW3-C RUS";
          break;
        case 3:
          tempstyle = "TW3-RUS";
          break;
        case 4:
          tempstyle = "G-P";
          break;
      }
      return tempstyle;
    },
    selectSeek(query) {},
    //获取光片
    getHistoryImage(imageurl, type) {
      //获取光片api-file/baseDownLoad
      this.$axios
        .post(
          "/api/api-basic-service-center/file/image2base64",
          {
            file_path: imageurl
          },
          { headers: { "Content-Type": "application/json;charset=UTF-8" } }
        )
        .then(res => {
          if (res.data != "") {
            if (type == 1) {
              this.evaluationInReportXimg = res.data;
            } else if (type == 2) {
              this.diaformcurrentimg = res.data;
            }
          } else {
            if (type == 1) {
              this.evaluationInReportXimg = require("@/assets/img/X-none.png");
            } else if (type == 2) {
              this.diaformcurrentimg = require("@/assets/img/X-none.png");
            }
          }
        })
        .catch(err => {
          if (type == 1) {
            this.evaluationInReportXimg = require("@/assets/img/X-none.png");
          } else if (type == 2) {
            this.diaformcurrentimg = require("@/assets/img/X-none.png");
          }
          console.log(err);
        });
    },
    // 历史骨等级切换调用方法
    changeEvvaluationInReport() {
      this.evaluationInReportList.map(item => {
        if (item.diagnosticId == this.evaluationInReportDiagnosticId) {
          this.evaluationInReport = item;
          //获取光片
          if (
            this.evaluationInReport.xrayName != null &&
            this.evaluationInReport.xrayName.length > 0
          ) {
            this.evaluationInReportXimg = require("@/assets/img/J-none.gif");
            setTimeout(res=>{
              this.getHistoryImage(this.evaluationInReport.xrayName, 1);
            },250)
          } else {
            this.changeImageSourceByServer();
          }
        }
      });
    },
    //查看历史骨等级时，自己读获取不到光片的转换
    changeImageSourceByServer() {
      queryReportparams(this.evaluationInReport.diagnosticId)
        .then(res => {
          if (res.code == 0 && res.data != null) {
            if(res.data.diagnosticImageName != null){
              this.evaluationInReportXimg = require("@/assets/img/J-none.gif");
              setTimeout(res=>{
                this.getHistoryImage(res.data.diagnosticImageName, 1);
              },250)
            } else {
              this.evaluationInReportXimg = require("@/assets/img/X-none.png");
            }
          } else {
            this.evaluationInReportXimg = require("@/assets/img/X-none.png");
          }
        })
        .catch(err => {
          this.evaluationInReportXimg = require("@/assets/img/X-none.png");
          console.log(err);
        });
    },
    //调取历史骨等级
    getHistoryEvaluationinReport() {
      this.pageModel = JSON.parse(
        sessionStorage.getItem("serverDiagnosticModel")
      );
      if (
        this.pageModel.diagnosticRusBoneage != null ||
        this.pageModel.diagnosticGpBoneage != null
      ) {
        this.guanPianChaKanFlag = true;
      }
      var childData = {
        childId: JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).childId
      };
      this.$axios
        .get(
          "/api/api-inspection-center/screeningData/history", {params:childData})
        .then(res => {
          if (res.code == 0) {
            let diagnosticIdList = res.data.historyDiagnosticInfos.map(item => {
              // if (
              //   item.diagnosticId !=
              //   JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
              //     .diagnosticId
              // ) {
                return item.diagnosticId;
              // }
            });
            if (diagnosticIdList == null && diagnosticIdList.length <= 0) {
              return;
            }
            this.historyDiagnosticInfos = res.data.historyDiagnosticInfos;
            this.$axios
              .post(
                "/api/api-inspection-center/boneinspection/listHistoryByDiagnosticIdList",
                diagnosticIdList,
                {
                  headers: { "Content-Type": "application/json;charset=UTF-8" }
                }
              )
              .then(res => {
                if (res.code == 0) {
                  if (res.data != null && res.data.length > 0) {
                    // 历史报告中使用的骨龄评价结果
                    this.evaluationInReportList = [];
                    res.data = res.data.sort(function(a, b) {
                      return new Date(a.diagnosticDiagnoseTime) >
                        new Date(b.diagnosticDiagnoseTime)
                        ? -1
                        : 1;
                    });
                    let list = res.data.filter(item => {
                      //if (item.xrayName != null && item.xrayName.length > 0) {
                      return item;
                      //}
                    });
                    this.historyBoneAgeDisabled = false;
                    this.isChangeBoneAgeMethod = true;
                    this.historyBoneAgeMethod = this.changeRusMethodStyleToStr(
                      list[0].rusEvaluationMethod
                    );
                    this.pageModel.diagnosticRusMethod = this.historyBoneAgeMethod;

                    if (list != null && list.length > 0) {
                      this.guanPianChaKanFlag = true;
                    } else {
                      this.guanPianChaKanFlag = false;
                      return;
                    }
                    var zhongList = [];
                    for (var i = 0; i < list.length; i++) {
                      if (list[i].diagnosticId == JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).diagnosticId) {
                        this.pageModel.diagnosticRg = list[i].rgLevel;
                        this.pageModel.diagnosticCg = list[i].cgLevel;
                        this.pageModel.diagnosticZgi = list[i].zgiLevel;
                        this.pageModel.diagnosticZgiii = list[i].zgiiiLevel;
                        this.pageModel.diagnosticZgv = list[i].zgvLevel;
                        this.pageModel.diagnosticJjzgi = list[i].jjiLevel;
                        this.pageModel.diagnosticJjzgiii = list[i].jjiiiLevel;
                        this.pageModel.diagnosticJjzgv = list[i].jjvLevel;
                        this.pageModel.diagnosticZjzgiii = list[i].zjiiiLevel;
                        this.pageModel.diagnosticZjzgv = list[i].zjvLevel;
                        this.pageModel.diagnosticYjzgi = list[i].yjiLevel;
                        this.pageModel.diagnosticYjzgiii = list[i].yjiiiLevel;
                        this.pageModel.diagnosticYjzgv = list[i].yjvLevel;
                        this.pageModel.diagnosticDdjg = list[i].ddjgLevel;
                        this.pageModel.diagnosticXdjg = list[i].xdjgLevel;
                        this.pageModel.diagnosticZg = list[i].zgLevel;
                        this.pageModel.diagnosticTzg = list[i].tzgLevel;
                        this.pageModel.diagnosticGg = list[i].ggLevel;
                        this.pageModel.diagnosticSjg = list[i].sjgLevel;
                        this.pageModel.diagnosticYg = list[i].ygLevel;
                        this.pageModel.diagnosticZig = list[i].zigLevel;
                        sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(this.pageModel));
                        // this.diaformcurrentimg = require("@/assets/img/J-none.gif");
                        this.getHistoryImage(
                          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                            .diagnosticImageName,
                          2
                        );
                      } else {
                        zhongList.push(list[i]);
                      }
                    }
                    if (zhongList.length == 0) {
                      return;
                    }
                    this.evaluationInReportList = zhongList;
                    this.evaluationInReport = zhongList[0];
                    this.evaluationInReportDiagnosticId = this.evaluationInReport.diagnosticId;
                    //获取光片
                    if (
                      this.evaluationInReport.xrayName != null ||
                      this.evaluationInReport.xrayName.length > 0
                    ) {
                      this.evaluationInReportXimg = require("@/assets/img/J-none.gif");
                      setTimeout(res=>{
                        this.getHistoryImage(this.evaluationInReport.xrayName, 1);
                      },250)
                    } else {
                      this.changeImageSourceByServer();
                    }
                  }
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 历史骨龄等级弹框按钮
    showHistoryBoneAge() {
      clearTimeout(this.timer); //清除延迟执行

      this.timer = setTimeout(() => {
        //设置延迟执行
        this.dialogVisible = true;
        if (this.diaformcurrentimg == null || this.diaformcurrentimg == "") {
          this.diaformcurrentimg = require("@/assets/img/X-none.png");
        } else {
          //将viewer恢复到原始位置
          if (this.$el.querySelector(".images") != null) {
            this.$el.querySelectorAll(".images").forEach(item => {
              item.$viewer.reset();
            });
          }
        }
        
        if (this.pageModel.diagnosticRusMethod == "RUS-CHN") {
          this.historyBoneGradeFlag = 0;
          this.historyBoneAgeData = this.rcBoneGrades;
          this.historyBoneAgeDataEv = this.rcBoneGradeEvs;
        }
        if (this.pageModel.diagnosticRusMethod == "TW3-C RUS") {
          this.historyBoneGradeFlag = 1;
          this.historyBoneAgeData = this.tw3cBoneGrades;
          this.historyBoneAgeDataEv = this.tw3cBoneGradeEvs;
        }
        if (this.pageModel.diagnosticRusMethod == "TW3-RUS") {
          this.historyBoneGradeFlag = 2;

          this.historyBoneAgeData = this.tw3cBoneGrades;
          this.historyBoneAgeDataEv = this.tw3cBoneGradeEvs;
        }
        if (this.pageModel.diagnosticRusMethod == "G-P") {
          this.historyBoneGradeFlag = 3;
          this.historyBoneAgeData = this.tw3BoneGrades;
          this.historyBoneAgeDataEv = this.rcBoneGradeEvs;
        }
      }, 1000);
    },
    //获取是否有运动报告
    async getToken() {
      if (
        JSON.parse(sessionStorage.getItem("serverDiagnosticModel")) == null ||
        JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .diagnosticId == null ||
        JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .diagnosticId == ""
      ) {
        clearInterval(this.timer);
        return;
      }
      let unfinishedId= await this.get_unfinishedId_unfinishedId();
      this.unfinishedId= unfinishedId;
      var formData = {
        cid: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childId,
        diaid: unfinishedId
      };
      this.$axios
        .post("/api/api-record/record/getHealthRecort", formData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.code === 0) {
            this.getHealthRecort(res.data,unfinishedId);
          }
        })
        .catch(err => {
          this.$message.error(err);
          clearInterval(this.timer);
        });
    },
    //查询最开始的诊断id
     async  get_unfinishedId_unfinishedId() {
       let childId=JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).childId
       let unfinishedId= JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).diagnosticId
       return this.$axios
            .get(
              "/api/api-inspection-center/recorddiagnosticunfinished/unfinishedidtodiagnoticid/" +
                unfinishedId +
                "/" +
                childId,
              {}
            )
            .then((res) => {
              if (res.code == 0) {
                return res.data;
              }else{
                return undefined;
              }
            })
            .catch((err) => {});
     },
    //获取是否有运动报告
    getHealthRecort(data,unfinishedId) {
      var formData = {
        cid: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childId,
        diaid: unfinishedId
      };
      this.healthFlag = false;
      formData.token = data;
      this.$axios
        .post("/RecipesUser/hcstate", formData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          //userId=446748273462611968&type=addcheck
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.healthFlag = true;
              this.checkupId = res.data[0].checkupId;
              clearInterval(this.timer);
            } else {
              this.healthFlag = false;
            }
          }
        })
        .catch(err => {
          this.$message.error(err);
          clearInterval(this.timer);
        });
    },
    //跳到运动处方
    async toHealth() {
      var formData = {
        hospitalId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .hospitalId + "",
        hospitalName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.hospitalName,
        departmentId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .departmentId + "",
        departmentName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.departmentName,
        doctorId: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.doctorId,
        doctorName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.doctorName,
        doctorPhone: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .username,

        cid: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childId,
        name: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childName,
        birthday: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childBirthday,
        sex: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childSex,
        link:
          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            .childPhone == null
            ? ""
            : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .childPhone
        // doctorUserId: JSON.parse(sessionStorage.getItem("loginUserInfo")).id,
      };
      
      var str =
        formData.doctorId +
        formData.doctorName +
        formData.hospitalId +
        formData.hospitalName +
        formData.departmentId +
        formData.departmentName +
        formData.doctorPhone +
        formData.name +
        formData.sex +
        formData.birthday +
        formData.link;
      formData.token = md5(str);
      this.$axios
        .post("/RecipesUser/hdduc", formData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          //diagnosticGpBoneage   diagnosticRusMethod  diagnosticRusBoneage
          //http://192.168.2.22:9092/#/autologin?loginname=17703313779&userId=453714281335230464
          //&type=addcheck&height=121&weight=23
          //&heightper=23.9&
          //bmi=26&Bmijudge=超重&ba=6.3& baper=resultRusboneagePer  &bajudge=resultBaState&recipetime=2020-10-10
          if (res.code === 200) {
            var weight =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticWeight == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticWeight;
            var heightper =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .resultHeightPer == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .resultHeightPer;
            var bmi =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .resultBmi == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .resultBmi;
            var Bmijudge =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .resultFatstate == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .resultFatstate;
            var ba = "";
            if(JSON.parse(sessionStorage.getItem("serverDiagnosticModel")).diagnosticRusMethod=='G-P'){
              ba = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticGpBoneage == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticGpBoneage;
            }else{
                ba =  JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticRusBoneage == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticRusBoneage;
            }
            var baper =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .resultRusboneagePer == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .resultRusboneagePer;
            var recipetime =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticDiagnoseTime == null
                ? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticDiagnoseTime;
            var bamethod =
              JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .diagnosticRusMethod == null? ""
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticRusMethod == 'RUS-CHN'? 1
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticRusMethod == 'TW3-C RUS'? 2
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticRusMethod == 'TW3-RUS'? 3
                : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                    .diagnosticRusMethod == 'G-P'? 4:''
            window.open(
              this.$openUrl +
                "/#/autoLogin?loginname=" +
                res.data.loginName +
                "&cid=" +
                formData.cid +
                "&userId=" +
                res.data.userId +
                "&type=addcheck&height=" +
                JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                  .diagnosticHeight +
                "&weight=" +
                weight +
                "&heightper=" +
                heightper +
                "&bmi=" +
                bmi +
                "&Bmijudge=" +
                Bmijudge +
                "&ba=" +
                ba +
                "&baper=" +
                baper +
                "&bamethod=" +
                bamethod +
                "&recipetime=" +
                recipetime +
                "&diaid=" +
                this.unfinishedId,
              "_blank"
            );
            this.timer = setInterval(this.getToken, 2000);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //跳到运动处方报告详情
    toHealthDetail() {
      var formData = {
        hospitalId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .hospitalId + "",
        hospitalName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.hospitalName,
        departmentId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .departmentId + "",
        departmentName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.departmentName,
        doctorId: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.doctorId,
        doctorName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .doctorUserAllVO.doctorName,
        doctorPhone: JSON.parse(sessionStorage.getItem("loginUserInfo"))
          .username,

        cid: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childId,
        name: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childName,
        birthday: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childBirthday,
        sex: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .childSex,
        link:
          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            .childPhone == null
            ? ""
            : JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                .childPhone,
        diaid: JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .diagnosticId
        // doctorUserId: JSON.parse(sessionStorage.getItem("loginUserInfo")).id,
      };
      var str =
        formData.doctorId +
        formData.doctorName +
        formData.hospitalId +
        formData.hospitalName +
        formData.departmentId +
        formData.departmentName +
        formData.doctorPhone +
        formData.diaid +
        formData.name +
        formData.sex +
        formData.birthday +
        formData.link;
      formData.token = md5(str);
      this.$axios
        .post("/RecipesUser/hdduc", formData, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          if (res.code === 200) {
            window.open(
              this.$openUrl +
                "/#/autoLogin?checkupId=" +
                this.checkupId +
                "&cid=" +
                formData.cid +
                "&userId=" +
                res.data.userId +
                "&loginname=" +
                res.data.loginName,
              "_blank"
            );
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    showPic() {
      eventEnquiry.$off("showPic");
      eventEnquiry.$on("showPic", val => {
        if (val.length > 0) {
          this.showPicSide = true;
          this.showSide = false;
          this.isActive = !this.isActive;
        }else{
          this.showPicSide=false;
        }
        this.$nextTick(() => {
          if (this.showPicSide == true) {
            let info = "";
            document.getElementById("evaluationPic").innerHTML = "";
            for (let i = 0; i < val.length; i++) {
              info += val[i].innerHTML
                .replace('class="fir-one Box-Model"', "")
                .replace('class="fir-one Box-Model"', "");
            }
            document.getElementById("evaluationPic").innerHTML = info;
          }
        });
      });
    },
    isShowPic() {
      this.showPicSide = false;
      this.showSide = false;
      this.isActive = !this.isActive;
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
            // if (
            //   res.data != null &&
            //   res.data.historyDiagnosticInfos.length > 1
            // ) {
            //   this.isbtnHistory = false;
            // } else {
            //   this.isbtnHistory = false;
            // }
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    //确定随诊
    onFollowup() {
      let serverend= sessionStorage.getItem("serverend");
      if(serverend==1){
        this.$message.error("服务已到期，请拨打400-600-8865续费！");
        return;
      }
      this.showDialog = true;
      //随诊二维码
      this.getQR(1);
      //儿童和医生建立随诊关系
      buildingRelationships({ childId: this.childId }).then(res => {
        this.suiZhenFlag = true;
      });
    },
    //历史诊断
    isShow() {
      this.showSide = false;
      this.isActive = !this.isActive;
    },
    //历史诊断
    onShowSide() {
      this.showSide = !this.showSide;
      this.isActive = !this.isActive;
      this.showPicSide = false;
    },
    //打印
    printContent() {
      this.$nextTick(() => {
        let suffix = "Professional";
        if (this.reportType === 0) {
          suffix = "General";
        }
        if (
          document
            .getElementById("conclusionHtml" + suffix)
            .getAttribute("style")
            .indexOf("none") !== -1
        ) {
          document
            .getElementById("conclusionHtml" + suffix)
            .setAttribute("style", "display:block");
          document
            .getElementById("suggestHtml" + suffix)
            .setAttribute("style", "display:block");
          document
            .getElementById("schemeHtml" + suffix)
            .setAttribute("style", "display:block");
          document
            .getElementById("showEditer" + suffix)
            .setAttribute("style", "display:none");
          document
            .getElementById("showEditer" + suffix + "1")
            .setAttribute("style", "display:none");
          document
            .getElementById("showEditer" + suffix + "2")
            .setAttribute("style", "display:none");

          for (
            let i = 0;
            i < document.getElementsByName("chooseTemplete" + suffix).length;
            i++
          ) {
            document
              .getElementsByName("chooseTemplete" + suffix)
              [i].setAttribute("style", "display:none");
          }
        } else {
          document
            .getElementById("conclusionHtml" + suffix)
            .setAttribute("style", "display:none");
          document
            .getElementById("suggestHtml" + suffix)
            .setAttribute("style", "display:none");
          document
            .getElementById("schemeHtml" + suffix)
            .setAttribute("style", "display:none");
          document
            .getElementById("showEditer" + suffix)
            .setAttribute("style", "display:block");
          document
            .getElementById("showEditer" + suffix + "1")
            .setAttribute("style", "display:block");
          document
            .getElementById("showEditer" + suffix + "2")
            .setAttribute("style", "display:block");

          for (
            let i = 0;
            i < document.getElementsByName("chooseTemplete" + suffix).length;
            i++
          ) {
            document
              .getElementsByName("chooseTemplete" + suffix)
              [i].setAttribute("style", "display:block");
          }
        }
      });
    },
    //进入到问诊界面
    toInquiryformpage() {
      this.$confirm(
        "确定要修改吗？点击‘是’会将此诊断存入未完成列表。",
        "提示",
        {
          confirmButtonText: "是",
          cancelButtonText: "否",
          showClose: false,
          type: "warning"
        }
      )
        .then(() => {
          //当前报告存入待诊断
          var reportdetail = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          );
          
          reportdetail.diagnosticDoctorForeastheight = null;
      
          sessionStorage.setItem("diagnosticType", 5);
          let param = {
                diagnosticId: reportdetail.diagnosticId
            };
            this.$axios
                .get("/api/api-inspection-center/saasdiagnosis/getBoneResultByDiagnosticId", {params:param}, {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
                .then(res => {
                      saveUnfinishedArchivesAPI(this.setDiagnosticModel(reportdetail, 2,res))
            .then(res => {
              if (res.code != 0) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              } else {
                sessionStorage.setItem(
                  "serverDiagnosticModel",
                  JSON.stringify(res.data)
                );
                sessionStorage.setItem("issaveunfinish", 1);
                this.$router.push("/workbench/inquiry");
                sessionStorage.setItem("navAxtiveIndex", -1);
                this.$store.commit("SET_ACTIVEINDEX", -1);
                sessionStorage.setItem("successIndexChild", "");
                sessionStorage.setItem("navIndexChild", 0);
              }
            })
            .catch(error => {
              if (error.code == 1000) {
                this.$message({
                  message: error.msg,
                  type: "error"
                });
              }
            });
                })
                .catch(err => {
                    console.log(err);
                });        
        })
        .catch(() => {
          return;
        });
    },
    //关闭 二维码的弹框
    departmentIsPay_close() {
      this.departmentIsPay_flag = false;
      //跳入到待诊断
      this.$router.push("/workbench/unfinish");
      //关闭定时任务
      clearInterval(this.pay_timer);
    },
    //关闭 支付成功的弹框
    dialogVisible_sure() {
      this.dialogVisible_zhifu = false;
      //跳转
      // this.loadingInstance = Loading.service(this.commonLoading);
      this.$router.push("/workbench/boneage");
      // setTimeout(() => {
      //   this.loadingInstance.close();
      // }, 1000);
    },
    //定时任务  查询是否支付成功
    async get_is_pay(data) {
      if (
        sessionStorage.getItem("serverDiagnosticModel") == null ||
        JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .diagnosticId == null
      ) {
        return 1;
      }
      if (data == null) {
        data = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
          .diagnosticId;
      }
      var obj = {
        businessId: data,
        type: 1
      };
      return this.$axios
        .get("/api/api-consumption-center/singlepaymentsettings/querySinglePaymentStatus/"+this.payUnfinished, {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(res => {
          if (res.code == 0) {
            if (res.data == 1) {
              //关闭 二维码的弹框
              this.departmentIsPay_flag = false;
              //关闭定时
              clearInterval(this.pay_timer);
              //  支付成功的打开
              sessionStorage.setItem("issaveunfinish", 1);
              sessionStorage.setItem("navAxtiveIndex", -1);
              this.$store.commit("SET_ACTIVEINDEX", -1);
              sessionStorage.setItem("successIndexChild", "0");
              sessionStorage.setItem("navIndexChild", 1);
              //打开支付成功的弹框
              //已经支付的不用打开 支付成功接口
              // if (
              //   data ===
              //   JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
              //     .unfinishedId
              // ) {
              this.dialogVisible_zhifu = true;
              // };
              this.delPaystatus();
              return 2;
            } else {
              return 3;
            }
          }
        })
        .catch(err => {
          return 4;
        });
    },
    //查询是否是开通单次支付
    is_departmentIsPay() {
      return new Promise((resovle, reject) => {
        var obj = {
          hospitalId:
            JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
              .hospitalId + "",
          deptId:
            JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
              .departmentId + ""
        };
        this.$axios
          .post("/api/api-consumption-center/singlepaymentsettings/queryHospitalAndDepartmentIsOpenSinglePayment", obj)
          .then(res => {
            if (res.code == 0) {
              resovle(res.data);
            }
          })
          .catch(err => {});
      });
    },
    //查询最原始的unfinishedId
    get_unfinishedId() {
      return new Promise((resovle, reject) => {
        if (
          sessionStorage.getItem("serverDiagnosticModel") == null ||
          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            .unfinishedId == null ||
          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            .unfinishedId == undefined
        ) {
          resovle(null);
        } else {
          let unfinishedId = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          ).unfinishedId;
          let childId = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          ).childId;
          this.$axios
            .get(
              "/api/api-inspection-center/recorddiagnosticunfinished/unfinishedidtodiagnoticid/" +
                unfinishedId +
                "/" +
                childId,
              {}
            )
            .then(res => {
              if (res.code == 0) {
                resovle(res.data);
                this.payUnfinished = res.data;
              }
            })
            .catch(err => {});
        }
      });
    },
    //删除订单支付状态
    delPaystatus() {
      this.$axios
        .get("/api/api-consumption-center/singlepaymentsettings/delSinglePaymentStatus/"+this.payUnfinished, {
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        })
        .then((res) => {})
    },
    //查询是否支付成功
    getPromise(data) {
      return new Promise((resovle, reject) => {
        if (
          sessionStorage.getItem("serverDiagnosticModel") == null ||
          JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
            .diagnosticId == null
        ) {
          resovle(1);
        } else {
          if (data == null) {
            data = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
              .diagnosticId;
            this.payUnfinished = data;
          }
          var obj = {
            businessId: data,
            type: 1
          };
          this.$axios
            .post("/api/api-consumption-center/order/queryOrderByBusinessId", obj, {
              headers: { "Content-Type": "application/json;charset=UTF-8" }
            })
            .then(res => {
              if (res.code == 0) {
                if (res.data != null && res.data.status == 1) {
                  //关闭 二维码的弹框
                  this.departmentIsPay_flag = false;
                  //关闭定时
                  clearInterval(this.pay_timer);
                  //  支付成功的打开
                  sessionStorage.setItem("issaveunfinish", 1);
                  sessionStorage.setItem("navAxtiveIndex", -1);
                  this.$store.commit("SET_ACTIVEINDEX", -1);
                  sessionStorage.setItem("successIndexChild", "0");
                  sessionStorage.setItem("navIndexChild", 1);
                  //打开支付成功的弹框
                  //已经支付的不用打开 支付成功接口
                  if (
                    data ===
                    JSON.parse(sessionStorage.getItem("serverDiagnosticModel"))
                      .unfinishedId
                  ) {
                    this.dialogVisible_zhifu = true;
                  }
                  resovle(2);
                } else {
                  resovle(3);
                }
              }
            })
            .catch(err => {
              reject(4);
            });
        }
      });
    },
    //获取二维码
    async get_saasClientPay(data) {
      // data=JSON.parse(data);
      var obj = {
        businessId: this.payUnfinished,
        childId: data.childId,
        childName: data.childName,
        childBirthday: data.childBirthday,
        childSex: data.childSex
      };
      this.$axios
        .post("/api/api-consumption-center/order/generatePaymentQr", obj, {
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(res => {
          if (res.code == 0) {
            this.departmentIsPay_flag = true;
            if(res.data.wxqr=="" || res.data.wxqr==null){
                this.saasClientPay_weixin = require('@/assets/img/erweima/failErWeiMa.png');
                this.saasClientPay_weixin_flag = false;
            }else{
                this.saasClientPay_weixin = res.data.wxqr;
                this.saasClientPay_weixin_flag = true;
            }
            if(res.data.alipayqr=="" || res.data.alipayqr==null){
              this.saasClientPay_zhifubao =  require('@/assets/img/erweima/failErWeiMa.png');
              this.saasClientPay_zhifubao_flag = false
            }else{
              this.saasClientPay_zhifubao = res.data.alipayqr;
              this.saasClientPay_zhifubao_flag = true
            }
            this.payPrice = res.data.payPrice/100;
            //开启定时
            this.pay_timer = setInterval(this.get_is_pay, 1000);
          }
        })
        .catch(err => {});
    },
    //进入到骨龄评价界面
    toBoneagepage() {
      this.$confirm(
        "确定要修改吗？点击‘是’会将此诊断存入未完成列表。",
        "提示",
        {
          confirmButtonText: "是",
          cancelButtonText: "否",
          showClose: false,
          type: "warning"
        }
      )
        .then(() => {
          //当前报告存入待诊断
          var reportdetail = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          );
          sessionStorage.setItem("diagnosticType", 5);
          let param = {
                diagnosticId: reportdetail.diagnosticId
            };
            this.$axios
                .get("/api/api-inspection-center/saasdiagnosis/getBoneResultByDiagnosticId", {params:param}, {
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8"
                    }
                })
                .then(res => {
                      saveUnfinishedArchivesAPI(this.setDiagnosticModel(reportdetail, 2,res))
            .then(res => {
              if (res.code != 0) {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
              } else {
                var _this = this;
                this.payUnfinished = res.data.diagnosticId;
                sessionStorage.setItem(
                  "serverDiagnosticModel",
                  JSON.stringify(res.data)
                );
                _this.is_departmentIsPay().then(function(singlePay) {
                  if (singlePay) {
                    //是单次支付
                    //查询最原始的unfinishedId
                    _this.get_unfinishedId().then(function(data) {
                      //查询是否支付成功
                      _this.getPromise(data).then(function(payFlag) {
                        if (payFlag === 2) {
                          //表示支付过
                          _this.$router.push("/workbench/boneage");
                        } else if (payFlag == 3 || payFlag == 1) {
                          //表示没有支付过
                          //调用支付的弹出二维码支付
                          //打开二维码
                          _this.get_saasClientPay(res.data);
                          //1.方法实现弹出二维码。
                          //2.启用是否支付监听
                          //2.支付成功后跳转
                          //没支付关闭弹窗，走带诊断逻辑
                        }
                      });
                    });
                  } else {
                    //不是单次支付
                    sessionStorage.setItem("issaveunfinish", 1);
                    _this.$router.push("/workbench/boneage");
                    sessionStorage.setItem("navAxtiveIndex", -1);
                    _this.$store.commit("SET_ACTIVEINDEX", -1);
                    sessionStorage.setItem("successIndexChild", "0");
                    sessionStorage.setItem("navIndexChild", 1);
                  }
                });
              }
            })
            .catch(error => {
              if (error.code == 1000) {
                this.$message({
                  message: error.msg,
                  type: "error"
                });
              }
            });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(() => {
          return;
        });
    },
    //隐藏随诊弹出框
    hideDialog() {
      this.showDialog = false;
    },
    //生成二维码,obj->0:其他；1:随诊
    getQR(obj) {
      let param = {
        childId: this.childId,
        type: obj
      };
      getQR(param).then(res => {
        if (res.data !== null) {
          sessionStorage.setItem(
            "QR",
            obj + "," + res.data.replace(/data:image\/.*;base64,/, "")
          );
        }else{
          sessionStorage.removeItem("QR")
        }
      }).catch(error=>{
sessionStorage.removeItem("QR")
                });
    },
    //初始化数据
    init() {
      sessionStorage.removeItem("customReportSettings");     
      this.initSetting();  
      this.initShowReportInfo();
      // this.changeReport();
      this.checkQr();
      //查看是否有  有运动处方
      // this.getToken()
    },
    //检查是否建立随诊
    checkQr() {
      getRelationships({ childId: this.childId }).then(res => {
        //true 随诊,false 非随诊
        if (res.data) {
          this.getQR(1);
          this.disabled_problem = true;
        } else {
          this.getQR(0);
        }
      });
    },
    //查询系统设置
    async initSetting() {
      //获取系统设置
      let settings = JSON.parse(sessionStorage.getItem("reportsettings"));
      for(var i=0;i<settings.length;i++){
        if(settings[i].isDefault){
          if(settings[i].reportType){
              this.reportType = 1;
              this.reprotName = '通用'
          } else {
              this.reportType = 0;
              this.reprotName = '专业'
          }
        }
        if(settings[i].reportType){
          var zy = settings[i]
        } else {
            var ty = settings[i]
        }
      }
      //专业报告
      this.reportSettings =
          '{"zy":{"rc_report_item":"' +
          zy.rcReportItem +
          '","tw3c_report_item":"' +
          zy.tw3cReportItem +
          '","tw3_report_item":"' +
          zy.tw3ReportItem +
          '"},"ty":{"rc_report_item":"' +
          ty.rcReportItem +
          '","tw3c_report_item":"' +
          ty.tw3cReportItem +
          '","tw3_report_item":"' +
          ty.tw3ReportItem +
          '"}}';

      if (this.rusMethod === "TW3-C RUS") {
          this.reportSet = zy.tw3cReportItem;
      } else if (this.rusMethod === "TW3-RUS" || this.rusMethod === "G-P") {
          this.reportSet = zy.tw3ReportItem;
      } else {
          this.reportSet = zy.rcReportItem;
      }

      sessionStorage.setItem("reportSettings", this.reportSettings);
      this.rusMethod =
        JSON.parse(this.reportInfo).diagnosticRusMethod === undefined ||
        JSON.parse(this.reportInfo).diagnosticRusMethod === null
          ? "RUS-CHN"
          : JSON.parse(this.reportInfo).diagnosticRusMethod;

    },
    //显示系统设置
    showSetting() {
      this.showReportDetailSetHandle = true;
      let tempInfo = JSON.parse(
        sessionStorage.getItem("serverDiagnosticModel")
      );
      if (
        tempInfo.diagnosticRusMethod == null ||
        tempInfo.diagnosticRusMethod == ""
      ) {
        this.$refs.showInfo.setup("RUS-CHN");
      } else {
        this.$refs.showInfo.setup(tempInfo.diagnosticRusMethod);
      }
    },
    //保存复诊时间
    saveFollowupTime() {
      let serverend= sessionStorage.getItem("serverend");
      if(serverend==1){
        this.$message.error("服务已到期，请拨打400-600-8865续费！");
        return;
      }
      if (this.reprotName == "专业") {
        this.$refs.myChildG.setTime(this.value1);
        this.$refs.myChildP.setTime(this.value1);
      } else {
        this.$refs.myChildG.setTime(this.value1);
        this.$refs.myChildP.setTime(this.value1);
      }
      let item = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      if (
        item !== null &&
        item["diagnosticId"] !== null &&
        this.value1 !== null
      ) {
        let param = {
          revisitTime: this.value1,
          diagnosticId: item["diagnosticId"]
        };
        saveFollowupTime(param).then(res => {
          let model = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          );
          model.revisitTime = this.value1;
          sessionStorage.setItem(
            "serverDiagnosticModel",
            JSON.stringify(model)
          );
        });
        eventEnquiry.$emit("updateReviewTime", this.value1);
      }
    },
    //切换报告
    changeReport() {
      this.isActive = true;
       sessionStorage.removeItem("customReportSettings");      
      if (this.showProfessional === true) {
        this.showProfessional = false;
        this.showGeneral = true;
        this.reprotName = "专业";
        this.reportType = 0;
        this.$nextTick(() => {
          eventEnquiry.$emit("reloadGSuggest", "");
        });        
      } else {
        this.showProfessional = true;
        this.showGeneral = false;
        this.reprotName = "通用";
        this.reportType = 1;
        this.$nextTick(() => {
          eventEnquiry.$emit("reloadPSuggest", "");
        });
      }
      sessionStorage.setItem("reportType", this.reportType); 
      //调用通用报告的显示隐藏接口
        if(this.$refs.myChildG){
          this.$refs.myChildG.initChek();
        }   
      this.initShowReportInfo();
      

      if (this.showPicSide == true) {
        this.isActive = true;
      }
      this.showPicSide = false;
      //将问题框弹出
      // this.dialogVisible_problem = !this.dialogVisible_problem;
    },
    //保存报告
    saveReport(conclusion) {
      this.$nextTick(() => {
        let suffix = "Professional";
        if (this.reportType === 0) {
          suffix = "General";
        }

        // let conclusion = document.getElementById("conclusionHtml" + suffix)
        //   .innerHTML;
        let suggest = ""; //document.getElementById("suggestHtml" + suffix).innerHTML;
        let scheme = ""; //document.getElementById("schemeHtml" + suffix).innerHTML;
        let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
        model.resultConclusion = conclusion;
        model.resultSuggest = suggest;
        model.resultProject = scheme;
        sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
        sessionStorage.removeItem("customReportSettings");
        saveReport({
          diagnosticId: this.diagnosticId,
          resultConclusion: conclusion,
          resultSuggest: suggest,
          resultProject: scheme
        }).then(res => {
          this.$message.success("保存成功");
          let model = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          );
          model.resultConclusion = conclusion;
          model.resultSuggest = suggest;
          model.resultProject = scheme;
          sessionStorage.setItem(
            "serverDiagnosticModel",
            JSON.stringify(model)
          );
        });
      });
    },
    //隐藏预览弹出框
    hidePrintDialog() {
      this.showPrintDialog = false;
    },
    //根据设置显示对应的报告内容
    async initShowReportInfo() {
      let reportSet = "";

      let setting = JSON.parse(this.reportSettings);

      if (this.reportType === 1) {
        //专业报告
        if (this.rusMethod === "TW3-C RUS") {
          reportSet = setting.zy.tw3c_report_item;
        } else if (this.rusMethod === "TW3-RUS" || this.rusMethod === "G-P") {
          reportSet = setting.zy.tw3_report_item;
        } else {
          reportSet = setting.zy.rc_report_item;
        }
        sessionStorage.setItem("reportType", "1");
        sessionStorage.setItem("generateReportSettings", reportSet);

        await this.$nextTick(() => {
          console.log(reportSet);
          let items = reportSet.split("|");
          let infos = document.getElementsByName("professionalInfo");
          let imgs = document.getElementsByName("professionalImg");

          //内容
          for (let i = 0; i < infos.length; i++) {
            infos[i].setAttribute("style", "display:none");
            if (items[0].indexOf(infos[i].getAttribute("data")) !== -1) {
              infos[i].setAttribute("style", "display:block");
            }

            if(infos[i].getAttribute("data") == 7){
                if(infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == ''){
                    infos[i].setAttribute("style", "display:none");
                }
            }
            if(infos[i].getAttribute("data") == 8) {
                if (infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                    infos[i].setAttribute("style", "display:none");
                }
            }
            if(infos[i].getAttribute("data") == 9) {
                if (infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                    infos[i].setAttribute("style", "display:none");
                }
            }
          }
          //图片
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].setAttribute("style", "display:none");
            if (items[1] != null && items[1].length > 0) {              
              let list = items[1].split(",");
                        list.forEach(item => {
                            if(item==imgs[i].getAttribute("data")){
                                imgs[i].setAttribute("style", "display:block");
                            }
                        });
            }
          }
        });
      } else {
        //通用报告
        if (this.rusMethod === "TW3-C RUS") {
          reportSet = setting.ty.tw3c_report_item;
        } else if (this.rusMethod === "TW3-RUS" || this.rusMethod === "G-P") {
          reportSet = setting.ty.tw3_report_item;
        } else {
          reportSet = setting.ty.rc_report_item;
        }
        sessionStorage.setItem("reportType", "0");
        sessionStorage.setItem("generateReportSettings", reportSet);
        await this.$nextTick(() => {
          let items = reportSet.split("|");
          let infos = document.getElementsByName("generalInfo");
          let imgs = document.getElementsByName("generalImg");

          //内容
          for (let i = 0; i < infos.length; i++) {
            infos[i].setAttribute("style", "display:none");

            if (items[0].indexOf(infos[i].getAttribute("data")) !== -1) {
              infos[i].setAttribute("style", "display:block");
            }
            if(infos[i].getAttribute("data") == 8 ){
                if(infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == ''){
                    infos[i].setAttribute("style", "display:none");
                }
            }
            if(infos[i].getAttribute("data") == 9 ) {
                if (infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                    infos[i].setAttribute("style", "display:none");
                }
            }
            if(infos[i].getAttribute("data") == 10 ) {
                if (infos[i].children[1].children[1].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                    infos[i].setAttribute("style", "display:none");
                }
            }
          }

          //图片
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].setAttribute("style", "display:none");
            if (items[1] != null && items[1].length > 0) {
              if (items[1].indexOf(imgs[i].getAttribute("data")) !== -1) {
                imgs[i].setAttribute("style", "display:block");
              }
            }
          }
        });
      }

    },
    getImg(obj) {
      getImg(obj).then(res => {
        if (res.data !== "") {
          this.images = res.data;
        }
      });
    },
    getPdf() {
      this.loadingtext = '正在生成pdf...'
      this.loading = this.$loading({
        lock: true,
        text: "正在生成pdf...",
        background: "rgba(255, 255, 255, 0.98)"
      });
      let info = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      let settings = JSON.parse(sessionStorage.getItem("reportsettings"));
      // info["title"] = Lockr.get("loginUserInfo").doctorUserAllVO.hospitalName;
      info["title"] = JSON.parse(
        sessionStorage.getItem("loginUserInfo")
      ).doctorUserAllVO.hospitalName;
      var logozhong = '';
      if(this.$store.getters.logo.indexOf("oss")!=-1){
        var logoattr = this.$store.getters.logo.split("oss")
        logozhong = 'oss' + logoattr[1];
      }
      info["logo"] =
        this.$store.getters.logo.indexOf("logo.jpg") === -1
          ? logozhong
          : "";
      if (settings[0].isShowDepartmentName) {
        // info["deptName"] = Lockr.get("loginUserInfo").doctorUserAllVO.departmentName;
        info["deptName"] = info.diagnosticDepartName;
      }
      if (settings[0].isShowDoctorName) {
        // info["docName"] = Lockr.get("loginUserInfo").doctorUserAllVO.doctorName;
        info["docName"] = info.diagnosticDoctorName;
      }
      info["smartDiagnosticList"] = sessionStorage.getItem(
        "smartDiagnosticList"
      );
      info["qr"] = sessionStorage.getItem("QR");

      let param = {
        type: this.reportType,
        info: JSON.stringify(info),
        item:
          sessionStorage.getItem("customReportSettings") == null
            ? sessionStorage.getItem("generateReportSettings")
            : sessionStorage.getItem("customReportSettings")
      };
      // 导出文件名
      const fileName =
        info["childName"] +
        "-" +
        info["diagnosticDiagnoseTime"].replace("-", "").replace("-", "") + "-" +
        (this.reportType == 0 ? "通用报告" : "专业报告") +
        ".pdf";

      getPdf(param)
        .then(res => {
          const content = res.data;
          const blob = new Blob([content]); // 构造一个blob对象来处理数据
          // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          // IE10以上支持blob但是依然不支持download
          if ("download" in document.createElement("a")) {
            // 支持a标签download的浏览器
            const link = document.createElement("a");
            link.download = fileName; // a标签添加属性
            link.style.display = "none";
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            // 执行下载
            link.click();
            // 释放url
            URL.revokeObjectURL(link.href);
            // 释放标签
            document.body.removeChild(link);
          } else {
            // 其他浏览器
            navigator.msSaveBlob(blob, fileName);
          }
          this.loading.close();
          this.loading = null;
        })
        .catch(error => {
          console.log(error);
          this.loading.close();
          this.loading = null;
        });
    },
    previewPrint: function() {
      this.loadingtext = '正在加载中...'
      this.loading = this.$loading({
        lock: true,
        text: "正在加载中...",
        background: "rgba(255, 255, 255, 0.98)"
      });
      let info = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      let settings = JSON.parse(sessionStorage.getItem("reportsettings"));
      // info["title"] = Lockr.get("loginUserInfo").doctorUserAllVO.hospitalName;
      info["title"] = JSON.parse(
        sessionStorage.getItem("loginUserInfo")
      ).doctorUserAllVO.hospitalName;
      var logozhong = '';
      if(this.$store.getters.logo.indexOf("oss")!=-1){
        var logoattr = this.$store.getters.logo.split("oss")
        logozhong = 'oss' + logoattr[1];
      }
      info["logo"] =
        this.$store.getters.logo.indexOf("logo.jpg") === -1
          ? logozhong
          : "";
      if (settings[0].isShowDepartmentName) {
        // info["deptName"] = Lockr.get("loginUserInfo").doctorUserAllVO.departmentName;
        info["deptName"] = info.diagnosticDepartName;
      }
      if (settings[0].isShowDoctorName) {
        // info["docName"] = Lockr.get("loginUserInfo").doctorUserAllVO.doctorName;
        info["docName"] = info.diagnosticDoctorName;
      }
      info["smartDiagnosticList"] = sessionStorage.getItem(
        "smartDiagnosticList"
      );
      info["qr"] = sessionStorage.getItem("QR");

      let param = {
        type: this.reportType,
        info: JSON.stringify(info),
        item:
          sessionStorage.getItem("customReportSettings") == null
            ? sessionStorage.getItem("generateReportSettings")
            : sessionStorage.getItem("customReportSettings")
      };
      getPdfName(param)
        .then(res => {
          if (res.code == 0) {
            this.pdfOptions.pdfUrl = Pdf.createLoadingTask(window.location.origin+'/'+res.data);
            this.pdfOptions.pdfUrl.promise.then(pdf => {
              this.pdfOptions.numPages = pdf.numPages;
            });
            this.loading.close();
            this.loading = null;
          } else {
            this.$message.error("预览出错，请重新预览！");
            this.loading.close();
            this.loading = null;
          }
        })
        .catch(() => {
          this.$message.error("预览出错，请重新预览！");
          this.loading.close();
          this.loading = null;
        });
    },
    pageLoaded: function(pageNum) {
      if (this.pdfOptions.numPages == pageNum) {
        setTimeout(() => {
          this.$refs.pdfcontent.print();
          this.loading = false;
        }, 1000);
      }
    },
    pdfError: function(err) {
      console.log(err, "pdferr");
    },
    printReport: function() {
      this.previewPrint();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

.kg-report_zoom {
  zoom: 0.7;

  .content {
    height: calc(138vh - 9.375rem) !important;
  }

  .kg-histinfo {
    /* height: calc(91vh - 9.375rem)!important; */
    /* .el-tabs__content{
      height: calc(141vh - 9.375rem)!important;
    } */
  }

  >>>.el-tabs__content {
    height: calc(125vh - 9.375rem) !important;
  }
}

.kg-report {
  position: relative;
  width: 100%;
  height: calc(100vh - 70px - 54px);

  .steps {
    position: relative;
    height: 58px;
    margin-top: -20px;
    line-height: 58px;

    .line {
      height: 1px;
      width: 100%;
      position: absolute;
      border-top: 1px dashed #E7E8EC;
      top: 50%;
    }
  }

  .wrap {
    display: flex;
  }

  .content {
    width: 100%;
    height: calc(100vh - 150px);
    text-align: center;
    background-color: #ffffff;
    border-radius: 8px;
    boxShadow();
    padding-bottom: 80px; /* no */
  }

  .sidebar {
    width: 600px;
    height: 1009px;
    background-color: #FFFFFF;
    position: relative;
    //z-index: 999;
  }

  .foot {
    width: 100%;
    position: absolute;
    bottom: 0px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background-color: #fff;
    margin: 0 auto;

    .kg-block {
      display: inline-block;
      margin: 0 10px;
      font-size: 14px;
      color: $mainColor;

      span {
        display: inline-block;
        border: 1px solid $baseBorderColor;
        height: 35px;
        line-height: 35px;
        padding: 0 5px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
        background-color: #E5F8FA;
      }

      >>> .el-input__inner {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        padding-right:1rem;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }

  .foot2 {
    width: 100%;
    position: absolute;
    bottom: 0px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background-color: #fff;
    margin: 0 auto;

    .kg-block {
      display: inline-block;
      margin: 0 10px;
      font-size: 14px;
      color: $mainColor;

      span {
        display: inline-block;
        border: 1px solid $baseBorderColor;
        height: 35px;
        line-height: 35px;
        padding: 0 5px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: none;
        background-color: #E5F8FA;
      }

      >>> .el-input__inner {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }

      i {
        font-size: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }

  .pdf-img {
    width: 16px;
    vertical-align: initial;
  }
}
.pay-num {
  width: 100%;
  text-align: center;
  margin: 20px 0 0 0;
  font-size: 14px;
  letter-spacing: 1px;

  span {
    color: #f60;
    font-size: 32px;
    font-weight: 700;
  }
}
.kg-pay-ewm {
  display: flex;
  align-items: center;
  text-align: center;
  width: 70%;
  margin: 0 auto;
}
.pay-zfbwx {
  text-align: center;
  flex: 1;
  margin: 30px 1.25rem 50px 1.25rem;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  height: 188px;

  .pay-zfb {
    background: #00bbee;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }

  .pay-wx {
    background: #29cc7b;
    height: 30px;
    line-height: 30px;
    color: #fff;
  }

  .pay-ewm {
    width: 100%;
    position: relative;
  }

  .pay-ewm-i {
    width: 40px;
    position: relative;
    top: -100px;
  }

  .pay-ewm-i2 {
    width: 40px;
    position: relative;
    top: -100px;
  }
}

.pay-sucess {
  text-align: center;
  font-size: 24px;
  margin: 20px 0 0 0;
  width: 100%;
}

.el-icon-success:before {
  color: #00BCCD;
}
// 历史弹框的样式
.boneAge_tp {
  display: flex;
  width: 100%;
}

.boneAge_tp {
  .boneAge_tp_f {
    background: #000;
    flex: 1;
    margin: 5px;
  }

  >>>.el-input--mini .el-input__inner {
    width: 115px; /* no */
    text-align: center;
    margin: 0 5px;
  }
}

.kg_bone_box {
  width: 100%;
  background: #192433;
}

.kg_bone_title {
  width: 100%;
  display: flex;
  background: #192433;
  font-size: 12px;
  position: relative;
  align-items: center;
  z-index: 9;
  padding-left: 10px;
  height: 40px;
}

.kg_bone_title span {
  display: inline;
  color: #fff;
}

.boneAge_ck {
  display: flex;
  // align-items :center;
}

.historic_r_f {
  background: #e0e8f7;
  border-bottom: 0.0625rem solid #dcdfe6;
  line-height: 28px;
  text-align: center;
  margin-bottom: 10px;
}

.historic_r2 {
  background: #F2F6FC;
  padding: 0 2px;
  border: 1px solid #DCDFE6;
  margin: 0 1px;
}

.boneAge_img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.historic_r2 {
  background: #F2F6FC;
  padding: 0 2px;
  border: 1px solid #DCDFE6;
  margin: 0 1px;

  .el-row {
    // margin-bottom: 22px;
    line-height: 28px;
    text-align: center;

    &:last-child {
      margin-bottom: 5;
    }
  }
}

.el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  max-height: calc(100% - 30px);
  max-width: calc(100% - 30px);
}

.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}

.first-panle {
  border: 1px solid #f2f2f2;
  border-radius: 2px;
  margin: 15px 20px;

  >>>.el-input__inner {
    padding-right:1rem;
  }
}

.first-f-p {
  padding: 8px 20px;
  line-height: 25px;
}

.first-f-n {
  margin-right: 10px;
}

.gz-title {
  margin-left: 20px;
}
</style>