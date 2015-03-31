Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var bulletinGrid = {
	rows : null,
	loginId : null
};

bulletinGrid.grid = function() {
	Ext.QuickTips.init();
	var strurl = "../JSON/notices_noticessvr.getnoticeslist";
	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'title', 'author', 'content', 'pbudate', 'isarchived',
					'typeid', 'typename', 'authorname', 'isarchivedname',
					'ginstituteName', 'pbudatestr', 'url', 'userId']);

	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				baseParams : {
					typeid : null,
				    title : null
				}
			});

	var sm = new Ext.grid.CheckboxSelectionModel({
				// singleSelect : true,
				listeners : {
					// 列表的 行选中 事件监听函数
					rowselect : function(sm, row, rec) {
						var status = rec.data.isarchived;
						var saveButton = Ext.getCmp("bulletinSaveButton");
						// 根据新闻的发布状态值动态确定按钮文本及其事件
						if (status == 0) {
							saveButton.setText(''
									+ getResource('resourceParam605') + ''); // 发布
							saveButton.setHandler(guidang.init);
							saveButton.enable();
						} else if (status == 1) {
							saveButton.setText(''
									+ getResource('resourceParam9002') + ''
									+ getResource('resourceParam605') + ''); // 取消发布
							saveButton.setHandler(guidang.send);
							saveButton.enable();
						}
					},
					selectionchange : function(sm) {
						bulletinGrid.rows = sm.getSelections();
						if (sm.getSelections().length < 1) {
							var saveButton = Ext.getCmp("bulletinSaveButton");
							saveButton.disable();
						}
					},
					rowdeselect : function() {
						var hd = Ext.fly(this.grid.getView().innerHd)
								.child('div.x-grid3-hd-checker');
						if (hd.hasClass('x-grid3-hd-checker-on')) {
							hd.removeClass('x-grid3-hd-checker-on');
						}
					}
				}
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			id : 'id',
			header : "ID",
			dataIndex : 'id',
			hidden : true
		}, {
			header : getResource('resourceParam504') + "",
			dataIndex : 'title',
			width : 250,
			renderer : function(value, p, r) {
				//gaoyn bug 1196 悬浮提示 2011-6-14 15:54 
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
				return "<a style='text-decoration:underline; color:blue;'  href='"
						+ encodeURI(encodeURI(r.get("url")))
						+ "' target=_blank>" + "<font ext:qtip=" + name + '>' + value + "</a>"
			}
		}, {
			header : getResource('resourceParam9186') + "",
			dataIndex : 'aa',
			width : 60,
			renderer : function(value, p, r) {
				return "<div><input type=\"button\" value=\""+getResource('resourceParam9186') + "\" onclick=\"noticeDep("+r.get('id')+")\"></div>"
			}
		}, {
			header : getResource('resourceParam858') + "",
			dataIndex : 'pbudatestr',
			width : 60
		}, {
			header : getResource('resourceParam453') + "",
			dataIndex : 'authorname',
			width : 30
		}, {
			header : "" + getResource('resourceParam605') + ""
					+ getResource('resourceParam500') + "",
			dataIndex : 'isarchived',
			width : 30,
			renderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) { // 显示数据前根据发布状态展示不同文本描述
				if (value == 0) {
					return '' + getResource('resourceParam9099') + '';
				} else if (value == 1) {
					return '' + getResource('resourceParam9098') + '';
				}
			}
		}, {
			header : "" + getResource('resourceParam689') + "",
			dataIndex : 'ginstituteName',
			width : 60,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			}
		}]
	});

	var addBt = {
		id : 'add',
		text : getResource('resourceParam477') + '',
		iconCls : 'add1',
		handler : function() {
//			var formPanel = Ext.getCmp('news_form_panel');
//			formPanel.show();
//			grid.hide();
			bulletinMain.setActiveItem(1);
		}

	};
	var updateBt = {
		id : 'update',
		text : getResource('resourceParam478') + '',
		iconCls : 'edit1',
		handler : bulletionFormUpdate.init
	};
	var delBt = {
		text : getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : bulletinDel.init
	};
	var selBt = {
		text : getResource('resourceParam652') + '',
		iconCls : 'search1',
		handler : bulletinQuery.init
	};
	var saveBt = new Ext.Button({
				id : 'bulletinSaveButton',
				text : getResource('resourceParam605') + '',
				iconCls : 'save1',
				handler : guidang.init
			});
	saveBt.disable();
	var viewBt = {
		text : getResource('resourceParam576') + '',
		iconCls : 'view1',
		handler : bulletinView.init
	}
	var depBt = {
		id : 'dep',
		text : getResource('resourceParam1129') + '',
		iconCls : 'user-add',
		handler : zyryMain.init
	}

	var tb = ['-', addBt, '-', delBt, '-', updateBt, '-', selBt, '-', saveBt];
	// var grid = myGrid.init(ds, cm, tb, sm);
	var grid = new Ext.grid.GridPanel({
				store : ds,
				id : 'bulletinGridPanel',
				cm : cm,
				sm : sm,
				autoScroll : true,
				trackMouseOver : true,
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true
				},
				tbar : tb,
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : ds,
							displayInfo : true
						}),
				stripeRows : true
			});

	Ext.Ajax.request({
				url : '../JSON/notices_noticessvr.loginId',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success) {
						if (obj.loginId != "" && obj.loginId != null) {
							bulletinGrid.loginId = obj.loginId;
							if (bulletinGrid.loginId == '3') {
								var t = grid.getTopToolbar(tb);
								t.get("add").hide();
								t.get("update").hide();
								t.get("bulletinSaveButton").hide();
//								t.get("dep").hide();
							}
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam634')
										+ '',
								msg : '' + "数据加载有误！" + '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			});

	return grid;
}

var bulletinMain = {
	grid : null,
	baseargs : null
};

bulletinMain.init = function() {
	var gridList = bulletinGrid.grid();
	var newsFrom = bulletionFromPanel.init();
	bulletinMain.cardpanel = new Ext.Panel({
		border : false,
		layout:'card',
		items : [gridList,newsFrom],
		activeItem : 0
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
					region : 'center',
					layout : 'fit',
					split : true,
					items : [bulletinMain.cardpanel]
				}]
	});
	myGrid.loadvalue(gridList.store, {
				start : 0,
				limit : 25
			}, bulletinMain.baseargs);
	
	bulletinMain.setActiveItem = function(index , myGrid){
		var height = Ext.getBody().getHeight() - 120;
		bulletinMain.cardpanel.getLayout().setActiveItem(index);
		if(!myGrid){
			Ext.getCmp('richEditor').load({
		        url:'../js/richEditor.jsp?height='+ height
		    });
		}else{
			var textfield = myGrid.get("title");
			Ext.getCmp('news_textfield').setValue(textfield);
			var content = myGrid.get("content");
			try{
				FCKeditorAPI.GetInstance("dictContent").setHtml(content);
			}catch(e){
				Ext.getCmp('richEditor').load({
		   			 url:'../js/richEditor.jsp?height='+ height,
		   			 params:{content:content}
				});
			}
		}
	};

};



 function noticeDep(noticeId) {
 	var selModel=Ext.getCmp('bulletinGridPanel').selModel;
 	if(selModel.getSelections().length==1) {
	 	if(selModel.getSelected().get('isarchived') == 1){//判断已发布的公告
		 	Ext.MessageBox.confirm("信息提示","您选择的公告已发布，如果修改将自动取消发布，是否进行修改？",function(btn){
		 		  if(btn == 'yes'){
		 		  		var appId = selModel.getSelected().get('id');
			     	    callSeam("notices_noticessvr", "NoticeSend", [appId],function(result){
			     	    	Ext.getCmp('bulletinGridPanel').getStore().reload();
							zyryadd.init("通知的机构", noticeId);
			     	    });
		 		  }
		 	}).getDialog().setWidth(300);//@chenw
	 	}else {
	 		zyryadd.init("通知的机构", noticeId);
	 	}
 	}
	
	
// 	zyryMain.init(noticeId);
 }
Ext.onReady(bulletinMain.init);