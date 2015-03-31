var collarbForm = {
	myform : null,
	viewTi : null
};
collarbForm.init = function() {
	departmentUser.init(''+getResource('resourceParam986')+'', ''+getResource('resourceParam1034')+'');
	departmentUser.departmentCombo.setWidth(250);
	departmentUser.departmentCombo.allowBlank = true;
	departmentUser.departmentCombo.style = 'margin-bottom: 5px;';
	departmentUser.userComb.setWidth(250);
	departmentUser.userComb.allowBlank = true;
	departmentUser.userComb.style = 'margin-bottom: 5px;';
	var deptID = null;
	/**
	 * getDepartmentID RPC method
	 * 参数值传null时，只返回当前用户所在部门的ID值，用于全部展开，并选中
	 * 参数值传all时，则返回当前用户所在部门及所有上级部门的的ID值序列，以"/"分隔，用于只展开所在部门所属分支，并选中
	 */
	Seam.Component.getInstance("common_inst_InstSelectSvr").getDepartmentID('all',
			function(dept){
				deptID = dept;
			});
/** 只展开当前用户所在部门并选中的设置函数 begin */
	var ff = function(arrId, pos, dest){
		if (pos >= arrId.length) return false;
		
		var node = departmentUser.treePanel.getNodeById(arrId[pos]);
		if (node) {
			node.expand(false, false, function(node){
				var tmpNode = departmentUser.treePanel.getNodeById(dest);
				if (tmpNode) {
					tmpNode.select();
				} else {
					ff(arrId, (pos + 1), dest);
				}
			});
		}
	}
/** 只展开当前用户所在部门并选中的设置函数 end */
	
	departmentUser.departmentCombo.on('expand', function() {
		departmentUser.treePanel.on('expandnode', function(node) {
/** 只展开当前用户所在部门并选中 begin */
			var arr = deptID.split('/');
			var dest = arr[arr.length - 1];
			arr.length = arr.length - 1;
			ff(arr, 0, dest);
/** 只展开当前用户所在部门并选中 end */

/** 全部展开选中当前部门 begin */
//			var firstNode = departmentUser.treePanel.getNodeById(0);
//			if (firstNode.attributes.id == '0') {
//				firstNode.expand(true, true, function(node){
//					var tmpNode = departmentUser.treePanel.getNodeById(deptID);
//					if (tmpNode) {
//						tmpNode.select();
//					}
//				});
//				return firstNode;
//			}
/** 全部展开选中当前部门 end */
		});
	});
	collarbForm.department = departmentUser.departmentCombo;
	collarbForm.user = departmentUser.userComb;
	
	enmusEntity.init();
	enmusEntity.usersComb.setWidth(250);
	collarbForm.datacenterStore = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			method:'POST',
			url : '../JSON/datacenter_DataCenterRemote.getDataCateList'
		}),
		reader : new Ext.data.JsonReader( {
			id:"categoryinstanceid",
			totalProperty : 'totalProperty',
			root : 'results'
			}, [ {
				name : 'id'
			},{
				name : 'categoryinstancename'
		     },{
		        name : 'description'
		     }])
	});
	collarbForm.datacenter = new Ext.ux.form.LovPageCombo({
		           	store:collarbForm.datacenterStore,
		           	fieldLabel : ''+getResource('resourceParam561')+'(<span style="color:red;" >＊</span>)',
					valueField :"id",
					displayField: "categoryinstancename",
					mode: 'remote',
					queryParam :'categoryinstancename',
					minChars : 0,
					pageSize : 5,
					width : 250,
					forceSelection: true,
					hiddenName:'datacenterid',
					editable: true,
					triggerAction: 'all',
					typeAhead : true,
					name: 'datacenterid',
					blankText:''+getResource('resourceParam1555')+'',
                    allowBlank:false,
					enableKeyEvents:true,
					disableKeyFilter:true,
		     		emptyText:''+getResource('resourceParam569')+''	,
		     		hideOnSelect : false,
					beforeBlur : Ext.emptyFn
	});
	var selectedDatacenterIds = [];
	var selectedDatacenterNames = [];
	collarbForm.datacenter.on('pagechange',function(combo){
		var store = combo.getStore();
		combo.getStore().each(function(record){
			var flag = false;
			var rec = record.get('id');
			for(var i=0;i<selectedDatacenterIds.length;i++){
				if(rec==selectedDatacenterIds[i]){
					flag = true;
				}
			}
			if(flag){
				record.set('checked', true);
			}else{
				record.set('checked', false);
			}
		});
	});
	collarbForm.datacenter.on('select', function(combo, record, index) {
		if(record.get('checked')){
			selectedDatacenterIds.push(record.get('id'));
			selectedDatacenterNames.push(record.get('categoryinstancename'));
		}else{
			selectedDatacenterIds.remove(record.get('id'));
			selectedDatacenterNames.remove(record.get('categoryinstancename'));
		}
		combo.setValue(selectedDatacenterIds.join(','),selectedDatacenterNames.join(','));
	});
	
	collarbForm.name = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam1035')+'(<span style="color:red;" >＊</span>)',
				name : 'name',
				id : 'quanjiao',
				allowBlank : false,
				disabled : false,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				maxLength : 100,
				maxLengthText : '名称长度过长，不能超过100！',
				minLength : 1,
				minLengthText : ''+getResource('resourceParam1002')+'',
				blankText : ''+getResource('resourceParam1161')+'',
				/**
				 * bug编号577 wangyf
				 * bug信息：新建项目时对项目名称空格限制
				 * 2011-05-17
				 */
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				/**
				 * bug编号971 wangyf
				 * bug信息：项目名称要求只能输入英文字符、数字、汉字，却能输入中文符号。
				 * 2011-06-03 14：09
				 */
				regex : /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)*$/,
				// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|[_.]|\d})*$/,
				// regexText : '只能输入中文,字母,数字'
				invalidText : ''+getResource('resourceParam1554')+'',
				validator : function() {
					var value = this.getValue();
					var length = value.length;
					var s = 0;
					var e = length - 1;
					while (s < length) {
						if (value.charAt(s) == ' ') {
							s++;
						} else {
							break;
						}
					}
					while (e > s) {
						if (value.charAt(e) == ' ') {
							e--;
						} else {
							break;
						}
					}
					value = value.substring(s, e + 1);
					if (value.length > 0) {
						return true;
					} else {
						return false;
					}
				},
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
				 */
				enableKeyEvents : true,
				listeners : {'blur' : function(cur, evt) {
						var curStr = cur.getValue();
						var strS = '';
						for(var i = 0; i < curStr.length; i++) {
							var str = curStr.charCodeAt(i);
							if(str == 12288) {
								if(typeof curStr[i] == 'undefined') {
									curStr = curStr.replace('　', ' ');
								}
							} 
						}
						Ext.getCmp('quanjiao').setValue(curStr);
					}
				}
			});

	// 新建工程可选类型combo
	collarbForm.type = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/project_ProjectRemote.getTypes'
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'projectcategoryid'
									}, {
										name : 'projectcategoryname'
									}])
				}),
		fieldLabel : ''+getResource('resourceParam1037')+'(<span style="color:red;" >＊</span>)',
		hiddenName : 'category',
		valueField : "projectcategoryid",
		displayField : "projectcategoryname",
		mode : 'remote',
		allowBlank : false,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : ''+getResource('resourceParam1159')+'',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				collarbForm.projectcategoryid = record.get('projectcategoryid');
				createExtendForm.isExtendFormExist = false;
			},
			beforequery: function(qe){
                delete qe.combo.lastQuery;
            }
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});

	collarbForm.status = new Ext.form.ComboBox({
				store : new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url : "../JSON/project_ProjectRemote.getStatus"
									}),
							reader : new Ext.data.JsonReader({
										totalProperty : 'totalProperty',
										root : 'root'
									}, [{
												name : 'projectstatusname'
											}, {
												name : 'projectstatusid'
											}])
						}),
				valueField : "projectstatusid",
				displayField : "projectstatusname",
				mode : 'remote',
				forceSelection : true,
				disabled : false,
				hiddenName : 'projectstatusid',
				editable : false,
				triggerAction : 'all',
				fieldLabel : ''+getResource('resourceParam1038')+'',
				// anchor : '95%',
				style : 'margin-bottom: 5px;',
				width : 250,
				allowBlank : true,
				value : ''+getResource('resourceParam947')+'',// 默认设置为编制中
				disabled : true
			});
	

	collarbForm.start = new Sysware.P2M.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
//				fieldLabel : '计划开始时间(<span style="color:red;" >＊</span>)',
				fieldLabel : ''+getResource('resourceParam991')+'',
				editable : false,
				name : 'start',
				// minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
				// minText : '不能选择以前的日期',
				// disabledDays : [0, 6],// 去掉周六、周日
				// disabledDaysText : '开始的日期不能在周六、周日',
				allowBlank : true,
				disabled : false,
				showToday:true,
				
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						collarbForm.end.setMinValue(value);
						collarbForm.start1 = (new Date(value)).format('Y-m-d');
						collarbForm.end.plannedStart = value;

					}
				}

			});
	collarbForm.end = new Sysware.P2M.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
//				fieldLabel : '计划完成时间(<span style="color:red;" >＊</span>)',
				fieldLabel : ''+getResource('resourceParam1032')+'',
				editable : false,
				name : 'end',
				// minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
				// minText : '不能选择以前的日期',
				// disabledDays : [0, 6],// 去掉周六、周日
				// disabledDaysText : '结束的日期不能在周六、周日',
				allowBlank : true,
				disabled : false,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						collarbForm.start.setMaxValue(value);
//						// collarbForm.start.setMinValue((new Date())
//						// .format('Y-m-d'));
						collarbForm.end1 = (new Date(value)).format('Y-m-d');
					}
				}
			});
	collarbForm.securityDegree1=null;
	collarbForm.securityDegree = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : '../JSON/groups_GroupsRemote.getSecurityDegree'
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'root'
			}, [ {
				name : 'id'
			}, {
				name : 'name'
			} ])
		}),
		fieldLabel : getResource('resourceParam1973'),
		hiddenName : 'securityDegree',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : getResource('resourceParam5044'),
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
		var value = record.get('id')
		//当前用户的密级
		if(departmentUser.currentDegree!=null){
			//如果选取的密级大于负责人密级
			if(value>departmentUser.currentDegree){
				Ext.example.msg('',getResource('resourceParam9174'));
				departmentUser.userComb.clearValue();
				departmentUser.userid = null;
			    departmentUser.currentDegree=null;
			}
		}
		departmentUser.securityDegree = value;
		collarbForm.securityDegree1 = value;
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});

	collarbForm.textarea = new Ext.form.TextArea({
				id : 'addPtextarea',
				fieldLabel : ''+getResource('resourceParam1039')+'',//项目描述
				name : 'ptextarea',
				allowBlank : true,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 0px;',
				width : 250,
				height:100,
				disabled : false,
				maxLength : 500,
//				grow : true,
//				growMin : 50,
				preventScrollbars : false,
				maxLengthText : ''+getResource('resourceParam9179')+'!',//项目描述长度过长，不能超过500
				enableKeyEvents : true,
				listeners : {'keyup' : function(cur, evt) {
						var curLen = cur.getValue().length;
						if(curLen <= 500) {
							collarbForm.viewTi = '您还可以输入' + (500 - curLen) + '个字';
							Ext.get('addWang').dom.innerHTML = collarbForm.viewTi;
						} else {
							collarbForm.viewTi = '<font color="red" style="margin-right:-70px;">字数已超过规定长度，请酌情删减！</font>';
							Ext.get('addWang').dom.innerHTML = collarbForm.viewTi;
						}
					}
				}
			});
	collarbForm.myform = new Ext.form.FormPanel({
				standardSubmit : true,
				bodyStyle : 'padding:10px 0px 10px 10px',
				buttonAlign : 'right',
				autoScroll : true,
				split : true,
//				labelWidth : 150,
				border : false,
				items : [collarbForm.name, collarbForm.type,collarbForm.securityDegree,
						collarbForm.department, collarbForm.user, {
							xtype : 'datefield',
							fieldLabel : ''+getResource('resourceParam858')+'',
							format : getResource('resourceParam5043'),
							name : 'createtime',
							// anchor : '95%',
							style : 'margin-bottom: 5px;',
							value : (new Date()).format('Y年m月d日'),
							width : 250,
							disabled : true
						}, collarbForm.status, collarbForm.start,
						collarbForm.end, 
						//collarbForm.datacenter,
						enmusEntity.usersComb,
						new Ext.Panel({
							border : false,
							width : 550,
							items : [{
								border : false,
//								layout : 'column',
								items : [{
											width : 400,
											layout : 'form',
											border : false,
											items : [collarbForm.textarea]
										}, 
										new Ext.Panel({
										   width : 400,
										   border:false,
										   style : 'margin: 1px;',
										   html:'<div id="addWang" style="color:#0000FF;text-align:center;margin-left:-55px;"></div>'
										})
										]
							}]
						}),
						{
							xtype : 'button',
							style : 'margin-left: 315px;',
							text : ''+getResource('resourceParam1151')+'',
							handler : nextPage
						}
				]
			});

	function nextPage() {
		var textValue = Ext.getCmp('addPtextarea').getValue();
		if(textValue.length > 500) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam634')
						+ '',
				msg : '' + "字数不能超过500，请酌情删减！" + '',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return ;
		} 
		if (collarbCardFrame.form.getForm().isValid()) {
			if (createExtendForm.isExtendFormExist) {
				collarbCardFrame.card.layout.setActiveItem(1);
				try {
					// 传第一个form的data
					collarbForm.name1 = collarbCardFrame.form.getForm()
							.findField('name').getValue();
					collarbForm.type1 = collarbCardFrame.form.getForm()
							.findField('category').getValue();
					collarbForm.department1 = departmentUser.codeid;
					collarbForm.user1 = departmentUser.userid;
//					collarbForm.datacenter1 = collarbForm.datacenter.getValue();
					collarbForm.textarea1 = collarbCardFrame.form.getForm()
							.findField('ptextarea').getValue();
					var t = collarbCardFrame.form.getForm()
							.findField('createtime').getValue();
					collarbForm.createtime1 = (new Date(t)).format('Y-m-d');
					// 开始结束时间获取 在 collarbForm.start end的select中获取
					collarbForm.why=enmusEntity.id;
				} catch (e) {
				} finally {
				}
			} else {
				Ext.Ajax.request({
					url : '../JSON/project_ProjectRemote.getExtendForm',
					method : 'POST',
					success : function(response, options) {
						collarbCardFrame.panel2
								.remove(collarbCardFrame.extendform);
						collarbCardFrame.extendform = collarbExtendForm.init();
						collarbCardFrame.panel2.items
								.add(collarbCardFrame.extendform);
						collarbCardFrame.panel2.doLayout();

						collarbCardFrame.card.layout.setActiveItem(1);
						var obj = Ext.util.JSON.decode(response.responseText);
						var labelWidth = obj.labelWidth;
						var items = obj.items;
						createExtendForm.createForm(
								collarbCardFrame.extendform, items, labelWidth);
						if (obj.length == 0) {
							Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1148')+'');
						}
					},
					params : {
						projectcategoryid : collarbForm.projectcategoryid
					}
				});
				try {
					// 传第一个form的data
					collarbForm.name1 = collarbCardFrame.form.getForm()
							.findField('name').getValue();
					collarbForm.type1 = collarbCardFrame.form.getForm()
							.findField('category').getValue();
					collarbForm.department1 = departmentUser.codeid;
					collarbForm.user1 = departmentUser.userid;
//					collarbForm.datacenter1 = collarbForm.datacenter.getValue();
					collarbForm.textarea1 = collarbCardFrame.form.getForm()
							.findField('ptextarea').getValue();
					var t = collarbCardFrame.form.getForm()
							.findField('createtime').getValue();
					collarbForm.createtime1 = (new Date(t)).format('Y-m-d');
					// 开始结束时间获取 在 collarbForm.start end的select中获取
					collarbForm.why=enmusEntity.id;
				} catch (e) {
				} finally {
				}
			}
		}
	}

	return collarbForm.myform;
}
