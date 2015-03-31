Ext.ns('AppLoad');
var AppLoad = {
	flag : 1,
	startDate : null
}
AppLoad.init = function(today) {
	Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
	Ext.QuickTips.init();
	Sch.ColumnFactory.defaults.width = 200;

	// if (typeof console === 'undefined') {
	// console = {
	// log : Ext.log,
	// error : Ext.log
	// };
	// }
	//    
	Ext.override(Sch.ViewBehaviour.MonthView, {
				timeResolution : 720
			});

	Ext.override(Sch.ViewBehaviour.WeekView, {
				timeResolution : 720
			});

	return AppLoad.Scheduler.init(today);
}

AppLoad.Scheduler = {

	// Initialize application
	init : function(today) {
		this.grid = this.createGrid(today);
		this.initEvents();
		return this.grid;
	},

	initEvents : function() {
		var g = this.grid;
		g.on({
					'beforeedit' : this.beforeEdit,
					'afteredit' : this.afterEdit,
					'timeheaderdblclick' : this.onTimeHeaderDoubleClick,
					scope : this
				});
	},

	onTimeHeaderDoubleClick : function(g, start, end, e) {
		var columnType = 'monthAndQuarters';
		if (start.getYear() === end.getYear()
				&& (end.getMonth() - start.getMonth() === 1)) {
			// Only showing one month, show day numbers
			columnType = 'monthAndDays';
		}
		g.setView(start, end, columnType, Sch.ViewBehaviour.MonthView);
	},

	beforeEdit : function(o) {
		// Set the duration field to help the editor get the value
		if (o.field === 'Duration') {
			var r = o.record, durationDays = Math.round(Date
					.getDurationInHours(r.get('StartDate'), r.get('EndDate'))
					/ 12)
					/ 2;

			r.set('Duration', durationDays);
		}

		o.cancel = (o.field === 'Duration' || o.field === 'StartDate')
				&& !o.record.store.isLeafNode(o.record);
	},

	afterEdit : function(o) {
		if (o.field === 'Duration') {
			var start = o.record.get('StartDate');
			o.record.set('EndDate', start.add(Date.HOUR, o.value * 24));
		} else if (o.field === 'StartDate') {
			var dur = o.record.get('EndDate') - o.originalValue;
			o.record.set('EndDate', o.value.add(Date.MILLI, dur));
		}
	},

	createGrid : function(today) {
		var sm = new Ext.grid.CheckboxSelectionModel();
		var start = today;
		end = start.add(Date.MONTH, 12);
		var store = new Ext.ux.maximgb.tg.AdjacencyListStore({
			defaultExpanded : false,
			autoLoad : true,
			proxy : new Ext.data.HttpProxy({
				// url : 'tasks.json',
				// method:'GET'
				url : "../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid=0",
				method : "POST"
			}),
			baseParams : {
				start : '0',
				limit : '25'
			},
			reader : new Ext.data.JsonReader({
						idProperty : 'Id',
						root : 'yoruRoot',
						totalProperty : 'totalProperty'
					}, [{
								name : 'Id'
							}, {
								name : 'Names',
								type : 'string'
							}, {
								name : 'Name',
								type : 'string'
							}, {
								name : 'StartDate',
								type : 'date',
								dateFormat : 'c'
							}, {
								name : 'EndDate',
								type : 'date',
								dateFormat : 'c'
							}, {
								name : 'PercentDone'
							}, {
								name : 'ParentId',
								type : 'string'
							}, {
								name : 'IsLeaf',
								type : 'bool'
							}, {
								name : 'Responsible'
							}, {
								name : 'Status'
							}, {
								name : 'StatusName'
							}, {
								name : 'TypeName'
							}, {
								name : 'Department'
							}, {
								name : 'UserName'
							}, {
								name : 'AstartDate',
								type : 'date',
								dateFormat : 'c'
							}, {
								name : 'AendDate',
								type : 'date',
								dateFormat : 'c'
							}, {
								name : 'type',
								type : 'string'
							}, {
								name : 'hidden',
								type : 'bool'
							}, {
								name : 'ManHour',
								type : 'string'
							}, {
								name : 'ActualManHour',
								type : 'string'
							}, {
								name : 'ManHourDate',
								type : 'date',
								dateFormat : 'c'
							}])
		});
		var dependencyStore = new Ext.data.JsonStore({
					// idProperty : 'Id',
					autoLoad : true,
					proxy : new Ext.data.HttpProxy({
						url : '../JSON/aofoquery_zongheChaxunSvr.getGanttRelation',
						method : 'POST'
							// url:'',
							// method:'POST'
					}),
					baseParams : {
						start : '0',
						limit : '25'
					},
					fields : [
							// 3 mandatory fields
							{
						name : 'From'
					}, {
						name : 'To'
					}, {
						name : 'Type'
					}]
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		var g = new Sch.TreeGanttPanel({
			id : 'ganttid',
			// height : 600,
			width : 1000,
			// renderTo : Ext.getBody(),
			leftLabelField : 'Name',
			highlightWeekends : false,
			showTodayLine : false,
			isStatusProgressBars : 'both',// atime、ptime、both
			loadMask : true,
			// enableDragDrop:true,//拖拽
			resizeHandles : 'none',// 拖动栏
			enableDependencyDragDrop : false,// 不显示连接点
			// disableSelection:true,//点击
			enableDragCreation : false,
			enableEventDragDrop : false,

			enableLabelEdit : false,// 编辑标签
			enableTaskDragDrop : false,// 进度条是否拖拽
			tooltipTpl : new Ext.XTemplate(
					'<h4 class="tipHeader">{Names}</h4>',
					'<table class="taskTip">',
					'<tr><td>' + getResource('resourceParam986')
							+ ':</td> <td align="right">{Department}</td></tr>',
					'<tr><td>' + getResource('resourceParam731')
							+ '</td> <td align="right">{UserName}</td></tr>',
					'<tr><td>' + getResource('resourceParam481')
							+ '</td> <td align="right">{TypeName}</td></tr>',
					'<tr><td>' + getResource('resourceParam500')
							+ '</td> <td align="right">{StatusName}</td></tr>',
					'<tr><td>'
							+ getResource('resourceParam723')
							+ ':</td> <td align="right">{[values.StartDate.format("y-m-d")]}</td></tr>',
					'<tr><td>'
							+ getResource('resourceParam987')
							+ ''
							+ getResource('resourceParam988')
							+ ':</td> <td align="right">{[values.EndDate.format("y-m-d")]}</td></tr>',
					'<tr><td>完成量:</td><td align="right">{PercentDone}%</td></tr>',
					'</table>').compile(),

			viewModel : {
				start : start,
				end : end,
				columnType : 'monthAndQuarters',
				viewBehaviour : Sch.ViewBehaviour.MonthView
			},

			// Setup your static columns
			colModel : new Ext.ux.grid.LockingColumnModel({
				columns : [{
					header : '' + getResource('resourceParam480') + '',
					css : 'leaf',
					sortable : true,
					dataIndex : 'Name',
					locked : true,
					width : 200,
					disabled : false,
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						var str = record.data.Name;
						var statusCss = '';
						if (record.data.type == '2') {
							statusCss = contants.projectCss(record.data.Status);
						} else {
							statusCss = contants.user();
						}

						if (record.data.hidden == false && AppLoad.flag == 1) {
							AppLoad.flag = 2
							AppLoad.startDate = record.data.StartDate;
						}

						// } else {
						// statusCss = contants.projectCss(record.data.Status);
						// }
			        var strs="<table class='x-grid3-row-table' border='0' cellspacing='0' cellpadding='0'>"+
                        "<tbody><tr>" +
                                "<td width='18px'><span class='"+statusCss+"' style='float:left;white-space:nowrap;overflow:hidden;padding:0px 0;height:16px;width:16px;'></span></td>" +
                                "<td><span class='task-schedule-name' title=\""+record.data.Names+"\">"
                              + record.data.Names
                              + "</a></span></td>" +
                                "</tr></tbody></table>";

						return strs;
					}
				}
				// editor : new Ext.form.TextField()
				// },{
				// header : '类型',
				// sortable:true,
				// width:60,
				// dataIndex : 'TypeName',
				// locked : true,
				// disabled:true
				// },{
				// header : '负责部门',
				// sortable:true,
				// width:80,
				// dataIndex : 'Department',
				// locked : true,
				// disabled:true
				// },{
				// header : '负责人',
				// sortable:true,
				// width:60,
				// dataIndex : 'UserName',
				// locked : true,
				// disabled:true
				// },{
				// header : '状态',
				// sortable:true,
				// width:60,
				// dataIndex : 'StatusName',
				// locked : true,
				// disabled:true
				// }
				// ,{
				// header : '计划开始时间',
				// sortable:true,
				// width:100,
				// dataIndex : 'StartDate',
				// locked : true,
				// disabled:true,
				// renderer: Ext.util.Format.dateRenderer('Y-m-d')
				// // editor : new Ext.form.DateField({
				// // format: 'Y-m-d'
				// // })
				// },
				// {
				// header : '计划结束时间',
				// sortable:true,
				// width:100,
				// dataIndex : 'EndDate',
				// locked : true,
				// disabled:true,
				// renderer: Ext.util.Format.dateRenderer('Y-m-d')
				// },
				// ,{
				// header : '实际开始时间',
				// sortable:true,
				// width:100,
				// dataIndex : 'AstartDate',
				// locked : true,
				// disabled:false,
				// renderer: Ext.util.Format.dateRenderer('Y-m-d')
				// },
				// {
				// header : '实际结束时间',
				// sortable:true,
				// width:100,
				// dataIndex : 'AendDate',
				// locked : true,
				// disabled:false,
				// renderer: Ext.util.Format.dateRenderer('Y-m-d')
				// }
				// ,
				// {
				// header : '计划完工',
				// sortable:true,
				// width:80,
				// disabled:true,
				// dataIndex : 'Duration',
				// renderer: function(v, m, r) {
				// var d =
				// Math.round(Date.getDurationInHours(r.get('StartDate'),
				// r.get('EndDate'))/12) / 2;
				// if (d > 0) {
				// return d + '天';
				// }
				// },
				// locked : true
				// // editor: new Ext.ux.form.SpinnerField({
				// // allowBlank:false,
				// // minValue : 0,
				// // decimalPrecision: 1,
				// // incrementValue : 1
				// // })
				// },
				// {
				// header : '完成量%',
				// sortable:true,
				// width:80,
				// disabled:true,
				// dataIndex : 'PercentDone',
				// renderer: function(v, m, r) {
				// return typeof v === 'number' ? (v + '%') : '';
				// },
				// locked : true
				// // editor: new Ext.ux.form.SpinnerField({
				// // allowBlank:false,
				// // minValue : 0,
				// // maxValue : 100,
				// // incrementValue : 10
				// // })
				// }
				]
			}),
			store : store,
			dependencyStore : dependencyStore,
			trackMouseOver : false,
			stripeRows : true,
			tbar : [{
				iconCls : 'icon-prev',
				scale : 'medium',
				handler : function() {

					g.setView(g.getStart().add(Date.MONTH, -1), g.getEnd().add(
									Date.MONTH, -1));
				}
			},
					// {
					// text : '缩放',
					// iconCls : 'zoomfit',
					// handler : function() {
					// var first = new Date(9999,0,1), last = new Date(0);
					//                        
					// this.grid.store.each(function(r) {
					// first = Date.min(r.get('StartDate'),first);
					// last = Date.max(r.get('EndDate'),last);
					// });
					//                        
					// first = first.clone();
					// first.setDate(1);
					// first = first.add(Date.MONTH, -1);
					// last = last.clone();
					// last.setDate(1);
					// last = last.add(Date.MONTH, 1);
					//                        
					// this.grid.setView(first, last, 'monthAndQuarters');
					// this.grid.fitTimeColumns();
					// },
					// scope : this
					// },
					{
						id : 'span1',
						enableToggle : true,
						text : '1个月',
						toggleGroup : 'span',
						handler : function() {
							var s = g.getStart();
							s.setDate(1);
							g.setView(s, s.add(Date.MONTH, 1), 'monthAndDays');
						}
					}, '            ', {
						id : 'span2',
						enableToggle : true,
						text : '6个月',
						toggleGroup : 'span',
						handler : function() {
							var s = g.getStart();
							s.setDate(1);
							g.setView(s, s.add(Date.MONTH, 6),
									'monthAndQuarters');
						}
					}, {
						id : 'span3',
						enableToggle : true,
						pressed : true,
						text : '1 年',
						toggleGroup : 'span',
						handler : function() {
							var s = g.getStart();
							s.setMonth(0);
							s.setDate(1);
							g.setView(s, s.add(Date.MONTH, 12),
									'monthAndQuarters');
						}
					}, {
						id : 'span4',
						text : '全部',
						itemId : 'myAction4',
						hidden : true,
						menu : [new Ext.Action({
									id : 'ganttptime',
									text : '计划',
									handler : function() {
										Ext
												.each(
														Ext
																.query('.sch-event-wrap'),
														function(item, index,
																allItems) {
															var divid = item.id;
															if (divid == 'aatime-gantt') {
																item.style.display = 'none';
															} else if (divid == 'ptime-gantt') {
																item.style.display = '';
															} else if (divid == 'all-gantt') {
																item.style.display = 'none';
															}
														});
										Ext.getCmp('span4').setText('计划');
									}
								}), new Ext.Action({
									id : 'ganttctime',
									text : '实际',
									handler : function() {
										Ext
												.each(
														Ext
																.query('.sch-event-wrap'),
														function(item, index,
																allItems) {
															var divid = item.id;
															if (divid == 'aatime-gantt') {
																item.style.display = '';
															} else if (divid == 'ptime-gantt') {
																item.style.display = 'none';
															} else if (divid == 'all-gantt') {
																item.style.display = 'none';
															}
														});
										Ext.getCmp('span4').setText('实际');
									}
								}), new Ext.Action({
									id : 'ganttall',
									text : '全部',
									handler : function() {
										// var a=Ext.query('.x-grid3-row');
										// Ext.each(a,function(item,index,allItems){
										// item.style.height='20px';
										// });
										Ext
												.each(
														Ext
																.query('.sch-event-wrap'),
														function(item, index,
																allItems) {
															var divid = item.id;
															if (divid == 'aatime-gantt'
																	|| divid == 'ptime-gantt') {
																item.style.display = 'none';
															} else if (divid == "all-gantt") {
																item.style.display = '';
															}
														});
										Ext.getCmp('span4').setText('全部');
									}
								})]
					}, '->',
//                    {
//						text : '全部' + getResource('resourceParam506') + '',
//						iconCls : 'icon-collapseall',
//						scope : this,
//						handler : function() {
//							this.grid.store.collapseAll();
//						}
//					}, {
//						text : '全部展开',
//						iconCls : 'icon-expandall',
//						scope : this,
//						handler : function() {
//							this.grid.store.expandAll();
//						}
//					}, 
                        {
						iconCls : 'icon-next',
						scale : 'medium',
						handler : function() {
							g.setView(g.getStart().add(Date.MONTH, 1), g
											.getEnd().add(Date.MONTH, 1));
						}
					}],
			// plugins : [new Sch.gantt.plugins.TaskContextMenu()],
			bbar : new Ext.PagingToolbar({ // 定义下方工作面板
				pageSize : 25,
				store : store,
				// eventStore:eventStore,
				displayInfo : true,
				displayMsg : '' + getResource('resourceParam946')
						+ '{0} - {1} ' + getResource('resourceParam949')
						+ ' {2} 行'
			})
		});

		return g;
	}
};
