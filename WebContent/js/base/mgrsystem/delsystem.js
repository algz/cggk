
var delsystem = {};
/**
 * 删除选中子系统
 */
delsystem.init = function(btn, pressed){
	  if(myGrid.row == null){
	  	return false;
	  }
	  
      var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724')/*'警告！'*/, ''+getResource('resourceParam475')+'的子'+getResource('resourceParam559')+''+getResource('resourceParam508')+'无法恢复，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'继续?',function(btn, text){
	    if(btn == 'yes'){
	    	
	    	Ext.Ajax.request({
				url: "../JSON/user.delUser",
				success: delsystem.delreturn,
				disableCaching: true,
				autoAbort: true,
				params:{systemid:myGrid.row.get('subSystemId')}
			});
	    }  
	  })
    	/*if(myGrid.row != null){
        	alert(myGrid.row.get('loginname')+ '  ' + myGrid.row.get('cnname'));
    	}*/
}
delsystem.delreturn = function(response, opt){
	
	var sign = Ext.util.JSON.decode(response.responseText).result;
	if (sign=="true"){
		myGrid.row = null;
		Ext.MessageBox.show({
			title: getResource('resourceParam3002'),//'操作成功',
			msg: ''+getResource('resourceParam649')+'',
			buttons: Ext.MessageBox.OK
		})
				
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam651')+'',
			msg: ''+getResource('resourceParam650')+'',
			buttons: Ext.MessageBox.OK
		})
	}
	roleMain.baseargs = null;
	myGrid.loadvalue(systemgrid.rolegrid.store,systemgrid.args,systemgrid.baseargs);
}
