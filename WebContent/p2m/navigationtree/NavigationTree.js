/*
 * 依赖的js
 * "../js/base/base.js 
 * "../js/base/pagingtree/PagingTreeLoader.js",
 * "../js/common/leftNavigationTree/NavigationTree.js",
 * 
 * 
 */
Ext.ns('Sysware.P2M');
Sysware.P2M.NavigationTree = Ext
		.extend(
				Ext.tree.TreePanel,
				{
					pageSize : 25,// 分页条数
					type : 1,// 过滤项目时需要加的参数（xac）
					statusId: [1,4],//项目状态过滤参数
					refresh : function() {
						var node = this.node == null ? this.root : this.node;
						if(node.attributes.leaf==true){
						    //没有子节点时的刷新
							this.loader.load(node);
							node.expand();
						}else if (!node.isExpanded()) {
							node.expand();
						} else {
							this.loader.load(node);
							node.expand();
						}
					},
					node : this.root,//选中的节点
					initComponent : function() {
						var self = this;
						Ext.tree.TreeLoader.override( {
							requestData : function(node, callback, scope) {
								if (this.fireEvent("beforeload", this, node,
										callback) !== false) {
									if (this.directFn) {
										var args = this.getParams(node);
										args.push(this.processDirectResponse
												.createDelegate(this, [ {
													callback : callback,
													node : node,
													scope : scope
												} ], true));
										this.directFn.apply(window, args);
									} else {
										this.transId = Ext.Ajax.request( {
											method : this.requestMethod,
											url : this.dataUrl || this.url,
											success : this.handleResponse,
											failure : this.handleFailure,
											timeout : this.timeout || 300000,
											scope : this,
											argument : {
												callback : callback,
												node : node,
												scope : scope
											},
											params : this.getParams(node)
										});
									}
								} else {
									this.runCallback(callback, scope || node,
											[]);
								}
							}
						});
						var projectStatusStore = new Ext.data.SimpleStore( {
							fields : [ 'id', 'status' ],
							data : [ [ 1, '编制中' ],[ 11, '审批中' ], [ 4, '进行中' ], [ 5, '确认中' ],
										[ 6, '已完成' ], [ 7, '已终止' ], [ 9, '已暂停' ] ]
						});
						var projectStatus = new Ext.ux.form.LovCombo({
							width : 110,
							listWidth : 150,
							hideOnSelect : false,
							maxHeight : 200,
							store : projectStatusStore,
							triggerAction : 'all',
							valueField : 'id',
							displayField : 'status',
							mode : 'local',
							beforeBlur : Ext.emptyFn,
							selectAll : function() {
								var i = 0;
								this.store.each(function(record) {
									if (i !== 0) {
										record.set(this.checkField, true);
									}
									i++;
								}, this);
								this.setValue(this.getCheckedValue());
							}
						});
						var record = Ext.data.Record.create( [ {
							name : 'status'
						}, {
							name : 'id'
						} ]);
						var selectAll = new record( {
							status : getResource('resourceParam5029'),
							id : '-1'
						});
						var deSelectAll = new record( {
							status : '' + getResource('resourceParam808') + '',
							id : '-2'
						});
						
						projectStatus.on('render', function(combo) {
							var statusIds=self.statusId;
							projectStatus.setValue(statusIds);
						});
						
						projectStatus.on('expand', function(combo) {
							var store = combo.getStore();
							var firstRecord = store.getAt(0);
							if (firstRecord.data.id == -1
									|| firstRecord.data.id == -2) {
								store.remove(firstRecord);
							}
							var checkSum = null;// 选中的总数
								if (combo.getCheckedValue() == '') {
									checkSum = 0;
								} else {
									checkSum = combo.getCheckedValue().split(
											',').length;
								}
								if (checkSum == store.getCount()) {
									// 已全部选中
								store.insert(0, deSelectAll);
							} else {
								store.insert(0, selectAll);
							}
						});
						
						
						projectStatus
								.on(
										'select',
										function(combo, record, index) {
											if (record.data.id == -1) {
												// click selectAll
												record.set('checked', false);
												combo.getStore().remove(record);
												combo.getStore().insert(0,
														deSelectAll);
												combo.selectAll();
												combo.getStore().getAt(0).set(
														'checked', false);
											} else if (record.data.id == -2) {
												// click deSelectAll
												combo.deselectAll();
												combo.getStore().remove(record);
												combo.getStore().insert(0,
														selectAll);
											} else {
												var checkSum = null;// 选中的总数
												if (combo.getCheckedValue() == '') {
													checkSum = 0;
												} else {
													checkSum = combo
															.getCheckedValue()
															.split(',').length;
													if (checkSum < (combo
															.getStore()
															.getCount() - 1)) {
														combo
																.getStore()
																.remove(
																		combo
																				.getStore()
																				.getAt(
																						0));
														combo
																.getStore()
																.insert(0,
																		selectAll);
													}
													if (checkSum == (combo
															.getStore()
															.getCount() - 1)) {
														combo
																.getStore()
																.remove(
																		combo
																				.getStore()
																				.getAt(
																						0));
														combo
																.getStore()
																.insert(0,
																		deSelectAll);
													}
												}
											}
										});
						projectStatus
								.on(
										'blur',
										function() {
											var temp = projectStatus.getValue();
											var str = '';
											var params = "";
											if (temp.length != 0) {
												params = temp + ',';
											} else {
												projectStatus
														.setRawValue(""
																+ getResource('resourceParam1474')
																+ "");
											}
											/*
											 * blur时，给项目树传值
											 */
											var loader=self.getLoader();
											loader.on('beforeload',function(loader,node,callback){
												/*
												 * 勾选下拉后，重新从第一页开始，
												 * 并且传入状态过滤id
												 */
												Ext.apply(loader.baseParams, {
													statusFilter : temp,
													start:0,
													limit:self.pageSize
												});
											},this, {
												single : true
											});
											self.refresh();
										});
						
						
						
						Ext
								.apply(
										this,
										{
											lines : true,
											enableDD : false,
											rootVisible : true,
											collapseFirst : false,
											animate : true,
											border : false,
											autoScroll : true,
											/*
											 * 设置左侧树的最小宽度，
											 * 如果更小projectStatus展示会有问题
											 */
											minWidth : 200,
											tbar:[{text:'项目状态:'},projectStatus],
											tools : [ {
												id : 'refresh',//inorder to show refresh icon
												qtip : '刷新',
												handler : function(eventObject,
														toolEl, panel, tc) {
													self.refresh();
												}
											} ],
											root : new Ext.tree.AsyncTreeNode( {
												id : '0',
												text : 'Root',
												iconCls : 'icon-project',
												contentId: 0,
												allowDrag : false
											}),
											selModel:new Ext.tree.MultiSelectionModel(),
											plugins : [new Ext.ux.tree.TreeNodeMouseoverPlugin(),new Sysware.P2M.TreeState()],
											loader : new Ext.ux.tree.PagingTreeLoader(
													{
														dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
														pageSize : self.pageSize,
														enableTextPaging : true,
														uiProviders : {
															"col" : Ext.tree.TreeNodeUI
														},
														baseParams : {
															contentId : 0,
															statusFilter : self.statusId.join(',')
														},
														pagingModel : 'remote',
														listeners : {
															beforeload : function(
																	treeLoader,
																	node) {
																this.mask.show();
																var selModel=self.selModel;
																self.node = node;
																/*
																 * 如果没有选中该节点，
																 * 在展开时选中该节点
																 */
																
																if(!selModel.isSelected(node)){
																	selModel.select(node);
																}
																if (node.id == 0
																		&& (!node.attributes.childProjectId || node.attributes.childProjectId == '0')) {// root节点展开
																	treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
																	treeLoader.baseParams.contentId = 0;
																	treeLoader.baseParams.tpye = self.type;
																} else if (node.id
																		.indexOf('c') == 0) {// 项目夹展开
																	var contentId = node.id
																			.substring(1);
																	treeLoader.dataUrl = "../JSON/project_ProjectRemote.getProjectTreeById";
																	treeLoader.baseParams.contentId = contentId;
																	treeLoader.baseParams.tpye = self.type;
																} else if (node.id
																		.indexOf("p") == 0
																		|| node.id
																				.indexOf("vp") == 0) {// 项目展开
																	var projectId = base
																			.convertNodeId(
																					node.id)
																			.substring(
																					1);
																	treeLoader.dataUrl = "../JSON/task_TaskRemote.findSubTasks";
																	treeLoader.baseParams.projectId = projectId;
																} else {
																	treeLoader.dataUrl = "../JSON/task_TaskRemote.findSubTasks";
																	treeLoader.baseParams.projectId = node.attributes.projectId;
																	if (node.attributes.relationType == 2) {
																		treeLoader.baseParams.projectId = node.attributes.childProjectId;
																	}
																	treeLoader.baseParams.id = node.id;
																}
															},
															load : function(
																	treeLoader,
																	node) {
																this.mask.hide();
															}
														}
													})
										});
						self.on('click', function(node, eventObject) {
							self.node = node;
						});
						Sysware.P2M.NavigationTree.superclass.initComponent
								.call(this);
					}

				});

Ext.reg('sysware.p2m.navigationtree', Sysware.P2M.NavigationTree);
