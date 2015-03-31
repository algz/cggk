tenderAction = {};

//新增视图
tenderAction.addView = function(procurementPlanDetilId,tenderType,tenderId){
	var records = Ext.getCmp('tenderPlanGrid').getSelectionModel().getSelections();
	var win;
	if(procurementPlanDetilId=="")
	   win = tenderForm.getForm(null,procurementPlanDetilId,"type",tenderId)
	else
	   win = tenderForm.getForm(records[0],procurementPlanDetilId,tenderType,tenderId);
	win.show(); 
}

//查询视图
tenderAction.searchView = function(){
	var win = tenderQuery.getSearchForm("1");
	win.show();
}
  
//新增视图
tenderAction.addFixView = function(procurementPlanDetilId,tenderType,tenderId){  
	var records = Ext.getCmp('fixTenderGrid').getSelectionModel().getSelections(); 
	var win; 
	if(procurementPlanDetilId=="")
	   win = fixTenderForm.getForm(null,procurementPlanDetilId,"type",tenderId)
	else
	   win = fixTenderForm.getForm(records[0],procurementPlanDetilId,tenderType,tenderId);
	win.show();
}

//查询视图
tenderAction.searchFixView = function(){
	var win = tenderQuery.getSearchForm("2");
	win.show();
}
//招标管理删除
tenderAction.del = function(name){
	 	var records = Ext.getCmp(name).getSelectionModel().getSelections();
	 	if(records==null || records.length==0){
	 		Ext.Msg.alert('提示','请选择你要删除的招标信息！');
			return ;
	 	}
	 	var tenderId = new Array();
	 	for(var i=0;i<records.length;i++){ 
	 		//验证T_TENDER表中的tenderFileType字段的值
//	 		alert(records[i].get('tenderFileType'))
			if(records[i].get('tenderFileType') != '0'){
				Ext.Msg.alert('提示','只能选择没有送审过的信息！');
				return;
			}
			tenderId.push(records[i].get('tenderId')); 
		}
		Ext.MessageBox.confirm('删除信息', 
				'删除的信息无法恢复，是否继续？　', function(btn, text){
			if(btn == 'yes'){
		 	var remote = Seam.Component.getInstance("tenderRemote"); 
		 	remote.deleteTender(tenderId, function(result){
											Ext.Msg.alert('提示', '删除数据成功！'); 
											window.close();
											var pageType = '1';
											if(name == 'fixTenderGrid'){
												 pageType = '2';
											}
											Ext.getCmp(name).store.baseParams={start:0,limit:20,pageType:pageType};
											Ext.getCmp(name).store.load();
			});
			}
		})
}