/**
 *回复任务问题
 */
var issueUpdate = {issueDialog:null,form:null}

issueUpdate.init = function(_taskproblemsid){
	callSeam("tasklist_issue_TaskProblemsService","getProblems",[_taskproblemsid],issueUpdate.getDialog); 
}
issueUpdate.getDialog = function(value){
	issueUpdate.date = value;
	if (!issueUpdate.issueDialog){				
		tlework.addHtml(tlework.divHtml,'issueUpdate');			//动态生成需要绑定的div
		issueUpdate.issueDialog = new Ext.Window({ 				//创建对话框
		el:'issueUpdate',
		title: ''+getResource('resourceParam1609')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [issueUpdate.addform()]						//将面板绑定到对话框
		});
	}
	issueUpdate.issueDialog.show();
	issueUpdate.issueDialog.on("hide",function(){
		issueUpdate.issueDialog.close();
		issueUpdate.issueDialog.destroy();		
		issueUpdate.issueDialog = null;
		
	});
}
issueUpdate.addform= function(){
	issueUpdate.form = new Ext.FormPanel({
		labelWidth: 80, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	inputType:'hidden',
				name: 'taskproblemsid',
				width:175,
				value:issueUpdate.date.taskproblemsid
			},
			{	
				xtype:'combo',
				store: new Ext.data.SimpleStore({
					fields: ["issuestatus", "name"],
					data:[["1",""+getResource('resourceParam1234')+""],["2",""+getResource('resourceParam1610')+""]]
				}),	
				valueField :"issuestatus",
				displayField: "name",
				mode: 'local',
				width:200,
				forceSelection: true,
				blankText:''+getResource('resourceParam929')+'',
				emptyText:''+getResource('resourceParam934')+'',
				hiddenName:'issuestatus',
				editable: false,
				value:issueUpdate.date.issuestatus,
				triggerAction: 'all',
				allowBlank:false,
				fieldLabel: ''+getResource('resourceParam1579')+'',
				name: 'issuestatus'
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam1580')+'',
				name: 'issuedescr',
				width:200,
				value:issueUpdate.date.issuedescr,
				height:100,
				maxLength : 400,
				maxLengthText :''+getResource('resourceParam1608')+''
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{	text: ''+getResource('resourceParam505')+'',
				handler: function()			//为当前按钮绑定事件
					{						//如果验证通过，则将表单元素提交到指定路径
					if(issueUpdate.form.form.isValid()){
						var issueVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.issue.TaskProblemsVo");
						Ext.apply(issueVo,issueUpdate.form.getForm().getValues());
						callSeam("tasklist_issue_TaskProblemsService","taskProUpdate",[issueVo],issueUpdate.save);
					}
					
				}
			},
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					issueUpdate.issueDialog.hide();

					}
			}]	
		});
	return issueUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
issueUpdate.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam6073'), // 保存成功
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		issueUpdate.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,issueMain.baseargs);
	issueUpdate.issueDialog.hide();
}
