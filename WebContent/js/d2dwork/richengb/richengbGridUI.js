/**
 * 初始化Grid控件的类 游松 2008-3-3
 */

var richengbGridUI = {};
// 获得数据源
richengbGridUI.getDataSoure = function() {
	richengbGridUI.ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/d2dwork_richengb_richenggl.getGrid'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'totalProperty'
		}, [{
			name : 'rcksshji'
		}, {
			name : 'txingrqi'
		}, {
			name : 'rcnerong'
		},{
			name : 'sfdaiban'
		} ,{
			name : 'rchengId'
		} ]),
		sortInfo : {
			field : 'rchengId',
			direction : 'ASC'
		}
	});
}

// 获得列模式
richengbGridUI.getColModel = function() {
	richengbGridUI.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ {
			header : ''+getResource('resourceParam1667')+'',
			dataIndex : 'rcksshji',
			type : 'date'
		}, {
			header : ''+getResource('resourceParam1329')+'',
			dateIndex : 'txingrqi',
			// renderer: Ext.util.Format.dateRenderer('y-m-d'),
			type : 'date'
		}]
	});
}
// 加载数据
richengbGridUI.loadData = function() {
	myGrid.loadvalue(richengbGridUI.ds, {
		start : 0,
		limit : 25
	}, richengbGridUI.baseargs);
};
// 建立Grid
richengbGridUI.addGrid = function() {
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				// richengbFormUI.form.form.reset();
				Ext.getCmp("richengbForm").getForm().loadRecord(rec);
			}
		}
	})
	richengbGridUI.getDataSoure();
	richengbGridUI.getColModel();
	richengbGridUI.grid = myGrid.init(richengbGridUI.ds, richengbGridUI.cm,
			richengbGridUI.tb, sm);
	richengbGridUI.grid.viewConfig = {
		forceFit : true,
		enableRowBody : true,
		showPreview : true,
		getRowClass : function(record, rowIndex, p, ds) {
			var today = new Date();
			var data = null;
			if (record.data.rcnerong.length >= 31) {// 截取日程内容
				data = record.data.rcnerong.substring(0, 30)
			} else {
				data = record.data.rcnerong;
			}
			if (today == record.data.txingrqi) {// 判断是否提醒
				p.body = '<p><h4><font color=red>&nbsp; &nbsp;' + data
						+ '</font></h4></p>';
			} else {
				p.body = '<p><h4><font color=blue>&nbsp; &nbsp;' + data
						+ '</font></h4></p>';
			}
		}
	};
	richengbGridUI.loadData();
}
