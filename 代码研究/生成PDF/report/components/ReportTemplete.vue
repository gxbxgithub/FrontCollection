<template>
  <el-dialog
    title="诊断模板"
    :append-to-body="true"
    :visible.sync="showDialog"
    width="45%"
    top="50px"
    custom-class="kg-dialog"
    @close="hiddenView"
  >
    <!-- 表格 -->
    <div class="kg-table">
      <el-table :data="templeteList" border stripe :max-height="tableHeight" width="100%">
        <template slot="empty">
        <div v-show="emptyFlag">
           <img src="@/assets/img/dataNullImg/data.svg" />
          <div class="text-none">抱歉：暂无记录</div>
        </div>
      </template>
        <el-table-column prop="templateTitle" label="模板标题" width="150"></el-table-column>
        <el-table-column prop="publicType" :formatter="getOpenType" label="开放类型" width="100"></el-table-column>
        <el-table-column prop="templateType" label="话术类型" :formatter="getTempleteType" width="100"></el-table-column>
        <el-table-column prop="doctorName" label="创建者" width="100"></el-table-column>
        <el-table-column prop="templateNote"  label="模板内容" >
          <template slot-scope="scope">
            <!-- <p v-html="scope.row.templateNote"></p> -->
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              :content="scope.row.templateNote">
              <div v-html="scope.row.templateNote"></div>
              <div slot="reference" class="cell-withg-more" v-html="scope.row.templateNote"></div> <!--多余导致内容靠右的类-->
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="选择" width="80">
          <template slot-scope="scope">
            <img
              class="icon"
              :src="require('@/assets/img/report.0.svg')"
              @click="templeteViewHandle(scope.row.templateNote)"
            />
          </template>
        </el-table-column>
        <el-table-column label="删除" width="100">
          <template slot-scope="scope">
              <img
                      class="icon"
                      :src="require('@/assets/img/delete.0.svg')"
                      @click="handleDelete(scope.$index, scope.row)"
              />
          </template>
      </el-table-column>
      </el-table>
    </div>
    <div class="paginat" v-show="paginat.total>=0" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginat.currentPage"
        :page-sizes="pageSizes"
        :page-size="paginat.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginat.total"
        background
      ></el-pagination>
    </div>
  </el-dialog>
</template>

<script type="text/javascript">
import { queryReportparams, getVerticalReportInfo } from "@/api/work/report";
import eventEnquiry from "@/event/eventEnquiry.js";
export default {
  name: "ReportListHandle", // 医院报告列表
  props: {
    showTemplete: {
      type: Boolean,
      default: false
    },
    templeteType: {
      type: Number,
      default: false
    },
    templeteList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    paginat: {
      type: Object,
      default: () => {
        return { currentPage: 1, pageSize: 15, total: 0 };
      }
    },
    reportType: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      tableHeight: document.body.clientHeight - 290, // 表的高度
      pageSizes: [10, 20, 30],
      showDialog: false,
      titles: "",
      emptyFlag: false
    };
  },
  watch: {
    showTemplete: {
      handler(val) {
        this.showDialog = val;
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    let self = this;
    window.onresize = function() {
      self.tableHeight = document.body.clientHeight - 290;
    };
    if(this.paginat.total<=0){
      this.emptyFlag = true
    }
  },
  methods: {
    getOpenType(row, column) {
      return row.publicType == true ? "私有" : "公开";
    },
    getTempleteType(row, column) {
      let name = "";
      if (row.templeteType == 0) {
        name = "结论";
      } else if (row.templeteType == 1) {
        name = "建议";
      } else {
        name = "方案";
      }
      this.titles = name + "模板";
      return name;
    },
    getTempleteContent(row, column) {
      let content = row.templateNote;
      if (content.length > 10) {
        content = content.substr(0, 15) + "···";
      }
      return content;
    },
    // 报告内容查看
    reportViewHandle(argId, diagnosticDoctorid) {
      var m = {
        childId: this.childId,
        diagnosticId: argId,
        diagnosticDoctorid: diagnosticDoctorid
      };
      this.$emit("showDetail", m);
      this.$emit("close");
      queryReportparams(argId).then(res => {
        sessionStorage.setItem(
          "smartDiagnosticHistory",
          JSON.stringify(res.data)
        );
        eventEnquiry.$emit("updateSessionReportInfo", "");

        getVerticalReportInfo(res.data.childId).then(res => {
          sessionStorage.setItem(
            "smartDiagnosticListHistory",
            JSON.stringify(res.data)
          );
        });
      });
    },
    //删除诊断模板
    handleDelete(index, row) {
      //获取登录者ID
      let loginId = JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.doctorId;
      //判断是否操作本人数据
      if (loginId != row.doctorId) {
        //操作他人数据提示
        this.$confirm("您不能删除其他诊断人建立的模板", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          showClose: false,
          type: "warning"
        }).then(() => {})
      } else {
        this.$confirm("确定要删除此模板吗？", " ", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false,
          type: "warning",
          center: true
        }).then(() => {
            this.$axios
              .post("/api/api-user-center/doctortemplate/" + row.id, {})
              .then(res => {
                if (res.code == 0) {
                  if(this.templeteList.length===1){
                    this.$emit("actionHandle", "delete", -1 + "," + this.templeteType);
                  } else {
                    this.$emit("actionHandle", "delete", 0 + "," + this.templeteType);
                  }
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                }
              })
              .catch(err => {
                //this.$message("请联系管理员");
              });
          })
          .catch(() => {
            // this.$message({
            //     type: "info",
            //     message: "已取消删除"
            // });
          });
      }
    },
    getRequest() {
      return {
        // crm_contract: crmExamineFlowAuditExamine,
        // crm_receivables: crmExamineFlowAuditExamine,
        // oa_examine: oaExamineFlowAuditExamine
      }[this.examineType];
    },
    handlePassAndReject() {
      this.loading = true;
      var params = {
        id: this.id,
        recordId: this.recordId,
        status: this.status,
        remarks: this.content
      };
      if (this.status == 1 && this.detail.examineType == 2) {
        if (this.handleType != 1) {
          params["nextUserId"] = this.selectUsers[0].userId;
        }
      }
      this.getRequest()(params)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.loading = false;
          this.$message.success("操作成功");
          this.$emit("save", { type: this.status });
          this.hiddenView();
          this.$bus.emit("examine-handle-bus");
          this.$store.dispatch("GetMessageNum");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    hiddenView() {
      this.$emit("close");
    },
    // 每页记录数
    handleSizeChange(val) {
      this.$emit("actionHandle", "sizeChange", val + "," + this.templeteType);
    },
    // 当前页
    handleCurrentChange(val) {
      this.$emit(
        "actionHandle",
        "currentChange",
        val + "," + this.templeteType
      );
    },
    templeteViewHandle(obj) {
      if (this.templeteType == 0) {
        //结论
        if (this.reportType == 0) {
          //通用
          this.$emit("changeTempleteHandle", "generalTempleteConclusion", obj);
        } else if (this.reportType == 1) {
          //专业
          this.$emit(
            "changeTempleteHandle",
            "professionalTempleteConclusion",
            obj
          );
        }
        this.hiddenView();
      } else if (this.templeteType == 1) {
        //建议
        if (this.reportType == 0) {
          //通用
          this.$emit("changeTempleteHandle", "generalTempleteSuggest", obj);
        } else if (this.reportType == 1) {
          //专业
          this.$emit(
            "changeTempleteHandle",
            "professionalTempleteSuggest",
            obj
          );
        }
        this.hiddenView();
      } else if (this.templeteType == 2) {
        //方案
        if (this.reportType == 0) {
          //通用
          this.$emit("changeTempleteHandle", "generalTempleteScheme", obj);
        } else if (this.reportType == 1) {
          //专业
          this.$emit("changeTempleteHandle", "professionalTempleteScheme", obj);
        }
        this.hiddenView();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';

.kg-table {
  >>> .el-table th.is-leaf {
    background-color: $exLightBorderColor;
  }

  >>> .el-table .cell {
    text-align: center;
  }
  .cell-withg-more{
    // width:300px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .icon {
    display: inline-block;
    width: 24px; /* no */
    height: 24px; /* no */
    opacity: 0.6;
    cursor: pointer;
    transition: all 0.3s ease;
    vertical-align: middle;

    &:hover {
      opacity: 1;
    }
  }
  // --------列表无数据时
  >>>.el-table__empty-text { 
    line-height :1.5;
  }
  >>> .el-table th.is-leaf {
    background-color: $exLightBorderColor;
  }

  >>> .el-table .cell {
    text-align: center;
  }

  .icon {
    display: inline-block;
    width: 24px; /* no */
    height: 24px; /* no */
    opacity: 0.6;
    cursor: pointer;
    transition: all 0.3s ease;
    vertical-align: middle;

    &:hover {
      opacity: 1;
    }
  }
  .text-none {
    color: #CEDEF3;
    margin-top:8px;
    margin-bottom:12px;
    font-size:12px;
  }
  >>> .el-button--default {
    color: $mainColor;
    border-color: $mainColor;
    width: 125px;
    height 32px;
    line-height: 0;
  }
}

.paginat {
  text-align: right;
  margin-top: 10px;
}
</style>
