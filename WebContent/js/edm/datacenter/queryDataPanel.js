var queryDataPanel = {
	fixver : ""

}
queryDataPanel.init = function() {
	var createData = new Ext.form.DateField({
				fieldLabel : ''+getResource('resourceParam858')+'',
				format : 'Y-m-d',
				anchor : '95%',
				editable : false
			});
	var name = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam480')+'',
				anchor : '95%'
			});
	var physcisType = new Ext.form.ComboBox({
				fieldLabel : ''+getResource('resourceParam616')+'',
				anchor : '95%'
			});

	var version = new Ext.form.ComboBox({
		store : new Ext.data.JsonStore({
			url : "../JSON/datacenter_DataCenterRemote.getInstanceVersion?categoryInstanceID="
					+ cateInstanceTree.checkinstancenode.id
					+ "&a="
					+ new Date(),
			method : 'GET',
			fields : ['id', 'version', 'fixedRevision']
		}),
		valueField : 'id',
		displayField : 'version',
		fieldLabel : ''+getResource('resourceParam462')+'',
		triggerAction : 'all',
		anchor : '95%',
		editable : false
	});
	version.on('select', function(combo, record, index) {
				queryDataPanel.fixver = record.get("fixedRevision");
			});
	var comboboxStores = new Ext.data.Store({

		proxy : new Ext.data.HttpProxy({
					method : 'POST',
					url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
							+ new Date()
				}),
		reader : new Ext.data.JsonReader({
					id : "userid",
					totalProperty : 'totalProperty',
					root : 'results'
				}, [{
							name : 'truename'
						}, {
							name : 'userid'
						}, {
							name : 'loginname'
						}])
	});

	var usersComb = new Ext.form.ComboBox({
				store : comboboxStores,
				valueField : "userid",
				displayField : "truename",
				mode : 'remote',
				queryParam : 'truename',
				minChars : 0,
				pageSize : 10,
				forceSelection : true,
				hiddenName : 'userid',
				editable : true,
				triggerAction : 'all',
				fieldLabel : ''+getResource('resourceParam1248')+'',
				typeAhead : true,
				name : 'userid',
				blankText : ''+getResource('resourceParam570')+'',
				allowBlank : true,
				enableKeyEvents : true,
				disableKeyFilter : true,
				emptyText : ''+getResource('resourceParam569')+'',
				anchor : '95%'
			});
	usersComb.on('select', function(combo, record, index) {
				// alert(this.getValue());
				// if (this.fireEvent('beforeselect', this, record, index) !==
				// false) {
				// var value = record.data[this.valueField
				// || this.displayField];
				//						
				// this.setValue(value);
				// this.collapse();
				// this.fireEvent('select', this, record, index);
				// }
			});

	var baseTypeComb = new Ext.form.ComboBox({
				fieldLabel : ''+getResource('resourceParam611')+'',
				store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
							method : 'GET',
							fields : ['dataTypeId', 'dataTypeName']
						}),
				triggerAction : 'all',
				valueField : 'dataTypeId',
				displayField : 'dataTypeName',
				editable : false,
				anchor : '95%',

				lazyRender : true,
				onSelect : function(record, index) {

					if (this.fireEvent('beforeselect', this, record, index) !== false) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}

			})
	var conditionForm = new Ext.form.FormPanel({
		bodyStyle : 'padding:5px',
		labelAlign : 'top',
		frame : true,
		items : [{
					layout : 'column',
					border : false,
					items : [{
								columnWidth : .33,
								layout : 'form',
								border : false,

								items : [usersComb, createData]

							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								items : [name, version]
							}, {
								columnWidth : .33,
								layout : 'form',
								border : false,
								items : [baseTypeComb]
							}]
				}],

		buttons : [{
			text : ''+getResource('resourceParam652')+'',
			handler : function() {
				var date = "";
				// dataPanel.getSelectionModel().getSelections().clearSelections();
				dataPanel.getSelectionModel().clearSelections();
				if (createData.getValue() != "") {
					date = new Date(createData.getValue()).dateFormat("Y-m-d")
				}
				dataPanel.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
					});
					// options.params = {};
					options.params = Ext.apply(options.params, {
						dataEntityName : name.getValue(),
						dcategoryinstanceid : cateInstanceTree.checkinstancenode.id,
						createrID : usersComb.getValue(),
						datetime : date,
						dataEntityType : baseTypeComb.getValue(),
						revision : queryDataPanel.fixver == ""
								? "-1"
								: queryDataPanel.fixver
					});
				});
				dataPanel.getStore().load();
			}
		}, {
			text : ''+getResource('resourceParam606')+'',
			handler : function() {
				conditionForm.getForm().reset();
			}
		}]
	});
	var dataPanel = instanceDataTreeGrid.init();
	var queryPanel = new Ext.Panel({
				layout : 'border',
				border : false,
				items : [{
							layout : 'fit',
							region : 'north',
							height : 157,
							border : false,
							items : [conditionForm]
						}, {
							layout : 'fit',
							region : 'center',
							border : false,
							items : [dataPanel]
						}]
			})

	return queryPanel;
}
