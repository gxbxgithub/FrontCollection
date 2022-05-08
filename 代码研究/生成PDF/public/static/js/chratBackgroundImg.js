 const imgInfo = {
	
	hrgitEvaluate:[ //---------身高评价图部分 ------------
		[ //无骨龄报告 tw3或g-p骨龄报告
			{//data赋值示例[{x:0,y:40-40},{x:0.4,y:50-40}] x,y-40	
        			id:'',	//canvas标签 id
        			data:[],
                                imgName:'noBone_1.jpg', //图片名称
                                age:'0-2', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:2,  //x轴刻度数
                                yScale:60, //y轴刻度数
                                left:158, //原图图表左边距
                                top:54, //原图图表上边距
                                right:60, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:2-2,y:80-80},{x:3-2,y:90-80}] x-2,y-80
				id:'',	//canvas标签 id
				data:[],
                                imgName:'noBone_2.jpg', //图片名称
                                age:'2-7', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:5,  //x轴刻度数
                                yScale:60, //y轴刻度数
                                left:158, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:7-7,y:110-110},{x:8-7,y:120-110}] x-7,y-110
				id:'',	//canvas标签 id
				data:[],
                                imgName:'noBone_3.jpg', //图片名称
                                age:'7-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:11,  //x轴刻度数
                                yScale:80, //y轴刻度数
                                left:158, //原图图表左边距
                                top:54, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:0,y:40-40},{x:1,y:50-40}] x,y-40
				id:'',	//canvas标签 id
				data:[],
                                imgName:'noBone_4.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:160, //y轴刻度数
                                left:158, //原图图表左边距
                                top:54, //原图图表上边距
                                right:60, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:0,y:45-45},{x:0.4,y:55-45}]	
				id:'',	//canvas标签 id
				data:'',
                                imgName:'noBone_5.jpg', //图片名称
                                age:'0-2', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:2,  //x轴刻度数
                                yScale:50, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:60, //原图图表右边距
                                bottom:140, //原图图表下边距
			},
			{//data赋值示例[{x:2-2,y:80-80},{x:3-2,y:90-80}] x-2,y-80
				id:'',	//canvas标签 id
				data:'',
                                imgName:'noBone_6.jpg', //图片名称
                                age:'2-7', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:5,  //x轴刻度数
                                yScale:60, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:7-7,y:110-110},{x:8-7,y:120-110}] x-7,y-110
				id:'',	//canvas标签 id
				data:'',
                                imgName:'noBone_7.jpg', //图片名称
                                age:'7-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:11,  //x轴刻度数
                                yScale:70, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:138, //原图图表下边距
			},
			{//data赋值示例[{x:0,y:40-40},{x:1,y:50-40}] x,y-40
				id:'',	//canvas标签 id
				data:'',
                                imgName:'noBone_8.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:140, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
			},
		],
		[ //骨龄报告 rus-chn或tw3-c rus骨龄报告
			{//data赋值示例[{x:3-3,y:80-80},{x:4-3,y:90-80}] x-3,y-80	
				id:'',	//canvas标签 id
				data:'',
				type:'RUS-CHN',
                                imgName:'bone_1.jpg', //图片名称
                                age:'3-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:120, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:141, //原图图表下边距
			},
			{//data赋值示例[{x:1-1,y:80*2-160},{x:2-1,y:90*2-160}] x-1,y*2-160	
				id:'',	//canvas标签 id
				data:'',
				type:'RUS-CHN',
                                imgName:'bone_2.jpg', //图片名称
                                age:'1-15', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:115, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
			},
			{//data赋值示例[{x:3-3,y:80-80},{x:4-3,y:90-80}] x-3,y-80	
				id:'',	//canvas标签 id
				data:'',
				type:'TW3-C RUS',
                                imgName:'bone_3.jpg', //图片名称
                                age:'3-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:120, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:141, //原图图表下边距
			},
			{//data赋值示例[{x:1-1,y:80*2-160},{x:2-1,y:90*2-160}] x-1,y*2-160	
				id:'',	//canvas标签 id
				data:'',
				type:'TW3-C RUS',
                                imgName:'bone_4.jpg', //图片名称
                                age:'1-15', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:115, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
			},
		] 
	],
	//---------身高评价图部分end------------
	general:{//通用报告
		shenGao_th:[//身高百分位曲线图
			{//data赋值示例[{x:0,y:40-40},{x:1,y:50-40}] x,y-40	
                		id:'',	//canvas标签 id
                		data:'',
                                imgName:'noBone_4.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:160, //y轴刻度数
                                left:158, //原图图表左边距
                                top:54, //原图图表上边距
                                right:60, //原图图表右边距
                                bottom:139, //原图图表下边距
			},
			{//data赋值示例[{x:0,y:40-40},{x:1,y:50-40}] x,y-40	
				id:'',	//canvas标签 id
				data:'',
                                imgName:'noBone_8.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:140, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
			}
		],
		tiZhong_th:[//体重百分位曲线图
			{//data赋值示例[{x:0,y:0},{x:1,y:10}] x,y
				id:'',	//canvas标签 id
				data:'',
                                imgName:'tiZhong_th_m.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:90, //y轴刻度数
                                left:159, //原图图表左边距
                                top:54, //原图图表上边距
                                right:60, //原图图表右边距
                                bottom:140, //原图图表下边距
			},
			{//data赋值示例[{x:0,y:0},{x:1,y:10}] x,y
				id:'',	//canvas标签 id
				data:'',
                                imgName:'tiZhong_th_w.jpg', //图片名称
                                age:'0-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:80, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
			}
		],
                BMI_th:[//BMI百分位曲线图
                        {//data赋值示例[{x:1-1,y:11-11},{x:2-1,y:13-11}] x-1,y-11
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'BMI_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:25, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:11-11},{x:2-1,y:13-11}] x-1,y-11
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'BMI_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:23, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        }
                ],
                gulingH_th:[//骨龄身高百分位曲线图
                        {//data赋值示例[{x:3-3,y:80-80},{x:4-3,y:90-80}] x-3,y-80
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'bone_1.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:120, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:141, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:80-70},{x:2-1,y:90-70}] x-1,y-70
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'bone_2.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:115, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:80-80},{x:4-3,y:90-80}] x-3,y-80
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'bone_3.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:120, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:141, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:80-70},{x:2-1,y:90-70}] x-1,y-70
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'bone_4.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:115, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                ],
                gulingW_th:[//骨龄体重百分位曲线图
                        {//data赋值示例[{x:3-3,y:10-5},{x:4-3,y:20-5}] x-3,y-5
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glW_RUS_CHN_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:105, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:62, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:10-10},{x:4-3,y:20-10}] x-3,y-10
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glW_RUS_CHN_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:80, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:10-5},{x:4-3,y:20-5}] x-3,y-5
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glW_TW3_C_RUS_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:105, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:62, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:10-10},{x:4-3,y:20-10}] x-3,y-10
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glW_TW3_C_RUS_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:80, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        },
                ],
                gulingBMI_th:[//骨龄BMI百分位曲线图
                        {//data赋值示例[{x:3-3,y:10-10},{x:4-3,y:12-10}] x-3,y-10
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glBMI_RUS_CHN_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:26, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:11-11},{x:4-3,y:12-10}] x-3,y-11
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glBMI_RUS_CHN_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:24, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:10-10},{x:4-3,y:12-10}] x-3,y-10
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glBMI_TW3_C_RUS_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15,  //x轴刻度数
                                yScale:26, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:3-3,y:11-11},{x:4-3,y:12-11}] x-3,y-10
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'glBMI_TW3_C_RUS_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:24, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                ],
                amendH_th:[//父母身高修正的身高百分位数
                        {//data赋值示例[{x:150-150,y:-6+6},{x:160-150,y:-5+6}] x-150,y+6
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'amendH_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:35,  //x轴刻度数
                                yScale:12, //y轴刻度数
                                left:160, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:150-150,y:-6+6},{x:160-150,y:-5+6}] x-150,y+6
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'amendH_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:35,  //x轴刻度数
                                yScale:12, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        }
                ],
                RUS_CHN_th:[//RUS-CHN百分位曲线图
                        {//data赋值示例[{x:1-1,y:0},{x:2-1,y:100}] x-1,y
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'RUS-CHN_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18.5,  //x轴刻度数
                                yScale:1000, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:0},{x:2-1,y:100}] x-1,y
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'RUS-CHN_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:18,  //x轴刻度数
                                yScale:1000, //y轴刻度数
                                left:158, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:141, //原图图表下边距
                        }
                ],
                TW3_C_RUS:[//TW3-C RUS百分位曲线图
                        {//data赋值示例[{x:2-2,y:0},{x:3-2,y:100}] x-2,y-150
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_RUS_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:16,  //x轴刻度数
                                yScale:1000, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:59, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:0},{x:2-1,y:100}] x-1,y
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_RUS_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:15.5,  //x轴刻度数
                                yScale:1000, //y轴刻度数
                                left:160, //原图图表左边距
                                top:57, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        }
                ],
                TW3_C_Carpal:[//父母身高修正的身高百分位数
                        {//data赋值示例[{x:1-1,y:150-150},{x:2-1,y:200-50}] x-1,y-150
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_Carpal_th_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:14,  //x轴刻度数
                                yScale:850, //y轴刻度数
                                left:160, //原图图表左边距
                                top:56, //原图图表上边距
                                right:62, //原图图表右边距
                                bottom:141, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:0},{x:2-1,y:100-100}] x-1,y-100
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_Carpal_th_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:12,  //x轴刻度数
                                yScale:879, //y轴刻度数
                                left:159, //原图图表左边距
                                top:57, //原图图表上边距
                                right:64, //原图图表右边距
                                bottom:140, //原图图表下边距
                        }
                ],
                TW3_C_RUS_wg:[//TW3-C RUS与腕骨骨龄差值
                        {//data赋值示例[{x:2-1.5,y:-3+3.5},{x:2-1,y:-2+3.5}] x-1.5,y+3.5
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_RUS_wg_m.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'男', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:12.5,  //x轴刻度数
                                yScale:8, //y轴刻度数
                                left:159, //原图图表左边距
                                top:56, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:140, //原图图表下边距
                        },
                        {//data赋值示例[{x:1-1,y:-3+3},{x:2-1,y:-2+3}] x-1,y+3
                                id:'',  //canvas标签 id
                                data:'',
                                imgName:'TW3_C_RUS_wg_w.jpg', //图片名称
                                age:'1-18', //原图图表左边距
                                sex:'女', //原图图表左边距
                                imgWidth:2481, //原图宽度
                                imgheight:1300, //原图高读
                                xScale:11,  //x轴刻度数
                                yScale:7, //y轴刻度数
                                left:159, //原图图表左边距
                                top:55, //原图图表上边距
                                right:61, //原图图表右边距
                                bottom:139, //原图图表下边距
                        }
                ],
	}
}

export {imgInfo};