
var rowAdd = {issueDialog:null,form:null,temp:null, rank:null}

rowAdd.init = function(){
	Ext.QuickTips.init();
	
	if (!rowAdd.issueDialog){				
		tlework.addHtml(tlework.divHtml,'rowAdd');			//动态生成需要绑定的div
		rowAdd.issueDialog = new Ext.Window({ 				//创建对话框
		el:'rowAdd',
		title: ''+getResource('resourceParam1263')+ '' + getResource('resourceParam9052') + '' , // text : 9052--项
		modal: true,
		layout:'fit',
		width:400,
		height:300,
		closeAction:'hide',
		plain: false,
		items: [rowAdd.addform()]						//将面板绑定到对话框
		});
	}
	rowAdd.issueDialog.show();
 
	rowAdd.issueDialog.on("hide",function(){
		rowAdd.issueDialog.close();
		rowAdd.issueDialog.destroy();		
		rowAdd.issueDialog = null;
		
	});
}

rowAdd.addform= function(){
	rowAdd.combo1=new Ext.form.ComboBox({
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {//可以获取子类型了，但是对于选择的判断，还有类型的过滤仍然需要调试，这里要加入rank，以便判断是不是加入全部的子类型？
							url : "../JSON/DataTypeService.getChildDataTypesByParentDataTypeID?datatypeid=" + dataCenterViewMain.currentNodeDatatypeID
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
				anchor:'100%'
			});
	//选择不同的数据类型，调整可编辑的控件
	rowAdd.combo1.on('select', function(combo, record, index) {	
		rowAdd.rank = record.get('rank');//用于判断是自定义类型还是数组类型还是普通类型
		if (record.get('datatype') == 'dataset') {			
			rowAdd.form.getComponent('dimension').setValue('1');//数据集的维度恢复为1
			rowAdd.form.getComponent('dimension').setDisabled(true);
			rowAdd.form.getComponent('value').setValue('');
			rowAdd.form.getComponent('value').setDisabled(true);
			rowAdd.form.getComponent('unit').setValue('');
			rowAdd.form.getComponent('unit').setDisabled(true);
		} else if (record.get('datatype') == 'file'){			
			rowAdd.form.getComponent('dimension').setDisabled(false);		
			rowAdd.form.getComponent('value').setValue('');
			rowAdd.form.getComponent('value').setDisabled(true);
			rowAdd.form.getComponent('unit').setValue('');
			rowAdd.form.getComponent('unit').setDisabled(true);			
		} else {//恢复可以编辑
			//if (rowAdd.form.getComponent('dimension').disabled);  判断该控件是否是不可编辑状态
			rowAdd.form.getComponent('dimension').setDisabled(false);	
			if (rowAdd.form.getComponent('dimension').getValue() != '1'){//判断dimension是否为1
				rowAdd.form.getComponent('value').setValue('');
				rowAdd.form.getComponent('value').setDisabled(true);
//				rowAdd.form.getComponent('unit').setValue('');
//				rowAdd.form.getComponent('unit').setDisabled(true);
			} else {
				rowAdd.form.getComponent('value').setDisabled(false);
				rowAdd.form.getComponent('unit').setDisabled(false);
			}					
		}//还有自定义数据类型
	});

	 
	rowAdd.form = new Ext.FormPanel({
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
				anchor:'100%'
			},
			{
			fieldLabel : ''+getResource('resourceParam853')+'', // 文本框
			name : 'dimension',
			id : 'dimension',
//			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : ''+getResource('resourceParam1092')+'!',// 输入校验有哪些？
			// width:200,
			value : 1,// 缺省值
			blankText : ''+getResource('resourceParam1254')+'',
			maxLength : 50,
			maxLengthText : ''+getResource('resourceParam1257')+'',
			allowBlank : false,
			anchor : '100%',
			disabled : false,
			listeners : {
				change : function(field, newValue, oldValue) {// 数组维度可能是数字，也可能是2*2等形式
					if (newValue != 1) {
						rowAdd.form.getComponent('value').setValue('');
						rowAdd.form.getComponent('value').setDisabled(true);
						rowAdd.form.getComponent('unit').setValue('');
						rowAdd.form.getComponent('unit').setDisabled(true);
					} else {
						rowAdd.form.getComponent('value').setDisabled(false);
						rowAdd.form.getComponent('unit').setDisabled(false);
					}
				}
			}
		},
			rowAdd.combo1,
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
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam1201')+'',		//文本框
				name: 'unit',
				id: 'unit',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
				//width:200,
				// text 9054--请
				blankText: '' + getResource('resourceParam9054') + '' +getResource('resourceParam494')+''+getResource('resourceParam1201')+''+getResource('resourceParam480')+'',
				maxLength : 540,
				maxLengthText :''+getResource('resourceParam1201')+''+getResource('resourceParam656')+'40',
				allowBlank:true,
				anchor:'100%'
			},
			{
				fieldLabel: ''+getResource('resourceParam861')+'',		//文本框
				name: 'description',
				id: 'description',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',//输入校验有哪些？
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

				if (rowAdd.form.form.isValid()) {
					var doVo = Seam.Remoting
							.createType("com.luck.itumserv.DataCenter.DataObjectVo");
					Ext.apply(doVo, rowAdd.form.getForm().getValues());
					doVo.setDataObjectType(rowAdd.combo1.getValue());
					doVo.setDimension(rowAdd.form.getForm().findField('dimension').getValue());		
					var _dataCenterID = "";
					var _parentID = "";
					if (dataCenterViewMain.currentNodeType == '_dc') {//把数据对象添加到数据中心下面，数据中心下面也要判断，跟数据对象是一样的
						_parentID = '0';
						_dataCenterID = dataCenterViewMain.currentNodeID;
						doVo.setDataCenterID(_dataCenterID);//插入数据中心id
					} else {//把数据对象添加到数据对象下面
						_parentID = dataCenterViewMain.currentNodeID;						
						_dataCenterID = getDataCenter(dataCenterViewWest.tag.getNodeById(dataCenterViewMain.currentFullNodeId));
						doVo.setDataCenterID(_dataCenterID);//插入数据中心id						
					}
					if (rowAdd.rank == 'ContainerType,StructureType'){//自定义数据类型	
							callSeam("DataCenterViewService", "insertCustomType",
								[doVo,_parentID], rowAdd.addreturn);
						} else if (rowAdd.form.getForm().findField('dimension').getValue() != '1') {//数组类型
							callSeam("DataCenterViewService", "insertArray",
								[doVo,_parentID], rowAdd.addreturn);
						} else {						
							callSeam("DataCenterViewService", "insertDataObject",
								[doVo,_parentID], rowAdd.addreturn);
						}
//					myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {
//						start : 0,
//						limit : 25
//					}, {});
				}
			}
		},
		{
			text :  '' + getResource('resourceParam9002') + '' , // text : 取消
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				rowAdd.issueDialog.hide();

			}
		}]
	});
		
	return rowAdd.form;
}

	// 遍历树节点，找到节点所属的数据中心节点的id
	function getDataCenter(node) {
		while (node.parentNode.id != '0') {
			node = node.parentNode;
		}
		return node.id.substring(3);
	}
/**
 * 根据返回结果进行操作
 */
rowAdd.addreturn = function(result){
	var sign = result;	
	if (sign=="true"){
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});					
	}else{
		rowAdd.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
	//刷新树和grid节点
	var westTreeNode = dataCenterViewWest.tag.getNodeById(dataCenterViewMain.currentFullNodeId);
	dataCenterViewWest.refreshTreeNode(westTreeNode);
	myGrid.loadvalue(dataCenterViewMain.onlinegrid.store, {start:0,limit:20},{});
	rowAdd.issueDialog.hide();
	
}
