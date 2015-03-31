var tongji = {grid:null,colModel:null,ds:null,tb:null,panel:null,TJGirdPanel:null,WJXGirdPanel:null,biaotou:null};
//生成列表
tongji.getColModel = function(){
	var biaotous = new Array();
	for(var i=0;i<tongji.biaotou.length;i++){
		if (tongji.biaotou[i].sign=='true'){
			biaotous[i] = {
				header: tongji.biaotou[i].name,
				width: 100,
				dataIndex: tongji.biaotou[i].id
			} 
		}	
	}
	tongji.colModel = new Ext.grid.ColumnModel(biaotous);
};
tongji.getDataStore = function(){
	var ids = new Array();
	for(var i=0;i<tongji.biaotou.length;i++){
		ids[i] = tongji.biaotou[i].id
	}
	var url = "../CALL/JSON/d2dwork_diaochawj_DiaochaWJSer.getTongji";
	var proxy = new Ext.data.HttpProxy({
            url: url
        });
  	var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: ids[0]},
            ids);
  var ascid = ids[0];
  var ascstr = 'desc';
  tongji.ds = new data.Store(proxy,reader,ascid,ascstr);
};
tongji.gettb = function(){
tongji.tb=[
  	];
};
tongji.addgrid = function(){
	callSeam("d2dwork_diaochawj_DiaochaWJSer","getTongjiBiaotou",[diaochawj.row.get('diaochId')],tongji.getadddialog);
};
tongji.getadddialog = function(response){
	tongji.biaotou = Ext.util.JSON.decode(response.responseText);
	tongji.getgrid();	
	tlework.addHtml(tlework.divHtml,'tongjidialog');	
	if (!tongji.dialog){		
		tongji.dialog = new Ext.Window({ 
			el:'tongjidialog',
			title: '问卷统计',
           	layout:'border',
			modal:true,
           	width:660,
           	height:500,
           	closeAction:'close',
           	plain: false,
			buttons: [			
			{   text: ''+getResource('resourceParam506')+'',
				handler: function(){
					tongji.close();
				}
			}]
		});
		tongji.dialog.on('hide',tongji.close);
	}		
	tongji.getpanel();
	tongji.dialog.add(tongji.panel);
	tongji.loadvalue();
	tongji.dialog.show();
};
tongji.close = function(){
	tongji.dialog.destroy();					
	tongji.dialog = null;	
};
tongji.getgrid = function(){
	tongji.getColModel();
	tongji.getDataStore();
	tongji.gettb();	
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	tongji.grid = myGrid.initNobr(tongji.ds,tongji.colModel,tongji.tb,sm);
};
tongji.getpanel = function(){
	Ext.QuickTips.init();
	tongji.panel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'tongjipanel',
         region:'center',
		 layout:'fit',
		 height:540,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}; 
tongji.loadvalue = function(){ 
	tongji.panel.add(tongji.grid);
	tongji.panel.doLayout();
	tongji.baseargs = {
		diaochId:diaochawj.row.get('diaochId')
	};
	myGrid.loadvalue(tongji.grid.store,null,tongji.baseargs);
};
