var biduiGrid = {
	nodeId : 0
};

biduiGrid.init = function(bomType) {

	biduiGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
				header : "物料号",
				dataIndex : '_column1'
			}, {
				header : "EBOM构型",
				width : 130,
				dataIndex : '_column2'
			}, {
				header : bomType + "构型",
				width : 130,
				dataIndex : '_column3'
			}]
	});

	biduiGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";

	strurl = '../JSON/GenZong_GenZongRemote.getDifference1';

	biduiGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});

	biduiGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3']);

	biduiGrid.ds = new Ext.data.Store({
				proxy : biduiGrid.proxy,
				reader : biduiGrid.reader
			});

	biduiGrid.gridPanel = new Ext.grid.GridPanel({
				store : biduiGrid.ds,
				cm : biduiGrid.cm,
				loadMask : true,
				height : 250,
				layout : 'fit',
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : biduiGrid.ds,
							displayInfo : true
						})
			});

	biduiGrid.ds.load({
				params : {
					start : 0,
					limit : 10,
					text : bomType
				}
			});

	biduiGrid.mainPanel = new Ext.Panel({
				boder : false,
				autoScroll : true,
				items : [biduiGrid.gridPanel]
			});

	return biduiGrid.mainPanel;
};

biduiGrid.jsonData = new Ext.data.JsonReader({
			root : 'results'
		}, [{
					name : 'id',
					mapping : 'id',
					type : 'int'
				}, {
					name : '_column1',
					mapping : '_column1',
					type : 'string'
				}, {
					name : '_column2',
					mapping : '_column2',
					type : 'string'
				}, {
					name : '_column3',
					mapping : '_column3',
					type : 'string'
				}, {
					name : '_column4',
					mapping : '_column4',
					type : 'string'
				}, {
					name : '_column5',
					mapping : '_column5',
					type : 'string'
				}, {
					name : '_column6',
					mapping : '_column6',
					type : 'string'
				}, {
					name : '_column7',
					mapping : '_column7',
					type : 'string'
				}]),

biduiGrid.init1 = function(node) {
	biduiMain.T2Container.removeAll();
	biduiGrid.mainPanel1 = new Ext.form.FormPanel({
				id : 'form1',
				boder : false,
				labelWidth : 55,
				labelAlign : 'left',
				reader : biduiGrid.jsonData,
				items : [{
							xtype : 'fieldset',
							title : '基本信息',
							layout : 'column',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '图号',
													name : '_column1',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '状态',
													name : '_column3',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '创建时间',
													name : '_column5',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '批准人',
													name : '_column7',
													disabled : false,
													width : '90%'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '图名',
													name : '_column2',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '设计人',
													name : '_column4',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '批准时间',
													name : '_column6',
													disabled : false,
													width : '90%'
												}]
									}]
						}]
			});
	biduiGrid.mainPanel1.load({
				url : '../JSON/XacCommon_CommonRemote.getPart?node=' + node,
				waitMsg : '正在载入数据...'
			});
	biduiMain.T2Container.add(biduiGrid.mainPanel1);
	biduiMain.T2Container.doLayout();
};

biduiGrid.init2 = function(node) {
	biduiMain.T3Container.removeAll();
	biduiGrid.mainPanel2 = new Ext.form.FormPanel({
				id : 'form2',
				boder : false,
				labelWidth : 55,
				labelAlign : 'left',
				reader : biduiGrid.jsonData,
				items : [{
							xtype : 'fieldset',
							title : '基本信息',
							layout : 'column',
							height : '100%',
							items : [{
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '图号',
													name : '_column1',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '状态',
													name : '_column3',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '创建时间',
													name : '_column5',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '批准人',
													name : '_column7',
													disabled : false,
													width : '90%'
												}]
									}, {
										columnWidth : .5,
										layout : 'form',
										items : [{
													xtype : 'textfield',
													fieldLabel : '图名',
													name : '_column2',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '设计人',
													name : '_column4',
													disabled : false,
													width : '90%'
												}, {
													xtype : 'textfield',
													fieldLabel : '批准时间',
													name : '_column6',
													disabled : false,
													width : '90%'
												}]
									}]
						}]
			});
	biduiGrid.mainPanel2.load({
				url : '../JSON/XacCommon_CommonRemote.getPart?node=' + node,
				waitMsg : '正在载入数据...'
			});

	biduiMain.T3Container.add(biduiGrid.mainPanel2);
	biduiMain.T3Container.doLayout();
};
