var fankuiOther = {
	win:null,
	grid:null,
	ds:null,
	args:null,
	baseargs:null
}

fankuiOther.initWin = function(glianId, fankuilx) {
	fankuiOther.win = new Ext.Window({
		title:""+getResource('resourceParam454')+""+getResource('resourceParam607')+""+getResource('resourceParam926')+"",
	   	width:350,
	   	height:300,
	   	closeAction:'hide',
	   	layout:'border',
	   	modal:true,
	   	resizable:false,
	   	plain:false,
	   	autoScroll:true,
	   	buttons:[{
			text:''+getResource('resourceParam969')+'',
			handler:fankuiOther.closeWin
		}]
	});
	fankuiOther.win.on('hide',fankuiOther.closeWin);
}

fankuiOther.closeWin = function() {
	if(fankuiOther.win != null) {
		fankuiOther.win.close();
	}
}

fankuiOther.initGrid = function(glianId, fankuilx) {
	var strurl = '../data/common/fankui_FankuiSvr_getWeifankuiPageList.text';
  	fankuiOther.ds = fankuiAjax.getWeifankuiGridData(strurl);
   	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
		{
			header: ""+getResource('resourceParam879')+"", 
			width: 80, 
			name:'yonghuId',
			dataIndex: 'yonghuId'
		},
		{
			header: ""+getResource('resourceParam951')+"",
			dataIndex: 'yonghuxm',
			name:'yonghuxm',
			width: 100
		},
		{
			header: ""+getResource('resourceParam685')+"",
			dataIndex: 'instname',
			name:'instname',
			width: 100
		}]
   	});
	var tb = null;
    fankuiOther.grid = myGrid.initNobr(fankuiOther.ds,cm,tb,null,null);
    fankuiOther.baseargs = {
    	glianId:glianId, 
    	fankuilx:fankuilx
    }
	myGrid.loadvalue(fankuiOther.ds,null,fankuiOther.baseargs);
	
    return new Ext.Panel({
		region:'center',
		layout:'fit',
		items:fankuiOther.grid
	})
}

fankuiOther.init = function(glianId, fankuilx) {
	fankuiOther.initWin();
	fankuiOther.grid = fankuiOther.win.add(fankuiOther.initGrid(glianId, fankuilx));
	fankuiOther.win.show();
}
