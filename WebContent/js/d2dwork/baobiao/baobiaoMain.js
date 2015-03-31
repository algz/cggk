var baobiaoMain = {
	fristRow : 0,
	lastRow : 25,
	allRow : null,
	staticRow : 15,
	allRows : null,
	nodeid : 0
}
baobiaoMain.init = function() {
	baobiaoMain.grid = baobiaoGrid.grid();
	baobiaoMain.lefttree = baobiaoProjectTree.init("coop");

	var b = new Ext.Panel({ // 定义panel面板中显示的信息
		id : 'leftNavigationid',
		title : '' + getResource('resourceParam724') + '',
		region : 'west',
		layout : 'fit',
		width : 200,
		split : true,
		collapsible : true,
		items : [baobiaoMain.lefttree],
		margins : '0 0 0 0'
	});

	var tb = ['-', {
		text : '' + getResource('resourceParam463') + ''
				+ getResource('resourceParam9006') + '', // text : '总览'
		// iconCls : 'save1',
		handler : baobiaoMain.lists
	}, '-', {
		text : '' + getResource('resourceParam9007') + '', // text : '工作负荷'
		// iconCls : 'save1',
		handler : baobiaoMain.tables
	}, '-', {
		text : '' + getResource('resourceParam9008') + '', // text : '个人负荷'
		// iconCls : 'save1',
		handler : baobiaoMain.personLoad
	}]
	// 工作负荷
	baobiaoMain.a = baobiaoTables.init();

	baobiaoMain.c = baobiaoLists.init();
	baobiaoMain.i = ganttLoad.init();
	baobiaoMain.cenpanel = new Ext.Panel({
				id : 'baobiaoMainTab',
				region : 'center',
				layout : 'card',
				resizable : false,
				activeItem : 0,
				items : [baobiaoMain.c, baobiaoMain.a, baobiaoMain.i],
				tbar : tb
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [b, baobiaoMain.cenpanel]
	});
	// var baobiaoCombobox = new Ext.form.ComboBox({
	// id : 'baobiaoComboboxids',
	// renderTo : 'baobiaocomboxid',
	// width : 200,
	// triggerAction : 'all',
	// valueField : 'myId',
	// displayField : 'displayText',
	// mode:'local',
	// emptyText:'请选择……',
	// store:new Ext.data.ArrayStore({
	// id:1,
	// fields:[
	// 'myId',
	// 'displayText',
	// ],
	// data:[[1,'按月份统计'],[2,'按年份统计']]
	// })
	// });
}
baobiaoMain.getMonth = function(today) {
	baobiaoMain.monthaa = today.format("Y-m");
	baobiaoMain.monthbb = today.add(Date.MONTH, 1).format("Y-m");
	baobiaoMain.monthcc = today.add(Date.MONTH, 2).format("Y-m");
	baobiaoMain.monthdd = today.add(Date.MONTH, 3).format("Y-m");
	baobiaoMain.monthff = today.add(Date.MONTH, 4).format("Y-m");
	baobiaoMain.monthgg = today.add(Date.MONTH, 5).format("Y-m");
}

baobiaoMain.getMonthNext = function(today) {
	baobiaoMain.monthaa = today.add(Date.MONTH, 1).format("Y-m");
	baobiaoMain.monthbb = today.add(Date.MONTH, 2).format("Y-m");
	baobiaoMain.monthcc = today.add(Date.MONTH, 3).format("Y-m");
	baobiaoMain.monthdd = today.add(Date.MONTH, 4).format("Y-m");
	baobiaoMain.monthff = today.add(Date.MONTH, 5).format("Y-m");
	baobiaoMain.monthgg = today.add(Date.MONTH, 6).format("Y-m");
}
baobiaoMain.getMonthPre = function(today) {
	baobiaoMain.monthaa = today.add(Date.MONTH, -6).format("Y-m");
	baobiaoMain.monthbb = today.add(Date.MONTH, -5).format("Y-m");
	baobiaoMain.monthcc = today.add(Date.MONTH, -4).format("Y-m");
	baobiaoMain.monthdd = today.add(Date.MONTH, -3).format("Y-m");
	baobiaoMain.monthff = today.add(Date.MONTH, -2).format("Y-m");
	baobiaoMain.monthgg = today.add(Date.MONTH, -1).format("Y-m");
}

// 数据起始页
baobiaoMain.firstpage = function() {
	var a = 'x-btn-text x-item-disabled x-tbar-page-first';
	if (Ext.get('firstpage').dom.className != a) {
		myGrid.loadvalue(baobiaoMain.grid.store, {
					start : 0,
					limit : baobiaoMain.staticRow
				}, baobiaoMain.baseargs);
	}
}
// 数据前一页
baobiaoMain.prevpage = function() {
	var a = 'x-btn-text x-item-disabled x-tbar-page-prev';
	if (Ext.get('prevpage').dom.className != a) {
		myGrid.loadvalue(baobiaoMain.grid.store, {
					start : (baobiaoMain.allRow - 2) * baobiaoMain.staticRow,
					limit : baobiaoMain.staticRow
				}, baobiaoMain.baseargs);
	}
}
// 数据最后一页
baobiaoMain.lastpage = function() {
	var a = 'x-btn-text x-item-disabled x-tbar-page-last';
	if (Ext.get('lastpage').dom.className != a) {
		myGrid.loadvalue(baobiaoMain.grid.store, {
					start : (baobiaoMain.allRows - 1) * baobiaoMain.staticRow,
					limit : baobiaoMain.staticRow
				}, baobiaoMain.baseargs);
	}
}
// 数据下一页
baobiaoMain.nextpage = function() {

	var a = 'x-btn-text x-item-disabled x-tbar-page-next';
	if (Ext.get('nextpage').dom.className != a) {
		if (baobiaoMain.allRow != baobiaoMain.allRows) {
			myGrid.loadvalue(baobiaoMain.grid.store, {
						start : baobiaoMain.allRow * baobiaoMain.staticRow,
						limit : baobiaoMain.staticRow
					}, baobiaoMain.baseargs);

		}
	}
}
// 检测
baobiaoMain.hasClass = function(elementa, className) {

	return elementa.className == className;
}
// 添加
baobiaoMain.addClass = function(elementa, className) {
	if (!baobiaoMain.hasClass(elementa, className)) {
		elementa.className += " " + className;
	}
}
// 删除
baobiaoMain.removeClass = function(elementa, className) {
	if (baobiaoMain.hasClass(elementa, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		elementa.className = elementa.className.replace(reg, ' ');
	}
}

// 月份翻下一页
baobiaoMain.nextMonthPage = function() {
	var days = Date.parseDate(baobiaoMain.monthgg, "Y-m");
	baobiaoMain.getMonthNext(days);
	baobiaoMain.setColumnHeader(baobiaoMain.grid);
	baobiaoMain.loadgrid();
}
// 月份前一页
baobiaoMain.prevpageMonthPage = function() {
	var days = Date.parseDate(baobiaoMain.monthaa, "Y-m");
	baobiaoMain.getMonthPre(days);
	baobiaoMain.setColumnHeader(baobiaoMain.grid);
	baobiaoMain.loadgrid();
}

baobiaoMain.loadgrid = function() {
	baobiaoMain.baseargs = {
		nodeid : baobiaoMain.baseargs.nodeid,
		monthaa : baobiaoMain.monthaa,
		monthbb : baobiaoMain.monthbb,
		monthcc : baobiaoMain.monthcc,
		monthdd : baobiaoMain.monthdd,
		monthff : baobiaoMain.monthff,
		monthgg : baobiaoMain.monthgg
	}
	myGrid.loadvalue(baobiaoMain.grid.store, {
				start : (baobiaoMain.allRow - 1) * baobiaoMain.staticRow,
				limit : baobiaoMain.staticRow
			}, baobiaoMain.baseargs);
}

baobiaoMain.setColumnHeader = function(grid) {
	var a = grid.getColumnModel().findColumnIndex("montha");
	var b = grid.getColumnModel().findColumnIndex("monthb");
	var c = grid.getColumnModel().findColumnIndex("monthc");
	var d = grid.getColumnModel().findColumnIndex("monthd");
	var f = grid.getColumnModel().findColumnIndex("monthf");
	var g = grid.getColumnModel().findColumnIndex("monthg");

	grid.getColumnModel().setColumnHeader(a, baobiaoMain.monthaa);
	grid.getColumnModel().setColumnHeader(b, baobiaoMain.monthbb);
	grid.getColumnModel().setColumnHeader(c, baobiaoMain.monthcc);
	grid.getColumnModel().setColumnHeader(d, baobiaoMain.monthdd);
	grid.getColumnModel().setColumnHeader(f, baobiaoMain.monthff);
	grid.getColumnModel().setColumnHeader(g, baobiaoMain.monthgg);
}

// 项目总览
baobiaoMain.lists = function() {
	if (baobiaoMain.nodeid != "0") {
		Seam.Component.getInstance("aofoquery_zongheChaxunSvr").getTprojectVo(
				baobiaoMain.nodeid, function(reslut) {

					baobiaoMain.panellist(reslut);
					baobiaoMain.cenpanel.layout.setActiveItem(0)

				});
	}
}
// 报表
baobiaoMain.tables = function() {
	if (baobiaoMain.nodeid != "0") {
		Seam.Component.getInstance("aofoquery_zongheChaxunSvr").getStartDate(
				baobiaoMain.nodeid, function(reslut) {
					if (reslut != "1") {
						var days = Date.parseDate(reslut, "Y-m-d");
						baobiaoMain.getMonth(days);
						baobiaoMain.baseargs = {
							nodeid : baobiaoMain.nodeid,
							monthaa : baobiaoMain.monthaa,
							monthbb : baobiaoMain.monthbb,
							monthcc : baobiaoMain.monthcc,
							monthdd : baobiaoMain.monthdd,
							monthff : baobiaoMain.monthff,
							monthgg : baobiaoMain.monthgg
						}

						myGrid.loadvalue(baobiaoMain.grid.store, {
									start : 0,
									limit : baobiaoMain.staticRow
								}, baobiaoMain.baseargs);
					}
				});
	}
	baobiaoMain.cenpanel.layout.setActiveItem(1);
}
// 人员负荷
baobiaoMain.personLoad = function() {
	if (!baobiaoMain.nodeid) {
		 Ext.MessageBox.show({
				title : "信息提示",
				msg : "请点击左边的所有项目树！",
				width:200,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
		});
		return ;
	}
	var projectDirid = baobiaoMain.nodeid.split("c");
	if(projectDirid.length > 1){
		Ext.MessageBox.show({
				title : "信息提示",
				msg : "“项目文件夹”没有个人负荷！",
				width:200,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
		});
		return ;
	}
	Ext.getCmp('queryform').form.reset();
	ganttLoad.ganttGrid.getStore().removeAll();
	ganttLoad.ganttGrid.getStore().proxy = new Ext.data.HttpProxy({
				url : '../JSON/aofoquery_zongheChaxunSvr.getTaskListByUser',
				method : 'POST'

			});
	//bug:387 gaoyn 2011-5-27 10:31 统计报表-个人负荷中，选择一个项目，然后设置人员，点查询，然后再切换到另外的一个项目，点查询，下面的负荷信息不变化
	if (baobiaoMain.nodeid != "0") {
		myGrid.loadvalue(ganttLoad.ganttGrid.getStore(), ganttLoad.args, {
				 nodeid : 'root',
                 chargedmanid : null,
                 startdate : null,
                 depid:null,
                 projectid:projectid = baobiaoMain.nodeid.replace("p", "")
			});
	}
	baobiaoMain.cenpanel.layout.setActiveItem(2);
	
	
}

baobiaoMain.panellist = function(o) {
	var h = '<div id="baobiaocontainer">';
	h += '<div id="baobiaoheader">';
	h += '<h2>' + getResource('resourceParam1120') + ' </h2>';
	h += '<hr width="98%"/>';
	h += '<div id="baobiaoheader" style="width:100%">';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam991') + '：'
			+ o.plannedstartstr + '</div>';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam993') + '：'
			+ o.plannedendstr + '</div>';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam856') + '：'
			+ o.actualstartstr + '</div>';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam992') + '：'
			+ o.actualendstr + '</div>';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam723') + ''
			+ getResource('resourceParam9009') + ': ' + o.startdate + '</div>'; // text
	// :
	// 9009
	// 差异
	h += '<div id="baobiaocenterban">' + getResource('resourceParam987') + ''
			+ getResource('resourceParam988') + ''
			+ getResource('resourceParam9009') + ': ' + o.enddate + '</div>'; // text
	// :
	// 9009
	// 差异
	h += '</div>';
	h += '</div>';
	h += '<div id="baobiaoheader">';
	h += '<h2>' + '' + getResource('resourceParam9010') + '' + '</h2>'; // text
	// : 工期
	h += '<hr width="98%"/>';
	h += '<div id="baobiaoheader" style="width:100%">';
	h += '<div id="baobiaocenterban">' + getResource('resourceParam9011') + '：'
			+ o.pworkdate + '</div>'; // text : 当前规划
	h += '<div id="baobiaocenterban">' + getResource('resourceParam9012') + '：'
			+ o.aworkdate + '</div>'; // text : 剩余
	h += '</div> ';
	h += '</div>';
	h += '<div id="baobiaosidebar1">';
	h += '<h2>' + getResource('resourceParam733') + ''
			+ getResource('resourceParam9013') + '' + '</h2>'; // text : 状况
	h += '<hr  width="98%"/>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam947') + ''
			+ getResource('resourceParam733') + '：' + o.planningTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam948') + ''
			+ getResource('resourceParam733') + '：' + o.approvingTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1119') + ''
			+ getResource('resourceParam733') + '：' + o.unactiveTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam454') + ''
			+ getResource('resourceParam1115') + '：' + o.unacceptedTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1117') + ''
			+ getResource('resourceParam733') + '：' + o.workingTask + ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1118') + ''
			+ getResource('resourceParam733') + '：' + o.confirmingTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1031') + ''
			+ getResource('resourceParam733') + '：' + o.finishedTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam509') + ''
			+ getResource('resourceParam1116') + '：' + o.terminatedTask
			+ ' </div>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1114')
			+ '：' + o.allcount + ' </div>';
	h += '<p></p>';
	h += '<p></p>';
	h += '<!-- end #sidebar1 --></div>';
	h += '<div id="baobiaosidebar1">';
	h += '<h2>' + getResource('resourceParam733') + ''
			+ getResource('resourceParam9013') + '' + '</h2>'; // text : 状况
	h += '<hr  width="98%"/>';
	h += '<div id="baobiaocenterbana">' + getResource('resourceParam1113') + ''
			+ getResource('resourceParam9014') + '：' + o.usercount + '</div>'; // text
	// : 数量
	h += '<!-- end #sidebar1 --></div>';
	h += '<div id="baobiaosidebar1">';
	h += '<h2>' + getResource('resourceParam733') + ''
			+ getResource('resourceParam9013') + '' + ' </h2>'; // text : 状况
	h += '<hr  width="98%"/>';
	h += '<div id="baobiaocenterbana"> ' + getResource('resourceParam964') + ''
			+ getResource('resourceParam689') + ''
			+ getResource('resourceParam9014') + '：' + o.depcount + '</div>'; // 数量
	h += '</div>';
	h += '</div>';
	Ext.get('baobiaolistsid').dom.innerHTML = h;
	baobiaoMain.a.doLayout();
	baobiaoMain.cenpanel.doLayout();

}
Ext.onReady(baobiaoMain.init, baobiaoMain, true)
