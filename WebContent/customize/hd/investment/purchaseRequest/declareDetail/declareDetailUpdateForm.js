Ext.ns("hd.investment.purchaseRequest.declareDetail.form");


/**
 * 新增、编辑-采购申报明细Form
 * 
 * @class hd.investment.purchaseRequest.declareDetail.form.formPanel
 * @extends Ext.form.FormPanel
 */
hd.investment.purchaseRequest.declareDetail.form.formPanel = Ext.extend(
		Ext.form.FormPanel, {
			padding : 5,
			frame : false,
			fileUpload : true,
			initComponent : function() {
				Ext.applyIf(this, {
					items : [{
								fieldLabel : '物资名称',
								xtype : 'textfield',
								id : "materialItemName",
								name : 'materialItemName',
								anchor : '95%',
								allowBlank : false,
								listeners : {
									focus : function(field) {
										declarationMaterial.getMaterialWin()
												.show();
									}
								}
							},/*
								 * { id : "materialItemName", fieldLabel : '<font
								 * color=red>*</font>物资名称', name :
								 * 'materialItemName', allowBlank : false,
								 * anchor : '95%', xtype : 'combo', displayField :
								 * 'singerName', valueField : 'id', store : new
								 * Ext.data.Store({ proxy : new
								 * Ext.data.HttpProxy({ url :
								 * '../JSON/material_MaterialRemote.getMaterialsByCondition?d=' +
								 * new Date(), method : "POST" }), reader : new
								 * Ext.data.JsonReader({ root : 'results',
								 * totalProperty : 'totalProperty', id :
								 * 'materialid' }, ['materialid',
								 * 'materialitemcode', 'materialItemName',
								 * 'demension', 'technicCondition',
								 * 'materialStandard']) }), mode : 'remote',
								 * triggerAction : 'all', minChars : 2, pageSize :
								 * 10, tpl : new Ext.XTemplate( '<tpl for="."><div
								 * class="search-item">', '<h3><span>计量单位:{demension}<br />规格型号:{materialStandard}</span>物料编码:{materialitemcode}
								 * 物料名称:{materialItemName}</h3>',
								 * '技术条件:{technicCondition}', '</div></tpl>'),
								 * queryParam : 'materialItemName', // typeAhead :
								 * true, displayField : 'title', loadingText :
								 * 'Searching...', itemSelector :
								 * 'div.search-item', listeners : { select :
								 * function(combo, record, index) {
								 * Ext.getCmp('materialid').setValue(record
								 * .get('materialid'));
								 * Ext.getCmp('materialitemcode').setValue(record
								 * .get('materialitemcode'));
								 * Ext.getCmp('materialItemName').setValue(record
								 * .get('materialItemName'));
								 * Ext.getCmp('demension').setValue(record
								 * .get('demension'));
								 * Ext.getCmp('materialStandard').setValue(record
								 * .get('materialStandard'));
								 * Ext.getCmp('technicCondition').setValue(record
								 * .get('technicCondition')); } } },
								 */{
								layout : 'column',
								border : false,
								defaults : {
									border : false,
									labelWidth : 100,
									columnWidth : 1
								},
								items : [{
									columnWidth : .5,
									border : false,
									layout : 'form',
									items : [{
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
											}, {
											id : 'desingnation',
											fieldLabel : '物资牌号',
											xtype : 'textfield',
											name : 'desingnation',
											readOnly : true,
											anchor : '95%'
										}, {
												id : 'materialStandard',
												fieldLabel : '规格型号',
												xtype : 'textfield',
												name : 'materialStandard',
												readOnly : true,
												anchor : '95%'
											}, {
												id:'materialCatalogName',
												fieldLabel : '物资类别',
												xtype : 'textfield',
												name : 'materialCatalogName',
												readOnly : true,
												anchor : '95%'//,
												//xtype : 'hd.investment.purchaseRequest.declareDetail.form.mCNameCombo'
											}, {
												fieldLabel : '<font color=red>*</font>数量',
												xtype : 'numberfield',
												id:'quantity',
												name : 'quantity',
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
										}
//											, {
//												fieldLabel : '<font color=red>*</font>报告类型',
//												allowBlank : false,
//												xtype : 'hd.investment.purchaseRequest.declareDetail.form.reportTypeCombo'
//											}
											]
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
											}, {
												id : 'taskno',
												fieldLabel : '任务编号',
												xtype : 'textfield',
												name : 'taskno',
												anchor : '95%'
											}, {
												fieldLabel : '<font color=red>*</font>采购用途',
												allowBlank : false,
												xtype : 'hd.investment.purchaseRequest.declareDetail.form.purchasedUseCombo'
											},{
											fieldLabel : '计划单价',
											xtype : 'numberfield',
											id : 'referencePrice',
											name : 'referencePrice',
											disabled : true,
											anchor : '95%'
										}, {
												fieldLabel : '资金预算',
												xtype : 'numberfield',
												id:'amount',
												name : 'amount',
												decimalPrecision : 4,// 小数位数
												maxLength : 20,// 最大长度
												maxLengthText : '不能超过10个字符，请重新输入！',
												maxValue : 999999999,// 最大值
//												allowBlank : false,// 是否允许非空
//												allowBlank : false,
//												maxLength : 12,
//												maxLengthText : '不能超过15个字符，请重新输入！',
//												allowDecimals : true,// 是否允许输入小数
//												decimalPrecision : 3,// 小数点后面允许的位数多余的位数会自动四舍五入,配合allowDecimals
//												// :true一起使用,否则没意义
												anchor : '95%'
											}, {
												fieldLabel : '<font color=red>*</font>采购类型',
												allowBlank : false,
												xtype : 'hd.investment.purchaseRequest.declareDetail.form.declareTypeCombo'
											},{
											fieldLabel : '联系电话',
											id : "contactTelephone",
											xtype : 'textfield',
											anchor : '95%'
										}
//											, {
//												xtype : 'fileuploadfield',
//												id : 'form-file',
//												fieldLabel : '<font color=red>*</font>报告文件',
//												name : 'fileName',
//												anchor : '90%',
//												width : '330',
//												buttonText : '浏览...',
//												allowBlank : false,
//												blankText : '可行性/需求报告不能为空！'
//											}, {
//												xtype : 'textfield',
//												name : 'fileId',
//												hidden : true
//											}
											]
								}]
							}]
				});
				hd.investment.purchaseRequest.declareDetail.form.formPanel.superclass.initComponent
						.call(this);
			}
		});

Ext.reg("hd.investment.purchaseRequest.declareDetail.form.formPanel",
		hd.investment.purchaseRequest.declareDetail.form.formPanel);

var mCNameStore = new Ext.data.SimpleStore({
			fields : ['id', 'flag'],
			data : [['直接用料', '直接用料'],['间接用料', '间接用料']
//			        ['航空成附件修理', '航空成附件修理'], ['物流运输', '物流运输'],
//					['土建', '土建'], ['机电设备', '机电设备'], ['车辆', '车辆'],
//					['电脑或电脑附件', '电脑或电脑附件'], ['土建或设备大修', '土建或设备大修'],
//					['常用礼品', '常用礼品'], ['办公用品、耗材', '办公用品、耗材'],
//					['节能用品、能源用品', '节能用品、能源用品'], ['劳保用品', '劳保用品'],
//					['工装工具(货架类)', '工装工具(货架类)'], ['原煤', '原煤'], ['木材', '木材'],
//					['防暑药品、清凉饮料', '防暑药品、清凉饮料'], ['切削液、润滑液', '切削液、润滑液'],
//					['数字电视改造', '数字电视改造']
					]
		});

//mCNameCombo = Ext.extend(Ext.form.ComboBox, {
//			name : 'materialCatalogName',
//			anchor : '95%',
//			store : mCNameStore,
//			triggerAction : 'all',
//			valueField : 'id',
//			displayField : 'flag',
//			mode : 'local',
//			editable : false,
//			initComponent : function() {
//				mCNameCombo.superclass.initComponent.call(this);
//			}
//		});

//Ext.reg("hd.investment.purchaseRequest.declareDetail.form.mCNameCombo",
//		mCNameCombo);

var purchasedUseStore = new Ext.data.SimpleStore({
			fields : ['id', 'flag'],
			data : [['批产用（备注机型）', '批产用（备注机型）'], ['科研用（备注项目）', '科研用（备注项目）'],
					['生产准备', '生产准备'], ['办公耗材', '办公耗材'], ['生产补料', '生产补料'],
					['备件（备注型号）', '备件（备注型号）'], ['试验用（备注机型或项目）', '试验用（备注机型或项目）'],
					['工装用（备注具体项目）', '工装用（备注具体项目）'], ['典型试飞', '典型试飞'],
					['技改大修', '技改大修'], ['日常管理（备注具体用途）', '日常管理（备注具体用途）'],
					['其他', '其他']]
		});

purchasedUseCombo = Ext.extend(Ext.form.ComboBox, {
			name : 'use',
			anchor : '95%',
			store : purchasedUseStore,
			triggerAction : 'all',
			valueField : 'id',
			displayField : 'flag',
			forceSelection : true,
			editable : false,
			mode : 'local',
			initComponent : function() {
				purchasedUseCombo.superclass.initComponent.call(this);
			}
		});

Ext.reg("hd.investment.purchaseRequest.declareDetail.form.purchasedUseCombo",
		purchasedUseCombo);

var declareTypeStore = new Ext.data.SimpleStore({
			fields : ['id', 'flag'],
			data : [['1', '计划内'], ['2', '应急'], ['3', '非应急']]
		});

declareTypeCombo = Ext.extend(Ext.form.ComboBox, {
			name : 'declareTypeName',
			anchor : '95%',
			store : declareTypeStore,
			triggerAction : 'all',
			hiddenName : 'declareType',
			valueField : 'id',
			displayField : 'flag',
			forceSelection : true,
			editable : false,
			mode : 'local',
			initComponent : function() {
				declareTypeCombo.superclass.initComponent.call(this);
			}
		});

Ext.reg("hd.investment.purchaseRequest.declareDetail.form.declareTypeCombo",
		declareTypeCombo);

var reportTypeStore = new Ext.data.SimpleStore({
			fields : ['id', 'flag'],
			data : [['可行性报告', '可行性报告'], ['需求报告', '需求报告'], ['申报依据', '申报依据']]
		});

reportTypeCombo = Ext.extend(Ext.form.ComboBox, {
			name : 'reportType',
			anchor : '95%',
			store : reportTypeStore,
			triggerAction : 'all',
			valueField : 'id',
			displayField : 'flag',
			forceSelection : true,
			editable : false,
			mode : 'local',
			initComponent : function() {
				reportTypeCombo.superclass.initComponent.call(this);
			}
		});

Ext.reg("hd.investment.purchaseRequest.declareDetail.form.reportTypeCombo",
		reportTypeCombo);

// **********************************8

Ext.ns("declarationMaterial")
/**
 * 申报计划--新建--新增申报记录列表 新增、编辑-采购申报物资记录
 * 
 * @class declarationMaterial.materialWin
 * @extends Ext.Window
 */

declarationMaterial.materialWin = Ext.extend(Ext.Window, {
	width : 600,
	height : 320,
	title : '新增/修改记录详情',
	layout : 'fit',
	returnValue : '',// 返回值
	modal : true, // 遮蔽其他组件
	buttonClick : function() {
		
		var self = this;

		var form = Ext.getCmp("declarationMaterialFormPanel").getForm();
		if (!form.isValid()) {
			return false;
		}
		var value = form.getValues();
		var store = Ext.getCmp("materialGrid").getStore();
		var win = Ext.getCmp('addDeclarationMaterial');
//		return alert(value.use.replace(/[(][\s\S]*[)]{1}/,"（"+value.remark+"）"));
		if (win != null) {
			// 新增
			var recordType = store.recordType;
			var record = new recordType({
						materialid : value.materialid,
						materialitemcode : value.materialitemcode,// 物资编号
						materialItemName : value.materialItemName,// 物资名称
						materialStandard : value.materialStandard,// 规格型号
						materialCatalogName:value.materialCatalogName,//物资类别名称
						demension : value.demension,// 单位
						technicCondition : value.technicCondition,// 技术条件
						quantity : value.quantity,// 数量
						useDate : Date.parseDate(value.useDate, "Y-m-d"),// 使用时间
						use : value.use.replace(/[(][\s\S]*[)]{1}/,value.remark),// 采购用途+备注机型
						amount : value.amount,// 资金预算
						declareTypeName : value.declareTypeName,// 采购类型
						taskno:value.taskno,//任务编号
						remark:value.remark,//备注
						contactPerson:value.contactPerson,
						contactTelephone:value.contactTelephone
//						reportType : '',// 报告类型
//						fileName : ''// 上传的文件名
					})
			store.insert(0, record)
		} else {
			// 修改
			var rec = Ext.getCmp("materialGrid").getSelectionModel()
					.getSelected();
			rec.set('materialid', value.materialid); 
			rec.set('materialitemcode', value.materialitemcode);
			rec.set('materialItemName', value.materialItemName);
			rec.set('materialStandard', value.materialStandard);
			rec.set('materialCatalogName', value.materialCatalogName);
			rec.set('demension', value.demension);
			rec.set('technicCondition', value.technicCondition);
			rec.set('quantity', value.quantity);
			rec.set('useDate', Date.parseDate(value.useDate, "Y-m-d"));
			rec.set('use', value.use);
			rec.set('amount', value.amount);
			rec.set('declareTypeName', value.declareTypeName);
			rec.set('taskno',value.taskno);
            rec.set('remark',value.remark);
            rec.set('contactPerson',value.contactPerson);
            rec.set('contactTelephone',value.contactTelephone);
						
		}
		this.close();
		// declareDetailAction.save(self,true);

	},
	initComponent : function() {
		var self = this;
		Ext.applyIf(this, {
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
									declarationMaterial.getMaterialWin().show();
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
										}, {
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
											name : 'quantity',
											id : 'quantity',
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
										    xtype : 'hd.investment.purchaseRequest.declareDetail.form.purchasedUseCombo',
										    fieldLabel : '<font color=red>*</font>采购用途',
											allowBlank : false/*,
											listeners:{
												select : function(combo,record,index ){
                                                    var value=record.get('id')
													if(value.indexOf('备注')>0){
														//显示
														Ext.getCmp('blankfield').setVisible(true);
														Ext.getCmp('blankfield').getEl().up('.x-form-item').setDisplayed(true);  
														Ext.getCmp('remark').setVisible(true);
														Ext.getCmp('remark').getEl().up('.x-form-item').setDisplayed(true);  
													}else{
														//隐藏
														Ext.getCmp('blankfield').setVisible(false);   
                                                        Ext.getCmp('blankfield').getEl().up('.x-form-item').setDisplayed(false); 
														Ext.getCmp('remark').setVisible(false);   
                                                        Ext.getCmp('remark').getEl().up('.x-form-item').setDisplayed(false); 
													}
												}
											}*/
										},/*{
											fieldLabel : '<font color=red>*</font>备注',
											id : "remark",
											xtype : 'textfield',
											anchor : '95%',
											listeners:{
												render:function(obj){
														Ext.getCmp('blankfield').setVisible(false);   
                                                        Ext.getCmp('blankfield').getEl().up('.x-form-item').setDisplayed(false); 
														obj.setVisible(false);   
                                                        obj.getEl().up('.x-form-item').setDisplayed(false); 
												}
											}
										},*/ 
										{
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
										}, new Ext.form.ComboBox({
											name : 'declareTypeName',
											allowBlank : false,
											fieldLabel : '<font color=red>*</font>采购类型',
											anchor : '95%',
											store : new Ext.data.SimpleStore({
														fields : ['id', 'flag'],
														data : [['计划内', '计划内'],
																['应急', '应急'],
																['非应急', '非应急']]
													}),
											triggerAction : 'all',
											hiddenName : 'declareTypeName',
											valueField : 'id',
											displayField : 'flag',
											forceSelection : true,
											editable : false,
											mode : 'local'
										}),{
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
			}]
		});

		this.fbar = {
			xtype : 'toolbar',
			items : [{
						text : ' 确定 ',
						handler : function() {
							self.buttonClick()
						}
					}, {
						text : ' 取消 ',
						handler : function() {
							self.close();
						}
					}]
		}
		declarationMaterial.materialWin.superclass.initComponent.call(this);
	}
});
Ext.reg('declarationMaterial.materialWin', declarationMaterial.materialWin);

/*
 * 获取物资列表列表
 */
declarationMaterial.getMaterialWin = function() {
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
			},{
				header : '技术条件',
				dataIndex : 'technicCondition',
				width : 100,
				sortable : true
			}, {
				header : '单位',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			}]);
	var toolbar = ['-', {
				text : '查询',
				iconCls : 'search1',
				handler : function() {
					declarationMaterial.getSearchForm('MaterialGridPanelId1')
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
}

declarationMaterial.getSearchForm = function(name) {
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
}


