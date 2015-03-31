var privManage={
privWin:null,
privGrid:null,
privForm:null,
ds:null,
row:null
};


privManage.initPrivWin = function () {
	privManage.privWin = new Ext.Window({
		title:''+getResource('resourceParam669')+'',
	   	width:300,
	   	height:400,
	   	closeAction:'hide',
	   	layout:'border',
	   	modal:true,
	   	resizable:false,
	   	plain:false,
	   	autoScroll:true,
	   	buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:privManage.submit
		}, {
			text:'取消',
			handler:privManage.closeWin
		}]
	});
	privManage.privWin.on('hide',privManage.closeWin);
	return privManage.privWin;
}

privManage.addPanel = function(panel) {
	privManage.privWin.add(panel);
}

privManage.closeWin = function(){
	if(privManage.privWin != null) {
		privManage.privWin.close();
		//privManage.privWin.destroy();
		//privManage.privForm.destroy();
		//privManage.privGrid.destroy();
		privManage.privWin  = null;
		privManage.privForm = null;
		privManage.privGrid = null;
	}
}

privManage.submit = function() {
	var privList = new Array();
	var j = 0;
	for(var i = 0; i < privManage.ds.getCount(); i++) {
		var record = privManage.ds.getAt(i)
		if(record.data['sign']) {
			privList[j] = record.data['privilegeid'];
			j++;
		}
	}
	Seam.Component.getInstance("base_operation_OperationService").updateOptPriv(privManage.row.get('id'),privList,function(result) {
		if(result == true) {
			Ext.MessageBox.show({
	           title: ''+getResource('resourceParam670')+'',
	           msg: ''+getResource('resourceParam666')+'',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.INFO
	       	});
		} else {
			Ext.MessageBox.show({
	           title: ''+getResource('resourceParam671')+'',
	           msg:''+getResource('resourceParam667')+'',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.ERROR
	       	});
		}
	});
	privManage.closeWin();
}


privManage.initPrivFormInf = function() {
	privManage.privForm = new Ext.form.FormPanel({
		region:'north',
		frame:true,
		width: 450,
		defaults: {width: 230},
		height: 80,
		labelWidth:70,
		defaultType:'textfield',
		items:[{
			id:'orgId',
	   		fieldLabel:''+getResource('resourceParam672')+'',
	   		width:175,
	   		value:privManage.row.get('id'),
	   		disabled:true	   		
	   	}, {
	   		id:'orgName',
	   		fieldLabel:''+getResource('resourceParam673')+'',
	   		width:175,	
	   		value:privManage.row.get('name'),
	   		disabled:true
	   	}]
	});
	return privManage.privForm;
}

privManage.initPrivGrid = function() {

	var strurl = '../JSON/base_operation_OperationService.listOptPriv';
  	var proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
    });
  	var reader = new Ext.data.JsonReader({
        totalProperty: 'totalProperty',
		root: 'results'
	}, [
		{name:'privilegeid'},
		{name:'privilegename'},
		{name:'description'},
		{name:'sign',type:'bool'}
    ]);
  	var ascid = 'privilegeid';
  	var ascstr = 'asc';
  	privManage.ds = new data.Store(proxy,reader,ascid,ascstr);
  	baseargs={
  		optId:privManage.row.get('id')
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
  		checkColumn,
		{
			header: ""+getResource('resourceParam674')+"", 
			width: 80, 
			name:'privilegename',
			dataIndex: 'privilegename'
			
		},
		{
			header: ""+getResource('resourceParam675')+"",
			dataIndex: 'description',
			name:'description',
			width: 200
		}]
  	});
	
  	var tb = [
  		''+getResource('resourceParam668')+': ', ' ',
            new Ext.app.SearchField({
                store: privManage.ds,
                width:160
    })];;
  
  	privManage.privGrid = myGrid.initNobr(privManage.ds,cm,tb,null,checkColumn);  	
	myGrid.loadvalue(privManage.ds,null,baseargs);

	return new Ext.Panel({
		region:'center',
		layout:'fit',
		items:privManage.privGrid
	})
};

privManage.init=function(row) {
	if(row == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		privManage.row = row
		privManage.initPrivWin();
		privForm = privManage.addPanel(privManage.initPrivFormInf(row));
		privManage.addPanel(privManage.initPrivGrid(row));
		privManage.privWin.show(this);
	}
	
}
