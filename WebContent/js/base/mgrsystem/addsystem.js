
/**
 * 增加子系统
 */

var addsystem = {addsystem:null,addsystemform:null,mgrsysytem:null};


/**
 * 生成子系统表单面板
 */
addsystem.getaddsystemform =  function(){
	return new Ext.FormPanel({
		labelWidth: 75, 
        frame:true,
        plain: false,
        bodyStyle:'padding:5px 5px 0',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',		//文本框
				name: 'name',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',
				maxLength : 64,
				maxLengthText :'子'+getResource('resourceParam559')+'名长度过长，不能超过64',
				minLength : 4,
				minLengthText :'子'+getResource('resourceParam559')+'名长度过短，不能小于4',
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam648')+'',
				name: 'descr',
				width:175,
				height:60,
				maxLength : 200,
				maxLengthText :'子'+getResource('resourceParam559')+''+getResource('resourceParam648')+'长度过长，不能超过128'
				
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(addsystem.addsystemform.form.isValid()){
						addsystem.addsystemform.form.doAction('submit',{
						url:'../JSON/mgrsystem.save',
						success:addsystem.save,	//操作成功执行的方法
						failure:addsystem.save	//操作失败执行的方法
						});
					}
					
				}
			},
			{   text: getResource('resourceParam3001'),// '取消',
				handler: function(){
					//addsystem.addsystemform.form.reset();	//表单重置
					addsystem.addDialog.close();
					addsystem.addDialog.destroy();		//摧毁当前元素相关的所有对象，包括Div等
					addsystem.addDialog = null;
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加角色对话框
 */
addsystem.init = function(response, opt){
	
	if (!addsystem.addDialog){				
		tlework.addHtml(tlework.divHtml,'addsystem');			//动态生成需要绑定的div
		addsystem.addDialog = new Ext.Window({ 				//创建对话框
		el:'addsystem',
		title: ''+getResource('resourceParam647')+'子'+getResource('resourceParam559')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:200,
		closeAction:'hide',
		plain: false,
		items: [addsystem.addsystemform()]						//将面板绑定到对话框
		});
	}
	addsystem.addDialog.show();								//显示对话框
	
}

/**
 * 生成添加角色的Form面板
 */
addsystem.addsystemform = function(){
		/**
		 * 定义错误提示显示位置
		 * qtip		当鼠标移动到控件上面时显示提示
		 * under	在控件的底下显示错误提示
		 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
		 * [element id]	错误提示显示在指定id的HTML元件中
		 */
	    Ext.form.Field.prototype.msgTarget = 'qtip';		

		addsystem.addsystemform = addsystem.getaddsystemform();
		return addsystem.addsystemform;
};
/**
 * 根据返回结果进行操作
 */
addsystem.save = function(response, action){
	var sign = Ext.util.JSON.decode(action.response.responseText).result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource['resourceParam1072'],//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK
		});					
	}else{
		addsystem.addsystemform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: '您'+getResource('resourceParam494')+'的子'+getResource('resourceParam559')+'名'+getResource('resourceParam509')+'存在,请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK
		});
	}
	addsystem.addDialog.close();
	addsystem.addDialog.destroy();		
	addsystem.addDialog = null;
    systemgrid.baseargs = null;
	myGrid.loadvalue(systemgrid.rolegrid.store,systemgrid.args,systemgrid.baseargs);
};
