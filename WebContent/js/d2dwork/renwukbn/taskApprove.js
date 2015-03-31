//审批窗口
var taskApprove = {issueDialog:null,form:null}

taskApprove.init = function(taskid, userid){
	if (!taskApprove.issueDialog){				
		tlework.addHtml(tlework.divHtml,'taskApprove');			//动态生成需要绑定的div
		taskApprove.issueDialog = new Ext.Window({ 				//创建对话框
		el:'taskApprove',
		title: ''+getResource('resourceParam1450')+'',
		modal: true,
		layout:'fit',
		width:500,
		height:290,
		closeAction:'hide',
		plain: false,
		items: [taskApprove.addform(taskid, userid)]						//将面板绑定到对话框
		});
	}
	taskApprove.issueDialog.show();
 
	taskApprove.issueDialog.on("hide",function(){
		taskApprove.issueDialog.close();
		taskApprove.issueDialog.destroy();		
		taskApprove.issueDialog = null;
		
	});
}

taskApprove.addform= function(taskid, userid){
	 
	taskApprove.form = new Ext.FormPanel({
		labelWidth: 100, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',		
		items:[
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam727')+'',
				name: 'approveNote',
				width:300,
				height:160,
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam1171')+''
			}),
			{
			baseCls : 'x-plain',
			xtype : 'panel',
			layout : 'table',
			fieldLabel : ''+getResource('resourceParam1045')+'',
			defaultType : 'radio',
			isFormField : true,
			items : [{
				name : 'isAgree',
				boxLabel : '' + getResource('resourceParam6058'), // 6058同意
				value : 'true',
				checked : true
			}, {
				name : 'isAgree',
				boxLabel : ''+getResource('resourceParam1176')+'',
				value : 'false'
			}]
		}
			 ],						
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam479')+'',
			handler : function(button) // 为当前按钮绑定事件
			{ 
				button.disable();
				var isAgree = taskApprove.form.form.findField('isAgree').getValue();
				var approveNote = taskApprove.form.form.findField('approveNote').getValue();	
				
				if (isAgree==false && approveNote.length==0){
					Ext.MessageBox.alert(''+getResource('resourceParam575')+'',''+getResource('resourceParam1655')+'');
					button.enable();
					return;
				}
				if (isAgree==true && approveNote.length==0){
					approveNote+='' + getResource('resourceParam6058');		// 同意			
				}
				// 如果验证通过，则将表单元素提交到指定路径
				if (taskApprove.form.form.isValid()) {
					var vo = Seam.Remoting
							.createType("com.luck.itumserv.tasklist.TaskApproveVo");
					Ext.apply(vo, taskApprove.form.getForm().getValues());
					vo.setIsAgree(isAgree);
					vo.setApproveNote(approveNote);
					vo.setTaskid(taskid);
					vo.setApprovemanid(userid);
					callSeam("tasklist_taskService", "taskApprove",
								[vo], renwukbnQuery.updateBack1);//在回调函数里面刷新界面
					taskApprove.issueDialog.hide();
				}
				button.enable();
			}
		},
		{
			text : ''+getResource('resourceParam6002')+'', // 取消
			handler : function() {
				taskApprove.issueDialog.hide();
			}
		}]
	});
		
	return taskApprove.form;
}

///**
// * 根据返回结果进行操作
// */
//taskApprove.approveReturn = function(result){
//	var sign = result;	
//	if (sign=="true"){
////		Ext.MessageBox.show({
////			title: '保存成功',
////			msg: '您的信息已保存成功!',
////			buttons: Ext.MessageBox.OK,
////		    icon: Ext.MessageBox.INFO
////		});					
//		//刷新界面
//	}else{
//		taskApprove.form.form.reset();
//		Ext.MessageBox.show({
//			title: '更新数据失败',
//			msg: sign,
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.ERROR 
//		});
//	}
//	taskApprove.issueDialog.hide();	
//}
