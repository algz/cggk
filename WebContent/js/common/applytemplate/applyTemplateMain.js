

var applyTemplateMain = {
	targetId : null,
	templateId : null,
	args : {
		start : 0,
		limit : 25
	},
	status : 2
};

applyTemplateMain.toTreeView = function toTreeView(id, name) {
	Ext.getCmp('aTR').setVisible(true);
	if (applyTemplateMain.templatePanel) {
		applyTemplateMain.mainPanel.remove(applyTemplateMain.templatePanel);
	}

	applyTemplateMain.templatePanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;',
				items : [templateDatail.init({
							rootName : name,
							rootId : id
						})]
			});
	applyTemplateMain.mainPanel.insert(1, applyTemplateMain.templatePanel);
	templateTree.node = templateTree.rootNode;
	templateTabPanel.tabPanel.setActiveTab(0);
	templateTree.treePanel.on('click', function(node, eventObject) {
				templateTree.node = node;
				templateTree.nodeId = node.attributes.id;
				if(templateTree.nodeId==0){
					templateTabPanel.dataPanel.disable();
				}else{
					templateTabPanel.dataPanel.enable();
				}
				templateTree.nodeName = node.attributes.text;
				var activedPanel = templateTabPanel.tabPanel.getActiveTab();
				activedPanel.fireEvent('activate');
			})
	applyTemplateMain.mainPanel.getLayout().setActiveItem(1);

}



applyTemplateMain.init = function(callback) {
//	applyTemplateMain.applyMask = new Ext.LoadMask(document.body, {
//				msg : '正在应用' + getResource('resourceParam943') + '模板，请稍候。。。'
//			});
	var config = {
		method : 'applyTemplateMain.toTreeView',
		hideNameLink : true
	}
	wbsPanel.privilege=true;
	wbsPanel.status=applyTemplateMain.status;
	applyTemplateMain.gridPanel = wbsPanel.init(config);
	wbsPanel.sm.on('selectionchange', function(sm) {
		var count=sm.getCount();
		if(count==1){
		var r = sm.getSelected();
		wbsPanel.dataType = r.get('dataType');
					if (wbsPanel.dataType == 'WBSContent') {
						Ext.getCmp('applyTemplate').disable();
					} else {
						applyTemplateMain.templateId = r.data.id;
						Ext.getCmp('applyTemplate').enable();
					}
		}else{
		Ext.getCmp('applyTemplate').disable();
		}
			});
	var tb = new Ext.Toolbar({
		items : [{
			text : '应用' + getResource('resourceParam943') + '模板',
			id : 'applyTemplate',
			disabled : true,
			handler : function() {
			var applyMask = new Ext.LoadMask(document.body, {
				msg : '正在应用' + getResource('resourceParam943') + '模板，请稍候。。。'
			});
				applyMask.show();
				Ext.Ajax.request({
					url : "../JSON/wbstemplate_TemplateRemote.applyTemplate",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						applyMask.hide();
						if (obj.success == true) {
							if(obj.confirm){
								Ext.Msg.confirm('提示', obj.msg,
										function(btn) {
											if (btn == 'yes') {
												applyMask.show();
												Ext.Ajax.request({
													url : "../JSON/wbstemplate_TemplateRemote.applyTemplate",
													method : 'POST',
													success : function(response, options) {
														var obj = Ext.util.JSON.decode(response.responseText);
														applyMask.hide();
														if (obj.success == true) {
															Ext.example
																								.msg(
																										'' + getResource('resourceParam575') + '',
																										'应用' + getResource('resourceParam943') + '模板成功');
																						if (callback) {
																							callback(true);
																						}
														} else {
															Ext.MessageBox.show({
																		title : ''
																				+ getResource('resourceParam575')
																				+ '',
																		msg : obj.msg,
																		buttons : Ext.MessageBox.OK,
																		icon : Ext.MessageBox.INFO
																	});
														}
													},
													params : {
														templateId : applyTemplateMain.templateId,
														targetId : applyTemplateMain.targetId,
														confirm:'true',
														ids : null//用于以后应用勾选模板中的任务
													}
												});
											}else{
												applyMask.hide();
											}
										}).getDialog().setWidth(450);
							}else{
							Ext.example
																.msg(
																		'' + getResource('resourceParam575') + '',
																		'应用' + getResource('resourceParam943') + '模板成功');
														if (callback) {
															callback(true);
														}
							}
						} else {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : obj.msg,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO
									});
						}
					},
					params : {
						templateId : applyTemplateMain.templateId,
						targetId : applyTemplateMain.targetId,
						confirm:'false',
						ids : null//用于以后应用勾选模板中的任务
					}
				});

			}
		}, '-', {
			text : '' + getResource('resourceParam944') + '',
			id : 'aTR',// applyTemplateReturn
			hidden : true,
			handler : function() {
				Ext.getCmp('aTR').setVisible(false);
		        wbsPanel.clear();
		        applyTemplateMain.mainPanel.getLayout().setActiveItem(0);
		        wbsPanel.refresh();
			}
		}]
	});
	applyTemplateMain.templatePanel = new Ext.Panel({
				layout : 'fit',
				border : false,
				frame : false,
				autoScroll : true,
				bodyStyle : 'overflow:auto;'
			});
	applyTemplateMain.mainPanel = new Ext.Panel({
				layout : 'card',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				activeItem : 0,
				margins : '0 5 5 0',
				tbar : tb,
				items : [applyTemplateMain.gridPanel,applyTemplateMain.templatePanel]

			});

	applyTemplateMain.load = function() {
		Ext.getCmp('aTR').setVisible(false);
		wbsPanel.clear();
//		applyTemplateMain.mainPanel.getLayout().setActiveItem(0);
		wbsPanel.refresh();
	}
	return applyTemplateMain.mainPanel;
}
