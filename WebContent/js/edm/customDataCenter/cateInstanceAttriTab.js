var cateInstanceAttriTab = {

}
cateInstanceAttriTab.init = function(checknodeid) {

	var tabpanel = new Ext.TabPanel({
				id : 'cateInstanceAttriTab_tabPanel',
				activeItem : 0,
				layoutOnTabChange : true,
				border : false,
				resizeTabs : true,
				enableTabScroll : true

			});
	var nodeid = '';
	var revision;
	var rootnodeid = cateInstanceTree.root.id;

	if (checknodeid == "" || null == checknodeid || undefined == checknodeid) {
		nodeid = rootnodeid;
		revision = cateInstanceTree.root.attributes.revision;
	} else {
		nodeid = checknodeid;
		revision = cateInstanceTree.getNodeById(nodeid).attributes.revision;
	}
	var flag = 0;
	var callBackFn = function(result) {
		var obj = Ext.util.JSON.decode(result);
		for (var i = 0; i < obj.length; i++) {
			var dataObjectTab = cateInstanceEditTab.init(
					obj[i]['categoryInstanceName'],
					obj[i]['categoryInstanceID'], i, obj[i]['dataCenterID'],
					revision);
			var now = new Date();
			if (i == 0) {
				tabpanel.add(dataObjectTab).show();
			} else {
				tabpanel.add(dataObjectTab);
			}
			if (cateInstanceEditTab.activeTab != null
					&& obj[i]['categoryInstanceID'] == cateInstanceEditTab.activeTab.id) {
				tabpanel.activate(dataObjectTab);
			}
			tabpanel.doLayout();
		}
		// if (obj.length == 0) {
		// tabpanel.add(new Ext.Panel({
		// title : '数据',
		// html : '无相关数据!'
		//
		// })).show();
		// }
		flag = obj.length;
	}
	if (window.parent.customHistoryViewModel) {
		var vo = Seam.Component.newInstance("CategoryInstanceVersionVo");
		vo.setCategoryInstanceID(nodeid);
		vo.setFixedRevision(revision);
		callSeam("datacenter_DataCenterRemote",
				"getAllChildCateByFathByRevision", [vo], callBackFn);
	} else {
		Seam.Component.getInstance("datacenter_DataCenterRemote")
				.getAllChildCateByFath(nodeid, callBackFn);
	}

	return tabpanel;
}
