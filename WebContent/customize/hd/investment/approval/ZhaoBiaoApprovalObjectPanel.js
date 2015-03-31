//招标审批，查看明细
ZhaoBiaoApprovalObjectPanel = {};
ZhaoBiaoApprovalObjectPanel.init = function(id){ 
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/parityRemote.getParityGridData?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'parityId', 'parityCode', 'createDate', 'deliveryDate',
				'applicationStatus', 'applicationStatusName', 'editors',
				'editorsNmae', 'editorsDept', 'purchaseId', 'purchaseCode',
				'vendorId', 'vendorName', 'type', 'typeName', 'materialId',
				'desingnation', 'materialItemName', 'materialStandard','technicCondition',
				'mCtgName','price','deliveryStatus' ])
	});
	var sm = new Ext.grid.CheckboxSelectionModel();

	var cm = new Ext.grid.ColumnModel( [ sm, {

		header : '采购策略编号',
		dataIndex : 'parityCode',
		sortable : true
	}, {
		header : '器材名称',
		dataIndex : 'materialItemName',
		width : 80,
		sortable : true
	}, {
		mtext:" ",
		mcol:1,
		mwidth:78,
		header : "牌号",
		width : 80,
		dataIndex : "desingnation"
	}, {
		mtext:" ",
		mcol:1,
		mwidth:78,
		header : "规格/型号",
		width : 80,
		dataIndex : "materialStandard"
	}, {
		mtext:" ",
		mcol:1,
		mwidth:78,
		header : "技术条件",
		width : 80,
		dataIndex : "technicCondition"		
	}, {
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	},{
		header : ' 生成日期 ',
		dataIndex : 'createDate',
		width : 120
	}, {
		header : ' 交货日期 ',
		dataIndex : 'deliveryDate',
		width : 100
	}, {
		header : ' 申请状态 ',
		dataIndex : 'applicationStatusName',
		width : 80
	}, {
		header : ' 物资类别 ',
		dataIndex : 'mCtgName',
		width : 80
	}, {
		header : '编辑人',
		dataIndex : 'editorsNmae',
		width : 80
	}, {
		header : '部门',
		dataIndex : 'editorsDept',
		width : 80
	}, {
		header : '采购清单来源 ',
		dataIndex : 'purchaseCode',
		width : 120
	}, {
		header : '中标供应商 ',
		dataIndex : 'vendorName',
		width : 80
	}, {
		header : "落选供应商",
		width : 80,
		dataIndex : "",
		renderer : function(value,cellmeta,record,rowIndex) { 
			var vendorId = record.get("vendorId"); 
			var parityId=record.get('parityId');
			var status=record.get('applicationStatus');
			var materialId=record.get('materialId');
			return "<a href='javascript:void(0);' onclick=uncheckedVendor.mainWin('"+parityId+"','"+vendorId+"','"+status+"','"+materialId+"') >"
				+ "<font color=blue>新增/查看</font></a>";
		}
	} ]);
	
	var grid = common.gridPanel('productionProcessId3', cm, store, '', true,
			sm, '采购招投标列表');
	store.baseParams = {
		start : 0,
		limit : 20,
		type : '2',
		parityId:id
	};
	store.load();
	return grid;
}