/**
 * 任务问题
 */
var issueMain = {issuegrid:null,showDialog:null,taskData:null,
				args:{start:0,limit:25},baseargs:null};

issueMain.init = function(_taskid,_chargedmanid,_chargeddepid,_isaofo){ 
	issueMain.taskData = {
		taskid:_taskid,
		issuedmanid:_chargedmanid,
		chargeddepid:_chargeddepid,
		isaofo:_isaofo
	}
	issueMain.baseargs = {
		taskid:issueMain.taskData.taskid,
		isaofo:issueMain.taskData.isaofo
	}
 
	issueMain.issuegrid = issueGrid.grid();
	if (!issueMain.showDialog){				
		tlework.addHtml(tlework.divHtml,'issueMain');			//动态生成需要绑定的div
		issueMain.showDialog = new Ext.Window({ 				//创建对话框
		el:'issueMain',
		title: ''+getResource('resourceParam1605')+'',
		modal: true,
		layout:'border',
		width:800,
		height:400,
		closeAction:'hide',
		plain: false,
		items:[issueMain.issuegrid],
		buttons: [
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
					issueMain.showDialog.hide();	
			}
		}]
		});
	}
	
	issueMain.issuegrid.on('rowdblclick',function(){
		issueShow.init();
	});
	issueMain.showDialog.show();
	myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,issueMain.baseargs);
	issueMain.showDialog.on("hide",function(){
		issueMain.showDialog.close();
		issueMain.showDialog.destroy();		
		issueMain.showDialog = null;
		
	});
	if(renwukbnMain.baseargsfz.fanwei=="dep" ||renwukbnMain.baseargsfz.fanwei=="dep"){
		//getTopToolbar
		issueGrid.zengjia.setDisabled(true);
	}
}
