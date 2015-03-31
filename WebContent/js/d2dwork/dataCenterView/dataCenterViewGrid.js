/**
 * 刷新grid
 */
var dataCenterViewGrid = {
	fileDetailGrid : null,
	parameterDetailGrid : null,
	doId:null//用于向文件或参数详细信息页面传递dataObjectID
};

dataCenterViewGrid.viewdetaildata = function(doID, doType) {
//	Ext.QuickTips.init();//支持tips提示
//    Ext.form.Field.prototype.msgTarget='qtip';//提示的方式，枚举值为"qtip","title","under","side",id(元素id)

	var windowTitle = ''+getResource('resourceParam1252')+''+getResource('resourceParam857')+'';
	dataCenterViewGrid.parameterDetailGrid = parameterDetail.getGrid();
	dataCenterViewGrid.fileDialog = new Ext.Window({
		// el:'scxz1',
		title : windowTitle,
		modal : true,
		layout:'fit',
		width : 800,
		height : 170,
		closeAction : 'hide',
		plain : false,
		items : [dataCenterViewGrid.parameterDetailGrid]
	});

	dataCenterViewGrid.fileDialog.show();
	var parUrl = '../JSON/DataCenterViewService.getParametreDetail?a='+new Date().getTime()+'&dataObjectID='
				+ doID;
	var proxy = new Ext.data.HttpProxy({
		url : parUrl,
		method:'get'
	});
	dataCenterViewGrid.parameterDetailGrid.getStore().proxy = proxy;
	dataCenterViewGrid.parameterDetailGrid.getStore().load();

}

//修改数据中心或数据项
dataCenterViewGrid.addItem = function(){	
	if (dataCenterViewMain.currentNodeType == '0' || dataCenterViewMain.currentNodeType == '' || dataCenterViewMain.currentNodeType == null){//添加数据中心
		dcAdd.init();
	} else {
		rowAdd.init();
	}
}
//添加数据中心或数据项
dataCenterViewGrid.updateItem = function(){
	if (dataCenterViewMain.currentNodeType == '0' || dataCenterViewMain.currentNodeType == '' || dataCenterViewMain.currentNodeType == null){//修改数据中心
		dcUpdate.init();
	} else {
		rowUpdate.init();
	}
}
//根据数据类型显示不同的视图
dataCenterViewGrid.activeView = function(){

	if(myGrid.row==null)
	{
		// text : 1525--请选中一行
		Ext.Msg.alert(''+getResource('resourceParam508')+'','' + getResource('resourceParam1525') + ''+getResource('resourceParam474')+'');
		return;
	}
	Ext.QuickTips.init();
	var dataObjectType = myGrid.row.get("dataObjectType");
	var dataObjectID = myGrid.row.get("dataObjectID");
	var option={id:dataObjectID,type:dataObjectType};
	//在函数里面加入id参数
	if(dataObjectType == '20090218094541718750b5bdbe6eb3ed46f58a6d')
	{findbb8.init(option);}//其它大部件、机载设备数据库test1
	else if(dataObjectType == '20090218093519062500e5c7816dd9304efa84d7')
	{findbb6.init(option);}//气动力数据库test1
	else if (dataObjectType == '20090212101458078125a1f16e45') 
	{findbb2.init(option);}//显示机身剖面数据库视图
	else if (dataObjectType == '2009021314215123437563dafbe4b31c4c6099c9') 
	{findbb.init(option);}//显示总体参数数据库视图	
	else if(dataObjectType == '200902180939160937504f95bb4c753a4b168408')
	{findbb7.init(option);}//翼型数据库test1
	else if (dataObjectType == '2009021717203678125034a8b1b03a5f415db56f') 
	{findbb4.init(option);}//起落装置简化模型数据库测试用test1
	else if (dataObjectType == '2009021717503996875046928ec62b274ddda2e4') 
	{findbb5.init(option);}//重量数据库test1
	else if (dataObjectType == '20090217155554718750d219351bbd5d4ee9b609') 
	{findbb1.init(option);}//发动机数据库内容测试test1
	else if (dataObjectType == '200902171643322343754613441ceed547e1abdf') 
	{findbb3.init(option);}//座椅简化模型数据库test1	
	// text : 9049--此    9050--没有    9051--视图
	else{Ext.Msg.alert(''+getResource('resourceParam508')+'', '' + getResource('resourceParam9049') + '' +getResource('resourceParam455')+''+getResource('resourceParam474')+ '' + getResource('resourceParam9050') +  '' + getResource('resourceParam9051') + ''  );}
}

dataCenterViewGrid.viewfiledetaildata = function(doID, doType) {

	var windowTitle = ''+getResource('resourceParam469')+''+getResource('resourceParam857')+'';

	dataCenterViewGrid.fileDialog = new Ext.Window({
		// el:'scxz1',
		title : windowTitle,
		modal : true,
		layout:'fit',
		width : 800,
		height : 170,
		closeAction : 'hide',
		plain : false,
		items : [dataCenterViewGrid.fileDetailGrid]
	});
	dataCenterViewGrid.doId = doID;

	dataCenterViewGrid.fileDialog.show();
	var fileUrl =  '../JSON/DataCenterViewService.getFileDetail?a='+new Date().getTime()+'&dataObjectID='
				+ doID;
	var proxy = new Ext.data.HttpProxy({
		url : fileUrl,
		method:'get'
	});
	dataCenterViewGrid.fileDetailGrid.getStore().proxy = proxy;
	dataCenterViewGrid.fileDetailGrid.getStore().load();
}

dataCenterViewGrid.grid = function() {

	dataCenterViewGrid.fileDetailGrid = fileDetail.getGrid();

	// var checkColumn = new Ext.grid.CheckColumn({
	// header:"选择",
	// dataIndex:'sign'
	// });
	var strurl = "../JSON/DataCenterViewService.getDataCentersJson";// "../JSON/d2dwork_online_onlineSvr.getGrid";
	var proxy = new Ext.data.HttpProxy({
		url : strurl,
		method:'get'
	});
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'dataObjectID'
	}, ['dataObjectID', 'dataObjectName', 'dataCenterID', 'dimension', 'dataObjectType','dataTypeEntity.dataTypeName', 'dataTypeEntity', 
			'value', 'unit', 'description', 'projectName', 'taskName', 'dataCenter', 'isRef']);
	var ascid = 'dataObjectName';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	// var sm = new Ext.grid.CheckboxSelectionModel();
	// sm.on("rowselect", function(sm,rowIndex,r) {
	// onlineMain.flag = true;
	//		 
	// });
	// sm.on("rowdeselect", function(sm,rowIndex,record) {
	// if(sm.getSelections()==0){
	// onlineMain.flag = false;
	// temp();
	// }
	// });
	var sm = new Ext.grid.RowSelectionModel({
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				dataCenterViewMain.row = rec;
			}
		}
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : ""+getResource('resourceParam480')+"",
			dataIndex : 'dataObjectName'
		}, {
			header : ""+getResource('resourceParam853')+"",
			dataIndex : 'dimension'
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'dataTypeEntity.dataTypeName'
		}, {
			header : ""+getResource('resourceParam511')+"",
			dataIndex : 'value'
		}, {
			header : ""+getResource('resourceParam1201')+"",
			dataIndex : 'unit'
		}, {
			header : ""+getResource('resourceParam861')+"",
			dataIndex : 'description'
		}, {
			header : ""+getResource('resourceParam857')+"",
			dataIndex : 'dataCenter',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				// 这里要根据类型来返回不同的详细信息窗口
				var detail = '';		
				if (record.data.dataObjectType == ''
						|| record.get('dataTypeEntity').dataType == 'dataset' || record.data.dataCenter == true) {//数据集，自定义数据类型，数据中心或对象类型为空的没有详细信息					
				} else if (record.data.dataTypeEntity.dataType == 'file') {
					detail = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+getResource('resourceParam576')+getResource('resourceParam469')+getResource('resourceParam857')+'">'
							+ '<a href="javascript:void(0);" name="user1" onClick="dataCenterViewGrid.viewfiledetaildata(\''
							+ record.data.dataObjectID
							+ '\',\''
							+ record.data.dataObjectType
							+ '\')">'
							+ ''+getResource('resourceParam857')+'</a></div>';
				} else {
					detail = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240')+getResource('resourceParam1253')+getResource('resourceParam857')+'">'
							+ '<a href="javascript:void(0);" name="user1" onClick="dataCenterViewGrid.viewdetaildata(\''
							+ record.data.dataObjectID
							+ '\',\''
							+ record.data.dataObjectType
							+ '\')">'
							+ ''+getResource('resourceParam857')+'</a></div>';
				}
				if (record.data.isonline) {
					return detail;
				} else {
					return detail;
				}
	
			}
		}
		, {
			header : ""+getResource('resourceParam1035')+"",
			dataIndex : 'projectName'
		}
		, {
			header : ""+getResource('resourceParam998')+"",
			dataIndex : 'taskName'
		}]
	});
			var addBt = {
		text : ''+getResource('resourceParam477')+'',
		iconCls : 'add1',
		handler : dataCenterViewGrid.addItem		
	};
	var updateBt= {
		text : ''+getResource('resourceParam478')+'',
		iconCls : 'edit1',
		handler : dataCenterViewGrid.updateItem //不管是数据中心还是数据项，统一删除
	};
	var delBt={
		text : ''+getResource('resourceParam475')+'',
		iconCls : 'del1',
		handler : rowDelete.init 
 	};


  var findBt0={
        text:''+getResource('resourceParam474')+ '' + getResource('resourceParam9051') + '' , // text : 9051--视图
        iconCls : 'icon-mbom',
        handler : dataCenterViewGrid.activeView
    }
  
 	var tb = [
		'-', 
		addBt,
		'-', 
		delBt,
		'-', 
		updateBt,
		'-',
		findBt0,
		'-'
	];

	var grid = myGrid.init(ds, cm, tb, sm);
	 grid.height=320;
	//grid.region="north";
	// 行的双击事件，
//	grid.on('rowdblclick', function(thisgrid) {
//	});
	return grid;
}
