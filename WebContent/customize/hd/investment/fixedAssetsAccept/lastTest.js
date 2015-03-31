/**
 * 最终验收
 * @type 
 */
var lastTest={
	inputWidth:240
};

lastTest.init = function(acceptId){
	lastTest.acceptTaskMsg = new Ext.form.FormPanel({
		frame:true,
		border:true,
		style:'border:none;',
		buttonAlign:'center',
		items:[
			{
				xtype:'textfield',
				name:'lastTestNum',
				fieldLabel:'验收报告(<font color="red">*</font>)',
				width:lastTest.inputWidth,
				//校验是否为空
				allowBlank:false,
				blankText:'验收报告不能为空'
			},{
				xtype:'datefield',
				name:'lastTestTime',
				fieldLabel:'验收时间(<font color="red">*</font>)',
				format:'Y-m-d',
				width:lastTest.inputWidth,
				//校验是否为空
				allowBlank:false,
				blankText:'验收时间不能为空'
			},{
				xtype:'textarea',
				name:'lastTestRemark',
				fieldLabel:'验收情况',
				width:lastTest.inputWidth,
				maxLength:200, 
				maxLengthText:'最多只能输入200个字符。'
			}
		],
		buttons:[
			{
				text:'保存',
				id:'lastTestSave',
				handler:function(){
					//判断必填项是否有内容
					if(lastTest.acceptTaskMsg.getForm().isValid()){
						lastTest.acceptTaskMsg.getForm().submit({
							url:'../JSON/LastTestRemote.useLastTest',
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
								lastTest.win.close();
								
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
					lastTest.win.close();
				}
			}
		]
	});
	
	//判断是否已经存在内容
	Ext.Ajax.request({
		url:'../JSON/LastTestRemote.getLastTest',
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
				lastTest.acceptTaskMsg.getForm().findField('lastTestNum').setValue(result.lastTestNum);
				lastTest.acceptTaskMsg.getForm().findField('lastTestTime').setValue(result.lastTestTime);
				lastTest.acceptTaskMsg.getForm().findField('lastTestRemark').setValue(result.lastTestRemark);
				
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')==9)
					Ext.getCmp('lastTestSave').setDisabled(true);
			}
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptId:acceptId
		}
	});
	
	lastTest.win = new Ext.Window({
		title:'最终验收',
		width:400,
		minWidth:400,
		autoHeight:true,
		modal:true,
		items:[lastTest.acceptTaskMsg]
	});
	lastTest.win.show();
}