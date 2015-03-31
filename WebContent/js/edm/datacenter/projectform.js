var projectform = {

};
// 标题 ， panel id , 序号 。。。
projectform.editFormInit = function() {
	var formpanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '61.8%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				}
			});

	for (var i = 0; i < projectform.formjson.length; i++) {

		var id = projectform.formjson[i]['dataEntityID'];
		var type = projectform.formjson[i]['dataEntityType'];
		var name = projectform.formjson[i]['dataEntityName'];
		var value = projectform.formjson[i]['value'];
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
						value : value

					});
			formpanel.add(progress);
			progress.updateProgress(value / 100, ""
							+ getResource('resourceParam1031') + "" + value
							+ '%');
		} else if (type == 'file') {
		} else {
			formpanel.add(mytaskExtend.FormControls('', name, value, fomat,
					precision, type));
		}
		formpanel.doLayout();
	}
	// projectform.formjson
	for (var i = 0; i < projectform.ejson.length; i++) {
		// categoryID
		formpanel.add(new Ext.form.DisplayField({
					value : '<a onclick=projectform.extendForm("'
							+ projectform.ejson[i]['categoryID']
							+ '","'
							+ projectform.ejson[i]['categoryInstanceID']
							+ '")  style="color:#0000FF;text-decoration:underline;">'
							+ getResource('resourceParam1036') + '</a>'
				}));

		formpanel.doLayout();
	}
	return formpanel;
}
projectform.infoFormInit = function(datacenterid, categoryInstanceID) {
	var formpanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '61.8%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				},
				buttons : [new Ext.Button({
							text : '' + getResource('resourceParam944') + '',
							listeners : {
								'click' : function() {
									var newpanel = projectform.editFormInit(
											datacenterid, categoryInstanceID);
									var panel = projectform.tab1.items.get(0);
									if (panel) {
										projectform.tab1.remove(panel);
									}

									projectform.tab1.add(newpanel);
									projectform.tab1.doLayout();
								}
							}
						})]
			});
	Ext.Ajax.request({
		url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
		method : 'POST',
		success : function(response, options) {
			// projectform.formjson =
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
								value : value

							});
					formpanel.add(progress);
					progress.updateProgress(value / 100, ""
									+ getResource('resourceParam1031') + ""
									+ value + '%');
				} else if (type == 'file') {
					var filevalue = '<a   style="color:#0000FF;text-decoration:underline;" href="../JSON/FileDownloadServlet?type=0&path='
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

					formpanel.add(mytaskExtend.FormControls('', name, value,
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
projectform.init = function(title, id, i, datacenterid, revision,
		categoryInstanceID, categoryid, nodeid) {
	// alert(revision);
	// // alert(datacenterid);
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
					anchor : '61.8%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				}
			});
	projectform.tab1 = new Ext.Panel({
		id : 'projectform',
		title : title,
		closable : false,
		closeAction : 'hide',
		autoDestroy : false,
		layout : 'fit',
		listeners : {
			'activate' : function(panel) {
//				cateInstancePanel.activeFlag = 1;
				// if (window.parent.historyViewModel) {
				// // projectform.tab1.getTopToolbar().disable();
				// } else {
				// revision = -1;
				// }
				var formpanel = new Ext.form.FormPanel({
							fileUpload : true,
							bodyStyle : 'padding:5px 5px',

							border : false,
							autoScroll : true,
							defaults : {
								anchor : '61.8%',
								msgTarget : 'side',
								labelAlign : 'right',
								style : 'margin-bottom: 5px;',
								readOnly : true

							}
						});
				Ext.Ajax.request({
					url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
					method : 'POST',
					success : function(response, options) {
						projectform.formjson = Ext.util.JSON
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
								var progress = new Ext.ProgressBar({
											fieldLabel : name,
											value : value

										});
								formpanel.add(progress);
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

								formpanel.add(mytaskExtend.FormControls('',
										name, value, fomat, precision, type));
							}
							formpanel.doLayout();
						}
						Seam.Component
								.getInstance("datacenter_DataCenterRemote")
								.getExtendProp(nodeid, function(result) {
									projectform.ejson = Ext.util.JSON
											.decode(result);
									var obj = Ext.util.JSON.decode(result);
									for (var i = 0; i < obj.length; i++) {
										projectform.datacenterid = obj[i]['categoryID'];
										projectform.categoryInstanceID = obj[i]['categoryInstanceID'];
										formpanel
												.add(new Ext.form.DisplayField(
														{
															value : '<a onclick=projectform.extendForm("'
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

				var panel = projectform.tab1.items.get(0);
				if (panel) {
					projectform.tab1.remove(panel);
				}

				projectform.tab1.add(formpanel);
				projectform.tab1.doLayout();
				projectform.tab1.doLayout();
			},
			'bodyresize' : function() {
				// dataObjectTree.setHeight(tab1.getHeight() - 25);
				// dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		items : [formpanel]

	});

	return projectform.tab1;

}
projectform.extendForm = function(datacenterid, categoryInstanceID) {
	var newpanel = projectform.infoFormInit(datacenterid, categoryInstanceID);
	var panel = projectform.tab1.items.get(0);
	if (panel) {
		projectform.tab1.remove(panel);
	}

	projectform.tab1.add(newpanel);
	projectform.tab1.doLayout();
}
