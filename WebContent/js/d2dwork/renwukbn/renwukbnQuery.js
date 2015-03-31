
var renwukbnQuery = {selectDialog:null,renwukbnform:null,
						args:{start:0,limit:25},tempgrid:null,updatedValue:null,updatedId:null,
						selectedValue:null,selectedId:null,sel:false, taskVoSubmit:null};

/**
 * 查询角色
 */
renwukbnQuery.init = function(grid){  
	
		//alert("++"+fanwei+"+++"+categoryid);
//		renwukbnQuery.fanwei = fanwei;
//		renwukbnQuery.categoryid = categoryid;
	if (!renwukbnQuery.selectDialog){	
		tlework.addHtml(tlework.divHtml,"renwukbnQuery");
		renwukbnQuery.selectDialog = new Ext.Window({ 
		el:'renwukbnQuery',
		title: ''+getResource('resourceParam1648')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:200,
		closeAction:'hide',
		plain: false,
		items: renwukbnQuery.selectrenwukbnform(grid)						
		});
	}
	renwukbnQuery.selectDialog.show();
	renwukbnQuery.selectDialog.on("hide",function(){
		renwukbnQuery.selectDialog.close();
		renwukbnQuery.selectDialog.destroy();		
		renwukbnQuery.selectDialog = null;
		
	});
};

renwukbnQuery.callIDE = function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
	startup("IDE",grid.selModel.getSelected().get('taskid'),grid.selModel.getSelected().get('taskname'));
}

renwukbnQuery.client = function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
	startup(""+getResource('resourceParam1647')+"",grid.selModel.getSelected().get('taskid'));
}
renwukbnQuery.erp = function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
	startup("ERP",grid.selModel.getSelected().get('taskid'));
}
renwukbnQuery.capp = function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
	startup("CAPP",grid.selModel.getSelected().get('taskid'));
}
/**
 * 修改任务状态
 */
renwukbnQuery.updateTaskType = function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
		var taskstatusid = grid.selModel.getSelected().get('taskstatusid');
	if(taskstatusid == 6){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1639')+'');
		return;
	}
		
	if(taskstatusid == 7){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1640')+'');
		return;
	}
	
	if (!renwukbnQuery.updateDialog){	
		tlework.addHtml(tlework.divHtml,"updatetaskstatus");
		renwukbnQuery.updateDialog = new Ext.Window({ 
		el:'updatetaskstatus',
		title: ''+getResource('resourceParam1645')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:210,
		closeAction:'hide',
		plain: false,
		items: renwukbnQuery.updaterenwukbnform(grid)	
		});
	}
	renwukbnQuery.updateDialog.show();
	renwukbnQuery.updateDialog.on("hide",function(){
		renwukbnQuery.updateDialog.close();
		renwukbnQuery.updateDialog.destroy();		
		renwukbnQuery.updateDialog = null;
	});
	
	
};

/**
 * 生成任务状态修改面板
 */
renwukbnQuery.updaterenwukbnform = function(grid){
	renwukbnQuery.tempgrid = grid;
	var taskstatusid = grid.selModel.getSelected().get('taskstatusid');
//	if(taskstatusid == 6){
//		Ext.MessageBox.alert('信息', '任务已经完成');
//		return;
//	}
//		
//	if(taskstatusid == 7){
//		Ext.MessageBox.alert('信息', '任务已经终止');
//		return;
//	}
		
	var taskname = grid.selModel.getSelected().get('taskname');
	var taskstatusname = grid.selModel.getSelected().get('taskstatusname');
	
	var psttime = grid.selModel.getSelected().get('plannedstartstr');
	var pendtime = grid.selModel.getSelected().get('plannedendstr');
	
	var jishunum = grid.selModel.getSelected().get('plannedamount');
	var shijinum = grid.selModel.getSelected().get('completedamount');
	renwukbnQuery.button=new Ext.Button({
		text: ''+getResource('resourceParam478')+'',
				handler: function()
					{	
						var comboxvalue = renwukbnQuery.renwukbnform.items.itemAt(4).getValue();
						if(!comboxvalue || comboxvalue == '')
							return;
						renwukbnQuery.updatedValue = renwukbnQuery.renwukbnform.items.itemAt(4).lastSelectionText;
						var message = ''+getResource('resourceParam739')+ getResource('resourceParam6061') + ':<span style=color:green;font-weight:bold;>' // 6061将由
										+ taskstatusname + '</span><br/>'+getResource('resourceParam1531')+':<span style=color:red;font-weight:bold;>'
										+ renwukbnQuery.updatedValue +'</span><br/>';
						if(shijinum<jishunum && comboxvalue==6){
							message +=''+getResource('resourceParam1646')+':<span style=color:green;font-weight:bold;>'+getResource('resourceParam454')+getResource('resourceParam6062')+'</span><br/>'; // 6062完成
							message	+= '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + getResource('resourceParam6063') // 6063此
									+  getResource('resourceParam478')+''+getResource('resourceParam6064') // 6064不可逆，您
									+  getResource('resourceParam479')+''+getResource('resourceParam6065') // 6065要
									+  getResource('resourceParam478')+''+getResource('resourceParam6066'); // 6066吗？
						} else {
							message	+= ''+getResource('resourceParam6063')+getResource('resourceParam478') // 此
									+  ''+getResource('resourceParam6064')+getResource('resourceParam479') // 不可逆，您
									+  ''+getResource('resourceParam6065')+getResource('resourceParam478') // 要
									+  ''+getResource('resourceParam6066'); // 吗？
						}
							
						 
						Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', message, showResult);
					}
	});
	
	 renwukbnQuery.quxiao = new Ext.Button({
	 	text: ''+getResource('resourceParam6002')+'', // 取消
		handler: function(){
				renwukbnQuery.updateDialog.hide();
		}
	 });
	renwukbnQuery.renwukbnform = new Ext.FormPanel({
		labelWidth: 85, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
        height: 210,
		defaults: {width: 280,height:200},
		defaultType: 'textfield',
		items:[
			{
				xtype:'textfield',
				fieldLabel:''+getResource('resourceParam998')+'',
				value:taskname,
				disabled:true,
				height:20,
				anchor:'95%'
			},
			{
				xtype:'datefield',
				fieldLabel:''+getResource('resourceParam991')+'',
				value:psttime,
				disabled:true,
				height:20,
				anchor:'95%'
			},
			{
				xtype:'datefield',
				fieldLabel:''+getResource('resourceParam993')+'',
				value:pendtime,
				disabled:true,
				height:20,
				anchor:'95%'
			},
			{
				xtype:'textfield',
				fieldLabel:''+getResource('resourceParam733')+getResource('resourceParam6067')+''+getResource('resourceParam500')+'', // 6067原
				value:taskstatusname,
				disabled:true,
				height:20,
				anchor:'95%'
			},
			{
				xtype:'combo',
//				store: new Ext.data.SimpleStore({
//					fields: ["taskstatusid", "name"],
//					data:[[1,'未发布'],[2,'未接收'],[3,'未开发'],
//							[4,'进行中'],[5,'审批中'],[6,'已完成'],[7,'已终止']]
//					}),	
				store:renwukbnQuery.ds_taskstatus("../JSON/tasklist_taskService.getTaskstatusNames?taskstatusid=" + taskstatusid),
				valueField :'taskstatusid',
				displayField: 'taskstatusname',
				mode: 'remote',
				forceSelection: true,
				hiddenName:'taskstatusid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam1531')+'',
				name: 'taskstatusid',
				anchor:'95%'
			}],										
		buttons: [
			renwukbnQuery.button,
			renwukbnQuery.quxiao]	
		});				
		return renwukbnQuery.renwukbnform;
};

var showResult = function(btn){
	if(btn == 'yes'){
		//renwukbnQuery.updateDialog.setDisabled(true);
		renwukbnQuery.button.setDisabled(true);
		renwukbnQuery.quxiao.setDisabled(true);
		var taskstatusid = renwukbnQuery.tempgrid.selModel.getSelected().get('taskstatusid');
		var taskid = renwukbnQuery.tempgrid.selModel.getSelected().get('taskid');
		/////
		var aofo= renwukbnQuery.tempgrid.selModel.getSelected().get('isaofo');
		/////
		var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		Ext.apply(taskVo,renwukbnQuery.renwukbnform.form.getValues());
		if(!taskVo){
			Ext.MessageBox.alert(''+getResource('resourceParam596')+'', ''+getResource('resourceParam1623')+'');
			return;
		}
		var statusid = taskVo.taskstatusid;
		var statusname = renwukbnQuery.renwukbnform.items.itemAt(4).lastSelectionText;
		
		if(statusid == '' || taskstatusid == statusid){
			return;
		}
		
		var ids = taskid + '_' + statusid + '_' + statusname;
		
		taskVo.setTaskid(taskid);
		taskVo.setIsaofo(aofo);
		renwukbnQuery.updatedId = statusid;
		renwukbnQuery.selectedId = taskstatusid;
		callSeam("tasklist_taskService","updateTaskType",[taskVo],renwukbnQuery.updateBack1);
	}
}


renwukbnQuery.updateBack1 = function(response){
	if(response == 'sucess'){	
		if(renwukbnQuery.updateDialog)
			renwukbnQuery.updateDialog.hide();
		var tempgrid;
		var t1;
		var t2;
		if(renwukbnMain.combo1.getValue()==""+getResource('resourceParam1114')+"" ||renwukbnMain.combo1.getValue()==""||
					renwukbnMain.combo1.getValue()=="-1"){
						t1 = -1;
					}else{
						t1 = renwukbnMain.combo1.value;
					}
		if(renwukbnMain.combo2.getValue()==""+getResource('resourceParam1114')+"" ||renwukbnMain.combo2.getValue()==""||
					renwukbnMain.combo2.getValue()=="-1"){
						t2 = -1;
					}else{
						t2 = renwukbnMain.combo2.value
					}
		if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel1"){
			renwukbnMain.baseargsfz = {
									role:'fuze',
									fanwei:'man',
									taskstatusid:renwukbnMain.ztai,
									taskcategoryid:t1,
									plannedstartstr:null,
									plannedendstr:null,
									taskcategoryname:null
								};
			tempgrid = renwukbnMain.renwukbngrid1;
		}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel2"){
			renwukbnMain.baseargsfz = {
										role:'zhuanfa',
										fanwei:'man',
										taskstatusid:renwukbnMain.ztai,
										taskcategoryid:t2,
										plannedstartstr:null,
										plannedendstr:null,
										taskcategoryname:null
									};	
			tempgrid = renwukbnMain.renwukbngrid2;
		}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel3"){
			renwukbnMain.baseargsfz = {
									role:'fuze',
									fanwei:'dep',
									taskstatusid:renwukbnMain.ztai,
									taskcategoryid:t1,
									plannedstartstr:null,
									plannedendstr:null,
									taskcategoryname:null
								};
			tempgrid = renwukbnMain.renwukbngrid1;
		}else{
			renwukbnMain.baseargsfz = {
										role:'zhuanfa',
										fanwei:'dep',
										taskstatusid:renwukbnMain.ztai,
										taskcategoryid:t2,
										plannedstartstr:null,
										plannedendstr:null,
										taskcategoryname:null
									};
			tempgrid = renwukbnMain.renwukbngrid2;
		}
		tempgrid.selModel.getSelected().set('taskstatusid',renwukbnQuery.updatedId);
		tempgrid.selModel.getSelected().set('taskstatusname',renwukbnQuery.updatedValue);
		var it = renwukbnBar.selectbbar.items;
		var item;
		for(var i = 0; i < it.length;i++){
			item = it.itemAt(i);
			if(item.id == renwukbnQuery.updatedId){
				var front = item.text.substring(0,item.text.indexOf('(') + 1);
				var offside = item.text.substring(item.text.indexOf(')'));
				var number = parseInt(item.text.substring(item.text.indexOf('(') + 1,item.text.indexOf(')'))) + 1;
				item.setText(front + number + offside);
			}
			if(item.id == renwukbnQuery.selectedId){
				var front = item.text.substring(0,item.text.indexOf('(') + 1);
				var offside = item.text.substring(item.text.indexOf(')'));
				var number = parseInt(item.text.substring(item.text.indexOf('(') + 1,item.text.indexOf(')'))) - 1;
				item.setText(front + number + offside);
			}
		}
		
	var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		taskVo.setFanwei(renwukbnMain.baseargsfz.fanwei);
		taskVo.setRole(renwukbnMain.baseargsfz.role);
		if(renwukbnMain.baseargsfz.taskcategoryid==null || 
		renwukbnMain.baseargsfz.taskcategoryid==undefined ||
		renwukbnMain.baseargsfz.taskcategoryid=="" ||
		renwukbnMain.baseargsfz.taskcategoryid==""+getResource('resourceParam1114')+""){
			renwukbnMain.leix =-1;
		} else {
			renwukbnMain.leix = renwukbnMain.baseargsfz.taskcategoryid;
		}	
		taskVo.setTaskcategoryid(renwukbnMain.leix);
		callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
		//document.getElementById("allBar").color="black";  
		//document.getElementById("renwukbnBar0").color="blue";
		Ext.QuickTips.init();	 
		myGrid.loadvalue(tempgrid.store,renwukbnMain.args,renwukbnMain.baseargsfz);
		Ext.MessageBox.alert(''+getResource('resourceParam596')+'', ''+getResource('resourceParam677')+'');
		}else if(response == 'NotAllChildrenEnd'){
		Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ''+getResource('resourceParam1638')+'', renwukbnQuery.forceSubmit);		
		
//		Ext.MessageBox.alert('信息', '修改失败，有子任务未完成或未终止');
//		renwukbnQuery.button.setDisabled(false);
//		renwukbnQuery.quxiao.setDisabled(false);
	}else{
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam572')+'');
		renwukbnQuery.button.setDisabled(false);
		renwukbnQuery.quxiao.setDisabled(false);
	}
}

renwukbnQuery.forceSubmit = function(btn){//强制提交
	if(btn == 'yes'){
		renwukbnQuery.taskVoSubmit.setForcesubmit("true");
		callSeam("tasklist_taskService","updateTaskType",[renwukbnQuery.taskVoSubmit],renwukbnQuery.updateBack1);
	}
}

renwukbnQuery.ds_taskstatus = function(url) {
	 ds = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : url
		}),
		reader : new Ext.data.JsonReader( {
			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'taskstatusname'
		},{
			name : 'taskstatusid'		
		}])
	});
	return  ds;
};

/**
 * 生成查询任务的Form面板
 */
renwukbnQuery.selectrenwukbnform = function(grid){
	renwukbnQuery.renwukbnform = new Ext.FormPanel({

		labelWidth: 85, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
        height: 300,
		defaults: {width: 280,height:280},
		defaultType: 'textfield',
		items:[
			{
				height :22,
				fieldLabel:''+getResource('resourceParam998')+'', 
				name:'taskname',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'!',
				minLength : 1,
				maxLength : 128,
				minText :''+getResource('resourceParam1642')+'',
				maxText :''+getResource('resourceParam1641')+'',
				anchor:'95%'
			},
			{
				xtype:'combo',
				store: new Ext.data.Store( {
							proxy : new Ext.data.HttpProxy( {
								url : "../JSON/tasklist_taskService.getRenwukbnCombo"
							}),
							reader : new Ext.data.JsonReader( {
								totalProperty : 'totalProperty',
								root : 'results'
							}, ['taskstatusid','taskstatusname'])
						}),	
				
				valueField:"taskstatusid",
				displayField: "taskstatusname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'taskstatusid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam739')+'',
				name: 'taskstatusid',
				anchor:'95%'
			},
//			{
//				xtype:'combo',
//				store:new Ext.data.Store( {
//						proxy : new Ext.data.HttpProxy( {
//							url : "../JSON/tasklist_taskService.getSelectCombo"
//						}),
//						reader : new Ext.data.JsonReader( {
//							totalProperty : 'totalProperty',
//							root : 'results'
//						}, [ {
//							name : 'taskcategoryname'
//						},{
//							name : 'taskcategoryid'		
//						}])
//					}),
//			
//				valueField :"taskcategoryid",
//				displayField: "taskcategoryname",
//				mode: 'remote',
//				forceSelection: true,
//				hiddenName:'taskcategoryid',
//				editable: false,
//				triggerAction: 'all',
//				fieldLabel: '任务类型',
//				name: 'taskcategoryid',
//				anchor:'95%'
//
//			},		
			{
				xtype:'datefield',
				fieldLabel:''+getResource('resourceParam991')+'',
				format:'Y-m-d' ,
				name:'plannedstartstr',
				anchor:'95%'
			},
			{
				xtype:'datefield',
				fieldLabel:''+getResource('resourceParam993')+'',
				format:'Y-m-d' ,
				name:'plannedendstr',
				anchor:'95%'
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
						Ext.apply(taskVo,renwukbnQuery.renwukbnform.form.getValues());
						
						var lop = grid.store.lastOptions;
							var categoryid = lop.params.taskcategoryid
							if(categoryid==null || categoryid==undefined||categoryid==''+getResource('resourceParam1114')+''){
								categoryid = -1;
							}
								 
							if(taskVo.taskstatusid == null ||taskVo.taskstatusid == ""){
								taskVo.setTaskstatusid(lop.params.taskstatusid);
							}
								 
							
							renwukbnMain.args.start = lop.params.start;
							renwukbnMain.args.limit = lop.params.limit;
				
						if(grid.id == 'fuze'){
							renwukbnMain.baseargsfz = {
								role:'fuze',
								taskstatusid:taskVo.taskstatusid,
								taskcategoryid:categoryid,
								//taskcategoryname:taskVo.taskcategoryname,
								plannedstartstr:taskVo.plannedstartstr,
								plannedendstr:taskVo.plannedendstr,
								taskname:taskVo.taskname,
								fanwei:lop.params.fanwei
							}	
							taskVo.setRole("fuze"); 
							taskVo.setTaskcategoryid(categoryid);
							taskVo.setFanwei(lop.params.fanwei);
							renwukbnMain.ztai=taskVo.taskstatusid;
							callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
							Ext.QuickTips.init();
							var cm = renwukbnMain.renwukbngrid1.getColumnModel();
							if(taskVo.taskstatusid==2){	
								if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel1"){
									cm.setHidden(12,false);
								}
//								else {
//									cm.setHidden(12,true);
//								}
								
								//接受按钮
								if(document.getElementById("jieshou")){
									document.getElementById("jieshou").style.display='';
								}
								 	
							} else {
//								if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel"){
//									
//								}
								//cm.setHidden(12,true);
								if(document.getElementById("jieshou")){
									//接受按钮
									document.getElementById("jieshou").style.display='none'; 
								}
							}
							myGrid.loadvalue(grid.store,renwukbnMain.args,renwukbnMain.baseargsfz);
						}else if(grid.id == 'zhuanfa'){
							renwukbnMain.baseargszf = {
								role:'zhuanfa',
								taskstatusid:taskVo.taskstatusid,
								taskcategoryid:categoryid,
								//taskcategoryname:taskVo.taskcategoryname,
								plannedstartstr:taskVo.plannedstartstr,
								plannedendstr:taskVo.plannedendstr,
								taskname:taskVo.taskname,
								fanwei:lop.params.fanwei
							}
							taskVo.setRole("zhuanfa"); 
							taskVo.setTaskcategoryid(categoryid);
							taskVo.setFanwei(lop.params.fanwei);
							renwukbnMain.ztai=taskVo.taskstatusid;
							callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
							Ext.QuickTips.init();
							myGrid.loadvalue(grid.store,renwukbnMain.args,renwukbnMain.baseargszf);
						}
						renwukbnQuery.sel=true;
						renwukbnQuery.selectDialog.hide();
						renwukbnMain.baseargsfz.taskname=null;
						renwukbnMain.baseargsfz.plannedstartstr=null;
						renwukbnMain.baseargsfz.plannedendstr=null;
						
						
					}
					
			},
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
						renwukbnQuery.selectDialog.hide();
					}
			}]	
		});				
		return renwukbnQuery.renwukbnform;
};

renwukbnQuery.jieshou= function(grid){
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1644')+'');
		return;
	}
	Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ""+getResource('resourceParam1637')+"", jieshouma);	
}

var jieshouma = function (btn){
	if(btn == 'yes'){
		var privIds = renwukbnQuery.functioncodes();
		Seam.Component.getInstance
		("tasklist_taskService").jieshou(privIds,renwukbnQuery.save);	
	}
}
renwukbnQuery.functioncodes = function(){		//放回选中行id
	var result = new Array();
	if(myGrid.rows != null){
		var size =myGrid.rows.length;
		for(var i = 0; i < size; i++){
			var record = myGrid.rows[i].get('taskid');
			var isaofo = myGrid.rows[i].get('isaofo');
			var temp = new Array();
			temp[0] =record;
			temp[1] = isaofo;
			result[i] = temp;
		}
		myGrid.rows = null;
		return result;
	}
}

renwukbnQuery.save = function(result){
	var sign = result;	
	if (sign=="true"){							
       	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1649')+'',
			msg: ''+getResource('resourceParam1643')+' !',
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.INFO
		});					
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1480')+'',
			msg: result,
			buttons: Ext.MessageBox.OK,
		    icon: Ext.MessageBox.ERROR
		});
	}
	 
	if(renwukbnMain.combo1.value==''+getResource('resourceParam1114')+''||renwukbnMain.combo1.value==null){
	 	renwukbnMain.combo1.value = -1;
	}  
 	renwukbnMain.baseargsfz = {
				role:'fuze',
				fanwei:'man',
				taskstatusid:renwukbnMain.ztai,
				taskcategoryid:renwukbnMain.combo1.value,
				plannedstartstr:null,
				plannedendstr:null,
				taskname:null
	};
	var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		taskVo.setFanwei('man');
		taskVo.setRole('fuze');
		renwukbnMain.leix = renwukbnMain.combo1.getValue();
		taskVo.setTaskcategoryid(renwukbnMain.leix);
		callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
		document.getElementById("allBar").color="black";  
		document.getElementById("renwukbnBar0").color="blue";
		Ext.QuickTips.init();	 
	myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);

};
