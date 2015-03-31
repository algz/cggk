var collarbExtendForm = {tpye:"1"};
collarbExtendForm.init = function() {
	var createProjectMask = new Ext.LoadMask(document.body, {
		msg : getResource('resourceParam5045')
	});
	var addProject=function(send,filepath){
		Ext.Ajax.request( {
			url : "../JSON/project_ProjectRemote.addProject",
			method : 'POST',
			success : function(response,
					options) {
				var mes = Ext.util.JSON
						.decode(response.responseText);
				if (mes.success == true) {
					var contentNode = collarbMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					contentNode.attributes.leaf = false;
					contentNode.attributes.expandable = true;
					var newNode = collarbMain.leftTree
							.getLoader()
							.createNode(
									{
										id : mes.nodeId,
										text : collarbForm.name1,
										chargedManId : collarbForm.user1,
										projectId: mes.nodeId.substring(1,mes.nodeId.length),
										dataType: 'ProjectDataType',
										iconCls : mes.iconCls,
										statusId : mes.statusId,
										allowDrop : mes.allowDrop,
										leaf : true
									});
					var lastChildNode = contentNode.lastChild;
					if (lastChildNode != null) {
						// 粘贴时，维护新节点于最后一个节点的
						// pre，nex
						newNode.attributes.pre = lastChildNode.attributes.id;
						newNode.attributes.nex = lastChildNode.attributes.nex;

						lastChildNode.attributes.nex = newNode.attributes.id;
					} else {
						newNode.attributes.pre = '';
						newNode.attributes.nex = '';
					}
					contentNode
							.appendChild(newNode);
					contentNode.expand();
					collarbMain.leftTree
							.fireEvent(
									'beforeclick',
									newNode);// 点击该node
					collarbMain.leftTree
							.fireEvent(
									'click',
									newNode,
									Ext.EventObject.ctrlKey);// 点击该node
					newNode.select();

				} else {
					Ext.MessageBox
							.show( {
								title : '' + getResource('resourceParam575') + '',
								msg : mes.error,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
				createProjectMask.hide();
			},
			params : {
				node : leftNavigationTree.nodeId,// 需要保存在文件夹id下
				name : collarbForm.name1,
				type : collarbForm.type1,
				tpye : collarbExtendForm.tpye,
				department : collarbForm.department1,
				user : collarbForm.user1,
				createtime : collarbForm.createtime1
						.toString(),
				status : collarbForm.status1,
				start : collarbForm.start1,
				end : collarbForm.end1,
				datacenterids : collarbForm.datacenter1,
				securityDegree : collarbForm.securityDegree1,
				textarea : collarbForm.textarea1,
				extendform : send,
				projectcategoryid : collarbForm.projectcategoryid,
				filepath : filepath,
				why : collarbForm.why
			}
		});
	};
	collarbExtendForm.myform = new Ext.form.FormPanel({
				autoScroll : true,
				autoWidth : true,
				fileUpload : true,
				border : false,
				bodyStyle : 'padding:10px 0px 10px 10px',
				items : [{
							layout : 'column',
							border : false,
							items : [{
										border : false,
										width : 330,
										layout : 'form',
										items : [{
													xtype : 'button',
													style : 'margin-left: 275px;',
													text : ''+getResource('resourceParam1152')+'',
													handler : formerPage
												}]
									}, {
										border : false,
										width : 60,
										layout : 'form',
										items : [{
													xtype : 'button',
													text : getResource('resourceParam5046'),
													handler : formsubmit
												}]
									}]
						}

				]

			});

	function formerPage() {
		collarbCardFrame.card.layout.setActiveItem(0);

	}
	function formsubmit() {
		if (collarbCardFrame.extendform.getForm().isValid()) {
			createProjectMask.show();
			var form = collarbCardFrame.extendform.getForm().getFieldValues();
			var send = Ext.encode(form);
			collarbCardFrame.extendform
					.getForm()
					.submit({
								// url : "../JSON/FileUploadServlet",
								url : "../FILEUP/",
								method : 'POST',
								// waitMsg : '正在创建，请稍候。。。',
								// waitTitle : '创建项目',
								failure : function(form, action) {
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									var filepath = action.response.responseText;
									addProject(send,filepath);
								},
								success : function(form, action) {
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									var filepath = action.response.responseText;
									addProject(send,filepath);

								}
							});

		}
	}
	return collarbExtendForm.myform;
}
