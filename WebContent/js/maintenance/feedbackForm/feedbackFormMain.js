
/**
 * 项目类型列表
 */
var cateGoryMain = {
	cateGorypanel : null,
	cateGorygrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
};
cateGoryMain.defineAttribute = function(formid,typename) {
	
	if(window.parent.document.getElementById("center_frame").firstChild.firstChild != null) {
		window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML 
			= '<a ext:qtip="'+getResource('resourceParam1240')+getResource('resourceParam944')+'" href="javascript:void(0);" onClick="back('
		+ null
		+ ',\''
		+ typename
		+ '\')" style="text-decoration:underline;color:blue">'+getResource('resourceParam598')+'：'
		+ typename + '</a>';
	} else {
		window.parent.document.getElementById("center_frame").childNodes[1].innerHTML 
			= '<a ext:qtip="'+getResource('resourceParam1240')+getResource('resourceParam944')+'" href="javascript:void(0);" onClick="back('
		+ null
		+ ',\''
		+ typename
		+ '\')" style="text-decoration:underline;color:blue">'+getResource('resourceParam598')+'：'
		+ typename + '</a>';
	}
	cateGoryMain.baseargs = {
			formid:formid
	}
	myGrid.loadvalue(cateGoryExtend.grid.store, cateGoryMain.args,
			cateGoryMain.baseargs);
	cateGoryMain.cateGorypanel.getLayout().setActiveItem(1);

};
cateGoryMain.grid = function() {
	var strurl = '../JSON/maintenance_feedbackForm_FeedbackFormRemote.getFormList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'
			}, ['formid', 'formname', 'formtype', 'note']);
	var ds = new Ext.data.Store({
		proxy : proxy,
		reader : reader,
		autoLoad : true,
		baseParams : {
			start : 0,
			limit : 25
		}
	});

	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			selectionchange : function(sm) {
				Ext.Ajax.request({
					url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON
								.decode(response.responseText);
						if(obj.modelEdit==false){
							
						}else{
							if (sm.getCount()) {
								Ext.getCmp('deleteNewForm').enable();
							} else {
								Ext.getCmp('deleteNewForm').disable();
							}
							if (sm.getCount() == 1) {
								Ext.getCmp('updateNewForm').enable();
							} else {
								Ext.getCmp('updateNewForm').disable();
							}
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						privilegename : "{'modelEdit':''}"
					}
				});
			},
			rowselect : function(sm, rowIndex, record) {
				if (sm.getCount() == 1) {
					if (record.data.formtype == '5') {
						window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML 
							= getResource('resourceParam598')+'：'+getResource('resourceParam607')+getResource('resourceParam5000');
					}
					if (record.data.formtype == '3') {
						if(window.parent.document.getElementById("center_frame").firstChild.firstChild != null) { 
							window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML 
								= getResource('resourceParam598')+'：'+getResource('resourceParam5000');
						} else {
							window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML 
								= getResource('resourceParam598')+'：'+getResource('resourceParam5000');
						}
						
					}
				} else {
					window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''+getResource('resourceParam598')+'';
				}
				// 选中时传入表单类型id
				cateGoryMain.baseargs = {
					formid : record.data.formid
				}
			}
		}

	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : getResource('resourceParam5000')+getResource('resourceParam1139')+"",
			dataIndex : 'formname',
			width : 100
		}, {
			header : ""+getResource('resourceParam598')+"",
			dataIndex : 'formtype',
			width : 200,
			renderer : function(value) {
				if (value == '5') {
					return ''+getResource('resourceParam607')+getResource('resourceParam5000');
				}
				if (value == '3') {
					return getResource('resourceParam5000');
				}
			}
		}, {
			header : getResource('resourceParam5000')+getResource('resourceParam1140')+"",
			dataIndex : 'note',
			width : 200
		}, {
			header : ''+getResource('resourceParam598')+getResource('resourceParam5002'),
			dataIndex : 'manipulation',
			width : 40,
			renderer : function(value, p, record) {
				// 点击时传入项目类型id
	//			cateGoryMain.baseargs = {
	//				formid : record.data.formid
	//			};
				var typename = null;
				if (record.data.formtype == '5') {
					typename = ''+getResource('resourceParam607')+getResource('resourceParam5000');
				}
				if (record.data.formtype == '3') {
					typename = getResource('resourceParam5000');
	
				}
				return '<a href="javascript:void(0);" onClick="cateGoryMain.defineAttribute(\''
						+ record.data.formid
						+ '\',\''
						+ typename
						+ '\'    )"><span style="color:blue;font-weight:bold;" >'+getResource('resourceParam1782')+'</span></a>';
			}
		}]
	});
	var tb = ['-', {
				text : ''+getResource('resourceParam477')+''+getResource('resourceParam598')+'',
				id : 'addNewForm',
				iconCls : 'priv-add',
				tooltip : {
					title : ''+getResource('resourceParam477')+''+getResource('resourceParam598')+'',
					text : ''+getResource('resourceParam647')+'一个新的'+getResource('resourceParam598')+''
				},
				handler : cateGoryAdd.init

			}, '-', {
				// enableToggle:true,
				text : ''+getResource('resourceParam478')+''+getResource('resourceParam598')+'',
				id : 'updateNewForm',
				iconCls : 'priv-edit',
				disabled : true,
				tooltip : {
					title : ''+getResource('resourceParam478')+''+getResource('resourceParam598')+'',
					text : ''+getResource('resourceParam478')+'选中的'+getResource('resourceParam598')+''
				},
				handler : cateGoryUpdate.init

			}, '-', {
				text : ''+getResource('resourceParam475')+''+getResource('resourceParam598')+'',
				id : 'deleteNewForm',
				iconCls : 'priv-del',
				disabled : true,
				tooltip : {
					title : ''+getResource('resourceParam475')+''+getResource('resourceParam598')+'',
					text : ''+getResource('resourceParam475')+'选中的'+getResource('resourceParam598')+''
				},
				handler : cateGoryDelete.init
			}, '-'];
	var grid = myGrid.init(ds, cm, tb, sm);
	grid.on('afterlayout',function(panel){
		Ext.Ajax.request({
			url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON
						.decode(response.responseText);
				if(obj.modelEdit==false){
					panel.getTopToolbar().disable();
				}
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				privilegename : "{'modelEdit':''}"
			}
		});
	},this,{single : true});//@chenw请求后台控制为一次
	return grid;
}
cateGoryMain.init = function() {
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.QuickTips.init();

	cateGoryMain.cateGorygrid = cateGoryMain.grid();
	cateGoryMain.attributePanel = cateGoryAttribute.init();
	cateGoryMain.cateGorypanel = new Ext.Panel({
				id : 'cateGorypanel',
				layout : 'card',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				activeItem : 0,
				margins : '0 5 5 0',
				items : [cateGoryMain.cateGorygrid,cateGoryMain.attributePanel]

			});
//	cateGoryMain.cateGoryAttributePanel = new Ext.Panel({
//				layout : 'fit',
//				border : false,
//				autoScroll : true
//			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [cateGoryMain.cateGorypanel]

	});
//	myGrid.loadvalue(cateGoryMain.cateGorygrid.store, cateGoryMain.args,
//			cateGoryMain.baseargs);
}
Ext.onReady(cateGoryMain.init, cateGoryMain, true);
