var collarbleft = {};
// project树
collarbleft.init = function() {

	collarbleft.tag = new Ext.tree.TreePanel({
				id : 'task-tree',
				split : true,
				autoScroll : true,
				animate : true,
				autoScroll : true,
				autoHeight : true,
				split : true,
				border : false,
				margins : '0 5 0 5',
				loader : new Ext.tree.TreeLoader({
							preloadChildren : false,
							baseAtts : new Ext.tree.AsyncTreeNode({
										draggable : false
									}),
							dataUrl : '../JSON/project_ProjectRemote.getTree?a='
									+ new Date().getTime()
						}),
				lines : true,
				enableDD : false,
				draggable : false,
				autoScroll : true
			});

	// add a tree sorter in folder mode
	new Ext.tree.TreeSorter(collarbleft.tag, {
				folderSort : true
			});

	collarbleft.root = new Ext.tree.AsyncTreeNode({
				draggable : false,
				text : ''+getResource('resourceParam724')+'',
				iconCls:'icon-project',		
				id : '0'
			});

	collarbleft.tag.setRootNode(collarbleft.root);
	collarbleft.tag.on('beforeload', function(node) {

			});

	function setViewForm(obj) {
		collarbTabpanel.form.getForm().findField('vname').setValue(obj.vname);
		collarbTabpanel.form.getForm().findField('vtype').setValue(obj.vtype);
		collarbTabpanel.form.getForm().findField('vdepart')
				.setValue(obj.vdepart);
		collarbTabpanel.form.getForm().findField('vuser').setValue(obj.vuser);
		collarbTabpanel.form.getForm().findField('vcreate')
				.setValue(obj.vcreate);
		collarbTabpanel.form.getForm().findField('vstatus')
				.setValue(obj.vstatus);
		collarbTabpanel.form.getForm().findField('vstart').setValue(obj.vstart);
		collarbTabpanel.form.getForm().findField('vend').setValue(obj.vend);
		collarbTabpanel.form.getForm().findField('vrealstart')
				.setValue(obj.vrealstart);
		collarbTabpanel.form.getForm().findField('vrealend')
				.setValue(obj.vrealend);
		collarbTabpanel.form.getForm().findField('vdesc').setValue(obj.vdesc);

	}

	collarbleft.tag.on('click', function(node) {        
				collarbMain.nodeId = node.id;// set content id
				if (node.id.indexOf('p') == -1) {// 为content时
					// 如果可见设置为不可见
					Ext.getCmp('terminate').setDisabled(true);
					// 如果可见设置为不可见
					Ext.getCmp('delete').setDisabled(true);
                    //点击content时，没有选中project
					collarbMain.leafId = null;
					collarbMain.leafName = null;
				}

				if (node.id.indexOf('p') == 0 && node.isLeaf()) {
					// leaf
					if (collarbMain.formflag) {// remove form
						collarbMain.cardframe.remove(collarbCardFrame.form);
						collarbMain.formflag = false;
						// alert("remove");
					}
					collarbMain.leafId = node.id;// 选中的叶子节点
					collarbMain.leafName = node.text;// 选中的叶子节点的name，用于给task数的root
					// node
					collarbMain.nodeId = node.parentNode.id;// 选中的文件夹
					collarbMain.mytab.setVisible(true);
					collarbMain.mytab.setActiveTab(0);// 设置进入tab的第一页，基本信息页
					collarbMain.cardframe.setVisible(false);
					Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.getProjectInfo",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									setViewForm(obj);
									//设置task根节点icon
									if(obj.vstatus == ''+getResource('resourceParam947')+''){
									  collarbMain.projectIconCls='icon-planningProject';
									}else if(obj.vstatus == ''+getResource('resourceParam948')+''){
									  collarbMain.projectIconCls='icon-approvingProject';
									}else if(obj.vstatus == ''+getResource('resourceParam1117')+''){
									  collarbMain.projectIconCls='icon-workingProject';
									}else if(obj.vstatus == ''+getResource('resourceParam1118')+''){
									  collarbMain.projectIconCls='icon-confirmingProject';
									}else if(obj.vstatus == ''+getResource('resourceParam1031')+''){
									  collarbMain.projectIconCls='icon-finishedProject';
									}else if(obj.vstatus == ''+getResource('resourceParam1162')+''){
									  collarbMain.projectIconCls='icon-terminatedProject';
									}	
									if (obj.vstatus == ''+getResource('resourceParam1117')+'') {
										Ext.getCmp('terminate')
												.setDisabled(false);
									} else {
										Ext.getCmp('terminate')
												.setDisabled(true);
									}
									Ext.getCmp('delete').setDisabled(false);
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									node : collarbMain.leafId
								}
							});
				}
				if(0 != node.id){
					taskProcessTab.init(node,"coopProjectPanel");
				}
			});

	return collarbleft.tag;
}
