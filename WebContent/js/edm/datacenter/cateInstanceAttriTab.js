var cateInstanceAttriTab = {
	params : {}
}
cateInstanceAttriTab.init = function(checknodeid, isref) {

	var tabpanel = new Ext.TabPanel({
				id : 'cateInstanceAttriTab_tabPanel',
				activeItem : 0,
				layoutOnTabChange : true,
				border : false,
				resizeTabs : true,
				enableTabScroll : true,
				items : []
			});
	var nodeid = '';
	var revision;
	if (cateInstanceTree.root) {
		var rootnodeid = cateInstanceTree.root.id;

		if (checknodeid == "" || null == checknodeid
				|| undefined == checknodeid) {
			nodeid = rootnodeid;
			revision = cateInstanceTree.root.attributes.revision;
		} else {
			nodeid = checknodeid;
			revision = cateInstanceTree
					.getNodeById(cateInstanceTree.checkinstancenode.id).attributes.revision;
		}
	} else {
		nodeid = checknodeid;
	}
	var callBackFn = function(result) {
		var obj = Ext.util.JSON.decode(result);

		// 轻量化展现
//		var node = window.parent.getCheckNode();
		// var catetree = cateInstanceTree.init(node.id, newText,
		// node.attributes.categoryid, node.attributes.datacenterid, node
		// .getUI().getIconEl().src, node.attributes.revision,
		// node.attributes.realName);
		// alert(cateInstanceTree.attributeTree.getNodeById(checknodeid));
//		var cid = "";// 选中结点的分类id
//		var nid = "";
//		if (cateInstanceTree.checkinstancenode == null) {
//			cid = node.attributes.categoryid;
//			// nid = cateInstanceTree.checkinstancenode.id;
//		} else {
//			cid = cateInstanceTree.attributeTree.getNodeById(checknodeid).attributes.categoryid;
//			// nid = checknodeid;
//		}
//		if (cid == '20110511153046000953d8eaaa9100234e6ba88d'
//				|| cid == '20110511153243000328717d6bee7aca4ecaa43e') {
//			var conn1 = synchronize.createXhrObject();
//			var url1 = "../JSON/datacenter_DataCenterRemote.getCax?categoryInstanceID="
//					+ (checknodeid == undefined
//							? cateInstanceTree.root.id
//							: checknodeid) + "&categoryID=" + cid;
//			conn1.open("GET", url1, false);
//			conn1.send(null);
//			var respText1 = conn1.responseText;
//			var obj1 = Ext.util.JSON.decode(respText1);
//			if (obj1.totalProperty != 0) {
//				tabpanel.add(visual.cax(obj1.results[0].fileID,
//						obj1.results[0].value));
//			}
//		}
		for (var i = 0; i < obj.length; i++) {
			var categoryType = obj[i]['categoryType'];
			var dataObjectTab = null;
			if (2 == categoryType) {
				dataObjectTab = cateInstanceEditTab.init(
						obj[i]['categoryInstanceName'],
						obj[i]['categoryInstanceID'], i,
						obj[i]['dataCenterID'], revision, isref);

			} else if (3 == categoryType) {
				dataObjectTab = formEditTab.init(
						obj[i]['categoryInstanceName'], '', '',
						obj[i]['dataCenterID'], revision,
						obj[i]['categoryInstanceID'], obj[i]['categoryID'],
						'dataCenterForm');

			}

			var now = new Date();
			// if (i == 0) {
			//
			// // tabpanel.add(dataObjectTab);
			// tabpanel.add(dataObjectTab).show();
			//
			// } else {
			tabpanel.add(dataObjectTab);
			// }

			if (cateInstanceEditTab.activeTab != null
					&& obj[i]['categoryInstanceID'] == cateInstanceEditTab.activeTab.id) {
				tabpanel.activate(dataObjectTab);
			}
			tabpanel.doLayout();
		}
		if (obj.length == 0) {
			tabpanel.add(new Ext.Panel({
						title : '' + getResource('resourceParam474') + '',
						html : '' + getResource('resourceParam1726') + '!'

					})).show();
		} else {
			tabpanel.get(0).show();
		}
		if (cateInstanceTree.root) {
			cateInstanceTree.root.expand();
		}
		if (cateInstanceAttriTab.params.callback) {
			cateInstanceAttriTab.params.callback(tabpanel);
		}
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

	return tabpanel;
}
