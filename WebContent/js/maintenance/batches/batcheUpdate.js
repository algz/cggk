
/**
 * 修改批次
 */

var batcheUpdate = {addDialog:null,batcheform:null,batches:null};

/**
 * 修改操作
 */
batcheUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam965')+'批次进行操作!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	callSeam("maintenance_batche_BatcheService","getbatcheCombo",[],batcheUpdate.batchesDate); 


};

/**
 * 生成修改批次表单面板
 */
batcheUpdate.getbatcheform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'batchid',
				width:175,
				value:myGrid.row.get('batchid')
			},
			{	inputType:'hidden',
				name: 'modelBatcheid',
				width:175,
				value:myGrid.row.get('modelBatcheid')
			},
			{	fieldLabel: '批次'+getResource('resourceParam480')+'',		//文本框
				name: 'batchname',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'批次名',
				maxLength : 20,
				maxLengthText :'批次'+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :'批次'+getResource('resourceParam1002')+'',
				value:myGrid.row.get('batchname'),
				allowBlank:false
			},
			{
				xtype:'combo',
				width:175,
				store: new Ext.data.SimpleStore({
							fields: ["model", "modelname"],
							data:batcheUpdate.cs
						}),	
				valueField :"model",
				displayField: "modelname",
				mode: 'local',
				forceSelection: true,
				value:[myGrid.row.get('model')],
				editable: false,
				hiddenName:'model',
				editable: false,
				triggerAction: 'all',
				fieldLabel: '型号',
				name: 'model'
			},
			new Ext.form.TextArea({
				fieldLabel: '批次'+getResource('resourceParam648')+'',
				name: 'description',
				width:175,
				height:60,
				maxLength : 200,
				maxLengthText :'批次'+getResource('resourceParam648')+'长度过长，不能超过200',
				value:myGrid.row.get('description')
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(batcheUpdate.batcheform.form.isValid()){
						var batcheVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.batches.BatcheVo");
						Ext.apply(batcheVo,batcheUpdate.batcheform.getForm().getValues());
						callSeam("maintenance_batche_BatcheService","batcheUpdate",[batcheVo],batcheUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					batcheUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改批次对话框
 */
batcheUpdate.batchesDate = function(value){
	batcheUpdate.cs = value;
	if (!batcheUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'batcheupdate');			//动态生成需要绑定的div
		batcheUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'batcheupdate',
		title: ''+getResource('resourceParam478')+'批次',
		modal: true,
		layout:'fit',
		width:320,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [batcheUpdate.addbatcheform()]						//将面板绑定到对话框
		});
	}
	batcheUpdate.addDialog.show();								//显示对话框
	batcheUpdate.addDialog.on("hide",function(){
		batcheUpdate.addDialog.close();
		batcheUpdate.addDialog.destroy();		
		batcheUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改批次的Form面板
 */
batcheUpdate.addbatcheform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		batcheUpdate.batcheform = batcheUpdate.getbatcheform();
		return batcheUpdate.batcheform;
};
/**
 * 根据返回结果进行操作
 */
batcheUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		batcheUpdate.batcheform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	batcheUpdate.addDialog.hide();
    batcheMain.baseargs = null;
	myGrid.loadvalue(batcheMain.batchegrid.store,batcheMain.args,batcheMain.baseargs);
};
