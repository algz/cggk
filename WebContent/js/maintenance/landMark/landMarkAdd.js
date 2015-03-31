
/**
 * 添加里程碑
 */

var landMarkAdd = {addDialog:null,landMarkform:null,landMarks:null};


/**
 * 生成添加里程碑表单面板
 */
landMarkAdd.getlandMarkform =  function(){
	return new Ext.FormPanel({
		labelWidth: 90, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: ''+getResource('resourceParam1203')+''+getResource('resourceParam480')+'',		//文本框
				name: 'landmarkname',
				maxLength : 20,
				maxLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam1002')+'',
				width:175,
				blankText:'请'+getResource('resourceParam494')+''+getResource('resourceParam1203')+'名',
				allowBlank:false
			},
			{
				xtype:'combo',
				width:175,
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/maintenance_ProjectCateGory_ProjectCateGoryService.getcateGoryList"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'projectcategoryname'
						},{
							name : 'projectcategoryid'		
						}])
					}),
				valueField :"projectcategoryid",
				displayField: "projectcategoryname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'projectcategoryid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam463')+getResource('resourceParam5003'),
				blankText:''+getResource('resourceParam459')+''+getResource('resourceParam463')+getResource('resourceParam5003'),
				allowBlank:false,
				name: 'projectcategoryid'
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1203')+''+getResource('resourceParam648')+'',
				name: 'landmarknotes',
				maxLength : 200,
				maxLengthText :''+getResource('resourceParam1203')+''+getResource('resourceParam648')+'长度过长，不能超过200',
				width:175,
				height:60
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(landMarkAdd.landMarkform.form.isValid()){
						var landMarkVo = Seam.Remoting.createType("com.luck.itumserv.maintenance.landMark.LandMarkVo");
						Ext.apply(landMarkVo,landMarkAdd.landMarkform.getForm().getValues());
						callSeam("maintenance_landMark_LandMarkService","landMarkAdd",[landMarkVo],landMarkAdd.save);
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//landMarkAdd.landMarkform.form.reset();	//表单重置
					landMarkAdd.addDialog.hide();
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加里程碑对话框
 */
landMarkAdd.init = function(){
	
	if (!landMarkAdd.addDialog){				
		tlework.addHtml(tlework.divHtml,'landMarkadd');			//动态生成需要绑定的div
		landMarkAdd.addDialog = new Ext.Window({ 				//创建对话框
		el:'landMarkadd',
		title: ''+getResource('resourceParam647')+''+getResource('resourceParam1203')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [landMarkAdd.addlandMarkform()]						//将面板绑定到对话框
		});
	}
	landMarkAdd.addDialog.show();								//显示对话框
	landMarkAdd.addDialog.on("hide",function(){
		landMarkAdd.addDialog.close();
		landMarkAdd.addDialog.destroy();		
		landMarkAdd.addDialog = null;
		
	});
}

/**
 * 生成添加里程碑的Form面板
 */
landMarkAdd.addlandMarkform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		landMarkAdd.landMarkform = landMarkAdd.getlandMarkform();
		return landMarkAdd.landMarkform;
};
/**
 * 根据返回结果进行操作
 */
landMarkAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		landMarkAdd.landMarkform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	landMarkAdd.addDialog.hide();
    landMarkMain.baseargs = null;
	myGrid.loadvalue(landMarkMain.landMarkgrid.store,landMarkMain.args,landMarkMain.baseargs);
};
