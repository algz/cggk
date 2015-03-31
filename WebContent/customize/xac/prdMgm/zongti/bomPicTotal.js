var bomPicTotal = {
	nodeId : 0,
	limit : 15,
	start : 0
};

bomPicTotal.removeTab = function() {

	mbomTabPanel.tabpanel.items.each(function(item) {
				if (item.closable) {
					mbomTabPanel.tabpanel.remove(item);
				}
			});
};

bomPicTotal.click1 = function(nodeId, task, taskName) {
	callSeam("ZongTi_ZongTiRemote", "getTaskStateByNodeid", [task], function(
					result) {
				var data = eval('(' + result + ')');
				bomPicTotal.cm = new Ext.grid.ColumnModel(data);
				bomPicTotal.cm.defaultSortable = false;
				bomPicTotal.cm.menuDisabled = true;
				bomPicTotal.sm = new Ext.grid.CheckboxSelectionModel();
				var strurl = "";
				strurl = '../JSON/ZongTi_ZongTiRemote.getTasksDetail';
				bomPicTotal.proxy = new Ext.data.HttpProxy({
							url : strurl,
							method : 'POST'
						});
				bomPicTotal.reader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'id'
						}, ['id', 'dept', '_column1', '_column2', '_column3',
								'_column4', '_column5', '_column6', '_column7',
								'_column8', '_column9', '_column10']);

				bomPicTotal.ds = new Ext.data.Store({
							proxy : bomPicTotal.proxy,
							reader : bomPicTotal.reader
						});

				bomPicTotal.gridPanel = myGrid.init(bomPicTotal.ds,
						bomPicTotal.cm, null, bomPicTotal.sm, null);

				myGrid.loadvalue(bomPicTotal.ds, {
							start : bomPicTotal.start,
							limit : bomPicTotal.limit,
							node : nodeId,
							type : task
						}, null);

				if (bomTab1.tabpanel.get(task + "1")) {
					bomTab1.tabpanel.setActiveTab(task + "1");
				} else {
					bomTab1.tabpanel.add({
								id : task + "1",
								title : taskName + "详情",
								closable : true,
								layout : 'fit',
								items : [bomPicTotal.gridPanel]
							}).show();
				}
			});
};

bomPicTotal.picTobig = function(path, resPath, task, taskName) {
	var width = 650;
	var height = 380;
	bomPicTotal.Bigpic = new Ext.Panel({
		autoScroll : true,
		layout : 'fit',
		html : '<p align="center"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
				+ 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" '
				+ 'width="'
				+ width
				+ '" height="'
				+ height
				+ '" id="bigFlash" align="middle">'
				+ '<param name="allowScriptAccess" value="always" />'
				+ '<param name="movie" value="'
				+ path
				+ '?width='
				+ width
				+ '&height='
				+ height
				+ '&data='
				+ resPath
				+ '" /><param name="quality" value="high" /><param name="bgcolor" value="#FFFFFF" /> '
				+ '<embed src="'
				+ path
				+ '?data='
				+ resPath
				+ '" quality="high" bgcolor="#FFFFFF" width="'
				+ width
				+ '" height="'
				+ height
				+ '" '
				+ 'name="chart" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" '
				+ 'pluginspage="http://www.macromedia.com/go/getflashplayer" id="chart" /></object></p>'

	});
	if (bomTab1.tabpanel.get(task + "2")) {
		bomTab1.tabpanel.setActiveTab(task + "2");
	} else {
		bomTab1.tabpanel.add({
					id : task + "2",
					title : taskName + "统计图",
					closable : true,
					layout : 'fit',
					items : [bomPicTotal.Bigpic]
				}).show();
	}
}

bomPicTotal.init = function(node, task, taskName) {
	bomPicTotal.pic = new Ext.Panel({
				autoScroll : true,
				layout : 'fit',
				id : "mypanel" + task,
				title : taskName + "统计图",
				html : '<div id="picDiv' + task + '"></div>'
			});

	var vo = Seam.Remoting
			.createType("com.sysware.customize.xac.productionMgm.common.XacCommonVo");
	vo.setNode(node);
	vo.setText(task);

	callSeam("ZongTi_ZongTiRemote", "getTotalByflash", [vo], function(result) {
		var data = eval('(' + result + ')');
		var tpl1 = new Ext.XTemplate(
				'<table><tr><tpl for="paths">',
				'<td><p><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',
				'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"',
				'width="{width}" height="{height}" id=flash{task}',
				'align="middle">',
				'<param name="allowScriptAccess" value="always" />',
				'<param name="movie"',
				'value="{path}?width={width}&height={height}&data={resPath}" />',
				'<param name="quality" value="high" />',
				'<param name="bgcolor" value="#FFFFFF" />',
				'<embed src="{path}?data={resPath}" quality="high"',
				'bgcolor="#FFFFFF" width="{width}" height="{height}"',
				'name="chart" align="middle" allowScriptAccess="always"',
				'type="application/x-shockwave-flash"',
				'pluginspage="http://www.macromedia.com/go/getflashplayer" id="chart" /></object></p>',
				'<input type="button" value="放大" onClick="bomPicTotal.picTobig(\'{path}\',\'{resPath}\',\'{task}\',\'{taskName}\')">&nbsp;&nbsp;',
				'<input type="button" value="详情" onClick="bomPicTotal.click1(\'{node}\',\'{task}\',\'{taskName}\');"><td>&nbsp;&nbsp;&nbsp;',
				'</td></td></tpl></tr></table>');
		tpl1.compile();
		tpl1.overwrite(Ext.get('picDiv' + task + ''), data);
	});

	return bomPicTotal.pic;
};