//默认空白图片
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var taskProcessMain = {tab:null,grid:null,args:{start:0,limit:8},baseargs:null,
				egrid:null};

taskProcessMain.init = function(){
//taskProcessMain.columnTree = taskProcessColumntree.init();
	
//	taskProcessMain.cenpanel = new Ext.Panel({
//		layout:'border',
//		title:'任务进度',
//		items:[
//				taskProcessMain.columnTree
//				]
//	});	
    taskProcessMain.t4 = new Ext.Panel({
				id : 'etabpanel14',
				height : 800,
				title : ''+getResource('resourceParam1681')+'',
				layout : 'fit'
				
		
	  });
	  
		taskProcessMain.tab = new Ext.TabPanel({			
		 		region:'center',
		 		//minTabWidth:300,
		 		resizeTabs:true,
				 items:[
					 taskProcessMain.t4
				 ],
				 activeTab:0
		    });
	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
        taskProcessMain.tab,
	       	taskProcessWest.init()
        ]
    });    

     taskProcessMain.t4.doLayout();
}
Ext.onReady(taskProcessMain.init,taskProcessMain,true)
