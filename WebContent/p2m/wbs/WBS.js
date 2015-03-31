Ext.ns('Sysware.P2M');
Sysware.P2M.WBS = Ext
		.extend(
				Ext.ux.grid.livegrid.GridPanel,
				{
					bufferSize : 60,// 缓冲大小
					myView : new Ext.ux.grid.livegrid.GridView( {
						nearLimit : 20,
						enableRowBody : true,
						loadMask : {
							msg : '加载中...'
						},
						getRowClass : function(record, rowIndex, rp, ds) {
						}
					}),
					currentNode : {
						projectId : null,
						taskId : null
					},
					setCurrentNode : function(config) {
						if (!config)
							return;
						this.currentNode.projectId = config.projectId ? config.projectId
								: 0;
						this.currentNode.taskId = config.taskId ? config.taskId
								: 0;
					},
					refresh : function() {
						this.store.baseParams = {
							projectId : this.currentNode.projectId,
							taskId : this.currentNode.taskId
						}
						var view = this.myView;
						this.store.load( {
							params : {
								start : 0,
								limit : this.bufferSize
							},
							scope : this.store,
							callback : function() {
								view.reset(false);
							},
							suspendLoadEvent : false
						});
					},
					loadMask : {
						msg : '加载中...'
					},
					initComponent : function() {
						var self = this;
						var percentColumn = new Ext.ux.grid.ProgressColumn( {
							header : '完成百分比', // 百分比
							dataIndex : 'completedamount',
							width : 85,
							sortable : true,
							renderer : function(v, p, record) {
							            var style = '';
										var textClass = (v < 55) ? 'x-progress-text-back'
												: 'x-progress-text-front' + (Ext.isIE6 ? '-ie6'
														: '');
										// ugly hack to deal with IE6 issue
										var text = String
												.format(
														'</div><div class="x-progress-text {0}" style="width:100%;" id="{1}">{2}</div></div>',
														textClass, Ext.id(), v
																+ this.textPst);
										text = (v < 96) ? text.substring(0,
												text.length - 6) : text
												.substr(6);

										if (record.data.color == 'red') {
											style = '-red';
										} else {
											style = '-green';
										}
										p.css += ' x-grid3-progresscol';
										return String
												.format(
														'<div title="' + getResource('resourceParam5026') + '" class="x-progress-wrap" style="margin-left:-6px;"><div class="x-progress-inner"><div class="x-progress-bar{0}" style="width:{1}%;">{2}</div>' + '</div>',
														style, v, text);
							},
							textPst : '%'
						});

						Ext
								.apply(
										this,
										{
											enableDragDrop : false,
											cm : new Ext.grid.ColumnModel({
												defaults: {
											        sortable: false,
											        menuDisabled: true
											    },
												columns : [
															new Ext.grid.RowNumberer(
																	{
																		header : '#'
																	}),
															{
																header : getResource('resourceParam480'),// 名称
																align : 'left',
																width : 240,
																id : 'taskname',
																sortable : false,
																dataIndex : 'taskname',
																renderer : function(
																		value,
																		cellmeta,
																		record,
																		rowIndex,
																		columnIndex,
																		store) {
																	var deepLevel = record.data.deepLevel;
																	var body = '<div style="height:15px">';
																	body += '<img src="../base/icons/p2m/elbow-line.gif"  style="vertical-align:middle;">';
																	for ( var i = 0; i < deepLevel; i++) {
																		body += '<img src="../base/icons/p2m/elbow-line.gif"  style="vertical-align:middle;">';
																		if (i == deepLevel - 1) {
																			body += '<img src="../base/icons/p2m/elbow.gif"  style="vertical-align:middle;">';
																		}
																	}
																	body += '<img src="../base/icons/p2m/' + record.data.icon + '.png" style="vertical-align:middle;">';
																	body += '<span style="margin-left:4px;height:18px;">' + value + '<span>';
																	body += '</div>';
																	return body;
																}
															},
															{
																header : '类型',
																dataIndex : 'taskcategoryname'
															},
															{
																header : '发布机构',
																dataIndex : 'instname'
															},
															{
																header : '负责人',
																dataIndex : 'chargedmanname'
															},
															{
																header : '编制人',
																dataIndex : 'issuedmanname'
															},
															percentColumn,
															{
																header : '任务状态',
																dataIndex : 'taskstatusname'
															},
															{
																header : '工期',
																dataIndex : 'duration'
															},
															{
																header : '计划开始时间',
																dataIndex : 'plannedstarttime'
															},
															{
																header : '计划结束时间',
																dataIndex : 'plannedendtime'
															},
															{
																header : '实际开始时间',
																dataIndex : 'actualstarttime'
															},
															{
																header : '实际结束时间',
																dataIndex : 'actualendtime'
															},
															{
																header : '描述',
																dataIndex : 'tasknotes'
															}

													]}),
											autoExpandColumn : 'taskname',
											stripeRows : true,
											columnLines : true,
											plugins : [percentColumn] ,
											store : new Ext.ux.grid.livegrid.Store(
													{
														autoLoad : false,
														url : '../JSON/task_TaskRemote.getTaskWBS',
														bufferSize : self.bufferSize,
														reader : new Ext.ux.grid.livegrid.JsonReader(
																{
																	root : 'data',
																	versionProperty : 'version',
																	totalProperty : 'totalCount',
																	id : 'id'
																},
																[
																		{
																			name : 'taskname'
																		},
																		{
																			name : 'deepLevel'
																		},
																		{
																			name : 'innerOrder'
																		},
																		{
																			name : 'icon'
																		},
																		{
																			name : 'taskcategoryname'// 任务类型
																		},
																		{
																			name : 'instname'// 负责人部门
																		},
																		{
																			name : 'chargedmanname'// 负责人
																		},
																		{
																			name : 'issuedmanname'// 编制人
																		},
																		{
																			name : 'completedamount'// 完成百分比
																		},
																		{
																			name : 'taskstatusname'// 任务状态
																		},
																		{
																			name : 'duration'// 工期
																		},
																		{
																			name : 'plannedstarttime'// 计划开始时间
																		},
																		{
																			name : 'plannedendtime'// 计划结束时间
																		},
																		{
																			name : 'actualstarttime'// 实际开始时间
																		},
																		{
																			name : 'actualendtime'// 实际结束时间
																		},
																		{
																			name : 'tasknotes'// 描述
																		}

																]),
														remoteSort : true,
														listeners : {
															beforeload : function(
																	store,
																	options) {

															},
															load : function() {
															}
														}
													}),
											selModel : new Ext.ux.grid.livegrid.RowSelectionModel(),
											view : self.myView,
											bbar : new Ext.ux.grid.livegrid.Toolbar(
													{
														view : self.myView,
														displayInfo : true,
														displayMsg : '当前行数{0} - {1} 共 {2} 行',
														emptyMsg : "未查询到数据"
													})
										});
						Sysware.P2M.WBS.superclass.initComponent.call(this);
					}
				});

Ext.reg('sysware.p2m.wbs', Sysware.P2M.WBS);
