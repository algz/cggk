Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var orgManage = {
	leftPanel : null,
	columnTree : null,
	nodePath : null,
	totalWidth : null,
	grid : null,
	baseargs : {
		sign : '0',
		instcode : '0'
	}
}

// 点击机构管理中的编辑所走的方法具体实现
orgManage.defineChargeMan = function defineAttribute(instcode, name) {
	chargemanPanel.instcode = instcode;
	chargemanPanel.name = name;
	orgManage.baseargs = {
		instcode : instcode
	};
	myGrid.loadvalue(depchargemanPanel.grid.store, {
				start : 0,
				limit : 25
			}, orgManage.baseargs);
	orgManage.leftPanel.getLayout().setActiveItem(1);
	orgManage.definechargeManPanel.setActiveTab(0);
};
orgManage.init = function() {
	Ext.QuickTips.init();
	var record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'qtip'
			}, {
				name : 'kind'
			}, {
				name : 'instcode'
			}, {
				name : 'kindname'
			}, {
				name : 'instlevel'
			}, {
				name : 'parent'
			}, {
				name : 'leaf'
			}, {
				name : 'id'
			}, {
				name : 'sign'
			}])
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/base_organization_OrganizationService.listOrganization2'
			});
	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				// autoLoad : true,
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)

			});
	store.on('beforeload', function(store, options) {
				Ext.apply(options.params, orgManage.baseargs);
			});
	store.load({
				callback : function() {
					store.each(function(rec) {
								if (rec.get("instlevel") == "") {
									store.expandNode(rec);
								}
							})
				}
			});
	store.on('beforeexpandnode', function(store, rc) {
				orgManage.baseargs = {
					instcode : rc.get("id"),
					sign : '0'
				};
			})
	var sm = new Ext.grid.CheckboxSelectionModel();
	sm.singleSelect = true;
	var columnModel = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'name',
			header : '' + getResource('resourceParam685') + '',// 机构名称
			width : 200,
			dataIndex : 'name',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var name = '';
				name = record.get('qtip');
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			}
		}, {
			header : getResource('resourceParam697'),// 机构编号
			width : 80,
			dataIndex : 'instcode'
		}, {
			header : getResource('resourceParam698'),// 机构类型
			width : 100,
			dataIndex : 'kindname'
		}, {
			header : getResource('resourceParam700'),// 机构等级
			width : 80,
			dataIndex : 'instlevel'
		}, {
			header : '' + getResource('resourceParam731') + '',
			dataIndex : 'taskmanipulation',
			width : 60,
			renderer : function(value, p, record) {
				if (record.data.id != 0) {
					return '<a href="javascript:void(0);" onClick="orgManage.defineChargeMan(\''
							+ record.data.instcode
							+ '\',\''
							+ record.data.name
							+ '\'    )"><span style="color:blue;font-weight:bold;" >'
							+ getResource('resourceParam490') + '</span></a>';
				}
			}
		}]
	});
	// 机构管理中机构树面板
	orgManage.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
				store : store,
				sm : sm,
				master_column_id : 'name',
				cm : columnModel,
				editable : false,
				lazyRender : true,
				viewConfig : {
					forceFit : true
				},
				autoExpandeColumn : 'name',
				onSelect : function(record, index) {
				}
			});
	var nodeInf;
	var parentNode;
	sm.on("selectionchange", function(selection) {
				if (selection.getSelections().length == 1
						&& selection.getSelections()[0].get("id") == 0) {
					Ext.getCmp("addOrgButton").enable();
					Ext.getCmp("updateOrgButton").disable();
					Ext.getCmp("delOrgButton").disable();
					Ext.getCmp("seeOrgButton").disable();
					nodeInf = selection.getSelections()[0];
					parentNode=store.getNodeParent(nodeInf);
				} else if (selection.getSelections().length == 1
						&& selection.getSelections()[0].get("id") != 0) {
					Ext.getCmp("addOrgButton").enable();
					Ext.getCmp("updateOrgButton").enable();
					Ext.getCmp("delOrgButton").enable();
					Ext.getCmp("seeOrgButton").enable();
					user.depid = selection.getSelections()[0].get("id");
					user.loadvalue(selection.getSelections()[0].get("id"));
					adduser.depid = selection.getSelections()[0].get("id");
					adduser.depname = selection.getSelections()[0].get("name");
					finduser.depid = selection.getSelections()[0].get("id");
					finduser.depname = selection.getSelections()[0].get("name");
					nodeInf = selection.getSelections()[0];
					parentNode=store.getNodeParent(nodeInf);
				}
			})
	// 左边面板加载机构树
	orgManage.orgPanel = new Ext.Panel({
		region : 'west',
		width : 500,
		// collapsible : false,
		split : true,
		layout : 'fit',
		tbar : ['-', {
			id : 'addOrgButton',
			text : '' + getResource('resourceParam701') + '',//
			disabled : true,
			iconCls : 'branch-add',
			tooltip : {
				title : '' + getResource('resourceParam701') + '',
				text : '' + getResource('resourceParam696') + ''
			},
			handler : function() {
				addOrg.init("" + getResource('resourceParam701') + "", nodeInf);
			}
		}, '-', {
			// enableToggle:true,
			id : 'updateOrgButton',
			text : '' + getResource('resourceParam702') + '',
			disabled : true,
			tooltip : {
				title : '' + getResource('resourceParam702') + '',
				text : '' + getResource('resourceParam693') + ''
			},
			iconCls : 'branch-edit',
			handler : function() {
				updateOrg.init("" + getResource('resourceParam702') + "",
						nodeInf,parentNode);
			}
		}, '-', {
			// enableToggle:true,
			text : '' + getResource('resourceParam703') + '',
			id : 'seeOrgButton',
			disabled : true,
			tooltip : {
				title : '' + getResource('resourceParam576')
						+ getResource('resourceParam7077') + '',
				text : '' + getResource('resourceParam694') + ''
			},
			iconCls : 'branch-comment',
			handler : function() {
				orgView
						.init("" + getResource('resourceParam703') + "",
								nodeInf);
			}
		}, '-', {
			// enableToggle:true,
			text : '' + getResource('resourceParam704') + '',
			id : 'delOrgButton',
			disabled : true,
			tooltip : {
				title : '' + getResource('resourceParam704') + '',
				text : '' + getResource('resourceParam695') + ''
			},
			iconCls : 'branch-del',
			handler : function() {
				delOrg.init("" + getResource('resourceParam704') + "", nodeInf);
			}
		}, '-', {
			// enableToggle:true,
			text : '' + getResource('resourceParam705') + '',
			tooltip : {
				title : '' + getResource('resourceParam705') + '',
				text : '' + getResource('resourceParam692') + ''
			},
			iconCls : 'branch-select',
			handler : searchOrg.init
		}, '-', {
			// enableToggle:true,
			text : '' + getResource('resourceParam698') + '',
			tooltip : {
				title : '' + getResource('resourceParam698') + '',
				text : '' + getResource('resourceParam3000')
						+ getResource('resourceParam698') + ''
			},
			iconCls : 'branch-select',
			handler : function() {
				orgManage.leftPanel.getLayout().setActiveItem(2);
			}
		}
		// , '-'
		// '-',{
		// //enableToggle:true,
		// text:'业务分配',
		// tooltip: {title:'业务分配理',text:'分配各个机构的业务'},
		// iconCls: 'icon-zxt',
		// handler:function(){
		// optManage.init('业务分配', nodeInf);
		// }
		// },
		],
		items : [orgManage.grid]
			// listeners : {
			// bodyresize : function(panel, width, height) {
			// //alert(width);
			// totalWidth=width;
			// }
			//
			// }
	});
	orgManage.definechargeManPanel = chargemanPanel.init();
	var deptypePanel=deptypeMain.init();
	// 左边面板加载机构树和编辑面板
	orgManage.leftPanel = new Ext.Panel({
				region : 'center',
				width : 500,
				// collapsible : false,
				activeItem : 0,
				split : true,
				layout : 'card',
				items : [orgManage.orgPanel, orgManage.definechargeManPanel,
						deptypePanel]
			})
	// 主面板
	orgManage.centerPanel = new Ext.Panel({
				layout : 'border',
				region : 'center',
				border : false,
				items : [orgManage.leftPanel, user.panel]
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'fit',
		items : [orgManage.centerPanel]

	});
	viewport.doLayout();
	user.addgrid();
}
Ext.onReady(orgManage.init, orgManage);
