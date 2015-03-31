//该类实现初始化参与人员界面功能
var renyuanUI = {
	grid:null,
	ds:null
}
//初始化表格
renyuanUI.initGrid = function(chakanlx, glianId, glianlx) {
	//var strurl = "../data/common/canyurenyuan_CanyurenyuanSvr_getRenyPageList.text";
	var strurl = "../JSON/common_canyurenyuan_CanyurenyuanSvr.getRenyuanGridData";
	renyuanUI.ds = renyuanAjax.getGridData(strurl);
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header:""+getResource('resourceParam951')+"", 
			sortable:true, 
			dataIndex:'yonghuxm'
		}, {
			header:""+getResource('resourceParam685')+"", 
			sortable:true, 
			width: 130,
			dataIndex:'instname'
		}, {
			header:''+getResource('resourceParam952')+'',
			sortable:true, 
			dataIndex:'zhiwu'
		}, {
			header:''+getResource('resourceParam803')+'',
			sortable:true,
			dataIndex:'jiaose',
			renderer:function(value) {
				return value == '0' ? ''+getResource('resourceParam962')+'' : (value == '1' ? ''+getResource('resourceParam963')+'' : ''+getResource('resourceParam964')+'');
			}
		},{
			header: ''+getResource('resourceParam956')+'',
			sortable: false,
			dataIndex: 'fankuikj',
			renderer: function(value){
				if (value == "0"){
					return "<input type='checkbox' name='fk' id='fk' selected>"
				}else{
					return "<input type='checkbox' id='fk' name='fk'>";
				}
			}
		},{
			header: ''+getResource('resourceParam957')+'',
			sortable: false,
			dataIndex: '',
			renderer: function(value){
				if (value == "0"){
					return "<input type='checkbox' name='pj' id='pj' selected>"
				}else{
					return "<input type='checkbox' name='pj' id='pj'>";
				}
			}
		}]
	});
	var tb = null;
	//chakanlx为2时为查看状态则不显示工具条
	if(chakanlx != '2') {
		var tb = ['-', {
			text:''+getResource('resourceParam958')+'',
	    	iconCls:'news-add',
	    	handler:function() {
	    		renyuanAdd.init(''+getResource('resourceParam959')+'',renyuanUI.ds, glianId, glianlx);
	    	}
		}, '-', {
			text:''+getResource('resourceParam960')+'',
	    	iconCls:'news-add',
	    	handler:function() {
	    		jigouAdd.init(''+getResource('resourceParam960')+'',renyuanUI.ds, glianId, glianlx);
	    	}
		}, '-', {
			text:''+getResource('resourceParam961')+'',
	        iconCls: 'news-delete',
	        handler:function() {
	        	if(!renyuanUtil.isNull(sm.getSelected()))return;
	        	renyuanRemove.init(renyuanUI.ds, sm.getSelected());
	        }
		}];
	}
	renyuanUI.grid = myGrid.initNobr(renyuanUI.ds, cm, tb, sm, null);
	renyuanUI.grid.autoScroll = true;
	//创建一个有数据的grid,当添加一个工作安排时（chakanlx为0），不需要显示用户数据
	if(chakanlx != '0') {
		var baseargs = {
			glianId:glianId,
			glianlx:glianlx
		}	
		myGrid.loadvalue(renyuanUI.ds, null, baseargs);
	}
	return renyuanUI.grid;
}
