var privilegePanel = {}
privilegePanel.init = function(privilegeConfig,treeConfig){
	privilegePanel.pPanel = new Ext.Panel({
				id : 'privilegePanel_pPanel',
				layout : 'fit',
				region : 'center',
				items : [setDataPrivilege.init(privilegeConfig)]
			});
	privilegePanel.treeRoot = new Ext.tree.AsyncTreeNode({
				id : privilegeConfig.dataId,
				text : treeConfig.text,
				expandable : true,
				icon : treeConfig.icon
			});
	Ext.apply(privilegePanel.treeRoot.attributes, {
				categoryid : treeConfig.categoryid,
				revision : -1
			});
	privilegePanel.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getDataCategoryInstanceTreeWithOutCheckBox',
				baseParams : {
					nodeid : ''
				}
			});
	privilegePanel.treePanel = new Ext.tree.TreePanel({
		id : 'privilegePanel_treePanel',
		region : 'west',
		width : '200',
		border : false,
		rootVisible : true,
		useArrows : false,
		autoScroll : true,
		autoShow : true,
		animate : true,
		enableDD : false,
		frame : false,
		root : privilegePanel.treeRoot,
		loader : privilegePanel.treeloader,
		listeners : {
			'click' : function(node, e) {
				var opertationVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.OperationVo");
				opertationVo.setDataId(node.id);
				opertationVo.setIsPermitted(false);
				opertationVo.setIsRefused(false);
				opertationVo.setFlag(false);
				opertationVo.setCompulsory(false);
				callSeam("privilege_DataPrivilegeRemote",
					"getDataCenterDataManipultations", [opertationVo],function(result){
					var obj = Ext.util.JSON.decode(result);
					if(obj.setprivilege==false){
						var tba = privilegePanel.pPanel.items.get(0);
						if (tba) {
							privilegePanel.pPanel.remove(tba);
						}
						privilegePanel.pPanel.add(new Ext.Panel({
							id : 'noprivilegepanel',
							html : '没有'+getResource('resourceParam582')+''
						}));
						privilegePanel.pPanel.doLayout();
					}else{
						var tba = privilegePanel.pPanel.items.get(0);
						if(tba&&tba.getId()=='noprivilegepanel'){
							privilegePanel.pPanel.remove(tba);
							privilegePanel.pPanel.add(setDataPrivilege.init({
								'dataId' : node.id,
								'dataType' : 'DataObjectDataType'
							}));
							privilegePanel.pPanel.doLayout();
						}
						privilegePanel.pPanel.items.get(0).dataId = node.id;
						privilegePanel.pPanel.items.get(0).dataType = 'DataObjectDataType';
						privilegePanel.pPanel.items.get(0).refresh();
					}
				});
			},
			'afterlayout' : function(panel) {
				panel.fireEvent('click',panel.root);
			},
			'load' : function(node){
					var opertationVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.OperationVo");
					opertationVo.setDataId(node.id);
					opertationVo.setIsPermitted(false);
					opertationVo.setIsRefused(false);
					opertationVo.setFlag(false);
					opertationVo.setCompulsory(false);
					callSeam("privilege_DataPrivilegeRemote",
						"getDataCenterDataManipultations", [opertationVo],function(result){
							var obj = Ext.util.JSON.decode(result);
							if(obj.setprivilege==false){
								node.setText('<font color=gray>'+node.text+'</font>');
							}
						});
			}
		}
	});
	privilegePanel.treePanel.getRootNode().expand(true);
	privilegePanel.mainPanel = new Ext.Panel({
		title : ''+getResource('resourceParam620')+'',
		id : 'privilegePanel_mainPanel',
		layout : 'border',
		items : [privilegePanel.treePanel,privilegePanel.pPanel]
	});
	return privilegePanel.mainPanel;
}
