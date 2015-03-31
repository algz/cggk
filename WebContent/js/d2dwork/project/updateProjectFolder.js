var updateProjectFolder = {

};
updateProjectFolder.init = function(callback) {
	updateProjectFolder.contentsname = new Ext.form.TextField({
				id : 'contentsname2',
				name : 'contentsname',
				fieldLabel : '' + getResource('resourceParam1561')
						+ '(<span style="color:red;" >＊</span>)',
				style : 'margin-bottom: 5px;',
				allowBlank : false,
				blankText : '' + getResource('resourceParam1560') + '',
				maxLength : 100,
				maxLengthText : '不能超过100个字符！',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002') + '',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : '' + getResource('resourceParam679') + '',
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
				 */
				enableKeyEvents : true,
				listeners : {'blur' : function(cur, evt) {
						var curStr = cur.getValue();
						for(var i = 0; i < curStr.length; i++) {
							var str = curStr.charCodeAt(i);
							if(str == 12288) {
								if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
									curStr = curStr.replace('　', ' ');
								}
							} 
						}
						Ext.getCmp('contentsname2').setValue(curStr);
					}
				}
			});
	updateProjectFolder.securityDegree = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/groups_GroupsRemote.getSecurityDegree'
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'id'
									}, {
										name : 'name'
									}])
				}),
		fieldLabel : getResource('resourceParam1973'),
		hiddenName : 'securityDegree',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : getResource('resourceParam5044'),
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				updateProjectFolder.securityDegree1 = record.get('id');
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});
	updateProjectFolder.contentsnotes = new Ext.form.TextArea({
				id : 'contentsnotes2',
				name : 'contentsnotes',
				fieldLabel : '' + getResource('resourceParam1256') + '',
				height : 150,
				style : 'margin-bottom: 5px;',
				maxLength : 250,
				grow : true,
				growMin : 150,
				preventScrollbars : true,
				minLengthText : getResource('resourceParam5047')
			});

	updateProjectFolder.updateFolderForm = new Ext.form.FormPanel({
		id : 'addFolderForm2',
		bodyStyle : 'padding:10px 0px 10px 10px',
		title : '' + getResource('resourceParam1570') + '',
		frame : false,
		boder : false,
		defaults : {
			anchor : '62%'
		},
		items : [updateProjectFolder.contentsname,
				updateProjectFolder.securityDegree,
				updateProjectFolder.contentsnotes],
		buttons : [{
			text : getResource('resourceParam5019'),
			handler : function() {
				if (updateProjectFolder.contentsnotes.getValue().length > 999) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1256')
										+ "" + getResource('resourceParam866')
										+ "0",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					return;
				}
				if (updateProjectFolder.updateFolderForm.getForm().isValid()) {
					var currentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					currentNode.setText(updateProjectFolder.contentsname
							.getValue());
					var content = Seam.Remoting
							.createType("com.luck.itumserv.entity.Content");
					Ext.apply(content, updateProjectFolder.updateFolderForm
									.getForm().getValues());
					content
							.setSecurityDegree(updateProjectFolder.securityDegree1);
					content.setContentsid(leftNavigationTree.nodeId.replace(
							"c", ""));
					if (!callback) {
						callback = function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (obj.success == true) {
								collarbMain.refresh();
								var node = leftNavigationTree.node;
								collarbMain.leftTree.fireEvent('beforeclick',
										node);// 刷新当前节点
								collarbMain.leftTree.fireEvent('click', node,
										Ext.EventObject.ctrlKey);// 刷新当前节点
								Ext.MessageBox.show({

											title : ''
													+ getResource('resourceParam596')
													+ '',

											msg : ''
													+ getResource('resourceParam677')
													+ '!',
											width : 150,

											buttons : Ext.MessageBox.OK
										});

							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : obj.error,
											buttons : Ext.MessageBox.ERROR
										});
							}
						}
					}
					callSeam("project_ProjectRemote",
							"updateProjectFolderById", [content], callback);
				}
			}
		}, {
			text : '' + getResource('resourceParam606') + '',
			handler : function() {
				updateProjectFolder.updateFolderForm.getForm().reset();
			}
		}]
	});
	updateProjectFolder.updateFolderForm.getForm().load({
		url : '../JSON/project_ProjectRemote.getProjectFolderById?contentsid='
				+ leftNavigationTree.nodeId.replace("c", ""),
		method : 'GET',
		success : function(form, action) {
			var obj = Ext.util.JSON.decode(action.response.responseText);
			updateProjectFolder.securityDegree
					.setValue(obj.data.securityDegreeName);
			updateProjectFolder.securityDegree1 = obj.data.securityDegree;

		},
		failure : function(form, action) {
			collarbMain.refresh();
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam499') + '',
						msg : action.result.error,
						icon : Ext.MessageBox.ERROR,
						buttons : Ext.MessageBox.OK
					});
		}
	});

	return updateProjectFolder.updateFolderForm;
}
