<!-- 专业报告 -->
<template>
    <div class="table" id="table">
        <div class="head">
            <h1>
                {{hospitalName}}
                <br/>生长发育评价报告
            </h1>
            <img class="head-logo" :src="this.$store.getters.logo" v-if="this.$store.getters.logo.indexOf('logo.jpg') === -1"/>
            <p class="info-top">
                <span v-show="isShowDepartmentName">诊断科室：{{serverDiagnosticModel.diagnosticDepartName}}</span>
                <span v-show="isShowDoctorName" style="width: 80%; text-align: right">诊断人：{{serverDiagnosticModel.diagnosticDoctorName}}</span>
            </p>
            <p class="info-dec">
            <ul>
                <li>
                    <span><b>姓名</b> : {{serverDiagnosticModel.childName}}</span>
                </li>
                <li>
                    <span><b>出生日期 </b> : {{serverDiagnosticModel.childBirthday}}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span><b>性别</b> : {{serverDiagnosticModel.childSex==0?"男":"女"}}</span>
                </li>
                <li>
                    <span><b>诊断日期</b> : {{serverDiagnosticModel.diagnosticDiagnoseTime}}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span><b>年龄</b> : {{serverDiagnosticModel.resultAge!=null ? serverDiagnosticModel.resultAge + " 岁":""}}</span>
                </li>
                <li>
                    <span><b>复诊日期</b>: {{serverDiagnosticModel.revisitTime}}</span>
                </li>

            </ul>
            </p>
            <div name="professionalInfo" data="1">
                <p class="info-title">
                    <span>患者基本情况</span>
                </p>
                <p class="info-dec">
                <ul>
                    <li>
                        <span><b>父亲身高</b> : {{serverDiagnosticModel.diagnosticFatherHeight!=null?serverDiagnosticModel.diagnosticFatherHeight +" cm":""}} </span>
                    </li>
                    <li>
                        <span><b>父亲体重 </b> : {{serverDiagnosticModel.diagnosticFatherWeight!=null?serverDiagnosticModel.diagnosticFatherWeight +" kg":""}}</span>
                    </li>
                    <li>
                        <span><b>出生时身长 </b> : {{serverDiagnosticModel.diagnosticBirthHeight!=null?serverDiagnosticModel.diagnosticBirthHeight +" cm":""}}</span>
                    </li>
                    <li>
                        <span><b>孕龄 </b> : {{serverDiagnosticModel.diagnosticFetusWeek!=null?serverDiagnosticModel.diagnosticFetusWeek +" 周":""}}</span>
                    </li>
                    <li>
                        <span><b v-html="serverDiagnosticModel.resultBirthEvaluate!=null?serverDiagnosticModel.resultBirthEvaluate :''"></b></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><b>母亲身高</b> : {{serverDiagnosticModel.diagnosticMotherHeight!=null?serverDiagnosticModel.diagnosticMotherHeight +" cm":""}}</span>
                    </li>
                    <li>
                        <span><b>母亲体重</b> : {{serverDiagnosticModel.diagnosticMotherWeight!=null?serverDiagnosticModel.diagnosticMotherWeight +" kg":""}}</span>
                    </li>
                    <li>
                        <span><b>出生时体重</b> : {{serverDiagnosticModel.diagnosticBirthWeight!=null?serverDiagnosticModel.diagnosticBirthWeight +" kg":""}}</span>
                    </li>
                  <!--  <li>
                      <span><b>开始发身年龄</b> : {{serverDiagnosticModel.diagnosticPubertyAge!=null?serverDiagnosticModel.diagnosticPubertyAge +" 岁":""}}</span>
                    </li>-->
                  <li>
                    <span><b>出生时体重SDS</b> : {{serverDiagnosticModel.resultBirthweightSds}} </span>
                  </li>
                </ul>
                <ul>
                    <li>
                        <span><b>父母身高中值</b> : {{serverDiagnosticModel.resultMiddleHeight!=null?serverDiagnosticModel.resultMiddleHeight +" cm":""}}</span>
                    </li>
                    <li>
                        <span><b>父母身高中值SDS</b> :{{serverDiagnosticModel.resultMiddleheightSds}} </span>
                    </li>
                    <li>
                        <span><b>出生时身长SDS</b> : {{serverDiagnosticModel.resultBirthheightSds}}</span>
                    </li>

                </ul>
                </p>
            </div>
            <div name="professionalInfo" data="3">
                <p class="info-title">
                    <span>当前身高评价</span>
                </p>
                <p class="info-dec">
                <ul>
                    <li>

                        <span><b>身高</b> : <span v-if="serverDiagnosticModel.resultHeightJudge.search('身高极低') != -1 ||
                        serverDiagnosticModel.resultHeightJudge.search('身高过高') != -1 || serverDiagnosticModel.resultHeightJudge.search('身高异常') != -1" style="color:red">
                          {{serverDiagnosticModel.diagnosticHeight!=null?serverDiagnosticModel.diagnosticHeight +" cm":""}}
                        </span>
                        <span v-else>
                             {{serverDiagnosticModel.diagnosticHeight!=null?serverDiagnosticModel.diagnosticHeight +" cm":""}}
                        </span>
                        </span>
                    </li>
                    <li>
                        <span><b>身高生长速度 </b> : <span>{{serverDiagnosticModel.ltdHeightSpeedbyage!=null?serverDiagnosticModel.ltdHeightSpeedbyage +" cm/yr":""}}</span> </span>
                    </li>
                    <li>
                        <span><b>父母身高修正的身高SDS </b> : <span>{{serverDiagnosticModel.resultFmchangeHeightsds}}</span></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><b>身高SDS</b> :
                          <span v-if="serverDiagnosticModel.resultHeightJudge.search('身高极低') != -1 ||
                        serverDiagnosticModel.resultHeightJudge.search('身高过高') != -1 || serverDiagnosticModel.resultHeightJudge.search('身高异常') != -1" style="color:red">
                            {{serverDiagnosticModel.resultHeightSds}}</span>
                          <span v-else>{{serverDiagnosticModel.resultHeightSds}}</span>
                        </span>
                    </li>
                    <li>
                        <span><b>骨龄的身高SDS</b> : <span>{{serverDiagnosticModel.resultHeightBasds}}</span> </span>
                    </li>
                    <li>
                        <span><b>父母身高修正身高百分位 </b> : <span>{{serverDiagnosticModel.resultFmchangeHeightper!=null && serverDiagnosticModel.resultFmchangeHeightper.length>0 ? serverDiagnosticModel.resultFmchangeHeightper +this.changePerUnit(serverDiagnosticModel.resultFmchangeHeightper) :""}}</span></span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><b>身高百分位数</b> :
                           <span v-if="serverDiagnosticModel.resultHeightJudge.search('身高极低') != -1 ||
                        serverDiagnosticModel.resultHeightJudge.search('身高过高') != -1 || serverDiagnosticModel.resultHeightJudge.search('身高异常') != -1" style="color:red">
                             {{serverDiagnosticModel.resultHeightPer!=null && serverDiagnosticModel.resultHeightPer.length>0 ? serverDiagnosticModel.resultHeightPer +this.changePerUnit(serverDiagnosticModel.resultHeightPer):""}}</span>
                          <span v-else>{{serverDiagnosticModel.resultHeightPer!=null && serverDiagnosticModel.resultHeightPer.length>0 ? serverDiagnosticModel.resultHeightPer +this.changePerUnit(serverDiagnosticModel.resultHeightPer):""}}</span>
                        </span>
                    </li>
                    <li>
                        <span><b>骨龄的身高百分位数</b> : <span>{{serverDiagnosticModel.resultHeightBaper!=null && serverDiagnosticModel.resultHeightBaper.length>0 ?serverDiagnosticModel.resultHeightBaper +this.changePerUnit(serverDiagnosticModel.resultHeightBaper):""}}</span> </span>
                    </li>
                    <li>
                        <span><b>骨龄的身高生长速度</b> : <span>{{serverDiagnosticModel.ltdHeightSpeedbybage!=null?serverDiagnosticModel.ltdHeightSpeedbybage +" cm/yr":""}}</span></span>
                    </li>

                </ul>
                </p>
            </div>
            <div name="professionalInfo" data="5">
                <div v-show="serverDiagnosticModel.resultForeastHeight!=null&&serverDiagnosticModel.resultDoctorForeastheight!=null&&serverDiagnosticModel.resultForeastHeight==serverDiagnosticModel.resultDoctorForeastheight">
                    <p class="info-title">
                        <span>预测成年身高 (身高预测方法： {{foreastMethod}})</span>
                    </p>
                    <p class="info-dec">
                    <ul>
                        <li>
                            <span><b>靶身高</b> : <span>{{serverDiagnosticModel.resultTargetHeight!=null?serverDiagnosticModel.resultTargetHeight +" cm":""}}</span></span>
                        </li>
                        <li>
                            <span><b>预测成年身高 </b> :
                              <span v-if="serverDiagnosticModel.resultForeastheightPer.search('小于') != -1" style="color:red">{{serverDiagnosticModel.resultForeastHeight!=null?serverDiagnosticModel.resultForeastHeight +" cm":""}}</span>
                              <span v-else>{{serverDiagnosticModel.resultForeastHeight!=null?serverDiagnosticModel.resultForeastHeight +" cm":""}}</span>
                            </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>靶身高SDS</b> : <span>{{serverDiagnosticModel.resultTargetheightSds}}</span></span>
                        </li>
                        <li>
                            <span><b>预测成年身高减靶身高</b> : <span>{{serverDiagnosticModel.resultDforeastdifftargetHeight!=null?serverDiagnosticModel.resultDforeastdifftargetHeight +" cm":""}}</span> </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>预测成年身高SDS</b> :
                              <span v-if="serverDiagnosticModel.resultForeastheightPer.search('小于') != -1" style="color:red">{{serverDiagnosticModel.resultForeastheightSds}}</span>
                               <span v-else>{{serverDiagnosticModel.resultForeastheightSds}}</span>
                            </span>
                        </li>

                    </ul>
                    </p>
                </div>
                <div v-show="serverDiagnosticModel.resultForeastHeight!=null&&serverDiagnosticModel.resultDoctorForeastheight!=null&&serverDiagnosticModel.resultForeastHeight!=serverDiagnosticModel.resultDoctorForeastheight">
                    <p class="info-title">
                        <span>预测成年身高</span>
                    </p>
                    <p class="info-dec">
                      <ul>
                          <li>
                              <span><b>靶身高</b> : <span>{{serverDiagnosticModel.resultTargetHeight!=null?serverDiagnosticModel.resultTargetHeight +" cm":""}}</span></span>
                          </li>
                          <li>
                              <span><b>预测成年身高 </b> :
                                <span v-if="serverDiagnosticModel.resultForeastheightPer.search('小于') != -1" style="color:red">{{serverDiagnosticModel.resultDoctorForeastheight!=null?serverDiagnosticModel.resultDoctorForeastheight +" cm":""}}</span>
                                <span v-else>{{serverDiagnosticModel.resultDoctorForeastheight!=null?serverDiagnosticModel.resultDoctorForeastheight +" cm":""}}</span>
                              </span>
                          </li>
                      </ul>
                      <ul>
                          <li>
                              <span><b>靶身高SDS</b> : <span>{{serverDiagnosticModel.resultTargetheightSds}}</span></span>
                          </li>
                          <li>
                              <span><b>预测成年身高减靶身高</b> : <span>{{serverDiagnosticModel.resultDforeastdifftargetHeight!=null?serverDiagnosticModel.resultDforeastdifftargetHeight +" cm":""}}</span> </span>
                          </li>
                      </ul>
                      <ul>
                          <li>
                              <span><b>预测成年身高SDS</b> :
                                <span v-if="serverDiagnosticModel.resultForeastheightPer.search('小于') != -1" style="color:red">{{serverDiagnosticModel.resultDforeastheightSds}}</span>
                                <span v-else>{{serverDiagnosticModel.resultDforeastheightSds}}</span>
                              </span>
                          </li>
                      </ul>
                    </p>
                </div>
            </div>
            <div name="professionalInfo" data="4">
                <div v-show="showGLPJ&&serverDiagnosticModel.diagnosticRusMethod=='RUS-CHN'">
                    <p class="info-title">
                        <span>骨龄评价(骨龄评价方法：{{getBonaMehod(serverDiagnosticModel.diagnosticRusMethod)}})</span>
                    </p>
                    <p class="info-dec">
                    <ul>
                        <li>
                            <span><b>骨龄</b> : <span>{{serverDiagnosticModel.diagnosticRusBoneage!=null?serverDiagnosticModel.diagnosticRusBoneage +" 岁":""}} </span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄 </b> : <span>{{serverDiagnosticModel.diagnosticCarpalBoneage!=null?serverDiagnosticModel.diagnosticCarpalBoneage +" 岁":""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄SDS</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalSds}}</span> </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultRusboneagePer!=null && serverDiagnosticModel.resultRusboneagePer.length>0 ?serverDiagnosticModel.resultRusboneagePer +this.changePerUnit(serverDiagnosticModel.resultRusboneagePer):""}}</span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultCarpalboneagePer!=null && serverDiagnosticModel.resultCarpalboneagePer.length>0 ?serverDiagnosticModel.resultCarpalboneagePer +this.changePerUnit(serverDiagnosticModel.resultCarpalboneagePer):""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalPer!=null && serverDiagnosticModel.resultRusdiffcarpalPer.length>0 ?serverDiagnosticModel.resultRusdiffcarpalPer +this.changePerUnit(serverDiagnosticModel.resultRusdiffcarpalPer):""}}</span></span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}骨龄减年龄</b> : <span>{{serverDiagnosticModel.resultRusboneagediffage!=null?serverDiagnosticModel.resultRusboneagediffage +" 岁":""}}</span></span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpal!=null?serverDiagnosticModel.resultRusdiffcarpal +" 岁":""}}</span></span>
                        </li>

                    </ul>
                    </p>
                </div>
                <div v-show="showGLPJ&&serverDiagnosticModel.diagnosticRusMethod=='TW3-C RUS'">
                    <p class="info-title">
                        <span>骨龄评价(骨龄评价方法：{{getBonaMehod(serverDiagnosticModel.diagnosticRusMethod)}})</span>
                    </p>
                    <p class="info-dec">
                    <ul>
                        <li>
                            <span><b>骨龄</b> : <span>{{serverDiagnosticModel.diagnosticRusBoneage!=null?serverDiagnosticModel.diagnosticRusBoneage +" 岁":""}} </span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄 </b> : <span>{{serverDiagnosticModel.diagnosticCarpalBoneage!=null?serverDiagnosticModel.diagnosticCarpalBoneage +" 岁":""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄SDS</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalSds}}</span> </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultRusboneagePer!=null && serverDiagnosticModel.resultRusboneagePer.length>0 ?serverDiagnosticModel.resultRusboneagePer +this.changePerUnit(serverDiagnosticModel.resultRusboneagePer):""}}</span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultCarpalboneagePer!=null && serverDiagnosticModel.resultCarpalboneagePer.length>0 ?serverDiagnosticModel.resultCarpalboneagePer +this.changePerUnit(serverDiagnosticModel.resultCarpalboneagePer):""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalPer!=null && serverDiagnosticModel.resultRusdiffcarpalPer.length>0 ?serverDiagnosticModel.resultRusdiffcarpalPer +this.changePerUnit(serverDiagnosticModel.resultRusdiffcarpalPer):""}}</span></span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}骨龄减年龄</b> : <span>{{serverDiagnosticModel.resultRusboneagediffage!=null?serverDiagnosticModel.resultRusboneagediffage +" 岁":""}}</span></span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpal!=null?serverDiagnosticModel.resultRusdiffcarpal +" 岁":""}}</span></span>
                        </li>

                    </ul>
                    </p>
                </div>
                <div v-show="showGLPJ&&serverDiagnosticModel.diagnosticRusMethod=='TW3-RUS'">
                    <p class="info-title">
                        <span>骨龄评价(骨龄评价方法：{{getBonaMehod(serverDiagnosticModel.diagnosticRusMethod)}})</span>
                    </p>
                    <p class="info-dec">
                    <ul>
                        <li>
                            <span><b>骨龄</b> : <span>{{serverDiagnosticModel.diagnosticRusBoneage!=null?serverDiagnosticModel.diagnosticRusBoneage +" 岁":""}} </span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄 </b> : <span>{{serverDiagnosticModel.diagnosticCarpalBoneage!=null?serverDiagnosticModel.diagnosticCarpalBoneage +" 岁":""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄SDS</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalSds}}</span> </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>骨龄百分位数</b> : <span>{{""}}</span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄百分位数</b> : <span>{{""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄百分位数</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpalPer!=null  && serverDiagnosticModel.resultRusdiffcarpalPer.length>0 ? serverDiagnosticModel.resultRusdiffcarpalPer +this.changePerUnit(serverDiagnosticModel.resultRusdiffcarpalPer):""}}</span></span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}骨龄减年龄</b> : <span>{{serverDiagnosticModel.resultRusboneagediffage!=null?serverDiagnosticModel.resultRusboneagediffage +" 岁":""}}</span></span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄</b> : <span>{{serverDiagnosticModel.resultRusdiffcarpal!=null?serverDiagnosticModel.resultRusdiffcarpal +" 岁":""}}</span></span>
                        </li>

                    </ul>
                    </p>
                </div>
                <div v-show="showGLPJ&&serverDiagnosticModel.diagnosticRusMethod=='G-P'">
                    <p class="info-title">
                        <span>骨龄评价(骨龄评价方法：{{getBonaMehod(serverDiagnosticModel.diagnosticRusMethod)}})</span>
                    </p>
                    <p class="info-dec">
                    <ul>
                        <li>
                            <span><b>骨龄</b> : <span>{{serverDiagnosticModel.diagnosticGpBoneage}} </span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄 </b> : <span>{{""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄SDS</b> : <span>{{""}}</span> </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>骨龄百分位数</b> : <span>{{""}}</span></span>
                        </li>
                        <li>
                            <span><b>腕骨骨龄百分位数</b> : <span>{{""}}</span> </span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄百分位数</b> : <span>{{""}}</span></span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}骨龄减年龄</b> : <span>{{serverDiagnosticModel.resultRusboneagediffage!=null?serverDiagnosticModel.resultRusboneagediffage +" 岁":""}}</span></span>
                        </li>
                        <li>
                            <span><b>{{serverDiagnosticModel.diagnosticRusMethod}}减腕骨骨龄</b> : <span>{{""}}</span></span>
                        </li>

                    </ul>
                    </p>
                </div>
            </div>

            <div name="professionalInfo" data="6">
                <p class="info-title">
                    <span>体重体型评价</span>
                </p>
                <p class="info-dec">
                <ul>
                    <li>
                        <span><b>体重</b> : <span>{{serverDiagnosticModel.diagnosticWeight!=null?serverDiagnosticModel.diagnosticWeight +" kg":""}}</span></span>
                    </li>
                    <li>
                        <span><b>体重指数BMI </b> : <span>{{serverDiagnosticModel.resultBmi!=null?serverDiagnosticModel.resultBmi +" kg/㎡":""}}{{serverDiagnosticModel.resultFatstate!=null?"("+serverDiagnosticModel.resultFatstate+")":""}}</span> </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><b>体重SDS</b> : <span>{{serverDiagnosticModel.resultWeightSds}}</span></span>
                    </li>
                    <li>
                        <span><b>BMI SDS</b> : <span>{{serverDiagnosticModel.resultBmiSds}}</span> </span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span><b>体重百分位数</b> : <span>{{serverDiagnosticModel.resultWeightPer!=null && serverDiagnosticModel.resultWeightPer.length>0 ?serverDiagnosticModel.resultWeightPer +this.changePerUnit(serverDiagnosticModel.resultWeightPer):""}}</span></span>
                    </li>
                    <li>
                        <span><b>BMI 百分位数</b> : <span>{{serverDiagnosticModel.resultBmiPer!=null  && serverDiagnosticModel.resultBmiPer.length>0 ?serverDiagnosticModel.resultBmiPer +this.changePerUnit(serverDiagnosticModel.resultBmiPer):""}}</span></span>
                    </li>
                </ul>
                </p>
            </div>
            <div name="professionalInfo" data="7" id="showConclusionProfessional">
                <p class="info-title" v-show="!showEditerText">
                    <span style="display: inline;">诊断意见</span>
                    <span style="text-align:right;display: inline; flex:1;margin-right: 10px;" v-show="this.reportContent">
                        <el-button type="primary" size="mini" name="chooseTempleteGeneral" @click="historySuggest()">编辑前意见</el-button>
                    </span>
                    <span style="text-align:right;display: inline; flex:1;margin-right: 10px;">
                        <el-button type="primary" size="mini" name="chooseTempleteProfessional"  @click="saveTemplete()">添加模板</el-button>
                    </span>
                    <span style="text-align:right;display: inline; flex:1;">
                        <el-button type="primary" size="mini" name="chooseTempleteProfessional"    @click="chooseTemplete(0)">选择模板</el-button>
                    </span>
                    <span style="text-align:right;display: inline;flex: 1;margin-left: 10px;">
                        <el-button type="primary" size="mini"   name="chooseTempleteGeneral"     @click="saveSuggest()">保存诊断意见</el-button>
                    </span>
                </p>
                <div>
                    <!-- <div id="showEditerProfessional">
                        <vue-html5-editor
                                id="editor"
                                :content="this.isEmpty(serverDiagnosticModel.resultConclusion)  ? '': serverDiagnosticModel.resultConclusion"
                                :height="150" @change="this.getConclusionContext"
                                ref="editor"></vue-html5-editor>
                    </div> -->
                    <div v-show="!showEditerText" style="text-align: left;margin-top: 20px">
                        <div id="umEditorProfessional" type="text/plain"></div>
                    </div>
                    <p class="info-title" v-show="showEditerText">
                        <span style="display: inline;">诊断意见</span>
                    </p>
                    <p id="conclusionHtmlProfessional" v-show="showEditerText" 
                        v-html="this.isEmpty(serverDiagnosticModel.resultConclusion) ? '': serverDiagnosticModel.resultConclusion"></p>
                </div>
            </div>
            <!-- <div name="professionalInfo" data="8"  id="showSuggestProfessional">
                <p class="info-title">
                    <span style="display: inline">建议</span>
                    <span style="text-align:right;display: inline;flex: 1;"><el-button type="primary" size="mini"
                                                                              name="chooseTempleteProfessional"
                                                                              @click="chooseTemplete(1)">选择模板</el-button></span>
                </p>
                <div class>
                    <div id="showEditerProfessional1">
                        <vue-html5-editor
                                :content="this.isEmpty(serverDiagnosticModel.resultSuggest) ? '' : serverDiagnosticModel.resultSuggest"
                                :height="150" @change="this.getSuggestContext"
                                ref="editor"></vue-html5-editor>
                    </div>
                    <p id="suggestHtmlProfessional" v-show="showEditerText"
                       v-html="this.isEmpty(serverDiagnosticModel.resultSuggest)  ? '' : serverDiagnosticModel.resultSuggest"></p>
                </div>
            </div>
            <div name="professionalInfo" data="9" id="showSchemeProfessional">
                <p class="info-title">
                    <span style="display: inline">方案</span>
                    <span style="text-align:right;display: inline; flex: 1;"><el-button type="primary" size="mini"
                                                                              name="chooseTempleteProfessional"
                                                                              @click="chooseTemplete(2)">选择模板</el-button></span>
                </p>
                <div class>
                    <div id="showEditerProfessional2">
                        <vue-html5-editor
                                :content="this.isEmpty(serverDiagnosticModel.resultProject) ? '' : serverDiagnosticModel.resultProject"
                                :height="150"
                                @change="this.getSchemeContext"
                                ref="editor"></vue-html5-editor>
                    </div>
                    <p id="schemeHtmlProfessional" v-show="showEditerText"
                       v-html="serverDiagnosticModel.resultProject !== null ? serverDiagnosticModel.resultProject :''"></p>
                </div>
            </div> -->
        </div>

        <div class="head" name="professionalInfo" data="2">
            <div class="head-s-title">生长发育纵向监测结果报告</div>
            <p class="info-title">
            </p>
            <div class="kg-table">
                <div class="kg-table-title">
                    身高(Height,H) SDS：Z分值； P：百分位数； SA：骨龄； HV：身高增长速度
                </div>
                <div class="kg-table-box">

                    <el-table
                            :data="shen_gao"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="diagnosticHeight"
                                label="H(cm)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultHeightSds"
                                label="HSDS"></el-table-column>
                        <el-table-column
                                prop="resultHeightPer"
                                label="HP"></el-table-column>
                        <el-table-column
                                prop="resultHeightBasds"
                                label="HSDS for SA"></el-table-column>
                        <el-table-column
                                prop="resultHeightBaper"
                                label="HP for SA"></el-table-column>
                        <el-table-column
                                prop="ltdDiffheight"
                                label="△H(cm)"></el-table-column>
                    </el-table>
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="shen_gao_two"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="ltdDiffheightSds"
                                label="△HSDS"
                                width=""></el-table-column>
                        <el-table-column
                                prop="ltdDiffheightPer"
                                label="△HP"></el-table-column>
                        <el-table-column
                                prop="ltdHeightSpeedbyage"
                                label="HV(cm/yr)"></el-table-column>
                        <el-table-column
                                prop="ltdHeightSpeedbybage"
                                label="HV for SA(cm/SA)"></el-table-column>
                    </el-table>
                </div>


            </div>

            <div class="kg-table">
                <div class="kg-table-title">
                    预测的成年身高（Predictive adult height,PAH）
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="yu_shen_gao"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="resultForeastHeight"
                                label="PAH(cm)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultForeastheightSds"
                                label="	PAH SDS"></el-table-column>
                        <!-- <el-table-column
                                prop="resultForeastheightPer"
                                label="HP"></el-table-column> -->
                        <el-table-column
                                prop="resultForeastheightPer"
                                label="PAH P"></el-table-column>
                        <el-table-column
                                prop="ltdDiffforeastheight"
                                label="△PAH(cm)"></el-table-column>
                        <el-table-column
                                prop="ltdDiffforeastheightSds"
                                label="△PAH SDS"></el-table-column>
                        <!-- <el-table-column
                                prop="△PAH SDS"
                                label=""></el-table-column> -->
                    </el-table>
                </div>


            </div>


            <div class="kg-table">
                <div class="kg-table-title">
                    靶身高(Target height,TH)
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="ba_shen_gao"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="resultTargetHeight"
                                label="TH(cm)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultTargetheightSds"
                                label="TH SDS"></el-table-column>
                        <el-table-column
                                prop="resultDforeastdifftargetHeight"
                                label="PAH减TH"></el-table-column>
                    </el-table>
                </div>


            </div>


            <div class="kg-table">
                <div class="kg-table-title">
                    骨龄( Skeletal age,SA ) CA：生活年龄； RUS：RUS-CHN Carpal bone：CB腕骨
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="gu_ling"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="diagnosticRusBoneage"
                                label="RUS(岁)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultRusboneageSds"
                                label="RUS SDS"></el-table-column>
                        <el-table-column
                                prop="resultRusboneagediffage"
                                label="SA减CA(岁)"></el-table-column>
                        <el-table-column
                                prop="diagnosticCarpalBoneage"
                                label="CB(岁)"></el-table-column>
                        <el-table-column
                                prop="resultCarpalboneageSds"
                                label="CB SDS"></el-table-column>
                        <el-table-column
                                prop="resultRusdiffcarpal"
                                label="RUS减CB"></el-table-column>
                    </el-table>
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="gu_ling_two"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="ltdDiffcarepalboneage"
                                label="	△CB(岁)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="ltdDiffRusdiffcarepal"
                                label="△RUS减CB(岁)"></el-table-column>
                        <el-table-column
                                prop="ltdDiffRusdiffcarepalsds"
                                label="△RUS减CB SDS"></el-table-column>
                    </el-table>
                </div>


            </div>


            <div class="kg-table">
                <div class="kg-table-title">
                    体重(Weight,W)
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="ti_zhong"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="diagnosticWeight"
                                label="W(kg)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultWeightSds"
                                label="W SDS"></el-table-column>
                        <el-table-column
                                prop="resultWeightPer"
                                label="W P"></el-table-column>
                    </el-table>
                </div>


            </div>


            <div class="kg-table">
                <div class="kg-table-title">
                    体重指数(Body mass index,BMI)
                </div>
                <div class="kg-table-box">
                    <el-table
                            :data="ti_zhong_zhi_shu"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="resultBmi"
                                label="BMI(kg/㎡)"
                                width=""></el-table-column>
                        <el-table-column
                                prop="resultBmiSds"
                                label="BMI SDS"></el-table-column>
                        <el-table-column
                                prop="resultBmiPer"
                                label="BMI P"></el-table-column>
                        <el-table-column
                                prop="ltdDiffbmi"
                                label="△BMI"></el-table-column>
                    </el-table>
                </div>


            </div>


            <div class="kg-table">
                <div class="kg-table-title">
                    第二性征等级（Puberty stage）
                </div>
                <div class="kg-table-box" v-show="!serverDiagnosticModel.childSex==0">
                    <el-table
                            :data="sheng_zhi_qi_nv"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="diagnosticBreastGrade"
                                label="乳房等级"
                                width=""></el-table-column>
                        <el-table-column
                                prop="diagnosticPubicGrade"
                                label="阴毛等级"></el-table-column>
                        <el-table-column
                                prop="diagnosticMenarcheAge"
                                label="初潮年龄"></el-table-column>
                    </el-table>
                </div>
                <div class="kg-table-box" v-show="serverDiagnosticModel.childSex==0">
                    <el-table
                            :data="sheng_zhi_qi_nan"
                            border stripe
                            style="width: 100%">
                        <el-table-column
                                prop="diagnosticDiagnoseTime"
                                label="诊断日期"
                                width="105px"></el-table-column>
                        <el-table-column
                                prop="diagnosticPenisGrade"
                                label="阴毛等级"
                                width=""></el-table-column>
                        <el-table-column
                                prop="diagnosticPubicGrade"
                                label="生殖器等级"></el-table-column>
                        <el-table-column
                                prop="diagnosticTestisVolume"
                                label="睾丸体积TV"></el-table-column>
                    </el-table>
                </div>


            </div>
        </div>
        <div class="con-chart ">
            <div class="con-part1">
                <div class="panel-body-1">
                    <div class="img-all">
                        <div class="fir-one Box-Model" name="professionalImg" data="1" v-show="shengaoShow">
                            <img :src="this.shengao" id="imgHeight">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="2" v-show="tizhongShow">
                            <img :src="this.tizhong" id="imgWeight">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="3" v-show="bmiShow">
                            <img :src="this.bmi" id="imgBMI">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="4" v-show="bashengaoShow">
                            <img :src="this.bashengao" id="imgHeightByBA">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="5" v-show="batizhongShow">
                            <img :src="this.batizhong" id="imgWeightByBA">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="6" v-show="babmiShow">
                            <img :src="this.babmi" id="imgBMIByBA">
                        </div>
                        <div name="professionalImg" style="width: 100%; float: left;" data="7" v-show="shengaodiffShow">
                            <div class="fir-one Box-Model">
                                <img :src="this.shengao" id="imgHeightByFMHeightMid0">
                            </div>
                            <div class="fir-one Box-Model">
                                <img :src="this.shengaodiff" id="imgHeightByFMHeightMid1">
                            </div>
                        </div>

                        <div class="fir-one Box-Model" name="professionalImg" data="8" v-show="rusShow">
                            <img :src="this.rus" id="imgRUSCHN">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="9" v-show="tw3crusShow">
                            <img :src="this.tw3crus" id="imgTW3CRUS">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="10" v-show="tw3ccShow">
                            <img :src="this.tw3cc" id="imgTW3CCarpal">
                        </div>
                        <div class="fir-one Box-Model" name="professionalImg" data="11" v-show="tw3ccdiffShow">
                            <img :src="this.tw3ccdiff" id="imgTW3CRUSMCarpal">
                        </div>
                    </div>
                </div>
            </div>
        </div>
          
        <ReportTemplete 
            :show-templete="showTemplete"
            @close="showTemplete = false"
            :paginat="paginat"
            @actionHandle="onActionHandle"
            :templeteList="templeteList"
            :templeteType="templeteType"
            :reportType="reportType"
            @changeTempleteHandle="changeTempleteHandle">
        </ReportTemplete>

        <SaveTemplete :show-templete="showSaveTemplete" @close="showSaveTemplete = false"></SaveTemplete>
        <HistorySuggest 
            :show-templete="showHistorySuggest" 
            :templeteType="templeteType" 
            :reportType="reportType" 
            :reportContent="reportContent"
            @close="showHistorySuggest = false" 
            @changeTempleteCaina="changeTempleteCaina"
        ></HistorySuggest>
    </div>
</template>

<script>
    import {getImg, getVerticalReportInfo, getTempleteInfoList} from "@/api/work/report";
    // import Lockr from "lockr";
    import ReportTemplete from "./ReportTemplete.vue";
    import SaveTemplete from "./SaveTemplete.vue";
    import HistorySuggest from "./HistorySuggest.vue";
    import eventEnquiry from "@/event/eventEnquiry.js";
    import { saveReport } from "@/api/work/report";

    export default {
        name: "Professional",
        data() {
            return {
              
                showSaveTemplete:false,
                showHistorySuggest: false,
                isShowDepartmentName: true,
                isShowDoctorName: true,
                // hospitalName: Lockr.get("loginUserInfo").doctorUserAllVO.hospitalName,
                // departmentName: Lockr.get("loginUserInfo").doctorUserAllVO.departmentName,
                // doctorName: Lockr.get("loginUserInfo").doctorUserAllVO.doctorName,
                hospitalName: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.hospitalName,
                departmentName: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.departmentName,
                doctorName: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.doctorName,
                childName: "",
                serverDiagnosticModel: {},
                value1: "",
                showSide: true,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                conclusion: "",
                suggest: "",
                scheme: "",
                conclusionHtml: "",
                suggestHtml: "",
                schemeHtml: "",
                showEditer: true,
                showEditerText: false,
                showGLPJ: false,
                foreastMethod: "",

                shen_gao: [],
                shen_gao_two: [],
                yu_shen_gao: [],
                ba_shen_gao: [],
                gu_ling: [],
                gu_ling_two: [],
                ti_zhong: [],
                ti_zhong_zhi_shu: [],
                sheng_zhi_qi_nan: [],
                sheng_zhi_qi_nv: [],
                tizhong: "",
                shengao: "",
                bmi: "",
                bashengao: "",
                batizhong: "",
                babmi: "",
                shengaodiff: "",
                rus: "",
                tw3cc: "",
                tw3ccdiff: "",
                tw3crus: "",
                yichuan: "",
                shengaopj: "",
                gulingpj: "",
                yuce: "",
                tixingtizhong: "",
                tizhongShow: false,
                shengaoShow: false,
                bmiShow: false,
                bashengaoShow: false,
                batizhongShow: false,
                babmiShow: false,
                shengaodiffShow: false,
                rusShow: false,
                tw3ccShow: false,
                tw3ccdiffShow: false,
                tw3crusShow: false,
                showTemplete: false,
                paginat: {
                    currentPage: 1,
                    // pageSize: Lockr.get("workPageSizes") || 15,
                    pageSize: 10,
                    total: 0
                },
                templeteList: [],
                templeteType: 0,
                reportType: 1,
                editor: null,
                defaultMsg: '', // 富文本默认提示信息
                 // 富文本配置项
                umConfig: {
                  BaseUrl: '', 
                  UEDITOR_HOME_URL: 'static/utf8-jsp/', 
                  initialFrameWidth: '53.75rem', // 宽度
                  initialFrameHeight: 300 // 高度
                }
            };
        },
        props: {
            reportInfo: {
                type: String,
                default: ""
            },
            showProfessionalPrint: {
                type: Boolean,
                default: false
            },
            showWebEditer: {
                type: Number,
                default: 0
            },
            reportContent: {
                type: String,
                default: ""
            }
        },
        created() {
            sessionStorage.setItem("pageindex", 2);
            
            if (this.reportInfo !== '') {
                this.serverDiagnosticModel = JSON.parse(this.reportInfo);
                console.log(this.serverDiagnosticModel)
            } else {
                this.initReportInfo();
            }

            //当修改报告的时候不清空结论建议，其他情况根军设置有选择的清空
            // if(this.$route.query.type !== 1){
            //     let isShowConclusion = JSON.parse(sessionStorage.getItem("reportsettings"))[0].isShowConclusion;
            //     if (this.isEmpty(this.serverDiagnosticModel.resultConclusion) || !isShowConclusion) {
            //         this.serverDiagnosticModel.resultConclusion = ""
            //     }
            //     if (this.isEmpty(this.serverDiagnosticModel.resultSuggest) || !isShowConclusion) {
            //         this.serverDiagnosticModel.resultSuggest = ""
            //     }
            //     if (this.isEmpty(this.serverDiagnosticModel.resultProject) || !isShowConclusion) {
            //         this.serverDiagnosticModel.resultProject = ""
            //     }
            // }

            if (this.isEmpty(this.serverDiagnosticModel.resultConclusion)) {
                this.serverDiagnosticModel.resultConclusion = ""
            }
            if (this.isEmpty(this.serverDiagnosticModel.resultSuggest) ) {
                this.serverDiagnosticModel.resultSuggest = ""
            }
            if (this.isEmpty(this.serverDiagnosticModel.resultProject)) {
                this.serverDiagnosticModel.resultProject = ""
            }
            //是否显示骨龄评价
            if (!this.isEmpty(this.serverDiagnosticModel.diagnosticRusMethod)) {               
                if(this.serverDiagnosticModel.diagnosticRusMethod=="G-P"){
                    if(this.serverDiagnosticModel.diagnosticGpBoneage!=null&&
                   (""+ this.serverDiagnosticModel.diagnosticGpBoneage).length>0){
                        this.showGLPJ = true;
                    }else{
                        this.showGLPJ = false;
                    }
                }else{
                    if(this.serverDiagnosticModel.diagnosticRusBoneage!=null&&(""+this.serverDiagnosticModel.diagnosticRusBoneage).length>0){
                        this.showGLPJ = true;
                    }else{
                        this.showGLPJ = false;
                    }
                    
                }   
            } else {
                    this.showGLPJ = false;          
            }

            //预测身高的方法
            this.changeForeastMethod();
            this.setIsShowDepartAndDoctor();
            eventEnquiry.$off("updateReviewTime");
            eventEnquiry.$on("updateReviewTime", mm => {
                this.serverDiagnosticModel.revisitTime = mm;
            });

            eventEnquiry.$off("reloadPSuggest");
            eventEnquiry.$on("reloadPSuggest", mm=>{
                let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
                this.serverDiagnosticModel.resultConclusion = model.resultConclusion;
                this.editor.setContent(model.resultConclusion);
            });
        },
        mounted() {
            this.getData();
            this.getImg();
            this.initWebEditer();
            // if(!this.showEditerText){
                    this.$nextTick(()=>{
                        this.initEditor()
                    })
                // }
        },
        components: {ReportTemplete,SaveTemplete,HistorySuggest},
        methods: {
            //获取传过来的复诊时间
            setTime(time) {
                this.serverDiagnosticModel.revisitTime = time;
                console.log(this.serverDiagnosticModel.revisitTime);
            },
            initEditor(){
                
                this.editor = UM.getEditor('umEditorProfessional',this.umConfig); // 初始化UE
                setTimeout(()=>{
                    this.editor.setContent(this.serverDiagnosticModel.resultConclusion);
                },500)
            
                // this.editor.addListener("contentChange blur",()=>{ 
                this.editor.addListener("blur",()=>{ 
                    this.getConclusionContext(this.editor.getContent())
                })
            },
            saveSuggest(){
                let serverend= sessionStorage.getItem("serverend");//添加  服务到期，不能修改诊断意见的逻辑
                if(serverend==1){
                this.$message.error("服务已到期，请拨打400-600-8865续费！");
                return;
                }
                eventEnquiry.$emit("saveSuggest", this.editor.getContent());
            },
            saveTemplete(){
                this.showSaveTemplete = true;
                this.$nextTick(() => {
                    eventEnquiry.$emit("saveTemplete",this.editor.getContent());
                });
            },
            //查看历史诊断
            historySuggest(){
                this.showHistorySuggest = true
            },
            getBonaMehod(method) {
                let temp = "";
                switch(method){
                    case "RUS-CHN":
                        temp+="中华-05";
                        break;
                    case "TW3-C RUS":
                        temp+="中华-05";
                        break;
                    case "TW3-RUS":
                        temp+="TW3";
                        break;
                    case "G-P":
                        temp+="G-P";
                        break;
                }
                // if (this.serverDiagnosticModel.diagnosticRusMethod !== null && this.serverDiagnosticModel.diagnosticRusMethod !== "" &&
                //     this.serverDiagnosticModel.diagnosticRusBoneage !== null && this.serverDiagnosticModel.diagnosticRusBoneage !== "") {
                //     temp += "(掌指骨:" + this.serverDiagnosticModel.diagnosticRusMethod;
                //     if (this.serverDiagnosticModel.diagnosticCarpalMethod !== null && this.serverDiagnosticModel.diagnosticCarpalMethod !== "" &&
                //         this.serverDiagnosticModel.diagnosticCarpalBoneage !== null && this.serverDiagnosticModel.diagnosticCarpalBoneage !== "") {
                //         temp += " 腕骨:" + this.serverDiagnosticModel.diagnosticCarpalMethod + ")";
                //     } else {
                //         temp += ")";
                //     }
                // }

               return temp;
            },
            //判断是否是空
            isEmpty(str)
            {
                return (!str || 0 === str.length);
            },
            changePerUnit(perdata) {
                if (perdata.indexOf("小于3") >= 0) {
                    return " rd↓";
                }else if(perdata=='3.0'||perdata=='3'){
                    return " rd";
                }else if(perdata.indexOf("大于") >= 0){
                    return " th↑";
                }
                return " th";
            },
            setIsShowDepartAndDoctor() {
                let reportsettings = JSON.parse(sessionStorage.getItem("reportsettings"));
                this.isShowDepartmentName = reportsettings[0].isShowDepartmentName;
                this.isShowDoctorName = reportsettings[0].isShowDoctorName;
            },
            initWebEditer() {
                try{
                if (this.showWebEditer == 1) {
                    this.showEditerText = true;
                    // document.getElementById("showEditerProfessional").setAttribute("style", "display:none");
                    //document.getElementById("showEditerProfessional1").setAttribute("style", "display:none");
                  //  document.getElementById("showEditerProfessional2").setAttribute("style", "display:none");
                    for (let i = 0; i < document.getElementsByName("chooseTempleteProfessional").length; i++) {
                        document.getElementsByName("chooseTempleteProfessional")[i].setAttribute("style", "display:none");
                    }

                    if(document.getElementById("conclusionHtmlProfessional").innerText.length == 0){
                        document.getElementById("showConclusionProfessional").setAttribute("style", "display:none");
                    }

                   /* if(document.getElementById("suggestHtmlProfessional").innerText.length == 0){
                        document.getElementById("showSuggestProfessional").setAttribute("style", "display:none");
                    }

                    if(document.getElementById("schemeHtmlProfessional").innerText.length == 0){
                        document.getElementById("showSchemeProfessional").setAttribute("style", "display:none");
                    }*/
                }
                }catch(ex){console.log(ex);}
            },
            initReportInfo() {
                this.serverDiagnosticModel = JSON.parse(sessionStorage.getItem("smartDiagnosticHistory"));
                if(this.isShowEditor != 1){
                    this.$nextTick(()=>{
                        this.initEditor()
                    })
                }
            },
            getData() {
                let childId = this.serverDiagnosticModel.childId;

                getVerticalReportInfo(childId).then(res => {
                    if (res.code == 0) {
                        //this.$parent.smartDiagnosticList = res.data;
                        sessionStorage.setItem("smartDiagnosticList",JSON.stringify(res.data));
                        //身高
                        this.shen_gao = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                diagnosticHeight: e.diagnosticHeight,
                                resultHeightSds: e.resultHeightSds,
                                resultHeightPer: e.resultHeightPer,
                                resultHeightBasds: e.resultHeightBasds,
                                resultHeightBaper: e.resultHeightBaper,
                                ltdDiffheight: e.ltdDiffheight
                            };
                            return objData;
                        });
                        //身高-2
                        this.shen_gao_two = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                ltdDiffheightSds: e.ltdDiffheightSds,
                                ltdDiffheightPer: e.ltdDiffheightPer,
                                ltdHeightSpeedbyage: e.ltdHeightSpeedbyage,
                                ltdHeightSpeedbybage: e.ltdHeightSpeedbybage,
                            };
                            return objData;
                        });
                        //预测的成年身高
                        this.yu_shen_gao = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                resultForeastHeight: e.resultForeastHeight,
                                resultForeastheightSds: e.resultForeastheightSds,
                                resultForeastheightPer: e.resultForeastheightPer,
                                ltdDiffforeastheight: e.ltdDiffforeastheight,
                                ltdDiffforeastheightSds: e.ltdDiffforeastheightSds,
                            };
                            return objData;
                        });
                        //靶身高
                        this.ba_shen_gao = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                resultTargetHeight: e.resultTargetHeight,
                                resultTargetheightSds: e.resultTargetheightSds,
                                resultDforeastdifftargetHeight: e.resultDforeastdifftargetHeight,
                            };
                            return objData;
                        });
                        //骨龄2
                        this.gu_ling = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                diagnosticRusBoneage: e.diagnosticRusBoneage,
                                resultRusboneageSds: e.resultRusboneageSds,
                                resultRusboneagediffage: e.resultRusboneagediffage,
                                diagnosticCarpalBoneage: e.diagnosticCarpalBoneage,
                                resultRusdiffcarpal: e.resultRusdiffcarpal,
                                resultCarpalboneageSds:e.resultCarpalboneageSds,
                            };
                            return objData;
                        });
                        //骨龄
                        this.gu_ling_two = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                ltdDiffcarepalboneage: e.ltdDiffcarepalboneage,
                                ltdDiffRusdiffcarepal: e.ltdDiffRusdiffcarepal,
                                ltdDiffRusdiffcarepalsds: e.ltdDiffRusdiffcarepalsds,
                            };
                            return objData;
                        });
                        //体重
                        this.ti_zhong = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                diagnosticWeight: e.diagnosticWeight,
                                resultWeightSds: e.resultWeightSds,
                                resultWeightPer: e.resultWeightPer,
                            };
                            return objData;
                        });
                        //体重指数
                        this.ti_zhong_zhi_shu = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                resultBmi: e.resultBmi,
                                resultBmiSds: e.resultBmiSds,
                                resultBmiPer: e.resultBmiPer,
                                ltdDiffbmi: e.ltdDiffbmi,
                            };
                            return objData;
                        });
                        //第二性征男
                        this.sheng_zhi_qi_nan = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                diagnosticPenisGrade: e.diagnosticPubicGrade,
                                diagnosticPubicGrade: e.diagnosticPenisGrade,
                                diagnosticTestisVolume: e.diagnosticTestisVolume,
                            };
                            return objData;
                        });
                        //第二性征女
                        this.sheng_zhi_qi_nv = res.data.map(e => {
                            var objData = {
                                diagnosticDiagnoseTime: e.diagnosticDiagnoseTime,
                                diagnosticBreastGrade: e.diagnosticBreastGrade,
                                diagnosticPubicGrade: e.diagnosticPubicGrade,
                                diagnosticMenarcheAge: e.diagnosticMenarcheAge,
                            };
                            return objData;
                        })

                    }
                })
                    .catch(err => {
                    });
            },
            changeForeastMethod() {
                //0：中华-05  2：tw3身高预测  3特纳综合征 4 软骨发育不全  5特发性矮身高  6按骨龄的投射 7按年龄的投射
                switch (this.serverDiagnosticModel.diagnosticForeastMethod) {
                    case 0:
                        this.foreastMethod = "中华05身高预测方法";
                        break;
                    case 2:
                        this.foreastMethod = "TW3身高预测方法";
                        break;
                    case 3:
                        this.foreastMethod = "特纳综合征儿童成年身高预测方法";
                        break;
                    case 4:
                        this.foreastMethod = "软骨发育不全成年身高预测方法";
                        break;
                    case 5:
                        this.foreastMethod = "特发性矮身高儿童身高预测方法";
                        break;
                    case 6:
                        this.foreastMethod = "骨龄投射法";
                        break;
                    case 7:
                        this.foreastMethod = "年龄投射法";
                        break;
                }

            },
            getConclusionContext(data) {
                // this.editor.setContent(data)
                //document.getElementById("conclusionHtmlProfessional").innerHTML = data;
                let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
                if(model){
                    model.resultConclusion = data;
                }
                sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
                this.serverDiagnosticModel.resultConclusion = data;
                saveReport({
                    diagnosticId: this.serverDiagnosticModel.diagnosticId,
                    resultConclusion: data,
                    resultSuggest: "",
                    resultProject: ""
                });
            },
            getSuggestContext(data) {
                document.getElementById("suggestHtmlProfessional").innerHTML = data;
            },
            getSchemeContext(data) {
                document.getElementById("schemeHtmlProfessional").innerHTML = data;
            },
            getImg() {
                //加载图片
                let reportSet;
                let item = JSON.parse(sessionStorage.getItem("reportsettings"));
                let setting = item[0].reportType == true ? item[0] : item[1];
                let picList=[];
                let rusMethod =
                    this.serverDiagnosticModel.diagnosticRusMethod == null
                        ? "RUS-CHN"
                        : this.serverDiagnosticModel.diagnosticRusMethod;

                if (rusMethod == "TW3-C RUS") {
                    reportSet = setting.tw3cReportItem;
                    picList = [1, 2, 3, 4, 5, 6, 7,  9, 10, 11];
                } else if (rusMethod == "TW3-RUS" || rusMethod == "G-P") {
                    reportSet = setting.tw3ReportItem;
                    picList = [1, 2, 3];
                } else {
                    reportSet = setting.rcReportItem;
                    picList =  [1, 2, 3, 4, 5, 6, 7,  8, 10];
                }
                for (let i = 0; i < picList.length; i++) {
                    let param = {reportType: 1, type: picList[i], report: this.reportInfo};
                    getImg(param).then(res => {                    
                        if (res.data !== "") {
                            let imgs = res.data;
                            for (let i in imgs) {
                                for (let key in imgs[i]) {
                                    if (key == 1) {
                                        //获取通用报告和专业报告的按年龄分组的身高百分位曲线(全图)
                                        this.shengao = imgs[i][key];
                                    }
                                    if (key == 2) {
                                        //获取通用报告和专业报告的按年龄分组的体重百分位曲线(全图)
                                        this.tizhong = imgs[i][key];
                                    }
                                    if (key == 3) {
                                        //获取通用报告和专业报告的按年龄分组的bmi百分位曲线(全图)
                                        this.bmi = imgs[i][key];
                                    }
                                    if (key == 4) {
                                        //根据骨龄方法获取骨龄身高百分位曲线
                                        this.bashengao = imgs[i][key];
                                    }
                                    if (key == 5) {
                                        //根据骨龄方法获取骨龄体重百分位曲线
                                        this.batizhong = imgs[i][key];
                                    }
                                    if (key == 6) {
                                        //根据骨龄方法获取骨龄BMI百分位曲线
                                        this.babmi = imgs[i][key];
                                    }
                                    if (key == 7) {
                                        //按父母身高中值修正身高百分位
                                        this.shengaodiff = imgs[i][key];
                                    }
                                    if (key == 8) {
                                        //获取rus-chn骨龄百分位曲线图(全图)
                                        this.rus = imgs[i][key];
                                    }
                                    if (key == 9) {
                                        //获取Tw3-c Rus骨龄百分位图片(全图)
                                        this.tw3crus = imgs[i][key];
                                    }
                                    if (key == 10) {
                                        //获取Tw3-c carpal骨龄百分位曲线(全图)
                                        this.tw3cc = imgs[i][key];
                                    }
                                    if (key == 11) {
                                        //获取Tw3-c Rus与腕骨骨龄差值曲线图
                                        this.tw3ccdiff = imgs[i][key];
                                    }
                                    if (key == 12) {
                                        //获取遗传因素评价图
                                        this.yichuan = imgs[i][key];
                                    }
                                    if (key == 13) {
                                        //获取预测身高评价图片
                                        this.yuce = imgs[i][key];
                                    }
                                    if (key == 14) {
                                        //获取身高评价图
                                        this.shengaopj = imgs[i][key];                                        
                                    }
                                    if (key == 15) {
                                        //获取骨龄评价图
                                        this.gulingpj = imgs[i][key];
                                    }
                                    if (key == 16) {
                                        //获取通用报告和专业报告的按年龄分组的bmi百分位曲线(全图)
                                        this.tixingtizhong = imgs[i][key];
                                    }
                                }
                            }
                        }
                        this.hideInfo(reportSet);
                    });
                }
            },
            hideInfo(obj) {
                //根据设置隐藏信息
                let infos = document.getElementsByName("professionalInfo");
                let imgs = document.getElementsByName("professionalImg");

                let items = obj.split("|");
                //内容
                for (let i = 0; i < infos.length; i++) {
                    infos[i].setAttribute("style", "display:none");
                    if (items[0].indexOf(infos[i].getAttribute("data")) !== -1) {
                        infos[i].setAttribute("style", "display:block");
                    }
                    if(this.showWebEditer == 1){
                        if(infos[i].getAttribute("data") == 7){
                            if(infos[i].children[1].children[0].innerHTML.replace(/<\/?.+?>/g,"") == ''){
                                infos[i].setAttribute("style", "display:none");
                            }
                        }
                        if(infos[i].getAttribute("data") == 8) {
                            if (infos[i].children[1].children[0].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                                infos[i].setAttribute("style", "display:none");
                            }
                        }
                        if(infos[i].getAttribute("data") == 9) {
                            if (infos[i].children[1].children[0].innerHTML.replace(/<\/?.+?>/g,"") == '') {
                                infos[i].setAttribute("style", "display:none");
                            }
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
            },
            chooseTemplete(obj) {
                this.showTemplete = true;
                this.templeteType = obj;
                let params = {
                    // hospitalId: Lockr.get("loginUserInfo").doctorUserAllVO.hospitalId,
                    // departmentId: Lockr.get("loginUserInfo").doctorUserAllVO.departmentId,
                    // doctorId: Lockr.get("loginUserInfo").doctorUserAllVO.doctorId,
                    hospitalId: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.hospitalId+"",
                    departmentId: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.departmentId+"",
                    doctorId: JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO.doctorId+"",
                    templateType: obj,
                    page: this.paginat.currentPage,
                    limit: this.paginat.pageSize,
                };
                console.log(params)
                getTempleteInfoList(params).then(res => {
                    this.templeteList = res.data;
                    this.paginat.total = res.count;
                });
            },
            onActionHandle(type, val) {
                let item = val.split(",");
                if (type == "sizeChange") {
                    this.paginat.pageSize = parseInt(item[0]);
                    this.chooseTemplete(parseInt(item[1]));
                } else if (type == "currentChange") {
                    this.paginat.currentPage = parseInt(item[0]);
                    this.chooseTemplete(parseInt(item[1]));
                } else if (type=='delete'){
                    if(parseInt(item[0]) =='-1'|| parseInt(item[0]) == -1){
                        if(this.paginat.currentPage>1){
                            this.paginat.currentPage=this.paginat.currentPage-1
                        }
                    } else {
                        this.paginat.currentPage = this.paginat.currentPage
                    }
                    this.chooseTemplete(parseInt(item[1]));
                }
            },
            changeTempleteHandle(type, val) {
                if (type == 'professionalTempleteConclusion') {
                    this.serverDiagnosticModel.resultConclusion = this.editor.getContent() + "<br/>" + val;
                    let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
                    model.resultConclusion = this.editor.getContent() + "<br/>" + val;;
                    sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
                    setTimeout(()=>{
                        this.editor.setContent(this.editor.getContent()+"<br/>"+val);
                        saveReport({
                            diagnosticId: this.serverDiagnosticModel.diagnosticId,
                            resultConclusion: this.editor.getContent(),
                            resultSuggest: "",
                            resultProject: ""
                        });
                    },200)
                } else if (type == 'professionalTempleteSuggest') {
                    this.serverDiagnosticModel.resultSuggest = val;
                    this.getSuggestContext("<div>" + val + "</div>");
                } else if (type == 'professionalTempleteScheme') {
                    this.serverDiagnosticModel.resultProject = val;
                    this.getSchemeContext("<div>" + val + "</div>");
                }
            },
            changeTempleteCaina(type, val) {
                if (type == 'professionalTempleteConclusion') {
                    this.serverDiagnosticModel.resultConclusion = val;
                    let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
                    model.resultConclusion = val;;
                    sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
                    setTimeout(()=>{
                        this.editor.setContent(val);
                        saveReport({
                            diagnosticId: this.serverDiagnosticModel.diagnosticId,
                            resultConclusion: val,
                            resultSuggest: "",
                            resultProject: ""
                        });
                    },200)
                } else if (type == 'professionalTempleteSuggest') {
                    this.serverDiagnosticModel.resultSuggest = val;
                    this.getSuggestContext("<div>" + val + "</div>");
                } else if (type == 'professionalTempleteScheme') {
                    this.serverDiagnosticModel.resultProject = val;
                    this.getSchemeContext("<div>" + val + "</div>");
                }
            },
        },
        beforeDestroy(){
            UM.delEditor('umEditorProfessional');
        }
    };
</script>

<style lang="stylus" scoped>
    @import '~@/assets/styles/varibles.styl';
    >>> .kg-dialog .el-dialog__header {
        height: 40px;
    }
    >>>.dashboard-font div:nth-child(2) {
        display none;
    }

    >>> .el-table th.is-leaf {
        background-color: $exLightBorderColor;
    }

    .mppa-c {
        width: 100%;
        display: flex;
    }

    .Box-Model img {
        width: 80%;

    }

    .mppa-c-p {
        float: left;
    }

    .mppa-c-p img {
        // width: 80%;
    }

    .mppa-c-i {
        float: left;
        margin-top: 20px;
        text-align: left;
        line-height: 30px;
    }

    .mppa-c-i img {
        width: 29px;
        margin-right: 12px;
    }

    .img-all {
        // display:flex;
    }

    .fir-one {
        float: left;
        width: 50%;
        text-align: center;
    }

    .kg-table-box {
        margin-bottom: 10px;
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

            .table {
                width: 900px;
                /* background-color red */
                margin: 0 auto;
                padding: 20px;
                padding-bottom: 100px;

                .head {
                    position: relative;

                    h1 {
                        font-weight: 600;
                        font-size: 20px;
                        line-height: 1.5;
                        margin-bottom: 20px;
                        margin-top: 20px;
                    }

                    .head-logo {
                        position: absolute;
                        top: 0;
                        left: 10px;
                        max-width: 180px;
                        max-height: 80px;
                    }

                    .head-s-title {
                        margin: 10px;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    .kg-table-title {
                        text-align: left;
                        margin: 10px 0;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    p {
                        font-size: 14px;
                        text-align: left;
                        line-height: 2;
                    }

                    .info-top {
                        border-bottom: 2px solid $secondTextColor;

                        span {
                            display: inline-block;
                            width: 20%;
                        }
                    }

                    .info-title {
                        border-bottom: 1px solid $secondTextColor;
                        margin-bottom: 6px;
                        margin-top: 10px;
                        display: flex;

                        span {
                            // display: inline-block;
                            width: 100%;
                            font-weight: bold;
                            font-size: 16px;
                            letter-spacing: 1px;
                        }

                        button {
                            margin-bottom: 2px;
                        }

                        .info-t-s {
                            font-style: normal;
                            font-size: 12px;
                        }
                    }

                    .info-dec {
                        display: flex;
                        justify-content: space-between;

                        ul {
                            width: 280px;
                        }

                        // span {
                        //   width :210px;
                        // }
                        span b {
            font-weight:normal;
                        display: inline-block;
                        // max-width :200px;
                        text-align: justify;
                        text-align-last: justify;
                    }
                }

                .info-message {
                    display: flex;
                    justify-content: space-between;
                    // align-items: center;
                    text-align: left;

                    .info-m-left {
                        float: left;
                    }

                    .info-m-right {
                        float: right;
                    }

                    ul li {
            height: 30px;
                    border-bottom: 1px dashed #ccc;
                    line-height: 30px;
                }

                .info-m-s {
                    width: 90%;
                    margin-right: 20px;
                }

                .info-m-s2 {
                    width: 90%;
                    margin-left: 20px;

                    .charts-box {
                        width: 100%;
                        height: 150px;
                        background: #ffffff;
                    }
                }
            }
        }
    }

    .sidebar {
        width: 350px;
        height: 1009px;
        background-color: #FFFFFF;
    }

    }

    .foot {
        position: absolute;
        bottom: 20px;
        width: 1200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        bottom: 0;
        left: 50%;
        margin-left: -768px;

        .kg-block {
            display: inline-block;
            margin: 0 10px;
            font-size: 12px;
            color: $mainColor;

            span {
                display: inline-block;
                border: 1px solid $baseBorderColor;
                height: 26px;
                line-height: 26px;
                padding: 0 5px;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border-right: none;
                background-color: $lighterBorderColor;
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

    }
</style>