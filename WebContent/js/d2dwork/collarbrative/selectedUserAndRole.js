var selectedUserAndRole={}
selectedUserAndRole.init=function() {
  var strurl = "";

  strurl = '../JSON/privilege_DataPrivilegeRemote.getDataPrivilegeVoList?a='+new Date();
 
  selectedUserAndRole.proxy = new Ext.data.HttpProxy({
            url: strurl,
          	method:'GET'
        });
  selectedUserAndRole.reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
           id: 'dataPrivilegeID'
        }, [
            'dataPrivilegeID','dataID','dataType','operatorID','operatorType','privilege',
            'dataDetail','operatorName','privilegeName','operatorTypeName',
            'dataTypeName'
        ]);

  var ds = new Ext.data.Store({
        proxy: selectedUserAndRole.proxy,
        reader: selectedUserAndRole.reader
    });
    var addUserBt = {
		text : ''+getResource('resourceParam588')+'',
		iconCls : 'add1',
		handler : function(){	//此处的信息应该来自于树节点		
			chooseUserView.init(selectedUserAndRole.selectUserCallback);
		}
	};
	var addRoleBt = {
		text : ''+getResource('resourceParam589')+'',
		iconCls : 'add1',
		handler : function(){
			chooseRoleView.init(selectedUserAndRole.selectRoleCallback);
		}
	};
	var delBt={
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'del1',
		handler : selectedUserAndRole.deleteOperator
 	};

  
 	var tb = [
		'-', 
		addUserBt,
		'-', 
		addRoleBt,
		'-', 
		delBt,
		'-'
	];
    selectedUserAndRole.setcm1();
  	selectedUserAndRole.grid = myGrid.initBox(ds,selectedUserAndRole.cm,tb,selectedUserAndRole.sm);
  	
  	//相应行单击事件，刷新权限界面
  	selectedUserAndRole.grid.on('rowclick', function(thisgrid) {
		var dataPrivilegeID = thisgrid.selModel.getSelected().get('dataPrivilegeID');
		var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/privilege_DataPrivilegeRemote.getPrivilegeVoList?dataPrivilegeID='
					+ dataPrivilegeID
		});
		dataPrivilege.grid.getStore().proxy = proxy;
		dataPrivilege.grid.getStore().load();		
  	});
  	
  	selectedUserAndRole.listpanel=new Ext.Panel({
		region:'center',
		title:''+getResource('resourceParam586')+'',
		id:'selectedUserAndRoleListpanel',	
		layout:'fit',
		resizable:true,
		autoScroll:'true',
		split : true,
//		height:150,
		items:[selectedUserAndRole.grid]
	});
	selectedUserAndRole.baseargs = {
	}
	
	myGrid.loadvalue(selectedUserAndRole.grid.store,{start:0,limit:25},selectedUserAndRole.baseargs);
	return selectedUserAndRole.listpanel;

}

selectedUserAndRole.selectUserCallback = function() {
	var dataStore = chooseUserView.selectedUserGrid.getStore();
	var idObj = new Object();
	idObj['dataid'] = collarbMain.dataid;
	idObj['datatype'] = collarbMain.datatype;
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		idObj[userid] = userid;
	}
	// 保存到数据库，已经存在的用户不加入
	var strValue = Ext.util.JSON.encode(idObj);
	callSeam("privilege_DataPrivilegeRemote", "addDataPrivilegeUsers",
			[strValue], function() {
				selectedUserAndRole.refreshGrid();
			});

}

selectedUserAndRole.selectRoleCallback = function() {
var dataStore = chooseRoleView.selectedRoleGrid.getStore();
					var idObj = new Object();
					idObj['dataid']=collarbMain.dataid;		
					idObj['datatype']=collarbMain.datatype;
					for (i=0; i<dataStore.getCount(); i++){
						var roleid = dataStore.getAt(i).get('roleid');						
						idObj[roleid]=roleid;						
					}					
					//保存到数据库，已经存在的用户不加入
						var strValue=Ext.util.JSON.encode(idObj);
						callSeam("privilege_DataPrivilegeRemote","addDataPrivilegeRoles",[strValue],selectedUserAndRole.refreshGrid);	

}

selectedUserAndRole.setcm1 = function (){
   	selectedUserAndRole.sm = new Ext.grid.CheckboxSelectionModel();
  	selectedUserAndRole.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
	  		new Ext.grid.RowNumberer(),
	  		selectedUserAndRole.sm,
	  		{
				header: ""+getResource('resourceParam481')+"",
				width:40,
				dataIndex: 'operatorTypeName'
			},{
				header: ""+getResource('resourceParam480')+"",
				width:80,
				dataIndex: 'operatorName'
			}		
		]
  	});
}

selectedUserAndRole.deleteOperator = function () {
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam584')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
					return;
		}
		Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam585')+"", function(btn) {
			if (btn == 'yes') {
				for (var i = 0; i < size; i++) {
			result[i] = myGrid.rows[i].get('dataPrivilegeID');
		}
		callSeam("privilege_DataPrivilegeRemote", "deleteDataPrivileges", [result],
				selectedUserAndRole.deleteResult);
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

selectedUserAndRole.deleteResult = function(result){
	if (result == 'true') {//删除成功以后无需提示
//		Ext.MessageBox.show({
//					title : '信息提示',
//					msg : '删除成功！',
//					buttons : Ext.MessageBox.OK,
//					icon : Ext.MessageBox.INFO
//				});
	} else {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam587')+'',
					msg : ''+getResource('resourceParam1177')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}	
	selectedUserAndRole.refreshGrid();//刷新操作者grid
}


selectedUserAndRole.refreshGrid = function() {//刷新操作者grid
	//在回调函数里面刷新用户列表，如果做成公共的，这些内容都要传递过来		
	
	var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/privilege_DataPrivilegeRemote.getDataPrivilegeVoList?dataID='
					+ collarbMain.dataid + '&dataType=' + collarbMain.datatype
		});
		selectedUserAndRole.grid.getStore().proxy = proxy;
		selectedUserAndRole.grid.getStore().load();
}
