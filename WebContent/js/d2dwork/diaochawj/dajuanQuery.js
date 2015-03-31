var dajuan = {grid:null,colModel:null,ds:null,tb:null,panel:null,row:null,baseargs:null};
//生成列表
dajuan.getColModel = function(){
	dajuan.colModel = new Ext.grid.ColumnModel([
		{
			header: ""+getResource('resourceParam607')+""+getResource('resourceParam882')+"",
			width: 100,
			dataIndex: 'fanjigou'},
		{
			header: ""+getResource('resourceParam977')+"",
			width: 100,
			dataIndex: 'strfrenyuan'},
		{
			header: ""+getResource('resourceParam978')+"",
			width: 100,
			dataIndex: 'fankuirq'},
		{
			header: ""+getResource('resourceParam607')+"IP",
			width: 100,
			dataIndex: 'fankuiip'}
					
	]);
};
dajuan.getDataStore = function(){
	var url = "../JSON/d2dwork_wenjuandc_wenjuandc_WenjuandcSvr.getGridOfDajuan";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'wenjuaId'},
            ['fanjigou',
            	'frenyuan',
            	'strfrenyuan',
            	'fankuirq',
            	'fankuiip',
            	'dajuanId'
        	]);  	   	
	var ascid = 'frenyuan';
	var ascstr = 'desc';
	dajuan.ds = new data.Store(proxy,reader,ascid,ascstr);
};
dajuan.gettb = function(){
dajuan.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam576')+'问卷',
    	iconCls: 'dajuan-view',
    	tooltip: {title:''+getResource('resourceParam576')+'问卷',text:''+getResource('resourceParam576')+'问卷'},
    	handler: dajuanform.adddajuan
  	}];
};
dajuan.getgrid = function(){
	dajuan.getColModel();
	dajuan.getDataStore();
	dajuan.gettb();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	dajuan.grid = myGrid.initNobr(dajuan.ds,dajuan.colModel,dajuan.tb,sm);
	dajuan.grid.on('rowclick', function(grid,rowIndex,e) {
		dajuan.row = grid.store.data.items[rowIndex];
	});
	dajuan.loadvalue();
};
dajuan.getdialog = function(){
	dajuan.getgrid();
	tlework.addHtml(tlework.divHtml,'dajuan');	
	if (!dajuan.dialog){	
		dajuan.dialog = new Ext.Window({ 
			el:'dajuan',
			modal:true,
			title: ''+getResource('resourceParam7034')+'',//问卷一览
           	layout:'fit',
           	width:700,
           	height:280,
           	closeAction:'close',
           	plain: false,
			items:dajuan.grid,
			buttons: [
				{   text: ''+getResource('resourceParam7007')+'',//取消
					handler: function(){
						dajuan.dialog.close();				
				}
			}]							
		});
		dajuan.dialog.on('hide',dajuan.close);
	}
	dajuan.dialog.show();
}; 
dajuan.loadvalue = function(){
	dajuan.baseargs = {
		diaochId:diaochawj.row.get('diaochId')
	};
	myGrid.loadvalue(dajuan.grid.store,null,dajuan.baseargs);
};
dajuan.close = function(){
	dajuan.dialog.destroy();
	dajuan.row=null;
	dajuan.dialog = null;	
};
