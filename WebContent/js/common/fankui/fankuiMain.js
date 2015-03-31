var fankuiMain = {
	win:null,
	grid:null,
	ds:null,
	args:null,
	baseargs:null,
	row:null
}
 
fankuiMain.closeWin = function() {
	if(fankuiMain.win != null) {
		fankuiMain.win.close();
	}
}

fankuiMain.initWin = function() {
	fankuiMain.win = new Ext.Window({
		title:''+getResource('resourceParam970')+'',
		width:580,
	   	height:440,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit',
		buttons:[{
			text:''+getResource('resourceParam969')+'',
			handler:fankuiMain.closeWin
		}]
	});
	fankuiMain.win.on('hide',fankuiMain.closeWin);
}

//chakanlx是0时,反馈界面查看类型,为工作或项目安排者查看权限,反馈信息界面有查看，显示未反馈者工具条
//chakanlx是1时,反馈界面查看类型,为工作或项目接受者查看权限,反馈信息界面有增加，修改，删除，查看工具条
//glianId,为关联表ID,由fankuilx决定关联的表
//fankuilx,反馈类型,fankuilx为0时为工作安排,fankuilx为1时为项目管理
fankuiMain.init = function(chakanlx, glianId, fankuilx) {
	fankuiUI.initGrid(chakanlx, glianId, fankuilx);
	fankuiMain.initWin();
	fankuiMain.win.add(fankuiUI.grid);
	fankuiMain.win.show();
}
