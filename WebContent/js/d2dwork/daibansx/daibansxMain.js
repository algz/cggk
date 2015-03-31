
/**
 * 代办事项列表
 */
var daibansxMain = {daibansxpanel:null,daibansxgrid:null,sign:null,selectages:null,
				args:{start:0,limit:25},baseargs:null,dbsxztai:null,showbt:null};



daibansxMain.init = function(){
	Ext.Ajax.request({
		url: "../data/d2dwork/d2dwork_daibansx_DaibanSXSvr_getDaibansxTbar.text",
		success: daibansxMain.getdialog,
		disableCaching: true,
		autoAbort: true
	});
	}
daibansxMain.getdialog = function(response){
	daibansxMain.sign = Ext.util.JSON.decode(response.responseText);
	Ext.QuickTips.init();
	 var combo=new Ext.form.ComboBox({
				store: new Ext.data.SimpleStore({
					fields: ["dbsxleix", "name"],
					data:daibansxMain.sign.leix
					}),	
			
				valueField :"dbsxleix",
				displayField: "name",
				mode: 'local',
				forceSelection: true,
				
				// text : 9036--事项
				blankText:''+getResource('resourceParam459')+'' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				emptyText:''+getResource('resourceParam503')+'' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				hiddenName:'dbsxleix',
				value:0,
				editable: false,
				triggerAction: 'all',
				allowBlank:false,
				fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				name: 'dbsxleix',
				anchor:'95%'
			});
  	combo.on('select',function(combo,record,num){
						daibansxMain.leix = record.data.dbsxleix;
						daibansxMain.selectages();
						
				});
	daibansxMain.showbt = new Ext.form.TextField({
				name: 'showbt',
				width:175,
				cls:'readonly',
				readOnly:true

	});
	  var selecttb = [
  			'-',
		  	{
  				//enableToggle:true,
  				// text : 9037-全部
		  		text:'' + getResource('resourceParam9031') + '('+daibansxMain.sign.ztaiall+')',
		    	handler: function(){
		    			daibansxMain.ztai = null;
						daibansxMain.selectages();
		    	}
		    },
		  	'-',
		  	{
		  		//enableToggle:true,
		  		text:''+getResource('resourceParam1234')+'('+daibansxMain.sign.ztaiA+')',
		    	handler: function(){
		    			daibansxMain.ztai = 'A';
						daibansxMain.selectages();
		    	}
		    	
		  	},
		  	'-',
		  	{
		  		//enableToggle:true,
		        text:''+getResource('resourceParam1235')+'('+daibansxMain.sign.ztaiB+')',
		        handler: function(){
		    			daibansxMain.ztai = 'B';
						daibansxMain.selectages();
		    	}
		        
		  	},
		  	'-',
		  	{
		  		//enableToggle:true,
		        text:''+getResource('resourceParam987')+'('+daibansxMain.sign.ztaiC+')',
		        handler: function(){
		    			daibansxMain.ztai = 'C';
						daibansxMain.selectages();
		    	}
		  	},
		  	'-',
		  	{
		  		//enableToggle:true,
		        text:''+getResource('resourceParam1238')+'('+daibansxMain.sign.ztaiD+')',
		        handler: function(){
		    			daibansxMain.ztai = 'D';
						daibansxMain.selectages();
		    	}
		  	},
		  	'-',
		  	combo,
		  	'-'
		  	];
	  var worktb = [
  			'-',
		  	{
  				//enableToggle:true,
  				// text : 9036--事项    9038--办理
		  		text:'' + getResource('resourceParam9036') + '' + getResource('resourceParam9038') + '',
		  		iconCls:'dbsx-bl',
		    	handler: function(){
		    		if(myGrid.row == null){									//如未选中任何一行，则不执行操作
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam663')+'',
				           msg:''+getResource('resourceParam965')+''+getResource('resourceParam729')+'' + getResource('resourceParam9039') + '!', //text : 进行操作
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       	});
					  	return false;
					  }
		    	}
		    },
		  	'-',
		  	{
		  		//enableToggle:true,
		    	// text : 9036--事项
		  		text:'' + getResource('resourceParam9036') + ''+getResource('resourceParam1238')+'',
		  		iconCls:'dbsx-zf',
		    	handler: function(){
					if(myGrid.row == null){									//如未选中任何一行，则不执行操作
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam663')+'',
				           msg:''+getResource('resourceParam965')+''+getResource('resourceParam729')+'' + getResource('resourceParam9039') + '!', // text : 9039--进行操作
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       	});
					  	return false;
					  }
					if(myGrid.row.get('sfyunxzf') == 0){									
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam663')+'',
				           // text : 9033--该    9040--不能进行
				           msg:'' + getResource('resourceParam9033') + ''+getResource('resourceParam729')+ '' + getResource('resourceParam9031') + '' +getResource('resourceParam1238')+'!',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       	});
					  	return false;
					  }
					 daibansxZnfa.init(myGrid.row.get('daibsxid'));
		    	}
		    	
		  	},
		  	'-',
		  	{
		  		//enableToggle:true,
		        text:'' + getResource('resourceParam9040') + '', // text : 事项详情
		        iconCls:'dbsx-xq',
		        handler: function(){
					if(myGrid.row == null){									//如未选中任何一行，则不执行操作
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam663')+'',
				           msg:''+getResource('resourceParam965')+''+getResource('resourceParam729')+'' + getResource('resourceParam9039') + '!', // text : 进行操作
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       	});
					  	return false;
					  }
		    		daibansxView.init(myGrid.row.get('daibsxid'));
		    	}
		        
		  	},
		  	'-',
		  	'->',
		  	daibansxMain.showbt
		  	];
	
	daibansxMain.daibansxgrid = daibansxGrid.grid();
	daibansxMain.daibansxpanel = new Ext.Panel({
		 id:'daibansxpanel',
		 region:'center',
		 layout:'border',
		 items:[
		 	daibansxMain.daibansxgrid,
		 	{		
		 		xtype:'tabpanel',
		 		height:55,
		         region:'north',
		         layoutOnTabChange:true,
				 border:false,
				 items:[
					 {
						 // text : 9041--代办事项    9032--办理
					 	title:'' + getResource('resourceParam9041') + '' + getResource('resourceParam9032') + '',
					 	items:[{
					 		xtype:'panel',
					 		tbar:worktb
					 	}]
					 },
					 {
					 	
					 	title:'' + getResource('resourceParam9041') + ''+getResource('resourceParam652')+'',
					 	items:[{
					 		xtype:'panel',
					 		tbar:selecttb
					 	}]
					 }

				 ],
				 activeTab:0
     
		    }
		 ],
		 collapsible: true,
         margins:'0 5 5 0'
	
	});
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	daibansxMain.daibansxpanel
        ]
        
    });
    
	daibansxMain.daibansxpanel.doLayout();
	daibansxMain.leix = 0;
	daibansxMain.selectages();
}

daibansxMain.selectages = function(){
	daibansxMain.baseargs = {
							dbsxztai:daibansxMain.ztai,
							dbsxleix:daibansxMain.leix
						}
	//alert('事项状态'+daibansxMain.baseargs.dbsxztai+'   事项类型'
	//		+daibansxMain.baseargs.dbsxleix);
	myGrid.loadvalue(daibansxMain.daibansxgrid.store,daibansxMain.args,daibansxMain.baseargs);
}
Ext.onReady(daibansxMain.init,daibansxMain,true);
