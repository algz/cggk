var ControlPic = {};

ControlPic.removeTab = function() {

	zongTi.tabpanel.items.each(function(item) {
				if (item.closable) {
					zongTi.tabpanel.remove(item);
				}
			});
};

ControlPic.showList = function(name, flag) {
	var id = 'projectPic' + name;
	var panel = null;

	if (1 == flag) {
		panel = ControlList.projectList();
	} else if (2 == flag) {
		panel = ControlList.produceList();
	} else if (3 == flag) {
		panel = ControlList.matterList();
	} else if (4 == flag) {
		panel = ControlList.contractList(1);
	} else if (5 == flag) {
		panel = ControlList.contractList(2);
	} else if (6 == flag) {
		panel = ControlList.contractList(3);
	} else if (7 == flag) {
		panel = ControlList.contractList(4);
	}

	if (controlTabPanel.tabPanel.get(id)) {
		controlTabPanel.tabPanel.setActiveTab(id);
	} else {
		controlTabPanel.tabPanel.add({
					id : id,
					closable : true,
					title : name + "清单",
					layout : 'fit',
					items : [panel]
				}).show();
	}
}

var getStr = function(lastUrl, height, width) {

	return '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"'
			+ 'width="'
			+ width
			+ '" height="'
			+ height
			+ '" id="ie_chart" align="middle"> <param name="allowScriptAccess" value="always" /><param name="movie"	value="../customize/hd/investment/purchaseRequest/analyse/flash.swf?width='
			+ width
			+ '&height='
			+ height
			+ '&data='
			+ lastUrl
			+ '" />'
			+ '<param name="quality" value="high" /><param name="bgcolor" value="#FFFFFF" /> <embed src="../customize/hd/investment/purchaseRequest/analyse/flash.swf?data='
			+ lastUrl
			+ '" quality="high" bgcolor="#FFFFFF" width="'
			+ width
			+ '" height="'
			+ height
			+ '" name="chart" align="middle" allowScriptAccess="always"	type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" id="chart" /></object>';
}

var getStr1 = function() {
	Seam.Component.getInstance("zongtiControl_Remote")
	.getBarInfo(null, function(result) {
		var picPanel = new Ext.Panel({
			renderTo : 'picinfoDiv',
			layout : 'fit',
			id : "pageinfoPanel",
			html : result
		})
//		var data = eval('('+result+')');
//		return '<br><table style="border-collapse:collapse;" border="1"><tr bgcolor="#f4f4f4"><td width="100">类别</td><td width="100">项数</td><td width="100">百分比</td></tr>'
//				+ '<tr><td>计划内</td><td>'+data.one+'</td><td>'+data.p1+'</td></tr>'
//				+ '<tr><td>计划外</td><td>'+data.one+'</td><td>'+data.p2+'</td></tr>'
//				+ '<tr><td>应急类</td><td>'+data.one+'</td><td>'+data.p3+'</td></tr></table>';
		});
	}

var getBar = function() {

	var startTime = function() {
		var strartTime1 = new Ext.form.DateField({
					name : 'startTime1',
					id : 'startTime1',
					emptyText : '开始时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime1.on('select', function() {
					aofoInfoGrid.queryParams.statTime1 = Ext
							.getCmp("startTime1").getValue();
				});
		return strartTime1;
	}

	var endTime = function() {
		var strartTime2 = new Ext.form.DateField({
					name : 'endTime1',
					id : 'endTime1',
					emptyText : '结束时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime2.on('select', function() {
					aofoInfoGrid.queryParams.statTime2 = Ext.getCmp("endTime1")
							.getValue();
				});
		return strartTime2;
	}

	var tbar = new Ext.Toolbar({
				items : ['<span style="padding-left:25px;"></span>开始时间:', startTime(), '&nbsp;&nbsp;结束时间:', endTime()]
			})

	return tbar;
}

ControlPic.click = function() {
	var lastUrl = "../JSON/zongtiControl_Remote.getProjectBar";
	var height = 350;
	var width = 450;
	var picPanel = new Ext.Panel({
		autoScroll : true,
		closable : true,
		layout : 'fit',
		id : "mypanel1",
		tbar : getBar(),
		html : '<center><br/><br/><br/><table border="0"><tr><td><div id="picDiv11">'
				+ getStr(lastUrl, height, width)
				+ '</div></td><td width="150">&nbsp;</td><td valign="top"><div id="picinfoDiv"></div></td></tr></table></center>'
	})
	getStr1();
	return picPanel;
};