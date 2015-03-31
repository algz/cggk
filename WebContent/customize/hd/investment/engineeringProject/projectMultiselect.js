var projectMultiselect = {
    issueDialog:null,
    form:null,
    temp:null,
    nodeid:null,
    selectString:null,
    getProjectCode : "",
    getProjectName : "",
    engineeringContractId : ""
}


//方法初始化
projectMultiselect.init = function(){
	projectMultiselect.getProjectCode = "";
    projectMultiselect.getProjectName = "";
	
	
	
	var inputgrid = projectMultiselect.getGridFunction();
	
	
	//创建对话框
	var window = new Ext.Window({
			id : 'popWindow',
			title : "选取项目编号",
			height : 350,
			width : 800,
			layout : 'fit',
			modal: true,
			plain : false,
			constrainHeader : true,   //window头必须在窗口中
		    maximizable  : true,  //添加最大按钮
		    closeAction:'hide',
			items: [inputgrid],//将面板绑定到对话框
			buttons:
			[
				{
					id:'okBtn',
					text:'确定',
					handler:function(){
						//自定义添加  确定后需要给那个组件赋值//////////////////////////////////////////////////
						Ext.getCmp('projectCode').setValue(projectMultiselect.getProjectCode); 
						Ext.getCmp('projectName').setValue(projectMultiselect.getProjectName);
						
						
						
						//自定义添加  确定后需要给那个组件赋值//////////////////////////////////////////////////
						window.close();
						window.remove();
					}
				},
				{
					id:'cancelBtn',
					text:'取消',
					handler:function(){
						projectMultiselect.getProjectCode = "";
    					projectMultiselect.getProjectName = "";
						window.close();
						window.remove();
					}
				}
			]
			});	
			
	window.on("beforeshow",function(){
		myGrid.loadvalue(projectMultiselect.ds, {start:0,limit:25},
		{fuzzyQueryString : encodeURIComponent("") });//重新加载表格
	});
	
	window.on("hide",function(){
		projectMultiselect.getProjectCode = "";
    	projectMultiselect.getProjectName = "";
		window.close();
		window.remove();
	});
	
	
	
	window.show();
	
	return window;
}



//获取Ext.grid.GridPanel
projectMultiselect.getGridFunction = function(){

	
projectMultiselect.proxy = new Ext.data.HttpProxy( {
		url:"../JSON/engineeringProject_EngineeringProjectRemote.getProjectByGroup",
		method:'POST'
	});

//gyswhGrid.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
projectMultiselect.sm = new Ext.grid.CheckboxSelectionModel({
//handleMouseDown:Ext.emptyFn
});



var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'engineeringContractId'
	}, ['engineeringContractId','projectCode','projectName'
	
	   ]);

//datastore数据
projectMultiselect.ds = new Ext.data.Store({
        proxy: projectMultiselect.proxy,
        reader: reader
    });
projectMultiselect.ds.load();



//表的列值
var cm = new Ext.grid.ColumnModel({
        //sortable  : false,
	    columns : [
		new Ext.grid.RowNumberer({
			header : "序号",
			width : 40
		}), 
		//projectMultiselect.sm,
		
		{header:'项目编码',dataIndex:'projectCode',sortable:true,width:200},
		{header:'项目名称',dataIndex:'projectName',sortable:true,width:200},
		{header:'主键ID',id:'expandId',dataIndex:'engineeringContractId',sortable:true}
		]
});






var tb = [
		'-', 
		"项目编号或者项目名称(可模糊):<input id='fuzzyQuery' type='text' onkeyup = 'getTheSelect()'/>",
		'-'
		/*
		{text:'查询',iconCls : 'search1',handler:function(){
			  	    var a = document.getElementById("selectSupplyType");//获取下拉列表的options对象
					var b = a.options[a.selectedIndex].text; //获取已经选取的值
			  	    var getFuzzyQueryString = document.getElementById("fuzzyQuery").value;
			  		
					//加密 encodeURIComponent("")
					myGrid.loadvalue(projectMultiselect.ds, {start:0,limit:25},
						{fuzzyQueryString : encodeURIComponent(getFuzzyQueryString) });//重新加载表格
		}},
		'-'
		*/
];

getTheSelect = function(){
	var getFuzzyQueryString = document.getElementById("fuzzyQuery").value;
	//加密 encodeURIComponent("")
	myGrid.loadvalue(projectMultiselect.ds, {start:0,limit:25},
		{fuzzyQueryString : encodeURIComponent(getFuzzyQueryString) });//重新加载表格
}



//var grid = myGrid.init(gyswhGrid.ds, cm, tb,sm);
//D:\WEB_PLATFORM20110620_2.8.0.28650\WebContent\customize\common.js
//var grid = common.gridPanel('gridProvider',cm,gyswhGrid.ds,tb,false,gyswhGrid.sm,'供应商列表');

var grid = new Ext.grid.GridPanel({
	    title : "",
		id : "gridProvider",
		autoExpandColumn : "expandId",
		cm : cm,
		sm : projectMultiselect.sm,
		store : projectMultiselect.ds,
		autoScroll : true,
		columnLines : true,
		enableColumnHide:false,
		loadMASK : {msg:'数据加载中...'},
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		bbar : new Ext.PagingToolbar({
					pageSize : 25,
					store : projectMultiselect.ds,
					displayInfo : true,
					displayMsg : '当前行数{0} - {1} 共 {2} 行',
					emptyMsg : "未查询到数据"
		}),
		tbar : tb  
		//listeners : {'render' : function() {
		//	tb.render(this.tbar);
		//}}
		
	});


grid.addListener("rowclick",function(){
	//双击有冲突,默认单击,再点确定
	var selections = projectMultiselect.sm.getSelections();//单选长度为1
	for (var i = 0; i < selections.length; i++){
		var record = selections[i];
		//projectMultiselect.selectId = record.get('id') ;
		//projectMultiselect.selectManufacturename = record.get('manufacturename');
		projectMultiselect.getProjectCode = record.get('projectCode') ;//保存到全局变量
		projectMultiselect.getProjectName = record.get('projectName') ;//保存到全局变量
		projectMultiselect.engineeringContractId = record.get('engineeringContractId');//保存到全局变量
	}
});


return grid;

}
