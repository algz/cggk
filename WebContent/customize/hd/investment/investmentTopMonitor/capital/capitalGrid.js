var capitalGrid = {
	userId : null
};

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

// 虚拟数据
var data = {
	"id" : "c",
	"totalProperty" : 3,
	"results" : [ {
		"contractnum" : 'ZA11111',
		"janp" : '12',
		"janr" : '12',
		"febp" : '12',
		"febr" : '12',
		"marp" : '12',
		"marr" : '12',
		"aprp" : '12',
		"aprr" : '12',
		"mayp" : '12',
		"mayr" : '12',
		"junep" : '12',
		"juner" : '12',
		"julyp" : '12',
		"julyr" : '12',
		"augp" : '12',
		"augr" : '12',
		"septp" : '12',
		"septr" : '12',
		"octp" : '12',
		"octr" : '12',
		"novp" : '12',
		"novr" : '12',
		"dectp" : '12',
		"dectr" : '13'
	}, {
		"contractnum" : 'ZA11112',
		"janp" : '12',
		"janr" : '12',
		"febp" : '12',
		"febr" : '12',
		"marp" : '12',
		"marr" : '12',
		"aprp" : '12',
		"aprr" : '12',
		"mayp" : '12',
		"mayr" : '12',
		"junep" : '12',
		"juner" : '12',
		"julyp" : '12',
		"julyr" : '12',
		"augp" : '12',
		"augr" : '12',
		"septp" : '12',
		"septr" : '12',
		"octp" : '12',
		"octr" : '12',
		"novp" : '12',
		"novr" : '12',
		"dectp" : '12',
		"dectr" : '13'
	}, {
		"contractnum" : 'ZA11113',
		"janp" : '12',
		"janr" : '12',
		"febp" : '12',
		"febr" : '12',
		"marp" : '12',
		"marr" : '12',
		"aprp" : '12',
		"aprr" : '12',
		"mayp" : '12',
		"mayr" : '12',
		"junep" : '12',
		"juner" : '12',
		"julyp" : '12',
		"julyr" : '12',
		"augp" : '12',
		"augr" : '12',
		"septp" : '12',
		"septr" : '12',
		"octp" : '12',
		"octr" : '12',
		"novp" : '12',
		"novr" : '12',
		"dectp" : '12',
		"dectr" : '13'
	} ],
	"success" : true,
	"msg" : ""
};
var pr = [ "contractnum", "janp", "janr", "febp", "febr", "marp", "marr",
		"aprp", "aprr", "mayp", "mayr", "junep", "juner", "julyp", "julyr",
		"augp", "augr", "septp", "septr", "octp", "octr", "novp", "novr",
		"dectp", "dectr" ];
var st = new Ext.data.Store( {
	proxy : new Ext.data.MemoryProxy(data),
	reader : new Ext.data.JsonReader( {
		root : 'results',
		id : 'contractnum',
		totalProperty : 'totalProperty'
	}, pr)
});
// 数据列表
capitalGrid.gridPanel = function() {
	// var store = new Ext.data.Store(
	// {
	// proxy : new Ext.data.HttpProxy( {
	// url : '../JSON/unplannedPurchase_UnplannedPurchaseRemote.getGridData?d='
	// + new Date(),
	// method : 'post'
	// }),
	// reader : new Ext.data.JsonReader( {
	// root : 'results',
	// id : 'procurementContractId',
	// totalProperty : 'totalProperty'
	// }, [ 'procurementContractId', 'contractCode', 'applicationStatus',
	// 'editors'])
	// });

	var cm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer( {
		mtext : " ",
		mcol : 1,
		mwidth : 30,
		width : 32,
		header : "序号"
	}), {
		mtext : "合同编号",
		mcol : 1,
		mwidth : 100,
		header : '合同编号',
		dataIndex : 'contractnum',
		width : 100
	}, {
		mtext : "1月",
		mcol : 2,
		mwidth : 100,
		header : '计划',
		dataIndex : 'janp',
		width : 52,
		sortable : true
	}, {
		header : '实际 ',
		dataIndex : 'janr',
		width : 52
	}, {
		mtext : "2月",
		mcol : 2,
		header : '计划',
		mwidth : 100,
		dataIndex : 'febp',
		width : 50,
		sortable : true
	}, {
		header : '实际 ',
		dataIndex : 'febr',
		width : 50
	}, {
		mtext : "3月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'marp',
		width : 52
	}, {
		header : '实际 ',
		dataIndex : 'marr',
		width : 52
	}, {
		mtext : "4月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'aprp',
		width :50
	}, {
		header : '实际 ',
		dataIndex : 'aprr',
		width : 50
	}, {
		mtext : "5月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'mayp',
		width : 52
	}, {
		header : '实际 ',
		dataIndex : 'mayr',
		width : 52
	}, {
		mtext : "6月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'junep',
		width : 50
	}, {
		header : '实际 ',
		dataIndex : 'juner',
		width : 50
	}, {
		mtext : "7月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'julyp',
		width : 52
	}, {
		header : '实际 ',
		dataIndex : 'julyr',
		width : 52
	}, {
		mtext : "8月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'augp',
		width : 50
	}, {
		header : '实际 ',
		dataIndex : 'augr',
		width : 50
	}, {
		mtext : "9月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'septp',
		width : 52
	}, {
		header : '实际 ',
		dataIndex : 'septr',
		width : 52
	}, {
		mtext : "10月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'octp',
		width : 50
	}, {
		header : '实际 ',
		dataIndex : 'octr',
		width : 50
	}, {
		mtext : "11月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'novp',
		width : 52
	}, {
		header : '实际 ',
		dataIndex : 'novr',
		width : 52
	}, {
		mtext : "12月",
		mcol : 2,
		header : '计划 ',
		mwidth : 100,
		dataIndex : 'dectp',
		width : 50
	}, {
		header : '实际 ',
		dataIndex : 'dectr',
		width : 50
	}]);

	// var grid = common.gridPanel('capitalGridPanelId', cm, store, true,
	// '物资采购进度表');
	// store.baseParams = {start : 0, limit: 20};
	// store.load();
	// var grid = common.gridPanel('capitalGridPanelId', cm, st, true,
	// '资金使用监控');

	var grid = new Ext.grid.GridPanel( {
		region : "center",
		renderTo : Ext.getBody(),
		store : st,
		cm : cm,
		title : '资金使用监控',
		id : "capitalGridPanelId",
		view : new MyGridView(viewConfig),
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});
	st.load();
	return grid;
}
