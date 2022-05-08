<template>
    <el-dialog title="此报告之前的诊断意见" width="40%" custom-class="kg-dialog" :append-to-body="true" :visible.sync="showDialog" :before-close="handleClose" :close-on-click-modal="false">
        <div class="zhenduan">
            <div class="zhenduan-body" v-html="reportContent"></div>
        </div>
        <div class="el-dialog__footer">
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">不采纳</el-button>
                <el-button type="primary" @click="save_or_update">采纳</el-button>
            </span>
        </div>
        
    </el-dialog>
</template>

<script type="text/javascript">
export default {
    name: "historySuggest", // 历史诊断信息
    props: {
        showTemplete: {
            type: Boolean,
            default: false
        },
        templeteType: {
            type: Number,
            default: false
        },
        reportType: {
            type: Number,
            default: 0
        },
        reportContent: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            showDialog: false
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
    methods: {
        handleClose() {
            this.$emit("close");
        },
        save_or_update() {
            if (this.templeteType == 0) {
                //结论
                if (this.reportType == 0) {
                    //通用
                    this.$emit("changeTempleteCaina", "generalTempleteConclusion", this.reportContent);
                } else if (this.reportType == 1) {
                    //专业
                    this.$emit("changeTempleteCaina", "professionalTempleteConclusion", this.reportContent);
                }
                this.handleClose();
            } else if (this.templeteType == 1) {
                //建议
                if (this.reportType == 0) {
                    //通用
                    this.$emit("changeTempleteCaina", "generalTempleteSuggest", this.reportContent);
                } else if (this.reportType == 1) {
                    //专业
                    this.$emit("changeTempleteCaina", "professionalTempleteSuggest", this.reportContent);
                }
                this.handleClose();
            } else if (this.templeteType == 2) {
                //方案
                if (this.reportType == 0) {
                    //通用
                    this.$emit("changeTempleteCaina", "generalTempleteScheme", this.reportContent);
                } else if (this.reportType == 1) {
                    //专业
                    this.$emit("changeTempleteCaina", "professionalTempleteScheme", this.reportContent);
                }
                this.handleClose();
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.zhenduan {
    padding: 40px 0;
    font-size: 16px;
    height: 500px;
    box-sizing: border-box;
}
.zhenduan-body{
    padding 0 40px;
    height: 410px;
    overflow-y: scroll;
}
.el-dialog__footer {
    background-color: #f5f5f5 !important;
    padding: 1rem 1.25rem 1rem !important;
}
</style>
