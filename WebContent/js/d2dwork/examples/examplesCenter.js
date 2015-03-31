var examplesCenter ={cpanel:null,etabpanel:null};
examplesCenter.init=function()
{
	examplesCenter.egridpanel1= new Ext.Panel({
		id:'etabpanel1',
		height :800,
	 	title:getResource('resourceParam5001')//属性
	     });
	examplesCenter.egridpanel2= new Ext.Panel({
		id:'etabpanel2',
		height :800,
	 	title:''+getResource('resourceParam474')+''
	     });
	examplesCenter.egridpanel3= new Ext.Panel({
		id:'etabpanel3',
		height :800,
	 	title:''+getResource('resourceParam1154')+''
	     });
	examplesCenter.egridpanel4= new Ext.Panel({
		id:'etabpanel4',
		height :800,
	 	title:''+getResource('resourceParam607')+''
	     });
	examplesCenter.egridpanel5= new Ext.Panel({
		id:'etabpanel5',
		height :800,
	 	title:''+getResource('resourceParam629')+''
	     });
	
	//TAB面板
	examplesCenter.etabpanel=new Ext.TabPanel({
		id:'etabpanel',
		minTabWidth:300,
		resizeTabs:true,
		items:[
				examplesCenter.egridpanel1,
				examplesCenter.egridpanel2,
				examplesCenter.egridpanel3,
				examplesCenter.egridpanel4,
				examplesCenter.egridpanel5
			 ],
		activeTab:0
    });

	//中间面板
	examplesCenter.cpanel = new Ext.Panel({
		id : 'cPanel',
		region :'center',
		layout:'column',
		//collapsible : true,
		items:[examplesCenter.etabpanel]
	});
	return examplesCenter.cpanel;
}
