
/**
 * 部门类型列表
 */
var deptypeMain = {
	deptypepanel : null,
	deptypegrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
};

deptypeMain.grid = function() {
	var strurl = '../JSON/maintenance_deptype_deptypeService.getDeptypeList?a='
			+ new Date().getTime();
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'deptypeid'
			}, ['deptypeid', 'typename', 'instlevel']);
	var ascid = 'deptypeid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'deptypeid',
			header : "" + getResource('resourceParam698') + ""
					+ getResource('resourceParam461') + "",
			dataIndex : 'deptypeid',
			hidden : true,
			width : 60
		}, {
			header : "" + getResource('resourceParam882') + ""
					+ getResource('resourceParam1139') + "",
			dataIndex : 'typename',
			width : 60
		}, {
			header : "" + getResource('resourceParam698') + "级别",
			dataIndex : 'instlevel',
			width : 60
		}]
	});

	var tb = ['-', {
		text : '' + getResource('resourceParam477') + ''
				+ getResource('resourceParam698') + '',
		iconCls : 'priv-add',
		tooltip : {
			title : '' + getResource('resourceParam477') + ''
					+ getResource('resourceParam698') + '',
			text : '' + getResource('resourceParam696') + ''
					+ getResource('resourceParam481') + ''
		},
		handler : deptypeAdd.init

	}, '-', {
		// enableToggle:true,
		text : '' + getResource('resourceParam478') + ''
				+ getResource('resourceParam1139') + '',

		iconCls : 'priv-edit',
		tooltip : {
			title : '' + getResource('resourceParam478') + ''
					+ getResource('resourceParam480') + '',
			text : '' + getResource('resourceParam478') + '选中的'
					+ getResource('resourceParam698') + ''
		},
		handler : deptypeUpdate.init

	}, '-', {
		// enableToggle:true,
		text : '' + getResource('resourceParam475') + ''
				+ getResource('resourceParam698') + '',

		iconCls : 'priv-del',
		tooltip : {
			title : '' + getResource('resourceParam475') + ''
					+ getResource('resourceParam698') + '',
			text : '' + getResource('resourceParam475') + '选中的'
					+ getResource('resourceParam698') + ''
		},
		handler : deptypeDelete.init

	}, '-', {
		// enableToggle:true,
		text : '' + getResource('resourceParam944') + '',

		iconCls : 'priv-del',
		tooltip : {
			title : ''+ getResource('resourceParam944') + '',
			text : '' + getResource('resourceParam944') + '到'
					+ getResource('resourceParam699') + ''
		},
		handler : function()
		{
			orgManage.leftPanel.getLayout().setActiveItem(0);
		}

	}];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
deptypeMain.init = function() {
	Ext.QuickTips.init();

	deptypeMain.deptypepanel = new Ext.Panel({
				id : 'deptypepanel',
				layout : 'fit',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0'

			});
	deptypeMain.mygrid = deptypeMain.grid();
	deptypeMain.deptypegrid = deptypeMain.deptypepanel.add(deptypeMain.mygrid);
	deptypeMain.deptypepanel.doLayout();
	myGrid.loadvalue(deptypeMain.deptypegrid.store, deptypeMain.args,
			deptypeMain.baseargs);
	return deptypeMain.deptypepanel;
}
