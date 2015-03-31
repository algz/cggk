var moneyPaymentGrid = {
		selectRow:null,
		selectObj:null
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

moneyPaymentGrid.gridPanel = function(){
	var sm = new Ext.grid.CheckboxSelectionModel({
		mtext : " ",
        mcol : 1,
        mwidth : 20,
        width : 20
	});
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/moneyPayment_MoneyPaymentRemote.getMoneyPayment?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		},
		[ 'moneyPaymentId', 'amount', 'createDate',
		'equipmentNumber', 'incurredDate', 'invoiceDate',
		'invoiceNo', 'prepayment', 'procurementContractId',
		'remark','taxPrice'])
	});
	var cm = new Ext.grid.ColumnModel([ sm,new Ext.grid.RowNumberer({
    	mtext : " ",
        mcol : 1,
        mwidth : 40,
        width : 40,
        header : "序号"
 	}),{
		mtext:" &nbsp;",
		mcol:1,
		mwidth:100,
		header : '编制时间',
		dataIndex : 'createDate',
		align : "center",
		width : 100,
		sortable : true
	},{
		mtext:"&nbsp;",
		mcol:1,
		mwidth:100,
		header : '预付货款',
		dataIndex : 'prepayment',
		align : "center",
		width : 100,
		sortable : true
	},{
		mtext:" ",
		mcol:1,
		mwidth:100,
		header : '承付日期',
		dataIndex : 'incurredDate',
		align : "center",
		width : 100,
		sortable : true
	}, {
		mtext : "发票日期数量及贷款",
		mcol : 5,
		mwidth : 500,
		header : '到厂时间',
		width : 100,
		align : "center",
		dataIndex : 'invoiceDate',
		sortable : true	
	},{
		header : '发票号码',
		align : "center",
		dataIndex : 'invoiceNo',
		width : 100,
		sortable : true	
	},{
		header : '器材数量',
		align : "center",
		dataIndex : 'equipmentNumber',
		width : 100,
		sortable : true	
	},{
		header : '含税单价(元)',
		align : "center",
		dataIndex : 'taxPrice',
		width : 100,
		sortable : true	
	},{
		header : '金额(元)',
		align : "center",
		dataIndex : 'amount',
		width : 100,
		sortable : true	
	}, {
		mtext:" &nbsp;",
		mcol:1,
		mwidth:100,
		header : '备注',
		align : "center",
		dataIndex : 'remark',
		width : 100,
		sortable : true	
	}]);
	
	var tbar = ['-', {
		id : 'addBtnId',
		text : '新增',
		iconCls : 'add1',
		handler : function() {
			moneyPaymentAction.addView(moneyPaymentMain.contractId);
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		handler : function() {
			moneyPaymentAction.delView();
		}
	}, '-', {
		text : '编辑',
		iconCls : 'edit1',
		handler : function() {
			moneyPaymentAction.editView();
		}
	}, '-', {
		text : '返回',
		handler : function() {
			moneyPaymentMain.window.close();
		}
	}];
	
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
	
	var grid = new Ext.grid.GridPanel({
	     renderTo : Ext.getBody(),
	     store : store,
	     tbar : tbar,
	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "moneyPaymentGridPanelId",
	     view : new MyGridView(viewConfig),
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     }
	    });
	
	sm.on('rowselect', function(sm, rowIndex, record) {
		moneyPaymentGrid.selectRow = record;
	});
	sm.on('selectionchange', function(sm, t) {
		moneyPaymentGrid.selectObj = sm.getSelections();
		if(!sm.getSelections() || sm.getSelections().length<1){
			moneyPaymentGrid.selectRow = null;
		}
	});
	
	store.baseParams = {start : 0, limit: 20, procurementContractId: moneyPaymentMain.contractId};
	store.load();
	return grid;
}