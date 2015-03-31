var contractGrid = {
	limit : 15,
	start : 0,
	type : 1,
	queryParams : {
		limit : 15,
		start : 0,
		contractCode : null,
		contractName : null,
		contractAmount : null,
		createDate : null,
		type : 1
	}
}

contractGrid.initWindow = function(config, valueObject, callback) {

	var self = this;
	this.fileUploadField = new Ext.form.FileUploadField({
				buttonText : '' + getResource('resourceParam569') + '',
				allowBlank : false,
				border : false,
				readOnly : false
			});
	this.uploadForm = new Ext.form.FormPanel({
				layout : 'fit',
				fileUpload : true,
				border : false,
				items : [this.fileUploadField]
			});

	this.window = new Ext.Window({
		title : "合同文件上传",
		width : 300,
		minHeight : 60,
		height : 100,
		resizable : true,
		buttonAlign : 'center',
		border : false,
		modal : true,
		items : [new Ext.form.Label({
							html : valueObject.name
						}), this.uploadForm],
		buttons : [{
			text : '' + getResource('resourceParam470') + '',
			handler : function() {
				if (valueObject.checkStr != undefined) {
					var filenamepath = self.fileUploadField.getValue();
					var fileType = filenamepath.substr(filenamepath
							.lastIndexOf("."));
					var arrCheckFileType = valueObject.checkStr.split(",");
					function checkIsValidType() {
						for (var i = 0; i < arrCheckFileType.length; i++) {
							var type = fileType.replace(".", "");
							var tempType = arrCheckFileType[i].replace(".", "");
							if (type == tempType) {
								return true;
							}
						}
						return false;
					}
					if (valueObject.checkStr != "" && !checkIsValidType()) {
						Ext.Msg.alert(
								"" + getResource('resourceParam575') + "",
								"文件格式不合法！");
						return false;
					}
				}
				if (!self.uploadForm.getForm().isValid()) {
					Ext.Msg.alert('' + getResource('resourceParam575') + '', ""
									+ getResource('resourceParam985') + "")
				} else {
					self.uploadForm.getForm().submit({
						url : config.upUrl,
						waitMsg : '' + getResource('resourceParam984') + '',
						success : function(form, result) {
							if (result.result.fileId == undefined) {
								Ext.Msg.alert(
										'' + getResource('resourceParam575')
												+ '',
										"" + getResource('resourceParam470')
												+ "出现异常！")
							} else {
								callback(self, form, result, "success");
							}
						},
						failure : function(form, result) {
							Ext.Msg.alert('' + getResource('resourceParam575')
											+ '', ""
											+ getResource('resourceParam470')
											+ "出现异常！")
						}
					})
				}
			}
		}, {
			text : '取消',
			handler : function() {
				self.window.close();
			}
		}]
	})
	if (typeof afterInitCallback == 'function') {
		afterInitCallback(this.uploadForm, this.window);
	}
	this.window.show();
}

contractGrid.fileUpload = function(isCreate) {

	var config = {
		upUrl : '../JSON/contract_FileUpload'
	}

	var valueObject = {
		name : '本地上传：',
		checkStr : 'xls,xlsx,doc,docx,txt'
	}

	contractGrid.initWindow(config, valueObject, function(self, form, result,
					flag) {
				if (flag) {
					if (isCreate) {
						contractGrid.fromPanel.getForm('form1')
								.findField('fileValeName')
								.setValue(result.result.fileName);
						contractGrid.fromPanel.getForm('form1')
								.findField('contractFile')
								.setValue(result.result.fileId + '||'
										+ result.result.fileName);

					} else {
						contractGrid.editfromPanel.getForm('form2')
								.findField('fileValeName')
								.setValue(result.result.fileName);
						contractGrid.editfromPanel.getForm('form2')
								.findField('contractFile')
								.setValue(result.result.fileId + '||'
										+ result.result.fileName);
					}
				}
				self.window.close();
			});
}

var getStockGridpanelForCreate = function(flag) {
	var sm = new Ext.grid.CheckboxSelectionModel({
				width : 20
			});
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
				header : "编号",
				dataIndex : 'tender_code'
			}, {
				header : "名称",
				dataIndex : 'tender_name'
			}, {
				header : "单位",
				dataIndex : 'tender_department'
			}, {
				header : "招标方式",
				dataIndex : 'tender_type',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex,
						store){
					if(value == '1')
						return '招标'
					else if(value == '2')
						return '委托'
					else if(value == '3')
						return '定向采购'
					else if(value == '4')
						return '委托招标'
					else if(value == '5')
						return '自行比价'
				}
			},
//			{
//				header : "状态",
//				dataIndex : 'status'
//			},
			{
				header : "生成日期",
				dataIndex : 'createdate'
			}]);

	cm.defaultSortable = true;
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/contract_Remote.getTenderList',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'contractId'
			}, ['tender_id', 'tender_code', 'tender_name', 'tender_department',
					'tender_type', 'status', 'createdate']);

	contractGrid.ds1 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	contractGrid.gridPanel1 = new Ext.grid.EditorGridPanel({
				region : 'south',
				store : contractGrid.ds1,
				cm : cm,
				height : 200,
				layout : 'fit',
				selModel : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : contractGrid.limit,
							store : contractGrid.ds1,
							displayInfo : true
						})
			});

	contractGrid.ds1.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, {
							start : contractGrid.start,
							limit : contractGrid.limit,
							flag : 1,
							tenderType:flag
						});

			});
	contractGrid.ds1.load();
	return contractGrid.gridPanel1;
}

var getStockGridpanelForEditor = function(contractId,flag) { 
	var checkboxRenderer = function(value, cellmeta, record, rowIndex,
			columnIndex, store) {
		var flag = record.get('flag');
		var isSelect = false;
		if (1 == flag) {
			isSelect = true;
		}

		if (isSelect) {
			return '<input sytle="padding-left:2px" checked type=\"checkbox\">'
		} else {
			return '<input sytle="padding-left:2px" type=\"checkbox\">'
		}

	}

	var sm = new Ext.grid.CheckboxSelectionModel({
				width : 20,
				singleSelect : false				 
				//renderer : checkboxRenderer.createDelegate(this)
			});

	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
				header : "编号",
				dataIndex : 'tender_code'
			}, {
				header : "名称",
				dataIndex : 'tender_name'
			}, {
				header : "单位",
				dataIndex : 'tender_department'
			}, {
				header : "招标方式",
				dataIndex : 'tender_type',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex,
						store){
					if(value == '1')
						return '招标'
					else if(value == '2')
						return '委托'
					else if(value == '3')
						return '定向采购'
					else if(value == '4')
						return '委托招标'
					else if(value == '5')
						return '自行比价'
				}
			},
//			{
//				header : "状态",
//				dataIndex : 'status'
//			}, 
			{
				header : "生成日期",
				dataIndex : 'createdate'
			}]);

	cm.defaultSortable = true;
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/contract_Remote.getTenderList',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'contractId'
			}, ['tender_id', 'tender_code', 'tender_name', 'tender_department',
					'tender_type', 'status', 'createdate', 'flag']);

	contractGrid.ds2 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	contractGrid.gridPanel2 = new Ext.grid.EditorGridPanel({
				region : 'south',
				store : contractGrid.ds2,
				cm : cm,
				height : 200,
				layout : 'fit',
				selModel : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : contractGrid.limit,
							store : contractGrid.ds2,
							displayInfo : true
						})
			});

	contractGrid.ds2.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, {
							start : contractGrid.start,
							limit : contractGrid.limit,
							flag : 2,
							contractId : contractId,
							tenderType:flag
						});

			});
	contractGrid.ds2.load();
	contractGrid.ds2.on('load', function(ds) { 
		var records = ds.data.items;
		for(var i=0;i<records.length;i++){
			var record = records[i]
			if("1"==record.get("flag")){
				contractGrid.gridPanel2.getSelectionModel().selectRow(i,true);
			}
		}
	}); 
	contractGrid.gridPanel2.on({   
            render:{   
                fn: function() {   
                   contractGrid.ds2.load();   
                }   
            },   
            scope:contractGrid.gridPanel2 
        });  
	
	return contractGrid.gridPanel2;
}

var createForm = function(flag) {

	contractGrid.fromPanel = new Ext.form.FormPanel({
		region : 'center',
		id : 'form1',
		border : false,
		height : 300,
		fileUpload : true,
		labelWidth : 55,
		labelAlign : 'left',
		items : [{
			xtype : 'fieldset',
			title : '',
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [ 
//				        {
//							xtype : 'textfield',
//							fieldLabel : '甲方',
//							name : 'departmentA',
//							maxLength : 199,
//							disabled : false,
//							width : '90%',
//							allowBlank:false
//						}, 
						{
							xtype : 'textfield', 
							name : 'contractCode', 
							fieldLabel : '合同编号',
							disabled : false,
							width : '90%',
							maxLength : 40,
							allowBlank:false
						},
						{
							xtype : 'numberfield',
							fieldLabel : '金额(元)',
							name : 'contractAmount',
							allowBlank:false,
							maxLength : 10,
							regex : /^\d+(\.\d{1,3})?$/,
							regexText : '合同金额只能是数字！',
							disabled : false,
							width : '90%'
						},{
							fieldLabel : '合同文件', 
							id : 'form-file',
							anchor : '92%',
							xtype:'fileuploadfield', 
							name : 'fileName',  
				            buttonText:'浏览...',
				            allowBlank:false,
				            blankText:'请上传合同文件！' 
		               }, {
							xtype : 'textfield',
							fieldLabel : '备注',
							maxLength : 199,
							name : 'reMark',
							disabled : false,
							width : '90%'
						}]
			}, {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
							xtype : 'textfield',
							fieldLabel : '合同名称',
							allowBlank : false,
							maxLength : 199,
							name : 'contractName',
							disabled : false,
							width : '90%'
						}, {
							xtype : 'textfield',
							fieldLabel : '乙方',
							name : 'departmentB',
							maxLength : 199,
							disabled : false,
							width : '90%',
							listeners : {
						    	focus : function(field){ 
									contractGrid.getVendor('form1').show(); 
								}
							}
						}, {
							xtype : 'datefield',
							fieldLabel : '签订时间',
							format : 'Y-m-d',
							name : 'createDate',
							disabled : false,
							anchor : '92%'
						},
//						{
//							xtype : 'textfield', 
//							name : 'contractCode', 
//							hidden : true
//						},
						{name:'fileId',hidden:true},{name:'vendorId',xtype:'hidden'}]
			}]
		}]
	});

	var mainpanel = new Ext.Panel({
				layout : 'border',
				items : [contractGrid.fromPanel, getStockGridpanelForCreate(flag)]
			})

	var win1 = new Ext.Window({
		title : "新建合同",
		layout : 'fit',
		width : 670,
		height : 420,
		autoScroll : true,
		closeAction : 'close',
		items : mainpanel,
		buttons : [{
			text : '提交',
			handler : function() {

				var s = contractGrid.gridPanel1.getSelectionModel()
						.getSelections();
				if (s.length > 0) {
					tenderIds = [];
					for (var i = 0, r; r = s[i]; i++) {
						tenderIds[i] = r.data.tender_id;
					}

					var contractForm = contractGrid.fromPanel.getForm('form1')
							.getFieldValues();
						
//					var val = form.contractAmount;
//					if (val != null) {
//						var flag = (!isNaN(val)) ? true : false;
//						if (!flag) {
//							Ext.MessageBox.show({
//										title : '警告',
//										msg : '金额请输入数字!',
//										buttons : Ext.MessageBox.OK,
//										icon : Ext.MessageBox.ERROR
//									});
//							Ext.get("contractAmount").value = "";
//							return;
//						}
//					}
//				   
					if (contractGrid.fromPanel.form.isValid()) {
							contractGrid.fromPanel.form.doAction('submit', {
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								var vo = Seam.Remoting
										.createType("com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo");
										
								vo.setContractName(contractForm.contractName);
								vo.setContractCode(contractForm.contractCode);
								vo.setDepartmentA(contractForm.departmentA);
								vo.setDepartmentB(contractForm.departmentB);
								vo.setContractAmount(contractForm.contractAmount);
								vo.setCreateDate(new Date(contractForm.createDate).format('Y-m-d'));
								vo.setVendorId(contractForm.vendorId);
								var	fileName = action.result.fileName;   
								if(fileName.indexOf("\\")!=-1)
									    fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
								vo.setFileName(fileName);
								vo.setFileId( action.result.fileId);
								vo.setReMark(contractForm.reMark);
								vo.setType(contractGrid.type);
								Seam.Component.getInstance("contract_Remote")
										.createContract(vo, tenderIds, function(result) {
													if (result) {
														contractGrid.ds.load();
														win1.close();
													} else {
														Ext.MessageBox.alert("提示",
																"新建失败!");
													}
												});
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',action.result);
							}
				
							})
				  }
				} else {
					Ext.MessageBox.alert("提示", "请选择对应的招标项!");
				}
			}
		}, {
			text : '返回',
			handler : function() {
				win1.close();
			}
		}]
	}).show();
};

var editorForm = function(contractId,flag) { 
	var jsonData = new Ext.data.JsonReader({
				root : 'results'
			}, [{
						name : 'contractCode',
						mapping : 'contractCode',
						type : 'string'
					}, {
						name : 'departmentA',
						mapping : 'departmentA',
						type : 'string'
					}, {
						name : 'contractAmount',
						mapping : 'contractAmount',
						type : 'string'
					}, {
						name : 'contractName',
						mapping : 'contractName',
						type : 'string'
					}, {
						name : 'departmentB',
						mapping : 'departmentB',
						type : 'string'
					}, {
						name : 'createDate',
						mapping : 'createDate',
						type : 'string'
					}, {
						name : 'reMark',
						mapping : 'reMark',
						type : 'string'
					}, {
						name : 'fileName',
						mapping : 'fileName',
						type : 'string'
					}, {
						name : 'fileId',
						mapping : 'fileId',
						type : 'string'
					}, {
						name : 'vendorId',
						mapping : 'vendorId',
						type : 'string'
					}])

	contractGrid.editfromPanel = new Ext.form.FormPanel({
		region : 'center',
		id : 'form2',
		border : false,
		fileUpload : true,
		height : 300,
		labelWidth : 55,
		labelAlign : 'left',
		reader : jsonData,
		items : [{
			xtype : 'fieldset',
			title : '',
			layout : 'column',
			items : [{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [  
				         //甲方应该是默认的洪都公司
//				          {
//							xtype : 'textfield',
//							fieldLabel : '甲方',
//							name : 'departmentA',
//							maxLength : 199,
//							disabled : false,
//							width : '90%'
//						}
				        {
							xtype : 'textfield', 
							name : 'contractCode', 
							fieldLabel : '合同编号',
							allowBlank : false,
							width : '90%',
							maxLength : 50
						},
						{
							xtype : 'numberfield',
							fieldLabel : '合同金额',
							name : 'contractAmount',
							maxLength : 10,
							disabled : false,
							width : '90%'
						},{
							fieldLabel : '合同文件', 
							id : 'form-file',
							anchor : '92%',
							xtype:'fileuploadfield', 
							name : 'fileName',  
				            buttonText:'浏览...',
				            allowBlank:false,
				            blankText:'请上传合同文件！' 
		               }, {
							xtype : 'textfield',
							fieldLabel : '备注',
							maxLength : 199,
							name : 'reMark',
							disabled : false,
							width : '90%'
						}]
			}, {
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [{
							xtype : 'textfield',
							fieldLabel : '合同名称',
							allowBlank : false,
							maxLength : 199,
							name : 'contractName',
							disabled : false,
							width : '90%'
						}, {
							xtype : 'textfield',
							fieldLabel : '乙方',
							name : 'departmentB',
							maxLength : 199,
							disabled : false,
							width : '90%',
							listeners : {
						    	focus : function(field){ 
									contractGrid.getVendor('form2').show(); 
								}
							}
						}, {
							xtype : 'datefield',
							fieldLabel : '签订时间',
							format : 'Y-m-d',
							name : 'createDate',
							disabled : false,
							width : '90%'
						},
//						{
//							xtype : 'textfield', 
//							name : 'contractCode', 
//							fieldLabel : '合同编号',
//							hidden : true
//						},
						{name:'fileId',xtype:'hidden'},{name:'vendorId',xtype:'hidden'}]
			}]
		}]
	});
	contractGrid.editfromPanel.load({
				url : '../JSON/contract_Remote.getContractById?contractId='
						+ contractId
			})

	var mainpanel = new Ext.Panel({
				layout : 'border',
				items : [contractGrid.editfromPanel,
						getStockGridpanelForEditor(contractId,flag)]
			})

	var win1 = new Ext.Window({
		title : "编辑合同",
		layout : 'fit',
		width : 650,
		height : 420,
		autoScroll : true, 
		closeAction : 'close',
		items : mainpanel,
		buttons : [{
			text : '提交',
			handler : function() {
				var s = contractGrid.gridPanel2.getSelectionModel()
						.getSelections();
				var selTenderIds = [];
				if (s.length > 0) {					
					for (var i = 0, r; r = s[i]; i++) {
						selTenderIds[i] = r.data.tender_id;
					}
				}else {
					Ext.MessageBox.alert("提示", "请选择对应的招标项!");
				}
				if (contractGrid.editfromPanel.form.isValid()) {
							contractGrid.editfromPanel.form.doAction('submit', {
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								var contractForm = contractGrid.editfromPanel.getForm('form2')
										.getFieldValues();
								var vo = Seam.Remoting
										.createType("com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo");
								vo.setContractId(contractId);
								vo.setContractName(contractForm.contractName);
								vo.setContractCode(contractForm.contractCode);
								vo.setDepartmentA(contractForm.departmentA);
								vo.setDepartmentB(contractForm.departmentB);
								vo.setContractAmount(contractForm.contractAmount);
								if(contractForm.createDate!="")
								vo.setCreateDate(new Date(contractForm.createDate).format('Y-m-d'));
								vo.setContractFile(contractForm.contractFile);
								vo.setVendorId(contractForm.vendorId);
								var	fileName = action.result.fileName;  
								var fileId = action.result.fileId; 
								if(fileName=null || fileName=="")
								{
									fileName = contractForm.fileName;
									fileId = contractForm.fileId
								}
								if(fileName.indexOf("\\")!=-1)
									    fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
								vo.setFileName(fileName);
								vo.setFileId(fileId);
								vo.setReMark(contractForm.reMark);
								vo.setType(contractGrid.type);
								Seam.Component.getInstance("contract_Remote").updaeContract(vo,selTenderIds,
										function(result) {
											if (result) {
												win1.close();
												contractGrid.ds.load();
											} else {
												Ext.MessageBox.alert("提示", "修改失败!");
											}
										});
				
								win1.close();
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',action.result);
							}
				
							})
				  }
			}
		}, {
			text : '返回',
			handler : function() {
				win1.close();
			}
		}]
	}).show();
};

contractGrid.approvalForm = function(contractId,flag) { 
	var jsonData = new Ext.data.JsonReader({
				root : 'results'
			}, [{
						name : 'contractCode',
						mapping : 'contractCode',
						type : 'string'
					}, {
						name : 'departmentA',
						mapping : 'departmentA',
						type : 'string'
					}, {
						name : 'contractAmount',
						mapping : 'contractAmount',
						type : 'string'
					}, {
						name : 'contractName',
						mapping : 'contractName',
						type : 'string'
					}, {
						name : 'departmentB',
						mapping : 'departmentB',
						type : 'string'
					}, {
						name : 'createDate',
						mapping : 'createDate',
						type : 'string'
					}, {
						name : 'reMark',
						mapping : 'reMark',
						type : 'string'
					}, {
						name : 'fileName',
						mapping : 'fileName',
						type : 'string'
					}, {
						name : 'fileId',
						mapping : 'fileId',
						type : 'string'
					}, {
						name : 'vendorId',
						mapping : 'vendorId',
						type : 'string'
					}])

	contractGrid.approvalFormPanel = new Ext.form.FormPanel({
		region : 'center',
		id : 'form3',
		border : false,
		fileUpload : true,
		height : 300,
		labelWidth : 55,
		labelAlign : 'left', 
		padding : 5,
		items : [{xtype:'hidden',name:'fileId'},
		     {layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同编号',name:'contractCode',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同名称',name:'contractName',readOnly:true,anchor:'90%'}]}
		     ]},{layout:'column',border:false,items:[
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同金额',name:'contractAmount',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'乙方',name:'departmentB',readOnly:true,anchor:'90%'}]},
		     {columnWidth:.4,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'合同文件',name:'fileName',readOnly:true,anchor:'98%'}]},
		     {columnWidth:.1,layout:'form',border:false,items:[       
		     {html:"<a id = 'down'>下载</a>",border:false}
		            ]} ,
		     {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'签订时间',name:'createDate',readOnly:true,anchor:'90%'}]},
		       {columnWidth:.5,layout:'form',border:false,items:[
		            {xtype:'textfield',fieldLabel:'备注',name:'reMark',readOnly:true,anchor:'90%'}]}
		     ]}] 
	});
//	contractGrid.approvalFormPanel.load({
//				url : '../JSON/contract_Remote.getContractById?contractId='
//						+ contractId
//			})

	var mainpanel = new Ext.Panel({
				layout : 'border',
				items : [contractGrid.approvalFormPanel,
						getStockGridpanelForEditor(contractId,flag)]
			});
	
	return mainpanel;
};
var queryContract = function() { // 合同查询
	var queryItem = new Ext.form.FormPanel({
		id : 'form2',
		border : false,
		labelWidth : 120,
		labelAlign : 'left',
		items : [{
			layout : 'form',
			border : false,
			items : [{
				border : false,
				html : '<br><br><table border="0"><tr><td width="120">合同编号:</td><td><input type="text" id="contractCode" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">合同名称:</td><td><input type="text" id="contractName" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">合同金额:</td><td><input type="text" id="contractAmount" style="width:180px;height:20px"/></td>'
			}, {
				border : false,
				html : '<table border="0"><tr><td width="120">生成日期:</td><td><div id="markTime2div"></div></td>'
			}]
		}]
	});

	var win1 = new Ext.Window({
				title : "采购计划查询",
				layout : 'fit',
				width : 350,
				height : 250,
				autoScroll : true,
				closeAction : 'close',
				items : queryItem,
				buttons : [{
					text : '查询',
					handler : function() {
						contractGrid.queryParams.contractCode = Ext.get("contractCode").getValue();
						contractGrid.queryParams.contractName = Ext.get("contractName").getValue();
						contractGrid.queryParams.contractAmount = Ext.get("contractAmount").getValue();
						//判断时间选项是否有值
						if(Ext.getCmp("markTime2").getValue() == null || Ext.getCmp("markTime2").getValue() == ''){
							contractGrid.queryParams.createDate = null;
						}else{
							contractGrid.queryParams.createDate = new Date(Ext.getCmp("markTime2").getValue()).format('Y-m-d');
						} 
						contractGrid.ds.load();
						win1.close();
					}
				}, {
					text : '重置',
					handler : function() {
						Ext.get("contractCode").dom.value = '';
						Ext.get("contractName").dom.value = '';
						Ext.get("contractAmount").dom.value = '';
						Ext.getCmp("markTime2").setValue(null);
					}
				}, {
					text : '关闭',
					handler : function() {
						win1.close();
					}
				}]
			}).show();

	var strartTime1 = new Ext.form.DateField({
				renderTo : 'markTime2div',
				id : 'markTime2',
				width : 180,
				emptyText : '编制时间',
				dateFormat : 'Y-m-d'
			});
}

var getBar = function(flag) {

	var createBut = function() {
		var btn = new Ext.Button({
					text : '新建',
					iconCls : 'add1',
					handler : function() {
						createForm(flag);
					}
				});
		return btn;
	}

	var editBut = function() {
		var btn = new Ext.Button({
					text : '编辑',
					iconCls : 'edit1',
					handler : function() {
						var s = contractGrid.gridPanel.getSelectionModel().getSelections();
						if (s.length > 0) {
							if (s.length > 1) {
								Ext.MessageBox.alert("提示", "一次只能选择一项!");
							} else {
								for (var i = 0, r; r = s[i]; i++) {
									if(r.data.status == 1){
										editorForm(r.data.contractId,flag);
									}else{
										Ext.MessageBox.alert("提示", "请选择\"编辑中\"的合同项!!");
									}
								}
							}
						} else {
							Ext.MessageBox.alert("提示", "请先选择要编辑的合同项!");
						}
					}
				});
		return btn;
	}

	var delBut = function() {
		var btn = new Ext.Button({
			text : '删除',
			iconCls : 'del1',
			handler : function() {
				var s = contractGrid.gridPanel.getSelectionModel().getSelections();
				if (s.length > 0) {
					//判断勾选的合同的状态，只有“编制中”的合同才能做删除的操作
					for(var j=0;j<s.length;j++){
						if(s[j].data.status != '1'){
							Ext.MessageBox.alert("提示","只能删除“编制中”状态的合同信息！");
							return;
						}
					}
					Ext.MessageBox.confirm("提示", "是否真的要删除数据？", function(ret) {
					delIds = [];
					if (ret == "yes") {
						for (var i = 0, r; r = s[i]; i++) {
							contractGrid.ds.remove(r);
							delIds[i] = r.data.contractId;
						}
						Seam.Component.getInstance("contract_Remote")
								.delContractList(delIds, function(data) {
									if (data) {
										contractGrid.ds.load();
									} else {
										Ext.MessageBox.alert('提示',
												'<font color=red>删除失败!</font>');
									}
								});
					}
				})
				} else {
					Ext.MessageBox.alert("提示", "请先选择要删除的合同项!");
				}	
			}
		});
		return btn;
	}

	var toBut = function() {
		var btn = new Ext.Button({
					text : '送审',
					iconCls : 'Send',
					handler : function() {
						//没有添加项目编号的不能送审
						contractAction.submitContract(flag);
					}
				});
		return btn;
	}

	var queryBut = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
						queryContract();
					}
				});
		return btn;
	}
	
	var insertProject = new Ext.Button({
		text:'添加项目编号',
		iconCls:'icon-exportTasks',
		handler:function(){
			insertProjectNum();
		}
	});

	var tbar = new Ext.Toolbar({
				items : [createBut(), '-', editBut(), '-', delBut(), '-',
						toBut(), '-', queryBut(),'-',insertProject]
			})

	return tbar;
}

function insertProjectNum(){
	var record = Ext.getCmp('contractPanel').getSelectionModel().getSelections();
	if(record.length == 0){
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '请勾选任务！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return;
	}else if(record.length > 1){
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '只能选择一条任务做进行操作！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return;
	}else if(record[0].get('status')!='1'){
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '只有“编制中”状态的任务才能添加项目编号！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return;
	}else{
		var contractId = record[0].get('contractId');
		
		contractGrid.insertProjectNum = new Ext.FormPanel({
			frame:true,
			buttonAlign:'center',
			items:[
				{
					xtype:'textfield',
					name:'acceptNum',
					fieldLabel:'项目编号(<font color="red">*</font>)',
					width:120,
					//校验是否为空
					allowBlank:false,
					blankText:'项目编号不能为空'
				}
			],buttons:[
				{
					text:'保存',
					handler:function(){
						if(contractGrid.insertProjectNum.getForm().isValid()){
							contractGrid.insertProjectNum.getForm().submit({
							url:'../JSON/AcceptTaskForContractRemote.useAcceptTaskForContract',
							method:'POST',
							failure:function(form,action){
								Ext.MessageBox.show({
									title : '提示信息',
									msg : '获取后台数据失败！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							},
							success:function(form,action){
//								alert(action.response.responseText);
								var result = Ext.util.JSON.decode(action.response.responseText);
								if(result.success=='false'){
									Ext.MessageBox.show({
										title : '提示信息',
										msg : '当前项目编号已经赋值给合同！',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
									return;
								}
								record[0].set('acceptnum',contractGrid.insertProjectNum.getForm().findField('acceptNum').getValue());
								contractGrid.insertProjectNumWin.close();
							},
							params:{
								contractId:contractId
							}
						});
						}
					}
				},{
					text:'取消',
					handler:function(){
						contractGrid.insertProjectNumWin.close();
					}
				}
			]
		});
		
		//判断是否已经存在内容
		Ext.Ajax.request({
			url:'../JSON/AcceptTaskForContractRemote.getAcceptTaskForContract',
			method:'POST',
			failure:function(){
				Ext.MessageBox.show({
							title : '提示信息',
							msg : '获取后台数据失败！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			},
			success:function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				//判断是否存在值
				if(result.success=='true'){
					contractGrid.insertProjectNum.getForm().findField('acceptNum').setValue(result.acceptNum);
				}
			},
			disableCaching : true,
			autoAbort : true,
			params:{
				contractId:contractId
			}
		});
		
		contractGrid.insertProjectNumWin = new Ext.Window({
			title:'添加项目编号',
			width:300,
			minWidth:300,
			autoHeight:true,
			modal:true,
			items:[contractGrid.insertProjectNum]
		});
		contractGrid.insertProjectNumWin.show();
	}
}

// 合同管理
contractGrid.list = function(type) {
	var sm = new Ext.grid.CheckboxSelectionModel({
				width : 20
			});
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm, {
				header : "合同编号",
				dataIndex : 'contractCode',
				width : 120
			}, {
				header : "合同名称",
				dataIndex : 'contractName'
			}, {
				header : "合同金额",
				dataIndex : 'contractAmount'
			}, {
				header : "甲方",
				dataIndex : 'departmentA',
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
						store) { 
					return '洪都集团';
				}
			}, {
				header : "乙方",
				dataIndex : 'departmentB'
			}, {
				header : "状态",
				dataIndex : 'status',
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
					var status = record.get("status");   
					if(status=="1")
						return "编制中"; 
					else if(status=="2")
						return "已送审"; 
					else if(status=="3")
						return "已审批"; 
				}
			},{
						header : '审批记录',
						dataIndex : '',
						renderer : function(value, cellmeta, record, rowIndex){
							var id =record.get('contractId');  
//							if(applicationStatus!="编制中"){
								return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('"
									+id+"')><font color=blue>查看</font></a>";
//							}			
						},
						sortable : true
			}, {
				header : "项目编号",
				dataIndex : 'acceptnum'
			}, {
				header : "生成日期",
				dataIndex : 'createDate'
			}, {
				header : "备注",
				width : 180,
				dataIndex : 'reMark'
			}, {
				header : "合同文件",
				dataIndex : 'fileName',
				width : 180,
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
				   if(record.get("fileName")==null)
							return "";
						var ID = record.get("fileId");
						var ORIGINALNAME = record.get("fileName");
						value = "&nbsp;<font color=blue>" + value
								+ "</font>";
						return "<a href='../FILEDOWN/?ID="//着用的是下载。需传值文件的id和文件名，才能查到
								+ ID
								+ "&ORIGINALNAME="
								+ encodeURI(encodeURI(ORIGINALNAME))
								+ "' cursor：hand>" + value + "</a>";
				}
			}]);

	cm.defaultSortable = true;
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/contract_Remote.getContractList',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'contractId'
			}, ['contractId', 'contractCode', 'contractName', 'tenderId',
					'departmentA', 'departmentB', 'contractAmount', 'status',
					'createDate', 'contractFile', 'reMark','fileName','fileId','acceptnum']);

	contractGrid.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	contractGrid.gridPanel = new Ext.grid.EditorGridPanel({
				id :'contractPanel',
				store : contractGrid.ds,
				cm : cm,
				height : 250,
				layout : 'fit',
				tbar : getBar(type),
				selModel : sm,
				bbar : new Ext.PagingToolbar({
							pageSize : contractGrid.limit,
							store : contractGrid.ds,
							displayInfo : true
						})
			});

	contractGrid.queryParams.type = type;
	contractGrid.type = type;

	contractGrid.ds.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, contractGrid.queryParams);

			});
	contractGrid.ds.load();
	return contractGrid.gridPanel;
}
/*
 * 获取供应商列表
  */
contractGrid.getVendor = function(formName){ 
			var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/vendor_VendorRemote.getVendorAppraisalGridData?d='
							+ new Date()+'&selectStatus='+1,
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'vendorID',
					totalProperty : 'totalProperty'
				}, [ 'vendorID', 'vendorName', 'vendorCode', 'businessScope',
					 'scale','trial_status','createrName','create_date','remark'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '供应商编号 ',
				dataIndex : 'vendorCode',
				width : 100
			},			
			{
				header : '供应商名称',
				dataIndex : 'vendorName',
				sortable : true
			},
			{
				header : '规模 ',
				dataIndex : 'scale',
				width : 100,
				sortable : true
			},
			{
				header : '经营范围',
				dataIndex : 'businessScope',
				width : 100,
				sortable : true
			},
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 300	,
				sortable : true			
			} ]);
	var tbar = [ '-', {
		text : '查询',
		iconCls : 'search1',
		handler : function() {
			registrationAction.seach('registrationGridPanelId');
		}
	}];
	var grid = new Ext.grid.GridPanel({
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 400,
	     id : "venderRegisterGridPanelId",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	        tbar:tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : tenderStore,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						}) 
	}); 
	store.baseParams = {start:0,limit:20};
	store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("venderRegisterGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择供应商信息！');
				return ;
			}  
			Ext.getCmp(formName).form.findField("departmentB").setValue(records[0].get("vendorName"));
			Ext.getCmp(formName).form.findField("vendorId").setValue(records[0].get("vendorID"));
			window1.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window1.close();
		}
	} ]
	
	var window1 = new Ext.Window( {
		id : "venderRegisterGridWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '供应商列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	}); 
	return window1;
}  
contractGrid.tabPanel = function(type) {
	var tab = new Ext.Panel({
				title : '合同管理',
				id : 'contractTab1',
				layout : 'fit',
				items : [contractGrid.list(type)]
			});

	return tab;
};