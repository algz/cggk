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
					anchor : '90%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : false

				}
			});
	for (var i = 0; i < formEditTab.formjson.length; i++) {

		var id = formEditTab.formjson[i]['dataEntityID'];
		var type = formEditTab.formjson[i]['dataEntityType'];
		var name = formEditTab.formjson[i]['dataEntityName'];
		var value = formEditTab.formjson[i]['value'];
		var aBlank = formEditTab.formjson[i]['show'];

		var fomat = "";
		var precision = 0;
		if (type == "double") {
			precision = 10;
		} else if (type == "date") {
			fomat = "Y-m-d";
		}
		var allowBlank = true;
		if ("true" == aBlank) {
			allowBlank = false;
		}
		formpanel.add(mytaskExtend.FormControls(id, name, value, fomat,
				precision, type, allowBlank));
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
					anchor : '90%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					//bug:718
					//gaoyn 2011-5-23
					//readyonly 属性变为disabled
					disabled : true

				}
			});
	Ext.Ajax.request({
		url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
		method : 'POST',
		success : function(response, options) {
			formEditTab.formjson = Ext.util.JSON.decode(response.responseText);
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
				if (type == 'file') {

					var filevalue = '<a   style="color:#0000FF;text-decoration:underline;" href="../FILEDOWN/?ID='
							+ fileid
							+ '&&ORIGINALNAME='
							+ encodeURI(encodeURI(value))
							+ '">'
							+ value
							+ '</a>';
					formpanel.add(new Ext.form.DisplayField({
								fieldLabel : name,
								value : value.length > 0 ? filevalue : '没有'
										+ getResource('resourceParam469') + ''
							}));
				} else {

					formpanel.add(mytaskExtend.FormControls(id, name, value,
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
		categoryInstanceID, categoryid, datacenterflag) {
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
					anchor : '90%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					disabled : true

				}
			});

	var submit = new Ext.Button({
		text : '' + getResource('resourceParam490') + '',
		iconCls : 'save1',
		handler : function() {
			/**
			 * bug编号633 wangyf
			 * bug信息：还存在加外一个问题，当当前用户只存在数据中心对应数据的查看权限时，不应再对 对外中的
			 *			表单数据进行编辑操作。
			 * 2011-05-23
			 */
			var nodeid = window.parent.getCheckNode().id;
			var opertationVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.OperationVo");
			opertationVo.setDataId(nodeid);
			opertationVo.setIsPermitted(false);
			opertationVo.setIsRefused(false);
			opertationVo.setFlag(false);
			opertationVo.setCompulsory(false);
			callSeam("privilege_DataPrivilegeRemote", "getDataCenterDataManipultations", [opertationVo], 
					function(result) {
						var obj = Ext.util.JSON.decode(result);
						if (obj.modifyobject == false) {
							Ext.Msg.show({
								title : '提醒',
								msg : '没有编辑的权限！',
								buttons : Ext.Msg.OK,
								width : 250,
								icon : Ext.MessageBox.WARNING
							});
							return ;
						} else {
							if (temp.editFlag == 1) {
								var panel = tab1.items.get(0);
								if (panel) {
									tab1.removeAll(true);
								}
								var newForm = editFormInit();
								tab1.add(newForm);
								tab1.doLayout();
								submit.setText("保存");
								temp.editFlag = 2;
							} else if (temp.editFlag == 2) {
								var addlist = new Array();
								var DataEntitys = Seam.Remoting
										.createType("com.sysware.edm.dataentity.DataEntity");
								for (var i = 0; i < formEditTab.formjson.length; i++) {
									var de = Seam.Remoting
											.createType("com.sysware.edm.dataentity.DataEntity");
									var id = formEditTab.formjson[i]['dataEntityID'];
									var type = formEditTab.formjson[i]['dataEntityType'];
									var name = formEditTab.formjson[i]['dataEntityName'];
									if (type == 'date') {
				
										de.setValue(Ext.util.Format.date(
												tab1.items.get(0).items.get(i).getValue(),
												'Y-m-d'));
				
									} else {
										de.setValue(tab1.items.get(0).items.get(i).getValue());
									}
									de.setCustomTypeItemID(id);
									de.setDataEntityName(name);
									de.setDataEntityType(type);
									de.setDataCenterID(datacenterid);
									de.setDcategoryinstanceid(categoryInstanceID);
									de.setParentDataEntityID("0");
									addlist.push(de);
								}
								DataEntitys.setDelist(addlist);
				
								tab1.items.get(0).getForm().submit({
									url : "../FILEUP/",
									method : 'POST',
									failure : function(form, action) {
				
										var obj = Ext.util.JSON
												.decode(action.response.responseText);
										var filepath = action.response.responseText;
										DataEntitys.setTreePath(filepath);
										DataEntitys.setCustomTypeItemID(categoryid);
										DataEntitys.setDcategoryinstanceid(categoryInstanceID);
										Seam.Component
												.getInstance("datacenter_DataCenterRemote")
												.editFormData(DataEntitys, function(result) {
				
													var panel = tab1.items.get(0);
													if (panel) {
														tab1.removeAll(true);
													}
													var newForm = infoFormInit(
															temp.datacenterid,
															temp.categoryInstanceID);
													tab1.add(newForm);
													tab1.doLayout();
													submit.setText(""
															+ getResource('resourceParam490')
															+ "");
													temp.editFlag = 1;
													Ext.example
															.msg(
																	""
																			+ getResource('resourceParam575')
																			+ "",
																	""
																			+ getResource('resourceParam1072')
																			+ "");
													// store.load();
													var nodeid = window.parent.getCheckNode().id;
													if (cateInstanceTree.checkinstancenode != null
															&& cateInstanceTree.root.id == cateInstanceTree.checkinstancenode.id) {
														cateInstanceTree.root.attributes.revision = result;
													}
													window.parent.reload(function() {
														cateInstanceTree.root.reload(
																function() {
																	var nodetext = window.parent
																			.getNodeById(nodeid).text;
																	cateInstanceTree.root
																			.setText(nodetext);
																	cateInstanceTree.root
																			.expand(true);
																	window.parent.document
																			.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
																	// button.enable();
																});
													});
				
												});
				
										// Ext.Ajax.request({
										// url :
										// "../JSON/datacenter_DataCenterRemote.editFormData",
										// method : 'POST',
										// success : function(response, options) {
										// },
										// disableCaching : true,
										// autoAbort : true,
										// params : {
										// dataEntityType : formdata,// 数据
										// dataEntityName : filepath,// 文件，格式:[{fileId:123,
										// // fileName:abc,
										// // ...}, {}, ...]
										// dcategoryinstanceid : categoryInstanceID,//
										// dataCenterID : datacenterid, // 数据中心id
										// customTypeItemID : categoryid
										// // 表单物理类型id
										// }
										// });
				
									},
									success : function(form, action) {
										var obj = Ext.util.JSON
												.decode(action.response.responseText);
										var filepath = action.response.responseText;
										DataEntitys.setTreePath("[" + filepath + "]");
										DataEntitys.setCustomTypeItemID(categoryid);
										DataEntitys.setDcategoryinstanceid(categoryInstanceID);
										Seam.Component
												.getInstance("datacenter_DataCenterRemote")
												.editFormData(DataEntitys, function(result) {
				
													var panel = tab1.items.get(0);
													if (panel) {
														tab1.removeAll(true);
													}
													var newForm = infoFormInit(
															temp.datacenterid,
															temp.categoryInstanceID);
													tab1.add(newForm);
													tab1.doLayout();
													submit.setText(""
															+ getResource('resourceParam490')
															+ "");
													temp.editFlag = 1;
													Ext.example
															.msg(
																	""
																			+ getResource('resourceParam575')
																			+ "",
																	""
																			+ getResource('resourceParam1072')
																			+ "");
													// store.load();
													var nodeid = window.parent.getCheckNode().id;
													if (cateInstanceTree.checkinstancenode != null
															&& cateInstanceTree.root.id == cateInstanceTree.checkinstancenode.id) {
														cateInstanceTree.root.attributes.revision = result;
													}
													window.parent.reload(function() {
														cateInstanceTree.root.reload(
																function() {
																	var nodetext = window.parent
																			.getNodeById(nodeid).text;
																	cateInstanceTree.root
																			.setText(nodetext);
																	cateInstanceTree.root
																			.expand(true);
																	window.parent.document
																			.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
																	// button.enable();
																});
													});
				
												});
				
										// Ext.Ajax.request({
										// url :
										// "../JSON/datacenter_DataCenterRemote.editFormData",
										// method : 'POST',
										// success : function(response, options) {
										// },
										// disableCaching : true,
										// autoAbort : true,
										// params : {
										// dataEntityType : formdata,// 数据
										// dataEntityName : filepath,// 文件，格式:[{fileId:123,
										// // fileName:abc,
										// // ...}, {}, ...]
										// dcategoryinstanceid : categoryInstanceID,//
										// dataCenterID : datacenterid, // 数据中心id
										// customTypeItemID : categoryid
										// // 表单物理类型id
										// }
										// });
				
									}
				
								})
				
								}
							}
					});
		

			// alert(formdata);
			// return;

		}
	});
	var tab1 = new Ext.Panel({
		id : id,
		title : '<span ext:qtip="' + title + '">' + title + '</span>',
		closable : true,
		closeAction : 'hide',
		autoDestroy : false,
		layout : 'fit',
		tbar : [submit],
		listeners : {
			'activate' : function(panel) {
				/*
				 * 修复bug314，2011-04-25
				 * 从formtab，点击编辑以后切换到另一个tab，再切回formtab时，无法继续编辑，并且Button仍显示为保存。
				 * 因为编辑页面时动态加入的。 临时修改为：当切回后，button显示为’编辑‘，点击编辑后，仍执行编辑处理
				 * 
				 */
				submit.setText("编辑");
				temp.editFlag = 1;
				if (window.parent.historyViewModel) {
					tab1.getTopToolbar().disable();
				} else {
					revision = -1;
				}
				var formpanel = new Ext.form.FormPanel({
							fileUpload : true,
							bodyStyle : 'padding:5px 5px',

							border : false,
							autoScroll : true,
							defaults : {
								anchor : '90%',
								msgTarget : 'side',
								labelAlign : 'right',
								style : 'margin-bottom: 5px;',
								disabled : true

							}
						});
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
							var aBlank = formjson[i]['show'];
							var fileid = formjson[i]['fileid'];

							var fomat = "";
							var precision = 0;
							if (type == "double") {
								precision = 10;
							} else if (type == "date") {
								fomat = "Y-m-d";
							}
							if (type == 'file') {
								var filevalue = '<a   style="color:#0000FF;text-decoration:underline;" href="../FILEDOWN/?ID='
										+ fileid
										+ '&&ORIGINALNAME='
										+ encodeURI(encodeURI(value))
										+ '">'
										+ value + '</a>';
								// var filevalue = '<a
								// style="color:#0000FF;text-decoration:underline;"
								// href="../dataObjectFileDownload?fileId='
								// + fileid
								// + '&fileName='
								// + encodeURI(encodeURI(value))
								// + '">'
								// + value + '</a>';
								formpanel.add(new Ext.form.DisplayField({
											fieldLabel : name,
											value : value.length > 0
													? filevalue
													: '没有'
															+ getResource('resourceParam469')
															+ ''
										}));
							} else {

								formpanel.add(mytaskExtend.FormControls(id,
										name, value, fomat, precision, type));
							}
							formpanel.doLayout();
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataCenterID : temp.datacenterid,

						dataEntityID : temp.categoryInstanceID,

						// 用datacenterflag来标 记是数据中心还是任务历 数据中心没有版本
						revision : (datacenterflag == undefined || datacenterflag == null)
								? revision
								: -1
					}
				});
				var panel = tab1.items.get(0);
				if (panel) {
					tab1.removeAll(true);
				}

				tab1.add(formpanel);
				tab1.doLayout();
			},
			'bodyresize' : function() {
				// dataObjectTree.setHeight(tab1.getHeight() - 25);
				// dataObjectTree.setWidth(tab1.getWidth());
			}

		},
		items : [formpanel]

	});

	return tab1;

}

// var formEditTab = {};
// // 标题 ， panel id , 序号 。。。
// formEditTab.init = function(title, id, i, datacenterid, revision,
// categoryInstanceID, categoryid) {
// // alert(datacenterid);
// var temp = {
//
// };
// temp.id = id;
// temp.datacenterid = categoryid;
// temp.categoryInstanceID = categoryInstanceID;
// var disableEdit = function() {
// return false;
// };
// var formpanel = new Ext.form.FormPanel({
// fileUpload : true,
// bodyStyle : 'padding:5px 5px',
//
// border : false,
// autoScroll : true,
// defaults : {
// anchor : '90%',
// msgTarget : 'side',
// labelAlign : 'right',
// style : 'margin-bottom: 5px;',
// readOnly : false
//
// }
// });
// Ext.Ajax.request({
// url : '../JSON/datacenter_DataCenterRemote.getChildDataModel',
// method : 'POST',
// success : function(response, options) {
// temp.formjson = Ext.util.JSON.decode(response.responseText);
// var formjson = Ext.util.JSON.decode(response.responseText);
// for (var i = 0; i < formjson.length; i++) {
//
// var id = formjson[i]['dataEntityID'];
// var type = formjson[i]['dataEntityType'];
// var name = formjson[i]['dataEntityName'];
// var value = formjson[i]['value'];
// var fomat = "";
// var precision = 0;
// if (type == "double") {
// precision = 10;
// } else if (type == "date") {
// fomat = "Y-m-d";
// }
//
// formpanel.add(mytaskExtend.FormControls(id, name,
// value, fomat, precision, type));
// formpanel.doLayout();
// }
// },
// disableCaching : true,
// autoAbort : true,
// params : {
// dataCenterID : temp.datacenterid,
// dataEntityID : temp.categoryInstanceID
// }
// });
//
// var submit = new Ext.Button({
// text : '保存',
// iconCls : 'save1',
// handler : function() {
// var formdata = "";
// for (var i = 0; i < temp.formjson.length; i++) {
//
// var id = temp.formjson[i]['dataEntityID'];
// var type = temp.formjson[i]['dataEntityType'];
// var name = temp.formjson[i]['dataEntityName'];
// // alert(name + formpanel.items.get(i).getValue());
// var tempstr = "id:" + id + ",type:" + type + ",name:" + name
// + ",value:" + formpanel.items.get(i).getValue() + "-";
// formdata += tempstr;
// }
// // alert(formdata);
// // return;
// formpanel.getForm().submit({
//
// url : "../JSON/formObjectFileUpload",
// method : 'POST',
// failure : function() {
// Ext.MessageBox.show({
// title : '提示',
// msg : "上传文件出错！",
// buttons : Ext.MessageBox.OK,
// icon : Ext.MessageBox.ERROR
// });
// },
// success : function(form, action) {
// var obj = Ext.util.JSON
// .decode(action.response.responseText);
// var filepath = action.response.responseText;
//
// Ext.Ajax.request({
// url : "../JSON/datacenter_DataCenterRemote.editFormData",
// method : 'POST',
// success : function(response, options) {
// },
// disableCaching : true,
// autoAbort : true,
// params : {
// dataEntityType : formdata,// 数据
// dataEntityName : filepath,// 文件
// dcategoryinstanceid : categoryInstanceID,//
// dataCenterID : datacenterid, // 数据中心id
// customTypeItemID : categoryid
// // 表单物理类型id
// }
// });
//
// }
//
// })
// }
// });
// var tab1 = new Ext.Panel({
// id : id,
// title : title,
// closable : true,
// closeAction : 'hide',
// autoDestroy : false,
// layout : 'fit',
// tbar : [submit],
// listeners : {
// 'activate' : function(panel) {
// var opertationVo = Seam.Remoting
// .createType("com.luck.itumserv.base.privilege.OperationVo");
// opertationVo.setDataId(id);
// opertationVo.setIsPermitted(false);
// opertationVo.setIsRefused(false);
// opertationVo.setFlag(false);
// opertationVo.setCompulsory(false);
// callSeam("privilege_DataPrivilegeRemote",
// "getDataCenterDataManipultations", [opertationVo],
// function(result) {
// var obj = Ext.util.JSON.decode(result);
// if (obj.view == false) {
// formpanel.setVisible(false);
// if (!panel.items.get(1)) {
// panel.add(new Ext.Panel({
// html : '没有权限'
// }));
// panel.doLayout();
// return;
// }
// } else {
// formpanel.setVisible(true);
// }
// });
// // dataObjectTree.getStore().on('beforeload',
// // function(store, options) {
// // this.proxy = new Ext.data.HttpProxy({
// // method : 'POST',
// // url :
// // '../JSON/dataEntity_DataEntityRemote.getDataEntities'
// // })
// // options.params = Ext.apply(options.params, {
// // dataCenterID : temp.datacenterid,
// // parentDataEntityID : temp.id,
// // fixedRevision : revision
// // });
// // });
// // dataObjectTree.getStore().load();
// // dataObjectTree.setHeight(tab1.getHeight() - 50);
// // dataObjectTree.setWidth(tab1.getWidth());
// // tab1.doLayout();
// },
// 'bodyresize' : function() {
// // dataObjectTree.setHeight(tab1.getHeight() - 25);
// // dataObjectTree.setWidth(tab1.getWidth());
// }
//
// },
// items : [formpanel]
//
// });
//
// return tab1;
//
// }
