Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatamenu = {menugrid:null,panel:null,menuform:null,userid:null,loginname:null,truename:null,
		combo:null,gridpanel:null,formpanel:null,baseargs:null,menupacketlist:null,packetname:null,isgrid:false};
updatamenu.getmenugrid = function(){
  var strurl = '../JSON/base_user_UserSerivce.getMenuList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'menuid'
        }, [
            'menuid','menuname','rootmenuname',{name:'sign',type:'bool'}
        ]);
  var ascid = 'menuid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  //ds.baseParams={start:0,limit:25};

 
  var checkColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam503')+"",
       dataIndex: 'sign',
       width: 50
    });
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [ checkColumn, {
	  	id:'id',
	  	header: ""+getResource('resourceParam899')+"", 
	  	width: 200, 
	  	dataIndex: 'menuid'
  	},
  	{
		header: ""+getResource('resourceParam635')+"",
		dataIndex: 'menuname',
		width: 200
	},
  	{
		header: ""+getResource('resourceParam897')+"",
		dataIndex: 'rootmenuname',
		sortable: false,
		width: 200
	}]
  });
	
 
  var tb=null;
  updatamenu.menugrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);
  updatamenu.menugrid.region= 'center';
};
updatamenu.getmenuform = function(){
	updatamenu.combo=new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields: ["packetId", "name"],
				data:updatamenu.menupacketlist
				}),	
			
			valueField :"packetId",
			displayField: "name",
			mode: 'local',
			forceSelection: true,
			blankText:''+getResource('resourceParam894')+'',
			emptyText:''+getResource('resourceParam895')+'',
			hiddenName:'packetId',
			value:1,
			editable: false,
			triggerAction: 'all',
			allowBlank:false,
			fieldLabel: ''+getResource('resourceParam900')+'',
			name: 'packetId',
			anchor:'95%'
		});
	updatamenu.combo.on('select',function(combo,record,num){
						Ext.get('packetname').dom.value = record.data.name;
						//updatamenu.updatamenudialog.add(updatamenu.menugrid);
						//updatamenu.updatamenudialog.doLayout();
						//alert(updatamenu.userid);
						//alert(record.data.packetId);
						myGrid.loadvalue(updatamenu.menugrid.store,null,[updatamenu.userid,record.data.packetId]);
						//myGrid.loadvalue(updatamenu.menugrid.store,null,['1','2']);
						
				});
	updatamenu.menuform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        region:'north',
        plain: false,
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 300,
        height:120,
		defaults: {width: 230},
		defaultType: 'textfield',
		labelWidth:80,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam887')+'',
			width:175,
			disabled:true,
			value:updatamenu.loginname,
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam872')+'',
			width:175,
			disabled:true,
			value:updatamenu.truename,
			anchor:'95%'
		},
			updatamenu.combo
		,{   
			fieldLabel: ''+getResource('resourceParam898')+'',
			id:'packetname',
			name:'packetname',
			width:175,
			value:[updatamenu.packetname],
			anchor:'95%'
		}]
	});				
};
updatamenu.getformpanel= function(){
	updatamenu.getmenuform();
	tlework.addHtml(tlework.divHtml,'updatamenuform');	
	updatamenu.formpanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updatamenuform',
         region:'north',
		 layout:'fit',
         height:160,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
updatamenu.getkuaijie= function(){
	if (!Index.user)
	{
		alert(""+getResource('resourceParam774')+"");
		return false;
	}
	if(Index.user.userid == null){									//如未选中任何一行，则不执行操作
	  	return false;
	}
	updatamenu.isgrid = true;
	updatamenu.userid = Index.user.userid;
	updatamenu.loginname = Index.user.loginname;
	updatamenu.truename = Index.user.truename;
	Seam.Component.getInstance("base_user_UserSerivce").getMenuPacketList(updatamenu.userid,1,updatamenu.getadddialog); 
	}
updatamenu.getdialog = function(){
	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
	  	return false;
	}
	updatamenu.isgrid = false;
	updatamenu.userid = myGrid.row.get('userid');
	updatamenu.loginname = myGrid.row.get('loginname');
	updatamenu.truename = myGrid.row.get('truename');
	Seam.Component.getInstance("base_user_UserSerivce").getMenuPacketList(updatamenu.userid,1,updatamenu.getadddialog); 

	}
updatamenu.getadddialog = function(cs){
	updatamenu.menupacketlist = cs.menuPackets;
	updatamenu.packetname = cs.packetName;
	tlework.addHtml(tlework.divHtml,'updatamenudialog');	
	updatamenu.getmenugrid();
	updatamenu.getformpanel();
	if (!updatamenu.updatamenudialog){		
		updatamenu.updatamenudialog = new Ext.Window({ 
			el:'updatamenudialog',
			title: ''+getResource('resourceParam896')+'',
           	layout:'border',
			modal:true,
           	width:660,
           	height:500,
           	closeAction:'hide',
           	plain: false,
			buttons: [
			{	text: ''+getResource('resourceParam901')+'',
				handler: function(){
					Seam.Component.getInstance("base_user_UserSerivce").saveUserMenu(updatamenu.userid,Ext.get('packetId').dom.value,Ext.get('packetname').dom.value,updatamenu.getmenus(),updatamenu.savemenus); 	
				}
			},
			{   text: ''+getResource('resourceParam506')+'',
				handler: function(){
					updatamenu.updatamenudialog.hide();
				}
			}]
		});
		updatamenu.updatamenudialog.on('hide',updatamenu.close);
	}
	
	updatamenu.updatamenudialog.add(updatamenu.menuform);
	updatamenu.updatamenudialog.add(updatamenu.menugrid);
	myGrid.loadvalue(updatamenu.menugrid.store,null,[updatamenu.userid,'1']);
	updatamenu.updatamenudialog.show();
};
updatamenu.close = function(){
	updatamenu.updatamenudialog.destroy();					
	updatamenu.updatamenudialog = null;	
};
updatamenu.getmenus = function(){
		var colId = "sign";
		var returnId = "menuid";
		var data = updatamenu.menugrid.store;	
		var result = "";
		var size = data.getCount();
		for(var i = 0; i < size; i++){
			var record = data.getAt(i);
			if(record.data[colId])
				if(result==""){					
			 		result=result+record.data[returnId];
				}else{
			   		result=result+"|"+record.data[returnId];
				}	
		}
		return result;
};
updatamenu.savemenus = function(returnvo){
	var sign = returnvo.sign;	
	if (sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});
		if(updatamenu.isgrid){
			Seam.Component.getInstance("auth").getMenus(function(menus){
		       
		       if(menus!=null&&menus!=""){
		          var len = menus.length;
		          for(var j = 0; j < Index.menuIds.length; j++){
		          	westpanel.del(Index.menuIds[j]);
		          }
		          for(var i = 0; i < len; i++){
		          	
		          	Index.menuIds[i] = menus[i].packetid;
					var tag = new Ext.Panel({		
		                id:menus[i].packetid,
		                title:menus[i].packetname,
		                split:true,
		                iconCls:'west-head',
		                collapsible: true,
		                margins:'0 0 5 5',
		                html:menus[i].menuhtml,
		                autoScroll:true
		           });
		           westpanel.add(tag);
				}
		       }
					
		    	
		    }); 
		}
		updatamenu.packetname = returnvo.packetname;
		updatamenu.packetId = returnvo.packetId;
		updatamenu.menupacketlist = returnvo.menuPackets;
		updatamenu.combo.store.loadData(returnvo.menuPackets);
		updatamenu.combo.setValue(returnvo.packetId);
		Ext.get('packetname').dom.value = returnvo.packetname;
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam804')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
};
