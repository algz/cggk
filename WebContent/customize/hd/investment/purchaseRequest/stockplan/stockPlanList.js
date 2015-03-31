var stockPlanList = {
	limit : 20,
	start : 0,
	quereyparam1 : {
		planType : null,
		status : null,
		money : null,
		moneyCompare : null,
		markTime : null,
		limit : 20,
		start : 0
	},
	quereyparam2 : {
		status : null,
		makeTablePerson : null,
		makeTime : null,
		limit : 20,
		start : 0
	}
}

stockPlanList.initWindow = function(config, valueObject, callback) {

	var self = this;
	this.fileUploadField = new Ext.form.FileUploadField({
				buttonText : '' + getResource('resourceParam569') + '',
				allowBlank : false,
				border : false,
				readOnly : false
			});
	this.uploadForm = new Ext.form.FormPanel({
				layout : 'fit',
				fileUpload : true,
				border : false,
				items : [this.fileUploadField]
			});

	this.window = new Ext.Window({
		title : "合同文件上传",
		width : 300,
		minHeight : 60,
		height : 100,
		resizable : true,
		buttonAlign : 'center',
		border : false,
		modal : true,
		items : [new Ext.form.Label({
							html : valueObject.name
						}), this.uploadForm],
		buttons : [{
			text : '' + getResource('resourceParam470') + '',
			handler : function() {
				if (valueObject.checkStr != undefined) {
					var filenamepath = self.fileUploadField.getValue();
					var fileType = filenamepath.substr(filenamepath
							.lastIndexOf("."));
					var arrCheckFileType = valueObject.checkStr.split(",");
					function checkIsValidType() {
						for (var i = 0; i < arrCheckFileType.length; i++) {
							var type = fileType.replace(".", "");
							var tempType = arrCheckFileType[i].replace(".", "");
							if (type == tempType) {
								return true;
							}
						}
						return false;
					}
					if (valueObject.checkStr != "" && !checkIsValidType()) {
						Ext.Msg.alert(
								"" + getResource('resourceParam575') + "",
								"文件格式不合法！");
						return false;
					}
				}
				if (!self.uploadForm.getForm().isValid()) {
					Ext.Msg.alert('' + getResource('resourceParam575') + '', ""
									+ getResource('resourceParam985') + "")
				} else {
					self.uploadForm.getForm().submit({
						url : config.upUrl,
						waitMsg : '' + getResource('resourceParam984') + '',
						success : function(form, result) {
							if (result.result.fileId == undefined) {
								Ext.Msg.alert(
										'' + getResource('resourceParam575')
												+ '',
										"" + getResource('resourceParam470')
												+ "出现异常！")
							} else {
								callback(self, form, result, "success");
							}
						},
						failure : function(form, result) {
							Ext.Msg.alert('' + getResource('resourceParam575')
											+ '', ""
											+ getResource('resourceParam470')
											+ "出现异常！")
						}
					})
				}
			}
		}, {
			text : '取消',
			handler : function() {
				self.window.close();
			}
		}]
	})
	if (typeof afterInitCallback == 'function') {
		afterInitCallback(this.uploadForm, this.window);
	}
	this.window.show();
}

stockPlanList.fileUpload = function(isCreate) {

	var config = {
		upUrl : '../JSON/contract_FileUpload'
	}

	var valueObject = {
		name : '本地上传：',
		checkStr : 'xls,xlsx,doc,docx,txt'
	}

	stockPlanList.initWindow(config, valueObject, function(self, form, result,
					flag) {
				if (flag) {
						stockPlanList.careateContractItem.getForm('contractForm').findField('fileValeName').setValue(result.result.fileName);
				}
				self.window.close();
			});
}

stockPlanList.stockPlan1MoreInfo = function(declareId) { // 计划草案 详情
	var sm = new Ext.grid.CheckboxSelectionModel(); 
	var cm = new Ext.grid.ColumnModel([sm,
			// {
			// width : 40,
			// renderer : function(value, cellmeta, record, rowIndex) {
			// return "<input type=\"checkbox\" value="
			// + record.get('declare_detil_id') + ">";
			// }
			// },
	new Ext.grid.RowNumberer({
		header : '序号',
		width : 40
	}),
	{
		header : "名称",
		dataIndex : 'materialitemname'
	}, {
		header : "部门",
		width:80,
		dataIndex : 'departmentname'
	}, {
		header : "规格",
		dataIndex : 'materialStandard'
	}, {
		header : "技术条件",
		dataIndex : 'technicCondition'
	},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	}, {
		header : "物资类别",
		dataIndex : 'materialcatalog_name'
	}, {
		header : "采购类别",
		width:70,
		dataIndex : 'declareType'
	}, {
		header : "数量",
		width:50,
		dataIndex : 'quantity'
	}, {
		header : "计量单位",
		width:60,
		dataIndex : 'demension'
	}, {
		header : "资金预算",
		width:60,
		dataIndex : 'amount'
	}, {
		header : "采购用途",
		dataIndex : 'use'
	}, {
		header : "任务编号",
		dataIndex : 'taskno'
	}, {
		header : "使用时间",
		dataIndex : 'usedate'
	}
//	, {
//		header : "报告类型",
//		dataIndex : 'reportType'
//	}, {
//		header : "报告文件",
//		dataIndex : 'report',
//		renderer : function(value, cellmeta, record, rowIndex) {
//		var ID = record.get("fileId");
//						var ORIGINALNAME = record.get("fileName");
//						value = "&nbsp;<font color=blue>" + value
//								+ "</font>";
//						return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
//								+ ID
//								+ "&ORIGINALNAME="
//								+ encodeURI(encodeURI(ORIGINALNAME))
//								+ "' cursor：hand>" + value + "</a>";
//		}
//	}
	]);

	cm.defaultSortable = true;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/stockPlan_Remote.getStockdraftDataMoreInfo',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'declare_detil_id'
			}, ['declare_detil_id', 'materialitemname', 'departmentname','deliveryStatus',
					'materialStandard', 'technicCondition',/*'materialcatalogid'物资种类ID,*/
					'materialcatalog_name', 'use', 'quantity', 'amount','use','taskno','declareType',
					'demension', 'usedate', 'report'  , 'fileName','reason','fileId','reportType']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				autoLoad : true
			});

	var gridPanel = new Ext.grid.EditorGridPanel({
		        id:'StockdraftMoreInfoGrid',
				store : ds,
				cm : cm,
				sm : sm,
				height : 300,
				layout : 'fit',
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				tbar : new Ext.Toolbar({
					items : ['-',{
						xtype : 'button',
						iconCls : 'CreateLog',
						disabled : privilegeValidate.newPDisable,
						text : '生成采购计划',
						handler : function(){
							stockPlanList.generateStockPlan(declareId);
						}
					}]
				})
//				bbar : new Ext.PagingToolbar({
//							pageSize : stockPlanList.limit,
//							store : ds,
//							displayInfo : true
//						})
			});
	ds.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, {
//							start : stockPlanList.start,
//							limit : stockPlanList.limit,
							start : 0,
							limit : 0,
							declareId : declareId
						});

			});
	ds.load();

//	if (stockPlanTabpanel.tabPanel.get(declareId)) {
//		alert(1);
//		stockPlanTabpanel.tabPanel.setActiveTab(declareId);
//	} else {
//		stockPlanTabpanel.tabPanel.add({
//					id : declareId,
//					title : '草案采购详情',
//					layout : 'fit',
//					closable : true,
//					items : [gridPanel]
//				}).show();
//	}
	var win = new Ext.Window({
		title : '草案采购详情',
		id : 'win_declare_detail',
		width : 900,
		layout:'fit',
		modal : true,
		autoScroll:false,
		autoDestroy: true,
		items : gridPanel
	});
	win.show();
}
stockPlanList.generateStockPlan = function(declareId){
	
	var gridPanel = Ext.getCmp('StockdraftMoreInfoGrid');
	var rows = gridPanel.getSelectionModel().getSelections();
	var id = "";
	
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
		return;
	}
	var materialcatalogname=rows[0].get('materialcatalog_name');
	for(i = 0;i < rows.length;i++){
		if(materialcatalogname!=rows[i].get('materialcatalog_name')){
			return Ext.Msg.alert("提示","所选物资的种类不唯一,不能生成采购计划!");
		}
		if(i!=0){
			id+=','
		}
		id = id + rows[i].get('declare_detil_id');
	}
//	判断是否全选
//	if(rows.length==gridPanel.getSelectionModel().getCount()){
//		id="";
//	}
	
	Ext.MessageBox.confirm("提示", "是否真的要生成采购计划?", function(ret) {
		if (ret == 'yes') {
			var myMask = new Ext.LoadMask(Ext.getCmp('win_declare_detail').getEl(), {msg:"数据加载中..."});
			myMask.show();
			Ext.Ajax.request({
				url : '../JSON/stockPlan_Remote.generationProcurementPlan',
				method : 'post',
				waitMsg : '数据加载中，请稍后....',
				params : {
					materialcatalogname:materialcatalogname,
//					materialcatalogid : rows[0].get('materialcatalogid'),// 物资类别
					declarePlanId:declareId,//申报计划ID
					declarePlanDetailId:id//'111,111'//T_DECLAREPLAN_DETIL申报计划详情ID集
				},
				success : function(response, opts) {
					myMask.hide();
					var obj = Ext.decode(response.responseText);
					if (obj.success == true) {
						Ext.Msg.alert("提示","采购计划生成完成!");
						stockPlanList.ds1.load();
					    var StockdraftMoreInfo_store=Ext.getCmp('StockdraftMoreInfoGrid').getStore()
					    
					    StockdraftMoreInfo_store.load({
						    callback:function(records,options,success){
						        if(records.length==0){
						        	Ext.getCmp('win_declare_detail').close();
						        }
						    }
					    });
					} else {
						return Ext.Msg.alert("提示",obj.msg);
					}
				},
				failure : function(response, opts) {
				}
			});
			return;
		}
	})
}
var createStockPlan = function(type,id) {
	
	// 获取编号
	var info = Seam.Remoting
			.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo");
	info.setFlag(1);
	info.setProName("Auto_Code_p.Get_Auto_Code_p");//生成采购计划编号
	info.setCodeRule("");
//	info.setProcurementPlan_ID()
	Seam.Component.getInstance("stockPlan_Remote").exePro(info, function(code) { 
		
		
		
		var queryItem = new Ext.form.FormPanel({
			id : 'form1',
			border : false,
			labelWidth : 120,
			labelAlign : 'left',
			items : [{
				layout : 'form',
				border : false,
				items : [ {
					border : false, 
					html : '<table border="0"><tr><td width="120">计划名称:</td><td><input id="planName2" type="text" style="width:180px;height:20px" /></td></tr></table>'
				}]
			}]
		});

		var win1 = new Ext.Window({
			title : "生成采购计划",
			layout : 'fit',
			width : 350,
			height : 100,
			autoScroll : true,
			closeAction : 'close',
			items : queryItem,
			buttons : [{
				text : '确认',
				handler : function() {
					var s = stockPlanList.gridPanel.getSelectionModel()
							.getSelections();
					if(Ext.get("planName2").getValue()==""){
						Ext.Msg.alert("提示","请输入计划名称！");
						return;
					} 
					Ext.MessageBox.confirm("提示", "是否真的要生成采购计划?", function(
							ret) {
						if(ret=='yes'){
							for (var i = 0, r; r = s[i]; i++) {
								var oo = Seam.Remoting
										.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo");
								oo.setFlag(2);
								oo.setProName("Auto_Code_p.Cgjh_Plan_Insert_p");
								oo.setPlanName(Ext.get("planName2").getValue());
								oo.setPlanCode("");
								oo.setPlanType(type);
								//原有存的名称（中文）
	//							oo.setUserId(r.data.makeTablePerson);
								//现有保存编号（用户编号）
								oo.setUserId(r.data.makeTablePersonId);
								oo.setInsertDate(r.data.makeTime);
								oo.setDeclarePlanId(r.data.declareId);
								oo.setDeclarePlanDetailId(id);
								win1.close();
								Seam.Component.getInstance("stockPlan_Remote")
										.exePro(oo, function(result) {
													if (result) {
														Ext.getCmp('win_declare_detail').close();
														stockPlanList.ds1
																.load();
													}
												});
	
							}
						}
					});
					
				}
			}, {
				text : '取消',
				handler : function() {
					win1.close();
				}
			}]
		}).show(); 
		 
	})
}

var queryWin1 = function() { // 采购计划查询

	var stateBox = new Ext.form.ComboBox({
		id : 'stockStatus1',
		fieldLabel : '审批状态',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['0','未编制'],['1','编制中'],['2','审批中'],['3','已审批']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width :100,
		forceSelection : true,
		anchor : '89%',
		emptyText : '请选择'
	});
	var queryItem = new Ext.form.FormPanel({
		id : 'form1',
		border : false,
		labelWidth : 100,
		labelAlign : 'right',
		buttonAlign : 'center',
		items : [{
			layout : 'form',
			border : false,
			items : [{
				xtype : 'textfield',
				fieldLabel : '采购计划名称',
				lableWidth : 100,
				id : 'planName',
				name : 'planName',
				anchor : '89%'
			},{
				xtype : 'textfield',
				fieldLabel : '采购计划编号',
				lableWidth : 100,
				id : 'planNum',
				name : 'planNum',
				anchor : '89%'
			},{
				xtype : 'textfield',
				fieldLabel : '金额≧',
				lableWidth : 100,
				id : 'minAmount',
				name : 'minAmount',
				anchor : '89%'
			},{
				xtype : 'textfield',
				fieldLabel : '金额≦',
				lableWidth : 100,
				id : 'maxAmount',
				name : 'maxAmount',
				anchor : '89%'
			},{
				xtype : 'textfield',
				fieldLabel : '编制人',
				lableWidth : 100,
				id : 'makePerson1',
				name : 'makePerson1',
				anchor : '89%'
			},{
				xtype : 'datefield',
				fieldLabel : '编制时间',
				lableWidth : 100,
				id : 'markTime1',
				name : 'markTime1',
				format : 'Y-m-d',
				anchor : '89%'
			}]
		}]
//		items : [{
//			layout : 'form',
//			border : false,
//			items : [{
//				border : false,
//				html : '<br><br><table border="0"><tr><td width="120">采购计划类型:</td><td><div id="stockStatus1"></div></td></tr></table>'
//			}, {
//				border : false,
//				html : '<table border="0"><tr><td width="120">采购计划状态:</td><td><div id="stockStatus2"></div></td></tr></table>'
//			}, {
//				border : false,
//				html : '<table border="0"><tr><td width="120">金额:</td><td><div id="moneyCompare"></div></td><td><input type="text"  id="money" style="width:100px;height:20px"/></td></tr></table>'
//			}, {
//				border : false,
//				html : '<table border="0"><tr><td width="120">编制时间:</td><td><div id="markTime1div"></div></td></tr></table>'
//			}]
//		}]
	});

	var win1 = new Ext.Window({
				title : "采购计划查询",
				layout : 'fit',
				width : 300,
				height : 250,
				autoScroll : true,
				closeAction : 'close',
				items : queryItem,
				buttons : [{
					text : '查询',
					handler : function() {
						stockPlanList.quereyparam1.planName = Ext
								.getCmp("planName").getValue();
						stockPlanList.quereyparam1.planNum = Ext
								.getCmp("planNum").getValue();
						stockPlanList.quereyparam1.minAmount = Ext
								.getCmp("minAmount").getValue();
						stockPlanList.quereyparam1.maxAmount = Ext
								.getCmp("maxAmount").getValue();
						stockPlanList.quereyparam1.status = Ext
								.getCmp("stockStatus1").getValue();
						stockPlanList.quereyparam1.truename = Ext.
								getCmp("makePerson1").getValue();
						stockPlanList.quereyparam1.markTime = Ext
								.getCmp("markTime1").getValue();
						stockPlanList.ds2.load();
						win1.close();
					}
				}, {
					text : '重置',
					handler : function() {
//						Ext.getCmp("stockBox1").setValue(null);
//						Ext.getCmp("stockBox2").setValue(null);
//						Ext.get("money").dom.value = '';
//						Ext.getCmp("stateBox").setValue(null);
//						Ext.getCmp("markTime1").setValue(null);
						
						Ext.getCmp("planName").setValue(null);
						Ext.getCmp("planNum").setValue(null);
						Ext.getCmp("minAmount").setValue(null);
						Ext.getCmp("maxAmount").setValue(null);
						Ext.getCmp("stockStatus1").setValue(null);
						Ext.getCmp("makePerson1").setValue(null);
						Ext.getCmp("markTime1").setValue(null);
					}
				}, {
					text : '关闭',
					handler : function() {
						win1.close();
					}
				}]
			}).show();

	var strartTime1 = new Ext.form.DateField({
				renderTo : 'markTime1div',
				id : 'markTime1',
				emptyText : '编制时间',
				width : 180,
				dateFormat : 'Y-m-d'
			});

	var ds1 = [{
				'name' : '',
				'text' : '全部'
			},{
				'name' : '1',
				'text' : '固定资产'
			}, {
				'name' : '2',
				'text' : '非固定资产'
			}]
	var store1 = new Ext.data.JsonStore({
				data : ds1,
				fields : ['name', 'text']
			})
	var stateBox1 = new Ext.form.ComboBox({
				renderTo : 'stockStatus1',
				id : 'stockBox1',
				hideOnSelect : true,
				store : store1,
				width : 160,
				displayField : 'text',
				valueField : 'name',
				forceSelection : true,
				triggerAction : 'all',
				emptyText : '请选择...',
				mode : 'local'
			});

	var ds2 = [
			{
				'name' : '',
				'text' : '全部'
			},{
				'name' : '1',
				'text' : '编制中'
			}, {
				'name' : '2',
				'text' : '审批中'
			}, {
				'name' : '3',
				'text' : '已审批'
			}]
	var store2 = new Ext.data.JsonStore({
				data : ds2,
				fields : ['name', 'text']
			})
	var stateBox2 = new Ext.form.ComboBox({
				renderTo : 'stockStatus2',
				id : 'stockBox2',
				hideOnSelect : true,
				store : store2,
				width : 160,
				displayField : 'text',
				valueField : 'name',
				triggerAction : 'all',
				forceSelection : true,
				emptyText : '请选择...',
				mode : 'local'
			});

	var state = new Array();
	state[1] = ['>='];
	state[2] = ['<='];
	state[3] = ['='];
	state[4] = ['>'];
	state[5] = ['<'];

	var stateBox = new Ext.form.ComboBox({
				renderTo : 'moneyCompare',
				id : 'stateBox',
				hideOnSelect : true,
				store : state,
				width : 80,
				triggerAction : 'all',
				emptyText : '请选择...',
				mode : 'local'
			});

}

var queryWin2 = function() { // 计划草案查询
	
	var stateBox = new Ext.form.ComboBox({
		id : 'stateBox',
		fieldLabel : '审批状态',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['','全部'],['4','已审批'],['6','已退回']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width :100,
		forceSelection : true,
		anchor : '89%',
		emptyText : '请选择'
	});
	var queryItem = new Ext.form.FormPanel({
		id : 'form2',
		border : false,
		labelWidth : 100,
		labelAlign : 'right',
		buttonAlign : 'center',
		items : [{
			layout : 'form',
			border : false,
			items : [{
				xtype : 'textfield',
				fieldLabel : '审批计划编号',
				lableWidth : 100,
				id : 'declarePlanNum',
				name : 'declarePlanNum',
				anchor : '89%'
			},stateBox,{
				xtype : 'textfield',
				fieldLabel : '编制人',
				lableWidth : 100,
				id : 'makePerson2',
				name : 'makePerson2',
				anchor : '89%'
			},{
				xtype : 'datefield',
				fieldLabel : '编制时间',
				lableWidth : 100,
				id : 'markTime2',
				name : 'markTime2',
				format : 'Y-m-d',
				anchor : '89%'
			}]
		}]
	});

	var win1 = new Ext.Window({
		title : "计划草案查询",
		layout : 'fit',
		width : 300,
		height : 180,
		autoScroll : true,
		closeAction : 'close',
		items : queryItem,
		buttons : [{
			text : '查询',
			handler : function() {
				var oo = Seam.Remoting
						.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.PlandraftVo");
				stockPlanList.quereyparam2.status = Ext.getCmp("stateBox")
						.getValue();
				stockPlanList.quereyparam2.makeTablePerson = Ext
						.get("makePerson2").getValue();
				stockPlanList.quereyparam2.declarePlanNum = Ext
						.get("declarePlanNum").getValue();
				if (null != Ext.getCmp("markTime2").getValue()
						&& "" != Ext.getCmp("markTime2").getValue()) {
					stockPlanList.quereyparam2.makeTime = new Date(Ext
							.getCmp("markTime2").getValue()).format('Y-m-d');
				}
				//当没有选择时间做查询的时候
				else{
					stockPlanList.quereyparam2.makeTime = null;
				}

				stockPlanList.ds1.load();
				win1.close();
			}
		}, {
			text : '重置',
			handler : function() {
				Ext.getCmp("declarePlanNum").setValue(null);
				Ext.getCmp("stateBox").setValue(null);
				Ext.get("makePerson2").dom.value = '';
				Ext.getCmp("markTime2").setValue(null);
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();

	

}

var createContractWin = function(){
Seam.Component.getInstance("stockPlan_Remote").getCode(function(result) {
	stockPlanList.careateContractItem  = new Ext.form.FormPanel({
		id : 'contractForm',
		border : false,
		labelWidth : 120,
		labelAlign : 'left',
		items : [{
					xtype : 'fieldset',
					title : '基本信息',
					layout : 'column',
					items : [{
								columnWidth : .5,
								border : false,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											fieldLabel : '审签单编号',
											name : 'num',
											value : result,
											disabled : true,
											width : '90%'
										},{
											xtype : 'textfield',
											fieldLabel : '合同名称',
											name : 'cName',
											allowBlank : false,
											disabled : false,
											width : '90%'
										},new Ext.form.ComboBox({
												id : 'supplierId',
												name : 'supplierId',
												width : 140,
												allowBlank : false,
												fieldLabel : '供应商',
												hideOnSelect : false,
												store : new Ext.data.SimpleStore({
													fields : [{
														name : 'value'
													}, {
														name : 'label'
													}]
												}),
												triggerAction : 'all',
												valueField : 'value',
												displayField : 'label',
												emptyText : "请选择...",
												mode : 'local'
										}),
										new Ext.form.ComboBox({
											id : 'typeBox',
											name:'typeBox',
											fieldLabel : '合同类型',
											hideOnSelect : true,
											allowBlank : false,
											store :  new Ext.data.JsonStore({
												data : [{
														'name' : '2',
														'text' : '比价'
													}, {
														'name' : '3',
														'text' : '招标'
													}],
													fields : ['name', 'text']
											}),
											width : 140,
											displayField : 'text',
											valueField : 'name',
											triggerAction : 'all',
											forceSelection : true,
											emptyText : '请选择...',
											mode : 'local'
										})]
							}, {
								columnWidth : .5,
								border : false,
								layout : 'form',
								items : [{
											xtype : 'textfield',
											fieldLabel : '合同编号',
											name : 'cCode',
											//disabled : true,
											width : '90%'
										}, {
											xtype : 'textfield',
											fieldLabel : '合同金额',
											name : 'cAmount',
											allowBlank : false,
											disabled : false,
											width : '90%'
										}, {
											xtype : 'datefield',
											fieldLabel : '到货日期',
											name : 'cDate',
											allowBlank : false,
											format : 'Y-m-d',
											disabled : false,
											width : '90%'
										}, {
											xtype : 'textfield',
											fieldLabel : '备注',
											allowBlank : false,
											name : 'cBakinfo',
											disabled : false,
											width : '90%'
										}]
							}]
				},{
								width : '90%',
								layout : 'column',
								border : false,
								items : [{
											columnWidth : .7,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'textfield',
														id : 'fileValeName',
														fieldLabel : '&nbsp;&nbsp;&nbsp;合同文件',
														name : 'fileValeName',
														allowBlank : false,
														disabled : false,
														width : '90%'
													}]
										}, {
											columnWidth : .2,
											layout : 'form',
											border : false,
											items : [{
														xtype : 'button',
														text : '点击上传',
														disabled : false,
														width :  '90%',
														handler : function() {
															stockPlanList.fileUpload(true);
														}
													}]
	
										}]
							}]
	});
	
	Seam.Component.getInstance("stockPlan_Remote").getType(null,
				function(result) {
					var data = eval('(' + result + ')');
					Ext.getCmp("supplierId").store.loadData(data);
				});
	
	var win1 = new Ext.Window({
		title : "生产采购合同",
		layout : 'fit',
		width : 600,
		height : 300,
		autoScroll : true,
		closeAction : 'close',
		items : stockPlanList.careateContractItem,
		buttons : [{
			text : '确定',
			handler : function() {
				var s = stockPlanList.gridPanel2.getSelectionModel().getSelections();
				var form = stockPlanList.careateContractItem.getForm('contractForm').getFieldValues();
				
				Ext.MessageBox.confirm("提示", "是否真的要生成采购合同？", function(ret) {
					for (var i = 0, r; r = s[i]; i++) {
						var oo = Seam.Remoting.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo");
						oo.setFlag(4);
						oo.setProName("Auto_Code_p.Contract_Insert_p");
						oo.setStockId(r.data.planId);
						oo.setSCode(form.num);
						oo.setContractCode(form.cName);
						oo.setContractName(form.cCode);
						oo.setContractAmount(form.cAmount);
						oo.setSupplierId(form.supplierId);
						oo.setArrvialDate(form.cDate.format("Y-m-d"));
						oo.setContractType(form.typeBox);
						oo.setReMark(form.cBakinfo);
						oo.setFileName(form.fileValeName);
						Seam.Component.getInstance("stockPlan_Remote").exePro(oo, function(result) {});	
					}
				})
				win1.close();
			}
		}, {
			text : '关闭',
			handler : function() {
				win1.close();
			}
		}]
	}).show();
})
}

var getBar2 = function(flag) {

	var backButtion = function() {
		var btn = new Ext.Button({
			text : '退回',
			iconCls : 'Cancel',
			disabled : privilegeValidate.rollPDisable,
			width : "40",
			handler : function() {

				var s = stockPlanList.gridPanel2.getSelectionModel()
						.getSelections();
				if (s.length == 0) {
					Ext.MessageBox.alert("提示", "请先选择要打回的数据!");
				} else {
					var result = 0;
					for(var j=0;j<s.length;j++){
						if(s[j].get('status')!=1 &&s[j].get('status')!=0){
							result += 1;
						}
					}
					if(result>0){
						Ext.MessageBox.alert("提示", "只有“编制中”和 “未编制”状态的 “采购计划”才能执行“打回”操作!");
					}else{
						Ext.MessageBox.confirm("提示", "是否真的要打回计划？", function(btn) {
							if(btn == 'yes'){
								for (var i = 0, r; r = s[i]; i++) {
									var oo = Seam.Remoting
											.createType("com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo.CommonVo");
									oo.setFlag(3);
									oo.setProName("Auto_Code_p.Cgjh_Plan_Back_p");
									oo.setProcurementPlan_ID(r.data.planId);
									Seam.Component.getInstance("stockPlan_Remote")
											.exePro(oo, function(result) {
//														alert(result);
														stockPlanList.ds2.reload();
													});	
								}
									//重新加载页面（即刷新）
//									stockPlanList.quereyparam1.planType = Ext
//										.getCmp("stockBox1").getValue();
//									stockPlanList.quereyparam1.status = Ext
//											.getCmp("stockBox2").getValue();
//									stockPlanList.quereyparam1.money = Ext.get("money")
//											.getValue();
//									stockPlanList.quereyparam1.moneyCompare = Ext
//											.getCmp("stateBox").getValue();
//									stockPlanList.quereyparam1.markTime = Ext
//											.getCmp("markTime1").getValue();
//									stockPlanList.ds2.on('beforeload', function(ds, options) {
//										Ext.apply(ds.baseParams, stockPlanList.quereyparam1);
//									});
									//stockPlanList.ds2.baseParams={limit:20,start:0}
									Ext.MessageBox.alert("提示", "操作成功!"); 
									
							}
						})
					}
				}

			}
		});
		return btn;
	}

	var submitButtion = function() {
		var btn = new Ext.Button({
					text : '送审',
					disabled : privilegeValidate.sendCDisable,
					iconCls : 'Send',
					width : "40",
					handler : function() {
						stockplanAction.submitContract();
					}
				});
		return btn;
	}

	var exportButtion = function() {
		var btn = new Ext.Button({
					text : '导出',
					iconCls : 'icon-exportTasks',
					width : "40",
					handler : function() {
					}
				});
		return btn;
	}

	var printButtion = function() {
		var btn = new Ext.Button({
					text : '打印',
					iconCls : 'Import',
					width : "40",
					handler : function() {
						alert("success!");
					}
				});
		return btn;
	}

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						queryWin1();
					}
				});
		return btn;
	}
	
	var createContractButton = function() {
		var btn = new Ext.Button({
					text : '生成采购合同',
					iconCls : 'search1',
					handler : function() {
						var s = stockPlanList.gridPanel2.getSelectionModel().getSelections();
						if (s.length == 0) {
							Ext.MessageBox.confirm("提示", "请先选择要执行的数据!");
						} else {
							for (var i = 0, r; r = s[i]; i++) {
								if(2 != r.data.planType){
									Ext.MessageBox.confirm("提示", "只能选择\"采购计划类型\" 为 \"非固定资产\"的数据!",function(){
										stockPlanList.ds2.load();									
									});
								}else{
									createContractWin();
								}
							}
						}
						
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : [backButtion(), '-', submitButtion(), 
						//屏蔽导出和打印按钮
//						'-', exportButtion(), '-', printButtion() ,
						'-',queryButtion()
						//生成采购合同项（现隐藏）
//						,'-',createContractButton()
						,'-',{
		text : '导出',
		disabled : privilegeValidate.exportPDisable,
		iconCls : 'icon-exportTasks',
		handler:function(){
			var record = Ext.getCmp('stockPlan_ds2').getSelectionModel().getSelected();
			var recordsum=Ext.getCmp('stockPlan_ds2').getSelectionModel().getCount();
			if (record == null || recordsum != 1) {
				Ext.Msg.alert('提示', '请选择一条导出的记录！');
				return;
			}
	
//	for ( var i = 0; i < records.length; i++) {
//		if(i!=0){
//			str+=",";
//		}
//		str+=records[i].get('planId');
////		arr.push(records[i].get('declareId'));
////		if(records[i].get('status')!="编制中"){
////			Ext.Msg.alert('提示', '请选择编制中的信息！');
////				return;
////		}
//	}
			 var inputs = '<input type="hidden" name="className" value="stockPlan_Remote"/>'
				+ '<input type="hidden" name="planId" value="'+record.get('planId')+'"/>' 
				+ '<input type="hidden" name="plan" value="'+record.get('planNum')+'"/>'
				+ '<input type="hidden" name="methodName" value="exportDeclareReportGridData"/>' 
				+ '<input type="hidden" name="fileName" value="物资需求计划通知单"/>';
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
		}
	}]
			})

	return tbar;
}

var getBar1 = function() {

	var submitButtion = function() {
		var btn = new Ext.Button({
					text : '生成',
					iconCls : 'CreateLog',
					width : "40",
					handler : function() {
						var s = stockPlanList.gridPanel.getSelectionModel().getSelections();
						if (s.length == 0) {
							Ext.MessageBox.confirm("提示", "请先选择要生成采购计划的信息!");
						} 
						else{
							var type = null;
							for(i=0;i<s.length;i++){
							   if(type==null){
							      type = s[i].get("propertyType");
							   }else if(type!=s[i].get("propertyType")){
								   Ext.Msg.alert('提示','请选择相同的资产类别');
								   return;
							   }
							} 
							if(type=="固定资产")
								type = "1";
							else
								type = "2";
							createStockPlan(type);
						}
					}
				});
		return btn;
	}

	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					width : "40",
					handler : function() {
						queryWin2();
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : ['-', queryButtion(),'-']
			})

	return tbar;

}

stockPlanList.stockPlan1 = function() { // 计划草案
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel([sm,new Ext.grid.RowNumberer(), {
		header : "申报计划名称",
		dataIndex : 'declarePlanName',
		renderer : function(value, cellmeta, record, rowIndex) {
			return "<span style='cursor:pointer' onClick=\"stockPlanList.stockPlan1MoreInfo('"
					+ record.get('declareId')
					+ "')\"><font color=\"blue\">"
					+ record.get('declarePlanName') + "</font></span>";
		}

	}, {
		header : "申报计划编号",
		dataIndex : 'declarePlanNum'
	}, {
		header : "资产类别",
		dataIndex : 'propertyType'
	}, {
		header : "总项数",
		dataIndex : 'totalItem'
	}, {
		header : "金额(单位：元)",
		dataIndex : 'money'
	}, {
		header : "状态",
		dataIndex : 'status',
		renderer : function(value, cellmeta, record, rowIndex) {
			if (1 == record.get('status')) {
				return "编制中";
			} else if (2 == record.get('status')) {
				return "编制中";
			} else if (3 == record.get('status')) {
				return "已送审";
			} else if (4 == record.get('status')) {
				return "已审批";
			} else if(6 == record.get('status')){
				return "已退回";
			}else {
				return "";
			}
		}
	}, {
		header : "制表人",
		dataIndex : 'makeTablePerson'
	}, {
		header : "编制时间",
		dataIndex : 'makeTime'
	}, {
		header : "送审时间",
		dataIndex : 'submitTime'
	}]);

	cm.defaultSortable = true;
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/stockPlan_Remote.getStockdraftData',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'declareId'
			}, ['declareId', 'declarePlanName', 'declarePlanNum', 'totalItem',
					'money', 'status', 'makeTablePerson', 'makeTime',
					'submitTime','makeTablePersonId','propertyType']);

	stockPlanList.ds1 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	stockPlanList.gridPanel = new Ext.grid.EditorGridPanel({
				store : stockPlanList.ds1,
				cm : cm,
				title : '计划草案',
				height : 250,
				layout : 'fit',
				tbar : getBar1(),
				selModel : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : stockPlanList.limit,
							store : stockPlanList.ds1,
							displayInfo : true
						})
			});
	stockPlanList.ds1.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, stockPlanList.quereyparam2);

			});
	stockPlanList.gridPanel.on('activate', function() {
		stockPlanList.ds1.baseParams = {start:0,limit:20};
		stockPlanList.ds1.reload();
		
	});
	return stockPlanList.gridPanel;
}

stockPlanList.stockPlan2 = function() { // 采购计划
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([
	new Ext.grid.RowNumberer(), 
	sm,
	{
		header : "采购计划名称",
		dataIndex : 'planName',
		renderer : function(value, cellmeta, record, rowIndex) {
			if (record.get('planType') == 1) { // 调用固定资产 。1固定资产计划 2其他计划。
				// 固定资产计划（1，土建及设备大修 2，机电设备
				// 3车辆 ）
				
				//多传递一个参数   decode(status,1,'编制中',2,'已送审',3,'已审批','error')
				return "<span style='cursor:pointer' onclick=\"purchasePlanGrid.gridPanel('"
						+ record.get('planId') 
						+ "','"
						+ record.get('status')
						+ "')\"><font color=\"blue\">"
						+ record.get('planName') + "</font></span>";
			} else { // 调用非固定资产
				return "<span style='cursor:pointer' onclick=\"purchasePlanGrid.threeHeaderGrid('"
						+ record.get('planId')
						+ "','"
						+ record.get('status')
						+ "')\"><font color=\"blue\">"
						+ record.get('planName') + "</font></span>";
			}
		}
	}, {
		header : "采购计划编号",
		width : 180,
		dataIndex : 'planNum'
	}, {
		header : "采购计划类型",
		dataIndex : 'planType',
		renderer : function(value, cellmeta, record, rowIndex) {
			if (1 == record.get('planType')) {
				return "固定资产";
			} else if (2 == record.get('planType')) {
				return "非固定资产";
			} else {
				return "";
			}
		}
	}, {
		header : "金额(单位：元)",
		dataIndex : 'money'
	}, {
		header : "状态",
		dataIndex : 'status',
		renderer : function(value, cellmeta, record, rowIndex) {
			if ('0' == record.get('status')) {
				return "未编制";
			}
			else if (1 == record.get('status')) {
				return "编制中";
			} else if (2 == record.get('status')) {
				return "审批中";
			} else if (3 == record.get('status')) {
				return "已审批";
			} else {
				return "";
			}
		}
	},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id = record.get('planId');
							var applicationStatus = record.get("status");
//							if(applicationStatus!="1"){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
	}, {
		header : "编制人",
		dataIndex : 'markPerson'
	}, {
		header : "编制时间",
		dataIndex : 'markTime'
	}
//	, {
//		header : "送审时间",
//		dataIndex : 'submitTime',
//		hidden:true
//	}
	]);

	cm.defaultSortable = true;
	
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/stockPlan_Remote.getStockPlan',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'planId'
			}, ['planId', 'planName', 'planNum', 'planType', 'stockType',
					'stockPlanStatus', 'money', 'status', 'markPerson',
					'markTime', 'submitTime']);

	stockPlanList.ds2 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	stockPlanList.gridPanel2 = new Ext.grid.EditorGridPanel({
				store : stockPlanList.ds2,
				id : 'stockPlan_ds2',
				cm : cm,
				title : '采购计划',
				height : 250,
				layout : 'fit',
				tbar : getBar2(),
				selModel : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : stockPlanList.limit,
							store : stockPlanList.ds2,
							displayInfo : true
						})
			});
	stockPlanList.ds2.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, stockPlanList.quereyparam1);

			});
	stockPlanList.gridPanel2.on('activate', function() {
		stockPlanList.ds2.baseParams ={start :0 ,limit : 20};
		stockPlanList.ds2.reload();
	});
	return stockPlanList.gridPanel2;
}