var deptypeDelete={}
deptypeDelete.init=function(){
	if (myGrid.row == null) {
			Ext.MessageBox.show( {
				title : ''+getResource('resourceParam663')+'',
				msg : ''+getResource('resourceParam684')+'进行操作!',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			return false;
		}
	    var isbox = Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam475')+'的'+getResource('resourceParam698')+'无法恢复，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'继续?', function(
				btn, text) {
			if (btn == 'yes') {
				var appId = myGrid.row.get('deptypeid');
			    callSeam("maintenance_deptype_deptypeService","deptypeDelete",[appId],deptypeDelete.delreturn);
			}
		}).getDialog().setWidth(300)
}
deptypeDelete.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	myGrid.loadvalue(deptypeMain.deptypegrid.store,deptypeMain.args,{});
}
