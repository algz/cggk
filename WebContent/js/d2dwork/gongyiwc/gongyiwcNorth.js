var gongyiwcNorth = {models:null,store:null,modelcombo:null,batchecombo:null};

gongyiwcNorth.getForm = function(){
	gongyiwcNorth.store= new Ext.data.Store( {
							reader : new Ext.data.JsonReader( {
								totalProperty : 'totalProperty',
								root : 'results'
							}, [ {
								name : 'batchname'
							},{
								name : 'batchs'		
							}])
						});
	gongyiwcNorth.modelcombo = new Ext.form.ComboBox({
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
	gongyiwcNorth.batchecombo = new Ext.form.ComboBox({
					xtype: 'combo',
					store: gongyiwcNorth.store,
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
	gongyiwcNorth.batchecombo.disable();
	gongyiwcNorth.modelcombo.on('select',function(combo,record,index ){
						gongyiwcNorth.batchecombo.reset();
						gongyiwcNorth.store.baseParams = {model: record.data.model};
						gongyiwcNorth.store.proxy = new Ext.data.HttpProxy( {
								url : "../JSON/aofoquery_GongyiwcComboxSvr.getBatchs"
							});
						gongyiwcNorth.store.load();	
						gongyiwcNorth.batchecombo.enable();
					});
	gongyiwcNorth.tongjiBt=new Ext.Button({
		text : '统计',	 
		handler : function(){
			gongyiwcNorth.tongjiBt.disable();
		 
			callSeam("aofoquery_TechnicsStatSvr","save",[null],
			function(result){
				gongyiwcNorth.tongjiBt.enable();
				if(result=='ok'){
					alert("统计完成");
				}else {
					alert("统计失败");
				}
			});
		}
	});
		
	gongyiwcNorth.form = new Ext.FormPanel({
		labelAlign:'left',
        plain: false,
		frame:true,
		autoScroll:false,
		region:'north',
		height:70,
		labelWidth:80,
		items:[{
            layout:'column',
			items:[
			{
                columnWidth:.33,
                layout: 'form',
				items:[gongyiwcNorth.modelcombo]			
			},{
                columnWidth:.33,
                layout: 'form',
				items:[gongyiwcNorth.batchecombo]
			},{
                columnWidth:.33,
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
			},{
                columnWidth:.33,
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
                columnWidth:.33,
                layout: 'form',
				items:[
					{
						xtype:'datefield',
						fieldLabel:''+getResource('resourceParam993')+'',
						format:'Y-m-d' ,
						name:'plannedendstr',
						anchor:'95%'
				}]
			},
				{
                columnWidth:.08,
                layout: 'form',
				items:[
					{
						xtype:'button',
						minWidth:80,
						text:''+getResource('resourceParam652')+'',
						handler:function(){
							gongyiwcUtil.Query();
						}
				}]
			},{
                columnWidth:.08,
                layout: 'form',
				items:[
					{
						xtype:'button',
						minWidth:80,
						text:''+getResource('resourceParam606')+'',
						handler:function(){			
							gongyiwcNorth.batchecombo.reset();
							gongyiwcNorth.batchecombo.disable();
							gongyiwcMain.queryForm.getForm().reset();
						}
				}]
			},{
                columnWidth:.09,
                layout: 'form',
				items:[
					{
						xtype:'button',
						minWidth:80,
						text:''+getResource('resourceParam1287')+'',
						handler:function(){
							gongyiwcQuery.init();
						}
				}]
			}
			,{
                columnWidth:.09,
                layout: 'form',
				items:[gongyiwcNorth.tongjiBt]
			}
			]
		}]								
		
	})
	
	return gongyiwcNorth.form;
};

gongyiwcNorth.getDaohang = function(){
	var status = '<div id="daohangtitle" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px"   align="left">' +
					'<div id="daohang" style="float:left; padding-top:0px;padding-left:5px;">sdfewsdfsesdf</div> ' +
					'<div style="float:right; padding-top:0px;">' +
					'</div> ' +
					' <div id="fanhui" style="float:right; padding-top:0px;padding-right:20px;">' +
					'<a style="cursor: hand" onclick="gongyiwcUtil.Stepout()">' +
						''+getResource('resourceParam944')+'</a>'
					'</div>' +
				 	'</div>';
	return new Ext.Panel({
		region:'north',
		height:25,
		html:status
	});
}

gongyiwcNorth.ds_gongyi = function(url) {
	 ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : url
		}),
		reader : new Ext.data.JsonReader( {
			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'model'
		}, {
			name : 'batchs'
		}, {
			name : 'sorties'
		}, {
			name : 'projectid'
		}])
	});
	return  ds;
};

 

