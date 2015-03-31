/** 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var ExpertView = { 
};

ExpertView.tabs = function (){

	var Expert_tab = ExpertGrid.tabPanel();	//专家库
	var projectExpertRelationGrid_tab = ProjectExpertRelationGrid.tabPanel();//供应商选评
	return [Expert_tab,projectExpertRelationGrid_tab];


}
 
