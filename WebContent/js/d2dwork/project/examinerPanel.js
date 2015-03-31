examinerPanel = function() {
	var projectId = null;
	var taskId = null;
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : "" + getResource('resourceParam7064') + "",
			width : 100,
			dataIndex : 'username'
		}, {
			header : "" + getResource('resourceParam882') + "",
			width : 100,
			dataIndex : 'depname'
		}, {
			header : "" + getResource('resourceParam1019') + "",
			width : 150,
			dataIndex : 'type'
		}]
	});
	
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/task_TaskRemote.getExaminers'
		}),
		reader : new Ext.data.JsonReader({
			id : 'username',
			root : 'results',
			totalProperty : 'totalProperty'
		}, ['username', 'depname', 'type'])
	});
	
	var grid = new Ext.grid.GridPanel({
		store : store,
		cm : cm,
		sm : sm,
		autoScroll : true,
		loadMask : {
			msg : '' + getResource('resourceParam579') + ''
		},
		trackMouseOver : true,
		bbar : new Ext.PagingToolbar({
			pageSize : 25,
			store : store,
			displayInfo : true
		})
	});
	
	this.active = function(projectId, taskId) {
		grid.getStore().load({
			params : {
				projectId : projectId,
				taskId : taskId,
				start : 0,
				limit : 25
			}
		});
		grid.doLayout();
	}
	
	this.getStore = function() {
		return store;
	}
	
	this.getGrid = function() {
		return grid;
	}
}