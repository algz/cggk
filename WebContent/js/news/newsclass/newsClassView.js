Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newsClassView = {
	win:null,
	form:null,
	tabPanel:null,
	rolegrid:null
};
newsClassView.viewNewsClass = function(){
	if (newsClass.node==null){
		Ext.MessageBox.show({
			title: '警告',
			msg: ''+getResource('resourceParam1835')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.WARNING
		});
		return false;
	}
	newsClassView.getViewDialog();
};
newsClassView.getRoleGrid = function(){
	 var strurl = '../JSON/base_user_UserSerivce.updataRole';
	 var proxy = new Ext.data.HttpProxy({
	            url: strurl
	        });
	 var reader = new Ext.data.JsonReader({
	            root: 'results',
	            totalProperty: 'totalProperty',
	            id: 'roleid'
	        }, [
	            'roleid','rolename','descr','roleType'
	        ]);
	  var ascid = 'roleid';
	  var ascstr = 'asc';
	  var ds = new data.Store(proxy,reader,ascid,ascstr);
	  //ds.baseParams={start:0,limit:25};
	
	 
	  var checkColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam503')+"",
       dataIndex: 'sign',
       width: 100
    });
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [
	  	checkColumn,	
	  	{
		  	id:'id',
		  	header: ""+getResource('resourceParam809')+"", 
		  	width: 180, 
		  	dataIndex: 'roleid'
	  	},
	  	{
			header: ""+getResource('resourceParam796')+"",
			dataIndex: 'rolename',
			width: 200
		}
	]});
	
 
  var tb=null;
  newsClassView.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  newsClassView.rolegrid.height=300,
  newsClassView.rolegrid.width=550,
  newsClassView.rolegrid.region= 'center';
};


newsClassView.getViewDialog = function(){
	tlework.addHtml(tlework.divHtml,'viewNewsClass');	
	newsClassView.getRoleGrid();
	newsClassView.getFormPanel();
	newsClassView.initTabpanel();
	
	if (!newsClassView.viewDialog){	
		newsClassView.viewDialog = new Ext.Window({ 
			el:'viewNewsClass',
			title: ''+getResource('resourceParam576')+'栏目'+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:650,
           	height:490,
           	closeAction:'hide',
           	plain: true,
			items:newsClassView.viewForm						
		});
		newsClassView.viewDialog.on('hide',newsClassView.close);
	}
	newsClassView.tabPanel = newsClassView.viewForm.add(newsClassView.tabPanel);
	myGrid.loadvalue(newsClassView.rolegrid.store,null,[2]);

	newsClassView.viewDialog.show();

};

newsClassView.close = function(){			
		newsClassView.viewForm.form.reset();									
		newsClassView.viewDialog.destroy();
		newsClassView.viewForm = null;					
		newsClassView.viewDialog = null;
};




newsClassView.getViewForm = function() {
	//Ext.form.Field.prototype.msgTarget='side';
	newsClassView.viewForm = new Ext.FormPanel({
		height:130,
		xtype:'form',
		region:'north',
		labelAlign:"left",
		labelSeparator:':',
		labelWidth:90,
		frame:true,	
		bodyStyle:'pupdateing:5px 5px 0;background:transparent',
		items:[
			{
			layout:'column',
			items:[{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目'+getResource('resourceParam480')+'',
					style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
					allowBlank:false,
					name:'classname',
					value:newsClass.node.attributes.classname,
					//width:140
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目代码',
					style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
					allowBlank:false,
					value:newsClass.node.attributes.classCode,
					name:'classCode',
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.5,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'父栏目',
					style:'border:0px;background:transparent;',
					name:'classname',
					id:'classname',
					readOnly:true,
					grow:true,
					value:newsClass.node.attributes.parentName,
					//width:140
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.25,
	            layout: 'form',
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'推荐栏目',
	                boxLabel:''+getResource('resourceParam512')+'',
	                name: 'iselite',
	                checked:true,
	                inputValue:'1',
	                anchor:'95%'
	            	}]
			}
			,
			{
				 columnWidth:.25,
	            layout: 'form',
	            labelWidth:0,
	            labelSeparator:'',
	            hideLabels:true,
	            border:false,
	            items: [{
	                       style:'margin-top:5px',
	                xtype:'radio',
	                fieldLabel: '',
	                boxLabel:''+getResource('resourceParam510')+'',
	                name: 'iselite',
	                inputValue:'0',
	                anchor:'95%'
	           		 }]
			}
			,
			{
				columnWidth:.99,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目链接'+getResource('resourceParam497')+'',
					style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
					name:'linkurl',
					value:newsClass.node.attributes.linkurl,
					anchor:'90%'
				}]
			}
			,
			{
				columnWidth:.99,
				layout:"form",
				items:[{
					xtype:'textfield',
					fieldLabel:'栏目默认图片',
					style:'border:0px;background:transparent;',
					readOnly:true,
					grow:true,
					name:'classpicurl',
					value:newsClass.node.attributes.classpicurl,
					anchor:'90%'
				}]
			}
			]
		}]
		,   buttons: [
			{   text: ''+getResource('resourceParam506')+'',
				handler: function(){				
					newsClassView.viewDialog.hide();	
				}
			}
		]	

	});	
	
	
	return newsClassView.viewForm;
	
}

newsClassView.initTabpanel = function() {
	newsClassView.tabPanel = new Ext.TabPanel({
		region:'center',
		//autoScroll:true,
		activeTab:0,
		height:300,
    	//deferredRender:false,
    	autoTabs:true,
		items:[{
			id:'readme',
			title:'栏目'+getResource('resourceParam1256')+'',
			layout:'border',
			items:[{
				xtype:'htmleditor',
				region:'center',
				value:newsClass.node.attributes.readme,
				name:'readme'
			}]
		}
		,{
			id:'classmaster',
			title:'栏目管理'+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassView.rolegrid
		}
		, {
			id:'addpruview',
			title:'栏目'+getResource('resourceParam605')+''+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassView.rolegrid
		}
		, {
			id:'browsepurview',
			title:'栏目'+getResource('resourceParam473')+''+getResource('resourceParam582')+'',
			layout:'fit',
			autoScroll:true,
			items:newsClassView.rolegrid
		}
		]
	});
};

newsClassView.addsave = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: '保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		newsClass.tree.getLoader().load(newsClass.tree.getRootNode());
		//将选中记录置为空
		newsClass.node = null;				
		newsClassView.viewDialog.hide();
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: '栏目'+getResource('resourceParam594')+',请重新'+getResource('resourceParam494')+'！',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}	
};

newsClassView.getFormPanel= function(){
	newsClassView.getViewForm();
	tlework.addHtml(tlework.divHtml,'viewForm');	
	newsClassView.formPanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'viewForm',
         region:'north',
		 layout:'fit',
        // height:520,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
