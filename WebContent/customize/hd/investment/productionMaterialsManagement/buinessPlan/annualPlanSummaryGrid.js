
var annualPlanSummary={}

// 新建年度计划页面
annualPlanSummary.createPlanGrid = function() {
	// 有上级表头的复选框
	var sm = new Ext.grid.CheckboxSelectionModel({
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 20,
				mtext : " ",
				mcol : 1,
				mwidth : 20
			});
	// 展示年度需求数据源
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d='
					+ new Date()
					+ "&pieceType="
					+ procurementProcessData.processGridTab1Type, 
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, ['procurementDetailId', 'buinessPlanDetailsId',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may',
						'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dect',
						'materialItemName', 'desingnation', 'materialStandard',
						'productCode', 'deliveryCount', 'materialCount',
						'remark', 'demension', 'procurementId','JX',
						'newProcessType', 'purchaseType', 'materialId',
						'backNumber', 'onNumber', 'storeNumber', 'needNumber',
						'technicCondition', 'optLock', 'demension', 'noCheck',
						'noExpend', 'operable', 'provideNumber',
						'materialCode', 'price', 'note', 'subtotal',
						'contract', 'number_applications',
						'amount_applications', 'subtotal_number',
						'subtotal_amount', 'super_storage', 'redeployment',
						'last_year_Consume', 'half_year_consume',
						'year_inventory', 'gap_number','actualNumber','reserve'])
	});
	 
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						mtextm : " &nbsp;",
						mcolm : 1,
						mwidthm : 40,
						mtext : " ",
						mcol : 1,
						mwidth : 40,
						width : 40,
						header : "序号",
						resizable : false
					}), {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
			}, {
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
			}, {
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
			}, {
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
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "price",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true
						})
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "上年消耗",
				width : 80,
				dataIndex : "last_year_Consume",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "机型",
				width : 80,
				dataIndex : "JX",
				resizable : false,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					if (value != '详细') {
						return value;
					}
					var materialId = record.get("materialId");
					return "<a href='javascript:void(0);' onclick=procurementProcessAction.showDetail('"
							+ materialId
							+ "')>&nbsp;<font color=blue>"
							+ value
							+ "</font></a>";
				}
			}, {
				mtextm : " &nbsp;",
				mcolm : 6,
				mwidthm : 480,
				mtext : "资源情况",
				mcol : 6,
				mwidth : 480,
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
				header : "欠缴计划",
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
				mtextm : " &nbsp;",
				mcolm : 12,
				mwidthm : 600,
				mtextm : " &nbsp;",
				mcolm : 12,
				mwidthm : 600,
				mtext : "交付时间",
				mcol : 12,
				mwidth : 600,
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				editor : new Ext.form.NumberField({
							decimalPrecision : 4,
							allowNegative : false
						}),
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
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "预计消耗",
				mcol : 2,
				mwidth : 200,
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
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
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
				mcolm : 1,
				mwidthm : 80,
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "储备量",
				width : 80,
				dataIndex : "reserve",
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
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
			}, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'amount_applications',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue : 0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
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
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue : 0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
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
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue : 0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							maxValue : 999999999,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "类别",
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

			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				resizable : false,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : true
						})
			}]);
	// 展示计划大纲数据源
	var planStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/procurement_ProcurementRemote.getAnnualGridData?d='
							+ new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementId',
					totalProperty : 'totalProperty'
				}, ['procurementId', 'procurementCode'])
	});
	// 展示计划大纲传参
	planStore.baseParams = {
		isPurchaseDataSelect : '1'
	};
	planStore.load();
	// 年度计划大纲下拉框
	var pCombo = new Ext.form.ComboBox({
				id : 'nianduselect',
				store : planStore,
				width : 180,
				typeAhead : true,
				mode : 'remote',
				triggerAction : 'all',
				selectOnFocus : true,
				valueField : 'procurementId',
				displayField : 'procurementCode',
				appltTo : 'local-states'
			});
	pCombo.on('select', function(combo, record, index) {
			var grid = Ext.getCmp("card3PanelDataGrid");
				grid.getStore().baseParams = {
					start : 0,
					limit : 20,
					procurementId : combo.value,
					procurementType : procurementProcessData.newProcessType,
					type : '1',
					materialBuyType : '1'
				};
				grid.getStore().load();
			}); 

	var tbar = ['-', {
				xtype : 'panel',
				width : 180,
				items : [pCombo]
			}, '-', {
				text : '提交',
				iconCls : 'Submit',
				disabled : privilegeValidate.updateDisable,
				handler : function() {
				 
					var allCounts = store.getCount();
					var str = "";
					if (allCounts > 0) {
						for (var i = 0; i < allCounts; i++) {
							if ((i + 1) == allCounts) {
								store.getAt(i).data.newProcessType = procurementProcessData.newProcessType;
								str += Ext.encode(store.getAt(i).data);
							} else {
								str += Ext.encode(store.getAt(i).data) + ',';
							}
						}
					}
					// 异步提交数据
					Ext.Ajax.request({
						url : '../JSON/procurementDetail_ProcurementDetailRemote.updateYearGridData?d='
								+ new Date(),
						method : 'POST',
						params : {
							"updateRecords" : '[' + str + ']'
						},
						callback : function(opts, success, response) {
							// 接到后台返回的值
							var jresult = Ext.util.JSON
									.decode(response.responseText);
							if (jresult.success == true) {
								// 保存成功，重新加载数据。
								var grid3 = Ext.getCmp("card3PanelDataGrid");
								grid3.getStore().removeAll();
								var grid1 = Ext.getCmp("productionProcessId1");
								grid1.getStore().baseParams = {
									start : 0,
									limit : 20,
									type : "1"

								};
								grid1.store.load();
								var grid2 = Ext.getCmp("nianduselect");
								grid2.getStore().load();
								procurementProcessData.isNianDuCommit = false;
								procurementProcessData.procurementId = '';
								Ext.Msg.alert('提示', '保存成功！');

								procurementProcessData.rightpanel1.getLayout()
										.setActiveItem(0);
							} else {
								Ext.Msg.alert('提示', '保存数据失败：' + jresult.msg
												+ '！');
							}

						}
					});
				}
			}, '-', {
				text : '取消',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.isNianDuCommit = false;
					procurementProcessData.procurementId = '';
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			}
 
			];


	var grid = new Ext.grid.EditorGridPanel({
				region : "center",
				store : store,
				tbar : tbar,
				bbar : new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			}),
				cm : cm,
				stripeRows : true,
				sm : sm,
				id : "card3PanelDataGrid",
			 
				clicksToEdit : 1,
				view : new MyGridView(viewConfig)
			});

	sm.on('rowselect', function(sm, rowIndex, record) {
				newNianDuPanel.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				newNianDuPanel.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					newNianDuPanel.selectRow = null;
				}
			});

	 grid.on('afteredit', afterEdit, grid); 
	return grid;

}