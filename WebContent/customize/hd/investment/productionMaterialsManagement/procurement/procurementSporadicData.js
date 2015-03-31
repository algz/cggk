var procurementSporadicData = {
	procurementId : null	
};

procurementSporadicData.centerPanel = function() {

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		pruneModifiedRecords : true,
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurement_ProcurementRemote.getSporadicGridData?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementId',
			totalProperty : 'totalProperty'
		}, [ 'procurementId', 'procurementCode', 'actualPurchase', 'deliveryDate', 'requireDemartment',
		     'createDate', 'reportedor', 'remarks', 'repDeptname', 'flag', 'approvalPerson'])
	});

	var cm = new Ext.grid.ColumnModel( [ sm, rm, {

		header : '需求编号',
		dataIndex : 'procurementCode',
		renderer : function(value, cellmeta, record, rowIndex) { 
			var id = record.get("procurementId"); 
				value = "&nbsp;<font color=blue>"+value+"</font>";
			return "<a href='javascript:void(0);' onclick=procurementAction.showSporadicDetail('"+id+"')  >"+value+"</a>";
		},
		sortable : true	
/*	}, {
		header : '交货日期',
		dataIndex : 'deliveryDate',
		width : 100,
		sortable : true
*/	}, {
		header : '生成日期',
		dataIndex : 'createDate',
		width : 100,
		sortable : true
	}, {
		header : ' 状态 ',
		dataIndex : 'flag',
		width : 100,
		renderer : function(value) { 
			return value == '1' ? '已发布' : '未发布';
		},
		sortable : true	
	}, {
		header : "申请人",
		width : 150,
		dataIndex : "approvalPerson",
		editor:new Ext.form.TextField({
			allowBlank:false
		}),
		sortable : true	
	}, {
		header : "需求单位",
		width : 150,
		dataIndex : "requireDemartment",
		editor:new Ext.form.TextField({
			allowBlank:false
		}),
		sortable : true	
	}, {
		header : ' 填报人 ',
		dataIndex : 'reportedor',
		width : 100,
		sortable : true	
	}, {
		header : ' 部门 ',
		dataIndex : 'repDeptname',
		width : 100,
		sortable : true	
	}, {
		header : ' 备注 ',
		dataIndex : 'remarks',
		width : 100,
		sortable : true	
	} ]);
	var tbar = [ '-', {
			text : '导入',
			iconCls : 'Import',
			handler : function() {
				procurementAction.upload();
			}
		},'-', {
			text : '保存',
			iconCls : 'save1',
			handler : function() {
				procurementAction.saveSporadic();
			}
		},'-', {
			text : '发布',
			iconCls : 'Release',
			handler : function() {
				procurementAction.deploySporadic();
			}
		},'-', {
			text : '删除',
			iconCls : 'del1',
			handler : function() {
				procurementAction.delSporadic();
			}
		}

	];
	
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
	
	var grid = new Ext.grid.EditorGridPanel({
	     region : "center",
	     renderTo : Ext.getBody(),
	     store : store,
	     //去掉按钮“导入”、“保存”、“发布”、“删除”
//	     tbar : tbar,
	     bbar : bb,
	     cm : cm,
	     sm : sm,
	     id : "procurementSporadicGridId",
	     clicksToEdit: 1,
	     loadMask : {
	      	msg : '正在加载数据,请稍后...'
	     },
	     columnLines : true,
	     stripeRows : true,
		 viewConfig : {
			enableRowBody : true
		 },
	     listeners:{
	    	beforeedit : function(e){
	    	   if(e.record.data.flag == '1') return false;
	    	} 
	     }
	});

	store.baseParams = {start : 0, limit: 20};
	store.load();
	return grid;

}

procurementSporadicData.rightPanel = function() {

	var rm = new Ext.grid.RowNumberer();
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d=' + new Date(),
			method : 'post',
			params : {type:'2'}
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'procurementDetailId',
			totalProperty : 'totalProperty'
		}, [ 'procurementDetailId', 'buinessPlanDetailsId', 'materialQuotaId', 'materialTypeName', 'vendorId',
				'materialCounts','materialItemName','desingnation','technicCondition','materialStandard', 
				'productCode','deliveryCount','materialCount','remark','demension','procurementId',
				'deliveryDate','vendorName','optLock'])
	});
		
	var cm = new Ext.grid.ColumnModel([
	     rm,
		 {
		  header : "器材名称",
		  width : 80,
		  dataIndex : "materialItemName",
			sortable : true
		 }, {
		  header : "牌号",
		  width : 80,
		  dataIndex : "desingnation",
			sortable : true
		 }, {
		  header : "规格/型号",
		  width : 80,
		  dataIndex : "materialStandard",
			sortable : true
		 }, {
		  header : "技术条件",
		  width : 80,
		  dataIndex : "technicCondition",
			sortable : true		
		 }, {
		  header : "机型",
		  width : 80,
		  dataIndex : "productCode",
			sortable : true		
		 }, {
		  header : "需用总量",
		  width : 80,
		  dataIndex : "materialCounts",
			sortable : true		
		 }, {
		  header : "单位",
		  width : 80,
		  dataIndex : "demension",
			sortable : true		
/*		 }, {
		  header : "供应商",
		  width : 80,
		  dataIndex : "vendorName"	*/	
		 }, {
		  header : "交货日期",
		  width : 80,
		  dataIndex : "deliveryDate",
			sortable : true
		 }, {
		  header : "类别",
		  width : 80,
		  dataIndex : "materialTypeName",
			sortable : true		
		 }, {
		  header : "备注",
		  width : 80,
		  align : "left",
		  dataIndex : "remark",
		  renderer : function(value) {
			return value.replace(new RegExp(/</g), '&lt;');
		  }		
		 }]);
		
	var tbar = [ '-', {
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
			var cards = Ext.getCmp('mainViewPanel');
			cards.getLayout().setActiveItem(0);
		}
	}];
	
	return common.gridPanel('procurementSporadicDataGrid', cm, store, tbar, true, null, '零星需求信息');

}

procurementSporadicData.centerPanel2 = function(){
			
	procurementSporadicData.leftpanel = new Ext.Panel( {
		id : 'sporadicLeftTree',
		region : 'west',
		width : '240',
		layout : 'fit',// 自适应整个高度
		border : false,
		split : true,
		margin : '0 0 5 0',
		items : [ procurementSporadicDetailTree.init() ]
	});

	procurementSporadicData.rightpanel = new Ext.Panel( {
		id : 'sporadicRightGrid1',
		region : 'center',
		layout : 'fit',// 自适应整个高度
		border : false,
		margin : '0 0 5 0',
		items : [ procurementSporadicData.rightPanel() ]
	});

	return new Ext.Panel( {
		id : 'procurementSporadicDetailGridId',
		layout : 'border',
		items : [ procurementSporadicData.leftpanel, procurementSporadicData.rightpanel ]
	});
}

procurementSporadicData.tabPanel = function() {

	var tab = new Ext.Panel( {
		title : '零星物资需求列表',
		id : 'procurementSporadicTab',
		layout : 'fit',
		items : procurementSporadicData.centerPanel(),
		listeners : {
			'activate' : function() {
				procurementMain.activeTabId = this.id;
			}
		}
	});

	return tab;
};
