/**
 * 机构选择得下拉列表
 * param1  下拉id
 * param2  label名称
 * param3  下拉得hiddenName
 * param4  下拉占列宽
 * param5  是否验证 true 不 false 是
 * param6  是否是修改
 * param7  修改时传得值
 * 游松
 */
var instMain = {};

instMain.init = function(id,fieldLabel,hidden,anchor,allowBlank,isUpdate,value){
	instUI.getDataSource();
	return instUI.getinstUI(id,fieldLabel,hidden,anchor,allowBlank,isUpdate,value);
}
