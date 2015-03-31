var adjustPanel = {
	panel : null
};
// 调整历史记录
adjustPanel.init = function() {
	var adjustProxy = new Ext.data.HttpProxy({
		url : '../JSON/messageuser_MessageUserRemote.queryAdjustHistroyMessage',
		methord : "GET"
	});
	var adjustReader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'messageid'
			}, ['messageid', 'truename', 'receivename', 'receivedep',
					'department', 'messagetitle', 'messagebody', 'releasetime']);
	var adjustStore = new Ext.data.GroupingStore({
				reader : adjustReader,
				proxy : adjustProxy,
				groupField : 'messageid',
				sortInfo : {
					field : 'messageid',
					direction : 'asc'
				}
			});
	var adjustcm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : '' + getResource('resourceParam1362') + '',
			hidden : true,
			dataIndex : 'messageid',
			name : 'messageid'
		}, {
			header : '' + getResource('resourceParam7083') + '',
			width : 80,
			dataIndex : 'truename',
			name : 'truename'
		}, {
			header : '' + getResource('resourceParam7083')
					+ getResource('resourceParam689') + '',
			width : 120,
			dataIndex : 'department',
			name : 'department'
		}, {
			header : '' + getResource('resourceParam603') + '',
			width : 80,
			dataIndex : 'receivename',
			name : 'receivename'
		}, {
			header : '' + getResource('resourceParam603')
					+ getResource('resourceParam689') + '',
			width : 120,
			dataIndex : 'receivedep',
			name : 'receivedep'
		}, {
			header : '' + getResource('resourceParam1431') + '',
			width : 160,
			dataIndex : 'messagebody',
			name : 'messagebody',
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
			header : '' + getResource('resourceParam7082') + '',
			width : 140,
			dataIndex : 'releasetime',
			name : 'releasetime'
		}]
	});

	if (!adjustPanel.panel || adjustPanel.panel == null) {
		// 调整历史面板
		adjustPanel.panel = new Ext.grid.GridPanel({
					id : 'adjustPanell',
					autoHeight : true,
					layout : 'fit',
					store : adjustStore,
					cm : adjustcm,
					view : new Ext.grid.GroupingView({
								forceFit : true
							})
				});
	}

	return adjustPanel.panel;
}
