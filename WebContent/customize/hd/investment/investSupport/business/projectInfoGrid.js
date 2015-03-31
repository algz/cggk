Ext.ns("projectInfoGrid");
/**
 * 项目信息
 * 
 * @class projectInfoGrid
 * @extends Ext.grid.GridPanel
 */
projectInfoGrid = Ext.extend(Ext.grid.GridPanel, {
			id : 'projectInfoGrid',
			title : '项目信息',
			width : 600,
			height : 300,
			viewConfig : {
				forceFit : true
			},
			listeners : {
				activate : function(grid) {
					grid.store.load();
				}
			},
			initComponent : function() {
				var grid = this
				var store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : '../JSON/businessRemote.getProjectInfo?d=' + new Date(),
										method : 'post'
									}),
							reader : new Ext.data.JsonReader({
										root : 'results',
										totalProperty : 'totalProperty',
										id : 'projectnum'
									}, ['projectnum', 'projectname', 'projectamount', 'amountunit', 'projecttype', 'state']),
							// autoLoad : true,
							baseParams : {
								start : 0,
								limit : 20
							}
						});
				Ext.applyIf(this, {
							sm : new Ext.grid.RowSelectionModel({
										singleSelect : true
									}),
							columns : [new Ext.grid.RowNumberer(), {
										header : "项目编号",
										width : 100,
										dataIndex : "projectnum"
									}, {
										header : "项目名称",
										width : 100,
										dataIndex : "projectname"
									}, {
										header : "项目金额",
										width : 100,
										dataIndex : "projectamount"
									}, {
										header : "金额单位",
										width : 100,
										dataIndex : "amountunit"
									}, {
										header : "项目类别",
										width : 100,
										dataIndex : "projecttype"
									}, {
										header : "状态",
										dataIndex : "state"
									}],
							store : store,
							tbar : ['-', '编号:', {
										xtype : 'textfield',
										id:'projectnum'
									}, '名称:', {
										xtype : 'textfield',
										id:'projectname'
									}, {
										text : '查询',
										handler:function(){
											grid.store.setBaseParam('projectnum',Ext.getCmp('projectnum').getValue());
											grid.store.setBaseParam('projectname',Ext.getCmp('projectname').getValue());
											grid.store.load();
										}
									}],
							bbar : new Ext.PagingToolbar({
										pageSize : 20,
										store : store,
										displayInfo : true,
										displayMsg : 'Displaying topics {0} - {1} of {2}',
										emptyMsg : "No topics to display"
									})
						});
				projectInfoGrid.superclass.initComponent.call(this);
			}
		});
Ext.reg('projectInfoGrid', projectInfoGrid);
