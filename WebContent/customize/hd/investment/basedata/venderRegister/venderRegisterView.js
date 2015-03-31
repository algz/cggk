/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var venderRegisterView = { 
};

venderRegisterView.tabs = function (){

	var venderRegister_tab = venderRegisterGrid.tabPanel();	//供应商登记
	var venderEvaluationGrid_tab = venderEvaluationGrid.tabPanel();//供应商选评
	return [venderRegister_tab,venderEvaluationGrid_tab];


}
 
