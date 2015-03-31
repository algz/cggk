var diaochawj = {grid:null,colModel:null,ds:null,tb:null,panel:null,row:null};
//生成列表
diaochawj.getColModel = function(){
	diaochawj.colModel = new Ext.grid.ColumnModel([
		{
			header: "问卷ID",
			width: 100,
			dataIndex: 'diaochId'},
		{
			header: "问卷"+getResource('resourceParam476')+"",
			width: 100,
			dataIndex: 'dchzhut'},
		{
			header: "调查范围",
			width: 100,
			dataIndex: 'dcleifen',
			renderer:diaochawj.dcleifenformat},
		{
			header: ""+getResource('resourceParam1269')+"",
			width: 100,
			dataIndex: 'kaishirq'},
		{
			header: ""+getResource('resourceParam1270')+"",
			width: 100,
			dataIndex: 'jieshurq'},
		{
			header: "问卷"+getResource('resourceParam500')+"",
			width: 100,
			dataIndex: 'wjzhutai',
			renderer:diaochawj.wjzhutaiformat},
		{
			header: ""+getResource('resourceParam1268')+"",
			width: 100,
			dataIndex: 'cjjigou'}					
	]);
};
diaochawj.dcleifenformat = function(status){
	if(status==2){
		return ""+getResource('resourceParam882')+"";
	}else if(status==3){
		return "人员";
	}else{
		return "不限";
	}
};
diaochawj.wjzhutaiformat = function(status){
	if(status==1){
		return ""+getResource('resourceParam1266')+"";
	}else if(status==2){
		return ""+getResource('resourceParam506')+"";
	}else{
		return ""+getResource('resourceParam1267')+"";
	}
};
diaochawj.getDataStore = function(){
	var url = "../JSON/d2dwork_wenjuandc_wenjuandc_WenjuandcSvr.getGrid";
	//var url = '../data/d2dwork/diaochawj_DiaochaWJSer_getWenjuanPageList.text';
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'diaochId'},
            ['diaochId',
            	'dchzhut',
            	'dcleifen',
            	'strdcleifen',
            	'kaishirq',
            	'jieshurq',
            	'wjzhutai',
            	'strwjzhutai',
            	'cjjigou',
            	'ipshifcf',
            	'shuoming'
        	]);
  var ascid = 'diaochId';
  var ascstr = 'desc';
  diaochawj.ds = new data.Store(proxy,reader,ascid,ascstr);
};
diaochawj.gettb = function(){
diaochawj.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'问卷',
    	//iconCls: 'diaochawj-add',
    	tooltip: {title:''+getResource('resourceParam477')+'问卷',text:''+getResource('resourceParam647')+'问卷'},
    	handler: addwenjuan.addwenjuan
	},  	
  	'-',
  	{
  		text:''+getResource('resourceParam478')+'问卷',
    	//iconCls: 'diaochawj-updata',
    	tooltip: {title:''+getResource('resourceParam478')+'问卷',text:''+getResource('resourceParam478')+'问卷'},
    	handler: updatawenjuan.updatawenjuan
  	},  	
  	'-',
  	{
  		text:''+getResource('resourceParam475')+'问卷',
    	//iconCls: 'diaochawj-del',
    	tooltip: {title:''+getResource('resourceParam475')+'问卷',text:''+getResource('resourceParam475')+'问卷'},
    	handler: deletewenjuan.deletewenjuan
  	},  	
  	'-',
  	{
  		text:''+getResource('resourceParam576')+'统计',
    	//iconCls: 'diaochawj-find',
    	tooltip: {title:''+getResource('resourceParam576')+'统计',text:''+getResource('resourceParam576')+'统计'},
    	handler: tongji.addgrid
  	},  	
  	'-',
  	{
  		text:'问卷预览',
    	//iconCls: 'diaochawj-view',
    	tooltip: {title:'问卷预览',text:'问卷预览'},
    	handler: wenjuanform.addwenjuan
  	},  	
  	'-',
  	{
  		text:'问卷一览',
    	//iconCls: 'diaochawj-view',
    	tooltip: {title:'问卷一览',text:'问卷一览'},
    	handler: dajuan.getdialog
  	},  	
  	'-',
  	{
  		text:''+getResource('resourceParam607')+'',
    	//iconCls: 'diaochawj-view',
    	tooltip: {title:''+getResource('resourceParam607')+'',text:''+getResource('resourceParam607')+''},
    	handler: adddajuan.adddajuan
  	}];
};
diaochawj.addgrid = function(){
	diaochawj.getColModel();
	diaochawj.getDataStore();
	diaochawj.gettb();
	diaochawj.getpanel();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	diaochawj.grid = myGrid.init(diaochawj.ds,diaochawj.colModel,diaochawj.tb,sm);
	diaochawj.grid.on('rowclick', function(grid,rowIndex,e) {
		diaochawj.row = grid.store.data.items[rowIndex];
	});
	diaochawj.loadvalue();
};
diaochawj.getpanel = function(){
	Ext.QuickTips.init();
	diaochawj.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'diaochawjpanel',
         region:'center',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
diaochawj.loadvalue = function(){
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	diaochawj.panel
        ]
        
    });
	diaochawj.panel.add(diaochawj.grid);
	diaochawj.panel.doLayout();
	viewport.render();
	myGrid.loadvalue(diaochawj.grid.store,{start:0,limit:25},diaochawj.baseargs);
};
Ext.onReady(diaochawj.addgrid,diaochawj,true);
