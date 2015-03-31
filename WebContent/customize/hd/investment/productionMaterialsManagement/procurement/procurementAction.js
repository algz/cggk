var procurementAction = {};

// 上传
procurementAction.upload = function() {
	var win = procurementAction.fileUploadForm();
	win.show();
}
/**
 * 查看各机型的物资详细
 */
procurementAction.showDetail= function(materialid) { 
	var buttons = [
			 {
				text : '关闭',
				handler : function() { 
					window.close();
				}
			} ];
   
   var procurementAnnualPanle =  procurementAnnualData.Panel();
    procurementAnnualPanle.getStore().baseParams = {start : 0, limit: 20, 
						procurementId: procurementAnnualData.procurementId,
						nodeId : materialid,
						type : '1',materialBuyType:'2'}; 
	procurementAnnualPanle.getStore().load();
	var window = new Ext.Window( {
		id : "showDetailWind",
		width : 1000, 
		layout : 'fit',
		autoScroll : true,
		title : '明细',
		modal : true,
		items : procurementAnnualPanle ,
		buttons : buttons
	}); 
	window.show();
}
procurementAction.fileUploadForm = function(rd) {
	var items = [ {
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		allowBlank : false,
		anchor : '100%',
		id : 'file1',
		allowBlank : false
	}, {
		fieldLabel : '备注',
		name : 'remarks',
		xtype : 'textarea',
		height : 50,
		allowBlank : true,
		maxLength : 200,
		maxLengthText : '最多可输入200个字，请重新输入！',
		anchor : '100%'
	} ];

	var inform = new Ext.FormPanel( {
		id : 'procurementFileUploadForm',
		fileUpload : true,
		flex : 1,
		padding : 5,
		labelWidth : 60,
		labelAlign : 'left',
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	params = '';
	var buttons = [
			{
				text : '确定',
				handler : function() {
					procurementUploadSubmit(window,inform);
				}
			}, {
				text : '取消',
				handler : function() {
					inform.getForm().reset();
					window.close();
				}
			} ];

	var window = new Ext.Window( {
		id : "procurementFileUploadWind",
		width : 300,
		height : 180,
		layout : 'vbox',
		layoutConfig : {
			align : 'stretch'
		},
		autoScroll : true,
		title : '&nbsp;零星物资需求大纲-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
//零星物资需求大纲上传错误信息窗
function procurementErrorMessageWin(store1,store2){
	var win = new Ext.Window(
			{
				title : '&nbsp;错误记录',
				width : 520,
				height : 300,
				layout : 'fit',
				autoScroll : true,
				items : [ {
					xtype : 'tabpanel',
					activeTab : 0,
					items : [
							{
								xtype : 'panel',
								title : '以下机型不存在',
								layout : 'fit',
								autoScroll : true,
								items : new Ext.grid.GridPanel(
										{
											store : store1,
											cm : new Ext.grid.ColumnModel(
													[
															new Ext.grid.RowNumberer(),
															{
																header : '机型',
																dataIndex : 'productCode'
															} ]),
											loadMask : {msg:'正在加载数据，请稍后...'}
										})
							},
							{
								xtype : 'panel',
								title : '以下物资信息不存在',
								layout : 'fit',
								autoScroll : true,
								items : new Ext.grid.GridPanel(
										{
											store : store2,
											cm : new Ext.grid.ColumnModel(
													[
															new Ext.grid.RowNumberer(),
															{
																header : '物料名称',
																dataIndex : 'materialItemName'
															},
															{
																header : '规格',
																dataIndex : 'materialStandard'
															},
															{
																header : '牌号',
																dataIndex : 'desingnation'
															},
															{
																header : '技术条件',
																dataIndex : 'technicCondition'
															} ]),
											 loadMask : {msg:'正在加载数据，请稍后...'}
										})
							} ]
				} ]
			});
	return win;
}
//零星物资需求大纲上传submit操作方法
function procurementUploadSubmit(window,inform){
	if (!inform.form.isValid()) return;			
	var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
	if (fileName.lastIndexOf('.') == -1) {
		Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
		return;
	}
	if(fileName.substr(fileName.lastIndexOf('.')) != '.xls'){
		Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
		return;
	}
		inform.form
				.doAction(
						'submit',
						{
							waitMsg : '正在上传数据，请稍候...',
							waitTitle : '提示',
							url : '../ProcurementUploadServlet',
							method : 'post',
							success : function(form, action) {
								var showMessage = action.result.ImportExcelVo.returnMsg
										+ '!';
								Ext.Msg.alert('提示',
										showMessage);
								form.reset();
								window.close();
								var grid = Ext
										.getCmp('procurementSporadicGridId');
								grid.getStore().baseParams = {
									start : 0,
									limit : 20
								};
								grid.store.load();
							},
							failure : function(form, action) {
								window.close();
								
								if(action.result.ImportExcelVo.short){
									Ext.Msg.alert('提示',action.result.ImportExcelVo.returnMsg);
									return;
								}

								var data1 = action.result.ImportExcelVo.noExistProducts;
								var reader1 = new Ext.data.ArrayReader(
										{
											id : 0
										},
										[ {
											name : 'productCode',
											mapping : 0
										} ]);
								var store1 = new Ext.data.Store(
										{
											proxy : new Ext.data.MemoryProxy(
													data1),
											reader : reader1
										});
								store1.load();

								var showMessage2 = action.result.ImportExcelVo.newMaterials;
								var data2 = {
									id : 0,
									root : showMessage2
								};
								var reader2 = new Ext.data.JsonReader(
										{
											id : 'id',
											root : 'root'
										},
										[
												'materialItemName',
												'materialStandard',
												'desingnation',
												'technicCondition' ]);
								var store2 = new Ext.data.Store(
										{
											proxy : new Ext.data.MemoryProxy(
													data2),
											reader : reader2
										});
								store2.load();

								var win = procurementErrorMessageWin(store1,store2);
					
								win.show();
							}
						});
}


procurementAction.showSporadicDetail = function(id) {
	procurementSporadicData.procurementId = id;
	var cards = Ext.getCmp('mainViewPanel');
	cards.getLayout().setActiveItem(1);
	var grid = Ext.getCmp('procurementSporadicDataGrid');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		procurementId : id,
		type : '2'
	};
	grid.store.load();
}

procurementAction.deploySporadic = function() {
	var grid = Ext.getCmp('procurementSporadicGridId');
	var records = grid.getStore().getModifiedRecords();
	if (records.length != 0) {
		Ext.Msg.alert('提示', '数据已修改，请先保存再发布！');
		return;
	}
	records = grid.selModel.getSelections();
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要发布的需求大纲！');
		return;
	}
	for ( var i = 0; i < records.length; i++) {
		if (Ext.util.Format.trim(records[i].get('flag')) == '1') {
			Ext.Msg.alert('提示', '已发布的需求大纲不能重复发布！');
			return;
		}
		if (Ext.util.Format.trim(records[i].get('approvalPerson')) == ''
				|| Ext.util.Format.trim(records[i].get('requireDemartment')) == '') {
			Ext.Msg.alert('提示', '“申请人”和“需求单位”均不能为空！');
			return;
		}
	}
	
	Ext.Msg.show({
		title : '发布需求大纲',
		msg : '需求大纲发布后不能删除，是否继续？',
		width : 300,
		buttons : Ext.Msg.YESNO,
		icon : Ext.MessageBox.QUESTION,
		fn : function(btn, text) {
			if (btn == 'yes') {
				var arr = new Array();
				for ( var i = 0; i < records.length; i++) {
					arr.push(records[i].get('procurementId'));
				}
				callSeam("procurement_ProcurementRemote", "setProcurementFlag",
						[ arr ], procurementAction.callBack);
			}
		}
	});

}
procurementAction.delSporadic = function() {
	var grid = Ext.getCmp('procurementSporadicGridId');
	var records = grid.selModel.getSelections();
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的需求大纲！');
		return;
	}
	for ( var i = 0; i < records.length; i++) {
		var flag = records[i].get('flag');
		if (flag == '1') {
			Ext.Msg.alert('提示', '已发布的需求大纲不能删除！');
			return;
		}
	}
	Ext.Msg.show({
		title : '删除需求大纲',
		msg : '需求大纲删除后无法恢复，是否继续？',
		width : 300,
		buttons : Ext.Msg.YESNO,
		icon : Ext.MessageBox.QUESTION,
		fn : function(btn, text) {
			if (btn == 'yes') {
				var arr = new Array();
				for ( var i = 0; i < records.length; i++) {
					arr.push(records[i].get('procurementId'));
				}
				callSeam("procurement_ProcurementRemote", "deleteProcurement",
						[ arr ], procurementAction.callBack);
			}
		}
	});
}

procurementAction.saveSporadic = function() {
	var store = Ext.getCmp('procurementSporadicGridId').getStore();
	var records = store.getModifiedRecords();
	if (records.length == 0) {
		Ext.Msg.alert('提示', '数据未修改，无需保存！');
		return;
	}
	var str = "";
	if (records.length > 0) {
		for ( var i = 0; i < records.length; i++) {
			if ((i + 1) == records.length) {
				str += Ext.encode(records[i].data);
			} else {
				str += Ext.encode(records[i].data) + ',';
			}
		}
	}
	Ext.Ajax.request( {
		url : '../JSON/procurement_ProcurementRemote.saveGridData?d='
				+ new Date(),
		method : 'POST',
		params : {
			"updateRecords" : '[' + str + ']'
		},
		success : function() {
			Ext.Msg.alert('提示', '保存成功！');
			store.reload();
		},
		failure : function() {
			Ext.Msg.alert('错误', '保存失败！');
		}
	});
}

// 回调
procurementAction.callBack = function(r) {
	if (r) {
		var grid = Ext.getCmp('procurementSporadicGridId');
		grid.store.load();
	} else {
		Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
	}
}