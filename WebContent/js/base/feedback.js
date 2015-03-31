Ext.ns("feedback")
feedback.taskid = null;
feedback.createrid = null;
feedback.init = function(taskid, taskname) {

	var pagingCombo = new Ext.ux.ComboBoxTree({
		width : 250,
		id : 'pagingCombo',
		fieldLabel : "" + getResource('resourceParam600') + "",
		tree : {
			xtype : 'treepanel',
			rootVisible : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
					}),

			root : new Ext.tree.AsyncTreeNode({
						id : '0',
						text : '' + getResource('resourceParam573') + ''
					})
		},
		selectNodeModel : 'all',
		onViewClick : function(doFocus) {

			var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
					.getAt(index);
			if (r) {
				this.onSelect(r, index);
			} else {
				// this.collapse();
			}
			if (doFocus !== false) {
				this.el.focus();
			}

		}
	});
	pagingCombo.on('select', function(combo, record, index) {
				var codeid = record.id;
				var codename = record.text;
				usersComb.clearValue();
				if (codeid != null) {
					if (codeid == -1) {
						codeid = -1;
						codename = null;
					}
					comboboxStores.baseParams.instcode = codeid;
					comboboxStores.load();
				}
			});

	var comboboxStores = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					method : 'POST',
					url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
							+ new Date()
				}),
		reader : new Ext.data.JsonReader({
					id : "userid",
					totalProperty : 'totalProperty',
					root : 'results'
				}, [{
							name : 'truename'
						}, {
							name : 'userid'
						}, {
							name : 'loginname'
						}, {
							name : 'ginstitutename'
						}, {
							name : 'instcode'
						}])
	});

	var usersComb = new Ext.form.ComboBox({
		store : comboboxStores,
		id : 'usersComb',
		valueField : "userid",
		displayField : "truename",
		mode : 'remote',
		queryParam : 'truename',
		minChars : 0,
		pageSize : 10,
		forceSelection : true,
		hiddenName : 'userid',
		editable : true,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam603') + '',
		typeAhead : true,
		name : 'receiver',
		blankText : '' + getResource('resourceParam570') + '',
		allowBlank : false,
		enableKeyEvents : true,
		disableKeyFilter : true,
		tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
				+ '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
				+ '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
				+ '</div></tpl>',
		emptyText : '' + getResource('resourceParam569') + '',
		anchor : '95%'
	});
	usersComb.on('select', function(combo, record, index) {
				// 下拉列表文本值
				// 在选择了人员后，设置人员所在部门id，部门名称
				pagingCombo.setRawValue(record.get('ginstitutename'));
				feedback.createrid = usersComb.getValue();
			});
	var tid = new Ext.form.TextField({
				id : 'taskid',
				hidden : true,
				value : taskid

			});
	var feedBackTitle = new Ext.form.TextField({
				anchor : '62%',
				id : 'feedBackTitle',
				style : 'margin-bottom: 5px;',
				fieldLabel : '' + getResource('resourceParam601') + '',
				allowBlank : false,
				emptyText : '' + getResource('resourceParam593') + '',
				maxLength : 95,
				minLengthText : '' + getResource('resourceParam590') + ''

			});
	var feedBackBody = new Ext.form.TextArea({
				anchor : '62%',
				fieldLabel : '' + getResource('resourceParam595') + '',
				style : 'margin-bottom: 5px;',
				id : 'feedBackBody',
				width : 638,
				maxLength : 1000,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam592') + '',
				preventScrollbars : false,
				// enableKeyEvents : true,
				// listeners : {'keyup' : function(cur, evt) {
				// var curLen = cur.getValue().length;
				// if(curLen <= 2000) {
				// mytaskdetails.viewTi = '您还可以输入' + (2000 - curLen) + '个字';
				// Ext.get('addWang').dom.innerHTML = mytaskdetails.viewTi;
				// } else {
				// mytaskdetails.viewTi = '<font color="red"
				// style="margin-right:-55px;">字数已超过2000，请酌情删减！</font>';
				// Ext.get('addWang').dom.innerHTML = mytaskdetails.viewTi;
				// }
				// }
				// }

				validator : function() {
					var str = Ext.util.Format.trim(feedBackBody.getValue());
					var size = str.length;
					// for (var i = 0; i < str.length; i++) {
					// var code = str.charCodeAt(i);
					// if (code > 255) {
					// size += 2;
					// } else {
					// size += 1;
					// }
					// }
					if (size > 1000) {
						feedBackBody.invalidText = ' '
								+ getResource('resourceParam648') + ''
								+ getResource('resourceParam1386') + '1000！';
						Ext.example.msg('' + getResource('resourceParam596')
										// + '', "输入的长度为 " + size / 2 + " !");
										+ '', "输入的长度为 " + size + " !"
										+ "超过了规定的长度，请酌情删减！");
						feedBackBody.focus();
						return false;
					} else {
						return true;
					}
				}
			});

	// var important = new Ext.form.ComboBox({
	// id : 'important',
	// name : 'important',
	// fieldLabel:'',
	// data:[['',''],[],[]]
	//	
	//
	// });
	var formTypeStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							url : "../JSON/myLog_FeedBackInfoRemote.getFormType"
						}),
				reader : new Ext.data.JsonReader({
						// totalProperty : 'totalProperty',
						// root : 'results'
						}, [{
							name : 'formid',
							type : 'string'
						}, {
							name : 'formname',
							type : 'string'
						}])
			});

	var formTypeDisplay = new Ext.form.ComboBox({
				fieldLabel : '' + getResource('resourceParam598') + '',
				id : 'formTypeDisplay',
				name : 'formTypeDisplay',
				anchor : '62%',
				store : formTypeStore,
				triggerAction : 'all',
				style : 'margin-bottom: 5px;',
				mode : 'local',
				displayField : 'formname',
				valueField : 'formid',
				allowBlank : true,
				editable : false,
				emptyText : '' + getResource('resourceParam569') + ''

			});
	formTypeDisplay.on("select", function() {
				formType.setValue(formTypeDisplay.getValue());
				getDataForm();
			});
	var formType = new Ext.form.TextField({
				id : 'formType',
				name : 'formType',
				hidden : true
			});
	function getDataForm() {
		var formid = formType.getValue();

		Seam.Component.getInstance("myLog_FeedBackAddRemote")
				.getCustomTypeById(formid, createFormCallBack);
	}
	var formjson = null;
	function createFormCallBack(result) {

		feedBackAddForm.items.each(function(item) {
					if (item.id != "taskid"
							&& item.id != "feedBackTitle"
							&& item.id != "feedBackBody" // && item.id !=
							// "file1"
							&& item.id != "formTypeDisplay"
							&& item.id != "pagingCombo"
							&& item.id != "receiver" && item.id != "formType"
							&& item.id != "usersComb") {
						feedBackAddForm.remove(item);
					}
				});

		formjson = eval('(' + result + ')');
		for (var i = 0; i < formjson.results; i++) {
			var type = formjson.rows[i]['dataTypeEntity']['dataType'];
			var dataObjectID = formjson.rows[i]['dataObjectID'];
			var name = formjson.rows[i]['dataObjectName'];
			var value = formjson.rows[i]['value'];
			var allowBlank = true;
			if ('true' == value) {
				allowBlank = false;
			}
			var fomat = "";
			var precision = 0;
			if (type == "double") {
				precision = 10;
			} else if (type == "date") {
				fomat = "Y-m-d";
			}
			var o = mytaskExtend.FormControls(dataObjectID, name, '', fomat,
					precision, type, allowBlank);
			feedBackAddForm.add(o);
			//
			// feedback.feedBackAddForm.add(formp);
		}
		var file1 = new Ext.form.FileUploadField({
					anchor : '62%',
					style : 'margin-bottom: 5px;',
					id : 'file1',
					buttonText : '' + getResource('resourceParam473') + '',
					fieldLabel : '' + getResource('resourceParam604') + ''
				});
		feedBackAddForm.insert(2, file1);
		feedBackAddForm.doLayout();
		feedBackAddForm.items.each(function(item) {
					if (item.id != "taskid" && item.id != "feedBackTitle"
							&& item.id != "feedBackBody" && item.id != "file1"
							&& item.id != "formTypeDisplay"
							&& item.id != "pagingCombo"
							&& item.id != "receiver" && item.id != "formType"
							&& item.id != "usersComb") {
						item.reset();
					}
				});

	}
	var conn = synchronize.createXhrObject();

	var url = "../JSON/myLog_FeedBackInfoRemote.getTaskCreater?taskid="
			+ taskid;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	var obj = Ext.util.JSON.decode(respText);
	if (obj.success == true) {
		pagingCombo.setRawValue(obj.depname);
		usersComb.setRawValue(obj.username);
		feedback.createrid = obj.userid;
	}
	var feedBackAddForm = new Ext.form.FormPanel({

				fileUpload : true,
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				autoScroll : true,
				items : [feedBackTitle,

						feedBackBody,

						pagingCombo, usersComb, formTypeDisplay, tid, formType],
				// items : [{
				// layout : 'column',
				// items : [{
				// columnWidth : .5,
				// layout : 'form',
				// items : [feedBackTitle, feedBackBody, file,
				// formType]
				// }, {
				// columnWidth : .5,
				// layout : 'form',
				// items : [department, user]
				// }]
				// }],
				buttons : [{
							id : 'feedSubmit',
							text : '' + getResource('resourceParam605') + '',
							handler : feedSubmit
						}, {
							id : 'feedReset',
							text : '' + getResource('resourceParam606') + '',
							handler : function() {
								feedBackAddForm.getForm().reset();
							}
						}]
			});
	// var baseInfoFieldSet = new Ext.form.FieldSet({
	// title : '基础信息',
	// bodyStyle : "padding 5px 5px 5px 5px",
	// items : [feedBackAddForm]
	// });
	function feedSubmit() {
		var tt = Ext.util.Format.trim(feedBackBody.getValue());
		if (tt.length > 1000) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam634') + '',
						msg : '' + "内容反馈字数不能超过1000，请酌情删减！" + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		};
		if (!feedBackAddForm.getForm().isValid()) {
			return;
		}
		if (feedback.createrid) {
			// usersComb.setRawValue(feedback.createrid);
			usersComb.setValue(feedback.createrid);
		}
		// alert(formjson);
		// alert(formjson.results);
		feedBackAddForm.getForm().submit({
			url : '../FeedBackAddServlet',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				var obj = Ext.util.JSON.decode(action.response.responseText);
				if (null != formjson) {

					for (var i = 0; i < formjson.results; i++) {
						var dataType = formjson.rows[i]['dataTypeEntity']['dataType'];
						var dataObjectID = formjson.rows[i]['dataObjectID'];
						var dataObjectName = formjson.rows[i]['dataObjectName'];
						var dataObjectType = formjson.rows[i]['dataObjectType']
						var value = feedBackAddForm.get(dataObjectID)
								.getValue();
						var isRef = formjson.rows[i]['isRef'];
						var dataEntity = Seam.Remoting
								.createType("com.sysware.edm.dataentity.DataEntity");
						var type = formjson.rows[i]['dataTypeEntity']['dataType'];
						if (type == 'date') {
							value = new Date(feedBackAddForm.get(dataObjectID)
									.getValue()).format('Y-m-d');
						}
						if (type == "file") {
							for (var j = 0; j < obj.file.length; j++) {
								if (obj.file[j]["fieldId"] == dataObjectID) {
									value = obj.file[j]["filename"];
									dataEntity.setFileID(obj.file[j]["fileid"]);
								}
							}
						}
						dataEntity.setIsArray(false);
						dataEntity.setValue(value);
						dataEntity.setDataEntityType(dataObjectType);
						dataEntity.setDataEntityName(dataObjectName);
						dataEntity.setIsRef(isRef);
						dataEntity.setDimension('1');
						dataEntity.setOrderNumber('0');
						dataEntity.setParentDataEntityID('0');
						dataEntity.setCustomTypeParentID('0');
						dataEntity.setRevision('1');
						dataEntity.setDataCenterID(action.result.messageid);
						dataEntity.setCustomTypeItemID(dataObjectID);
						Seam.Component
								.getInstance("dataentity_DataEntityServiceImpl")
								.createDataEntity(dataEntity);
						// msg += dataObjectName + ' : ' + value + '\t\n';
					}
					formjson = null;

				}
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam597') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				feedBackAddForm.items.each(function(item) {
							if (item.id != "taskid"
									&& item.id != "feedBackTitle"
									&& item.id != "feedBackBody"
									// && item.id != "file1"
									&& item.id != "formTypeDisplay"
									&& item.id != "pagingCombo"
									&& item.id != "receiver"
									&& item.id != "formType"
									&& item.id != "usersComb") {
								feedBackAddForm.remove(item);
							}
						});
				feedBackAddForm.doLayout();
				feedBackAddForm.getForm().reset();
				var conn = synchronize.createXhrObject();

				var url = "../JSON/myLog_FeedBackInfoRemote.getTaskCreater?taskid="
						+ taskid;
				conn.open("GET", url, false);
				conn.send(null);
				var respText = conn.responseText;
				var obj = Ext.util.JSON.decode(respText);
				if (obj.success == true) {
					pagingCombo.setRawValue(obj.depname);
					usersComb.setRawValue(obj.username);
					feedback.createrid = obj.userid;
				}
				var file1 = new Ext.form.FileUploadField({
							anchor : '62%',
							style : 'margin-bottom: 5px;',
							id : 'file1',
							buttonText : '' + getResource('resourceParam473')
									+ '',
							fieldLabel : '' + getResource('resourceParam604')
									+ ''
						});
				feedBackAddForm.insert(2, file1);
				feedBackAddForm.doLayout();
				// var logAttributeTaskIds =
				// Ext.getCmp('logAttributeTaskId')
				// .getValue();
				// var logAttributeTasks =
				// Ext.getCmp("logAttributeTask")
				// .getValue();
				// log.logAddForm.getForm().reset();
				// Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				// Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);

			},
			failure : function(form, action) {
				feedBackAddForm.getForm().reset();

				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});

	}
	feedback.feedBackTabPanel = new Ext.TabPanel({
		id : 'feedBackTabPanel',
		layoutOnTabChange : true,
		activeTab : 0,
		autoScroll : true,
		animScroll : true,
		resizeTabs : true,
		enableTabScroll : true,
		deferredRender : false,
		tabMargin : 0,
		height : 800,

		// autoLoad:true,
		items : [{

			id : 'addFeedBackinfo',
			title : '  ' + getResource('resourceParam602') + '  ',
			frame : false,
			// html : "<iframe scrolling=auto id='feedbackframe'
			// frameborder=0 width=100% height=100%
			// src='../feedBackAdd.seam?taskid="
			// + feedback.taskid + "' ></iframe>",
			layout : 'fit',
			items : [feedBackAddForm],
			listeners : {
				'activate' : function() {
					formjson = null;
					formTypeStore.load();
					feedBackAddForm.items.each(function(item) {
								if (item.id != "taskid"
										&& item.id != "feedBackTitle"
										&& item.id != "feedBackBody"
										// && item.id != "file1"
										&& item.id != "formTypeDisplay"
										&& item.id != "pagingCombo"
										&& item.id != "receiver"
										&& item.id != "formType"
										&& item.id != "usersComb") {
									feedBackAddForm.remove(item);
								}
							});
					// feedBackAddForm.getForm().reset();
					feedBackAddForm.doLayout();
					var conn = synchronize.createXhrObject();
					var url = "../JSON/myLog_FeedBackInfoRemote.getTaskCreater?taskid="
							+ taskid;
					conn.open("GET", url, false);
					conn.send(null);
					var respText = conn.responseText;
					var obj = Ext.util.JSON.decode(respText);
					if (obj.success == true) {
						pagingCombo.setRawValue(obj.depname);
						usersComb.setValue(obj.username);
						feedback.createrid = obj.userid;
					}
					var file1 = new Ext.form.FileUploadField({
								anchor : '62%',
								style : 'margin-bottom: 5px;',
								id : 'file1',
								buttonText : ''
										+ getResource('resourceParam473') + '',
								fieldLabel : ''
										+ getResource('resourceParam604') + ''
							});
					feedBackAddForm.insert(2, file1);
					feedBackAddForm.doLayout();
				}
			}
		}, {
			id : 'feedBackInfo',
			contentEl : 'feedBackInfo',
			title : '  ' + getResource('resourceParam599') + '  ',
			autoScroll : true,
			html : "<iframe scrolling='auto' id='feedbackinfoframe' frameborder=0 height='100%' width='100%' src='../logInfo.seam?taskid="
					+ taskid + "&typeStr=2,' ></iframe>",
			listeners : {
				'activate' : function() {
					var s = document.getElementById('feedbackinfoframe');
					// s.height = '450';
					// s.scrolling='auto';
					s.src = '../logInfo.seam?taskid=' + taskid + '&typeStr=2,';
				}
			}

		}]

	});
	feedback.allFeedBackPanel = new Ext.Panel({
				id : 'allFeedBackPanel',
				height : 800,
				title : '' + getResource('resourceParam607') + '',
				activeItem : 0,
				layout : 'card',
				items : [feedback.feedBackTabPanel]
			});

}
