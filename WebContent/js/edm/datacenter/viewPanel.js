var viewPanel = {
	checkViewId : null,
	checkViewName : null
}
viewPanel.init = function() {
	var strurl = '../JSON/dataobject_DataObjectRemote.queryViewList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});

	var cols = ['viewId', 'viewName', 'description', 'categroyId',
			'topCategoryId', 'topCategoryIdPath', 'createTime', 'userId'];
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'viewId'
			}, cols);
	var ascid = 'viewId';
	var ascstr = 'createTime';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {

					},
					rowselect : function(sm, rowIndex, record) {
						if (sm.getCount() == 1) {
						} else {
						}
					}
				}

			});
	var tb = [{
		text : '' + getResource('resourceParam576') + '',
		listeners : {
			'click' : function() {
				if (viewPanel.checkViewId == null) {
					Ext.example.msg('' + getResource('resourceParam596') + '!',
							'' + getResource('resourceParam4065') + '')
					return;
				}
				// cateInstanceTree.view = '1';
				// cateInstanceTree.attributeTree.getRootNode()
				// .setText(viewPanel.checkViewName);
				// cateInstanceTree.attributeTree.getRootNode().reload();
				cateInstanceTree.viewView(viewPanel.checkViewName,
						viewPanel.checkViewId);
			}
		}
	}];
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : getResource('resourceParam4064'),
			dataIndex : 'viewName',
			width : 100
		}, {
			header : "" + getResource('resourceParam981') + "",
			dataIndex : 'createTime',

			renderer : function(value, p, record) {
				var dataTime = new Date(value.time.time);
				return dataTime.format('Y-m-d');
			}
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'description',
			width : 200
		}]
	});

	viewPanel.viewGrid = myGrid.init(ds, cm, tb, sm);
	viewPanel.viewTree = viewView.init();
	viewPanel.viewTree.getBottomToolbar().hide();
	viewPanel.viewTree.disable();
	viewPanel.viewGrid.on('rowclick', function(grid, index, e) {
		// alert(cateInstanceTree.attributeTree.getRootNode().text);
		viewPanel.viewTree.enable();
		viewView.viewid = myGrid.row.get("viewId");
		viewPanel.checkViewId = myGrid.row.get("viewId");
		viewPanel.checkViewName = myGrid.row.get("viewName");
		var conn = synchronize.createXhrObject();
		var url = "../JSON/datacenter_DataCenterRemote.getDataCategoryMetaById?categoryid="
				+ cateInstanceTree.attributeTree.getRootNode().attributes.categoryid;
		conn.open("GET", url, false);
		conn.send(null);
		var respText = conn.responseText;

		var obj = Ext.util.JSON.decode(respText);
		var conn = synchronize.createXhrObject();
		var url = "../JSON/dataobject_DataObjectRemote.getRootIsCheck?nodeid="
				+ cateInstanceTree.attributeTree.getRootNode().attributes.categoryid
				+ "&viewid=" + myGrid.row.get("viewId");
		conn.open("GET", url, false);
		conn.send(null);
		var respText = conn.responseText;
		var obj1 = Ext.util.JSON.decode(respText);
		if (obj1.success == true) {
			viewPanel.viewTree.getRootNode().getUI().checkbox.checked = true;
			viewPanel.viewTree.getRootNode().attributes.checked = true;
		} else {
			viewPanel.viewTree.getRootNode().getUI().checkbox.checked = false;
			viewPanel.viewTree.getRootNode().attributes.checked = false;
		}
		var categoryName = obj.categoryName;
		viewPanel.viewTree.getRootNode().setText(categoryName);
		viewPanel.viewTree.getRootNode().setId(cateInstanceTree.attributeTree
				.getRootNode().attributes.categoryid);
		viewPanel.viewTree.getRootNode().getUI().getIconEl().src = cateInstanceTree.attributeTree
				.getRootNode().getUI().getIconEl().src;
		Ext.apply(viewPanel.viewTree.getRootNode().attributes, {
			treePath : cateInstanceTree.attributeTree.getRootNode().attributes.categoryid
		});

		viewPanel.viewTree.getRootNode().reload();
		viewPanel.viewTree.getRootNode().expand(true, true);
	});
	var main = new Ext.Panel({
				layout : 'border',
				items : [new Ext.Panel({
									layout : 'fit',
									region : 'west',
									border : false,
									split : true,
									width : 500,
									items : [viewPanel.viewGrid]

								}), new Ext.Panel({
									layout : 'fit',
									region : 'center',

									items : [viewPanel.viewTree]
								})]
			});
	return main;
}
