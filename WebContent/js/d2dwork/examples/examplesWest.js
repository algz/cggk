var examplesWest ={wwpanel:null};

examplesWest.init=function()
{
    //左边面板
	examplesMain.wwpanel = new Ext.Panel({
		id : 'wwpanel',
		region : 'west',
		width:200,
		height:800,
		//autoScroll:true,
		collapsible : true,
		split:true,
		title:''+getResource('resourceParam733')+'树'
	});	
	return examplesMain.wwpanel;
}
