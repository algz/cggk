////添加参与机构信息员类
var jigouAdd = {
	win:null,
	grid:null,
	ds:null
}

jigouAdd.initWin = function(title, ds, glianId, glianlx) {
	jigouAdd.win = new Ext.Window({
		title:title,
	   	width:400,
	   	height:300,
	   	closeAction:'hide',
	   	layout:'border',
	   	modal:true,
	   	resizable:false,
	   	plain:false,
	   	autoScroll:true,
	   	buttons:[{
			text:''+getResource('resourceParam484')+'',
			handler:function () {
				jigouAdd.submit(ds, glianId, glianlx);
			}	
		}, {
			text:'取消',
			handler:jigouAdd.closeWin
		}]
	});
	jigouAdd.win.on('hide',jigouAdd.closeWin);
}

jigouAdd.closeWin = function() {
	if(jigouAdd.win != null) {
		jigouAdd.win.close();
	}
}

jigouAdd.submit = function(ds, glianId, glianlx) {
	jigouAdd.ds.filter('sign',true);
	for(var i = 0; i < jigouAdd.ds.getCount(); i++) {
		jigouAdd.ds.getAt(i).set('glianId', glianId);
		jigouAdd.ds.getAt(i).set('glianlx', glianlx);
		jigouAdd.ds.getAt(i).set('renyleix', '1');
		jigouAdd.ds.getAt(i).set('jiaose', '2');
		ds.insert(0, jigouAdd.ds.getAt(i));
	}
	jigouAdd.closeWin();
	Ext.MessageBox.show({
       title: ''+getResource('resourceParam623')+'',
       msg:''+getResource('resourceParam950')+'!',
       buttons: Ext.MessageBox.OK,
       icon: Ext.MessageBox.INFO
   	});	
}

jigouAdd.initForm = function(glianId, glianlx) {
	
	var combo = instSelectUI.getCombo(''+getResource('resourceParam890')+'', 'instcode');
	
	//选择一个机构后查出该机构的人员
	combo.on('select', function(combo, tree, index){	
		baseargs = {
	    	glianId:glianId,
	    	glianlx:glianlx,
	    	instcode: tree.id
	    };
	    myGrid.loadvalue(jigouAdd.ds,null,baseargs);
	});
	
	jigouAdd.form = {
		xtype:'form',
		region:'north',
		labelSeparator:':',
		frame:true,	
		height:42,
		bodyStyle:'padding:5px 5px 0;background:transparent',
		items:combo
	}
	return jigouAdd.form;
}

jigouAdd.initGrid = function() {
	//var strurl = '../data/common/canyurenyuan_CanyurenyuanSvr_getJigouPageList.text';
	var strurl = "../JSON/common_canyurenyuan_CanyurenyuanSvr.getInstituteLeader";
  	jigouAdd.ds = renyuanAjax.getGridData(strurl);
  	var checkColumn = new Ext.grid.CheckColumn({
       	header: ""+getResource('resourceParam503')+"",
		dataIndex: 'sign',
       	width: 50
   	});
   	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [checkColumn,
//   		{
//   			header:"机构ID",
//			dataIndex:'instcode',
//			sortable: false
//   		},{
//			header:"机构名称",
//			dataIndex:'instname',
//			sortable: false
//		},
//		{
//			header:"机构类型",
//			dataIndex:'kind',
//			sortable:false
//		}
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
    
    jigouAdd.grid = myGrid.initNobr(jigouAdd.ds,cm,tb,null,checkColumn);  	
	myGrid.loadvalue(jigouAdd.ds,null,null);
	
    return new Ext.Panel({
		region:'center',
		layout:'fit',
		items:jigouAdd.grid
	})
}

jigouAdd.init = function(title, ds, glianId, glianlx) {
	jigouAdd.initWin(title, ds, glianId, glianlx);
	jigouAdd.win.add(jigouAdd.initForm(glianId, glianlx));
	jigouAdd.win.add(jigouAdd.initGrid());
	jigouAdd.win.show();
	
	jigouAdd.ds.on('load', function() {
		for(var i = 0; i < ds.getCount(); i++) {
			var index = jigouAdd.ds.find('yonghuId', ds.getAt(i).get('yonghuId'));
	  		jigouAdd.ds.remove(jigouAdd.ds.getAt(index));
  		}
	});
}
