var chooseRoleView = {
};

chooseRoleView.getRoleGrid = function(isPaging) {

	var colModel =  new Ext.grid.ColumnModel([
//		{
//		id: 'roleid',
//		header: "角色编号",
//		dataIndex: 'roleid',
//		width: 80
//	},
		{
		header: ""+getResource('resourceParam797')+"",
		dataIndex: 'rolename',
		width: 120
	},{
		header: ""+getResource('resourceParam796')+"",
		dataIndex: 'descr',
		width: 200
	}
	]);

  var strurl = '../JSON/base_role_roleSerivce.selectRole';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'roleid'
        }, [
            'roleid','rolename','descr','roleType'
        ]);
  var ascid = 'roleid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});

	var grid;
	if (isPaging){
		grid = myGrid.init(ds, colModel, null, sm);
	} else {
		grid = myGrid.initNoPaging(ds, colModel, null, sm);
	}
	
	return grid;
}

chooseRoleView.init = function(callback) {//callback是"确定"后调用的函数
	chooseRoleView.roleGrid = chooseRoleView.getRoleGrid(true);
	chooseRoleView.roleGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'rolepanel',
		title : ''+getResource('resourceParam794')+'',
		region : 'north',
		height : 150,
//		split : true,
		layout : 'fit',
		items : chooseRoleView.roleGrid
	});
	
	//加载数据
	chooseRoleView.roleGrid.args = {start:0,limit:25};	
	myGrid.loadvalue(chooseRoleView.roleGrid.store,chooseRoleView.roleGrid.args);	

	chooseRoleView.selectedRoleGrid = chooseRoleView.getRoleGrid(false);
	chooseRoleView.selectedRoleGridPanel = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'selectRolePanel',
		title : ''+getResource('resourceParam798')+'',
		region : 'south',
		height : 150,
//		split : true,
		layout : 'fit',
		items : chooseRoleView.selectedRoleGrid
	});
	
	chooseRoleView.selectRole = function() {		
		var _selectedRow = chooseRoleView.roleGrid.getSelectionModel()
				.getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam795')+'');
			return;
		}
		var dataStore = chooseRoleView.selectedRoleGrid.getStore();
		var roleid = _selectedRow.get('roleid');
		if (dataStore.getById(roleid) == null) {
			var count = dataStore.getCount();
			dataStore.insert(count, _selectedRow);
		} else {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam793')+'');
		}
	}
	chooseRoleView.deleteRole = function() {
		var _selectedRow = chooseRoleView.selectedRoleGrid
				.getSelectionModel().getSelected();
		if (_selectedRow == null) {
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam792')+'');
		} else {
			var dataStore = chooseRoleView.selectedRoleGrid.getStore();
			dataStore.remove(_selectedRow);
		}
	}
	
var hh = " <div id='temp'><center>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseRoleView.selectRole()'><img src='../images/manage/add_user.png' width=75 height=26 /></a>"
			+ "<a href='javascript:void(0);' name='leftToRight' onClick='chooseRoleView.deleteRole()'><img src='../images/manage/del_user.png' width=75 height=26 /></a>" +
		 "</center></div>";

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

	chooseRoleView.enpanel = new Ext.Panel({		
		// autoScroll:true,
		region : 'center',
		layout : 'border',
		items : [chooseRoleView.roleGridPanel, apppanel,
				chooseRoleView.selectedRoleGridPanel]
	});

	if (!chooseRoleView.roleAddprivdialog) {
		tlework.addHtml(tlework.divHtml, 'roleAddprivdialog'); // 动态生成需要绑定的div
		chooseRoleView.roleAddprivdialog = new Ext.Window({ // 创建对话框
			el : 'roleAddprivdialog',
			title : ''+getResource('resourceParam554')+'',
			modal : true,
			layout : 'border',
			width : 400,
			height : 400,
			closeAction : 'hide',
			resizable : false,
			plain : false,
			buttons : [{
				text : ''+getResource('resourceParam505')+'',
				handler : function() {				
					//调用callbck函数
					if (callback){
						callback();
					}					
					chooseRoleView.roleAddprivdialog.hide();					
				}
			}, {
				text : ''+getResource('resourceParam7007')+'',
				handler : function() {
					chooseRoleView.roleAddprivdialog.hide();
				}
			}]
		});

		chooseRoleView.roleAddprivdialog.on('hide',
				chooseRoleView.close);
	}
	chooseRoleView.roleAddprivdialog.add(chooseRoleView.enpanel);
	chooseRoleView.roleAddprivdialog.show();
}

chooseRoleView.close = function() {
	chooseRoleView.roleAddprivdialog.destroy();
	chooseRoleView.roleAddprivdialog = null;
};

chooseRoleView.insertReturn = function(result){	
	chooseRoleView.roleAddprivdialog.hide();
	selectedUserAndRole.refreshGrid();//刷新操作者grid	
}
