var contractAction = {type:null};
contractAction.submitContract = function(type){  
	contractAction.type = type;
	var records = Ext.getCmp("contractPanel").getSelectionModel().getSelections();
	var amount;
	var id;
	var flowId;
	if(records == null || records.length==0){
		Ext.Msg.alert('提示','请选择你要送审的合同！');
		return ;
	}
	if(records.length>1){
		Ext.Msg.alert('提示','请选择一个合同！');
		return ;
	}
	for(var i=0;i<records.length;i++){ 
		if(records[i].get('status') != '1'){
			Ext.Msg.alert('提示','只能选择编制中状态的合同！');
			return;
		}
		//必须添加了项目编号的才能送审
		if(records[i].get('acceptnum')==null||records[i].get('acceptnum')==''){
			Ext.Msg.alert('提示','必须是添加了项目编号的合同才能送审！');
			return;
		}
		
		amount  = records[i].get('contractAmount');
		id = records[i].get('contractId')+type;
	}
	if(type==1){
		if(parseInt(amount)>500000)
			flowId = "442766";
		if(parseInt(amount)>100000)
			flowId = "442765";
		else
			flowId = "442764";
	}else{
		if(parseInt(amount)>500000)
			flowId = "442771";
		if(parseInt(amount)>100000)
			flowId = "442770";
		else
			flowId = "442769";
	} 
	Ext.MessageBox.confirm('合同送审', 
			'送审以后不能再编辑，是否继续？　', function(btn, text){
		if(btn == 'yes'){ 
			approvePanel.submit(flowId, "合同审批", "合同审批", id, 
					"CivilengineerinContract", true, contractAction.approvePanelSuccess, contractAction.approvePanelFailure); 
		}
	});
}

contractAction.approvePanelSuccess = function(){ 
    var remote = Seam.Component.getInstance("contract_Remote");
	var rows = Ext.getCmp("contractPanel").getSelectionModel().getSelections();
	var arr = new Array();
	for(var i=0;i<rows.length;i++){
		arr.push(rows[i].get('contractId')+contractAction.type);
	}
	remote.updateStatus(arr, function(result){
		for(i=0;i<rows.length;i++){
			rows[i].set('status','2');
		} 
	});
} 
contractAction.approvePanelFailure= function(){ 
	Ext.Msg.alert('提示', '没有送审权限！');
} 