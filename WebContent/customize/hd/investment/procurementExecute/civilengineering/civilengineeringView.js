var civilengineeringView = { 
};

civilengineeringView.tabs = function (){

	var tender_tab = tender.tabPanel();	//投标管理
    var tenderItem_tab = tenderItem.tabPanel();//招标项目
   // var tenderUnits_tab = tenderUnitsGrid.tabPanel();//招标单位信息
	return [tenderItem_tab,tender_tab,contractGrid.tabPanel(1)];//,tenderUnits_tab];


}
 
