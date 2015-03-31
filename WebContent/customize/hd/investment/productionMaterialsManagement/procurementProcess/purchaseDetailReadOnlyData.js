//清单详情查看,此页面只供采购计划审批状态为非‘待审批’状态下的采购计划明细信息查看
var purchaseDetailReadOnlyData = {
};
//状态:审批中.年度采购计划清单详细信息展示
purchaseDetailReadOnlyData.card4ReadOnlyPanel = function() {
//	var sm = new Ext.grid.CheckboxSelectionModel();
	// 年度采购计划清单详细信息Store
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getPurchaseForAnnualPlan?d='
					+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, ['procurementDetailId', 'buinessPlanDetailsId','department',
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
						'redeployment', 'last_year_consume','planType',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber','price','note','reserve'])
	});

	var cm = new Ext.grid.ColumnModel([/*sm,*/ new Ext.grid.RowNumberer({
						width : 40,
						header : "序号",
						resizable : false
					}), {
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName" 
			}, {
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			}, {
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				resizable : false,
				sortable : true
			}, {
				header : "上年消耗",
				width : 80,
				dataIndex : "last_year_consume",
				resizable : false,
				sortable : true
			}, {
				header : "机型",
				width : 80,
				dataIndex : "productCode",
				resizable : false,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
//					if (value != '详细') {
//						return value;
//					}
					return "小计";
//					var materialId = record.get("materialId");
//					var procurementDetailId  = record.get("procurementDetailId");
//					return "<a href='javascript:void(0);' onclick=procurementProcessAction.showDetail('"
//							+ materialId
//							+ "', '"+procurementDetailId+"')>&nbsp;<font color=blue>小计</font></a>";
				}
			}, {
				header : "小计",
				width : 80,
				resizable : false,
				dataIndex : "subtotal",
				sortable : true
			}, {
				header : "库存",
				width : 80,
				dataIndex : "storeNumber",
				resizable : false,
				sortable : true
			}, {
				header : "待检",
				width : 80,
				resizable : false,
				dataIndex : "noCheck",
				sortable : true
			}, {
				header : "合同",
				width : 80,
				resizable : false,
				dataIndex : "contract",
				sortable : true
			}, {
				header : "欠交合同",
				width : 80,
				dataIndex : "onNumber",
				resizable : false,
				sortable : true
			}, {
				header : "不合用",
				width : 80,
				resizable : false,
				dataIndex : "operable",
				sortable : true
			}, {
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "2月",
				width : 50,
				dataIndex : "feb",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "3月",
				width : 50,
				dataIndex : "mar",
				resizable : false,
				sortable : true
			}, {
				header : "4月",
				width : 50,
				dataIndex : "apr",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "5月",
				width : 50,
				dataIndex : "may",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "6月",
				width : 50,
				dataIndex : "june",
				resizable : false,
				sortable : true
			}, {
				header : "7月",
				width : 50,
				dataIndex : "july",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "8月",
				width : 50,
				dataIndex : "aug",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "9月",
				width : 50,
				dataIndex : "sept",
				sortable : true
			}, {
				header : "10月",
				width : 50,
				dataIndex : "oct",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "11月",
				width : 50,
				dataIndex : "nov",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "12月",
				width : 50,
				dataIndex : "dect",
				resizable : false,
				sortable : true
			}, {
				header : '<font color=red>*</font>下半年消耗',
				dataIndex : 'half_year_consume',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>年末库存',
				dataIndex : 'year_inventory',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
				sortable : true
			}, {
				header : "需求量",
				width : 80,
				dataIndex : "materialCounts",
				sortable : true
			}, {
				header : "储备量",
				width : 80,
				dataIndex : "reserve",
				sortable : true
			}, {
				header : '<font color=red>*</font>数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>数量',
				dataIndex : 'subtotal_number',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '<font color=red>*</font>外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true 
			}, {
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='black'>" + value + "</font>";
					return value;
				},
				sortable : true

			},{
				header : "计划类别",
				width : 80,
				dataIndex : "planType",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					if(value==1){
						return "预拨计划";
					}else if(value==2){
						return "调整计划";
					}else if(value==3){
						return "临批计划";
					}else {
						return value;
					}
				},
				sortable : true

			}, {
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				resizable : false,
				sortable : true
			}]);

	var tbar = [
			'-',
			{
				text : '返回',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			},
			'-'];

	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
	    var continentGroupRow = [
		        {header: '',colspan : 34,align: 'center'},
		        {header:'多余',colspan:4,align: 'center'},
		        {header:'',colspan:4,align: 'center'}];
	var cityGroupRow=[
	            {header:'',colspan:9,align: 'center'},
	            {header:'资源情况',colspan:6,align: 'center'},
	            {header:'交付时间',colspan:12,align: 'center'},
	            {header:'预计消耗',colspan:2,align: 'center'},
	            {header:'',colspan:3,align: 'center'},
	            {header:'申请',colspan:2,align: 'center'},
	            {header:'小计',colspan:2,align: 'center'},
	            {header:'其中',colspan:2,align: 'center'},
	            {header:'',colspan:4,align: 'center'}
	            
	    ]
    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [continentGroupRow, cityGroupRow]
    });
	var grid = new Ext.grid.GridPanel( {
		region : "center",
		store : store,
		tbar : tbar,
		bbar : bb,
//		sm : sm,
		cm : cm,
		plugins: group,
		id : "card4ReadOnlyPanelDataGrid",
//		clicksToEdit : 1,
//		view : new MyGridView(viewConfig),
		columnLines : true,
	    stripeRows : true,
	    viewConfig : {
			enableRowBody : true
	    },
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});
	return grid;

}

//状态为已生成时，年度采购计划清单详细信息展示
purchaseDetailReadOnlyData.card7ReadOnlyPanel = function() {
	var sm = new Ext.grid.CheckboxSelectionModel({
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 20,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 20
			});
	// 年度采购计划清单详细信息Store
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getPurchaseGridData?d='
					+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, ['procurementDetailId', 'buinessPlanDetailsId',
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
						'redeployment', 'last_year_consume',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber', 'price', 'note', 'reserve'])
	});
	 
	// 供应商下拉框数据源
	var vendorStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/vendor_VendorRemote.getGridDataByConditon?d='
							+ new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, ['vendorID', 'vendorName', 'vendorCode', 'accountID',
						'address', 'bank', 'businessScope',
						'strInitialEvaluationDate', 'vendorLevel', 'phone',
						'reviewResult', 'strReviewDate', 'taxID', 'property',
						'reposal', 'productVentor'])
	});
	var cm = new Ext.grid.ColumnModel([/*sm,*/ new Ext.grid.RowNumberer({
//						mtextm : " &nbsp;",
//						mcolm : 1,
//						mwidthm : 40,
//						mtext : " ",
//						mcol : 1,
//						mwidth : 40,
						width : 40,
						header : "序号",
						resizable : false
					}), {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				resizable : false,
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "上年消耗",
				width : 80,
				dataIndex : "last_year_consume",
				resizable : false,
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "机型",
				width : 80,
				dataIndex : "productCode",
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
//					return "小计";
//					if (value != '详细') {
//						return value;
//					}
					var materialId = record.get("materialId");
//					var procurementDetailId  = record.get("procurementDetailId");
                    var procurementId=record.get('procurementId');
					return "<a href='javascript:void(0);' onclick=procurementProcessAction.showDetail('"+ materialId+ "','"+procurementId+"')>&nbsp;<font color=blue>小计</font></a>";
				}
			}, {
				header : "供应商",
				width : 80,
				dataIndex : "vendorName", 
				sortable : true
			}, {
				header : "小计",
				width : 80,
				resizable : false,
				dataIndex : "subtotal",
				sortable : true
			}, {
				header : "库存",
				width : 80,
				dataIndex : "storeNumber",
				resizable : false,
				sortable : true
			}, {
				header : "待检",
				width : 80,
				resizable : false,
				dataIndex : "noCheck",
				sortable : true
			}, {
				header : "合同",
				width : 80,
				resizable : false,
				dataIndex : "contract",
				sortable : true
			}, {
				header : "欠交合同",
				width : 80,
				dataIndex : "onNumber",
				resizable : false,
				sortable : true
			}, {
				header : "不合用",
				width : 80,
				resizable : false,
				dataIndex : "operable",
				sortable : true
			}, {
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "2月",
				width : 50,
				dataIndex : "feb",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "3月",
				width : 50,
				dataIndex : "mar",
				resizable : false,
				sortable : true
			}, {
				header : "4月",
				width : 50,
				dataIndex : "apr",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "5月",
				width : 50,
				dataIndex : "may",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "6月",
				width : 50,
				dataIndex : "june",
				resizable : false,
				sortable : true
			}, {
				header : "7月",
				width : 50,
				dataIndex : "july",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "8月",
				width : 50,
				dataIndex : "aug",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "9月",
				width : 50,
				dataIndex : "sept",
				sortable : true
			}, {
				header : "10月",
				width : 50,
				dataIndex : "oct",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "11月",
				width : 50,
				dataIndex : "nov",
				resizable : false,
				/*editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),*/
				renderer : function(value, cellmeta, record, rowIndex) {
					if (typeof(value) == 'undefined') {
						return;
					}
					value = "&nbsp;<font color='red'>" + value + "</font>";
					return value;
				},
				sortable : true
			}, {
				header : "12月",
				width : 50,
				dataIndex : "dect",
				resizable : false,
				sortable : true
			}, {
				header : '下半年消耗',
				dataIndex : 'half_year_consume',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '年末库存',
				dataIndex : 'year_inventory',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
				sortable : true
			}, {
				header : "需求量",
				width : 80,
				dataIndex : "materialCounts",
				sortable : true
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "储备量",
				width : 80,
				dataIndex : "reserve",
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})*/
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 2,
//				mwidthm : 200,
//				mtext : "申请",
//				mcol : 2,
//				mwidth : 200,
				header : '数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
			}, {
				header : '金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})*/
			}, {
//				mtextm : " 多余 ",
//				mcolm : 4,
//				mwidthm : 400,
//				mtext : "小计",
//				mcol : 2,
//				mwidth : 200,
				header : '数量',
				dataIndex : 'subtotal_number',
				align : "center",
				width : 100,
				sortable : true
				// ,
			// editor : new Ext.form.NumberField({
			// allowBlank : true
			// })
		}	, {
				header : '金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})*/
			}, {
//				mtext : "其中",
//				mcol : 2,
//				mwidth : 200,
				header : '超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})*/
			}, {
				header : '外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})*/
			}, {
//				mtextm : "  ",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true 
			}, {
//				mtextm : "  ",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true
			}, {
//				mtextm : "  ",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName",
				resizable : false,
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				sortable : true
			}, {
//				mtextm : "  ",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
//				mtextm : "  ",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true
			}]);
	var tbar = [
			'-',
			{
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			},
			'-'];

	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	}); 
	    var continentGroupRow = [
		        {header: '',colspan : 35,align: 'center'},
		        {header:'多余',colspan:4,align: 'center'},
		        {header:'',colspan:3,align: 'center'}];
	var cityGroupRow=[
	            {header:'',colspan:10,align: 'center'},
	            {header:'资源情况',colspan:6,align: 'center'},
	            {header:'交付时间',colspan:12,align: 'center'},
	            {header:'预计消耗',colspan:2,align: 'center'},
	            {header:'',colspan:3,align: 'center'},
	            {header:'申请',colspan:2,align: 'center'},
	            {header:'小计',colspan:2,align: 'center'},
	            {header:'其中',colspan:2,align: 'center'},
	            {header:'',colspan:5,align: 'center'}
	            
	    ]
    var group = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [ cityGroupRow]
    });
	var grid = new Ext.grid.EditorGridPanel( {
		region : "center",
		store : store,
		tbar : tbar,
		bbar : bb,
		cm : cm,
		id : "card7ReadOnlyPanelDataGrid",
		clicksToEdit : 1,
		plugins: group,
//		view : new MyGridView(viewConfig),
		columnLines : true,
	    stripeRows : true,
	    viewConfig : {
			enableRowBody : true
	    },
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});
	return grid;

}

purchaseDetailReadOnlyData.card5ReadOnlyPanel = function() {
	//零星采购计划清单Store
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/procurementDetail_ProcurementDetailRemote.getPurchaseGridData?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, [ 'procurementDetailId', 'buinessPlanDetailsId','department',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'remark', 'demension',
						'procurementId', 'newProcessType', 'desingnation',
						'purchaseType', 'materialId', 'backNumber',
						'onNumber', 'storeNumber', 'needNumber',
						'purchaseTypeName', 'actualNumber', 'requestCode',
						'optLock', 'purchaseId', 'productCode',
						'technicCondition','noCheck','noExpend','operable',
						'note','price','subtotal','contract','number_applications',
						'amount_applications','subtotal_number','subtotal_amount',
						'super_storage','redeployment','last_year_Consume'])
			});
	var cm = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer( {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 40,
				mtext : " ",
				mcol : 1,
				mwidth : 40,
				width : 40,
				header : "序号"
			}),
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true
			},
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				sortable : true
			}, {				
			    mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header:'需求单位',
				width : 80,
				dataIndex:'department',
				sortable : true
			},{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : '上年消耗',
				dataIndex : 'last_year_Consume', 
				width : 80,
				sortable : true 
		   },
			{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : "&nbsp",
				mcol : 1,
				mwidth : 80,
				header : "供应商",
				width : 80,
				dataIndex : "vendorName" ,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 420,
				mtext : "资源情况",
				mcol : 6,
				mwidth :420,
				header : "小计",
				width : 70,
				dataIndex : "subtotal", 
				sortable : true
			}, {
				header : "库存",
				width : 70,
				dataIndex : "storeNumber", 
				sortable : true
			},  {
				header : "待检",
				width : 70,
				resizable :  false,
				dataIndex : "noCheck", 
				sortable : true
			}, {
				header : "合同",
				width : 70,
				dataIndex : "contract", 
				sortable : true
			}, {
				header : "欠交合同",
				width : 70,
				dataIndex : "onNumber", 
				sortable : true
			} , {
				header : "不合用",
				width : 70,
				resizable :  false,
				dataIndex : "operable", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求量",
				width : 80,
				dataIndex : "materialCounts",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
			    mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
				header : '<font color=red>*</font>数量',
				dataIndex : 'number_applications',
				align : "center",
				width : 100,
				sortable : true
//			,
//			editor : new Ext.form.NumberField({
//						allowBlank : true
//					})
		}, {
			header : '<font color=red>*</font>金额',
			dataIndex : 'amount_applications',
			align : "center",
			width : 100,
			sortable : true 
		} , {
		    mtextm : " 多余 ",
			mcolm : 4,
		    mwidthm : 400,
			mtext : "小计",
			mcol : 2,
			mwidth : 200,
			header : '<font color=red>*</font>数量',
			dataIndex : 'subtotal_number',
			align : "center",
			width : 100,
			sortable : true
//			,
//			editor : new Ext.form.NumberField({
//						allowBlank : true
//					})
		}, {
			header : '<font color=red>*</font>金额',
			dataIndex : 'subtotal_amount',
			align : "center",
			width : 100,
			sortable : true
		}, {
			mtext : "其中",
			mcol : 2,
			mwidth : 200,
			header : '<font color=red>*</font>超储',
			dataIndex : 'super_storage',
			align : "center",
			width : 100,
			sortable : true 
		}, {
			header : '<font color=red>*</font>外调',
			dataIndex : 'redeployment',
			align : "center",
			width : 100,
			sortable : true 
		} 
		,  {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true

			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "实际采购量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName", 
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseType",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "productCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				hidden : true,
				width : 80,
				align : "left",
				dataIndex : "purchaseId",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "需求编号",
				width : 80,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true,
				editor : new Ext.form.TextField({
				})
			} ]);
	var tbar = [
			'-',
			{
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			},
			'-' ];

	var grid = new Ext.grid.GridPanel( {
		region : "center",
		store : store,
		tbar : tbar,
		cm : cm,
		id : "card5ReadOnlyPanelDataGrid",
		view : new MyGridView(viewConfig),
		columnLines : true,
	    stripeRows : true,
	    viewConfig : {
			enableRowBody : true
	    },
		loadMask : {
			msg : '正在加载数据,请稍后...'
		}
	});

	return grid;

}

function returnRedValue(value){
	if(typeof(value)=='undefined'){return;}
	value = "&nbsp;<font color='red'>" + value+ "</font>";
	return value;
}