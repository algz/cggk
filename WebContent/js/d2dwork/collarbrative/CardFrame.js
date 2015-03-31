var collarbCardFrame = {};

collarbCardFrame.init = function() {
	collarbCardFrame.form = collarbForm.init();
	collarbCardFrame.extendform = collarbExtendForm.init();

	collarbCardFrame.panel1 = new Ext.Panel({
				title : ''+getResource('resourceParam1149')+'',
				layout : 'fit',
				items : [collarbCardFrame.form]
			});

	collarbCardFrame.panel2 = new Ext.Panel({
				title : ''+getResource('resourceParam1150')+'',
				layout : 'fit',
				items : [collarbCardFrame.extendform]
			});

	collarbCardFrame.card = new Ext.Panel({
				layout : 'card',
				activeItem : 1,
				height : 430,
				frame : false,
				border : false,
				hidden : true,
				split : true,
				buttonAlign : 'center',
				items : [collarbCardFrame.panel1, collarbCardFrame.panel2],

				buttons : [

				{
							id : 'pnextstep',
							text : ''+getResource('resourceParam1151')+'',
							hidden : false,
							handler : nextPage
						}, {
							id : 'pformerstep',
							text : ''+getResource('resourceParam1152')+'',
							hidden : true,
							handler : formerPage
						}, {
							id : 'psubmitform',
							text :  '' + getResource('resourceParam9023') + '' ,
							hidden : true,
							handler : formsubmit
						}]
			});
	var name, type, department, user, createtime, status, start, end, realstart, realend, textarea;
	function nextPage() {	
		if (collarbCardFrame.form.getForm().isValid()) {
			Ext.Ajax.request({
						url : '../JSON/project_ProjectRemote.getExtendForm',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							// 后台获取的扩展属性的表单
							for (var i = 0; i < obj.length; i++) {
								collarbCardFrame.extendform.insert(i, obj[i]);
							}
							if(obj.length==0){
							Ext.Msg.alert(''+getResource('resourceParam575')+'',''+getResource('resourceParam1148')+'');
							}
							collarbCardFrame.extendform.doLayout();
							Ext.getCmp('pnextstep').setVisible(false);
							Ext.getCmp('psubmitform').setVisible(true);
							Ext.getCmp('pformerstep').setVisible(true);
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							projectcategoryid : [collarbMain.projectcategoryid]
						}
					});

			try {
				// 传第一个form的data
				name = collarbCardFrame.form.getForm().findField('name')
						.getValue();
				type = collarbCardFrame.form.getForm().findField('category')
						.getValue();
				department = dataCenterBase.codeid;
				user = dataCenterBase.userComb.getValue();
				textarea = collarbCardFrame.form.getForm()
						.findField('ptextarea').getValue();
				var t = collarbCardFrame.form.getForm().findField('createtime')
						.getValue();
				createtime = (new Date(t)).format('Y-m-d');
//				status = collarbCardFrame.form.getForm()
//						.findField('projectstatusid').getValue();
				var start1 = collarbCardFrame.form.getForm().findField('start')
						.getValue();
				start = (new Date(start1)).format('Y-m-d');
				var end1 = collarbCardFrame.form.getForm().findField('end')
						.getValue();
				end = (new Date(end1)).format('Y-m-d');
				var realstart1 = collarbCardFrame.form.getForm()
						.findField('realstart').getValue();
				realstart = (new Date(realstart1)).format('Y-m-d');
				var realend1 = collarbCardFrame.form.getForm()
						.findField('realend').getValue();
				realend = (new Date(realend1)).format('Y-m-d');

			} catch (e) {
			} finally {
			}
			collarbCardFrame.card.layout.setActiveItem(1);
		}
	}
	function formerPage() {
		Ext.getCmp('pnextstep').setVisible(true);
		Ext.getCmp('psubmitform').setVisible(false);
		Ext.getCmp('pformerstep').setVisible(false);
		collarbCardFrame.card.layout.setActiveItem(0);
		collarbCardFrame.panel2.remove(collarbCardFrame.extendform);
		collarbCardFrame.extendform = collarbExtendForm.init();
		collarbCardFrame.panel2.items.add(collarbCardFrame.extendform);
		collarbCardFrame.panel2.doLayout();

	}
	function formsubmit() {
		if (collarbCardFrame.extendform.getForm().isValid()) {
			Ext.getCmp('pnextstep').setVisible(true);
			Ext.getCmp('psubmitform').setVisible(false);
			Ext.getCmp('pformerstep').setVisible(false);
			collarbMain.cardframe.setVisible(false);
			var form = collarbCardFrame.extendform.getForm().getValues();
			var send = Ext.encode(form);
			Ext.Ajax.request({
				url : "../JSON/project_ProjectRemote.saveProject",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {
						// Ext.Msg.alert("提示","提交成功");
						var contentNode = collarbMain.lefttree
								.getNodeById(collarbMain.nodeId);
						if (contentNode.isExpanded()) {
							var node = new Ext.tree.TreeNode({
										id : obj.nodeId,
										text : name,
										iconCls : 'icon-planningProject',
										leaf : true
									});
							contentNode.appendChild(node);
							collarbMain.mytab.setVisible(true);
							collarbMain.mytab.setActiveTab(0);// 设置进入tab的第一页，基本信息页
							var newAddNode = collarbMain.lefttree
									.getNodeById(obj.nodeId);
							collarbMain.lefttree.fireEvent('click', newAddNode);// 点击该node
							newAddNode.select();

						}

					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					node : collarbMain.nodeId,// 需要保存在文件夹id下
					name : name,
					type : type,
					department : department,
					user : user,
					createtime : createtime.toString(),
					status : status,
					start : start,
					end : end,
					realstart : realstart,
					realend : realend,
					textarea : textarea,
					extendform : send,
					projectcategoryid : collarbMain.projectcategoryid
				}
			});
		}
	}

	return collarbCardFrame.card;
}
