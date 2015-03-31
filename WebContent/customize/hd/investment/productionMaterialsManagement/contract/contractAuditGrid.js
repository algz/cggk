
var contractAuditGrid={};

contractAuditGrid.mainGrid =function(){
	return new Ext.Panel( {
		title : '合同审签列表',
		id : 'mainAuditGrid',
		layout : 'card',
		activeItem : 0,
		border:false,
		items:[contractAuditGrid.auditListGrid(),contractAuditGrid.contractDetailMainGrid()],//items : [  contractData.tabCard02(), contractData.tabCard03()],
		listeners : {
			activate : function(p){
				p.getLayout().setActiveItem(0);
			}
		}
	});
}
/**
 * 合同审签列表
 * @return {}
 */
contractAuditGrid.auditListGrid = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/contract_ProcurementContractRemote.getContracts?d='
									+ new Date(),
							method : 'post'
						}),
				autoLoad:true,
				baseParams:{start : 0, limit: 20},
				reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementContractId',
					totalProperty : 'totalProperty'
				}, [  'procurementContractId','contractCode','createDate','applicationStatus','materialType','attachments',
				      'editors','editorDept','vendName','arrivalDate','remark','contractAmount','purchaseId','auditCode','contractName'])
			});
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
		header : '审签单编号',
		dataIndex : 'auditCode',
		renderer : function(value, cellmeta, record, rowIndex) { 
			var id = record.get("procurementContractId");
			var type = value.substring(1,2);
			return "<a href='javascript:void(0);' onclick=contractAuditGrid.showContractDetail('"+id+"','"+type+"')>"+value+"</a>";
		}
	},{
		header : '合同名称',
		width:150,
		dataIndex : 'contractName',
		sortable : true
	},{
		header : '生成日期',
		dataIndex : 'createDate',
		sortable : true
	},{
		header : '申请状态',
		dataIndex : 'applicationStatus',
		sortable : true
	},{
		header : '审批进度',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex){
			var id = record.get("procurementContractId");
			var applicationStatus = record.get("applicationStatus");
			if(applicationStatus == '审批中' || applicationStatus == '已审批'|| applicationStatus == '已生成台账'){
				return "<a href='javascript:void(0);' onclick=contractAction.showFlowInstance('"
					+id+"')><font color=blue>查看</font></a>";
			}			
		},
		sortable : true
	},{
		header : '审批记录',
		dataIndex : '',
		renderer : function(value, cellmeta, record, rowIndex){
			var id = record.get("procurementContractId"); 
			var applicationStatus = record.get("applicationStatus");
			if(applicationStatus != '编制中'){
				return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
					+id+"')><font color=blue>查看</font></a>";
			}			
		},
		sortable : true
	},{
		header : '编辑人',
		dataIndex : 'editors',
		sortable : true
	},{
		header : '部门',
		dataIndex : 'editorDept',
		sortable : true
	},{
		header : '供应厂商',
		width:230,
		dataIndex : 'vendName',
		sortable : true
	} ]);

	var tbar = [ /*'-', {
		text : '导入',
		iconCls : 'Send',
		disabled :privilegeValidate.importHDisable,
		menu : {
                items: [{
                    text: '合同导入',
		handler : function() {
			var win=new contractData.fileUpload({url:'../ContractImportUploadServlet?contractType=1'});
			win.show();
		}
                }, {
                    text: '合同详情导入',
		handler : function() {
			var win=new contractData.fileUpload({url:'../ContractImportUploadServlet?contractType=2'});
			win.show();
		}
                }]}
	},*/ '-', {
		text : '送审',
		iconCls : 'Send',
		disabled :privilegeValidate.sendHDisable,
		handler : function() {
			var records = Ext.getCmp('auditListGrid').getSelectionModel().getSelections();
			if (records == null) {
				Ext.Msg.alert('提示', '请选择你要送审的合同！');
				return;
			}
			if (records.length > 1) {
				Ext.Msg.alert('提示', '请选择一个合同！');
				return;
			}
			for (var i = 0; i < records.length; i++) {
				var status = records[i].get('applicationStatus');
				if (status != '待审批') {
					Ext.Msg.alert('提示', '只能选择待审批状态的合同！');
					return;
				}
			}
			Ext.MessageBox.confirm('合同送审', '合同送审，是否继续？　', function(btn, text) {
						if (btn == 'yes') {

							var arr = new Array();
							var id = "";
							for (var i = 0; i < records.length; i++) {
								arr.push(records[i]
										.get('procurementContractId'));
								id += records[i].get('procurementContractId')
										+ ",";
							}
							var flowID = privilegeValidate.getFlowID('3');
							if (flowID == "") {
								Ext.Msg.alert('提示', '没有送审权限！');
								return;
							}
							approvePanel.submit(flowID, "合同审批", "合同审批", id
											.substring(0, id.length - 1),
									"Contract", true, approvePanelSuccess,
									approvePanelFailure);
						}
					});
		}
	}, {
	    text : '退回',
		iconCls : 'Cancel',
		disabled : privilegeValidate.checkPrivilege('41000007'),
		handler : function() {
			Ext.Msg.confirm('提示', '是否退回合同?', function(btn) {
				if (btn == 'yes') {
					var records = Ext.getCmp('auditListGrid')
							.getSelectionModel().getSelections();
					var procurementContractId = '';
					if (records.length == 0) {
						return Ext.Msg.alert('提示', '请选择记录!');
					}
					for (var i = 0; i < records.length; i++) {
						if (records[i].get('applicationStatus') != '编制中'
								&& records[i].get('applicationStatus') != '待审批') {
							return Ext.Msg.alert('提示', '请选择编制中、待审批的记录!');
						}
						if (i != 0) {
							procurementContractId += ',';
						}
						procurementContractId += records[i]
								.get('procurementContractId');
					}
					Ext.Ajax.request({
						url : '../JSON/contract_ProcurementContractRemote.delProcurementContractById?d='
								+ new Date().getTime(),
						method : 'POST',
						params : {
							procurementContractId : procurementContractId
						},
						success : function() {
							// var
							// obj=Ext.decode(response,response.responseText);
							Ext.getCmp('auditListGrid').store.reload();
							Ext.Msg.alert('提示', '合同删除成功!');
						},
						failure : function() {
							Ext.Msg.alert('错误', '合同删除失败!');
						}
					});
				};
			})
		}
	}, 

	'-', {
		text : '生成台账',
		iconCls : 'CreateLog',
		disabled :privilegeValidate.newTDisable,
		handler : function() {
			contractAction.addContractBook();
		}
	}, '-' ,'采购方式:',{
		xtype : "combo",
		id : 'selectType',
		triggerAction : 'all',
		editable : false, 
		anchor : '95%', 
		store:[['','全部'],['1','直接采购'],['2','比价'],['3','招标'],['4','协议采购'],['5','其它采购']],
		value : ''
	}, 
/*	{
		xtype : "textfield",
		id : "materialType",
		hidden:true
	},*/ {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			contractAction.search();
		}
	}];

	var grid = new Ext.grid.GridPanel({
				id : 'auditListGrid',
				cm : cm,
				sm : sm,
				store : store,
				autoScroll : true,
				border:false,
				tbar : tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
						})
			});
	return grid;
}

/**
 * 合同详情Form
 * @return {}
 */
contractAuditGrid.contractDetailForm=function(){
	return new Ext.form.FormPanel({
				id : 'contractDetailForm',
				fileUpload : true,
				region : 'north',
				frame : true,
				height : 85,
				padding : 5,
				border : false,
				items : [{
							xtype : 'hidden',
							name : 'procurementContractId'
						}, {
							xtype : 'hidden',
							name : 'applicationStatus'
						}, {
							layout : 'column',
							border : false,
							items : [{
										columnWidth : .5,
										layout : 'form',
										border : false,
										items : [{
													xtype : 'textfield',
													fieldLabel : '合同编号',
													name : 'contractCode',
													anchor : '90%',
													allowBlank : false,
													blankText : '合同编号不能为空！'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										border : false,
										items : [{
													xtype : 'textfield',
													fieldLabel : '合同名称',
													name : 'contractName',
													anchor : '90%',
													allowBlank : false,
													blankText : '合同名称不能为空！'
												}]
									}]
						}, {
							layout : 'column',
							border : false,
							items : [{
										columnWidth : .5,
										layout : 'form',
										border : false,
										items : [{
													xtype : 'numberfield',
													fieldLabel : '合同总金额',
													name : 'contractAmount',
													anchor : '90%',
													allowBlank : false,
													blankText : '合同总金额不能为空！',
													readOnly : true,
													allowDecimals : true,
													decimalPrecision : 2,
													minValue : 0,
													maxValue : 99999999.99,
													maskRe : /\d/
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										border : false,
										items : [{
													xtype : 'textfield',
													fieldLabel : '生产厂商',
													name : 'vendName',
													readOnly : true,
													anchor : '90%'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										border : false,
										items : [{
													xtype : 'fileuploadfield',
													id : 'form-file',
													fieldLabel : '合同',
													name : 'attachments',
													anchor : '90%',
													buttonText : '浏览...',
													allowBlank : true,
													blankText : '合同不能为空！'
												}]
									}]
						}]
			});
}

contractAuditGrid.contractDetailGrid=function(){
	var sm = new Ext.grid.CheckboxSelectionModel({
			width : 20
		});
	var cm = new Ext.grid.ColumnModel([sm,
       	    	new Ext.grid.RowNumberer({
				width : 30,
				header : "序号"
			}),{
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			},{
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			},{
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			},{
				header : "技术条件",
				width : 110,
				dataIndex : "technicCondition",
				sortable : true
			},{
		header : "交货状态",width : 80,
		dataIndex : 'deliveryStatus'
	},{
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			},{
				header : "供应商",
				width : 80,
				dataIndex : "vendorName" ,
				sortable : true
			},{
				header : "供应商中标价",
				width : 100,
				dataIndex : "price",
				sortable : true
			}, {
				header : "需求量",
				width : 80,
				dataIndex : 'materialCounts',//"needNumber",
				sortable : true
			}, {
				header : '申请数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
		},{
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true
			}, {
				header : "实际采购量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber", 
				sortable : true
			}, {
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName", 
				sortable : true
			}, {
				header : "需求编号",
				width : 110,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true,
				editor : new Ext.form.TextField({
				})
			},{
				header : "变更前数据",
				width : 80,
				align : "left",
				dataIndex : 'oldquantity',
				sortable : true
			} ,{
				header : "变更人",
				width : 80,
				align : "left",
				dataIndex : 'changer',
				sortable : true
			}, {
				header : "变更时间",
				width : 80,
				align : "left",
				dataIndex : 'changtime',
				sortable : true
			} ,{
				header : '变更原因',
				width : 80,
				align : "left",
				dataIndex : "changreson",
				sortable : true
			} ]);
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridDataByContract?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'remark', 'demension',
						'procurementId', 'newProcessType', 'desingnation',
						'purchaseType', 'materialId', 'backNumber', 'onNumber',
						'storeNumber', 'needNumber', 'purchaseTypeName',
						'requestCode', 'optLock', 'purchaseId', 'productCode',
						'technicCondition', 'noCheck', 'noExpend', 'operable',
						'productCode', 'provideNumber', 'subtotal', 'contract',
						'number_applications', 'amount_applications',
						'subtotal_number', 'subtotal_amount', 'super_storage',
						'redeployment', 'last_year_Consume',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber','price','note','reserve',
						'oldquantity','changer','changtime','changreson','deliveryStatus'
						])
	});
		
	return new Ext.grid.GridPanel({
				store : store,
				sm : new Ext.grid.CheckboxSelectionModel(),
				cm : cm,
				id : 'procurementDetailGridId12',
				region:'center',
				border:false,
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
						})
			});
}

contractAuditGrid.contractDetailMainGrid = function(){
	var tbar = [ '-','合同模板:',{
		xtype : "combo",
		id : 'modelType',
		triggerAction : 'all',
		editable : false, 
		anchor : '95%', 
		border:false,
		store:[['','请选择合同模板'],
				['实物采购合同模板','实物采购合同模板'],
				['武器装备配套产品订货合同(导弹)','武器装备配套产品订货合同(导弹)'],
				['武器装备配套产品订货合同(飞机)','武器装备配套产品订货合同(飞机)'],
				['武器装备配套产品修理合同','武器装备配套产品修理合同']
			   ],
		value : ''
	}, {
		text : '生成合同文件',
		id:'createContract',
		iconCls : 'CreateLog',
		handler : function() { 
			contractAction.createContract(); 
		}
	}, '-', {
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			Ext.getCmp('mainAuditGrid').getLayout().setActiveItem(0);
		}
	}, '-', {
		text : '保存',
		iconCls : 'save1',
		disabled : privilegeValidate.updateHDisable,
		id : 'saveContract',
		handler : function(){
			if(Ext.getCmp('contractDetailForm').form.isValid()){
				// 判断文件类型是否合法（doc、docx、pdf、rar、zip）
				var subNames = new Array('.doc','.docx','.pdf','.rar','.zip','.xls');
				var fileName = Ext.getCmp('contractDetailForm').form.findField('form-file').getValue();
				var applicationStatus = Ext.getCmp('contractDetailForm').form.findField('applicationStatus').getValue();
				var subName = fileName.substring(fileName.lastIndexOf('.'));
				var i;
				if(applicationStatus != '编制中'){
					for(i=0; i<subNames.length; i++){
						if(subName == subNames[i]) break;
					}
					if(i == subNames.length){
						Ext.Msg.alert('提示','只能上传类型为[doc、docx、pdf、rar、zip、xls]的文件！');
						return;
					}
				}
				Ext.getCmp('contractDetailForm').form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../ContractUploadServlet',
					method : 'post',
					success : function(form, action) {
						Ext.Msg.alert('提示','保存数据成功！');
						form.reset();
						var tab = Ext.getCmp('mainAuditGrid');
						tab.getLayout().setActiveItem(0);
						var grid = Ext.getCmp('auditListGrid');
						grid.getStore().reload();
					},
					failure : function(form, action){
						Ext.Msg.alert('提示',action.result.ImportExcelVo.returnMsg);
					}
				});
			}else{
				Ext.Msg.alert('提示','请正确填写数据！');
			}			
		}
	},'-',{
			text : '新增物资',
			id:'addContract',
			disabled : privilegeValidate.addHmDisable,
			icons : 'add1',
			handler : function(){
//				获取采购方式和合同供应商id
				var form = Ext.getCmp('contractDetailForm').form;
				var id = form.findField('procurementContractId').getValue();
				contractAuditGrid.addMaterialToContract(id);
			}
	},'-',{
			text : '删除物资',
			id:'delContract',
			icons : 'del1',
			disabled : privilegeValidate.delHmDisable,
			handler : function(){
				var form = Ext.getCmp('contractDetailForm').form;
				var id = form.findField('procurementContractId').getValue();
				contractAuditGrid.delMaterialFromContract(id);
			}
	}];

	return new Ext.Panel({
		layout : 'border',
		tbar : tbar,
		items : [contractAuditGrid.contractDetailForm(), contractAuditGrid.contractDetailGrid()/*{
			xtype : 'container',
			region : 'center',
			id : 'card02',
			layout : 'card',
			activeItem : '0',
			items : [contractData.procurementDetailPanel('procurementDetailGridId11','N'),
			         contractData.procurementDetailPanel('procurementDetailGridId12','L')]
		}*/]
	});
	
	
}

/**
 * 显示合同详情
 * @param {} id
 * @param {} type
 */
contractAuditGrid.showContractDetail = function(id,type) {
	var record=Ext.getCmp('auditListGrid').getSelectionModel().getSelected();
	var store=Ext.getCmp('procurementDetailGridId12').getStore();
	var flag=false;
	if(record.get('applicationStatus') == '已生成台账'||
		record.get('applicationStatus') == '已审批'){
		flag=true;
	}
	Ext.getCmp('form-file').setDisabled(flag);
	Ext.getCmp('createContract').setDisabled(flag);
	Ext.getCmp('saveContract').setDisabled(flag||privilegeValidate.updateHDisable?true:false);
	Ext.getCmp('addContract').setDisabled(flag||privilegeValidate.addHmDisable?true:false);
	Ext.getCmp('delContract').setDisabled(flag||privilegeValidate.delHmDisable?true:false);
	
	Ext.getCmp('contractDetailForm').getForm().loadRecord(record);
	Ext.getCmp('mainAuditGrid').getLayout().setActiveItem(1);
	store.baseParams = {start:0, limit:20, contractId:record.get('procurementContractId')};
	store.load();	
}
/*
var contractData = {
//		isDisabled : true
}; 


Ext.namespace("contractData.fileUpload")
*//**
 * 
 * @class procurementProcessData.fileUpload
 * @extends Ext.Window
 *//*
contractData.fileUpload = Ext.extend(Ext.Window, {
	id : "fileUploadWin",
	layout : 'fit',
	width : 300,
	url:'',
//	autoHeight : true,
	title : '上传文件',
	modal : true,
	initComponent : function() {
		var win = this;
		Ext.applyIf(this, {
			items : new Ext.FormPanel({
				id : 'fileUploadForm',
				// buttonAlign : 'center',
				labelAlign : 'left',
				border:false,
				autoHeight:true,
//				height : 100,
				padding : 5,
				fileUpload : true,
				labelWidth : 70,
				frame : false,
				items : [{
							xtype : "textfield",
							fieldLabel : '上传文件',
							name : 'file',
							inputType : 'file',
							allowBlank : false
						}]
			}),
			buttons : [{
				text : '确定',
				handler : function() {
					var form=Ext.getCmp('fileUploadForm')
					if (!form.form.isValid())
						return;
					var fileName = form.form.findField('file').getValue()
							.toLowerCase().trim();
					if (fileName.lastIndexOf('.') == -1) {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					if (fileName.substr(fileName.lastIndexOf('.')) != '.xls') {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					form.form.doAction('submit', {
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : win.url,
						method : 'POST',
						success : function(form, action) {
							var grid = Ext.getCmp('auditListGrid');
							grid.store.baseParams = {
								start : 0,
								limit : 20
							};
							grid.store.load();
							win.close();
						},
						failure : function(form, action) {
//							win.close();
							Ext.Msg.alert('提示',
									action.result.ImportExcelVo.returnMsg);
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					win.close();
				}
			}]
		})

		contractData.fileUpload.superclass.initComponent.call(this);//必须放在末尾,否则出错
	}

})*/

contractAuditGrid.addMaterialToContract = function(id){
	var sm = new Ext.grid.CheckboxSelectionModel(); 
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/parityRemote.getParityGridDataById?d='+new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'parityId', 'parityCode', 'createDate', 'deliveryDate',
			'applicationStatus', 'applicationStatusName', 'editors',
			'editorsNmae', 'editorsDept', 'purchaseId', 'purchaseCode',
			'vendorId', 'vendorName', 'type', 'typeName', 'materialId',
			'desingnation', 'materialItemName', 'materialStandard','technicCondition',
			'mCtgName','price','deliveryStatus','amount_applications','actualNumber','procurementCode' ])
	});
	//分页工具栏   
	var paging = new Ext.PagingToolbar({
		store : store,
		pageSize : 20,
		displayInfo : true,
		displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
		emptyMsg : '没有记录'
	}); 
	var cm = new Ext.grid.ColumnModel([ sm, 
		{header : '编号',dataIndex : 'parityCode',sortable : true}, 
		{header : '器材名称',dataIndex : 'materialItemName',width : 80,sortable : true}, 
		{header : "牌号",width : 80,dataIndex : "desingnation"}, 
		{header : "规格/型号",width : 80,dataIndex : "materialStandard"}, 
		{header : "技术条件",width : 80,dataIndex : "technicCondition"}, 
		{header : "采购计划编号",width : 120,dataIndex : "procurementCode"}, 
		{header : "申请数量",dataIndex : "amount_applications"}, 
		{header : "实际采购数量",dataIndex : "actualNumber"}, 
		{header : "交货状态",dataIndex : 'deliveryStatus'},
		{header : ' 生成日期 ',dataIndex : 'createDate',width : 120}, 
		{header : ' 交货日期 ',dataIndex : 'deliveryDate',width : 100}, 
		{header : '中标供应商 ',dataIndex : 'vendorName',width : 80} 
	]);
	var grid = new Ext.grid.GridPanel({
		id : 'ContractWithMaterialGrid',
		cm : cm, 
		sm : sm,
		columnLines : true,
		stripeRows : true,
		bbar : paging,
		region : 'center',
		store : store,
		loadMask : {
	    	 msg : '正在加载数据，请稍侯……'
	    },
		tbar : new Ext.Toolbar({
			items : ['-',{
				extype : 'button', 
				iconCls : 'save1',
				text : '提交',
				handler : function(){
//								保存合同与物资关联关系表
					contractAuditGrid.submitMaterial(id);
					win.close();
				}
			},'-'
		]})
	
	});
	
	var win = new Ext.Window({
		title : '合同添加物资窗口',
		width : 800,
		id : 'addMaterialToContractWin',
		layout : 'fit',
		height : 360,
		autoScroll:false,
		autoDestroy: true,
		resizable: false, 
		modal : true,
		items : [grid]
	});
	store.baseParams = {
		start : 0,
		limit : 20,
		contractId : id
	};
	store.load();
	win.show();
}

contractAuditGrid.submitMaterial = function(id){
	var grid = Ext.getCmp('ContractWithMaterialGrid');
	var ids = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择需要关联的物资!'); 
		return;
	}
	for(var i = 0;i < rows.length;i++){   
		ids = ids + rows[i].get('parityId') + ",";
	}
	Ext.Ajax.request({
		url : '../JSON/parityRemote.submitMaterial?d='+new Date(),
		method : 'POST',
		success : function(response, options) {
			var result = Ext.util.JSON.decode(response.responseText);
			if(result.success == false){
				Ext.Msg.alert('提示', '操作失败！');
			} else {
				var grid = Ext.getCmp('procurementDetailGridId12');				
				grid.store.reload(); 
				Ext.Msg.alert('提示', '操作成功！');
			}
		},
		params : {
			parityId : ids,
			contractId : id // 这里要与权限那边一致
		}
	});
}

contractAuditGrid.delMaterialFromContract = function(id){
	var grid = Ext.getCmp('procurementDetailGridId12');
	var materialId = "";
	var vendorId = "";
	var puchaseId = "";
	var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
	if(rows.length == 0){
	 	Ext.MessageBox.alert('提示', '请选择一条记录!'); 
		return;
	}
	for(var i = 0;i < rows.length;i++){   
		puchaseId = puchaseId + rows[i].get('purchaseId') + ",";
		materialId = materialId + rows[i].get('materialId') + ',';
	}
	var count =Ext.getCmp('procurementDetailGridId12').getStore().getCount();
	if(rows.length == count){
		Ext.Msg.alert('提示', '不能删除所有数据，至少保留一条！');
		return;
	}
	var type = rows[0].get('purchaseType');
	vendorId = rows[0].get('vendorId');
//	供应商id
//	puchaseid
//	合同id
//	物资id
	Ext.MessageBox.confirm('提示','确定删除数据吗?',function(e){
			if(e=='yes'){
				Ext.Ajax.request({
					url : '../JSON/parityRemote.delMaterialFromContract?d='+new Date(),
					method : 'POST',
					success : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						if(result.success == false){
							Ext.Msg.alert('提示', '操作失败！');
						} else {
							var grid = Ext.getCmp('procurementDetailGridId12');				
							grid.store.reload(); 
							Ext.Msg.alert('提示', '操作成功！');
						}
					},
					params : {
						purchaseId : puchaseId,
						vendorId : vendorId,
						materialId : materialId,
						contractId : id,
						type : type
					}
				});
			}
	});
	
}