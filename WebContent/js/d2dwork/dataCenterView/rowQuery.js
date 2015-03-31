

var rowQuery = {issueDialog:null,form:null,temp:null}

rowQuery.init = function(){
   
	if (!rowQuery.issueDialog){				
		tlework.addHtml(tlework.divHtml,'rowQuery');			//动态生成需要绑定的div
		rowQuery.issueDialog = new Ext.Window({ 				//创建对话框
		el:'rowQuery',
		title: ''+getResource('resourceParam474')+''+getResource('resourceParam652')+'',
		modal: true,
		layout:'fit',
		width:350,
		height:180,
		closeAction:'hide',
		plain: false,
		items: [rowQuery.addform()]						//将面板绑定到对话框
		});
	}
	rowQuery.issueDialog.show();
 
	rowQuery.issueDialog.on("hide",function(){
		rowQuery.issueDialog.close();
		rowQuery.issueDialog.destroy();		
		rowQuery.issueDialog = null;
		
	});
}

rowQuery.addform= function(){
	rowQuery.combo1=new Ext.form.ComboBox({
		        name: 'DataTypeID',
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/DataTypeService.getAllDataTypes"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'datatypeid'
						},{

							name : 'datatypename'

						}])
					}),
				allowBlank:false,
				valueField :"datatypeid",
				displayField: "datatypename",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'datatypeid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam481')+'',
        		name: 'datatypeid',
    			anchor:'100%'
			});
	 
  	rowQuery.form = new Ext.FormPanel({
		labelWidth: 60, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam480')+'',		//文本框
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
			rowQuery.combo1,
			{
				fieldLabel: ''+getResource('resourceParam511')+'',		//文本框
				name: 'value',
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
					if(rowQuery.form.form.isValid()){
						var appVo = Seam.Remoting.createType("com.luck.itumserv.DataCenter.DataObjectVo");
							Ext.apply(appVo,rowQuery.form.getForm().getValues());
							appVo.setDataObjectType(rowQuery.combo1.getValue());	
						dataCenterViewMain.baseargs={
						   dataObjectName:appVo.getDataObjectName(),
						   dataObjectType:appVo.getDataObjectType(),
						   value:appVo.getValue()
						}
						dataCenterViewMain.dataid.getStore().proxy.conn.url = "../JSON/dataobject_service.getDataObject";  
						myGrid.loadvalue(dataCenterViewMain.dataid.store, {start:0,limit:25},dataCenterViewMain.baseargs);   
						rowQuery.issueDialog.hide();
					}
					
				}
			},{  
			 text:  '' + getResource('resourceParam9002') + '' , // text : 取消
			handler: function(){
				  
					//batcheUpdate.batcheform.form.reset();	//表单重置
					rowQuery.issueDialog.hide();

					}
			}]	
		});
		
	return rowQuery.form;
}
