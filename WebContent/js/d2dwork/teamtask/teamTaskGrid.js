var teamTaskGrid = {}
teamTaskGrid.init = function() {

	var strurl = "";

	strurl = '../JSON/teamtask_TeamTaskRemote.getTeamTaskList?a=' + new Date();

	teamTaskGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'GET'
			});
	teamTaskGrid.percentColumn = new Ext.ux.grid.ProgressColumn({
		header : ""+getResource('resourceParam1681')+"",
		dataIndex : 'completedamount',
		width : 85,
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
		// editor : new Ext.form.TextField() // Define an editor if you want to
		// edit
	});
	teamTaskGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'taskid'
			}, ['taskid', 'taskname', 'operation', 'taskcategoryid',
					'isproblems', 'taskcategoryname', 'taskstatusid',
					'taskstatusname', 'plannedstartstr', 'plannedendstr',
					'plannedamount', 'completedamount', 'actualstartstr',
					'actualendstr', 'instname', 'variety', 'projectid',
					'chargedmanid', 'tasknotes', 'truename', 'color',
					'projectname', 'issuedmanid', 'issuedmanname',
					'chargeddepid', 'isaofo'

			]);

	var ds = new Ext.data.Store({
				proxy : teamTaskGrid.proxy,
				reader : teamTaskGrid.reader
			});
	teamTaskGrid.setcm1();
	var plugin = [teamTaskGrid.percentColumn];
	var grid = myGrid.initBox(ds, teamTaskGrid.cm, null, teamTaskGrid.sm,
			plugin);
	return grid;

}
teamTaskGrid.setcm1 = function() {
	teamTaskGrid.sm = new Ext.grid.CheckboxSelectionModel();

	teamTaskGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			header : ""+getResource('resourceParam998')+"",
			dataIndex : 'taskname',
			width : 60,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				return "<span style='color:" + record.data.color
						+ ";font-weight:bold;'>" + record.data.taskname + "</span>";
			}
		}, {
			header : ""+getResource('resourceParam500')+"",
			width : 60,
			dataIndex : 'taskstatusname'
		}, {
			header : ""+getResource('resourceParam481')+"",
			width : 60,
			dataIndex : 'taskcategoryname'
		},
		{
			header : "负责人",
			width : 60,
			dataIndex : 'truename'
		},
				// {
				// header : "百分比",
				// width : 80,
				// dataIndex : 'completedamount'
				// }
				teamTaskGrid.percentColumn, {
					header : ""+getResource('resourceParam991')+"",
					width : 80,
					dataIndex : 'plannedstartstr'
				}, {
					header : ""+getResource('resourceParam1032')+"",
					width : 80,
					dataIndex : 'plannedendstr'
				}, {
					header : ""+getResource('resourceParam856')+"",
					width : 80,
					dataIndex : 'actualstartstr'
				}, {
					header : ""+getResource('resourceParam1033')+"",
					width : 80,
					dataIndex : 'actualendstr'
				}/*
					 * ,{ header: "派发人", width:60, dataIndex: 'truename' }
					 */
	
		]
	});
}
