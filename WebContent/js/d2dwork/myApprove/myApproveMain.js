var myApproveMain = {};

myApproveMain.init = function() {
	myApproveMain.card1 = myApproveCard1.init();
	myApproveMain.card2 = myApproveCard2.init();
	myApproveMain.card3 = myApproveCard3.init();
	myApproveMain.mainPanel = new Ext.Viewport({
				layout : 'card',
				items : [myApproveMain.card1, myApproveMain.card2,
						myApproveMain.card3]
			})
	myApproveMain.mainPanel.getLayout().setActiveItem(0)
	myApproveMain.mainPanel.doLayout();

	myApproveMain.goSubmitApprove = function(examinertype, myApproveNotes,
			approvalId, approveStatus, flowInstanceID, objectType, examiner,
			activityInstanceID, objectId, approvalType ,approveVeiw) {
		myApproveObjectGrid.setcm();
		myApproveCard2.objectGrid.reconfigure(myApproveCard2.objectGrid.getStore(),
			myApproveObjectGrid.cm);
		if(objectType=='TaskDataType'){
			var arr = myApproveObjectGrid.cm.config;
			arr.push({
				header : "任务路径",
				width : 140,
				renderer : function(value, cellmeta, record) {
					return '<a href="javascript:void(0);" style="color:blue" onclick="mytaskGrid.taskPath(\'' + objectId
						+ '\')">查看</a>';
				}
			});
			myApproveCard2.objectGrid.reconfigure(myApproveCard2.objectGrid.getStore()
				,new Ext.grid.ColumnModel({
				defaults: {
			        sortable: false,
			        menuDisabled: true
			    },
				columns : arr
			}));
		}
		
		myApproveCard2.jumpType = 'jump';
		myApproveMain.mainPanel.getLayout().setActiveItem(1)
		myApproveMain.mainPanel.doLayout();
		if (approvalType == "ByTemplet") {
			Ext.get("nextstep").dom.style.display = "none";
			Ext.get("approvalspeed").dom.style.display = "block";
		}else if(approvalType=="StepByStep")
		{
			Ext.get("nextstep").dom.style.display = "block";
			Ext.get("approvalspeed").dom.style.display = "none";
		}
		Ext.get("myApproveContinuePanelCard").dom.style.display = "none";
		Ext.get("myApproveContinuePanelImg").dom.checked = false;
		Ext.get("myApproveProxy").dom.checked = false;
		
		/*
		 * by suny 2011-05-17
		 * 在每次进入审批详细页面时，设置委派参数为false
		 * 否则如果已经委派了一次，再次进入面板时，会导致向后台
		 * 传的参数错误，审批行为可能变化
		 */
		myApproveCard2.proxyApprove=false;
		Ext.getCmp('myApproveContinueApproveStep').setValue('审批');
		Ext.getCmp('approvalIsAgree').enable();
		Ext.getCmp('approvalIsNotAgree').enable();
        
        if (approvalType === "ByTemplet") {
			Ext.getCmp('afterCheckbox').hide();
			Ext.getCmp('proxyCheck').hide();
		}else {
			if (examinertype === 1) {
				Ext.getCmp('afterCheckbox').show();
				Ext.getCmp('proxyCheck').show();

			} else {
				Ext.getCmp('afterCheckbox').hide();
				Ext.getCmp('proxyCheck').hide();
			}
		}
		Ext.get("myApproveNotes").dom.innerHTML = '<div style="width:380px;white-space:normal;word-break:break-all;overflow:hidden;autoScroll: true;" title="'
				+ myApproveNotes + '">' + myApproveNotes + '</div>';
		Ext.get("approvalVeiwInfo").dom.value = approveVeiw;
		
		Ext.get("myApproveContinuePanel").dom.style.display = (examinertype == 1)
				? "block"
				: "none";
		var approveObjectStore = myApproveCard2.objectGrid.getStore();
		approveObjectStore.proxy = new Ext.data.HttpProxy({
			url : '../JSON/approval_ApprovalRemote.getApprovalObjectVos?flowInstanceID='
					+ flowInstanceID + "&approvalType=" + approvalType + "",
			method : 'GET'
		});
		approveObjectStore.load();
		// 设置公共属性
		myApproveCard2.approvalId = approvalId;
		myApproveCard2.flowInstanceID = flowInstanceID;
		myApproveCard2.activityInstanceID = activityInstanceID;
		myApproveCard2.examiner = examiner;
		myApproveCard2.examinerType = examinertype;
		myApproveCard2.objectId = objectId;
		myApproveCard2.objectType = objectType;
		myApproveCard2.approvalType = approvalType;
		myApproveCard2.approveVeiw = approveVeiw;
		if (approveStatus != -1) {
			Ext.getCmp("myApproveSubmitButton").disable();
		} else {
			Ext.getCmp("myApproveSubmitButton").enable();
		}
		//如果是已审批的，则屏蔽同意radio和后续人选择
		if(Ext.getCmp("approveStatusComb")
					.getValue()==1){
			$('.finish-to-hide').css('display','none');
			Ext.getCmp("approvalVeiwInfo").setReadOnly(true);
		}else{
			$('.finish-to-hide').css('display','block');
			Ext.getCmp("approvalVeiwInfo").setReadOnly(false);
		}
		Ext.get('approvalIsNotAgree').dom.style.display='inline';
	}

	// 如果设置到panel的config里，页面会闪现两个面板，所以加到这里
	myApproveMain.card2.setActiveTab(0);
	// myApproveMain.card3.items.get(1).show();
}

Ext.onReady(myApproveMain.init, myApproveMain)
Ext.onReady(function() {
			if (Ext.isReady) {
				var record = window.parent.getMenu.title_record;
				if (record != null && record != undefined) {
                    var s=record.data.approvalType
                    if(Ext.isEmpty(s))
                    {
                        record.data.approvalType="StepByStep";
                    }
					myApproveMain.goSubmitApprove(record.data.examinertype,
							record.data.approveNote, record.data.ID,
							record.data.approveStatus,
							record.data.flowinstanceID, record.data.objectType,
							record.data.examiner,
							record.data.activityInstanceID,
							record.data.objectId, record.data.approvalType,record.data.approveVeiw);
				}
				window.parent.getMenu.title_record = null;
			}
		});

/** 修改为tab页形式的代码
window.parent.onMyApproveDetails = function() {
	var record = window.parent.getMenu.title_record;
	if (record != null && record != undefined) {
        var s=record.data.approvalType
        if(Ext.isEmpty(s)) {
            record.data.approvalType="StepByStep";
        }
		myApproveMain.goSubmitApprove(record.data.examinertype,
			record.data.approveNote, record.data.ID,
			record.data.approveStatus,
			record.data.flowinstanceID, record.data.objectType,
			record.data.examiner,
			record.data.activityInstanceID,
			record.data.objectId, record.data.approvalType,record.data.approveVeiw);
	} else {
		myApproveMain.mainPanel.getLayout().setActiveItem(0);
		myApproveCard1.centerPanel.getStore().reload();
	}
	window.parent.getMenu.title_record = null;
}

Ext.onReady(myApproveMain.init, myApproveMain)
Ext.onReady(function() {
	if (Ext.isReady) {
		window.parent.onMyApproveDetails();
	}
});
*/