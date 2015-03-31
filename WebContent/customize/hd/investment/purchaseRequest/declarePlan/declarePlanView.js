var declarePlanView = { 
};

declarePlanView.tabs = function (){
	
	
	//申报单位
	var declareDemartment = declare_demartment.tabPanel(); 
	//采购用途
	var declareUse = declare_use.tabPanel();
	//综合查询
	var declareQuery = declare_query.tabPanel();  
	//申报计划列表 
	var declarePlantab = declarePlan.tabPanel(); 
	
	return [declareDemartment,declareUse,declareQuery,declarePlantab];
}
 
