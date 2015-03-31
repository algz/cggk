var cateInstanceEditTab = {

}
function getCheckData(data) {
	alert(cateInstanceEditTab.checkDataVer + ','
			+ cateInstanceEditTab.checkDataId);
	return cateInstanceEditTab.checkDataVer + ','
			+ cateInstanceEditTab.checkDataId;
}
cateInstanceEditTab.activeTab = null;
cateInstanceEditTab.init = function(title, id, i, datacenterid, revision) {
	var dataObjectTree = dataCenterGridView.init(true, false,datacenterid,id);
	var temp = {

	};
	var anodeNull = false;
	temp.id = id;
	temp.datacenterid = datacenterid;
	var disableEdit = function() {
		return false;
	};
	var label_cateHistoryVersion = new Ext.form.Label({
				style : 'color:red;',
				text : ''
			});
	var tab1 = new Ext.Panel({
		id : id + i,
		title : '<span ext:qtip="' + title + '">' + title + '</span>',
		closable : true,
		closeAction : 'hide',
		autoDestroy : false,
		listeners : {
			'activate' : function(panel) {
				dataObjectTree.getSelectionModel().clearSelections();
				if (window.parent.historyViewModel) {
					dataObjectTree.on('beforeedit', disableEdit);
					tab1.getTopToolbar().disable();
				} else {
					revision = -1;

				}
				dataObjectTree.getStore().on('beforeload',
						function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							if (anodeNull) {
								options.params = Ext.apply(options.params, {
											dataCenterID : temp.datacenterid,
											anode : null,
											parentDataEntityID : temp.id,
											fixedRevision : revision
										});
								anodeNull = false;
							} else {
								options.params = Ext.apply(options.params, {
											dataCenterID : temp.datacenterid,
											parentDataEntityID : temp.id,
											fixedRevision : revision
										});
							}
						});
				dataObjectTree.getStore().load();
				dataObjectTree.setHeight(tab1.getHeight());
				dataObjectTree.setWidth(tab1.getWidth());
				tab1.doLayout();
			},
			'bodyresize' : function() {
				dataObjectTree.setHeight(tab1.getHeight());
				dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		items : [dataObjectTree]

	});

	return tab1;
}
