var bomTab2 = {
	nodeId : 0
};

bomTab2.init = function(nodeId, taskName) {
	callSeam("ZongTi_ZongTiRemote", "getColumns", [taskName], function(result) {
		var columnData = eval('(' + result + ')');
		bomTab2.cm = new Ext.grid.ColumnModel(columnData);
		bomTab2.cm.defaultSortable = false;
		bomTab2.cm.menuDisabled = true;
		bomTab2.sm = new Ext.grid.CheckboxSelectionModel();
		bomTab2.rightuser = Ext.data.Record.create([{
					name : "id",
					type : "string",
					mapping : "id"
				}, {
					name : "_column1",
					type : "string",
					mapping : "_column1"
				}, {
					name : "_column2",
					type : "string",
					mapping : "_column2"
				}, {
					name : "_column3",
					type : "string",
					mapping : "_column3"
				}, {
					name : "_column4",
					type : "string",
					mapping : "_column4"
				}, {
					name : "_column5",
					type : "string",
					mapping : "_column5"
				}, {
					name : "_column6",
					type : "string",
					mapping : "_column6"
				}, {
					name : "_column7",
					type : "string",
					mapping : "_column7"
				}, {
					name : "_column8",
					type : "string",
					mapping : "_column8"
				}]);
		bomTab2.rightreader = new Ext.data.JsonReader({}, bomTab2.rightuser);
		callSeam("ZongTi_ZongTiRemote", "getForAofo", [nodeId], function(
				result1) {
			bomTab2.data = eval('(' + result1 + ')');
			bomTab2.rightproxy = new Ext.data.MemoryProxy(bomTab2.data);
			bomTab2.store = new Ext.data.GroupingStore({
						proxy : bomTab2.rightproxy,
						reader : bomTab2.rightreader,
						sortInfo : {
							field : 'id',
							direction : "ASC"
						},
						groupField : '_column3',
						autoLoad : true
					});
			bomTab2.view = new Ext.grid.GroupingView({
				sortAscText : '正序排列',
				sortDescText : '倒序排列',
				columnsText : '列显示/隐藏',
				groupByText : '根据本列分组',
				showGroupsText : '是否采用分组显示',
				groupTextTpl : '{text}(共 <span style="color:red;">{[values.rs.length]} </span> 条数据)'
			});

			bomTab2.gridPanel = new Ext.grid.GridPanel({
						store : bomTab2.store,
						cm : bomTab2.cm,
						sm : bomTab2.sm,
						view : bomTab2.view
					});

			bomTab2.mainPanel = new Ext.Panel({
						region : 'center',
						boder : false,
						layout : 'fit',
						items : [bomTab2.gridPanel]
					});
			mbomTabPanel.T2Container.add(bomTab2.mainPanel);
			mbomTabPanel.T2Container.doLayout();
		});
	});
};
