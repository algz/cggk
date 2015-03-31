var chooseUserViewMain = {
	orgTree : null,
	userGrid : null,
	viewApproveNotesGrid : null,
	selectedUserGrid : null,
	taskid : null
};

chooseUserViewMain.getUserGrid = function(isPaging) {

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
			// header: "性别",
			// width: 100,
			// dataIndex: 'strsex'} ,
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

chooseUserViewMain.init = function(taskid) {
	chooseUserViewMain.taskid = taskid;
	chooseUserViewMain.orgTree = new Ext.tree.TreePanel({
		autoScroll : true,
		animate : true,
		containerScroll : true,
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
	
	chooseUserViewMain.orgTree.on('click', function(node) {
		var nodeid=node.id;
		if(nodeid==0)
		{
			nodeid=null;
		}
		chooseUserViewMain.baseargs = {
		findloginname : null,
		findtruename : null,
		findinstcode : nodeid
	}

	myGrid.loadvalue(chooseUserViewMain.userGrid.store, {
		start : 0,
		limit : 25
	}, chooseUserViewMain.baseargs);
	
	});

	chooseUserViewMain.treePanel = new Ext.Panel({
		region : 'west',
		autoScroll : true,
		split : true,
		width : 200,
		items : chooseUserViewMain.orgTree
	});

	chooseUserViewMain.userGrid = chooseUserViewMain.getUserGrid(true);
	chooseUserViewMain.userGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'userpanel',
		title : ''+getResource('resourceParam877')+'',
		region : 'north',
		height : 248,
//		split : true,
		layout : 'fit',
		items : chooseUserViewMain.userGrid
	});

	chooseUserViewMain.selectedUserGrid = chooseUserViewMain.getUserGrid(false);
	chooseUserViewMain.selectedUserGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'selectUserPanel',
		title : ''+getResource('resourceParam880')+'',
		region : 'south',
		height : 250,
//		split : true,
		layout : 'fit',
		items : chooseUserViewMain.selectedUserGrid
	});
	
	chooseUserViewMain.selectUser = function() {		
		var _selectedRow = chooseUserViewMain.userGrid.getSelectionModel()
				.getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam795')+'');
			return;
		}
		var dataStore = chooseUserViewMain.selectedUserGrid.getStore();
		var userid = _selectedRow.get('userid');
		if (dataStore.getById(userid) == null) {
			var count = dataStore.getCount();
			dataStore.insert(count, _selectedRow);
		} else {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam875')+'');
		}
	}
	chooseUserViewMain.deleteUser = function() {
		var _selectedRow = chooseUserViewMain.selectedUserGrid
				.getSelectionModel().getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam792')+'');
		} else {
			var dataStore = chooseUserViewMain.selectedUserGrid.getStore();
			dataStore.remove(_selectedRow);
		}
	}
	
var hh = " <div id='temp'><center>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseUserViewMain.selectUser()'><span style=\"width:100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/manage/add_user.png', sizingMethod='image');\"></span></a>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseUserViewMain.deleteUser()'><span style=\"width:100%;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/manage/del_user.png', sizingMethod='image');\"></span></a></center></div>";

	var apppanel = new Ext.Panel({
		id : 'apppanel',
		region : 'center',
		height : 10,
		layout : 'fit',
		// split : true,
		collapsible : true,

		width : 30,
		html : hh
	});

	chooseUserViewMain.enpanel = new Ext.Panel({		
		// autoScroll:true,
		region : 'center',
		layout : 'border',
		items : [chooseUserViewMain.userGridPanel, apppanel,
				chooseUserViewMain.selectedUserGridPanel]
	});

	if (!chooseUserViewMain.roleAddprivdialog) {
		tlework.addHtml(tlework.divHtml, 'roleAddprivdialog'); // 动态生成需要绑定的div
		chooseUserViewMain.roleAddprivdialog = new Ext.Window({ // 创建对话框
			el : 'roleAddprivdialog',
			title : ''+getResource('resourceParam881')+'',
			modal : true,
			layout : 'border',
			width : 800,
			height : 600,
			closeAction : 'hide',
			resizable : false,
			plain : false,
			buttons : [{
				text : ''+getResource('resourceParam505')+'',
				handler : function() {				
					var dataStore = chooseUserViewMain.selectedUserGrid.getStore();
					var idObj = new Object();
					idObj['taskid']=chooseUserViewMain.taskid;					
					for (i=0; i<dataStore.getCount(); i++){
						var userid = dataStore.getAt(i).get('userid');						
						idObj[userid]=userid;						
					}
					//保存到数据库，已经存在的用户不加入
						var strValue=Ext.util.JSON.encode(idObj);
						callSeam("tasklist_taskService","insertTaskApproves",[strValue],chooseUserViewMain.insertReturn);	
				}
			}, {
				text : ''+getResource('resourceParam6002')+'', // 取消
				handler : function() {
					chooseUserViewMain.roleAddprivdialog.hide();
				}
			}]
		});

		chooseUserViewMain.roleAddprivdialog.on('hide',
				chooseUserViewMain.close);
	}
	chooseUserViewMain.roleAddprivdialog.add(chooseUserViewMain.treePanel);
	chooseUserViewMain.roleAddprivdialog.add(chooseUserViewMain.enpanel);
	chooseUserViewMain.roleAddprivdialog.show();
}

chooseUserViewMain.close = function() {
	chooseUserViewMain.roleAddprivdialog.destroy();
	chooseUserViewMain.roleAddprivdialog = null;
};

chooseUserViewMain.insertReturn = function(result){	
	chooseUserViewMain.roleAddprivdialog.hide();
	//在回调函数里面刷新审批用户列表
	var dsUrl = '../JSON/tasklist_taskService.getTaskApproveNotes?taskid='+ chooseUserViewMain.taskid + '&date=' +new Date();
	var proxy = new Ext.data.HttpProxy( {
			method: 'get',
			url : dsUrl
	});
	renwukbnMain.addApproveMenGrid.getStore().proxy = proxy;
	renwukbnMain.addApproveMenGrid.getStore().load();	
}
