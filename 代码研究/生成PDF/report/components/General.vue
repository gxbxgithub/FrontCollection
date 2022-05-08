<!-- 普通报告 -->
<template>
  <div id="pdfDom" style="margin:0 auto;font-size: 14px;">
    <iframe id="pdfview" v-show="false"></iframe>
    <div class="table general_table" ref="pdfPage">
      <div class="head general_head clearfix" id="general_box">
        <div class="content_list" style="width:100%;height:50px;position:relative"></div>
        <h1 class="content_list general_h1 ft16">
          {{hospitalName}}
          <span class="exportStation"></span>
        </h1>
        <h1 class="content_list general_h1 ft14">
          生长发育评价报告
          <span class="exportStation"></span>
        </h1>
        <div class="content_list">
          <img
            class="general_head_logo"
            v-if="this.$store.getters.logo.indexOf('logo.jpg') === -1"
            :src="this.$store.getters.logo"
          />
          <span class="exportStation"></span>
        </div>
        <div class="content_list general_info_top">
          <span v-if="isShowDepartmentName"  class="isB">
            诊断科室：{{serverDiagnosticModel.diagnosticDepartName}}
            <span class="exportStation"></span>
          </span>
          <span  class="isB" v-if="isShowDoctorName">诊断人：{{serverDiagnosticModel.diagnosticDoctorName}}</span>
        </div>
        <div class="content_list general_info_dec">
          <div class="info_dec_txt" v-if="pageInfo.childName">
            <span>
              <span class="isB">姓名：</span>
              {{pageInfo.childName}}
            </span>
            <span class="exportStation"></span>
          </div>
          <div class="info_dec_txt" v-if="pageInfo.childSex">
            <span>
              <span class="isB">性别：</span>
              {{pageInfo.childSex}}
            </span>
          </div>
          <div class="info_dec_txt" v-if="pageInfo.resultAge">
            <span>
              <span class="isB">年龄：</span>
              {{pageInfo.resultAge}}
            </span>
          </div>
          <div class="info_dec_txt" v-if="pageInfo.childBirthday">
            <span>
              <span class="isB">出生日期：</span>
              {{pageInfo.childBirthday}}
            </span>
          </div>
          <div class="info_dec_txt" v-if="pageInfo.diagnosticDiagnoseTime">
            <span>
              <span class="isB">诊断日期：</span>
              {{pageInfo.diagnosticDiagnoseTime}}
            </span>
          </div>
          <div class="info_dec_txt" v-if="pageInfo.revisitTime">
            <span>
              <span class="isB">复诊日期：</span>
              {{pageInfo.revisitTime}}
            </span>
          </div>
        </div>
        <div class="content_list" v-show="module1[0].type">
          <p
            class="general_info_title"
            v-if="pageInfo.diagnosticBirthHeight||pageInfo.diagnosticFetusWeek||pageInfo.diagnosticBirthWeight||pageInfo.resultBirthEvaluate"
          >
            <span  class="isB">
              出生时情况评价
              <span class="exportStation"></span>
            </span>
            <span class="exportStation"></span>
          </p>
          <div class="general_info_message">
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticBirthHeight">
              <div class="triangle"></div>
              <span class="info_m_left isB">{{pageInfo.diagnosticBirthLebel}}</span>
              <span class="info_m_right">
                {{pageInfo.diagnosticBirthHeight}}
                <span v-if="pageInfo.resultBirthheightPer">/
                  <span :class="{'general_tabColr':pageInfo.resultBirthheightFlag}">
                    <span>
                      <span
                        v-if="pageInfo.resultBirthheightPer=='小于3'"
                      >小于3rd</span>
                      <span
                        v-else-if="pageInfo.resultBirthheightPer=='3'||pageInfo.resultBirthheightPer=='3.0'"
                      >3rd</span>
                      <span v-else>{{pageInfo.resultBirthheightPer}}th</span>
                    </span>
                    <span v-if="pageInfo.resultBirthheightFlag">
                      <span class="general_tabColr_child">异常</span>
                    </span>
                  </span>
                </span>
              </span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticFetusWeek">
              <div class="triangle"></div>
              <span class="info_m_left isB">孕周：</span>
              <span class="info_m_right">{{pageInfo.diagnosticFetusWeek +" 周"}}</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticBirthWeight">
              <div class="triangle"></div>
              <span class="info_m_left isB">{{pageInfo.diagnosticBirthWeightLebel}}</span>
              <span class="info_m_right">
                <span class="info_m_right">
                  {{pageInfo.diagnosticBirthWeight}}
                  <span v-if="pageInfo.resultBirthweightPer">/
                    <span :class="{'general_tabColr':pageInfo.resultBirthweightFlag}">
                      <span>
                        <span
                        v-if="pageInfo.resultBirthweightPer=='小于3'"
                      >小于3rd</span>
                      <span
                        v-else-if="pageInfo.resultBirthweightPer=='3'||pageInfo.resultBirthweightPer=='3.0'"
                      >3rd</span>
                        <span v-else>{{pageInfo.resultBirthweightPer}}th</span>
                      </span>
                      <span v-if="pageInfo.resultBirthweightFlag">
                        <span class="general_tabColr_child">异常</span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="evaluate" style="width: 480px" v-if="pageInfo.resultBirthEvaluate">
              <span class="info_m_left isB font_weight">评价：</span>
              <span class="info_m_right-txt" v-html="pageInfo.resultBirthEvaluate"></span>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[1].type">
          <p
            class="general_info_title"
            v-if="pageInfo.diagnosticFatherHeight||pageInfo.resultTargetHeight||pageInfo.diagnosticMotherHeight||pageInfo.resultSameageHeightBSG"
          >
            <span class="isB">
              遗传因素
              <span class="exportStation"></span>
            </span>
          </p>
          <div class="general_info_message">
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticFatherHeight">
              <div class="triangle"></div>
              <span class="info_m_left isB">父亲身高：</span>
              <span class="info_m_right">{{pageInfo.diagnosticFatherHeight}}cm</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.resultTargetHeight">
              <div class="triangle"></div>
              <span class="info_m_left isB">{{pageInfo.resultTargetHeightLebel}}</span>
              <span class="info_m_right">
                <span class="info_m_right">
                  {{pageInfo.resultTargetHeight}}
                  <span v-if="pageInfo.resultTargetheightPer">/
                    <span :class="{'general_tabColr':pageInfo.resultTargetHeightFlag}">
                      <span>
                        <span
                        v-if="pageInfo.resultTargetheightPer=='小于3'"
                      >小于3rd</span>
                      <span
                        v-else-if="pageInfo.resultTargetheightPer=='3'||pageInfo.resultTargetheightPer=='3.0'"
                      >3rd</span>
                        <span v-else>{{pageInfo.resultTargetheightPer}}th</span>
                      </span>
                      <span v-if="pageInfo.resultTargetHeightFlag">
                        <span class="general_tabColr_child">异常</span>
                      </span>
                    </span>
                  </span>
                </span>
              </span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticMotherHeight">
              <div class="triangle"></div>
              <span class="info_m_left isB">母亲身高：</span>
              <span class="info_m_right">{{pageInfo.diagnosticMotherHeight}}cm</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="typeof pageInfo.resultSameageHeightBSG == 'number'">
              <div class="triangle"></div>
              <span class="info_m_left isB">
                靶身高与全国平均身高<span style="font-size: 12px" v-if="pageInfo.childSex == '男'">(172.7cm)</span>
                <span style="font-size: 12px" v-else>(160.6cm)</span>差值：                
              </span>
              <span class="info_m_right">
                <span
                  class="info_m_right"
                  v-if="pageInfo.resultSameageHeightBSG>0"
                >+{{pageInfo.resultSameageHeightBSG.toFixed(1)}}cm</span>
                <span
                  class="info_m_right"
                  v-else-if="pageInfo.resultSameageHeightBSG==0"
                >{{pageInfo.resultSameageHeightBSG.toFixed(1)}}cm</span>
                <span class="info_m_right general_tabColr2" v-else>
                  {{pageInfo.resultSameageHeightBSG.toFixed(1)}}cm
                  <span
                    class="general_tabColr_child2"
                  ></span>
                </span>
              </span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[2].type">
          <p class="general_info_title">
            <span>
              当前身高评价
              <span class="exportStation"></span>
            </span>
          </p>
          <div class="general_info_message">
            <div class="info_left">
              <div
                class="canvasBox"
                v-if="(this.pageInfo.diagnosticRusBoneage || this.pageInfo.diagnosticRusBoneage ==0) && (this.glpj.value == 'RUS-CHN' || this.glpj.value == 'TW3-C RUS')"
              >
                <canvas id="myCanvas3" class="canvasSize"></canvas>
                <img
                  class="canvasImgSize"
                  :src="canvasImgSrc.mycanvas"
                  width="496"
                  height="260"
                  alt
                />
              </div>
              <div v-else>
                <div class="cut_button_list" v-if="isShowTabBtn">
                  <div
                    @click="tabFn"
                    class="cut_button_item"
                    :class="{'cut_button_active':!isShowTab}"
                  >{{tabTxt}}</div>
                  <div
                    @click="tabFn"
                    class="cut_button_item"
                    :class="{'cut_button_active':isShowTab}"
                  >0 - 18</div>
                </div>
                <div class="canvasBox" v-if="isShowTab">
                  <canvas id="myCanvas" class="canvasSize"></canvas>
                  <img class="canvasImgSize" :src="canvasImgSrc.mycanvas" alt />
                </div>
                <div class="canvasBox" v-if="!isShowTab">
                  <canvas id="myCanvas2" class="canvasSize"></canvas>
                  <img class="canvasImgSize" :src="canvasImgSrc.mycanvas" alt />
                </div>
              </div>
            </div>
            <div class="info_right">
              <ul>
                <li v-if="pageInfo.diagnosticHeight">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">{{pageInfo.diagnosticHeightLebel}}</span>
                  <span class="info_m_right">
                    {{pageInfo.diagnosticHeight}}
                    <span v-if="pageInfo.resultHeightPer">/                      
                      <span :class="{'general_tabColr':pageInfo.diagnosticHeightFlag}">
                        <span>
                          <span v-if="pageInfo.resultHeightPer=='小于3'">小于3rd
                          </span>
                          <span
                            v-else-if="pageInfo.resultHeightPer=='3'||pageInfo.resultHeightPer=='3.0'"
                          >3rd</span>
                          <span v-else>{{pageInfo.resultHeightPer}}th</span>
                        </span>
                        <span v-if="pageInfo.diagnosticHeightFlag">
                          <span class="general_tabColr_child" v-if="pageInfo.resultHeightPer=='小于3'">矮小</span>
                          <span
                            class="general_tabColr_child"
                            v-if="pageInfo.resultHeightPer>=3&&pageInfo.resultHeightPer<=10"
                          >偏矮</span>
                        </span>
                      </span>
                    </span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultHeightBaper">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">骨龄身高百分位：</span>
                  <span class="info_m_right">
                    <span>
                      <span v-if="pageInfo.resultHeightBaper=='小于3'">小于3rd
                      </span>
                      <span
                        v-else-if="pageInfo.resultHeightBaper=='3'||pageInfo.resultHeightBaper=='3.0'"
                      >3rd</span>
                      <span v-else>{{pageInfo.resultHeightBaper}}th</span>
                    </span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.ltdHeightSpeedbyage||pageInfo.ltdHeightSpeedbyage==0">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">身高生长速度：</span>
                  <span class="info_m_right" v-if="pageInfo.ltdHeightSpeedbyage==0">
                    0.0cm/yr<span
                      style="font-size: 12px"
                      v-if="pageInfo.ltdStandardageHeightspeed!=null"
                    >(参考速度：{{pageInfo.ltdStandardageHeightspeed}}cm/yr)</span>
                  </span>
                  <span class="info_m_right" v-else>
                    {{pageInfo.ltdHeightSpeedbyage}}cm/yr<span
                      style="font-size: 12px"
                      v-if="pageInfo.ltdStandardageHeightspeed!=null"
                    >(参考速度：{{pageInfo.ltdStandardageHeightspeed}}cm/yr)</span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.ltdHeightSpeedbybage||pageInfo.ltdHeightSpeedbybage==0">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">骨龄身高生长速度：</span>
                  <span class="info_m_right" v-if="pageInfo.ltdHeightSpeedbybage==0">
                    0.0cm/yr<span
                      style="font-size: 12px"
                      v-if="pageInfo.ltdStandardbaHeightspeed!=null"
                    >(参考速度：{{pageInfo.ltdStandardbaHeightspeed}}cm/yr)</span>
                  </span>
                   <span class="info_m_right" v-else>
                    {{pageInfo.ltdHeightSpeedbybage}}cm/yr<span
                      style="font-size: 12px"
                      v-if="pageInfo.ltdStandardbaHeightspeed!=null"
                    >(参考速度：{{pageInfo.ltdStandardbaHeightspeed}}cm/yr)</span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultSameageHeightCZ&&pageInfo.resultSameageHeight">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">
                    身高与全国同年龄平均身高<span
                      style="font-size: 12px;"
                       v-if="pageInfo.resultSameageHeight!=null"
                    >({{pageInfo.resultSameageHeight}}cm)</span>差值：
                  </span>
                  <span
                    class="info_m_right"
                    v-if="pageInfo.resultSameageHeightCZ>0"
                  >+{{pageInfo.resultSameageHeightCZ.toFixed(1)}}cm</span>
                  <span class="info_m_right general_tabColr2" v-else>
                    {{pageInfo.resultSameageHeightCZ.toFixed(1)}}cm
                    <span
                      class="general_tabColr_child2"
                    ></span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultSamebaHeightCZ&&pageInfo.resultSamebaHeight">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">
                    身高与全国同骨龄平均身高<span
                      style="font-size: 12px;"
                       v-if="pageInfo.resultSamebaHeight!=null"
                    >({{pageInfo.resultSamebaHeight}}cm)</span>差值：
                  </span>
                  <span
                    class="info_m_right"
                    v-if="pageInfo.resultSamebaHeightCZ>0"
                  >+{{pageInfo.resultSamebaHeightCZ.toFixed(1)}}cm</span>
                  <span class="info_m_right general_tabColr2" v-else>
                    {{pageInfo.resultSamebaHeightCZ.toFixed(1)}}cm
                    <span
                      class="general_tabColr_child2"
                    ></span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li
                  v-if="pageInfo.resultHeightJudge"
                  class="lineHsize"
                  style="margin-top: 11px;border: none;padding-left: 0"
                >
                  <span class="info_m_left isB font_weight">评价：</span>
                  <span style v-html="pageInfo.resultHeightJudge"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[3].type">
          <div v-if="isShowBona">
            <p class="general_info_title">
              <span class="isB">
                骨龄评价
                <i class="info_t_s">{{'('+glpj.name+')'}}</i>
                <span class="exportStation"></span>
              </span>
            </p>
            <div class="general_info_message">
              <div class="info_left_txt">
                <ul>
                  <li v-if="glpj.value!='G-P' && (pageInfo.diagnosticRusBoneage||pageInfo.diagnosticRusBoneage==0)">
                    <div class="triangle"></div>
                    <span
                      class="info_m_left isB"
                      v-if="pageInfo.diagnosticRusBoneage||pageInfo.diagnosticRusBoneage==0"
                    >{{glpj.leble1}}{{pageInfo.diagnosticRusBoneageLebel}}</span>
                    <span class="info_m_right">
                      <span class="info_m_right">
                        {{pageInfo.diagnosticRusBoneage}}岁
                        <span v-if="pageInfo.resultRusboneagePer">/
                          <span :class="{'general_tabColr':pageInfo.diagnosticRusBoneageFlag}">
                            <span>
                              <span
                                v-if="pageInfo.resultRusboneagePer=='小于3'"
                                >小于3rd</span>
                              <span
                        v-else-if="pageInfo.resultRusboneagePer=='3'||pageInfo.resultRusboneagePer=='3.0'"
                      >3rd</span>
                              <span v-else>{{pageInfo.resultRusboneagePer}}th</span>
                            </span>
                            <span v-if="pageInfo.diagnosticRusBoneageFlag">
                              <span class="general_tabColr_child">异常</span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <div class="line"><img src="../../../../assets/img/heise.png"></div>
                  </li>
                  <li v-if="glpj.value=='G-P' && pageInfo.diagnosticGpBoneage">
                    <div class="triangle"></div>
                    <span class="info_m_left isB">{{glpj.leble2}}骨龄</span>
                    <span class="info_m_right">{{pageInfo.diagnosticGpBoneage}}</span>
                    <div class="line"><img src="../../../../assets/img/heise.png"></div>
                  </li>
                  <li v-if="pageInfo.ltdRusboneageSpeed||pageInfo.ltdRusboneageSpeed==0">
                    <div class="triangle"></div>
                    <span class="info_m_left isB">骨龄生长速度：</span>
                    <span class="info_m_right">
                      <span v-if="pageInfo.ltdRusboneageSpeed==0">0.0 岁/yr</span>
                      <span v-else>{{pageInfo.ltdRusboneageSpeed}} 岁/yr</span>
                      <span style="font-size: 12px">(参考速度：1岁/yr)</span>
                    </span>
                    <div class="line"><img src="../../../../assets/img/heise.png"></div>
                  </li>
                  <li v-if="glpj.value!='G-P' && (pageInfo.diagnosticCarpalBoneage||pageInfo.diagnosticCarpalBoneage==0)">
                    <div class="triangle"></div>
                    <span
                      class="info_m_left isB"
                    >{{glpj.leble2}}{{pageInfo.diagnosticCarpalBoneageLebel}}</span>
                    <span class="info_m_right">
                      <span>{{pageInfo.diagnosticCarpalBoneage}}</span>
                      <span v-if="pageInfo.resultCarpalboneagePer"> /
                        <span :class="{'general_tabColr':pageInfo.diagnosticCarpalBoneageFlag}">
                          <span>
                            <span
                              v-if="pageInfo.resultCarpalboneagePer=='小于3'"
                            >小于3rd</span>
                            <span
                              v-else-if="pageInfo.resultCarpalboneagePer=='3.0'||pageInfo.resultCarpalboneagePer=='3'"
                            >3rd</span>
                            <span v-else>{{pageInfo.resultCarpalboneagePer}}th</span>
                          </span>
                          <span v-if="pageInfo.diagnosticCarpalBoneageFlag">
                            <span class="general_tabColr_child">异常</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <div class="line"><img src="../../../../assets/img/heise.png"></div>
                  </li>
                  <li v-if="glpj.value!='G-P' && pageInfo.resultRusdiffcarpal">
                    <div class="triangle"></div>
                    <span class="info_m_left isB">{{glpj.leble3}}{{pageInfo.resultRusdiffcarpalLebel}}</span>
                    <span class="info_m_right">
                      <span>{{pageInfo.resultRusdiffcarpal}}</span>
                      <span v-if="pageInfo.resultRusdiffcarpalPer"> /
                        <span :class="{'general_tabColr':pageInfo.resultRusdiffcarpalFlag}">
                          <span>
                            <span
                              v-if="pageInfo.resultRusdiffcarpalPer=='小于3'"
                            >小于3rd</span>
                            <span
                              v-else-if="pageInfo.resultRusdiffcarpalPer=='3.0'|| pageInfo.resultRusdiffcarpalPer=='3'"
                            >3rd</span>
                            <span v-else>{{pageInfo.resultRusdiffcarpalPer}}th</span>
                          </span>
                          <span v-if="pageInfo.resultRusdiffcarpalFlag">
                            <span class="general_tabColr_child">异常</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    <div class="line"><img src="../../../../assets/img/heise.png"></div>
                  </li>
                </ul>
              </div>
              <div class="info_right">
                <div>
                  <div>
                    <div
                      class="gl_title"
                    >{{glpj.leble1}}骨龄与年龄差值 {{pageInfo.resultRusboneagediffage}}岁</div>
                    <div class="gl_line" v-if="glpj.name =='中华-05'">
                      <div
                        class="gl_line_title"
                        v-if="pageInfo.resultRusboneagePer >= 3 || pageInfo.resultRusboneagePer <= 97"
                      >
                        <span
                          class="colorTxtG"
                          v-if="pageInfo.resultRusboneagediffage>-1&&pageInfo.resultRusboneagediffage<1"
                        >{{pageInfo.resultBaState}}</span>
                        <span class="colorTxtY" v-else>{{pageInfo.resultBaState}}</span>
                      </div>
                      <div class="gl_line_box clearfix">
                        <div class="gl_line_item gl_line_color5 br16L">
                          <div
                            class="gl_line_ball colorY"
                            v-if="pageInfo.resultRusboneagediffage<=-1&&pageInfo.resultRusboneagediffage>-3"
                            :style="{left:(Math.abs(pageInfo.resultRusboneagediffage+3)/2*96)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <div
                            class="gl_line_ball colorY"
                            v-else-if="pageInfo.resultRusboneagediffage<=-3"
                            :style="{left:0,marginLeft:0+'px'}"
                          ></div>
                          <span class="gl_line_num" style="right: -5px">-1</span>
                        </div>
                        <div class="gl_line_item gl_line_color1 clearfix">
                          <div style="width: 50%;height: 100%;float: left;">
                            <div
                              class="gl_line_ball colorG"
                              v-if="pageInfo.resultRusboneagediffage<0 && pageInfo.resultRusboneagediffage>-1"
                              :style="{left:(Math.abs(pageInfo.resultRusboneagediffage+1)/2*96)+'%',marginLeft:-8+'px'}"
                            ></div>
                          </div>
                          <div style="width: 50%;height: 100%;float: left;position: relative;">
                            <div
                              class="gl_line_ball colorG"
                              v-if="pageInfo.resultRusboneagediffage>=0&&pageInfo.resultRusboneagediffage<1"
                              :style="{left:((pageInfo.resultRusboneagediffage)*100-4) +'%',marginLeft:-8+'px'}"
                            ></div>
                          </div>
                          <span class="gl_line_num" style="left: 50%;margin-left: -3px">0</span>
                        </div>
                        <div class="gl_line_item gl_line_color5 br16R">
                          <div
                            class="gl_line_ball colorY"
                            v-if="pageInfo.resultRusboneagediffage>=1&&pageInfo.resultRusboneagediffage<3"
                            :style="{left:((pageInfo.resultRusboneagediffage-1)/2*100-3)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <div
                            class="gl_line_ball colorY"
                            v-if="pageInfo.resultRusboneagediffage>=3"
                            :style="{left:100+'%',marginLeft:-22+'px'}"
                          ></div>
                          <span class="gl_line_num" style="left: -5px">1</span>
                        </div>
                      </div>
                    </div>
                    <div class="gl_line" v-else>
                      <div
                        class="gl_line_title"                       
                      >
                        <span
                          class="colorTxtR"
                          v-if="pageInfo.resultRusboneagediffage<=-2||pageInfo.resultRusboneagediffage>=2"
                        >{{pageInfo.resultBaState}}</span>
                        <span
                          class="colorTxtG"
                          v-else-if="pageInfo.resultRusboneagediffage>-1&&pageInfo.resultRusboneagediffage<1"
                        >{{pageInfo.resultBaState}}</span>
                        <span class="colorTxtY" v-else>{{pageInfo.resultBaState}}</span>
                      </div>
                      <div class="gl_line_box clearfix">
                        <div class="gl_line_item gl_line_color6 br16L">
                          <div
                            class="gl_line_ball colorR"
                            v-if="pageInfo.resultRusboneagediffage<=-2 && pageInfo.resultRusboneagediffage>=-3"
                            :style="{left:((pageInfo.resultRusboneagediffage+3)*100-4)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <div
                            class="gl_line_ball colorR"
                            v-if="pageInfo.resultRusboneagediffage<-3"
                            :style="{left:0,marginLeft:0+'px'}"
                          ></div>
                          <span class="gl_line_num" style="right: -5px">-2</span>
                        </div>
                        <div class="gl_line_item gl_line_color5">
                          <div
                            class="gl_line_ball colorY"
                            v-if="pageInfo.resultRusboneagediffage>-2 && pageInfo.resultRusboneagediffage<=-1"
                            :style="{left:((pageInfo.resultRusboneagediffage+2)*100-4)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <span class="gl_line_num" style="right: -5px">-1</span>
                        </div>
                        <div class="gl_line_item gl_line_color1">
                          <div
                            class="gl_line_ball colorG"
                            v-if="pageInfo.resultRusboneagediffage>-1 &&pageInfo.resultRusboneagediffage<=0"
                            :style="{left:(Math.abs(pageInfo.resultRusboneagediffage+1)*100-3.5)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <span class="gl_line_num" style="right: -5px">0</span>
                        </div>
                        <div class="gl_line_item gl_line_color1">
                          <div
                            class="gl_line_ball colorG"
                            v-if="pageInfo.resultRusboneagediffage>0 &&pageInfo.resultRusboneagediffage<1"
                            :style="{left:(Math.abs(pageInfo.resultRusboneagediffage-0)*100-3.5)+'%',marginLeft:-8+'px'}"
                          ></div>
                        </div>
                        <div class="gl_line_item gl_line_color5">
                          <div
                            class="gl_line_ball colorY"
                            v-if="pageInfo.resultRusboneagediffage==1"
                            :style="{left:(Math.abs(pageInfo.resultRusboneagediffage-1)*100-6)+'%',marginLeft:-8+'px'}"                            
                          ></div>
                          <div
                            class="gl_line_ball colorY"
                            v-else-if="pageInfo.resultRusboneagediffage>1 &&pageInfo.resultRusboneagediffage<2"
                            :style="{left:(Math.abs(pageInfo.resultRusboneagediffage-1)*100-4)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <span class="gl_line_num" style="left: -5px">1</span>
                        </div>
                        <div class="gl_line_item gl_line_color6 br16R">
                          <div
                            class="gl_line_ball colorR"
                            v-if="pageInfo.resultRusboneagediffage==2"
                            :style="{left:((pageInfo.resultRusboneagediffage-2)*100-6)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <div
                            class="gl_line_ball colorR"
                            v-else-if="pageInfo.resultRusboneagediffage>2&&pageInfo.resultRusboneagediffage<=3"
                            :style="{left:((pageInfo.resultRusboneagediffage-2)*100-4)+'%',marginLeft:-8+'px'}"
                          ></div>
                          <div
                            class="gl_line_ball colorR"
                            v-else-if="pageInfo.resultRusboneagediffage>3"
                            :style="{left:100+'%',marginLeft:-22+'px'}"
                          ></div>
                          <span class="gl_line_num" style="left: -5px">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="gl_evaluate">
                    <span class="info_m_left isB font_weight">评价：</span>
                    <span style="color: #313131" v-html="pageInfo.resultBaJudge"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[4].type">
          <p
            class="general_info_title"
            v-if="pageInfo.diagnosticBreastGrade||pageInfo.diagnosticMenarcheAge||pageInfo.diagnosticPubicGrade||pageInfo.resultAdolescentStage
                       ||pageInfo.diagnosticPenisGrade||pageInfo.diagnosticTestisVolume||pageInfo.diagnosticPubicGrade||pageInfo.resultAdolescentStage"
          >
            <span class="isB">
              第二性征
              <span class="exportStation"></span>
            </span>
          </p>
          <div class="general_info_message" v-if="pageInfo.childSex=='女'">
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticBreastGrade">
              <div class="triangle"></div>
              <span class="info_m_left isB">乳房等级：</span>
              <span class="info_m_right">{{pageInfo.diagnosticBreastGrade}}级</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticMenarcheAge">
              <div class="triangle"></div>
              <span class="info_m_left isB">初潮年龄：</span>
              <span class="info_m_right">{{pageInfo.diagnosticMenarcheAge}}岁</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticPubicGrade">
              <div class="triangle"></div>
              <span class="info_m_left isB">阴毛等级</span>
              <span class="info_m_right">{{pageInfo.diagnosticPubicGrade}}级</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="evaluate" style="width: 480px" v-if="pageInfo.resultAdolescentStage">
              <span class="info_m_left isB font_weight">评价：</span>
              <span class="info_m_right-txt">
                根据第二性征发育程度，处在{{pageInfo.resultAdolescentStage}}。
              </span>
            </div>
          </div>
          <div class="general_info_message" v-else>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticPenisGrade">
              <div class="triangle"></div>
              <span class="info_m_left isB">外生殖器等级：</span>
              <span class="info_m_right">{{pageInfo.diagnosticPenisGrade}}级</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticTestisVolume">
              <div class="triangle"></div>
              <span class="info_m_left isB">睾丸体积：</span>
              <span class="info_m_right">
                {{pageInfo.diagnosticTestisVolume +" ml "}}
                <span
                  v-if="diagnosticTestisMesureName"
                >{{'('+diagnosticTestisMesureName+')'}}</span>
              </span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="info_m_s_txt_sbd" v-if="pageInfo.diagnosticPubicGrade">
              <div class="triangle"></div>
              <span class="info_m_left isB">阴毛等级：</span>
              <span class="info_m_right">{{pageInfo.diagnosticPubicGrade}}级</span>
              <div class="line"><img src="../../../../assets/img/heise.png"></div>
            </div>
            <div class="evaluate" style="width: 480px" v-if="pageInfo.resultAdolescentStage">
              <span class="info_m_left  isB font_weight">评价：</span>
              <span class="info_m_right-txt">
               根据第二性征发育程度，处在{{pageInfo.resultAdolescentStage}}。
              </span>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[5].type">
          <p class="general_info_title">
            <span class="isB">
              预测成年身高
              <i
                class="info_t_s"
                v-if="serverDiagnosticModel.resultForeastHeight == serverDiagnosticModel.resultDoctorForeastheight"
              >{{yc}}</i>
              <span class="exportStation"></span>
            </span>
          </p>
          <div class="general_info_message">
            <div class="info_left" style="max-height: 223px;">
              <div class="heightChartTitle">
                <div class="titleLeft">
                  <div class="titleBlock"><img src="../../../../assets/img/chengse-s.png"></div>
                  靶身高{{pageInfo.resultTargetHeight}}
                  <span
                    style="margin-left:-4px"
                    v-if="pageInfo.resultTargetheightPer=='小于3'"
                  >(小于3rd)</span>
                  <span
                    style="margin-left:-4px"
                    v-else-if="pageInfo.resultTargetheightPer=='3'||pageInfo.resultTargetheightPer=='3.0'"
                  >(3rd)</span>
                  <span style="margin-left:-4px" v-else>({{pageInfo.resultTargetheightPer}}th)</span>
                </div>
                <div class="titleReft">
                  <div class="titleLine"><img src="../../../../assets/img/lvse.png"></div>
                  全国平均身高
                  <span  v-if="pageInfo.childSex == '男'">172.7cm(50th)</span>
                <span  v-else>160.6cm(50th)</span>
                </div>
              </div>
              <canvas id="myCharts" width="488" height="150"></canvas>
            </div>
            <div class="info_right">
              <ul>
                <li v-if="pageInfo.resultDoctorForeastheight">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">{{pageInfo.resultDoctorForeastheightLebel}}</span>
                  <span class="info_m_right">
                    {{pageInfo.resultDoctorForeastheight}}
                    <span v-if="pageInfo.resultDforeastheightPer">/
                      <span>
                        <span
                          v-if="pageInfo.resultDforeastheightPer=='小于3'"
                        >小于3rd</span>
                        <span
                          v-else-if="pageInfo.resultDforeastheightPer=='3'||pageInfo.resultDforeastheightPer=='3.0'"
                        >3rd</span>
                        <span v-else>{{pageInfo.resultDforeastheightPer}}th</span>
                      </span>
                    </span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultDoctorForeastheightCZ">
                  <div class="triangle"></div>
                  <span class='isB'>预测身高与靶身高差值：</span>
                  <span
                    class="info_m_right"
                    v-if="pageInfo.resultDoctorForeastheightCZ>0"
                  >+{{pageInfo.resultDoctorForeastheightCZ.toFixed(1)}}cm</span>
                  <span class="info_m_right general_tabColr3" v-else-if="pageInfo.resultDoctorForeastheightCZ<=-6.5">
                    {{pageInfo.resultDoctorForeastheightCZ.toFixed(1)}}cm
                    <span class="general_tabColr_child3_1">异常</span>
                  </span>
                  <span class="info_m_right general_tabColr2" v-else-if="pageInfo.resultDoctorForeastheightCZ<0&&pageInfo.resultDoctorForeastheightCZ>-6.5">
                    {{pageInfo.resultDoctorForeastheightCZ.toFixed(1)}}cm
                    <span
                      class="general_tabColr_child2"
                    ></span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.yccnsgCZ">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">
                    预测身高与全国平均身高<span
                      style="font-size: 12px"
                      v-if="pageInfo.childSex == '男'"
                    >(172.7cm)</span><span style="font-size: 12px" v-else>(160.6cm)</span>差值：                    
                  </span>
                  <span
                    class="info_m_right"
                    v-if="pageInfo.yccnsgCZ>0"
                  >+{{pageInfo.yccnsgCZ.toFixed(1)}}cm</span>
                  <span
                    class="info_m_right general_tabColr2"
                    v-else
                  >
                    {{pageInfo.yccnsgCZ.toFixed(1)}}cm
                    <span class="general_tabColr_child2"></span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
              </ul>
              <p style="color: #666666;margin-top: 15px">
                <i class="el-icon-warning"></i> 预测成年身高会随着生长发育发生变化
              </p>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[6].type">
          <p class="general_info_title">
            <span class='isB'>
              体重体型评价
              <span class="exportStation"></span>
            </span>
          </p>
          <div class="general_info_message">
            <div class="info_left_txt">
              <ul>
                <li v-if="pageInfo.diagnosticWeight">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">{{pageInfo.diagnosticWeightLebel}}</span>
                  <span class="info_m_right">
                    {{pageInfo.diagnosticWeight}}
                    <span v-if="pageInfo.resultWeightPer">/
                      <span v-if="pageInfo.resultWeightPer=='小于3'">小于3rd</span>
                      <span
                        v-else-if="pageInfo.resultWeightPer=='3'|| pageInfo.resultWeightPer=='3.0'"
                      >3rd</span>
                      <span v-else>{{pageInfo.resultWeightPer}}th</span>
                    </span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.ltdWeightSpeedbyage||pageInfo.ltdWeightSpeedbyage==0">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">体重增长速度：</span>
                  <span class="info_m_right" v-if="pageInfo.ltdWeightSpeedbyage==0">0.0kg/yr</span>
                   <span class="info_m_right" v-else>{{pageInfo.ltdWeightSpeedbyage}}kg/yr</span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultBmi">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">体重指数(BMI)：</span>
                  <span class="info_m_right">
                    {{pageInfo.resultBmi}}
                    <span>kg/㎡</span>
                  </span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
                <li v-if="pageInfo.resultFatstate">
                  <div class="triangle"></div>
                  <span class="info_m_left isB">体型：</span>
                  <span class="info_m_right">{{pageInfo.resultFatstate}}</span>
                  <div class="line"><img src="../../../../assets/img/heise.png"></div>
                </li>
              </ul>
            </div>
            <div class="info_right" style="padding-top: 5px">
              <div class="gl_line">
                <div style="height: 16px"></div>
                <div class="gl_line_box clearfix">
                  <div class="gl_line_item gl_line_color1 br16L">
                    <div
                      class="gl_line_ball_ku"
                      v-if="pageInfo.resultFatstate == '严重体瘦'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 9px;font-size: 14px">严重体瘦</span>
                    <span
                      class="gl_line_num"
                      style="right: -15px;font-size: 14px"
                      v-if="pageInfo.resultBmiRange"
                    >{{pageInfo.resultBmiRange[0]}}</span>
                  </div>
                  <div class="gl_line_item gl_line_color2">
                    <div
                      class="gl_line_ball_ku"
                      v-if="pageInfo.resultFatstate == '中度体瘦'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 9px;font-size: 14px">中度体瘦</span>
                    <span
                      class="gl_line_num"
                      style="right: -15px;font-size: 14px"
                      v-if="pageInfo.resultBmiRange"
                    >{{pageInfo.resultBmiRange[1]}}</span>
                  </div>
                  <div class="gl_line_item gl_line_color3">
                    <div
                      class="gl_line_ball_ku"
                      v-if="pageInfo.resultFatstate == '轻度体瘦'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 9px;font-size: 14px">轻度体瘦</span>
                    <span
                      class="gl_line_num"
                      style="right: -15px;font-size: 14px"
                      v-if="pageInfo.resultBmiRange"
                    >{{pageInfo.resultBmiRange[2]}}</span>
                  </div>
                  <div class="gl_line_item gl_line_color4">
                    <div
                      class="gl_line_ball_xiao"
                      v-if="pageInfo.resultFatstate == '正常'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 24px;font-size: 14px">正常</span>
                    <span
                      class="gl_line_num"
                      style="right: -15px;font-size: 14px"
                      v-if="pageInfo.resultBmiRange"
                    >{{pageInfo.resultBmiRange[3]}}</span>
                  </div>
                  <div class="gl_line_item gl_line_color5">
                    <div
                      class="gl_line_ball_ku"
                      v-if="pageInfo.resultFatstate == '超重'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 24px;font-size: 14px">超重</span>
                    <span
                      class="gl_line_num"
                      style="right: -15px;font-size: 14px"
                      v-if="pageInfo.resultBmiRange"
                    >{{pageInfo.resultBmiRange[4]}}</span>
                  </div>
                  <div class="gl_line_item gl_line_color6 br16R">
                    <div
                      class="gl_line_ball_ku"
                      v-if="pageInfo.resultFatstate == '肥胖'"
                      :style="{left:50+'%',marginLeft:-8+'px'}"
                    ></div>
                    <span class="gl_line_num1" style="right: 24px;font-size: 14px">肥胖</span>
                  </div>
                </div>
              </div>
              <div class="gl_evaluate" style="line-height: 20px" v-if="pageInfo.resultWeightJudge">
                <span class="info_m_left  isB font_weight">评价：</span>
                <span style="color: #313131;" v-html="pageInfo.resultWeightJudge"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="content_list" v-show="module1[7].type" id="showConclusionGeneral">
          <p class="general_info_title clearfix">
            <span>
              诊断意见
              <span class="exportStation"></span>
            </span>
            <span style=" position: absolute; right:0 ; margin-top:-10px;" v-show="this.isShowEditor != 1">
              <el-button
                type="primary"
                size="mini"
                name="chooseTempleteGeneral"
                @click="saveSuggest()"
              >保存诊断意见</el-button>
            </span>
            <span style="margin:0 12px; position: absolute; right:100px; margin-top:-10px; " v-show="this.isShowEditor != 1">
              <el-button
                type="primary"
                size="mini"
                name="chooseTempleteGeneral"
                @click="chooseTemplete(0)"
              >选择模板</el-button>
            </span>
            <span style=" position: absolute; margin-top:-10px; right:200px;" v-show="this.isShowEditor != 1">
              <el-button
                type="primary"
                size="mini"
                name="chooseTempleteGeneral"
                @click="saveTemplete()"
              >添加模板</el-button>
            </span>
            <span style=" position: absolute; margin-top:-10px; right:288px;" v-show="this.isShowEditor != 1&& this.reportContent">
              <el-button
                type="primary"
                size="mini"
                name="chooseTempleteGeneral"
                @click="historySuggest()"
              >编辑前意见</el-button>
            </span>
          </p>
          <div>
            <div
              id="showEditerGeneral"
              v-show="this.isShowEditor != 1"
              style="text-align: left;margin-top: 20px"
            >
              <div id="umEditor" type="text/plain"></div>
            </div>
            <p
              id="conclusionHtmlGeneral"
              v-show="this.isShowEditor == 1"
              style="text-align: left;margin-top: 10px;line-height:1.5;word-break:break-all;"
              v-html="this.isEmpty(serverDiagnosticModel.resultConclusion) ? '' : serverDiagnosticModel.resultConclusion"
            ></p>
 
          </div>
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[0].type">
          <canvas id="shengao" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.shengao" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[1].type">
          <canvas id="tizhong" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.tizhong" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[2].type">
          <canvas id="BMI" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.BMI" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[3].type">
          <canvas id="gulingH" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingH" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[4].type">
          <canvas id="gulingW" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingW" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[5].type">
          <canvas id="gulingBMI" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.gulingBMI" alt />
        </div>
        <div style="display:inline-block;" class="content_list">
        <div  class="general_box canvasBox" v-show="module2[6].type">
          <canvas id="amend_shengao" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.shengao" alt />
        </div>
        <div class="general_box canvasBox" v-show="module2[6].type">
          <canvas id="amend" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.amend" alt />
        </div>
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[7].type">
          <canvas id="RUSCHN" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.RUSCHN" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[8].type">
          <canvas id="TW3_C_RUS" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3_C_RUS" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[9].type">
          <canvas id="TW3CCarpal" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3CCarpal" alt />
        </div>
        <div class="content_list general_box canvasBox" v-show="module2[10].type">
          <canvas id="TW3_C_RUS_wg" class="canvasSize">
            <span class="exportStation"></span>
          </canvas>
          <img class="canvasImgSize" :src="canvasImgSrc.TW3_C_RUS_wg" alt />
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
        @changeTempleteHandle="changeTempleteHandle"
      ></ReportTemplete>
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
  </div>
</template>
 
<script>
// import Lockr from "lockr";
import { getTempleteInfoList } from "@/api/work/report";
import ReportTemplete from "./ReportTemplete.vue";
import SaveTemplete from "./SaveTemplete.vue";
import HistorySuggest from "./HistorySuggest.vue";
import eventEnquiry from "@/event/eventEnquiry.js";
import Pdf from "vue-pdf";
import { drawFMPoint,drawPoint, $createPdf, foundPen } from "../../../../../public/static/js/tool.js";
import { imgInfo } from "../../../../../public/static/js/chratBackgroundImg.js";
import { saveReport } from "@/api/work/report";
// import umDitor from '@/components/um'
export default {
  name: "General",
  data() {
    return {
      pdfOptions: {
        numPages: 0,
        pdfUrl: null
      },
      loading: null,
      isShowSinglePagePdf: false,
      showSaveTemplete: false,
      showHistorySuggest: false,
      isShowDepartmentName: true,
      isShowDoctorName: true,
      diagnosticTestisMesureName: "",
      // hospitalName: Lockr.get("loginUserInfo").doctorUserAllVO.hospitalName,
      // departmentName: Lockr.get("loginUserInfo").doctorUserAllVO.departmentName,
      // doctorName: Lockr.get("loginUserInfo").doctorUserAllVO.doctorName,
      hospitalName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
        .doctorUserAllVO.hospitalName,
      departmentName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
        .doctorUserAllVO.departmentName,
      doctorName: JSON.parse(sessionStorage.getItem("loginUserInfo"))
        .doctorUserAllVO.doctorName,
      serverDiagnosticModel: {
        resultConclusion: ""
      },
      //------------2021、2、22修改-------------------
      editor: null,
      defaultMsg: "", // 富文本默认提示信息
      /*富文本配置项*/
      umConfig: {
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/utf8-jsp/",
        initialFrameWidth: 1000, // 宽度
        initialFrameHeight: 300 // 高度
      },
      isShowTabBtn: true,
      isShowEditor: "",
      pdfUrl: null,
      age: null,
      isShowTab: false,
      tabTxt: "",
      pageInfo: {
        revisitTime: "",
        diagnosticDiagnoseTime: "",
        resultBmiRange: {
          TooThin: ""
        }
      },
      module1: [
        { type: true },
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
      },
      //------------2021、2、22end-------------------
      value1: "",
      showSide: true,
      conclusion: "",
      suggest: "",
      scheme: "",
      conclusionHtml: "",
      suggestHtml: "",
      schemeHtml: "",
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
      isShowBona: false,
      glpj: "",
      yc: "",
      showEditerText: false,
      showTemplete: false,
      paginat: {
        currentPage: 1,
        // pageSize: Lockr.get("workPageSizes") || 15,
        pageSize: parseInt(sessionStorage.getItem("workPageSizes")) || 10,
        total: 0
      },
      templeteList: [],
      templeteType: 0,
      reportType: 0
    };
  },
  components: { ReportTemplete, SaveTemplete, Pdf , HistorySuggest },
  created() {
    sessionStorage.setItem("pageindex", 2);
    // this.initReportInfo();
    if (this.reportInfo !== "") {
      this.serverDiagnosticModel = JSON.parse(this.reportInfo);
    } else {
      this.initReportInfo();
    }
    eventEnquiry.$off("updateReviewTime");
    eventEnquiry.$on("updateReviewTime", mm => {
      this.serverDiagnosticModel.revisitTime = mm;
    });
    eventEnquiry.$off("reloadGSuggest");
    eventEnquiry.$on("reloadGSuggest", mm => {
      let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      this.serverDiagnosticModel.resultConclusion = model.resultConclusion;
      this.editor.setContent(this.serverDiagnosticModel.resultConclusion);
    });
  },
  props: {
    reportInfo: {
      type: String,
      default: ""
    },
    showGeneralprint: {
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
  watch: {
    module1: function(data) {
      if (data[2].type) {
        this.initChartsImg();
      }
    },
    module2: function(data) {
      this.initChartsImg2();
      this.initCharts();
    },
    isShowTab: function() {
      this.initChartsImg();
    }
  },
  mounted() {
    // this.getImg();
 
    if (this.editor) {
      this.editor.destroy();
    }
    this.getBonaMehod();
    this.getYcMehod();
    this.exchangeDiagnosticTestisMesureToName();
    this.setIsShowDepartAndDoctor();
    this.initWebEditer();
    this.formatInfo();
    this.initCharts();
    this.initChartsImg();
    this.initChartsImg2();
    setTimeout(() => {
      this.initChek();
    }, 200);
    if (this.isShowEditor != 1) {
      this.$nextTick(() => {
        this.initEditor();
      });
    }
  },
  methods: {
    //是否显示骨龄评价
    is_showGulingpingjia(){
    if (!this.isEmpty(this.serverDiagnosticModel.diagnosticRusMethod)) {
      if (this.serverDiagnosticModel.diagnosticRusMethod == "G-P") {
        if (
          this.serverDiagnosticModel.diagnosticGpBoneage != null &&
          ("" + this.serverDiagnosticModel.diagnosticGpBoneage).length > 0
        ) {
          this.isShowBona = true;
        } else {
          this.isShowBona = false;
        }
      } else {
        if (
          this.serverDiagnosticModel.diagnosticRusBoneage != null &&
          ("" + this.serverDiagnosticModel.diagnosticRusBoneage).length > 0
        ) {
          this.isShowBona = true;
        } else {
          this.isShowBona = false;
        }
      }
    } else {
      this.isShowBona = false;
    }
    },
    pageLoaded: function(pageNum) {
      console.log("time10", new Date().getSeconds());
      if (this.pdfOptions.numPages == pageNum) {
        setTimeout(() => {
          if (this.loading != null) {
            this.loading.close();
          } else {
            this.loading = null;
          }
          this.$refs.pdfcontent.print();
        }, 1000);
      }
    },
    pdfError: function(err) {
      console.log(err, "pdferr");
    },
    //------------2021、2、22修改-------------------
    initChek() {
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
      console.log(reportSet)
      let rc = reportSet.split("|");
      console.log(rc)
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
      console.log(content,evaluate)
      this.showModule(content, evaluate);
    },
    formatInfo() {
      this.isShowEditor = this.showWebEditer;
      //-----------------------------------------------生长发育评价报告-------------------------------------------
      this.pageInfo.childName = this.serverDiagnosticModel.childName;
      this.pageInfo.childSex =
        this.serverDiagnosticModel.childSex == 0 ? "男" : "女";
      this.pageInfo.resultAge =
        this.serverDiagnosticModel.resultAge != null
          ? this.serverDiagnosticModel.resultAge + " 岁"
          : "";
      this.pageInfo.childBirthday = this.serverDiagnosticModel.childBirthday;
      this.pageInfo.diagnosticDiagnoseTime = this.serverDiagnosticModel.diagnosticDiagnoseTime;
      this.pageInfo.revisitTime = this.serverDiagnosticModel.revisitTime;
      this.age = Number(this.pageInfo.resultAge.replace(/[^\d.]/g, ""));
      if (this.age >= 0 && this.age < 2) {
        this.tabTxt = "0 - 2";
      } else if (this.age >= 2 && this.age < 7) {
        this.tabTxt = "2 - 7";
      } else if (this.age >= 7) {
        this.tabTxt = "7 - 18";
      }
      // ----------------------------------------------出生时情况-----------------------------------------
      this.pageInfo.diagnosticFetusWeek = this.serverDiagnosticModel.diagnosticFetusWeek;
      this.pageInfo.resultBirthEvaluate = this.serverDiagnosticModel.resultBirthEvaluate;
      this.setProperty(
        "diagnosticBirthHeight",
        "resultBirthheightPer",
        "diagnosticBirthLebel",
        "resultBirthheightFlag",
        "出生身长/百分位：",
        "出生身长：",
        "cm",
        3,
        97
      );
      this.setProperty(
        "diagnosticBirthWeight",
        "resultBirthweightPer",
        "diagnosticBirthWeightLebel",
        "resultBirthweightFlag",
        "出生体重/百分位：",
        "出生体重",
        "kg",
        3,
        97
      );
      // ----------------------------------------------遗传因素-----------------------------------------
      this.pageInfo.diagnosticFatherHeight = this.serverDiagnosticModel.diagnosticFatherHeight;
      this.pageInfo.diagnosticMotherHeight = this.serverDiagnosticModel.diagnosticMotherHeight;
      this.pageInfo.resultSameageHeight = this.serverDiagnosticModel.resultSameageHeight;
      let BSGnum = null;
      if (typeof this.serverDiagnosticModel.resultTargetHeight == "string") {
        BSGnum = Number(
          this.serverDiagnosticModel.resultTargetHeight.replace(/[^\d.]/g, "")
        );
      } else {
        BSGnum = this.serverDiagnosticModel.resultTargetHeight;
      }
      if (this.serverDiagnosticModel.childSex === 1) {
        this.pageInfo.resultSameageHeightBSG = BSGnum - 160.6;
      } else {
        this.pageInfo.resultSameageHeightBSG = BSGnum - 172.7;
      }
      this.setPropertyTarget(
        "resultTargetHeight",
        "resultTargetheightPer",
        "resultTargetHeightLebel",
        "resultTargetHeightFlag",
        "靶身高/百分位：",
        "靶身高",
        "cm",
        0,
        999
      );
      // ----------------------------------------------当前身高评价-----------------------------------------
      this.setPropertyHeight(
        "diagnosticHeight",
        "resultHeightPer",
        "diagnosticHeightLebel",
        "diagnosticHeightFlag",
        "身高/百分位：",
        "身高",
        "cm",
        10,
        999
      );
      if (this.serverDiagnosticModel.resultHeightBaper) {
        // this.pageInfo.resultHeightBaper = Number(
        //   this.serverDiagnosticModel.resultHeightBaper.replace(/[^\d.]/g, "")
        // ); //骨龄身高百分位
        this.pageInfo.resultHeightBaper = this.serverDiagnosticModel.resultHeightBaper; //骨龄身高百分位
      }
      this.pageInfo.ltdHeightSpeedbyage = this.serverDiagnosticModel.ltdHeightSpeedbyage;
      this.pageInfo.ltdStandardageHeightspeed = this.serverDiagnosticModel.ltdStandardageHeightspeed;
      this.pageInfo.ltdHeightSpeedbybage = this.serverDiagnosticModel.ltdHeightSpeedbybage;
      console.log(this.serverDiagnosticModel.ltdHeightSpeedbybage);
      console.log(this.serverDiagnosticModel.ltdStandardbaHeightspeed);
      this.pageInfo.ltdStandardbaHeightspeed = this.serverDiagnosticModel.ltdStandardbaHeightspeed;
      this.pageInfo.resultHeightJudge = this.serverDiagnosticModel.resultHeightJudge;
      this.pageInfo.resultDiffCurheightandsameageheight = this.serverDiagnosticModel.resultDiffCurheightandsameageheight;
      this.pageInfo.resultDiffCurheightandsamebaheight = this.serverDiagnosticModel.resultDiffCurheightandsamebaheight;
      this.pageInfo.resultSameageHeight = this.serverDiagnosticModel.resultSameageHeight; //同年龄段身高增长速度，参考速度
      this.pageInfo.resultSameageHeightCZ =
        this.serverDiagnosticModel.diagnosticHeight -
        this.serverDiagnosticModel.resultSameageHeight;
      this.pageInfo.resultSamebaHeight = this.serverDiagnosticModel.resultSamebaHeight; //同年龄段骨龄增长速度，参考速度
      this.pageInfo.resultSamebaHeightCZ =
        this.serverDiagnosticModel.diagnosticHeight -
        this.serverDiagnosticModel.resultSamebaHeight;
      this.pageInfo.ltdStandardbaHeightspeed = this.serverDiagnosticModel.ltdStandardbaHeightspeed; //同骨龄端身高增长速度，参考速度
      //-------------------------------骨龄评价-----------------------------------------
      this.setProperty(
        "diagnosticRusBoneage",
        "resultRusboneagePer",
        "diagnosticRusBoneageLebel",
        "diagnosticRusBoneageFlag",
        "骨龄/百分位：",
        "骨龄",
        "岁",
        3,
        97
      );
      this.pageInfo.diagnosticGpBoneage = this.serverDiagnosticModel.diagnosticGpBoneage; //gp骨龄
      this.pageInfo.ltdRusboneageSpeed = this.serverDiagnosticModel.ltdRusboneageSpeed;
      this.pageInfo.resultBaJudge = this.serverDiagnosticModel.resultBaJudge;
      this.pageInfo.resultRusboneagediffage = this.serverDiagnosticModel.resultRusboneagediffage;
      this.setProperty(
        "diagnosticCarpalBoneage",
        "resultCarpalboneagePer",
        "diagnosticCarpalBoneageLebel",
        "diagnosticCarpalBoneageFlag",
        "骨龄/百分位：",
        "骨龄",
        "岁",
        3,
        97
      );
      this.setProperty(
        "resultRusdiffcarpal",
        "resultRusdiffcarpalPer",
        "resultRusdiffcarpalLebel",
        "resultRusdiffcarpalFlag",
        "骨龄差值/百分位：",
        "骨龄差值",
        "岁",
        3,
        97
      );
      this.pageInfo.resultRusboneagediffage = this.serverDiagnosticModel.resultRusboneagediffage; //右侧差值
      this.pageInfo.resultBaState = this.serverDiagnosticModel.resultBaState; //右侧title
      //-------------------------------第二性特征-----------------------------------------
      this.pageInfo.diagnosticBreastGrade = this.serverDiagnosticModel.diagnosticBreastGrade;
      this.pageInfo.diagnosticMenarcheAge = this.serverDiagnosticModel.diagnosticMenarcheAge;
      this.pageInfo.diagnosticPubicGrade = this.serverDiagnosticModel.diagnosticPubicGrade;
      this.pageInfo.resultAdolescentStage = this.serverDiagnosticModel.resultAdolescentStage;
 
      this.pageInfo.diagnosticPenisGrade = this.serverDiagnosticModel.diagnosticPenisGrade;
      this.pageInfo.diagnosticTestisVolume = this.serverDiagnosticModel.diagnosticTestisVolume;
      this.pageInfo.diagnosticTestisVolume = this.serverDiagnosticModel.diagnosticTestisVolume;
      this.pageInfo.diagnosticTestisMesure = this.serverDiagnosticModel.diagnosticTestisMesure;
      this.pageInfo.diagnosticPubicGrade = this.serverDiagnosticModel.diagnosticPubicGrade;
 
      //-------------------------------预测成年身高-----------------------------------------
      this.setProperty(
        "resultDoctorForeastheight",
        "resultDforeastheightPer",
        "resultDoctorForeastheightLebel",
        "resultDoctorForeastheightFlag",
        "预测身高/百分位：",
        "预测身高",
        "cm",
        3,
        97
      );
      let yccnsgCZnum = null;
 
      if (
        typeof this.serverDiagnosticModel.resultDoctorForeastheight == "string"
      ) {
        yccnsgCZnum = Number(
          this.serverDiagnosticModel.resultDoctorForeastheight.replace(
            /[^\d.]/g,
            ""
          )
        );
      } else {
        yccnsgCZnum = this.serverDiagnosticModel.resultDoctorForeastheight;
      }
      if (this.serverDiagnosticModel.childSex === 1) {
        this.pageInfo.yccnsgCZ = yccnsgCZnum - 160.6;
      } else {
        this.pageInfo.yccnsgCZ = yccnsgCZnum - 172.7;
      }
      this.pageInfo.resultDoctorForeastheightCZ =
        yccnsgCZnum - this.serverDiagnosticModel.resultTargetHeight;
      //-------------------------------体重体型评价-----------------------------------------
      this.setProperty(
        "diagnosticWeight",
        "resultWeightPer",
        "diagnosticWeightLebel",
        "diagnosticWeightFlag",
        "体重/百分位：",
        "体重",
        "kg",
        3,
        97
      );
      this.pageInfo.ltdWeightSpeedbyage = this.serverDiagnosticModel.ltdWeightSpeedbyage;
      this.pageInfo.resultBmi = this.serverDiagnosticModel.resultBmi;
      this.pageInfo.resultFatstate = this.serverDiagnosticModel.resultFatstate;
      this.pageInfo.resultWeightJudge = this.serverDiagnosticModel.resultWeightJudge; // 评价
      if(this.serverDiagnosticModel.resultBmiRange !=''){
        this.$set(
          this.pageInfo,
          "resultBmiRange",
          JSON.parse(this.serverDiagnosticModel.resultBmiRange)
        );
      }
    },
    setProperty(A, B, C, D, lebelName0, lebelName1, unit, num1, num2) {
      //a:主参；b：复参；c：lebel；d：flag;unit:单位；lebelName：lebel名
      if (this.serverDiagnosticModel[A]||this.serverDiagnosticModel[A]==0) {
        this.pageInfo[A] = this.serverDiagnosticModel[A] + unit;
        if (this.serverDiagnosticModel[B]) {
          this.pageInfo[C] = lebelName0;
          let num = Number(
            this.serverDiagnosticModel[B].replace(/[^\d.]/g, "")
          );
          this.pageInfo[B] = this.serverDiagnosticModel[B];
          if (num < num1 || num > num2) {
            this.pageInfo[D] = true;
          } else if((this.serverDiagnosticModel[B]+'')=="3.0"||(this.serverDiagnosticModel[B]+'')=="3"){
            this.pageInfo[D] = false;
          }else if(this.serverDiagnosticModel[B].includes("小于")||(this.serverDiagnosticModel[B]+'').includes("大于")){
            this.pageInfo[D] = true;
          }else {
            this.pageInfo[D] = false;
          }
        } else {
          this.pageInfo[C] = lebelName1;
        }
      }else{
        this.pageInfo[A]=null;
        this.pageInfo[B]=null;
      }
    },
    setPropertyTarget(A, B, C, D, lebelName0, lebelName1, unit, num1, num2) {
      //a:主参；b：复参；c：lebel；d：flag;unit:单位；lebelName：lebel名
      if (this.serverDiagnosticModel[A]) {
        this.pageInfo[A] = this.serverDiagnosticModel[A] + unit;
        if (this.serverDiagnosticModel[B]) {
          this.pageInfo[C] = lebelName0;
          let num = Number(
            this.serverDiagnosticModel[B].replace(/[^\d.]/g, "")
          );
          this.pageInfo[B] = this.serverDiagnosticModel[B];
          if (num < num1 || num > num2) {
            this.pageInfo[D] = false;
          } else if((this.serverDiagnosticModel[B]+'')=="3.0"||(this.serverDiagnosticModel[B]+'')=="3"){
            this.pageInfo[D] = false;
          }else if(this.serverDiagnosticModel[B].includes("小于")||(this.serverDiagnosticModel[B]+'').includes("大于")){
            this.pageInfo[D] = false;
          }else {
            this.pageInfo[D] = false;
          }
        } else {
          this.pageInfo[C] = lebelName1;
        }
      }else{
        this.pageInfo[A]=null;
        this.pageInfo[B]=null;
      }
    },
    setPropertyHeight(A, B, C, D, lebelName0, lebelName1, unit, num1, num2) {
      //a:主参；b：复参；c：lebel；d：flag;unit:单位；lebelName：lebel名
      if (this.serverDiagnosticModel[A]) {
        this.pageInfo[A] = this.serverDiagnosticModel[A] + unit;
        if (this.serverDiagnosticModel[B]) {
          this.pageInfo[C] = lebelName0;
          let num = Number(
            this.serverDiagnosticModel[B].replace(/[^\d.]/g, "")
          );
          this.pageInfo[B] = this.serverDiagnosticModel[B];
          if((this.serverDiagnosticModel[B]+'')=="3.0"||(this.serverDiagnosticModel[B]+'')=="3"){
            this.pageInfo[D] = true;
          }else if(this.serverDiagnosticModel[B].includes("小于")){
            this.pageInfo[D] = true;
          }else if (num <=num1 || num > num2) {
            this.pageInfo[D] = true;
          }else {
            this.pageInfo[D] = false;
          }
        } else {
          this.pageInfo[C] = lebelName1;
        }
      }else{
        this.pageInfo[A]=null;
        this.pageInfo[B]=null;
      }
    },
    tabFn() {
      this.isShowTab = !this.isShowTab;
    },
    initChartsImg() {
      // 当前身高评价
      let heightData = JSON.parse(
        sessionStorage.getItem("smartDiagnosticListHistory")
      );
      console.log(heightData,222)
      for (var i=0;i<heightData.length;i++) {
        if (this.serverDiagnosticModel.diagnosticId==heightData[i].diagnosticId) {
          heightData = heightData.slice(i, heightData.length);
        }
      }
      console.log(heightData)
      let heightArr = [];
      this.pageInfo.diagnosticRusBoneage = this.serverDiagnosticModel.diagnosticRusBoneage; //骨龄，如果有值显示骨龄，无则显示身高
      if (
        this.pageInfo.diagnosticRusBoneage &&
        (this.glpj.value == "RUS-CHN" || this.glpj.value == "TW3-C RUS")
      ) {
        heightData.forEach(item => {
          if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticHeight)){
            heightArr.push({
              x: item.diagnosticRusBoneage,
              y: item.diagnosticHeight
            });
          }
        });
        if (this.pageInfo.childSex == "男") {
          if (this.glpj.value == "RUS-CHN") {
            this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/bone_1.svg");
            imgInfo.hrgitEvaluate[1][0].id = "myCanvas3";
            imgInfo.hrgitEvaluate[1][0].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[1][0].data.push({
                x: item.x - 3,
                y: item.y - 80
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[1][0]);
          } else if (this.glpj.value == "TW3-C RUS") {
            this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/bone_3.svg");
            imgInfo.hrgitEvaluate[1][2].id = "myCanvas3";
            imgInfo.hrgitEvaluate[1][2].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[1][2].data.push({
                x: item.x - 3,
                y: item.y - 80
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[1][2]);
          }
        } else {
          if (this.glpj.value == "RUS-CHN") {
            setTimeout(() => {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/bone_2.svg");
            }, 1000);
 
            console.log(this.canvasImgSrc);
            imgInfo.hrgitEvaluate[1][1].id = "myCanvas3";
            imgInfo.hrgitEvaluate[1][1].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[1][1].data.push({
                x: item.x - 1,
                y: item.y -70
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[1][1]);
          } else if (this.glpj.value == "TW3-C RUS") {
            this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/bone_4.svg");
            imgInfo.hrgitEvaluate[1][3].id = "myCanvas3";
            imgInfo.hrgitEvaluate[1][3].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[1][3].data.push({
                x: item.x - 1,
                y: item.y -70
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[1][3]);
          }
        }
      } else {
        heightData.forEach(item => {
          if(this.isEnablePush(item.resultAge,item.diagnosticHeight)){
            heightArr.push({
              x: item.resultAge,
              y: item.diagnosticHeight
            });
          }
        });
        if (this.pageInfo.childSex == "男") {
          if (this.isShowTab) {
            this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_4.svg");
            imgInfo.hrgitEvaluate[0][3].id = "myCanvas";
            imgInfo.hrgitEvaluate[0][3].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[0][3].data.push({
                x: item.x,
                y: item.y - 40
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[0][3]);
          } else {
            if (this.age >= 0 && this.age < 2) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_1.svg");
              imgInfo.hrgitEvaluate[0][0].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][0].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][0].data.push({
                  x: item.x,
                  y: item.y - 40
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][0]);
            } else if (this.age >= 2 && this.age < 7) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_2.svg");
              imgInfo.hrgitEvaluate[0][1].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][1].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][1].data.push({
                  x: item.x - 2,
                  y: item.y - 80
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][1]);
            } else if (this.age >= 7) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_3.svg");
              imgInfo.hrgitEvaluate[0][2].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][2].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][2].data.push({
                  x: item.x - 7,
                  y: item.y - 110
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][2]);
            }
          }
        } else {
          console.log(1);
          if (this.isShowTab) {
            this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_8.svg");
            imgInfo.hrgitEvaluate[0][7].id = "myCanvas";
            imgInfo.hrgitEvaluate[0][7].data = [];
            heightArr.forEach(item => {
              imgInfo.hrgitEvaluate[0][7].data.push({
                x: item.x,
                y: item.y - 40
              });
            });
            drawPoint(imgInfo.hrgitEvaluate[0][7]);
          } else {
            if (this.age >= 0 && this.age < 2) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_5.svg");
              imgInfo.hrgitEvaluate[0][4].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][4].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][4].data.push({
                  x: item.x,
                  y: item.y - 45
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][4]);
            } else if (this.age >= 2 && this.age < 7) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_6.svg");
              imgInfo.hrgitEvaluate[0][5].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][5].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][5].data.push({
                  x: item.x - 2,
                  y: item.y - 80
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][5]);
            } else if (this.age >= 7) {
              this.canvasImgSrc.mycanvas = require("../../../../../public/images/chart/noBone_7.svg");
              imgInfo.hrgitEvaluate[0][6].id = "myCanvas2";
              imgInfo.hrgitEvaluate[0][6].data = [];
              heightArr.forEach(item => {
                imgInfo.hrgitEvaluate[0][6].data.push({
                  x: item.x - 7,
                  y: item.y - 110
                });
              });
              drawPoint(imgInfo.hrgitEvaluate[0][6]);
            }
          }
        }
      }
    },
    initChartsImg2() {
      //通用报告
      let sex = null;
      let str = "";
      let heightData = JSON.parse(
        sessionStorage.getItem("smartDiagnosticListHistory")
      );
      for (var i=0;i<heightData.length;i++) {
        if (this.serverDiagnosticModel.diagnosticId==heightData[i].diagnosticId) {
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
            if(this.isEnablePush(item.resultAge,item.diagnosticHeight)){
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          } else {
            if(this.isEnablePush(item.resultAge,item.diagnosticHeight)){
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
        imgInfo.general.shenGao_th[sex].id = "shengao";
        imgInfo.general.shenGao_th[sex].data = heightArr;
        drawPoint(imgInfo.general.shenGao_th[sex]);
      }
      if (this.module2[1].type) {
        // 体重百分位曲线图 diagnosticWeight
        let widthArr = [];
        heightData.forEach(item => {
          if (sex) {
            if(this.isEnablePush(item.resultAge,item.diagnosticWeight)){
              widthArr.push({
                x: item.resultAge,
                y: item.diagnosticWeight
              });
            }
          } else {
            if(this.isEnablePush(item.resultAge,item.diagnosticWeight)){
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
        imgInfo.general.tiZhong_th[sex].id = "tizhong";
        imgInfo.general.tiZhong_th[sex].data = widthArr;
        drawPoint(imgInfo.general.tiZhong_th[sex]);
      }
      if (this.module2[2].type) {
        // BMI百分位曲线图 resultBmi
        let bmiArr = [];
        heightData.forEach(item => {
          if (sex) {
            if(this.isEnablePush(item.resultAge,item.resultBmi)){
              bmiArr.push({
                x: item.resultAge - 1,
                y: item.resultBmi - 11
              });
            }
          } else {
            if(this.isEnablePush(item.resultAge,item.resultBmi)){
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
        imgInfo.general.BMI_th[sex].id = "BMI";
        imgInfo.general.BMI_th[sex].data = bmiArr;
        drawPoint(imgInfo.general.BMI_th[sex]);
      }
      if (this.module2[3].type) {
        //按骨龄身高百分位曲线图 diagnosticRusBoneage
        let gulingHArr = [];
        heightData.forEach(item => {
          if (sex) {
            if (this.glpj.value == "RUS-CHN") {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticHeight)){
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 1,
                  y: item.diagnosticHeight - 70
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticHeight)){
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 1,
                  y: item.diagnosticHeight - 70
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticHeight)){
                gulingHArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticHeight - 80
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticHeight)){
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
          imgInfo.general.gulingH_th[sex].id = "gulingH";
          imgInfo.general.gulingH_th[sex].data = gulingHArr;
          drawPoint(imgInfo.general.gulingH_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_3.svg`);
          } else {
            this.canvasImgSrc.gulingH = require(`../../../../../public/images/chart/bone_4.svg`);
          }
          imgInfo.general.gulingH_th[sex + 2].id = "gulingH";
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
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticWeight)){
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 10
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticWeight)){
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 10
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticWeight)){
                gulingWArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.diagnosticWeight - 5
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.diagnosticWeight)){
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
          imgInfo.general.gulingW_th[sex].id = "gulingW";
          imgInfo.general.gulingW_th[sex].data = gulingWArr;
          drawPoint(imgInfo.general.gulingW_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_TW3_C_RUS_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingW = require(`../../../../../public/images/chart/glW_TW3_C_RUS_th_w.svg`);
          }
          imgInfo.general.gulingW_th[sex + 2].id = "gulingW";
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
              if(this.isEnablePush(item.diagnosticRusBoneage,item.resultBmi)){
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 11
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.resultBmi)){
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 11
                });
              }
            }
          } else {
            if (this.glpj.value == "RUS-CHN") {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.resultBmi)){
                gulingBMIArr.push({
                  x: item.diagnosticRusBoneage - 3,
                  y: item.resultBmi - 10
                });
              }
            } else {
              if(this.isEnablePush(item.diagnosticRusBoneage,item.resultBmi)){
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
          imgInfo.general.gulingBMI_th[sex].id = "gulingBMI";
          imgInfo.general.gulingBMI_th[sex].data = gulingBMIArr;
          drawPoint(imgInfo.general.gulingBMI_th[sex]);
        } else {
          if (this.pageInfo.childSex == "男") {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_TW3_C_RUS_th_m.svg`);
          } else {
            this.canvasImgSrc.gulingBMI = require(`../../../../../public/images/chart/glBMI_TW3_C_RUS_th_w.svg`);
          }
          imgInfo.general.gulingBMI_th[sex + 2].id = "gulingBMI";
          imgInfo.general.gulingBMI_th[sex + 2].data = gulingBMIArr;
          drawPoint(imgInfo.general.gulingBMI_th[sex + 2]);
        }
      }
      if (this.module2[6].type) {
        //父母身高修正的身高百分位数 resultTargetHeight resultHeightSds
        let amendArr = [];
        heightData.forEach(item => {
          
            if (sex) {
              if(this.isEnablePush(item.resultMiddleHeight,item.resultHeightSds)){
                var Ynum= item.resultHeightSds.replace("大于", "").replace("小于", "")
                amendArr.push({
                  x: item.resultMiddleHeight - 150,
                  y: Number(Ynum) + 6
                });
              }
            } else {
              if(this.isEnablePush(item.resultMiddleHeight,item.resultHeightSds)){
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
        
        imgInfo.general.amendH_th[sex].id = "amend";
        imgInfo.general.amendH_th[sex].data = amendArr;
        drawFMPoint(imgInfo.general.amendH_th[sex]);
        // 身高百分位曲线图 diagnosticHeight   resultAge
        let heightArr = [];
        heightData.forEach(item => {
          if (sex) {
            if(this.isEnablePush(item.resultAge,item.diagnosticHeight)){
              heightArr.push({
                x: item.resultAge,
                y: item.diagnosticHeight - 40
              });
            }
          } else {
            if(this.isEnablePush(item.resultAge,item.diagnosticHeight)){
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
        imgInfo.general.shenGao_th[sex].id = "amend_shengao";
        imgInfo.general.shenGao_th[sex].data = heightArr;
        drawPoint(imgInfo.general.shenGao_th[sex]);
      }
      if (this.module2[7].type) {
        //RUS-CHN百分位曲线图  diagnosticRusScore
        let euschnArr = [];
        heightData.forEach(item => {
          if (item.diagnosticRusScore) {
            if (sex) {
              if(this.isEnablePush(item.resultAge,item.diagnosticRusScore)){
                euschnArr.push({
                  x: item.resultAge - 1,
                  y: Number(item.diagnosticRusScore)
                });
              }
            } else {
              if(this.isEnablePush(item.resultAge,item.diagnosticRusScore)){
                euschnArr.push({
                  x: item.resultAge - 1,
                  y: Number(item.diagnosticRusScore)
                });
              }
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.RUSCHN = require("../../../../../public/images/chart/RUS-CHN_th_m.svg");
        } else {
          this.canvasImgSrc.RUSCHN = require("../../../../../public/images/chart/RUS-CHN_th_w.svg");
        }
        console.log(euschnArr);
        imgInfo.general.RUS_CHN_th[sex].id = "RUSCHN";
        imgInfo.general.RUS_CHN_th[sex].data = euschnArr;
        drawPoint(imgInfo.general.RUS_CHN_th[sex]);
      }
      if (this.module2[8].type) {
        //TW3-C RUS百分位曲线图
        let tW3_C_RUSArr = [];
        heightData.forEach(item => {
          if (item.diagnosticRusScore) {
            if (sex) {
              if(this.isEnablePush(item.resultAge,item.diagnosticRusScore)){
                tW3_C_RUSArr.push({
                  x: item.resultAge - 1,
                  y: Number(item.diagnosticRusScore)
                });
              }
            } else {
              if(this.isEnablePush(item.resultAge,item.diagnosticRusScore)){
                tW3_C_RUSArr.push({
                  x: item.resultAge - 2,
                  y: Number(item.diagnosticRusScore)
                });
              }
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.TW3_C_RUS = require(`../../../../../public/images/chart/TW3_C_RUS_m.svg`);
        } else {
          this.canvasImgSrc.TW3_C_RUS = require(`../../../../../public/images/chart/TW3_C_RUS_w.svg`);
        }
        imgInfo.general.TW3_C_RUS[sex].id = "TW3_C_RUS";
        imgInfo.general.TW3_C_RUS[sex].data = tW3_C_RUSArr;
        drawPoint(imgInfo.general.TW3_C_RUS[sex]);
      }
      if (this.module2[9].type) {
        //TW3CCarpal百分位曲线图
        let tW3CCarpalArr = [];
        heightData.forEach(item => {
          if (item.diagnosticCarpalScore) {
            if (sex) {
              if(this.isEnablePush(item.resultAge,item.diagnosticCarpalScore)){
                tW3CCarpalArr.push({
                  x: item.resultAge - 1,
                  // y: Number(item.diagnosticRusScore)
                  y: Number(item.diagnosticCarpalScore-121)
                });
              }
            } else {
              if(this.isEnablePush(item.resultAge,item.diagnosticCarpalScore)){
                tW3CCarpalArr.push({
                  x: item.resultAge - 1,
                  y: Number(item.diagnosticCarpalScore-150)
                  // y: Number(item.diagnosticRusScore)
                });
              }
            }
          }
        });
        if (this.pageInfo.childSex == "男") {
          this.canvasImgSrc.TW3CCarpal = require(`../../../../../public/images/chart/TW3_C_Carpal_th_m.svg`);
        } else {
          this.canvasImgSrc.TW3CCarpal = require(`../../../../../public/images/chart/TW3_C_Carpal_th_w.svg`);
        }
        imgInfo.general.TW3_C_Carpal[sex].id = "TW3CCarpal";
        imgInfo.general.TW3_C_Carpal[sex].data = tW3CCarpalArr;
        drawPoint(imgInfo.general.TW3_C_Carpal[sex]);
      }
      if (this.module2[10].type) {
        //TW3-C RUS与腕骨骨龄差值 resultRusdiffcarpal
        let tW3_C_RUSArr = [];
        heightData.forEach(item => {
          if (sex) {
            if(this.isEnablePush(item.resultAge,item.resultRusdiffcarpal)){
              tW3_C_RUSArr.push({
                x: item.resultAge - 1,
                y: Number(item.resultRusdiffcarpal) + 3
              });
            }
          } else {
            if(this.isEnablePush(item.resultAge,item.resultRusdiffcarpal)){
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
        imgInfo.general.TW3_C_RUS_wg[sex].id = "TW3_C_RUS_wg";
        imgInfo.general.TW3_C_RUS_wg[sex].data = tW3_C_RUSArr;
        drawPoint(imgInfo.general.TW3_C_RUS_wg[sex]);
      }
    },
    initCharts() {
      // 预测成年身高柱状图
      let heightData = JSON.parse(
        sessionStorage.getItem("smartDiagnosticListHistory")
      );
      let heightArr = [];
      if (heightData && heightData.length > 0) {
        let currdia = false;
        heightData.forEach((item, index) => {
          let baHeight = "";
          let baHeightper = "";
          let height = "";
          let heightper = "";
          if (typeof item.resultTargetHeight == "string") {
            baHeight = item.resultTargetHeight.replace(/[^\d.]/g, "");
          } else {
            baHeight = item.resultTargetHeight;
          }
          if (typeof item.resultTargetheightPer == "string") {
            baHeightper = item.resultTargetheightPer.replace(/[^\d.]/g, "");
          } else {
            baHeightper = item.resultTargetheightPer;
          }
          if (typeof item.resultDoctorForeastheight == "string") {
            height = item.resultDoctorForeastheight.replace(/[^\d.]/g, "");
          } else {
            height = item.resultDoctorForeastheight;
          }
          if (typeof item.resultDforeastheightPer == "string") {
            heightper = item.resultDforeastheightPer.replace(/[^\d.]/g, "");
          } else {
            heightper = item.resultDforeastheightPer;
          }
          if(item.diagnosticId == this.serverDiagnosticModel.diagnosticId)
          {
            currdia = true;
          }
          if (heightArr.length < 4&&currdia) {

            heightArr.unshift({
              date: item.diagnosticDiagnoseTime,
              baHeight: baHeight,
              baHeightper: baHeightper,
              baHeightperstr: item.resultTargetheightPer,
              height: height,
              heightper: heightper,
              heightperstr: item.resultDforeastheightPer,
              heightStr: item.resultDoctorForeastheight
            });
          }
        });
        let c = document.getElementById("myCharts");
        if(c.width==488){
          c.width=488;
        }else{
          c.width=488;
        }
        foundPen("myCharts", heightArr, this.pageInfo.childSex);
      }
    },
    reportPdf(val) {
      //导出pdf
      if (val == "导出") {
        this.loading = this.$loading({
          lock: true,
          text: "正在生成pdf...",
          background: "rgba(255, 255, 255, 0.98)"
        });
      } else {
        this.loading = this.$loading({
          lock: true,
          text: "正在加载中...",
          background: "rgba(255, 255, 255, 0.98)"
        });
      }
      
      this.isShowTabBtn = false;
      this.isShowEditor = 1;
      setTimeout(() => {
        console.log("time1", new Date().getSeconds());
        $createPdf(
          this.$refs.pdfPage,
          this.pageInfo.childName +
            "-" +
            this.pageInfo.diagnosticDiagnoseTime.replace("-", "").replace("-", "") + "-" +
            "通用报告",
          this.pageInfo.childName,
          val,
          JSON.parse(sessionStorage.getItem("reportsettings"))[0].isGray,
          async (num, file) => {
            this.isShowEditor = this.showWebEditer;
            this.isShowTabBtn = true;
            console.log("time6", new Date().getSeconds());
            if (file) {
              // console.log("time7", new Date().getSeconds());
              // this.pdfOptions.pdfUrl = Pdf.createLoadingTask({ url: file });
              // console.log("time8", new Date().getSeconds());
              // this.pdfOptions.pdfUrl.promise.then(pdf => {
              //   this.pdfOptions.numPages = pdf.numPages;
              // });
              // console.log("time9", new Date().getSeconds());
              this.loading.close();
              this.loading = null;
            }
            if (val == "导出") {
              this.loading.close();
              this.loading = null;
            }
          }
        );
      }, 500);
    },
    showModule(agm1, agm2) {
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
      this.$forceUpdate()
      //调用是否显示骨龄评价
      this.is_showGulingpingjia();
    },
    setTime(time) {
      this.pageInfo.revisitTime = time;
    },
    initEditor() {
      const _this = this;
      this.editor = UM.getEditor("umEditor"); // 初始化UE
      this.editor.execCommand("fontsize", "12px"); //字号
      setTimeout(() => {
        this.editor.setContent(this.serverDiagnosticModel.resultConclusion);
      }, 200);
      // this.editor.addListener("contentChange",()=>{
      this.editor.addListener("blur", () => {
        this.getConclusionContext(this.editor.getContent());
      });
    },
 
    //-------------2021、2、22end------------------
    initReportInfo() {
      //初始化报表数据
      // if(this.$store.state.smartDiagnosticHistory){
      //     this.serverDiagnosticModel = this.$store.state.smartDiagnosticHistory;
      // }else{
 
      // }
      console.log("初始化");
      this.serverDiagnosticModel = JSON.parse(
        sessionStorage.getItem("smartDiagnosticHistory")
      );
      this.conclusionHtml = this.serverDiagnosticModel.resultConclusion;
      this.suggestHtml = this.serverDiagnosticModel.resultSuggest;
      this.schemeHtml = this.serverDiagnosticModel.resultProject;
      this.getBonaMehod();
      this.getYcMehod();
      this.exchangeDiagnosticTestisMesureToName();
      this.setIsShowDepartAndDoctor();
      this.initWebEditer();
      this.formatInfo();
      this.initChartsImg();
      this.initChartsImg2();
      setTimeout(() => {
        this.initChek();
      }, 200);
      if (this.isShowEditor != 1) {
        this.$nextTick(() => {
          this.initEditor();
        });
      }
    },
    // saveSuggest(){
    //     eventEnquiry.$emit("saveSuggest", "");
    // },
    //保存报告
    saveSuggest() {
      
      //this.$nextTick(() => {
        let serverend= sessionStorage.getItem("serverend");//添加  服务到期，不能修改诊断意见的逻辑
        if(serverend==1){
          this.$message.error("服务已到期，请拨打400-600-8865续费！");
          return;
        }
        let conclusion = this.editor.getContent();
        let suggest = ""; //document.getElementById("suggestHtml" + suffix).innerHTML;
        let scheme = ""; //document.getElementById("schemeHtml" + suffix).innerHTML;
        let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
        model.resultConclusion = conclusion;
        model.resultSuggest = suggest;
        model.resultProject = scheme;
        sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
        sessionStorage.removeItem("customReportSettings");
        saveReport({
          diagnosticId: this.serverDiagnosticModel.diagnosticId,
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
          this.serverDiagnosticModel = JSON.parse(
            sessionStorage.getItem("serverDiagnosticModel")
          );
        });
      //});
    },
    saveTemplete() {
      this.showSaveTemplete = true;
      this.$nextTick(() => {
        eventEnquiry.$emit("saveTemplete", this.editor.getContent());
      });
    },
    //查看历史诊断
    historySuggest(){
      this.showHistorySuggest = true
    },
    //判断是否是空
    isEmpty(str) {
      return !str || 0 === str.length;
    },
    changePerUnit(perdata) {
      if (perdata.indexOf("小于3") >= 0) {
        return " rd↓";
      } else if (perdata.indexOf("大于") >= 0) {
        return " th↑";
      }
      return " th";
    },
    //动态设置报告的部门和医生
    setIsShowDepartAndDoctor() {
      let reportsettings = JSON.parse(sessionStorage.getItem("reportsettings"));
      this.isShowDepartmentName = reportsettings[0].isShowDepartmentName;
      this.isShowDoctorName = reportsettings[0].isShowDoctorName;
    },
    //睾丸体积测量方法：0表示睾丸模型测量，1表示超生图测量，2表示卡尺测量
    exchangeDiagnosticTestisMesureToName() {
      switch (this.serverDiagnosticModel.diagnosticTestisMethod) {
        case 0:
          this.diagnosticTestisMesureName = "睾丸模型测量";
          break;
        case 1:
          this.diagnosticTestisMesureName = "超生图测量";
          break;
        case 2:
          this.diagnosticTestisMesureName = "卡尺测量";
          break;
      }
    },
    initWebEditer() {
      try {
        if (this.showWebEditer == 1) {
          this.showEditerText = true;
          // document.getElementById("showEditerGeneral").setAttribute("style", "display:none");
          // for (let i = 0; i < document.getElementsByName("chooseTempleteGeneral").length; i++) {
          //     document.getElementsByName("chooseTempleteGeneral")[i].setAttribute("style", "display:none");
          // }
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    getBonaMehod() {
      let temp = { name: "", value: "", leble1: "", leble2: "", leble3: "" };
  
      switch (this.serverDiagnosticModel.diagnosticRusMethod) {
        case "RUS-CHN":
          temp.name = "中华-05";
          temp.value = "RUS-CHN";
          temp.leble1 = "RC";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "RC与Carpal";
          break;
        case "TW3-C RUS":
          temp.name = "中华-05";
          temp.value = "TW3-C RUS";
          temp.leble1 = "TW3-C RUS";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "TW3C与Carpal";
          break;
        case "TW3-RUS":
          temp.name = "TW3";
          temp.value = "TW3-RUS";
          temp.leble1 = "TW3-RUS";
          temp.leble2 = "TW3-Carpal";
          temp.leble3 = "TW3与Carpal";
          break;
        case "G-P":
          temp.name = "G-P";
          temp.value = "G-P";
          temp.leble1 = "G-P";
          break;
        default:
          temp.name = "中华-05";
          temp.value = "RUS-CHN";
          temp.leble1 = "RC";
          temp.leble2 = "TW3-C Carpal";
          temp.leble3 = "RC与Carpal";
          break;
      }
      // 骨龄方法为rus-chn和tw3-c rus 骨龄评价方法为：中华-05
      // 骨龄方法为tw3-rus或gp       骨龄评价方法为：TW3或G-P
 
      this.glpj = temp;
    },
    getYcMehod() {
      let methodName = "";
      let method = this.serverDiagnosticModel.diagnosticForeastMethod;
      switch (method) {
        case 0:
          methodName = "中华05身高预测方法";
          break;
        case 2:
          methodName = "TW3身高预测方法";
          break;
        case 3:
          methodName = "特纳综合征儿童成年身高预测方法";
          break;
        case 4:
          methodName = "软骨发育不全成年身高预测方法";
          break;
        case 5:
          methodName = "特发性矮身高儿童身高预测方法";
          break;
        case 6:
          methodName = "骨龄投射法";
          break;
        case 7:
          methodName = "年龄投射法";
          break;
      }
      if (methodName != "") {
        this.yc = "(" + methodName + ")";
      }
    },
    getConclusionContext(data) {
      // document.getElementById("conclusionHtmlGeneral").innerHTML = data;
      // this.editor.setContent(data)
      let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
      if (model) {
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
      document.getElementById("suggestHtmlGeneral").innerHTML = data;
    },
    getSchemeContext(data) {
      document.getElementById("schemeHtmlGeneral").innerHTML = data;
    },
    hideInfo(obj) {
      //根据设置隐藏信息
      let infos = document.getElementsByName("generalInfo");
      let imgs = document.getElementsByName("generalImg");
 
      let items = obj.split("|");
      //内容
      for (let i = 0; i < infos.length; i++) {
        infos[i].setAttribute("style", "display:none");
        if (items[0].indexOf(infos[i].getAttribute("data")) !== -1) {
          infos[i].setAttribute("style", "display:block");
        }
 
        if (this.showWebEditer == 1) {
          if (infos[i].getAttribute("data") == 8) {
            if (
              infos[i].children[1].children[1].innerHTML.replace(
                /<\/?.+?>/g,
                ""
              ) == ""
            ) {
              infos[i].setAttribute("style", "display:none");
            }
          }
          if (infos[i].getAttribute("data") == 9) {
            if (
              infos[i].children[1].children[1].innerHTML.replace(
                /<\/?.+?>/g,
                ""
              ) == ""
            ) {
              infos[i].setAttribute("style", "display:none");
            }
          }
          if (infos[i].getAttribute("data") == 10) {
            if (
              infos[i].children[1].children[1].innerHTML.replace(
                /<\/?.+?>/g,
                ""
              ) == ""
            ) {
              infos[i].setAttribute("style", "display:none");
            }
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
    },
    chooseTemplete(obj) {
      this.paginat.currentPage = this.paginat.currentPage;
      this.showTemplete = true;
      this.templeteType = obj;
      let params = {
        // hospitalId: Lockr.get("loginUserInfo").doctorUserAllVO.hospitalId,
        // departmentId: Lockr.get("loginUserInfo").doctorUserAllVO.departmentId,
        // doctorId: Lockr.get("loginUserInfo").doctorUserAllVO.doctorId,
        hospitalId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .hospitalId + "",
        departmentId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .departmentId + "",
        doctorId:
          JSON.parse(sessionStorage.getItem("loginUserInfo")).doctorUserAllVO
            .doctorId + "",
        templateType: obj,
        page: this.paginat.currentPage,
        limit: this.paginat.pageSize
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
      if (type == "generalTempleteConclusion") {
        this.serverDiagnosticModel.resultConclusion = this.editor.getContent() + "<br/>" + val;
        
        let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
        model.resultConclusion = this.editor.getContent() + "<br/>" + val;;
        sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
 
        setTimeout(() => {
          this.editor.setContent(this.editor.getContent() + "<br/>" + val);
          saveReport({
            diagnosticId: this.serverDiagnosticModel.diagnosticId,
            resultConclusion: this.editor.getContent(),
            resultSuggest: "",
            resultProject: ""
          });
        }, 200);
        // this.getConclusionContext("<div>" + val + "</div>");
      } else if (type == "generalTempleteSuggest") {
        this.serverDiagnosticModel.resultSuggest = val;
        this.getSuggestContext("<div>" + val + "</div>");
      } else if (type == "generalTempleteScheme") {
        this.serverDiagnosticModel.resultProject = val;
        this.getSchemeContext("<div>" + val + "</div>");
      }
    },
    changeTempleteCaina(type, val) {
      if (type == "generalTempleteConclusion") {
        this.serverDiagnosticModel.resultConclusion = val;
        let model = JSON.parse(sessionStorage.getItem("serverDiagnosticModel"));
        model.resultConclusion = val;;
        sessionStorage.setItem("serverDiagnosticModel", JSON.stringify(model));
        setTimeout(() => {
          this.editor.setContent(val);
          saveReport({
            diagnosticId: this.serverDiagnosticModel.diagnosticId,
            resultConclusion: val,
            resultSuggest: "",
            resultProject: ""
          });
        }, 200);
      } else if (type == "generalTempleteSuggest") {
        this.serverDiagnosticModel.resultSuggest = val;
        this.getSuggestContext("<div>" + val + "</div>");
      } else if (type == "generalTempleteScheme") {
        this.serverDiagnosticModel.resultProject = val;
        this.getSchemeContext("<div>" + val + "</div>");
      }
    },
    //画图的时候使用，true表示可描点，false表示不能参与描点
    isEnablePush(par1,par2){
      if(typeof(par1)=="string"){
        if(par1.trim().length<=0)
        {
          return false;
        }else if(par1.trim()=="undefined"){
          return false;
        }
      }else if(par1==0)
      {
return true;
      }else if(typeof(par1) == "undefined"||!par1){
        return false;
      }
      if(typeof(par2)=="string"){
        if(par2.trim().length<=0)
        {
          return false;
        }else if(par2.trim()=="undefined"){
          return false;
        }
      }else if(par2==0)
      {
return true;
      }else if(typeof(par2) == "undefined"||!par2){
        return false;
      }
      return true;
    }
  },
  beforeDestroy() {
    // if (this.editor) this.editor.destroy();
    UM.delEditor('umEditor');
  }
};
</script>
 
<style lang="stylus" scoped>
@import '~@/assets/styles/varibles.styl';
 
>>> .kg-dialog .el-dialog__header {
  height: 40px;
}
 
>>> .dashboard-font div:nth-child(2) {
  display: none;
}
 
/* 2021/2/22增加---------------------------------------- */
.general_shade {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  font-size: 40px;
  align-items: center;
  justify-content: center;
}
 
.general_dim {
  /* filter: blur(10px); */
}
 
.general_tabColr {
  color: #fe3030;
  // position: relative;
  // margin-right: 45px; /* no */
  font-weight:bold;
  font-size:18px;/* no */
}
 
.general_tabColr2 {
  color: #fe3030;
  position: relative;
  margin-right: 13px; /* no */
  font-weight:bold;
  font-size:18px;/* no */
}
 
.general_tabColr_child {
  // position: absolute;
  display: inline-block;
  // top: -2px; /* no */
  // right: -45px; /* no */
  min-height: 16px; /* no */
  min-width: 30px; /* no */
  font-size: 15px; /* no */
  line-height: 16px; /* no */
  text-align: center;
  border: 2px solid #fe3030; /* no */
  padding: 1px 4px; /* no */
  border-radius: 6px; /* no */
  color: #fe3030;
  font-weight:bold;
}
 
.general_tabColr_child2 {
  position: absolute;
  width: 14px; /* no */
  height: 16px; /* no */
  right: -13px; /* no */
  top: 10px; /* no */
  background: url('../../../../assets/img/jiantou.svg') no-repeat;
  background-size: 14px 16px; /* no */
}
 
.general_tabColr3 {
  color: #fe3030;
  // position: relative;
  // margin-right: 45px; /* no */
  font-weight:bold;
  font-size:18px;/* no */
}
 
.general_tabColr_child3 {
  position: absolute;
  width: 14px; /* no */
  height: 16px; /* no */
  right: -20px; /* no */
  top: 10px; /* no */
  background: url('../../../../assets/img/jiantou.svg') no-repeat;
  background-size: 14px 16px; /* no */
}
 
.general_tabColr_child3_1 {
  // position: absolute;
  display: inline-block;
  // top: 6px; /* no */
  // right: -44px; /* no */
  height: 16px; /* no */
  width: 30px; /* no */
  font-size: 15px; /* no */
  line-height: 16px; /* no */
  text-align: center;
  border: 2px solid #fe3030; /* no */
  padding: 1px 4px; /* no */
  border-radius: 6px; /* no */
  color: #fe3030;
  font-weight:bold;
}
 
.gl_title {
  font-size: 16px; /* no */
  font-weight: bold;
  text-align: center;
  margin-top: 13px; /* no */
}
 
.gl_line {
  margin-top: 8px; /* no */
 
  .gl_line_title {
    font-size: 16px; /* no */
    font-weight: bold;
    text-align: center;
    color: #0cc0d0;
  }
 
  .colorY {
    background: #E46000;
    margin-top:-3px;
  }
 
  .colorG {
    background: #00A4B3;
    margin-top:-3px;
  }
 
  .colorR {
    background: #FD5E64;
    margin-top:-3px;
  }
 
  .colorTxtY {
    color: #E46000;
  }
 
  .colorTxtG {
    color: #00A4B3;
  }
 
  .colorTxtR {
    color: #FD5E64;
  }
 
  .gl_line_box {
    width: 100%;
    height: 16px; /* no */
    margin-top: 8px; /* no */
    position: relative;
    display: flex;
    flex-wrap: nowrap;
 
    .gl_line_item {
      width: 160px; /* no */
      height: 16px; /* no */
      float: left;
    }
 
    .br16L {
      border-radius: 16px 0px 0px 16px; /* no */
    }
 
    .br16R {
      border-radius: 0px 16px 16px 0px; /* no */
    }
 
    .gl_line_color1 {
      background: url('../../../../assets/img/beijingse_1.png');
      background-size: 4px 5px; /* no */
      position: relative;
    }
 
    .gl_line_color2 {
      background: url('../../../../assets/img/beijingse_2.png');
      background-size: 5px 5px; /* no */
      position: relative;
    }
 
    .gl_line_color3 {
      background: url('../../../../assets/img/beijingse_3.png');
      background-size: 5px 5px; /* no */
      position: relative;
    }
 
    .gl_line_color4 {
      background: url('../../../../assets/img/beijingse_4.png');
      background-size: 5px 5px; /* no */
      position: relative;
    }
 
    .gl_line_color5 {
      background: url('../../../../assets/img/beijingse_5.png');
      background-size: 5px 5px; /* no */
      position: relative;
    }
 
    .gl_line_color6 {
      background: url('../../../../assets/img/beijingse_6.png');
      background-size: 2px 2px; /* no */
      position: relative;
    }
 
    .gl_line_num {
      top: 20px; /* no */
      position: absolute;
    }
 
    .gl_line_num1 {
      top: -25px; /* no */
      position: absolute;
    }
 
    .gl_line_ball {
      width: 24px; /* no */
      height: 24px; /* no */
      position: absolute;
      border: 2px solid #fff; /* no */
      border-radius: 21px; /* no */
      top: -1px;/* no */
      z-index: 3;
    }
 
    .gl_line_ball_xiao {
      background: url('../../../../assets/img/xiaolian.svg') no-repeat;
      background-color: #fff;
      background-size: 24px 24px; /* no */
      background-position: -1px -1px; /* no */
      width: 24px; /* no */
      height: 24px; /* no */
      position: absolute;
      border: 1px solid #ff8181;
      border-radius: 16px; /* no */
      top: -4px; /* no */
      z-index: 3;
    }
 
    .gl_line_ball_ku {
      background: url('../../../../assets/img/kulian.svg') no-repeat;
      background-color: #fff;
      background-size: 26px 26px; /* no */
      background-position: -2px -2px; /* no */
      width: 24px; /* no */
      height: 24px; /* no */
      position: absolute;
      border: 1px solid #ff8181; /* no */
      border-radius: 16px; /* no */
      top: -4px; /* no */
      z-index: 3;
    }
  }
}
 
.gl_evaluate {
  margin-top: 30px; /* no */
}
 
.cut_button_list {
  height: 26px; /* no */
  border-radius: 6px; /* no */
  padding: 10px 0; /* no */
  height: 46px; /* no */
 
  .cut_button_item {
    cursor: pointer;
    font-size: 12px; /* no */
    line-height: 1;
    color: #00BCCD;
    display: inline-block;
    padding: 9px 14px; /* no */
    border: 1px solid #00BCCD;
    margin-left: -1px; /* no */
  }
 
  .cut_button_item:first-child {
    margin-left: 0; /* no */
    border-radius: 6px 0 0 6px; /* no */
  }
 
  .cut_button_item:last-child {
    border-radius: 0 6px 6px 0; /* no */
  }
 
  .cut_button_active {
    color: #fff;
    background: #00BCCD;
  }
}
 
.general_box {
  float: left;
}
 
.general_box {
  margin: 20px 12px 0 12px; /* no */
}
 
.isB {
  letter-spacing: 1px; /* no */
}
 
.heightChartTitle {
  height: 30px; /* no */
  width: 115%;
  line-height: 30px; /* no */
  font-size: 14px; /* no */
 
  .titleLeft {
    float: left;
    position: relative;
    margin-left: 37px; /* no */
    .titleBlock{
        position: absolute;
        width: 25px;/*no*/
        overflow: hidden;
        left: -32px; /* no */
        top: 13px; /* no */
        height: 4px; /* no */
        display: flex;
    }
  }
 
  .titleReft {
    float: left;
    position: relative;
    margin-left: 120px; /* no */
    .titleLine{
        position: absolute;
        width: 25px;/*no*/
        overflow: hidden;
        left: -32px; /* no */
        top: 14px; /* no */
        height: 4px; /* no */
        display: flex;
    }
  }
}
 
.canvasBox {
  width: 496px; /* no */
  height: 266px; /* no */
  position: relative;
  top: -4px;/* no */
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
  }
}
.pdfTable_gray {
  .general_tabColr_child2{
    right: -14px; /* no */
    background: url('../../../../assets/img/jiantou_black.svg') no-repeat;
  }
  .general_tabColr_child3{
    right: -14px; /* no */
    background: url('../../../../assets/img/jiantou_black.svg') no-repeat;
  }
  .general_tabColr {  
    font-size:22px;/* no */
    color: #313131;
  }
 
  .general_tabColr2 {  
    font-size:22px;/* no */
    color: #313131;
  }
 
 .general_tabColr_child {
     top: -1px;/* no */
  //font-size: 18px; /* no */
  border: 2px solid #313131; /* no */
  color: #313131;
 }
 
 
  .general_tabColr3 {
    font-size:22px;/* no */
    color: #313131;
  }
  .general_tabColr_child3_1 {
    border: 2px solid #313131; /* no */
    color: #313131;
  }
  .lineHsize {
    line-height: 22px !important; /* no */
    //font-size: 16px !important; /* no */
  }
 
  .ft14 {
    font-size: 28px !important; /* no */
  }
 
  .ft16 {
    font-size: 32px !important; /* no */
  }
 
  .general_head_logo {
    top: 65px !important; /* no */
  }
 
  .general_info_top {
    font-size: 18px !important; /* no */
  }
 
  .info_dec_txt {
    font-size: 18px !important; /* no */
 
    .isB {
      font-size: 18px !important; /* no */
    }
  }
 
  .content_list {
    .general_info_title {
      span {
        font-size: 24px !important; /* no */
      }
    }
 
    .general_info_message {
      margin-top: 6px !important;
      font-size: 18px !important; /* no */
    }
 
    .triangle {
      top: 12px !important; /* no */
    }
 
    // .general_tabColr_child {
    //   top: 0px !important; /* no */
    // }
 
    #conclusionHtmlGeneral {
      font-size: 18px !important; /* no */
    }
  }
}
.pdfTable {
  .general_tabColr {
    font-size:22px;/* no */
  }
 
  .general_tabColr2 {
    font-size:22px;/* no */
  }
 
 .general_tabColr_child {
     top: -1px;/* no */
  //font-size: 18px; /* no */
 }
 
 
  .general_tabColr3 {
    font-size:22px;/* no */
  }
  // .general_tabColr_child3_1 {
  //   font-size: 18px; /* no */
  // }
  .lineHsize {
    line-height: 22px !important; /* no */
    //font-size: 16px !important; /* no */
  }
 
  .ft14 {
    font-size: 28px !important; /* no */
  }
 
  .ft16 {
    font-size: 32px !important; /* no */
  }
 
  .general_head_logo {
    top: 65px !important; /* no */
  }
 
  .general_info_top {
    font-size: 18px !important; /* no */
  }
 
  .info_dec_txt {
    font-size: 18px !important; /* no */
 
    .isB {
      font-size: 18px !important; /* no */
    }
  }
 
  .content_list {
    .general_info_title {
      span {
        font-size: 24px !important; /* no */
      }
    }
 
    .general_info_message {
      margin-top: 6px !important;
      font-size: 18px !important; /* no */
    }
 
    .triangle {
      top: 12px !important; /* no */
    }
 
    // .general_tabColr_child {
    //   top: 0px !important; /* no */
    // }
 
    #conclusionHtmlGeneral {
      font-size: 18px !important; /* no */
    }
  }
}
 
/* 导出样式 */
.general_table {
  margin: 0 auto;
  width: 1190px; /* no */
  padding: 0 75px 0 75px; /* no */
  color: #313131;
}
 
.general_head {
  width: 100%;
  position: relative;
  z-index:0;
}
 
.general_h1 {
  font-weight: 600;
  font-size: 20px; /* no */
  line-height: 1.5;
}
.ft14 {
  font-size: 18px; /* no */
}
 
.ft16 {
  font-size: 20px; /* no */
}
.content_list {
  p {
    font-size: 14px; /* no */
    text-align: left;
  }
}
 
.general_head_logo {
  position: absolute;
  top: 32px; /* no */
  left: 0px; /* no */
  max-width: 180px; /* no */
  max-height: 80px; /* no */
}
 
.general_info_top {
  border-bottom: 2px solid #313131; /* no */
  text-align: right;
  padding-bottom: 6px; /* no */
 
  span {
    margin-left: 20px; /* no */
  }
}
 
.general_info_dec {
  display: flex;
  justify-content: space-between;
  font-size: 14px; /* no */
  text-align: left;
  line-height: 1; /* no */
  margin-top: 14px; /* no */
  margin-bottom: 4px;/* no */
 
  span b {
    display: inline-block;
    width: 60px; /* no */
    text-align: justify;
    text-align-last: justify;
  }
 
  .info_dec_txt {
    display: inline-block;
  }
}
 
.general_info_title {
  border-bottom: 1px solid #313131; /* no */
  line-height: 1; /* no */
  padding: 38px 0 4px 0; /* no */
 
  span {
    /* width: 100%; */
    font-weight: bold;
    font-size: 16px; /* no */
    letter-spacing: 1px; /* no */
  }
 
  button {
    margin-bottom: 2px; /* no */
  }
 
  .info_t_s {
    font-style: normal;
    font-size: 12px; /* no */
  }
}
 
.general_info_message {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  margin-top: 6px;/* no */
 
  .evaluate {
    width: 465px; /* no */
    /*min-height: 36px; */
    padding-left: 0; /* no */
    margin-top: 11px; /* no */
  }
 
  .info_m_s_txt_sbd {
    width: 480px; /* no */
    height: 36px; /* no */
    padding-left: 15px; /* no */
    line-height: 34px; /* no */
    position: relative;
    overflow: hidden;
    .line{
        position: absolute;
        bottom: 6px;/*no*/
        left: 0;
        right: 0;
        height: 1px;/*no*/
        display: flex;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .triangle {
      position: absolute;
      transform: rotate(45deg);
      width: 10px; /* no */
      height: 10px; /* no */
      top: 11px; /* no */
      left: -6px; /* no */
      background-color: #313131;
    }
  }
 
  .info_m_left {
    overflow: hidden;
    float: left;
  }
 
  .info_m_right {
    float: right;
  }
 
  ul li {
    min-width: 465px; /* no */
    min-height: 36px; /* no */
    padding-left: 15px; /* no */
    line-height: 36px; /* no */
    position: relative;
    overflow: hidden;
    .line{
        position: absolute;
        bottom: 4px;/*no*/
        left: 0;
        right: 0;
        height: 1px;/*no*/
        display: flex;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .triangle {
      position: absolute;
      transform: rotate(45deg);
      width: 10px; /* no */
      height: 10px; /* no */
      top: 13px; /* no */
      left: -6px; /* no */
      background-color: #313131;
    }
  }
 
  .info_left {
    width: 496px; /* no */
  }
 
  .info_left_txt {
    width: 480px; /* no */
  }
 
  .info_right {
    width: 480px; /* no */
 
    .lineHsize {
      line-height: 18px;/* no */
    }
  }
}
 .font_weight{
    font-weight:bold;
  }
 
/* 导出样式 */
/* 2021/2/22end---------------------------------------- */
</style>