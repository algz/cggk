/**
 * 查看任务问题
 */
var issueShow = {issueDialog:null,form:null}

issueShow.init = function(){
	myGrid.row = issueMain.issuegrid.selModel.getSelected();
	if(myGrid.row == null || myGrid.row.get('taskproblemsname') == null){									//如未选中任何一行，则不执行操作
	  	Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam1606')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	  	return false;
	  }
	if (!issueShow.issueDialog){				
		tlework.addHtml(tlework.divHtml,'taskIssueShow');			//动态生成需要绑定的div
		issueShow.issueDialog = new Ext.Window({ 				//创建对话框
		el:'taskIssueShow',
		title: ''+getResource('resourceParam1600')+'',
		modal: true,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [issueShow.addform()]						//将面板绑定到对话框
		});
	}
	issueShow.issueDialog.on('click',function(){
		issueShow.issueDialog.hide();
	}
	);
	
	issueShow.issueDialog.show();
	issueShow.issueDialog.on("hide",function(){
		issueShow.issueDialog.close();
		issueShow.issueDialog.destroy();		
		issueShow.issueDialog = null;
		myGrid.row=null;	
	});
}
issueShow.addform= function(){
	issueShow.form = new Ext.FormPanel({
		labelWidth: 80, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	fieldLabel: ''+getResource('resourceParam1586')+'',		//文本框
				name: 'taskproblemsname',
				width:200,
				cls:'readonly',
				readOnly:true,
				value:myGrid.row.get('taskproblemsname')
			},
			new Ext.form.TextArea({
					fieldLabel: ''+getResource('resourceParam6074'), // 事项内容
					name: 'taskproblemsnotes',
					style:'border:0px;background:transparent;',
					readOnly:true,
					width:200,
					height:100,
					value:myGrid.row.get('taskproblemsnotes')
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					issueShow.issueDialog.hide();

					}
			}]	
		});
	return issueShow.form;
}

