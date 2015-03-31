var dataCateList = {
	grid : null,
	start : 0,
	checkrecord : null,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	flag : '1' // 1 :datacenter 2, 任务
};
dataCateList.init = function() {
	var strurl = '../JSON/datacenter_DataCenterRemote.getKnowledgeDataCateList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'categoryinstanceid', 'categoryinstancename',
				'categorytype', 'truename', 'departmentname', 'createtime',
				'description', 'version', 'revision', 'categoryid']);
	var ascid = 'id';
	var ascstr = 'asc';
	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});
	var sm = new Ext.grid.CheckboxSelectionModel({
		listeners : {
			rowselect : function(sm, rowIndex, r) {
				if (sm.getCount() > 1) {
				dataCateList.checkrecord = null;
//					setDataPrivilege.mutiFirst = true;
				} else {
				dataCateList.checkrecord = r;
//					setDataPrivilege.mutiFirst = false;
				}
			},
			selectionchange : function(sm) {//选中的行
				if (sm.getCount() == 1) {
					var sm = dataCateList.grid.getSelectionModel();
					var count = sm.getCount();
					var records = sm.getSelections();
					var record;
					for (var i = 0; i < count; i++) {
						record = records[i];
						dataCateList.checkrecord = record;
					}
				} else {
					dataCateList.checkrecord = "";
					return ;
				}
			}
		}
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, new Ext.grid.RowNumberer(), {
			header : "" + getResource('resourceParam480') + "",  //名称
			dataIndex : 'categoryinstancename',
			width : 200,
			renderer : function(value, p, record) {
				if (dataCateList.flag == 1) {
					return '<a href="javascript:void(0);" style="color:blue;text-decoration:underline;" onclick="datacentermain.setActiveItem(1,'
					+ '\'' + record.get('categoryinstanceid') + '\', \'' + record.get('categoryinstancename') + '\', \'' + record.get('categoryid') + '\',\'' + record.get('description')+'\')">'
							+ value
							+ '</a>';
				} else {
					return value;
				}
			}
		}, {
			header : "" + getResource('resourceParam1248') + "", //创建人
			dataIndex : 'truename',
			width : 150
		}, {
			header : "" + getResource('resourceParam1292') + "",
			dataIndex : 'departmentname',
			width : 300
		}, {
			header : "" + getResource('resourceParam9166') + "",
			dataIndex : 'createtime',
			width : 150
		}, {
			header : "" + getResource('resourceParam648') + "",  //描述
			dataIndex : 'description',
			width : 400,
				renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						var name = '';
						if (value.length > 20) {
							for (i = 0; i < value.length; i = i + 20) {
								name = name + value.substring(i, i + 20) + ' ';
							}
						} else {
							name = value;
						}
	
	                    if(value.length>30){
	                        value= value.substring(0,30)+'...';
	                    }
						return '<font ext:qtip="' + name + '">' + value + '</font>';
					}
		}]
	});
	var addmenu = new Ext.menu.Menu({
				id : 'addmenu',
				items : [{
							text : '' + getResource('resourceParam1725') + '',
							listeners : {
								'click' : function() {
					               kowleDateCateAddFri.init();
								}
							}
						}]

			});
	var tb = [{
		text : '' + getResource('resourceParam483') + '', //新建
		id : 'addNew',
		iconCls : 'add1',
		listeners : {
			'afterrender' : function(btn) {},
			'click' : function() {
				dateCateAddFri.init();
			}
		}
	}, '-', {
		text : '' + getResource('resourceParam490') + '',// 编辑
		id : 'updateNew',
		iconCls : 'edit1',
		listeners : {
			'click' : function() {
		        var checkObj = dataCateList.checkrecord;
		        if(checkObj){
		        	dataInstanceUpdate.init(checkObj
							.get("categoryinstanceid"),
							checkObj.get("categoryinstancename"),
							checkObj.get("description"), 1);
		        }else{
		        	configAlert();
		        }
		      
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam475') + '',
		id : 'delcat',
		iconCls : 'del1',
		listeners : {
			'click' : function() {
				var sm = dataCateList.grid.getSelectionModel();
				var count = sm.getCount();
				if(count == "0"){
					configAlert();
					return;
				}
				var records = sm.getSelections();
				var record;

				var idSequence = '';
				for (var i = 0; i < count; i++) {
					record = records[i];
					idSequence += record.get('categoryinstanceid') + ',';

				}
				idSequence = idSequence.substring(0,idSequence.length-1);
				Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
								+ getResource('resourceParam1720') + "?",
						function(btn) {
							if (btn == 'yes') {
								Ext.Ajax.request({
									url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
									method : 'POST',
									success : function(response, options) {
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == true) {
//											window.parent.removenode(idSequence);
										} else {
											Ext.MessageBox.show({
												title : ''
														+ getResource('resourceParam1724')
														+ '',
												msg : ''
														+ getResource('resourceParam651')
														+ '',
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											})

										}
										myGrid.loadvalue(
												dataCateList.grid.store,
												dataCateList.args,
												dataCateList.baseargs);
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										idSequence : idSequence
									}
								});
							}
						});
			}
		}

	}, '-', {
		text : '' + getResource('resourceParam652') + '',
		id : 'querycat',
		iconCls : 'search1',
		listeners : {
			'click' : function() {
				var name = new Ext.form.TextField({
							fieldLabel : '&nbsp&nbsp' + getResource('resourceParam480')
									+ '',
							anchor : '95%',
							style : 'margin-bottom: 2px;'
						});
				var createtime = new Ext.form.DateField({
							fieldLabel : '&nbsp&nbsp' + getResource('resourceParam981')
									+ '',
							format : 'Y-m-d'

						});
				departmentUser.init('' + getResource('resourceParam689') + '',
						'' + getResource('resourceParam1248') + '');
				var queryForm = new Ext.form.FormPanel({

					items : [name, createtime],
					defaults : {
						anchor : '90%'

					},
					buttons : [{
						text : '' + getResource('resourceParam479') + '',
						listeners : {
							'click' : function() {
								dataCateList.grid.getStore().on('beforeload',
										function(store, options) {
											options.params.name = name
													.getValue();
											options.params.createtime = Ext.util.Format
													.date(
															createtime
																	.getValue(),
															'Y-m-d');
											options.params.start = 0;
											options.params.limit = 25;
										});
								dataCateList.grid.getStore().load();
								queryWin.hide();
							}
						}
					}, {
						text : '' + getResource('resourceParam606') + '',
						listeners : {
							'click' : function() {
								queryForm.getForm().reset();
							}
						}
					}]
				});
				var queryWin = new Ext.Window({
							title : '' + getResource('resourceParam652') + '',
							layout : 'fit',
							width : 340,
							height : 130,
							modal : true,
							items : [queryForm]
						});
				queryWin.show();
			}
		}

	}];
	dataCateList.grid = myGrid.init(ds, cm, null, sm);

	myGrid.loadvalue(dataCateList.grid.store, dataCateList.args,dataCateList.baseargs);
	dataCateList.mainPanel = new Ext.Panel({
				 layout : 'fit',
				 tbar : tb,
				 items : [dataCateList.grid]
			});
	return dataCateList.mainPanel;
}
