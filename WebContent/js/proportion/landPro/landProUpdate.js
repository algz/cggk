
/**
 * 修改里程碑权重
 */

var landProUpdate = {addDialog:null,landProform:null};

/**
 * 修改操作
 */
landProUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam965')+''+getResource('resourceParam1203')+'权重进行操作!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	landProUpdate.landProsDate();
};

/**
 * 生成修改里程碑权重表单面板
 */
landProUpdate.getlandProform =  function(){
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
			{	fieldLabel: ''+getResource('resourceParam1203')+''+getResource('resourceParam480')+'',		//文本框
				name: 'landmarkname',
				width:175,
				cls:'readonly',
				readOnly:true,
				value:myGrid.row.get('landmarkname')
			},
			{	xtype:'numberfield',
				fieldLabel: '权 重 '+getResource('resourceParam511')+'',		//文本框
				name: 'weight',
				width:175,
				maxLength:4,
				maxLengthText:''+getResource('resourceParam1852')+'',
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
					if(landProUpdate.landProform.form.isValid()){
						var landProVo = Seam.Remoting.createType("com.luck.itumserv.proportion.landPro.LandProVo");
						Ext.apply(landProVo,landProUpdate.landProform.getForm().getValues());
						callSeam("proportion_landPro_LandProService","landProUpdate",[landProVo],landProUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//landProUpdate.landProform.form.reset();	//表单重置
					landProUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改里程碑权重对话框
 */
landProUpdate.landProsDate = function(response, opt){
	
	if (!landProUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'landProupdate');			//动态生成需要绑定的div
		landProUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'landProupdate',
		title: ''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'权重',
		modal: true,
		layout:'fit',
		width:320,
		height:160,
		closeAction:'hide',
		plain: false,
		items: [landProUpdate.addlandProform()]						//将面板绑定到对话框
		});
	}
	landProUpdate.addDialog.show();								//显示对话框
	landProUpdate.addDialog.on("hide",function(){
		landProUpdate.addDialog.close();
		landProUpdate.addDialog.destroy();		
		landProUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改里程碑权重的Form面板
 */
landProUpdate.addlandProform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		landProUpdate.landProform = landProUpdate.getlandProform();
		return landProUpdate.landProform;
};
/**
 * 根据返回结果进行操作
 */
landProUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		landProUpdate.landProform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	landProUpdate.addDialog.hide();
    landProMain.baseargs = null;
	myGrid.loadvalue(landProMain.landProgrid.store,landProMain.args,landProMain.baseargs);
};
