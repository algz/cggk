var dataPrivilege={}
dataPrivilege.init=function() {

  var strurl = "";

  strurl = '../JSON/privilege_DataPrivilegeRemote.getPrivilegeVoList?a='+new Date();
 
  dataPrivilege.proxy = new Ext.data.HttpProxy({
            url: strurl,
          	method:'GET'
        });
  dataPrivilege.reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
           id: 'privilegeID'
        }, [
            'privilegeID','dataPrivilegeID','privilege','privilegeName','isPermitted',
            'isRejected'
            
        ]);

  var ds = new Ext.data.Store({
        proxy: dataPrivilege.proxy,
        reader: dataPrivilege.reader
    });
    dataPrivilege.setcm1();
  	dataPrivilege.grid = new Ext.grid.EditorGridPanel({//myGrid.initBox(ds,dataPrivilege.cm,null,null);
        store: ds,
        cm: dataPrivilege.cm, 
        trackMouseOver:false,
        loadMask: {msg:''+getResource('resourceParam579')+''},
        frame:true,
        plugins:[dataPrivilege.permmissionCheckColumn],//,dataPrivilege.rejectCheckColumn
        clicksToEdit:1

    });
    
     	dataPrivilege.grid.on('checkboxclick',function(element,evt,record){
	//在这里可以处理 允许，拒绝的选中情况，处理存储或者标志表格被操作过了
	var privilegeVo = Seam.Remoting.createType("com.luck.itumserv.base.privilege.PrivilegeVo");
	privilegeVo.setDataPrivilegeID(record.get('dataPrivilegeID'));
	privilegeVo.setPrivilegeID(record.get('privilegeID'));
	privilegeVo.setIsPermitted(record.get('isPermitted'));
							
	callSeam("privilege_DataPrivilegeRemote", "updatePrivilege", [privilegeVo]);	
   });
  	
  	dataPrivilege.listpanel=new Ext.Panel({
		region:'south',
		title:''+getResource('resourceParam1155')+'',
		height:350,
		id:'dataPrivilegeListpanel',
		layout:'fit',
		resizable:true,
		autoScroll:true,
		split : true,
		items:[dataPrivilege.grid]
	});
	
	dataPrivilege.baseargs = {
	}
	
	myGrid.loadvalue(dataPrivilege.grid.store,{start:0,limit:25},dataPrivilege.baseargs);//采用myGrid的方法去掉分页
	return dataPrivilege.listpanel;

}
dataPrivilege.setcm1 = function (){	
	 dataPrivilege.permmissionCheckColumn = new Ext.grid.CheckColumn({
       header: ""+getResource('resourceParam482')+"",
       dataIndex: 'isPermitted',
       align : 'center',
       width: 55
    });  

//   dataPrivilege.permmissionCheckColumn.onMouseDown('click',function(element,e,record){alert(record.get('isPermitted'));})
    
//    dataPrivilege.rejectCheckColumn = new Ext.grid.CheckColumn({
//       header: "拒绝",
//       dataIndex: 'isRejected',
//       align : 'center',
//       width: 55
//    });
    
  	dataPrivilege.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
  		new Ext.grid.RowNumberer(),
  		{
			header: ""+getResource('resourceParam582')+"",
			dataIndex: 'privilegeName',
			align : 'center',
			width:100
		},
		dataPrivilege.permmissionCheckColumn//,
//		dataPrivilege.rejectCheckColumn
	]});
	
	Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};
}

Ext.grid.CheckColumn = function(config){
    Ext.apply(this, config);
    if(!this.id){
        this.id = Ext.id();
    }
    this.renderer = this.renderer.createDelegate(this);
};

Ext.grid.CheckColumn.prototype ={
    init : function(grid){
        this.grid = grid;
        this.grid.on('render', function(){
            var view = this.grid.getView();
            view.mainBody.on('mousedown', this.onMouseDown, this);
        }, this);
    },

    onMouseDown : function(e, t){
        if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
            e.stopEvent();
            var index = this.grid.getView().findRowIndex(t);
            var record = this.grid.store.getAt(index);
            record.set(this.dataIndex, !record.data[this.dataIndex]);
            this.grid.fireEvent('checkboxclick',this,e,record);//定义发送事件
        }
    },

    renderer : function(v, p, record){
        p.css += ' x-grid3-check-col-td'; 
        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
    }
};
