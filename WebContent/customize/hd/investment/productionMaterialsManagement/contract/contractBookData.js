var contractBookData = {};

contractBookData.centerPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/contract_ProcurementContractBookRemote.getContractBooks?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementContractBookId',
					totalProperty : 'totalProperty'
				}, [ 'procurementContractBookId','procurementContractId','contractCode','auditCode',
						'executetion', 'arriveCircs','contractAmount','signDate','editors',
						'remarks', 'materialId','vendor', 'vendName', 'mainMaterialName','attachments'])
			});
	
	store.baseParams = {start:0,limit:20};

	var cm = new Ext.grid.ColumnModel( [ rm, {
		header : "合同编号",
		width : 100,
		dataIndex : "contractCode",
		sortable : true
	}, {
		header : "签订单位",
		width : 150,
		dataIndex : "vendName",
		sortable : true
	}, {
		header : "签订日期",
		width : 80,
		dataIndex : "signDate",
		sortable : true
	}, {
		header : "物资名称",
		width : 80,
		dataIndex : "mainMaterialName",
		renderer : function(value,cellmeta,record,rowIndex) { 
			var id = record.get("procurementContractId");
			var type = record.get("auditCode").substring(1,2);
			value = "&nbsp;<font color=blue>"+value+"</font>";
			return "<a href='javascript:void(0);' onclick=contractBookData.showContractMaterialDetail('"+id+"','"+type+"')  >"+value+"</a>";
		},
		sortable : true
	}, {
		header : "合同金额",
		width : 80,
		dataIndex : "contractAmount",
		sortable : true
	}, /*{
		header : "合同执行情况",
		width : 90,
		dataIndex : "executetion",
		renderer : function(value,cellmeta,record,rowIndex) { 
			var id = record.get("procurementContractId"); 
			return "<a href='javascript:void(0);' onclick=contractExecuteAction.gridView('"+id+"') >"
				+ "<font color=blue>新增/查看详情</font></a>";
		}
	},*/  {
		header : "供应商资质",
		width : 90,
		dataIndex : "supplierQualification",
		renderer : function(value,cellmeta,record,rowIndex) { 
			var vendor = record.get("vendor"); 
			return "<a href='javascript:void(0);' onclick=supplierQualificationGrid.getView('"+vendor+"') >"
				+ "<font color=blue>查看详情</font></a>";
		}
	},{
		header : "货款支付情况",
		width : 90,
		dataIndex : "arriveCircs",
		renderer : function(value,cellmeta,record,rowIndex) { 
			var id = record.get("procurementContractId"); 
			return "<a href='javascript:void(0);' onclick=moneyPaymentAction.gridView('"+id+"') >"
				+ "<font color=blue>新增/查看详情</font></a>";
		}
	}, {
		header : "合同附件",
		width : 150,
		dataIndex : "attachments",
		renderer : function(value,cellmeta,record,rowIndex) {
			var id = record.get("procurementContractId");
			var strValue = "&nbsp;<font color=blue>"+value+"</font>";
			return "<a href='javascript:void(0);' onclick=contractAction.downloadFile('"+id+"')>"+strValue+"</a>";
		},
		sortable : true			
	},{
		header : '编辑人',
		width : 100,
		dataIndex : 'editors'
	}
//	, {
//		header : "备注",
//		width : 200,
//		dataIndex : "remarks",
//		editor:new Ext.form.TextArea(),
//		renderer : function(value) {
//			return value.replace(new RegExp(/</g), '&lt;');
//		},
//		sortable : true
//	}
	]);

	var tbar = [ '-', {
		text : '按条件检索',
		iconCls : 'search1',
		handler : function() {
			contractAction.searchBook();
		}
	} ];

	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
		
	var grid = new Ext.grid.GridPanel({
	     region : "center",
	     renderTo : Ext.getBody(),
	     store : store,
	     tbar : tbar,
	     bbar : bb,
	     cm : cm,
	     id : "contractManagerPanelId",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     columnLines : true,
	     stripeRows : true,
	     viewConfig : {
			enableRowBody : true
	     }
	    });

	return grid;
}

contractBookData.contractBookTab = function(){
	 
	var tab = new Ext.Panel( {		
		title : '合同管理列表',
		id : 'contractBookTab',
		layout : 'fit',
		items : [ contractBookData.centerPanel() ],
		listeners : {
			render : function(){
				Ext.getCmp('contractManagerPanelId').getStore().load();
			}
		}
	});

	return tab;
}


contractBookData.showContractMaterialDetail=function(procurementContractId){
	
var sm = new Ext.grid.CheckboxSelectionModel({
			width : 20
		});
	var cm = new Ext.grid.ColumnModel([sm,
       	    	new Ext.grid.RowNumberer({
				width : 30,
				header : "序号"
			}),{
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			},{
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			},{
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			},{
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	},{
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true
			},{
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			},{
				header : "供应商",
				width : 80,
				dataIndex : "vendorName" ,
				sortable : true
			}, {
				header : "需求量",
				width : 80,
				dataIndex : 'materialCounts',//"needNumber",
				sortable : true
			}, {
				header : '申请数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
		},{
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true
			}, {
				header : "实际采购量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber", 
				sortable : true
			}, {
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName", 
				sortable : true
			}, {
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true,
				editor : new Ext.form.TextField({
				})
			},{
				header : "变更前数据",
				width : 80,
				align : "left",
				dataIndex : 'oldquantity',
				sortable : true
			} ,{
				header : "变更人",
				width : 80,
				align : "left",
				dataIndex : 'changer',
				sortable : true
			}, {
				header : "变更时间",
				width : 80,
				align : "left",
				dataIndex : 'changtime',
				sortable : true
			} ,{
				header : '变更原因',
				width : 80,
				align : "left",
				dataIndex : "changreson",
				sortable : true
			} ]);
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridDataByContract?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'remark', 'demension',
						'procurementId', 'newProcessType', 'desingnation',
						'purchaseType', 'materialId', 'backNumber', 'onNumber',
						'storeNumber', 'needNumber', 'purchaseTypeName',
						'requestCode', 'optLock', 'purchaseId', 'productCode',
						'technicCondition', 'noCheck', 'noExpend', 'operable',
						'productCode', 'provideNumber', 'subtotal', 'contract',
						'number_applications', 'amount_applications',
						'subtotal_number', 'subtotal_amount', 'super_storage',
						'redeployment', 'last_year_Consume',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber','price','note','reserve',
						'oldquantity','changer','changtime','changreson','deliveryStatus'
						])
	});
		
	var grid= new Ext.grid.GridPanel({
				store : store,
				sm : new Ext.grid.CheckboxSelectionModel(),
				cm : cm,
				id : 'procurementDetailGridId12',
				region:'center',
				border:false,
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
						})
			});
			
	var win = new Ext.Window({
		id : "contractBookWinId",
		width : 740,
		height : 440,
		autoScroll : true, 
		layout: 'fit',
		title : '物料信息列表',
		modal : true,
		items : grid,
		buttons : [{
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			win.close();
		}
	}]
	});
	grid.store.baseParams={start:0,limit:20,contractId:procurementContractId};
	grid.store.load();
	win.show();
}

contractBookData.gridWin = function(type) {
	
	var grid = contractData.procurementDetailPanel('contractBookDetailDataGrid', type);
		
	var buttons = [{
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			window.close();
		}
	}]

	var window = new Ext.Window({
		id : "contractBookWinId",
		width : 740,
		height : 440,
		autoScroll : true, 
		layout: 'fit',
		title : '&nbsp;物料信息列表',
		modal : true,
		items : grid,
		buttons : buttons
	});
	
	return window;

}