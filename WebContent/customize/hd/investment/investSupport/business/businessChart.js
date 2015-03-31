var businessChart = {
	startTime:null,
	endTime:null
};

businessChart.getBar = function(flag) {

	var startTime = function() {
		var strartTime1 = new Ext.form.DateField({
					name : 'startTime1'+flag,
					id : 'startTime1'+flag,
					emptyText : '开始时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime1.on('select', function() {
					//aofoInfoGrid.queryParams.statTime1 = Ext.getCmp("startTime1"+flag).getValue();
				});
		return strartTime1;
	}

	var endTime = function() {
		var strartTime2 = new Ext.form.DateField({
					name : 'endTime1'+flag,
					id : 'endTime1'+flag,
					emptyText : '结束时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime2.on('select', function() {
				//aofoInfoGrid.queryParams.statTime2 = Ext.getCmp("endTime1"+flag).getValue();
				});
		return strartTime2;
	}
	
	var queryButtion = function() {
		var btn = new Ext.Button({
					text : '查询',
					iconCls : 'search1',
					handler : function() {
					}
				});
		return btn;
	}
	

	var tbar = new Ext.Toolbar({
				items : ['<span style="padding-left:25px;"></span>开始时间:', startTime(), '&nbsp;&nbsp;结束时间:', endTime(),queryButtion()]
			})

	return tbar;
}

businessChart.theChart= function(){
	var html = '<div id="businessChartId"></div>';
	Ext.Ajax.request({
		url:'../JSON/businessRemote.GetBusinessChart',
		method:'POST',
		success:function(response,options){
			alert(response.responseText)
			
			var chart = new FusionCharts("../fusioncharts/Charts/ScrollCombiDY2D.swf", "ChId1", "400", "300", "0", "0"); 
			chart.setDataXML(response.responseText); 
			chart.render("businessChartId");
		},
		disableCaching:true,
		autoAbort:true,
		params:{
//			dateStart:businessChart.startTime,
			name:'aaaaa'
		}
	});
	
	var amote = new Ext.Panel({
//		title:'金额',
		width:400,
		html:html
	})
	
	var panel = new Ext.Panel({
		title:'计划类别监控图像分析界面',
		layout:'fit',
		height:310,
		x:200,
		y:20,
		anchor:'80% 60%',
//		tbar:businessChart.getBar(),
		items:[amote]
	})
	
	return panel;
}