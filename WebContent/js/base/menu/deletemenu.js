var deletemenu = {};
deletemenu.deletemenu = function(){
	if (menu.node==null){
		return false;
	}
	Ext.MessageBox.confirm(getResource('resourceParam1724')/*'警告！'*/, ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
	    	Seam.Component.getInstance("base_menu_MenuSerivce").deleteMenu(menu.node.attributes.menuid,deletemenu.delmenu); 
	    }
	})		
};
deletemenu.delmenu = function(returnvo){
	if (returnvo.sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam637')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});
		menu.tree.getLoader().load(menu.tree.getRootNode());
		//将选中记录置为空
		menu.node = null;
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
