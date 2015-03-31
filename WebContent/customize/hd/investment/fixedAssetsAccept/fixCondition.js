/**
 * 安装条件准备
 * @type 
 */
var fixCondition={
	inputWidth:120,
	limit:6
};

fixCondition.fixConditionType = function(){
	var data = [
		['1','是'],
		['2','否']
	]
	var fields = ['typeNum','typeName']
	
	var store = new Ext.data.SimpleStore({
		autoLoad:true,
		data:data,
		fields:fields
	})
	var selectTypeValue = new Ext.form.ComboBox({
//		id:'fixConditionTypeComboBox',
		name:'h_fixConditionFlag',
		hiddenName:'fixConditionFlag',
		fieldLabel:'安装准备(<font color="red">*</font>)',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		width:fixCondition.inputWidth,
		//校验是否为空
		allowBlank:false,
		blankText:'“类别”为必填', 
		emptyText : '请选择...',
		listeners:{
			'select':function(){
				if(this.getValue()==2){
					Ext.getCmp('fixConditionSheBei').setDisabled(true);
					Ext.getCmp('fixConditionZhaoBiao').setDisabled(true);
					
					//赋值
					fixCondition.acceptTaskMsg.getForm().findField('assignTime').setValue('');
					fixCondition.acceptTaskMsg.getForm().findField('assignAchieveTime').setValue('');
				}
				if(this.getValue()==1){
					Ext.getCmp('fixConditionSheBei').setDisabled(false);
					Ext.getCmp('fixConditionZhaoBiao').setDisabled(false);
					
					//赋值
					fixCondition.acceptTaskMsg.getForm().findField('assignTime').setValue(new Date());
					fixCondition.acceptTaskMsg.getForm().findField('assignAchieveTime').setValue(new Date());
				}
			}
		}
	});
	
	return selectTypeValue;
};

/**
 * 查找部门信息
 * @return {}
 */
fixCondition.selectDepartment = function(){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/FixConditionRemote.getDepList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'depcode'
			}, {
				name : 'departmentName'
			} 
			])
	});
	
	var selectDepartmentValue = new Ext.form.ComboBox({
		id:'selectDepartmentValueComboBox',
		name:'h_depcode',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'depcode',
		fieldLabel:'指派',
		store:store,
		valueField : "depcode",
		displayField : "departmentName",
		mode:'remote',
		//每页显示数目
		pageSize:fixCondition.limit,
		forceSelection : true,
		triggerAction : 'all',
		width:fixCondition.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:fixCondition.inputWidth*2,
		//校验是否为空
//		allowBlank:false,
//		blankText:'必须指派单位！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:fixCondition.limit
					}
				});
				this.expand();
			}
		}
	});
	//默认加载数据
//	store.baseParams.inputValue=selectDepartmentValue.getRawValue();
//				store.load({
//					params:{
//						start:0,
//						limit:fixCondition.limit
//					}
//				});
	
	return selectDepartmentValue;
};

/**
 * 查找供应商信息
 * @return {}
 */
fixCondition.selectVendor = function(){
	
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : "../JSON/FixConditionRemote.getVendorList",
			method:'POST'
		}),
		reader : new Ext.data.JsonReader({
			totalProperty : 'totalProperty',
			root : 'results'
			}, 
			[{
				name : 'vendorId'
			}, {
				name : 'vendorName'
			} 
			])
	});
	
	var selectVendorValue = new Ext.form.ComboBox({
		id:'selectVendorValueComboBox',
		name:'h_vendorId',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'vendorId',
		fieldLabel:'中标单位',
		store:store,
		valueField : "vendorId",
		displayField : "vendorName",
		mode:'remote',
		//每页显示数目
		pageSize:fixCondition.limit,
		//值为true时将限定选中的值为列表中的值
		forceSelection : true,
		triggerAction : 'all',
		width:fixCondition.inputWidth,
		emptyText : '请选择...',
		//弹出选择添加缩放按钮
		resizable :true,
		//控制下拉列表的宽度
		minListWidth:fixCondition.inputWidth*2,
		//校验是否为空
//		allowBlank:false,
//		blankText:'必须指派中标单位！', 
		listeners : {
			'keyup':function(){
				store.baseParams.inputValue=this.getRawValue();
				store.load({
					params:{
						start:0,
						limit:fixCondition.limit
					}
				});
				this.expand();
			}
		}
	});
	//默认加载数据
//	store.baseParams.inputValue=selectVendorValue.getRawValue();
//	store.load({
//		params:{
//			start:0,
//			limit:fixCondition.limit
//		}
//	});
	
	return selectVendorValue;
};

fixCondition.init = function(acceptId){
	
	fixCondition.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
		items:[
			{
				xtype:'fieldset',
				title:'安装准备',
				items:[fixCondition.fixConditionType()]
			},
			{
				xtype:'fieldset',
				id:'fixConditionSheBei',
				disabled:true,
				maskDisabled:true,
				title:'设备公用签',
				items:[
					{
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'form',
								items:[fixCondition.selectDepartment()]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[{
											xtype:'datefield',
											name:'assignTime',
											fieldLabel:'指派时间',
											format:'Y-m-d',
											//默认值
//											value:new Date(),
											readOnly:true,
											width:fixCondition.inputWidth
										}]
									},{
										columnWidth:.49,
										layout:'form',
										items:[{
											xtype:'datefield',
											name:'assignAchieveTime',
											fieldLabel:'完成时间',
											format:'Y-m-d',
											readOnly:true,
											width:fixCondition.inputWidth
										}]
									}
								]
							},{
								columnWidth:.98,
								layout:'form',
								items:[{
									xtype:'textarea',
									name:'fixConditionText',
									fieldLabel:'说明',
									width:fixCondition.inputWidth*3.3,
									maxLength:200, 
									maxLengthText:'最多只能输入200个字符。'
								}]
							}
						]
					}
				]
			},{
				xtype:'fieldset',
				id:'fixConditionZhaoBiao',
				disabled:true,
				maskDisabled:true,
				title:'招标',
				items:[
					{
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.98,
										layout:'form',
										items:[fixCondition.selectVendor()]
									}
								]
							},{
								columnWidth:.98,
								layout:'column',
								items:[
									{
										columnWidth:.49,
										layout:'form',
										items:[{
											xtype:'datefield',
											name:'tenderStartTime',
											fieldLabel:'招标时间',
											format:'Y-m-d',
											//校验是否为空
//											allowBlank:false,
//											blankText:'招标开始时间必选！',
											width:fixCondition.inputWidth
										}]
									},{
										columnWidth:.49,
										layout:'form',
										items:[{
											xtype:'datefield',
											name:'tenderEndTime',
											fieldLabel:'至',
											format:'Y-m-d',
											//校验是否为空
//											allowBlank:false,
//											blankText:'招标结束时间必选！',
											width:fixCondition.inputWidth
										}]
									}
								]
							}
						]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				id:'fixConditionSaveBtn',
				handler:function(){
					//判断必填项是否有内容
					if(fixCondition.acceptTaskMsg.getForm().isValid()){
						fixCondition.acceptTaskMsg.getForm().submit({
							url:'../JSON/FixConditionRemote.insertFixCondition',
							method:'POST',
							failure:function(form,action){
								Ext.MessageBox.show({
									title : '提示信息',
									msg : '获取后台数据失败！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							},
							success:function(form,action){
//								alert(action.response.responseText);
								fixCondition.win.close();
								
								//刷新表格数据操作
								var acceptTaskGridStroe = Ext.getCmp('acceptTaskGrid').store
								//起始数
								var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
								//每页显示总数
								var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
								//添加默认参数
								acceptTaskGridStroe.baseParams.acceptNum=acceptTask.selectNum.getValue();
								acceptTaskGridStroe.baseParams.startTime=acceptTask.startTime.getValue();
								acceptTaskGridStroe.baseParams.endTime=acceptTask.endTime.getValue();
								acceptTaskGridStroe.load({
									params:{
										start:start,
										limit:limit
									}
								});
							},
							params:{
								acceptId:acceptId
							}
						});
					}
				}
			},{
				text:'取消',
				handler:function(){
					fixCondition.win.close();
				}
			}
		]
	});
	
	//判断是否已经存在内容
	Ext.Ajax.request({
		url:'../JSON/FixConditionRemote.getFixCondition',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			var store1 = Ext.getCmp('selectDepartmentValueComboBox').store;
			var store2 = Ext.getCmp('selectVendorValueComboBox').store;
			//判断是否已经存在
			if(result.success=='true'){
				//已经存在，给各输入框赋值
				fixCondition.acceptTaskMsg.getForm().findField('fixConditionFlag').setValue(result.fixConditionFlag);
				fixCondition.acceptTaskMsg.getForm().findField('assignTime').setValue(result.assignTime);
				fixCondition.acceptTaskMsg.getForm().findField('assignAchieveTime').setValue(result.assignAchieveTime);
				fixCondition.acceptTaskMsg.getForm().findField('fixConditionText').setValue(result.fixConditionText);
				fixCondition.acceptTaskMsg.getForm().findField('tenderStartTime').setValue(result.tenderStartTime);
				fixCondition.acceptTaskMsg.getForm().findField('tenderEndTime').setValue(result.tenderEndTime);
				
				//默认加载一次下拉列表（加载指派）
//				store1.baseParams.inputValue=Ext.getCmp('selectDepartmentValueComboBox').getRawValue();
				store1.load({
					params:{
						start:0,
						limit:fixCondition.limit,
						inputValueNum:result.depcode
					},
					//当加载完成后执行赋值操作
					callback:function(){
						fixCondition.acceptTaskMsg.getForm().findField('depcode').setValue(result.depcode);
					}
				});
				//默认加载一次下拉列表（加载供应商）
//				store2.baseParams.inputValue=Ext.getCmp('selectVendorValueComboBox').getRawValue();
				store2.load({
					params:{
						start:0,
						limit:fixCondition.limit,
						inputValueNum:result.vendorId
					},
					//当加载完成后执行赋值操作
					callback:function(){
						fixCondition.acceptTaskMsg.getForm().findField('vendorId').setValue(result.vendorId);
					}
				});
				
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')==9)
					Ext.getCmp('fixConditionSaveBtn').setDisabled(true);
				
			}else{
				//默认加载一次下拉列表（加载指派）
				store1.baseParams.inputValue=Ext.getCmp('selectDepartmentValueComboBox').getRawValue();
				store1.load({
					params:{
						start:0,
						limit:fixCondition.limit
					}
				});
				//默认加载一次下拉列表（加载供应商）
				store2.baseParams.inputValue=Ext.getCmp('selectVendorValueComboBox').getRawValue();
				store2.load({
					params:{
						start:0,
						limit:fixCondition.limit
					}
				});
				
//				fixCondition.acceptTaskMsg.getForm().findField('assignTime').setValue(new Date());
//				fixCondition.acceptTaskMsg.getForm().findField('assignAchieveTime').setValue(new Date());
			}
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptId:acceptId
		}
	});
	
	fixCondition.win = new Ext.Window({
		title:'安装准备',
		width:600,
		minWidth:600,
		autoHeight:true,
		modal:true,
		items:[fixCondition.acceptTaskMsg]
	});
	fixCondition.win.show();
}