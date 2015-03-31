/*
 * updateTaskBasic.nodeId要更新的任务Id
 */
var updateTaskExtend = {};
updateTaskExtend.init = function(callback) {
	var createTaskMask = new Ext.LoadMask(document.body, {
				msg : '正在更新' + getResource('resourceParam733') + '，请稍候。。。'
			});
	updateTaskExtend.form = new Ext.form.FormPanel({
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
						width : 325,
						layout : 'form',
						items : [{
									xtype : 'button',
									style : 'margin-left: 275px;',
									text : ''
											+ getResource('resourceParam1152')
											+ '',
									handler : formerPage
								}]
					}, {
						border : false,
						layout : 'form',
						width : 60,
						items : [{
									xtype : 'button',
									text : getResource('resourceParam5046'),
									handler : formsubmit
								}]
					}]
				}]
			});
	function formerPage() {
		updateTaskCard.card.layout.setActiveItem(0);

	}
	function formsubmit() {
		if (updateTaskCard.extendForm.getForm().isValid()) {
			createTaskMask.show();
			var form = updateTaskCard.extendForm.getForm().getFieldValues();
			var send = Ext.encode(form);
			updateTaskCard.extendForm.getForm().submit({
				url : "../FILEUP/",
				method : 'POST',
				failure : function(form, action) {
				var obj = Ext.util.JSON
				.decode(action.response.responseText);
		var filepath = action.response.responseText;
		Ext.Ajax.request({
			url : "../JSON/task_TaskRemote.updateTask",
			method : 'POST',
			success : function(response, options) {
				var mes = Ext.util.JSON
						.decode(response.responseText);
				updateTaskCard.card.layout.setActiveItem(0);
				if (mes.success == true) {
					updateTaskBasic.flag = false;// 更新成功则类型标志位重新置为false
					if (callback) {
						callback();
					}
				} else {
					if (callback) {
						callback();
					}
					Ext.MessageBox.show({
								title : ''
										+ getResource('resourceParam575')
										+ '',
								msg : getResource('resourceParam1559'),
								minWidth : 100,
								icon : Ext.MessageBox.ERROR,
								buttons : Ext.MessageBox.OK
							});
				}
				createTaskMask.hide();
			},
			params : {
				node : updateTaskBasic.nodeId,
				name : updateTaskBasic.name1,
				type : updateTaskBasic.type1,
				department : updateTaskBasic.department1,
				user : updateTaskBasic.user1,
				status : updateTaskBasic.status1,
				start : updateTaskBasic.start1,
				end : updateTaskBasic.end1,
				securityDegree : updateTaskBasic.securityDegree1,
				textarea : updateTaskBasic.textarea1,
				extendform : send,
				taskcategoryid : updateTaskBasic.taskcategoryid,
				duration : updateTaskBasic.duration1,
				saturation : updateTaskBasic.saturation1,
				manhour : updateTaskBasic.manhour1,
				roleId : updateTaskBasic.role1,
				application : updateTaskBasic.application1,
				isApproval : updateTaskBasic.isApproval1,
				filepath : filepath,
				flag : updateTaskBasic.flag,
				backEnum : updateTaskBasic.backEnum1,
				plannedquantity : updateTaskBasic.plannedquantity1
				// 标记是否更换了类型
			}
		});
				},
				success : function(form, action) {
					var obj = Ext.util.JSON
							.decode(action.response.responseText);
					var filepath = action.response.responseText;
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.updateTask",
						method : 'POST',
						success : function(response, options) {
							var mes = Ext.util.JSON
									.decode(response.responseText);
						
							updateTaskCard.card.layout.setActiveItem(0);
							if (mes.success == true) {
								updateTaskBasic.flag = false;// 更新成功则类型标志位重新置为false
								if (callback) {
									callback();
								}
								

							} else {
								if (callback) {
									callback();
								}
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam575')
													+ '',
											msg : getResource('resourceParam1559'),
											minWidth : 100,
											icon : Ext.MessageBox.ERROR,
											buttons : Ext.MessageBox.OK
										});
							}
							createTaskMask.hide();
						},
						params : {
							node : updateTaskBasic.nodeId,
							name : updateTaskBasic.name1,
							type : updateTaskBasic.type1,
							department : updateTaskBasic.department1,
							user : updateTaskBasic.user1,
							status : updateTaskBasic.status1,
							start : updateTaskBasic.start1,
							end : updateTaskBasic.end1,
							securityDegree : updateTaskBasic.securityDegree1,
							textarea : updateTaskBasic.textarea1,
							extendform : send,
							taskcategoryid : updateTaskBasic.taskcategoryid,
							duration : updateTaskBasic.duration1,
							saturation : updateTaskBasic.saturation1,
							manhour : updateTaskBasic.manhour1,
							roleId : updateTaskBasic.role1,
							application : updateTaskBasic.application1,
							isApproval : updateTaskBasic.isApproval1,
							filepath : filepath,
							flag : updateTaskBasic.flag,
							backEnum : updateTaskBasic.backEnum1,
							plannedquantity : updateTaskBasic.plannedquantity1
							// 标记是否更换了类型
						}
					});

				}
			});

		}
	}

	return updateTaskExtend.form;
}
