
/**
 * 添加型号
 */

var modelsAdd = {addDialog:null,modelsform:null,modelss:null};


/**
 * 生成添加型号表单面板
 */
modelsAdd.getmodelsform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[//定义面板中的表单元素
			{	fieldLabel: '型号'+getResource('resourceParam461')+'',		//文本框
				name: 'modelid',
				maxLength : 20,
				maxLengthText :'型号'+getResource('resourceParam461')+'长度过长，不能超过20',
				minLength : 1,
				minLengthText :'型号'+getResource('resourceParam461')+'长度过短，不能小于1',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'型号'+getResource('resourceParam461')+'',
				regex:/^[0-9]*$/,
				regexText:'型号'+getResource('resourceParam461')+'必须为数字',
				allowBlank:false
			},{	fieldLabel: '型号'+getResource('resourceParam480')+'',		//文本框
				name: 'modelname',
				id : 'quanjiao',
				maxLength : 20,
				maxLengthText :'型号'+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :'型号'+getResource('resourceParam1002')+'',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'型号名',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				allowBlank:false,
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
				 */
				enableKeyEvents : true,
				listeners : {'blur' : function(cur, evt) {
						var curStr = cur.getValue();
						for(var i = 0; i < curStr.length; i++) {
							var str = curStr.charCodeAt(i);
							if(str == 12288) {
								if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
									curStr = curStr.replace('　', ' ');
								}
							} 
						}
						Ext.getCmp('quanjiao').setValue(curStr);
					}
				}
			},
			new Ext.form.TextArea({
				fieldLabel: '型号'+getResource('resourceParam648')+'',
				name: 'description',
				id : 'quanjiao1',
				maxLength : 200,
				maxLengthText :'型号'+getResource('resourceParam648')+'长度过长，不能超过200',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				width:175,
				height:60,
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
				 */
				enableKeyEvents : true,
				listeners : {'blur' : function(cur, evt) {
						var curStr = cur.getValue();
						for(var i = 0; i < curStr.length; i++) {
							var str = curStr.charCodeAt(i);
							if(str == 12288) {
								if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
									curStr = curStr.replace('　', ' ');
								}
							} 
						}
						Ext.getCmp('quanjiao1').setValue(curStr);
					}
				}
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(modelsAdd.modelsform.form.isValid()){
						var modelsVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.models.ModelsVo");
						Ext.apply(modelsVo,modelsAdd.modelsform.getForm().getValues());
						callSeam("maintenance_models_ModelsService","modelsAdd",[modelsVo],modelsAdd.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//modelsAdd.modelsform.form.reset();	//表单重置
					modelsAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加型号对话框
 */
modelsAdd.init = function(){
	
	if (!modelsAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'modelsadd');			//动态生成需要绑定的div
		modelsAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'modelsadd',
		title: ''+getResource('resourceParam647')+'型号',
		modal: true,
		layout:'fit',
		width:320,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [modelsAdd.addmodelsform()]						//将面板绑定到对话框
		});
	}
	modelsAdd.addDialog.show();								//显示对话框
	modelsAdd.addDialog.on("hide",function(){
		modelsAdd.addDialog.close();
		modelsAdd.addDialog.destroy();		
		modelsAdd.addDialog = null;
		
	});
}

/**
 * 生成添加型号的Form面板
 */
modelsAdd.addmodelsform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		modelsAdd.modelsform = modelsAdd.getmodelsform();
		return modelsAdd.modelsform;
};
/**
 * 根据返回结果进行操作
 */
modelsAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		modelsAdd.modelsform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	modelsAdd.addDialog.hide();
    modelsMain.baseargs = null;
	myGrid.loadvalue(modelsMain.modelsgrid.store,modelsMain.args,modelsMain.baseargs);
};
