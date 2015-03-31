
/**
 * 修改子系统
 */

var updatesystem = {updatesystem:null,updatesystemform:null,mgrsysytem:null};

/**
 * 修改操作
 */
updatesystem.init = function(){   
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	return false;
	  }
	updatesystem.mgrsysytemDate();
};

/**
 * 生成修改角色表单面板
 */
updatesystem.getupdatesystemform =  function(){
	return new Ext.FormPanel({
		labelWidth: 75,
        frame:true,
        plain: false,
        bodyStyle:'padding:5px 5px 0',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'subSystemId',
				width:175,
				value:myGrid.row.get('subSystemId')
			},
			{	fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam461')+'',		//文本框
				name: 'subSystemId',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'子'+getResource('resourceParam559')+''+getResource('resourceParam461')+'',
				value:myGrid.row.get('subSystemId'),
				disabled:true,
				allowBlank:false
			},
			{	fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',		//文本框
				name: 'name',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'子'+getResource('resourceParam559')+''+getResource('resourceParam480')+'',
				value:myGrid.row.get('name'),
				maxLength : 64,
				maxLengthText :'子'+getResource('resourceParam559')+''+getResource('resourceParam656')+'64',
				minLength : 4,
				minLengthText :'子'+getResource('resourceParam559')+''+getResource('resourceParam655')+'4',
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: '子'+getResource('resourceParam559')+''+getResource('resourceParam648')+'',
				name: 'descr',
				width:175,
				height:60,
				value:myGrid.row.get('descr'),
				maxLength : 128,
				maxLengthText :''+getResource('resourceParam654')+''
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(updatesystem.updatesystemform.form.isValid()){
						updatesystem.updatesystemform.form.doAction('submit',{
						url:'../JSON/mgrsystem.save',
						success:updatesystem.save,	//操作成功执行的方法
						failure:updatesystem.save	//操作失败执行的方法
						});
					}
					
				}
			},
			{   text: getResource('resourceParam3001'),//'取消',
				handler: function(){
					//updatesystem.updatesystemform.form.reset();	//表单重置
					updatesystem.addDialog.close();
					updatesystem.addDialog.destroy();		//摧毁当前元素相关的所有对象，包括Div等
					updatesystem.addDialog = null;

					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建修改角色对话框
 */
updatesystem.mgrsysytemDate = function(response, opt){
	
	if (!updatesystem.addDialog){				
		tlework.addHtml(tlework.divHtml,'updatesystem');			//动态生成需要绑定的div
		updatesystem.addDialog = new Ext.Window({ 				//创建对话框
		el:'updatesystem',
		title: ''+getResource('resourceParam478')+'子'+getResource('resourceParam559')+'',
		layout:'fit',
		modal:true,
		width:300,
		height:240,
		closeAction:'hide',
		plain: false,
		items: [updatesystem.addsystemform()]						//将面板绑定到对话框
		});
	}
	updatesystem.addDialog.show();								//显示对话框
	
}

/**
 * 生成修改角色的Form面板
 */
updatesystem.addsystemform = function(){
	    Ext.form.Field.prototype.msgTarget = 'qtip';

		updatesystem.updatesystemform = updatesystem.getupdatesystemform();
		return updatesystem.updatesystemform;
};
/**
 * 根据返回结果进行操作
 */
updatesystem.save = function(response, action){
	var sign = Ext.util.JSON.decode(action.response.responseText).result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK
		});					
	}else{
		updatesystem.updatesystemform.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam653')+'',
			buttons: Ext.MessageBox.OK
		});
	}
	updatesystem.addDialog.close();
	updatesystem.addDialog.destroy();		
	updatesystem.addDialog = null;
    systemgrid.baseargs = null;
	myGrid.loadvalue(systemgrid.rolegrid.store,systemgrid.args,systemgrid.baseargs);
};
