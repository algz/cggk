var piechartPanelForPlanTypeInspect = {
	startTime:null,
	endTime:null
};

piechartPanelForPlanTypeInspect.quantityAndAmote = function(){
	var quantityHtml = '<div id="quantityId"></div>'
	var html = '<div id="amoteId"></div>';
	Ext.Ajax.request({
		url:'../JSON/PlanTypeInspectRemote.GetQuantityAndAmote',
		method:'POST',
		success:function(response,options){
			var result = response.responseText.split('|');
			var chart2 = new FusionCharts("../fusioncharts/Charts/Pie3D.swf", "ChId2", "400", "300", "0", "0"); 
			chart2.setDataXML(result[0]); 
			chart2.render("quantityId");
			
			var chart1 = new FusionCharts("../fusioncharts/Charts/Pie3D.swf", "ChId1", "400", "300", "0", "0"); 
			chart1.setDataXML(result[1]); 
			chart1.render("amoteId");
		},
		disableCaching:true,
		autoAbort:true,
		params:{
			dateStart:piechartPanelForPlanTypeInspect.startTime,
			dateEnd:piechartPanelForPlanTypeInspect.endTime
		}
	});
	
	var quantity = new Ext.Panel({
		title:'项数',
		layout:'fit',
		region:'center',
		html:quantityHtml
	})
	
	var amote = new Ext.Panel({
		title:'金额',
		width:400,
		region:'west',
		html:html
	})
	
	var panel = new Ext.Panel({
		title:'计划类别监控图像分析界面',
		layout:'border',
		height:310,
		x:200,
		y:20,
		anchor:'80% 60%',
		items:[amote,quantity]
	})
	
	return panel;
}



piechartPanelForPlanTypeInspect.init = function() {
	//获取点击弹出本页面的值
	piechartPanelForPlanTypeInspect.startTime=window.opener.window.sTime;
	piechartPanelForPlanTypeInspect.endTime=window.opener.window.eTime;
	
	var view = new Ext.Viewport({
		layout : 'absolute',
		height:310,
		autoScroll:true,
		id : 'piechartPanelForPlanTypeInspectPanel',
		items :[piechartPanelForPlanTypeInspect.quantityAndAmote()]
	});	
};

Ext.onReady(piechartPanelForPlanTypeInspect.init, piechartPanelForPlanTypeInspect, true);