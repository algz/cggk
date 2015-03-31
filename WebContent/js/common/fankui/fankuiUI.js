var fankuiUI = {
	grid:null,
	ds:null,
	args:null,
	baseargs:null
}

//chakanlx是0时,反馈界面查看类型,为工作或项目安排者查看权限,反馈信息界面有查看，显示未反馈者工具条
//chakanlx是1时,反馈界面查看类型,为工作或项目接受者查看权限,反馈信息界面有增加，修改，删除，查看工具条
//glianId,为关联表ID,由fankuilx决定关联的表
//fankuilx,反馈类型,fankuilx为0时为工作安排,fankuilx为1时为项目管理
fankuiUI.initGrid = function(chakanlx, glianId, fankuilx) {
	var strurl = '../data/common/fankui_FankuiSvr_getFankuiPageList.text';
	fankuiUI.ds = fankuiAjax.getGridData(strurl);
	var tb = null;
	if(chakanlx == '0') {
		tb = ['-',{
	        text:''+getResource('resourceParam974')+'',
	        iconCls: 'new-topic',
	        handler:function() {
	        	if(!fankuiUtil.isNull(sm.getSelected()))return;
	        	fankuiView.init(sm.getSelected(), chakanlx);
	        }
	  	}, '-', {
	        text:''+getResource('resourceParam576')+''+getResource('resourceParam454')+''+getResource('resourceParam607')+'者',
	        iconCls: 'new-topic',
	        handler:function() {
	        	fankuiOther.init(glianId, fankuilx);
	        }
	  	}];
	} else {
	  	tb = [
		'-',{
	  		text:''+getResource('resourceParam972')+'',
	    	iconCls:'news-add',
	    	handler:function() {
	    		fankuiAdd.init(glianId, fankuilx);
	    	}
	  	},'-',{
	        text:''+getResource('resourceParam973')+'',
	        iconCls: 'news-updata',
	        handler:function() {
	        	if(!fankuiUtil.isNull(sm.getSelected()))return;
	        	fankuiUpdate.init(sm.getSelected());
	        }
	  	},'-',{
	        text:''+getResource('resourceParam974')+'',
	        iconCls: 'new-topic',
	        handler:function() {
	        	if(!fankuiUtil.isNull(sm.getSelected()))return;
	        	fankuiView.init(sm.getSelected(), chakanlx);
	        }
	  	},'-',{
	        text:''+getResource('resourceParam971')+'',
	        iconCls: 'news-delete',
	        handler:function() {
	        	if(!fankuiUtil.isNull(sm.getSelected()))return;
	        	fankuiRemove.init(sm.getSelected());
	        }
	  	}];
	}
	var sm = new Ext.grid.RowSelectionModel({singleSelet:true});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header:""+getResource('resourceParam601')+"", 
			width:60, 
			dataIndex:'fankuibt'
		}, {
			header:""+getResource('resourceParam977')+"", 
			width:60, 
			dataIndex:'yonghuxm'
		}, {
			header:""+getResource('resourceParam978')+"", 
			width:80, 
			dataIndex:'fankuisj'
		}, {
			header:""+getResource('resourceParam975')+"", 
			width:40, 
			dataIndex:'shifliul',
			renderer:function(value) {
				if(value == ''+getResource('resourceParam979')+'') {
					return "<font color='red'>" + value + "</font>"
				} else {
					return value
				}
			}
		}, {
			header:""+getResource('resourceParam976')+"", 
			width:40, 
			dataIndex:'fujgeshu'
		}]
	});
	fankuiUI.grid = myGrid.init(fankuiUI.ds,cm,tb,sm);
	fankuiUI.args = {start:0,limit:25};
	fankuiUI.baseargs = {
		glianId:glianId,
		fankuilx:fankuilx,
		chakanlx:chakanlx
	}
	myGrid.loadvalue(fankuiUI.ds,fankuiUI.args,fankuiUI.baseargs);
}
