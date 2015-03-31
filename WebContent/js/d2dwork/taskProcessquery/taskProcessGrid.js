var _isIE = Ext.isIE;
var taskProcessGrid = {
	gridwidth : 1500,
	grid : null,
	basewidth : 80
};
var infostore;

taskProcessGrid.getGrid = function() {

	var strurl = '';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'tid'
	}, ['tid', 'taskname', 'startmonth', 'cycle', 'completeratiov',
			'startdate', 'cyclecolor', 'plannedComplete', 'months', 'days',
			'partsnum', 'enddate', 'projectname', 'plannedstarttime',
			'plannedendtime', 'actualstarttime', 'actualendtime',
			'completeratiov2', 'cycle2', 'startmonth2', 'currtime','completeratiovlen']);
	var ascid = 'tid';
	var ascstr = 'desc';
	var ds = new data.Store(proxy, reader);

	var sm = new Ext.grid.RowSelectionModel( {
		singleSelect : true
	});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ""+getResource('resourceParam998')+"",
			fixed : true,
			width : 257,
			dataIndex : ''
		}, {
			header : ""+getResource('resourceParam991')+"",
			fixed : true,
			width : 100,
			dataIndex : ''
		}, {
			header : ""+getResource('resourceParam993')+"",
			fixed : true,
			width : 100,
			dataIndex : ''
		}, {
			header : ""+getResource('resourceParam856')+"",
			fixed : true,
			width : 100,
			dataIndex : ''
		}, {
			header : ""+getResource('resourceParam992')+"",
			fixed : true,
			width : 100,
			dataIndex : ''
		}, {
			header : "",
			fixed : true,
			width : 100,
			dataIndex : ''
		}]
	});
	taskProcessGrid.grid = myGrid.initByPageSize(ds, cm, null, sm, processWest.limit, false);

	taskProcessGrid.grid.width = 3000;
	// taskProcessGrid.grid.width = processMain.panel.getInnerWidth();
	// grid.autoWidth = true;
	//taskProcessGrid.grid.height = 484;
	taskProcessGrid.grid.height = 484;
	taskProcessGrid.grid.enableColumnMove = false;
	taskProcessGrid.grid.on('rowclick', function(thisgrid) {
		var taskid = thisgrid.selModel.getSelected().get('tid');
		if (taskid.indexOf("_spe") != -1)
			return;
		//alert(taskid);
		var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/processquery_ProcessquerySvr.getCateProcess?text='
					+ taskid
		// '../data/d2dwork/d2dwork_process_ProcessSvr_getList0.text'
		});
		processMain.infogrid.getStore().proxy = proxy;
		processMain.infogrid.getStore().load();
		// 显示下面的表格
			processMain.southpanel.show();
			processMain.cenpanel.doLayout();
			// infostore = processMain.infogrid.getStore();
			// infostore.removeAll();
			// callSeam("processquery_ProcessquerySvr","getmmTimeForCateTask",[taskid],getTimeBackhere);
			// myGrid.loadvalue(processMain.infogrid.store,null,{taskid:myGrid.row.get('taskid')});
		});

	

	taskProcessGrid.grid.viewConfig = {
		//forceFit : true,
		enableRowBody : true,
		showPreview : true,
		getRowClass : function(record, rowIndex, p, ds) {
//			var len = record.data.cycle;
//			var tag = record.data.startmonth/6;
			var completeratiov = record.data.completeratiov;
			var completeratiovlen = record.data.completeratiovlen;
//			var len2 = record.data.cycle2;
//			var tag2 = record.data.startmonth2/6;
			var completeratiov2 = record.data.completeratiov2;
			var color = record.data.cyclecolor;
			if(!color || color == '')
				color='blue';
			var show = "";
			if (color == 'red') {
				show = " "+getResource('resourceParam994')+":" + record.data.plannedComplete + "%";
			}
			if (record.data.days && record.data.days == 0) {
				record.data.days = 1;
			}
			var title = ""+getResource('resourceParam995')+"" + record.data.startdate + "   "+getResource('resourceParam996')+""
					+ record.data.months + getResource('resourceParam6044') + " " + record.data.days + "" + getResource('resourceParam6045')  // 6044个月 6045 天  完成率：
					+ completeratiov + "%" + show;
			var projectshow = '';
			var flag = 0;
			len = 4;
			len2 = 4;
			tag = 0.1;
			tag2 = 0.1;
			//alert(tag2 + "||" + completeratiov2);
//			if (completeratiov && completeratiov!='') {
				p.body = '<div style="min-height:30px;height:35px;position:relative;top:-18px;margin: 0px;padding:0px;"><table width:100% border=0 cellspacing=3 cellpanding=1>'
						+ '<tr>'
						+ '<td width=250px>'
						+ '<div title="'+ record.data.taskname+ '" style="width:250px;overflow: hidden;min-height:14px;height:14px;float: left;">'
						+ record.data.taskname
						+ '</div>'
						+ '</td>'
						+ '<td width=96px>'
						+ '<div style="width:96px; min-height:14px;height:14px;float: left;">'
						+ record.data.plannedstarttime
						+ '</div>'
						+ '</td>'
						+ '<td width=96px>'
						+ '<div style="width:96px; min-height:14px;height:14px;float: left;">'
						+ record.data.plannedendtime
						+ '</div>'
						+ '</td>'
						+ '<td width=96px>'
						+ '<div style="width:96px; min-height:14px;height:14px;float: left;">'
						+ record.data.actualstarttime
						+ '</div>'
						+ '</td>'
						+ '<td width=96px>'
						+ '<div style="width:96px; min-height:14px;height:14px;float: left;">'
						+ record.data.actualendtime
						+ '</div>'
						+ '</td><td></td></tr>'
						+ '<tr><td>&nbsp;&nbsp;&nbsp;'+getResource('resourceParam997')+'</td>'
						+ '<td colspan="8">'
						+ '<div style="width:'
						+ (taskProcessGrid.basewidth * tag)
						+ 'px; min-height:11px;height:11px;float: left;">&nbsp;</div>'
						+
						// '<div><div title="计划开始时间" style="width:75px;
						// min-height:10px;height:10px;float: left;">' +
						// record.data.plannedstarttime + '</div>' +
						'<div title="'
						+ title
						+ '" style="width:'
						+ (taskProcessGrid.basewidth * len)
						+ 'px; min-height:11px; border:1px  solid #000000;height:11px;float: left;">'
						+ '<div  title="' 
						+ title 
						+ '" style="width:'
						+ ((taskProcessGrid.basewidth * len) * completeratiovlen / 100)
						+ 'px; min-height:11px; background-image: url(../images/pb/pb_'
						+ color
						+ '.gif);background-repeat:repeat-x;height:11px;float: left;"></div>' + '</div>';
				if (_isIE) {
					p.body += '<div style="position:relative; top:2px; left:'
							+ ((completeratiovlen / 100 - 1) * (taskProcessGrid.basewidth * len))
							+ 'px; min-height:10px;height:10px;z-index:1000;">'
							+ completeratiov + ' %</div>';
				} else {
					p.body += '<div style="position:relative; left:'
							+ ((completeratiovlen / 100 - 1) * (taskProcessGrid.basewidth * len))
							+ 'px; min-height:9px;height:9px;z-index:1000;">'
							+ completeratiov + ' %</div>';
				}

				// '<div title="计划结束时间" style="width:110px;
				// min-height:10px;height:10px;float: left;">' +
				// record.data.plannedendtime + '</div>' +
//				p.body += '</td></tr>'
//						+ '<tr>'
//						+ '<td>&nbsp;&nbsp;&nbsp;时间使用量</td>'
//						+ '<td colspan="8">'
//						+ '<div style="width:'
//						+ (taskProcessGrid.basewidth * tag2)
//						+ 'px; min-height:11px;height:11px;float: left;"></div>';
//						
//						// '<div><div title="实际开始时间" style="width:75px;
//						// min-height:10px;height:10px;float: left;">' +
//						// record.data.actualstarttime + '</div>' +
//				if(record.data.actualstarttime != '' && record.data.actualendtime != ''){
//					p.body += '<div style="width:'
//						+ (taskProcessGrid.basewidth * len2)
//						+ 'px; min-height:10px; border:1px  solid #000000;height:10px;float: left;">'
//						+ '<div style="width:'
//						+ ((taskProcessGrid.basewidth * len2) * completeratiov2 / 100)
//						+ 'px; min-height:11px; background-image: url(../images/pb/pbt.gif);background-repeat:repeat-x;height:11px;float: left;"></div>'
//						+ '</div>';
//						if (_isIE) {
//							p.body += '<div style="position:relative; top:2px; left:'
//									+ ((completeratiov2 / 100 - 1) * (taskProcessGrid.basewidth * len2))
//									+ 'px; min-height:10px;height:10px;z-index:1000;">'
//									+ record.data.currtime + '</div>';
//						} else {
//							p.body += '<div style="position:relative; left:'
//									+ ((completeratiov2 / 100 - 1) * (taskProcessGrid.basewidth * len2))
//									+ 'px; min-height:9px;height:9px;z-index:1000;">'
//									+ record.data.currtime + '</div>';
//						}
//				}

				// '<div title="计划结束时间" style="width:110px;
				// min-height:10px;height:10px;float: left;">' +
				// record.data.actualendtime + '</div></div>' +
				p.body += '</td></tr></table></div>';
//			} else {
//				p.body = '<div class="d1" style="min-height:35px">'
//						+ '<div title="'
//						+ record.data.taskname
//						+ '" style="width:200px;overflow: hidden;min-height:14px;height:14px;float: left;">'
//						+ record.data.taskname
//						+ '</div></div>';
//			}

		}
	};
	taskProcessGrid.grid.region='center';
	return taskProcessGrid.grid;
}
var getTimeBackhere = function(response) {
	if (!response)
		return;
	var ny = response.getMinYear();
	var xy = response.getMaxYear();
	var nm = response.getMinMonth();
	var xm = response.getMaxMonth();
	var nd = response.getMinDate();
	var xd = response.getMaxDate();
	var cmArray = new Array();
	var index = 0;
	var j = 0;
	var i = 0;
	cmArray[index++] = {
		id : 'taskid',
		header : ""+getResource('resourceParam998')+"",
		width : 120,
		fixed : true,
		dataIndex : ''
	};
	// 同一年
	if (ny == xy) {
		// 同月
		if (nm == xm) {
			cmArray[index++] = {
				header : ny + "," + nm,
				fixed : true,
				width : 80,
				dataIndex : ''
			};
			// 不同月
		} else {
			for (j = nm;j <= xm; j++) {
				cmArray[index++] = {
					header : ny + "," + j,
					fixed : true,
					width : 80,
					dataIndex : ''
				};
			}
		}
		// 不同年
	} else {
		for (i = ny;i <= xy; i++) {
			// 先计算最小年从开始月到12月需要显示的列
			if (i == ny) {
				for (j = nm;j <= 12; j++) {
					cmArray[index++] = {
						header : ny + "," + j,
						fixed : true,
						width : 80,
						dataIndex : ''
					};
				}
				// 最后计算最大年从1月到当前月需要显示的列
			} else if (i == xy) {
				for (j = 1;j <= xm; j++) {
					cmArray[index++] = {
						header : xy + "," + j,
						fixed : true,
						width : 80,
						dataIndex : ''
					};
				}
				// 若中间跨度一年,则添加12列
			} else {
				for (j = 1;j <= 12; j++) {
					cmArray[index++] = {
						header : i + "," + j,
						fixed : true,
						width : 80,
						dataIndex : ''
					};
				}
			}
		}
	}
	// 添加一个空白列方便显示
	cmArray[index++] = {
		header : "",
		fixed : true,
		width : 80,
		dataIndex : ''
	};

	// 显示下面的表格
	processMain.southpanel.show();
	processMain.cenpanel.doLayout();

	// 以数组实例化一个cm对象
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : cmArray
	});

	// 得到列数
	var length = cmArray.length;

	// 根据列数多少,改变列的宽度值
	if (length > 14 && length < 28) {
		processWest.cmwidth = 70;
	} else if (length >= 28 && length < 42) {
		processWest.cmwidth = 60;
	} else if (length >= 42 && length < 56) {
		processWest.cmwidth = 50;
	} else if (length >= 56) {
		processWest.cmwidth = 40;
	} else {
		processWest.cmwidth = 80;
	}

	// 改变列的宽度
	var k = 0;
	for (k = 1;k < length; k++) {
		cm.setColumnWidth(k, processWest.cmwidth);
	}

	// 设置表格宽度总是填满窗体
	var gridWidth = (cmArray.length + 2) * processWest.cmwidth;
	gridWidth = gridWidth < 713 ? 713 : gridWidth;
	processMain.infogrid.setWidth(gridWidth);

	// 以新的表头和数据生成grid
	processMain.infogrid.reconfigure(infostore, cm);
	// myGrid.loadvalue(infostore,{start:0,limit:8},null);
	infostore.load();

}
