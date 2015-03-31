2
/**
 * 添加项目类型
 */

var cateGoryAdd = {
	addDialog:null,
	cateGoryform:null,
	cateGorys:null,
	result : null
};


/**
 * 生成添加项目类型表单面板
 */
cateGoryAdd.getcateGoryform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: getResource('resourceParam5000')+getResource('resourceParam1139')+'',		//文本框
				name: 'formname',
				id : 'formname',
				maxLength : 40,
				maxLengthText :''+getResource('resourceParam598')+''+getResource('resourceParam9796')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam598')+''+getResource('resourceParam1002')+'',
				width:175,
				blankText:'请'+getResource('resourceParam494')+''+getResource('resourceParam598')+'名',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|[_]|\s|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				style : 'margin-bottom: 5px;',
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
						Ext.getCmp('formname').setValue(curStr);
					}
				}
			},	
			new Ext.form.ComboBox({
							fieldLabel : ''+getResource('resourceParam598')+'',
							hiddenName : 'formtype',
							store : new Ext.data.SimpleStore({
										fields : ['id','name'],
										data : [[5,''+getResource('resourceParam607')+getResource('resourceParam5000')], [3,getResource('resourceParam5000')]]
									}),
							value : 3,
							valueField : 'id',
							displayField : 'name',
							typeAhead : false,
							mode : 'local',
							triggerAction : 'all',
							selectOnFocus : true,
							allowBlank : true,
							forceSelection : true,
							editable : false,
							style : 'margin-bottom: 5px;',
							width : 175
						}),
			new Ext.form.TextArea({
				fieldLabel: getResource('resourceParam5000')+getResource('resourceParam1140')+'',
				name: 'note',
				maxLength : 200,
				maxLengthText :getResource('resourceParam5000')+getResource('resourceParam1140')+'长度过长，不能超过200',
				width:175,
				style : 'margin-bottom: 5px;',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
//				regexText : '只能输入中文,字母,数字',
				height:60
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
//					if(cateGoryAdd.result == 'false') {
//						Ext.MessageBox.show({
//							title : '' + getResource('resourceParam634')
//									+ '',
//							msg : '' + "输入有全角字符请把输入法更改为半角！" + '',
//							buttons : Ext.MessageBox.OK,
//							icon : Ext.MessageBox.ERROR
//						});
//						return ;
//					}
					if(cateGoryAdd.cateGoryform.form.isValid()){
						var cateGoryVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.feedbackForm.FeedbackFormVo");
						Ext.apply(cateGoryVo,cateGoryAdd.cateGoryform.getForm().getValues());
						callSeam("maintenance_feedbackForm_FeedbackFormRemote","addForm",[cateGoryVo],cateGoryAdd.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//cateGoryAdd.cateGoryform.form.reset();	//表单重置
					cateGoryAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加项目类型对话框
 */
cateGoryAdd.init = function(){
	if (!cateGoryAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'cateGoryadd');			//动态生成需要绑定的div
		cateGoryAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'cateGoryadd',
		title: ''+getResource('resourceParam647')+''+getResource('resourceParam598')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [cateGoryAdd.addcateGoryform()]						//将面板绑定到对话框
		});
	}
	cateGoryAdd.addDialog.show();								//显示对话框
	cateGoryAdd.addDialog.on("hide",function(){
		cateGoryAdd.addDialog.close();
		cateGoryAdd.addDialog.destroy();		
		cateGoryAdd.addDialog = null;
		
	});
}

/**
 * 生成添加项目类型的Form面板
 */
cateGoryAdd.addcateGoryform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		cateGoryAdd.cateGoryform = cateGoryAdd.getcateGoryform();
		return cateGoryAdd.cateGoryform;
};
/**
 * 根据返回结果进行操作
 */
cateGoryAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});					
	}
	else if(sign=="false")
	{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: getResource('resourceParam5000')+getResource('resourceParam1139')+''+getResource('resourceParam509')+'存在,请重新'+getResource('resourceParam494')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});			
	}
	else{
		cateGoryAdd.cateGoryform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	cateGoryAdd.addDialog.hide();
    cateGoryMain.baseargs = null;
	// myGrid.loadvalue(cateGoryMain.cateGorygrid.store,cateGoryMain.args,cateGoryMain.baseargs);
    cateGoryMain.cateGorygrid.store.reload();
};
