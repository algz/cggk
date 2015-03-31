var issueUp = {issueDialog:null,form:null}
issueUp.init = function(){
 	
	
	//myGrid.row = issueGrid.grid.selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1589')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	if (!issueUp.issueDialog){				
		tlework.addHtml(tlework.divHtml,'issueUp');			//动态生成需要绑定的div
		issueUp.issueDialog = new Ext.Window({ 				//创建对话框
		el:'issueUp',
		title: ''+getResource('resourceParam1598')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [issueUp.addform()]						//将面板绑定到对话框
		});
	}
	
	issueUp.issueDialog.show();
	issueUp.issueDialog.on("hide",function(){
		issueUp.issueDialog.close();
		issueUp.issueDialog.destroy();		
		issueUp.issueDialog = null;
		
	});
	
}	
	issueUp.addform=function(){
	
	issueUp.form = new Ext.FormPanel({
		labelWidth: 80, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{   inputType:'hidden',
				name: 'taskproblemsid',
				width:175,
				value:myGrid.row.get('taskproblemsid')
			},
				{
				fieldLabel: ''+getResource('resourceParam1586')+'',		//文本框
				name: 'taskproblemsname',
				width:200,
				blankText:''+getResource('resourceParam1584')+'',
				maxLength : 40,
				maxLengthText :''+getResource('resourceParam1582')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam1583')+'',
				allowBlank:false,
				value:myGrid.row.get('taskproblemsname')
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1587')+'',
				name: 'taskproblemsnotes',
				width:200,
				height:100,
				maxLength : 400,
				maxLengthText :''+getResource('resourceParam1581')+'',
				value:myGrid.row.get('taskproblemsnotes')
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(issueUp.form.form.isValid()){
						var issueVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.issue.TaskProblemsVo");
						Ext.apply(issueVo,issueUp.form.getForm().getValues());
						callSeam("tasklist_issue_TaskProblemsService","taskProUp",[issueVo],issueUp.update);
						myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,{});
					}
					
				}
			},
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					issueUp.issueDialog.hide();

					}
			}]	
		});
	return issueUp.form;
}

issueUp.update = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
Ext.MessageBox.show({
			title: ''+getResource('resourceParam677')+'',
			msg: ''+getResource('resourceParam1607')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});							
	}else{
		issueUp.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,issueMain.baseargs);
	issueUp.issueDialog.hide();
}

