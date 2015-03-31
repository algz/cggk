var paramsetUpdate = {selectDialog:null,paramsetform:null};
var tempgrid = null;

/**
 * 修改任务状态
 */
paramsetUpdate.updateTaskType = function(grid){
	/**
	 * 定义错误提示显示位置
	 * qtip		当鼠标移动到控件上面时显示提示
	 * under	在控件的底下显示错误提示
	 * side		在控件右边显示一个错误图标，鼠标指向图标时显示错误提示
	 * [element id]	错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'title';
	var taskid = grid.selModel.getSelected();
	if(!taskid){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam1527')+'');
		return;
	}
	var paramkey = grid.selModel.getSelected().get('paramkey');
	var paramvalue = grid.selModel.getSelected().get('paramvalue');
	var regexcon = '';
	if(paramkey == ''+getResource('resourceParam1528')+'')
		regexcon = /^[1-9]{1,1}[0-9]{0,1}$/;
	paramsetUpdate.paramsetform = new Ext.FormPanel({
		labelWidth: 85, // label settings here cascade unless overridden
        frame:false,
        id:'paramsetform',
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
        height: 170,
		defaultType: 'textfield',
		items:[
			{
				fieldLabel:''+getResource('resourceParam1258')+'',
				value:paramkey,
				disabled:true,
				anchor:'95%'
			},
			{
				fieldLabel:''+getResource('resourceParam1529')+'',
				value:paramvalue,
				disabled:true,
				anchor:'95%'
			},
			{
				id:'updatedvalue',
				fieldLabel:''+getResource('resourceParam1531')+'',
				regex:regexcon,
				regexText:''+getResource('resourceParam1526')+'',
				name:'paramvalue',
				anchor:'95%'
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam478')+'',
				handler: function()
					{	
						if(!paramsetUpdate.paramsetform.form.findField('paramvalue').validate())
							return;
						var paramid = grid.selModel.getSelected().get('paramid');
//						var paramsetVo = Seam.Remoting.createType("com.luck.itumserv.paramset.ParamsetVo");
//						Ext.apply(paramsetVo,paramsetUpdate.paramsetform.form.getValues());
//						if(!paramsetVo)
//							return;
//						var newvalue = paramsetVo.paramvalue;
						
						var newvalue = paramsetUpdate.paramsetform.form.findField('paramvalue').getValue();
						if(newvalue == '')
							return;
						tempgrid = grid;
						var ids = paramid + '_' + newvalue;
						callSeam("paramset_ParamsetSvr","updateParamValue",[ids],updateBack);
					}
					
			},
			{   text: '取消',
				handler: function(){
						paramsetUpdate.updateDialog.hide();
					}
			}]	
		});
	
	
	if (!paramsetUpdate.updateDialog){	
		tlework.addHtml(tlework.divHtml,"paramset");
		paramsetUpdate.updateDialog = new Ext.Window({ 
		el:'paramset',
		title: ''+getResource('resourceParam1530')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:170,
		closeAction:'hide',
		plain: false,
		items: paramsetUpdate.paramsetform	
		});
	}
	paramsetUpdate.updateDialog.show();
	paramsetUpdate.updateDialog.on("hide",function(){
		paramsetUpdate.updateDialog.close();
		paramsetUpdate.updateDialog.destroy();		
		paramsetUpdate.updateDialog = null;
	});
	paramsetUpdate.paramsetform.items.itemAt(2).focus();
	Ext.get('updatedvalue').focus();
};

var updateBack = function(response){
	if(response == 'sucess'){
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam677')+'');
		paramsetUpdate.updateDialog.hide();	
		var lop = tempgrid.store.lastOptions;
		paramsetMain.args.start = lop.params.start;
		paramsetMain.args.limit = lop.params.limit;
		myGrid.loadvalue(tempgrid.store,paramsetMain.args,null);
	}else{
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam572')+'');
	}
}
