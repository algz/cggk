var viewData = {

}
viewData.init = function(dataid, version) {
	var conn = synchronize.createXhrObject();
	var url = "../JSON/dataEntity_DataEntityRemote.getDataRelationByDestinationDataId?dataEntityID="
			+ dataid + "&revision=" + version;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	var obj = Ext.util.JSON.decode(respText);
	// alert(respText);
	// return;
	var conn2 = synchronize.createXhrObject();
	var url2 = "../JSON/datacenter_DataCenterRemote.getVersion?categoryInstanceID="
			+ obj.sourceCategoryInsID + "&revision=" + obj.sourceDataRevision;
	conn2.open("GET", url2, false);
	conn2.send(null);
	var respText2 = conn2.responseText;
	var obj2 = Ext.util.JSON.decode(respText2);

	var dataObjectTree = dataObjectTreeGridView.init();

	dataObjectTree.getStore().on('beforeload', function(store, options) {
				this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
						})
				options.params = Ext.apply(options.params, {
							dataCenterID : obj.sourceDataCenterID,
							parentDataEntityID : obj.sourceCategoryInsID,
							fixedRevision : obj.sourceDataRevision
						});
			});
	// alert(obj.sourceDataRevision+":"+ obj.sourceDataCenterID);
	// projectBasicProperties_3885951
	var conn1 = synchronize.createXhrObject();
	var pre = "";
	if (obj.sourceCategoryInsID.indexOf("project") != -1) {
		pre = "project_"
	} else if (obj.sourceCategoryInsID.indexOf("task") != -1) {
		pre = "task_";
	}
	var url1 = "../JSON/datacenter_DataCenterRemote.getChildProp?categoryInstanceID="
			+ pre
			+ obj.sourceCategoryInsID.substring(obj.sourceCategoryInsID
							.indexOf('_')
							+ 1, obj.sourceCategoryInsID.length);

	conn1.open("GET", url1, false);
	conn1.send(null);
	var respText1 = conn1.responseText;
	var obj1 = Ext.util.JSON.decode(respText1);
	
	var myAttributePanel = null;
	if(obj1 == ""){
		return;
	}else{
		for (var i = 0; i < obj1.length; i++) {
			if (obj1[i]['categoryInstanceID'].indexOf("taskBasicProperties") != -1
					|| obj1[i]['categoryInstanceID']
							.indexOf("projectBasicProperties") != -1) {
				myAttributePanel = projectform.init('属性', '', '',
						obj1[i]['dataCenterID'], obj.sourceDataRevision,
						obj1[i]['categoryInstanceID'], obj1[i]['categoryID'],
						obj.sourceDataCenterID);
	
			}
		}
	}
	var historyTab = new Ext.TabPanel({
				border : false,
				activeItem : 0,
				items : [myAttributePanel, new Ext.Panel({
									layout : 'fit',
									items : [dataObjectTree],
									title : ''
											+ getResource('resourceParam474')
											+ '',
									listeners : {
										'activate' : function(panel) {
											dataObjectTree.getStore().load();
										}
									}
								})]

			});
	//
	var dataWin = new Ext.Window({
				title : '',
				height : 300,
				width : 600,
				modal : true,
				layout : 'fit',
				autoScroll : true,
				items : [historyTab]

			});
	dataWin.show();
}