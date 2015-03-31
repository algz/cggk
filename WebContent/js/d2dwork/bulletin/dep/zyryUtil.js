//参与人员工具类
var zyryUtil = {}

// 判断选中的gird的行是否为空
zyryUtil.isNull = function(row) {
	if (row == null) {
		Ext.MessageBox.show( {
			title : getResource('resourceParam965') + '',//请选择一项
			msg : getResource('resourceParam965') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	return true
}
