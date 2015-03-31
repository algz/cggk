var refusedtoappoint={}
refusedtoappoint.init=function(taskid)
{
var appVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
appVo.setTaskid(taskid);
Seam.Component.getInstance("mytask_MyTaskRemote").getTaskById(appVo,refusedtoappoint.openwindows);	
}

refusedtoappoint.openwindows=function(value)
{
  if (!refusedtoappoint.addDialog){	
  	    refusedtoappoint.refusedtoappointfrom=refusedtoappoint.from(value);
		tlework.addHtml(tlework.divHtml,'refusedtoappoint');			//动态生成需要绑定的div
		refusedtoappoint.addDialog = new Ext.Window({ 				//创建对话框
		el:'refusedtoappoint',
		title: ''+getResource('resourceParam1490')+'',
		modal: true,
		layout:'fit',
		width:400,
		height:250,
		closeAction:'hide',
		plain: false,
		items: [refusedtoappoint.refusedtoappointfrom]						//将面板绑定到对话框
		});
	}
	refusedtoappoint.addDialog.show();								//显示对话框
	refusedtoappoint.addDialog.on("hide",function(){
		refusedtoappoint.addDialog.close();
		refusedtoappoint.addDialog.destroy();		
		refusedtoappoint.addDialog = null;
		
	});
  
}

refusedtoappoint.from=function(value)
{
	Ext.QuickTips.init();
   var form1= new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
		{
				fieldLabel: ''+getResource('resourceParam1491')+'',		//文本框
				name: 'chargeddepid',
				id:'chargeddepid',
				anchor : '95%',
				value:value.getFanwei(),
				disabled:true
			},
			{
				fieldLabel: ''+getResource('resourceParam1493')+'',		//文本框
				name: 'userid',
				id:'userid',
				anchor : '95%',
				value:value.getTruename(),
				disabled:true
			},
			{	xtype : 'textarea',
		    	fieldLabel : ''+getResource('resourceParam1492')+'',
				labelSeparator : '：',
				id : 'messagebody',
				name : 'messagebody',
				/**
				 * bug编号1076 wangyf
				 * bug信息：在我的任务界面拒绝委派任务时系统弹出的拒绝信息对话框默认就判断拒绝原因为空输入值非法
				 * 2011-06-09 10：47
				 */
//				value : "",
				allowBlank:false,
				emptyText : '请输入拒绝原因...',
				invalidText  : '请输入拒绝原因！',
				anchor : '95%',
				height : 110,
				maxLength : 500,
				maxLengthText : ''+getResource('resourceParam1487')+''
			}],
				buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(form1.form.isValid()){
					var appVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
                        appVo.setTaskid(value.getTaskid());
                        appVo.setTasknotes(form1.getForm().findField("messagebody").getValue());
						Seam.Component.getInstance("TaskUser_TaskUserRemote").nayupdate(appVo,
							function(reslut) {
								if (reslut == "true") {
									refusedtoappoint.addDialog.hide();
									mytaskMain.grid.getStore().reload();
								} else {
									Ext.MessageBox.show({
												title : ''+getResource('resourceParam587')+'',
												msg : ''+getResource('resourceParam1488')+'',
												minWidth : 250,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
								}
							});
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//privAdd.privform.form.reset();	//表单重置
					refusedtoappoint.addDialog.hide();
					}
			}]	
     });	
     return form1;
}
