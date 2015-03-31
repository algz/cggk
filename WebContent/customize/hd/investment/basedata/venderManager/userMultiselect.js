var userMultiselect = {
	comboBoxTree : null,
	currentPage : 1,
	limitParam : 50,
	securityDegree:null

}

userMultiselect.init = function( callback, creatorStore, creatorUserName) {
	
	Ext.ux.Multiselect.override( {
		onRender : function(ct, position) {
			Ext.ux.form.MultiSelect.superclass.onRender
					.call(this, ct, position);
			var fs = this.fs = new Ext.form.FieldSet( {
				renderTo : this.el,
				title : this.legend,
				height : this.height,
				width : this.width,
				style : "padding:0;",
				tbar : this.tbar
			});
			fs.body.addClass('ux-mselect');
			this.view = new Ext.ListView( {
				multiSelect : true,
				store : this.store,
				columns : [ {
					header : 'truename',
					width : .60,
					dataIndex : 'truename'
				} ,{
					header : 'loginname',
					width : .38,
					dataIndex : 'loginname'
				} ],
				hideHeaders : true
			});

			fs.add(this.view);

			this.view.on('click', this.onViewClick, this);
			this.view.on('beforeclick', this.onViewBeforeClick, this);
			this.view.on('dblclick', this.onViewDblClick, this);

			this.hiddenName = this.name || Ext.id();
			var hiddenTag = {
				tag : "input",
				type : "hidden",
				value : "",
				name : this.hiddenName
			};
			this.hiddenField = this.el.createChild(hiddenTag);
			this.hiddenField.dom.disabled = this.hiddenName != this.name;
			fs.doLayout();
		}
	});

	var userstroe = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/userinfo_UserInfoRemote.getUserByGroup'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : "totalProperty",
							root : 'root'
						}, [{
									name : 'userid',
									mapping : 'userid',
									type : 'string'
								}, {
									name : 'truename',
									mapping : 'truename',
									type : 'string'
								},{
									name : 'loginname',
									mapping : 'loginname',
									type : 'string'
								} ,{
									name : 'instcode',
									mapping : 'instcode',
									type : 'string'
								}, {
									name : 'ginstitutename',
									mapping : 'ginstitutename',
									type : 'string'
								}]),
				baseParams : {
					instcode : '',
					start : 0,
					limit : 100
				}
			});
    userstroe.baseParams.securityDegree=userMultiselect.securityDegree;
	userMultiselect.usersore = new Ext.data.Store();
	userMultiselect.usersore.clearData();
	// userstroe.load();
	var nameStr = "";
	userstroe.on("remove", function(store, record) {
				nameStr += record.get("truename") + ",";

			})
	userstroe.on("load", function(store, record) {
				for (var i = 0; i < record.length; i++) {
					userMultiselect.usersore.each(function(rec) {
								if (rec.get("truename") == record[i]
										.get("truename")) {
									store.remove(record[i]);
									return false;
								}
							});
					if (creatorStore) {
						if (creatorUserName) {
							creatorStore.each(function(rec) {
										if (rec.get(creatorUserName) == record[i]
												.get("truename")) {
											store.remove(record[i]);
											return false;
										}
									});
						}
					}
				}
			})
	userMultiselect.usersore.on("remove", function(store, record) {
				nameStr = nameStr.replace(record.get("truename") + ",", "");
			})
	userMultiselect.usersore.on("add", function(stroe, record) {
			})
	var comboBoxTree = new Ext.ux.ComboBoxTree({
		width : 250,
		fieldLabel : ''+getResource('resourceParam873')+'',
		triggerAction : 'all',
		emptyText : ''+getResource('resourceParam940')+'!',
		style : 'margin-bottom: 2px;',
		tree : {
			xtype : 'treepanel',
			rootVisible : false,
			loader : new Ext.tree.TreeLoader({
						dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
					}),
			root : new Ext.tree.AsyncTreeNode({
						id : '0',
						text : ''+getResource('resourceParam573')+''
					})
		},
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

		},

		// all:所有结点都可选中
		// exceptRoot：除根结点，其它结点都可选(默认)
		// folder:只有目录（非叶子和非根结点）可选
		// leaf：只有叶子结点可选
		selectNodeModel : 'all'
	});
	var simpleName = new Ext.form.TextField({
				fieldLabel : '人员'+getResource('resourceParam942')+'',
				enableKeyEvents : true,
				width : 250,
				style : 'margin-bottom: 2px;',
				emptyText : ''+getResource('resourceParam939')+'!'
			});

	simpleName.on("keyup", function() {
		userstroe.baseParams.name = simpleName.getValue();
		userstroe.baseParams.start = 0;
		userstroe.baseParams.limit = userMultiselect.limitParam;

		userstroe.reload({
					callback : function() {
						if (userstroe.getTotalCount() == 0) {
							document.getElementById("showpage").innerHTML = "0/0";
							disableButton('first');
							disableButton('prev');
							disableButton('next');
							disableButton('last');
						} else {
							document.getElementById("showpage").innerHTML = "1/"
									+ parseInt((userstroe.getTotalCount()
											+ userMultiselect.limitParam - 1)
											/ userMultiselect.limitParam);
							userMultiselect.currentPage = 1;
							userMultiselect.pages = parseInt((userstroe
									.getTotalCount()
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);
							activeButton('first');
							activeButton('prev');
							activeButton('next');
							activeButton('last');

						}
					}
				});

	});
	comboBoxTree.on('select', function(combo, record, index) {
		var instcode = record.id;
		userstroe.baseParams.instcode = instcode;
		userstroe.baseParams.start = 0;
		userstroe.baseParams.limit = userMultiselect.limitParam;
		userstroe.reload({
					callback : function() {
						if (userstroe.getTotalCount() == 0) {
							document.getElementById("showpage").innerHTML = "0/0";
							disableButton('first');
							disableButton('prev');
							disableButton('next');
							disableButton('last');
						} else {
							document.getElementById("showpage").innerHTML = "1/"
									+ parseInt((userstroe.getTotalCount()
											+ userMultiselect.limitParam - 1)
											/ userMultiselect.limitParam);
							userMultiselect.currentPage = 1;
							userMultiselect.pages = parseInt((userstroe
									.getTotalCount()
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);

							activeButton('first');
							activeButton('prev');
							activeButton('next');
							activeButton('last');
						}
					}
				});
	});
	var isForm = new Ext.Panel({
		width : 377,
		frame : true,
		items : [{
			xtype : "itemselector",
			name : "itemselector",
			id : 'checkuser',
			fieldLabel : ""+getResource('resourceParam941')+"",
			dataFields : ["userid", "truename"],
			msWidth : 170,
			msHeight : 200,
			valueField : "userid",
			displayField : "truename",
			imagePath : "../images/",
			toLegend : ""+getResource('resourceParam555')+"",
			fromLegend : ""+getResource('resourceParam556')+"",
			fromStore : userstroe,
			toStore : userMultiselect.usersore,
			fromTBar : [
					"",
					{
						id : 'first',
						disabled : true,
						text : "<image src=../lib/ext/resources/images/default/grid/page-first.gif>",
						handler : function() {
							userMultiselect.totalCount = userstroe
									.getTotalCount();
							userMultiselect.pages = parseInt((userMultiselect.totalCount
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);
							userstroe.baseParams.start = 0;
							userstroe.baseParams.limit = userMultiselect.limitParam;

							userstroe.reload();
							userMultiselect.currentPage = 1;
							document.getElementById("showpage").innerHTML = "1/"
									+ userMultiselect.pages;
						}
					},
					{
						text : "<image src=../lib/ext/resources/images/default/grid/page-prev.gif>",
						id : 'prev',
						disabled : true,
						handler : function() {
							if (userMultiselect.currentPage == 1) {
								return;
							}
							userMultiselect.totalCount = userstroe
									.getTotalCount();
							userMultiselect.pages = parseInt((userMultiselect.totalCount
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);
							userstroe.baseParams.start = (userMultiselect.currentPage * userMultiselect.limitParam)
									- userMultiselect.limitParam * 2;
							userstroe.baseParams.limit = userMultiselect.limitParam;
							userstroe.reload();
							userMultiselect.currentPage -= 1;
							document.getElementById("showpage").innerHTML = userMultiselect.currentPage
									+ "/" + userMultiselect.pages;
						}
					},
					'<div id="showpage" style="width:47px;text-align:center" >0/0</font></div>',
					{
						text : "<image src=../lib/ext/resources/images/default/grid/page-next.gif>",
						id : 'next',
						disabled : true,
						handler : function() {
							if (userMultiselect.currentPage == userMultiselect.pages) {
								return;
							}

							userMultiselect.totalCount = userstroe
									.getTotalCount();
							userMultiselect.pages = parseInt((userMultiselect.totalCount
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);
							userstroe.baseParams.start = (userMultiselect.currentPage * userMultiselect.limitParam)
									+ 1;
							userstroe.baseParams.limit = userMultiselect.limitParam;
							userstroe.reload();
							userMultiselect.currentPage += 1;
							document.getElementById("showpage").innerHTML = userMultiselect.currentPage
									+ "/" + userMultiselect.pages;
						}
					}, {
						text : "<image  src=../lib/ext/resources/images/default/grid/page-last.gif>",
						id : 'last',
						disabled : true,
						handler : function() {
							userMultiselect.totalCount = userstroe
									.getTotalCount();
							userMultiselect.pages = parseInt((userMultiselect.totalCount
									+ userMultiselect.limitParam - 1)
									/ userMultiselect.limitParam);
							userstroe.baseParams.start = (userMultiselect.pages * userMultiselect.limitParam)
									- userMultiselect.limitParam;
							userstroe.baseParams.limit = userMultiselect.limitParam;
							userstroe.reload();
							userMultiselect.currentPage = userMultiselect.pages;
							document.getElementById("showpage").innerHTML = userMultiselect.currentPage
									+ "/" + userMultiselect.pages;
						}
					}]
		}],

		buttons : [{
					text : ''+getResource('resourceParam505')+'',
					handler : function() {

						if (callback) {
							var c=callback();
							if(c!=null&&c!=""&&c!='undefined'){
								Ext.Msg.alert("提示",c);
								return;
							}
						}
						
						checkUserWin.close();
					}
				},{
					text : ''+getResource('resourceParam3001')+'',
					handler : function() {
						checkUserWin.close();
					}
				}]
	});
	function activeButton(buttonid) {
		Ext.getCmp(buttonid).enable();
	}
	function disableButton(buttonid) {
		Ext.getCmp(buttonid).disable();
	}
	var comboBoxTreeForm = new Ext.form.FormPanel({
				items : [comboBoxTree, simpleName],
				width : 377,

				frame : true
			});
	var checkUserWin = new Ext.Window({
			    id : "userMultiselectWindow",
				width : 407,
				height : 375,
				title : ''+getResource('resourceParam941')+'',
				modal : true,
				closable : true,
				resizable : false,
				// closeAction : 'hide',
				bodyStyle : 'padding:10px 12px 10px 10px ',
				items : [comboBoxTreeForm, isForm]
			});
	checkUserWin.show();
	// userMultiselect.checkUserWin.on('hide', userMultiselect.close);
}
userMultiselect.close = function() {
	userMultiselect.checkUserWin.destroy();
	userMultiselect.checkUserWin = null;
};
