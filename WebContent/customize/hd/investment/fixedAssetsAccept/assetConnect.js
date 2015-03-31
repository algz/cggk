var assetConnect = {
	inputWidth:120,
	limit:6
};

/**
 * 使用单位信息
 * @return {}
 */
assetConnect.selectDepartment = function(){
	
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
		pageSize:paymentTask.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:paymentTask.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:paymentTask.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'必须指派单位！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:paymentTask.limit
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
assetConnect.selectJianYanYuan = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'检验员为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectYiJiaoFuZe = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'移交单位负责人为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectYiJiaoJingBan = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'移交单位经办人为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectUseFuZe = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产使用单位负责人为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectUseAdmin = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产使用单位管理员为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectUseKuaiJi = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产使用单位会计员为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectDirectorFuZe = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产主管部门负责人为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectDirectorJingBan = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产主管部门经办人为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
assetConnect.selectDirectorLingDao = function(){
	
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
		pageSize:assetConnect.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:assetConnect.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:assetConnect.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'资产主管部门领导为必填项！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectWorkPeopelValue;
};

assetConnect.init = function(acceptId){
	assetConnect.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
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
								items:[assetConnect.selectDepartment()]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'datefield', 
									name:'acTime',
									format:'Y-m-d',
									fieldLabel:'填写日期',
									width:testCourse.inputWidth,
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
									width:testCourse.inputWidth,
									allowBlank:false,
				            		blankText:'费用（任务）编号不能为空！'
								}]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acZhiZaoNum',
									fieldLabel:'制造编号',
									width:testCourse.inputWidth
//									allowBlank:false,
//				            		blankText:'制造编号不能为空！'
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
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'contractXingHao',
									fieldLabel:'型号',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'contractGuiGe',
									fieldLabel:'规格',
									width:testCourse.inputWidth
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
									vtype:'shuliang',
									name:'acDianJiNum',
									fieldLabel:'电机数量',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acJianZuMianJi',
									fieldLabel:'建筑面积',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acShiYongMianJi',
									fieldLabel:'使用面积',
									width:testCourse.inputWidth
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
									vtype:'money',
									name:'acJiHuaShebei',
									fieldLabel:'设备费',
									width:testCourse.inputWidth,
									allowBlank:false,
				            		blankText:'计划成本设备费为必填项！'
								}]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'textfield', 
									vtype:'money',
									name:'acJiHuaAnZhuang',
									fieldLabel:'安装费',
									width:testCourse.inputWidth,
									allowBlank:false,
				            		blankText:'计划成本安装费为必填项！'
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
									vtype:'money',
									name:'acShiJiSheBei',
									fieldLabel:'设备费',
									width:testCourse.inputWidth,
									allowBlank:false,
				            		blankText:'实际成本设备费为必填项！'
								}]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'textfield', 
									vtype:'money',
									name:'acShiJiAnZhuang',
									fieldLabel:'安装费',
									width:testCourse.inputWidth,
									allowBlank:false,
				            		blankText:'实际成本安装费为必填项！'
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
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acJianZhuJieGou',
									fieldLabel:'建筑结构',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									vtype:'money',
									name:'acZheJiu',
									fieldLabel:'已经折旧',
									width:testCourse.inputWidth
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
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									vtype:'shuliang',
									name:'acNum',
									fieldLabel:'数量',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'datefield', 
									name:'acZhiZaoTime',
									fieldLabel:'制造年月',
									format:'Y-m-d',
									width:testCourse.inputWidth,
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
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acShiGongFangFa',
									fieldLabel:'施工方法',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acGongChengDiDian',
									fieldLabel:'工程地点',
									width:testCourse.inputWidth
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
									vtype:'shuliang',
									name:'acTuZhiShuLiang',
									fieldLabel:'图纸(说明书)数量',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acGongChengNeiRong',
									fieldLabel:'工程内容',
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acJianYanJieGuo',
									fieldLabel:'检(试)验结果',
									width:testCourse.inputWidth
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
									width:testCourse.inputWidth
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[assetConnect.selectJianYanYuan()]
							},{
								columnWidth:.33,
								layout:'form',
								items:[{
									xtype:'textfield', 
									name:'acAnZhuangDanWei',
									fieldLabel:'设备安装单位',
									width:testCourse.inputWidth
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
									width:testCourse.inputWidth,
									emptyText : '请选择...'
								}]
							},{
								columnWidth:.33,
								layout:'form',
								items:[assetConnect.selectYiJiaoFuZe()]
							},{
								columnWidth:.33,
								layout:'form',
								items:[assetConnect.selectYiJiaoJingBan()]
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
									width:testCourse.inputWidth,
									emptyText : '请选择...'
								}]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectUseFuZe()]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectUseAdmin()]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectUseKuaiJi()]
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
									width:testCourse.inputWidth,
									emptyText : '请选择...'
								}]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectDirectorFuZe()]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectDirectorJingBan()]
							},{
								columnWidth:.25,
								layout:'form',
								items:[assetConnect.selectDirectorLingDao()]
							}
						]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				id:'assetConnectSave',
				handler:function(){
					//判断必填项是否有内容
					if(assetConnect.acceptTaskMsg.getForm().isValid()){
						assetConnect.acceptTaskMsg.getForm().submit({
							url:'../JSON/AssetConnectRemote.useAssetConnect',
							method:'POST',
							failure:function(form,action){
								Ext.MessageBox.show({
									title : '提示信息',
									msg : '获取后台数据失败！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							},
							success:function(form,action){
//								alert(action.response.responseText);
								assetConnect.win.close();
								
								//刷新表格数据操作
								var acceptTaskGridStroe = Ext.getCmp('acceptTaskGrid').store
								//起始数
								var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
								//每页显示总数
								var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
								//添加默认参数
								acceptTaskGridStroe.baseParams.acceptNum=acceptTask.selectNum.getValue();
								acceptTaskGridStroe.baseParams.startTime=acceptTask.startTime.getValue();
								acceptTaskGridStroe.baseParams.endTime=acceptTask.endTime.getValue();
								acceptTaskGridStroe.load({
									params:{
										start:start,
										limit:limit
									}
								});
							},
							params:{
								acceptId:acceptId
							}
						});
					}
				}
			},{
				text:'送审',
				id:'assetConnectSongShen',
				handler:function(){
					//原有‘446901’
//					acceptTaskApprovePanel.approve('449851','资产交接',acceptId,'TestCourse');
					acceptTaskApprovePanel.approve('472151','资产交接审批',acceptId,'TestCourse');
				}
			},{
				text:'取消',
				handler:function(){
					assetConnect.win.close();
				}
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
				assetConnect.acceptTaskMsg.getForm().findField('acTime').setValue(result.acTime);
				assetConnect.acceptTaskMsg.getForm().findField('acFeiYongNum').setValue(result.acFeiYongNum);
				assetConnect.acceptTaskMsg.getForm().findField('acZhiZaoNum').setValue(result.acZhiZaoNum);
				assetConnect.acceptTaskMsg.getForm().findField('contractName').setValue(result.contractName);
				assetConnect.acceptTaskMsg.getForm().findField('contractXingHao').setValue(result.contractXingHao);
				assetConnect.acceptTaskMsg.getForm().findField('contractGuiGe').setValue(result.contractGuiGe);
				assetConnect.acceptTaskMsg.getForm().findField('acDianJiNum').setValue(result.acDianJiNum);
				assetConnect.acceptTaskMsg.getForm().findField('acJianZuMianJi').setValue(result.acJianZuMianJi);
				assetConnect.acceptTaskMsg.getForm().findField('acShiYongMianJi').setValue(result.acShiYongMianJi);
				assetConnect.acceptTaskMsg.getForm().findField('acJiHuaShebei').setValue(result.acJiHuaShebei);
				assetConnect.acceptTaskMsg.getForm().findField('acJiHuaAnZhuang').setValue(result.acJiHuaAnZhuang);
				assetConnect.acceptTaskMsg.getForm().findField('acShiJiSheBei').setValue(result.acShiJiSheBei);
				assetConnect.acceptTaskMsg.getForm().findField('acShiJiAnZhuang').setValue(result.acShiJiAnZhuang);
				assetConnect.acceptTaskMsg.getForm().findField('acZhiZaoDanWei').setValue(result.acZhiZaoDanWei);
				assetConnect.acceptTaskMsg.getForm().findField('acJianZhuJieGou').setValue(result.acJianZhuJieGou);
				assetConnect.acceptTaskMsg.getForm().findField('acZheJiu').setValue(result.acZheJiu);
				assetConnect.acceptTaskMsg.getForm().findField('acJiLiangDanWei').setValue(result.acJiLiangDanWei);
				assetConnect.acceptTaskMsg.getForm().findField('acNum').setValue(result.acNum);
				assetConnect.acceptTaskMsg.getForm().findField('acZhiZaoTime').setValue(result.acZhiZaoTime);
				assetConnect.acceptTaskMsg.getForm().findField('acCengCi').setValue(result.acCengCi);
				assetConnect.acceptTaskMsg.getForm().findField('acShiGongFangFa').setValue(result.acShiGongFangFa);
				assetConnect.acceptTaskMsg.getForm().findField('acGongChengDiDian').setValue(result.acGongChengDiDian);
				assetConnect.acceptTaskMsg.getForm().findField('acTuZhiShuLiang').setValue(result.acTuZhiShuLiang);
				assetConnect.acceptTaskMsg.getForm().findField('acGongChengNeiRong').setValue(result.acGongChengNeiRong);
				assetConnect.acceptTaskMsg.getForm().findField('acJianYanJieGuo').setValue(result.acJianYanJieGuo);
				assetConnect.acceptTaskMsg.getForm().findField('acFuJian').setValue(result.acFuJian);
				assetConnect.acceptTaskMsg.getForm().findField('acAnZhuangDanWei').setValue(result.acAnZhuangDanWei);
				assetConnect.acceptTaskMsg.getForm().findField('acYiJiaoShiYongTime').setValue(result.acYiJiaoShiYongTime);
				assetConnect.acceptTaskMsg.getForm().findField('acJieShouFenGuanTime').setValue(result.acJieShouFenGuanTime);
				assetConnect.acceptTaskMsg.getForm().findField('acJieShouZhuGuanTime').setValue(result.acJieShouZhuGuanTime);
				
				//默认加载一次下拉列表（加载使用单位）
//				selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
				selectDepartment.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.depcode
					},
					callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('depcode').setValue(result.depcode);
					}
				});
				
				//默认加载一次下拉列表（加载检验员）
//				selectJianYanYuan.store.baseParams.inputValue=selectJianYanYuan.getRawValue();
				selectJianYanYuan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acJianYanYuan
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acJianYanYuan').setValue(result.acJianYanYuan);
					}
				});
				
				//默认加载一次下拉列表（加载移交单位负责人）
//				selectYiJiaoFuZe.store.baseParams.inputValue=selectYiJiaoFuZe.getRawValue();
				selectYiJiaoFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acYiJiaoDanWeiFuZeRen
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acYiJiaoDanWeiFuZeRen').setValue(result.acYiJiaoDanWeiFuZeRen);
					}
				});
				
				//默认加载一次下拉列表（加载移交单位经办人）
//				selectYiJiaoJingBan.store.baseParams.inputValue=selectYiJiaoJingBan.getRawValue();
				selectYiJiaoJingBan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acYiJiaoDanWeiJingBanRen
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acYiJiaoDanWeiJingBanRen').setValue(result.acYiJiaoDanWeiJingBanRen);
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位负责人）
//				selectUseFuZe.store.baseParams.inputValue=selectUseFuZe.getRawValue();
				selectUseFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acShiYongDanWeiFuZeRen
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acShiYongDanWeiFuZeRen').setValue(result.acShiYongDanWeiFuZeRen);
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位管理员）
//				selectUseAdmin.store.baseParams.inputValue=selectUseAdmin.getRawValue();
				selectUseAdmin.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acShiYongDanWeiGuanLiYuan
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acShiYongDanWeiGuanLiYuan').setValue(result.acShiYongDanWeiGuanLiYuan);
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位会计员）
//				selectUseKuaiJi.store.baseParams.inputValue=selectUseKuaiJi.getRawValue();
				selectUseKuaiJi.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acShiYongDanWeiKuaiJiYuan
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acShiYongDanWeiKuaiJiYuan').setValue(result.acShiYongDanWeiKuaiJiYuan);
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门负责人）
//				selectDirectorFuZe.store.baseParams.inputValue=selectDirectorFuZe.getRawValue();
				selectDirectorFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acZhuGuanBuMenFuZeRen
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acZhuGuanBuMenFuZeRen').setValue(result.acZhuGuanBuMenFuZeRen);
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门经办人）
//				selectDirectorJingBan.store.baseParams.inputValue=selectDirectorJingBan.getRawValue();
				selectDirectorJingBan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acZhuGuanBuMenJingBanRen
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acZhuGuanBuMenJingBanRen').setValue(result.acZhuGuanBuMenJingBanRen);
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门领导）
//				selectDirectorLingDao.store.baseParams.inputValue=selectDirectorLingDao.getRawValue();
				selectDirectorLingDao.store.load({
					params:{
						start:0,
						limit:assetConnect.limit,
						inputValueNum:result.acZhuGuanBuMenLingDao
					},callback:function(){
						assetConnect.acceptTaskMsg.getForm().findField('acZhuGuanBuMenLingDao').setValue(result.acZhuGuanBuMenLingDao);
					}
				});
				
				//确定“送审”按钮是否可用
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//已送审的任务，“送审”不可用（“资产交接”以后状态的都说明应经送审）
				if(records.length==1&&records[0].get('acceptState')>7){
					Ext.getCmp('assetConnectSongShen').setDisabled(true);
				}else{
					Ext.getCmp('assetConnectSongShen').setDisabled(false);
				}
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')>7)
					Ext.getCmp('assetConnectSave').setDisabled(true);
			}else{
				//初始新建的时候“送审”不可用
				Ext.getCmp('assetConnectSongShen').setDisabled(true);
				
				//加载物料信息
//				assetConnect.acceptTaskMsg.getForm().findField('contractName').setValue(result.contractName);
//				assetConnect.acceptTaskMsg.getForm().findField('contractXingHao').setValue(result.contractXingHao);
//				assetConnect.acceptTaskMsg.getForm().findField('contractGuiGe').setValue(result.contractGuiGe);
				
				//默认加载一次下拉列表（加载使用单位）
				selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
				selectDepartment.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载检验员）
				selectJianYanYuan.store.baseParams.inputValue=selectJianYanYuan.getRawValue();
				selectJianYanYuan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载移交单位负责人）
				selectYiJiaoFuZe.store.baseParams.inputValue=selectYiJiaoFuZe.getRawValue();
				selectYiJiaoFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载移交单位经办人）
				selectYiJiaoJingBan.store.baseParams.inputValue=selectYiJiaoJingBan.getRawValue();
				selectYiJiaoJingBan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位负责人）
				selectUseFuZe.store.baseParams.inputValue=selectUseFuZe.getRawValue();
				selectUseFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位管理员）
				selectUseAdmin.store.baseParams.inputValue=selectUseAdmin.getRawValue();
				selectUseAdmin.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产使用单位会计员）
				selectUseKuaiJi.store.baseParams.inputValue=selectUseKuaiJi.getRawValue();
				selectUseKuaiJi.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门负责人）
				selectDirectorFuZe.store.baseParams.inputValue=selectDirectorFuZe.getRawValue();
				selectDirectorFuZe.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门经办人）
				selectDirectorJingBan.store.baseParams.inputValue=selectDirectorJingBan.getRawValue();
				selectDirectorJingBan.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
					}
				});
				
				//默认加载一次下拉列表（加载资产主管部门领导）
				selectDirectorLingDao.store.baseParams.inputValue=selectDirectorLingDao.getRawValue();
				selectDirectorLingDao.store.load({
					params:{
						start:0,
						limit:assetConnect.limit
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
	
	assetConnect.win = new Ext.Window({
		title:'资产交接证明书',
		width:980,
		minWidth:980,
		height:400,
		autoScroll:true,
		modal:true,
		items:[assetConnect.acceptTaskMsg]
	});
	assetConnect.win.show();

}