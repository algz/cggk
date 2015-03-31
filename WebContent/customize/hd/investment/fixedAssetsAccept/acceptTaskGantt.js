var acceptTaskGantt = {};

acceptTaskGantt.chart = function(acceptId){
	var html = '<div id="acceptTaskGantt" align="center"></div>';
	
//	var theXml = "<chart caption=\"Monthly Unit Sales\" xAxisName=\"Month\" yAxisName=\"Units\" showValues=\"0\" decimals=\"0\" formatNumberScale=\"0\" chartRightMargin=\"30\">"
//				  +"<set label=\"Jan\" value=\"462\" />" 
//				  +"<set label=\"Feb\" value=\"857\" />" 
//				  +"<set label=\"Mar\" value=\"671\" />" 
//				  +"<set label=\"Apr\" value=\"494\" />" 
//				  +"<set label=\"May\" value=\"761\" />"
//				  +"<set label=\"Jun\" value=\"960\" />" 
//				  +"<set label=\"Jul\" value=\"629\" />" 
//				  +"</chart>";
	acceptTaskGantt.panel = new Ext.Panel({
		layout:'fit',
		html:html
	})
	
	acceptTaskGantt.win = new Ext.Window({
		title:'项目进度图',
		width:450,
		minWidth:450,
		autoHeight:true,
		modal:true,
		constrain:true,
		constrainHeader:true,
		items:[acceptTaskGantt.panel],
		buttonAlign:'center',
		buttons:[{
			text:'关闭',
			handler:function(){
				acceptTaskGantt.win.close();
			}
		}]
	});
	
	acceptTaskGantt.win.show();
	
	Ext.Ajax.request({
		url:'../JSON/AcceptTaskRemote.getProjectPlan',
		method:'POST',
		failure:function(){
			Ext.MessageBox.show({
						title : '提示信息',
						msg : '获取后台数据失败！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		},
		success:function(response,options){
			var result = response.responseText;
			//当弹窗加载显示以后才存在编号信息，才能进行赋值操作
			var chart2 = new FusionCharts("../fusioncharts/Charts/Bar2D.swf", "ChId2", "450", "200", "0", "0"); 
			chart2.setDataXML(result); 
			chart2.render("acceptTaskGantt");
		},
		disableCaching:true,
		autoAbort:true,
		params:{
			acceptId:acceptId
		}
	});
}