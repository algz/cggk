var huiyijiyRemove = {};

huiyijiyRemove.init = function(btn,pressed){
	if(myGrid.row == null){
		Ext.MessageBox.show({
			title:''+getResource('resourceParam744')+'',
			msg:'请先选中一个要'+getResource('resourceParam475')+'的'+getResource('resourceParam736')+'纪要！',
			buttons:Ext.MessageBox.OK
		});
	}else{
			var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam575')+'',''+getResource('resourceParam475')+'的'+getResource('resourceParam736')+'纪要将无法恢复，你'+getResource('resourceParam479')+'要'+getResource('resourceParam475')+'？',huiyijiyRemove.cofirm)
		 }
}
huiyijiyRemove.delreturn = function(response, opt){

	if (response){
		myGrid.row = null;
		Ext.MessageBox.show({
			title:'操作成功',
			msg:'你'+getResource('resourceParam503')+'的'+getResource('resourceParam736')+'纪要'+getResource('resourceParam509')+'经成功'+getResource('resourceParam475')+'！',
			buttons:Ext.MessageBox.OK
		})
	
	}else{
		Ext.MessageBox.show({
			title:''+getResource('resourceParam651')+'',
			msg:'你'+getResource('resourceParam503')+'的'+getResource('resourceParam736')+'纪要没有被成功'+getResource('resourceParam475')+'，请重新操作！',
			buttons:Ext.MessageBox.OK
		})
	}
	myGrid.loadvalue(huiyijiy.grid.store,{start:0,limit:25},huiyijiy.baseargs);
}

huiyijiyRemove.cofirm = function(btn,text){
			if(btn == 'yes'){
					var huiyijiyId = myGrid.row.get('huiyjyId');
					Seam.Component.getInstance 
					("d2dwork_huiyijiy_HuiyijiyService").removeHuiyijiy(huiyijiyId,huiyijiyRemove.delreturn);
				
			}
}
