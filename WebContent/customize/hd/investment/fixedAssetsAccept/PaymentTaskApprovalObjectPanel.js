PaymentTaskApprovalObjectPanel = {
	inputWidth:135,
	limit:6,
	psId:null,
	pgId:null
};

/**
 * 查找部门信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectDepartment = function(){
	
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
		id:'paymentTaskDepartmentValueComboBox',
		name:'h_depcode',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'depcode',
		fieldLabel:'申请单位(<font color="red">*</font>)',
		store:store,
		valueField : "depcode",
		displayField : "departmentName",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
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
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectDepartmentValue;
};

/**
 * 负责人信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectLiabilityPeopel = function(){
	
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
	
	var selectLiabilityPeopelValue = new Ext.form.ComboBox({
		id:'LiabilityPeopelValueComboBox',
		name:'h_pgLiabilityPeopel',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'pgLiabilityPeopel',
		fieldLabel:'责任人(<font color="red">*</font>)',
		store:store,
		valueField : "userId",
		displayField : "trueName",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
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
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectLiabilityPeopelValue;
};

/**
 * 经办人信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectWorkPeopel = function(){
	
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
		id:'WorkPeopelValueComboBox',
		name:'h_pgWorkPeopel',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'pgWorkPeopel',
		fieldLabel:'经办人(<font color="red">*</font>)',
		store:store,
		valueField : "userId",
		displayField : "trueName",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
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
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectWorkPeopelValue;
};

/**
 * 查找供应商信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectVendor = function(){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/FixConditionRemote.getVendorList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'vendorId'
			}, {
				name : 'vendorName'
			} 
			])
	});
	
	var selectVendorValue = new Ext.form.ComboBox({
		id:'paymentTaskVendorValueComboBox',
		name:'h_psPayee',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'psPayee',
		fieldLabel:'收款人全称(<font color="red">*</font>)',
		store:store,
		valueField : "vendorId",
		displayField : "vendorName",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		//值为true时将限定选中的值为列表中的值
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'必须指派中标单位！', 
		readOnly:true,
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			},
			'select':function(){
				var selectVendorAccount = Ext.getCmp('paymentTaskVendorAccountValueComboBox');
				PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psBankName').setValue('');
				PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psBankNum').setValue('')
//				selectVendorAccount.hidden=false;
//				PaymentTaskApprovalObjectPanel.createStockPaymentTask.doLayout();
				selectVendorAccount.store.baseParams.vendorId=this.getValue();
				selectVendorAccount.store.load({
					params:{
						start:0,
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				selectVendorAccount.expand();
			}
		}
	});
	
	return selectVendorValue;
};

/**
 * 查找供应商开户行信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectVendorAccount = function(){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/StockPaymentTaskRemote.getVendorAccountList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'psBankName'
			}, {
				name : 'psBankNum'
			} 
			])
	});
	
	var selectVendorAccountValue = new Ext.form.ComboBox({
		id:'paymentTaskVendorAccountValueComboBox',
		name:'h_psBankName',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'psBankName',
		fieldLabel:'银行全称(<font color="red">*</font>)',
		store:store,
		valueField : "psBankNum",
		displayField : "psBankName",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		//值为true时将限定选中的值为列表中的值
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
		//校验是否为空
//		allowBlank:false,
//		blankText:'必须选择开户信息！',
		readOnly:true,
		listeners : {
			'select':function(){
				PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psBankNum').setValue(this.getValue());
			}
		}
	});
	
	return selectVendorAccountValue;
};

/**
 * 查找合同信息
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectContract = function(selectType){
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/StockPaymentTaskRemote.getContractList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'contractId'
			}, {
				name : 'contractCode'
			} 
			]),
		baseParams:{
		inputSelectType:selectType
		}
	});
	var selectContractValue = new Ext.form.ComboBox({
		id:'paymentTaskContractValueComboBox',
		name:'h_contractId',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'contractId',
		fieldLabel:'合同号(<font color="red">*</font>)',
		store:store,
		valueField : "contractId",
		displayField : "contractCode",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		//值为true时将限定选中的值为列表中的值
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'必须选择合同号！', 
		readOnly:true,
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectContractValue;
};

/**
 * 查找合同信息（此包含了1,2期合同的信息），集团公司使用
 * @return {}
 */
PaymentTaskApprovalObjectPanel.selectGroupContract = function(selectType){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/StockPaymentTaskRemote.getContractList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'contractId'
			}, {
				name : 'contractCode'
			} 
			]),
		baseParams:{
		inputSelectType:selectType
		}
	});
	
	var selectContractValue = new Ext.form.ComboBox({
		id:'paymentTaskGroupContractValueComboBox',
		name:'h_contractId',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'contractId',
		fieldLabel:'合同编号(<font color="red">*</font>)',
		store:store,
		valueField : "contractId",
		displayField : "contractCode",
		mode:'remote',
		//每页显示数目
		pageSize:PaymentTaskApprovalObjectPanel.limit,
		//值为true时将限定选中的值为列表中的值
		forceSelection : true,
		triggerAction : 'all',
		width:PaymentTaskApprovalObjectPanel.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:PaymentTaskApprovalObjectPanel.inputWidth*2,
		//校验是否为空
		allowBlank:false,
		blankText:'必须选择合同号！', 
		readOnly:true,
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:PaymentTaskApprovalObjectPanel.limit
					}
				});
				this.expand();
			}
		}
	});
	
	return selectContractValue;
};

PaymentTaskApprovalObjectPanel.init = function(id,selectType){
	
	PaymentTaskApprovalObjectPanel.createStockPaymentTask = new Ext.form.FormPanel({
		frame:true,
		title:'股份公司',
		buttonAlign:'center',
		autoScroll:true,
		items:[
			{
				xtype:'fieldset',
				title:'付款申请信息',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
				items:[
					{
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'form',
								items:[PaymentTaskApprovalObjectPanel.selectDepartment()]
							},
							{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'联系电话(<font color="red">*</font>)',
												name:'psPhone',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									},{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'申请事项(<font color="red">*</font>)',
												name:'psContent',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								items:[
									{
										xtype:'checkboxgroup',
										fieldLabel :'主要附件种类',
										readOnly:true,
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										items:[
											{boxLabel:'报告',inputValue:1},
											{boxLabel:'原始发票',inputValue:2},
											{boxLabel:'内部支票',inputValue:3},
											{boxLabel:'决算书',inputValue:4}
										],
										name:'psAccessoriesType'
									}
								]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[PaymentTaskApprovalObjectPanel.selectContract(selectType)]
									},{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'分期付款比例(<font color="red">*</font>)',
												name:'psPaymentScale',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								name:'psPlanType',
								items:[
									{
										xtype:'radiogroup',
										fieldLabel :'资金计划种类',
										readOnly:true,
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										items:[
											{boxLabel:'计划内',name:'psPlanType',inputValue:1},
											{boxLabel:'计划外',name:'psPlanType',inputValue:2}
										],
										name:'psPlanType'
									}
								]
							},{
									columnWidth:.98,
									layout:'form',
									items:[{
										xtype:'textarea',
										name:'psRemark',
										fieldLabel:'其他信息',
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										readOnly:true
									}]
								}
						]
						
					}
				]
			},{
				xtype:'fieldset',
				title:'付款额度',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
				items:[
					{
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.2,
										layout:'form',
										items:[{
											xtype:'label',
											text:'业务申请额度（元）'
										}]
									},{
										columnWidth:.8,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'小写(<font color="red">*</font>)',
												name:'psApplicationBrow',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											},{
												xtype:'textfield',
												fieldLabel:'大写',
												name:'psApplicationBrowChina',
												width:PaymentTaskApprovalObjectPanel.inputWidth*3,
												readOnly:true 
											}
										]
									}
								]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.2,
										layout:'form',
										items:[{
											xtype:'label',
											text:'财务审核额度（元）'
										}]
									},{
										columnWidth:.8,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'小写(<font color="red">*</font>)',
												name:'psAuditingBrow',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
												
											},{
												xtype:'textfield',
												fieldLabel:'大写',
												name:'psAuditingBrowChina',
												width:PaymentTaskApprovalObjectPanel.inputWidth*3,
												readOnly:true
											}
										]
									}
								]
							}
						]
					}
				]
			},{
				xtype:'fieldset',
				title:'收款人信息',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
				items:[
					{
						layout:'column',
						items:[
							{
									columnWidth:.98,
									layout:'form',
									items:[PaymentTaskApprovalObjectPanel.selectVendor()]
								},{
									columnWidth:.98,
									layout:'column',
									items:[
										{
											columnWidth:.49,
											layout:'form',
											items:[PaymentTaskApprovalObjectPanel.selectVendorAccount()]
										},{
											columnWidth:.49,
											layout:'form',
											items:[
												{
													xtype:'textfield',
													fieldLabel:'银行账号(<font color="red">*</font>)',
													name:'psBankNum',
													width:PaymentTaskApprovalObjectPanel.inputWidth,
													readOnly:true
												}
											]
										}
									]
								}
						]
					}
				]
			}
		]
	});
	
	PaymentTaskApprovalObjectPanel.createGroupPaymentTask = new Ext.form.FormPanel({
		frame:true,
		title:'集团公司',
		buttonAlign:'center',
		autoScroll:true,
		items:[
			{
				xtype:'fieldset',
				title:'财务事项内容',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
				items:[
					{
						xtype:'textarea',
						name:'pgFinanceRemark',
						fieldLabel:'财务事项说明',
						width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
						readOnly:true
					}
				]
			},{
				xtype:'fieldset',
				title:'申报依据',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
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
										items:[PaymentTaskApprovalObjectPanel.selectGroupContract(selectType)]
									},{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'合同凭据号(<font color="red">*</font>)',
												name:'contractProof',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									}
								]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'合同金额(<font color="red">*</font>)',
												name:'contractMoney',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									},{
										columnWidth:.49,
										layout:'form',
										items:[
											{
												xtype:'textfield',
												fieldLabel:'累计已付（收）款(<font color="red">*</font>)',
												name:'paymentMoney',
												width:PaymentTaskApprovalObjectPanel.inputWidth,
												readOnly:true
											}
										]
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								items:[
									{
										xtype:'textarea',
										fieldLabel:'其他',
										name:'pgRemark',
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										readOnly:true
									}
								]
							}
						]
					}
				]
			},{
				xtype:'fieldset',
				title:'审批金额',
				width:PaymentTaskApprovalObjectPanel.inputWidth*5.5,
				items:[
					{
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'form',
								items:[
									{
										xtype:'textfield',
										fieldLabel:'小写金额(<font color="red">*</font>)',
										name:'pgAuditingBrow',
										width:PaymentTaskApprovalObjectPanel.inputWidth,
										readOnly:true
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								items:[
									{
										xtype:'textfield',
										fieldLabel:'大写金额',
										name:'pgAuditingBrowChina',
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										readOnly:true
									}
								]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[PaymentTaskApprovalObjectPanel.selectLiabilityPeopel()]
									},{
										columnWidth:.49,
										layout:'form',
										items:[PaymentTaskApprovalObjectPanel.selectWorkPeopel()]
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								items:[
									{
										xtype:'textarea',
										fieldLabel:'意见',
										name:'pgIdea',
										width:PaymentTaskApprovalObjectPanel.inputWidth*3.5,
										readOnly:true
									}
								]
							}
						]
					}
				]
			}
		]
	});

	PaymentTaskApprovalObjectPanel.createTab = new Ext.TabPanel({
//		height:400,
//		autoHeight:true,
		items:[PaymentTaskApprovalObjectPanel.createStockPaymentTask,PaymentTaskApprovalObjectPanel.createGroupPaymentTask],
		activeTab:0
	});
	
	var psId = id.substring(0,id.length-1);
	var type = id.substring(id.length-1,id.length);
	
	Ext.Ajax.request({
				url:'../JSON/StockPaymentTaskRemote.getUpdatePaymentTask',
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
					//编号赋值
					PaymentTaskApprovalObjectPanel.psId=psId;
					PaymentTaskApprovalObjectPanel.pgId=psId;
//					PaymentTaskApprovalObjectPanel.createPaymentWin();
					//判断勾选的是哪种任务
					if(type==1){
						PaymentTaskApprovalObjectPanel.createTab.remove(1);
						
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psPhone').setValue(result.psPhone);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psContent').setValue(result.psContent);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psPaymentScale').setValue(result.psPaymentScale);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psRemark').setValue(result.psRemark);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psApplicationBrow').setValue(result.psApplicationBrow);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psAuditingBrow').setValue(result.psAuditingBrow);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psBankNum').setValue(result.psBankNum);
						
						var selectDepartment = Ext.getCmp('paymentTaskDepartmentValueComboBox');
						var selectVendor = Ext.getCmp('paymentTaskVendorValueComboBox');
						var selectContract = Ext.getCmp('paymentTaskContractValueComboBox');
						var selectVendorAccount = Ext.getCmp('paymentTaskVendorAccountValueComboBox');
						
						//默认加载一次下拉列表（加载指派）
//						selectDepartment.store.baseParams.inputValue=selectDepartment.getRawValue();
						selectDepartment.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.depcode
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('depcode').setValue(result.depcode);
							}
						});
						//默认加载一次下拉列表（加载供应商）
//						selectVendor.store.baseParams.inputValue=selectVendor.getRawValue();
						selectVendor.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.psPayee
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psPayee').setValue(result.psPayee);
							}
						});
						
						//默认加载一次下拉列表（加载合同编号）
//						selectContract.store.baseParams.inputValue=selectContract.getRawValue();
						selectContract.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.contractId
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('contractId').setValue(result.contractId);
							}
						});
						
						//默认加载一次下拉列表（加载供应商开户行）
//						selectVendorAccount.store.baseParams.inputValue=selectVendor.getValue();
						selectVendorAccount.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.psBankName
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psBankName').setValue(result.psBankName);
							}
						});
						
						//各多选框赋值
						var types = result.psAccessoriesType.split(',');
						var t1 = [false,false,false,false];
						for(var i=0;i<types.length;i++){
							if(types[i]==1)
								t1[0]=true;
							if(types[i]==2)
								t1[1]=true;
							if(types[i]==3)
								t1[2]=true;
							if(types[i]==4)
								t1[3]=true;
							
						}
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psAccessoriesType').setValue(t1);
						
//						var type1s = result.psPlanType.split(',');
//						var t2 = [false,false];
//						for(var i=0;i<type1s.length;i++){
//							if(type1s[i]==1)
//								t2[0]=true;
//							if(type1s[i]==2)
//								t2[1]=true;
//						}
//						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psPlanType').setValue(t2);
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psPlanType').setValue(result.psPlanType);
														
						//将小写转换为大写显示在输入框中
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psApplicationBrowChina')
							.setValue(util.numForChina(PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psApplicationBrow').getValue()));
						//将小写转换为大写显示在输入框中
						PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psAuditingBrowChina')
							.setValue(util.numForChina(PaymentTaskApprovalObjectPanel.createStockPaymentTask.getForm().findField('psAuditingBrow').getValue()));
					}else{
						PaymentTaskApprovalObjectPanel.createTab.remove(0);
						
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgFinanceRemark').setValue(result.pgFinanceRemark);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('contractProof').setValue(result.contractProof);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('contractMoney').setValue(result.contractMoney);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('paymentMoney').setValue(result.paymentMoney);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgRemark').setValue(result.pgRemark);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgAuditingBrow').setValue(result.pgAuditingBrow);
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgIdea').setValue(result.pgIdea);
						
						var LiabilityPeopel = Ext.getCmp('LiabilityPeopelValueComboBox');
						var WorkPeopel = Ext.getCmp('WorkPeopelValueComboBox');
						var GroupContract = Ext.getCmp('paymentTaskGroupContractValueComboBox');
						//默认加载一次下拉列表（加载负责人）
//						LiabilityPeopel.store.baseParams.inputValue=LiabilityPeopel.getValue();
						LiabilityPeopel.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.pgLiabilityPeopel
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgLiabilityPeopel').setValue(result.pgLiabilityPeopel);
							}
						});
						
						//默认加载一次下拉列表（加载经办人）
//						WorkPeopel.store.baseParams.inputValue=WorkPeopel.getValue();
						WorkPeopel.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.pgWorkPeopel
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgWorkPeopel').setValue(result.pgWorkPeopel);
							}
						});
						
						//默认加载一次下拉列表（加载合同编号）
//						GroupContract.store.baseParams.inputValue=GroupContract.getValue();
						GroupContract.store.load({
							params:{
								start:0,
								limit:PaymentTaskApprovalObjectPanel.limit,
								inputValueNum:result.contractId
							},callback:function(){
								PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('contractId').setValue(result.contractId);
							}
						});
						
						//将小写转换为大写显示在输入框中
						PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgAuditingBrowChina')
							.setValue(util.numForChina(PaymentTaskApprovalObjectPanel.createGroupPaymentTask.getForm().findField('pgAuditingBrow').getValue()));
					}
				},
				disableCaching : true,
				autoAbort : true,
				params:{
					psId:psId,
					psType:type
				}
			});
	var panel = new Ext.Panel({
		items:[PaymentTaskApprovalObjectPanel.createTab],
		layout:'fit'
	});
	return panel;
}