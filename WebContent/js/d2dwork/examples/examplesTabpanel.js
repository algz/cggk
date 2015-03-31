var examplesTabpanel ={tabpanels:null};
//下一页
examplesTabpanel.next=function()
{
	var id=examplesTabpanel.gridpanel1.layout.activeItem.getId();
	if(id='p1')
	{
      examplesTabpanel.gridpanel1.layout.setActiveItem(1);	
	}
}
//上一页
examplesTabpanel.priv=function()
{
	var id=examplesTabpanel.gridpanel1.layout.activeItem.getId();
	if(id='p2')
	{
	 examplesTabpanel.gridpanel1.layout.setActiveItem(0);
	}
}
examplesTabpanel.init=function()
{
	//TAB页面1
	
	var s1='<a href="javascript:void(0);" onclick="examplesTabpanel.next()">'+getResource('resourceParam1283')+'</a>';
	var s2='<a href="javascript:void(0);" onclick="examplesTabpanel.priv()">'+getResource('resourceParam944')+'</a>';
	//Card面板1
	var pane1=new Ext.Panel(
			{
		       id:'p1',
		       resizable:false,
		       title:'注册',
		       html:s1
		    	   
			});
	//Card面板2		
	var pane2=new Ext.Panel(
			{
			    id:'p2',
				resizable:false,
				title:'成功',
				html:s2
			});
	//Card面板		
	examplesTabpanel.gridpanel1  = new Ext.Panel({
		id:'tabpanel1',
		layout:'card',
		resizable:false,
		activeItem:0,
		height :800,
	 	title:''+getResource('resourceParam859')+'',
	 		//,
	 	items:[pane1,pane2]
	 });
	
	examplesTabpanel.panel2north=examplesNorth.init();
	examplesTabpanel.panel2west=examplesWest.init();
	examplesTabpanel.panel2center=examplesCenter.init();

	//TAB页面2
	examplesTabpanel.gridpanel2= new Ext.Panel({
		id:'tabpanel2',
		layout:'border',
		height :780,
	 	title:''+getResource('resourceParam1190')+'',
	 	items:[
	 	       examplesTabpanel.panel2center,
	 	       examplesTabpanel.panel2west,
	 	       examplesTabpanel.panel2north
	          ]
	     });
	//TAB页面3
	examplesTabpanel.gridpanel3 = new Ext.Panel({
		id:'tabpanel3',
		height :800,
	 	title:''+getResource('resourceParam474')+''
	 		//,
	 	//items:[]
	 });
	
	//TAB面板
	examplesTabpanel.tabpanels=new Ext.TabPanel({
		    id:'tabe',
	 		minTabWidth:300,
	 		resizeTabs:true,
			items:[
                    examplesTabpanel.gridpanel1,
                    examplesTabpanel.gridpanel2,
                    examplesTabpanel.gridpanel3
				 ],
			activeTab:0
	    });
	return examplesTabpanel.tabpanels;
}
