Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var taskProcessColumntree = {
	columnTree : null
}

taskProcessColumntree.processRatioRender = function(val, p, record) {
	alert(record.data.completedamount + ':' + record.data.plannedamount);
	var completedRatio = record.data.completedamount
			/ record.data.plannedamount;
	return '<div title="' + completedRatio + '">' + completedRatio + '</div>';
}

taskProcessColumntree.operation = function(val, p, record) {
	var gridName = '';
	if (record.data.hasDepartmentAofo == 'true') {
		gridName = 'aofoDepartmentMain';
	} else if (record.data.hasPersonAofo == 'true') {
		gridName = 'aofoPersonMain';
	} else {
		return ' ';
	}

	var fieldContent = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1240') + '' + getResource('resourceParam6031') + getResource('resourceParam576')+'">' // 6031工艺统计
			+ '<a href="javascript:void(0);" name="aofo" onClick="' + gridName + '.init('
			+ record.data.taskid + ')">';
	fieldContent += ''+getResource('resourceParam857')+'';
	fieldContent += '</a></div>';
	return fieldContent;
}

taskProcessColumntree.taskProblem = function(val, p, record) {
	if (record.data.isproblems == 'true') {
		return '<span title="' + record.data.taskProblem + '">' + getResource('resourceParam6032') // 6032问题
				+ '</span>';
	} else {
		return '<span title="' + getResource('resourceParam6033') + '">' + getResource('resourceParam6033') + '</span>'; // 6033无
	}
}

taskProcessColumntree.viewPieChart = function(taskid) {
	base.waitDialog(''+getResource('resourceParam6034')+getResource('resourceParam474')+', ' + getResource('resourceParam6035'), ''+getResource('resourceParam6036'));// 显示进度提示窗口 // 6034正在统计  // 6035请等待...  // 6036统计中...

	callSeam("aofoquery_AofoStat", "drawPieChart", [taskid], function(result) {
		var sign = result;
		if (sign == "false") {
			Ext.MessageBox.hide();// 隐藏进度提示窗口
			Ext.MessageBox.show( {
				title : ''+getResource('resourceParam6037'), // 6037失败
				msg : ''+getResource('resourceParam6038') + getResource('resourceParam508')+ getResource('resourceParam6037')+'!', // 6037失败  // 6038获取
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		} else {
			Ext.MessageBox.hide();// 隐藏进度提示窗口
			base.openCenterWindow(result, '' + getResource('resourceParam6039'), 650, 550); // 6039饼图
		}
	});
}

taskProcessColumntree.viewPieCharta = function(taskid) {
	base.waitDialog(''+getResource('resourceParam6034')+getResource('resourceParam474')+', ' + getResource('resourceParam6035'), ''+getResource('resourceParam6036'));// 显示进度提示窗口  // 6034正在统计 // 请等待... // 6036统计中...

	callSeam("aofoquery_AofoStat", "drawPieCharta", [taskid], function(result) {
		var sign = result;
		if (sign == "false") {
			Ext.MessageBox.hide();// 隐藏进度提示窗口
			Ext.MessageBox.show( {
				title : ''+getResource('resourceParam6037'), // 6037失败
				msg : ''+getResource('resourceParam6038') + getResource('resourceParam508')+ getResource('resourceParam6037')+'!', // 6037失败  // 6038获取
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		} else {
			Ext.MessageBox.hide();// 隐藏进度提示窗口
			base.openCenterWindow(result, '' + getResource('resourceParam6039'), 650, 550); // 6039饼图
		}
	});
}
taskProcessColumntree.clickfirst = function() {
	taskProcessColumntree.columnTree.getRootNode().expand(true);
}
taskProcessColumntree.init = function() {
	Ext.QuickTips.init();
	taskProcessColumntree.columnTree = new Ext.tree.ColumnTree( {
		id : 'taskProcessColumntree',
		// containerScroll: true,
		autoScroll : true,
		// ddScroll : true,
		// animate:true,
		// header:true,
		// autoHeight:true,
		// autoWidth:true,
		rootVisible : false,
		lines : true,
		tbar : [{
			id : 'expandAll',
			text : ''+getResource('resourceParam6040'), // 6040 全部展开
			// disabled : true,
			handler : taskProcessColumntree.clickfirst
		}],

		columns : [ {
			header : ''+getResource('resourceParam733')+'',
			width : 300,// 450
				dataIndex : 'taskname'
			}, {
				header : '' + getResource('resourceParam6041'),  // 6041责任人
				width : 60,// 100
				dataIndex : 'chargedmanName'
			}, {
				header : ''+getResource('resourceParam1629')+'',
				width : 60,// 80
				// renderer : taskProcessColumntree.taskProblem,
				dataIndex : 'isproblems'
			}, {
				header : ''+getResource('resourceParam991')+'',
				width : 80,// 120
				dataIndex : 'plannedstarttime'
			}, {
				header : ''+getResource('resourceParam993')+'',
				width : 80,// 120
				dataIndex : 'plannedendtime'
			}, {
				header : ''+getResource('resourceParam856')+'',
				width : 80,// 120
				dataIndex : 'actualstarttime'
			}, {
				header : ''+getResource('resourceParam992')+'',
				width : 80,// 120
				dataIndex : 'actualendtime'
			}, {
				header : ''+getResource('resourceParam6042'), // 6042进度
				width : 220,// 310
				// renderer : taskProcessColumntree.processRatioRender,
				dataIndex : 'completeratiov'
			}, {
				header : ''+getResource('resourceParam6043'), // 6043操作
				width : 140,// 190
				// renderer : taskProcessColumntree.operation,
				dataIndex : 'hasAoFo'
			}, {
				header : ''+getResource('resourceParam1256')+'',
				width : 140,// 190
				// renderer : taskProcessColumntree.operation,
				dataIndex : 'tasknotes'
			}, {
				header : ' ',// 加入一个空列，解决图标提前的问题
				width : 2,
				dataIndex : ''
			}],
		loader : new Ext.tree.TreeLoader( {
			dataUrl : '../JSON/processquery_TaskProcessService.listTasks',
			method : 'GET',
			uiProviders : {
				'col' : Ext.tree.ColumnNodeUI
			}
		}),
		root : new Ext.tree.AsyncTreeNode( {
			text : ''+getResource('resourceParam1681')+'',
			id : 'task001',
			iconCls : 'top'
		})
	});

	var sm = taskProcessColumntree.columnTree.getSelectionModel();
	var nodeInf;
	sm.on('selectionchange', function(sm, node) {
		if (node != null) {
			nodeInf = node.attributes;
		}
	});

	taskProcessColumntree.treePanel = new Ext.Panel( {
		region : 'center',
		layout : 'fit',
		// autoScroll:true,
		loadMask : {
			msg : ''+getResource('resourceParam579')+''
		},
		items : taskProcessColumntree.columnTree
	});

	return taskProcessColumntree.treePanel;
};
