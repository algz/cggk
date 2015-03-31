var biduiMain = {
	pageSize : 100,
	rootName : 'Root',
	rootID : '0',
	bomType : 'PBOM'
};
biduiMain.init = function() {

	biduiMain.expendAllE = function() {
		biduiMain.ebomtree.expandAll();
	}

	biduiMain.expendAllMP = function() {
		biduiMain.mpbomtree.expandAll();
	}

	biduiMain.T1Container = new Ext.Panel({
				autoScroll : true
			});

	biduiMain.T2Container = new Ext.Panel({
				frame : false,
				boder : false
			});

	biduiMain.T3Container = new Ext.Panel({
				frame : false,
				boder : false
			});

	biduiMain.getmpbom = function(flag) {
		var url = '';
		if (flag == 'MBOM') {
			url = '../JSON/XacCommon_CommonRemote.getMbomById';
		} else if (flag == 'PBOM') {
			url = '../JSON/XacCommon_CommonRemote.getPbomById';
		} else { // isFindOne
			url = '../JSON/XacCommon_CommonRemote.getOneNode?type=' + flag
					+ '&text=' + biduiMain.bomType;
		}
		biduiMain.mpbomtree = new Ext.tree.TreePanel({
					id : 'mpbom-tree',
					split : true,
					animate : true,
					lines : true,
					border : false,
					loader : new Ext.ux.tree.PagingTreeLoader({
								dataUrl : url,
								pageSize : biduiMain.pageSize
							}),

					root : new Ext.tree.AsyncTreeNode({
								text : biduiMain.bomType,
								expanded : true,
								allowDrag : false,
								id : biduiMain.rootID
							})
				});

		biduiMain.mpbomtree.on('click', function(node) {
					biduiGrid.init2(node.attributes.nodeId);
				});

		return biduiMain.mpbomtree;
	};

	biduiMain.getebom = function() {
		biduiMain.ebomtree = new Ext.tree.TreePanel({
					id : 'ebom_tree',
					split : true,
					animate : true,
					lines : true,
					border : false,
					autoScroll : true,
					loader : new Ext.ux.tree.PagingTreeLoader({
								dataUrl : '../JSON/XacCommon_CommonRemote.getEbomById',
								pageSize : biduiMain.pageSize
							}),

					root : new Ext.tree.AsyncTreeNode({
								text : 'EBOM',
								draggable : false,
								expanded : true,
								id : biduiMain.rootID
							})
				});

		biduiMain.ebomtree.on('click', function(node) {
					if (biduiMain.T1Container.findById("mpbom-tree")) {
						biduiMain.T1Container.removeAll();
					}
					biduiMain.t1Panel = biduiMain
							.getmpbom(node.attributes.nodeId);
					biduiMain.T1Container.add(biduiMain.t1Panel);
					biduiMain.T1Container.doLayout();

					biduiGrid.init1(node.attributes.nodeId);
				});

		return biduiMain.ebomtree;
	};

	biduiMain.ebomPanel = biduiMain.getebom();

	biduiMain.tbar = new Ext.Toolbar({
				items : [{
							id : 'selpbom',
							text : 'PBOM',
							handler : function() {
								biduiMain.ChangeT1("PBOM");
							}
						}, '-', {
							id : 'selmbom',
							text : 'MBOM',
							handler : function() {
								biduiMain.ChangeT1("MBOM");
							}
						}]
			});

	biduiMain.ChangeT1 = function(flag) {
		if (biduiMain.T1Container.findById("mpbom-tree")) {
			biduiMain.T1Container.removeAll();
		}
		biduiMain.bomType = flag;
		biduiMain.t1Panel = biduiMain.getmpbom(flag);
		biduiMain.T1Container.add(biduiMain.t1Panel);
		biduiMain.T1Container.doLayout();
	};

	biduiMain.ChangeT1(biduiMain.bomType);
	biduiMain.gridPanel = biduiGrid.init(biduiMain.bomType);
	biduiGrid.init1(0);
	biduiGrid.init2(0);

	var viewport = new Ext.Viewport({
		layout : 'border',
		items : [{
			xtype : 'portal',
			region : 'center',
			id : 'bdtab2',
			margins : '5 5 5 5',
			autoScroll : true,
			items : [{
				columnWidth : .3,
				style : 'padding:10px 10px 10px 10px',
				items : [{
					title : "EBOM<span style='padding-left:170px;cursor:pointer' onClick='biduiMain.expendAllE()'>全部展开</span>",
					autoScroll : true,
					items : [biduiMain.ebomPanel]
				}]
			}, {
				columnWidth : .3,
				style : 'padding:10px 10px 10px 10px',
				items : [{
					title : "PBOM/MBOM<span style='padding-left:130px;cursor:pointer' onClick='biduiMain.expendAllMP()'>全部展开</span>",
					autoScroll : true,
					items : [biduiMain.T1Container]
				}]
			}, {
				columnWidth : .4,
				style : 'padding:10px',
				items : [{
							title : 'EBOM节点信息',
							items : [biduiMain.T2Container]
						}, {
							title : 'PBOM/MBOM节点信息',
							items : [biduiMain.T3Container]
						}, {
							title : '比对结果',
							autoScroll : true,
							items : [biduiMain.gridPanel]
						}]
			}],
			tbar : biduiMain.tbar
		}]
	});
};
Ext.onReady(biduiMain.init, biduiMain, true);
