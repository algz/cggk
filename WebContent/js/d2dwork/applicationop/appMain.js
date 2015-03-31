var appMain = {
	apppanel : null,
	args : null,
	baseargs : null
};

Ext.QuickTips.init();
appMain.grid = function() {
	var strurl = "../JSON/applicationop_tapplicationsvr.getappList";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'applicationid'
	}, ['applicationid', 'applicationip', 'applicationname', 'applicationpath', 'applicationtype']);

	
	var ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
	
//	var sm = new Ext.grid.RowSelectionModel( {
//		singleSelect : true,
//		listeners : {
//			rowselect : function(sm, row, rec) {
//				appMain.row =  rec;
//			}
//		}
//	});	
    //bug：184在我的应用程序列表中，选中多个应用程序时，却可以成功进行修改、删除操作。逻辑错误。
    
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false
		
	});
	appMain.getSelections= function(){
		return sm.getSelections();
	}
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ sm,{
			id: 'applicationid',
			header : ""+getResource('resourceParam1098')+"",
			dataIndex : 'applicationname',
			renderer:function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
				return '<font ext:qtip="' + value + '">' + value + '</font>';
			}
		}, {
			header : ""+getResource('resourceParam1104')+"",
			dataIndex : 'applicationip',
			renderer:function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
				return '<font ext:qtip="' + value + '">' + value + '</font>';
			}
		},{
			header : ""+getResource('resourceParam1097')+"",
			dataIndex : 'applicationpath',
			renderer:function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
				return '<font ext:qtip="' + value + '">' + value + '</font>';
			}
		}, {
			header : ""+getResource('resourceParam558')+''+getResource('resourceParam9001')+'', // text: "应用程序" + "标签",
			dataIndex : 'applicationtype',
			renderer:function renderDescn(value, cellmeta, record, rowIndex, columnIndex, store) {
				return '<font ext:qtip="' + value + '">' + value + '</font>';
			}
		}
		]
	});
	
	var addBt = {
		text : ''+getResource('resourceParam477')+'',
		iconCls : 'user-add',
		handler : appAdd.init
	};
	var updateBt= {
		text : ''+getResource('resourceParam478')+'',
		iconCls : 'user-edit',
	    handler : appUpdate.init
	};
	var delBt={
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'user-del',
		handler : appDel.init
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
appMain.init = function() {
		
	appMain.apppanel = new Ext.Panel( {
		id : 'apppanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		margins : '0 5 5 0'

	});

	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [appMain.apppanel]
	});

	appMain.appgrid = appMain.apppanel.add(appMain.grid());

	appMain.appgrid.on('rowdblclick', function(grid, rowIndex, e) {
		//appView.init();
	});
	appMain.args = {
		start : 0,
		limit : 25
	};
	appMain.apppanel.doLayout();
	myGrid.loadvalue(appMain.appgrid.store, {start:0,limit:25},{});

}
Ext.onReady(appMain.init, appMain, true);

