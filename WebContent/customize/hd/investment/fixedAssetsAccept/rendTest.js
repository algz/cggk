/**
 * 开箱验收
 * @type 
 */
var rendTest={
	inputWidth:120
};

rendTest.rendTestType = function(){
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
//		id:'rendTestTypeComboBox',
		name:'h_testBill',
		//用form提交时为了获取valueField的值，必须添加此标识，且不能和name的值相同
		hiddenName:'testBill',
		fieldLabel:'验收清单交接(<font color="red">*</font>)',
		store:store,
		valueField : "typeNum",
		displayField : "typeName",
		mode:'local',
		forceSelection : true,
		triggerAction : 'all',
		width:rendTest.inputWidth,
		//校验是否为空
		allowBlank:false,
		blankText:'“类别”为必填', 
		emptyText : '请选择...'
	});
	
	return selectTypeValue;
};

rendTest.init = function(acceptId){
	rendTest.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
		items:[
			{
				layout:'column',
				items:[
					{
						columnWidth:.98,
						layout:'column',
						items:[
							{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'datefield',
									name:'rendTestTime',
									fieldLabel:'开箱验收时间(<font color="red">*</font>)',
									format:'Y-m-d',
									width:rendTest.inputWidth,
									//校验是否为空
									allowBlank:false,
									blankText:'开箱验收时间不能为空'
								}]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'datefield',
									name:'testTime',
									fieldLabel:'验收时间(<font color="red">*</font>)',
									format:'Y-m-d',
									width:rendTest.inputWidth,
									//校验是否为空
									allowBlank:false,
									blankText:'验收时间不能为空'
								}]
							}
						]
					},{
						columnWidth:.98,
						layout:'form',
						items:[{
							xtype:'textarea',
							name:'rendTestRemark',
							fieldLabel:'开箱验收说明(<font color="red">*</font>)',
							width:rendTest.inputWidth*3.3,
							//校验是否为空
							allowBlank:false,
							blankText:'开箱验收说明不能为空',
							maxLength:200, 
							maxLengthText:'最多只能输入200个字符。'
						}]
					},{
						columnWidth:.98,
						layout:'form',
						items:[rendTest.rendTestType()]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				id:'rendTestSave',
				handler:function(){
					//判断必填项是否有内容
					if(rendTest.acceptTaskMsg.getForm().isValid()){
						rendTest.acceptTaskMsg.getForm().submit({
							url:'../JSON/RendTestRemote.useRendTest',
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
								rendTest.win.close();
								
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
					rendTest.win.close();
				}
			}
		]
	});
	
	//判断是否已经存在内容
	Ext.Ajax.request({
		url:'../JSON/RendTestRemote.getRendTest',
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
			//判断是否存在值
			if(result.success=='true'){
				rendTest.acceptTaskMsg.getForm().findField('rendTestTime').setValue(result.rendTestTime);
				rendTest.acceptTaskMsg.getForm().findField('testTime').setValue(result.testTime);
				rendTest.acceptTaskMsg.getForm().findField('rendTestRemark').setValue(result.rendTestRemark);
				rendTest.acceptTaskMsg.getForm().findField('testBill').setValue(result.testBill);
				
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')==9)
					Ext.getCmp('rendTestSave').setDisabled(true);
			}
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptId:acceptId
		}
	});
	
	rendTest.win = new Ext.Window({
		title:'开箱验收',
		width:600,
		minWidth:600,
		autoHeight:true,
		modal:true,
		items:[rendTest.acceptTaskMsg]
	});
	rendTest.win.show();
}