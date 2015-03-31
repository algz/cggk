Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatarole = {rolegrid:null,panel:null,roleform:null,gridpanel:null,formpanel:null,baseargs:null,userid:null};
//更新用户角色
updatarole.getrolegrid = function(){
  var strurl = '../JSON/base_user_UserSerivce.updataRole';
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
  	},
  	{
		header: ""+getResource('resourceParam797')+"",//角色名称 2011-4-28 gzj
		dataIndex: 'rolename',
		width: 200
	}]
  });
	
 
  var tb=null;
  updatarole.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);

  updatarole.rolegrid.region= 'center';
};
updatarole.getroleform = function(){
	updatarole.roleform = new Ext.FormPanel({
		labelWidth: 75, // label settings here cascade unless overridden
        region:'north',
        plain: false,
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 300,
        height:80,
		defaults: {width: 230},
		defaultType: 'textfield',
		labelWidth:80,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam887')+'',
			width:175,
			disabled:true,
			value:myGrid.rows[0].get('loginname'),
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam872')+'',
			width:175,
			disabled:true,
			value:[myGrid.rows[0].get('truename')],
			anchor:'95%'
		}]
	});				
};
//得到跟新角色面板
updatarole.getformpanel= function(){
	updatarole.getroleform();
	tlework.addHtml(tlework.divHtml,'updataroleform');	
	updatarole.formpanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'updataroleform',
         region:'north',
		 layout:'fit',
         height:160,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}
//得到更新角色对话框
updatarole.getdialog = function(){
	tlework.addHtml(tlework.divHtml,'updataroledialog');	
	updatarole.getrolegrid();
	updatarole.getformpanel();
	if (!updatarole.updataroledialog){		
		updatarole.updataroledialog = new Ext.Window({ 
			el:'updataroledialog',
			title: ''+getResource('resourceParam909')+'',//用户角色分配
           	layout:'border',
			modal:true,
           	width:300,
           	height:400,
           	closeAction:'hide',
           	plain: false,
			buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					Seam.Component.getInstance("base_user_UserSerivce").saveRole(myGrid.rows[0].get('userid'),updatarole.getroles(),updatarole.saveroles); 	
				}
			},
			{   text: ''+getResource('resourceParam3001')+'',
				handler: function(){
					updatarole.updataroledialog.hide();
				}
			}]
		});
		updatarole.updataroledialog.on('hide',updatarole.close);
	}
	
	updatarole.updataroledialog.add(updatarole.roleform);
	updatarole.updataroledialog.add(updatarole.rolegrid);
	var basepaem={userid:myGrid.rows[0].get('userid')};
	myGrid.loadvalue(updatarole.rolegrid.store,basepaem,null);
	updatarole.updataroledialog.show();
};
//关闭对话框
updatarole.close = function(){
	updatarole.updataroledialog.destroy();					
	updatarole.updataroledialog = null;	
};
updatarole.getroles = function(){
		var colId = "sign";
		var returnId = "roleid";
		var data = updatarole.rolegrid.store;	
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
//更新角色后执行的方法
updatarole.saveroles = function(value){
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
		myGrid.loadvalue(user.grid.store,user.baseargs,null);
		updatarole.updataroledialog.hide();		
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam634')+'',
			msg: ''+getResource('resourceParam893')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
};
