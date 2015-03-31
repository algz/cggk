var flowAction = {};
flowAction.showPanel = function(id,status,plantype){
	var win = null;
	if(plantype == "2"){
		win = new ProcurmentFlowViewWindow(id,status,plantype);
	}else if(plantype == "1"){
		win = new ProcurementFlowViewWindow2(id,status,plantype);
	}else if(plantype == "3"){
		win = new ProcurementFlowViewWindow3(id,status,plantype);
	}else if(plantype == "4"){
		win = new ProcurementFlowViewWindow4(id,status,plantype);
	}
	win.showWin();
}
flowAction.showDeclarePlanFlow = function(declareplanDetilID){
		var flowStepWindow = new FlowStepWindow({
								objectId : declareplanDetilID,
								objectType : 'DeclarePlan'
		});
		flowStepWindow.show(); 
}
flowAction.showContractPanel = function(id,type){
		var flowStepWindow ;
		if(type!="3"){
			flowStepWindow = new FlowStepWindow({
									objectId : id+type,
									objectType : 'CivilengineerinContract'
			});
		}else{
			flowStepWindow = new FlowStepWindow({
									objectId : id,
									objectType : 'Contract'
			});
		}
		flowStepWindow.show(); 
}