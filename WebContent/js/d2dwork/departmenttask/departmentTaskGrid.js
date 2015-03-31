var departmentTaskGrid = {}
departmentTaskGrid.init = function() {

	var strurl = "";

	strurl = '../JSON/departmenttask_DepartmentTaskRemote.getDepartmentTaskList?a='
			+ new Date();

	departmentTaskGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	departmentTaskGrid.percentColumn = new Ext.ux.grid.ProgressColumn({
		header : "" + getResource('resourceParam1681') + "",
		dataIndex : 'completedamount',
		width : 85,
		sortable : true,
		renderer : function(v, p, record) {
			var style = '';
			var textClass = (v < 55)
					? 'x-progress-text-back'
					: 'x-progress-text-front' + (Ext.isIE6 ? '-ie6' : '');
			// ugly hack to deal with IE6 issue
			var text = String
					.format(
							'</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
							textClass, Ext.id(), v + this.textPst);
			text = (v < 96) ? text.substring(0, text.length - 6) : text
					.substr(6);

			if (record.data.color == 'red') {
				style = '-red';
			} else {
				style = '-green';
			}
			p.css += ' x-grid3-progresscol';
			return String
					.format(
							'<div class="x-progress-wrap"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>'
									+ '</div>', style, v, text);
		},
		textPst : '%' // string added to the end of the cell value (defaults
			// to '%')
			// actionEvent: 'click', // click event (defaults to 'dblclick')
			// colored : true // True for pretty colors, false for just blue
			// (defaults to false)
			// editor : new Ext.form.TextField() // Define an editor if you want
			// to
			// edit
	});
	departmentTaskGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskid'
			},
			 ['taskid', 'taskname', 'operation', 'taskcategoryid',
			 'isproblems', 'taskcategoryname', 'taskstatusid',
			 'taskstatusname', 'plannedstartstr', 'plannedendstr',
			 'plannedamount', 'completedamount', 'actualstartstr',
			 'actualendstr', 'instname', 'variety', 'projectid',
			 'chargedmanid', 'tasknotes', 'truename', 'color',
			 'projectname', 'issuedmanid', 'issuedmanname',
			 'chargeddepid', 'isaofo'
			 ]
//			['taskname', 'projectname', 'taskstatusname', 'taskcategoryname', 'truename',
//					'plannedstartstr', 'plannedendstr', 'actualstartstr',
//					'actualendstr', 'color','completedamount','taskid','projectid','taskstatusid']
					);

	var ds = new Ext.data.Store({
				proxy : departmentTaskGrid.proxy,
				reader : departmentTaskGrid.reader,
				remoteSort : true
			});
	departmentTaskGrid.setcm1();
	var plugin = [departmentTaskGrid.percentColumn];
	var grid = myGrid.initBox(ds, departmentTaskGrid.cm, null,
			departmentTaskGrid.sm, plugin);
	return grid;

}
departmentTaskGrid.setcm1 = function() {
	departmentTaskGrid.sm = new Ext.grid.CheckboxSelectionModel();

	departmentTaskGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			new Ext.grid.RowNumberer(), {
				header : "" + getResource('resourceParam998') + "",
				dataIndex : 'taskname',
				width : 60,
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {

					return "<a href='javascript:void(0);' tag='" + record.data.projectid
							+ "' onclick='detailsOnclick(&quot;" + value
							+ "&quot;," + record.data.taskid + ","
							+ record.data.projectid
							+ ");'><span  style='color:" + record.data.color
							+ ";font-weight:bold;'>" + record.data.taskname
							+ "</span></a>";

				}
			}, {
				header : "" + getResource('resourceParam2001') + "",
				width : 60,
				dataIndex : 'projectname',
				renderer : function(value, meta, record, row, col, store) {
					var taskid = record.data.taskid;
					var taskname = record.data.taskname;
					var status = record.data.taskstatusid;
					return '<a href="javascript:void(0);" style="color:blue" onclick="departmentTaskGrid.taskPath(\''
							+ taskid
							+ '\', \''
							+ taskname
							+ '\',\''
							+ status
							+ '\')">' + value + '</a>'

				}
			}, {
				header : "" + getResource('resourceParam500') + "",
				width : 60,
				dataIndex : 'taskstatusname'
			}, {
				header : "" + getResource('resourceParam481') + "",
				width : 60,
				dataIndex : 'taskcategoryname'
			}, {
				header : "" + getResource('resourceParam731') + "",
				width : 60,
				dataIndex : 'truename'
			}, departmentTaskGrid.percentColumn, {
				header : "" + getResource('resourceParam991') + "",
				width : 80,
				dataIndex : 'plannedstartstr'
			}, {
				header : "" + getResource('resourceParam1032') + "",
				width : 80,
				dataIndex : 'plannedendstr'
			}, {
				header : "" + getResource('resourceParam856') + "",
				width : 80,
				dataIndex : 'actualstartstr'
			}, {
				header : "" + getResource('resourceParam1033') + "",
				width : 80,
				dataIndex : 'actualendstr'
			}
		]
	});
}

departmentTaskGrid.taskPath = function(taskid, taskname, status) {
	
	var loader = new Ext.tree.TreeLoader({
				url : '../JSON/mytask_MyTaskRemote.taskPath'
			});
	loader.baseParams = {
		taskid : taskid,
		taskname : taskname,
		taskstatusid : status
	};
	var root = new Ext.tree.AsyncTreeNode({
				id : '',
				text : ''
			});
	var pathTree = new Ext.tree.TreePanel({
				id : 'pathTree',
				split : true,
				height : 235,
				width : 186,
				autoScroll : true,
				loader : loader,
				root : root,
				rootVisible : false,
				tbar : new Ext.Toolbar({
							items : [{
								xtype : 'button',
								text : "" + getResource('resourceParam2004')
										+ "",
								handler : function() {
									pathTree.expandAll();
								}
							}, {
								xtype : 'button',
								text : "" + getResource('resourceParam2005')
										+ "",
								handler : function() {
									pathTree.collapseAll();
								}
							}]
						})
			});
	var window = new Ext.Window({
				id : 'taskPathWin',
				title : "" + getResource('resourceParam2003') + "",
				width : '200',
				height : '300',
				resizable : false,
				modal : true,
				plain : true,
				bodystyle : 'padding:5px',
				buttonAlign : 'center',
				items : [pathTree],
				buttons : [{
							text : "" + getResource('resourceParam2006') + "",
							handler : function() {
								window.close();
							}
						}]
			});
	pathTree.expandAll();
	window.show();
}
