
var rowUpdate = {issueDialog:null,form:null,temp:null,datatypeid:null}

rowUpdate.init = function(){
	//myGrid.row = dataCenterViewMain.grid.selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam459')+'1'+getResource('resourceParam455')+''+getResource('resourceParam474')+ '' + getResource('resourceParam9052') +  '' + getResource('resourceParam9039') + '' , // text : 9052--项    9039--进行操作
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	
	if (!rowUpdate.issueDialog){				
		tlework.addHtml(tlework.divHtml,'rowUpdate');			//动态生成需要绑定的div
		rowUpdate.issueDialog = new Ext.Window({ 				//创建对话框
		el:'rowUpdate',
		// text : 9063--更新    9052--项
		title:  '' + getResource('resourceParam9063') + '' +getResource('resourceParam474')+ '' + getResource('resourceParam9052') + '' ,
		modal: true,
		layout:'fit',
		width:400,
		height:300,
		closeAction:'hide',
		plain: false,
		items: [rowUpdate.addform()]						//将面板绑定到对话框
		});
	}
	rowUpdate.issueDialog.show();
 
	rowUpdate.issueDialog.on("hide",function(){
		rowUpdate.issueDialog.close();
		rowUpdate.issueDialog.destroy();		
		rowUpdate.issueDialog = null;
		
	});
}

rowUpdate.addform= function(){
	rowUpdate.combo1=new Ext.form.ComboBox({
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
						},{
							name : 'datatype'		
						},{
							name : 'rank'		
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
				anchor:'100%',
				id: 'combo1'
			});
//			rowUpdate.combo1.on('select',function(combo,record,num){
//			rowUpdate.datatypeid=null;
//			}); 
	//选择不同的数据类型，调整可编辑的控件
	//类型之间的切换要注意保证业务逻辑的一致性
	rowUpdate.combo1.on('select', function(combo, record, index) {
		rowUpdate.datatypeid=null;
		if (record.get('datatype') == 'dataset') {			
			rowUpdate.form.getComponent('dimension').setValue('1');//数据集的维度恢复为1
			rowUpdate.form.getComponent('dimension').setDisabled(true);
			rowUpdate.form.getComponent('value').setValue('');
			rowUpdate.form.getComponent('value').setDisabled(true);
			rowUpdate.form.getComponent('unit').setValue('');
			rowUpdate.form.getComponent('unit').setDisabled(true);
		} else if (record.get('datatype') == 'file'){			
			rowUpdate.form.getComponent('dimension').setDisabled(false);		
			rowUpdate.form.getComponent('value').setValue('');
			rowUpdate.form.getComponent('value').setDisabled(true);
			rowUpdate.form.getComponent('unit').setValue('');
			rowUpdate.form.getComponent('unit').setDisabled(true);			
		} else {//恢复可以编辑
			//if (rowUpdate.form.getComponent('dimension').disabled);  判断该控件是否是不可编辑状态
			rowUpdate.form.getComponent('dimension').setDisabled(false);	
			if (rowUpdate.form.getComponent('dimension').getValue() != '1'){//判断dimension是否为1
				rowUpdate.form.getComponent('value').setValue('');
				rowUpdate.form.getComponent('value').setDisabled(true);
				rowUpdate.form.getComponent('unit').setValue('');
				rowUpdate.form.getComponent('unit').setDisabled(true);
			} else {
				rowUpdate.form.getComponent('value').setDisabled(false);
				rowUpdate.form.getComponent('unit').setDisabled(false);
			}					
		}//还有自定义数据类型
	});

	 
	rowUpdate.form = new Ext.FormPanel({
		labelWidth: 60, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent;',
		defaultType: 'textfield',
		items:[	
			{
				fieldLabel: ''+getResource('resourceParam480')+'',		//文本框
				name: 'dataObjectName',
				id: 'dataObjectName',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
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
				fieldLabel: ''+getResource('resourceParam853')+'',		//文本框
				name: 'dimension',
				id: 'dimension',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1254')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam1257')+'',
				allowBlank:true,
				anchor:'100%',
				value:myGrid.row.get("dimension"),
				disabled:false,
			    listeners : {
					change : function(field, newValue, oldValue) {// 数组维度可能是数字，也可能是2*2等形式
					if (newValue != 1) {
						rowUpdate.form.getComponent('value').setValue('');
						rowUpdate.form.getComponent('value').setDisabled(true);
						rowUpdate.form.getComponent('unit').setValue('');
						rowUpdate.form.getComponent('unit').setDisabled(true);
					} else {
						rowUpdate.form.getComponent('value').setDisabled(false);
						rowUpdate.form.getComponent('unit').setDisabled(false);
					}
					}
				}
			},
			rowUpdate.combo1,
			{
				fieldLabel: ''+getResource('resourceParam511')+'',		//文本框
				name: 'value',
				id: 'value',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText:''+getResource('resourceParam1259')+'',
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam1257')+'0',
				allowBlank:true,
				anchor:'100%',
				value:myGrid.row.get("value"),				
				disabled:false
			},
			{
				fieldLabel: ''+getResource('resourceParam1201')+'',		//文本框
				name: 'unit',
				id: 'unit',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText: '' + getResource('resourceParam9054') + '' +getResource('resourceParam494')+''+getResource('resourceParam1201')+''+getResource('resourceParam480')+'',
				maxLength : 540,
				maxLengthText :''+getResource('resourceParam1201')+''+getResource('resourceParam656')+'40',
				allowBlank:true,
				anchor:'100%',
				value:myGrid.row.get("unit"),
				disabled:false
			},
			{
				fieldLabel: ''+getResource('resourceParam861')+'',		//文本框
				name: 'description',
				id: 'description',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				blankText: '' + getResource('resourceParam9054') + '' +getResource('resourceParam494')+''+getResource('resourceParam861')+'',
				maxLength : 200,
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
				if (rowUpdate.form.form.isValid()) {
					var doVo = Seam.Remoting
							.createType("com.luck.itumserv.DataCenter.DataObjectVo");
					Ext.apply(doVo, rowUpdate.form.getForm().getValues());
					if(rowUpdate.datatypeid== null || rowUpdate.datatypeid == ""){
							doVo.setDataObjectType(rowUpdate.combo1.getValue());	
						}else {
							doVo.setDataObjectType(rowUpdate.datatypeid);	
						}
					doVo.setDataObjectID(myGrid.row.get("dataObjectID"));
					doVo.setDataObjectName(rowUpdate.form.getForm().findField('dataObjectName').getValue());//从row里面获取的是旧的信息，应该从form里面获取				
					doVo.setDataCenterID(myGrid.row.get("dataCenterID"));					
					doVo.setIsRef(myGrid.row.get("isRef"));					
					doVo.setDimension(rowUpdate.form.getForm().findField('dimension').getValue());
					
					//这里要根据类型之间的转换做修改判断逻辑

					callSeam("DataCenterViewService", "updateDataObject", [
								doVo],
								rowUpdate.updatereturn);
//					myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {
//						start : 0,
//						limit : 20
//					}, {});
				}

			}
		},
			{   text:  '' + getResource('resourceParam9002') + '' ,
				handler: function(){
					//batcheUpdate.batcheform.form.reset();	//表单重置
					rowUpdate.issueDialog.hide();

					}
			}],
				listeners : {				
				beforerender : function(component) {
					var _parentRef = dataCenterViewWest.tag.getSelectionModel()
						.getSelectedNode().attributes.isRef;
				if ('Array' == _parentRef) {// 数组元素，本身是数组元素也要处理
					component.getComponent('dataObjectName').setDisabled(true);
					component.getComponent('combo1').setDisabled(true); // 数据类型
					component.getComponent('dimension').setDisabled(true);
					component.getComponent('unit').setDisabled(true);
				} else if ('Custom' == _parentRef
						|| 'CustomChild' == _parentRef) {// 自定义类型子项,需要进一步确认如何判断是自定义类型的子项？
					component.getComponent('dataObjectName').setDisabled(true);
					component.getComponent('combo1').setDisabled(true); // 数据类型
					component.getComponent('dimension').setDisabled(true);
				} else {
					var isRef = myGrid.row.get('isRef');				
					if ('Array' == isRef) {// 数组元素，本身是数组元素也要处理
//						component.getComponent('dataObjectName')
//								.setDisabled(true);
						component.getComponent('combo1').setDisabled(true); // 数据类型
						component.getComponent('dimension').setDisabled(true);
						component.getComponent('value').setDisabled(true);// 修改了unit，同时要更新下面的unit
					} else if ('Custom' == isRef) {// 自定义类型子项,需要进一步确认如何判断是自定义类型的子项？
//						component.getComponent('dataObjectName')
//								.setDisabled(true);
						component.getComponent('combo1').setDisabled(true); // 数据类型
						component.getComponent('dimension').setDisabled(true);
						component.getComponent('value').setDisabled(true);
						component.getComponent('unit').setDisabled(true);
					} else {
						var _dataType = rowUpdate.datatypeid;							
						if (_dataType == 'dataset') {							
							component.getComponent('dimension')
									.setDisabled(true);							
							component.getComponent('value').setDisabled(true);							
							component.getComponent('unit').setDisabled(true);
						} else if (_dataType == 'file') {
							component.getComponent('dimension')
									.setDisabled(true);							
							component.getComponent('value').setDisabled(true);							
							component.getComponent('unit').setDisabled(true);
						}
					}
				}
				}
			}	
		});
		rowUpdate.combo1.value=myGrid.row.get("dataTypeEntity.dataTypeName");
		rowUpdate.datatypeid=myGrid.row.get("dataObjectType");
		
	return rowUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
rowUpdate.updatereturn = function(result){
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
		rowUpdate.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}	
	//刷新树和grid节点
	var westTreeNode = dataCenterViewWest.tag.getNodeById(dataCenterViewMain.currentFullNodeId);
	dataCenterViewWest.refreshTreeNode(westTreeNode);
    myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:20},{});
	rowUpdate.issueDialog.hide();
	
}
