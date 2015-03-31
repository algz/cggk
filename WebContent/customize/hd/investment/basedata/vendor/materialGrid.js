var materialGrid = {
	materialid : null
};

// 数据列表
materialGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/vendor_VendorRemote.getAll?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		},
				['materialid','materialItemName','desingnation',
				 'materialStandard','technicCondition','demension',
				 'warningValue','preservePeriod','referencePrice',
				 'remarks','parentid','materialitemcode','materialLinkVendorNum','parentidName'
			    ])
	});
	
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
		header : '物资编码',
		dataIndex : 'materialitemcode',
		width : 270,
		sortable : true
	}, {
		header : '物资名称',
		dataIndex : 'materialItemName',
		width : 100,
		sortable : true
	}, {
		header : '物资牌号',
		dataIndex : 'desingnation',
		width : 100,
		sortable : true
	}, {
		header : '物资规格',
		dataIndex : 'materialStandard',
		width : 100,
		sortable : true
	}, {
		header : '量纲',
		dataIndex : 'demension',
		width : 100,
		sortable : true
	}, {
		header : '技术条件',
		dataIndex : 'technicCondition',
		width : 100,
		sortable : true
	}, {
		header : '备注',
		dataIndex : 'remarks',
		width : 100,
		sortable : true
	},{
		header : '物资种类(小类)',
		dataIndex : 'parentidName',
		width : 100,
		sortable : true
	},{
		header : '关联供应商数',
		dataIndex : 'materialLinkVendorNum',
		width : 100,
		sortable : true,
		align:'center',
		renderer : function(value,cellmeta,record,rowIndex,columnIndex,store){
			var materialid = record.get("materialid"); 
			//点击的哪一行
			//return "<a href=javascript:vendorAction.showDeleteVendorWin('"+rowIndex+"').show()><b><font  color='red'>"+value+"</font></b></a>";
			return "<a href=javascript:vendorAction.showVendorInfoWin('"+materialid+"')><b><font  color='red'>"+value+"</font></b></a>";
			//return "<a href=javascript:vendorAction.showDeleteVendorWin().show()><b><font  color='red'>"+value+"</font></b></a>";
			
		}
	}
	]);
	
	
	var tbar = [ '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			vendorAction.getSearchForm().show();
		}
	} ,'-', {
		text : '指定供应商',
		iconCls : 'AddVendor',
		handler : function() {
			vendorAction.setVendor();
		}
	},'-', {
		text : '去除指定供应商',
		iconCls : 'del1',
		id:'deleteVendorMaterials', 
		handler : function() {
			vendorAction.showDeleteVendorWin().show();
		}
	} ];
	var grid = common.gridPanel('materialGridPanelIdLocal', cm, store, tbar, true,
			sm, '物资信息列表');
	store.baseParams = {
		start : 0,
		limit : 20 
	};
	store.load();
	return grid;
} 