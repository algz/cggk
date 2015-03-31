Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var zongheMain = {
	queryForm : null,
	cenpanel : null,
	renwugrid : null,
	daohangHtml : new Array(),
	daohang : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	taskid : null,
	chargeddepid : null,
	taskname : null,
	chargeddepname : null,
	tablename : null,
	a : null,
	gaojiForm : null
};

zongheMain.init = function() {

	zongheMain.renwugrid = zongheGrid.grid();
	zongheMain.taskdetrails = taskdetails.init();
	// zongheMain.daohang = zongheNorth.getDaohang();
	// zongheMain.daohang.hide();
	zongheMain.queryForm = zongheNorth.getForm();
//    zongheMain.queryFormPanel=new Ext.Panel({
//       id:Ext.id(this,"zongheMain"),
//       region : 'north',
//       layout:'fit',
//       items:[zongheMain.queryForm]
//    });
    
	zongheMain.tabpanel1 = new Ext.Panel({
		region : 'center',
		id : 'tabpanel1',
		layout : 'fit',
		title : '' + getResource('resourceParam1698') + '',
		items : [zongheMain.renwugrid]
	});

	zongheMain.tabpanel2 = new Ext.Panel({
		region : 'center',
		id : 'tabpanel2',
		layout : 'fit',
		title : '' + getResource('resourceParam1699') + '',
		items : [zongheMain.taskdetrails]
	});

	zongheMain.cenpanel = new Ext.Panel({
		id : 'zongheMainTap',
		region : 'center',
		layout : 'card',
		resizable : false,
		activeItem : 0,
		items : [zongheMain.tabpanel1, zongheMain.tabpanel2]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [zongheMain.queryForm, zongheMain.cenpanel]
	});
	// zongheMain.tabpanel1.doLayout();
	// zongheMain.tabpanel2.doLayout();

	var temp = '' + window.location;
	// 查询
	if (temp.indexOf('?man=') != -1) {
		var man = temp.substring(temp.indexOf('?man=') + 5, temp.indexOf('&dep='));

		var dep = temp.substring(temp.indexOf('&dep=') + 5, temp.indexOf('&id='));
		var id = temp.substring(temp.indexOf('&id=') + 4, temp.indexOf('&sta='));
		var sta = temp.substring(temp.indexOf('&sta=') + 5, temp.indexOf('&end='));
		var end = temp.substring(temp.indexOf('&end=') + 5);
		zongheMain.baseargs = {
			chargedmanname : man,
			chargeddepname : dep,
			taskstatusid : id,
			plannedstartstr : sta,
			plannedendstr : end
		};
		myGrid.loadvalue(zongheMain.renwugrid.store, zongheMain.args, zongheMain.baseargs);
		zongheUtil.sel = true;
	}

	// 高级查询
	if (temp.indexOf('?gaoji=') != -1) {
		zongheQuery.init();
	}
}

zongheMain.detailsOnclick = function(taskname, taskid, myObj, taskType) {
	// 北部面板赋值
	feedback.taskid = taskid;
	feedback.init(taskid, taskname);
	log.init(taskid, taskname);
	zongheMain.projectid = myObj;
	zongheMain.taskid = taskid;
	zongheMain.taskname = taskname;

	taskdetails.t5.add(feedback.feedBackTabPanel);
	taskdetails.t5.doLayout();
	taskdetails.t6.add(log.logTabPanel);
	taskdetails.t6.doLayout();
	var str = '<div><span style="float:left;">【' + taskname + '】'
		+ getResource('resourceParam857')
		+ '</span><span style="float:right;">'
		+ ' <a style="cursor: hand" onclick="zongheMain.fack();">'
		+ getResource('resourceParam1574') + '</a>' + '</span><div>';
	zongheMain.tabpanel2.setTitle(str);
	zongheMain.tabpanel2.doLayout();
	zongheMain.cenpanel.layout.setActiveItem(1);
	zongheMain.cenpanel.doLayout();
	taskdetails.tabpanel.layout.setActiveItem(0);
	taskdetails.tabpanel.doLayout();

	if (taskType == 0) {
		taskdetails.t1.getLayout().setActiveItem(0);
		TaskAttributePanel.taskId = taskid;
		TaskAttributePanel.setBasicForm();
		TaskAttributePanel.setFirstPage();
	} else if (taskType == 1) {
		taskdetails.t1.getLayout().setActiveItem(1);
		viewApproveTask.setBasicForm(taskid);
	}


}
zongheMain.fack = function() {
	zongheMain.cenpanel.layout.setActiveItem(0);
	zongheMain.cenpanel.doLayout();
}
Ext.onReady(zongheMain.init, zongheMain, true);
