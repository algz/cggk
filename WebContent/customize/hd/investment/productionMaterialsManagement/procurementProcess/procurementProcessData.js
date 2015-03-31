//多级表头样式

MyGridView = Ext.extend(Ext.grid.GridView, {

			renderHeaders : function() {

				var cm = this.cm, ts = this.templates;

				var ct = ts.hcell, ct2 = ts.mhcell,ctm=ts.mhcellm;

				var cb = [], sb = [], p = {}, mcb = [],mcbm=[];

				for (var i = 0, len = cm.getColumnCount(); i < len; i++) {

					p.id = cm.getColumnId(i);

					p.value = cm.getColumnHeader(i) || "";

					p.style = this.getColumnStyle(i, true);

					if (cm.config[i].align == 'right') {

						p.istyle = 'padding-right:16px';

					}

					cb[cb.length] = ct.apply(p);
                    
					if (cm.config[i].mtext)

						mcb[mcb.length] = ct2.apply({

									value : cm.config[i].mtext,								
								

									mcols : cm.config[i].mcol,						
								

									mwidth : cm.config[i].mwidth

								});
				   if (cm.config[i].mtext)

						mcbm[mcbm.length] = ctm.apply({
								
									
									valuem : cm.config[i].mtextm,							
									
									mcolsm : cm.config[i].mcolm,
									
									mwidthm : cm.config[i].mwidthm


								});				

				}

				var s = ts.header.apply({

							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

							mergecells : mcb.join("")//,
						 	
//						    mergecellsm : mcbm.join("")

						});
			   var ss = ts.headerm.apply({

//							cells : cb.join(""),//显示字段

							tstyle : 'width:' + this.getTotalWidth() + ';',

//							mergecells : mcb.join(""),
						 	
						    mergecellsm : mcbm.join("")

						});		

				return ss+s;

			}

		});

viewConfig = {

	templates : {
		headerm : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecellsm} </tr>'

				+ '  </thead>',

				" </table>"),


		header : new Ext.Template(

				' <table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',

				' <thead> <tr class="x-grid3-hd-row">{mergecells} </tr>'

				+ ' <tr class="x-grid3-hd-row">{cells} </tr> </thead>',

				" </table>"),

		mhcellm : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcolsm}" style="width:{mwidthm}px;"> <div align="center">{valuem}</div>',

				" </td>"),
				
		mhcell : new Ext.Template(
		        	' <td class="x-grid3-header" colspan="{mcols}" style="width:{mwidth}px;"> <div align="center">{value}</div>',

				" </td>")
		

	}

};


var procurementProcessData = {
	newProcessType : '',// 1为年度，2为零星
	processGridTab1Type : '0',
	processGridTab2Type : '0',
	processGridTab3Type : '0',
	procurementId : '',//采购计划Id，用于查询计划大纲 
	materialTypeName : '',//物料种类名称
	threeIdStrings : ',',// 大匹配字符串
	isEmpty : true,
	isNianDuCommit : false,//新建年度计划提交标识符
	isLingXingCommit : false,//新建零星计划提交标识符
	rowIndex : null,//record行号
	nianduTreeLeaf : false,//年度计划新建时树节点是否为叶子节点
	nianduTreeId : null,//年度计划树选中ID
	lingxingTreeLeaf : false,//零星计划新建时树节点是否为叶子节点
	lingxingTreeId : null,//零星计划树选中ID
	selectRow:null,//所勾选的行
	selectObj:null,//所勾选的record对象
	batchType:null,//批量设置采购方式的中间字段
	materialCatLogId : null//物料种类Id
};
///----------------------///已下是采购计划功能
//---//采购计划展示列表，包括年度计划和零星计划，列表显示简要信息
procurementProcessData.centerPanel = function(type,status) {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementProcessRemote.getPurchaseGridData?d='
					+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'purchaseId', 'purchaseCode', 'createDate', 'status',
				'materialTypeName', 'editor', 'type', 'remark','purchaseName',
				'stateName', 'editorName', 'editorDeptName', 'editorRoleName',
				'purchaseTypeName' ])
	});
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel(
			[
					sm,
					rm,
					{

						header : '编号',
						dataIndex : 'purchaseCode',
						sortable : true,
						width:120,
						renderer : function(value, cellmeta, record, rowIndex) {
							//展示采购计划详细信息的链接
							var purchaseId = record.get("purchaseId");// 计划清单唯一标识
							var purchaseType = record.get("type");// 决定是加载零星列表还是年度列表
							var state = record.get("status");
							value = "&nbsp;<font color=blue>" + value
									+ "</font>";
							
							return "<a href='javascript:void(0);' onclick= procurementProcessAction.showPurchaseDetail('"
									+ purchaseId
									+ "','"
									+ purchaseType
									+ "','"
									+ state
									+ "',"+type+")  >" + value + "</a>";

						}
					}, {
						header : '计划名称',
						dataIndex : 'purchaseName',
						width : 230,
						sortable : true
					}, {
						header : '生成日期',
						dataIndex : 'createDate',
						width : 80,
						sortable : true
					}, {
						header : '申请状态',
						width : 80,
						dataIndex : 'stateName',
						sortable : true
					}, {
						header : ' 物资类别 ',
						dataIndex : 'materialTypeName',
						width : 100,
						hidden:true,
						sortable : true
					}, {
						header : ' 编辑人 ',
						dataIndex : 'editorName',
						width : 100,
						sortable : true
					}, {
						header : ' 部门 ',
						dataIndex : 'editorDeptName',
						width : 100,
						sortable : true
					}, {
						header : ' 需求来源  ',
						dataIndex : 'purchaseTypeName',
						width : 100,
						sortable : true
					},{
						header : '审批进度',
						dataIndex : '',
						hidden:true,
						renderer : function(value, cellmeta, record, rowIndex){//查看审批进度的链接
							var id = record.get("purchaseId");
							var status = record.get("status");
							if(status == '2'){//审批中、已审批
								return "<a href='javascript:void(0);' onclick=procurementProcessAction.showPurchaseFlowInstance('"
									+id+"')><font color=blue>查看</font></a>";
							}			
						},
						sortable : true
					}
					,{
						header : '审批记录',
						dataIndex : '',
						hidden:true,
						renderer : function(value, cellmeta, record, rowIndex){
							var id = record.get("purchaseId"); 
							var applicationStatus = record.get("status");
//							if(parseInt(applicationStatus)>1){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
					}
//					, {
//						header : ' 备注 ',
//						dataIndex : 'remark',
//						width : 100,
//						sortable : true
//					} 
					]);
	var tbar = [
	'-', {//工具栏项
		text : '新建',
		extype : 'button',
		iconCls : 'add1',
		disabled :privilegeValidate.addDisable,
		//menu : menuFile //新建菜单项
		handler : function() {
			if(type=="2"){
				procurementProcessData.newProcessType = '2';
				procurementProcessData.rightpanel1.getLayout().setActiveItem(1);
			}else{
				procurementProcessData.newProcessType = '1';
				procurementProcessData.rightpanel1.getLayout().setActiveItem(2);
			}
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		disabled :privilegeValidate.delDisable,
		handler : function() {
			// 验证是否勾选id
			var records=Ext.getCmp('productionProcessId1').getSelectionModel().getSelections();
			//var record = common.selectObj;
			if (records == null || records.length == 0) {
				Ext.Msg.alert('提示', '请选择一条记录');
				return;
			}
			var arr = new Array();
			for (var i = 0; i < records.length; i++) {
				if (records[i].get('status') != '1') {
					Ext.Msg.alert('提示', '只能删除待审批状态下的采购计划，所有选项并没有全部处于待审批状态！');
					return;
				}
				arr.push(records[i].get('purchaseId'));
			}
			Ext.MessageBox.confirm('删除采购清单', '删除后无法恢复，是否继续？　', function(btn, text) {
						if (btn == 'yes') {
							Ext.Ajax.request({
										url : '../JSON/procurementDetail_ProcurementDetailRemote.removeAnnualPlan',
										method : 'post',
										waitMsg : '数据加载中，请稍后....',
										params : {
											purchaseId : Ext.util.JSON.encode(arr)
										},
										success : function(response, opts) {
											var obj = Ext.decode(response.responseText);
											if (obj.success == true) { 
												var grid = Ext.getCmp("productionProcessId1");
												grid.getStore().baseParams = {
													start : 0,
													limit : 20,
													type : 1
												};
												grid.store.load();
											} else {
												Ext.Msg.alert('提示',obj.msg);
												// 你后台返回success 为 false时执行的代码
											}
										},
										failure : function(response, opts) {
											//console.log('server-side failure with status code ' + response.status);
										}
									});
							//callSeam("", "", [arr], procurementProcessAction.callBack);
						} else {
						}
					});
		}
	},
	'-', {
		text : '导入',
		iconCls : 'add1',
		disabled :privilegeValidate.delDisable,
		handler : function() {
		   var win=new procurementProcessData.fileUpload();
		   win.show();
		}
	},'-', {
		text : '',
		disabled : true,
		iconCls : '',
		handler : function() {
			procurementProcessAction.generateParityContractData();

		}
	}, '-', {
		text : '送审',
		iconCls : 'Send',
		handler : function() {
			procurementProcessAction.workFlow("1");
		}
	}, '-', '编号：', {
		xtype : "textfield",
		id : "purchaseCode"
	}, '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
		   //var searchCatlogName = document.getElementById('searchCatlogName').value;
	       var grid = Ext.getCmp('productionProcessId1');
	       grid.getStore().baseParams = {
	          start : 0,
		      limit : 20,
		      purchaseCode : Ext.getCmp('purchaseCode').getValue(),
		      type:type,
		      status:status 
	       };
	       grid.store.load();
		   //procurementProcessAction.search(type,status);
		}
	}

	]
	
	var grid = common.gridPanel('productionProcessId1', cm, store, tbar, true,
			sm, '采购清单列表');
	 
	return grid;

}
//---//采购计划展示列表结束

///-----------------------------///采购招投标列表清单
//此处为procurementProcessData.tabPanel3比价布局的grid
procurementProcessData.rightPanelTemp = function() {

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
				'mCtgName','price','deliveryStatus','planActualnumber' ])
	});
	var sm = new Ext.grid.CheckboxSelectionModel();

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
		header : '建议采购数量',
		dataIndex : 'planActualnumber',
		width : 120,
		sortable : true
	},{
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
	var tbar = [ '-', {
		text : '添加中标供应商',
		iconCls:'AddVendor',
		disabled :privilegeValidate.addVendorZDisable,
		handler : function() {
			//为‘编制中’的招投标信息添加中标供应商
			var records = common.selectObj;
			var record = common.selectRow;
			if (record == null || record.length==0) {
				Ext.Msg.alert('提示', '请选择你指定供应商的"招投标"记录！');
				return;
			}
			if(records.length>1){
				Ext.Msg.alert('提示', '一次只能指定一条"招投标"记录！');
				return;
			}
			if(records[0].get("applicationStatusName")=='已审批'){
				Ext.Msg.alert('提示', '不能选择已审批状态的"招投标"记录！');
				return;
			}
			procurementProcessAction.type = '2';
			procurementProcessAction.parityId = record.data.parityId;
			procurementProcessAction.materialId = record.data.materialId;
			var vendorId = record.data.vendorId;
			var price =  record.data.price;
			//再次确认是否为‘招标’添加供应商
			if(procurementProcessAction.type == '2'&& record.data.typeName=='招标'){
				var url = '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
							+ new Date() 
				procurementProcessAction.setVendor(url,'2',vendorId,price);
			}
		}
	}, '-', {
		text : '提交',
		iconCls:'CreateContract',
		disabled :privilegeValidate.addZContractDisable,
		handler : function() {
			procurementProcessAction.generateContract('productionProcessId3','2');
		}
	}, '-', {
		text : '送审',
		iconCls : 'Send',
		disabled : privilegeValidate.sendZDisable,
		handler : function() {
			procurementProcessAction.workFlow("6");
		}
	}, '-', {
		text : '退回',
		iconCls : 'Cancel',
		handler : function() {
			var records=Ext.getCmp('productionProcessId3').getSelectionModel().getSelections();
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
				    Ext.getCmp('productionProcessId3').store.reload();
					Ext.Msg.alert('提示', '退回成功！');
				},
				failure : function() {
					Ext.Msg.alert('错误', '退回失败！');
				}
			});
		}
	}
	, '-', '物资类别：', {
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
	var grid = new Ext.grid.EditorGridPanel({
		store : store,
		tbar : tbar,
		cm : cm,
		sm : sm,
		id : "productionProcessId3",//"card5PanelDataGrid",
		clicksToEdit : 1,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		bbar:new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	    }),
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});
//	var grid = common.gridPanel('productionProcessId3', cm, store, tbar, true,
//			sm, '采购招投标列表');
	store.baseParams = {
		start : 0,
		limit : 20,
		type : '2'
	};
	return grid;

}
///-----------------------------///采购招投标列表清单结束


//新建采购计划菜单项，①1为‘新建年度计划’，2为‘新建零星计划’.②选项卡1为‘新建零星采购计划’，选项卡2为新建‘年度采购计划’。
var menuFile = new Ext.menu.Menu( {
	items : [ {
		text : '年度采购计划',
		handler : function() {
			procurementProcessData.newProcessType = '1';
			procurementProcessData.rightpanel1.getLayout().setActiveItem(2);
		}
	}, {
		text : '零星采购计划',
		handler : function() {
			procurementProcessData.newProcessType = '2';
			procurementProcessData.rightpanel1.getLayout().setActiveItem(1);
		}
	} ]
});
//采购计划列表选项卡，①：采购计划详细信息列表(包括2‘年度计划’和1‘零星计划’)。
procurementProcessData.card1 = function(type,status) {

	var tab = new Ext.Panel( {
		id : 'procurementProcessDataGrid11',
		layout : 'fit',
		items : [ procurementProcessData.centerPanel(type,status) ],
		listeners : {
			'activate' : function() {
			}
		}
	});

	return tab;
};
//②新建零星采购计划清单，包含上下两部面板：1：展示零星计划物资，2：汇总零星计划
procurementProcessData.card2 = function() {
	var tab = new Ext.Panel( {
		title : '新建零星采购计划',
		id : 'procurementProcessDataGrid12',
		layout : 'border',
		items : [ procurementProcessTree.upTreePanel,
				procurementProcessData.downPanel() ],
		listeners : {
			'activate' : function() {
				//每次选项卡激活时，清除上次缓存中的记录
				procurementProcessData.procurementId=null;
				procurementProcessData.materialCatLogId=null;
				var lingxingselect = Ext.getCmp('lingxingselect');
				lingxingselect.clearValue();
				var grid2 = Ext.getCmp('productionProcessUpId1');
				grid2.getStore().removeAll();
			}
		}
	});
	return tab;
};
//③新建年度采购计划清单。
procurementProcessData.card3 = function() {
	var tab = new Ext.Panel( {
		title : '新建年度采购计划',
		id : 'procurementProcessDataGrid13',
		layout : 'border',
		items : [/*nianduNewPurchaseTree.leftpanel,*/procurementProcessData.card3Panel() ],
		listeners : {
			'activate' : function() {
				//每次选项卡激活时，清除上次缓存中的记录
				procurementProcessData.procurementId=null;
				procurementProcessData.materialCatLogId=null;
				var nianduselect = Ext.getCmp('nianduselect');
				nianduselect.clearValue();
				var grid = Ext.getCmp("card3PanelDataGrid");
				grid.getStore().removeAll();
			}
		}
	});
	return tab;
};
//④年度采购计划详细信息展示(可修改)，当送审状态为‘待审批’即‘1’时，可以对年度采购计划进行编辑，并保存。
procurementProcessData.card4 = function() {
	var tab = new Ext.Panel( {
		title : '年度采购计划详细信息',
		id : 'procurementProcessDataGrid14',
		layout : 'border',
		items : [ purchaseDetailData.card4Panel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//⑤年度采购计划详细信息展示(只读)，当送审状态为非‘待审批’时，只可以展示信息，不可修改。
procurementProcessData.card4ReadOnly = function() {
	var tab = new Ext.Panel( {
		title : '年度采购计划详细信息',
		id : 'procurementProcessDataGrid14ReadOnly',
		layout : 'border',
		items : [ purchaseDetailReadOnlyData.card4ReadOnlyPanel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//⑥零星采购计划详细信息(可修改)，当送审状态为‘待审批’即‘1’时，可以对年度采购计划进行编辑，并保存。
procurementProcessData.card5 = function() {
	var tab = new Ext.Panel( {
		title : '零星采购计划详细信息',
		id : 'procurementProcessDataGrid15',
		layout : 'border',
		items : [ purchaseDetailData.card5Panel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//⑦零星采购计划详细信息展示(只读)，当送审状态为非‘待审批’时，只可以展示信息，不可修改。
procurementProcessData.card5ReadOnly = function() {
	var tab = new Ext.Panel( {
		title : '零星采购计划详细信息',
		id : 'procurementProcessDataGrid15ReadOnly',
		layout : 'border',
		items : [ purchaseDetailReadOnlyData.card5ReadOnlyPanel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//⑤年度采购计划详细信息展示(只读)，当送审状态为非‘已生成’时，只可以展示信息，不可修改。
procurementProcessData.card7ReadOnly = function() {
	var tab = new Ext.Panel( {
		title : '年度采购计划详细信息',
		id : 'procurementProcessDataGrid17ReadOnly',
		layout : 'border',
		items : [ purchaseDetailReadOnlyData.card7ReadOnlyPanel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//需要部门修改年度采购计划。
procurementProcessData.card6 = function() {
	var tab = new Ext.Panel( {
		title : '年度采购计划详细信息',
		id : 'procurementProcessDataGrid16',
		layout : 'border',
		items : [ purchaseDetailData.card6Panel() ],
		listeners : {
			'activate' : function() {
			}
		}
	});
	return tab;
};
//采购计划功能列表布局
procurementProcessData.tabPanel1 = function(type,status) { 
	// 1、右边默认列表布局
	procurementProcessData.rightpanel1 = new Ext.Panel(
			{

				id : 'rightGrid1',
				region : 'center',
				layout : 'card',
				resizable : false,
				activeItem : 0,
				//由以上①到⑦组成。
				items : [ procurementProcessData.card1(type,status),
						procurementProcessData.card2(),
						procurementProcessData.card3(),
						procurementProcessData.card4(),
						procurementProcessData.card5(),
						procurementProcessData.card4ReadOnly(),
						procurementProcessData.card5ReadOnly(),
						procurementProcessData.card6(),
						procurementProcessData.card7ReadOnly()
						]
			});
	var tab = new Ext.Panel( {
		title : '采购计划列表',
		id : 'procurementProcessDataTab1',
		layout : 'fit',
		items : [ procurementProcessData.rightpanel1 ],
		listeners : {
			'activate' : function() {
				//每次激活选项卡时，清除下拉框与grid缓存中的勾选记录
				common.selectObj=null;
				procurementProcessData.procurementId=null;
				
				var nianduselect = Ext.getCmp('nianduselect');
				nianduselect.clearValue();
				var grid = Ext.getCmp("card3PanelDataGrid");
				grid.getStore().removeAll();
				
				var lingxingselect = Ext.getCmp('lingxingselect');
				lingxingselect.clearValue();
				var grid2 = Ext.getCmp('productionProcessUpId1');
				grid2.getStore().removeAll();
				
				//点击页签时，展示采购计划列表页面
				procurementProcessData.rightpanel1.getLayout().setActiveItem(0);
				//加载数据
				Ext.getCmp('productionProcessId1').getStore().baseParams = {start : 0,limit : 20,type:type,status:status};
				Ext.getCmp('productionProcessId1').getStore().load();
				Ext.getCmp('lingxingselect').getStore().load();
				var bar = Ext.getCmp('productionProcessId1').getTopToolbar();
				if(type==null){ 
		   			if(bar != null){
		   					bar.items.items[1].hide();
		   					bar.items.items[2].hide();
							bar.items.items[3].hide();
							bar.items.items[4].hide();
							bar.items.items[9].hide();
							bar.items.items[10].hide();
		   			}
				}else{
					bar.items.items[7].hide();
		   			bar.items.items[8].hide();
				}
			}
		}
	});
	return tab;
};
///采购计划功能结束

///已下是采购比价功能
//①采购比价信息列表选项卡
procurementProcessData.card21 = function() {
	var tab = new Ext.Panel( {
		id : 'procurementProcessDataGrid21',
		layout : 'fit',
		items : [ procurementProcessData.rightPanel() ]
	});
	return tab;
};
//②采购比价详情信息选项卡(可编辑)，当申请状态为‘待审批’或‘编制中’时，可以进行编辑。
procurementProcessData.card22 = function() {
	var tab = new Ext.Panel( {
		title : '比价详情列表',
		id : 'procurementProcessDataGrid22',
		layout : 'fit',
		region : 'center',
		items : [ procurementProcessData.parityDetailPanel()]
	});
	return tab;
};
//③采购比价详情信息选项卡(只读)，当申请状态不为‘待审批’或‘编制中’时，不可以进行编辑。
procurementProcessData.card23 = function() {
	var tab = new Ext.Panel( {
		title : '比价详情列表',
		id : 'procurementProcessDataGrid23',
		layout : 'fit',
		region : 'center',
		items : [ procurementProcessData.parityDetailReadOnlyPanel()]
	});
	return tab;
};

//比价功能布局
procurementProcessData.tabPanel2 = function() { 
	// 2、右边列表布局
	procurementProcessData.rightpanel2 = new Ext.Panel( {
		id : 'rightGrid2',
		region : 'center',
		layout : 'card',
		resizable : false,
		activeItem : 0,
		//由以上①到③选项卡组成。
		items : [ procurementProcessData.card21(),
				procurementProcessData.card22(),
				procurementProcessData.card23()]
	});

	var tab = new Ext.Panel( {
		title : '采购比价列表',
		id : 'procurementProcessDataTab2',
		layout : 'fit',
		items : [ procurementProcessData.rightpanel2 ],
		listeners : {
			'activate' : function() {
				//每次激活选项卡时，清除勾选的记录。
				common.selectObj=null;
				//加载采购比价列表。
				var grid1 = Ext.getCmp('productionProcessId2');
				grid1.getStore().baseParams = {
					start : 0,
					limit : 20,
					type : '1'
				};
				grid1.store.load();
			}
		}
	});
	return tab;
};
///采购比价功能结束


///采购招投标
//招标列表布局
procurementProcessData.tabPanel3 = function() { 
	// 2、右边列表布局
	procurementProcessData.rightpanel3 = new Ext.Panel( {

		id : 'rightGrid3',
		region : 'center',
		width : '300',
		layout : 'fit',// 自适应整个高度
		border : false,
		margin : '0 0 5 0',
		items : [ procurementProcessData.rightPanelTemp() ]
	});
	var tab = new Ext.Panel( {
		title : '采购招投标列表',
		id : 'procurementProcessDataTab3',
		layout : 'border',
		items : [ procurementProcessData.rightpanel3 ],
		listeners : {
			'activate' : function() {
				//每次激活选项卡时，清除勾选的记录。
				common.selectObj=null;
				//加载采购招投标列表。
				var grid0 = Ext.getCmp('productionProcessId3');
				grid0.getStore().baseParams = {
					start : 0,
					limit : 20,
					type : '2'
				};
				grid0.store.load();
			}
		}
	});
	return tab;
};
///采购招标结束


//协议采购功能布局
procurementProcessData.tabPanel4 = function() { 
	var tab = new Ext.Panel({
				title : '协议采购列表',
				id:'agreementPurchaseTabPanel',
//				layout : 'fit',
//				items : [new Ext.Panel({
//							region : 'center'//,
							layout : 'card',
//							resizable : false,
							activeItem : 0,
							// 由以上①到③选项卡组成。
							items : [agreementPurchasePanel.list(),
							agreementPurchasePanel.agreementDetailPanel()
//									procurementProcessData.card22(),
//									procurementProcessData.card23()
									],
//						})],
				listeners : {
					'activate' : function() {
						// 每次激活选项卡时，清除勾选的记录。
						common.selectObj = null;
						// 加载采购比价列表。
						var grid1 = Ext.getCmp('agreementPurchaselGridPanel');
						grid1.getStore().baseParams = {
							start : 0,
							limit : 20,
							type : '4'
						};
						grid1.store.load();
					}
				}
			});
	return tab;
};
//协议采购功能结束


/*//其它采购布局（改其它采购为直接采购）
procurementProcessData.tabPanel5 = function() { 

	var tab = new Ext.Panel( {
		title : '直接采购列表',
//		id : 'procurementProcessDataTab5',
//		layout : 'fit',
//		items : [ new Ext.Panel( {
//		id : 'rightGrid2',
//		region : 'center',
		layout : 'card',
//		resizable : false,
		activeItem : 0,
//		//由以上①到③选项卡组成。
		items : [ otherPurchaselGridPanel.list()//,
//				procurementProcessData.card22(),
//				procurementProcessData.card23()
				],
//	}) ],
		listeners : {
			'activate' : function() {
				//每次激活选项卡时，清除勾选的记录。
				common.selectObj=null;
				//加载采购比价列表。
				var grid1 = Ext.getCmp('otherPurchaselGridPanel');
				grid1.getStore().baseParams = {
					start : 0,
					limit : 20,
					type : '5'
				};
				grid1.store.load();
			}
		}
	});
	return tab;
};*/
///其它采购功能结束




Ext.namespace("procurementProcessData.fileUpload")
/**
 * 
 * @class procurementProcessData.fileUpload
 * @extends Ext.Window
 */
procurementProcessData.fileUpload = Ext.extend(Ext.Window, {
	id : "fileUploadWin",
	layout : 'fit',
	width : 300,
//	autoHeight : true,
	title : '上传文件',
	modal : true,
	initComponent : function() {
		var win = this;
		Ext.applyIf(this, {
			items : new Ext.FormPanel({
				id : 'fileUploadForm',
				// buttonAlign : 'center',
				labelAlign : 'left',
				border:false,
				autoHeight:true,
//				height : 100,
				padding : 5,
				fileUpload : true,
				labelWidth : 70,
				frame : false,
				items : [{
							xtype : "textfield",
							fieldLabel : '上传文件',
							name : 'file',
							inputType : 'file',
							allowBlank : false
						}]
			}),
			buttons : [{
				text : '确定',
				handler : function() {
					var form=Ext.getCmp('fileUploadForm')
					if (!form.form.isValid())
						return;
					var fileName = form.form.findField('file').getValue()
							.toLowerCase().trim();
					if (fileName.lastIndexOf('.') == -1) {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					if (fileName.substr(fileName.lastIndexOf('.')) != '.xls') {
						Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
						return;
					}
					form.form.doAction('submit', {
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : '../ProcurementUploadServlet',
						method : 'POST',
						success : function(form, action) {
							var grid = Ext.getCmp('productionProcessId1');
							grid.store.baseParams = {
								start : 0,
								limit : 20
							};
							grid.store.load();
							win.close();
						},
						failure : function(form, action) {
							win.close();
							Ext.Msg.alert('提示',
									action.result.ImportExcelVo.returnMsg);
						}
					});
				}
			}, {
				text : '取消',
				handler : function() {
					win.close();
				}
			}]
		})

		procurementProcessData.fileUpload.superclass.initComponent.call(this);//必须放在末尾,否则出错
	}

})

