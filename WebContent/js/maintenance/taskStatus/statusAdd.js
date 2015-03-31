
/**
 * 添加任务状态
 */

var statusAdd = {addDialog:null,statusform:null,statuss:null};


/**
 * 生成添加任务状态表单面板
 */
statusAdd.getstatusform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: ''+getResource('resourceParam1819')+'',		//文本框
				name: 'taskstatusname',
				maxLength : 20,
				maxLengthText :''+getResource('resourceParam739')+''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam739')+''+getResource('resourceParam1002')+'',
				width:175,
				blankText:''+getResource('resourceParam1818')+'',
				allowBlank:false
			},
			
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1820')+'',
				name: 'taskstatusnotes',
				maxLength : 200,
				maxLengthText :''+getResource('resourceParam1820')+'长度过长，不能超过200',
				width:175,
				height:60
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(statusAdd.statusform.form.isValid()){
						var statusVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.taskStatus.TaskStatusVo");
						Ext.apply(statusVo,statusAdd.statusform.getForm().getValues());
						callSeam("maintenance_taskStatus_TaskStatusService","statusAdd",[statusVo],statusAdd.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//statusAdd.statusform.form.reset();	//表单重置
					statusAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加任务状态对话框
 */
statusAdd.init = function(){
	
	if (!statusAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'statusadd');			//动态生成需要绑定的div
		statusAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'statusadd',
		title: ''+getResource('resourceParam647')+''+getResource('resourceParam739')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [statusAdd.addstatusform()]						//将面板绑定到对话框
		});
	}
	statusAdd.addDialog.show();								//显示对话框
	statusAdd.addDialog.on("hide",function(){
		statusAdd.addDialog.close();
		statusAdd.addDialog.destroy();		
		statusAdd.addDialog = null;
		
	});
}

/**
 * 生成添加任务状态的Form面板
 */
statusAdd.addstatusform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		statusAdd.statusform = statusAdd.getstatusform();
		return statusAdd.statusform;
};
/**
 * 根据返回结果进行操作
 */
statusAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		statusAdd.statusform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	statusAdd.addDialog.hide();
    statusMain.baseargs = null;
	myGrid.loadvalue(statusMain.statusgrid.store,statusMain.args,statusMain.baseargs);
};
