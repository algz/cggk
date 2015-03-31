Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var gongyiwcMain = {queryForm:null,cenpanel:null,renwugrid:null,daohangHtml:new Array(),
					daohang:null,args:{start:0,limit:25},baseargs:null,taskid:null,
					chargeddepid:null,taskname:null,chargeddepname:null,tablename:null};


gongyiwcMain.init = function(){
	gongyiwcMain.renwugrid  = gongyiwcGrid.grid();
	gongyiwcMain.renwuInfogrid = gongyiInfoGrid.grid();
	gongyiwcMain.daohang = gongyiwcNorth.getDaohang();
	gongyiwcMain.daohang.hide();
	gongyiwcMain.queryForm = gongyiwcNorth.getForm();
	gongyiwcMain.tabpanel1 = new Ext.Panel({
						region:'center',
						id:'tabpanel1',
						layout:'border',
					 	title:'统计'+getResource('resourceParam652')+'-'+getResource('resourceParam733')+''+getResource('resourceParam1286')+'',
					 	items:[gongyiwcMain.renwugrid,gongyiwcMain.daohang]
					 });
	gongyiwcMain.tab = new Ext.TabPanel({			
		 		region:'center',
		 		minTabWidth:300,
		 		resizeTabs:true,
				 items:[
					 gongyiwcMain.tabpanel1,
					 {	
					 	xtype:'panel',
					 	id:'tabpanel2',
					 	title:''+getResource('resourceParam857')+'',
					 	layout:'border',
					 	items:[gongyiwcMain.renwuInfogrid]
					 }

				 ],
				 activeTab:0
     
		    });
	gongyiwcMain.tablename = 'technics';
	gongyiwcMain.tab.on('tabchange',function(tabpanel,panel ){
		gongyiwcUtil.Formatparams();
		gongyiwcMain.queryForm.getForm().reset();
		if(panel.id == 'tabpanel1'){
			gongyiwcMain.baseargs = {
				projectid:gongyiwcMain.projectid,
	  			taskid:gongyiwcMain.taskid,
	  			chargeddepid:gongyiwcMain.chargeddepid,
	  			tablename:gongyiwcMain.tablename
	  		};
			
		   // myGrid.loadvalue(gongyiwcMain.renwugrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
		}else{
			//myGrid.loadvalue(gongyiwcMain.renwuInfogrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
		}
	});
	gongyiwcMain.cenpanel = new Ext.Panel({
		region:'center',
		layout:'border',
		items:[
			gongyiwcMain.tab
			]
	});

	
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	gongyiwcMain.queryForm,
	       	gongyiwcMain.cenpanel
        ]
        
    });
    
    
    gongyiwcMain.tabpanel1.doLayout();
	gongyiwcMain.cenpanel.doLayout();
}
Ext.onReady(gongyiwcMain.init,gongyiwcMain,true);
