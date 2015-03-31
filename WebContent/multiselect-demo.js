/*
 * ! Ext JS Library 3.0.3 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */

Ext.onReady(function() {

			var panel = new Ext.Panel({
						width : 200,
						renderTo : 'is',
						height : 200,
						items : [te, bu]
					})

		});
var te = new Ext.form.TextField({
			id : 'te',
			fieldLabel : '人'
		});
var bu = new Ext.Button({
			text : '先人',
			handler : function() {
				userMultiselect.init();
			}
		});
var userMultiselect = {
	comboBoxTree : null
}
userMultiselect.userstroe = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : 'JSON/userinfo_UserInfoRemote.getUserByGroup'
					}),
			reader : new Ext.data.JsonReader({
						fields : [{
									name : 'userid'
								}, {
									name : 'truename'
								}]
					}),
			baseParams : {
				instcode : ''
			}
		});

userMultiselect.usersore = new Ext.data.Store();
userMultiselect.init = function() {

	// Ext.QuickTips.init();
	// Ext.form.Field.prototype.msgTarget = 'side';

	// var userstroe = new Ext.data.ArrayStore({
	// proxy : new Ext.data.HttpProxy({
	// url : 'JSON/userinfo_UserInfoRemote.getUserByGroup'
	// }),
	// fields : ['userid', 'truename'],
	// baseParams : {
	// instcode : ''
	// }
	// });
	userMultiselect.usersore.clearData();
	userMultiselect.userstroe.load();
	// var comboBoxTree;
	var nameStr = "";
	// Ext.BLANK_IMAGE_URL = '../../images/default/s.gif';
	userMultiselect.userstroe.on("remove", function(store, record) {
				// alert(usersore.getCount());
				// var record1 = null;
				// for (var i = 0; i < usersore.getCount(); i++) {
				// var flag = 0;
				// var temp = usersore.getAt(i);
				// for (var j = i + 1; j < usersore.getCount(); j++) {
				// record1 = usersore.getAt(j);
				// alert(record1.get("truename"));
				// if (temp.get("userid") == record1.get("userid")) {
				// flag += 1;
				// // usersore.remove(record);
				// }
				//
				// }
				// alert(flag);
				// if (flag > 1) {
				// usersore.remove(record1);
				// }
				//
				// }
				nameStr += record.get("truename") + ",";

			})
	userMultiselect.usersore.on("remove", function(store, record) {
				nameStr = nameStr.replace(record.get("truename") + ",", "");

			})
	userMultiselect.usersore.on("add", function(stroe, record) {
				// alert("");
				// alert(record.get("truename"));
			})
	// new Ext.form.ComboBox()
	userMultiselect.comboBoxTree = new Ext.ux.ComboBoxTree({
				// renderTo : 'comboBoxTree',
				width : 250,
				fieldLabel : ''+getResource('resourceParam882')+'',
				triggerAction : 'all',
				tree : {
					xtype : 'treepanel',
					rootVisible : false,
					// bbar: ['名称：',{xtype:'trigger',id:
					// 'searchName',width:200,triggerClass:'x-form-search-trigger',onTriggerClick:search}],
					loader : new Ext.tree.TreeLoader({
						dataUrl : "JSON/common_inst_InstSelectSvr.getMenuDatas"

							// ,
							// reader : new Ext.data.JsonReader({
							// totalProperty : 'totalProperty',
							// root : 'results'
							// }, [{
							// name : 'truename'
							// }, {
							// name : 'userid'
							// }])
					}),
					// listeners : {
					// "select" : function() {
					// alert("");
					// }
					// },
					root : new Ext.tree.AsyncTreeNode({
								id : '0',
								text : ''+getResource('resourceParam573')+''
							})
				},

				// all:所有结点都可选中
				// exceptRoot：除根结点，其它结点都可选(默认)
				// folder:只有目录（非叶子和非根结点）可选
				// leaf：只有叶子结点可选
				selectNodeModel : 'all',
				onSelect : function(record, index) {
				}

			});
	 userMultiselect.comboBoxTree.on('select', function(combo, record, index) {
		var instcode = record.id;
		userMultiselect.userstroe.baseParams.instcode = instcode;
		userMultiselect.userstroe.reload();
			// usersore.removeAll();
		});
	/*
	 * Ext.ux.form.ItemSelector Example Code
	 */
	var isForm = new Ext.Panel({
				// title : 'ItemSelector Test',
				width : 377,
				frame : true,
				// bodyStyle : 'margin-left:-80px',
				// renderTo : 'itemselector',
				items : [{
							xtype : "itemselector",
							name : "itemselector",
							id : 'checkuser',
							fieldLabel : ""+getResource('resourceParam941')+"",
							dataFields : ["userid", "truename"],
							// toData : [],
							msWidth : 170,
							msHeight : 200,
							valueField : "userid",
							displayField : "truename",
							imagePath : "images/",
							toLegend : ""+getResource('resourceParam555')+"",
							fromLegend : ""+getResource('resourceParam556')+"",
							fromStore : userMultiselect.userstroe,
							toStore : userMultiselect.usersore,
							toTBar : [{
										text : ""+getResource('resourceParam557')+"",
										handler : function() {
											// var i = isForm.getForm()
											// .findField("itemselector");
											// i.reset.call(i);
											Ext.getCmp('checkuser').reset();
										}
									}]
						}],

				buttons : [{
							text : ''+getResource('resourceParam505')+'',
							handler : function() {
								// var userids =
								// Ext.getCmp("checkuser").getValue();
								// // alert(userids);
								// Ext.getCmp('te').setValue(nameStr.substring(0,
								// nameStr.length - 1));

								userMultiselect.checkUserWin.hide();
								// }
							}
						},{
							text : ''+getResource('resourceParam3001')+'',
							handler : function() {
								// var userids =
								// Ext.getCmp("checkuser").getValue();
								// // alert(userids);
								// Ext.getCmp('te').setValue(nameStr.substring(0,
								// nameStr.length - 1));

								userMultiselect.checkUserWin.hide();
								// }
							}
						}]
			});
	var comboBoxTreeForm = new Ext.form.FormPanel({
				items : [userMultiselect.comboBoxTree],
				width : 377,
				frame : true
			});
	userMultiselect.checkUserWin = new Ext.Window({
				width : 407,
				height : 330,
				title : ''+getResource('resourceParam941')+'',
				modal : true,
				closable : true,
				resizable : false,
				closeAction : 'hide',
				bodyStyle : 'padding:10px 12px 10px 10px ',
				items : [comboBoxTreeForm, isForm]
			});
	userMultiselect.checkUserWin.show();
	userMultiselect.checkUserWin.on('hide', userMultiselect.close);
}
userMultiselect.close = function() {
	userMultiselect.checkUserWin.destroy();
	userMultiselect.checkUserWin = null;
};
