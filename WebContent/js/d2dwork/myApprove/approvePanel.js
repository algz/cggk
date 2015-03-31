var approvePanel = {
	north : null,
	card1 : null
};
approvePanel.getUserGrid = function(isPaging) {

	var sm = new Ext.grid.CheckboxSelectionModel();
	var colModel = new Ext.grid.ColumnModel([// new Ext.grid.RowNumberer(),
	sm, {
				header : ""+getResource('resourceParam879')+"",
				width : 100,
				hidden : true,
				dataIndex : 'userid'
			}, {
				header : ""+getResource('resourceParam1021')+"",
				width : 120,
				dataIndex : 'truename'
			}, {
				header : ""+getResource('resourceParam882')+"",
				width : 120,
				dataIndex : 'ginstitutename'
			}, {
				header : ""+getResource('resourceParam1019')+"",
				width : 60,
				id : 'usertype',
				dataIndex : 'usertype'
			}

	]);

	var url = "../JSON/base_user_UserSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'userid'
			}, ['userid', 'loginname', 'truename', 'strsex', 'sex',
					'accountstate', 'straccountstate', 'instcode',
					'ginstitutename', 'password', 'age', 'address', 'postcode',
					'tel1', 'tel2', 'judgeman', 'viewLevel', 'logLevel']);
	var ascid = 'userid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var addUserBt = {
		text : ''+getResource('resourceParam1013')+'',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.init(approvePanel.selectUserCallback);
		}
	};

	var setLeaderBt = {
		text : ''+getResource('resourceParam1014')+'',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			approvePanel.setLeader();
		}
	};

	var delBt = {
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'del1',
		handler : function() {
			approvePanel.deleteParticipant();
		}
	};

	var tb = ['-', addUserBt, '-', delBt, '-', setLeaderBt, '-'];

	var grid;
	if (isPaging) {
		grid = myGrid.init(ds, colModel, tb, sm);
	} else {
		grid = myGrid.initNoPaging(ds, colModel, tb, sm);
	}
	grid.height = 200;
	grid.width = 400;
	grid.autoScroll = 'true';
	// grid.autoWidth = 'true';
//	ds.load();
	return grid;
}

approvePanel.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = approvePanel.participantsGrid.getStore();
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		var truename = dataStore.getAt(i).get('truename');
		var record = dataStore.getAt(i);
		if (toDataStore.getById(userid) == null) {// 加入未被选择的用户
			if(!isRep(record))	
			toDataStore.add(record);
		}
	}
	function isRep(record){
		for(var j=0;j<toDataStore.getCount();j++){
			if(record.get('userid') == toDataStore.getAt(j).get("userid")){
				return true;
			}
		}
		return false;
	}
}

approvePanel.deleteParticipant = function() {
	var result = new Array();
	var rows = approvePanel.participantsGrid.getSelectionModel()
			.getSelections();
	if (rows != null) {
		var size = rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam1001')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam585')+"", function(btn) {
					if (btn == 'yes') {
						var toDataStore = approvePanel.participantsGrid
								.getStore();
						for (var i = 0; i < size; i++) {
							toDataStore.remove(rows[i]);
						}

					}
				});
	} else {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam587')+'',
					msg : ''+getResource('resourceParam584')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

approvePanel.setLeader = function() {// 设定负责人
	var selectedRows = approvePanel.participantsGrid.getSelectionModel()
			.getSelections();
	if (selectedRows != null) {
		var size = selectedRows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam999')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		if (size > 1) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam1003')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		var toDataStore = approvePanel.participantsGrid.getStore();
		for (i = 0; i < toDataStore.getCount(); i++) {// 只能设定一个负责人
			toDataStore.getAt(i).set('usertype', '');
		}
		selectedRows[0].set('usertype', ''+getResource('resourceParam731')+'');
		var copyRow = selectedRows[0].copy();
		copyRow.set('usertype', ''+getResource('resourceParam731')+'');
		toDataStore.remove(selectedRows[0]);
		toDataStore.insert(0, copyRow);
	} else {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam587')+'',
					msg : ''+getResource('resourceParam999')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
