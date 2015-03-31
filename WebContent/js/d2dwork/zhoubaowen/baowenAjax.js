var baowenAjax = {args:{start: 0,limit: 20},baseargs:null};

//周grid的ds初始化
baowenAjax.ds_week_init = function(url){	
	Ext.QuickTips.init();
	baowenAjax.ds_week = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: url}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalProperty',
			root: 'results'
		},[
			{name: 'zoubaobz'},
			{name: 'mingchen'},
			{name: 'xiangmlx'},
			{name: 'xmufuzer'},
			{name: 'fuzekesh'},
			{name: 'gzmubiao'},
			{name: 'ztigzjih'},
			{name: 'zhuycjry'},
			{name: 'bwanchqk'},
			{name: 'xwanchqk'},
			{name: 'zongtijd'},
			{name: 'shifouxg'},
			{name: 'zoubaoId'},
			{name: 'zoubaolx'},
			{name: 'cunzaiwt'},
			{name: 'zoubkssj'},
			{name: 'zoubjssj'},
			{name: 'tianbsj'},
			{name: 'yonghuId'},
			{name: 'beizhu'},
			{name: 'xmfzr'}
		])
	});
}
//月grid的ds初始化
baowenAjax.ds_month_init = function(url){	
	Ext.QuickTips.init();
	baowenAjax.ds_month = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({url: url}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalProperty',
			root: 'results'
		},[
			{name: 'zoubaobz'},
			{name: 'mingchen'},
			{name: 'fuzekesh'},
			{name: 'gzmubiao'},
			{name: 'zhuycjry'},
			{name: 'bwanchqk'},
			{name: 'shifouxg'},
			{name: 'zoubaoId'},
			{name: 'zoubaolx'},
			{name: 'xwanchqk'},
			{name: 'zoubkssj'},
			{name: 'zoubjssj'},
			{name: 'tianbsj'},
			{name: 'cunzaiwt'},
			{name: 'beizhu'},
			{name: 'yonghuId'}
		])
	});
}

baowenAjax.add = function(baowenForm, baowenType, winAdd){
	if (baowenForm.form.isValid()){
		var processPtn = /^\d+(\.\d+)?$/;
		baowenAjax.win = winAdd;
		
		if (baowenForm.form.findField('zongtijd') != null){
			var process = baowenForm.form.findField('zongtijd').getValue();
			if (processPtn.test(process)){
				if (process > 100){
					Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1510')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else{
					save(baowenForm, baowenType);
				}
			}else if (process == ""){
				save(baowenForm, baowenType);	
			}else{
				Ext.MessageBox.show({
					title: ''+getResource('resourceParam575')+'',
					msg: ''+getResource('resourceParam1509')+'',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			}
		}else{
			save(baowenForm, baowenType);
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

baowenAjax.update = function(baowenForm, baowenType, winUpdate, baowenId){
	if (baowenForm.form.isValid()) {
		baowenAjax.win = winUpdate;
		
		var processPtn = /^\d+(\.\d+)?$/;
		if (baowenForm.form.findField('zongtijd') != null){
			var process = baowenForm.form.findField('zongtijd').getValue();
			if (processPtn.test(process)){
				if (process > 100){
					Ext.MessageBox.show({
						title: ''+getResource('resourceParam575')+'',
						msg: ''+getResource('resourceParam1510')+'',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.WARNING
					});
				}else{
					remark(baowenForm, baowenType, baowenId);
				}
			}else if (process == ""){
				remark(baowenForm, baowenType, baowenId);	
			}else{
				Ext.MessageBox.show({
					title: ''+getResource('resourceParam575')+'',
					msg: ''+getResource('resourceParam1509')+'',
					buttons: Ext.MessageBox.OK,
					icon: Ext.MessageBox.WARNING
				});
			}
		}else{
			remark(baowenForm, baowenType, baowenId);
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

baowenAjax.query = function(baowenForm, baowenType){
	var baowen = createType("com.luck.itumserv.d2dwork.zhoubaowen.ZhoubaoAddVo");
	Ext.apply(baowen, baowenForm.form.getValues());
	var condition = {
		type: '3',
		zoubaolx: baowenType,
		mingchen: baowen.mingchen,
		xiangmlx: baowen.xiangmlx,
		xmufuzer: baowen.xmufuzer,
		zoubaobz: baowen.zoubaobz,
		yonghuId: baowen.yonghuId,
		zoubkssj: baowen.zoubkssj
	};
	
	if (baowenType == "0"){
		myGrid.loadvalue(baowenAjax.ds_week, baowenAjax.args, condition);
	}else{
		myGrid.loadvalue(baowenAjax.ds_month, baowenAjax.args, condition);	
	}
	baowenQuery.hide();
}

baowenAjax.del = function(bid, baowenType){
	baowenAjax.type = baowenType;
	callSeam("d2dwork_zhoubaowen_ZhoubaowenSvr", "remove", [bid], copyMsg);
}

baowenAjax.copy = function(records, baowenType){
	baowenAjax.type = baowenType;
	var baowens = new Array();
	var i = 0;
	
	for (i = 0; i < records.length; i++){
		var baowen = createType("com.luck.itumserv.d2dwork.zhoubaowen.ZhoubaoAddVo");
		var record = records[i];
		
		if (record.get('zoubaobz') == ""+getResource('resourceParam1687')+""){
			baowen.zoubaobz = "0";
		}else if (record.get('zoubaobz') == ""+getResource('resourceParam1688')+""){
			baowen.zoubaobz = "1";
		}else if (record.get('zoubaobz') == ""+getResource('resourceParam1689')+""){
			baowen.zoubaobz = "2";
		}else{
			baowen.zoubaobz = record.get('zoubaobz');
		}
		if (record.get('xiangmlx') == getResource('resourceParam6009')+""){ // 总行
			baowen.xiangmlx = "0";
		}else if (record.get('xiangmlx') == getResource('resourceParam6011')+""){ // 分行
			baowen.xiangmlx = "1";
		}
		else if (record.get('xiangmlx') == getResource('resourceParam6012')+""){ // 中支
			baowen.xiangmlx = "2";
		}
		else if (record.get('xiangmlx') == getResource('resourceParam6010')+""){ // 总行要求分行自主开发
			baowen.xiangmlx = "3";
		}else{
			baowen.xiangmlx = record.get('xiangmlx');
		}
		if (record.get('zoubaolx') == ""+getResource('resourceParam463')+getResource('resourceParam6013')+""){ // 类
			baowen.zoubaolx = "0";
		}else{
			baowen.zoubaolx = "1";
		}
		baowen.fuzekesh = record.get('fuzekesh');
		baowen.mingchen = record.get('mingchen');
		baowen.gzmubiao = record.get('gzmubiao');
		baowen.ztigzjih = record.get('ztigzjih');
		baowen.xmufuzer = record.get('xmfzr');
		baowen.zhuycjry = record.get('zhuycjry');
		baowen.bwanchqk = record.get('bwanchqk');
		baowen.xwanchqk = record.get('xwanchqk');
		baowen.zongtijd = record.get('zongtijd');
		baowen.beizhu = record.get('beizhu');
		baowen.zoubkssj = record.get('zoubkssj');
		baowen.zoubjssj = record.get('zoubjssj');
		baowen.tianbsj = record.get('tianbsj');
		baowen.yonghuid = record.get('yonghuid');
		baowen.cunzaiwt = record.get('cunzaiwt');
		baowen.shifouxg = "1";
		
		baowens[i] = baowen;
	}
	callSeam("d2dwork_zhoubaowen_ZhoubaowenSvr", "copy", [baowens], copyMsg);
}

function message(isSuccess){
	if (isSuccess){
		if (baowenAjax.type == "0"){
			baowenAjax.baseargs = {
				type:'0'
			}
			myGrid.loadvalue(baowenAjax.ds_week, baowenAjax.args, baowenAjax.baseargs);
		}else{
			baowenAjax.baseargs = {
				type:'1'
			}
			myGrid.loadvalue(baowenAjax.ds_month, baowenAjax.args, baowenAjax.baseargs);
		}	
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1515')+'',
			buttons: Ext.MessageBox.OK
		});
		baowenAjax.win.hide();
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
		if (baowenAjax.type == "0"){
			baowenAjax.baseargs = {
				type:'0'
			}
			myGrid.loadvalue(baowenAjax.ds_week, baowenAjax.args, baowenAjax.baseargs);
		}else{
			baowenAjax.baseargs = {
				type:'1'
			}
			myGrid.loadvalue(baowenAjax.ds_month, baowenAjax.args, baowenAjax.baseargs);
		}
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1515')+'',
			buttons: Ext.MessageBox.OK
		});
	}else{
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam1303')+'',
			msg: ''+getResource('resourceParam1514')+'',
			buttons: Ext.MessageBox.OK
		});
	}
}
function remark(baowenForm, baowenType, baowenId){
		baowenAjax.type = baowenType;
		var baowen = createType("com.luck.itumserv.d2dwork.zhoubaowen.ZhoubaoAddVo");
		Ext.apply(baowen, baowenForm.form.getValues());
		var beizhu;
		var ztigzjih;
		var gzmubiao;
		var cunzaiwt;
		var bwanchqk;
		var xwanchqk;
		var xmfzr;
		if (baowenType == "0"){
			xmfzr = baowenForm.form.findField('xmufuzer').getValue();
			if (xmfzr == baowenUpdate.record.get('xmufuzer')){
				baowen.xmufuzer = baowenUpdate.record.get('xmfzr');
			}
		}

		if (Ext.get('beizhu') == null) {
			beizhu = "";
		} else {
			beizhu = Ext.get('beizhu').dom.value;
		}if (Ext.get('gzmubiao') == null){
			gzmubiao = "";
		}else{
			gzmubiao = Ext.get('gzmubiao').dom.value;
		}
		if (Ext.get('cunzaiwt') == null){
			cunzaiwt = "";
		}else{
			cunzaiwt = Ext.get('cunzaiwt').dom.value;
		}
		if (Ext.get('bwanchqk') == null){
			bwanchqk = "";
		}else{
			bwanchqk = Ext.get('bwanchqk').dom.value;
		}
		if (Ext.get('xwanchqk') == null){
			xwanchqk = "";
		}else{
			xwanchqk = Ext.get('xwanchqk').dom.value;
		}
		if (Ext.get('ztigzjih') == null){
			ztigzjih = "";
		}else{
			ztigzjih = Ext.get('ztigzjih').dom.value;
		}
		
		if (baowen.zoubaobz == ""+getResource('resourceParam1687')+""){
			baowen.zoubaobz = "0";
		}else if (baowen.zoubaobz == ""+getResource('resourceParam1688')+""){
			baowen.zoubaobz = "1";
		}else if (baowen.zoubaobz == ""+getResource('resourceParam1689')+""){
			baowen.zoubaobz = "2";
		}
		if (baowen.xiangmlx == ""+getResource('resourceParam6009')){ // 总行
			baowen.xiangmlx = "0";
		}else if (baowen.xiangmlx == ""+getResource('resourceParam6011')){ // 分行
			baowen.xiangmlx = "1";
		}
		else if (baowen.xiangmlx == ""+getResource('resourceParam6012')){ // 中支
			baowen.xiangmlx = "2";
		}
		else if (baowen.xiangmlx == ""+getResource('resourceParam6010')){ // 总行要求分行自主开发
			baowen.xiangmlx = "3";
		}
		
		baowen.zoubaoId = baowenId;
		baowen.gzmubiao = gzmubiao;
		baowen.beizhu = beizhu;
	 	baowen.zoubaolx = baowenType;
		baowen.cunzaiwt = cunzaiwt;
		baowen.bwanchqk = bwanchqk;
		baowen.xwanchqk = xwanchqk;
		baowen.ztigzjih = ztigzjih;
		
		//判断日期
		if (CompareDate(baowen.zoubkssj, baowen.zoubjssj) && baowen.zoubjssj != ""){
			Ext.MessageBox.show( {
				title : ''+getResource('resourceParam575')+'',
				msg : ''+getResource('resourceParam1690')+'',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
		}else {
			callSeam("d2dwork_zhoubaowen_ZhoubaowenSvr", "update", [baowen], message);
		}
}
function save(baowenForm, baowenType){
	baowenAjax.type = baowenType;
	var baowen = createType("com.luck.itumserv.d2dwork.zhoubaowen.ZhoubaoAddVo");
	var ztigzjih;
	var beizhu;
	var gzmubiao;
	var cunzaiwt;
	var bwanchqk;
	var xwanchqk;

	if (Ext.get('ztigzjih') == null) {
		ztigzjih = null;
	} else {
		ztigzjih = Ext.get('ztigzjih').dom.value;
	}
	if (Ext.get('beizhu') == null) {
		beizhu = null;
	} else {
		beizhu = Ext.get('beizhu').dom.value;
	}
	if (Ext.get('gzmubiao') == null) {
		gzmubiao = null;
	} else {
		gzmubiao = Ext.get('gzmubiao').dom.value;
	}
	if (Ext.get('cunzaiwt') == null) {
		cunzaiwt = null;
	} else {
		cunzaiwt = Ext.get('cunzaiwt').dom.value;
	}
	if (Ext.get('bwanchqk') == null) {
		bwanchqk = null;
	} else {
		bwanchqk = Ext.get('bwanchqk').dom.value;
	}
	if (Ext.get('xwanchqk') == null) {
		xwanchqk = null;
	} else {
		xwanchqk = Ext.get('xwanchqk').dom.value;
	}
	Ext.apply(baowen, baowenForm.form.getValues());
	if (baowen.zoubaolx == ""+getResource('resourceParam463')+""+getResource('resourceParam6013')) { // 类
		baowen.zoubaolx = "0";
	} else {
		baowen.zoubaolx = "1";
	}
	baowen.gzmubiao = gzmubiao;
	baowen.ztigzjih = ztigzjih;
	baowen.beizhu = beizhu;
	baowen.zoubaolx = baowenType;
	baowen.cunzaiwt = cunzaiwt;
	baowen.bwanchqk = bwanchqk;
	baowen.xwanchqk = xwanchqk;
	
	//判断日期
	if (CompareDate(baowen.zoubkssj, baowen.zoubjssj) && baowen.zoubjssj != ""){
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam575')+'',
			msg : ''+getResource('resourceParam1690')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
	}else {
		callSeam("d2dwork_zhoubaowen_ZhoubaowenSvr", "save", [baowen], message);
	}
}
function CompareDate(d1,d2){
   return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}
