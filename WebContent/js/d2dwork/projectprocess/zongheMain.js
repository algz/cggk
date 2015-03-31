Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var zongheMain = {queryForm:null,cenpanel:null,renwugrid:null,daohangHtml:new Array(),
					daohang:null,args:{start:0,limit:25},baseargs:null,taskid:null,
					chargeddepid:null,taskname:null,chargeddepname:null,tablename:null,a:null,gaojiForm:null};


zongheMain.init = function(){
	zongheMain.renwugrid  = zongheGrid.grid();
	zongheMain.taskdetrails = taskdetails.init();
    var today = new Date();
//    today.setMonth(0);
//    today.setDate(1);
    var parms=today.dateFormat('Y-m-d');
    
//	甘特图
    zongheMain.proejectGrid= Sch.ProjectGantt.init(today);
	zongheMain.queryForm = zongheNorth.getForm();
	zongheMain.tabpanel1 = new Ext.Panel({
						region:'center',
						id:'tabpanel1',
						layout:'fit',
					 	items:[zongheMain.proejectGrid]
					 });
	zongheMain.tabpanel2 = new Ext.Panel({
						region:'center',
						id:'tabpanel2',
						layout:'fit',
					 	title:''+getResource('resourceParam463')+getResource('resourceParam6076'), // 列表
					 	items:[zongheMain.renwugrid]
					 });				 
   zongheMain.tabpanel3 = new Ext.Panel({
						region:'center',
						id:'tabpanel3',
						layout:'fit',
					 	title:''+getResource('resourceParam463')+''+getResource('resourceParam857')+'',
					 	items:[zongheMain.taskdetrails]
					 });
	zongheMain.cenpanel = new Ext.Panel({
				id : 'zongheMainTap',
				region : 'center',
				layout : 'card',
				resizable : false,
				activeItem : 0,
				items : [zongheMain.tabpanel1,zongheMain.tabpanel2,zongheMain.tabpanel3]
			});				 
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	zongheMain.queryForm,
	       	zongheMain.cenpanel
        ]
        
    }); 
}


zongheMain.detailsOnclick = function(projectname, projectid,va) {
	// 北部面板赋值
	zongheMain.projectid = projectid;
	zongheMain.projectname = projectname;

	var str = '<div><span style="float:left;">【'+ projectname+ '】'+getResource('resourceParam857')+'</span><span style="float:right;">'
			+ ' <a style="cursor: hand" onclick="zongheMain.fack('+va+');">'+getResource('resourceParam1574')+'</a>'
			+ '</span><div>';

    zongheMain.tabpanel3.setTitle(str);
    zongheMain.tabpanel3.doLayout();
	zongheMain.cenpanel.layout.setActiveItem(2);
	zongheMain.cenpanel.doLayout();
	
	taskdetails.tabpanel.layout.setActiveItem(0);
    var activePanel = taskdetails.tabpanel.getActiveTab();
        activePanel.fireEvent('activate');
	taskdetails.tabpanel.doLayout();

}
zongheMain.fack=function(va)
{
   delete zongheMain.projectid;
   delete zongheMain.projectname;
   if(va==1)
   {
   	   zongheMain.cenpanel.layout.setActiveItem(0);
	   zongheMain.cenpanel.doLayout();
   }else
   {
	   zongheMain.cenpanel.layout.setActiveItem(1);
	   zongheMain.cenpanel.doLayout();
   }
}
Ext.onReady(zongheMain.init,zongheMain,true);
