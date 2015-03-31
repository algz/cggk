var ideServerMain = {
	ideServerPanel : null,
	args : null,
	baseargs : null
};

ideServerMain.grid = function() {
	var strurl = "../JSON/ideServer_ideServerService.getIdeServerList";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'ideServerId'
	}, ['ideServerId', 'ideServerIp', 'ideServerName', 'ideServerUrl']);
	
	var ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	ideServerMain.getSelections=function (){
		return sm.getSelections();
	}
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ sm,{
			id: 'ideServerId',
			header : ""+getResource('resourceParam1945')+""+getResource('resourceParam480')+"",
			dataIndex : 'ideServerName',
			renderer:function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
	    		return record.get("ideServerName");
			}
		}, {
			header : ""+getResource('resourceParam1945')+"IP",
			dataIndex : 'ideServerIp'
		},{
			header : ""+getResource('resourceParam1945')+"URL",
			dataIndex : 'ideServerUrl'
		}
		]
	});
	
	var addBt = {
		text : ''+getResource('resourceParam477')+'',
		iconCls : 'user-add',
		handler : ideServerAdd.init
	};
	var updateBt= {
		text : ''+getResource('resourceParam478')+'',
		iconCls : 'user-edit',
	    handler : ideServerUpdate.init
	};
	var delBt={
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'user-del',
		handler : ideServerDel.init
 	};
	 
	
		
	var tb = [
		'-', 
		addBt,
		'-', 
		updateBt,
		'-', 
		delBt
	];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
ideServerMain.init = function() {
		
	ideServerMain.ideServerPanel = new Ext.Panel( {
		id : 'ideServerPanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		margins : '0 5 5 0'

	});

	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [ideServerMain.ideServerPanel]
	});

	ideServerMain.ideServerGrid = ideServerMain.ideServerPanel.add(ideServerMain.grid());

	ideServerMain.ideServerGrid.on('rowdblclick', function(grid, rowIndex, e) {
		//appView.init();
	});
	ideServerMain.args = {
		start : 0,
		limit : 25
	};
	ideServerMain.ideServerPanel.doLayout();
	myGrid.loadvalue(ideServerMain.ideServerGrid.store, {start:0,limit:25},{});

}
Ext.onReady(ideServerMain.init, ideServerMain, true);

