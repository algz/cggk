// 新闻类型表格对象
var newstypeGrid={};
// 新闻类型表格对象构造函数
newstypeGrid.grid = function() {
	// 表格数据
	var strurl = "../JSON/newstypesvr.getnewstypeList";
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'typeid'
	}, ['typeid', 'name', 'description', 'deleted']);
 	var ds = new Ext.data.Store({
        proxy: proxy,
        reader: reader
    });
	
 	// 表格布局
	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true,
		listeners : {
			rowselect : function(sm, row, rec) {
				newstypeMain.row =  rec;
			}
		}
	});
	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [ {
			id: 'typeid',
			header : "ID",
			dataIndex : 'typeid'
		}, {
			header : getResource('resourceParam1139')+"",
			dataIndex : 'name'
		}, {
			header : getResource('resourceParam1140')+"",
			dataIndex : 'description'
		} ]
	});
		
	// 表格按钮列表
	var addBt = {
		text : getResource('resourceParam477')+'',
		iconCls : 'user-add',
		handler : newstypeAdd.init
	};
	var updateBt= {
		text : getResource('resourceParam478')+'',
		iconCls : 'user-edit',
		handler : newstypeUpdate.init 
	};
	var delBt={
		text : getResource('resourceParam475')+'',
		iconCls : 'user-del',
		handler : newstypeDel.init 
 	};
 	var selBt={
		text : getResource('resourceParam652')+'',
		iconCls : 'user-del' 
 	};
 	var saveBt={
		text : getResource('resourceParam1130')+'',
		iconCls : 'user-del' 
 	};
	 
	var tb = [ '-', addBt, '-', delBt, '-', updateBt, '-' ];
	
	// 组装组件生成表格
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
