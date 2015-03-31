//
///**
// * 分配权限给角色
// */
//
//var roleAddpriv = {addDialog:null,roleform:null,roles:null};
//
///**
// * 分配操作
// */
//roleAddpriv.init = function(){   
//	if(myGrid.row == null){									//如未选中任何一行，则不执行操作
//		Ext.MessageBox.show({
//           title: '操作提示',
//           msg:'请选择一个角色进行操作!',
//           buttons: Ext.MessageBox.OK,
//           icon: Ext.MessageBox.WARNING
//       	});
//	  	return false;
//	  }
//	roleAddpriv.rolesDate();
//};
//
///**
// * 生成分配权限给角色表单面板
// */
//roleAddpriv.getroleform =  function(){
//	return new Ext.FormPanel({
//		labelWidth: 75, // label settings here cascade unless overridden
//        frame:false,
//        plain: false,
//        height: 80,
//        region:'north',
//        bodyStyle:'padding:5px 5px 0;background:transparent',
//		defaultType: 'textfield',
//		items:[								//定义面板中的表单元素
//			{	inputType:'hidden',
//				name: 'roleid',
//				width:175,
//				value:myGrid.row.get('roleid')
//			},
//			{	fieldLabel: '角色编号',		//文本框
//				name: 'roleid',
//				width:175,
//				blankText:'请输入角色编号',
//				value:myGrid.row.get('roleid'),
//				disabled:true,
//				allowBlank:false
//			},
//			{	fieldLabel: '角色名称',		//文本框
//				name: 'rolename',
//				width:175,
//				blankText:'请输入角色名',
//				value:myGrid.row.get('rolename'),
//				disabled:true,
//				allowBlank:false
//			}
//			]
//		});	
//	}
//
///**
// * 返回查询到的机构列表，创建分配权限给角色对话框
// */
//roleAddpriv.rolesDate = function(response, opt){
//	
//	if (!roleAddpriv.addDialog){				
//		tlework.addHtml(tlework.divHtml,'roleupdate');			//动态生成需要绑定的div
//		roleAddpriv.addDialog = new Ext.Window({ 				//创建对话框
//		el:'roleupdate',
//		title: '分配权限给角色',
//		layout:'border',
//		modal:true,
//		width:300,
//		height:440,
//		closeAction:'hide',
//		plain: false,
//		items: [roleAddpriv.addroleform()],						//将面板绑定到对话框
//		buttons: [
//					{	text: '确认',
//						handler: function()
//							{		
//								//验证通过
//								if(roleAddpriv.roleform.form.isValid()){
//									var privIds = roleAddpriv.functioncodes();
//									var roleVo = Seam.Remoting.createType("com.luck.itumserv.base.role.RoleVo");
//									Ext.apply(roleVo,roleAddpriv.roleform.getForm().getValues());
//									Seam.Component.getInstance
//										("base_role_rolePrivSerivce").roleAddpriv(roleVo.getRoleid(),
//											privIds,roleAddpriv.save);										
//								}
//							}
//					},
//					{   text: '取消',
//						handler: function(){
//							roleAddpriv.addDialog.hide();
//						}
//					}]
//		});
//	}
//	roleAddpriv.addDialog.show();								//显示对话框
//	roleAddpriv.addDialog.on("hide",function(){
//		roleAddpriv.addDialog.close();
//		roleAddpriv.addDialog.destroy();		
//		roleAddpriv.addDialog = null;
//		
//	});
//}
//
///**
// * 生成分配权限给角色的Form面板
// */
//roleAddpriv.addroleform = function(){
//	    Ext.form.Field.prototype.msgTarget = 'qtip';
//		roleAddpriv.panel = new Ext.Panel({		//定义panel面板中显示的信息
//	         region:'center',
//			 layout:'border'
//
//	    })
//		roleAddpriv.roleform = roleAddpriv.getroleform();
//		roleAddpriv.panel.add(roleAddpriv.roleform);
//		
//		var grid = addprivgrid.init();
//		grid.region='center',
//		roleAddpriv.panel.add(grid);
//		roleAddpriv.panel.doLayout();
//		roleMain.baseargs = {
//				roleid:myGrid.row.get('roleid')
//		}
//		myGrid.loadvalue(grid.store,null,roleMain.baseargs);
//		return roleAddpriv.panel;
//};
///**
// * 根据返回结果进行操作
// */
//roleAddpriv.save = function(result){
//	var sign = result;	
//	if (sign=="true"){							
//       	
//		Ext.MessageBox.show({
//			title: '保存成功',
//			msg: '您的信息已保存成功!',
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.INFO
//		});					
//	}else{
//		roleAddpriv.roleform.form.reset();
//		Ext.MessageBox.show({
//			title: '保存失败',
//			msg: result,
//			buttons: Ext.MessageBox.OK,
//		    icon: Ext.MessageBox.ERROR
//		});
//	}
//	roleAddpriv.addDialog.hide();
//    roleMain.baseargs = null;
//	myGrid.loadvalue(roleMain.rolegrid.store,roleMain.args,roleMain.baseargs);
//};
//
//roleAddpriv.functioncodes = function(){		//放回选中行id
//	var result = new Array();
//	if(myGrid.rows != null){
//		var size =myGrid.rows.length;
//		for(var i = 0; i < size; i++){
//			var record = myGrid.rows[i].id;
//			result[i] = record;
//		}
//		myGrid.rows = null;
//		return result;
//	}
//}





















Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var roleAddpriv = {rolegrid:null,panel:null,roleform:null,gridpanel:null,formpanel:null,baseargs:null,roleid:null};
roleAddpriv.getrolegrid = function(){
  var strurl = '../JSON/base_role_rolePrivSerivce.updatapriv';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
           // totalProperty: 'totalProperty',
            id: 'privilegeid'
        }, [
            'privilegeid','privilegename',{name:'sign',type:'bool'}
        ]);
  var ascid = 'privilegeid';
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
	columns : [
  	checkColumn,	
  	{
	  	id:'id',
	  	header: ""+getResource('resourceParam756')+"", 
	  	width: 80, 
	  	dataIndex: 'privilegeid'
  	},
  	{
		header: ""+getResource('resourceParam675')+"",
		dataIndex: 'privilegename',
		width: 200
	}]
  });
	
 
  var tb=null;
  roleAddpriv.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn);

  roleAddpriv.rolegrid.region= 'center';
};
roleAddpriv.getroleform = function(){
	roleAddpriv.roleform = new Ext.FormPanel({
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
		{	fieldLabel: ''+getResource('resourceParam809')+'',		//文本框
				name: 'roleid',
				width:175,
				blankText:''+getResource('resourceParam805')+'',
				value:myGrid.row.get('roleid'),
				disabled:true,
				allowBlank:false
			},
			{	fieldLabel: ''+getResource('resourceParam797')+'',		//文本框
				name: 'rolename',
				width:175,
				blankText:''+getResource('resourceParam801')+'',
				value:myGrid.row.get('rolename'),
				disabled:true,
				allowBlank:false
			}],
		buttons: [
		{
			text: ''+getResource('resourceParam807')+'',
			handler: function(){
					var rolepri={
						roleid:roleAddpriv.roleid,
						quanxuan:'yes'
					}
					myGrid.loadvalue(roleAddpriv.rolegrid.store,null,rolepri);
			}
		},{
			text: ''+getResource('resourceParam808')+'',
			handler: function(){
					var rolepri={
						roleid:roleAddpriv.roleid,
						quanxuan:'no'
					}
					myGrid.loadvalue(roleAddpriv.rolegrid.store,null,rolepri);
			}
		}]
	});				
};
roleAddpriv.getformpanel= function(){
	roleAddpriv.getroleform();
	tlework.addHtml(tlework.divHtml,'roleAddprivform');	
	roleAddpriv.formpanel = new Ext.Panel({		//定义panel面板中显示的信息
         id:'roleAddprivform',
         region:'north',
		 layout:'fit',
         height:160,
         split:true,
		 collapsible: true,
         margins:'0 5 5 0'
    }); 
}

roleAddpriv.getdialog = function(id){

	roleAddpriv.roleid = id;
	tlework.addHtml(tlework.divHtml,'roleAddprivdialog');	
	roleAddpriv.getrolegrid();
	roleAddpriv.getformpanel();
	if (!roleAddpriv.roleAddprivdialog){		
		roleAddpriv.roleAddprivdialog = new Ext.Window({ 
			el:'roleAddprivdialog',
			title: ''+getResource('resourceParam806')+'',
           	layout:'border',
			modal:true,
           	width:300,
           	height:400,
           	closeAction:'hide',
           	plain: false,
			buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					Seam.Component.getInstance("base_role_rolePrivSerivce").
					saveRole(roleAddpriv.roleid ,roleAddpriv.getroles(),roleAddpriv.saveroles); 	
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',
				handler: function(){
					roleAddpriv.roleAddprivdialog.hide();
				}
			}]
		});
		roleAddpriv.roleAddprivdialog.on('hide',roleAddpriv.close);
	}
	
	roleAddpriv.roleAddprivdialog.add(roleAddpriv.roleform);
	roleAddpriv.roleAddprivdialog.add(roleAddpriv.rolegrid);
	var rolepri={
		roleid:roleAddpriv.roleid,
		quanxuan:null
	}
	myGrid.loadvalue(roleAddpriv.rolegrid.store,null,rolepri);
	roleAddpriv.roleAddprivdialog.show();
};
roleAddpriv.close = function(){
	roleAddpriv.roleAddprivdialog.destroy();					
	roleAddpriv.roleAddprivdialog = null;	
};
roleAddpriv.getroles = function(){
		var colId = "sign";
		var returnId = "privilegeid";
		var data = roleAddpriv.rolegrid.store;	
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
roleAddpriv.saveroles = function(value){
	var sign = value;	
	if (sign==true){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1072')+'',
			msg: ''+getResource('resourceParam631')+'',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});	
		roleAddpriv.roleAddprivdialog.hide();	
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


