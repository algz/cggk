var renwukbnGrid = {setcm1:null,setcm2:null,proxy:null,scxzgrid:null,updateDialog:null,taskid:null,uvalue:null};
renwukbnGrid.grid = function(num){
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
  renwukbnGrid.proxy = new Ext.data.HttpProxy({
            url: strurl,
          	method:'GET'
        });
  renwukbnGrid.reader = new Ext.data.JsonReader({
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
        proxy: renwukbnGrid.proxy,
        reader: renwukbnGrid.reader
    });

   ds.on('datachanged',function(ds){
   	if(renwukbnQuery.sel && ds.getCount()==0){
   		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ""+getResource('resourceParam765')+"");
   	}
  });

//  renwukbnGrid.sm = new Ext.grid.RowSelectionModel();
 // var sm = new Ext.grid.RowSelectionModel(); 
  if(num==1){
  	var grid = myGrid.initBox(ds,renwukbnGrid.cm,null,renwukbnGrid.sm);
  	
  	grid.on('afteredit',function(e){
	var r=e.record;
	if(r.get("taskid")!=null || r.get("taskid").length<=0)
	{
		var value1=r.get("completedamount");
		if(value1 >= 99)
		{
		    Ext.MessageBox.show({
			title: ''+getResource('resourceParam596')+'',
			msg: ''+getResource('resourceParam1617')+'!',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		   });	
		   
		   value1=99;
		   r.set("completedamount",99);
		}
		var appVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		appVo.setTaskid(r.get("taskid"));
		appVo.setCompletedamount(value1);
		callSeam("tasklist_taskService", "updateCompletedamount", [appVo],updateDetail);
	}
	
   });
  	
   	grid.on('render', function(grid) { 
    var cm = grid.getColumnModel();   
    var editor = cm.getCellEditor(6/*这里是你编辑列的索引号*/, 0);   
    editor.on('beforestartedit', function(editor, boundEl, value) { 
    	var r=grid.getSelectionModel().getSelected();
   	   	if(r.get("taskstatusid")==4)
         {
         	 return true;
         }
         else
         {
            return false;
         }
    });   
    }); 
  	grid.region='center';
  	 return grid;
  } else {
  	var grid = myGrid.init(ds,renwukbnGrid.cm,null,renwukbnGrid.sm);
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
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam572')+'',
			msg: sign,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR 
		});
	}
}
renwukbnGrid.shangchuan=function(tid,pid,aofo){
	
	Files.FileList.uploadFile ( {
						title : ''+getResource('resourceParam647')+getResource('resourceParam6068')+getResource('resourceParam559')+'', // 6068外包
						path : "e:/"+getResource('resourceParam604')+"",
						upload : true,
						callback : function(count) {
							//waibaoxtadd.fujian = count;
						},
						update : 0,// 新增为0，修改为1
							rmcom : null,
							id : null
	});
}
renwukbnGrid.xiazai=function(tid,pid,aofo){
		Files.FileList.init_list( {
						title : ''+getResource('resourceParam576')+''+getResource('resourceParam6069'), // 6069安全报告
						path : "e:/"+getResource('resourceParam604')+"",
						upload : false,
						callback : function(count) {
						},
						update : 1,// 新增为0，修改为1
							rmcom : null,
							id : null
		});
}
//function btn1(val,p,record){
//	  var img = '<div title="点击查看该任务的相关参数">' +
//        		'<a href="#" name="user1" onClick="renwukbnGrid.viewdata(' + record.data.taskid + ','+record.data.projectid+')">'; 
//       img +='查看</a></div>';  
//       return img;
//}
renwukbnGrid.viewdata = function(taskid,projectid, taskstatusid){
	renwukbnMain.scxzgrid1 = scxzGrid.getGrid(1,taskid,projectid, taskstatusid);
	var winTitle = ''+getResource('resourceParam1253')+'';
	if (taskstatusid == 4){
		winTitle = ''+getResource('resourceParam1530')+'';
	}
	if (!renwukbnGrid.updateDialog){	
		tlework.addHtml(tlework.divHtml,"scxz1");
		renwukbnGrid.updateDialog = new Ext.Window({ 
			el:'scxz1',
			title: winTitle,
			modal:true,
			layout:'fit',
			width:800,
			height:500,
			closeAction:'hide',
			plain: false,
			items: [renwukbnMain.scxzgrid1]
		});
	}
	renwukbnGrid.updateDialog.show();
	renwukbnGrid.updateDialog.on("hide",function(){
		renwukbnGrid.updateDialog.close();
		renwukbnGrid.updateDialog.destroy();		
		renwukbnGrid.updateDialog = null;
		
	});
	
	var tabid = renwukbnMain.tabPanel.getActiveTab().id;//获取当前活动的tab的id
	
	var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/tasklist_scxzParametersService.searchParameters?taskid='+ 
			taskid + '&projectid=' + projectid + '&flag=1' + '&taskstatusid='+taskstatusid + '&tabid=' + tabid
	});
	renwukbnMain.scxzgrid1.getStore().proxy = proxy;
	renwukbnMain.scxzgrid1.getStore().load();
}
renwukbnGrid.updateTaskStatus = function(taskid,uvalue){
	renwukbnGrid.taskid=taskid;
	renwukbnGrid.uvalue = uvalue;	
	
		if (renwukbnGrid.uvalue == 5){//用户提交任务，跳出选择审批人的对话框
			renwukbnGrid.addApproveMen(renwukbnGrid.taskid, renwukbnGrid.uvalue);
		} else {
			Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ""+getResource('resourceParam1622')+"", renwukbnGrid.showResult);
		}
}
//调用审批窗口
renwukbnGrid.taskApprove = function(taskid, userid){	
	taskApprove.init(taskid, userid);	//审批窗口
}


renwukbnGrid.showResult = function(btn){
	if(btn == 'yes'){
		if (renwukbnGrid.addApproveMenDialog != null){//关闭指定审批人的窗口
			renwukbnGrid.addApproveMenDialog.hide();
		}
		
		var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		if(!taskVo){
			Ext.MessageBox.alert(''+getResource('resourceParam596')+'', ''+getResource('resourceParam1623')+'');
			return;
		}
		taskVo.setForcesubmit("false");
		taskVo.setTaskid(renwukbnGrid.taskid);
		taskVo.setTaskstatusid(renwukbnGrid.uvalue);
		renwukbnQuery.taskVoSubmit=taskVo;
		callSeam("tasklist_taskService","updateTaskType",[taskVo],renwukbnQuery.updateBack1);
	}
}

//function btn2(val,p,record){//这个按钮似乎一直没有用过
//	 var img = '<div title="点击查看该任务的相关参数">' +
//        		'<a href="#" name="user2" onClick="renwukbnGrid.updata(' + record.data.taskid + ','+record.data.projectid+',\'man\',\'fuze'+record.data.taskstatusid+'\')">'; 
//       img +='查看</a></div>';  
//       return img;
//}

function btn3(val,p,record){
	  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.viewdata(' + record.data.taskid + ','+record.data.projectid+','+record.data.taskstatusid+')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}
function btn4(val,p,record){
  var img = '<div title="'+getResource('resourceParam1618')+'">' +
        		'<a href="javascript:void(0);" name="user1" onClick="renwukbnGrid.updata(' + record.data.taskid + ','+record.data.projectid+','+record.data.taskstatusid+')">'; 
       img +=''+getResource('resourceParam576')+'</a></div>';  
       return img;
}


renwukbnGrid.updata = function(taskid,projectid,taskstatusid){	
	renwukbnMain.scxzgrid2 = scxzGrid.getGrid(2,taskid,projectid, taskstatusid);
	var winTitle = ''+getResource('resourceParam1253')+'';
	if (taskstatusid == 4){
		winTitle = ''+getResource('resourceParam1530')+'';
	}
	if (!renwukbnGrid.updateDialog){	
		tlework.addHtml(tlework.divHtml,"scxz2");
		renwukbnGrid.updateDialog = new Ext.Window({ 
			el:'scxz2',
			title: winTitle,
			modal:true,
			layout:'fit',
			width:800,
			height:500,
			closeAction:'hide',
			plain: false,
			items: [renwukbnMain.scxzgrid2]
		});
	}
	renwukbnGrid.updateDialog.show();
	renwukbnGrid.updateDialog.on("hide",function(){
		renwukbnGrid.updateDialog.close();
		renwukbnGrid.updateDialog.destroy();		
		renwukbnGrid.updateDialog = null;
		
	});
	
	var tabid = renwukbnMain.tabPanel.getActiveTab().id;//获取当前活动的tab的id
	
	var proxy = new Ext.data.HttpProxy( {
			url : '../JSON/tasklist_scxzParametersService.searchParameters?taskid='+ 
			taskid + '&projectid=' + projectid + '&flag=2' + '&taskstatusid='+taskstatusid + '&tabid=' + tabid//+ fanwei + '' + role
	});
	renwukbnMain.scxzgrid2.getStore().proxy = proxy;
	renwukbnMain.scxzgrid2.getStore().load();
}



function btn(val,p,record){
		
	 /******************MQ拉数据*************************************
		if( record.data.taskcategoryid == null ||record.data.taskcategoryid==5){
			var img = '<div style="width:25px;float:left;" title="点击查看该任务的相关问题">	暂无</div>';
        	return img;  
		}
		*************************************************************/
		 
		
        var img = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1619')+'">' +
        		'<a href="javascript:void(0);" name="user" onClick="issueMain.init(' + record.data.taskid + ',' + record.data.chargedmanid +',\''+record.data.chargeddepid+'\','+record.data.isaofo+')">'; 
        if( record.data.isproblems =='yes'){
			img +="<span style='color:red'>"+getResource('resourceParam1629')+"</span>"
		} else if(record.data.isproblems =='wan'){
			img +="<span style='color:green'>"+getResource('resourceParam1629')+"</span>"
		} else {
			img+=''+getResource('resourceParam1629')+'';
		}
		img +='</a></div></div>';
        return img; 
        
    }
    
renwukbnGrid.approveBtn = function(val,p,record){
	var img = '<div style="width:25px;float:left;" title="'+getResource('resourceParam1620')+'">' +
     '<a href="javascript:void(0);" name="user" onClick="renwukbnGrid.viewApproveNotes(' + record.data.taskid + ',-1)">';
		img +="<span style='color:black'>"+getResource('resourceParam576')+"</span>"		
		img +='</a></div></div>';
        return img; 
}

renwukbnGrid.viewApproveNotes = function(taskid,taskstatus){	
	renwukbnMain.viewApproveNotesGrid = approveNotesGrid.getGrid(taskid,taskstatus);
	var winTitle = ''+getResource('resourceParam1625')+'';	
	
	if (!renwukbnGrid.viewApproveNotesDialog){	
		tlework.addHtml(tlework.divHtml,"viewApproveNotes");
		renwukbnGrid.viewApproveNotesDialog = new Ext.Window({ 
			el:'viewApproveNotes',
			title: winTitle,
			modal:true,
			layout:'fit',
			width:700,
			height:300,
			closeAction:'hide',
			plain: false,
			items: [renwukbnMain.viewApproveNotesGrid]
		});
	}
	renwukbnGrid.viewApproveNotesDialog.show();
	renwukbnGrid.viewApproveNotesDialog.on("hide",function(){
		renwukbnGrid.viewApproveNotesDialog.close();
		renwukbnGrid.viewApproveNotesDialog.destroy();		
		renwukbnGrid.viewApproveNotesDialog = null;
		
	});
	var dsUrl = '../JSON/tasklist_taskService.getTaskApproveNotes?taskid='+ taskid + '&date=' +new Date();
	var proxy = new Ext.data.HttpProxy( {
			method: 'get',
			url : dsUrl
	});
	renwukbnMain.viewApproveNotesGrid.getStore().proxy = proxy;
	renwukbnMain.viewApproveNotesGrid.getStore().load();	
}

renwukbnGrid.addApproveMen = function(taskid,taskstatus){	
	renwukbnMain.addApproveMenGrid = approveNotesGrid.getGrid(taskid,taskstatus);
	var winTitle = ''+getResource('resourceParam1626')+'';		
	
	if (!renwukbnGrid.addApproveMenDialog){	
		tlework.addHtml(tlework.divHtml,"addApproveMen");
		renwukbnGrid.addApproveMenDialog = new Ext.Window({ 
			el:'addApproveMen',
			title: winTitle,
			modal:true,
			layout:'fit',
			width:700,
			height:300,
			closeAction:'hide',
			plain: false,
			items: [renwukbnMain.addApproveMenGrid],
			buttons : [{
				text : ''+getResource('resourceParam484')+'',
				handler : function() {
					//判断是否存在审批人
					if (renwukbnMain.addApproveMenGrid.getStore().getCount()>0){
						Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ""+getResource('resourceParam1622')+"", renwukbnGrid.showResult);
					} else {
						Ext.MessageBox.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1624')+'');
					}						
				}
			}, {
				text : ''+getResource('resourceParam6002')+'', // 取消
				handler : function() {
					renwukbnGrid.addApproveMenDialog.hide();
				}
			}]
		});
	}
	renwukbnGrid.addApproveMenDialog.show();
	renwukbnGrid.addApproveMenDialog.on("hide",function(){
		renwukbnGrid.addApproveMenDialog.close();
		renwukbnGrid.addApproveMenDialog.destroy();		
		renwukbnGrid.addApproveMenDialog = null;
		
	});
	var dsUrl = '../JSON/tasklist_taskService.getTaskApproveNotes?taskid='+ taskid + '&date=' +new Date();
	var proxy = new Ext.data.HttpProxy( {
			method: 'get',
			url : dsUrl
	});
	renwukbnMain.addApproveMenGrid.getStore().proxy = proxy;
	renwukbnMain.addApproveMenGrid.getStore().load();	
}
    
function  editorColor(val,p,record,rowIndex,columnIndex)
{
	var ttatus=record.data.taskstatusid;
    if(ttatus == 4)
	 {
	 	//renwukbnGrid.cm.startEditing(rowIndex,columnIndex);
	 	return "<span style='color:green'>"+val+"</span>";
	 }
	 else
	 {
  	 	return val;
	 }

}
renwukbnGrid.setcm1 = function (){ 
	renwukbnGrid.sm = new Ext.grid.CheckboxSelectionModel();
	renwukbnGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id: 'taskid',
			header: ""+getResource('resourceParam998')+"",
			dataIndex: 'taskname',
			//fixed:true,
			width:60,
			renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				return "<span style='color:"+ record.data.color +";font-weight:bold;'>"+ record.data.taskname +"</span>";
			}
		},
		{
			header: ""+getResource('resourceParam1076')+"",
			width:60,
			dataIndex: '',
			renderer:btn3
		},
		{
			header: ""+getResource('resourceParam1077')+"",
			width:60,
			dataIndex: '',
			renderer:btn4
		},
		{
			header: ""+getResource('resourceParam6043'), // 操作
			width:60,
			dataIndex: 'operation'
		},
		{
			header: ""+getResource('resourceParam739')+"",
			width:60,
			dataIndex: 'taskstatusname'
		},{
			header: ""+getResource('resourceParam1043')+"",
			width:60,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam1057')+"",
			width:60,
			dataIndex: 'completedamount',
			renderer:editorColor,
		    editor:new Ext.form.TextField({
			regex : /^(\d\d?|100)$/,
			regexText : ''+getResource('resourceParam1621')+'!',
			blankText:''+getResource('resourceParam1627')+'',
			allowBlank:false
			})
		},{
			header: ""+getResource('resourceParam991')+"",
			width:70,
			dataIndex: 'plannedstartstr'
		},{
			header: ""+getResource('resourceParam1032')+"",
			width:70,
			dataIndex: 'plannedendstr'
		},{
			header: ""+getResource('resourceParam856')+"",
			width:70,
			dataIndex: 'actualstartstr'
		},{
			header: ""+getResource('resourceParam1033')+"",
			width:70,
			dataIndex: 'actualendstr'
		},{
			header: ""+getResource('resourceParam1628')+"",
			width:80,
			dataIndex: 'issuedmanname'
		},{
			header: ""+getResource('resourceParam1630')+"",
			width:60,
			dataIndex: 'projectname'
		},{
			header: ""+getResource('resourceParam1630')+"",
			width:60,
			dataIndex: 'projectname'
		},{
			header: ""+getResource('resourceParam731')+"",
			width:60,
			dataIndex: 'truename'
		},{
			header: ""+getResource('resourceParam986')+"",
			width:70,
			dataIndex: 'instname'
			},{
			header: ""+getResource('resourceParam1631')+"",
			width:60,
			dataIndex: '',
			renderer:renwukbnGrid.approveBtn
		},
		{
			header: ""+getResource('resourceParam1632')+"",
			width:60,
			dataIndex: '',
			renderer:btn
		}]
	});
}

renwukbnGrid.setcm2 = function (){//似乎已经废弃
	renwukbnGrid.sm = new Ext.grid.CheckboxSelectionModel();
	renwukbnGrid.cm = new Ext.grid.ColumnModel({
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
			width:80,
			dataIndex: '',
			renderer:btn3
		},
		{
			header: ""+getResource('resourceParam1077')+"",
			width:80,
			dataIndex: '',
			renderer:btn4
		},	
		{
			header: ""+getResource('resourceParam739')+"",
			width:60,
//			fixed:true,
			dataIndex: 'taskstatusname'
		}, {
			header: ""+getResource('resourceParam739')+"",//解决界面上显示不出来的问题
			width:60,
//			fixed:true,
			dataIndex: 'taskstatusname'
		},{
			header: ""+getResource('resourceParam1043')+"",
			width:70,
			dataIndex: 'taskcategoryname'
		},{
			header: ""+getResource('resourceParam1057')+"",
			width:60,
//			fixed:true,
			dataIndex: 'completedamount'
//			css : 'color: #FF0000;', 
//			editor:new Ext.form.TextField({
//				regex : /^(\d\d?|100)$/,
//				regexText : '只能输入0-100的数字!',
//				blankText:'请输入参数',
//				allowBlank:false
//							})
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
			width:60,
//			fixed:true,
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
		}]
	});
}
