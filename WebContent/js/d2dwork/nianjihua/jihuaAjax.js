var planAjax = {args:{start:0,limit:20},baseargs:null};

//周grid的ds初始化
planAjax.ds_init = function(url){	
	planAjax.ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: url}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalProperty',
			root: 'results'
		},[
			{name: 'jihlxing'},
			{name: 'jihuamc'},
			{name: 'jihualy'},
			{name: 'lindaoId'},
			{name: 'fuzkeshi'},
			{name: 'fuzheren'},
			{name: 'bjiaoId'},
			{name: 'canyuren'},
			{name: 'jhjiessj'},
			{name: 'jihuaId'},
			{name: 'xiangmId'},
			{name: 'gulxitId'},
			{name: 'jhkaissj'},
			{name: 'sjkaissj'},
			{name: 'sjjiessj'},
			{name: 'wancjind'},
			{name: 'jhbeizhu'},
			{name: 'yonghuId'},
			{name: 'shifouxg'},
			{name: 'xmfzr'},
			{name: 'fzcld'},
			{name: 'bjue'}
		])
	});
}

planAjax.add = function(planForm, winAdd){
	if (planForm.form.isValid()){
		planAjax.win = winAdd;
		var processPtn = /^\d+(\.\d+)?$/;
		var process = planForm.form.findField('wancjind').getValue();
		
		if (processPtn.test(process)){
			if (process > 100){
				Ext.MessageBox.show({
					title: ''+getResource('resourceParam575')+'',
					msg: ''+getResource('resourceParam1510')+'',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			}else{
				//填写人id从后台获得
				var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaVo");
				Ext.apply(plan, planForm.form.getValues());
				plan.jhbeizhu = Ext.get('jhbeizhu').dom.value;
				
				//判断日期
				if (CompareDate(plan.jhkaissj, plan.jhjiessj) && plan.jhjiessj != ""){
					Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1511')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else if (CompareDate(plan.sjkaissj, plan.sjjiessj) && plan.sjjiessj != ""){
					 Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1512')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else{
					callSeam("d2dwork_nianjihua_NianjihuaSvr", "save", [plan], message);
				}
			}
		}else if (process == ""){
			//填写人id从后台获得
			var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaVo");
			Ext.apply(plan, planForm.form.getValues());
			plan.jhbeizhu = Ext.get('jhbeizhu').dom.value;
			
			//判断日期
			if (CompareDate(plan.jhkaissj, plan.jhjiessj) && plan.jhjiessj != "") {
				Ext.MessageBox.show( {
					title : ''+getResource('resourceParam575')+'',
					msg : ''+getResource('resourceParam1511')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			}else if (CompareDate(plan.sjkaissj, plan.sjjiessj) && plan.sjjiessj != "") {
				Ext.MessageBox.show( {
					title : ''+getResource('resourceParam575')+'',
					msg : ''+getResource('resourceParam1512')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			}else {
					callSeam("d2dwork_nianjihua_NianjihuaSvr", "save", [plan],
						message);
			}
		}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1509')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1513')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}
}

planAjax.update = function(planForm, winUpdate, jihuaId){
	if (planForm.form.isValid()){
		planAjax.win = winUpdate;
		
		var processPtn = /^\d+(\.\d+)?$/;
		var gg = planForm.form.getValues();
		var bjue = planForm.form.findField('bjiaoId').getValue();
		var xmfzr = planForm.form.findField('fuzheren').getValue();
		var fzcld = planForm.form.findField('lindaoId').getValue();
		var process = planForm.form.findField('wancjind').getValue();
		
		if (processPtn.test(process)){
			if (process > 100){
				Ext.MessageBox.show({
					title: ''+getResource('resourceParam575')+'',
					msg: ''+getResource('resourceParam1510')+'',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			}else{
				var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaVo");
				Ext.apply(plan, planForm.form.getValues());
				plan.jihuaId = jihuaId;
				
				if (plan.jihlxing == ""+getResource('resourceParam463')+"类"){
					plan.jihlxing = "0";
				}else if (plan.jihlxing == "制度类"){
					plan.jihlxing = "1";
				}else if (plan.jihlxing == "培训类"){
					plan.jihlxing = "2";
				}else if (plan.jihlxing == "管理类"){
					plan.jihlxing = "3";
				}else if (plan.jihlxing == ""+getResource('resourceParam513')+"类"){
					plan.jihlxing = "4";
				}
				
				if (plan.jihualy == "总行"){
					plan.jihualy = "0";
				}else if (plan.jihualy == "总行要求分行自主开发"){
					plan.jihualy = "1";
				}
				else if (plan.jihualy == "分行"){
					plan.jihualy = "2";
				}
				else if (plan.jihualy == "中支"){
					plan.jihualy = "3";
				}
				if (xmfzr == planUpdate.record.get('fuzheren')){
					plan.fuzheren = planUpdate.record.get('xmfzr');
				}
				if (fzcld == planUpdate.record.get('lindaoId')){
					plan.lindaoId = planUpdate.record.get('fzcld');
				}
				if (bjue == planUpdate.record.get('bjiaoId')){
					plan.bjiaoId = planUpdate.record.get('bjue');
				}else if (bjue == null || bjue == ""){
					plan.bjiaoId = bjue;
				}
				
				plan.jhbeizhu = Ext.get('jhbeizhu').dom.value;
				//判断日期
				if (CompareDate(plan.jhkaissj, plan.jhjiessj) && plan.jhjiessj != ""){
					Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1511')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else if (CompareDate(plan.sjkaissj, plan.sjjiessj) && plan.sjjiessj != ""){
					 Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1512')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else{
					callSeam("d2dwork_nianjihua_NianjihuaSvr", "update", [plan], message);
				}		
			}
		}else if (process == ""){
			var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaVo");
			Ext.apply(plan, planForm.form.getValues());
			plan.jihuaId = jihuaId;
			if (plan.jihlxing == ""+getResource('resourceParam463')+"类"){
					plan.jihlxing = "0";
				}else if (plan.jihlxing == "制度类"){
					plan.jihlxing = "1";
				}else if (plan.jihlxing == "培训类"){
					plan.jihlxing = "2";
				}else if (plan.jihlxing == "管理类"){
					plan.jihlxing = "3";
				}else if (plan.jihlxing == ""+getResource('resourceParam513')+"类"){
					plan.jihlxing = "4";
				}
				
				if (plan.jihualy == "总行"){
					plan.jihualy = "0";
				}else if (plan.jihualy == "总行要求分行自主开发"){
					plan.jihualy = "1";
				}
				else if (plan.jihualy == "分行"){
					plan.jihualy = "2";
				}
				else if (plan.jihualy == "中支"){
					plan.jihualy = "3";
				}
				
			plan.jhbeizhu = Ext.get('jhbeizhu').dom.value;
			//判断日期
			if (CompareDate(plan.jhkaissj, plan.jhjiessj)
					&& plan.jhjiessj != "") {
				Ext.MessageBox.show( {
					title : ''+getResource('resourceParam575')+'',
					msg : ''+getResource('resourceParam1511')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			} else if (CompareDate(plan.sjkaissj, plan.sjjiessj)
					&& plan.sjjiessj != "") {
				Ext.MessageBox.show( {
					title : ''+getResource('resourceParam575')+'',
					msg : ''+getResource('resourceParam1512')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			} else {
				callSeam("d2dwork_nianjihua_NianjihuaSvr", "update", [plan],
						message);
			}		
		}else{
			Ext.MessageBox.show({
				title: ''+getResource('resourceParam575')+'',
				msg: ''+getResource('resourceParam1509')+'',
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.WARNING
			});
		}
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1513')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}	
}

planAjax.query = function(queryForm){
	var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaQueryVo");
	Ext.apply(plan, queryForm.form.getValues());
	var condition = {
				jihuamc: plan.jihuamc,
				jihualy: plan.jihualy,
				jihlxing: plan.jihlxing,
				fuzheren: plan.fuzheren,
				yonghuId: plan.yonghuId,
				jhkaissj: plan.jhkaissj
			};
	
	myGrid.loadvalue(planAjax.ds, planAjax.args, condition);
	planQuery.hide();
}

planAjax.del = function(jid){
	callSeam("d2dwork_nianjihua_NianjihuaSvr", "remove", [jid], copyMsg);
}

planAjax.copy = function(records){
	
	var plans = new Array();
	var i = 0;
	
	for (i = 0; i < records.length; i++){
		var plan = createType("com.luck.itumserv.d2dwork.nianjihua.JihuaVo");
		var record = records[i];
		
		if (record.get('jihlxing') == ""+getResource('resourceParam463')+"类"){
			plan.jihlxing = "0";
		} else if (record.get('jihlxing') == "制度类") {
			plan.jihlxing = "1";
		} else if (record.get('jihlxing') == "培训类") {
			plan.jihlxing = "2";
		} else if (record.get('jihlxing') == "管理类") {
			plan.jihlxing = "3";
		} else if (record.get('jihlxing') == ""+getResource('resourceParam513')+"类") {
			plan.jihlxing = "4";
		}

		if (record.get('jihualy') == "总行") {
			plan.jihualy = "0";
		} else if (record.get('jihualy') == "总行要求分行自主开发") {
			plan.jihualy = "1";
		} else if (record.get('jihualy') == "分行") {
			plan.jihualy = "2";
		} else if (record.get('jihualy') == "中支") {
			plan.jihualy = "3";
		}
		plan.xiangmId = record.get('xiangmId');
		plan.gulxitId = record.get('gulxitId');
		plan.yonghuId = record.get('yonghuId');
		plan.jihuamc = record.get('jihuamc');
		plan.lindaoId = record.get('fzcld');
		plan.canyuren = record.get('canyuren');
		plan.fuzheren = record.get('xmfzr');
		plan.bjiaoId = record.get('bjue');
		plan.jhkaissj = record.get('jhkaissj');
		plan.jhjiessj = record.get('jhjiessj');
		plan.sjkaissj = record.get('sjkaissj');
		plan.sjjiessj = record.get('sjjiessj');
		plan.wancjind = record.get('wancjind');
		plan.jhbeizhu = record.get('jhbeizhu');
		plan.shifouxg = "1";
		
		plans[i] = plan;
	}
	callSeam("d2dwork_nianjihua_NianjihuaSvr", "copy", [plans], copyMsg);
}

function message(isSuccess){
	if (isSuccess){
		myGrid.loadvalue(planAjax.ds, planAjax.args, planAjax.baseargs);
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1515')+'',
			buttons: Ext.MessageBox.OK
		});
		planAjax.win.hide();	
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1514')+'',
			buttons: Ext.MessageBox.OK
		});
	}
}
function copyMsg(isSuccess){
	if (isSuccess){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1515')+'',
			buttons: Ext.MessageBox.OK
		});
		
		myGrid.loadvalue(planAjax.ds, planAjax.args, planAjax.baseargs);
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1514')+'',
			buttons: Ext.MessageBox.OK
		});
	}
}
function CompareDate(d1,d2){
   return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
