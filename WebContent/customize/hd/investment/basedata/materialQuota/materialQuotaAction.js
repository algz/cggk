var materialQuotaAction = {};

// 上传材料定额文件方法
materialQuotaAction.upload = function() {
	var win = materialQuotaAction.fileUploadForm();
	win.show();
}
// 上传材料定额form
materialQuotaAction.fileUploadForm = function(rd) {
	var items = [ {
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id : 'materialQuotaFileUpload',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {
		id : 'materialQuotaFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,
		frame : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	var buttons = [{
		text : '确定',
		handler : function() {
			materialQuotaSubmit(window,inform);
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {
		id : "materialQuotaFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;材料定额-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
//材料定额上传submit操作方法
function materialQuotaSubmit(window,inform){
	//对上传文件进行格式验证。
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
					inform.form.doAction('submit',{
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : '../MaterialQuotaUploadServlet',
						method : 'post',
						//成功时，刷新页面
						success : function(form, action) {
							var showMessage = action.result.ImportExcelVo.returnMsg + '!';
							Ext.Msg.alert('提示',showMessage);
							form.reset();
							window.close();
							common.gridPanel.refush();
						},
						//失败时，回馈错误信息
						failure : function(form, action){
							window.close();	
							//不存在机型。
							var data1 = action.result.ImportExcelVo.noExistProducts;
							var reader1 = new Ext.data.ArrayReader({id:0},
								[{name:'productCode',mapping:0}]);
							var store1 = findMaterialQuotaStore(data1,reader1);								
							//不存在物料信息
							var showMessage2 = action.result.ImportExcelVo.newMaterials;
							var data2 = {id : 0,root : showMessage2 };
							var reader2 = new Ext.data.JsonReader({id:'id',root:'root'},
								['materialItemName','materialStandard','desingnation','technicCondition']);
							var store2 = findMaterialQuotaStore(data2,reader2);
							//数据库中已存在物料信息
							var showMessage3 = action.result.ImportExcelVo.redupMaterials;
							var data3 = {id : 0,root : showMessage3 };
							var reader3 = new Ext.data.JsonReader({id:'id',root:'root'},
								['materialItemName','materialStandard','desingnation','technicCondition','productCode']);
							var store3 = findMaterialQuotaStore(data3,reader3);
							
							var win = materialQuotaErrorMessageWin(store1,store2,store3);
							store1.load();
							store2.load();
							store3.load();
							win.show();
						}
					});
}


//获得store
function findMaterialQuotaStore(data,reader){
	var store = new Ext.data.Store({
		proxy : new Ext.data.MemoryProxy(data),
		reader : reader
	});		
	return store;
}

//材料定额错误信息窗口
function materialQuotaErrorMessageWin(store1,store2,store3){
	var win = new Ext.Window({
		title : '&nbsp;错误记录',
		width : 520,
		height : 300,
		layout : 'fit',
		autoScroll : true,
		items : [{
			xtype : 'tabpanel',
			activeTab : 0,
			items : [{
				xtype : 'panel',
				title : '以下机型不存在',
				layout : 'fit',
				autoScroll : true,
				items : common.gridPanel('grid1',
								new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
									{header:'机型',dataIndex:'productCode'}]),
									store1,null,null,null,'')
			},{
				xtype : 'panel',
				title : '以下物资信息不存在',
				layout : 'fit',
				autoScroll : true,
				items : common.gridPanel('grid2',
						new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
				        {header:'物料名称',dataIndex:'materialItemName'},{header:'规格',dataIndex:'materialStandard'},
				        {header:'牌号',dataIndex:'desingnation'},{header:'技术条件',dataIndex:'technicCondition'}
				    ]),store2,null,null,null,'')
			},{
				xtype : 'panel',
				title : '以下定额信息已重叠',
				layout : 'fit',
				autoScroll : true,
				items : common.gridPanel('grid3',
						new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
				        {header:'物料名称',dataIndex:'materialItemName'},{header:'规格',dataIndex:'materialStandard'},
				        {header:'牌号',dataIndex:'desingnation'},{header:'技术条件',dataIndex:'technicCondition'},
				        {header:'机型',dataIndex:'productCode'}
				    ]),store3,null,null,null,'')
			}]
		}]
	});
	
	return win;
}