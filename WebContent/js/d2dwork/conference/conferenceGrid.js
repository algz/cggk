Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var conferenceGrid = {
	rows : null,
	loginId : null,
	args : {
		start : 0,
		limit : 25
	}
};

conferenceGrid.grid = function() {
    Ext.QuickTips.init();
	var strurl = "../JSON/meetings_meetingssvr.getconferenceList";
	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'title', 'author', 'content', 'pbudate', 'isarchived',
					'typeid', 'typename', 'riqi', 'shijian', 'authorname',
					'isarchivedname', 'pbudatestr', 'organizer', 'depname',
					'place', 'meetingdate', 'meetingdatestr','url', 'userId']);

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
					rowselect : function(sm, row, rec) {
						var status = rec.data.isarchived;
						var saveButton = Ext.getCmp("conferenceSaveButton");
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
						conferenceGrid.rows = sm.getSelections();
						if (sm.getSelections().length < 1) {
							var saveButton = Ext.getCmp("conferenceSaveButton");
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
			hidden:true
		}, {
			header : getResource('resourceParam504') + "",
			dataIndex : 'title',
			width:250,
			renderer:function(value,p,r){
				//gaoyn bug 1196 悬浮提示 2011-6-14 15:54 
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
			    return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI(r.get("url")))+"' target=_blank>"+"<font ext:qtip=" + name + '>' + value + '</font>'+"</a>"
			}
		}, {
			header : getResource('resourceParam1113') + "",
			dataIndex : 'aa',
			width : 60,
			renderer : function(value, p, r) {
				return "<div><input type=\"button\" value=\""+getResource('resourceParam1113') +"\" onclick=\"participate("+r.get('id')+")\"></div>"
			}
		},{
			header : getResource('resourceParam858') + "", //创建日期
			dataIndex : 'pbudatestr',
			width:60
		}, {
			header : getResource('resourceParam1223') + "",
			dataIndex : 'meetingdatestr',
			width:60
		}, {
			header : getResource('resourceParam453') + "",
			dataIndex : 'authorname',
			width:30
		}, {
			header : getResource('resourceParam605') + "",
			dataIndex : 'isarchived',
			width:30,
			renderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) { // 显示数据前根据发布状态展示不同文本描述
				if (value == 0) {
					return '' + getResource('resourceParam9099') + '';//未发布
				} else if (value == 1) {
					return '' + getResource('resourceParam9098') + '';//一发布
				}
			}
		}, {
			header : getResource('resourceParam1215') + "",
			dataIndex : 'depname',
			width:60,
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
		handler : function(){
//				var formPanel = Ext.getCmp('news_form_panel');
//					formPanel.show();
//				grid.hide();
		conferenceMain.setActiveItem(1);
		        
		}
	};
	var updateBt = {
		id : 'update',
		text : getResource('resourceParam478') + '',
		iconCls : 'edit1',
		handler : conferenceFromUpdate.init
	};
	var delBt = {
		text : getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : conferenceDel.init
	};
	var selBt = {
		text : getResource('resourceParam652') + '',
		iconCls : 'search1',
		handler : conferenceQuery.init
	};
	var saveBt = new Ext.Button({
				id : 'conferenceSaveButton',
				text : getResource('resourceParam605') + '',
				id : 'conferenceSaveButton',
				iconCls : 'save1',
				handler : guidang.init
			});
	saveBt.disable();
	var viewBt = {
		text : getResource('resourceParam576') + '',
		iconCls : 'view1',
		handler : conferenceView.init
	}
	var renBt = {
		id : 'ren',
		text : getResource('resourceParam1224') + '',
		iconCls : 'user-add',
		handler : zyryMain.init
	}

	var tb = ['-', addBt, '-', delBt, '-', updateBt, '-', selBt, '-', saveBt];
//	var grid = myGrid.init(ds, cm, tb, sm);
	var grid = new Ext.grid.GridPanel({
		store : ds,
		id : 'conferenceGridPanel',
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
				url : '../JSON/meetings_meetingssvr.loginId',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success) {
						if (obj.loginId != "" && obj.loginId != null) {
							conferenceGrid.loginId = obj.loginId;
							if (conferenceGrid.loginId == '3') {
								var t = grid.getTopToolbar(tb);
								t.get("add").hide();
								t.get("update").hide();
								t.get("conferenceSaveButton").hide();
//								t.get("ren").hide();
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

var conferenceMain = {
		grid : null,
		baseargs : null
	};



    conferenceMain.init = function() {
		var gridList = conferenceGrid.grid();
		var newsFrom = conferenceFromPanel.init();
	conferenceMain.cardpanel = new Ext.Panel({
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
				items : [conferenceMain.cardpanel]
			}]
		});
		myGrid.loadvalue(gridList.store, {
			start : 0,
			limit : 25
		}, conferenceMain.baseargs);
	};
	function participate(meetingId)
	{
			var selModel=Ext.getCmp('conferenceGridPanel').selModel;
		 	if(selModel.getSelections().length==1) {
			 	if(selModel.getSelected().get('isarchived') == 1){//判断已发布的公告
				 	Ext.MessageBox.confirm("信息提示","您选择的会议已发布，如果修改将自动取消发布，是否进行修改？",function(btn){
				 		  if(btn == 'yes'){
				 		  		var appId = selModel.getSelected().get('id');
					     	    callSeam("meetings_meetingssvr", "meetingSend", [appId],function(result){
					     	    	Ext.getCmp('conferenceGridPanel').getStore().reload();
									zyryMain.init(meetingId);
					     	    });
				 		  }
				 	}).getDialog().setWidth(300);
			 	}else {
			 		zyryMain.init(meetingId);
			 	}
		 	}
	}
	conferenceMain.setActiveItem = function(index , myGrid){
		var height = Ext.getBody().getHeight() - 200;
		conferenceMain.cardpanel.getLayout().setActiveItem(index);
		if(!myGrid){
			Ext.getCmp('richEditor').load({
		        url:'../js/richEditor.jsp?height='+ height
		    });
		}else{
			var textfield = myGrid.get("title");
			departmentUser.codeid=myGrid.get('organizer');
			departmentUser.departmentCombo.setTextValue(myGrid.get('depname'));
			var content = myGrid.get("content");
			var riqi = myGrid.get("riqi");
			var shijian = myGrid.get("shijian");
			var place = myGrid.get("place");
			Ext.getCmp('textfield').setValue(textfield);
			Ext.getCmp('riqi').setValue(riqi);
			Ext.getCmp('shijian').setValue(shijian);
			Ext.getCmp('place').setValue(place);
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
Ext.onReady(conferenceMain.init);