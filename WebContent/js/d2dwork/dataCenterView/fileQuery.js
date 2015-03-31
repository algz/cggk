

var fileQuery = {issueDialog:null,form:null,temp:null}

fileQuery.init = function(){
   
	if (!fileQuery.issueDialog){				
		tlework.addHtml(tlework.divHtml,'fileQuery');			//动态生成需要绑定的div
		fileQuery.issueDialog = new Ext.Window({ 				//创建对话框
		el:'fileQuery',
		title: ''+getResource('resourceParam469')+''+getResource('resourceParam652')+'',
		modal: true,
		layout:'fit',
		width:350,
		height:280,
		closeAction:'hide',
		plain: false,
		items: [fileQuery.addform()]						//将面板绑定到对话框
		});
	}
	fileQuery.issueDialog.show();
 
	fileQuery.issueDialog.on("hide",function(){
		fileQuery.issueDialog.close();
		fileQuery.issueDialog.destroy();		
		fileQuery.issueDialog = null;
		
	});
}

fileQuery.addform= function(){

	 
  	fileQuery.form = new Ext.FormPanel({
		labelWidth: 60, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam481')+'',		//文本框
				name: 'fileType',
				readOnly:true,
				value:''+getResource('resourceParam469')+'',
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam1258')+'',		//文本框
				name: 'dataObjectName',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 100,
				maxLengthText :''+getResource('resourceParam1252')+''+getResource('resourceParam656')+'100',
				allowBlank:true,
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam469')+ '' + getResource('resourceParam9056') + '' ,		//文本框 text : 9056--名
				name: 'value',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 100,
				maxLengthText :''+getResource('resourceParam1252')+''+getResource('resourceParam656')+'100',
				allowBlank:true,
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam476')+ '' + getResource('resourceParam9061') + '' ,		//文本框 text : 9061--词
				name: 'keyWord',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 100,
				maxLengthText :''+getResource('resourceParam1252')+''+getResource('resourceParam656')+'100',
				allowBlank:true,
				anchor:'100%'
			},
			
			{
				fieldLabel: ''+getResource('resourceParam469')+ '' + getResource('resourceParam9064') + '' ,		//文本框  text : 9064--大小
				name: 'fileSize',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1259')+'',
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam1257')+'0',
				allowBlank:true,
				anchor:'100%'
			},
			{
				// text : 9065--编制
				fieldLabel:  '' + getResource('resourceParam9065') + '' +getResource('resourceParam1201')+'',		//文本框
				name: 'department',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1259')+'',
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam1257')+'0',
				allowBlank:true,
				anchor:'100%'
			}
			 ],						
		buttons: [{							//定义面板中的按钮
				text: ''+getResource('resourceParam652')+'',
				handler: function()	{		//为当前按钮绑定事件
				                                    //如果验证通过，则将表单元素提交到指定路径
					if(fileQuery.form.form.isValid()){
						var appVo = Seam.Remoting.createType("com.luck.itumserv.DataCenter.FileDetailVo");
							Ext.apply(appVo,fileQuery.form.getForm().getValues());
						dataCenterViewMain.baseargs={
						   dataObjectName:appVo.getDataObjectName(),
						   value:appVo.getValue(),
						   fileType:appVo.getFileType(),
						   keyWord:appVo.getKeyWord(),
						   fileSize:appVo.getFileSize(),
						   department:appVo.getDepartment()
						   
						}
					    dataCenterViewMain.dataid.getStore().proxy.conn.url = "../JSON/dataobject_service.getAllFiles";  
				  		myGrid.loadvalue(dataCenterViewMain.dataid.store, {start:0,limit:25},dataCenterViewMain.baseargs);   
						fileQuery.issueDialog.hide();
					}
					
				}
			},{  
			 text:  '' + getResource('resourceParam9002') + '' , // 取消
			handler: function(){
				  
					//batcheUpdate.batcheform.form.reset();	//表单重置
					fileQuery.issueDialog.hide();

					}
			}]	
		});
		
	return fileQuery.form;
}

