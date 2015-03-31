Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var examplesMain = {
	tab : null,
	grid : null,
	args : {
		start : 0,
		limit : 8
	},
	baseargs : null,
	egrid : null,
	flag : false,
	onlinegrid : null,
	rightDataObjectID : null,
	rightDataType : null,
	leftDataObjectID : null,
	leftDataType : null,
	leftNodeID : null,
	rightNodeID : null,
	dataCenterID : null,
	fullRightNodeID : null,
	northPanel:null,
	centerPanel:null,
	westPanel:null
};
examplesMain.init = function() {

	examplesMain.lefttree = examplesleft.init();
	examplesMain.tabpanel=examplesTabpanel.init();
	var hh = "<div class='x-panel-header x-unselectable x-accordion-hd' style='height:25px;width:1800' align='left'>" +
			"<a href='javascript:void(0);'>"+getResource('resourceParam483')+"</a>&nbsp;|&nbsp;" +
			"<a href='javascript:void(0);'>"+getResource('resourceParam1170')+"</a>&nbsp;|&nbsp;"+
			"<a href='javascript:void(0);'>"+getResource('resourceParam475')+"</a>&nbsp;|&nbsp;"+
			"<a href='javascript:void(0);'>"+getResource('resourceParam1062')+"</a>&nbsp;|&nbsp;"+
			"<a href='javascript:void(0);'>"+getResource('resourceParam582')+"</a>&nbsp;|&nbsp;"+
			"</div>";
	
	//上面面板
	examplesMain.northPanel = new Ext.Panel({
		id : 'mnorthPanel',
		region : 'north',
		height :25,
		collapsible : true,
		html : hh
	});
	//左边面板
	examplesMain.westPanel = new Ext.Panel({
		id : 'mwestPanel',
		region : 'west',
		width:200,
		height:800,
		//autoScroll:true,
		collapsible : true,
		split:true,
		title:''+getResource('resourceParam724')+''
	});
	//中间面板
	examplesMain.centerPanel = new Ext.Panel({
		id : 'mcenterPanel',
		region : 'center',
		height:800,
		collapsible : true,
		items:[examplesMain.tabpanel]
		
	});
	var viewport = new Ext.Viewport({ // 页面布局
	    layout:'border',					//布局模式
        items:[
            examplesMain.northPanel,
            examplesMain.westPanel,
            examplesMain.centerPanel
        	]
	});
}
Ext.onReady(examplesMain.init, examplesMain, true)
