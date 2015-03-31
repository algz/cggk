var baowenDel = {};

baowenDel.week_init = function(){
	if (!baowenOther.sm_week.hasSelection()){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1697')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		Ext.MessageBox.confirm(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1522')+"", function(btn, text){
			if (btn == "yes"){
				//从grid上删除行
				var records = baowenOther.sm_week.getSelections();
				var jid = new Array();
				
				for (i = 0; i < records.length; i++){
					jid[i] = records[i].get('zoubaoId');
				}				
				//从数据库中删除该行记录
				baowenAjax.del(jid, "0");
			}
		});
	}
}

baowenDel.month_init = function(){
	if (baowenOther.sm_month.getSelected() == null){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1697')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		Ext.MessageBox.confirm(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1522')+"", function(btn, text){
			if (btn == "yes"){
				//从grid上删除行
				var records = baowenOther.sm_month.getSelections();
				var jid = new Array();
				var i;
				
				for (i = 0; i < records.length; i++){
					jid[i] = records[i].get('zoubaoId');
				}				
				//从数据库中删除该行记录
				baowenAjax.del(jid, "1");
			}
		});
	}
}
