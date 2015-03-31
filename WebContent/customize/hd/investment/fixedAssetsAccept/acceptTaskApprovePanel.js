var acceptTaskApprovePanel = {};

acceptTaskApprovePanel.approve = function(flowId,name,id,objectType){
	var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
		//判断是否有勾选
		if(records.length==0){
			Ext.MessageBox.show({
								title : '提示信息',
								msg : '必须有勾选内容才能进行此操作！',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
		}else{
			Ext.MessageBox.confirm('送审', 
					'送审以后不能再编辑，是否继续？　', function(btn, text){
				if(btn == 'yes'){
					var flag=0;
					//根据状态判断当前是进行的哪一步送审
					if(records[0].get('acceptState')==4){
						flag=5;
					}else if(records[0].get('acceptState')==7){
						flag=8;
					}
					approvePanel.submit(flowId, name, name, id+flag, 
								objectType, true, acceptTaskApprovePanel.acceptPanelSuccess(), approvePanelFailure); 
				}
			});
		}
}

acceptTaskApprovePanel.approvePayment = function(flowId,name,objectType,selectType){
	var records = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
	//判断是否有勾选
	if(records.length==0){
		Ext.MessageBox.show({
			title : '提示信息',
			msg : '必须有勾选内容才能进行此操作！',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}else{
		var status = 0;
		for(var i=0;i<records.length;i++){
			if(records[i].get('psState')!=1)
				status = status + 1;
		}
		
		if(status>0){
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '只有“编制中”的任务才能做“送审”的操作！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return;
		}
		var ids = '';
		var device_group_ids='';
		var device_stock_ids='';
		var engineering_group_ids='';
		var engineering_stock_ids='';alert(selectType)
		for(var i=0;i<records.length;i++){
			if(selectType==1||selectType==3){
				//机电设备
				if(records[i].get('psType')==1){
					//股份
					device_stock_ids+=','+records[i].get('psId')+records[i].get('psType');
				}else{
					//集团
					device_group_ids+=','+records[i].get('psId')+records[i].get('psType');
				}
			}else if(selectType==2||selectType==4){
				//土建工程
				if(records[i].get('psType')==1){
					//股份
					engineering_stock_ids+=','+records[i].get('psId')+records[i].get('psType');
				}else{
					//集团
					engineering_group_ids+=','+records[i].get('psId')+records[i].get('psType');
				}
			}
			
//			ids = ids + ',' + records[i].get('psId');
//			if(records[i].get('psType')==1)
//				ids = ids + 1;
//			if(records[i].get('psType')==2)
//				ids = ids + 2;
		}
		Ext.MessageBox.confirm('送审', 
				'送审以后不能再编辑，是否继续？　', function(btn, text){
			if(btn == 'yes'){
				if(device_stock_ids!=''){
					approvePanel.submit('472155', '机电设备支付审批(股份)', name, device_stock_ids.substring(1), 
							objectType, true, acceptTaskApprovePanel.paymentPanelSuccess, approvePanelFailure); 
				}
				if(device_group_ids!=''){
					approvePanel.submit('472263', '机电设备支付审批(集团)', name, device_group_ids.substring(1), 
							objectType, true, acceptTaskApprovePanel.paymentPanelSuccess, approvePanelFailure); 
				}
				if(engineering_stock_ids!=''){
					approvePanel.submit('472156', '土建工程支付审批(股份)', name, engineering_stock_ids.substring(1), 
							objectType, true, acceptTaskApprovePanel.paymentPanelSuccess, approvePanelFailure); 
				}
				if(engineering_group_ids!=''){
					approvePanel.submit('472200', '土建工程支付审批(集团)', name, engineering_group_ids.substring(1), 
							objectType, true, acceptTaskApprovePanel.paymentPanelSuccess, approvePanelFailure); 
				
				}
			}
		});
	}
}

/**
 * 送审成功后的操作
 */
function approvePanelSuccess(){ 
   acceptTaskApprovePanel.approvePanelSuccess();
}

acceptTaskApprovePanel.acceptPanelSuccess = function(){
	var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
	var ids=records[0].get('acceptId');
	var state=records[0].get('acceptState');
	if(state == 4)
		state=5
	if(state == 7)
		state=8
   	Ext.Ajax.request({
		url:'../JSON/AcceptTaskRemote.updateAcceptTaskSatate',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			//刷新表格数据操作
			var acceptTaskGridStroe = Ext.getCmp('acceptTaskGrid').store
			//起始数
			var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
			//每页显示总数
			var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
			//添加默认参数
			acceptTaskGridStroe.baseParams.acceptNum=acceptTask.selectNum.getValue();
			acceptTaskGridStroe.baseParams.startTime=acceptTask.startTime.getValue();
			acceptTaskGridStroe.baseParams.endTime=acceptTask.endTime.getValue();
			acceptTaskGridStroe.load({
				params:{
					start:start,
					limit:limit
				}
			});
			if(state==5)
				testCourse.win.close();
			else if(state==8)
				assetConnect.win.close();
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			acceptIds:ids,
			acceptState:state
		}
	});
}

acceptTaskApprovePanel.paymentPanelSuccess = function(){

	var psRecords = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
		var psIds = '';
		for(var i=0;i<psRecords.length;i++){
			psIds = psIds + ',' + psRecords[i].get('psId');
			if(psRecords[i].get('psType')==1)
				psIds = psIds + 1;
			if(psRecords[i].get('psType')==2)
				psIds = psIds + 2;
		}
		
		Ext.Ajax.request({
		url:'../JSON/StockPaymentTaskRemote.UpdateState',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response, options){
			var store1 = Ext.getCmp('paymentTaskGrid').store;
			//起始数
			var start = Ext.getCmp('paymentTaskGrid').getBottomToolbar().cursor;
			//每页显示总数
			var limit = Ext.getCmp('paymentTaskGrid').getBottomToolbar().pageSize;
			//添加默认参数
			store1.baseParams.psId=paymentTask.selectNum.getValue();
			store1.baseParams.term=paymentTask.paymentTaskMoney().getRawValue();
			store1.baseParams.money=paymentTask.selectMuchMoney.getValue();
			//刷新表格
			store1.reload({
				params:{
					start:start,
					limit:limit
				}
			});
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			psId:psIds.substring(1)
		}
	});
}

acceptTaskApprovePanel.approvePanelSuccess = function(){ 
	if(Ext.getCmp('fixedAssetsAcceptTab').activeTab==Ext.getCmp('fixedAssetsAcceptTab').items.items[0]){
		var records = Ext.getCmp('acceptTaskGrid').getSelectionModel().getSelections();
		var ids=records[0].get('acceptId');
		var state=records[0].get('acceptState');
		if(state == 4)
			state=5
		if(state == 7)
			state=8
	   	Ext.Ajax.request({
			url:'../JSON/AcceptTaskRemote.updateAcceptTaskSatate',
			method:'POST',
			failure:function(){
				Ext.MessageBox.show({
							title : '提示信息',
							msg : '获取后台数据失败！',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
			},
			success:function(response, options){
				var result = Ext.util.JSON.decode(response.responseText);
				//刷新表格数据操作
				var acceptTaskGridStroe = Ext.getCmp('acceptTaskGrid').store
				//起始数
				var start = Ext.getCmp('acceptTaskGrid').getBottomToolbar().cursor;
				//每页显示总数
				var limit = Ext.getCmp('acceptTaskGrid').getBottomToolbar().pageSize;
				//添加默认参数
				acceptTaskGridStroe.baseParams.acceptNum=acceptTask.selectNum.getValue();
				acceptTaskGridStroe.baseParams.startTime=acceptTask.startTime.getValue();
				acceptTaskGridStroe.baseParams.endTime=acceptTask.endTime.getValue();
				acceptTaskGridStroe.load({
					params:{
						start:start,
						limit:limit
					}
				});
				if(state==5)
					testCourse.win.close();
				else if(state==8)
					assetConnect.win.close();
			},
			disableCaching : true,
			autoAbort : true,
			params:{
				acceptIds:ids,
				acceptState:state
			}
		});
	}else{
		var psRecords = Ext.getCmp('paymentTaskGrid').getSelectionModel().getSelections();
		var psIds = '';
		for(var i=0;i<psRecords.length;i++){
			psIds = psIds + ',' + psRecords[i].get('psId');
			if(psRecords[i].get('psType')==1)
				psIds = psIds + 1;
			if(psRecords[i].get('psType')==2)
				psIds = psIds + 2;
		}
		
		Ext.Ajax.request({
		url:'../JSON/StockPaymentTaskRemote.UpdateState',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response, options){
			var store1 = Ext.getCmp('paymentTaskGrid').store;
			//起始数
			var start = Ext.getCmp('paymentTaskGrid').getBottomToolbar().cursor;
			//每页显示总数
			var limit = Ext.getCmp('paymentTaskGrid').getBottomToolbar().pageSize;
			//添加默认参数
			store1.baseParams.psId=paymentTask.selectNum.getValue();
			store1.baseParams.term=paymentTask.paymentTaskMoney().getRawValue();
			store1.baseParams.money=paymentTask.selectMuchMoney.getValue();
			//刷新表格
			store1.reload({
				params:{
					start:start,
					limit:limit
				}
			});
		},
		disableCaching : true,
		autoAbort : true,
		params:{
			psId:psIds.substring(1)
		}
	});
	}
}



/**
 * 送审失败的操作
 */
function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
} 