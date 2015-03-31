var newUsersRole={}
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var newUsersRole = {rolegrid:null,panel:null,roleform:null,gridpanel:null,formpanel:null,baseargs:null,userid:null};
newUsersRole.getrolegrid = function(){
  var strurl = '../JSON/base_user_UserSerivce.newUsersRole';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'roleid'
        }, [
            'roleid','rolename',{name:'sign',type:'bool'}
        ]);
  var ascid = 'roleid';
  var ascstr = 'asc';
  var ds = new data.Store(proxy,reader,ascid,ascstr);
  //ds.baseParams={start:0,limit:25};

 
  var checkColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam503')+"",
       dataIndex: 'sign',
       width: 40
    });
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [ checkColumn, {
	  	id:'id',
	  	header: ""+getResource('resourceParam809')+"", 
	  	width: 80, 
	  	dataIndex: 'roleid'
  	}, {
		header: ""+getResource('resourceParam797')+"",//@chenw 把角色描述改成角色名称 
		dataIndex: 'rolename',
		width: 200
	}]
  });
	
 
  var tb=null;
  newUsersRole.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);

  newUsersRole.rolegrid.region= 'center';
};


newUsersRole.getdialog = function(reslut){
	tlework.addHtml(tlework.divHtml,'newUsersRoledialog');	
	newUsersRole.getrolegrid();
	if (!newUsersRole.newUsersRoledialog){		
		newUsersRole.newUsersRoledialog = new Ext.Window({ 
			el:'newUsersRoledialog',
			title: ''+getResource('resourceParam892')+'',
           	layout:'border',
			modal:true,
           	width:300,
           	height:400,
           	closeAction:'hide',
           	plain: false,
           	items:[{
           	  bodyStyle : 'padding:0px 0px 0;background:transparent;border:0',
           	  region:'north',
           	  html:'<font color="red">'+getResource('resourceParam891')+'!</font>'
           	}],
			buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					Seam.Component.getInstance("base_user_UserSerivce").saveNewUsersRole(reslut,newUsersRole.getroles(),newUsersRole.saveroles); 	
				}
			},
			{   text: ''+getResource('resourceParam3001')+'',
				handler: function(){
					newUsersRole.newUsersRoledialog.hide();
				}
			}]
		});
		newUsersRole.newUsersRoledialog.on('hide',newUsersRole.close);
	}
	newUsersRole.newUsersRoledialog.add(newUsersRole.rolegrid);
	//var basepaem={userid:myGrid.rows[0].get('userid')};
	myGrid.loadvalue(newUsersRole.rolegrid.store,null,null);
	newUsersRole.newUsersRoledialog.show();
};
newUsersRole.close = function(){
	newUsersRole.newUsersRoledialog.destroy();					
	newUsersRole.newUsersRoledialog = null;	
};
newUsersRole.getroles = function(){
		var colId = "sign";
		var returnId = "roleid";
		var data = newUsersRole.rolegrid.store;	
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
newUsersRole.saveroles = function(value){
	var sign = value;
	if (sign==true){
		Ext.MessageBox.show({
			title: getResource('resourceParam1072'),//'保存成功',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});		
		user.sm.clearSelections();
		user.baseargs={start:user.ds.baseParams.start,limit:user.ds.baseParams.limit}
	    //user.grid.store.baseParams=user.baseargs;
		myGrid.loadvalue(user.grid.store,user.baseargs,null);
		newUsersRole.newUsersRoledialog.hide();		
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam893')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
};
