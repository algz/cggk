var materialCatalogGrid = {
	startId : null,
	searchCatalogName : null
};

// 数据列表
materialCatalogGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/materialCatalogRemote.getGridData',
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'id', 'parentid', 'materialtypename', 'remark','materialcatalogCode' ])
	});
	var cm = new Ext.grid.ColumnModel( [ sm, rm,  {
		header : '物资种类编码',
		dataIndex : 'materialcatalogCode',
		width : 280,
		sortable : true,
		renderer : function(value) {
			return value.replace(new RegExp(/</g), '&lt;');
		}
	}, {
		header : '物资种类名称',
		dataIndex : 'materialtypename',
		width : 200,
		sortable : true,
		renderer : function(value) {
			return value.replace(new RegExp(/</g), '&lt;');
		}
	}, {
		header : '备注',
		dataIndex : 'remark',
		width : 200,
		sortable : true,
		renderer : function(value) {
		//处理<字符，转码
			return value.replace(new RegExp(/</g), '&lt;');
		}
	} ]);
	var tbar = [ //'-', 
		//与库存系统集成后,屏蔽次操作
		/*{
			text : '新增'
			,iconCls : 'add1',
			handler : function() {
				materialCatalogAction.addView();
			}
		}*/
	//, '-', 
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '导入',
			iconCls : 'Import',
			handler : function() {
			    materialCatalogAction.upload();
			}
		}*/
	//, '-',
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '编辑'
			 ,iconCls : 'edit1'
			,
			handler : function() {
				materialCatalogAction.editeView();
			}
		}*/
	//, '-', 
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '删除'
			 ,iconCls : 'del1'
			,
			handler : function() {
				materialCatalogAction.del();
			}
		}*/
	//, 
	/*'-', {
		text : '指定使用的角色'
			 ,iconCls : 'user-role'
		,
		handler : function() {

			materialCatalogAction.showRole();
		}
	},*/
	/*
	 * '-',{text:'导入',iconCls : 'imp1',handler:function(){
	 * materialCatalogAction.impotView(); }},
	 */

	'-', '物资种类名：', {
		xtype : "textfield",
		id : "catlogName"
	}, '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			materialCatalogAction.search();
		}
	} ];
	var grid = common.gridPanel('materialCatalogGridPanelId', cm, store, tbar,
			true, sm, '物资种类维护列表');
	store.load();
	return grid;
}
// 搜索
materialCatalogGrid.search = function() {
	var panel = Ext.getCmp("materialCatalogGridPanelId");
	panel.getStore().baseParams = {
		start : 0,
		limit : 20,
		startId : materialCatalogGrid.startId
	};
	panel.getStore().load();
}
