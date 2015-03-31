
/**
 * 修改任务状态
 */

var statusUpdate = {addDialog:null,statusform:null,statuss:null};

/**
 * 修改操作
 */
statusUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam1825')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	statusUpdate.statussDate();
};

/**
 * 生成修改任务状态表单面板
 */
statusUpdate.getstatusform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'taskstatusid',
				width:175,
				value:myGrid.row.get('taskstatusid')
			},
			{	fieldLabel: ''+getResource('resourceParam1819')+'',		//文本框
				name: 'taskstatusname',
				width:175,
				blankText:''+getResource('resourceParam1818')+'',
				maxLength : 20,
				maxLengthText :''+getResource('resourceParam739')+''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam739')+''+getResource('resourceParam1002')+'',
				value:myGrid.row.get('taskstatusname'),
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1820')+'',
				name: 'taskstatusnotes',
				width:175,
				height:60,
				maxLength : 200,
				maxLengthText :''+getResource('resourceParam1820')+'长度过长，不能超过200',
				value:myGrid.row.get('taskstatusnotes')
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(statusUpdate.statusform.form.isValid()){
						var statusVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.taskStatus.TaskStatusVo");
						Ext.apply(statusVo,statusUpdate.statusform.getForm().getValues());
						callSeam("maintenance_taskStatus_TaskStatusService","statusUpdate",[statusVo],statusUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//statusUpdate.statusform.form.reset();	//表单重置
					statusUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改任务状态对话框
 */
statusUpdate.statussDate = function(response, opt){
	
	if (!statusUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'statusupdate');			//动态生成需要绑定的div
		statusUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'statusupdate',
		title: ''+getResource('resourceParam1645')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [statusUpdate.addstatusform()]						//将面板绑定到对话框
		});
	}
	statusUpdate.addDialog.show();								//显示对话框
	statusUpdate.addDialog.on("hide",function(){
		statusUpdate.addDialog.close();
		statusUpdate.addDialog.destroy();		
		statusUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改任务状态的Form面板
 */
statusUpdate.addstatusform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		statusUpdate.statusform = statusUpdate.getstatusform();
		return statusUpdate.statusform;
};
/**
 * 根据返回结果进行操作
 */
statusUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		statusUpdate.statusform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	statusUpdate.addDialog.hide();
    statusMain.baseargs = null;
	myGrid.loadvalue(statusMain.statusgrid.store,statusMain.args,statusMain.baseargs);
};
