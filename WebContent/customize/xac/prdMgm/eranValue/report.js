Ext.util.CSS.swapStyleSheet("theme", "../css/report.css");
var excelType;
var report = {};
var XX = {};
var Budgetpvac = {
	"plandesign" : 0,
	"planmaterial" : 0
};
function clear(str) {

	var newStr = "";
	for ( var i = 0; i < str.length; i++) {
		if (str.charAt(i) != ",") {
			newStr += str.charAt(i);
		}
	}
	return newStr;
}
var covertNum = function(str) {
	if(str==""){
		Ext.MessageBox.show({
	           title: '错误',
	           msg: '不能为空值！',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       });
		return;
	};
	return Number(clear(str));
}

report.view = function() {
	return {
		html : function(id, taskId, pvac, name,isHis) {
		
			return reportView(id, taskId, pvac, name,isHis);
		}
	}
}();

var reportView = function(id, taskId, pvac, name,isHis) {

	var htmls;

//	如果从项目生成则不进行报表展示
	if(taskId.substr(0,1) == "p" || taskId == 0){
		return;
	}
	Ext.Ajax.request( {
		url : '../seam/resource/templates?a=' + new Date(),
		method : 'post',
		params : {
			reportName : name,
			id : taskId,
			pvac : pvac,
			isHist :isHis
		},
		waitMsg : "正在生成报表...",
		disableCaching : true,
		autoAbort : true,
		success : function(resp, opts) {
			var respText = Ext.util.JSON.decode(resp.responseText);
			htmls = respText.result;
			
				Ext.getCmp(id).getEl().dom.innerHTML = htmls;
			
		
			
			return htmls;
		},
		failure : function(resp, opts) {
			var respText = Ext.util.JSON.decode(resp.responseText);
			XX.common.msg('错误', "<font color=red>生成报表失败，请联系管理员！<br>错误信息:"+respText.msg+"</font>");
		}
	});

}

/**
 * 判断是否为控制项目或项目包 ,如果不是,则报Tab不可用
 * @return
 */
var viewTab = function(){
	var results = Seam.Component.getInstance("budgetPvAcRemote")
	.isControlAndPackage(leftNavigationTree.nodeId,function(data){
		if(data){
			analysisTabPanel.T1.enable();
			analysisTabPanel.T2.enable();
			analysisTabPanel.T3.enable();
			analysisTabPanel.T4.enable();
			analysisTabPanel.T5.enable();
			analysisTabPanel.T6.enable();
	}else{
		
			analysisTabPanel.T1.setDisabled(true);
			analysisTabPanel.T2.setDisabled(true);
			analysisTabPanel.T3.setDisabled(true);
			analysisTabPanel.T4.setDisabled(true);
			analysisTabPanel.T5.setDisabled(true);
			analysisTabPanel.T6.setDisabled(true);
	}
		
	});
	
	
	
	
}
report.btn = function() {
	return {

		savePv : function() {

			var infoList = new Array();
			var size = $("#size").val();

			for ( var i = 0; i < size; i++) {
				var budgetpvac = Seam.Remoting
						.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");

				budgetpvac.setId(covertNum($("#id" + i).val()));
				budgetpvac.setPlandesign(covertNum($("#plandesign" + i).val()));
				budgetpvac.setPlanmaterial(covertNum($("#planmateria" + i)
						.val()));
				budgetpvac.setPlanexperiment(covertNum($("#planexperiment" + i)
						.val()));
				budgetpvac.setPlanappropriation(covertNum($(
						"#planappropriation" + i).val()));
				budgetpvac.setPlanoutsidehelp(covertNum($(
						"#planoutsidehelp" + i).val()));
				budgetpvac.setPlanfixedassets(covertNum($(
						"#planfixedassets" + i).val()));
				budgetpvac.setPlanewages(covertNum($("#planewages" + i).val()));
				budgetpvac.setPlanmanage(covertNum($("#planmanage" + i).val()));
				budgetpvac.setPlanmonthtotal(covertNum($("#planmonthtotal" + i)
						.val()));
				budgetpvac.setHis(false);
				infoList[i] = budgetpvac;

			}
			var report = Seam.Remoting
					.createType("com.sysware.customize.xac.analysis.vo.BudgetReport");
			var total = Seam.Remoting
					.createType("com.sysware.customize.xac.analysis.vo.BudgetTotalVo");

			// 保存总计
			total.setDesign(covertNum($("#totalplandesign").val()));
			total.setMaterial(covertNum($("#totalplanmateria").val()));
			total.setExperiment(covertNum($("#totalplanexperiment").val()));
			total.setAppropriation(covertNum($("#totalplanappropriation").val()));
			total.setOutsidehelp(covertNum($("#totalplanoutsidehelp").val()));
			total.setFixedassets(covertNum($("#totalplanfixedassets").val()));
			total.setWages(covertNum($("#totalplanewages").val()));
			total.setManage(covertNum($("#totalplanmanage").val()));
			total.setMonthtotal(covertNum($("#totalplanmonthtotal").val()));
			total.setPvac(covertNum($("#pvac").val()));
			total.setIdStr(covertNum($("#idStr").val()));

			report.setPvacs(infoList);
			report.setTotal(total);
			var results = Seam.Component.getInstance("budgetPvAcRemote")
					.updatePVReport(report,function(data){
						if (data) {
							XX.common.msg('提示', '保存成功!');
							
						}else{
							XX.common.msg('提示', '<font color=red>保存失败!</font>');
						}
						
						
					});

			reportView('tabPv1',leftNavigationTree.nodeId,'1','/xac/pv.html',false);
		},
		savaAc : function() {
			var infoList = new Array();
			var size = $("#size").val();
			var budgetpvac = Seam.Remoting
			.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
			budgetpvac.setId(covertNum($("#id" ).val()));
			budgetpvac.setPlandesign(covertNum($("#plandesign1").val()));
			budgetpvac.setPlanmaterial(covertNum($("#planmateria1")
					.val()));
			budgetpvac.setPlanexperiment(covertNum($("#planexperiment1")
					.val()));
			budgetpvac.setPlanappropriation(covertNum($(
					"#planappropriation1").val()));
			budgetpvac.setPlanoutsidehelp(covertNum($(
					"#planoutsidehelp1" ).val()));
			budgetpvac.setPlanfixedassets(covertNum($(
					"#planfixedassets1").val()));
			budgetpvac.setPlanewages(covertNum($("#planewages1").val()));
			budgetpvac.setPlanmanage(covertNum($("#planmanage1").val()));
			budgetpvac.setPlanmonthtotal(covertNum($("#planmonthtotal1")
					.val()));


			budgetpvac.setActualdesign(covertNum($("#actualdesign1").val()));
			budgetpvac.setActualmaterial(covertNum($("#actualmaterial1")
					.val()));
			budgetpvac.setActualexperiment(covertNum($("#actualexperiment1")
					.val()));
			budgetpvac.setActualappropriation(covertNum($(
					"#actualappropriation1").val()));
			budgetpvac.setActualoutsidehelp(covertNum($(
					"#actualoutsidehelp1" ).val()));
			budgetpvac.setActualfixedassets(covertNum($(
					"#actualfixedassets1").val()));
			budgetpvac.setActualwages(covertNum($("#actualwages1").val()));
			budgetpvac.setActualmanage(covertNum($("#actualmanage1").val()));
			budgetpvac.setActualmonthtotal(covertNum($("#actualmonthtotal1")
					.val()));
			budgetpvac.setHis(false);
			
			var serial = Seam.Remoting
			.createType("com.sysware.customize.xac.analysis.enity.BudgetSerialNumber");
			serial.setId(covertNum($("#serialnumberId").val()));
			serial.setDesign($("#serialnumber0").val());
			serial.setMaterial($("#serialnumber1").val());
			serial.setExperiment($("#serialnumber2").val());
			serial.setAppropriation($("#serialnumber3").val());
			serial.setOutsidehelp($("#serialnumber4").val());
			serial.setFixedassets($("#serialnumber5").val());
			serial.setEwages($("#serialnumber6").val());
			serial.setManage($("#serialnumber7").val());
			budgetpvac.setSerialNum(serial);
			Seam.Component.getInstance("budgetPvAcRemote")
			.updateACReport(budgetpvac,function(data){
				if (data) {
					XX.common.msg('提示', '保存成功!');
				}else{
					XX.common.msg('提示', '<font color=red>保存失败!</font>');
				}
				
				
			});
			report.view.html('tabAc1',leftNavigationTree.nodeId,'2','/xac/ac.html',false);
		},
		savaStatus:function(){
			var infoList = new Array();
			var size = $("#size").val();
			var sizeStatus = $("#sizeStatus").val();
			var budgetpvac = Seam.Remoting
			.createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
			var status = Seam.Remoting
			.createType("com.sysware.customize.xac.analysis.vo.BudgetStatusVo");
			for ( var i = 0; i < size; i++) {
				for(var a = 0; a < sizeStatus; a++){
					var st = Seam.Remoting
					.createType("com.sysware.customize.xac.analysis.enity.BudgetStatus");
					st.setId(covertNum($("#id"+a).val()));
					st.setContext($("#context"+a).val());
					st.setFinished($("#finished"+a).val());
					
					st.setEv(covertNum($("#ev"+i).val()));
					st.setBac(covertNum($("#bac"+i).val()));
					st.setSum(covertNum($("#sum"+i).val()));
					infoList[a] = st;
				}	
//				for(var x = 0; x < sizeStatus; x ++){
//					var st = infoList[x];
//					st.setEv(covertNum($("#ev"+i).val()));
//					st.setBac(covertNum($("#bac"+i).val()));
//					st.setSum(covertNum($("#sum"+i).val()));
//					infoList[x]=st;
//				}
			}
			budgetpvac.setHis(false);
			status.setStatus(infoList);
			budgetpvac.setStatus(status);
			
			var results = Seam.Component.getInstance("budgetPvAcRemote")
			.updateStatusReport(budgetpvac,function(data){
				if (data) {
					XX.common.msg('提示', '保存成功!');
					
				}else{
					XX.common.msg('提示', '<font color=red>保存失败!</font>');
				}
				
				report.view.html('tabStatus',leftNavigationTree.nodeId,'3','/xac/status.html',false);
			});
		},
		openHis:function(id, taskId, pvac, name,isHis){
			report.view.html(id, taskId, pvac, name,isHis);
		}
	}
}();

XX.common = function() {
	var msgCt;

	function createBox(t, s) {
		return [
				'<div class="msg">',
				'<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
				'<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>',
				t,
				'</h3>',
				s,
				'</div></div></div>',
				'<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
				'</div>' ].join('');
	}
	return {
		msg : function(title, format) {
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(document.body, {
					id : 'msg-div'
				}, true);
			}
			msgCt.alignTo(document, 't-t');
			var s = String.format.apply(String, Array.prototype.slice.call(
					arguments, 1));
			var m = Ext.DomHelper.append(msgCt, {
				html : createBox(title, s)
			}, true);
			m.slideIn('t').pause(1).ghost("t", {
				remove : true
			});
		},
		init : function() {

		}

	};
}();