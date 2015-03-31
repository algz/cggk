/**
 * 工作日志列表
 */
var gongzrizMain = {
	gongzrizpanel : null,
	gongzrizgrid : null,
	args : null,
	baseargs : null
};

gongzrizMain.grid = function() {
	var strurl = '../JSON/d2dwork_gongzriz_GongzrizSvr.getGrid';
//	var strurl = '../data/d2dwork/gongzriz_GongzrizSVR_getRizPageList.text';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'rizhiId'
	},
			[
			'rizhiId',
			'yonghumc',
			'rizhisj', 
			'rizhinr',
			'updatetime'
			]);
	var ascid = 'rizhiId';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ {
			header : ""+getResource('resourceParam1301')+"",
			dataIndex : 'rizhisj',
			width : 200
		}, {
			header : ""+getResource('resourceParam878')+"",
			dataIndex : 'yonghumc',
			width : 200
		}, {
			header : ""+getResource('resourceParam626')+"",
			dataIndex : 'rizhinr',
			renderer:interupt,
			width : 200
		}]
	});

	var tb = ['-', {
		text : ''+getResource('resourceParam1313')+'',
		iconCls : 'user-add',
		tooltip : {
			title : ''+getResource('resourceParam1313')+'',
			text : ''+getResource('resourceParam1309')+''
		},
		handler : gongzrizAdd.init

	}, '-', {
		// enableToggle:true,
			text : ''+getResource('resourceParam1314')+'',
			tooltip : {
				title : ''+getResource('resourceParam1314')+'',
				text : ''+getResource('resourceParam1311')+''
			},
			iconCls : 'user-edit',
			handler : gongzrizUpdate.init

		}, '-', {
			// enableToggle:true,
			text : ''+getResource('resourceParam1315')+'',
			tooltip : {
				title : ''+getResource('resourceParam1315')+'',
				text : ''+getResource('resourceParam1312')+''
			},
			iconCls : 'user-del',
			handler : gongzrizDel.init
		}, '-', {
			// enableToggle:true,
			text : ''+getResource('resourceParam1316')+'',
			tooltip : {
				title : ''+getResource('resourceParam1316')+'',
				text : ''+getResource('resourceParam1310')+''
			},
			iconCls : 'user-select',
			handler : gongzrizQuery.init
		}, '-', {
			// enableToggle:true,
			text : ''+getResource('resourceParam1317')+'',
			tooltip : {
				title : ''+getResource('resourceParam1317')+'',
				text : '察看'+getResource('resourceParam503')+'的'+getResource('resourceParam629')+''+getResource('resourceParam508')+''
			},
			iconCls : 'user-select',
			handler : gongzrizView.init
		}, '-', {
			// enableToggle:true,
			text : ''+getResource('resourceParam1318')+'',
			tooltip : {
				title : ''+getResource('resourceParam1318')+'',
				text : ''+getResource('resourceParam1308')+''
			},
			iconCls : 'user-select',
			menu : dateMenu
		}];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
gongzrizMain.init = function() {
	Ext.QuickTips.init();

	gongzrizMain.gongzrizpanel = new Ext.Panel( {
		id : 'gongzrizpanel',
		region : 'center',
		layout : 'fit',
		height : 540,
		split : true,
		collapsible : true,
		margins : '0 5 5 0'

	});

	var viewport = new Ext.Viewport( { // 页面布局
		layout : 'border', // 布局模式
		items : [gongzrizMain.gongzrizpanel]
	});

	gongzrizMain.gongzrizgrid = gongzrizMain.gongzrizpanel.add(gongzrizMain
			.grid());

	gongzrizMain.gongzrizgrid.on('rowdblclick', function(grid, rowIndex, e) {
		gongzrizView.init();
	});
	gongzrizMain.args = {
		start : 0,
		limit : 25
	};
	gongzrizMain.gongzrizpanel.doLayout();
	myGrid.loadvalue(gongzrizMain.gongzrizgrid.store, gongzrizMain.args,
			gongzrizMain.baseargs);

}
var dateMenu = new Ext.menu.DateMenu( {
	handler : function(dp, date) {
		var tempdate = date.format('Y-m-j')
		gongzrizMain.baseargs = {
			tianrurq : tempdate
		};
		myGrid.loadvalue(gongzrizMain.gongzrizgrid.store, gongzrizMain.args,
				gongzrizMain.baseargs);
	}
});
interupt=function(value){
	var result;
    if(value.length>10){
       result=value.substring(0,10);
       result=result+".....";
    }else{
        result=value;
    }
    return result;
};
Ext.onReady(gongzrizMain.init, gongzrizMain, true);
