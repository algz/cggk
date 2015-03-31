var lirarianAttribute = {obj:null};

//共享的图书期刊信息列表
lirarianAttribute.inGrid = function(tbar){
	var checkbox = new Ext.grid.CheckboxSelectionModel();
	var rn = new Ext.grid.RowNumberer();
	var fields = ['guid','reciveDate','bookType','bookNum','title','count','pageNum','secretLevel','bookIndex','bookState','bookWhere','reciveCount','note'];
	var store = new Ext.data.JsonStore({url:'../JSON/material_MaterialRemote.getLibrarianInfoList',root:'results',totalProperty:'totalProperty',fields:fields});
	var colM = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [checkbox,rn,
			{header:'接收时间',dataIndex:'reciveDate'},
			{header:'分类',dataIndex:'bookType'},
	 		{header:'书号',dataIndex:'bookNum'},
	 		{header:'名称',dataIndex:'title'},	                                
	 		{header:'份数',dataIndex:'count'},
	 		{header:'每份页数',dataIndex:'pageNum'},	             
	 		{header:'密级',dataIndex:'secretLevel'},
	 		{header:'索取号',dataIndex:'bookIndex'},
	 		{header:'状态',dataIndex:'bookState'},
	 		{header:'存放位置',dataIndex:'bookWhere'},
	 		{header:'借出次数',dataIndex:'reciveCount'},
	 		{header:'备注',dataIndex:'note'}                                
    	]
    });
	//底部导航
	var bbar = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	var ingrid = new Ext.grid.GridPanel({
		id:'materialGridId',
		title:' 图书期刊列表  ',
		sm:checkbox,
		cm:colM,
		store:store,
		loadMASK:{msg:'数据加载中...'},
		stripeRows:true,
		tbar:tbar,
		bbar:bbar
	});
	checkbox.on('selectionchange', function(sm) {
		var arr = sm.getSelections();
		if(arr){
			lirarianAttribute.obj = arr[arr.length-1];
		}
	});
	ingrid.on('activate',function(){
		ingrid.getStore().load({params:{start:0,limit:20}});
		ingrid.doLayout();
	})
	return ingrid;
}

//图书管理密级
var sLStore = [['中国','中国'],['特级','特级']];
//图书管理分类
var bookTypeStore = [['中国','中国']];
//图书状态
var bookStateStore = [['在库','在库'],['借出','借出']];
