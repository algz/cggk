var qualityControlGrid = {
	userId : null
};
// 虚拟数据
var data = {
	"id" : "",
	"totalProperty" : 19,
	"results" : [ {
		"vdata" : '2011-06-09',
		"mname" : 'cc',
		"catalog" : 'xx',
		"pc" : '1',
		"qd" : 'question detail',
		"dept" : 'duty dept',
		"dutyman" : 'duty man',
		"dw" : 'deal with',
		"dr" : 'deal result',
		"vr" : 'vr',
		"status" : 'status'
	}, {
		"vdata" : '2011-06-09',
		"mname" : 'cc',
		"catalog" : 'xx',
		"pc" : '1',
		"qd" : 'question detail',
		"dept" : 'duty dept',
		"dutyman" : 'duty man',
		"dw" : 'deal with',
		"dr" : 'deal result',
		"vr" : 'vr',
		"status" : 'status'
	}, {
		"vdata" : '2011-06-09',
		"mname" : 'cc',
		"catalog" : 'xx',
		"pc" : '1',
		"qd" : 'question detail',
		"dept" : 'duty dept',
		"dutyman" : 'duty man',
		"dw" : 'deal with',
		"dr" : 'deal result',
		"vr" : 'vr',
		"status" : 'status'
	} ],
	"success" : true,
	"msg" : ""
};
var pr = [ "vdata", "mname", "catalog", "pc", "qd", "dept", "dutyman", "dw",
		"dr", "vr", "status" ];
var st = new Ext.data.Store( {
	proxy : new Ext.data.MemoryProxy(data),
	reader : new Ext.data.JsonReader( {
		root : 'results',
		id : 'procurementContractId',
		totalProperty : 'totalProperty'
	}, pr)
});
// 数据列表
qualityControlGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	// var store = new Ext.data.Store(
	// {
	// proxy : new Ext.data.HttpProxy(
	// {
	// url : '../JSON/unplannedPurchase_UnplannedPurchaseRemote.getGridData?d='
	// + new Date(),
	// method : 'post'
	// }),
	// reader : new Ext.data.JsonReader( {
	// root : 'results',
	// id : 'procurementContractId',
	// totalProperty : 'totalProperty'
	// }, [ 'procurementContractId', 'contractCode',
	// 'applicationStatus', 'editors' ])
	// });

	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '检验日期',
				dataIndex : 'vdata',
				width : 100,
				renderer : function(value) {
					return '<p style="color:red; width:80%">'
							+ value + '</p>';
				}
			},
			{
				header : '物资名称',
				dataIndex : 'mname'
			},
			{
				header : '类别',
				dataIndex : 'catalog',
				width : 100,
				renderer : function(value) {
					return '<p style="color:blue; width:100%">'
							+ value + '</p>';
				}
			}, {
				header : '批次',
				dataIndex : 'pc',
				sortable : true
			}, {
				header : '问题描述 ',
				dataIndex : 'qd',
				width : 100
			}, {
				header : '负责部门 ',
				dataIndex : 'dept',
				width : 100
			}, {
				header : '负责人 ',
				dataIndex : 'dutyman',
				width : 100
			}, {
				header : '处理措施 ',
				dataIndex : 'dw',
				width : 100
			}, {
				header : '处理结果 ',
				dataIndex : 'dr',
				width : 100
			}, {
				header : '验证人',
				dataIndex : 'vr',
				width : 100
			}, {
				header : '状态 ',
				dataIndex : 'status',
				width : 100
			} ]);

	// var grid = common.gridPanel('qualityControlGridPanelId', cm, store, true,
	// '物资采购进度表');
	// store.baseParams = {
	// start : 0,
	// limit : 20
	// };
	// store.load();
	var grid = common.gridPanel('qualityControlGridPanelId', cm, st, true,
			'物资采购进度表');
	st.load();
	return grid;
}
