/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var registrationView = { 
};

registrationView.tabs = function (){

	var registration_tab = registrationGrid.tabPanel();	//入厂登记
	var admissionTest_tab = admissionTestGrid.tabPanel();	//入厂检验
	var materialsReport_tab = materialsReport.tabPanel();//物资报表
	return [registration_tab,admissionTest_tab,materialsReport_tab];


}
 
