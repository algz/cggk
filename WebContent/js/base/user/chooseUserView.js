var chooseUserView = {
};

chooseUserView.getUserGrid = function(isPaging) {

	var colModel = new Ext.grid.ColumnModel([{
		header : ""+getResource('resourceParam879')+"",
		width : 100,
		hidden : true,
		dataIndex : 'userid'
	},
			// {
			// header: "登录名",
			// width: 100,
			// dataIndex: 'loginname'},
			{
				header : ""+getResource('resourceParam878')+"",
				width : 100,
				dataIndex : 'truename'
			},
			// {
			// header: "用户状态",
			// width: 100,
			// dataIndex: 'straccountstate'} ,
			{
				header : ""+getResource('resourceParam882')+"",
				width : 100,
				dataIndex : 'ginstitutename'
			}]);

	var url = "../JSON/base_user_UserSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy({
		url : url,
		method : 'GET'
	});
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'userid'
	}, ['userid', 'loginname', 'truename', 'strsex', 'sex', 'accountstate',
			'straccountstate', 'instcode', 'ginstitutename', 'password', 'age',
			'address', 'postcode', 'tel1', 'tel2', 'judgeman', 'viewLevel',
			'logLevel']);
	var ascid = 'userid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var sm = new Ext.grid.RowSelectionModel({
		singleSelect : true
	});

	var grid;
	if (isPaging){
		grid = myGrid.init(ds, colModel, null, sm);
	} else {
		grid = myGrid.initNoPaging(ds, colModel, null, sm);
	}
	return grid;
}

chooseUserView.init = function(callback) {//callback是"确定"后调用的函数
	chooseUserView.orgTree = new Ext.tree.TreePanel({
		autoScroll : true,
		animate : true,
		containerScroll : true,
		height : 330,
		dropConfig : {
			appendOnly : true
		},
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : '../JSON/common_inst_InstSelectSvr.getMenuDatas',
			baseParams : this.baseParams
		}),
		root : new Ext.tree.AsyncTreeNode()
	});
	
	chooseUserView.orgTree.on('click', function(node) {
		var nodeid=node.id;
		if(nodeid==0)
		{
			nodeid=null;
		}
		chooseUserView.baseargs = {
		findloginname : null,
		findtruename : null,
		findinstcode : nodeid
	}

	myGrid.loadvalue(chooseUserView.userGrid.store, {
		start : 0,
		limit : 25
	}, chooseUserView.baseargs);
	
	});

	chooseUserView.treePanel = new Ext.Panel({
		region : 'west',
		autoScroll : true,
		split : true,
		width : 100,
		items : chooseUserView.orgTree
	});

	chooseUserView.userGrid = chooseUserView.getUserGrid(true);
	chooseUserView.userGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'userpanel',
		title : ''+getResource('resourceParam877')+'',
		region : 'north',
		height : 150,
//		split : true,
		layout : 'fit',
		items : chooseUserView.userGrid
	});

	chooseUserView.selectedUserGrid = chooseUserView.getUserGrid(false);
	chooseUserView.selectedUserGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'selectUserPanel',
		title : ''+getResource('resourceParam880')+'',
		region : 'south',
		height : 150,
//		split : true,
		layout : 'fit',
		items : chooseUserView.selectedUserGrid
	});
	
	chooseUserView.selectUser = function() {
		var _selectedRow = chooseUserView.userGrid.getSelectionModel()
				.getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam795')+'');
			return;
		}
		var dataStore = chooseUserView.selectedUserGrid.getStore();
		var userid = _selectedRow.get('userid');
		if(parent.Index.user.getUserid() == userid){
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam876')+'');
			return;
		}
		if (dataStore.getById(userid) == null) {
			var count = dataStore.getCount();
			dataStore.insert(count, _selectedRow);
		} else {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam875')+'');
		}
	}
	chooseUserView.deleteUser = function() {
		var _selectedRow = chooseUserView.selectedUserGrid
				.getSelectionModel().getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam792')+'');
		} else {
			var dataStore = chooseUserView.selectedUserGrid.getStore();
			dataStore.remove(_selectedRow);
		}
	}
	
var hh = " <div id='temp'><center>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseUserView.selectUser()'><img src='../images/manage/add_user.png' width=75 height=26 /></a>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseUserView.deleteUser()'><img src='../images/manage/del_user.png' width=75 height=26 /></a></center></div>";

	var apppanel = new Ext.Panel({
		id : 'apppanel',
		region : 'center',
		height : 10,
		layout : 'fit',
		// split : true,
//		collapsible : true,

		width : 30,
		html : hh
	});

	chooseUserView.enpanel = new Ext.Panel({		
		// autoScroll:true,
		region : 'center',
		layout : 'border',
		items : [chooseUserView.userGridPanel, apppanel,
				chooseUserView.selectedUserGridPanel]
	});

	if (!chooseUserView.roleAddprivdialog) {
		tlework.addHtml(tlework.divHtml, 'roleAddprivdialog'); // 动态生成需要绑定的div
		chooseUserView.roleAddprivdialog = new Ext.Window({ // 创建对话框
			el : 'roleAddprivdialog',
			title : ''+getResource('resourceParam881')+'',
			modal : true,
			layout : 'border',
			width : 600,
			height : 400,
			closeAction : 'hide',
			resizable : false,
			plain : false,
			buttons : [{
				text : ''+getResource('resourceParam505')+'',
				handler : function() {										
					//调用callbck函数
					if(callback){
						callback();
					}
					chooseUserView.roleAddprivdialog.hide();
				}
			}, {
				text : ''+getResource('resourceParam7007')+'',
				handler : function() {
					chooseUserView.roleAddprivdialog.hide();
				}
			}]
		});

		chooseUserView.roleAddprivdialog.on('hide',
				chooseUserView.close);
	}
	chooseUserView.roleAddprivdialog.add(chooseUserView.treePanel);
	chooseUserView.roleAddprivdialog.add(chooseUserView.enpanel);
	chooseUserView.roleAddprivdialog.show();
}

chooseUserView.close = function() {
	chooseUserView.roleAddprivdialog.destroy();
	chooseUserView.roleAddprivdialog = null;
};

