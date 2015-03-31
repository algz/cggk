//参与人员主界面类,若调用该类时直接调用init方法.并传入相应的参数
//chakanlx为传入的显示标签,
//当chakanlx为0时为新增加参与人员时显示样式,既初始化时不调用后台获取已经参与人员的列表
//当chakanlx为1时为修改参与人员时显示样式,既初始化时调用后台并获取已经参与人员列表
//当chakanlx为2时为查看参与人员样式,既不显示任何的工具条
//glianId为关联表ID,由renyuanlx决定关联的哪张表
//renyuanlx为参与人员类型,0为工作安排,1为项目管理
var renyuanMain = {}

renyuanMain.init = function(chakanlx, glianId, renyuanlx) {
	return renyuanUI.initGrid(chakanlx, glianId, renyuanlx);
}


