var deleteuser = {};
//删除用户入口
deleteuser.deleteuser = function(){	
	deleteuser.userids = user.useridall();
	if (deleteuser.userids == "false") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam886')+'');
		return false;
	}
	if (deleteuser.userids == "admin") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam883')+'');
		return false;
	}
	
	Ext.MessageBox.confirm(''+getResource('resourceParam1724')+'', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
	    	var appVo=Seam.Remoting.createType("com.luck.itumserv.base.user.GuserVo");
	    	appVo.setUserids(deleteuser.userids);
		    Seam.Component.getInstance("base_user_UserSerivce").deleteUser(appVo,deleteuser.deluser); 
	    } 
	})		
};
//用户删除后走的方法
deleteuser.deluser = function(value){
	var sign = value;	
	if (sign==true){
				Ext.example.msg("" + getResource('resourceParam575') + "",
				""+getResource('resourceParam884')+"!");	
		user.sm.clearSelections();
		user.baseargs={start:0,limit:25}
		myGrid.loadvalue(user.grid.store,user.baseargs,null);			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: ''+getResource('resourceParam885')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}	
};
