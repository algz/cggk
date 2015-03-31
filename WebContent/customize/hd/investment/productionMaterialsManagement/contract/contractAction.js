var contractAction = {};

contractAction.showContractDetail = function(id,type) {
	contractMain.contractId = id;
	var tab = Ext.getCmp('contractTab');
	var contractForm = null;
	var store = null;
	var record = common.selectObj[0];
	if(record.get('applicationStatus') == '编制中' || record.get('applicationStatus') == '待审批'){
		tab.getLayout().setActiveItem(1);
		contractForm = Ext.getCmp('contractFormId1');
		var card = Ext.getCmp('card02');
		type == 'N' ? card.getLayout().setActiveItem(0) : card.getLayout().setActiveItem(1);
		store = (type == 'N') ? Ext.getCmp('procurementDetailGridId11').getStore() 
					: Ext.getCmp('procurementDetailGridId12').getStore();
					if(record.get('applicationStatus') == '编制中'){
						Ext.getCmp('form-file').disable();
					}else
						Ext.getCmp('form-file').enable();
	}else{
		tab.getLayout().setActiveItem(2);
		contractForm = Ext.getCmp('contractFormId2');
		var card = Ext.getCmp('card03');
		type == 'N' ? card.getLayout().setActiveItem(0) : card.getLayout().setActiveItem(1);
		store = (type == 'N') ? Ext.getCmp('procurementDetailGridId21').getStore() 
					: Ext.getCmp('procurementDetailGridId22').getStore();
	}
	contractForm.getForm().loadRecord(record);
	store.baseParams = {start:0, limit:20, contractId:record.get('procurementContractId')};
	store.load();	
}

contractAction.showContractMaterialDetail = function(id, type) {
	var win = contractBookData.gridWin(type);
	var store = Ext.getCmp('contractBookDetailDataGrid').getStore();
	store.baseParams = {start:0, limit:20, contractId:id};
	store.load();
	win.show();	
}

contractAction.submitContract = function(){
	var records = common.selectObj;
	if(records == null){
		Ext.Msg.alert('提示','请选择你要送审的合同！');
		return ;
	}
	if(records.length>1){
		Ext.Msg.alert('提示','请选择一个合同！');
		return ;
	}
	for(var i=0;i<records.length;i++){
		var status = records[i].get('applicationStatus');
		if(status != '待审批'){
			Ext.Msg.alert('提示','只能选择待审批状态的合同！');
			return ;
		}
	}
	
	Ext.MessageBox.confirm('合同送审', 
			'合同送审，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			
			var arr = new Array();
			var id = "";
			for(var i=0;i<records.length;i++){
				arr.push(records[i].get('procurementContractId'));
				id+=records[i].get('procurementContractId')+",";
			}
			var flowID = privilegeValidate.getFlowID('3');
			if(flowID=="")
			{
				Ext.Msg.alert('提示', '没有送审权限！');
				return ;
			}
			approvePanel.submit(flowID, "合同审批", "合同审批", id.substring(0,id.length-1), 
					"Contract", true, approvePanelSuccess, approvePanelFailure); 
		}
	});
}

function approvePanelSuccess(){
	var remote = Seam.Component.getInstance("contract_ProcurementContractRemote");
	var rows = Ext.getCmp("auditListGrid").getSelectionModel().getSelections();
	var arr = new Array();
	for(var i=0;i<rows.length;i++){
		arr.push(rows[i].get('procurementContractId'));
	}
	remote.setContractProperties(arr, function(result){
		if(result == "{success:true}"){
			for(i=0;i<rows.length;i++){
				rows[i].set('applicationStatus','审批中');
			}
		}
	});
}

function approvePanelFailure(){
	Ext.Msg.alert('提示', '没有送审权限！');
}

contractAction.findByCreateType = function(createType){
	var store = Ext.getCmp('contractCheckSignPanelId').getStore();
	store.baseParams = {start:0, limit:20, createType:createType};
	store.load();
}

//回调
contractAction.callBack = function(r){
	if(r){
		common.gridPanel.refush();
	} else {
		Ext.Msg.alert('提示','服务器忙，请稍候重试！');
	}
}

//搜索
contractAction.search = function() {
	var materialType = document.getElementById('materialType').value;
	var createType = Ext.getCmp('selectType').getValue(); 
	var grid = Ext.getCmp('contractCheckSignPanelId');
	grid.getStore().baseParams = {
		start : 0,
		limit : 20,
		materialType : materialType,
		 createType:createType
	};
	grid.store.load();
}

contractAction.searchBook = function() {
	var searchWin = contractView.conractBookSearchWindow();
	searchWin.show();
}

contractAction.addContractBook = function(){
	var records = common.selectObj;
	var records = Ext.getCmp('auditListGrid').getSelectionModel().getSelections();
	if(records == null){
		Ext.Msg.alert('提示','请选择你要生成台帐的合同');
		return ;
	}
	var contractIds = '';
	for(var i=0;i<records.length;i++){
		var status = records[i].get('applicationStatus');
		if(status != '已审批'){
			Ext.Msg.alert('提示','只能选择已审批状态的合同');
			return ;
		}else if(status == '已审批'){
			if(contractIds == '') contractIds += records[i].get('procurementContractId');
			else contractIds += ','+records[i].get('procurementContractId');			
		}
	}
	contractAction.addContractBookForm(contractIds);	
}
contractAction.addContractBookForm = function(procurementContractId){

		var inform = new Ext.FormPanel({
			id : 'contractBookFrom',
//			width : 340,
//			height : 104,
			buttonAlign : 'center',
			labelAlign : 'left',
			labelWidth : 80,
			padding : 5,
			autoScroll : true,
			items : [new Ext.form.DateField( {
			    invalidText : '合同签订日期不能为空,输入格式为Y-m-d',
			    xtype : 'datefield',
				fieldLabel : '合同签订日期',
				id : "signDate",
				name:"signDate",
				format : 'Y-m-d',
				allowBlank : false,
				anchor : '98%'
			} ),{
		    	   xtype : 'hidden',
		    	   name :'procurementContractId',
		    	   id : 'procurementContractId',
		    	   value : procurementContractId
		       }]
		});
		var buttons = [{
			text : ' 确定 ',
			handler : function(){
				if(inform.form.isValid()) {
					inform.form.doAction('submit',{
						waitMsg:'正在保存数据，请稍候...',
						waitTitle:'提示',
						url : '../JSON/contract_ProcurementContractBookRemote.addContractBook',
						method : 'post',
						success : function(form, action) {
							Ext.Msg.alert('提示','生成合同台账成功！');
							form.reset();
							win.close();
							Ext.getCmp('contractCheckSignPanelId').getStore().reload();
							Ext.getCmp('contractManagerPanelId').getStore().reload();
						}
					})
				}
			}
		}, {
			text : '取消',
			handler : function() {
				inform.getForm().reset();
				win.close();
			}			
		}]
		var win = new Ext.Window({
			id : "contractWind",
			width : 340,
			height : 50,
//			layout : 'fit',
			title : '生成合同台账',
			modal : true,
			items : inform,
			buttons:buttons
		});
		
		win.show();
}

contractAction.showFlowInstance = function(id){
	var flowViewWindow = new FlowViewWindow();
	flowViewWindow.viewFlowInstanceByObject(id, "Contract");;
}

contractAction.downloadFile = function(procurementContractId){
	Ext.Ajax.request({
		url : '../ContractDownloadServlet',
		params : {
			procurementContractId:procurementContractId,
			checked:false
		},
		callback : function(options, success, response){
			var failure = Ext.util.JSON.decode(response.responseText).failure;
			if(failure){
				Ext.Msg.alert('提示','文件不存在，请核实后再操作！');
			}else{
				var inputs = '<input type="hidden" name="procurementContractId" value="'+procurementContractId+'"/>'
				+ '<input type="hidden" name="checked" value="true"/>';
				$('<form action="../ContractDownloadServlet" method="get">'+inputs+'</form>')
					.appendTo('body').submit().remove();
			}
		}
	});
}
contractAction.createContract = function(){
	var record = Ext.getCmp('auditListGrid').getSelectionModel().getSelected();//common.selectObj;
	var modelType =  Ext.getCmp('modelType').getValue(); 
	if(modelType==""){
		Ext.Msg.alert('提示','请选择合同模板');
		return ;
	}
	if(record == null){
		Ext.Msg.alert('提示','请选择合同信息');
		return ;
	}/*else if(record.length>1){
		Ext.Msg.alert('提示','请选择一个合同信息');
		return ;
	}*/else if(record.get('applicationStatus')=="编制中")
	{
		Ext.Msg.alert('提示','请选择已经编辑过的合同');
		return ;
	}
 	var inputs = '<input type="hidden" name="procurementContractId" value="'+record.get("procurementContractId")+'"/>'
 						+ '<input type="hidden" name="modelType" value="'+encodeURI(modelType,"UTF-8")+'"/>';
						$('<form action="../createContractFileServlet" method="post">'+inputs+'</form>')
							.appendTo('body').submit().remove();
}