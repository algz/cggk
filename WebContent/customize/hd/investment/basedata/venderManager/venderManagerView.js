/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderManagerView = { 
};

venderManagerView.tabs = function (){

	var venderManager_tab = venderManagerGrid.tabPanel();	//供应商目录
    var venderAppraisal_tab = venderAppraisalGrid.tabPanel();//供应商考核
	return [venderManager_tab
//	,venderAppraisal_tab
	];


}
 
