var dataInstanceUpdate = {

}

dataInstanceUpdate.init = function(ids, names, desc, flag) {
	var instanceid = new Ext.form.TextField({
				name : 'instanceid',
				value : ids,
				inputType : 'hidden'
			});
	// var revision = new Ext.form.TextField({
	// name : '',
	// value : rvision,
	// inputType : 'hidden'
	// });
	var name = new Ext.form.TextField({
				// id : 'name',
				name : 'name',
				fieldLabel : ''+getResource('resourceParam480')+'',
				allowBlank : false,
				value : names,
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : ''+getResource('resourceParam1092')+'!',
				validator : function() {
					var str = Ext.util.Format.trim(name.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 30) {
						name.invalidText = ' '+getResource('resourceParam1378')+'30！';
						name.focus();
						return false;
					} else {
						return true;
					}
				}

			});
	var description = new Ext.form.TextArea({
				// id : 'description',
				name : 'description',
				fieldLabel : ''+getResource('resourceParam648')+'',
				allowBlank : true,
				value : desc,
				validator : function() {
					var str = Ext.util.Format.trim(description.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 200) {
						description.invalidText = ' '+getResource('resourceParam648')+''+getResource('resourceParam1386')+'200！';
						description.focus();
						return false;
					} else {
						return true;
					}
				}
			});

	var updateform = new Ext.FormPanel({
		style : 'padding :5px 5px 5px 5px',
		defaults : {
			anchor : '95%'
		},

		items : [instanceid, name, description],
		buttons : [{
			text : '' + getResource('resourceParam7002') + '',//保存
			listeners : {
				'click' : function() {
					if (updateform.getForm().isValid()) {
						// var vo =
						// Seam.Remoting.createType("com.sysware.edm.datacategory.CategoryInstance");
						var vo = Seam.Component.newInstance("CategoryInstance");
						vo.setCategoryInstanceID(instanceid.getValue());
						vo.setCategoryInstanceName(name.getValue());
						vo.setDescription(description.getValue());
						callSeam("datacenter_DataCenterRemote",
								"updateCategoryInstance", [vo],
								function(result) {
									var obj = Ext.util.JSON.decode(result);
									if (obj.success == true) {
										// window.parent.removenode(idSequence);
										win.close();
									} else {
										Ext.MessageBox.show({
											title : ''+getResource('resourceParam1724')+'',
											msg : ''+getResource('resourceParam651')+'',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})

									}
									if (1 == flag) {
										myGrid.loadvalue(
												dataCateList.grid.store,
												dataCateList.args,
												dataCateList.baseargs);

									} else if (2 == flag) {
										// name.getValue()
										// description
										// .getValue()
										cateInstanceTree.updatenode(
												vo.getCategoryInstanceID(),
												vo.getCategoryInstanceName(),
												vo.getDescription());
									}
									var nodeid = window.parent.getCheckNode().id;
									window.parent.reload(function() {
										cateInstanceTree.attributeTree
												.getRootNode().reload(
														function() {
															var nodetext = window.parent
																	.getNodeById(nodeid).text;
															cateInstanceTree.attributeTree
																	.getRootNode()
																	.setText(nodetext);
															cateInstanceTree.attributeTree
																	.getRootNode()
																	.expand(true);
															window.parent.document
																	.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
														});
									});
								});

					}

				}
			}
		}, {
			text : ''+getResource('resourceParam606')+'',
			listeners : {
				'click' : function() {
					updateform.getForm().reset();
				}
			}
		}]
	});
	var win = new Ext.Window({
				title : ''+getResource('resourceParam490')+'',
				layout : 'fit',
				width : 400,
				height : 185,
				items : [updateform]
			});
	win.show();
}
