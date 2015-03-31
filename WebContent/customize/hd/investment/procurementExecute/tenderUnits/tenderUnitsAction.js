var tenderUnitsAction = {};
tenderUnitsAction.save = function(tenderFileId){
	var grid = Ext.getCmp('tenderUnitsGrid');
	var records = grid.getStore().getModifiedRecords(); 
	var tenderUnitsID = new Array();
	var price  = new Array();
	var constructionUnderPoint = new Array();
	var venderId = new Array();
	var remark  = new Array();
	if (records.length > 0) {
		for ( var i = 0; i < records.length; i++) {
			 tenderUnitsID.push(records[i].get('tenderUnitsID'));
			 price.push(records[i].get('price'));
			 constructionUnderPoint.push(records[i].get('constructionUnderPoint'));
			 venderId.push(records[i].get('venderId'));
			 remark.push(records[i].get('remark'));
		}
	}else{
		Ext.Msg.alert('提示', '数据未修改，无需保存！');
		return;
	} 
	var remote = Seam.Component.getInstance("tenderUnits_tenderUnitsRemote"); 
	remote.saveTenderUnits(tenderFileId, tenderUnitsID, price, constructionUnderPoint, venderId, remark, function(result){
		Ext.Msg.alert('提示', '数据保存成功！'); 
		Ext.getCmp('tenderUnitsWin').close();
	});
}