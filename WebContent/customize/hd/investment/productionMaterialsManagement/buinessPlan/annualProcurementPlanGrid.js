
var annualProcurementPlanGrid={};

annualProcurementPlanGrid.EditPlanGrid= function() { //procurementProcessData.card3Panel
	// 有上级表头的复选框
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 展示年度需求数据源
	var store = new Ext.data.Store({
				listeners:{
			    update : function(store, rec, operation){
				if(operation=='commit'){
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
										} else {
											Ext.Msg.alert("提示",obj.msg);
										}
									},
									failure : function(response, opts) {
									}
								});
				}
				
			}
		},
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getGridData?d='
					+ new Date(),
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
						'year_inventory', 'gap_number','actualNumber','reserve','out_num'/*已发*/])
	});
	 
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						width : 40,
						header : "序号",
						resizable : false
					}), {
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
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
				sortable : true,
				renderer:function(value){
					if(value==""||value==null){
						return 0;
					}else{
						return value;
					}
				}
			}, {
				header : "机型",
				width : 80,
				dataIndex : "JX",
				resizable : false,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex) {
					var materialId = record.get("materialId");
//					var procurementDetailId  = record.get("procurementDetailId");
                    var procurementId=record.get('procurementId');
					return "<a href='javascript:void(0);' onclick=annualProcurementPlanGrid.showJXDetailOfPlan('"+ materialId+ "','"+procurementId+"')>&nbsp;<font color=blue>小计</font></a>";
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
				header : "已发",
				width : 80,
				resizable : false,
				dataIndex : "out_num",
				sortable : true
			},{
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
				header : "需求量",
				width : 80,
				dataIndex : "materialCounts",
				sortable : true 
			}, {
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
				hidden:true,
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
				header : '数量',
				dataIndex : 'subtotal_number',
				align : "center",
				width : 100,
				sortable : true
		}	, {
				header : '<font color=red>*</font>金额',
				dataIndex : 'subtotal_amount',
				align : "center",
				width : 100,
				hidden:true,
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
							minValue : 0,
							allowDecimals :true,
							decimalPrecision :4,//小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals :true一起使用,否则没意义  

		        			maxLengthText : '不能超过10个字符，请重新输入！'
						})
			}, {
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
				}, ['procurementId', 'procurementCode','procurementType'])
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
//				appltTo : 'local-states',
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
			var grid = Ext.getCmp("EditPlanGrid");//card3PanelDataGrid
			var columnModel=grid.getColumnModel();
			var flag=false;
			if(record.get("procurementType")=='2'){
						flag=true;
			}
			columnModel.setHidden(columnModel.findColumnIndex('half_year_consume'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('year_inventory'),flag);
			columnModel.setHidden(columnModel.findColumnIndex('gap_number'),flag);
				
				grid.getStore().baseParams = {
					start : 0,
					limit : 20,
					procurementId : combo.value,
					procurementType : '1',
					type : '1',
					materialBuyType : '1'
				};
				grid.getStore().load();
			}); 

	var tbar = ['-',pCombo, '-', {
				text : '提交',
				iconCls : 'Submit',
				id:'EditPlanGrid_submitbtn',
				disabled : privilegeValidate.checkPrivilege('41000005'),
				handler : function() {
					var str = "";
					var allCounts = store.getCount();
					if(allCounts<=0){
						return false;
					}else if (allCounts > 0) {
						for (var i = 0; i < allCounts; i++) {
							if ((i + 1) == allCounts) {
								store.getAt(i).data.newProcessType = '1';
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
								// 保存成功，重新加载数据。 card3PanelDataGrid
								Ext.getCmp("EditPlanGrid").getStore().removeAll();
								Ext.getCmp("PlanListGrid").store.load({params :{start : 0,
									limit : 20,
									type : "1" //1年度计划;2零星计划
								}});
								Ext.getCmp("nianduselect").getStore().load();
//								procurementProcessData.isNianDuCommit = false;
//								procurementProcessData.procurementId = '';
								Ext.Msg.alert('提示', '保存成功！');

								Ext.getCmp('ProcurementPlanGrid').getLayout().setActiveItem(0);
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
//					procurementProcessData.isNianDuCommit = false;
//					procurementProcessData.procurementId = '';
					Ext.getCmp('ProcurementPlanGrid').getLayout().setActiveItem(0);
				}
			}
 
			];

	
    var continentGroupRow = [
		        {header: '',colspan : 35,align: 'center'},
		        {header:'多余',colspan:4,align: 'center'},
		        {header:'',colspan:4,align: 'center'}];
	var cityGroupRow=[
	            {header:'',colspan:9,align: 'center'},
	            {header:'资源情况',colspan:6,align: 'center'},
	            {header:'',colspan:1,align: 'center'},
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
//				region : "center",
				store : store,
				cm : cm,
				stripeRows : true,
				sm : sm,
				plugins: group,
				id : 'EditPlanGrid',//"card3PanelDataGrid",
				clicksToEdit : 1,
				loadMask : {
					msg : '正在加载数据,请稍后...'
				},
				tbar : tbar,
				bbar : new Ext.PagingToolbar({
				pageSize : 20,
				store : store,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
			    }),
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
								var actualNumber = Number(rec.get('reserve')) + Number(rec.get('number_applications'))-Number(rec.get('subtotal_number'));
								rec.set("actualNumber", actualNumber);// 设置建议采购量
							}
							e.record.commit();
						}
						
					}
				}
			});

//	sm.on('rowselect', function(sm, rowIndex, record) {
//				newNianDuPanel.selectRow = record;
//			});
//	sm.on('selectionchange', function(sm, t) {
//				newNianDuPanel.selectObj = sm.getSelections();
//				if (!sm.getSelections() || sm.getSelections().length < 1) {
//					newNianDuPanel.selectRow = null;
//				}
//			});

//	 grid.on('afteredit', afterEdit, grid); 
	return grid;

}

//年度采购计划展示列表
annualProcurementPlanGrid.PlanListGrid = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/procurementProcessRemote.getPurchaseGridData?d='+ new Date(),
			method : 'post'
		}),
		baseParams:{
			start:0,
			limit:20,
			type:1
		},
		reader : new Ext.data.JsonReader( {
			root : 'results', 
			totalProperty : 'totalProperty'
		}, [ 'purchaseId', 'purchaseCode', 'createDate', 'status',
				'materialTypeName', 'editor', 'type', 'remark','purchaseName',
				'stateName', 'editorName', 'editorDeptName', 'editorRoleName',
				'purchaseTypeName','procurementId' ])
	});
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel([sm,rm,{
	                    header : '编号',
						dataIndex : 'purchaseCode',
						sortable : true,
						width:120,
						renderer : function(value, cellmeta, record, rowIndex) {
							//展示采购计划详细信息的链接
							var procurementId = record.get("procurementId");// 计划清单唯一标识
							var purchaseName = record.get("purchaseName");// 决定是加载零星列表还是年度列表
							var state = record.get("status");
							value = "&nbsp;<font color=blue>" + value
									+ "</font>";
							return "<a href='javascript:void(0);' onclick= annualProcurementPlanGrid.ShowPlanDetail('"
									+ procurementId
									+ "','"
									+ purchaseName
									+ "','"
									+ state
									+ "',"+1+")  >" + value + "</a>";

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
					}]);
	var tbar = [
	'-', {//工具栏项
		text : '新建',
		extype : 'button',
		iconCls : 'add1',
		disabled :privilegeValidate.checkPrivilege('41000002'),
		handler : function() {
			Ext.getCmp('nianduselect').setReadOnly(false);
			Ext.getCmp('nianduselect').clearValue();
			Ext.getCmp('nianduselect').getStore().removeAll();
			Ext.getCmp('EditPlanGrid_submitbtn').enable();
	        Ext.getCmp('ProcurementPlanGrid').getLayout().setActiveItem(1);
			Ext.getCmp('EditPlanGrid').getStore().removeAll();
			var tbbar=Ext.getCmp('EditPlanGrid').getBottomToolbar();
			tbbar.updateInfo();
//              tbbar.afterTextEl.el.innerHTML = String.format("共 {0} 页", 1);
//              tbbar.first.setDisabled(true);
//              tbbar.prev.setDisabled(true);
//              tbbar.next.setDisabled(true);
//              tbbar.last.setDisabled(true);
//              tbbar.loading.disable();
		}
	}, '-', {
		text : '删除',
		iconCls : 'del1',
		disabled :privilegeValidate.checkPrivilege('41000003'),
		handler : function() {
			// 验证是否勾选id   productionProcessId1
			var records=Ext.getCmp('PlanListGrid').getSelectionModel().getSelections();
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
												var grid = Ext.getCmp("PlanListGrid");//productionProcessId1
//												grid.getStore().baseParams = {
//													start : 0,
//													limit : 20,
//													type : 1
//												};
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
						} else {
						}
					});
		}
	}, '-', {
		text : '送审',
		iconCls : 'Send',
		disabled:privilegeValidate.checkPrivilege('41000004'),
		handler : function() {
			annualProcurementPlanGrid.workFlow("1");
		}
	}, '-', '编号：', {
		xtype : "textfield",
		id : "purchaseCode"
	}, '-', {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
		   //var searchCatlogName = document.getElementById('searchCatlogName').value;
	       var grid = Ext.getCmp('PlanListGrid');//productionProcessId1
	       grid.getStore().baseParams = {
	          start : 0,
		      limit : 20,
		      purchaseCode : Ext.getCmp('purchaseCode').getValue(),
		      type:1//,
//		      status:status 
	       };
	       grid.store.load();
		   //procurementProcessAction.search(type,status);
		}
	}]
	
	 var grid = new Ext.grid.GridPanel({
		id : 'PlanListGrid',//'productionProcessId1',
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		tbar : tbar,
		listeners:{
			'activate':function(){
		       store.load();
	        }
		},
		bbar : new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	})
	});
	return grid;
}



//年度采购计划
annualProcurementPlanGrid.ProcurementPlan=function(){
   var ProcurementPlan=new Ext.Panel( {
		title : '采购计划列表',
		id : 'ProcurementPlanGrid',
		layout : 'card',
		activeItem : 0,
		items : [annualProcurementPlanGrid.PlanListGrid(),//年度采购计划列表gridpanel
				 annualProcurementPlanGrid.EditPlanGrid()//新建,修改,查看年度采购计划
						],
		listeners : {
				'activate' : function(grid) {
					Ext.getCmp("PlanListGrid").store.load({
								params : {
									start : 0,
									limit : 20,
									type : "1" // 1年度计划;2零星计划
								}
							});
					grid.getLayout().setActiveItem(0);

				}
			}
	})
	return ProcurementPlan;
}


// 显示年度采购计划
annualProcurementPlanGrid.ShowPlanDetail = function(procurementId,purchaseName, state, type) {
	var grid=Ext.getCmp('EditPlanGrid');
	Ext.getCmp('ProcurementPlanGrid').getLayout().setActiveItem(1);// 展示年度采购计划详细信息
	if (state == 1) {// 审批状态为‘待审批’的，可编辑的cell为enable
		    Ext.getCmp('EditPlanGrid_submitbtn').enable();
	} else {// 定额计划模块中,审批状态:审批中,已审批
		    Ext.getCmp('EditPlanGrid_submitbtn').disable();
	}
	Ext.getCmp('nianduselect').setReadOnly(true);
    var store=Ext.getCmp('nianduselect').getStore();
    store.removeAll();
    var rec=new store.recordType;
    rec.set('procurementId', procurementId);
    rec.set('procurementCode',purchaseName);
    store.add(rec);
    Ext.getCmp('nianduselect').setValue(procurementId);
	 //加载grid
	grid.store.load({params:{start : 0,
		limit : 20,
		type:1,
		procurementId:procurementId}});
}


// 采购计划送审
annualProcurementPlanGrid.workFlow = function(type) {
	var record = Ext.getCmp('PlanListGrid').getSelectionModel().getSelections();
	if (record == null || record.length == 0) {
		Ext.Msg.alert('提示', '请选择一条记录');
		return;
	}
	var arr = new Array();
	var id = "";
	if (type == "1") {
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('status') != '1') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('purchaseId'));
			id += record[i].get('purchaseId') + ",";
		}
	}else {
		for (var i = 0; i < record.length; i++) {
			if (record[i].get('status') != '1') {
				Ext.Msg.alert('提示', '请选择待审批的数据');
				return;
			}
			arr.push(record[i].get('purchaseId'));
			id += record[i].get('purchaseId') + ",";
		}
	}
//	procurementProcessAction.type = type;
	var flowID = privilegeValidate.getFlowID(type);
	if (flowID == "") {
		Ext.Msg.alert('提示', '没有审批模板!');
		return;
	}
	/**
	 * 默认设置审批流程模板走的方法
	 * 
	 * @param {}
	 *            templetId 审批模板的id
	 * @param {}
	 *            approvePressName 流程名称
	 * @param {}
	 *            approveNote 送审附言
	 * @param {}
	 *            objectID 审批对象ID，可以是多个，用','隔开
	 * @param {}
	 *            objectType 审批对象类型
	 * @param {}
	 *            noPrevilige 是否不进行权限验证,true为不验证，默认为false
	 * @param {}
	 *            success 提交成功的回调函数
	 * @param {}
	 *            failure 提交失败的回调函数
	 */
	approvePanel.submit(flowID, '定额计划采购审批', '定额计划采购审批', id.substring(0, id.length - 1),
			'ProductionProcess', true, function(){
			  Ext.getCmp('PlanListGrid').store.load();
			}, function(){
			  Ext.Msg.alert('提示', '没有送审权限!');
			});
}


/**
 * 显示机型的采购明细
 */
//procurementProcessAction.showDetail = function() {
////	var buttons = ;
//
////	var procurementAnnualPanle = procurementProcessData.card3Panel1();
////	procurementAnnualPanle.getStore().;
////	procurementAnnualPanle.getStore().load();
//
//}


// 显示采购计划详情中的JX详情
annualProcurementPlanGrid.showJXDetailOfPlan = function(materialid, procurementId) {
	// 展示年度需求数据源
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/procurementDetail_ProcurementDetailRemote.getProcurementSummaryDetailList?d='
					+ new Date(),
			method : 'post'
		}),
		autoLoad:true,
		baseParams : {
		start : 0,
		limit : 20,
		procurementId : procurementId,
		materialId : materialid,
		type : '1',
		materialBuyType : '2'
	},
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
	 
	var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer({
						width : 40,
						header : "编号",
						resizable : false
					}), {
				header : "器材名称",
				width : 80,
				dataIndex : "materialItemName",
				resizable : false
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
				dataIndex : "referenceprice",
				sortable : true
			} , {
				header : "计量单位",
				width : 80,
				dataIndex : "demension",
				resizable : false,
				sortable : true
			} , {
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
				header : "需求量",
				width : 80,
				dataIndex : "materialCounts",
				sortable : true 
			}, {
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
				dataIndex : "remark",
				resizable : false,
				sortable : true
			}]);
//    var continentGroupRow = [
//		        {header: '',colspan : 34,align: 'center'},
//		        {header:'多余',colspan:4,align: 'center'},
//		        {header:'',colspan:4,align: 'center'}];
//	var cityGroupRow=[
//	            {header:'',colspan:9,align: 'center'},
//	            {header:'资源情况',colspan:6,align: 'center'},
//	            {header:'交付时间',colspan:12,align: 'center'},
//	            {header:'预计消耗',colspan:2,align: 'center'},
//	            {header:'',colspan:3,align: 'center'},
//	            {header:'申请',colspan:2,align: 'center'},
//	            {header:'小计',colspan:2,align: 'center'},
//	            {header:'其中',colspan:2,align: 'center'},
//	            {header:'',colspan:4,align: 'center'}
//	            
//	    ]
//    var group = new Ext.ux.grid.ColumnHeaderGroup({
//        rows: [continentGroupRow, cityGroupRow]
//    });

		var window = new Ext.Window({
				id : "showDetailWind",
				width : 800,
				layout : 'fit',
				autoScroll : true,
				title : '明细',
				//modal : true,
				items :  new Ext.grid.GridPanel({
				height : 300,
//				region : "center",
				store : store, 
				cm : cm,
//				sm : sm,
//				plugins: group,
				id : "card3PanelDataGrid1", 
				stripeRows : true
			}),
				buttons : [{
				text : '关闭',
				handler : function() {
					window.close();
				}
			}]
			});
	window.show();

}