var mytaskGrid = {
	sm : null,
	setcm1 : null,
	setcm2 : null,
	proxy : null,
	scxzgrid : null,
	updateDialog : null,
	taskid : null,
	uvalue : null,
	showTaskPath:false,
	taskd : null
}
mytaskGrid.init = function() {
	mytaskGrid.percentColumn = new Ext.ux.grid.ProgressColumn({
		header : "" + getResource('resourceParam457') + "", //百分比
		dataIndex : 'completedamount',
		width : 85,
		sortable : true,
		renderer : function(v, p, record) {
			var style = '';
			var textClass = (v < 55) ? 'x-progress-text-back' : 'x-progress-text-front' + (Ext.isIE6 ? '-ie6' : '');
			// ugly hack to deal with IE6 issue
			var text = String.format('</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
				textClass, Ext.id(), v + this.textPst);
			text = (v < 96) ? text.substring(0, text.length - 6) : text.substr(6);
			if (record.data.outPutColor == 'red') {
				style = '-red';
			} else if(record.data.outPutColor == 'orange'){
				style = '-orange';
			}else
            {
                style = '-green';
            }
			p.css += ' x-grid3-progresscol';
			if(record.get('enumHandler')=='MyTaskFeedBackHandler.bySubTask') {
				return String.format('<div title="'+getResource('resourceParam9789')+'" class="x-progress-wrap" style="margin-left:-6px;"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>' + '</div>', style, v, text);
			} else {
				return String.format('<div title="' + getResource('resourceParam5026') + '" class="x-progress-wrap" style="margin-left:-6px;"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>' + '</div>', style, v, text);
			}
		},
		textPst : '%', // string added to the end of the cell value (defaults to '%')
		actionEvent : 'click', // click event (defaults to 'dblclick')
		// colored : true // True for pretty colors, false for just blue (defaults to false)
		onClick : function(e, target) {
			if (e.getTarget('.x-grid3-row') != null && e.getTarget('.x-grid3-row') != undefined && e.getTarget('.x-grid3-row') != '') {
				var rowIndex = e.getTarget('.x-grid3-row').rowIndex;
				var colIndex = this.view.findCellIndex(target.parentNode.parentNode);
				mytaskGrid.rowIndex = rowIndex;
				mytaskGrid.columnIndex = colIndex;
				var record = this.grid.store.getAt(rowIndex);
				var taskstatusid = record.get('taskstatusid');
				var taskdesignate = record.get('taskdesignate');
				var enumHandler = record.get('enumHandler');
				if (taskstatusid == 4) {
					if (taskdesignate != 1) {
						var t = e.getTarget('.x-progress-text');
						if (t) {
							if (enumHandler == 'default' || enumHandler == "") {
								this.grid.startEditing(rowIndex, colIndex);
							}else if(enumHandler == 'MyTaskFeedBackHandler.bySubTask'){//去除根据子任务统计的onClick事件
							} else {
								var handler = eval(enumHandler);
								handler(record);
							}
						}
					}
				}
			}
		},

		editor : new Ext.form.NumberField({
			allowBlank : false,
			allowNegative : false,
			allowDecimals : false,
			style : 'text-align:left',
			minValue : 1,
			maxValue : 99,
			listeners : {
				change : function(field, newValue, oldValue) {
					mytaskGrid.grid.stopEditing();
					var record = mytaskGrid.ds.getAt(mytaskGrid.rowIndex);
					var enumHandler = record.get('enumHandler');
					if(enumHandler == 'default' || enumHandler == "") {
					} else {
						//不是人工填写时，直接返回
						newValue=oldValue;
						record.set('completedamount', newValue);
						record.commit();
						return;
					}
					Ext.Ajax.request( {
						url : '../JSON/mytask_MyTaskRemote.modifyTaskAmount',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							if (obj.success == true) {
								record.commit();
							} else {
								record.set('completedamount', oldValue);
								record.commit();
								Ext.MessageBox.show( {
									title : '' + getResource('resourceParam499') + '',//错误
									msg : "进度不能大于100！",
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR,
									width : 200
								});
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							taskid : record.get('taskid'),
							taskdesignate : record.get('taskdesignate'),
							completedamount : newValue
						}
					});
				}
			}
		})
		// Define an editor if you want to edit
	});

	var strurl = "";
	strurl = '../JSON/mytask_MyTaskRemote.getMyTaskList';
	mytaskGrid.proxy = new Ext.data.HttpProxy( {
		method:'GET',
		restful : true,
		// autoLoad : true,
		url : strurl
	});
	mytaskGrid.reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'taskid'
	}, ['taskid', 'taskname', 'taskcategoryid', 'plannedamount',
		'completedamount', 'actualmanhour', 'taskcategoryname',
		'taskstatusid', 'issuedmanname', 'taskstatusname',
		'plannedstartstr', 'plannedendstr', 'actualstartstr',
		'actualendstr', 'projectid', 'projectName', 'taskdesignatestatus',
		'chargedmanid', 'truename', 'color', 'issuedmanid', 'projectname',
		'taskdesignate', 'chargeddepid', 'instname', 'isApproval', 'valid',
		'msg', 'taskUserStartTime', 'taskUserEndTime', 'taskUserMemo',
		'enumName', 'enumId', 'enumHandler', 'plannedquantity',
		'completedquantity', 'applicationid', 'path','outPutColor'

	]);
	mytaskGrid.ds = new Ext.data.Store( {
		proxy : mytaskGrid.proxy,
		reader : mytaskGrid.reader,
		baseParams : {
			taskstatusstr : ''
		},
		remoteSort : true
	});
	mytaskGrid.setcm1();
	mytaskGrid.cm.defaultSortable = true;
	var plugin = [ mytaskGrid.percentColumn ];
	var viewConfig={
		// forceFit : true,
		enableRowBody : true,
		showPreview : mytaskGrid.showTaskPath,
		getRowClass : function(record, rowIndex, p, store) {
			if (this.showPreview) {
				var path = record.get('path');
				var len = path.length;
				p.body = '<div style="margin-left:50px;">任务路径: ';
				for (i = 0; i < len; i++) {
					var img='';
					if(path[i].iconCls){
						img=path[i].iconCls.split('-')[1];
					}
					p.body +='<img src="../base/icons/p2m/'+img+'.png"  style="vertical-align:middle;margin-left:8px;">';
					p.body +='<span style="margin-left:4px;">'+path[i].text+'<span>';
					if(i!=len-1){
						p.body +='<span style="margin-left:8px;">/<span>';
					}
				}
				p.body += '</div>';
				return 'x-grid3-row-expanded';
			} else {
				return 'x-grid3-row-collapsed';
			}
		}
	};
	mytaskGrid.grid = myGrid.initBox(mytaskGrid.ds, mytaskGrid.cm, null, mytaskGrid.sm, plugin, viewConfig);
	if(mytaskGrid.showTaskPath==true){
		mytaskGrid.grid.getBottomToolbar().insert(0, new Ext.Button({
			tooltip : '隐藏任务路径',
			enableToggle : true,
			iconCls : 'icon-taskStructure',
			pressed : false,
			toggleHandler : function() {
                var ispath="0";
				if (this.pressed) {
					this.setTooltip('显示任务路径');
                    ispath = '0';
				} else {
					this.setTooltip('隐藏任务路径');
                    ispath = '1';
				}
				var preview=mytaskGrid.grid.getView().showPreview;
				mytaskGrid.grid.getView().showPreview=!preview;
				mytasklist.baseargsfz.isPath=ispath; 
	            myGrid.loadvalue(mytasklist.grid.store, mytaskMain.args, mytasklist.baseargsfz);
			}
		}));
	}else{
		mytaskGrid.grid.getBottomToolbar().insert(0, new Ext.Button( {
			tooltip : '显示任务路径',
			enableToggle : true,
			iconCls:'icon-taskStructure',
			pressed : false,
			toggleHandler : function() {
                var ispath="1";
				if (this.pressed) {
					this.setTooltip('隐藏任务路径');
                    ispath = '1';
				} else {
					this.setTooltip('显示任务路径');
                    ispath = '0';
				}
				var preview=mytaskGrid.grid.getView().showPreview;
				mytaskGrid.grid.getView().showPreview=!preview;
				mytasklist.baseargsfz.isPath=ispath; 
                myGrid.loadvalue(mytasklist.grid.store, mytaskMain.args, mytasklist.baseargsfz);
			}
		}));
	}
	return mytaskGrid.grid;

}
mytaskGrid.setcm1 = function() {
	mytaskGrid.sm = new Ext.grid.CheckboxSelectionModel();
	mytaskGrid.cm = new Ext.grid.ColumnModel([
		new Ext.grid.RowNumberer(),
		mytaskGrid.sm,
		{
			header : "" + getResource('resourceParam998') + "",//任务名称
			dataIndex : 'taskname',
			sortable : true,
			width : 150,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
				var str = record.data.taskname;
				mytaskGrid.taskd = record.data.taskdesignate;
				var s = "" + getResource('resourceParam454') + "";
				if (record.data.taskdesignatestatus == "1") {
					s = "" + getResource('resourceParam454') + "";
				} else {
					s = '' + getResource('resourceParam509') + '';
				}
				
				var valid = record.data.valid;
				var validMessage = '';
				var qtip = '';
				if (valid == false) {
					validMessage = "<img  src='../images/alarm.gif' style='width:12px;heigth:12px;paddin-left:40px'/>";
					var msg = record.data.msg;
					if (mytaskGrid.taskd == "3" || mytaskGrid.taskd == "4") {
						msg += "<br/>" + getResource('resourceParam1442') + "：" + record.data.taskUserStartTime + "<br/>"
							+ getResource('resourceParam1443') + "：" + record.data.taskUserEndTime + "<br/>" 
							+ getResource('resourceParam1446') + "：" + record.data.taskUserMemo;
					}
					qtip = "ext:qtip='" + msg + "' ";
				} else {
					if (mytaskGrid.taskd == "3" || mytaskGrid.taskd == "4") {
						var msg = getResource('resourceParam1442') + "：" + record.data.taskUserStartTime + "<br/>"
							+ getResource('resourceParam1443') + "：" + record.data.taskUserEndTime + "<br/>"
							+ getResource('resourceParam1446') + "：" + record.data.taskUserMemo;
						qtip = "ext:qtip='" + msg + "' ";
					}
				}
				if (mytaskGrid.taskd == "1") {
					strs = "<a href='javascript:void(0);' tag='" + record.data.projectid + "' onclick='mytaskMain.detailsOnclick(&quot;"
						+ str + "&quot;," + record.data.taskid + "," + record.data.projectid + "," + record.data.taskstatusid
                        + "," + mytaskGrid.taskd + ");'>" + validMessage + "<span " + qtip 
						+ ";font-weight:bold;'>" + record.data.taskname + "&nbsp;&nbsp;</span></a><span style='color:green'>("
						+ s + "" + getResource('resourceParam1453') + ")</span>" + "&nbsp;&nbsp;<a href='javascript:void(0);' onclick='mytaskMain.recoverydesignate("
						+ record.data.taskid + ");'><span style='color:blue'>" + getResource('resourceParam1454') + "</span></a>";
				} else if (mytaskGrid.taskd == "3") {
					/**
					 * bug编号30
					 * 第二次修改
					 * @author wangyf
					 * 2011-05-06 15:37
					 */
//					strs = validMessage + "<span " + qtip + "  style='color:" + record.data.color + ";font-weight:bold;'>"
//						+ record.data.taskname + "&nbsp;&nbsp;</span>"
//						+ "<a href='javascript:void(0);' onclick='mytaskMain.jieshoudesignate(" + record.data.taskid + ");'>"
//						+ "<span style='color:blue'>(" + getResource('resourceParam1342') + "<span></a>"
//						+ "&nbsp;&nbsp;<a href='javascript:void(0);' onclick='mytaskMain.jujuedesignate(" + record.data.taskid + ");'>"
//						+ "|  <span style='color:blue'>" + getResource('resourceParam583') + " " + getResource('resourceParam1433')
//						+ ")</span></a>" + "&nbsp;";
					strs = "<a href='javascript:void(0);' tag='" + record.data.projectid + "' onclick='mytaskMain.detailsOnclick(&quot;"
						+ str + "&quot;," + record.data.taskid + "," + record.data.projectid + "," + record.data.taskstatusid
                        + "," + mytaskGrid.taskd + ");'>" + validMessage + "<span " + qtip 
                        + ";font-weight:bold;'>" + record.data.taskname + "&nbsp;&nbsp;</span></a>"
						+ "<a href='javascript:void(0);' onclick='mytaskMain.jieshoudesignate(" + record.data.taskid
						+ ");'>" + "<span style='color:blue'>(" + getResource('resourceParam1342') + "<span></a>"
						+ "&nbsp;&nbsp;<a href='javascript:void(0);' onclick='mytaskMain.jujuedesignate(" + record.data.taskid + ");'>"
						+ "|  <span style='color:blue'>" + getResource('resourceParam583') + " " + getResource('resourceParam1433')
						+ ")</span></a>" + "&nbsp;";
				} else if (mytaskGrid.taskd == "4") {
					strs = "<a href='javascript:void(0);' tag='" + record.data.projectid + "' onclick='mytaskMain.detailsOnclick(&quot;"
						+ str + "&quot;," + record.data.taskid + "," + record.data.projectid + ","
                        + record.data.taskstatusid + "," + mytaskGrid.taskd + ");'>" + validMessage + "<span  " + qtip
						+ "  ;font-weight:bold;'>" + record.data.taskname
						+ "&nbsp;&nbsp;</span></a>(" + getResource('resourceParam1452') + ")&nbsp;&nbsp;";
				} else {
					var strs = "<a href='javascript:void(0);' tag='" + record.data.projectid + "' onclick='mytaskMain.detailsOnclick(&quot;"
						+ str + "&quot;," + record.data.taskid + "," + record.data.projectid + "," + record.data.taskstatusid
                        + "," + null + ");'>" + validMessage + "<span  " + qtip 
						+ ";font-weight:bold;'>" + record.data.taskname + "</span></a>";
				}
				return strs;
			}
		}, {
			header : "" + getResource('resourceParam2001') + "",
			dataIndex : 'projectName',
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
				var taskid = record.data.taskid;
				var taskname = record.data.taskname;
				var status = record.data.taskstatusid;
				return '<a href="javascript:void(0);" style="color:blue" onclick="mytaskGrid.taskPath(\'' + taskid
					+ '\', \'' + taskname + '\',\'' + status + '\')">' + value + '</a>'
			},
			width : 80
		}, {
			header : "" + getResource('resourceParam500') + "",
			width : 60,
			sortable : true,
			dataIndex : 'taskstatusname'
		}, {
			header : "" + getResource('resourceParam481') + "",
			width : 60,
			sortable : true,
			dataIndex : 'taskcategoryname'
		}, {
			header : '' + getResource('resourceParam9123') + '',
			width : 120,
			sortable : true,
			dataIndex : 'enumName'
		}, mytaskGrid.percentColumn, {
			header : getResource('resourceParam5027'),
			dataIndex : 'actualmanhour',
			width : 85,
			editable : true,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
				return value + getResource('resourceParam5028');
			},
			editor : new Ext.form.NumberField({
				allowBlank : false,
				allowNegative : false,
				allowDecimals : false,
				style : 'text-align:left',
				minValue : 0,
				maxValue : Math.pow(2, 31) - 1,
				listeners : {
					focus : function(field) {
						var record = mytaskGrid.ds.getAt(mytaskGrid.rowIndex);
						var taskstatusid = record.get('taskstatusid');
						var taskdesignate = record.get('taskdesignate');
						if (taskstatusid == 4) {
							if (taskdesignate != 1) {
								// mytaskGrid.grid.startEditing();
							} else {
								mytaskGrid.grid.stopEditing();
							}
						} else {
							mytaskGrid.grid.stopEditing();
						}
					},
					change : function(field, newValue, oldValue) {
						mytaskGrid.grid.stopEditing();
						var record = mytaskGrid.ds.getAt(mytaskGrid.rowIndex);
						Ext.Ajax.request( {
							url : '../JSON/mytask_MyTaskRemote.modifyTaskActualManhour',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if (obj.success == true) {
									record.commit();
								} else {
									record.set('actualmanhour', oldValue);
									record.commit();
									Ext.MessageBox.show( {
										title : '' + getResource('resourceParam499') + '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								taskid : record.get('taskid'),
								taskdesignate : record.get('taskdesignate'),
								actualmanhour : newValue
							}
						});
					}
				}

			})
		}, {
			header : "" + getResource('resourceParam991') + "",
			width : 80,
			sortable : true,
			dataIndex : 'plannedstartstr'
		}, {
			header : "" + getResource('resourceParam1032') + "",
			width : 80,
			sortable : true,
			dataIndex : 'plannedendstr',
            renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
               var str = record.data.plannedendstr;
               return "<span style='color:" + record.data.color + ";font-weight:bold;'>"+str+"</span>";
            }
		}, {
			header : "" + getResource('resourceParam856') + "",
			width : 80,
			sortable : true,
			dataIndex : 'actualstartstr'
		}, {
			header : "" + getResource('resourceParam1033') + "",
			width : 80,
			sortable : true,
			dataIndex : 'actualendstr'
		}
		/**
		, { header: "派发人", width:60, dataIndex: 'truename' }
		*/
	]);
}

mytaskGrid.taskPath = function(taskid, taskname, status) {
	var loader = new Ext.tree.TreeLoader( {
		url : '../JSON/task_TaskRemote.getFullPath'
	});
	loader.baseParams = {
		taskId : taskid,
		taskid : taskid,
		taskname : taskname,
		taskstatusid : status
	};
	var root = new Ext.tree.AsyncTreeNode( {
		id : '',
		text : ''
	});
	var pathTree = new Ext.tree.TreePanel( {
		id : 'pathTree',
		split : true,
		/**
		 * bug318
		 */
//		height : 232,
//		width : 183,
		autoScroll : true,
		loader : loader,
		root : root,
		rootVisible : false,
		tbar : new Ext.Toolbar( {
			items : [ {
				xtype : 'button',
				text : "" + getResource('resourceParam2004') + "",
				handler : function() {
					pathTree.expandAll();
				}
			}, {
				xtype : 'button',
				text : "" + getResource('resourceParam2005') + "",
				handler : function() {
					pathTree.collapseAll();
				}
			} ]
		})
	});
	/**
	 * bug编号318 
	 * @author wangyf
	 * 2011-04-22
	 */
	var window = new Ext.Window({
		id : 'taskPathWin',
		title : "" + getResource('resourceParam2003') + "",
		width : '200',
		height : '300',
		layout : 'fit',
		resizable : false,
		modal : true,
		/**
		 * bug318
		 */
//		plain : true,
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