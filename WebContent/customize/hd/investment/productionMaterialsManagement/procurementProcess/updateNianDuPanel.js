// 年度采购计划清单详细信息展示
purchaseDetailData.card6Panel = function() {
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
						'materialCount', 'remark', 'demension','JX','QSJH','ZZJH','CLDM',
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

	var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
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
							allowBlank : true,
							maxLength : 10,
		        			maxLengthText : '不能超过10个字符，请重新输入！'
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
			},/* {				
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
			},*/
				{
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
				dataIndex : 'JX',
				resizable : false,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
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
//				mtextm : " &nbsp;",
//				mcolm : 2,
//				mwidthm : 200,
//				mtext : "预计消耗",
//				mcol : 2,
//				mwidth : 200,
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
//				mtextm : " &nbsp;",
//				mcolm : 1,
//				mwidthm : 80,
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "下半年缺口",
				width : 80,
				dataIndex : "gap_number",
				sortable : true
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
							minValue :0,
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
							minValue :0,
							maxLength : 10,
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
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
				header : "建议采购数量",
				width : 80,
				align : "left",
				dataIndex : "actualNumber",
				resizable : false,
				sortable : true,
				editor : new Ext.form.TextField({
							allowBlank : false,
							maxLength : 10,
							minValue :0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  
		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
//				mtext : " ",
//				mcol : 1,
//				mwidth : 80,
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

			}, {
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
	var tbar = ['-', {
				text : '返回',
				iconCls : 'Cancel',
				handler : function() {
					procurementProcessData.rightpanel1.getLayout()
							.setActiveItem(0);
				}
			}/*, '-', {
				text : '提交',
				iconCls : 'Submit', 
				disabled : privilegeValidate.updateDisable,
				handler : function() {
					nianDuSubmitFun1(store);

				}
			}*/];

	var bb = new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			});
			
	    

	var continentGroupRow = [
		        {header: '',colspan : 35,align: 'center'},
		        {header:'多余',colspan:4,align: 'center'},
		        {header:'',colspan:4,align: 'center'}];
	var cityGroupRow=[
	            {header:'',colspan:10,align: 'center'},
	            {header:'资源情况',colspan:6,align: 'center'},
	            {header:'交付时间',colspan:12,align: 'center'},
	            {header:'预计消耗',colspan:2,align: 'center'},
	            {header:'',colspan:2,align: 'center'},
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
				sm : sm,
				plugins: group,
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				id : "card6PanelDataGrid",
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
							
							
							if (e.field == "reserve") {
								//建议采购量=储备量+申请量+多余量
								var actualNumber = Number(rec.get('reserve')) + Number(rec.get('number_applications'))+Number(rec.get('subtotal_number'));
								rec.set("actualNumber", actualNumber);// 设置建议采购量
							}
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
						e.record.commit();
						}
						
					}
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
function nianDuSubmitFun1(store) {
	var allCounts = store.getCount();
	var str = "";
	// 遍历store中的每一条记录
	if (allCounts > 0) {
		for (var i = 0; i < allCounts; i++) {

			store.getAt(i).data.purchaseType = store.getAt(i).data.purchaseTypeName;

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
