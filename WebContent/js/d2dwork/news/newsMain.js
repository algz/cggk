Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsMain = {
	grid : null,
	baseargs : null,
	newsGridList : null
};

newsMain.init = function() {
	newsMain.newsGridList = newsGrid.grid();
	var newsFrom = newsFromPanel.init();
	newsMain.cardpanel = new Ext.Panel({
		border : false,
		layout:'card',
		items : [newsMain.newsGridList,newsFrom],
		activeItem : 0
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
			region : 'center',
			layout : 'fit',
			split : true,
			items : [newsMain.cardpanel]
		}]

	});
//	viewport.doLayout();
	myGrid.loadvalue(newsMain.newsGridList.store, {
		start : 0,
		limit : 25
	}, newsMain.baseargs);
		
};
newsMain.setActiveItem = function(index , myGrid){
	var height = Ext.getBody().getHeight() - 120;
	newsMain.cardpanel.getLayout().setActiveItem(index);
	if(!myGrid){
		Ext.getCmp('richEditor').load({
	        url:'../js/richEditor.jsp?height=' + height
	    });
	}else{
		var content = myGrid.get("content");
		var title = myGrid.get("title");
		Ext.getCmp("news_textfield").setValue(title);
		try{
			FCKeditorAPI.GetInstance("dictContent").setHtml(content);
		}catch(e){
			Ext.getCmp('richEditor').load({
	   			 url:'../js/richEditor.jsp?height=' + height,
	   			 params:{content:content}
			});
		}
	}
};
Ext.onReady(newsMain.init);
