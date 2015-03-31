
/**
 * 修改项目类型
 */

var cateGoryUpdate = {addDialog:null,cateGoryform:null,cateGorys:null};

/**
 * 修改操作
 */
cateGoryUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam1788')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	cateGoryUpdate.cateGorysDate();
};

/**
 * 生成修改项目类型表单面板
 */
cateGoryUpdate.getcateGoryform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'formid',
				width:175,
				value:cateGoryMain.cateGorygrid.getSelectionModel().getSelected().data.formid
			},
			{	fieldLabel: getResource('resourceParam5000')+getResource('resourceParam1139')+'',		//文本框
				name: 'formname',
				id : 'quanjiao',
				width:175,
				blankText:'请'+getResource('resourceParam494')+''+getResource('resourceParam598')+'名',
				maxLength : 40,
				maxLengthText :''+getResource('resourceParam598')+''+getResource('resourceParam9796')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam598')+''+getResource('resourceParam1002')+'',
				value:cateGoryMain.cateGorygrid.getSelectionModel().getSelected().data.formname,
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|[_]|\s|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				style : 'margin-bottom: 5px;',
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
						Ext.getCmp('quanjiao').setValue(curStr);
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
							value:cateGoryMain.cateGorygrid.getSelectionModel().getSelected().data.formtype,
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
				width:175,
				height:60,
				maxLength : 200,
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
//				regexText : '只能输入中文,字母,数字',
				maxLengthText :'表单'+getResource('resourceParam1140')+'长度过长，不能超过200',
//				value:myGrid.row.get('note')	
				value:cateGoryMain.cateGorygrid.getSelectionModel().getSelected().data.note
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(cateGoryUpdate.cateGoryform.form.isValid()){
						var cateGoryVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.feedbackForm.FeedbackFormVo");
						Ext.apply(cateGoryVo,cateGoryUpdate.cateGoryform.getForm().getValues());
						callSeam("maintenance_feedbackForm_FeedbackFormRemote","updateForm",[cateGoryVo],cateGoryUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//cateGoryUpdate.cateGoryform.form.reset();	//表单重置
					cateGoryUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改项目类型对话框
 */
cateGoryUpdate.cateGorysDate = function(response, opt){
	
	if (!cateGoryUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'cateGoryupdate');			//动态生成需要绑定的div
		cateGoryUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'cateGoryupdate',
		title: ''+getResource('resourceParam478')+''+getResource('resourceParam598')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [cateGoryUpdate.addcateGoryform()]						//将面板绑定到对话框
		});
	}
	cateGoryUpdate.addDialog.show();								//显示对话框
	cateGoryUpdate.addDialog.on("hide",function(){
		cateGoryUpdate.addDialog.close();
		cateGoryUpdate.addDialog.destroy();		
		cateGoryUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改项目类型的Form面板
 */
cateGoryUpdate.addcateGoryform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		cateGoryUpdate.cateGoryform = cateGoryUpdate.getcateGoryform();
		return cateGoryUpdate.cateGoryform;
};
/**
 * 根据返回结果进行操作
 */
cateGoryUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		cateGoryUpdate.cateGoryform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	cateGoryUpdate.addDialog.hide();
    cateGoryMain.baseargs = null;
	// myGrid.loadvalue(cateGoryMain.cateGorygrid.store,cateGoryMain.args,cateGoryMain.baseargs);
    cateGoryMain.cateGorygrid.store.reload();
};
