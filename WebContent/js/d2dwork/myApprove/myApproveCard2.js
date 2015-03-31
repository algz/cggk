var myApproveCard2 = {proxyApprove:false};

myApproveCard2.approveMask=null;
myApproveCard2.init = function() {
	Ext.QuickTips.init();
	myApproveCard2.objectGrid = myApproveObjectGrid.init();
	myApproveCard2.mainPanel = new Ext.TabPanel({
		// 如果设置到panel的config里，页面会闪现两个面板
		// activeTab : 0
	});
	approvePanel.participantsGrid = approvePanel.getUserGrid(false);

	myApproveCard2.flowViewWindow = null;
	
	// 点击链接查看审批模板审批情况
	myApproveCard2.approvalStep = function() {
		if(!myApproveCard2.flowViewWindow) {
			myApproveCard2.flowViewWindow = new FlowViewWindow();
		}
		myApproveCard2.flowViewWindow.viewFlowInstance(myApproveCard2.flowInstanceID);
	}

	myApproveCard2.startP2MMask = new Ext.LoadMask(document.body, {
		msg : '' + getResource('resourceParam1047') + ''
	});
	
	// 上游选下游的表单
	myApproveCard2.card1 = new Ext.form.FormPanel({
		border : false,
		bodyStyle : 'padding-left:25px;',
		autoHeight : true,
		id : 'myApproveContinuePanelCard',
		items : [{
			xtype : 'combo',
			width : 200,
			fieldLabel : '' + getResource('resourceParam1017') + '',
			labelStyle : 'font-weight:bold',
			id : 'myApproveContinueApproveStep',
			allowBlank : false,
			maxLength : 50,
			maxLengthText : ''+ getResource('resourceParam656') + '50!',
			labelWidth : 60,
			style : 'margin-bottom:5px;',
			store: new Ext.data.ArrayStore({
		        fields: ['display', 'value'],
		        data :[['【校对】','【校对】'],['【审核】','【审核】'],['【审定】','【审定】'],['【会签】','【会签】'],['【批准】','【批准】']] // from states.js
		    }),
            displayField:'value',
            mode: 'local',
            triggerAction: 'all'                	
		}, approvePanel.participantsGrid]
	});

	var getTaskGrid = function() {
		var g = mytaskGrid.init();
		g.getStore().on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/mytask_MyTaskRemote.getNotAgreePostActivityTasks'
			})
			options.params = Ext.apply(options.params, {
				taskid : myApproveCard2.objectId,
				start : 0,
				limit : 25
			});
		});
		var p = new Ext.Panel({
			border : false,
			items : [g],
			layout : 'fit',
			tbar : [{
				text : getResource('resourceParam1051'),
				handler : function() {
					Ext.Ajax.request({
						url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							if (obj.modify) {
								myApproveCard2.startP2MMask.show();
								Ext.Ajax.request({
									url : "../JSON/task_TaskRemote.getFatherInfo",
									method : 'POST',
									success : function(res, opt) {
										var obj = Ext.util.JSON.decode(res.responseText);
										startP2M("P2M", obj.projectId, obj.taskId);
										setInterval("myApproveCard2.startP2MMask.hide()", 3000);
									},
									params : {
										taskId : myApproveCard2.objectId
									}
								});
							} else {
								Ext.MessageBox.show({
									title : '' + getResource('resourceParam499') + '',
									msg : '' + getResource('resourceParam1048') + '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						},
						params : {
							dataId : myApproveCard2.objectId
						}
					});
				}
			}]
		});
		return p;
	}
	myApproveCard2.mainPanel.add({
		title : '' + getResource('resourceParam727') + '',
		border : false,
		id : 'myApproveFormPanel',
		autoScroll : true,
		listeners : {
			'afterlayout' : function() {
				if(myApproveCard2.jumpType == 'jump'){
					Ext.getCmp('approvalVeiwInfo').reset();
					Ext.getCmp("approvalVeiwInfo").setValue(myApproveCard2.approveVeiw);
					Ext.getCmp('myApproveFeedbackGrid').hide();
					Ext.getCmp('approvalIsNotAgree').setValue(false);
					Ext.getCmp('approvalIsAgree').setValue(true);
				}
			}
		},
		items : [{
			html : '<div style="margin-left:10px;line-height:26px;"><span style="font-weight:bold;">'
					+ getResource('resourceParam1372') + '</span></div>',//送审附言
			border : false
		}, {
			style : 'margin-left:25px;border-width:1px;width:380px;padding:5px;autoScroll: true;',
			autoScroll : true,
			border : true,
			id : 'myApproveNotes'
		}, {
			html : '<div style="margin-left:10px;line-height:26px;"><span style="font-weight:bold;">'
					+ getResource('resourceParam1373') + '</span></div>',//审批对象
			border : false
		}, {
			style : 'margin-left:25px;',
			border : false,
			items : [myApproveCard2.objectGrid]
		}, {
			border : false,
			html : '<div style="padding-left:10px;line-height:18px;height:26px;"><span style="font-weight:bold;float:left;">'
					+ getResource('resourceParam1374')
					+ '</span><div style="padding-left:360px;" id="approvalspeed"><a href="javascript:void(0);" onclick="myApproveCard2.approvalStep()"><font color="blue">'
					+ getResource('resourceParam1045')
					+ getResource('resourceParam4023')
					+ '</font></a></div></div>'
		}, new Ext.Panel({
			style : 'margin-left:25px;',
			border : false,
			items : [new Ext.form.TextArea({
				id : 'approvalVeiwInfo',
				width : 400,
				height : 120,
				maxLength : 500,
				maxLengthText : '' + getResource('resourceParam1171') + ''
			}), {
				baseCls : 'x-plain',
				xtype : 'panel',
				layout : 'table',
				cls : 'finish-to-hide',
				style : 'margin:5px 60px;',
				fieldLabel : '' + getResource('resourceParam1045') + '',
				isFormField : true,
				items : [{
					id : 'approvalIsAgree',
					xtype : 'radio',
					name : 'isAgree',
					boxLabel : '<span style="font-size:12px;">' + getResource('resourceParam5015') + '</span>',// 同意
					value : 'true',
					checked : true
				}, {
					border : false,
					cls : 'finish-to-hide',
					html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				}, {
					id : 'approvalIsNotAgree',
					xtype : 'radio',
					cls : 'finish-to-hide',
					name : 'isAgree',
					boxLabel : '<span style="font-size:12px;">'+ getResource('resourceParam1176') + '</span>',
					value : 'false',
					listeners : {
						'check' : function(o, checked) {
							if (!checked && myApproveCard2.examinerType == 1) {
								Ext.get("myApproveContinuePanel").dom.style.display = "block";
							} else {
								Ext.get("myApproveContinuePanel").dom.style.display = "none";
							}
							if (checked && myApproveCard2.objectType == 'TaskDataType') {
								/*
								 * edited by suny  2011-04-22
								 * 为西飞发布时，屏蔽掉选取反馈的grid
								 * 针对bug259
								 * 
								 */
//								Ext.getCmp('myApproveFeedbackGrid').show();
//								Ext.getCmp('myApproveFeedbackGrid').items
//										.get(0).items.get(0).getStore().load();
							} else {
								Ext.getCmp('myApproveFeedbackGrid').hide();
							}
							if (checked) {
								Ext.getCmp('proxyCheck').hide();
                                Ext.getCmp('afterCheckbox').hide();
							} else {
                                if(myApproveCard2.examinerType === 2 || myApproveCard2.approvalType == "ByTemplet") {
									Ext.getCmp('proxyCheck').hide();
	                                Ext.getCmp('afterCheckbox').hide();
                                } else {
	                                Ext.getCmp('proxyCheck').show();
	                                Ext.getCmp('afterCheckbox').show();
                                }
							}
						}
					}
				}, {
					border : false,
					cls : 'finish-to-hide',
					html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
				}, {
					border : false,
					id : 'proxyCheck',
					cls : 'finish-to-hide',
					html : '<div style="line-height:26px;">'
							+ '<input style="position:relative;top:3px" type="checkbox" id="myApproveProxy" onclick="myApproveCard2.contrlMyAppContPanelProxy(this)" /><span style="font-size:12px;margin-left:5px">委托审批</span></div>'
				}]
			}]
		}), {
			border : false,
			id : 'myApproveContinuePanel',
			cls : 'finish-to-hide',
			items : [{
				id : 'afterCheckbox',
				border : false,
				html : '<div style="padding-left:10px;line-height:26px;" id="nextstep"><span style="font-weight:bold;">'
						+ getResource('resourceParam1368')
						+ '（<span style="color:red;">'
						+ getResource('resourceParam1369')
						+ '</span>）：</span><input type="checkbox" id="myApproveContinuePanelImg" onclick="myApproveCard2.contrlMyAppContPanel(this)" /></div>'
			}, myApproveCard2.card1]
		}, {
			id : 'myApproveFeedbackGrid',
			cls : 'finish-to-hide',
			hidden : true,
			items : [getTaskGrid()]
		}],
		buttonAlign : 'center',
		buttons : [{
			text : '' + getResource('resourceParam484') + '',
			id : 'myApproveSubmitButton',
			handler : function() {
				myApproveCard2.approveMask = new Ext.LoadMask(document.body, {
					msg : ''+ getResource('resourceParam7131')+ ''  //正在提交操作，请稍候...
				});
				myApproveCard2.approveMask.show();
				if (myApproveCard2.approvalType == "StepByStep") {
					var isFinished = Ext.get("myApproveContinuePanelImg").dom.checked; // 验证是否选中
					var chiefManID = null; // 负责人ID
					var participantsID = "";// 参与人ID
					if (isFinished) {
						if (Ext.get("myApproveContinueApproveStep").dom.value == "") {
							myApproveCard2.approveMask.hide();
							Ext.Msg.alert('' + getResource('resourceParam575') + '',
								'' + getResource('resourceParam1370') + ''); //请输入审批步骤名称
							return;
						}
						if(Ext.get("myApproveContinueApproveStep").dom.value.length > 50){
							myApproveCard2.approveMask.hide();
							Ext.Msg.alert('提示','审批步骤'+ getResource('resourceParam656')+ '50!');
							width:300;
							return;
						}
						var dataStore = approvePanel.participantsGrid.getStore();
						// 判断是否有负责人，如果没有则需要指定，必须有审批参与人
						var count = dataStore.getCount();
						if (count == 0) {
							myApproveCard2.approveMask.hide();
							Ext.Msg.alert('' + getResource('resourceParam575') + '',
								'' + getResource('resourceParam1007') + ''); //请指定审批参与人
							return;
						}
						var j = 0;
						for (i = 0; i < count; i++) {// 判断是否指定负责人
							if (dataStore.getAt(i).get('usertype')) {
								chiefManID = dataStore.getAt(i).get('userid');
							} else {
								participantsID += dataStore.getAt(i).get('userid') + "_";
								j++;
							}
						}

						if (chiefManID == null) {
							myApproveCard2.approveMask.hide();
							Ext.Msg.alert('' + getResource('resourceParam575') + '',
								'' + getResource('resourceParam1008') + '');
							return;
						}
					}
					// 不同意并且审批意见为空
					if (!Ext.getCmp("approvalIsAgree").getValue()
							&& "" == Ext.util.Format.trim(Ext.getCmp("approvalVeiwInfo").getValue())) {
						myApproveCard2.approveMask.hide();
						Ext.Msg.alert(''+ getResource('resourceParam575')+ '',''+ getResource('resourceParam1371')+ '');
						return;
					}

					Ext.Ajax.request({
						url : '../JSON/approval_ApprovalRemote.next',
						method : 'POST',
						success : function(response, options) {
							myApproveCard2.approveMask.hide();
							var obj = Ext.util.JSON.decode(response.responseText);
							if (obj.success == false) {
								Ext.example.msg('', obj.message);
							}
							myApproveCard2.goBackToGrid();
						},
						failure : function(result, request) {
							myApproveCard2.approveMask.hide();
						},
						params : {
							flowInstanceID : myApproveCard2.flowInstanceID,
							activityInstanceID : myApproveCard2.activityInstanceID,
							examiner : myApproveCard2.examiner,
							examinerType : myApproveCard2.examinerType,
							approvalStatus : myApproveCard2.proxyApprove?100:(Ext.getCmp("approvalIsAgree").getValue() ? 1 : 0),
							approvalComments : Ext.get("approvalVeiwInfo").dom.value,
							id : myApproveCard2.approvalId,
							approveStepName : Ext.get("myApproveContinueApproveStep").dom.value,
							chiefManID : chiefManID,
							participantsID : participantsID,
							isFinished : isFinished,
							objectId : myApproveCard2.objectId,
							objectType : myApproveCard2.objectType,
							approvalType : 'StepByStep',
							proxyApprove : myApproveCard2.proxyApprove
						}
					});
				} else if (myApproveCard2.approvalType == "ByTemplet") {
					if (!Ext.getCmp("approvalIsAgree").getValue() && "" == Ext.util.Format.trim(Ext.getCmp("approvalVeiwInfo").getValue())) {
						Ext.Msg.alert('' + getResource('resourceParam575') + '', '' + getResource('resourceParam1371') + '');
						myApproveCard2.approveMask.hide();
						return;
					}
					// 不同意并且审批意见为空
					var approvalParams={
						id : myApproveCard2.approvalId,
						objectId : myApproveCard2.objectId,
						objectType : myApproveCard2.objectType,
						approvalType : "ByTemplet",
						flowInstanceID : myApproveCard2.flowInstanceID,
						activityInstanceID : myApproveCard2.activityInstanceID,
						examiner : myApproveCard2.examiner,
						examinerType : myApproveCard2.examinerType,
						approvalStatus : Ext.getCmp("approvalIsAgree").getValue() ? 1 : 0,
						approvalComments : Ext.get("approvalVeiwInfo").dom.value
					};
					myApproveCard2.getTempletInfo(approvalParams);
				}
			}
		}, {
			text : '取消',
			handler : function() {
				myApproveCard2.goBackToGrid();
			}
		}]
	})

	var car2_tb=['-', {
					text : '查看全部',
					id:'lookAll',
					tooltip : {
						title : '查看全部审批记录',
						text : '查看全部审批记录'
					},
					handler : function() {
						if(this.pressed) { 
							this.removeClass('x-btn-pressed');
							Ext.getCmp('lookCurrent').addClass("x-btn-pressed");
//							this.pressed = false;
						} else { 
							this.addClass("x-btn-pressed");
							Ext.getCmp('lookCurrent').removeClass("x-btn-pressed");
//							this.pressed = true;
						}
						approveFlowSteps.getAllApprovalRecord(myApproveCard2.objectId,myApproveCard2.objectType);
					}
				},'-', {
					text : '查看当前',
					id:'lookCurrent',
					tooltip : {
						title : '查看当前流程审批记录',
						text : '查看当前流程审批记录'
					},
					handler :function(){
						if(this.pressed) { 
							this.removeClass('x-btn-pressed');
							Ext.getCmp('lookAll').addClass("x-btn-pressed");
//							this.pressed = false;
						} else { 
							this.addClass("x-btn-pressed");
							Ext.getCmp('lookAll').removeClass("x-btn-pressed");
//							this.pressed = true;
						}
						approveFlowSteps.refreshGrid(myApproveCard2.activityInstanceID);
					} 
	}];
	myApproveCard2.card2 = new Ext.Panel({
		layout : 'border',
		region : 'center',
		tbar:car2_tb,
		items : [approveFlowSteps.getGrid()]
	})
	myApproveCard2.mainPanel.add({
		title : '' + getResource('resourceParam1153') + '',
		id : 'myApproveCard2Panel2',
		layout : 'border',
		listeners : {
			deactivate : function(p){
				myApproveCard2.jumpType = 'tab';
			}
		},
		items : [myApproveCard2.card2]
	});

	myApproveCard2.contrlMyAppContPanel = function(obj) {
		var isHide = obj.checked ? "block" : "none";
		Ext.get("myApproveContinuePanelCard").dom.style.display = isHide;
	}
	myApproveCard2.contrlMyAppContPanelProxy = function(obj) {
		if (obj.checked) {
			myApproveCard2.proxyApprove = true;
			Ext.getCmp('myApproveContinueApproveStep').reset();
			Ext.get("myApproveContinuePanelImg").dom.checked = true; // 选中继续审批结点checkbox

			Ext.getCmp('approvalIsAgree').setValue(true);
			Ext.getCmp('approvalIsAgree').disable();
			Ext.getCmp('approvalIsNotAgree').disable();
			Ext.getCmp('afterCheckbox').hide();
			Ext.get("myApproveContinuePanelCard").dom.style.display = "block";
		} else {
			myApproveCard2.proxyApprove = false;
			Ext.getCmp('myApproveContinueApproveStep').reset();
			Ext.get("myApproveContinuePanelImg").dom.checked = false;//取消继续审批结点checkbox

			Ext.getCmp('afterCheckbox').show();
			Ext.getCmp('approvalIsAgree').enable();
			Ext.getCmp('approvalIsNotAgree').enable();
			Ext.getCmp('afterCheckbox').enable();
			Ext.get("myApproveContinuePanelCard").dom.style.display = "none";
		}
	}
	Ext.getCmp("myApproveCard2Panel2").on('activate', function() {
		 /*
         * edited by suny 2011-04-24
         * 在已有myApproveCard2.approveVeiw的基础上，
         * 当在tab中切换时，保存审批意见中的内容
         */
        myApproveCard2.approveVeiw=Ext.getCmp('approvalVeiwInfo').getValue();
		approveFlowSteps.refreshGrid(myApproveCard2.activityInstanceID);
		Ext.getCmp('lookCurrent').addClass('x-btn-pressed');
		Ext.getCmp('lookAll').removeClass("x-btn-pressed");
		myApproveCard2.mainPanel.doLayout();
	});
	
	/**
	 * 审批前确认审批人
	 * @params approvalParams
	 * @params success
	 * @params failure
	 */
	myApproveCard2.getTempletInfo=function(approvalParams) {
		myApproveCard2.approveMask.hide();
		Ext.Ajax.request({
			url : '../JSON/approval_ApprovalRemote.checkNext',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success) {
					// 若流程将结束或终止
					if(!obj.activityInfo) { // 没有下一个节点或者还没有继续往下流转的情况，不同意终止时，或会签等待时
						Ext.MessageBox.confirm('' + getResource('resourceParam575') + '', obj.msg, function(btn, text) {
							if(btn == 'yes') {
								approvalParams.activityInfo = Ext.encode(obj.activityInfo);
								myApproveCard2.nextConfirmSubmit(approvalParams);
							}
						});
					}else {
						var nodetypeid = obj.activityInfo.nodetypeid;
						if(nodetypeid == '5') { // 如果下一个节点是结束节点
							Ext.MessageBox.confirm('' + getResource('resourceParam575') + '', obj.msg, function(btn, text) {
								if(btn == 'yes') {
									approvalParams.activityInfo = Ext.encode(obj.activityInfo);
									myApproveCard2.nextConfirmSubmit(approvalParams);
								}
							});
						} else if(nodetypeid == '6') { // 如果下一个节点是审批节点
							// 审批节点确认界面点击确定时的回调
							var functOK = function(userid) {
								obj.activityInfo.comments[0].examiner=userid;
								obj.activityInfo.comments[0].examinerType=1;
								// 创建审批节点确认界面，并展示
								approvalParams.activityInfo = Ext.encode(obj.activityInfo);
								myApproveCard2.nextConfirmSubmit(approvalParams);
							}
							var viewApprovalWin = new ViewApprovalWin(functOK);
							viewApprovalWin.showWin(obj.activityInfo, obj.msg);
						} else if(nodetypeid == '7' || nodetypeid == '8' || nodetypeid == '9') {
							// 会签节点点击确认时的回调函数
							var functOK = function() {
								approvalParams.activityInfo = Ext.encode(obj.activityInfo);
								myApproveCard2.nextConfirmSubmit(approvalParams);
							}
							// 创建会签节点确认界面，并展示
							var viewCounterSignWin = new ViewCounterSignWin(functOK);
							viewCounterSignWin.showWin(obj.activityInfo, obj.msg);
						} else if(nodetypeid == '10') {
							var functOK = function(originalindex) {
								var judgeInfo = obj.activityInfo;
								judgeInfo.originalindex = originalindex;
								approvalParams.judgeInfo = Ext.encode(judgeInfo);
								myApproveCard2.getTempletInfo(approvalParams);
							}
							var viewManualJudgeWin = new ViewManualJudgeWin(functOK);
							viewManualJudgeWin.showWin(obj.msg);
						}
					}
				} else {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam575') + '',// 信息提示
						msg : obj.message,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			},
			params : approvalParams
		});
	}
	
	myApproveCard2.nextConfirmSubmit=function(approvalParams) {
		myApproveCard2.approveMask.show();
		Ext.Ajax.request({
			url : '../JSON/approval_ApprovalRemote.next',
			method : 'POST',
			success : function(response, options) {
				myApproveCard2.approveMask.hide();
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success) {
					Ext.example.msg('提示', '操作成功！');
				} else {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam575') + '',
						msg : obj.message,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
				myApproveCard2.goBackToGrid();
			},
			failure : function(result, request) {
				myApproveCard2.approveMask.hide();
			},
			params : approvalParams
		})
	}
	
	myApproveCard2.goBackToGrid = function() {
		myApproveMain.mainPanel.getLayout().setActiveItem(0);
		var approveStore = myApproveCard1.centerPanel.getStore();
		/**
		 * bug:382 在我的审批界面“审批状态”和“审批对象”下拉列表不能进行多选
		 */
		var tempStatus = Ext.getCmp("approveStatusComb").getValue();
	 	//对象
		var tempObjType= Ext.getCmp("approveObjectType").getValue();
				
		var objectType="";
		if (tempObjType.length != 0) {
			objectType= tempObjType+',';
		} else {
			appObjLovCom.setRawValue("" + getResource('resourceParam1366') + "");
		}
		
		if(tempStatus.length==0){
			appStatusLovCom.setRawValue("" + getResource('resourceParam1364') + "");
		}
		 
		var approveStore = myApproveCard1.centerPanel.getStore();
		approveStore.proxy = new Ext.data.HttpProxy({
			url : '../JSON/approval_ApprovalRemote.getApprovalListByUserId?appStatuses='
				+ tempStatus + '&objectType=' + objectType+'&approvalType=StepByStep',
			method : 'GET'
		});
				
		approveStore.reload();
	}
	return myApproveCard2.mainPanel;
}
