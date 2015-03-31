Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var operation={
	grid:null,
	ds:null,
	args:null,
	baseargs:null
}
operation.init = function() {
	Ext.QuickTips.init();
	var strurl = '../JSON/base_operation_OperationService.listOperation';
	var proxy = new Ext.data.HttpProxy({
	    url: strurl,
	    method:'GET'
	});
	var reader = new Ext.data.JsonReader({
	        totalProperty: 'totalProperty',
			root: 'results'
	}, [
		{name:'id'},
		{name:'subSysId'},
		{name:'subSysName'},
		{name:'name'},
		{name:'descr'},
		{name:'optType'},
		{name:'deleteFlag'}		
	]);
	var ascid = 'id';
	var ascstr = 'asc';
	operation.ds = new data.Store(proxy,reader,ascid,ascstr);
	
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id:'id',
			header: "业务"+getResource('resourceParam461')+"", 
			width: 40, 
			dataIndex: 'id'
		}, {
			id:'name',
			header: "业务"+getResource('resourceParam480')+"",	
			width: 60,
			dataIndex: 'name'
		}, {
			id:'subSysId',
			header: "子"+getResource('resourceParam559')+""+getResource('resourceParam480')+"",	
			width: 60,
			dataIndex: 'subSysName'
		}, {
			id:'descr',
			header: "业务"+getResource('resourceParam648')+"",	
			dataIndex: 'descr'
		}]
	});
	var tb = [
	'-',{
  		text:''+getResource('resourceParam477')+'业务',
    	iconCls: 'news-add',
    	tooltip: {title:''+getResource('resourceParam477')+'业务',text:''+getResource('resourceParam647')+'一个新的业务'},
    	handler: function() {
    		addOpt.init(''+getResource('resourceParam477')+'业务');
    	}	
  	},'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam478')+'业务',
        tooltip: {title:''+getResource('resourceParam478')+'业务',text:''+getResource('resourceParam478')+'选中的业务'+getResource('resourceParam508')+''},
        iconCls: 'news-updata',
        handler: function() {
    		updateOpt.init(''+getResource('resourceParam478')+'业务',myGrid.row);
    	}   
  	},'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam576')+'业务',
        tooltip: {title:''+getResource('resourceParam576')+'详情',text:''+getResource('resourceParam576')+'选中的业务'+getResource('resourceParam508')+''},
        iconCls: 'new-topic',
        handler: function() {
        	optView.init(''+getResource('resourceParam576')+'业务',myGrid.row);        
        }
  	},'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam475')+'业务',
        tooltip: {title:''+getResource('resourceParam475')+'业务',text:''+getResource('resourceParam475')+'选中的业务'+getResource('resourceParam508')+''},
        iconCls: 'news-delete',
        handler: function() {
        	delOpt.init(''+getResource('resourceParam475')+'业务', myGrid.row);
        }
  	},'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam652')+'业务',
        tooltip: {title:''+getResource('resourceParam652')+'业务',text:'根据'+getResource('resourceParam455')+'件'+getResource('resourceParam652')+'业务'+getResource('resourceParam508')+''},
        iconCls: 'news-select',
        handler: searchOpt.init
  	},'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam665')+'',
        tooltip: {title:''+getResource('resourceParam665')+'',text:''+getResource('resourceParam664')+''},
        iconCls: 'role',
	       	handler:function() { 
	       		privManage.init(myGrid.row);
	       	}
	}];
  	
	operation.grid = myGrid.init(operation.ds,cm,tb,sm); 	
	operation.grid.region='center';
	var panel = new Ext.Viewport({
		layout:'border',
		items:operation.grid
	});
	operation.grid.on('rowdblclick', function(grid, rowIndex, e) {
		optView.init(''+getResource('resourceParam576')+'业务',rowIndex);  
	});
	operation.args = {start:0,limit:25};
	myGrid.loadvalue(operation.ds,operation.args,operation.baseargs);
}

Ext.onReady(operation.init,operation);
