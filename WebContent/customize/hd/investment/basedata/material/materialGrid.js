var materialGrid = {
	materialid : null
};

// 数据列表
materialGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/material_MaterialRemote.getAll?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		},
				[ 'materialitemcode','materialid', 'materialItemName', 'desingnation',
						'materialStandard', 'demension', 'referencePrice',
						'technicCondition', 'warningValue', 'preservePeriod',
						'remarks',
				        'deliveryStatus','materialClass','materialKind','approver'
				])
	});
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
		header : '物资编码',
		dataIndex : 'materialitemcode',
		width : 270,
		sortable : true
	}, {
		header : '物资名称',
		dataIndex : 'materialItemName',
		width : 100,
		sortable : true
	}, {
		header : '物资牌号',
		dataIndex : 'desingnation',
		width : 100,
		sortable : true
	}, {
		header : '物资规格',
		dataIndex : 'materialStandard',
		width : 100,
		sortable : true
	}, {
		header : '量纲',
		dataIndex : 'demension',
		width : 100,
		sortable : true
	}, {
		header : '计划单价',
		dataIndex : 'referencePrice',
		width : 100,
		sortable : true
	}, {
		header : '技术条件',
		dataIndex : 'technicCondition',
		width : 100,
		sortable : true
	}, {
		header : '预警值',
		dataIndex : 'warningValue',
		width : 100,
		sortable : true
	}, {
		header : '保管期',
		dataIndex : 'preservePeriod',
		width : 100,
		sortable : true
	}, {
		header : '备注',
		dataIndex : 'remarks',
		width : 100,
		sortable : true
	} ]);
	var tbar = [ '-', {
		id : 'addBtnId',
		text : '新增',
		iconCls : 'add1',
		//disabled : true,
		handler : function() {
			materialAction.addView();
		}
	}, '-',{
		text : '同步',
		iconCls : 'add1',
		disabled :!privilegeValidate.checkPrivilege('41000006'),
		handler : function() {
			Ext.Msg.confirm('提示','同步完成时间预计5分钟,是否开始同步物资?',function(btn){
				if (btn == 'yes') {
				    alert('请联系相关人员不要操作系统,否则可能出现数据异常!');
				    var myMask=new Ext.LoadMask(Ext.getBody(),{msg:'物资同步中...'});
				    myMask.show();
				    Ext.Ajax.request({
					    url : '../JSON/material_MaterialRemote.synchronousMaterial?d='+ new Date(),
						method : 'POST',
						success : function(response, options) {
							var obj=Ext.decode(response.responseText);
							Ext.Msg.alert('提示',obj.msg);
							myMask.hide();
						},
					    failure : function() {
							Ext.Msg.alert('提示', "网络问题,请与管理员联系!");
						}
					});
								}
			})

		}
	},'-',
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '编辑',
			iconCls : 'edit1',
			handler : function() {
				materialAction.editeView();
			}
		}*/
	//, '-',
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '删除',
			iconCls : 'del1',
			handler : function() {
				materialAction.del();
			}
		}*/
	//, '-',
	    //与库存系统集成后,屏蔽次操作
		/*{
			text : '导入',
			iconCls : 'Import',
			handler : function() {
				materialAction.upload();
			}
		}*/
	//, '-', 
	'物资名称：', {
		xtype : "textfield",
		id : "materialItemName"
	}, {
		xtype : "hidden",
		id : "type"
	}, {
		text : '搜索',
		iconCls : 'search1',
		handler : function() {
			materialAction.search();
		}
	} ];
	var grid = common.gridPanel('materialGridPanelId', cm, store, tbar, true,
			sm, '物资信息列表');
	return grid;
}

// 人员，在grid中传递登陆用户信息
materialGrid.getReaderName = function() {
	depUser.users('姓名', '', 'userName');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = true;
	depUser.usersComb.on('select', function(combo, record, index) {
		materialGrid.userId = record.get(combo.valueField);
	});
	return depUser.usersComb;
}

// 搜索
materialGrid.search = function() {
	var panel = Ext.getCmp("materialGridPanelId");
	panel.getStore().baseParams = {
		start : 0,
		limit : 20,
		userId : materialGrid.userId
	};
	panel.getStore().load();
}
