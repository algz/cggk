/**
 * 预验收
 * @type 
 */
var beforehandTest = {
	inputWidth:120
};

beforehandTest.init = function(acceptId){
	beforehandTest.acceptTaskMsg = new Ext.form.FormPanel({
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
								columnWidth:.98,
								layout:'form',
								items:[{
									xtype:'textarea',
									fieldLabel:'预验收报告(<font color="red">*</font>)',
									name:'beforehandTestText',
									width:beforehandTest.inputWidth*3.3,
									//校验是否为空
									allowBlank:false,
									blankText:'预验收报告不能为空！',
									maxLength:200, 
									maxLengthText:'最多只能输入200个字符。'
								}]
							}
						]
					},{
						columnWidth:.98,
						layout:'column',
						items:[
							{
								columnWidth:.98,
								layout:'form',
								items:[{
									xtype:'textarea',
									name:'beforehandTestPeopel',
									fieldLabel:'预验收人员(<font color="red">*</font>)',
									allowBlank:false,
									blankText:'预验收人员信息不能为空！',
									width:beforehandTest.inputWidth*3.3,
									maxLength:50, 
									maxLengthText:'最多只能输入50个字符。'
								}]
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
									name:'beforehandTestStartTime',
									fieldLabel:'预验收时间(<font color="red">*</font>)',
									format:'Y-m-d',
									allowBlank:false,
									blankText:'预验收时间不能为空！',
									width:beforehandTest.inputWidth
								}]
							},{
								columnWidth:.49,
								layout:'form',
								items:[{
									xtype:'datefield',
									name:'beforehandTestLastTime',
									fieldLabel:'至',
									format:'Y-m-d',
									allowBlank:false,
									blankText:'预验收时间不能为空！',
									width:beforehandTest.inputWidth
								}]
							}
						]
					}
				]
			}
		],
		buttons:[
			{
				text:'保存',
				id:'beforehandTestSaveBtn',
				handler:function(){
					//判断必填项是否有内容
					if(beforehandTest.acceptTaskMsg.getForm().isValid()){
						beforehandTest.acceptTaskMsg.getForm().submit({
							url:'../JSON/BeforehandTestRemote.insertBeforehandTest',
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
								beforehandTest.win.close();
								
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
					beforehandTest.win.close();
				}
			}
		]
	});
	
	//判断是否已经存在内容
	Ext.Ajax.request({
		url:'../JSON/BeforehandTestRemote.estimateBeforehandTest',
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
			//判断是否已经存在
			if(result.success=='true'){
				//已经存在，给各输入框赋值
				beforehandTest.acceptTaskMsg.getForm().findField('beforehandTestText').setValue(result.beforehandTestText);
				beforehandTest.acceptTaskMsg.getForm().findField('beforehandTestPeopel').setValue(result.beforehandTestPeopel);
				beforehandTest.acceptTaskMsg.getForm().findField('beforehandTestStartTime').setValue(result.beforehandTestStartTime);
				beforehandTest.acceptTaskMsg.getForm().findField('beforehandTestLastTime').setValue(result.beforehandTestLastTime);
				
				var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
				//当为完成状态时，“保存”按钮不可用
				if(records.length==1&&records[0].get('acceptState')==9)
					Ext.getCmp('beforehandTestSaveBtn').setDisabled(true);
			}
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptId:acceptId
		}
	});
	
	beforehandTest.win = new Ext.Window({
		title:'预验收',
		width:600,
		minWidth:600,
		autoHeight:true,
		modal:true,
		items:[beforehandTest.acceptTaskMsg]
	});
	beforehandTest.win.show();
}