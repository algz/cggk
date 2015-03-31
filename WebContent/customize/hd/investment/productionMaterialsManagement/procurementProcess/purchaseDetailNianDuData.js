// 年度采购计划清单详细信息展示
purchaseDetailData.card4Panel = function() {
	var sm = new Ext.grid.CheckboxSelectionModel({
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 20,
				mtext : " ",
				mcol : 1,
				mwidth : 20
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
				}, ['procurementDetailId', 'buinessPlanDetailsId','department',
						'materialQuotaId', 'materialTypeName', 'vendorId',
						'vendorName', 'materialCounts', 'jan', 'feb', 'mar',
						'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct',
						'nov', 'dect', 'materialItemName', 'desingnation',
						'materialStandard', 'productName', 'deliveryCount',
						'materialCount', 'remark', 'demension','JX',
						'procurementId', 'newProcessType', 'desingnation',
						'purchaseType', 'materialId', 'backNumber', 'onNumber',
						'storeNumber', 'needNumber', 'purchaseTypeName',
						'requestCode', 'optLock', 'purchaseId', 'productCode',
						'technicCondition', 'noCheck', 'noExpend', 'operable',
						'productCode', 'provideNumber', 'subtotal', 'contract',
						'number_applications', 'amount_applications',
						'subtotal_number', 'subtotal_amount', 'super_storage',
						'redeployment', 'last_year_consume','status',
						'half_year_consume', 'year_inventory', 'gap_number',
						'actualNumber', 'price', 'note', 'reserve','JX','QSJH','ZZJH','CLDM'])
	});
	// 采购方式数据源
	var procurementTypeStore = new Ext.data.SimpleStore({
				fields : ['id', 'flag'],
				data : [['比价', '比价'], ['招标', '招标'], ['直接采购', '直接采购'],
						['协议采购', '协议采购'], ['其它采购', '其它采购']]
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
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
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
				header : "状态",
				width : 80,
				dataIndex : "status",
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					
					if(value=="0"){
						return "<font color=red>未生成</font>";
					}else if(value == "1"){
						return "<font color=green>已生成</font>";
					}else{
						return "<font color=green>未提交</font>";
					}
				}
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
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
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
			}, /*{				
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
			},*/{
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 70,
				mtext : " ",
				mcol : 1,
				mwidth : 70,
				header : "上年消耗",
				width : 70,
				dataIndex : "last_year_consume",
				resizable : false,
				sortable : true
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 55,
				mtext : " ",
				mcol : 1,
				mwidth : 55,
				header : "机型",
				width : 55,
				dataIndex : "productCode",
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					var materialId = record.get("materialId");
//					var procurementDetailId  = record.get("procurementDetailId");
                    var procurementId=record.get('procurementId');
					return "<a href='javascript:void(0);' onclick=procurementProcessAction.showDetail('"+ materialId+ "','"+procurementId+"')>&nbsp;<font color=blue>小计</font></a>";
				}
			}, {
				mtextm : " &nbsp;",
				mcolm : 1,
				mwidthm : 130,
				mtext : "&nbsp",
				mcol : 1,
				mwidth : 130,
				header : "供应商",
				width : 130,
				dataIndex : "vendorName",
				editor : new Ext.form.ComboBox({
							store : vendorStore,
							id : 'vendorName1',
							triggerAction : 'all',
							valueField : 'vendorName',
							displayField : 'vendorName',
							forceSelection : true,
							resizable:true,
							mode : 'local',
							// 点选下拉框时，对vendorId进行设值
							listeners : {
								select: function(record) {
									index = vendorStore.find("vendorName", this
													.getValue());
									var r = vendorStore.getAt(index);
//									this.setValue(r.get("vendorName"));
									var record = grid.getStore()
											.getAt(purchaseDetailData.rowIndex);
									record.data.vendorId = r.get("vendorID");
								},
								expand: function(combo) {
									var records = purchaseDetailData.selectObj;
									if (records == null || records.length == 0) {
										Ext.Msg.alert('提示', '请选择你要设置的数据！');
										return;
									}
									for (var i = 0; i < records.length; i++) {
										var purchaseType = records[i]
												.get('purchaseTypeName');
										if (purchaseType==""||purchaseType != "直接采购") {
											combo.clearValue();
											combo.getStore().removeAll();
											Ext.Msg.alert('提示',"采购方式为“直接采购”时，才能在此环节选择供应商!");
										}
									}
								}
							}
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				sortable : true
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
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
			}, {
				mtextm : " &nbsp;",
				mcolm : 2,
				mwidthm : 200,
				mtext : "申请",
				mcol : 2,
				mwidth : 200,
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
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
			}, {
				mtextm : " 多余 ",
				mcolm : 4,
				mwidthm : 400,
				mtext : "小计",
				mcol : 2,
				mwidth : 200,
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
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
			}, {
				mtext : "其中",
				mcol : 2,
				mwidth : 200,
				header : '超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true 
			}, {
				header : '外调',
				dataIndex : 'redeployment',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : false,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  
                            maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialTypeName",
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "<font color=red>*</font>采购方式",
				width : 80,
				align : "left",
				dataIndex : "purchaseTypeName",
				resizable : false,
				editor : new Ext.form.ComboBox({
							id : 'nianduprocurementTypeName',
							store : procurementTypeStore,// 数据源
							displayField : 'flag',// 显示下拉列表数据值
							valueField : 'id',// 提交时数据值
							typeAhead : true,
							triggerAction : 'all',
							allowBlank : false,
							forceSelection : true,
							mode : 'local'
						}),
				renderer : function(value, cellmeta, record, rowIndex) {
					return returnRedValue(value);
				},
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 100,
				header : "需求编号",
				width : 100,
				align : "left",
				dataIndex : "requestCode",
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "note",
				sortable : true
			}]);
	var batchCombo = new Ext.form.ComboBox({// 批量设置 采购方式comboBox
		id : 'batchProcurementType2',
		store : procurementTypeStore,// 数据源
		displayField : 'flag',// 显示下拉列表数据值
		valueField : 'id',// 提交时数据值
		typeAhead : true,
		triggerAction : 'all',
		width : 100,
		forceSelection : true,
		mode : 'local'
	});
	// batchCombo.on('select', function(combo, record, index) {// 添加批量设置
	// // 采购方式select事件
	// procurementProcessData.batchType = batchCombo.value;
	// });
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			}, '-', {
				text : '提交',
				iconCls : 'Submit',
				disabled : privilegeValidate.updateDisable,
				handler : function() {
					nianDuSubmitFun(store);

				}
			}, '-',{
				text : '生成数据',
				iconCls : 'CreateData',
				disabled : privilegeValidate.newCpDisable,
				handler : function(){
					var grid = Ext.getCmp('card4PanelDataGrid');
					var id = "";
					var rows = grid.getSelectionModel().getSelections();
					if (rows.length == 0) {
						Ext.MessageBox.alert('提示', '请选择一条记录!');
						return;
					}
					for (i = 0; i < rows.length; i++) {
						var typeName = rows[i].get('purchaseTypeName');
						var status = rows[i].get('status');
						if (typeName == '') {
							Ext.MessageBox.alert('提示', '请全部选择提交了采购方式的记录!');
							return;
						}
						if (status != 0||status=="") {
							Ext.MessageBox.alert('提示', '请全部选择未生成状态的记录!');
							return;
						}
						id = id + rows[i].get('procurementDetailId') + ",";
					}
					var purchaseId = grid.getStore().baseParams.purchaseId;
					var purchaseType = grid.getStore().baseParams.purchaseType;
					if (confirm('生成数据吗？')) {
						// 向后台提交数据
						Ext.Ajax.request({
							url : '../JSON/procurementProcessRemote.generateParityAndContract?d='
									+ new Date(),
							method : 'POST',
							params : {
								updateRecords : id,
								purchaseId : purchaseId,
								type : purchaseType
							},
							success : function(response, opts) {
								// ①刷新采购计划列表页面
								var obj = Ext.decode(response.responseText);
								if (obj.success) {
									Ext.Msg.alert('提示', '数据生成成功！');
								} else {
									Ext.Msg.alert('提示', obj.msg);
								}
								var grid0 = Ext.getCmp('card4PanelDataGrid');
								grid0.getStore().baseParams = {
									start : 0,
									limit : 20,
									purchaseId : purchaseId,
									purchaseType : purchaseType
								};
								grid0.store.load();
							},
							failure : function() {
								Ext.Msg.alert('错误', '数据生成失败！');
							}
						});
					}
				}
			},'-', {
				xtype : 'panel',
				width : 100,
				items : [batchCombo]
			}, {
				text : '批量设置',
				iconCls : 'BatchSet',
				handler : function(grid) {
					if (batchCombo.value == null || batchCombo.value == ''
							|| typeof(batchCombo.value) == 'undefined') {
						Ext.Msg.alert('提示', '请选择采购方式类型');
						return;
					}

					var records = Ext.getCmp("card4PanelDataGrid")
							.getSelectionModel().getSelections();
					if (records == null || records.length == 0) {
						Ext.Msg.alert('提示', '请选择你要设置的数据！');
						return;
					}
					for (var i = 0; i < records.length; i++) {
						records[i].set('purchaseType', batchCombo.value);
						records[i].set('purchaseTypeName', batchCombo.value);
						if (batchCombo.value == '招标'
								|| batchCombo.value == '比价') {
							records[i].set('vendorName', '');
							records[i].set('vendorId', '');
						}
					}
				}
			}];

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			});
	var grid = new Ext.grid.EditorGridPanel({
				region : "center",
				store : store,
				tbar : tbar,
				bbar : bb,
				cm : cm,
				sm : sm,
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				id : "card4PanelDataGrid",
				listeners : {// 点击供应商Cell时，进行加载供应商下拉框信息
					'cellclick' : function(grid, rowIndex, columnIndex, e) {
						if (columnIndex == 10) { 
							var record = grid.getStore().getAt(rowIndex); // 根据物料动态的去
							// 取下拉列表
							var materialId = record.get("materialId");
							vendorStore.baseParams = {
								materialId : materialId,
								start : 0,
								limit : 0
							};
							vendorStore.load();
							purchaseDetailData.rowIndex = rowIndex;
						}
					},
					'afteredit' : function(e) {// 对添加汇总后，采购方式由”直接采购“状态改变时，对供应商信息进行处理。
				if (e.column == 42) {
					if (e.originalValue == '直接采购' && e.value != '直接采购') {
						e.record.set('vendorName', '');
						e.record.set('vendorId', '');
					}
				}
			}
				},
				clicksToEdit : 1,
				view : new MyGridView(viewConfig),
				loadMask : {
					msg : '正在加载数据,请稍后...'
				}
			});

	sm.on('rowselect', function(sm, rowIndex, record) {
				purchaseDetailData.selectRow = record;
			});
	sm.on('selectionchange', function(sm, t) {
				purchaseDetailData.selectObj = sm.getSelections();
				if (!sm.getSelections() || sm.getSelections().length < 1) {
					purchaseDetailData.selectRow = null;
				}
			});
	grid.on('afteredit', afterEdit1, grid);// 对grid中的数据修改后处理季度调整值验证
	return grid;

}
// 季度调整值验证
function afterEdit1(obj) {
	var record = obj.record;// 被修改的行
	var field = obj.field;// 被修改的列
	if (obj.field == 'jan' || obj.field == 'feb' || obj.field == 'apr'
			|| obj.field == 'may' || obj.field == 'july' || obj.field == 'aug'
			|| obj.field == 'oct' || obj.field == 'nov') {
		var updateValue = obj.value;// 修改过的值
		var originalValue = obj.originalValue;// 原始值
		var thirdValue = record.get(getValueByDaraName(field));
		var value = parseFloat(thirdValue) - parseFloat(updateValue)
				+ parseFloat(originalValue);
		if (parseFloat(value) > 0)
			record.set(getValueByDaraName(field), value);
		else {
			Ext.Msg.alert("提示", "输入的值太大，请重新输入！");
			record.set(field, originalValue);
		}
	}
//	else if (obj.field == 'needNumber' || obj.field == 'reserve')
//	{
//		var updateValue = record.get("reserve");// 储备量
//		if (updateValue == null || updateValue == "")
//			updateValue = 0;
//		var originalValue = record.get("needNumber");// 需用量
//		if (originalValue == null || originalValue == "")
//			originalValue = 0;
//		var thirdValue = record.get("half_year_consume");
//		if (thirdValue == null || thirdValue == "")
//			thirdValue = 0; 
//		var fourValue = record.get("subtotal");
//		if (fourValue == null || fourValue == "")
//			fourValue = 0;
//		var value =Subtr((accAdd(parseFloat(updateValue),parseFloat(originalValue))),(Subtr(parseFloat(fourValue),parseFloat(thirdValue)))); 
//		if (parseFloat(value) > 0)
//		{
//			record.set("number_applications", value);
//			record.set("subtotal_number","");
//		}
//		else if (parseFloat(value) < 0)
//		{
//			record.set("number_applications", "");
//			record.set("subtotal_number", -value);
//		}
//		
//		record.set("redeployment","");
//		record.set("super_storage","");
//			record.commit();
//	}
	else if (obj.field == 'redeployment'){
		var subtotal_number =  record.get("subtotal_number");
		var updateValue = obj.value;
		if(subtotal_number=="" || subtotal_number==null){
			Ext.Msg.alert("提示", "多余中的小计 数量 为空，不能设置外调数量！");
			record.set("redeployment","");
			record.commit();
			return;
		}
		if(parseFloat(updateValue)>parseFloat(subtotal_number)){
			Ext.Msg.alert("提示", "外调数量不能大于多余中的小计 数量 ！");
			record.set("redeployment","");
			record.commit();
			return;
		}
		record.set("super_storage",Subtr(parseFloat(subtotal_number),parseFloat(updateValue)));
		record.commit();
	}
}
// 按照季度获取每月值，当月值自动归属到当前季度中
function getValueByDaraName(name) {
	if (name == 'jan' || name == 'feb')
		return 'mar';
	else if (name == 'apr' || name == 'may')
		return 'june';
	else if (name == 'july' || name == 'aug')
		return 'sept';
	else if (name == 'oct' || name == 'nov')
		return 'dect';
}
// 返回红色结果值
function returnRedValue(value) {
	if (typeof(value) == 'undefined') {
		return;
	}
	value = "&nbsp;<font color='red'>" + value + "</font>";
	return value;
}
// submit提交方法
function nianDuSubmitFun(store) {
	var allCounts = store.getCount();
	var str = "";
	// 遍历store中的每一条记录
	if (allCounts > 0) {
		for (var i = 0; i < allCounts; i++) {

			var grid2 = Ext.getCmp("card4PanelDataGrid");

			grid2.store.getAt(i).data.purchaseType = grid2.store.getAt(i).data.purchaseTypeName;
			// 对采购方式进行验证
			if (store.getAt(i).data.purchaseType == null
					|| store.getAt(i).data.purchaseType == '') {
				Ext.Msg.alert('提示', '采购方式都不能为空！');
				return;
			}
//				if ((grid2.store.getAt(i).data.purchaseType == '直接采购')
//							&& (grid2.store.getAt(i).data.vendorName == null || grid2.store.getAt(i).data.vendorName == '')) {
//						Ext.Msg.alert('提示', '采购方式为直接采购时必须选择供应商！');
//						return;
//					}
			// 拼接待保存的store内容字符串
			if ((i + 1) == allCounts) {
				store.getAt(i).data.newProcessType = procurementProcessData.newProcessType;
				str += Ext.encode(store.getAt(i).data);
			} else {
				str += Ext.encode(store.getAt(i).data) + ',';
			}
		}
	}
	// 异步提交，直接保存修改后记录
	Ext.Ajax.request({
		url : '../JSON/procurementDetail_ProcurementDetailRemote.updateViewYearGridData?d='
				+ new Date(),
		method : 'POST',
		params : {
			"updateRecords" : '[' + str + ']'
		},

		success : function() {
			procurementProcessData.isNianDuCommit = false;
			procurementProcessData.procurementId = '';
			Ext.Msg.alert('提示', '保存成功！');
			store.reload();
		},
		failure : function() {
			Ext.Msg.alert('错误', '保存失败！');
		}
	});
}
