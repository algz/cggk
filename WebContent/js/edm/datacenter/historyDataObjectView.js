var historyDataObjectView = {};
historyDataObjectView.init = function(dataEntityId, revision) {
	var historyDataObjectView = {};
	var t1 = dataCenterGridView.init(true);
	t1.on('celldblclick',function(){return false;});
	t1.getBottomToolbar().removeAll();
	t1.getBottomToolbar().add(new Ext.ux.maximgb.tg.PagingToolbar({
		store : t1.getStore(),
		displayInfo : true,
		listeners : {
			'beforechange' : function(ptbar, opt) {
				t1.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getHistoryDataEntities'
					})
					options.params = Ext.apply(options.params, {
								dataEntityID : dataEntityId,
								revision : revision
							});
				});
			}
		}
	}));
	t1.getStore().on('beforeload', function(store, options) {
		this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataEntity_DataEntityRemote.getHistoryDataEntities'
				})
		options.params = Ext.apply(options.params, {
					dataEntityID : dataEntityId,
					revision : revision
				});
	});
	t1.getStore().on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
						// disableCheck : true,
						dataCenterID : rc.get('dataCenterID'),
						dataEntityID : rc.get('dataEntityID'),
						parentDataEntityID : rc.get('parentDataEntityID'),
						dataEntityType : rc.get('dataEntityType'),
						customTypeParentID : rc.get('customTypeParentID'),
						customTypeItemID : rc.get('customTypeItemID'),
						isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
								.get("dimension")) > 1) ? 2 : rc.get('isRef'),
						inout : rc.get("inout"),
						dcategoryinstanceid : rc.get("dcategoryinstanceid"),
						revision : rc.get("revision")
					});
		});
	})
	t1.getStore().load();
	return t1;
}
historyDataObjectView.initCategoryHistoryButton = function(t,
		categoryInstanceId, dataCenterId) {
	var b = new Ext.Button({
		text : '' + getResource('resourceParam1702') + '',
		handler : function() {
			if (b.getText().indexOf('点击') > 0) {
				b.setText('' + getResource('resourceParam1702') + '');
				t.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
					})
					options.params = Ext.apply(options.params, {
								dataCenterID : dataCenterId,
								parentDataEntityID : categoryInstanceId,
								fixedRevision : null
							});
				});
				t.getStore().removeAll();
				t.getStore().load();
			} else if (b.getText() == getResource('resourceParam1702')) {
				var win = new Ext.Window({
					width : 650,
					height : 400,
					title : '' + getResource('resourceParam1704') + '',
					modal : true,
					autoScroll : true,
					items : [historyVersionsMain.init(categoryInstanceId)],
					bbar : ['->', {
						text : '' + getResource('resourceParam479') + '',
						handler : function() {
							if (win.items.get(0).get(0).getSelectionModel()
									.getSelections().length == 0) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam1703')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})
								return;
							}
							var r = win.items.get(0).get(0).getSelectionModel()
									.getSelected();
							t.getStore().on('beforeload',
									function(store, options) {
										this.proxy = new Ext.data.HttpProxy({
											method : 'POST',
											url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
										})
										options.params = Ext.apply(
												options.params, {
													anode : null,
													dataCenterID : dataCenterId,
													parentDataEntityID : categoryInstanceId,
													fixedRevision : r
															.get('fixedRevision')
												});
									});
							t.getStore().load();
							b.setText(getResource('resourceParam1706') + ':'
									+ r.get('version') + ' 点击'
									+ getResource('resourceParam1705'));
							win.close();
						}
					}, {
						text : '' + getResource('resourceParam506') + '',
						handler : function() {
							win.close();
						}
					}]
				});
				win.show();
			}
		}
	});
	return b;
}
historyDataObjectView.initDataHistoryButton = function(t) {
	var b = new Ext.Button({
				text : '' + getResource('resourceParam576') + '历史'
						+ getResource('resourceParam474') + '',
				handler : function() {
					var sm = t.getSelectionModel();
					var selections = sm.getSelections();
					var ucount = 0;
					for (var i = 0; i < selections.length; i++) {
						var pNode = t.getStore().getNodeParent(selections[i]);
						if (!pNode) {
							ucount = ucount + 1;
						}
					}
					if (ucount > 1) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '一次只能'
											+ getResource('resourceParam503')
											+ '一'
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					if (sm.getCount() == 0) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam459')
											+ '一'
											+ getResource('resourceParam455')
											+ ''
											+ getResource('resourceParam474')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					var win = new Ext.Window({
								autoScroll : true,
								items : [historyDataObjectView.init(sm
												.getSelected()
												.get('dataEntityID'), sm
												.getSelected().get('revision'))],
								width : 700,
								layout : 'fit',
								height : 300
							});
					win.show();
				}
			});
	return b;
}
