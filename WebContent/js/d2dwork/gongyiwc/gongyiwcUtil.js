var gongyiwcUtil = {};
/**
 * 按任务--单位任务--个人任务逐层步进显示
 */
gongyiwcUtil.Stepping = function(thisgrid){
	gongyiwcUtil.Formatparams();
	var cm = thisgrid.getColumnModel(); 
	if(cm.getDataIndex(0) == 'taskname'){
		return;
	}
  	if(cm.getDataIndex(0) != 'chargedmanname'){
	  	if(cm.getDataIndex(0) == 'projectname'){
	  		gongyiwcMain.tablename = 'technicsdep';
	  		gongyiwcMain.tabpanel1.setTitle("统计"+getResource('resourceParam652')+"-"+getResource('resourceParam1201')+""+getResource('resourceParam1286')+"");
	  		gongyiwcMain.projectid = myGrid.row.get('projectid');
	  		gongyiwcMain.projectname = myGrid.row.get('projectname');
	  		cm.setColumnHeader(0,""+getResource('resourceParam1201')+""+getResource('resourceParam480')+"");
		  	cm.setDataIndex(0,'chargeddepname');
		  		
		  	gongyiwcMain.daohangHtml['chargeddepname'] = gongyiwcMain.projectname + "-->分"+getResource('resourceParam1201')+""+getResource('resourceParam1286')+"";
	  	}
	  	else if(cm.getDataIndex(0) == 'chargeddepname'){
	  		gongyiwcMain.projectid = myGrid.row.get('projectid');
	  		gongyiwcMain.tablename = 'technicsperson';
	  		gongyiwcMain.chargeddepid = myGrid.row.get('chargeddepid');
	  		gongyiwcMain.chargeddepname = myGrid.row.get('chargeddepname');
	  		gongyiwcMain.projectname = myGrid.row.get('projectname');
	  		gongyiwcMain.tabpanel1.setTitle("统计"+getResource('resourceParam652')+"-个人"+getResource('resourceParam1286')+"");
	  		cm.setColumnHeader(0,"个人");
		  	cm.setDataIndex(0,'chargedmanname');
		  	gongyiwcMain.daohangHtml['chargedmanname'] = gongyiwcMain.projectname 
		  				+ "-->" + gongyiwcMain.chargeddepname + "-->个人工艺编写"+getResource('resourceParam1286')+"";
	  	}
	  	gongyiwcMain.baseargs = {
	  		projectid:gongyiwcMain.projectid,
	  		taskid:gongyiwcMain.taskid,
	  		chargeddepid:gongyiwcMain.chargeddepid,
	  		tablename:gongyiwcMain.tablename
	  	}
	  	gongyiwcMain.daohang.show();
		Ext.get('daohang').dom.innerHTML = gongyiwcMain.daohangHtml[cm.getDataIndex(0)];		
		gongyiwcMain.tabpanel1.doLayout();
		thisgrid.selModel.clearSelections();
		myGrid.loadvalue(thisgrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
		//gongyiwcMain.queryForm.getForm().reset();
  	}
}
/**
 * 显示未完成的项目内容
 */
gongyiwcUtil.Unfinished = function(projectid,projectname,chargeddepid,chargedmanid,chargeddepname,chargedmanname){
	gongyiwcUtil.Formatparams();
	var cm = gongyiwcMain.renwugrid.getColumnModel(); 	
	gongyiwcMain.tabpanel1.setTitle("统计"+getResource('resourceParam652')+"-"+getResource('resourceParam454')+"完成原因");
	if(cm.getDataIndex(0) == 'projectname'){
		Ext.get('daohang').dom.innerHTML = projectname + "-->"+getResource('resourceParam1295')+"";
		chargedmanid = null;
		chargeddepid = null;
	} else if(cm.getDataIndex(0) == 'chargeddepname'){
		Ext.get('daohang').dom.innerHTML =projectname +"-->"+ chargeddepname + "-->"+getResource('resourceParam1295')+"";
		chargedmanid = null;
	} else {
		Ext.get('daohang').dom.innerHTML = projectname +"-->"+ chargeddepname + "-->" + chargedmanname + "-->"+getResource('resourceParam1295')+"";
	}
	cm.setColumnHeader(0,""+getResource('resourceParam1296')+"");
	cm.setDataIndex(0,'taskname');
	cm.setColumnHeader(1,"当前环节");
	cm.setDataIndex(1,'currenttache');
	cm.setColumnHeader(2,""+getResource('resourceParam454')+"完成原因");
	cm.setDataIndex(2,'taskproblemsnotes');
	cm.setColumnWidth(2,300);
	cm.setColumnHeader(3,"");
	cm.setRenderer(3,null);
	cm.setHidden(3,true);
	cm.setColumnHeader(4,"");
	cm.setRenderer(4,null);
	cm.setHidden(4,true);
	
	//if(gongyiwcMain.taskname != null){
	//	taskname = gongyiwcMain.taskname;
	//}
	
	gongyiwcMain.daohang.show();
	gongyiwcMain.tablename = 'renwuwcqk';
	gongyiwcMain.baseargs = {
	  			projectid:projectid,
	  			chargeddepid:chargeddepid,
	  			tablename:gongyiwcMain.tablename,
	  			chargedmanid:chargedmanid
	  			//completeratio:0
	  		}
	gongyiwcMain.renwugrid.selModel.clearSelections();
	gongyiwcMain.tabpanel1.doLayout();
	myGrid.loadvalue(gongyiwcMain.renwugrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	//gongyiwcMain.queryForm.getForm().reset();
}
/**
 * 按个人任务--单位任务--任务逐层步出显示，或者从未完成列表返回到任务列表
 */
gongyiwcUtil.Stepout = function(){
	gongyiwcUtil.Formatparams();
	var cm = gongyiwcMain.renwugrid.getColumnModel(); 
	//alert(gongyiwcMain.taskname + "   " + gongyiwcMain.chargeddepname);
	if(cm.getDataIndex(0) == 'chargedmanname'){
		gongyiwcMain.tablename = 'technicsdep';
	  	gongyiwcMain.tabpanel1.setTitle("统计"+getResource('resourceParam652')+"-"+getResource('resourceParam1201')+""+getResource('resourceParam1286')+"");
	  	gongyiwcMain.chargeddepid = null;
	  	gongyiwcMain.chargeddepname = null;
	  	cm.setColumnHeader(0,""+getResource('resourceParam1201')+""+getResource('resourceParam480')+"");
		cm.setDataIndex(0,'chargeddepname');
		  		
		//gongyiwcMain.daohangHtml['chargeddepname'] = gongyiwcMain.taskname + "-->分单位完成情况";
		Ext.get('daohang').dom.innerHTML = gongyiwcMain.daohangHtml[cm.getDataIndex(0)];
	 }
	 else if(cm.getDataIndex(0) == 'chargeddepname'){
	 	gongyiwcMain.tablename = 'technics';
	  	gongyiwcMain.projectid = null;
	  	gongyiwcMain.projectname = null;
	  	gongyiwcMain.tabpanel1.setTitle("统计"+getResource('resourceParam652')+"");
	  	cm.setColumnHeader(0,""+getResource('resourceParam1035')+"");
		cm.setDataIndex(0,'projectname');
		gongyiwcMain.daohang.hide();
	  }
	else if(cm.getDataIndex(0) == 'taskname'){
		if(gongyiwcMain.projectname == null && gongyiwcMain.chargeddepname == null){
			gongyiwcMain.tablename = 'technics';
			gongyiwcMain.daohang.hide();
			cm.setColumnHeader(0,""+getResource('resourceParam1035')+"");
			cm.setDataIndex(0,'projectname');
		}
		else if(gongyiwcMain.projectname != null && gongyiwcMain.chargeddepname == null){
			gongyiwcMain.tablename = 'technicsdep';
			Ext.get('daohang').dom.innerHTML = gongyiwcMain.daohangHtml['chargeddepname'];
			cm.setColumnHeader(0,""+getResource('resourceParam1201')+""+getResource('resourceParam480')+"");
			cm.setDataIndex(0,'chargeddepname');
		}
		else if(gongyiwcMain.projectname != null && gongyiwcMain.chargeddepname != null){
			gongyiwcMain.tablename = 'technicsperson';
			Ext.get('daohang').dom.innerHTML = gongyiwcMain.daohangHtml['chargedmanname'];
			cm.setColumnHeader(0,"个人");
			cm.setDataIndex(0,'chargedmanname');
		}
		
		cm.setColumnHeader(1,""+getResource('resourceParam1285')+"");
		cm.setDataIndex(1,'plannedamount');
		cm.setColumnHeader(2,"完成数量");
		cm.setDataIndex(2,'completedamount');
		cm.setColumnWidth(2,100);
		cm.setColumnHeader(3,"完成率");
		cm.setRenderer(3,gongyiwcGrid.wcl);	
		cm.setHidden(3,false);
		cm.setColumnHeader(4,"");
		cm.setRenderer(4,gongyiwcGrid.btn);		
		cm.setHidden(4,false);
		
	}
	
	gongyiwcMain.baseargs = {
				projectid:gongyiwcMain.projectid,
	  			taskid:gongyiwcMain.taskid,
	  			chargeddepid:gongyiwcMain.chargeddepid,
	  			tablename:gongyiwcMain.tablename,
	  			chargedmanid:gongyiwcMain.chargedmanid,
	  			chargedmanid:null
	  		}		
	gongyiwcMain.tabpanel1.doLayout();
	gongyiwcMain.renwugrid.selModel.clearSelections();
	myGrid.loadvalue(gongyiwcMain.renwugrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	//gongyiwcMain.queryForm.getForm().reset();
}
/**
 * 查询
 */
gongyiwcUtil.Query = function(){
	gongyiwcUtil.Formatparams();
	if(gongyiwcMain.tab.activeTab.id == 'tabpanel1'){
		gongyiwcMain.baseargs = {
			model:gongyiwcMain.queryForm.getForm().getValues().model,
			batchs:gongyiwcMain.queryForm.getForm().getValues().batchs,
			sorties:gongyiwcMain.queryForm.getForm().getValues().sorties,
			plannedstartstr:gongyiwcMain.queryForm.getForm().getValues().plannedstartstr,
			plannedendstr:gongyiwcMain.queryForm.getForm().getValues().plannedendstr,
			projectid:gongyiwcMain.projectid,
			taskid:gongyiwcMain.taskid,
			chargeddepid:gongyiwcMain.chargeddepid,
			tablename:gongyiwcMain.tablename,
			flag:'chaxuen'
		};	
		//gongyiwcMain.renwugrid  = gongyiwcGrid.grid();
	
		myGrid.loadvalue(gongyiwcMain.renwugrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	}else{
		gongyiwcMain.baseargs = {
			model:gongyiwcMain.queryForm.getForm().getValues().model,
			batchs:gongyiwcMain.queryForm.getForm().getValues().batchs,
			sorties:gongyiwcMain.queryForm.getForm().getValues().sorties,
			plannedstartstr:gongyiwcMain.queryForm.getForm().getValues().plannedstartstr,
			plannedendstr:gongyiwcMain.queryForm.getForm().getValues().plannedendstr,
			flag:'chaxuen'
		};
		//gongyiwcMain.renwuInfogrid = gongyiInfoGrid.grid();
		myGrid.loadvalue(gongyiwcMain.renwuInfogrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	}
	//gongyiwcMain.queryForm.getForm().reset();
}
/**
 * 清除查询条件
 */
gongyiwcUtil.Formatparams = function(){
	gongyiwcMain.baseargs = {
		projectid:null,
		projectname:null,
		taskid:null,
		taskname:null,
	  	chargeddepid:null,
	  	chargeddepname:null,
	  	tablename:null,
	  	chargedmanid:null,
	  	chargedmanname:null,
	  	completeratio:null,
	  	type:null,
		batch:null,
		sortie:null,
		plannedstartstr:null,
		actualstartstr:null,
		actualendstr:null,
		partsnum:null,
		taskstatusid:null,
		plannedendstr:null
	};
}
/**
 * 统计工艺数量
 */
gongyiwcUtil.QueryNum = function(){
	callSeam("aofoquery_TechnicsStatSvr","save",[null],
	function(result){
		if(result=='ok'){
			alert("统计完成");
		}else {
			alert("统计失败");
		}
	});
}
/**
 * 高级查询
 */
gongyiwcUtil.GQuery = function(){
	gongyiwcUtil.Formatparams();
	if(gongyiwcMain.tab.activeTab.id == 'tabpanel1'){
		if(gongyiwcMain.tablename=='technics'){
			gongyiwcMain.baseargs = {
				model:gongyiwcQuery.gongyiwcform.getForm().getValues().model,
				batchs:gongyiwcQuery.gongyiwcform.getForm().getValues().batchs,
				sorties:gongyiwcQuery.gongyiwcform.getForm().getValues().sorties,
				plannedstartstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedstartstr,
				plannedendstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedendstr,
				projectid:gongyiwcQuery.gongyiwcform.getForm().getValues().projectid,
				chargedmanname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanname,
				taskname:gongyiwcQuery.gongyiwcform.getForm().getValues().taskname,
				chargeddepname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepname,
				chargeddepid:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepid,
				tablename:gongyiwcMain.tablename,
				chargedmanid:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanid,
				flag:'chaxuen'
			};	
		} else if(gongyiwcMain.tablename=='technicsdep'){
			gongyiwcMain.baseargs = {
				model:gongyiwcQuery.gongyiwcform.getForm().getValues().model,
				batchs:gongyiwcQuery.gongyiwcform.getForm().getValues().batchs,
				sorties:gongyiwcQuery.gongyiwcform.getForm().getValues().sorties,
				plannedstartstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedstartstr,
				plannedendstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedendstr,
				projectid:gongyiwcMain.projectid,
				chargedmanname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanname,
				taskname:gongyiwcQuery.gongyiwcform.getForm().getValues().taskname,
				chargeddepname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepname,
				chargeddepid:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepid,
				tablename:gongyiwcMain.tablename,
				chargedmanid:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanid,
				flag:'chaxuen'
			};	
		} else if (gongyiwcMain.tablename=='technicsperson'){
			gongyiwcMain.baseargs = {
				model:gongyiwcQuery.gongyiwcform.getForm().getValues().model,
				batchs:gongyiwcQuery.gongyiwcform.getForm().getValues().batchs,
				sorties:gongyiwcQuery.gongyiwcform.getForm().getValues().sorties,
				plannedstartstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedstartstr,
				plannedendstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedendstr,
				projectid:gongyiwcMain.projectid,
				chargedmanname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanname,
				taskname:gongyiwcQuery.gongyiwcform.getForm().getValues().taskname,
				chargeddepname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepname,
				chargeddepid:gongyiwcMain.chargeddepid,
				tablename:gongyiwcMain.tablename,
				chargedmanid:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanid,
				flag:'chaxuen'
			};	
		} else if (gongyiwcMain.tablename=='renwuwcqk'){
			gongyiwcMain.baseargs = {
			model:gongyiwcMain.queryForm.getForm().getValues().model,
			batchs:gongyiwcMain.queryForm.getForm().getValues().batchs,
			sorties:gongyiwcMain.queryForm.getForm().getValues().sorties,
			plannedstartstr:gongyiwcMain.queryForm.getForm().getValues().plannedstartstr,
			plannedendstr:gongyiwcMain.queryForm.getForm().getValues().plannedendstr,
			projectid:gongyiwcMain.projectid,
			taskid:gongyiwcMain.taskid,
			chargeddepid:gongyiwcMain.chargeddepid,
			tablename:gongyiwcMain.tablename,
			flag:'chaxuen'
		};	
		}
		//gongyiwcMain.renwugrid  = gongyiwcGrid.grid();
	
		myGrid.loadvalue(gongyiwcMain.renwugrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	}else{
		gongyiwcMain.baseargs = {
			model:gongyiwcQuery.gongyiwcform.getForm().getValues().model,
			batchs:gongyiwcQuery.gongyiwcform.getForm().getValues().batchs,
			sorties:gongyiwcQuery.gongyiwcform.getForm().getValues().sorties,
			plannedstartstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedstartstr,
			plannedendstr:gongyiwcQuery.gongyiwcform.getForm().getValues().plannedendstr,
			actualstartstr:gongyiwcQuery.gongyiwcform.getForm().getValues().actualstartstr,
			chargedmanname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargedmanname,
			taskname:gongyiwcQuery.gongyiwcform.getForm().getValues().taskname,
			chargeddepname:gongyiwcQuery.gongyiwcform.getForm().getValues().chargeddepname,
			actualendstr:gongyiwcQuery.gongyiwcform.getForm().getValues().actualendstr,
			tablename:gongyiwcMain.tablename,
			partsnum:gongyiwcQuery.gongyiwcform.getForm().getValues().partsnum,
			taskstatusid:gongyiwcQuery.gongyiwcform.getForm().getValues().taskstatusid,
			flag:'chaxuen'
		};
		//gongyiwcMain.renwuInfogrid = gongyiInfoGrid.grid();
		myGrid.loadvalue(gongyiwcMain.renwuInfogrid.store,gongyiwcMain.args,gongyiwcMain.baseargs);
	}
	gongyiwcMain.queryForm.getForm().reset();
}

