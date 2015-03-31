Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var userUpdateOrg = {
	baseargs : null,
	userid : null,
	nodePath:null
};

userUpdateOrg.getOrgGrid = function(result) {
	Ext.QuickTips.init();
	userUpdateOrg.userids = result;
	var record = Ext.data.Record.create([{
				name : 'depname',
				type : 'string'
			},{
				name:'qtip',
				type:'string'
			}, {
				name : 'instcode'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'id'
			}, {
				name : 'parent',
				type : 'auto'
			}])
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/base_user_UserSerivce.queryDepartmentTree'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});
	var columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'depname',
			header : getResource('resourceParam1292'),//'部门名称',
			
			width : 200,
			dataIndex : 'depname',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,store) {
				var name = '';
				name=record.get('qtip');
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			} 
		}, {
			header : getResource('resourceParam3008'),//'部门编号',
			width : 100,
			dataIndex : 'instcode'
		}]
	});
	store.load();
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		        sm:new Ext.grid.RowSelectionModel(),
				store : store,
				master_column_id : 'depname',
				cm : columnModel,
				stripeRows : true,
				autoExpandeColumn : 'depname',
				listeners : {}
			});
	userUpdateOrg.panel = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				// autoScroll : true,
				items : [grid]
			});
	userUpdateOrg.userUpdateOrgDialog = new Ext.Window({ // 创建对话框
		title : getResource('resourceParam3009'),//'为用户分配部门',
		modal : true,
		layout : 'border',
		width : 300,
		height : 400,
		items : userUpdateOrg.panel,
		resizable : false,
		plain : false,
		buttons : [{
			text : '' + getResource('resourceParam505') + '',
			handler : function() {
				var nodeInf=grid.getSelectionModel().getSelected().get('id');
				var uv = Seam.Remoting
						.createType("com.luck.itumserv.base.user.GuserVo");
				if (nodeInf != undefined) {
					uv.setUserids(userUpdateOrg.userids);
					uv.setDepid(nodeInf);
					Seam.Component.getInstance("base_user_UserSerivce")
							.updateuserDep(uv, userUpdateOrg.saveSuccess);
				} else {
					Ext.MessageBox.alert('' + getResource('resourceParam508')
									+ '', getResource('resourceParam3010')/*'请选中一个部门'*/);
				}
			}
		}, {
			text : ''+getResource('resourceParam7007')+'',
			handler : function() {
				userUpdateOrg.userUpdateOrgDialog.close();
			}
		}]
	});
	userUpdateOrg.userUpdateOrgDialog.show();
	userUpdateOrg.saveSuccess = function(value) {
		var sign = value;
		if (sign == true) {
			Ext.MessageBox.show({
						title : getResource('resourceParam1072'),//'保存成功',
						msg : '' + getResource('resourceParam631') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.INFO
					});
			user.baseargs = {
				start : user.ds.baseParams.start,
				limit : user.ds.baseParams.limit
			}
			myGrid.loadvalue(user.grid.store, user.baseargs, null);
			user.sm.clearSelections();
			userUpdateOrg.userUpdateOrgDialog.close();
		} else {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam634') + '',
						msg : '' + getResource('resourceParam804') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		}
	}
}