var _isIE = Ext.isIE;
var scxzGrid = {grid:null};
var infostore;

scxzGrid.getGrid = function(flag,taskid,projectid,taskstatusid) {
	var strurl = '';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl,
		methord:"GET"
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'pid'
	}, ['pid', 'name', 'typeid', 'typename', 'stringvalue',
			'blobvalue', 'groupid', 'description', 'inout', 'inoutName', 'projectid',
			'taskid']);
	var ascid = 'pid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				scxzGrid.row = rec;
			}
		}
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam1258')+"",
			//fixed : true,
			width : 200,
			dataIndex : 'name'
		}, {
			header : ""+getResource('resourceParam1261')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'typename'
		}, {
			header : ""+getResource('resourceParam854')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'inoutName'
		}, {
			header : ""+getResource('resourceParam1262')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'stringvalue'
		}, {
			header : ""+getResource('resourceParam1654')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'groupid'
		}, {
			header : ""+getResource('resourceParam1256')+"",
			//fixed : true,
			width : 100,
			dataIndex : 'description'
		}]
	});
	//添加修改功能
	var addBt = {
		text : ''+getResource('resourceParam477')+'',
		iconCls : 'add1',
		handler : function(){	
			parametersAdd.init(flag, taskid,projectid)		
		}		
	};
	var updateBt= {
		text : ''+getResource('resourceParam478')+'',
		iconCls : 'edit1',
		handler : function(){		
		var row = scxzGrid.grid.selModel.getSelected();
		if(row == '' || row == null){
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'',
				""+getResource('resourceParam1652')+"");
			return;
		}
		var typename = row.get('typename');
		if(typename == ''+getResource('resourceParam469')+''){
			Ext.MessageBox.alert(''+getResource('resourceParam575')+'',
				""+getResource('resourceParam1653')+"");
			return;
		}		
		parametersUpdate.updateTaskType(scxzGrid.grid);
		}	//同时可以采用双击的方式修改参数
	};
	var delBt={
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'del1',
		handler : parametersDelete.init
//		function(){
//		var row = scxzGrid.grid.selModel.getSelected();
//		if(row == '' || row == null){
//			Ext.MessageBox.alert('提示',
//				"请选择要删除的数据行。");
//			return;
//		}
//		//调用删除方法		
//		}	
 	};

  
 	var tb = [
		'-', 
		addBt,
		'-', 
		delBt,
		'-', 
		updateBt,
		'-'
	];	
//	alert(flag);
//	alert('taskstatusid:' + taskstatusid);
	if (taskstatusid == 4 &&　renwukbnMain.tabPanel.getActiveTab().id　== 'tabpanel1'){//如果任务处在进行状态当中，则能够修改输入输出参数
		scxzGrid.grid = myGrid.initByPageSize(ds, cm, tb, sm, 100, false);	
	} else {
		scxzGrid.grid = myGrid.initByPageSize(ds, cm, null, sm, 100, false);	
	}	
		
	scxzGrid.grid.width = 800;
	scxzGrid.grid.height = 600;
//	if (role != null && role != '')	alert(fanwei + ':' + role.indexOf("fuze"));
	if(taskstatusid == 4){//flag == 2 && fanwei == "man" && role.indexOf("fuze") != -1
		scxzGrid.grid.on('rowdblclick', function(thisgrid) {
			var typename = thisgrid.selModel.getSelected().get('typename');
//			if(role != "fuze"){
//				if(role.indexOf('4') == -1){
//					return;
//				}
//			}
			if(typename == ''+getResource('resourceParam469')+''){
				return;
			}
			parametersUpdate.updateTaskType(thisgrid);
		});
	}
	return scxzGrid.grid;
}
