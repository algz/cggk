var renwukbnGrid2 = {proxy:null};
renwukbnGrid2.grid = function(num){
  var strurl = "";
  /******************MQ拉数据*************************************
  if(num==1){
  	strurl = '../JSON/tasklist_taskService.getIndividualTask';
  } else if(num==2){
  	
  } else {
  	strurl = '../JSON/tasklist_taskService.getRenwukbnPageList';
  }
  ********************************************************/
  //////////////////本地数据库直接取数据//////////////////////////////
  strurl = '../JSON/tasklist_taskService.getRenwukbnPageList';
  //////////////////////////////////////////////////////////
  renwukbnGrid2.proxy = new Ext.data.HttpProxy({
            url: strurl,
            method:'GET'
        });
  renwukbnGrid2.reader = new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalProperty'
//            ,
//            id: 'taskid'
        }, [
            'taskid','taskname','operation','taskcategoryid','isproblems',
            'taskcategoryname','taskstatusid','taskstatusname',
            'plannedstartstr','plannedendstr','plannedamount','completedamount',
            'actualstartstr','actualendstr','instname','variety','projectid','chargedmanid',
            'tasknotes','truename','color','projectname','issuedmanid','issuedmanname','chargeddepid','isaofo'
            
        ]);
  //var ascid = 'taskid';
 // var ascstr = 'asc';
 // var ds = new data.Store(proxy,reader,ascid,ascstr);
  var ds = new Ext.data.Store({
        proxy: renwukbnGrid2.proxy,
        reader: renwukbnGrid2.reader
    });

   ds.on('datachanged',function(ds){
   	if(renwukbnQuery.sel && ds.getCount()==0){
   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam765')+"");
   	}
  });
	if(num==1||num===2){
		renwukbnGrid2.setcm1();
	} else {
		renwukbnGrid2.setcm2();
	}

//  renwukbnGrid2.sm = new Ext.grid.RowSelectionModel();
 // var sm = new Ext.grid.RowSelectionModel(); 
  if(num==1){
  	var grid = myGrid.initBox(ds,renwukbnGrid2.cm,null,renwukbnGrid2.sm);
  	
//  	grid.on('afteredit',function(e){
//	var r=e.record;
//	if(r.get("taskid")!=null || r.get("taskid").length<=0)
//	{
//		var appVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
//		appVo.setTaskid(r.get("taskid"));
//		appVo.setCompletedamount(r.get("completedamount"));
//		callSeam("tasklist_taskService", "updateCompletedamount", [appVo],updateDetail);
//	}
//   });
//  	
//  	grid.on('render', function(grid) { 
//    var cm = grid.getColumnModel();   
//    var editor = cm.getCellEditor(6/*这里是你编辑列的索引号*/, 0);   
//    editor.on('beforestartedit', function(editor, boundEl, value) { 
//    	var r=grid.getSelectionModel().getSelected();
//   	   	if(r.get("taskstatusid")==5)
//         {
//         	 return true;
//         }
//         else
//         {
//            return false;
//         }
//    });   
//    }); 
  	grid.region='center';
  	 return grid;
  } else {
  	var grid = myGrid.init(ds,renwukbnGrid2.cm,null,renwukbnGrid2.sm);
  	grid.region='center';
  	 return grid;
  } 
//  grid.height = 175;
//  grid.width = 960;
//  grid.autoScroll ='true';
//  grid.autoWidth = 'true';
}
function updateDetail(e)
{
	if (e=="true"){
		
	}else{
		rowAdd.form.form.reset();
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
}
function btn(val,p,record){
		
	 /******************MQ拉数据*************************************
		if( record.data.taskcategoryid == null ||record.data.taskcategoryid==5){
			var img = '<div style="width:25px;float:left;" title="点击查看该任务的相关问题">	暂无</div>';
        	return img;  
		}
		*************************************************************/
		 
		
        var img = '<div  title="'+getResource('resourceParam1619')+'">' +
        		'<a href="javascript:void(0);" name="user" onClick="issueMain.init(' + record.data.taskid + ',' + record.data.chargedmanid +',\''+record.data.chargeddepid+'\','+record.data.isaofo+')">'; 
         if( record.data.isproblems =='yes'){
			img +="<span style='color:red'>"+getResource('resourceParam1629')+"</span>"
		} else if(record.data.isproblems =='wan'){
			img +="<span style='color:green'>"+getResource('resourceParam1629')+"</span>"
		} else {
			img+=''+getResource('resourceParam1629')+'';
		}
		img +='</a></div>';
        return img; 
        
}

function btn5(val,p,record){
	  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.viewdata(' + record.data.taskid + ','+record.data.projectid+','+record.data.taskstatusid+')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}
function btn6(val,p,record){
  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.updata(' + record.data.taskid + ','+record.data.projectid+','+record.data.taskstatusid+')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}
function btn7(val,p,record){
	  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.viewdata(' + record.data.taskid + ','+record.data.projectid+')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}
function btn8(val,p,record){
  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.updata(' + record.data.taskid + ','+record.data.projectid+',\'dep\',\'zhuanfa\')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}
function  editorColor1(val,p,record,rowIndex,columnIndex)
{
	var ttatus=record.data.taskstatusid;
    if(ttatus == 5)
	 {
    	return "<span style='color:green'>"+val+"</span>";
	 }
	 else
	 {
  	 	return val;
	 }

}
renwukbnGrid2.setcm1 = function (){ 
	renwukbnGrid2.sm = new Ext.grid.CheckboxSelectionModel();
	renwukbnGrid2.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id: 'taskid',
			header: ""+getResource('resourceParam998')+"",
			dataIndex: 'taskname',
			//fixed:true,
			width:70,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return "<span style='color:"+ record.data.color +";font-weight:bold;'>"+ record.data.taskname +"</span>";
			}
		},
		{
			header: ""+getResource('resourceParam1076')+"",
			width:70,
			dataIndex: '',
			renderer:btn5
		},
		{
			header: ""+getResource('resourceParam1077')+"",
			width:70,
			dataIndex: '',
			renderer:btn6
		},
		{
			header: ""+getResource('resourceParam6043'), // 操作
			width:70,
			dataIndex: 'operation'
		},
		{
			header: ""+getResource('resourceParam739')+"",
			width:60,
			dataIndex: 'taskstatusname'
		},{
			header: ""+getResource('resourceParam1043')+"",
			width:70,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam1057')+"",
			width:60,
			dataIndex: 'completedamount'
//			renderer:editorColor1,
//			editor:new Ext.form.TextField({
//				regex : /^(\d\d?|100)$/,
//				regexText : '只能输入0-100的数字!',
//				blankText:'请输入参数',
//				allowBlank:false
//			})
		},{
			header: ""+getResource('resourceParam991')+"",
			width:80,
			dataIndex: 'plannedstartstr'
		},{
			header: ""+getResource('resourceParam1032')+"",
			width:80,
			dataIndex: 'plannedendstr'
		},{
			header: ""+getResource('resourceParam856')+"",
			width:80,
			dataIndex: 'actualstartstr'
		},{
			header: ""+getResource('resourceParam1033')+"",
			width:80,
			dataIndex: 'actualendstr'
		},{
			header: ""+getResource('resourceParam1630')+"",
			width:70,
			dataIndex: 'projectname'
		},{
			header: ""+getResource('resourceParam731')+"",
			width:80,
			dataIndex: 'truename'	
		},{
			header: ""+getResource('resourceParam986')+"",
			width:80,
			dataIndex: 'instname'	
		},{
			header: ""+getResource('resourceParam1628')+"",
			width:80,
			dataIndex: 'issuedmanname'
		},{
			header: ""+getResource('resourceParam1632')+"",
			width:70,
			dataIndex: '',
			renderer:btn
		}
		]
	});
}

renwukbnGrid2.setcm2 = function (){
	renwukbnGrid2.sm = new Ext.grid.CheckboxSelectionModel();
	renwukbnGrid2.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id: 'taskid',
			header: ""+getResource('resourceParam998')+"",
			width:70,
			dataIndex: 'taskname',
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return "<span style='color:"+ record.data.color +";font-weight:bold;'>"+ record.data.taskname +"</span>";
			}
		},
		{
			header: ""+getResource('resourceParam1076')+"",
			width:70,
			dataIndex: '',
			renderer:btn3
		},
		{
			header: ""+getResource('resourceParam1077')+"",
			width:70,
			dataIndex: '',
			renderer:btn4
		},	
		{
			header: ""+getResource('resourceParam1043')+"",
			width:70,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam739')+"",
			width:60,
			fixed:true,
			dataIndex: 'taskstatusname'
		},{
			header: ""+getResource('resourceParam1057')+"",
			width:60,
			fixed:true,
			dataIndex: 'completedamount'
	//		css : 'color: #FF0000;', 
	//		editor:new Ext.form.TextField({
	//			regex : /^(\d\d?|100)$/,
	//			regexText : '只能输入0-100的数字!',
	//			blankText:'请输入参数',
	//			allowBlank:false
	//		})
		},{
			header: ""+getResource('resourceParam991')+"",
			width:80,
			dataIndex: 'plannedstartstr'
		},{
			header: ""+getResource('resourceParam1032')+"",
			width:80,
			dataIndex: 'plannedendstr'
		},{
			header: ""+getResource('resourceParam856')+"",
			width:80,
			dataIndex: 'actualstartstr'
		},{
			header: ""+getResource('resourceParam1033')+"",
			width:80,
			dataIndex: 'actualendstr'
		},{
			header: ""+getResource('resourceParam731')+"",
			width:50,
			fixed:true,
			dataIndex: 'truename'
		},{
			header: ""+getResource('resourceParam986')+"",
			width:70,
			dataIndex: 'instname'
		},
		{
			header: ""+getResource('resourceParam1630')+"",
			width:70,
			dataIndex: 'projectname'
		},{
			header: ""+getResource('resourceParam1628')+"",
			width:70,
			dataIndex: 'issuedmanname'
		},{
			header: ""+getResource('resourceParam1632')+"",
			width:60,
			dataIndex: '',
			renderer:btn
		}
		]
	});
}
