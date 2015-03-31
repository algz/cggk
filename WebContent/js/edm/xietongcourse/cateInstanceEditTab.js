var cateInstanceEditTab = {

}
function getCheckData(data) {
	return cateInstanceEditTab.checkDataVer + ','
			+ cateInstanceEditTab.checkDataId;
}
cateInstanceEditTab.activeTab = null;
cateInstanceEditTab.init = function(title, id, i, datacenterid, revision) {
	var dataObjectTree = dataObjectTreeGrid.init();
	var temp = {

	};
	temp.id = id;
	temp.datacenterid = datacenterid;
	var disableEdit = function() {
		return false;
	};
	var tab1 = new Ext.Panel({
		// id : id,
		title : title,
		closable : false,
		closeAction : 'hide',
		autoDestroy : false,
		listeners : {
			'activate' : function(panel) {
				dataObjectTree.getSelectionModel().clearSelections();
				cateInstancePanel.activeFlag = 2;
				if (window.parent.historyViewModel) {
					dataObjectTree.on('beforeedit', disableEdit);
					// tab1.getTopToolbar().disable();
				} else {
					revision = -1;
					var opertationVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.OperationVo");
					opertationVo.setDataId(id);
					opertationVo.setIsPermitted(false);
					opertationVo.setIsRefused(false);
					opertationVo.setFlag(false);
					opertationVo.setCompulsory(false);

				}
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
				dataObjectTreeGrid.setParameters({"dataCenterPrefixID":temp.datacenterid},{"dataCategoryPrefixID":temp.id},{"enableEdit":false})
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
