
/**
 * 修改任务类型权重
 */

var taskProUpdate = {addDialog:null,taskProform:null};

/**
 * 修改操作
 */
taskProUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam965')+''+getResource('resourceParam1043')+'权重进行操作!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	taskProUpdate.taskProsDate();
};

/**
 * 生成修改任务类型权重表单面板
 */
taskProUpdate.gettaskProform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'weightid',
				width:175,
				value:myGrid.row.get('weightid')
			},
			{	fieldLabel: ''+getResource('resourceParam1851')+'',		//文本框
				name: 'projectname',
				width:175,
				cls:'readonly',
				readOnly:true,
				value:myGrid.row.get('projectname')
			},
			{	fieldLabel: ''+getResource('resourceParam1043')+'',		//文本框
				name: 'taskcategoryname',
				width:175,
				cls:'readonly',
				readOnly:true,
				value:myGrid.row.get('taskcategoryname')
			},
			{	xtype:'numberfield',
				fieldLabel: '权 重 '+getResource('resourceParam511')+'',		//文本框
				name: 'weight',
				width:175,
				maxValue:1,
				maxText:"权重"+getResource('resourceParam511')+"不能大于1",
				minValue:0,
				minText:"权重"+getResource('resourceParam511')+"不能小于0",
				value:myGrid.row.get('weight')
			}
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(taskProUpdate.taskProform.form.isValid()){
						var taskProVo = Seam.Remoting.createType("com.luck.itumserv.proportion.taskPro.TaskProVo");
						Ext.apply(taskProVo,taskProUpdate.taskProform.getForm().getValues());
						callSeam("proportion_taskPro_TaskProService","taskProUpdate",[taskProVo],taskProUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//taskProUpdate.taskProform.form.reset();	//表单重置
					taskProUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改任务类型权重对话框
 */
taskProUpdate.taskProsDate = function(response, opt){
	
	if (!taskProUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'taskProupdate');			//动态生成需要绑定的div
		taskProUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'taskProupdate',
		title: ''+getResource('resourceParam1815')+'权重',
		modal: true,
		layout:'fit',
		width:320,
		height:160,
		closeAction:'hide',
		plain: false,
		items: [taskProUpdate.addtaskProform()]						//将面板绑定到对话框
		});
	}
	taskProUpdate.addDialog.show();								//显示对话框
	taskProUpdate.addDialog.on("hide",function(){
		taskProUpdate.addDialog.close();
		taskProUpdate.addDialog.destroy();		
		taskProUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改任务类型权重的Form面板
 */
taskProUpdate.addtaskProform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		taskProUpdate.taskProform = taskProUpdate.gettaskProform();
		return taskProUpdate.taskProform;
};
/**
 * 根据返回结果进行操作
 */
taskProUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		taskProUpdate.taskProform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	taskProUpdate.addDialog.hide();
    taskProMain.baseargs = null;
	myGrid.loadvalue(taskProMain.taskProgrid.store,taskProMain.args,taskProMain.baseargs);
};
