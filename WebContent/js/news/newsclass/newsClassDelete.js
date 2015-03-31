var newsClassDelete = {};
newsClassDelete.deleteNewsClass = function(){
	if (newsClass.node==null){
		return false;
	}
	Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
	    	Seam.Component.getInstance("news_newsclass_NewsClassService").deleteNewsClass(newsClass.node.attributes.classid,newsClassDelete.del); 
	    }
	})		
};
newsClassDelete.del = function(returnvo){
	if (returnvo.sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam637')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});
		newsClass.tree.getLoader().load(newsClass.tree.getRootNode());
		//将选中记录置为空
		newsClass.node = null;				
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: returnvo.value,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
