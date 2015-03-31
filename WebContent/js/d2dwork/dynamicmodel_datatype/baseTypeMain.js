Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var baseTypeMain = {}

baseTypeMain.init = function() {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(),  {
			header : ''+getResource('resourceParam480')+'',
			dataIndex : 'datatypeName',
			width : 100,
			editor : new Ext.form.TextField({
						allowBlank : false
					})
		}, {
			header : ''+getResource('resourceParam481')+'',
			dataIndex : 'datatype',
			width : 100,
			editor : new Ext.form.TextField({
						allowBlank : false
					})
		}, {
			header : ''+getResource('resourceParam648')+'',
			dataIndex : 'datatypeDiscription',
			width : 200,
			editor : new Ext.form.TextField({
						allowBlank : false
					})
		},{
			header : '' + getResource('resourceParam462'),
			width : 50,
			dataIndex : 'version'
		}]
	})
	var ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							method : 'GET',
							url : '../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=4&start=0&limit=100'
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, Ext.data.Record.create([{
							name : 'datatypeName',
							mapping : 'datatypeName',
							type : 'string'
						}, {
							name : 'datatype',
							mapping : 'datatype',
							type : 'string'
						}, {
							name : 'datatypeDiscription',
							mapping : 'datatypeDiscription',
							type : 'string'
						}, {
							name : 'version',
							mapping : 'version',
							type : 'long'
						}]))
			})
	var grid = new Ext.grid.GridPanel({
				store : ds,
				cm : cm,
				sm : sm,
				//clicksToEdit : 1,
				autoHeight : true,
				viewConfig : {
					forceFit : true
				}
			})
	var mainPanel = new Ext.Panel({
				layout : 'fit',
//				tbar : [{
//							text : '新建'
//						}, {
//							text : '编辑'
//						}, {
//							text : '删除'
//						}],
				border : false,
				items : [grid]
			})
	var viewport = new Ext.Viewport({ // 页面布局
		items : [mainPanel]
	});
	ds.load()
}

Ext.onReady(baseTypeMain.init, baseTypeMain)
