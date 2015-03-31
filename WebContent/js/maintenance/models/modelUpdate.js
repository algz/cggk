
/**
 * 修改型号
 */

var modelsUpdate = {addDialog:null,modelsform:null,modelss:null};

/**
 * 修改操作
 */
modelsUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam965')+'型号进行操作!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	modelsUpdate.modelssDate();
};

/**
 * 生成修改型号表单面板
 */
modelsUpdate.getmodelsform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'modelid',
				width:175,
				value:myGrid.row.get('modelid')
			},
			{	fieldLabel: '型号'+getResource('resourceParam480')+'',		//文本框
				name: 'modelname',
				id : 'quanjiao2',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'型号名',
				maxLength : 20,
				maxLengthText :'型号'+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :'型号'+getResource('resourceParam1002')+'',
				value:myGrid.row.get('modelname'),
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				allowBlank:true,
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
						Ext.getCmp('quanjiao2').setValue(curStr);
					}
				}
			},
			new Ext.form.TextArea({
				fieldLabel: '型号'+getResource('resourceParam648')+'',
				name: 'description',
				id : 'quanjiao3',
				width:175,
				height:60,
				maxLength : 200,
				maxLengthText :'型号'+getResource('resourceParam648')+'长度过长，不能超过200',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				value:myGrid.row.get('description'),
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
						Ext.getCmp('quanjiao3').setValue(curStr);
					}
				}
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(modelsUpdate.modelsform.form.isValid()){
						var modelsVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.models.ModelsVo");
						Ext.apply(modelsVo,modelsUpdate.modelsform.getForm().getValues());
						callSeam("maintenance_models_ModelsService","modelsUpdate",[modelsVo],modelsUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//modelsUpdate.modelsform.form.reset();	//表单重置
					modelsUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改型号对话框
 */
modelsUpdate.modelssDate = function(response, opt){
	
	if (!modelsUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'modelsupdate');			//动态生成需要绑定的div
		modelsUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'modelsupdate',
		title: ''+getResource('resourceParam478')+'型号',
		modal: true,
		layout:'fit',
		width:320,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [modelsUpdate.addmodelsform()]						//将面板绑定到对话框
		});
	}
	modelsUpdate.addDialog.show();								//显示对话框
	modelsUpdate.addDialog.on("hide",function(){
		modelsUpdate.addDialog.close();
		modelsUpdate.addDialog.destroy();		
		modelsUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改型号的Form面板
 */
modelsUpdate.addmodelsform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		modelsUpdate.modelsform = modelsUpdate.getmodelsform();
		return modelsUpdate.modelsform;
};
/**
 * 根据返回结果进行操作
 */
modelsUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		modelsUpdate.modelsform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	modelsUpdate.addDialog.hide();
    modelsMain.baseargs = null;
	myGrid.loadvalue(modelsMain.modelsgrid.store,modelsMain.args,modelsMain.baseargs);
};
