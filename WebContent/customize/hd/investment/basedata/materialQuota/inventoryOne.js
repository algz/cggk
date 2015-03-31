var inventoryOne = {
	inventoryId : null
};

/*
 * @author
 * 
 * @since @description 双层表头 @param{} mtext 表头名 @param{} mcol 向后跨越子表头个数 @param{}
 *        mwidth 上至下第一层表头的宽度,即父表头的宽度 @class MyGridView @extends
 *        Ext.grid.GridView
 */
MyGridView = Ext.extend(Ext.grid.GridView, {
	renderHeaders : function() {
		var cm = this.cm, ts = this.templates;
		var ct = ts.hcell, ct2 = ts.mhcell;
		var cb = [], sb = [], p = {}, mcb = [];
		for ( var i = 0, len = cm.getColumnCount(); i < len; i++) {
			p.id = cm.getColumnId(i);
			p.value = cm.getColumnHeader(i) || "";
			p.style = this.getColumnStyle(i, true);
			if (cm.config[i].align == 'right') {
				p.istyle = 'padding-right:16px';
			}
			cb[cb.length] = ct.apply(p);
			if (cm.config[i].mtext)
				mcb[mcb.length] = ct2.apply( {
					value : cm.config[i].mtext,
					mcols : cm.config[i].mcol,
					mwidth : cm.config[i].mwidth
				});
		}
		var s = ts.header.apply( {
			cells : cb.join(""),
			tstyle : 'width:' + this.getTotalWidth() + ';',
			mergecells : mcb.join("")
		});
		return s;
	}
});

viewConfig = {
	templates : {
		header : new Ext.Template(
				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
				' <thead> <tr class="x-grid3-hd-row">{mergecells} </tr>'
						+ ' <tr class="x-grid3-hd-row">{cells} </tr> </thead>',
				" </table>"),
		mhcell : new Ext.Template(
				' <td class="x-grid3-header" colspan="{mcols}" style="width:{mwidth}px;"> <div align="center">{value}</div>',
				" </td>")
	}
};

inventoryOne.gridPanel = function() {

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();

	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/materialQuota_MaterialQuotaRemote.getAllInventoryVos?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'inventoryId', 'materialItemName', 'materialStandard',
						'numberOne', 'numberTwo', 'numberThree', 'numberFour',
						'demension', 'useSite', 'remark' ])
			});

	var cm = new Ext.grid.ColumnModel( [new Ext.grid.RowNumberer({
    	mtext : " ",
        mcol : 1,
        mwidth : 40,
        align : "center",
        width : 40,
        header : "序号"
 	}), {
		mtext:" ",
		mcol:1,
		mwidth:100,
		header : '材料名称',
		align : "center",
		dataIndex : 'materialItemName',
		width : 100,
		sortable : true
	}, {
		mtext:"&nbsp;",
		mcol:1,
		mwidth:100,
		header : '型号',
		align : "center",
		dataIndex : 'materialStandard',
		width : 100,
		sortable : true
	}, {
		mtext : "数量",
		mcol : 4,
		mwidth : 400,
		header : '1:1',
		width : 100,
		align : "center",
		dataIndex : 'numberOne',
		sortable : true
	}, {
		header : '1:4',
		align : "center",
		dataIndex : 'numberTwo',
		width : 100,
		sortable : true
	}, {
		header : '1:12',
		align : "center",
		dataIndex : 'numberThree',
		width : 100,
		sortable : true
	}, {
		header : '1:26',
		align : "center",
		dataIndex : 'numberFour',
		width : 100,
		sortable : true
	}, {
		mtext:" ",
		mcol:1,
		mwidth:100,
		align : "center",
		header : '计量单位',
		dataIndex : 'demension',
		width : 100,
		sortable : true
	}, {
		mtext:" ",
		mcol:1,
		mwidth:100,
		align : "center",
		header : '使用部位',
		dataIndex : 'useSite',
		width : 100,
		sortable : true
	}, {
		mtext:" ",
		mcol:1,
		mwidth:100,
		header : '备注',
		align : "center",
		dataIndex : 'remark',
		width : 100,
		sortable : true
	} ]);
	var tbar = [];

	var grid = new Ext.grid.GridPanel({
	     region : "center",
	     renderTo : Ext.get("materialCenterPanel"),
	     store : store,
	     tbar : tbar,
	     cm : cm,
	     sm : sm,
	     id : "inventoryOnePanelId",
	     view : new MyGridView(viewConfig),
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     bbar:new Ext.PagingToolbar({
	    	 pageSize:20,
	    	 store:store,
	    	 displayInfo:true,
	    	 displayMsg:'显示第  {0}条 到 {1}条记录，一共{2}条',
	    	 emptyMsg:"没有记录"
	     })
	    });
	
	grid.on('activate', function() {
		store.load();
	});

	return grid;
}

inventoryOne.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '备件清册',
		id : 'iinventoryOneTab',
		layout : 'fit',
		items : [ inventoryOne.gridPanel() ],
		listeners : {
			'activate' : function() {
				materialQuotaMain.useType = 2;
				var grid = Ext.getCmp('inventoryOnePanelId');
				grid.getStore().baseParams = {
					productCode : equipTree.parentId,
					type : 2,
					start : 0,
					limit : 20
				};
				grid.store.load();
			}
		}
	});

	return tab;
};