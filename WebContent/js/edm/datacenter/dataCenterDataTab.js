var dataCenterDataTab = {

}
dataCenterDataTab.init = function(title, id, i, datacenterid, revision) {
	var dataObjectTree = dataCenterDataTreeGrid.init(id, i, datacenterid,
			revision, false);
	var temp = {

	};
	temp.id = id;
	temp.datacenterid = datacenterid;
	var disableEdit = function() {
		return false;
	};

	// id : 'label_cateHistoryVersion' + i,
	// xtype : 'label',
	// style : 'color:red;',
	// text : ''
	// }
	var label_cateHistoryVersion = new Ext.form.Label({
				style : 'color:red;',
				text : ''
			});
	var tab1 = new Ext.Panel({
		id : id + i,
		title : title,
		closable : true,
		closeAction : 'hide',
		autoDestroy : false,
		layout : 'fit',
		listeners : {
			'activate' : function(panel) {
				dataObjectTree.getSelectionModel().clearSelections()
				dataObjectTree.getStore().on('beforeload',
						function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							options.params = Ext.apply(options.params, {
										dataCenterID : temp.datacenterid,
										parentDataEntityID : temp.id,
										fixedRevision : revision
									});
						});
				dataObjectTree.getStore().load();
			},
			'bodyresize' : function() {
				dataObjectTree.setHeight(tab1.getHeight() - 25);
				dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		items : [dataObjectTree]

	});

	return tab1;
}
