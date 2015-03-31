

function openBatchPassWindow(){
	
	
	var storeMappingConfig=[
		{name : 'datatypeName',                            mapping :'datatypeName' },                   //主键
		{name : 'datatype',                      mapping :'datatype'},             //来源
		{name : 'datatypeDiscription',		                     mapping :'datatypeDiscription'},                 //类型
		{name : 'version',                   mapping :'version'}
		
      ];
      
      
//*********************************************************************************************
//分组表格的表头设置信息                                                											
//*********************************************************************************************     
    var selectCMD=new Ext.grid.CheckboxSelectionModel({singleSelect:true})
 	var cm=new Ext.grid.ColumnModel({
			columns: [new Ext.grid.RowNumberer(),	
				    selectCMD,			 
					{header: '主键',  dataIndex: 'datatypeName',align: 'left'},					
					{header: '来源',  dataIndex: 'datatype',align: 'left'},					
					{header: '类型',  dataIndex: 'datatypeDiscription',align: 'left'},
					{header: '涉及模块',  dataIndex: 'version',align: 'left'}
				],
			    defaultSortable: false
     });


var mappingReader = Ext.data.Record.create(storeMappingConfig);

var urlData = '../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=4&start=0&limit=100';

var store = new Ext.data.GroupingStore({
		proxy       :  new Ext.data.HttpProxy({
	   		               url    : urlData ,
	   		               method : 'GET'
		}),
		reader      : new Ext.data.JsonReader({
			                    id              : "id",
			                    totalProperty   : "totalProperty",
			                    root            : "results"
		},mappingReader),
	    remoteStore :     true,
	    autoLoad    :     true
});

store.on('load',function(){
		alert(333);
})
	
	
	var grid = new Ext.grid.GridPanel({	
			id                  : 'mainGridId',
			height              : (screenHeight-30),		
			width               : (screenWidth-30),	
			autoExpandColumn    : "memory",
			autoWidth			: true,
			autoHeight			: true,
			cls                 : 'gridcell-showline-right',
			store               : store,
			sm                  : selectCMD,	
			colModel            : cm,
			collapsible         : true,
	        animCollapse        : true,
			enableHdMenu        : false,
			enableColumnMove    : false,
			allowDomMove        : false
		})
	
	
		
		
	var formpanel=new  Ext.form.FormPanel({
		id				 : 'formPanelId',
		height           : screenHeight,
		width            : screenWidth,
		autoScroll       : true,
		frame            : true,
		onSubmit         : Ext.emptyFn,
		items            : [grid]
		
  });	
		
	var window=new Ext.Window({
		title          : "批量置通过操作" ,
		height		   : 550,
		width		   : screenWidth*0.7,
	    id             : 'batchPassWindow',
	    hideParent     : false,
		modal          : true,
	    plain          : true,
	    items          : [formpanel],
	    buttons:[{		
		            	xtype     : 'button',
		            	id        : 'btnBatchButtonOk',
		                text      : '确定',
		                handler   : doBatchPass
				    },'-',{		
		            	xtype     : 'button',
		            	id        : 'btnBatchButtonCancle',
		                text      : '取消',
		                handler   : doBatchCancle
				    }]
	});
	
	window.show();	

	
	function doBatchPass(){
		alert(111);
	}
	
	function doBatchCancle(){
		alert(22222);
	}

}






 
