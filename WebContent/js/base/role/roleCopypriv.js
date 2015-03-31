Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var roleCopypriv = {columnTree:null,panel:null,rolegrid:null,panel:null,roleform:null,gridpanel:null,formpanel:null,baseargs:null,roleid:null};
roleCopypriv.getrolegrid = function(){
	roleCopypriv.columnTree = new Ext.tree.ColumnTree({
		id:'columntree',
		containerScroll: true,
		animate:true,
		header:false,
		autoHeight:true,
		autoWidth:true,
	    rootVisible:false,
	    checkModel:'cascade',
	    onlyLeafCheckable: false,
	    enableDD:false,    
   	    lines:true,
	    columns:[{
	        header:''+getResource('resourceParam810')+'',
	        width:120,
	        dataIndex:'groups'
	    },{
	        header:''+getResource('resourceParam756')+'',
	        width:90,
	        dataIndex:'privilegeid'
	    },{
	        header:''+getResource('resourceParam674')+'',
	        width:90,
	        dataIndex:'privilegename'
	    }],
	    
		loader: new Ext.tree.TreeLoader({
		  // dataUrl:'../JSON/base_role_rolePrivSerivce.updataprivTree?roleid='+roleAddprivtree.rolegrid,
		   dataUrl:'../JSON/base_role_rolePrivSerivce.gropuNames?roleid='+roleCopypriv.rolegrid,
		   preloadChildren:true,
		    method:'GET',
		    uiProviders:{
		        'col': Ext.tree.ColumnNodeUI
		    }
		}),
		root: new Ext.tree.AsyncTreeNode({
	    	text:''+getResource('resourceParam665')+'',
	    	id:'0',
	    	iconCls:'top',
	    	draggable:false
	    })
	});
	roleCopypriv.columnTree.expandAll();
	
	var sm = roleCopypriv.columnTree.getSelectionModel();
	var nodeInf;
	roleCopypriv.columnTree.on('checkchange', function(node, checked) {   
                    node.expand();   
                    node.attributes.checked = checked;   
                    node.eachChild(function(child) {   
                        child.ui.toggleCheck(checked);   
                        child.attributes.checked = checked;   
                        child.fireEvent('checkchange', child, checked);   
                    });   
                }, roleCopypriv.columnTree);  
	sm.on('selectionchange', function(sm, node) {
		if(node != null) {
			roleCopypriv.nodePath=node.getPath();
			nodeInf = node.attributes;
		}
	});
	

};
roleCopypriv.getroleform = function(){
	roleCopypriv.roleform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        region:'north',
        plain: false,
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 300,
        height:120,
		//defaults: {width: 175},
		defaultType: 'textfield',
		//labelWidth:80,
		items:[								//定义面板中的表单元素
			
			{	fieldLabel: ''+getResource('resourceParam797')+'',		//文本框
				name: 'rolename',
				width:175,
				blankText:''+getResource('resourceParam801')+'',
				maxLength : 50,
				maxLengthText :''+getResource('resourceParam803')+getResource('resourceParam1054')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam800')+'',
				allowBlank:false
			},
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam796')+'',
				name: 'descr',
				width:175,
				height:60,
				maxLength : 150,
				maxLengthText :''+getResource('resourceParam799')+''
			
			})]
			
	});				
};
roleCopypriv.getformpanel= function(){
	roleCopypriv.getroleform();
	tlework.addHtml(tlework.divHtml,'roleAddprivform');	
	roleCopypriv.formpanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'roleAddprivform',
         region:'north',
		 layout:'fit',
		 width:300,
		 height:120,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}

roleCopypriv.getdialog = function(id){

	roleCopypriv.rolegrid = id;
	tlework.addHtml(tlework.divHtml,'roleAddprivdialog');	
	roleCopypriv.getrolegrid();
	roleCopypriv.getformpanel();
	
	roleCopypriv.panel=new Ext.Panel({
				region:'center',
				layout:'fit',
				autoScroll:true,
				items : roleCopypriv.columnTree
				});
	
	if (!roleCopypriv.roleAddprivdialog){		
		roleCopypriv.roleAddprivdialog = new Ext.Window({ 
			el:'roleAddprivdialog',
			title: ''+getResource('resourceParam811')+'',
           	layout:'border',
			modal:true,
           	width:300,
           	height:400,
           	closeAction:'hide',
           	plain: false,
			buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					var rolename=roleCopypriv.roleform.getForm().findField('rolename').getValue();
					var descr=roleCopypriv.roleform.getForm().findField('descr').getValue();
					Seam.Component.getInstance("base_role_rolePrivSerivce").
					copyRole(rolename,descr,roleCopypriv.getroles(),roleCopypriv.saveroles); 	
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
					roleCopypriv.roleAddprivdialog.hide();
				}
			}]
		});
		roleCopypriv.roleAddprivdialog.on('hide',roleCopypriv.close);
	}
	
	roleCopypriv.roleAddprivdialog.add(roleCopypriv.roleform);
	roleCopypriv.roleAddprivdialog.add(roleCopypriv.panel);
//	var rolepri={
//		roleid:roleCopypriv.roleid,
//		quanxuan:null
//	}
//	myGrid.loadvalue(roleCopypriv.rolegrid.store,null,rolepri);
	roleCopypriv.roleAddprivdialog.show();
};
roleCopypriv.close = function(){
	roleCopypriv.roleAddprivdialog.destroy();					
	roleCopypriv.roleAddprivdialog = null;	
};
roleCopypriv.getroles = function(){
		var s=roleCopypriv.columnTree.getChecked('id');
		return Ext.util.JSON.encode(s);;
};
roleCopypriv.saveroles = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		roleCopypriv.roleAddprivdialog.hide();	
		 roleMain.baseargs = null;
		myGrid.loadvalue(roleMain.rolegrid.store,roleMain.args,roleMain.baseargs);	
			
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam804')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
};
