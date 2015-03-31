
/**
 * 任务类型权重列表
 */
var taskProMain = {taskPropanel:null,taskProgrid:null,
				args:{start:0,limit:25},baseargs:null};

taskProMain.grid = function(){
  var strurl = '../JSON/proportion_taskPro_TaskProService.getTaskproList';
  var proxy = new Ext.data.HttpProxy({
            url: strurl
        });
  var reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty',
            id: 'weightid'
        }, [
            'weightid','projectid','projectname',
            'taskcategoryid','taskcategoryname',
            'weight'
        ]);
  var ascid = null;
  var ascstr = null;
  var ds = new data.Store(proxy,reader,ascid,ascstr);
	ds.on('datachanged',function(ds){
   	if(taskProSelect.sel && ds.getCount()==0){
   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam765')+"");
   	}	 
  });

  var sm = new Ext.grid.RowSelectionModel({singleSelect:true});
  
  var cm = new Ext.grid.ColumnModel({
	defaults: {
        sortable: false,
        menuDisabled: true
    },
	columns : [{
		id: 'weightid',
		header: ""+getResource('resourceParam1043')+"权重"+getResource('resourceParam461')+"",
		dataIndex: 'weightid',
		width: 80
	},{
		header: ""+getResource('resourceParam1851')+"",
		dataIndex: 'projectname',
		width: 200
	},{
		header: ""+getResource('resourceParam1853')+"",
		dataIndex: 'taskcategoryname',
		width: 200
	},{
		header: ""+getResource('resourceParam1043')+"权重",
		dataIndex: 'weight',
		width: 100
	}]
  });

  var tb=[
  	'-',
  	{
  		text:''+getResource('resourceParam1815')+'权重',
    	iconCls: 'priv-edit',
    	tooltip: {title:''+getResource('resourceParam1815')+'权重',text:''+getResource('resourceParam1810')+'权重'},
    	handler:taskProUpdate.init
    	
  	},
  	'-',
  	{
  		//enableToggle:true,
        text:''+getResource('resourceParam652')+''+getResource('resourceParam1043')+'权重',
        
        iconCls: 'priv-select',
        tooltip: {title:''+getResource('resourceParam652')+''+getResource('resourceParam1043')+'权重',text:''+getResource('resourceParam1780')+''},
        handler: taskProSelect.init
        
  	},
  	'-',{
  		//enableToggle:true,
        text:''+getResource('resourceParam1043')+'权重列表', 
        iconCls: 'priv-select',
        tooltip: {title:'显示'+getResource('resourceParam1043')+'权重列表',text:'显示所有'+getResource('resourceParam1043')+'权重'},
        handler: function(){
        	taskProMain.baseargs={
				taskcategoryid:null,
				projectname:null
			}
        	myGrid.loadvalue(taskProMain.taskProgrid.store,taskProMain.args,taskProMain.baseargs);
        }    
  	},
  	'-'];
  var grid = myGrid.init(ds,cm,tb,sm);
  return grid;
}
taskProMain.init = function(){
	Ext.QuickTips.init();
	
	taskProMain.taskPropanel = new Ext.Panel({
		 id:'taskPropanel',
		 layout:'fit',
		 border:false,
		 region:'center',
		 titlebar: false,
		 autoScroll:true,
         margins:'0 5 5 0'
	
	});
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
	       	taskProMain.taskPropanel
        ]
        
    });
	taskProMain.taskProgrid = taskProMain.taskPropanel.add(taskProMain.grid());
	taskProMain.taskPropanel.doLayout();
	myGrid.loadvalue(taskProMain.taskProgrid.store,taskProMain.args,taskProMain.baseargs);
}
Ext.onReady(taskProMain.init,taskProMain,true);
