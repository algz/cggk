var vendorQualificationAction = {vendorId:null};

//新增视图
vendorQualificationAction.addView = function(vendorId){ 
	var win = vendorQualificationForm.getForm(null,vendorId);
	win.show();
}

//修改视图
vendorQualificationAction.editView = function(vendorId){
	var records = Ext.getCmp('vendorQualificationGridPanelId').getSelectionModel().getSelections(); 
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	} 
	var win = vendorQualificationForm.getForm(records[0],vendorId); 
	win.show();
}

//删除
vendorQualificationAction.del = function(vendorId){
	vendorQualificationAction.vendorId = vendorId;
	var records = Ext.getCmp('vendorQualificationGridPanelId').getSelectionModel().getSelections(); 
	if(records == null || records.length < 1){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}
	var arr = new Array();
			for(var i=0;i<records.length;i++){ 
				arr.push(records[i].get('id'));
			}
	Ext.MessageBox.confirm('删除供应商信息', 
			'删除的信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){  
			var remote = Seam.Component.getInstance("vendorQualificationRemote");
			remote.deleteVendorQualification(arr,vendorQualificationAction.delCallBack);
		}
	}); 
	
} 
vendorQualificationAction.delCallBack = function(){
		var grid = Ext.getCmp('vendorQualificationGridPanelId'); 
							grid.store.baseParams = {start :0 ,limit : 20,vendorId:vendorQualificationAction.vendorId};
							grid.store.load();		
}
vendorQualificationAction.showVendorQualificationList = function(name){
	var records =  Ext.getCmp(name).getSelectionModel().getSelections(); 
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要添加供应商资质的记录！');
		return;
	}
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	} 
	var vendorId = records[0].get("vendorID");
	var buttons = [   {
		text : '关闭',
		handler : function() { 
			window.close();
		}
	} ] 
	var window = new Ext.Window( {
		id : "vendorQualificationWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '供应商资质列表',
		modal : true,
		items : vendorQualificationGrid.gridPanel(vendorId,name),
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});  
	Ext.getCmp("vendorQualificationGridPanelId").getStore().baseParams = {start : 0,limit:20,vendorId:vendorId};
	Ext.getCmp("vendorQualificationGridPanelId").getStore().load();
	window.show();
}

