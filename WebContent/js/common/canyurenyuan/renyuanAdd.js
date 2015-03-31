//添加参与人员类
var renyuanAdd = {
	win:null,
	form:null,
	grid:null,
	ds:null
}

renyuanAdd.initWin = function(title, ds, glianId, glianlx) {
	renyuanAdd.win = new Ext.Window({
		title:title,
	   	width:400,
	   	height:350,
	   	closeAction:'hide',
	   	layout:'border',
	   	modal:true,
	   	resizable:false,
	   	plain:false,
	   	autoScroll:true,
	   	buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:function () {
				renyuanAdd.submit(ds, glianId, glianlx);
			}	
		}, {
			text:'取消',
			handler:renyuanAdd.closeWin
		}]
	});
	renyuanAdd.win.on('hide',renyuanAdd.closeWin);
}

renyuanAdd.initForm = function(glianId, glianlx) {
	
	var combo = instSelectUI.getCombo(''+getResource('resourceParam890')+'', 'instcode');
	
	//选择一个机构后查出该机构的人员
	combo.on('select', function(combo, tree, index){	
		baseargs = {
	    	glianId:glianId,
	    	glianlx:glianlx,
	    	instcode: tree.id
	    };
	    myGrid.loadvalue(renyuanAdd.ds,null,baseargs);
	});
	
	renyuanAdd.form = {
		xtype:'form',
		region:'north',
		labelSeparator:':',
		frame:true,	
		height:42,
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:combo
	}
	return renyuanAdd.form
}

renyuanAdd.closeWin = function() {
	if(renyuanAdd.win != null) {
		renyuanAdd.win.close();
	}
}

renyuanAdd.submit = function(ds, glianId, glianlx) {
	renyuanAdd.ds.filter('sign',true);
	for(var i = 0; i < renyuanAdd.ds.getCount(); i++) {
		renyuanAdd.ds.getAt(i).set('glianId', glianId);
		renyuanAdd.ds.getAt(i).set('glianlx', glianlx);
		renyuanAdd.ds.getAt(i).set('renyleix', '0');
		renyuanAdd.ds.getAt(i).set('jiaose', '2');
		ds.insert(0, renyuanAdd.ds.getAt(i));
	}
	renyuanAdd.closeWin();
	Ext.MessageBox.show({
       title: ''+getResource('resourceParam623')+'',
       msg:''+getResource('resourceParam950')+'!',
       buttons: Ext.MessageBox.OK,
       icon: Ext.MessageBox.INFO
   	});
}

renyuanAdd.initGrid = function(glianId, glianlx) {
	var strurl = '../JSON/common_canyurenyuan_CanyurenyuanSvr.getRenyuanGridAddData';
  	renyuanAdd.ds = renyuanAjax.getGridData(strurl);
  	var checkColumn = new Ext.grid.CheckColumn({
       	header:""+getResource('resourceParam503')+"",
		dataIndex:'sign',
       	width: 50
   	});
   	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [checkColumn,
		{
			header: ""+getResource('resourceParam951')+"",
			dataIndex: 'yonghuxm'
		},
		{
			header: ""+getResource('resourceParam685')+"",
			dataIndex: 'instname'
		},{
			header:''+getResource('resourceParam952')+'',
			dataIndex:'zhiwu'
		}]
   	});
	var tb = null;
    renyuanAdd.grid = myGrid.initNobr(renyuanAdd.ds,cm,tb,null,checkColumn);  	
    baseargs = {
    	glianId:glianId,
    	glianlx:glianlx,
    	instcode:'_all'
    }
	myGrid.loadvalue(renyuanAdd.ds,null,baseargs);
	
    return new Ext.Panel({
		region:'center',
		layout:'fit',
		items:renyuanAdd.grid
	})
}

renyuanAdd.init = function(title, ds, glianId, glianlx) {
	renyuanAdd.initWin(title, ds, glianId, glianlx);
	renyuanAdd.grid = renyuanAdd.win.add(renyuanAdd.initGrid(glianId, glianlx));
	renyuanAdd.form = renyuanAdd.win.add(renyuanAdd.initForm(glianId, glianlx));
	renyuanAdd.win.show();
	renyuanAdd.ds.on('load', function() {
		for(var i = 0; i < ds.getCount(); i++) {
			var index = renyuanAdd.ds.find('yonghuId', ds.getAt(i).get('yonghuId'));
	  		renyuanAdd.ds.remove(renyuanAdd.ds.getAt(index));
  		}
	});
}
