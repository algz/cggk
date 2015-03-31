var accreditPanel = {
	panel : null
};
/*
 * by suny 2011-05-12
 * 委派状态id和委派状态名称的转换
 * 
 */

function renderagree_or_not(value,meta,record,rowIndex,colIndex,store) {
//	if (value == 1) {
//		return "<span style='font-weight:bold;'>"
//				+ getResource('resourceParam583') + "</span>"
//	} else {
//		return "<span style='font-weight:bold;'>"
//				+ getResource('resourceParam1342') + "</span>"
//	}
	if (value == 1) {
		return "<span style='font-weight:bold;'>未接受</span>"
	} else if(value == 2){
		return "<span style='font-weight:bold;'>已接受</span>"
	} else if(value == 3){
		return "<span style='font-weight:bold;'>已收回</span>"
	} else if(value == 4){
		return "<span style='font-weight:bold;'>已拒绝</span>"
	}
}
// 委派历史记录
accreditPanel.init = function() {
	var accreditProxy = new Ext.data.HttpProxy({
				url : '../JSON/TaskUser_TaskUserRemote.queryAccreditHistoryMessage',
				methord : "GET"
			});
	var acreditReader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskuserid'
			}, ['taskuserid', 'userid', 'accreditdate', 'taskname',
					'startdate', 'enddate', 'rolestatus', 'memo', 'department',
					'truename', 'status']);
	var accreditStore = new Ext.data.GroupingStore({
				reader : acreditReader,
				proxy : accreditProxy,
				groupField : 'taskuserid',
				sortInfo : {
					field : 'taskuserid',
					direction : 'asc'
				}
			});
	var accreditcm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : '' + getResource('resourceParam1362') + '',
			hidden : true,
			dataIndex : 'taskuserid',
			name : 'taskuserid'
		}, {
			header : '' + getResource('resourceParam1447') + '',
			width : 60,
			dataIndex : 'truename',
			name : 'truename'
		}, {
			header : '' + getResource('resourceParam1445') + '',
			width : 100,
			dataIndex : 'department',
			name : 'department'
		}, {
			header : '' + getResource('resourceParam7084') + '',
			width : 100,
			dataIndex : 'accreditdate',
			name : 'accreditdate'
		}, {
			header : '' + getResource('resourceParam1442') + '',
			width : 100,
			dataIndex : 'startdate',
			name : 'startdate'
		}, {
			header : '' + getResource('resourceParam1443') + '',
			width : 100,
			dataIndex : 'enddate',
			name : 'enddate'
		}, {
			header : '' + getResource('resourceParam1256') + '',
			width : 140,
			dataIndex : 'memo',
			name : 'memo',
			renderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) {
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			}
		}, {
			header : '' + getResource('resourceParam512')
					+ getResource('resourceParam510')
					+ getResource('resourceParam1342') + '',
			width : 140,
			dataIndex : 'status',
			name : 'status',
			renderer : renderagree_or_not
		}]
	});

	if (!accreditPanel.panel || accreditPanel.panel == null) {
		// 委派历史面板
		accreditPanel.panel = new Ext.grid.GridPanel({
					id : 'accreditPanell',
					autoHeight : true,
					layout : 'fit',
					store : accreditStore,
					cm : accreditcm,
					view : new Ext.grid.GroupingView({
								forceFit : true
							})
				});
	}

	return accreditPanel.panel;
}
