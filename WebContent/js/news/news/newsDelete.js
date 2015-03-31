var newsDelete = {};
newsDelete.deleteNews = function(){
	if (myGrid.row==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam636')+'',function(btn, text){
	    if(btn == 'yes'){
	    	Seam.Component.getInstance("news_news_NewsService").deleteNews(myGrid.row.get('id'),newsDelete.del); 
	    }
	})		
};
newsDelete.del = function(value){
	if (value==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam637')+'',
			msg: ''+getResource('resourceParam1836')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});
		news.ds.reload();
		myGrid.row=null ;							
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam638')+'',
			msg: ''+getResource('resourceParam1837')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};
