
/**
 * 添加里程碑
 */

var enumsAdd = {addDialog:null,deptypeform:null,deptypes:null};


/**
 * 生成添加部门类型表单面板
 */
enumsAdd.getdeptypeform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: getResource('resourceParam1998')+''+getResource('resourceParam480')+'',		//文本框
				name: 'enumsname',
				maxLength : 20,
				maxLengthText :getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :getResource('resourceParam1998')+getResource('resourceParam1002')+'',
				width:175,
				blankText:'请'+getResource('resourceParam494')+getResource('resourceParam1998')+getResource('resourceParam480')+'',
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam648')+'',
				name: 'dcontext',
				maxLength : 200,
				maxLengthText :''+getResource('resourceParam648')+getResource('resourceParam9787')+'',
				width:175,
				height:60
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(enumsAdd.deptypeform.form.isValid()){
                      Ext.Ajax.request({
                        url : "../JSON/tasklist_taskService.addEnum",
                        method : 'POST',
                        success : function(response, options) {
                            enumsAdd.save(response.responseText);
                            },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                           enumsname:enumsAdd.deptypeform.getForm().findField("enumsname").getValue(),
                           dcontext:enumsAdd.deptypeform.getForm().findField("dcontext").getValue()
                        }
                    });
                        
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//enumsAdd.deptypeform.form.reset();	//表单重置
					enumsAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加里程碑对话框
 */
enumsAdd.init = function(){
	
	if (!enumsAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'enumsAdd');			//动态生成需要绑定的div
		enumsAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'enumsAdd',
		title: ''+getResource('resourceParam647')+''+getResource('resourceParam1998')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [enumsAdd.adddeptypeform()]						//将面板绑定到对话框
		});
	}
	enumsAdd.addDialog.show();								//显示对话框
	enumsAdd.addDialog.on("hide",function(){
		enumsAdd.addDialog.close();
		enumsAdd.addDialog.destroy();		
		enumsAdd.addDialog = null;
		
	});
}

/**
 * 生成添加里程碑的Form面板
 */
enumsAdd.adddeptypeform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		enumsAdd.deptypeform = enumsAdd.getdeptypeform();
		return enumsAdd.deptypeform;
};
/**
 * 根据返回结果进行操作
 */
enumsAdd.save = function(result){
  
	var sign = result;	
	if (sign=="true"){							
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");					
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam1781')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	enumsAdd.addDialog.hide();
    enumsMain.baseargs = null;
	myGrid.loadvalue(enumsMain.enumsgrid.store,enumsMain.args,enumsMain.baseargs);
};
