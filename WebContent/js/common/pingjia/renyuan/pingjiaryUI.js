//该类实现初始化参与人员界面功能
var pingjiaryUI = {
	grid:null,
	ds:null,
	args:null,
	baseargs:null
}
//初始化表格
pingjiaryUI.initGrid = function(chakanlx, glianId, pinjialx) {
	var strurl = "../JSON/common_canyurenyuan_CanyurenyuanSvr.getRenyuanGridData";
	pingjiaryUI.ds = pingjiaryAjax.getGridData(strurl);
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header:"人员"+getResource('resourceParam942')+"", 
			width:80, 
			dataIndex:'yonghuxm'
		}, {
			header:""+getResource('resourceParam873')+"", 
			width:100, 
			dataIndex:'instname'
		}, {
			header:""+getResource('resourceParam952')+"", 
			width:100, 
			dataIndex:'zhiwu'
		}, {
			header:"评价"+getResource('resourceParam500')+"", 
			width:100, 
			dataIndex:'pinjiazt',
			renderer:function(value) {
				if(value == ''+getResource('resourceParam509')+'评价') {
					return "<font color='red'>" + value + "</font>";
				} else {
					return value;
				}
			}
		}]
	});
	var tb = null;
	
	var tb = ['-', {
		text:'评价人员',
    	iconCls:'news-add',
    	handler:function() {
    		if(!pingjiaUtil.isNull(sm.getSelected()))return;
    		pingjiaUpdate.init('评价人员', sm.getSelected(), chakanlx, pinjialx);
    	}
	}, '-', {
		text:''+getResource('resourceParam576')+'评价',
        iconCls: 'new-topic',
    	handler:function() {
    		if(!pingjiaUtil.isNull(sm.getSelected()))return;
    		pingjiaView.init(''+getResource('resourceParam576')+'评价', sm.getSelected());
    	}
	}];
	
	pingjiaryUI.grid = myGrid.initNobr(pingjiaryUI.ds, cm, tb, sm, null);
	pingjiaryUI.grid.autoScroll = true;
	
	pingjiaryUI.args = {start:0,limit:25};
	pingjiaryUI.baseargs = {
		chakanlx:chakanlx,
		glianId:glianId,
		pinjialx:pinjialx
	};
	myGrid.loadvalue(pingjiaryUI.ds, null, null);
	
	return pingjiaryUI.grid;
}
