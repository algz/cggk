var businessPic = {

	
}

var getBar = function(flag) {

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

businessPic.initHistory = function(code,name){
	
	var lastUrl = "../JSON/businessRemote.getHistoryPic?code="+code;
	var height = 350;
	var width = 850;
	
	var picPanel = new Ext.Panel({
		region : 'south',
		autoScroll : true,
		closable : true,
		layout : 'fit',
		id : "mypanel1",
		tbar : getBar(1),
		html : '<center><br/><br/><br/><table border="0"><tr><td><div id="picDiv11">'
			+ '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"'
			+ 'width="'
			+ width
			+ '" height="'
			+ height
			+ '" id="ie_chart" align="middle"> <param name="allowScriptAccess" value="always" /><param name="movie"	value="../customize/hd/investment/investSupport/business/flash.swf?width='
			+ width
			+ '&height='
			+ height
			+ '&data='
			+ lastUrl
			+ '" />'
			+ '<param name="quality" value="high" /><param name="wmode" value="Opaque"/><param name="bgcolor" value="#FFFFFF" /> <embed src="../customize/hd/investment/investSupport/business/flash.swf?data='
			+ lastUrl
			+ '" quality="high" bgcolor="#FFFFFF" width="'
			+ width
			+ '" height="'
			+ height
			+ ' name="chart" align="middle" allowScriptAccess="always"	type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" id="chart" /></object>'
			+ '</div></td></tr></table></center>'
	})
	
	return picPanel;
}


businessPic.initOtherPic= function(code,name){
/*	var html = '<div id="amoteId"></div>';
	Ext.Ajax.request({
		url:'../JSON/businessRemote.getAnalysePic?date='+new Date(),
		method:'POST',
		success:function(response,options){
			var result = response.responseText;  
			var chart1 = new FusionCharts("../fusioncharts/Charts/MSCombiDY2D.swf", "ChId1", "850", "350", "0", "0"); 
			chart1.setDataXML(result); 
			chart1.render("amoteId");
		},
		disableCaching:true,
		autoAbort:true,
		params:{
		}
	});*/
 
	
	var picPanel = new Ext.Panel({
		autoScroll : true,
		closable : true,
		region:'center',
//		layout : 'fit',
		id : "mypanel2",
		tbar : getBar(2), 
		html:'<div id="amoteId"></div>'
	})
	
	return picPanel;
}