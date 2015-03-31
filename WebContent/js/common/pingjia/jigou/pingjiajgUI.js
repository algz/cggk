//该类实现初始化参与人员界面功能
var pingjiajgUI = {
	grid:null,
	ds:null,
	args:null,
	baseargs:null
}
//初始化表格
pingjiajgUI.initGrid = function(chakanlx, glianId, pinjialx) {
	var strurl = "../data/common/pingjia_PingjiarySvr_getPingjiajgPageList.text";
	pingjiajgUI.ds = pingjiajgAjax.getGridData(strurl);
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header:""+getResource('resourceParam685')+"", 
			width:80, 
			dataIndex:'instname'
		}, {
			header:""+getResource('resourceParam698')+"", 
			width:100, 
			dataIndex:'kind'
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
		text:'评价'+getResource('resourceParam882')+'',
    	iconCls:'news-add',
    	handler:function() {
    		if(!pingjiaUtil.isNull(sm.getSelected()))return;
    		pingjiaUpdate.init('评价'+getResource('resourceParam882')+'', sm.getSelected(), chakanlx, pinjialx);
    	}
	}, '-', {
		text:''+getResource('resourceParam576')+'评价',
        iconCls: 'new-topic',
    	handler:function() {
    		if(!pingjiaUtil.isNull(sm.getSelected()))return;
    		pingjiaView.init(''+getResource('resourceParam576')+'评价', sm.getSelected());
    	}
	}];
	
	pingjiajgUI.grid = myGrid.initNobr(pingjiajgUI.ds, cm, tb, sm, null);
	pingjiajgUI.grid.autoScroll = true;
	
	pingjiajgUI.args = {start:0,limit:25};
	pingjiajgUI.baseargs = {
		chakanlx:chakanlx,
		glianId:glianId,
		pinjialx:pinjialx
	};
	myGrid.loadvalue(pingjiajgUI.ds, null, null);
	
	return pingjiajgUI.grid;
}
