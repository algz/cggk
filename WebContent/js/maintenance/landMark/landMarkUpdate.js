
/**
 * 修改里程碑
 */

var landMarkUpdate = {addDialog:null,landMarkform:null,landMarks:null};

/**
 * 修改操作
 */
landMarkUpdate.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam965')+''+getResource('resourceParam1203')+'进行操作!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	callSeam("maintenance_ProjectCateGory_ProjectCateGoryService","getcateGoryCombo",[],landMarkUpdate.landMarksDate); 


};

/**
 * 生成修改里程碑表单面板
 */
landMarkUpdate.getlandMarkform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'landmarkid',
				width:175,
				value:myGrid.row.get('landmarkid')
			},
			{	fieldLabel: ''+getResource('resourceParam1203')+''+getResource('resourceParam480')+'',		//文本框
				name: 'landmarkname',
				width:175,
				blankText:'请'+getResource('resourceParam494')+''+getResource('resourceParam1203')+'名',
				maxLength : 20,
				maxLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam1002')+'',
				value:myGrid.row.get('landmarkname'),
				allowBlank:false
			},
			{
				xtype:'combo',
				width:175,
				store: new Ext.data.SimpleStore({
							fields: ["projectcategoryid", "projectcategoryname"],
							data:landMarkUpdate.cs
						}),	
				valueField :"projectcategoryid",
				displayField: "projectcategoryname",
				mode: 'local',
				forceSelection: true,
				value:[myGrid.row.get('projectcategoryid')],
				editable: false,
				hiddenName:'projectcategoryid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam463')+getResource('resourceParam5003'),
				name: 'projectcategoryid'
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1203')+''+getResource('resourceParam648')+'',
				name: 'landmarknotes',
				width:175,
				height:60,
				maxLength : 200,
				maxLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam648')+'长度过长，不能超过200',
				value:myGrid.row.get('landmarknotes')
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(landMarkUpdate.landMarkform.form.isValid()){
						var landMarkVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.landMark.LandMarkVo");
						Ext.apply(landMarkVo,landMarkUpdate.landMarkform.getForm().getValues());
						callSeam("maintenance_landMark_LandMarkService","landMarkUpdate",[landMarkVo],landMarkUpdate.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//landMarkUpdate.landMarkform.form.reset();	//表单重置
					landMarkUpdate.addDialog.hide();

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改里程碑对话框
 */
landMarkUpdate.landMarksDate = function(value){
	landMarkUpdate.cs = value;
	if (!landMarkUpdate.addDialog){				
		tlework.addHtml(tlework.divHtml,'landMarkupdate');			//动态生成需要绑定的div
		landMarkUpdate.addDialog = new Ext.Window({ 				//创建对话框
		el:'landMarkupdate',
		title: ''+getResource('resourceParam478')+''+getResource('resourceParam1203')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [landMarkUpdate.addlandMarkform()]						//将面板绑定到对话框
		});
	}
	landMarkUpdate.addDialog.show();								//显示对话框
	landMarkUpdate.addDialog.on("hide",function(){
		landMarkUpdate.addDialog.close();
		landMarkUpdate.addDialog.destroy();		
		landMarkUpdate.addDialog = null;
		
	});
}

/**
 * 生成修改里程碑的Form面板
 */
landMarkUpdate.addlandMarkform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		landMarkUpdate.landMarkform = landMarkUpdate.getlandMarkform();
		return landMarkUpdate.landMarkform;
};
/**
 * 根据返回结果进行操作
 */
landMarkUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		landMarkUpdate.landMarkform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	landMarkUpdate.addDialog.hide();
    landMarkMain.baseargs = null;
	myGrid.loadvalue(landMarkMain.landMarkgrid.store,landMarkMain.args,landMarkMain.baseargs);
};
