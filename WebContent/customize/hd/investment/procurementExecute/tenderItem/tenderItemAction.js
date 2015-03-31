var tenderItemAction={}
tenderItemAction.save=function(){ 
	var grid = Ext.getCmp('tenderItemGrid');
	var records = grid.getStore().getModifiedRecords();
	var records1 = grid.getSelectionModel().getSelections();
	if (records.length == 0 || records1 == null || records1.length ==0) {
		Ext.Msg.alert('提示', '请先选择招标方式，再提交数据!');
		return;
	} 
	var fixId = new Array();
	var procurementtype = new Array();
	for ( var i = 0; i < records1.length; i++) { 
	 
		if(records1[i].get("procurementtype")==""){
			Ext.Msg.alert('提示', '请先选择招标方式，再提交数据!');
			return;
		}
	}
	for ( var i = 0; i < records.length; i++) { 
		fixId.push(records[i].get("fixid"));
		procurementtype.push(records[i].get("procurementtype"));
	}
	var remote = Seam.Component.getInstance("stockPlan_Remote");
	remote.updateFixProcurementtype(fixId,procurementtype,tenderItemAction.CallBack);
	 
}
tenderItemAction.CallBack = function(){
	Ext.Msg.alert('提示', '提交成功');
	Ext.getCmp('tenderItemGrid').store.baseParams={start:0,limit:20,materialcatalogName:'土建'};
	Ext.getCmp('tenderItemGrid').store.load();
}