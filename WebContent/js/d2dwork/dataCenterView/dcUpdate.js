
var dcUpdate = {issueDialog:null,form:null,temp:null}

dcUpdate.init = function(){
	//myGrid.row = dataCenterViewMain.grid.selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			// text :9052--项    9039--进行操作
			msg : ''+getResource('resourceParam459')+'1'+getResource('resourceParam455')+''+getResource('resourceParam474')+ '' + getResource('resourceParam9052') +  '' + getResource('resourceParam9039') + '' ,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	
	if (!dcUpdate.issueDialog){				
		tlework.addHtml(tlework.divHtml,'dcUpdate');			//动态生成需要绑定的div
		dcUpdate.issueDialog = new Ext.Window({ 				//创建对话框
		el:'dcUpdate',
		title: ''+getResource('resourceParam478')+''+getResource('resourceParam561')+'',
		modal: true,
		layout:'fit',
		width:400,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [dcUpdate.addform()]						//将面板绑定到对话框
		});
	}
	dcUpdate.issueDialog.show();
 
	dcUpdate.issueDialog.on("hide",function(){
		dcUpdate.issueDialog.close();
		dcUpdate.issueDialog.destroy();		
		dcUpdate.issueDialog = null;
		
	});
}

dcUpdate.addform= function(){
	
	dcUpdate.form = new Ext.FormPanel({
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
				regexText : ''+getResource('resourceParam679')+ '' + getResource('resourceParam9055') + '!',//输入校验 text : 9055--,号.号
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 100,
				maxLengthText :''+getResource('resourceParam1252')+''+getResource('resourceParam656')+'100',
				allowBlank:false,
				anchor:'100%',
				value:myGrid.row.get("dataObjectName"),
				disabled:false
			},			
			{
				fieldLabel: ''+getResource('resourceParam861')+'',		//文本框
				name: 'description',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam679')+ '' + getResource('resourceParam9055') + '!',//输入校验 text : 9055--,号.号
				//width:200,
				// text : 9054--请
				blankText: '' + getResource('resourceParam9054') + '' +getResource('resourceParam494')+''+getResource('resourceParam861')+'',
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam861')+''+getResource('resourceParam1198')+'',
				allowBlank:true,
				anchor:'100%',
				value:myGrid.row.get("description"),
				disabled:false
			}
 
			 ],						
		buttons: [							//定义面板中的按钮
			{
			text : ''+getResource('resourceParam478')+'',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (dcUpdate.form.form.isValid()) {
					var dcVo = Seam.Remoting
							.createType("com.luck.itumserv.DataCenter.DataCenterVo");
					Ext.apply(dcVo, dcUpdate.form.getForm().getValues());
					dcVo.setDataCenterID(myGrid.row.get("dataCenterID"));
					callSeam("DataCenterViewService", "updateDataCenter",
								[dcVo], dcUpdate.updatereturn);// 这里可能需要改一下
				
//					myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {
//						start : 0,
//						limit : 25
//					}, {});
					// }

				}

			}
		},
			{   text:  '' + getResource('resourceParam9002') + '' , //text : 取消
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					dcUpdate.issueDialog.hide();

					}
			}]	
		});
		
	return dcUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
dcUpdate.updatereturn = function(result){
	var sign = result;	
	if (sign=="true"){
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});
	myGrid.row=null;
	}else{
		dcUpdate.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	//刷新树和grid节点
	var westTreeNode = dataCenterViewWest.tag.getNodeById('0');
	dataCenterViewWest.refreshTreeNode(westTreeNode);
	myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:20},{});
	dcUpdate.issueDialog.hide();
	
}
