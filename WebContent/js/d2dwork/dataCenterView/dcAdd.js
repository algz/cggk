
var dcAdd = {issueDialog:null,form:null,temp:null}

dcAdd.init = function(){
	if (!dcAdd.issueDialog){				
		tlework.addHtml(tlework.divHtml,'dcAdd');			//动态生成需要绑定的div
		dcAdd.issueDialog = new Ext.Window({ 				//创建对话框
		el:'dcAdd',
		title: ''+getResource('resourceParam1255')+'',
		modal: true,
		layout:'fit',
		width:400,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [dcAdd.addform()]						//将面板绑定到对话框
		});
	}
	dcAdd.issueDialog.show();
 
	dcAdd.issueDialog.on("hide",function(){
		dcAdd.issueDialog.close();
		dcAdd.issueDialog.destroy();		
		dcAdd.issueDialog = null;
		
	});
}

dcAdd.addform= function(){
	 
	dcAdd.form = new Ext.FormPanel({
		labelWidth: 100, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam561')+''+getResource('resourceParam480')+'',		//文本框
				name: 'dataCenterName',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				// text : 9055--,号.号
				regexText : ''+getResource('resourceParam679')+ '' + getResource('resourceParam9055') + '!',//输入校验
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 100,
				maxLengthText :''+getResource('resourceParam1252')+''+getResource('resourceParam656')+'100',
				allowBlank:false,
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam861')+'',		//文本框
				name: 'description',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam679')+ '' + getResource('resourceParam9055') + '!',// text : 9055--,号.号
				//width:200,
				// text : 9054--请
				blankText: '' + getResource('resourceParam9054') + '' +getResource('resourceParam494')+''+getResource('resourceParam861')+'',
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam861')+''+getResource('resourceParam1198')+'',
				allowBlank:true,
				anchor:'100%'
			}
 
			 ],						
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam466')+'',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径

				if (dcAdd.form.form.isValid()) {
					var dcVo = Seam.Remoting
							.createType("com.luck.itumserv.DataCenter.DataCenterVo");
					Ext.apply(dcVo, dcAdd.form.getForm().getValues());
					callSeam("DataCenterViewService", "insertDataCenter",
								[dcVo], dcAdd.addreturn);//这里可能需要改一下
					
//					myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {
//						start : 0,
//						limit : 25
//					}, {});
					// }

				}
			}
		},
		{
			text :  '' + getResource('resourceParam9002') + '' , // 取消
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				dcAdd.issueDialog.hide();

			}
		}]
	});
		
	return dcAdd.form;
}

/**
 * 根据返回结果进行操作
 */
dcAdd.addreturn = function(result){
	var sign = result;	
	if (sign=="true"){
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});					
	}else{
		dcAdd.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam594')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	//刷新树和grid节点
	var westTreeNode = dataCenterViewWest.tag.getNodeById('0');
	dataCenterViewWest.refreshTreeNode(westTreeNode);
	myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:20},{});
	dcAdd.issueDialog.hide();
	
}
