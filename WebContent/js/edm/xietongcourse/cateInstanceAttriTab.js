var cateInstanceAttriTab = {

}
cateInstanceAttriTab.init = function(checknodeid) {
	var tabpanel = new Ext.TabPanel({
				// id : 'cateInstanceAttriTab_tabPanel',
				// activeItem : 0,
				layoutOnTabChange : true,
				border : false,
				resizeTabs : true,
				enableTabScroll : true
			});
	var nodeid = '';
	var revision;
	if (cateInstanceTree.attributeTree.getRootNode()) {
		var rootnodeid = cateInstanceTree.attributeTree.getRootNode().id;

		if (checknodeid == "" || null == checknodeid
				|| undefined == checknodeid) {
			nodeid = rootnodeid;
			revision = cateInstanceTree.attributeTree.getRootNode().attributes.revision;
		} else {
			nodeid = checknodeid;
			revision = cateInstanceTree.getNodeById(nodeid).attributes.revision;
		}
	} else {
		nodeid = checknodeid;
	}
	var callBackFn = function(result) {
		var obj = Ext.util.JSON.decode(result);
		for (var i = 0; i < obj.length; i++) {
			var categoryType = obj[i]['categoryType'];

			var dataObjectTab = null;
			if (2 == categoryType) {
				dataObjectTab = cateInstanceEditTab.init(
						obj[i]['categoryInstanceName'],
						obj[i]['categoryInstanceID'], i,
						obj[i]['dataCenterID'], revision);
				if (cateInstancePanel.activeFlag == 2) {

					tabpanel.add(dataObjectTab).show();
				} else {
					tabpanel.add(dataObjectTab);
				}
			} else if (3 == categoryType) {
				// alert(obj[i]['categoryInstanceName']);
				dataObjectTab = formEditTab.init(
						obj[i]['categoryInstanceName'], '', '',
						obj[i]['dataCenterID'], revision,
						obj[i]['categoryInstanceID'], obj[i]['categoryID'],
						nodeid);
				if (cateInstancePanel.activeFlag == 1) {
					tabpanel.add(dataObjectTab).show();
				} else {
					tabpanel.add(dataObjectTab);
				}
			}

			tabpanel.doLayout();
		}
		if (undefined != checknodeid && checknodeid.indexOf("task") != -1) {
			var tasklogPanel = new Ext.Panel({
				title : '' + getResource('resourceParam629') + '',
				frame : false,
				boder : false,
				layout : 'fit',
				html : "<iframe scrolling=auto  id='taskloginfoframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
				listeners : {
					'activate' : function() {

						var taskid = checknodeid.replace("task_", "");
						document.getElementById('taskloginfoframe').src = "../logInfo.seam?temp="
								+ new Date()
								+ "&taskid="
								+ taskid
								+ "&endTime="
								+ Ext.util.Format.date(
										cateInstancePanel.createTime,
										'Y-m-d H:i:s')
								+ "&publics=1&publishMode=4&typeStr=1,3,4,";
					}
				}

			});
			tabpanel.add(tasklogPanel);
			tabpanel.doLayout();
		}
		if (obj.length == 0) {
			tabpanel.add(new Ext.Panel({
						title : '' + getResource('resourceParam474') + '',
						html : '' + getResource('resourceParam1726') + '!'

					})).show();
		}
		// cateInstanceTree.attributeTree.getRootNode().expand();
	}
	if (window.parent.historyViewModel) {
		var vo = Seam.Component.newInstance("CategoryInstanceVersionVo");
		vo.setCategoryInstanceID(nodeid);
		vo.setFixedRevision(revision);
		callSeam("datacenter_DataCenterRemote",
				"getAllChildCateByFathByRevision", [vo], callBackFn);
	} else {
		Seam.Component.getInstance("datacenter_DataCenterRemote")
				.getAllChildCateByFath(nodeid, callBackFn);
	}
	tabpanel.setActiveTab(0);
	return tabpanel;
}
