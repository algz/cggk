var queryRelationDataWin = {}

queryRelationDataWin.init = function(callback) {
	var that = this;
	this.createStartDate = new Ext.form.DateField({
				fieldLabel : '' + getResource('resourceParam7026') + '',//创建时间从
				format : 'Y-m-d',
				width : 120,
				name : "startDate",
				listeners : {
					"select" : function(m, d) {
						that.createEndDate.setMinValue(d);
					}
				}
			})
	this.createEndDate = new Ext.form.DateField({
				xtype : 'datefield',
				fieldLabel : '' + getResource('resourceParam514') + '',//至
				format : 'Y-m-d',
				width : 120,
				name : "endDate",
				listeners : {
					"select" : function(m, d) {
						that.createStartDate.setMaxValue(d);
					}
				}
			})
	this.dataEntityTypeHidden = new Ext.form.Hidden({
		name : "dataEntityType"
	})
	this.queryFormPanel = new Ext.form.FormPanel({
		layout : 'table',
		border : false,
		layoutConfig : {
			columns : 2
		},
		defaults : {
			border : false,
			padding : '5px'
		},
		items : [{
					layout : 'form',
					items : {
						xtype : 'textfield',
						fieldLabel : '' + getResource('resourceParam7027') + '',//数据名称
						name : "dataEntityName",
						width : 120
					}
				}, {
					layout : 'form',
					items : [this.dataEntityTypeHidden,new Ext.form.ComboBox({
						fieldLabel : '' + getResource('resourceParam611') + '',//数据类型
						width : 120,
						name : "dataEntityTypeName",
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
							method : 'POST',
							fields : [{
										name : 'datatypeId',
										mapping : 'dataTypeId'
									}, {
										name : 'datatypeName',
										mapping : 'dataTypeName'
									}, {
										name : 'rank',
										mapping : 'rank'
									}, {
										name : 'dataType',
										mapping : 'dataType'
									}]
						}),
						triggerAction : 'all',
						valueField : 'datatypeName',
						displayField : 'datatypeName',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
								that.dataEntityTypeHidden.setValue(record.get('datatypeId'))
							}
						}

					})]
				}, {
					layout : 'form',
					items : this.createStartDate
				}, {
					layout : 'form',
					items : this.createEndDate
				}, {
					layout : 'form',
					items : {
						xtype : 'textfield',
						fieldLabel : '' + getResource('resourceParam7028') + '',//数据值/文件名
						width : 120,
						name : "value"
					}
				}]
	})
	this.win = new Ext.Window({
				title : '' + getResource('resourceParam652') + '',//查询
				labelWidth : 80,
				resizable : false,
				width : 500,
				modal : true,
				bodyStyle : 'background:#ffffff',
				items : this.queryFormPanel,
				buttons : [{
							text : '' + getResource('resourceParam652') + '',//查询
							handler : function(){
								var myFormValues = that.queryFormPanel.getForm().getValues();
								callback(that.win,myFormValues);
							}
						}, {
							text : '' + getResource('resourceParam606') + '',//重置
							handler : function() {
								that.queryFormPanel.getForm().reset();
								that.createStartDate.setMaxValue();
								that.createEndDate.setMinValue();
							}
						}]
			})
	return this.win;
}