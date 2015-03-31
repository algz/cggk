/**
 * desc 综合查询列表
 * @author zhaodw
 */

var declare_query = {
		departmentId : '',
		 use : '',
		declareplanID : ''
};

declare_query.gridPanel = function(departmentId,use1,declareplanID,id,declareplanType,status,generator){
	//alert("departmentId:"+departmentId+"  "+"use1:"+use1+"   "+"declareplanID:"+declareplanID+"   "+"id:"+id);
	var flag = true;
	if((status=="编制中"||status=="已退回")&&generator==1){
		flag = false;
	}
	declare_query.departmentId = departmentId;
	declare_query.use = use1;
	declare_query.declareplanID = declareplanID; 
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var proxy = null;
	var isDepartment = false;
	var isUse = false; 
	if(departmentId != null && departmentId != '')
		isDepartment = true;
	if(use1 != null && use1 != '')
		isUse = true;
	proxy = new Ext.data.HttpProxy(
			{
				url : '../JSON/declareDetail_DeclareDetailRemote.getGridDataByCondition?d='
						+ new Date(),
				method : "post",
				baseParams :{
					start:0,limit:20
				}
			});
	var declare_queryStore = new Ext.data.Store(
			{
				proxy : proxy,
				reader : new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty',
					id : 'rownum'
				}, [ 'rownum','declareDetailId','departmentName', 'amount', 'declareDetailStatus',
						'declareId', 'declareType', 'materialid','contactPerson','contactTelephone',
						'materialCatalogName', 'quantity', 'reason', 'report','remark','taskno',
						'use', 'useDate', 'materialItemName','deliveryStatus',
						'materialStandard', 'technicCondition', 'demension','status','declareplanDetilID',
						'oldquantity','changer','changeTime','changeReson' ])

			});
	var cm = new Ext.grid.ColumnModel([ sm,rm, {
		header : '名称',
		dataIndex : 'materialItemName',
		sortable : true,
		width : 80
	}, {
		header : '部门',
		dataIndex : 'departmentName',
		sortable : true,
		hidden: isDepartment,
		width : 90
	}, {
		header : '技术条件',
		dataIndex : 'technicCondition',
		sortable : true,
		width : 90
	}, {
		header : '型号',
		dataIndex : 'materialStandard',
		sortable : true,
		width : 100
	},{
		header : "交货状态",
		dataIndex : 'deliveryStatus',
		sortable : true,
		width : 100
	}, {
		header : '用途',
		dataIndex : 'use',
		sortable : true,
		hidden: isUse,
		width : 100
	}, {
		header : '物资类别',
		dataIndex : 'materialCatalogName',
		sortable : true,
		width : 95
	}, {
		header : '数量',
		dataIndex : 'quantity',
		sortable : true,
		width : 80
	}, {
		header : '计量单位',
		dataIndex : 'demension',
		sortable : true,
		width : 80
	}, {
		header : '资金预算（单位：元）',
		dataIndex : 'amount',
		sortable : true,
		width : 120
	}, {
		header : ' 采购类型',
		dataIndex : 'declareType',
		sortable : true,
		width : 95
	},{
		header : ' 任务编号',
		dataIndex : 'taskno',
		sortable : true,
		width : 95
	}, {
		header : ' 使用时间',
		dataIndex : 'useDate',
		sortable : true,
		width : 95
	}, {
		header : ' 备注',
		dataIndex : 'remark',
		sortable : true,
		width : 95
	}, {
		header : ' 联系人',
		dataIndex : 'contactPerson',
		sortable : true,
		width : 95
	}, {
		header : ' 联系电话',
		dataIndex : 'contactTelephone',
		sortable : true,
		width : 95
	}, {
		header : '变更前数据',
		dataIndex : 'oldquantity',
		sortable : true,
		width : 95
	}, {
		header : '变更人',
		dataIndex : 'changer',
		sortable : true,
		width : 95
	}, {
		header : '变更时间',
		dataIndex : 'changeTime',
		sortable : true,
		width : 95
	}, {
		header : '变更原因',
		dataIndex : 'changeReson',
		sortable : true,
		width : 95
	}

	]);
	var toolbar = [ '-', {
		//index 1
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			declare_query_query_form.getSearchForm(declare_query.departmentId,declare_query.use,declare_query.declareplanID,id).show();
		}
	}, {
		xtype:'tbseparator',
		hidden : false
	}, {
		//index 3
		text : '退回',
		hidden : true,
		iconCls : 'Cancel',
		handler : function() {
			var selects = Ext.getCmp(id).getSelectionModel().getSelections();
			if(selects == null || selects.length == 0){
				Ext.Msg.alert('提示','请选择记录!');
				return ;
			}
			var declareIds = new Array();
			for(var i = 0;i< selects.length;i++){
				//alert(selects[i].get("declareDetailId"));
				//declareIds.push(selects[i].id) ; 
				declareIds.push(selects[i].get("declareDetailId")) ;
			}
			declarePlanAction.callBack(declareIds,id);
		}
	}, {
		xtype:'tbseparator',
		hidden : true
	},{
		//index 5
		text : '生成',
		iconCls : 'CreateLog',
		hidden : true,
		handler : function() {
			
			var selects = Ext.getCmp(id).getSelectionModel().getSelections();
			if(selects == null || selects.length == 0){
				Ext.Msg.alert('提示','请选择信息!');
				return ;
			}
			var declareDetailId = null;
			var type = null;
			for(var i = 0;i< selects.length;i++){ 
				if(declareDetailId == null)
				{
					declareDetailId = selects[i].get('declareDetailId') ;
					type = selects[i].get('declareType') ;
				}else{
					declareDetailId = declareDetailId +','+selects[i].get('declareDetailId') ;	
					if(type!=selects[i].get('declareType')){
						Ext.Msg.alert('提示','请选择相同采购类型的信息!');
						return ;
					}
				}
				
			} 
			declarePlanForm.getForm(declareDetailId,null,departmentId,use1,declareplanID,id,type).show();
		}
	},'-', {
		//index 7
		text : '导出', 
		iconCls : 'icon-exportTasks',
		handler : function() {
			declarePlanAction.exportExcel(departmentId,use1,declareplanID);
		}
	}, '-', {
		//index 9
		text : '打印',
		disabled: true,
		iconCls : 'Print',
		handler : function() {
			//productAction.search();
		}
	},'-',{
		text : '添加',
		iconCls : 'add1',
		disabled : flag,
		handler : function(){
			declare_query.addMaterialWin(id,declareplanType);
		}
	},'-',{
		text : '删除',
		iconCls : 'del1',
		disabled : flag,
		handler : function(){
			declare_query.delMaterial(id);
		}
	} ];
	var grid = new Ext.grid.EditorGridPanel({
		id : id,
		layout : 'fit',
		cm : cm,
		sm : sm,
		store : declare_queryStore,
		autoScroll : true,
		height : 500,
		autoWidth : true,
		columnLines : true,
		clicksToEdit : 1,
		loadMask : {
			msg : '数据加载中...'
		},
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		tbar : toolbar,
		bbar : new Ext.PagingToolbar({
			pageSize : 20,
			store : declare_queryStore,
			displayInfo : true,
			displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
			emptyMsg : '没有记录'

		})
	});

	declare_queryStore.on('load', function(store, records, options) {

	});

	return grid;
}
declare_query.centerPanel = new Ext.Panel({
			id : 'declare_queryCenterPanel', 
			layout : 'fit',
			items : [declare_query.gridPanel("","","",'declare_queryGrid')]
		});
declare_query.tabPanel = function() {
	var tab = new Ext.Panel({
				title : '综合查询',
				id : 'declare_queryTab', 
				layout : 'fit',
				items : [declare_query.centerPanel],
				listeners : {
					'activate' : function() {
						if(Ext.getCmp('declare_queryGrid') != null){
							declare_query.declareplanID = '';
							Ext.getCmp('declare_queryGrid').store.baseParams={start:0,limit:20};
							Ext.getCmp('declare_queryGrid').store.load();  
						}
					}
				}
 
			});

	return tab;
}; 
//补充申报计划添加物资时页面
declare_query.addMaterialWin = function(id,declareplanType){
	var window = new Ext.Window({
		width : 600,
		height : 320,
		title : '新增/修改记录详情',
		autoScroll:false,
		autoDestroy: true,
//		layout : 'fit',
		returnValue : '',// 返回值
		modal : true, // 遮蔽其他组件
		items : [{
				xtype : "form",
				id : 'declarationMaterialFormPanel',
				padding : 5,
				frame : false,
				fileUpload : true,
				labelWidth:65,
				items : [{
					fieldLabel : '物资名称',
					xtype : 'textfield',
					id : "materialItemName",
					name : 'materialItemName',
					anchor : '95%',
					allowBlank : false,
					listeners : {
						focus : function(field) {
							declare_query.getMaterialWin().show();
						}
					}
				},{
					layout : 'column',
					border : false,
					defaults : {
						border : false,
						labelWidth : 65,
						columnWidth : 1
					},
					items : [{
						columnWidth : .5,
						border : false,
						layout : 'form',
						items : [{
							name : 'declareplanID',
							xtype : 'hidden'
						},{
									name : 'declareDetailId',
									xtype : 'hidden'
								}, {
									id : 'materialid',
									name : 'materialid',
									xtype : 'hidden'
								}, {
									name : 'declareId',
									xtype : 'hidden'
								}, {
									id : 'materialitemcode',
									fieldLabel : '物资编码',
									xtype : 'textfield',
									name : 'materialitemcode',
									readOnly : true,
									allowBlank : false,
									anchor : '95%'
								},  {
									id : 'desingnation',
									fieldLabel : '物资牌号',
									xtype : 'textfield',
									name : 'desingnation',
									readOnly : true,
									anchor : '95%'
								},{
									id : 'materialStandard',
									fieldLabel : '规格型号',
									xtype : 'textfield',
									name : 'materialStandard',
									readOnly : true,
									anchor : '95%'
								}, {
									id:'materialCatalogName',
									name:'materialCatalogName',
									fieldLabel : '物资类别',
									readOnly : true,
									xtype : 'textfield',
									anchor : '95%'
								},/*{
									fieldLabel : '<font color=red>*</font>物资类别',
									allowBlank : false,
									xtype : 'hd.investment.purchaseRequest.declareDetail.form.mCNameCombo'
								}, {
									fieldLabel : '',
									id:'blankfield',
									hidden:true,
									xtype : 'displayfield',
									allowBlank : false,
									anchor : '95%'
								},*/{
									fieldLabel : '<font color=red>*</font>数量',
									xtype : 'numberfield',
									id : 'quantity',
									name : 'quantity',
									allowDecimals : true,//允许输入小数
									decimalPrecision : 4,// 小数位数
									maxLength : 20,// 最大长度
									maxLengthText : '不能超过10个字符，请重新输入！',
									maxValue : 999999999,// 最大值
									allowBlank : false,// 是否允许非空
									listeners: {  
				                      'blur': function(f){  
				                           var num = Ext.getCmp('quantity').getValue()==""?0:Ext.getCmp('quantity').getValue();
				                           var price = Ext.getCmp('referencePrice').getValue()==""?0:Ext.getCmp('referencePrice').getValue();
				                           Ext.getCmp('amount').setValue(num*price);
				                       }  
				                    },
									anchor : '95%'
								}, {
									fieldLabel : '<font color=red>*</font>使用时间',
									invalidText : '使用时间输入格式为Y-m-d',
									id : "useDate",
									xtype : 'datefield',
									format : 'Y-m-d',
									allowBlank : false,
									anchor : '95%'
								},{
									fieldLabel : '备注',
									id : "remark",
									xtype : 'textfield',
									anchor : '95%'
								},{
									fieldLabel : '联系人',
									id : "contactPerson",
									xtype : 'textfield',
									anchor : '95%'
								}]
					}, {
						columnWidth : .5,
						border : false,
						layout : 'form',
						items : [{
									id : 'technicCondition',
									fieldLabel : '技术条件',
									xtype : 'textfield',
									name : 'technicCondition',
									readOnly : true,
									anchor : '95%'
								}, {
									id : 'demension',
									fieldLabel : '计量单位',
									xtype : 'textfield',
									name : 'demension',
									readOnly : true,
									anchor : '95%'
								},{
									id : 'taskno',
									fieldLabel : '任务编号',
									xtype : 'textfield',
									name : 'taskno',
									anchor : '95%'
								},{
								    xtype : 'combo',
								    fieldLabel : '<font color=red>*</font>采购用途',
									allowBlank : false,
									name : 'use',
									anchor : '95%',
									triggerAction : 'all',
									valueField : 'id',
									displayField : 'flag',
									forceSelection : true,
									editable : false,
									mode : 'local',
									store : new Ext.data.SimpleStore({
									fields : ['id', 'flag'],
									data : [['批产用（备注机型）', '批产用（备注机型）'], ['科研用（备注项目）', '科研用（备注项目）'],
											['生产准备', '生产准备'], ['办公耗材', '办公耗材'], ['生产补料', '生产补料'],
											['备件（备注型号）', '备件（备注型号）'], ['试验用（备注机型或项目）', '试验用（备注机型或项目）'],
											['工装用（备注具体项目）', '工装用（备注具体项目）'], ['典型试飞', '典型试飞'],
											['技改大修', '技改大修'], ['日常管理（备注具体用途）', '日常管理（备注具体用途）'],
											['其他', '其他']]
									})
								},{
									fieldLabel : '计划单价',
									xtype : 'numberfield',
									id : 'referencePrice',
									name : 'referencePrice',
									disabled : true,
									anchor : '95%'
								},{
									fieldLabel : '资金预算',
									xtype : 'numberfield',
									id : 'amount',
									name : 'amount',
									allowDecimals : true,//允许输入小数
									decimalPrecision : 4,// 小数位数
									maxLength : 20,// 最大长度
									maxLengthText : '不能超过10个字符，请重新输入！',
									maxValue : 999999999,// 最大值
//											allowBlank : false,// 是否允许非空
//											allowBlank : false,
//											maxLength : 12,
//											maxLengthText : '不能超过15个字符，请重新输入！',
//											allowDecimals : true,// 是否允许输入小数
//											decimalPrecision : 3,// 小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals
//											// :true一起使用,否则没意义
									anchor : '95%'
								}, 
//								new Ext.form.ComboBox({
//									id : 'declareType',
//									name : 'declareType',
//									allowBlank : false,
//									fieldLabel : '<font color=red>*</font>采购类型',
//									anchor : '95%',
//									store : new Ext.data.SimpleStore({
//												fields : ['id', 'flag'],
//												data : [['1', '计划内'],
//														['2', '应急'],
//														['3', '非应急']]
//											}),
//									triggerAction : 'all',
////									hiddenName : 'declareType',
//									valueField : 'id',
//									displayField : 'flag',
//									forceSelection : true,
//									editable : false,
//									mode : 'local'
//								}),
								{
									xtype : 'textfield',
									fieldLabel : '采购类型',
									id : 'declareType',
									value : declareplanType,
									readOnly : true,
									anchor : '95%'
								},
									{
									xtype : 'textfield',
									fieldLabel:'联系电话',
									id : 'contactTelephone',
									anchor : '95%'
								},{
									xtype : 'textfield',
									name : 'fileId',
									hidden : true
								}]
					}]
				}]
			}],
			buttons : [{text:' 保存 ',
				handler: function(){
					var form = Ext.getCmp("declarationMaterialFormPanel").getForm();
					if (!form.isValid()) {
						return false;
					}else{//申报计划添加物资信息
						declare_query.saveMaterialToDeclarePlan(id);
						window.close();
						Ext.getCmp(id).getStore().reload();
					}
			}},{text:' 关闭 ',handler : function(){window.close()}}],
			listeners : {
				'show' : function(){
    				var contactPerson=Ext.getCmp('contactPerson');
					if(contactPerson.getValue()==""){
						Ext.Ajax.request({
							url : '../JSON/untilsRemote.getLoginUser',
							method : 'post',
							disableCaching : true,
							autoAbort : true,
							success : function(response, options) {
								var user=Ext.util.JSON.decode(response.responseText).data;
								contactPerson.setValue(user.truename);
							}
						});
					}
					
				}
			}
	});
	window.show();
};

//添加物资时，获取物资列表
declare_query.getMaterialWin = function(){
	
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							// url :
							// '../JSON/registrationRemote.getGridDataByContract?d='
							// + new Date(), 试运行还得使用
//							url : '../JSON/material_MaterialRemote.getAllByRoles?d='
//									+ new Date(),
						url : '../JSON/material_MaterialRemote.getAll?d='+new Date(),
						method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'materialid',
							totalProperty : 'totalProperty'
						}, [ // 'itemId', 'itemName',
						'desingnation', 'materialStandard', 'demension','contactPerson','contactTelephone',
								'itemCode', 'purchaseNum', 'materialItemName','materialCatalogName',
								'materialitemcode', 'materialid','referencePrice','technicCondition']),
				autoLoad : true,
				baseParams : {
					start : 0,
					limit : 20
				}
			});
	var cm = new Ext.grid.ColumnModel([sm, rm, {
				header : '物资编码',
				// dataIndex : 'itemCode',试运行后使用
				dataIndex : 'materialitemcode',
				width : 100,
				sortable : true
			}, {
				header : '物资名称',
				// dataIndex : 'itemName',试运行后使用
				dataIndex : 'materialItemName',
				width : 100,
				sortable : true
			}, {
				header : '物资牌号',
				dataIndex : 'desingnation',
				width : 100,
				sortable : true
			}, {
				header : '物资规格',
				dataIndex : 'materialStandard',
				width : 100,
				sortable : true
			}, {
				header : '技术条件',
				dataIndex : 'technicCondition',
				width : 100,
				sortable : true
			},{
				header : '单位',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			},{
				header : '物资类别',
				dataIndex : 'materialCatalogName',
				width : 100,
				sortable : true
			}]);
	var toolbar = ['-', {
				text : '查询',
				iconCls : 'search1',
				handler : function() {
					declare_query.getSearchForm('MaterialGridPanelId1')
							.show();
				}
			}];
	var grid = new Ext.grid.GridPanel({
				id : 'MaterialGridPanelId1',
				cm : cm,
				sm : sm,
				store : store,
				autoScroll : true,
				height : 300,
				tbar : toolbar,
				autoWidth : true,
				columnLines : true,
				loadMask : {
					msg : '数据加载中...'
				},
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
	// store.baseParams={start:0,limit:20,contractId:registrationNonMetallicForm.contractId,materialType:"2"}
	// store.load();

	var buttons = [{
		text : ' 确定 ',
		handler : function() {
			var record = Ext.getCmp("MaterialGridPanelId1").getSelectionModel()
					.getSelected();
			if (record == null) {
				Ext.Msg.alert('提示', '请选择一条记录！');
				return;
			}
			Ext.getCmp('materialid').setValue(record.get('materialid'));
			Ext.getCmp('materialitemcode').setValue(record
					.get('materialitemcode'));
			Ext.getCmp('materialItemName').setValue(record
					.get('materialItemName'));
			Ext.getCmp('demension').setValue(record.get('demension'));
			Ext.getCmp('desingnation').setValue(record.get('desingnation'));
			Ext.getCmp('materialStandard').setValue(record
					.get('materialStandard'));
			Ext.getCmp('technicCondition').setValue(record
					.get('technicCondition'));
			Ext.getCmp('materialCatalogName').setValue(record.get('materialCatalogName'));
			Ext.getCmp('referencePrice').setValue(record.get('referencePrice'));
			window.close();
		}
	}, {
		text : '取消',
		handler : function() {
			window.close();
		}
	}]
	var window = new Ext.Window({
				id : "MaterialAddWind1",
				width : 700,
				layout : 'fit',
				autoScroll : true,
				title : '物资信息列表',
				modal : true,
				items : grid,
				border : true,
				buttons : buttons,
				closeAction : 'close'
			});
	return window;

};

//补充申报计划添加物资
declare_query.saveMaterialToDeclarePlan = function(id){
	var form = Ext.getCmp('declarationMaterialFormPanel').getForm();
	var data = form.getValues();
	data.declareplanID = declare_query.declareplanID;
	if(data.declareType == '计划内'){
		data.declareType = '1';
	}else if(data.declareType == '应急'){
		data.declareType = '2';
	}else if(data.declareType == "非应急"){
		data.declareType = '3';
	}
	form.doAction('submit',{
		waitMsg : '正在保存数据，请稍候...',
		waitTitle : '提示',
		url : '../JSON/declareDetail_DeclareDetailRemote.saveMaterialToDeclarePlan?d=' + new Date(),
		method : 'post',
		params : data,
		success : function(form, action) {
			Ext.Msg.alert('提示', "保存成功!");
			Ext.getCmp(id).getStore().reload();
		},failure : function(form, action) {
			Ext.Msg.alert('提示', "保存失败!");
		}
	});
};

declare_query.delMaterial = function(id){
	var records = Ext.getCmp(id).getSelectionModel().getSelections(); 
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的记录！');
		return;
	}
	var ids = new Array();
	var amounts = new Array();
	for (i=0;i<records.length;i++) {
		ids.push(records[i].get('declareDetailId'));
		amounts.push(records[i].get('amount'));
	} 
	callSeam("declarePlan_DeclarePlanRemote", "delMaterial", [ ids,records[0].get('declareId'),amounts,declare_query.declareplanID ],
			function(r){
				if (r) {
					var result = Ext.util.JSON.decode(r);
					if(result.success == false){
						Ext.Msg.alert('提示', '操作失败！');
					} else {
						var grid = Ext.getCmp(id);				
						grid.store.reload(); 
						Ext.Msg.alert('提示', '操作成功！');
					}		
				} else {
					Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
				}
	});
};

declare_query.getSearchForm = function(name) {
	var buttons = [{
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName_search")
					.getValue();
			var materialitemcode = Ext.getCmp("materialitemcode_search")
					.getValue();
			var materialStandard = Ext.getCmp("materialStandard_search")
					.getValue();
			var demension = Ext.getCmp("demension_search").getValue();
			var technicCondition = Ext.getCmp("technicCondition_search")
					.getValue();
			var desingnation = Ext.getCmp("desingnation_search").getValue();
			Ext.getCmp(name).store.baseParams = {
				start : 0,
				limit : 20,
				materialItemName : materialItemName,
				materialitemcode : materialitemcode,
				desingnation : desingnation,
				materialStandard : materialStandard,
				demension : demension,
				technicCondition : technicCondition
			};
			Ext.getCmp(name).store.load();
			// materialItemForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
//			materialItemForm.getForm().reset();
			window.close();
		}
	}];;

	var item = [{
				layout : 'column',
				xtype : 'container',
				defaults : {
					border : false,
					labelWidth : 85
				},
				items : [{
							columnWidth : .49,
							width : 700,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '物资编号',
										xtype : 'textfield',
										id : 'materialitemcode_search',
										anchor : '90%'
									}]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '物资名称',
										xtype : 'textfield',
										id : 'materialItemName_search',
										anchor : '90%'
									}]
						}]
			}, {

				layout : 'column',
				width : 700,
				xtype : 'container',
				defaults : {
					border : false,
					labelWidth : 85
				},
				items : [{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '物资牌号',
										xtype : 'textfield',
										id : 'desingnation_search',
										anchor : '90%'
									}]
						},{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '物资规格',
										xtype : 'textfield',
										id : 'materialStandard_search',
										anchor : '90%'
									}]
						}]

			}, {
				layout : 'column',
				width : 700,
				xtype : 'container',
				defaults : {
					border : false,
					labelWidth : 85
				},
				items : [{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '技术条件',
										xtype : 'textfield',
										id : 'technicCondition_search',
										anchor : '90%'
									}]
						},{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '单位',
										xtype : 'textfield',
										id : 'demension_search',
										anchor : '90%'
									}]
						}]
			}];

	var window = new Ext.Window({
				id : "materialItemwind",
				buttons : buttons,
				layout : 'fit',
				width : 700,
				autoHeight : true,
				autoScroll : true,
				title : '查询',
				modal : true,
				items : new Ext.form.FormPanel({
							padding : 5,
							buttonAlign : 'center',
							layout : 'column',
							autoScroll : true,
							width : 700,
							autoHeight : true,
							items : [item]
						}),
				border : true,
				closeAction : 'close'
			});
	return window;
};