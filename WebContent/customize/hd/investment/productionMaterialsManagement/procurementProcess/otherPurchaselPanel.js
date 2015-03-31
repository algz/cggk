//比价信息列表
var otherPurchaselGridPanel = {
//	materialId : null,
//	selectRow:null,
//	selectObj:null,
//	oldVendorIDs:''
};

//①其它采购信息列表选项卡
otherPurchaselGridPanel.mainGrid = function() {
//此处为procurementProcessData.tabPanel3比价布局的grid

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/parityRemote.getParityGridData?d=' + new Date(),
			method : 'post'
		}),
		baseParams : {
					start : 0,
					limit : 20,
					type : '5'
				},
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'parityId', 'parityCode', 'createDate', 'deliveryDate',
				'applicationStatus', 'applicationStatusName', 'editors',
				'editorsNmae', 'editorsDept', 'purchaseId', 'purchaseCode',
				'vendorId', 'vendorName', 'type', 'typeName', 'materialId',
				'desingnation', 'materialItemName', 'materialStandard','technicCondition',
				'mCtgName','price','vendorNums','deliveryStatus','planActualnumber' ])
	});
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					rowdeselect : function(sm, rowIndex, rec ){
						collection.removeKey(rec.get('parityId'));
					},
					rowselect : function(sm, rowIndex , rec) {
						collection.add(rec.get('parityId'), rec);
					}
				}
			});

	var cm = new Ext.grid.ColumnModel( [ sm, {

		header : '编号',
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
	},{
		header : "交货状态",
		dataIndex : 'deliveryStatus'
	}, {
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
	},{
		header : '建议采购数量',
		dataIndex : 'planActualnumber',
		width : 120,
		sortable : true
	}, {
		header : '中标供应商 ',
		dataIndex : 'vendorName',
		width : 80
	} , {
		header : '关联供应商',
		dataIndex : 'vendorNums',
		width : 80,
		renderer:function(value,cellmeta,record,rowIndex){
			var materialid=record.get('materialId');
			return "<a href=javascript:otherPurchaselGridPanel.showVendorInfoWin('"+materialid+"')>"+value+"</a>";
			
		}
	} ]);
	var tbar = [ '-', {
		text : '添加中标供应商',
		iconCls:'AddVendor',
		disabled :privilegeValidate.addVendorZjDisable,
		handler : function() {
			//为‘编制中’的招投标信息添加中标供应商
			var records = Ext.getCmp('otherPurchaselGridPanel').getSelectionModel().getSelections();
			if (records == null || records.length==0) {
				Ext.Msg.alert('提示', '请选择你指定供应商的记录！');
				return;
			}
			if(records.length>1){
				Ext.Msg.alert('提示', '一次只能指定一条记录！');
				return;
			}
			if(records[0].get("applicationStatusName")!='编制中'&&
				records[0].get("applicationStatusName")!='待审批'){
				Ext.Msg.alert('提示', '只能选择编制中或者待审批的记录！');
				return;
			}
			procurementProcessAction.type = '5';
			procurementProcessAction.parityId = records[0].data.parityId;
			procurementProcessAction.materialId = records[0].data.materialId;
			var vendorId = records[0].data.vendorId;
			var price =  records[0].data.price;
			if(procurementProcessAction.type == '5'&& records[0].data.typeName=='其它采购'){
				var url = '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
							+ new Date() 
				procurementProcessAction.setVendor(url,'5',vendorId,price);
			}
		}
	},'-',{
		text : '送审',
		iconCls :'Send',
		disabled : privilegeValidate.sendZjDisable,
		handler : function(){
			alert('有'+collection.getCount()+'条记录送审!');
			common.selectObj=collection.getRange();
			procurementProcessAction.workFlow("5");
		}
	}, '-', {
		text : '提交',
		iconCls:'CreateContract',
		disabled : privilegeValidate.addZjContractDisable,
		handler : function() {
        alert('有'+collection.getCount()+'条记录提交!');
	//选择记录
	var records = collection.getRange();//Ext.getCmp('otherPurchaselGridPanel').getSelectionModel().getSelections();
	if (records == null || records.length == 0) {
		Ext.Msg.alert('提示', '请选择你要生成的数据！');
		return;
	}
	var str = "";
	var jasonArray = new Array();
	if (records.length > 0) {
		for ( var i = 0; i < records.length; i++) {
//			if (records[i].data.vendorId == null
//					|| records[i].data.vendorId == '') {
//				Ext.Msg.alert('提示', '请指定供应商！');
//				return;
//			}
//			if (records[i].data.type == '1') {
				if (records[i].data.applicationStatus != '4') {
					Ext.Msg.alert('提示', '当前记录没有全部处于已审批状态！');
					return;
				}
//			} else {
//				if (records[i].data.applicationStatus != '6') {
//					Ext.Msg.alert('提示', '当前记录没有全部处于待生成合同状态！');
//					return;
//				}
			jasonArray.push(records[i].data);
		}
		str=Ext.encode(jasonArray);
		
		if (confirm('生成合同数据吗？')) {
			Ext.Ajax.request( {
				url : '../JSON/parityRemote.generateContract?d=' + new Date().getTime(),
				method : 'POST',
				params : {
					"updateRecords" : str
				},
				success : function() {
					//手动设置已生成后的状态。
//					for(var j = 0 ;j<records.length;j++){
//						records[j].set('applicationStatusName','已生成');
//						records[j].set('applicationStatus','5');
//					}
					Ext.getCmp('otherPurchaselGridPanel').store.reload();
//					var grid = Ext.getCmp('otherPurchaselGridPanel');
//					grid.getStore().baseParams = {
//						start : 0,
//						limit : 20,
//						type : 5
//					};
//					//加载比价/招标页面
//					grid.store.load({
//						nocache : true,
//						timeout : 30
//					});					
					Ext.Msg.alert('提示', '合同生成成功！');
				},
				failure : function() {
					Ext.Msg.alert('错误', '合同生成失败！');
				}
			});
		}
	}

			
		}
	}
	, '-', {
		text : '退回',
		iconCls : 'Cancel',
		handler : function() {
			var records=Ext.getCmp('otherPurchaselGridPanel').getSelectionModel().getSelections();
			var parityId='';
			if(records.length==0){
				Ext.Msg.alert('提示','请选择退回的数据!');
				return;
			}
			for(var i=0;i<records.length;i++){
				if(records[0].get('applicationStatusName')!='编制中'){
					return Ext.Msg.alert('提示','请选择编制中的数据!')
				}
				if(i!=0){
					parityId+=",";
				}
				parityId+=records[0].get('parityId');
			}
		    Ext.Ajax.request( {
				url : '../JSON/parityRemote.delMaterialFromParity?d=' + new Date().getTime(),
				method : 'POST',
				params : {
					parityId : parityId
				},
				success : function(response) {
				    Ext.getCmp('otherPurchaselGridPanel').store.reload();
					Ext.Msg.alert('提示', '退回成功！');
				},
				failure : function() {
					Ext.Msg.alert('错误', '退回失败！');
				}
			});
		}
	},'-', '物资类别：', {
		xtype : "textfield",
		id : "searchCatlogNameCompareTemp"
	}, '-', '器材名称：', {
		xtype : "textfield",
		id : "searchMaterialNameCompareTemp"
	}, '-', {
		text : '搜索',
		iconCls:'search1',
		handler : function() {
			procurementProcessAction.searchCompareTemp();
		}
	} ];
	
//	var grid = common.gridPanel('otherPurchaselGridPanel', cm, store, tbar, true,
//			sm, '直接采购列表');
	var grid = new Ext.grid.GridPanel({
		title : '直接采购列表',
		id : 'otherPurchaselGridPanel',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		loadMask : { msg : '加载数据中，请稍候...' },
		listeners : {
			activate: function(grid) {
				grid.store.load();
				collection.clear();
			}
		},
		tbar : tbar,
		bbar : new Ext.PagingToolbar({
					pageSize : 20,
					store : store,
					listeners:{
					change : function(panel, params) {
									var store = panel.store
									var total = store.getCount();// 数据行数
									for (var i = 0; i < total; i++) {
										var row = store.getAt(i);
										if (collection.containsKey(row
												.get('parityId'))) {
											Ext.getCmp('otherPurchaselGridPanel').selModel.selectRow(i, true);
										}
									}
								}
							},
					displayInfo : true,
					displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
					emptyMsg : '没有记录'
				})
	});
	return grid;
}
var collection=new Ext.util.MixedCollection();  


//点击数量弹出的指定供应商信息
otherPurchaselGridPanel.showVendorInfoWin=function(materialIds){
	materialIds="'"+materialIds+"'";
	
	
		var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='
							+ new Date()+'&selectStatus='+1,
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope','simpleName','type','sector',
						'initialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'reviewDate', 'taxID', 'materialItemName','reposal','property','productVentor',
		    	        "sector","sector","email","zipCode","license",
		    	        "egal","setUpDate","registeredCapital" , "bank2","bank2"  ,
		                "bank2","bank3","deliveryAddress" , "availability","trial_comment",
		                "simpleName","scale","remark","type","fax","trial_comment","create_date",
		                "evaluation_status","trial_comment","creater","trial_status"])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},			
			{
				header : '供应商简称',
				dataIndex : 'simpleName',
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '类别',
				dataIndex : 'type',
				sortable : true,
				renderer:function(value){
					if(value==1){
						return "合格";
					}else if(value==2){
						return "试供";
					}else {
						return value;
					}
				}
			},{
				header : '所属行业',
				dataIndex : 'sector',
				sortable : true
			},
			/*{
				header : '采购产品名称 ',
//				dataIndex : 'materialItemName',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},*/
			{
				header : '经营地址 ',
				dataIndex : 'address',
				width : 100	,
				sortable : true			
			} ]); 
	var grid = common.gridPanel('vendorGridPanelId', cm, store, null, true, sm,
			'供应商信息');
		grid.width = 500;
		grid.height = 400;
	store.baseParams = {start : 0,limit:20,vendorByMaterial:'1',materialIds:materialIds};
	store.load();
	

	var window = new Ext.Window( {
		id : "materialItemWindow",
		buttons : [{
							text : '取消',
							handler : function() {
								window.close();
							}
						}],
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '指定供应商信息',
		modal : true,
		items : grid,
		border : true,
		closeAction : 'close'
	});
	window.show();
}
