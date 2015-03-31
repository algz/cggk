 /**
 * 查看任务问题的解决方案
 */
var descrShow = {issueDialog:null,form:null}

descrShow.init = function(_taskproblemsid){
	callSeam("tasklist_issue_TaskProblemsService","getProblems",[_taskproblemsid],descrShow.getDialog);  
}
descrShow.getDialog = function(value){
	issueUpdate.date = value;
	if (!descrShow.issueDialog){				
		tlework.addHtml(tlework.divHtml,'descrShow');			//动态生成需要绑定的div
		descrShow.issueDialog = new Ext.Window({ 				//创建对话框
		el:'descrShow',
		title: ''+getResource('resourceParam1578')+'',
		modal: false,
		layout:'fit',
		width:320,
		height:220,
		closeAction:'hide',
		plain: false,
		items: [descrShow.addform()]						//将面板绑定到对话框
		});
	}
	descrShow.issueDialog.on('click',function(){
		descrShow.issueDialog.hide();
	}
	);
	
	descrShow.issueDialog.show();
	descrShow.issueDialog.on("hide",function(){
		descrShow.issueDialog.close();
		descrShow.issueDialog.destroy();		
		descrShow.issueDialog = null;
		
	});
}
descrShow.addform= function(){
	descrShow.form = new Ext.FormPanel({
		labelWidth: 80, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[								//定义面板中的表单元素
			{	fieldLabel: ''+getResource('resourceParam1579')+'',		//文本框
				name: 'issuestatus',
				width:200,
				cls:'readonly',
				readOnly:true,
				value:issueUpdate.date.issuestatusstr
			},
			new Ext.form.TextArea({
					fieldLabel: ''+getResource('resourceParam1580')+'',
					name: 'issuedescr',
					style:'border:0px;background:transparent;',
					readOnly:true,
					width:200,
					height:100,
					value:issueUpdate.date.issuedescr
			
			})
			],										
		buttons: [							//定义面板中的按钮
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					descrShow.issueDialog.hide();

					}
			}]	
		});
	return descrShow.form;
}

