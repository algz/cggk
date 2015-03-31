TestCourseApprovalObjectPanel = {
	inputWidth:120,
	limit:6
};

TestCourseApprovalObjectPanel.init = function(id){
	var acceptId = id.substring(0,id.length-1);
	var acceptState = id.substring(id.length-1,id.length);
	var formPanel = '';
	if(acceptState==5){
		TestCourseApprovalObjectPanel.acceptTaskMsg = new Ext.form.FormPanel({
			frame:true,
			border:true,
			style:'border:none;',
			buttonAlign:'center',
			autoScroll:true,
			//允许上传
			fileUpload:true,
			items:[
				{
					layout:'column',
					items:[
						{
							columnWidth:.98,
							layout:'form',
							items:[{
								xtype:'datefield',
								name:'testCourseTime',
								fieldLabel:'时间',
								format:'Y-m-d',
								value:new Date(),
								readOnly:true,
								width:TestCourseApprovalObjectPanel.inputWidth
							}]
						}
					]
				}
			]
		});
		
		Ext.Ajax.request({
			url:'../JSON/TestCourseRemote.getTestCourse',
			method:'POST',
			failure:function(){
				Ext.MessageBox.show({
							title : '提示信息',
							msg : '获取后台数据失败！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			},
			success:function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				//判断是否存在值
				if(result.success=='true'){
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('testCourseTime').setValue(result.testCourseTime);
					
					var ID = result.testCourseDocumentId;
					var ORIGINALNAME = result.testCourseDocument;
					//建立当前上传文件的查看路径
					var path = new Ext.Panel({
						html:'<font color="red">上传文件下载地址：</font>'+"<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
									+ ID
									+ "&ORIGINALNAME="
									+ encodeURI(encodeURI(ORIGINALNAME))
									+ "' cursor：hand>" + result.testCourseDocument + "</a>"
					});
					//编号赋值
					TestCourseApprovalObjectPanel.testCourseId=result.testCourseId;
					
					TestCourseApprovalObjectPanel.acceptTaskMsg.add(path);
					TestCourseApprovalObjectPanel.acceptTaskMsg.doLayout();
				}
			},
			disableCaching : true,
			autoAbort : true,
			params:{
				acceptId:acceptId
			}
		});
		
		formPanel = TestCourseApprovalObjectPanel.acceptTaskMsg;
	}
	if(acceptState==8){
		/**
		 * 使用单位信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectDepartment = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/FixConditionRemote.getDepList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'depcode'
					}, {
						name : 'departmentName'
					} 
					])
			});
			
			var selectDepartmentValue = new Ext.form.ComboBox({
				id:'assetConnectDepartmentValueComboBox',
				name:'h_depcode',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'depcode',
				fieldLabel:'使用单位(<font color="red">*</font>)',
				store:store,
				valueField : "depcode",
				displayField : "departmentName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'必须指派单位！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectDepartmentValue;
		};
		
		/**
		 * 检验员信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectJianYanYuan = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectJianYanYuan',
				name:'h_acJianYanYuan',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acJianYanYuan',
				fieldLabel:'检验员(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'检验员为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
	
		/**
		 * 移交单位负责人信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectYiJiaoFuZe = function(){
		
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
		
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectYiJiaoFuZe',
				name:'h_acYiJiaoDanWeiFuZeRen',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acYiJiaoDanWeiFuZeRen',
				fieldLabel:'移交单位负责人(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'移交单位负责人为必填项！',
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
	};
	
		/**
		 * 移交单位经办人信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectYiJiaoJingBan = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectYiJiaoJingBan',
				name:'h_acYiJiaoDanWeiJingBanRen',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acYiJiaoDanWeiJingBanRen',
				fieldLabel:'移交单位经办人(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'移交单位经办人为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
	
		/**
		 * 资产使用单位负责人信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectUseFuZe = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectUseFuZe',
				name:'h_acShiYongDanWeiFuZeRen',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acShiYongDanWeiFuZeRen',
				fieldLabel:'资产使用单位负责人(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产使用单位负责人为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
		
		/**
		 * 资产使用单位管理员信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectUseAdmin = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectUseAdmin',
				name:'h_acShiYongDanWeiGuanLiYuan',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acShiYongDanWeiGuanLiYuan',
				fieldLabel:'资产使用单位管理员(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产使用单位管理员为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
		
		/**
		 * 资产使用单位会计员信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectUseKuaiJi = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectUseKuaiJi',
				name:'h_acShiYongDanWeiKuaiJiYuan',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acShiYongDanWeiKuaiJiYuan',
				fieldLabel:'资产使用单位会计员(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产使用单位会计员为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
						}
					}
				});
				
				return selectWorkPeopelValue;
			};
			
			/**
			 * 资产主管部门负责人信息
			 * @return {}
			 */
			TestCourseApprovalObjectPanel.selectDirectorFuZe = function(){
				
				var store = new Ext.data.Store( {
					proxy : new Ext.data.HttpProxy( {
						url : "../JSON/GroupPaymentTaskRemote.getUserList",
						method:'POST'
					}),
					reader : new Ext.data.JsonReader({
						totalProperty : 'totalProperty',
						root : 'results'
						}, 
						[{
							name : 'userId'
						}, {
							name : 'trueName'
						} 
						])
				});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectDirectorFuZe',
				name:'h_acZhuGuanBuMenFuZeRen',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acZhuGuanBuMenFuZeRen',
				fieldLabel:'资产主管部门负责人(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产主管部门负责人为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
		
		/**
		 * 资产主管部门经办人信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectDirectorJingBan = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectDirectorJingBan',
				name:'h_acZhuGuanBuMenJingBanRen',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acZhuGuanBuMenJingBanRen',
				fieldLabel:'资产主管部门经办人(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产主管部门经办人为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
		
		/**
		 * 资产主管部门领导信息
		 * @return {}
		 */
		TestCourseApprovalObjectPanel.selectDirectorLingDao = function(){
			
			var store = new Ext.data.Store( {
				proxy : new Ext.data.HttpProxy( {
					url : "../JSON/GroupPaymentTaskRemote.getUserList",
					method:'POST'
				}),
				reader : new Ext.data.JsonReader({
					totalProperty : 'totalProperty',
					root : 'results'
					}, 
					[{
						name : 'userId'
					}, {
						name : 'trueName'
					} 
					])
			});
			
			var selectWorkPeopelValue = new Ext.form.ComboBox({
				id:'selectDirectorLingDao',
				name:'h_acZhuGuanBuMenLingDao',
				//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
				hiddenName:'acZhuGuanBuMenLingDao',
				fieldLabel:'资产主管部门领导(<font color="red">*</font>)',
				store:store,
				valueField : "userId",
				displayField : "trueName",
				mode:'remote',
				//每页显示数目
				pageSize:TestCourseApprovalObjectPanel.limit,
				forceSelection : true,
				triggerAction : 'all',
				width:TestCourseApprovalObjectPanel.inputWidth,
				emptyText : '请选择...',
				//弹出选择添加缩放按钮
				resizable :true,
				//控制下拉列表的宽度
				minListWidth:TestCourseApprovalObjectPanel.inputWidth*2.5,
				//校验是否为空
				allowBlank:false,
				blankText:'资产主管部门领导为必填项！', 
				readOnly:true,
				listeners : {
					'keyup':function(){
						store.baseParams.inputValue=this.getRawValue();
						store.load({
							params:{
								start:0,
								limit:TestCourseApprovalObjectPanel.limit
							}
						});
						this.expand();
					}
				}
			});
			
			return selectWorkPeopelValue;
		};
		
		TestCourseApprovalObjectPanel.acceptTaskMsg = new Ext.form.FormPanel({
			frame:true,
			border:true,
			style:'border:none;',
			buttonAlign:'center',
			autoScroll:true,
			items:[
				{
					layout:'column',
					items:[
						{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.49,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectDepartment()]
								},{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'datefield', 
										name:'acTime',
										format:'Y-m-d',
										fieldLabel:'填写日期',
										width:TestCourseApprovalObjectPanel.inputWidth*1.15,
					            		value:new Date(),
					            		readOnly:true
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acFeiYongNum',
										fieldLabel:'费用（任务）编号',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acZhiZaoNum',
										fieldLabel:'制造编号',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								}
							]
						},{
							columnWidth:.98,
							xtype:'fieldset',
							title:'物资信息',
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'contractName',
										fieldLabel:'名称',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'contractXingHao',
										fieldLabel:'型号',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'contractGuiGe',
										fieldLabel:'规格',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acDianJiNum',
										fieldLabel:'电机数量',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJianZuMianJi',
										fieldLabel:'建筑面积',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acShiYongMianJi',
										fieldLabel:'使用面积',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								}
							]
						},{
							columnWidth:.98,
							xtype:'fieldset',
							title:'计划成本',
							layout:'column',
							items:[
								{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJiHuaShebei',
										fieldLabel:'设备费',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJiHuaAnZhuang',
										fieldLabel:'安装费',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								}
							]
						},{
							columnWidth:.98,
							xtype:'fieldset',
							title:'实际成本',
							layout:'column',
							items:[
								{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acShiJiSheBei',
										fieldLabel:'设备费',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								},{
									columnWidth:.49,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acShiJiAnZhuang',
										fieldLabel:'安装费',
										width:TestCourseApprovalObjectPanel.inputWidth,
										readOnly:true
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acZhiZaoDanWei',
										fieldLabel:'制造（国别）单位',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJianZhuJieGou',
										fieldLabel:'建筑结构',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acZheJiu',
										fieldLabel:'已经折旧',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								}
							]
						}
						,{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJiLiangDanWei',
										fieldLabel:'计量单位',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acNum',
										fieldLabel:'数量',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'datefield', 
										name:'acZhiZaoTime',
										fieldLabel:'制造年月',
										format:'Y-m-d',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth*1.15,
										emptyText : '请选择...'
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acCengCi',
										fieldLabel:'层次',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acShiGongFangFa',
										fieldLabel:'施工方法',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acGongChengDiDian',
										fieldLabel:'工程地点',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield',
										name:'acTuZhiShuLiang',
										fieldLabel:'图纸(说明书)数量',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acGongChengNeiRong',
										fieldLabel:'工程内容',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acJianYanJieGuo',
										fieldLabel:'检(试)验结果',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acFuJian',
										fieldLabel:'附件及附属设备',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectJianYanYuan()]
								},{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'textfield', 
										name:'acAnZhuangDanWei',
										fieldLabel:'设备安装单位',
										width:TestCourseApprovalObjectPanel.inputWidth
									}]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.33,
									layout:'form',
									items:[{
										xtype:'datefield', 
										format:'Y-m-d',
										name:'acYiJiaoShiYongTime',
										fieldLabel:'正式移交使用时间',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth*1.15,
										emptyText : '请选择...'
									}]
								},{
									columnWidth:.33,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectYiJiaoFuZe()]
								},{
									columnWidth:.33,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectYiJiaoJingBan()]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.25,
									layout:'form',
									items:[{
										xtype:'datefield', 
										format:'Y-m-d',
										name:'acJieShouFenGuanTime',
										fieldLabel:'正式接受分管时间',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth*1.15,
										emptyText : '请选择...'
									}]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectUseFuZe()]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectUseAdmin()]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectUseKuaiJi()]
								}
							]
						},{
							columnWidth:.98,
							layout:'column',
							items:[
								{
									columnWidth:.25,
									layout:'form',
									items:[{
										xtype:'datefield', 
										format:'Y-m-d',
										name:'acJieShouZhuGuanTime',
										fieldLabel:'正式接受主管时间',
										readOnly:true,
										width:TestCourseApprovalObjectPanel.inputWidth*1.15,
										emptyText : '请选择...'
									}]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectDirectorFuZe()]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectDirectorJingBan()]
								},{
									columnWidth:.25,
									layout:'form',
									items:[TestCourseApprovalObjectPanel.selectDirectorLingDao()]
								}
							]
						}
					]
				}
			]
		});
		
		//判断是否已经存在内容
		Ext.Ajax.request({
			url:'../JSON/AssetConnectRemote.getAssetConnect',
			method:'POST',
			failure:function(){
				Ext.MessageBox.show({
							title : '提示信息',
							msg : '获取后台数据失败！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			},
			success:function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				
				var selectDepartment = Ext.getCmp('assetConnectDepartmentValueComboBox');
				var selectJianYanYuan = Ext.getCmp('selectJianYanYuan');
				var selectYiJiaoFuZe = Ext.getCmp('selectYiJiaoFuZe');
				var selectYiJiaoJingBan = Ext.getCmp('selectYiJiaoJingBan');
				var selectUseFuZe = Ext.getCmp('selectUseFuZe');
				var selectUseAdmin = Ext.getCmp('selectUseAdmin');
				var selectUseKuaiJi = Ext.getCmp('selectUseKuaiJi');
				var selectDirectorFuZe = Ext.getCmp('selectDirectorFuZe');
				var selectDirectorJingBan = Ext.getCmp('selectDirectorJingBan');
				var selectDirectorLingDao = Ext.getCmp('selectDirectorLingDao');
				
				//判断是否存在值
				if(result.success=='true'){
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acTime').setValue(result.acTime);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acFeiYongNum').setValue(result.acFeiYongNum);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhiZaoNum').setValue(result.acZhiZaoNum);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('contractName').setValue(result.contractName);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('contractXingHao').setValue(result.contractXingHao);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('contractGuiGe').setValue(result.contractGuiGe);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acDianJiNum').setValue(result.acDianJiNum);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJianZuMianJi').setValue(result.acJianZuMianJi);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiYongMianJi').setValue(result.acShiYongMianJi);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJiHuaShebei').setValue(result.acJiHuaShebei);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJiHuaAnZhuang').setValue(result.acJiHuaAnZhuang);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiJiSheBei').setValue(result.acShiJiSheBei);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiJiAnZhuang').setValue(result.acShiJiAnZhuang);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhiZaoDanWei').setValue(result.acZhiZaoDanWei);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJianZhuJieGou').setValue(result.acJianZhuJieGou);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZheJiu').setValue(result.acZheJiu);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJiLiangDanWei').setValue(result.acJiLiangDanWei);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acNum').setValue(result.acNum);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhiZaoTime').setValue(result.acZhiZaoTime);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acCengCi').setValue(result.acCengCi);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiGongFangFa').setValue(result.acShiGongFangFa);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acGongChengDiDian').setValue(result.acGongChengDiDian);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acTuZhiShuLiang').setValue(result.acTuZhiShuLiang);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acGongChengNeiRong').setValue(result.acGongChengNeiRong);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJianYanJieGuo').setValue(result.acJianYanJieGuo);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acFuJian').setValue(result.acFuJian);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acAnZhuangDanWei').setValue(result.acAnZhuangDanWei);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acYiJiaoShiYongTime').setValue(result.acYiJiaoShiYongTime);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJieShouFenGuanTime').setValue(result.acJieShouFenGuanTime);
					TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJieShouZhuGuanTime').setValue(result.acJieShouZhuGuanTime);
					
					//默认加载一次下拉列表（加载使用单位）
	//				selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
					selectDepartment.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.depcode
						},
						callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('depcode').setValue(result.depcode);
						}
					});
					
					//默认加载一次下拉列表（加载检验员）
	//				selectJianYanYuan.store.baseParams.inputValue=selectJianYanYuan.getRawValue();
					selectJianYanYuan.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acJianYanYuan
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acJianYanYuan').setValue(result.acJianYanYuan);
						}
					});
					
					//默认加载一次下拉列表（加载移交单位负责人）
	//				selectYiJiaoFuZe.store.baseParams.inputValue=selectYiJiaoFuZe.getRawValue();
					selectYiJiaoFuZe.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acYiJiaoDanWeiFuZeRen
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acYiJiaoDanWeiFuZeRen').setValue(result.acYiJiaoDanWeiFuZeRen);
						}
					});
					
					//默认加载一次下拉列表（加载移交单位经办人）
	//				selectYiJiaoJingBan.store.baseParams.inputValue=selectYiJiaoJingBan.getRawValue();
					selectYiJiaoJingBan.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acYiJiaoDanWeiJingBanRen
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acYiJiaoDanWeiJingBanRen').setValue(result.acYiJiaoDanWeiJingBanRen);
						}
					});
					
					//默认加载一次下拉列表（加载资产使用单位负责人）
	//				selectUseFuZe.store.baseParams.inputValue=selectUseFuZe.getRawValue();
					selectUseFuZe.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acShiYongDanWeiFuZeRen
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiYongDanWeiFuZeRen').setValue(result.acShiYongDanWeiFuZeRen);
						}
					});
					
					//默认加载一次下拉列表（加载资产使用单位管理员）
	//				selectUseAdmin.store.baseParams.inputValue=selectUseAdmin.getRawValue();
					selectUseAdmin.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acShiYongDanWeiGuanLiYuan
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiYongDanWeiGuanLiYuan').setValue(result.acShiYongDanWeiGuanLiYuan);
						}
					});
					
					//默认加载一次下拉列表（加载资产使用单位会计员）
	//				selectUseKuaiJi.store.baseParams.inputValue=selectUseKuaiJi.getRawValue();
					selectUseKuaiJi.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acShiYongDanWeiKuaiJiYuan
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acShiYongDanWeiKuaiJiYuan').setValue(result.acShiYongDanWeiKuaiJiYuan);
						}
					});
					
					//默认加载一次下拉列表（加载资产主管部门负责人）
	//				selectDirectorFuZe.store.baseParams.inputValue=selectDirectorFuZe.getRawValue();
					selectDirectorFuZe.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acZhuGuanBuMenFuZeRen
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhuGuanBuMenFuZeRen').setValue(result.acZhuGuanBuMenFuZeRen);
						}
					});
					
					//默认加载一次下拉列表（加载资产主管部门经办人）
	//				selectDirectorJingBan.store.baseParams.inputValue=selectDirectorJingBan.getRawValue();
					selectDirectorJingBan.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acZhuGuanBuMenJingBanRen
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhuGuanBuMenJingBanRen').setValue(result.acZhuGuanBuMenJingBanRen);
						}
					});
					
					//默认加载一次下拉列表（加载资产主管部门领导）
	//				selectDirectorLingDao.store.baseParams.inputValue=selectDirectorLingDao.getRawValue();
					selectDirectorLingDao.store.load({
						params:{
							start:0,
							limit:TestCourseApprovalObjectPanel.limit,
							inputValueNum:result.acZhuGuanBuMenLingDao
						},callback:function(){
							TestCourseApprovalObjectPanel.acceptTaskMsg.getForm().findField('acZhuGuanBuMenLingDao').setValue(result.acZhuGuanBuMenLingDao);
						}
					});
				}
			},
			disableCaching : true,
			autoAbort : true,
			params:{
				acceptId:acceptId
			}
		});
		
		formPanel=TestCourseApprovalObjectPanel.acceptTaskMsg;
	}
	
	var panel = new Ext.Panel({
		layout:'fit',
		items:[formPanel]
	});
	
	return panel;
}