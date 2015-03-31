var beixdaan = {grid:null,colModel:null,ds:null,tb:null,panel:null,row:null,daans:null,adddialog:null,updatadialog:null,addform:null,updataform:null};
//生成列表
beixdaan.getColModel = function(){
	beixdaan.colModel = new Ext.grid.ColumnModel([
		{
			header: "'+getResource('resourceParam7032')+'id",//答案
			width: 100,
			dataIndex: 'id'},
		{
			header: "'+getResource('resourceParam7032')+'",//答案
			width: 100,
			dataIndex: 'value'}
					
	]);
};
beixdaan.getDataStore = function(){
	//var daan =  Ext.data.Record.create(beixdaan.daans);
	var reader = new Ext.data.JsonReader({
            id: 'id'},
            ['id','value']);  	   	
	var ascid = 'id';
	var ascstr = 'desc';
	beixdaan.ds = new Ext.data.Store({
		reader:reader
	});
};
beixdaan.gettb = function(){
beixdaan.tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam477')+'备选答案',
    	iconCls: 'beixdaan-add',
    	tooltip: {title:''+getResource('resourceParam477')+'备选答案',text:''+getResource('resourceParam477')+'备选答案'},
    	handler: beixdaan.getadddialog
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam478')+'备选答案',
    	iconCls: 'beixdaan-updata',
    	tooltip: {title:''+getResource('resourceParam478')+'备选答案',text:''+getResource('resourceParam478')+'备选答案'},
    	handler: beixdaan.getupdatadialog
  	},
  	'-',
  	{
  		text:''+getResource('resourceParam475')+'备选答案',
    	iconCls: 'beixdaan-del',
    	tooltip: {title:''+getResource('resourceParam475')+'备选答案',text:''+getResource('resourceParam475')+'备选答案'},
    	handler: beixdaan.deletebeixdaan
  	}];
};
beixdaan.getgrid = function(strdaan){
	beixdaan.daans = daans;
	beixdaan.getColModel();
	beixdaan.getDataStore();
	beixdaan.gettb();
	var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
	beixdaan.grid = myGrid.initNobr(beixdaan.ds,beixdaan.colModel,beixdaan.tb,sm);
	beixdaan.grid.region= 'center';
	beixdaan.grid.on('rowclick', function(grid,rowIndex,e) {
		beixdaan.row = grid.store.data.items[rowIndex];
	});
	if (strdaan!=null){
		var daans = new Array();
		daans = strdaan.split("\|");
		for(var i=0;i<daans.length;i++){
			if (daans[i]!=null&&!daans[i]==''){
				var daan = daans[i].split(":");
				var record = new Ext.data.Record({
						"id":daan[0],
						"value":daan[1]
					}); 
				beixdaan.ds.insert(0,record);
				}	
		}
	}
};
beixdaan.getadddialog = function(){
	beixdaan.getaddform();
	tlework.addHtml(tlework.divHtml,'addbeixdaan');	
	if (!beixdaan.adddialog){	
		beixdaan.adddialog = new Ext.Window({ 
			el:'addbeixdaan',
			modal:true,
			title: ''+getResource('resourceParam477')+'备选'+getResource('resourceParam508')+'',
           	layout:'fit',
           	width:250,
           	height:130,
           	closeAction:'hide',
           	plain: false           	
		});
		beixdaan.adddialog.on('hide',beixdaan.addclose);
	}	
	beixdaan.adddialog.add(beixdaan.addform);
	beixdaan.adddialog.show();
};
beixdaan.getaddform = function(){
	beixdaan.addform = new Ext.FormPanel({
		labelWidth: 20,
        plain: false, 
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 20},
		defaultType: 'textfield',
		labelWidth:40,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam7032')+'id',//答案
			width:175,
			name: 'id',
			id:'id',
			minLength:1,
			maxLength:64,
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam7032')+'',//答案
			width:175,
			name: 'value',
			id:'value',
			minLength:1,
			maxLength:32,
			anchor:'95%'
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(beixdaan.addform.form.isValid()){	
						var record = new Ext.data.Record({
								"id":Ext.get('id').dom.value,
								"value":Ext.get('value').dom.value
							}); 
						beixdaan.ds.insert(0,record);	
						beixdaan.adddialog.hide();	
					}
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',//取消
				handler: function(){				
					beixdaan.adddialog.hide();	
				}
			}
		]		
	});	
};
beixdaan.addclose = function(){
	beixdaan.addform.form.reset();									
	beixdaan.adddialog.destroy();
	beixdaan.addform = null;					
	beixdaan.adddialog = null;
};
beixdaan.getupdatadialog = function(){
	if(beixdaan.row==null) return false;	
	beixdaan.getpdataform();
	tlework.addHtml(tlework.divHtml,'updatabeixdaan');
	if (!beixdaan.updatadialog){	
		beixdaan.updatadialog = new Ext.Window({ 
			el:'updatabeixdaan',
			modal:true,
			title: ''+getResource('resourceParam478')+'备选'+getResource('resourceParam508')+'',
           	layout:'fit',
           	width:200,
           	height:130,
           	closeAction:'hide',
           	plain: false           	
		});
		beixdaan.updatadialog.on('hide',beixdaan.updataclose);
	}	
	beixdaan.updatadialog.add(beixdaan.updataform);
	beixdaan.updatadialog.show();
};
beixdaan.updataclose = function(){
	beixdaan.updataform.form.reset();									
	beixdaan.updatadialog.destroy();
	beixdaan.updataform = null;					
	beixdaan.updatadialog = null;
};
beixdaan.getpdataform = function(){
	beixdaan.updataform = new Ext.FormPanel({
		labelWidth: 20,
        plain: false, 
		frame:false,
		bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 20},
		defaultType: 'textfield',
		labelWidth:40,
		items:[
		{   
			fieldLabel: ''+getResource('resourceParam7032')+'id',//答案
			width:175,
			name: 'id',
			id:'id',
			minLength:1,
			maxLength:64,
			value:beixdaan.row.get('id'),
			anchor:'95%'
		},{   
			fieldLabel: ''+getResource('resourceParam7032')+'',//答案
			width:175,
			name: 'value',
			id:'value',
			minLength:1,
			maxLength:32,
			value:beixdaan.row.get('value'),
			anchor:'95%'
		}],						
		buttons: [
			{	text: ''+getResource('resourceParam505')+'',
				handler: function(){
					if(beixdaan.updataform.form.isValid()){
						beixdaan.ds.remove(beixdaan.row);	
						var record = new Ext.data.Record({
								"id":Ext.get('id').dom.value,
								"value":Ext.get('value').dom.value
							}); 
						beixdaan.ds.insert(0,record);
						beixdaan.updatadialog.hide();
					}
				}
			},
			{   text: ''+getResource('resourceParam7007')+'',//取消
				handler: function(){				
					beixdaan.updatadialog.hide();	
				}
			}
		]		
	});
};
beixdaan.deletebeixdaan = function(){	
	if(beixdaan.row == null){
	  	return false;
	  }
	Ext.MessageBox.confirm(''+getResource('resourceParam1724')+'', ''+getResource('resourceParam636')+'',function(btn, text){//警告!
	    if(btn == 'yes'){
		    beixdaan.ds.remove(beixdaan.row);
	    } 
	})		
};
