var optManage = {
	optWin:null,
	optGrid:null,
	optForm:null,
	ds:null,
	instcode:null
};


optManage.initOptWin = function (title) {
	optManage.optWin = new Ext.Window({
		title:title,
	   	width:300,
	   	height:400,
	   	closeAction:'hide',
	   	layout:'border',
	   	modal:true,
	   	resizable:false,
	   	plain:false,
	   	buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:optManage.submit
		}, {
			text:'取消',
			handler:optManage.closeWin
		}]
	});
	optManage.optWin.on('hide',optManage.closeWin);
	return optManage.optWin;
}

optManage.addPanel = function(panel) {
	optManage.optWin.add(panel);
}


optManage.submit = function() {
	
	var optList = new Array();
	var j = 0;
	for(var i = 0; i < optManage.ds.getCount(); i++) {
		var record = optManage.ds.getAt(i)
		if(record.data['sign']) {
			optList[j] = record.data['id'];
			j++;
		}
	}
	Seam.Component.getInstance("base_organization_OrganizationService").updateOrgOpt(optManage.instcode,optList,function(result) {
		if(result == true) {
			Ext.MessageBox.show({
	           title: ''+getResource('resourceParam670')+'',
	           msg: '分配业务成功!',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.INFO
	       	});
		} else {
			Ext.MessageBox.show({
	           title: ''+getResource('resourceParam671')+'',
	           msg:'分配业务失败!',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       	});
		}
	});
	optManage.closeWin();
}

optManage.closeWin = function(){
	if(optManage.optWin != null) {
		optManage.optWin.close();
		//optManage.optWin.destroy();
		//optManage.optForm.destroy();
		//optManage.optGrid.destroy();
		optManage.optWin  = null;
		optManage.optForm = null;
		optManage.optGrid = null;
	}
}


optManage.initOptFormInf = function(name) {
	optManage.optForm = new Ext.form.FormPanel({
		region:'north',
		frame:true,
		width:350,
		defaults:{width: 230},
		height:80,
		labelWidth:70,
		defaultType:'textfield',
		items:[{
			id:'orgId',
	   		fieldLabel:''+getResource('resourceParam672')+'',
	   		width:175,
	   		value:optManage.instcode,
	   		disabled:true	   		
	   	}, {
	   		id:'orgName',
	   		fieldLabel:''+getResource('resourceParam673')+'',
	   		width:175,	
	   		value:name,
	   		disabled:true
	   	}]
	});
	return optManage.optForm;
}

optManage.initOptGrid = function() {

	var strurl = '../JSON/base_organization_OrganizationService.listOrgOpt';
  	var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
    });
  	var reader = new Ext.data.JsonReader({
        totalProperty: 'totalProperty',
		root: 'results'
	}, [
		{name:'name'},
		{name:'id'},
		{name:'subSysId'},
		{name:'optType'},
		{name:'descr'},
		{name:'deleteFlag'},
		{name:'sign',type:'bool'}
    ]);
  	var ascid = 'id';
  	var ascstr = 'asc';
  	optManage.ds = new data.Store(proxy,reader,ascid,ascstr);
	baseargs={
  		orgId:optManage.instcode
  	};
 
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
	  		checkColumn,{
				id:'name',
				header: "业务"+getResource('resourceParam480')+"", 
				width: 100, 
				dataIndex:'name'
			},{
				header: "业务"+getResource('resourceParam648')+"",
				dataIndex: 'descr',
				width: 150
		}]
  	});
	
  	var tb = [
  		''+getResource('resourceParam668')+': ', ' ',
            new Ext.app.SearchField({
                store: optManage.ds,
                width:160
    })];;
  
  	optManage.optGrid = myGrid.initNobr(optManage.ds,cm,tb,null,checkColumn);  	
	myGrid.loadvalue(optManage.ds,null,baseargs);
	
	return new Ext.Panel({
		region:'center',
		layout:'fit',
		items:optManage.optGrid
	})
};

optManage.init = function(title, nodeInf) {
	if(nodeInf == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		optManage.initOptWin(title);
		
		optManage.instcode = nodeInf.instcode;
		
		optManage.addPanel(optManage.initOptFormInf(nodeInf.text));
		optManage.addPanel(optManage.initOptGrid());
		optManage.optWin.show(this);
	}	
}
