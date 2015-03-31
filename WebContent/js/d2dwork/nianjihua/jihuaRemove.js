var planDel = {};

planDel.init = function(){
	if (!planOther.sm.hasSelection()){
		Ext.MessageBox.show({
			title: ''+getResource('resourceParam575')+'',
			msg: ''+getResource('resourceParam1523')+'',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING
		});
	}else{
		Ext.MessageBox.confirm(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1522')+"", function(btn, text){
			if (btn == "yes"){
				//从grid上删除行
				var records = planOther.sm.getSelections();
				var jid = new Array();
				var i;
				
				for (i = 0; i < records.length; i++){
					jid[i] = records[i].get('jihuaId');
				}				
				//从数据库中删除该行记录
				planAjax.del(jid);
			}
		});
	}
}
