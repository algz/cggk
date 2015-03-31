//chalanlx（查看类型）,当chakanlx是0时,为工作或项目安排者权限查看
//当chakanlx是1时,为工作或项目接受者权限查看
//glianId为关联表ID,由pinjialx决定关联的哪张表
//pinjialx为参与人员类型,0为工作安排,1为项目管理
var pingjiajgMain = {}

pingjiajgMain.init = function(chakanlx, glianId, pinjialx) {
	return pingjiajgUI.initGrid(chakanlx, glianId, pinjialx);
}
