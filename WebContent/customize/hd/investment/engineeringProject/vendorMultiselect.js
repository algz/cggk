var vendorMultiselect = {
    issueDialog:null,
    form:null,
    temp:null,
    nodeid:null,
    selectString:null,
    getcontractmanuFacturers : "",
    getcontractmanuFacturersTel : "",
    engineeringContractId : "",
    contractmanuFacturers : "",
    contractmanuFacturersTel : "",
    contactPerson : "",
    vendorId : ""
}


//方法初始化
vendorMultiselect.init = function(){
	vendorMultiselect.getcontractmanuFacturers = "";
    vendorMultiselect.getcontractmanuFacturersTel = "";
    vendorMultiselect.contactPerson = "";
	
	
	var inputgrid = vendorMultiselect.getGridFunction();
	
	
	//创建对话框
	var window = new Ext.Window({
			id : 'popWindow',
			title : "选取厂商编号",
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
						Ext.getCmp('contractmanuFacturers').setValue(vendorMultiselect.getcontractmanuFacturers); 
						Ext.getCmp('contractmanuFacturersTel').setValue(vendorMultiselect.getcontractmanuFacturersTel);
						Ext.getCmp('contactPerson').setValue(vendorMultiselect.contactPerson);
						
						
						
						//自定义添加  确定后需要给那个组件赋值//////////////////////////////////////////////////
						window.close();
						window.remove();
					}
				},
				{
					id:'cancelBtn',
					text:'取消',
					handler:function(){
						vendorMultiselect.getcontractmanuFacturers = "";
    					vendorMultiselect.getcontractmanuFacturersTel = "";
    					vendorMultiselect.contactPerson = "";
						window.close();
						window.remove();
					}
				}
			]
			});	
	window.show();
	
	window.on("hide",function(){
		vendorMultiselect.getcontractmanuFacturers = "";
    	vendorMultiselect.getcontractmanuFacturersTel = "";
    	vendorMultiselect.contactPerson = "";
		window.close();
		window.remove();
	});
	return window;
}



//获取Ext.grid.GridPanel
vendorMultiselect.getGridFunction = function(){

	
vendorMultiselect.proxy = new Ext.data.HttpProxy( {
		url:"../JSON/engineeringProject_EngineeringProjectExecutiveManagementRemote.getVendorByGroup",
		method:'POST'
	});

//gyswhGrid.sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});
vendorMultiselect.sm = new Ext.grid.CheckboxSelectionModel({
//handleMouseDown:Ext.emptyFn
});



var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'vendorId'
	}, ['vendorId','contractmanuFacturers','contractmanuFacturersTel','contactPerson'
	
	   ]);

//datastore数据
vendorMultiselect.ds = new Ext.data.Store({
        proxy: vendorMultiselect.proxy,
        reader: reader
    });
vendorMultiselect.ds.load();




//表的列值
var cm = new Ext.grid.ColumnModel({
        //sortable  : false,
	    columns : [
		new Ext.grid.RowNumberer({
			header : "序号",
			width : 40
		}), 
		//vendorMultiselect.sm,
		
		{header:'合同厂商',dataIndex:'contractmanuFacturers',sortable:true,width:200},
		{header:'联系电话',dataIndex:'contractmanuFacturersTel',sortable:true,width:100},
		{header:'联系人',dataIndex:'contactPerson',sortable:true,width:100},
		{header:'主键ID',id:'expandId',dataIndex:'vendorId',sortable:true}
		]
});






var tb = [
		'-', 
		"厂商名称(可模糊):<input id='fuzzyQuery' type='text' onkeyup = 'getTheSelect()'/>",
		'-'
		
];

getTheSelect = function(){
	var getFuzzyQueryString = document.getElementById("fuzzyQuery").value;
	//加密 encodeURIComponent("")
	myGrid.loadvalue(vendorMultiselect.ds, {start:0,limit:25},
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
		sm : vendorMultiselect.sm,
		store : vendorMultiselect.ds,
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
					store : vendorMultiselect.ds,
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
	var selections = vendorMultiselect.sm.getSelections();//单选长度为1
	for (var i = 0; i < selections.length; i++){
		var record = selections[i];
		//vendorMultiselect.selectId = record.get('id') ;
		//vendorMultiselect.selectManufacturename = record.get('manufacturename');
		vendorMultiselect.getcontractmanuFacturers = record.get('contractmanuFacturers') ;//保存到全局变量
		vendorMultiselect.getcontractmanuFacturersTel = record.get('contractmanuFacturersTel') ;//保存到全局变量
		vendorMultiselect.contactPerson = record.get('contactPerson') ;//保存到全局变量
		vendorMultiselect.vendorId = record.get('vendorId');//保存到全局变量
	}
});




return grid;

}
