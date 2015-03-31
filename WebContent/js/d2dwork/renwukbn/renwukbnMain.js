
/**
 * 代办事项列表
 */
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var renwukbnMain = {scxzgrid1:null,scxzgrid2:null,renwukbnpanel:null,renwukbngrid1:null,renwukbngrid2:null,sign:null,selectages:null,
				args:{start:0,limit:25},count:0,counts:0,baseargsfz:null,baseargszf:null,dbsxztai:null,showbt:null,isload:true,paramvalue:null,viewApproveNotesGrid:null};
renwukbnMain.init = function(){
	renwukbnMain.scxzgrid1 = scxzGrid.getGrid();
	renwukbnMain.scxzgrid2 = scxzGrid.getGrid();
	renwukbnMain.getdialog();
}
renwukbnMain.getbar = function(response){
	renwukbnMain.sign = response;
	renwukbnBar.getbar(renwukbnMain.sign);
	Ext.QuickTips.init();
}
renwukbnMain.getdialog = function(){
	renwukbnMain.combo1=new Ext.form.ComboBox({
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/tasklist_taskService.getSelectCombo"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'taskcategoryname'
						},{
							name : 'taskcategoryid'		
						}])
					}),
			
				valueField :"taskcategoryid",
				displayField: "taskcategoryname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'taskcategoryid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam1043')+'',
				name: 'taskcategoryid',
				anchor:'95%'
			});
  	renwukbnMain.combo1.on('select',function(combo,record,num){
  						renwukbnBar.leixingming = record.data.taskcategoryname;
						renwukbnMain.leix = record.data.taskcategoryid;
						renwukbnMain.baseargsfz = {
							role:'fuze',
							fanwei:'man',
							taskstatusid:renwukbnMain.ztai,
							taskcategoryid:renwukbnMain.leix,
							plannedstartstr:null,
							plannedendstr:null,
							taskname:null
						};
						var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
						taskVo.setFanwei('man');
						taskVo.setRole('fuze');
						taskVo.setTaskcategoryid(renwukbnMain.leix);
						/*******************MQ拉数据*************************************
						var proxy;
						var cm = renwukbnMain.renwukbngrid1.getColumnModel();
						if(num==4){
							renwukbnBar.leixingming ="生产任务"
							proxy = new Ext.data.HttpProxy({
           						 url: '../JSON/tasklist_taskService.getIndividualTask'
       				 		});
       				 		callSeam("tasklist_taskService","getIndividualTbar",[taskVo],renwukbnMain.getbar); 
       				 		//隐藏开启.net按钮
							document.getElementById("chengxu").style.display='none';
						} else {
							proxy = new Ext.data.HttpProxy({
           						 url: '../JSON/tasklist_taskService.getRenwukbnPageList'
       				 		});
							//从数据库中得到数据
							callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar); 
							//开启.net按钮
							document.getElementById("chengxu").style.display='';
						}
						renwukbnMain.renwukbngrid1.getStore().proxy = proxy ;
						*****************************************************************/
						////////////////////////本地数据库直接取数据///////////////////////////////
//						if(num==4){
//							renwukbnBar.leixingming ="生产任务";
//						} 
						//从数据库中得到数据
						callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
						
						var cm = renwukbnMain.renwukbngrid1.getColumnModel();
						cm.setHidden(12,true);
						//隐藏接受按钮
						document.getElementById("jieshou").style.display='none';
						////////////////////////////////////////////////////////////////////
       				 	myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);		
				});
	 renwukbnMain.combo2=new Ext.form.ComboBox({
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/tasklist_taskService.getSelectCombo"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'taskcategoryname'
						},{
							name : 'taskcategoryid'		
						}])
					}),	
			
				valueField :"taskcategoryid",
				displayField: "taskcategoryname",
				mode: 'remote',
				forceSelection: true,
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam1043')+'',
				name: 'taskcategoryid',
				anchor:'95%'
			});
  	renwukbnMain.combo2.on('select',function(combo,record,num){
  						renwukbnBar.leixingming = record.data.taskcategoryname;
						renwukbnMain.leix = record.data.taskcategoryid;
						renwukbnMain.baseargszf = {
							role:'zhuanfa',
							fanwei:'man',
							taskstatusid:renwukbnMain.ztai,
							taskcategoryid:renwukbnMain.leix,
							plannedstartstr:null,
							plannedendstr:null,
							taskname:null
						};
						var proxy;
						var cm = renwukbnMain.renwukbngrid2.getColumnModel();
						var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
						taskVo.setFanwei('man');
						taskVo.setRole('zhuanfa');
						taskVo.setTaskcategoryid(renwukbnMain.leix);
						/*******************MQ拉数据*************************************
						if(num==4){
							renwukbnBar.leixingming ="生产任务"
							proxy = new Ext.data.HttpProxy({
           						 url: '../JSON/tasklist_taskService.getIndividualTask'
       				 		});
       				 		callSeam("tasklist_taskService","getIndividualTbar",[taskVo],renwukbnMain.getbar);
						} else {
							proxy = new Ext.data.HttpProxy({
           						 url: '../JSON/tasklist_taskService.getRenwukbnPageList'
       				 		});
       				 		callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);  
						}
					
						renwukbnMain.renwukbngrid2.getStore().proxy = proxy ;
						*****************************************************************/
						////////////////////////本地数据库直接取数据///////////////////////////////
//						if(num==4){
//							renwukbnBar.leixingming ="生产任务";
//						} 
						//从数据库中得到数据
						callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
						////////////////////////////////////////////////////////////////////
						myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargszf);								
				});
	renwukbnGrid.setcm1();
	renwukbnMain.renwukbngrid1 = renwukbnGrid.grid(1);
	
	var cm = renwukbnMain.renwukbngrid1.getColumnModel();
	cm.setHidden(12,true);
	renwukbnMain.renwukbngrid1.id = 'fuze';
	
	renwukbnMain.renwukbngrid2 = renwukbnGrid2.grid(1);
	renwukbnMain.renwukbngrid2.id = 'zhuanfa';
	
	var status1 = '<div id="status1" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px;width:1800"   align="left">' +
					'<div style="float:left; padding-top:2px;padding-left:5px;padding-right:15px;font-weight:bold;font-size: 10pt">'+getResource('resourceParam1636')+getResource('resourceParam6059')+getResource('resourceParam733')+'</div> ' + // 6059的
					//任务类型下拉
					'<div style="float:left; padding-top:0px;padding-left:5px;text-align:center;">'+getResource('resourceParam1635')+'</div> ' +
					'<div id="guolv1" style="float:left; padding-top:0px;">' +
					'</div> ' +
					' <div id="button1" style="float:left;width:500; padding-top:0px;padding-left:10px;" >' +
						'<a style="cursor: hand" onclick="renwukbnQuery.init(renwukbnMain.renwukbngrid1)">' +
						'<IMG SRC="../images/renwukbn.jpg" align="middle"></a>' +
						//任务状态修改
						//'<a style="cursor: hand" onclick="renwukbnQuery.updateTaskType(renwukbnMain.renwukbngrid1)">' +
						//'<IMG SRC="../images/updatetaskstatus.jpg" align="middle"></a>' + 
						
						'<a style="cursor: hand" onclick="renwukbnQuery.client(renwukbnMain.renwukbngrid1)">' +
						'<IMG id = "chengxu" SRC="../images/startnetexe.jpg" align="middle"></a>' +
						//调用TDE/IDE
						'<a style="cursor: hand" onclick="renwukbnQuery.callIDE(renwukbnMain.renwukbngrid1)">' +
						'<IMG id = "chengxu" SRC="../images/createIDEProject.png" align="middle"></a>' +
//						'<a style="cursor: hand" onclick="renwukbnQuery.erp(renwukbnMain.renwukbngrid1)">' +
//						'<IMG id = "chengxu" SRC="../images/erp.jpg" align="middle"></a>' +
//						'<a style="cursor: hand" onclick="renwukbnQuery.capp(renwukbnMain.renwukbngrid1)">' +
//						'<IMG id = "chengxu" SRC="../images/capp.jpg" align="middle"></a>' + 
						//接收任务按钮
						'<a style="cursor: hand" onclick="renwukbnQuery.jieshou(renwukbnMain.renwukbngrid1)">' +
						'<IMG id = "jieshou" SRC="../images/accept.jpg" align="middle"></a>' + 
					'</div>' +
					' <div id="uppwd1" style="float:right; padding-top:0px;padding-right:20px;">' +
					'</div>' +
					'<div id="showstatus1" >' +

					'</div>' +
				 	'</div>';
	renwukbnMain.showForm1 = 
		{
				collapsible: false,
				region:'north',
				height:30,
				split:false,
				html:status1	
	};
	var status2 = '<div id="status2" class="x-panel-header x-unselectable x-accordion-hd" style="height:30px;width:1800"   align="left">' +
					'<div style="float:left; padding-top:2px;padding-left:5px;padding-right:15px;font-weight:bold;font-size: 10pt">'+getResource('resourceParam6060')+getResource('resourceParam733')+'</div> ' + // 6060派发的
					//任务类型下拉
					'<div style="float:left; padding-top:0px;padding-left:5px;">'+getResource('resourceParam1635')+'</div> ' +
					'<div id="guolv2" style="float:left; padding-top:0px;">' +
					'</div> ' +
					' <div id="button2" style="float:left;width:500; padding-top:0px;padding-left:10px;" >' +
						'<a style="cursor: hand" onclick="renwukbnQuery.init(renwukbnMain.renwukbngrid2)">' +
						'<IMG SRC="../images/renwukbn.jpg" align="middle"></a>' + 
					'</div>' +
					' <div id="uppwd2" style="float:right; padding-top:0px;padding-right:20px;">' +
					'</div>' +
					'<div id="showstatus2" >' +

					'</div>' +
				 	'</div>';
	renwukbnMain.showForm2 = 
		{
				collapsible: false,
				region:'north',
				height:30,
				split:false,
				html:status2	
	};	
	
	renwukbnMain.gridpanel  = new Ext.Panel({
						region:'center',
						id:'tabpanel1',
						layout:'border',
					 	title:''+getResource('resourceParam1634')+'',
					 	items:[renwukbnMain.renwukbngrid1,renwukbnMain.showForm1]
					 });
	
	renwukbnMain.gridpanelsend = new Ext.Panel({
						region:'center',
						id:'tabpanel2',
						layout:'border',
					 	title:''+getResource('resourceParam1633')+'',
					 	items:[renwukbnMain.renwukbngrid2,renwukbnMain.showForm2]
					 });
	 renwukbnMain.tabPanel = new Ext.TabPanel({
				region:'center',
		 		minTabWidth:300,
		 		resizeTabs:true,
				items:[
					 renwukbnMain.gridpanel,
					renwukbnMain.gridpanelsend],
				 activeTab:0
		    });
		    
renwukbnMain.tabPanel.on('tabchange',function(tabpanel,panel){

	if(panel.id == 'tabpanel1'){
		renwukbnMain.ztai3 = renwukbnMain.ztai;
		renwukbnMain.ztai = renwukbnMain.ztai2;
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
		/*******************MQ拉数据*************************************
		var cm = renwukbnMain.renwukbngrid1.getColumnModel();
		if(renwukbnMain.combo1.getValue()=="生产任务" ||renwukbnMain.combo1.getValue()==""||
					renwukbnMain.combo1.getValue()=="5"){
			renwukbnBar.leixingming ="生产任务"
			taskVo.setTaskcategoryid(5);
			//从数据库中得到数据,得到生产任务状态栏数据
			callSeam("tasklist_taskService","getIndividualTbar",[taskVo],renwukbnMain.getbar); 
		}else {	
			renwukbnMain.leix = renwukbnMain.combo1.getValue();
			taskVo.setTaskcategoryid(renwukbnMain.leix);
			callSeam("tasklist_taskService","getcname",[taskVo],renwukbnMain.comboxdisplayname); 
			//从数据库中得到数据
			callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);  
		}
		********************************************************/
		////////////////////////本地数据库直接取数据///////////////////////////////
		if(renwukbnMain.combo1.getValue()==""+getResource('resourceParam1114')+"" ||renwukbnMain.combo1.getValue()==""||
					renwukbnMain.combo1.getValue()=="-1"){
			renwukbnBar.leixingming =""+getResource('resourceParam1114')+""
			taskVo.setTaskcategoryid(-1);
		}else {	
			renwukbnMain.leix = renwukbnMain.combo1.getValue();
			taskVo.setTaskcategoryid(renwukbnMain.leix);
			callSeam("tasklist_taskService","getcname",[taskVo],renwukbnMain.comboxdisplayname);   
		}
		//从数据库中得到数据
		
		callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);
		///////////////////////////////////////////////////////////////////////
		var cm = renwukbnMain.renwukbngrid1.getColumnModel();
		
		//隐藏接受按钮
		if(renwukbnMain.ztai!=2){
			if(document.getElementById("jieshou")){
				document.getElementById("jieshou").style.display='none';
			}	
			cm.setHidden(12,true);
		} else {
			if(document.getElementById("jieshou")){
				document.getElementById("jieshou").style.display='';
			}
			cm.setHidden(12,false);
		}
	   if(renwukbnMain.count==0)
	   {
	   	renwukbnMain.count=1;
		myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
	   }
	}else{
	 
		renwukbnMain.ztai2=renwukbnMain.ztai;
		renwukbnMain.ztai = renwukbnMain.ztai3;
		renwukbnMain.baseargszf = {
							role:'zhuanfa',
							fanwei:'man',
							taskstatusid:renwukbnMain.ztai,
							taskcategoryid:renwukbnMain.combo2.value,
							plannedstartstr:null,
							plannedendstr:null,
							taskname:null
						};
		var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		taskVo.setFanwei('man');
		taskVo.setRole('zhuanfa');
		/*******************MQ拉数据*************************************
		var cm = renwukbnMain.renwukbngrid2.getColumnModel();
		if(renwukbnMain.combo2.getValue()=="生产任务" || renwukbnMain.combo2.getValue() =="5"){
			renwukbnBar.leixingming ="生产任务"
		 	taskVo.setTaskcategoryid(5);
			//从数据库中得到数据,得到生产任务状态栏数据
			callSeam("tasklist_taskService","getIndividualTbar",[taskVo],renwukbnMain.getbar); 
		}else if(renwukbnMain.combo2.getValue()==""){
			renwukbnBar.leixingming ="生产任务"
			renwukbnMain.combo2.setValue("生产任务");	
	 		taskVo.setTaskcategoryid(5);
			//从数据库中得到数据,得到生产任务状态栏数据
			callSeam("tasklist_taskService","getIndividualTbar",[taskVo],renwukbnMain.getbar); 
		}else { 
			renwukbnMain.leix = renwukbnMain.combo2.getValue();
			taskVo.setTaskcategoryid(renwukbnMain.leix);
			callSeam("tasklist_taskService","getcname",[taskVo],renwukbnMain.comboxdisplayname); 
			//从数据库中得到数据
			callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);  
		}	
		*****************************************************************/
		////////////////////////本地数据库直接取数据///////////////////////////////
 	if(renwukbnMain.combo2.getValue()==""+getResource('resourceParam1114')+"" || renwukbnMain.combo2.getValue() =="-1"){
			renwukbnBar.leixingming =""+getResource('resourceParam1114')+"";
		 	taskVo.setTaskcategoryid(-1);
 	}else if(renwukbnMain.combo2.getValue()==""){
			renwukbnBar.leixingming =""+getResource('resourceParam1114')+""
			renwukbnMain.combo2.setValue(""+getResource('resourceParam1114')+"");	
	 		taskVo.setTaskcategoryid(-1);
		}else { 
			renwukbnMain.leix = renwukbnMain.combo2.getValue();
			taskVo.setTaskcategoryid(renwukbnMain.leix);
			callSeam("tasklist_taskService","getcname",[taskVo],renwukbnMain.comboxdisplayname); 
 	}	
		//从数据库中得到数据
		callSeam("tasklist_taskService","getRenwukbnTbar",[taskVo],renwukbnMain.getbar);  
	 
		///////////////////////////////////////////////////////////
		renwukbnMain.gridpanelsend.doLayout();	
		renwukbnMain.combo2.render('guolv2');
//		var cm = renwukbnMain.renwukbngrid2.getColumnModel();
//		cm.setHidden(11,true);
	   if(renwukbnMain.counts==0)
	   {
	   	renwukbnMain.counts=1;
	    myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargszf);
	   }
	}
});
		    
	renwukbnMain.renwukbnpanel = new Ext.Panel({
		region:'center',
		layout:'border',
		 items:[
		 	renwukbnMain.tabPanel
		 	//renwukbnMain.gridpanel
		 ]
	});
	
	
	 
	var viewport = new Ext.Viewport({		//页面布局
        layout:'border',					//布局模式
        items:[
        	{
        		height:25,
        		region:'north'
        	},
	       	renwukbnMain.renwukbnpanel
        ]
        
    });
    
    
   
    renwukbnMain.combo1.setValue(""+getResource('resourceParam1114')+"");
	renwukbnMain.gridpanel.doLayout();
	renwukbnMain.renwukbnpanel.doLayout();
 	renwukbnMain.combo1.render('guolv1');
//	renwukbnMain.selectages();	
	//隐藏开启.net按钮
	//document.getElementById("chengxu").style.display='none';	
}

renwukbnMain.comboxdisplayname = function(response){
	 renwukbnBar.leixingming =response.taskcategoryname;
}
Ext.onReady(renwukbnMain.init,renwukbnMain,true);
