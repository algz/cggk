
/**
 * 添加批次
 */

var batcheAdd = {addDialog:null,batcheform:null,batches:null};


/**
 * 生成添加批次表单面板
 */
batcheAdd.getbatcheform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: '批次'+getResource('resourceParam480')+'',		//文本框
				name: 'batchname',
				maxLength : 20,
				maxLengthText :'批次'+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :'批次'+getResource('resourceParam1002')+'',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'批次名',
				allowBlank:false
			},
			{
				xtype:'combo',
				width:175,
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/aofoquery_GongyiwcComboxSvr.getModel"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, ['model','modelname'])
					}),
				valueField :"model",
				displayField: "modelname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'model',
				editable: false,
				triggerAction: 'all',
				fieldLabel: '型号',
				blankText:''+getResource('resourceParam459')+'型号',
				allowBlank:false,
				name: 'model'
			},
			new Ext.form.TextArea({
				fieldLabel: '批次'+getResource('resourceParam648')+'',
				name: 'description',
				maxLength : 200,
				maxLengthText :'批次'+getResource('resourceParam648')+'长度过长，不能超过200',
				width:175,
				height:60
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(batcheAdd.batcheform.form.isValid()){
						var batcheVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.batches.BatcheVo");
						Ext.apply(batcheVo,batcheAdd.batcheform.getForm().getValues());
						callSeam("maintenance_batche_BatcheService","batcheAdd",[batcheVo],batcheAdd.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//batcheAdd.batcheform.form.reset();	//表单重置
					batcheAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加批次对话框
 */
batcheAdd.init = function(){
	
	if (!batcheAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'batcheadd');			//动态生成需要绑定的div
		batcheAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'batcheadd',
		title: ''+getResource('resourceParam647')+'批次',
		modal: true,
		layout:'fit',
		width:320,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [batcheAdd.addbatcheform()]						//将面板绑定到对话框
		});
	}
	batcheAdd.addDialog.show();								//显示对话框
	batcheAdd.addDialog.on("hide",function(){
		batcheAdd.addDialog.close();
		batcheAdd.addDialog.destroy();		
		batcheAdd.addDialog = null;
		
	});
}

/**
 * 生成添加批次的Form面板
 */
batcheAdd.addbatcheform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		batcheAdd.batcheform = batcheAdd.getbatcheform();
		return batcheAdd.batcheform;
};
/**
 * 根据返回结果进行操作
 */
batcheAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		batcheAdd.batcheform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	batcheAdd.addDialog.hide();
    batcheMain.baseargs = null;
	myGrid.loadvalue(batcheMain.batchegrid.store,batcheMain.args,batcheMain.baseargs);
};
