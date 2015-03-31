var formEditTab = {

};
// 标题 ， panel id , 序号 。。。
function editFormInit() {

	var formpanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true,
					width : 300

				}
			});

	for (var i = 0; i < formEditTab.formjson.length; i++) {

		var id = formEditTab.formjson[i]['dataEntityID'];
		var type = formEditTab.formjson[i]['dataEntityType'];
		var name = formEditTab.formjson[i]['dataEntityName'];
		var value = formEditTab.formjson[i]['value'];
		var fomat = "";
		var precision = 0;

		if (type == "double") {
			precision = 10;
		} else if (type == "date") {
			fomat = "Y-m-d";
		}
		if (type == 'process') {
			var progress = new Ext.ProgressBar({
						fieldLabel : name,
						value : value,
						width : 300

					});
			formpanel.add(progress);
			progress.updateProgress(value / 100, ""
							+ getResource('resourceParam1031') + "" + value
							+ '%');
		} else if (type == 'file') {
		} else {
			formpanel.add(formExtend.FormControls('', name, value, fomat,
					precision, type));
		}
		formpanel.doLayout();
	}
	// formEditTab.formjson
	for (var i = 0; i < formEditTab.ejson.length; i++) {
		// categoryID
		formpanel.add(new Ext.form.DisplayField({
					value : '<a onclick=extendForm("'
							+ formEditTab.ejson[i]['categoryID']
							+ '","'
							+ formEditTab.ejson[i]['categoryInstanceID']
							+ '")  style="color:#0000FF;text-decoration:underline;">'
							+ getResource('resourceParam1036') + '</a>'
				}));

		formpanel.doLayout();
	}
	return formpanel;

}
function infoFormInit(datacenterid, categoryInstanceID) {
	var formpanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					width : 300,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				},
				buttons : [new Ext.Button({
							text : '' + getResource('resourceParam944') + '',
							listeners : {
								'click' : function() {
									var newpanel = editFormInit(datacenterid,
											categoryInstanceID);
									var panel = formEditTab.tab1.items.get(0);
									if (panel) {
										formEditTab.tab1.remove(panel);
									}

									formEditTab.tab1.add(newpanel);
									formEditTab.tab1.doLayout();
								}
							}
						})]
			});
	Ext.Ajax.request({
		url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
		method : 'POST',
		success : function(response, options) {
			// formEditTab.formjson =
			// Ext.util.JSON.decode(response.responseText);
			var formjson = Ext.util.JSON.decode(response.responseText);
			for (var i = 0; i < formjson.length; i++) {

				var id = formjson[i]['dataEntityID'];
				var type = formjson[i]['dataEntityType'];
				var name = formjson[i]['dataEntityName'];
				var value = formjson[i]['value'];
				var fileid = formjson[i]['fileid'];
				var fomat = "";
				var precision = 0;
				if (type == "double") {
					precision = 10;
				} else if (type == "date") {
					fomat = "Y-m-d";
				}
				if (type == 'process') {
					var progress = new Ext.ProgressBar({
								fieldLabel : name,
								value : value,
								width : 300

							});
					formpanel.add(progress);
					progress.updateProgress(value / 100, ""
									+ getResource('resourceParam1031') + ""
									+ value + '%');
				} else if (type == 'file') {
					var filevalue = '<a   style="color:#0000FF;text-decoration:underline;" href="../FILEDOWN/?ID='+fileid+'&ORIGINALNAME='
							// + encodeURI(encodeURI(value))
							+ value
							+ '">'
							+ value.substr(value.lastIndexOf("\\") + 1,
									value.length) + '</a>';
					formpanel.add(new Ext.form.DisplayField({
								fieldLabel : name,
								value : value.length > 0 ? filevalue : '没有'
										+ getResource('resourceParam469') + ''
							}));
				} else {

					formpanel.add(formExtend.FormControls('', name, value,
							fomat, precision, type));
				}
				formpanel.doLayout();
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			dataCenterID : datacenterid,
			dataEntityID : categoryInstanceID
		}
	});
	return formpanel;
}
// 初始化
formEditTab.init = function(title, id, i, datacenterid, revision,
		categoryInstanceID, categoryid, nodeid) {
	// alert(revision);
	// // alert(datacenterid);
	// alert(categoryInstanceID + ":" + categoryid + ":" + nodeid);
	var temp = {
		editFlag : 1
	};

	temp.id = id;
	temp.datacenterid = categoryid;
	temp.categoryInstanceID = categoryInstanceID;
	var disableEdit = function() {
		return false;
	};
	var formpanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					width : 300,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				}
			});
	formEditTab.tab1 = new Ext.Panel({
		id : 'formEditTab',
		title : title,
		closable : false,
		closeAction : 'hide',
		autoDestroy : false,
		layout : 'fit',
		listeners : {
			'activate' : function(panel) {
				cateInstancePanel.activeFlag = 1;
				if (window.parent.historyViewModel) {
					// formEditTab.tab1.getTopToolbar().disable();
				} else {
					revision = -1;
				}
				var formpanel = new Ext.form.FormPanel({
							fileUpload : true,
							bodyStyle : 'padding:5px 5px',

							border : false,
							autoScroll : true,
							defaults : {
								width : 300,
								msgTarget : 'side',
								labelAlign : 'right',
								style : 'margin-bottom: 5px;',
								readOnly : true

							}
						});
				var progress,progressIndex;
				Ext.Ajax.request({
					url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
					method : 'POST',
					success : function(response, options) {
						formEditTab.formjson = Ext.util.JSON
								.decode(response.responseText);
						var formjson = Ext.util.JSON
								.decode(response.responseText);
						for (var i = 0; i < formjson.length; i++) {

							var id = formjson[i]['dataEntityID'];
							var type = formjson[i]['dataEntityType'];
							var name = formjson[i]['dataEntityName'];
							var value = formjson[i]['value'];
							var fileid = formjson[i]['fileid'];
							var fomat = "";
							var precision = 0;
							if (type == "double") {
								precision = 10;
							} else if (type == "date") {
								fomat = "Y-m-d";
							}
							if (type == 'process') {
								progressIndex = i;
								progress = new Ext.ProgressBar({
											fieldLabel : name,
											value : value,
											width : 300

										});
								progress.updateProgress(value / 100,
										"" + getResource('resourceParam1031')
												+ "" + value + '%');
							} else if (type == 'file') {

								formpanel.add(new Ext.form.DisplayField({
									fieldLabel : name,
									value : '<a   style="color:#0000FF;text-decoration:underline;" href="../JSON/FileDownloadServlet?type=0&path='
											// + encodeURI(encodeURI(value))
											+ value
											+ '">'
											+ value.substr(value
															.lastIndexOf("\\")
															+ 1, value.length)
											+ '</a>'
								}));
							} else {

								formpanel.add(formExtend.FormControls('', name,
										value, fomat, precision, type));
							}
							formpanel.doLayout();
						}
						Seam.Component
								.getInstance("datacenter_DataCenterRemote")
								.getExtendProp(nodeid, function(result) {
									formEditTab.ejson = Ext.util.JSON
											.decode(result);
									var obj = Ext.util.JSON.decode(result);
									for (var i = 0; i < obj.length; i++) {
										formEditTab.datacenterid = obj[i]['categoryID'];
										formEditTab.categoryInstanceID = obj[i]['categoryInstanceID'];
										formpanel
												.add(new Ext.form.DisplayField(
														{
															value : '<a onclick=extendForm("'
																	+ obj[i]['categoryID']
																	+ '","'
																	+ obj[i]['categoryInstanceID']
																	+ '")  style="color:#0000FF;text-decoration:underline;cursor:pointer">'
																	+ getResource('resourceParam1036')
																	+ '</a>'
														}));
										formpanel.doLayout();
									}
								});
						formpanel.insert(progressIndex,progress);
						formpanel.doLayout();
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataCenterID : temp.datacenterid,
						dataEntityID : temp.categoryInstanceID,
						revision : revision
					}
				});

				var panel = formEditTab.tab1.items.get(0);
				if (panel) {
					formEditTab.tab1.remove(panel);
				}

				formEditTab.tab1.add(formpanel);
				formEditTab.tab1.doLayout();
				formEditTab.tab1.doLayout();
			},
			'bodyresize' : function() {
				// dataObjectTree.setHeight(tab1.getHeight() - 25);
				// dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		items : [formpanel]

	});

	return formEditTab.tab1;

}
function extendForm(datacenterid, categoryInstanceID) {
	var newpanel = infoFormInit(datacenterid, categoryInstanceID);
	var panel = formEditTab.tab1.items.get(0);
	if (panel) {
		formEditTab.tab1.remove(panel);
	}

	formEditTab.tab1.add(newpanel);
	formEditTab.tab1.doLayout();
}
