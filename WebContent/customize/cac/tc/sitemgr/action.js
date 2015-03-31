
var isDocInpt = true;
var isViewList = false;
var isViewForm = false;
/** ************************方法******************************* */
/**

 * 返回录入Form
 */
var returnForm = function() {
	isViewForm = true;
	if(isDocInpt){
		return siteMgrForm.docInputForm();
	}else{
		return siteMgrForm.problemForm();
	}
	
}
var returnList = function (obj){
	isViewList = true;
	isViewForm = false;
	if(isDocInpt){
		obj.removeAll();
		obj.add(siteMgr.list.docInput());
		obj.doLayout();
//		return siteMgr.list.docInput();
	}else{
		obj.removeAll();
		obj.add(siteMgr.list.problem());
		obj.doLayout();
//		return siteMgr.list.problem();
	}
}
var getAuthor = function() {
	// 提交人
	depUser.users('提交人', '', 'author');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = false;
	return depUser.usersComb;
}

var getRecevier = function() {
	depUser.users('接收人', '', 'receiver');
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = false;
	return depUser.usersComb;
}
var getPerson = function(id,label) {
	depUser.users(label, '', id);
	depUser.usersComb.setWidth(200);
	depUser.usersComb.allowBlank = true;
	return depUser.usersComb;
}
var openDocInput = function(){
	
	isDocInpt = true;
	
	if(isViewList){
		var tab2 = Ext.getCmp('tab2');
		returnList(tab2);
	}else{
		refreshTab('tab1',returnForm());
	}
	
	
}
var openProblem = function(){
	 
	isDocInpt = false;
	if(isViewList){
		var tab2 = Ext.getCmp('tab2');
		returnList(tab2);
	}else{
		refreshTab('tab1',returnForm());
	}
	
}
var refreshTab = function(id,fun){
	var tabpanel = Ext.getCmp(id);
	tabpanel.removeAll();
	tabpanel.add(fun);
	tabpanel.doLayout();
}
var returnFindForm = function(){
	isDocInpt = true;
	if(isViewList){
		siteMgrForm.findDocInput();
	}
	

}
var updateGrid = function(grid, data, cm) {

	alert(Ext.util.JSON.encode(data));
	jsonStore.load({

				callback : function(record, options, success) {
					if (success == false) {
						Ext.Msg.buttonText.ok = "确定";
						Ext.Msg.alert("错误", "服务器查询失败，请再次尝试！");
					} else {
						Ext.MessageBox.alert("提示", "success")

					}
				}
			});
	grid.getStore().add(jsonStore.getRange());

}


