var inventoryAction = {
	exlType : null
};

// 上传
inventoryAction.upload = function(winTitle) {
	var win = inventoryAction.fileUploadForm();
	win.title = '&nbsp;'+winTitle+'-上传';
	win.show();
}
inventoryAction.fileUploadForm = function(rd) {
	var items = [ {
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id : 'inventoryFileUpload',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {
		id : 'inventoryFileUploadForm',
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
								url : '../InventoryUploadServlet?exlType='+inventoryAction.exlType,
								method : 'post',
								success : function(form, action) {
									var showMessage = action.result.ImportExcelVo.returnMsg + '!';
									Ext.Msg.alert('提示',showMessage);
									form.reset();
									window.close();
									common.gridPanel.refush();
								},
								failure : function(form, action){
									window.close();	
									var data1 = action.result.ImportExcelVo.noExistProducts;
									var reader1 = new Ext.data.ArrayReader({id:0},
										[{name:'productCode',mapping:0}]);
									var store1 = new Ext.data.Store({
										proxy : new Ext.data.MemoryProxy(data1),
										reader : reader1
									});
									store1.load();
									
									var showMessage2 = action.result.ImportExcelVo.newMaterials;
									var data2 = {id : 0,root : showMessage2 };
									var reader2 = new Ext.data.JsonReader({id:'id',root:'root'},
										['materialItemName','materialStandard','desingnation','technicCondition']);
									var store2 = new Ext.data.Store({
										proxy : new Ext.data.MemoryProxy(data2),
										reader : reader2
									});
									store2.load();	
									
									var showMessage3 = action.result.ImportExcelVo.redupMaterials;
									var data3 = {id : 0,root : showMessage3 };
									var reader3 = new Ext.data.JsonReader({id:'id',root:'root'},
										['materialItemName','materialStandard','desingnation','technicCondition','productCode']);
									var store3 = new Ext.data.Store({
										proxy : new Ext.data.MemoryProxy(data3),
										reader : reader3
									});
									store3.load();
									
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
												items : new Ext.grid.GridPanel({store : store1,
													cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
												        {header:'机型',dataIndex:'productCode'}
												    ]),
												  loadMask : {msg:'正在加载数据，请稍后...'}})
											},{
												xtype : 'panel',
												title : '以下物资信息不存在',
												layout : 'fit',
												autoScroll : true,
												items : new Ext.grid.GridPanel({store:store2,
													cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
												        {header:'物料名称',dataIndex:'materialItemName'},{header:'规格',dataIndex:'materialStandard'},
												        {header:'牌号',dataIndex:'desingnation'},{header:'技术条件',dataIndex:'technicCondition'}
												    ]),
												  loadMask : {msg:'正在加载数据，请稍后...'}})
											},{
												xtype : 'panel',
												title : '以下定额信息已重叠',
												layout : 'fit',
												autoScroll : true,
												items : new Ext.grid.GridPanel({store:store3,
													cm : new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
												        {header:'物料名称',dataIndex:'materialItemName'},{header:'规格',dataIndex:'materialStandard'},
												        {header:'牌号',dataIndex:'desingnation'},{header:'技术条件',dataIndex:'technicCondition'},
												        {header:'机型',dataIndex:'productCode'}
												    ]),
												  loadMask : {msg:'正在加载数据，请稍后...'}})
											}]
										}]
									});
									
									win.show();
								}
							});
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {
		id : "inventoryFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;文件上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}
