/**
 * 新建任务问题
 */
var issueAdd = {issueDialog:null,form:null}

issueAdd.init = function(){
	if (!issueAdd.issueDialog){				
		tlework.addHtml(tlework.divHtml,'taskIssue');			//动态生成需要绑定的div
		issueAdd.issueDialog = new Ext.Window({ 				//创建对话框
		el:'taskIssue',
		title: ''+getResource('resourceParam1585')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [issueAdd.addform()]						//将面板绑定到对话框
		});
	}
	issueAdd.issueDialog.show();
	issueAdd.issueDialog.on("hide",function(){
		issueAdd.issueDialog.close();
		issueAdd.issueDialog.destroy();		
		issueAdd.issueDialog = null;
		
	});
}
issueAdd.addform= function(){
	issueAdd.form = new Ext.FormPanel({
		labelWidth: 80, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'chargedmanid',
				width:175,
				value:issueMain.taskData.issuedmanid
			},
			{	inputType:'hidden',
				name: 'chargeddepid',
				width:175,
				value:issueMain.taskData.chargeddepid
			},{
				inputType:'hidden',
				name: 'taskid',
				width:175,
				value:issueMain.taskData.taskid
			},{
				inputType:'hidden',
				name: 'isaofo',
				width:175,
				value:issueMain.taskData.isaofo
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
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1587')+'',
				name: 'taskproblemsnotes',
				width:200,
				height:100,
				maxLength : 400,
				maxLengthText :''+getResource('resourceParam1581')+''
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(issueAdd.form.form.isValid()){
						var issueVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.issue.TaskProblemsVo");
						Ext.apply(issueVo,issueAdd.form.getForm().getValues());
						callSeam("tasklist_issue_TaskProblemsService","taskProAdd",[issueVo],issueAdd.save);
						myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,issueMain.baseargs);
					}
					
				}
			},
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					issueAdd.issueDialog.hide();

					}
			}]	
		});
	return issueAdd.form;
}

/**
 * 根据返回结果进行操作
 */
issueAdd.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam6073'), // 保存成功
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		issueAdd.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,issueMain.baseargs);
	issueAdd.issueDialog.hide();
}
