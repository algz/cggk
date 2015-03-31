var templateGrid = {

};

templateGrid.init = function(config) {
	var strurl = '../JSON/wbstemplate_TemplateRemote.getTemplateList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'name', 'notes', 'published', 'issuedManName']);
	var ascid = 'id';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var isApproval = function(sm) {
		var s = sm.getSelections(), r;
		for (var i = 0; i < s.length; i++) {
			r = s[i];
			if (r.data.published != 0) {
				return false;
			}
		}
		return true;
	}
	var getSelections = function() {
		var selections = '';
		var sel = sm.getSelections();
		for (var i = 0; i < sel.length; i++) {
			selections += sel[i].data.id + ','
		}
		return selections;
	}

	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount() > 0) {
							if (isApproval(sm)) {
								Ext.getCmp('tempate_approval').enable();
							} else {
								Ext.getCmp('tempate_approval').disable();
							}

							if (sm.getCount() == 1) {
								Ext.getCmp('template_privilege').enable();
							} else {
								Ext.getCmp('template_privilege').disable();
							}
							Ext.getCmp('template_delete').enable();

						} else {
							Ext.getCmp('tempate_approval').disable();
							Ext.getCmp('template_privilege').disable();
							Ext.getCmp('template_delete').disable();
						}
					},
					rowselect : function(sm, rowIndex, record) {
					}
				}

			});
	var method = 'templateMain.toWBS';
	if (config) {
		if (config.method) {
			method = config;
		}
	}
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : '' + getResource('resourceParam943')
					+ getResource('resourceParam5006')
					+ getResource('resourceParam480') + '',
			dataIndex : 'name',
			width : 40,
			renderer : function(value, p, record) {
				return '<a href="javascript:void(0);" onClick="'+method+'('
						+ record.data.id
						+ ')"><span style="color:blue;font-weight:bold;" >'
						+ value + '</span></a>';
			}
		}, {
			header : "" + getResource('resourceParam605') + ""
					+ getResource('resourceParam500') + "",
			dataIndex : 'published',
			width : 40,
			renderer : function(value, p, record) {
				if (value == 0) {
					return '' + getResource('resourceParam947') + '';
				} else if (value == 1) {
					return '<span style="color:gray;font-weight:bold;" >'
							+ getResource('resourceParam948') + '</span>';
				} else if (value == 2) {
					return '<span style="color:blue;font-weight:bold;" >'
							+ getResource('resourceParam509') + '入库</span>';
				}
			}
		}, {
			header : getResource('resourceParam5007'),
			dataIndex : 'issuedManName',
			width : 40
		}, {
			header : "" + getResource('resourceParam943')
					+ getResource('resourceParam5006')
					+ getResource('resourceParam648') + "",
			dataIndex : 'notes',
			width : 200,
			renderer : function(value, p, record) {
				return '<div ext:qtip=' + value + '>' + value + '</div>';
			}
		}]
	});
	var action = new Ext.Action({
				text : '' + getResource('resourceParam1550') + '...',
				handler : function() {
					var selections = templateMain.gridPanel.getSelectionModel()
							.getSelections();
					approvePanel.dataid = '';
					for (var i = 0; i < selections.length; i++) {
						approvePanel.dataid += selections[i].data.id + ',';
					}
					approvePanel.reset();
					myGrid.loadvalue(templateMain.gridPanel.store,
							templateMain.args, templateMain.baseargs);
					templateMain.mainPanel.getLayout().setActiveItem(2);
				}
			});
	var action1 = new Ext.Action({
		text : '' + getResource('resourceParam1365') + '',
		handler : function() {
			Ext.Msg.confirm('' + getResource('resourceParam575') + '',
					"该操作会将所选模板入库，" + getResource('resourceParam512') + ""
							+ getResource('resourceParam510') + "进行操作？",
					function(btn) {
						if (btn == 'yes') {
							var selections = templateMain.gridPanel
									.getSelectionModel().getSelections();
							var ids = '';
							for (var i = 0; i < selections.length; i++) {
								ids += selections[i].data.id + ',';
							}
							Ext.Ajax.request({
								url : "../JSON/wbstemplate_TemplateRemote.directApprove",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										myGrid.loadvalue(
												templateMain.gridPanel.store,
												templateMain.args,
												templateMain.baseargs);
									} else {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}

								},
								params : {
									ids : ids
								}
							});
						}
					});
		}
	});
	var tb = new Ext.Toolbar({
		items : [{
					id : 'tempate_approval',
					text : '' + getResource('resourceParam1062') + '',
					disabled : true,
					menu : [action, action1]
				}, '-', {
					id : 'template_privilege',
					text : '' + getResource('resourceParam582') + '',
					disabled : true,
					// tooltip : {
					// title : '权限',
					// text : '权限'
					// },
					handler : function() {
						var selection = templateMain.gridPanel
								.getSelectionModel().getSelected();

						setDataPrivilege.mainpanel.dataId = selection.data.id;
						setDataPrivilege.mainpanel.dataType = "TemplateDataType";
						setDataPrivilege.refresh();
						setDataPrivilege.config = {
							dataId : selection.data.id,
							dataType : "TemplateDataType"
						}
						templateMain.mainPanel.getLayout().setActiveItem(3);
					}

				}, '-', {
					id : 'template_delete',
					text : '' + getResource('resourceParam475') + '',
					disabled : true,
					handler : function() {
						Ext.Ajax.request({
							url : '../JSON/wbstemplate_TemplateRemote.deleteTemplate',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								myGrid.loadvalue(templateMain.gridPanel.store,
										templateMain.args,
										templateMain.baseargs);

							},
							params : {
								ids : getSelections()

							}
						});

					}

				}, {
					xtype : 'tbspacer',
					width : 20
				}, {
					xtype : 'tbtext',
					text : '' + getResource('resourceParam605') + ''
							+ getResource('resourceParam500') + ':'
				}, new Ext.form.ComboBox({
					hiddenName : 'stauts',
					store : new Ext.data.SimpleStore({
						fields : ['id', 'name'],
						data : [
								[
										-1,
										'所有' + getResource('resourceParam500')
												+ ''],
								[0, '' + getResource('resourceParam947') + ''],
								[1, '' + getResource('resourceParam948') + ''],
								[2, '' + getResource('resourceParam509') + '入库']]
					}),
					value : '所有' + getResource('resourceParam500') + '',
					valueField : 'id',
					displayField : 'name',
					typeAhead : false,
					mode : 'local',
					triggerAction : 'all',
					selectOnFocus : true,
					allowBlank : true,
					forceSelection : true,
					editable : false,
					style : 'margin-bottom: 5px;',
					width : 120,
					listeners : {
						'select' : function(combo, record, index) {
							templateMain.baseargs = {
								status : record.data.id
							}
							myGrid.loadvalue(templateMain.gridPanel.store,
									templateMain.args, templateMain.baseargs);
						}
					}
				})]
	});

	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
