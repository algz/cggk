var bomTab5 = {
	nodeId : 0,
	taskName : '',
	bomType : "PBOM",
	statTime : '',
	endTime : '',
	limit : 15,
	start : 0
};

bomTab5.init = function(nodeId, taskName) {
	callSeam("ZongTi_ZongTiRemote", "getColumns", [taskName], function(result) {
				var data = eval('(' + result + ')');
				bomTab5.cm = new Ext.grid.ColumnModel(data);
				bomTab5.cm.defaultSortable = false;
				bomTab5.cm.menuDisabled = true;
				bomTab5.sm = new Ext.grid.CheckboxSelectionModel();
				var strurl = "";
				strurl = '../JSON/ZongTi_ZongTiRemote.getGongshi';
				bomTab5.proxy = new Ext.data.HttpProxy({
							url : strurl,
							method : 'POST'
						});
				bomTab5.reader = new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty'
						// id : 'id'
					}, ['_column1', '_column2', '_column3', '_column4',
						'_column5', '_column6', '_column7', '_column8',
						'_column9', '_column10']);
				bomTab5.ds = new Ext.data.Store({
							proxy : bomTab5.proxy,
							reader : bomTab5.reader
						});
				bomTab5.gridPanel = myGrid.init(bomTab5.ds, bomTab5.cm, null,
						bomTab5.sm, null);

				bomTab5.startTotalTime = new Ext.form.DateField({
							name : 'statTime',
							id : 'date1',
							value : bomTab5.statTime,
							width : '100',
							dateFormat : 'Y-m-d'
						});
				bomTab5.endTotalTime = new Ext.form.DateField({
							name : 'endTime',
							id : 'date2',
							value : bomTab5.endTime,
							width : '100',
							dateFormat : 'Y-m-d'
						});

				Ext.getCmp("date1").on('select', function() {
							bomTab5.statTime = Ext.getCmp("date1").getValue();
							bomTab5.gridPanel.getStore().load();
							mbomTabPanel.addT5(bomTab5.nodeId);
						});
				Ext.getCmp("date2").on('select', function() {
							bomTab5.endTime = Ext.getCmp("date2").getValue();
							bomTab5.gridPanel.getStore().load();
							mbomTabPanel.addT5(bomTab5.nodeId);
						});

				myGrid.loadvalue(bomTab5.ds, {
							start : bomTab5.start,
							limit : bomTab5.limit,
							node : bomTab5.nodeId,
							bomType : bomTab5.bomType,
							statTime : bomTab5.statTime,
							endTime : bomTab5.endTime
						}, null);

				bomTab5.mainPanel = new Ext.Panel({
							region : 'center',
							id : 'bomTab5',
							boder : false,
							layout : 'fit',
							items : [bomTab5.gridPanel],
							tbar : ['按时间统计 ', ' 开始时间:', bomTab5.startTotalTime,
									'结束时间:', bomTab5.endTotalTime]
						});
				mbomTabPanel.T5Container.add(bomTab5.mainPanel);
				mbomTabPanel.T5Container.doLayout();
			});

};
