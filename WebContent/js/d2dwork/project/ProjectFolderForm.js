var ProjectFolderForm = {
	tpye : "1"
};
ProjectFolderForm.init = function(callback) {

	ProjectFolderForm.contentsname = new Ext.form.TextField({
				id : 'contentsname',
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
						Ext.getCmp('contentsname').setValue(curStr);
					}
				}
			});
	ProjectFolderForm.securityDegree1 = null;
	ProjectFolderForm.securityDegree = new Ext.form.ComboBox({
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
				ProjectFolderForm.securityDegree1 = record.get('id');
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});
	ProjectFolderForm.contentsnotes = new Ext.form.TextArea({
				id : 'contentsnotes',
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

	ProjectFolderForm.addFolderForm = new Ext.form.FormPanel({
		id : 'addFolderForm',
		bodyStyle : 'padding:10px 0px 10px 10px',
		frame : false,
		title : '' + getResource('resourceParam1562') + '',
		boder : false,
		defaults : {
			anchor : '62%'
		},
		items : [ProjectFolderForm.contentsname,
				ProjectFolderForm.securityDegree,
				ProjectFolderForm.contentsnotes],
		buttons : [{
			text : getResource('resourceParam5019'),
			handler : function() {
				if (ProjectFolderForm.contentsnotes.getValue().length > 999) {
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
				if (ProjectFolderForm.addFolderForm.getForm().isValid()) {
					var content = Seam.Remoting
							.createType("com.luck.itumserv.entity.Content");
					Ext.apply(content, ProjectFolderForm.addFolderForm
									.getForm().getValues());
					content.setTpye(ProjectFolderForm.tpye);
					if (leftNavigationTree.nodeId == 0) {
						content.setFathercontents(0);
					} else {
						content
								.setFathercontents(leftNavigationTree.nodeId
										.substring(
												1,
												leftNavigationTree.nodeId.length));
					}
					if (!callback) {
						callback = function(result) {
							var json = Ext.util.JSON.decode(result)
							if (json.success == true) {
								var currentNode = collarbMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								currentNode.attributes.leaf = false;
								currentNode.attributes.expandable = true;
								var newNode = collarbMain.leftTree.getLoader()
										.createNode({
											id : json.nodeId,
											text : json.name,
											allowDrop : false,
											dataType: 'ContentDataType',
											iconCls : 'new-icon-projectCategory',
											leaf : true,
											expandable : false
										});
								var firstChild = currentNode.firstChild;
								if (firstChild == null) {
									currentNode.appendChild(newNode);
								} else {
									currentNode.insertBefore(newNode,
											firstChild)
								}

								collarbMain.leftTree.fireEvent('beforeclick',
										newNode);// 点击该node
								collarbMain.leftTree.fireEvent('click',
										newNode, Ext.EventObject.ctrlKey);// 点击该
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : json.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						}
					}
					callSeam("project_ProjectRemote", "addProjectFolder",
							[content], callback);
				}
			}
		}, {
			text : '' + getResource('resourceParam606') + '',
			handler : function() {
				ProjectFolderForm.addFolderForm.getForm().reset();
			}
		}]
	});
	return ProjectFolderForm.addFolderForm;
}
