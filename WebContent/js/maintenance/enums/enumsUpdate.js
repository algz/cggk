
/**
 * 修改部门类型名称
 */

var enumsUpdate = {addDialog:null,enumsform:null,enumss:null};

/**
 * 修改操作
 */
enumsUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           //bug 784
           //gaoyn 2011-5-23 16:17
           //修改和删除的提示一致
           msg : ''+getResource('resourceParam459')+getResource('resourceParam1998')+'进行操作!',
           width : 270,
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	if (!enumsUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'enumsupdate');			//动态生成需要绑定的div
		enumsUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'enumsupdate',
		title: ''+getResource('resourceParam478')+getResource('resourceParam1998')+getResource('resourceParam480')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [enumsUpdate.addenumsform()]						//将面板绑定到对话框
		});
	}
	enumsUpdate.addDialog.show();								//显示对话框
	enumsUpdate.addDialog.on("hide",function(){
		enumsUpdate.addDialog.close();
		enumsUpdate.addDialog.destroy();		
		enumsUpdate.addDialog = null;
		
	});
};

/**
 * 生成修改里程碑表单面板
 */
enumsUpdate.getenumsform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'id',
				width:175,
				value:myGrid.row.get('id')
			},
			{	fieldLabel: getResource('resourceParam1998')+getResource('resourceParam480')+'',		//文本框
				name: 'enumsname',
				width:175,
				blankText:'请'+getResource('resourceParam494')+getResource('resourceParam1998')+getResource('resourceParam1139')+'',
				maxLength : 20,
				maxLengthText :getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :getResource('resourceParam1998')+getResource('resourceParam1002')+'',
				value:myGrid.row.get('enumsname'),
				allowBlank:false
			},	new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam648')+'',
				name: 'dcontext',
				maxLength : 200,
				maxLengthText :getResource('resourceParam648')+getResource('resourceParam9787'),
				width:175,
				value:myGrid.row.get('dcontext'),
				height:60
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(enumsUpdate.enumsform.form.isValid()){
//						var enumsVo = Seam.Remoting.createType("com.sysware.p2m.enums.SysEnumsVo");
//						Ext.apply(enumsVo,enumsUpdate.enumsform.getForm().getValues());
//						enumsVo.setIsdelete(0);
//						callSeam("tasklist_taskService","updateEnum",[enumsVo],enumsUpdate.save);
                        
                     Ext.Ajax.request({
                        url : "../JSON/tasklist_taskService.updateEnum",
                        method : 'POST',
                        success : function(response, options) {
                            enumsUpdate.save(response.responseText);
                            },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                           enumsname:enumsUpdate.enumsform.getForm().findField("enumsname").getValue(),
                           dcontext:enumsUpdate.enumsform.getForm().findField("dcontext").getValue(),
                           id:myGrid.row.get('id')
                        }
                    });
					}
				}
			},
			{   text: '取消',
				handler: function(){
					//enumsUpdate.enumsform.form.reset();	//表单重置
					enumsUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 生成修改里程碑的Form面板
 */
enumsUpdate.addenumsform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		enumsUpdate.enumsform = enumsUpdate.getenumsform();
		return enumsUpdate.enumsform;
};
/**
 * 根据返回结果进行操作
 */
enumsUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");				
	}else{
		enumsUpdate.enumsform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	enumsUpdate.addDialog.hide();
    enumsMain.baseargs = null;
    //myGrid.row=null;
	myGrid.loadvalue(enumsMain.enumsgrid.store,enumsMain.args,enumsMain.baseargs);
};
