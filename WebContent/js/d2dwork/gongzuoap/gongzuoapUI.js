var gongzuoapUI = {
	apGrid:null,
	apds:null,
	jsGrid:null,
	jsds:null,
	tabPanel:null,
	args:null,
	baseargs:null
}

gongzuoapUI.initApGrid = function() {
	var strurl = '../data/d2dwork/gongzuoap_GongzuoapSvr_getGongzuoapPageList.text';
	gongzuoapUI.apds = gongzuoapAjax.getGridData(strurl);
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id:'anpbiaot',
			header:"安排"+getResource('resourceParam504')+"", 
			width:80, 
			dataIndex:'anpbiaot'
		}, {
			header:""+getResource('resourceParam1341')+"", 
			width:40, 
			dataIndex:'yonghuxm'
		}, {
			header:""+getResource('resourceParam1268')+"", 
			width:40, 
			dataIndex:'instname'
		}, {
			header:""+getResource('resourceParam981')+"", 
			width:80, 
			dataIndex:'chuanjsj'
		}, {
			header:""+getResource('resourceParam976')+"", 
			width:60, 
			dataIndex:'fujgeshu'
		}, {
			header:""+getResource('resourceParam1340')+"", 
			width:60, 
			dataIndex:'xinfanki',
			renderer:function(value) {
				return "<font color='red'>" + value + "</font>";
			}	
		}, {
			header:""+getResource('resourceParam1335')+"", 
			width:60, 
			dataIndex:'chulizht',
			renderer:function(value) {
				if(value == ''+getResource('resourceParam1338')+'') {
					return "<font color='red'>" + value + "</font>";
				} else if(value == ''+getResource('resourceParam1339')+'') {
					return "<font color='blue'>" + value + "</font>";
				} else {
					return value;
				}
			}
		}, {
			header:""+getResource('resourceParam997')+"", 
			width:40, 
			dataIndex:'wanchjdu'
		}]
	});
	var tb = [
	'-',{
  		text:''+getResource('resourceParam477')+'工作安排',
    	iconCls:'news-add',
    	handler:gongzuoapAdd.init
  	},'-',{
        text:''+getResource('resourceParam478')+'工作安排',
        iconCls: 'news-updata',
        handler: function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuoapUpdate.init(sm.getSelected());
    	}   
  	},'-',{
        text:''+getResource('resourceParam576')+'工作安排',
        iconCls: 'new-topic',
        handler: function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuoapView.init(sm.getSelected(), 0);
        }
  	},'-',{
        text:'取消工作安排',
        iconCls: 'news-delete',
        handler: function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuoapCancel.init(sm.getSelected());
        }
  	},'-',{
        text:''+getResource('resourceParam652')+'工作安排',
        iconCls:'news-select',
        handler:function() {
        	gongzuoapQuery.init(0);
        }
  	},'-',{
  		text:''+getResource('resourceParam974')+'',
        iconCls: 'news-select',
        handler:function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	fankuiMain.init(0, sm.getSelected().get('gzuoapId'), 0)
        }
  	},'-',{
  		text:'工作评价',
        iconCls: 'news-select',
        handler:function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuopj.init(sm.getSelected())
        }
  	}];
  	
	gongzuoapUI.apGrid = myGrid.init(gongzuoapUI.apds,cm,tb,sm);
	gongzuoapUI.args = {start:0,limit:25};
	myGrid.loadvalue(gongzuoapUI.apds,gongzuoapUI.args,gongzuoapUI.baseargs);
}

gongzuoapUI.initJsGrid = function() {
	var strurl = '../data/d2dwork/gongzuoap_GongzuoapSvr_getGongzuojsPageList.text';
	gongzuoapUI.jsds = gongzuoapAjax.getGridData(strurl);
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id:'anpbiaot',
			header:"安排"+getResource('resourceParam504')+"", 
			width:80, 
			dataIndex:'anpbiaot'
		}, {
			header:""+getResource('resourceParam1341')+"", 
			width:40, 
			dataIndex:'yonghuxm'
		}, {
			header:""+getResource('resourceParam1268')+"", 
			width:40, 
			dataIndex:'instname'
		}, {
			header:""+getResource('resourceParam981')+"", 
			width:80, 
			dataIndex:'chuanjsj'
		}, {
			header:""+getResource('resourceParam976')+"", 
			width:60, 
			dataIndex:'fujgeshu'
		}, {
			header:""+getResource('resourceParam1335')+"", 
			width:60, 
			dataIndex:'chulizht',
			renderer:function(value) {
				if(value == ''+getResource('resourceParam1338')+'') {
					return "<font color='red'>" + value + "</font>";
				} else if(value == ''+getResource('resourceParam1339')+'') {
					return "<font color='blue'>" + value + "</font>";
				} else {
					return value
				}
			}
		}, {
			header:""+getResource('resourceParam997')+"", 
			width:40, 
			dataIndex:'wanchjdu'
		}]
	});
	var tb = [
	'-',{
        text:''+getResource('resourceParam478')+'工作进度',
        iconCls: 'news-updata',
        handler: function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuojdUpdate.init(sm.getSelected());
    	}   
  	},'-',{
        text:''+getResource('resourceParam576')+'工作安排',
        iconCls: 'new-topic',
        handler: function() {
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	gongzuoapView.init(sm.getSelected(), 1);
        }
  	},'-', {
        text:''+getResource('resourceParam652')+'工作安排',
        iconCls: 'news-select',
        handler:function() {
        	gongzuoapQuery.init(1);
        }
  	},'-',{
        text:''+getResource('resourceParam970')+'',
        iconCls: 'news-add',
        handler: function(){
        	if(!gongzuoapUtil.isNull(sm.getSelected()))return;
        	fankuiMain.init(1, sm.getSelected().get('gzuoapId'), 0)
        }
  	}];
	
	gongzuoapUI.jsGrid = myGrid.init(gongzuoapUI.jsds,cm,tb,sm);
	gongzuoapUI.args = {start:0,limit:25};
	myGrid.loadvalue(gongzuoapUI.jsds,gongzuoapUI.args,gongzuoapUI.baseargs);
}

gongzuoapUI.initTabPanel = function() {
	
	gongzuoapUI.tabPanel = new Ext.TabPanel({
		region:'center',
		activeTab:0,
    	deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'jsgz',
			title:''+getResource('resourceParam1342')+'工作',
			layout:'fit',
			items:gongzuoapUI.jsGrid
		}, {
			id:'apgz',
			title:'安排工作',
			layout:'fit',
			items:gongzuoapUI.apGrid
		}]
	});
}
