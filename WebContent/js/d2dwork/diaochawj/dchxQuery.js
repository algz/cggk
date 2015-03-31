var diaochaxiang = {grid:null,colModel:null,ds:null,tb:null,panel:null,row:null,baseargs:null,xiangs:null};
//生成列表
diaochaxiang.getColModel = function(){
	diaochaxiang.colModel = new Ext.grid.ColumnModel([
		{
			header: "问题"+getResource('resourceParam467')+"",
			width: 100,
			dataIndex: 'wenjtimu'},
		{
			header: "问题"+getResource('resourceParam481')+"",
			width: 100,
			dataIndex: 'wentleix',
			renderer:diaochaxiang.wentleixformat},
		{
			header: "汇总方式",
			width: 100,
			dataIndex: 'hzfangshi',
			renderer:diaochaxiang.hzfangshiformat}					
	]);
};
diaochaxiang.wentleixformat = function(status){
	if(status=='1'){
		return "单选题";
	}else if(status=='2'){
		return "多选题";
	}else{
		return "问答题";
	}
};
diaochaxiang.hzfangshiformat= function(status){
	if(status=='1'){
		return "求平均";
	}else if(status=='2'){
		return "求和";
	}else{
		return "不汇总";
	}
};
diaochaxiang.getDataStore = function(){
	/**
	var url = "../CALL/JSON/d2dwork_diaochawj_DiaochaWJSer.getWenjuanxiangPageList";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
    */    
	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'diaocxid'},
            ['diaocxid',
            	'wenjtimu',
            	'wentleix',
            	'hzfangshi',
            	'dcshunxu',
            	'neirleix',
            	'beixdaan'
        	]);
	diaochaxiang.ds = new Ext.data.Store({
		reader:reader
	});
	//var ascid = 'wenjtimu';
	//var ascstr = 'desc';
	//diaochaxiang.ds = new data.Store(proxy,reader,ascid,ascstr);
};
diaochaxiang.gettb = function(){
diaochaxiang.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'调查项',
    	iconCls: 'diaochaxiang-add',
    	tooltip: {title:''+getResource('resourceParam477')+'调查项',text:''+getResource('resourceParam647')+'调查项'},
    	handler: adddchx.adddchx
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam478')+'调查项',
    	iconCls: 'diaochaxiang-updata',
    	tooltip: {title:''+getResource('resourceParam478')+'调查项',text:''+getResource('resourceParam478')+'调查项'},
    	handler: updatadchx.updatadchx
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam475')+'调查项',
    	iconCls: 'diaochaxiang-del',
    	tooltip: {title:''+getResource('resourceParam475')+'调查项',text:''+getResource('resourceParam475')+'调查项'},
    	handler: deletedchx.deletedchx
  	}];
};
diaochaxiang.addgrid = function(xiangs){
	diaochawj.xiangs = xiangs;
	diaochaxiang.getColModel();
	diaochaxiang.getDataStore();
	diaochaxiang.gettb();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	diaochaxiang.grid = myGrid.initNobr(diaochaxiang.ds,diaochaxiang.colModel,diaochaxiang.tb,sm);
	diaochaxiang.grid.on('rowclick', function(grid,rowIndex,e) {
		diaochaxiang.row = grid.store.data.items[rowIndex];
	});
	diaochaxiang.grid.region= 'center';
	if (diaochawj.xiangs!=null){
		for(var i=0;i<diaochawj.xiangs.length;i++){
			var xiang = diaochawj.xiangs[i];
			var record = new Ext.data.Record({
					"diaocxid":xiang[0],
					"wenjtimu":xiang[1],
					"wentleix":xiang[2],
					"hzfangshi":xiang[3],
					"dcshunxu":xiang[4],
					"neirleix":xiang[5],
					"beixdaan":xiang[6]
				}); 
			diaochaxiang.ds.insert(0,record);
		}
	}
};
diaochaxiang.getpanel = function(){
	Ext.QuickTips.init();
	diaochaxiang.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'diaochaxiangpanel',
		 region:'south',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
