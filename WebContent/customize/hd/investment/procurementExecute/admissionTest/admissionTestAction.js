/**
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
var admissionTestAction = {};
admissionTestAction.save = function() {
	var grid = Ext.getCmp('admissionTestGridPanelId');
	var records = grid.getStore().getModifiedRecords();
	var arrivalCheckId = new Array();
	var ynStamped = new Array();
	var ynSpectro = new Array();
	var ynClean = new Array();
	var ynSeal = new Array();
	var ynCheck = new Array();
	var checkStatus = new Array();
	var sampling = new Array();
	var test = new Array();
	var sendSampling = new Array();
	var ynFlawDetection = new Array();
	var ynSpray = new Array();
	var remark = new Array();
	var physicalCommissioned = new Array();
	var testReport = new Array();
	var submissions = new Array();
	if (records.length > 0) {
		for (var i = 0; i < records.length; i++) {
			arrivalCheckId.push(records[i].get('arrivalCheckId'));
			ynStamped.push(records[i].get('ynStamped'));
			ynSpectro.push(records[i].get('ynSpectro'));
			ynClean.push(records[i].get('ynClean'));
			ynSeal.push(records[i].get('ynSeal'));
			ynCheck.push(records[i].get('ynCheck'));
			checkStatus.push(records[i].get('checkStatus'));
			sampling.push(records[i].get('sampling'));
			test.push(records[i].get('test'));
			sendSampling.push(records[i].get('sendSampling'));
			ynSpray.push(records[i].get('ynSpray'));
			remark.push(records[i].get('remark'));
			ynFlawDetection.push(records[i].get('ynFlawDetection'));
			testReport.push(records[i].get('testReport'));
			physicalCommissioned.push(records[i].get('physicalCommissioned'));
			submissions.push(records[i].get('submissions'));
		}
	} else {
		Ext.Msg.alert('提示', '数据未修改，无需保存！');
		return;
	}
	var remote = Seam.Component.getInstance("admissionTestRemote");
	remote.save(arrivalCheckId, checkStatus, ynStamped, ynSpectro, ynClean, ynSeal, ynCheck, sampling, test, sendSampling, ynSpray, remark, ynFlawDetection, physicalCommissioned,
			testReport, submissions, function(result) {
				Ext.Msg.alert('提示', '数据保存成功！');
				var grid = Ext.getCmp('admissionTestGridPanelId');
				grid.store.baseParams = {
					start : 0,
					limit : 20
				};
				grid.store.load();
			});
}
admissionTestAction.add = function(type) {
	var grid = Ext.getCmp('admissionTestGridPanelId');
	var records = grid.getSelectionModel().getSelections()
	if (records.length != 1) {
		Ext.Msg.alert('提示', '请选择一条信息！');
		return;
	}
	Ext.Ajax.request({
				url : '../JSON/admissionTestRemote.getCheckDetail?d=' + new Date(),
				method : 'POST',
				params : {
					checkType : type,
					arrivalCheckId : records[0].get("arrivalCheckId")
				},
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (type == "0") {
						physicalCommissioned.getForm('0', obj.data.checkDetailId, obj.data.objectNo, obj.data.objectName, obj.data.objectComment, records[0].get("arrivalCheckId"),
								records[0].get("contractCode"), records[0].get("itemCode"), records[0].get("contractName"), records[0].get("itemName")).show();
					} else if (type == "1") {
						testReport.getForm('1', obj.data.checkDetailId, obj.data.objectNo, obj.data.objectName, obj.data.objectComment, obj.data.objectResult,
								records[0].get("arrivalCheckId"), records[0].get("contractCode"), records[0].get("itemCode"), records[0].get("contractName"),
								records[0].get("itemName")).show();
					} else if (type == "2") {
						submissions.getForm('2', obj.data.checkDetailId, obj.data.objectNo, obj.data.objectName, obj.data.objectComment, obj.data.objectResult,
								records[0].get("arrivalCheckId"), records[0].get("contractCode"), records[0].get("itemCode"), records[0].get("contractName"),
								records[0].get("itemName"), obj.data.fileId, obj.data.fileName).show();
					} else if (type == "3") {
						returns.getForm('3', obj.data.checkDetailId, obj.data.objectNo, obj.data.objectName, obj.data.objectComment, records[0].get("arrivalCheckId"),
								records[0].get("contractCode"), records[0].get("itemCode"), records[0].get("contractName"), records[0].get("itemName")).show();
					} else if (type == "9") {
						restAssured.getForm('9', obj.data.checkDetailId, obj.data.objectNo, obj.data.objectName, obj.data.objectComment, records[0].get("arrivalCheckId"),
								records[0].get("contractCode"), records[0].get("itemCode"), records[0].get("contractName"), records[0].get("itemName"), obj.data.restAssuredDate,
								obj.data.restAssuredNumber).show();
					}
				},
				failure : function() {
					Ext.Msg.alert('提示', "服务器正忙");
				}
			});
}
//申请入库
admissionTestAction.applyIn = function() {
	var grid = Ext.getCmp('admissionTestGridPanelId');
	var records = grid.getSelectionModel().getSelections()
	if (records.length == 0) {
		Ext.Msg.alert('提示', '请选择信息！');
		return;
	} else {
		var arrivalCheckId = new Array();
		var arrivalCheckIds = "";

		for (var i = 0; i < records.length; i++) {
			arrivalCheckId.push(records[i].get('arrivalCheckId'));
			if (arrivalCheckIds != "")
				arrivalCheckIds += ","
			arrivalCheckIds += "'" + records[i].get('arrivalCheckId') + "'";
		}
	}
	Ext.Ajax.request({
				url : '../JSON/admissionTestRemote.getApplyIn?d=' + new Date(),
				method : 'POST',
				params : {
					arrivalCheckId : arrivalCheckIds
				},
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					storageApplication.getForm(obj.data.applyNo, obj.data.departmentName, obj.data.applyStorage, arrivalCheckId, arrivalCheckIds, obj.data.departmentId,
							obj.data.planPrice, obj.data.chkUserNo, obj.data.startJc, obj.data.ea, obj.data.certificateNo, obj.data.qualityCode, obj.data.endJc,
							records[0].get("lotNo"), records[0].get("contractCode"), records[0].get("vendorCode"), records[0].get("vendName"), obj.data.itemBillId).show();
				},
				failure : function() {
					Ext.Msg.alert('提示', "服务器正忙");
				}
			});

}
admissionTestAction.itemDataBillForm = function(lotNo, contractCode, vendorCode, vendName, id, qualityCode) {
	itemDataBillForm.getForm().show();
	Ext.getCmp("itemDataBillForm").form.doAction('load', {
				waitTitle : '加载编辑数据',
				waitMsg : '正在加载编辑数据',
				url : '../JSON/admissionTestRemote.getItemDataBillForm?d=' + new Date(),
				method : 'post',
				params : {
					supplyRegularNo : lotNo,
					orderNo : contractCode,
					vendorCode : vendorCode,
					vendorName : vendName,
					qualityCode : qualityCode,
					itemBillId : id
				},
				success : function(form, action) {
				}
			});
}
admissionTestAction.materialsReport = function() {
	var grid = Ext.getCmp('admissionTestGridPanelId');
	var records = grid.getSelectionModel().getSelections()
	if (records.length == 0) {
		Ext.Msg.alert('提示', '请选择信息！');
		return;
	} else {
		var arrivalCheckId = new Array();
		var arrivalCheckIds = "";
		for (var i = 0; i < records.length; i++) {
			arrivalCheckId.push(records[i].get('arrivalCheckId'));
			if (arrivalCheckIds != "")
				arrivalCheckIds += ","
			arrivalCheckIds += "'" + records[i].get('arrivalCheckId') + "'";
		}
	}
	materialsReport.gridPanel(arrivalCheckIds).show();
}
