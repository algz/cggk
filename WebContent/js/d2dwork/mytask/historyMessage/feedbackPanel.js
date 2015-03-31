var feedbackPanel = {
	panel : null
};
// 反馈历史记录
feedbackPanel.init = function() {
	var feedbackProxy = new Ext.data.HttpProxy({
		url : '../JSON/messageuser_MessageUserRemote.queryAdjustHistroyMessage',
		methord : "GET"
	});
	var feedbackReader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'messageid'
			}, ['messageid', 'truename', 'department', 'receivename',
					'receivedep', 'messagetitle', 'messagebody', 'releasetime']);
	var feedbackStore = new Ext.data.GroupingStore({
				reader : feedbackReader,
				proxy : feedbackProxy,
				groupField : 'messageid',
				sortInfo : {
					field : 'messageid',
					direction : 'asc'
				}
			});
	var feedbackcm = new Ext.grid.ColumnModel({
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
			width : 60,
			dataIndex : 'truename',
			name : 'truename'
		}, {
			header : '' + getResource('resourceParam7083')
					+ getResource('resourceParam689') + '',
			width : 100,
			dataIndex : 'department',
			name : 'department'
		}, {
			header : '' + getResource('resourceParam603') + '',
			width : 60,
			dataIndex : 'receivename',
			name : 'receivename'
		}, {
			header : '' + getResource('resourceParam603')
					+ getResource('resourceParam689') + '',
			width : 100,
			dataIndex : 'receivedep',
			name : 'receivedep'
		}, {
			header : '' + getResource('resourceParam601') + '',
			width : 100,
			dataIndex : 'messagetitle',
			name : 'messagetitle'
		}, {
			header : '' + getResource('resourceParam595') + '',
			width : 140,
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
			header : '' + getResource('resourceParam978') + '',
			width : 100,
			dataIndex : 'releasetime',
			name : 'releasetime'
		}]
	});

	if (!feedbackPanel.panel || feedbackPanel.panel == null) {
		// 反馈历史面板
		feedbackPanel.panel = new Ext.grid.GridPanel({
					id : 'feedbackPanell',
					autoHeight : true,
					layout : 'fit',
					store : feedbackStore,
					cm : feedbackcm,
					view : new Ext.grid.GroupingView({
								forceFit : true
							})
				});
		// container.add(feedbackPanel.panel);
	}

	// feedbackStore.load({
	// params : {
	// taskid : taskid,
	// sign : sign
	// }
	// });

	return feedbackPanel.panel;
}
