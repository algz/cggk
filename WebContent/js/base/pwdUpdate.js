/**
 * 添加用户
 */

var pwdUpdate = {pwdDialog:null,userform:null,user:null};

/**
 * 生成修改密码表单面板
 */
pwdUpdate.getuserform =  function(){
	return new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:true,
        plain: false,
        bodyStyle:'padding:5px 5px 0',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				id: 'userid',
				name: 'userid',
				width:175,
				value:Index.user.userid
			},
			{	fieldLabel: ''+getResource('resourceParam777')+'',
				id: 'oldpassword',
				name: 'oldpassword',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'旧的登录'+getResource('resourceParam468')+'！',
				allowBlank:false,
				inputType:"password"
			},
			{	fieldLabel: ''+getResource('resourceParam778')+'',
				id:'newpassword1',
				name: 'newpassword1',
				width:175,
				blankText:'请'+getResource('resourceParam494')+'新的登录'+getResource('resourceParam468')+'！',
				allowBlank:false,
				inputType:"password"
			},
			{	fieldLabel: ''+getResource('resourceParam779')+'',
				id: 'newpassword2',
				name: 'newpassword2',
				width:175,
				blankText:'请再次'+getResource('resourceParam494')+'新的登录'+getResource('resourceParam468')+'！',
				allowBlank:false,
				inputType:"password",
				validationEvent :false,
				validator:function(){
						var newpassword1 = pwdUpdate.userform.getComponent('newpassword1');
						var newpassword2 = pwdUpdate.userform.getComponent('newpassword2');
						if(newpassword1.el.dom.value != newpassword2.el.dom.value){
							newpassword2.invalidText = ''+getResource('resourceParam775')+'';	
							newpassword1.focus();
							return false;
						}else{
							return true;
						}
				}
			}
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
						
						if(pwdUpdate.userform.form.isValid()){
							var userform = Seam.Remoting.createType("com.luck.itumserv.base.user.GuserForm");
							Ext.apply(userform,pwdUpdate.userform.form.getValues());
							Seam.Component.getInstance("base_user_UserSerivce").updataPassWord(userform,pwdUpdate.save); 
							
					}
					
				}
			},
			{   text: '取消',
				handler: function(){
					//pwdUpdate.userform.form.reset();	//表单重置
					pwdUpdate.pwdDialog.hide();
					pwdUpdate.pwdDialog.destroy();		//摧毁当前元素相关的所有对象，包括Div等
					pwdUpdate.pwdDialog = null;
					}
			}]	
		});	
	}

/**
 * 返回查询到的机构列表，创建添加用户对话框
 */
pwdUpdate.init = function(response, opt){
	if (!Index.user)
	{
		alert(""+getResource('resourceParam774')+"");
		return false;
	}
	if (!pwdUpdate.pwdDialog){				
		tlework.addHtml(tlework.divHtml,"userwork");			//动态生成需要绑定的div
		pwdUpdate.pwdDialog = new Ext.Window({ 				//创建对话框
		el:'userwork',
		title: ''+getResource('resourceParam780')+'',
		layout:'fit',
		modal:true,
		width:300,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [pwdUpdate.adduserform()]						//将面板绑定到对话框
		});
	}
	pwdUpdate.pwdDialog.show();								//显示对话框
	new Ext.KeyMap('userwork', {
        key: Ext.EventObject.ENTER,
        fn: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
						
						if(pwdUpdate.userform.form.isValid()){
							var userform = Seam.Remoting.createType("com.luck.itumserv.base.user.GuserForm");
							Ext.apply(userform,pwdUpdate.userform.form.getValues());
							Seam.Component.getInstance("base_user_UserSerivce").updataPassWord(userform,pwdUpdate.save); 
							
					}
					
				},
        scope: this
	});
	
	
}

/**
 * 生成添加用户的Form面板
 */
pwdUpdate.adduserform = function(){
		pwdUpdate.userform = pwdUpdate.getuserform();
		return pwdUpdate.userform;
};
/**
 * 根据返回结果进行操作
 */
pwdUpdate.save = function(result){
	var sign = result.sign;	
	if (sign==true){							
       	
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam776')+'!',
			buttons: Ext.MessageBox.OK
		});	
		pwdUpdate.pwdDialog.hide();
		pwdUpdate.pwdDialog.destroy();		
		pwdUpdate.pwdDialog = null;
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: result.value,
			buttons: Ext.MessageBox.OK
		});
		
	}
	

};
