/**
 * 高级查询
 */
var gongyiwcQuery = {
	queryDialog : null,
	gongyiwcform : null,
	models:null,
	store:null,
	modelcombo:null,
	batchecombo:null
};

/**
 * 查询面板初始化
 */
gongyiwcQuery.init = function() {
 var proxy = new Ext.data.HttpProxy({
            url: "../JSON/aofoquery_TechnicsSvr.getGrid"
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty'
        }, [                                    
            'taskid','taskname','chargeddepid','chargeddepname',
            'chargedmanid','chargedmanname','currenttache','taskproblemsnotes',
            'projectid','projectname','taskname','currenttache','taskproblemsnotes',
            {name:'plannedamount',type: 'int'},
            {name:'completedamount',type: 'int'}
        ]);
  var ascid = null;
  var ascstr = null;
  var ds = new data.Store(proxy,reader,ascid,ascstr);
	if (!gongyiwcQuery.queryDialog) {
		tlework.addHtml(tlework.divHtml, "gongyiwcQuery");
		gongyiwcQuery.queryDialog = new Ext.Window( {
			el : 'gongyiwcQuery',
			title : ''+getResource('resourceParam1291')+'',
			modal : true,
			layout : 'border',
			width : 550,
			height : 260,
			closeAction : 'hide',
			plain : false,
			items : gongyiwcQuery.querygongyiwcform()
		});
	}
	if(gongyiwcMain.tab.activeTab.id == 'tabpanel1'){
		if(gongyiwcMain.tablename=='technics'){
			ds.baseParams = {tablename: 'technics'}; 
			gongyiwcQuery.gongyiwcform.getComponent(0).add({
					columnWidth:.5,
	                layout: 'form',
					items:[{
						xtype: 'combo',
						store: ds,
						valueField :"projectid",
						displayField: "projectname",
						mode: 'remote',
						forceSelection: true,
						hiddenName:'projectid',
						editable: false,
						triggerAction: 'all',
						fieldLabel: ''+getResource('resourceParam1035')+'',
						name: 'projectid',
						anchor:'95%'	 		 
					}]
			})
		} else if(gongyiwcMain.tablename=='technicsdep'){
			ds.baseParams = {tablename: 'technicsdep',projectid: myGrid.row.get('projectid')}; 
			gongyiwcQuery.gongyiwcform.getComponent(0).add({
					columnWidth:.5,
	                layout: 'form',
					items:[{
						xtype: 'combo',
						store: ds,
						valueField :"chargeddepid",
						displayField: "chargeddepname",
						mode: 'remote',
						forceSelection: true,
						hiddenName:'chargeddepid',
						editable: false,
						triggerAction: 'all',
						fieldLabel: ''+getResource('resourceParam1292')+'',
						name: 'chargeddepid',
						anchor:'95%'
					}]
			})
		} else if (gongyiwcMain.tablename=='technicsperson'){
			ds.baseParams = {
				tablename: 'technicsperson',
				projectid: myGrid.row.get('projectid'),
				chargeddepid:myGrid.row.get('chargeddepid')};
			gongyiwcQuery.gongyiwcform.getComponent(0).add({
					columnWidth:.5,
	                layout: 'form',
					items:[{
						xtype: 'combo',
						store: ds,
						valueField :"chargedmanid",
						displayField: "chargedmanname",
						mode: 'remote',
						forceSelection: true,
						hiddenName:'chargedmanid',
						editable: false,
						triggerAction: 'all',
						fieldLabel: ''+getResource('resourceParam731')+'',
						name: 'chargedmanid',
						anchor:'95%'	 		 
					}]
			})
		} else if (gongyiwcMain.tablename=='renwuwcqk'){
//			ds.baseParams = {
//				tablename: 'renwuwcqk',
//				projectid: myGrid.row.get('projectid'),
//				chargeddepid:myGrid.row.get('chargeddepid'),
//				chargedmanid:myGrid.row.get('chargedmanid')};
//			ds.baseParams = gongyiwcMain.baseargs;
//			gongyiwcQuery.gongyiwcform.getComponent(0).insert(0,{
//					columnWidth:.5,
//	                layout: 'form',
//	                defaultType: 'textfield',
//					items:[{
//						msgTarget :"title",
//						fieldLabel: '任务名',
//						name: 'taskname',
//						width:175,
//						maxLength:50,				 
//						allowBlank:true,
//						maxLengthText: "任务名输入过长",
//						anchor:'95%'	 		 
//					}]
//			});
//			gongyiwcQuery.gongyiwcform.getComponent(0).insert(1,{
//					columnWidth:.5,
//	                layout: 'form',
//	                defaultType: 'textfield',
//					items:[{
//						fieldLabel: '负责部门',
//						name: 'chargeddepname',
//						maxLengthText :"负责部门名输入过长",
//						width:175,
//						maxLength:50,
//						allowBlank:true,
//						anchor:'95%'	 		 
//					}]
//			});
//			gongyiwcQuery.gongyiwcform.getComponent(0).insert(2,{
//					columnWidth:.5,
//	                layout: 'form',
//	                defaultType: 'textfield',
//					items:[{
//						fieldLabel: '负责人',
//						name: 'chargedmanname',
//						width:175,
//						maxLength:10,
//						maxLengthText :"负责人名输入过长",
//						allowBlank:true,
//						anchor:'95%'	 		 
//					}]
//			});
		} 
	} else {
		
		proxy = new Ext.data.HttpProxy({
            url: "../JSON/aofoquery_GongyiwcSvr.getGrid"
        });
  		reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty'
        }, [
            'taskid','taskname','partsnum','taskstatusid','chargedmanid',
            'plannedstartstr','plannedendstr','actualstartstr','actualendstr',
            'chargeddepid','tasknotes','chargedmanname','taskstatusname'
        ]);
 		ascid = 'taskid';
  		ascstr = 'asc';
  		ds = new data.Store(proxy,reader,ascid,ascstr);
  
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(2,{
					columnWidth:.5,
	                layout: 'form',
					items:[{
							xtype:'datefield',
							fieldLabel:''+getResource('resourceParam856')+'',
							format:'Y-m-d' ,
							name:'actualstartstr',
							anchor:'95%'
					}]
		});
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(3,{
					columnWidth:.5,
	                layout: 'form',
					items:[{
							xtype:'datefield',
							fieldLabel:''+getResource('resourceParam992')+'',
							format:'Y-m-d' ,
							name:'actualendstr',
							anchor:'95%'
					}]
		});
		gongyiwcQuery.gongyiwcform.getComponent(0).add({
					columnWidth:.5,
	                layout: 'form',
		 			items:[{
						xtype: 'combo',
						store:new Ext.data.Store( {
							proxy : new Ext.data.HttpProxy( {
								url : "../JSON/aofoquery_GongyiwcComboxSvr.getTaskStatus"
							}),
							reader : new Ext.data.JsonReader( {
								totalProperty : 'totalProperty',
								root : 'results'
								}, [ {
									name : 'taskstatusname'
								},{
									name : 'taskstatusid'		
							}])
						}),
						valueField :"taskstatusid",
						displayField: "taskstatusname",
						mode: 'remote',
						forceSelection: true,
						hiddenName:'taskstatusid',
						editable: false,
						triggerAction: 'all',
						fieldLabel: ''+getResource('resourceParam739')+'',
						name: 'taskstatusid',
						anchor:'95%'
				}]
		});
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(0,{
					columnWidth:.5,
	                layout: 'form',
	                defaultType: 'textfield',
					items:[{
						msgTarget :"title",
						fieldLabel: ''+getResource('resourceParam1294')+'',
						name: 'taskname',
						width:175,
						maxLength:50,				 
						allowBlank:true,
						maxLengthText: ""+getResource('resourceParam1290')+"",
						anchor:'95%'	 		 
					}]
		});
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(1,{
					columnWidth:.5,
	                layout: 'form',
	                defaultType: 'textfield',
					items:[{
						fieldLabel: ''+getResource('resourceParam986')+'',
						name: 'chargeddepname',
						maxLengthText :""+getResource('resourceParam1288')+"",
						width:175,
						maxLength:50,
						allowBlank:true,
						anchor:'95%'	 		 
					}]
			});
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(2,{
					columnWidth:.5,
	                layout: 'form',
	                defaultType: 'textfield',
					items:[{
						fieldLabel: ''+getResource('resourceParam731')+'',
						name: 'chargedmanname',
						width:175,
						maxLength:10,
						maxLengthText :""+getResource('resourceParam1289')+"",
						allowBlank:true,
						anchor:'95%'	 		 
					}]
			});
		gongyiwcQuery.gongyiwcform.getComponent(0).insert(3,{
					columnWidth:.5,
	                layout: 'form',
	                defaultType: 'textfield',
					items:[{
						fieldLabel: '零件号',
						name: 'partsnum',
						width:175,
						maxLength:32,
						maxLengthText :"零件号"+getResource('resourceParam1293')+"",
						allowBlank:true,
						anchor:'95%'	 		 
					}]
			});
	}
	gongyiwcQuery.queryDialog.show();
	gongyiwcQuery.queryDialog.on("hide", function() {
		gongyiwcQuery.queryDialog.close();
		gongyiwcQuery.queryDialog.destroy();
		gongyiwcQuery.queryDialog = null;

	});
};

/**
 * 生成查询日志的Form面板
 */
gongyiwcQuery.querygongyiwcform = function() {
	gongyiwcQuery.store= new Ext.data.Store( {
							reader : new Ext.data.JsonReader( {
								totalProperty : 'totalProperty',
								root : 'results'
							}, [ {
								name : 'batchname'
							},{
								name : 'batchs'		
							}])
						});
	gongyiwcQuery.modelcombo = new Ext.form.ComboBox({
					store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/aofoquery_GongyiwcComboxSvr.getModel"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'modelname'
						},{
							name : 'model'		
						}])
					}),
					valueField :"model",
					displayField: "modelname",
					mode: 'remote',
					forceSelection: true,
					hiddenName:'model',
					editable: false,
					triggerAction: 'all',
					fieldLabel: '型号',
					name: 'model',
					anchor:'95%'	
			});
	gongyiwcQuery.batchecombo = new Ext.form.ComboBox({
					xtype: 'combo',
					store: gongyiwcQuery.store,
					valueField :"batchs",
					displayField: "batchname",
					mode: 'remote',
					forceSelection: true,
					hiddenName:'batchs',
					editable: false,
					triggerAction: 'all',
					fieldLabel: '批次',
					name: 'batchs',
					anchor:'95%'
			});
	gongyiwcQuery.batchecombo.disable();		
	gongyiwcQuery.modelcombo.on('select',function(combo,record,index ){
						gongyiwcQuery.batchecombo.reset();
						gongyiwcQuery.store.baseParams = {model: record.data.model};
						gongyiwcQuery.store.proxy = new Ext.data.HttpProxy( {
								url : "../JSON/aofoquery_GongyiwcComboxSvr.getBatchs"
							});
						gongyiwcQuery.store.load();	
						gongyiwcQuery.batchecombo.enable();
					})
	gongyiwcQuery.gongyiwcform = new Ext.FormPanel( {
		labelWidth : 90, // label settings here cascade unless overridden
		frame:true,
		region:'center',
		plain:false,
		//shadow: false,
		bodyStyle:'padding:5px 5px 0',
		width : 550,
		items:[{
        	layout:'column',
			items : [{
	                columnWidth:.5,
	                layout: 'form',
					items:[
						{
							xtype:'datefield',
							fieldLabel:''+getResource('resourceParam991')+'',
							format:'Y-m-d' ,
							name:'plannedstartstr',
							anchor:'95%'
					}]
				},{
	                columnWidth:.5,
	                layout: 'form',
					items:[
						{
							xtype:'datefield',
							fieldLabel:''+getResource('resourceParam993')+'',
							format:'Y-m-d' ,
							name:'plannedendstr',
							anchor:'95%'
					}]
				},{
	                columnWidth:.5,
	                layout: 'form',
					items:[gongyiwcQuery.modelcombo]		
				},{
	                columnWidth:.5,
	                layout: 'form',
					items:[gongyiwcQuery.batchecombo]
				},{
	                columnWidth:.5,
	                layout: 'form',
					items:[
						{
							xtype: 'combo',
							store:gongyiwcNorth.ds_gongyi("../JSON/aofoquery_GongyiwcComboxSvr.getSorties"),
							valueField :"sorties",
							displayField: "sorties",
							mode: 'remote',
							forceSelection: true,
							hiddenName:'sorties',
							editable: false,
							triggerAction: 'all',
							fieldLabel: '架次',
							name: 'sorties',
							anchor:'95%'
					}]
				} 	
				]}],
		buttons : [
				{
					text : ''+getResource('resourceParam652')+'',
					handler : function() {
						gongyiwcUtil.GQuery();
						gongyiwcQuery.queryDialog.hide();
					}

				}, {
					text : '取消',
					handler : function() {
						gongyiwcQuery.queryDialog.hide();
					}
				}]
	});
	return gongyiwcQuery.gongyiwcform;
};
