<template>
    <el-dialog
            title="添加诊断模板"
            width="45%"
            custom-class="kg-dialog"
            :append-to-body="true"
            :visible.sync="showDialog"
            :before-close="handleClose"
            :close-on-click-modal="false"
            @open="initEditor"
    >
        <el-form ref="formInsert" :model="formInsert" :rules="dialogRules" label-width="100px" class="xg-from-box">
            <div class="add-change">
                <div>

          
                <el-form-item label="话术类型" prop="templeteType">
                   
                        <el-select
                                v-model="formInsert.templeteType"
                                placeholder="请选择"
                                style="width:7.2rem"
                                :disabled="true"
                        >
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
                    
                </el-form-item>
            </div>
            <div>

       
                <el-form-item label="开放类型" prop="publicType" >
                    
                        <el-select
                                v-model="formInsert.publicType"
                                placeholder="开放类型"
                                style="width:6.6rem"
                        >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            ></el-option>
                        </el-select>
               
                </el-form-item>
            </div>
            </div>

            <el-form-item style="margin-bottom: 2px;" label="模板标题" prop="templeteTitle">
                <el-col :span="21">
                    <el-input v-model="formInsert.templeteTitle"   placeholder="模板标题"  maxlength="20"></el-input>
                </el-col>
            </el-form-item>
            <div  class="kg-form-margin" > 
                <el-form-item label="模板内容" prop="templeteNote" >
                    <div>
                        <div  id="showEditerSaveTemplete"  style="text-align: left;margin-top: 20px">
                            <div id="umEditorSaveTemplete" v-model="formInsert.templeteNote" type="text/plain"></div>
                        </div>
                    </div>
                  <div class="el-form-item__error" v-show="mobannone">模板内容不能为空</div>
                </el-form-item>
            </div>

        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save_or_update">保存</el-button>
      </span>
    </el-dialog>
</template>

<script>
    import eventEnquiry from "@/event/eventEnquiry.js";
    export default {
        name: "SaveTemplete",
        props: {
            showSaveTemplete: {
                type: Boolean,
                default: false
            }
        },
        created() {
            eventEnquiry.$off("saveTemplete");
            eventEnquiry.$on("saveTemplete",(val) => {
                this.showDialog = true;
                if(val !== '' || val.length > 0){
                    this.$nextTick(()=>{
                        // document.getElementById("aa").innerHTML = val;
                         setTimeout(()=>{
                            this.editor.setContent(val);
                        },500)
                        this.formInsert.templeteNote=val;
                    });
                }
                this.formInsert.templeteType = this.options1[0].value;
            });
        },
        data() {
            return {
                mobannone:false,
                showDialog:false,
                formInsert: {
                    templeteTitle: "",
                    templeteNote: "",
                },
                dialogRules: {
                    templeteTitle: [
                        { required: true, message: "标题不能为空", trigger: "blur" }
                    ],
                    templeteType: [
                        { required: true, message: "话术类型不能为空", trigger: ["blur",'change'] },
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    publicType: [
                        { required: true, message: "开放类型不能为空", trigger: "change" }
                    ],
                    // templeteNote: [
                    //     { required: true, message: "说明不能为空", trigger: "blur" }
                    // ]
                },
                options: [
                    {
                        value: "0",
                        label: "公开"
                    },
                    {
                        value: "1",
                        label: "私有"
                    }
                ],
                options1: [
                    {
                        value: "0",
                        label: "诊断意见"
                    }
                ],
                //富文本编辑器
                editor:null,
                //富文本编辑器的配置项
                umConfig: {
                  BaseUrl: '', 
                  UEDITOR_HOME_URL: 'static/utf8-jsp/', 
                  initialFrameWidth: '88%', // 宽度
                  initialFrameHeight: 300, // 高度
                  autoHeightEnabled:false,
                  maximumWords: 10,
                  wordCount: true,
                }
            }
        },
        beforeDestroy(){
            UM.delEditor('umEditorSaveTemplete');
        },
        methods:{
            initEditor(){
                setTimeout(()=>{
                    this.formInsert.templeteNote = ''
                    this.formInsert.templeteTitle = ''
                    this.editor = UM.getEditor('umEditorSaveTemplete',this.umConfig); // 初始化UE
                    this.editor.setContent("");
                },500)
            },
            //关闭弹框
            handleClose() {
                this.showDialog = false;
                this.mobannone = false;
                this.formInsert.templeteNote = ''
                this.formInsert.templeteTitle = ''
                this.$refs['formInsert'].resetFields()
            },
            save_or_update() {
              var count = UM.getEditor('umEditorSaveTemplete').getContentTxt().length;
              if(count > 500){
                this.$message.error("模板内容已超出500字");
              }else {
                this.$refs.formInsert.validate(valid => {
                  if (count > 0) {
                    this.mobannone = false
                  } else {
                    this.mobannone = true
                    return false
                  }
                  if (valid) {
                    var formData = {
                      publicType:parseInt(this.formInsert.publicType),
                      hospitalId : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.hospitalId + "",
                      hospitalName : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.hospitalName,
                      departmentId : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.departmentId + "",
                      departmentName : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.departmentName,
                      doctorId : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.doctorId + "",
                      doctorName : JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.doctorName,
                      templeteNote : this.editor.getContent(),
                      templeteTitle : this.formInsert.templeteTitle,
                      id : this.formInsert.id,
                      templeteType : this.formInsert.templeteType || 0
                    }
                    this.$axios
                        .post("/api/api-opration/doctortemplate", formData, {
                          headers: {"Content-Type": "application/json;charset=UTF-8"}
                        }).then(res => {
                          if (res.code == 0) {
                            this.$message({
                              message: "保存成功！",
                              type: "success"
                            });
                            this.handleClose();
                          }
                        })
                        .catch(err => {
                          //this.$message("请联系管理员");
                        });
                  }
                });
              }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~@/assets/styles/varibles.styl';
    .add-change {
        display:flex;
        margin-top:15px;

    }
    >>>.el-textarea .el-input__count {
        opacity :0;
    }
    >>>.el-table__empty-text {
        font-size:32px;
        background-image:url(/images/empty-data.png);
        width:147px;
        height:123px;
        background-size:100%;
        text-indent:-9999px;
    }
    .el-form-item {
        
    }
    .xg-from-box {
        width: 100%;
        padding: 10px;
    }
    .kg-form-margin {
        margin-top:0px;
    }
    .kg-person-center {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-sizing: border-box;
        boxShadow();

        .kg-navbut {
            margin-bottom: 40px;

            a {
                display: inline-block;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
                border: 1px solid #ebeef5;
                padding: 0 20px;

                &:first-child {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-right: none;
                }

                &:last-child {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    border-left: none;
                }

                &:visited {
                    color: $primaryTextColor;
                }

                &:hover {
                    color: #ffffff;
                    border-color: $mainColor;
                    background-color: $mainColor;
                }
            }

            a.active {
                background-color: $mainColor;
                border-color: $mainColor;
                color: #FFFFFF;
            }
        }

        .search {
            position: relative;

            .kg-download {
                top: 0;
                position: absolute;
                left: 805px;
                width: 145px;
            }
        }

        .search .demo-form-inline >>> .el-button {
            width: 110px;
        }

        >>> .t-content .cell {
            width: 276px;
            ellipsis();
        }

        .paginat {
            text-align: right;
            margin-top: 10px;
        }

        >>> .el-table th.is-leaf {
            background-color: $exLightBorderColor;
        }

        >>> .el-table .cell {
            text-align: center;
        }

        .icon {
            display: inline-block;
            width: 24px;/*no*/
            height: 24px;/*no*/
            opacity: 0.6;
            cursor: pointer;
            transition: all 0.3s ease;
            vertical-align: middle;

            &:hover {
                opacity: 1;
            }
        }
    }
</style>