var sampleMain = {
	form : null,
	mainPanel : null
};

sampleMain.init = function() {

	Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips.getQuickTip(), {
				maxWidth : 1200,
				dismissDelay : 20000
			});
	// Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

	// sampleMain.grid = SampleGrid.getgrid();
	Seam.Component.getInstance("base_user_UserSerivce").getUserPanels(
			function(result) {
				// myGrid.loadvalue(sampleMain.grid.store,{start:0,limit:10},{fanwei:'man',role:'fuze'});
				//	
				// sampleMain.form = new Ext.FormPanel({
				// labelAlign:'left',
				// plain: false,
				// frame:true,
				// bodyStyle:'padding:5px 5px 0',
				// autoScroll:true,
				// region:'center',
				// //height:70,
				// labelWidth:80,
				// items:[{
				// layout:'column',
				// items:[
				// {
				// columnWidth:.5,
				// layout: 'form',
				// defaultType: 'textfield',
				// items:[{
				// fieldLabel: '负责部门',
				// name: 'chargeddepname',
				// maxLengthText :"负责部门名输入过长",
				// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				// regexText : '只能输入中文,字母,数字,英文逗号,英文句号!',
				// width:175,
				// maxLength:50,
				// allowBlank:true,
				// anchor:'95%'
				// }]
				// },{
				// columnWidth:.5,
				// layout: 'form',
				// defaultType: 'textfield',
				// items:[{
				// fieldLabel: '负责人',
				// name: 'chargedmanname',
				// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				// regexText : '只能输入中文,字母,数字,号.号!',
				// width:175,
				// maxLength:10,
				// maxLengthText :"负责人名输入过长",
				// allowBlank:true,
				// anchor:'95%'
				// }]
				// },
				// {
				// columnWidth:.5,
				// layout: 'form',
				// items:[
				// {
				// xtype: 'combo',
				// store:new Ext.data.Store( {
				// proxy : new Ext.data.HttpProxy( {
				// url : "../JSON/aofoquery_GongyiwcComboxSvr.getTaskStatus"
				// }),
				// reader : new Ext.data.JsonReader( {
				// totalProperty : 'totalProperty',
				// root : 'results'
				// }, [ {
				// name : 'taskstatusname'
				// },{
				// name : 'taskstatusid'
				// }])
				// }),
				// valueField :"taskstatusid",
				// displayField: "taskstatusname",
				// mode: 'remote',
				// forceSelection: true,
				// hiddenName:'taskstatusid',
				// editable: false,
				// triggerAction: 'all',
				// fieldLabel: '任务状态',
				// name: 'taskstatusid',
				// anchor:'95%'
				// }]
				// },
				// {
				// columnWidth:.5,
				// layout: 'form',
				// items:[
				// {
				// xtype:'datefield',
				// fieldLabel:'计划开始时间',
				// format:'Y-m-d' ,
				// name:'plannedstartstr',
				// anchor:'95%'
				// }]
				// },{
				// columnWidth:.5,
				// layout: 'form',
				// items:[
				// {
				// xtype:'datefield',
				// fieldLabel:'计划结束时间',
				// format:'Y-m-d' ,
				// name:'plannedendstr',
				// anchor:'95%'
				// }]
				// }
				// ]
				// }],
				// buttons:[
				// {
				//               
				// text:'查询',
				// handler:function(){
				// //zongheUtil.Query();
				// //zongheUtil.a=sampleMain.form.getForm().getValues().chargedmanname;
				// //alert(sampleMain.form.getForm().getValues().chargedmanname);
				// var url
				// ="../base/center.jsp?zonghechaxun?man="+sampleMain.form.getForm().getValues().chargedmanname;
				// url
				// +="&dep="+sampleMain.form.getForm().getValues().chargeddepname;
				// url
				// +="&id="+sampleMain.form.getForm().getValues().taskstatusid;
				// url
				// +="&sta="+sampleMain.form.getForm().getValues().plannedstartstr;
				// url
				// +="&end="+sampleMain.form.getForm().getValues().plannedendstr;
				// window.location=url;
				// }
				//				 
				// },{
				//               
				// text:'重置',
				// handler:function(){
				//						 
				// sampleMain.form.getForm().reset();
				// }
				//			 
				// },{
				//              
				// text:'高级查询',
				// handler:function(){
				// //zongheQuery.init();
				// window.location="../base/center.jsp?zonghechaxun?gaoji=true";
				// // zongheQuery.init();
				// }
				//			 
				// }]
				//		
				// })
				// 新闻点击更多时进入的面板
				var newsStrurl = '../JSON/news_newssvr.getNewsDateObj';
				var newsProxy = new Ext.data.HttpProxy({
							url : newsStrurl
						});
				var newsReader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, ['newsid','longtitle', 'title', 'pbudatestr', 'authorname',
								'ginstituteName', 'content']);
				var newsCm = new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [
						new Ext.grid.RowNumberer(), {
							header : ""+ getResource('resourceParam735') + getResource('resourceParam504') + "",
							dataIndex : 'longtitle',
							sortable : true,
							width : 250,
							renderer : function(value, cellmeta, record,
									rowIndex, columnIndex, store) {
										// 显示数据前根据发布状态展示不同文本描述
								return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI("../base/shownewsDetail.seam?ID="+record.get("newsid")))+"' target=_blank>"+value+"</a>"	
							}
						}, {
							header : "" + getResource('resourceParam1120') + "",
							dataIndex : 'pbudatestr',
							width : 60,
							sortable : true
						}, {
							header : "" + getResource('resourceParam453') + "",
							dataIndex : 'authorname',
							width : 30,
							sortable : true
						}, {
							header : "" + getResource('resourceParam689') + "",
							dataIndex : 'ginstituteName',
							width : 60,
							sortable : true
						}
					]
				});
				var newsDs = new Ext.data.Store({
							proxy : newsProxy,
							reader : newsReader,
							sortInfo : {
								field : 'pbudatestr',
								direction : 'desc'
							}
						});

				var newsGrid = new Ext.grid.GridPanel({
					region : 'center',
					id : 'newsGrid',
					store : newsDs,
					viewConfig : {
						forceFit : true
					},
					cm : newsCm,
					bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : newsDs,
						displayInfo : true,
						displayMsg : '' + getResource('resourceParam7074') + '',
						emptyMsg : "" + getResource('resourceParam7075') + ""
					})
				});
				// 公告点击更多时查看发给登陆用户的公告
				var bulletinStrurl = '../JSON/notices_noticesserver.getNoticesVoObj';
				var bulletinProxy = new Ext.data.HttpProxy({
							url : bulletinStrurl
						});
				var bulletinReader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, ['id','longtitle', 'title', 'pbudatestr', 'authorname',
								'ginstituteName', 'content']);
				var bulletinCm = new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [
						new Ext.grid.RowNumberer(), {
							header : ""+getResource('resourceParam734') + getResource('resourceParam504') + "",
							dataIndex : 'longtitle',
							sortable : true,
							width : 250,
							renderer : function(value, cellmeta, record,
									rowIndex, columnIndex, store) { // 显示数据前根据发布状态展示不同文本描述
								return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI("../base/showBulletinDetail.seam?ID="+record.get("id")))+"' target=_blank>"+value+"</a>"	
							}
						}, {
							header : "" + getResource('resourceParam1120') + "",
							dataIndex : 'pbudatestr',
							width : 60,
							sortable : true
						}, {
							header : "" + getResource('resourceParam453') + "",
							dataIndex : 'authorname',
							width : 30,
							sortable : true
						}, {
							header : "" + getResource('resourceParam689') + "",
							dataIndex : 'ginstituteName',
							width : 60,
							sortable : true
						}
					]
				});
				var bulletinDs = new Ext.data.Store({
							proxy : bulletinProxy,
							reader : bulletinReader,
							sortInfo : {
								field : 'pbudatestr',
								direction : 'desc'
							}
						});

				var bulletinGrid = new Ext.grid.GridPanel({
					region : 'center',
					id : 'bulletinGrid',
					store : bulletinDs,
					viewConfig : {
						forceFit : true
					},
					cm : bulletinCm,
					bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : bulletinDs,
						displayInfo : true,
						displayMsg : '' + getResource('resourceParam7074') + '',
						emptyMsg : "" + getResource('resourceParam7075') + ""
					})
				});

				// 会议点击更多时看到自己参与的会议
				var conferenceStrurl = '../JSON/meetings_meetingsserver.getMeetingsVoObj';
				var conferenceProxy = new Ext.data.HttpProxy({
							url : conferenceStrurl
						});
				var conferenceReader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, ['id','longtitle', 'title', 'pbudatestr', 'authorname','meetingdatestr',
								'place','depname', 'content']);
				var conferenceCm = new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [
						new Ext.grid.RowNumberer(), {
							header : "" +getResource('resourceParam736')+ getResource('resourceParam504') + "",
							dataIndex : 'longtitle',
							sortable : true,
							width : 250,
							renderer : function(value, cellmeta, record,
									rowIndex, columnIndex, store) { // 显示数据前根据发布状态展示不同文本描述
								return "<a style='text-decoration:underline; color:blue;'  href='"+encodeURI(encodeURI("../base/showMeetingsDetail.seam?ID="+record.get("id")))+"' target=_blank>"+value+"</a>"	
							}
						}, {
							header : "" + getResource('resourceParam1120') + "",
							dataIndex : 'pbudatestr',
							width : 60,
							sortable : true
						}, {
							header : "" + getResource('resourceParam453') + "",
							dataIndex : 'authorname',
							width : 30,
							sortable : true
						}, {
							header : "" + getResource('resourceParam1215') + "",
							dataIndex : 'depname',
							width : 60,
							sortable : true
						}
					]
				});
				var conferenceDs = new Ext.data.Store({
							proxy : conferenceProxy,
							reader : conferenceReader,
							sortInfo : {
								field : 'pbudatestr',
								direction : 'desc'
							}
						});

				var conferenceGrid = new Ext.grid.GridPanel({
					region : 'center',
					id : 'conferenceGrid',
					store : conferenceDs,
					viewConfig : {
						forceFit : true
					},
					cm : conferenceCm,
					bbar : new Ext.PagingToolbar({
						pageSize : 25,
						store : conferenceDs,
						displayInfo : true,
						displayMsg : '' + getResource('resourceParam7074') + '',
						emptyMsg : "" + getResource('resourceParam7075') + ""
					})
				});
				
				var newsPanel = new Ext.Panel({
							id : 'newsPanel',
							layout : 'border',
							items : [newsGrid]
						});
				var bulletinPanel = new Ext.Panel({
							id : 'bulletinPanel',
							layout : 'border',
							items : [bulletinGrid]
						});
				var conferencePanel = new Ext.Panel({
							id : 'conferencePanel',
							layout:'border',
							items:[conferenceGrid]
						});
				sampleMain.mainPanel = new Ext.Panel({
					region : 'center',
					layout : 'card',
					activeItem : 0,
					items : [{
								id : 'portalMain',
								xtype : 'portal',
								region : 'center',
								items : [{
											id : 'portal1',
											columnWidth : .5,
											style : 'padding:10px'
										}, {
											id : 'portal2',
											columnWidth : .5,
											style : 'padding:10px '
										}]
							}, newsPanel, bulletinPanel, conferencePanel]
				});
				var viewport = new Ext.Viewport({
							layout : 'border',
							items : [sampleMain.mainPanel]
						});
				var count = 1;
				Ext.each(result, function(o, index) {
							// alert(o.panelid+":"+o.position+":"+index[0]+":"+index[1]);
							var panel1 = indexpanel.allArea(o.panelid,
									o.position);
							if (o.position == null || o.position == "0") {
								Ext.getCmp("portal" + count).add(panel1);
								count++;
								if (count > 2) {
									count = 1;
								}
							} else {
								var st = o.position;
								var s = st.substr(0, 1);
								Ext.getCmp("portal" + s).add(panel1);
								// sampleMain.panelbodyString(panel1.id);
								// alert(panel1.id);
							}
						});
				viewport.doLayout();
				Ext.getCmp("portalMain").on("drop", function(e) {
					var n1 = Ext.getCmp("portal1").items;
					var n2 = Ext.getCmp("portal2").items;
					var st1 = "1.";
					var st2 = "2.";
					var str = "";
					str += "{";
					Ext.each(n1, function(o, index) {
								var id = Ext.getCmp("portal1").items.items[index].id;
								str += id + ":'" + st1 + index + "',";
							});
					Ext.each(n2, function(o, index) {
								var id = Ext.getCmp("portal2").items.items[index].id;
								str += id + ":'" + st2 + index + "',";
							});
					str = str.substring(0, str.lastIndexOf(","));
					str += "}";
					var appVo = Seam.Remoting
							.createType("com.luck.itumserv.home.user.panels.TuserpanelsVo");
					appVo.setPanelid(str);
					Seam.Component.getInstance("tuserpanels_TuserpanelsRemote")
							.update(appVo, function(reslut) {
									});
				});
			});
}
Ext.onReady(sampleMain.init, sampleMain, true);
