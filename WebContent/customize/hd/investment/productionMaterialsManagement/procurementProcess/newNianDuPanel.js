// 年度采购计划新建panel
var newNianDuPanel = {
	selectRow : null,
	selectObj : null 
};
Ext.Ajax.timeout=90000;
// 新建年度计划页面
procurementProcessData.card3Panel = function() {
	// 有上级表头的复选框
	var sm = new Ext.grid.CheckboxSelectionModel({
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 20,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 20
			});
	// 展示年度需求数据源
	var store = new Ext.data.Store({
				listeners:{
			update : function(store, rec, operation){
				if(operation=='edit'){
				    Ext.Ajax.request({
									url : '../JSON/procurementDetail_ProcurementDetailRemote.realtimeSaveAnnualPlan',
									method : 'post',
									waitMsg : '数据加载中，请稍后....',
									params : {
										procurementDetailId:rec.get('procurementDetailId'),//主键
										reserve:rec.get('reserve')==""?0:rec.get('reserve'),//储备量
										amount_applications:rec.get('amount_applications'),//申请金额
										subtotal_amount:rec.get('subtotal_amount'),//多余小计金额
										note:rec.get('note'),//备注
										super_storage:rec.get('super_storage')==""?0:rec.get('super_storage'),//超储
										redeployment:rec.get('redeployment')==""?0:rec.get('redeployment'),//外调
										actualNumber : rec.get('actualNumber')==""?0:rec.get('actualNumber')//建议采购量
									},
									success : function(response, opts) {
										var obj = Ext.decode(response.responseText);
										if (obj.success == true) {
											// 你后台返回success 为 false时执行的代码

										} else {
											Ext.Msg.alert("提示",obj.msg);
											// 你后台返回success 为 false时执行的代码
										}
									},
									failure : function(response, opts) {
										//console.log('server-side failure with status code ' + response.status);
									}
								});
				}
				
			}
		},
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
						'amount_applications', 'subtotal_number','procurementId',
						'subtotal_amount', 'super_storage', 'redeployment',
						'last_year_consume', 'half_year_consume','planType',
						'year_inventory', 'gap_number','actualNumber','reserve'])
	});
	 
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
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
				sortable : true,
				renderer:function(value){
					if(value==""||value==null){
						return 0;
					}else{
						return value;
					}
				}
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "机型",
				width : 80,
				dataIndex : "JX",
				resizable : false,
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
//				mtextm : " &nbsp;",
//				mcolm : 6,
//				mwidthm : 480,
//				mtext : "资源情况",
//				mcol : 6,
//				mwidth : 480,
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
//				mtextm : " &nbsp;",
//				mcolm : 12,
//				mwidthm : 600,
//				mtextm : " &nbsp;",
//				mcolm : 12,
//				mwidthm : 600,
//				mtext : "交付时间",
//				mcol : 12,
//				mwidth : 600,
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				editor : new Ext.form.NumberField({
//							decimalPrecision : 4,
//							allowNegative : false
//						}),
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
//				mtextm : " &nbsp;",
//				mcolm : 2,
//				mwidthm : 200,
//				mtext : "预计消耗",
//				mcol : 2,
//				mwidth : 200,
				header : '下半年消耗',
				dataIndex : 'half_year_consume',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value,cellmeta,record,rowIndex,columnIndex,store){
					if(record.get("planType")==1){//预拨计划
						return value;
					}else {//调整计划,临批计划
						return "0";
					}
				}
				
			}, {
				header : '年末库存',
				dataIndex : 'year_inventory',
				align : "center",
				width : 100,
				sortable : true,
				renderer:function(value){
					if(value==""){
						return 0;
					}else{
						return value;
					}
				}
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
				sortable : true,
				renderer:function(value){
					if(value==""){
						return 0;
					}else{
						return value;
					}
				}
			}, {
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
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
				header : "<font color=red>*</font>储备量",
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
//				mtext : "其中",
//				mcol : 2,
//				mwidth : 200,
				header : '超储',
				dataIndex : 'super_storage',
				align : "center",
				width : 100,
				sortable : true/*,
				editor : new Ext.form.NumberField({
							allowBlank : true,
							maxLength : 10,
							minValue : 0,
							maxValue : 999999999,
							allowDecimals : true,
							decimalPrecision : 4,// 小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals
							// :true一起使用,否则没意义

							maxLengthText : '不能超过10个字符，请重新输入！'
						})*/
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
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "<font color=red>*</font>建议采购数量",
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
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "物质类别",
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
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
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
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
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
					url : '../JSON/procurement_ProcurementRemote.getComboBoxDataForAnnualPlan?d='
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
//	planStore.load();
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
				appltTo : 'local-states',
				listeners: {
        //delete JS操作符,用于删除对象的属性或数组的元素
        // delete the previous query in the beforequery event or set
        // combo.lastQuery = null (this will reload the store the next time it expands)
        beforequery: function(qe){
        //comboBox 每次请求前,都检测(最近)请求参数是否改变(lastQuery),改变(为NULL)则重新发送请求
            delete qe.combo.lastQuery;
        }
    }
			});
	pCombo.on('select', function(combo, record, index) {
			var grid = Ext.getCmp("card3PanelDataGrid");
				grid.getStore().baseParams = {
					start : 0,
					limit : 20,
					procurementId : combo.value,
//					materialTypeName : node.text,
					procurementType : procurementProcessData.newProcessType,
					type : '1',
//					materialCatLogId : node.id,
					materialBuyType : '1'
				};
				grid.getStore().load();
//				procurementProcessData.procurementId = combo.value;
//				var tree = Ext.getCmp('nianduTreePanelId');
//				nianduNewPurchaseTree.parentId = 0;
//				var node = tree
//						.getNodeById(nianduNewPurchaseTree.parentId + '');
//				tree.getNodeById(nianduNewPurchaseTree.parentId + '').reload();
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
					var str = "";
					var allCounts = store.getCount();
					if(allCounts<=0){
						return false;
					}else if (allCounts > 0) {
						for (var i = 0; i < allCounts; i++) {
							if ((i + 1) == allCounts) {
								store.getAt(i).data.newProcessType = procurementProcessData.newProcessType;
								str += Ext.encode(store.getAt(i).data);
							} else {
								str += Ext.encode(store.getAt(i).data) + ',';
							}
						}
											// 异步提交数据
					Ext.Ajax.request({
//						url : '../JSON/procurementDetail_ProcurementDetailRemote.updateYearGridData?d='+ new Date(),
//						params : {
//							"updateRecords" : '[' + str + ']'
//						},
						url:'../JSON/procurementDetail_ProcurementDetailRemote.submitAnnualPlan',
						method : 'POST',
						params : {
							procurementId:store.getAt(0).get("procurementId")
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
									type : "1" //1年度计划;2零星计划
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

				}
			}, '-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.isNianDuCommit = false;
					procurementProcessData.procurementId = '';
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			}
 
			];

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
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
	var grid = new Ext.grid.EditorGridPanel({
				region : "center",
				store : store,
				tbar : tbar,
				bbar : bb,
				cm : cm,
				stripeRows : true,
				sm : sm,
				plugins: group,
				id : "card3PanelDataGrid",
				clicksToEdit : 1,
//				view : new MyGridView(viewConfig),
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				listeners:{
					afteredit:function(e){
						var rec=e.record
						if(e.field=="actualNumber"||e.field=='amount_applications'||e.field=="subtotal_amount"||e.field=='super_storage'||e.field=='redeployment'||e.field=='reserve'){
							//建议采购量验证
							if(e.field=='actualNumber'&&rec.get('number_applications')!=rec.get('actualNumber')){
								var win=new Ext.Window({
									title:'编辑',
									layout:'fit',
									width:200,
									modal:true,
									actualNumber:rec.get('actualNumber'),
									items:[{
										border:false,
										id:'content',
										xtype:'textarea'
									}],
									buttons : [{
														text : '确定',
														handler : function(e) {
															var value=Ext.getCmp('content').getValue();
															if(value!=null&&value!=""){
																rec.set('note',value);
																rec.set('actualNumber',win.actualNumber);
															    rec.commit();
															    win.close();
															}else{
																Ext.Msg.alert('提示','请输入值!');
															}
														}
													}]
								})
								win.show();
								rec.reject();
								return;
							}
							//外调数量验证
							if (e.field == 'redeployment') {
								var subtotal_number = rec.get("subtotal_number");
								var updateValue = e.value;
								if (subtotal_number == "" || subtotal_number == null) {
									Ext.Msg.alert("提示", "多余中的小计 数量 为空，不能设置外调数量！");
                                    rec.reject();
									return false;
								}
								if (parseFloat(updateValue) > parseFloat(subtotal_number)) {
									Ext.Msg.alert("提示", "外调数量不能大于多余中的小计 数量 ！");
                                    rec.reject();
									return false;
								}
								rec.set("super_storage", Subtr(parseFloat(subtotal_number), parseFloat(updateValue)));
								rec.commit();
							}
							
							//储备量修改
							if (e.field == "reserve") {
								//建议采购量=储备量+申请量-多余量
								var actualNumber = Number(rec.get('reserve')) + Number(rec.get('actualNumber'))-Number(rec.get('subtotal_number'));
								rec.set("actualNumber", actualNumber);// 设置建议采购量
							}
													e.record.commit();
						}
						
					}
				}
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

// 新建年度计划页面
procurementProcessData.card3Panel1 = function() {
	// 有上级表头的复选框
	var sm = new Ext.grid.CheckboxSelectionModel({
				mtext : " ",
				mcol : 1,
				mwidth : 20
			});
	// 展示年度需求数据源
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getProcurementSummaryDetailList?d='
					+ new Date()
					+ "&pieceType="
					+ procurementProcessData.processGridTab1Type,
			method : 'post'
		}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					id : 'procurementSummaryDetailId',
					totalProperty : 'totalProperty'
				}, ['procurementSummaryDetailId', 'procurementDetailId',  'materialtypename',
						'materialCounts', 'jan', 'feb', 'mar', 'apr', 'may',
						'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dect',
						'materialItemName', 'desingnation', 'materialStandard', 
						'remark', 'demension', 'materialId','JX','desingnation',
						'planType', 'referenceprice','technicCondition'])
	});
	 
	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
						mtext : " ",
						mcol : 1,
						mwidth : 40,
						width : 40,
						header : "编号",
						resizable : false
					}), {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "牌号/型号",
				width : 80,
				dataIndex : "desingnation",
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "规格",
				width : 80,
				dataIndex : "materialStandard",
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "技术条件",
				width : 80,
				dataIndex : "technicCondition",
				sortable : true
			}, {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "计划单价",
				width : 80,
				dataIndex : "referenceprice",
				sortable : true
			} , {
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
			} , {
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "机型",
				width : 80,
				dataIndex : "JX",
				resizable : false,
				sortable : true 
			}  , {
				mtext : "交付情况",
				mcol : 12,
				mwidth : 600,
				header : "1月",
				width : 50,
				resizable : false,
				dataIndex : "jan",
				editor : new Ext.form.NumberField({
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
							decimalPrecision : 0,
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
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "物资类别",
				width : 80,
				dataIndex : "materialtypename",
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
				mtext : " ",
				mcol : 1,
				mwidth : 80,
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
				mtext : " ",
				mcol : 1,
				mwidth : 80,
				header : "备注",
				width : 80,
				align : "left",
				dataIndex : "remark",
				resizable : false,
				sortable : true
			}]);

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			});

	var grid = new Ext.grid.EditorGridPanel({
				height : 300,
				region : "center",
				store : store, 
				cm : cm,
				sm : sm,
				id : "card3PanelDataGrid1", 
				stripeRows : true,
				loadMask : {
					msg : '正在加载数据,请稍后...'
				}
			});

	return grid;

}
// 季度调整值验证
function afterEdit(obj) { 
	var record = obj.record;// 被修改的行
	var field = obj.field;// 被修改的列 
	if (obj.field == 'jan' || obj.field == 'feb' || obj.field == 'apr' ||
	    obj.field == 'may'  || obj.field == 'july' || obj.field == 'aug'  || obj.field == 'oct' || obj.field == 'nov' ){
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
//	else if (obj.field == 'materialCounts' || obj.field == 'reserve')
//	{
//		var updateValue = record.get("reserve");// 储备量
//		if (updateValue == null || updateValue == "")
//			updateValue = 0;
//		var originalValue = record.get("materialCounts");// 需用量
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
//			record.set("actualNumber", value);
//			record.set("subtotal_number","");
//		}
//		else if (parseFloat(value) < 0)
//		{
//			record.set("number_applications", "");
//			record.set("actualNumber", "");
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
// 按季度总和返回当月数值
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
/**
 * 加法
 * @param arg1
 * @param arg2
 * @return
 */
function accAdd(arg1,arg2){ 
	var r1,r2,m; 
	try{
		r1=arg1.toString().split(".")[1].length;
	}catch(e){
		r1=0;
	} 
	try{
		r2=arg2.toString().split(".")[1].length;
	}catch(e){
		r2=0;
	} 
	m=Math.pow(10,Math.max(r1,r2));
	return (arg1*m+arg2*m)/m;
}
 /* 减法
 * 
 * @param arg1
 * @param arg2
 * @return
 */
function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{
    	r1=arg1.toString().split(".")[1].length;
    }catch(e){
    	r1=0;
    }
    try{
    	r2=arg2.toString().split(".")[1].length;
    }catch(e){
    	r2=0;
    }
    m=Math.pow(10,Math.max(r1,r2));
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}