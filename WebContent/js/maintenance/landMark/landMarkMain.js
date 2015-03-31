
/**
 * 里程碑列表
 */
var landMarkMain = {landMarkpanel:null,landMarkgrid:null,
				args:{start:0,limit:25},baseargs:null};

landMarkMain.grid = function(){
  var strurl = '../JSON/maintenance_landMark_LandMarkService.getLandMarkList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'landmarkid'
        }, [
            'landmarkid','landmarkname','landmarknotes',
            'projectcategoryid','projectcategoryname'
        ]);
  var ascid = 'landmarkid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);


  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'landmarkid',
		header: ""+getResource('resourceParam1203')+""+getResource('resourceParam461')+"",
		dataIndex: 'landmarkid',
		width: 80
	},{
		header: ""+getResource('resourceParam1203')+""+getResource('resourceParam480')+"",
		dataIndex: 'landmarkname',
		width: 100
	},{
		header: ""+getResource('resourceParam463')+getResource('resourceParam5003'),
		dataIndex: 'projectcategoryname',
		width: 100
	},{
		header: ""+getResource('resourceParam1203')+""+getResource('resourceParam648')+"",
		dataIndex: 'landmarknotes',
		width: 300
	}
	]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+''+getResource('resourceParam1203')+'',
    	iconCls: 'priv-add',
    	tooltip: {title:''+getResource('resourceParam477')+''+getResource('resourceParam1203')+'',text:''+getResource('resourceParam647')+'一个新的'+getResource('resourceParam1203')+''},
    	handler:landMarkAdd.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'',
        
        iconCls: 'priv-edit',
        tooltip: {title:''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'',text:''+getResource('resourceParam478')+'选中的'+getResource('resourceParam1203')+''},
        handler: landMarkUpdate.init
        
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
landMarkMain.init = function(){
	Ext.QuickTips.init();
	
	landMarkMain.landMarkpanel = new Ext.Panel({
		 id:'landMarkpanel',
		 layout:'fit',
		 border:false,
		 region:'center',
		 titlebar: false,
		 autoScroll:true,
         margins:'0 5 5 0'
	
	});
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	landMarkMain.landMarkpanel
        ]
        
    });
	landMarkMain.landMarkgrid = landMarkMain.landMarkpanel.add(landMarkMain.grid());
	landMarkMain.landMarkpanel.doLayout();
	myGrid.loadvalue(landMarkMain.landMarkgrid.store,landMarkMain.args,landMarkMain.baseargs);
}
Ext.onReady(landMarkMain.init,landMarkMain,true);
