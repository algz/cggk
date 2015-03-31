//评价工具类
var pingjiaUtil = {}
//判断选中的gird的行是否为空
pingjiaUtil.isNull = function(row) {
	if(row == null) {
    	Ext.MessageBox.show({
           title: ''+getResource('resourceParam965')+'',
           msg:''+getResource('resourceParam965')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
       	return false;
    }
    return true
}
