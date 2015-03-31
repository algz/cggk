var viewApproveTask = {
		taskId:null
};
viewApproveTask.init = function() {
	viewApproveTask.setBasicForm = function(taskId,callback) {
		if(taskId!=null){
			viewApproveTask.taskId=taskId;
		}
		Ext.Ajax.request({
					url : "../JSON/task_TaskRemote.getTaskInfo",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							viewApproveTask.setViewApproveTaskForm(obj);
						} else {
								if(obj.message!=''&&obj.message!=null)
								{
									Ext.MessageBox.show({
												title : ''+getResource('resourceParam499')+'',
												msg : obj.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
								}
							if(callback){
								callback();
							}
						}
					},
					params : {
						node : viewApproveTask.taskId
					}
				});

	}
	var north = new Ext.Panel( {
		region : 'north',
		border : false,
		bodyStyle : 'padding-top:20px;padding-left:60px;',
		height : 60,
		items : [ {
			layout : 'table',
			border : false,
			items : [ {
				columnWidth : .2,
				xtype : 'label',
				text : ''+getResource('resourceParam1011')+':'
			}, {
				columnWidth : .4,
				checked : true,
				readOnly : true,
				xtype : 'radio',
				boxLabel : ''+getResource('resourceParam1012')+'',
				name : 'method',
				id : 'viewfreeFlowID',
				inputValue : 1,
				listeners : {
					check : function(radio, checked) {
						if (checked) {
						} else {
						}
					}
				}
			}, {
				columnWidth : .4,
				disabled : true,
				readOnly : true,
				xtype : 'radio',
				boxLabel : ''+getResource('resourceParam1006')+'',
				name : 'method',
				id : 'viewMethod2',
				inputValue : 2
			}

			]
		} ]
	});
	viewApproveTask.participantsGrid = viewApproveTask.getUserGrid(false);
	var card1 = new Ext.Panel( {
		border : false,
		bodyStyle : 'padding-left:40px;',
		autoHeight : 200,
		items : [ {
			xtype : 'fieldset',
			title : ''+getResource('resourceParam1015')+'',
			labelWidth : 60,
			width : 425,
			region : 'center',
			autoHeight : true,
			items : [ {
				xtype : 'textfield',
				width : 130,
				readOnly : true,
				fieldLabel : ''+getResource('resourceParam1016')+'',
				id : 'viewApprovePress',
				maxLength : 20,
				anchor : '95%',
				style : 'margin-bottom:5px;'
			}, {
				xtype : 'textfield',
				width : 130,
				readOnly : true,
				fieldLabel : ''+getResource('resourceParam1017')+'',
				id : 'viewApproveStep',
				maxLength : 20,
				anchor : '95%',
				style : 'margin-bottom:5px;'
			}, {
				xtype : 'textarea',
				id : 'viewApprovalNote',
				readOnly : true,
				width : 317,
				style : 'margin-top:5px;',
				height : 80,
				grow : true,
				growMin : 80,
				preventScrollbars : true,
				fieldLabel : ''+getResource('resourceParam1018')+''
			}, viewApproveTask.participantsGrid ]
		} ]

	});
	var card2 = new Ext.Panel( {
		border : false,
		bodyStyle : 'padding-left:40px;',
		height : 600,
		items : [ new Ext.Panel( {
			region : 'center',
			title : 'panel',
			width : 200,
			height : 400
		}) ]
	});
	var center = new Ext.Panel( {
		region : 'center',
		autoHeight : true,
		border : false,
		layout : 'card',
		activeItem : 0,
		autoScroll : 'true',
		items : [ card1, card2 ],
		buttonAlign : 'left'
	});

	viewApproveTask.main = new Ext.Panel( {
		layout : 'border',
		autoScroll : true,
		items : [ north, center ]
	});
	return viewApproveTask.main;
}

viewApproveTask.getUserGrid = function(isPaging) {

	var sm = new Ext.grid.CheckboxSelectionModel();
	var colModel = new Ext.grid.ColumnModel( [// new Ext.grid.RowNumberer(),
			sm, {
				header : ""+getResource('resourceParam879')+"",
				width : 100,
				hidden : true,
				dataIndex : 'userid'
			}, {
				header : ""+getResource('resourceParam1021')+"",
				width : 120,
				dataIndex : 'truename'
			}, {
				header : ""+getResource('resourceParam882')+"",
				width : 120,
				dataIndex : 'ginstitutename'
			}, {
				header : ""+getResource('resourceParam1019')+"",
				width : 60,
				id : 'usertype',
				dataIndex : 'usertype'
			}

			]);

	var url = "../JSON/base_user_UserSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy( {
		url : url,
		method : 'GET'
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'userid'
	}, [ 'userid', 'loginname', 'truename', 'strsex', 'sex', 'accountstate',
			'straccountstate', 'instcode', 'ginstitutename', 'password', 'age',
			'address', 'postcode', 'tel1', 'tel2', 'judgeman', 'viewLevel',
			'logLevel' ]);
	var ascid = 'userid';
	var ascstr = 'desc';
	var ds = new Ext.data.Store( {
		proxy : proxy,
		reader : reader,
		sortInfo : {
			field : ascid,
			direction : ascstr
		}
	});
	var grid;
	if (isPaging) {
		grid = myGrid.init(ds, colModel, null, sm);
	} else {
		grid = myGrid.initNoPaging(ds, colModel, null, sm);
	}
	grid.height = 200;
	grid.width = 400;
	grid.autoScroll = 'true';
	return grid;
}

viewApproveTask.setViewApproveTaskForm=function(obj)
{
	Ext.getCmp('viewApproveStep').setValue(obj.stepName);
	Ext.getCmp("viewApprovePress").setValue(obj.pressName);
	Ext.getCmp("viewApprovalNote").setValue(obj.note);

	var MyRecord = Ext.data.Record.create( [ {
		name : 'userid'
	}, {
		name : 'truename'
	}, {
		name : 'ginstitutename'
	}, {
		name : 'usertype'
	} ]);
	var list = obj.user;
	var toDataStore = viewApproveTask.participantsGrid.getStore();
	toDataStore.removeAll();
	for (i = 0; i < list.length; i++) {
		var userid = list[i].id;
		var truename = list[i].name;
		var depName = list[i].depName;
		var usertype = list[i].type;
		if (list[i].type == 1) {
			usertype = ""+getResource('resourceParam731')+"";
		} else {
			usertype = "";
		}
		var data = new MyRecord( {
			userid : userid,
			truename : truename,
			ginstitutename : depName,
			usertype : usertype
		});
		toDataStore.add(data);
	}
}
