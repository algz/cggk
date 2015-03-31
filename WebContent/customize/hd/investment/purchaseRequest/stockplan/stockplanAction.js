var stockplanAction = {};
stockplanAction.submitContract=function(){
	var records = Ext.getCmp("stockPlan_ds2").getSelectionModel().getSelections();
	if(records == null || records.length==0){
		Ext.Msg.alert('提示','请选择你要送审的采购计划！');
		return ;
	} 
	var planType = ""; 
	for(var i=0;i<records.length;i++){
		var status = records[i].get('status');
		if(planType=="")
			planType = records[i].get('planType');
		else if(planType!=records[i].get('planType')){
			Ext.Msg.alert('提示','只能选择待相同类型的采购计划！');
			return ;
		} 
		if(status !='0'&&status!= '1'){
			Ext.Msg.alert('提示','只能选择编制中的采购计划！');
			return ;
		}
	}
	
	Ext.MessageBox.confirm('采购计划送审', 
			'采购计划送审，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			
			var arr = new Array();
			var id = "";
			for(var i=0;i<records.length;i++){
				arr.push(records[i].get('planId'));
//				id+=records[i].get('planId')+planType+",";
				id+=records[i].get('planId')+",";
			}
			var flowID = '440756';//440756其他计划     440755固定资产
			if(planType=='1')
				flowID = '440755';
			 
			approvePanel.submit(flowID, "采购计划审批", "采购计划审批", id.substring(0,id.length-1), 
					"ProcurementPlan", true, approvePanelSuccess, approvePanelFailure); 
		}
	});
}

function approvePanelSuccess(){
	var remote = Seam.Component.getInstance("stockPlan_Remote");
	var rows = Ext.getCmp("stockPlan_ds2").getSelectionModel().getSelections();
	var arr = new Array();
	for(var i=0;i<rows.length;i++){
		arr.push(rows[i].get('planId'));
	}
	remote.updateProperties(arr, function(result){ 
			for(i=0;i<rows.length;i++){
				rows[i].set('status','2');
			} 
	});
}

function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
}