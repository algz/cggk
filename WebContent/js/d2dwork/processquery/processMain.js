//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var processMain = {tab:null,grid:null,args:{start:0,limit:8},baseargs:null,
				egrid:null};

processMain.init = function(){
	processMain.grid = processGrid.getGrid();
	processMain.egrid = entityGrid.getGrid();
	processMain.infogrid = processinfoGrid.getGrid();
	processMain.southpanel = new Ext.Panel({
		region:'south',
		autoScroll:true,
		height:250,
		items:[processMain.infogrid]
	});
	
	processMain.cenpanel = new Ext.Panel({
		layout:'border',
		title:''+getResource('resourceParam1532')+'',
		items:[
				processMain.grid
				]
	});
	
	processMain.enpanel = new Ext.Panel({
		//autoScroll:true,
		title:'属性',
	 	layout:'fit',
	 	items:[processMain.egrid]
	});
	
	processMain.tab = new Ext.TabPanel({			
		 		region:'center',
		 		//minTabWidth:300,
		 		resizeTabs:true,
				 items:[
					 processMain.cenpanel
				 ],
				 activeTab:0
		    });
	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
        processMain.tab,
	       	processWest.init()
        ]
    });
    
    processMain.southpanel.hide();
    processMain.cenpanel.doLayout();
    //processMain.enpanel.doLayout();
}
Ext.onReady(processMain.init,processMain,true)
