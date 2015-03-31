var wareHouseUpdate = {}

wareHouseUpdate.init = function() {
	var updateButton = new Ext.Button({
				id : 'updateButton',
				text : '' + getResource('resourceParam7002') + '',//保存
				handler : function() {
					if (updateform.getForm().isValid()) {
						// var vo = Seam.Remoting
						// .createType("com.sysware.edm.dataClassification.DataCategoryMeta");
						var vo = Seam.Component.newInstance("DataCategoryVO");
						Ext.apply(vo, updateform.getForm().getValues());
						callSeam("dataClassification_DataClassificationRemote",
								"updateDataClassification", [vo], function(
										result) {
									if ("success" == result) {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam677')+'',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.INFO
												});
										updateWin.close();
										/**
										 * Update by YangJin'gang
										 * begin
										 */
										warehouseObjectList.grid.store.reload();
										/** end */
										/*
										myGrid.loadvalue(warehouseObjectList.grid.store,
														 warehouseObjectList.args,
														 warehouseObjectList.baseargs);
										*/
									} else {
										Ext.Msg.show({
													title : ''+getResource('resourceParam596')+'',
													msg : ''+getResource('resourceParam572')+'!',
													width : 170,
													buttons : Ext.Msg.OK,
													icon : Ext.Msg.ERROR
												});
										updateWin.close();
									}
								});

					}
				}
			});
	var resetButton = new Ext.Button({
				id : 'resetButton',
				text : ''+getResource('resourceParam606')+'',
				handler : function() {
					updateform.getForm().reset();
				}
			});
	var categoryId = new Ext.form.TextField({
				name : 'categoryId',
				inputType : 'hidden',
				value : warehouseObjectList.currentRecord.get("categoryId")
			});
	var categoryName = new Ext.form.TextField({
				name : 'categoryName',
				fieldLabel : ''+getResource('resourceParam1742')+'',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : ''+getResource('resourceParam1778')+'',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',
				value : warehouseObjectList.currentRecord.get("categoryName"),
				maxLengthText : '' + getResource('resourceParam7010') + '',//长度不能超过50
				blankText : ''+getResource('resourceParam1778')+'',
				emptyText : ''+getResource('resourceParam1778')+''
			});
	var description = new Ext.form.TextField({
				id : 'description1',
				style : 'margin-bottom: 5px;',
				name : 'description',
				fieldLabel : ''+getResource('resourceParam648')+'',
				allowBlank : true,
				value : warehouseObjectList.currentRecord.get("description"),
				validator : function() {
					var str = Ext.util.Format.trim(description.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 200) {
						description.invalidText = ' '+getResource('resourceParam648')+''+getResource('resourceParam1386')+'200！';
						description.focus();
						return false;
					} else {
						return true;
					}
				}
			});

	var updateform = new Ext.FormPanel({
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [categoryName, description, categoryId],

				buttons : [updateButton, resetButton]
			});
	var updateWin = new Ext.Window({
				id : 'updateWin',
				title : ''+getResource('resourceParam1779')+'',
				width : 300,
				height : 150,
				modal : true,
				closable : true,
				closeAction : 'close',
				layout : 'fit',
				items : [updateform]

			});
	updateWin.show();
}
