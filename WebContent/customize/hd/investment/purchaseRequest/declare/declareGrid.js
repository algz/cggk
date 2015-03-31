Ext.ns("hd.investment.purchaseRequest.declare.grid");
var declareGrid = {
	status : null
}
/**
 * 采购申报Grid
 * 
 * @class hd.investment.purchaseRequest.declare.grid.gridPanel
 * @extends Ext.grid.GridPanel
 */
hd.investment.purchaseRequest.declare.grid.gridPanel = Ext.extend(Ext.grid.GridPanel, {
			selectRow : null,
			selectObj : null,
			reloadvalue : function(ds, baseParams) {
				ds.baseParams = baseParams; // 分页时也能保持的参数
				ds.load();
			},
			sm : function() {
				var self = this;
				var sm = new Ext.grid.CheckboxSelectionModel();
				sm.on('rowselect', function(sm, rowIndex, record) {
							self.selectRow = record;
						});
				sm.on('selectionchange', function(sm, t) {
							self.selectObj = sm.getSelections();
							if (!sm.getSelections() || sm.getSelections().length < 1) {
								self.selectRow = null;
							}
						});
				return sm;
			},
			cm : function() {
				var cm = new Ext.grid.ColumnModel({
							defaults : {
								sortable : true,
								menuDisabled : true
							},
							columns : [new Ext.grid.RowNumberer({
												width : 35,
												header : "序号"
											}), this.sm(), {
										header : '登记编号',
										dataIndex : 'declareCode',
										width : 100,
										sortable : true
									},{
										header : '申报月份',
										dataIndex : 'declareDate',
										width : 100,
										sortable : true,
										renderer : function(value, cellmeta, record, rowIndex) {
											if (typeof(value) == 'undefined') {
												return;
											}
											var id = record.get("declareId");
											var status = record.get("status");
											var args = value.split('-');
											var amountSource = record.get('amountSource');//
											var costNum = record.get('costNum');
											return "<a href='javascript:void(0);' onclick=declareAction.showDetail('" + id + "','" + status + "','"+amountSource+"','"+costNum+"')>&nbsp;<font color=blue>"
														+ args[0] + "年" + args[1] + "月</font></a>";
										}
									}, {
										header : '状态',
										dataIndex : 'status',
										width : 60,
										sortable : true
									},{
										header : '项数',
										dataIndex : 'quantity',
										width : 50,
										hidden:true,
										sortable : true
									}, {
										header : '审批记录',
										dataIndex : '',
										renderer : function(value, cellmeta, record, rowIndex) {
											var id = record.get("declareId");
											var applicationStatus = record.get("status");
											// if(applicationStatus!="编制中"){
											return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
											// }
										},
										sortable : true
									}, {
										header : '金额(单位：元)',
										dataIndex : 'amount',
										width : 100,
										sortable : true
									}, {
										header : '资金来源',
										dataIndex : 'amountSource',
										width : 100,
										sortable : true
									}, {
										header : '费用编号',
										dataIndex : 'costNum',
										width : 100,
										sortable : true
									}, {
										header : '制表人',
										dataIndex : 'editor',
										width : 100,
										sortable : true
									}, {
										header : '最后修改时间',
										dataIndex : 'updateDate',
										width : 100,
										sortable : true
									}, {
										header : '需求单位',
										dataIndex : 'departmentId',
										width : 100,
										sortable : true
									}]
						});
				return cm;
			},
			tb : function() {
				var items = ['-', {
							text : '新建',
							iconCls : 'add1',
							disabled : privilegeValidate.addDDisable,
							handler : function() {

								if (declareGrid.status != null) {
									Ext.Msg.alert('提示', '未通过申报的不能使用新建功能！');
									return;
								}
								var win = new Ext.Window({
									id : 'declarMaterialWin',
									width : 300,
									title:"详细",	
									autoScroll:false,
									autoDestroy: true,
									items : [{
										xtype : 'form',
										id : 'declarMaterialForm',
										border : false,
										items : [{
											xtype : 'panel',
											layout : 'form',
											columnWidth : .25,
											border : false,
											labelWidth : 80,
						
											bodyStyle : 'padding:5px;',
											defaults : {
												anchor : '95%'
											},
											items : [{
												id : 'amountSource',
												xtype : 'combo',
												fieldLabel : "资金来源",
												emptyText : '请选择',
												triggerAction : 'all',
												store : [['自有费用','自有费用'],['项目费用','项目费用'],['公用笺','公用笺']],
												allowBlank : false,
												editable : false,
												blankText : '不能为空!'
											}, {
												id : 'costNum',
												xtype : 'textfield',
												fieldLabel : '费用编号'
											}]
										}]
									}],
									modal : true,
									border : true,
									bodyStyle:'background:#fff;',
									resizable: false,  
									buttonAlign : 'center',
									buttons : [{text:' 确定 ',
										handler: function(){
											var form = Ext.getCmp('declarMaterialForm');
											if (!form.getForm().isValid()) {return false;}
											DeclarationMaterial.param1 = form.getForm().findField('amountSource').getValue();
											DeclarationMaterial.param2 = form.getForm().findField('costNum').getValue();
											DeclarationMaterial.declarationContentGridPanel().show();
											win.close();
									}},{text:' 关闭 ',handler : function(){win.close()}}]
								});
								win.show();
								// declareDetailAction.add();
								// hd.investment.purchaseRequest.declareDetail.form.formPanel
								// var form =
								// Ext.getCmp('declareDetailUpdateForm');
								// form.getForm().loadRecord(records[0]);

							}
						}, '-', {
							text : '删除',
							iconCls : 'del1',
							disabled : privilegeValidate.delDDisable,
							handler : function() {
								declareAction.remove();
							}
						}, '-', {
							text : '提交审批',
							iconCls : 'icon-importTasks',
							disabled : privilegeValidate.sendDDisable,
							handler : function() {
								declareAction.submission();
							}
						}, '-', {
							text : '查询',
							iconCls : 'search1',
							handler : function() {
								declareAction.showQueryForm();
								if (declareGrid.status == null)
									Ext.getCmp("status").enable();
								else {
									Ext.getCmp("status").disable();
									Ext.getCmp("status").setRawValue('未通过');
								}
							}
						},'-',{
							disabled : privilegeValidate.exportDDisable,
		text : '导出',
		iconCls : 'icon-exportTasks',
		handler:function(){
				var records = Ext.getCmp('PurchaseRequestDeclareGridPanel').selectObj;
	
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要导出的记录！');
		return;
	}
	var str=""
	for ( var i = 0; i < records.length; i++) {
		if(i!=0){
			str+=",";
		}
		str+=records[i].get('declareId');
//		arr.push(records[i].get('declareId'));
//		if(records[i].get('status')!="编制中"){
//			Ext.Msg.alert('提示', '请选择编制中的信息！');
//				return;
//		}
	}
			 var inputs = '<input type="hidden" name="className" value="declare_DeclareRemote"/>'
				+ '<input type="hidden" name="declareid" value="'+str+'"/>' 
				+ '<input type="hidden" name="methodName" value="exportDeclareReportGridData"/>' 
				+ '<input type="hidden" name="fileName" value="申报记录报表"/>';
				$('<form action="../exportExcelServlet" method="post">'+inputs+'</form>')
					.appendTo('body').submit().remove();
		}
	}, '-', {
							text : '历史计划与合同导入',
							disabled : privilegeValidate.importDDisable,
							iconCls : 'Import',
							//hidden:getUserid()=="4201606"?false:true,
							handler : function() {
								declare.fileUploadForm();
							}
						}];
				return items;
			},
			getStore : function() {
				var proxy = new Ext.data.HttpProxy({
							url : '../JSON/declare_DeclareRemote.getDeclareVoGridData?d=' + new Date(),
							method : "POST"
						});
				var reader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'declareId'
						}, ['declareId', 'amount', 'createDate', 'declareCode', 'declareDate', 
						'departmentId', 'editor', 'status', 'updateDate',
						'amountSource','costNum','quantity']);

				var myStore = new Ext.data.Store({
							proxy : proxy,
							reader : reader,
							remoteSort : true
						});
				return myStore;
			},
			initComponent : function() {
				var self = this;
				if (self.config) {
					Ext.apply(this, self.config);
				} else {
					self.store = self.getStore();
					var config = {
						store : self.store, // 绑定数据源
						trackMouseOver : true, // 鼠标放到行上是否有痕迹
						loadMask : {
							msg : '正在装载数据...'
						},
						sm : self.sm(),
						cm : self.cm(),
						viewConfig : {
							enableRowBody : true,
							showPreview : true
						},
						stripeRows : true, // 相邻行的颜色是否有差别
						bbar : new Ext.PagingToolbar({ // 定义下方工作面板
							pageSize : 20,
							store : self.store,
							displayInfo : true,
							displayMsg : '当前行数{0} - {1} 共 {2} 行',
							emptyMsg : "未查询到数据"
						}),
						tbar : self.tb()
					}
					Ext.apply(this, config);
				}
				hd.investment.purchaseRequest.declare.grid.gridPanel.superclass.initComponent.call(this);
			}
		});
Ext.reg("hd.investment.purchaseRequest.declare.grid.gridPanel", hd.investment.purchaseRequest.declare.grid.gridPanel);

var declare={}
// 上传界面
declare.fileUploadForm = function() {
	var window = new Ext.Window({
				id : "buinessPlanFileUploadWind",
				width : 510,
//				height : 275,
				title : '历史计划与合同文件导入',
				modal : true,
				items : [
				{xtype:'panel',
				layout:'column',
				border:false,
				items:[new Ext.FormPanel({
					columnWidth:.5,
				border:false,
									padding : 5,
									buttonAlign : 'center',
									labelAlign : 'left',
									labelWidth : 75,
									frame : false,
									items : [/*{
												xtype : "textfield",
												id : 'userid',
												fieldLabel : '用户工号<font color=red>*</font>',
												value : 'jsjhy'
											},*/ {
												xtype : "textfield",
												id : 'vendorid',
												fieldLabel : '供应商编码<font color=red>*</font>',
												value : '701004'
											},  {
											    xtype : "textfield",
												id : 'declareName',
												fieldLabel : '申报记录名称<font color=red>*</font>',
												value : '历史申报记录'
											},{
												xtype : "datefield",
												fieldLabel : '生成日期',
												id : 'submitDate',
												format : 'Y-m-d',
												anchor : '90%',
												value : '2012-12-30'
											},new Ext.form.ComboBox({
												id:'importMethod',
		fieldLabel : '导入方式',
		typeAhead : true,// 必须项
		triggerAction : 'all',// 必须项
		//hideTrigger:true ,//true隐藏下拉箭头
		lazyRender : true,
		resizable : true,// 是否手动扩展大小,默认false
		mode : 'local',
		forceSelection : true,// 限制输入范围在可选择的文本内
		editable : false,// 不允许输入,只能选择文本列表
		anchor : '90%',
		store : new Ext.data.ArrayStore({
				fields : ['value',	'displayText'],
				data : [[1, '最新']/*,[2, '重复']*/]	
			}),
		valueField : 'value',
		value : 1,
		displayField : 'displayText',
		listeners:{
			select : function( combo, record, index ){
				if(combo.getValue()==2){//重复导入
				Ext.getCmp('declareid').enable();
				Ext.getCmp('userid').disable();
				Ext.getCmp('vendorid').disable();
				Ext.getCmp('submitDate').disable();
				Ext.getCmp('departmentid').disable();
				Ext.getCmp('vendorname').disable();
				}else{//从新导入
					Ext.getCmp('declareid').disable();
				Ext.getCmp('userid').enable();
				Ext.getCmp('vendorid').enable();
				Ext.getCmp('submitDate').enable();
				Ext.getCmp('departmentid').enable();
				Ext.getCmp('vendorname').enable();
				}
			}
		}
})]
								}),new Ext.FormPanel({
									columnWidth:.5,
									border:false,
									padding : 5,
									buttonAlign : 'center',
									labelAlign : 'left',
									labelWidth : 70,
									frame : false,
									items : [ /*{
												xtype : "textfield",
												id : 'departmentid',
												fieldLabel : '部门ID<font color=red>*</font>',
												value : '000001'
											},*/{
												xtype : "textfield",
												id : 'vendorname',
												fieldLabel : '供应商名称',
												value : '南昌市联信工具有限公司'
											}, {
											    xtype : "textfield",
												id : 'declarePlanName',
												fieldLabel : '申报计划名称<font color=red>*</font>',
												value : '历史申报计划'
											},new Ext.form.ComboBox({
														id : 'importType',
														// 作为FORM表单提交时的参数名,并且hiddenName!=id
														hiddenName : 'yn_life',// 创建一个新的控件,id=hiddenName
														fieldLabel : '文件类型',
														typeAhead : true,// 必须项
														triggerAction : 'all',// 必须项
														lazyRender : true,
														resizable : true,// 是否手动扩展大小,默认false
														mode : 'local',
														forceSelection : true,// 限制输入范围在可选择的文本内
														editable : false,// 不允许输入,只能选择文本列表
														anchor : '90%',
														store : new Ext.data.ArrayStore({
																	fields : ['value', 'displayText'],
																	data : [[2, '未完成计划'], [1, '未完成合同']]
																}),
														listeners : {
																'select' : function(combo,record,index){
																	if(record.get('value')==2){
																		Ext.getCmp('vendorid').disable();
																		Ext.getCmp('vendorname').disable();
																	}else{
																		Ext.getCmp('vendorid').enable();
																		Ext.getCmp('vendorname').enable();
																	}
																
																}
													    },
														valueField : 'value',
														value : 1,
														displayField : 'displayText'
													}),new Ext.form.ComboBox({
														id:'declareid',
														disabled:true,
           fieldLabel : '计划选择',  //UI标签名称
           //远程comboBox提交时,需指定hiddenName参数,否则传输的值不是value,而是text.
           hiddenName:'identity',//form提交时的参数名称,并id!=hiddenName
           allowBlank : false,  //是否允许为空
           mode : "remote",      //数据模式为远程模式, 也可不设置,即默认值也为remote
           triggerAction : 'all',  //显示所有下列数.必须指定为'all'
           anchor : '90%',
           emptyText:'请选择...',   //没有默认值时,显示的字符串
           store : new Ext.data.JsonStore({  //填充的数据
                url : "../JSON/declare_DeclareRemote.getComboBoxDataForDeclare?d="+new Date(),
                fields : new Ext.data.Record.create( ['text', 'value']),   //也可直接为["text","value"]
                root : "declare"
           }),
//           value:2,  //设置当前选中的值, 也可用作初始化时的默认值, 默认为空
           valueField : 'value',  //传送的值
           displayField : 'text'  //UI列表显示的文本
      })]
								})]
				}
				, new Ext.FormPanel({

									padding : 5,
									id : 'FileUploadForm',
									buttonAlign : 'center',
									labelAlign : 'left',
									fileUpload : true,
									labelWidth : 70,
									frame : false,
									items : [{
												xtype : "textfield",
												fieldLabel : '上传文件',
												name : 'file',
												inputType : 'file',
												id : 'file1',
												allowBlank : false
											}]
								})],
				buttons : [{
					text : '确定',
					handler : function() {// 文件格式后缀名验证
						var inform = Ext.getCmp('FileUploadForm');
						if (!inform.form.isValid())
							return;
						var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
						if (fileName.lastIndexOf('.') == -1) {
							Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
							return;
						}
						if (fileName.substr(fileName.lastIndexOf('.')) != '.xls') {
							Ext.Msg.alert('提示', '仅支持扩展名为.xls的Excel文件!');
							return;
						}

						//var userid = Ext.getCmp('userid').getValue();
						//var departmentid = Ext.getCmp('departmentid').getValue();
						var vendorid = Ext.getCmp('vendorid').getValue();
						var vendorname = encodeURI(Ext.getCmp('vendorname').getValue());
						var submitDate = Ext.getCmp('submitDate').getRawValue();// .getValue();
						var importType = Ext.getCmp('importType').getValue();
						var declareid=Ext.getCmp('declareid').getValue();
						var importMethod=Ext.getCmp('importMethod').getValue();
						var declareName=Ext.getCmp('declareName').getValue();
						var declarePlanName=Ext.getCmp('declarePlanName').getValue()
						inform.form.doAction('submit', {
									waitMsg : '正在上传数据，请稍候...',
									waitTitle : '提示',
									url : '../DeclareDetailImportUploadServlet?vendorid=' + vendorid + '&vendorname='+ vendorname +
									        '&submitDate=' + submitDate + '&importType=' + importType+"&declareid="+declareid+
									        "&importMethod="+importMethod+'&declareName='+declareName+'&declarePlanName='+declarePlanName,
									method : 'post',
									success : function(form, action) {// 成功提示，刷新计划大纲grid
										var showMessage = action.result.ImportExcelVo.returnMsg + '!';
										Ext.Msg.alert('提示', showMessage);
										form.reset();
										window.close();
										var grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');
										grid.getStore().baseParams = {
											start : 0,
											limit : 20
										};
										grid.store.load();
									},
									failure : function(form, action) {// 上传失败，错误信息反馈
										var showMessage = action.result.ImportExcelVo.returnMsg + '!';
										Ext.Msg.alert('提示', showMessage);
										form.reset();// 重置form
										window.close();// 关闭原窗口
									}

								});
					}
				}, {
					text : '取消',
					handler : function() {
						window.close();
					}
				}]
			});
	window.show();

}
//得到当前登录用户的用户名 
function getUserid(){
	var name;
	var str = document.cookie.split(";");
	for(var i=0;i<str.length;i++){
		//alert(str[i])
		if(str[i].indexOf("userid") != -1){
			name = str[i].replace("userid=","").trim();
			break;
		}
	}
	return name;
}