var parametersUpdate = {selectDialog:null,paramsetform:null};
var tempgrid = null;

/**
 * 修改任务状态
 */
parametersUpdate.updateTaskType = function(grid){
	Ext.form.Field.prototype.msgTarget = 'title';
	var stringvalue = grid.selModel.getSelected().get('stringvalue');
	var pname = grid.selModel.getSelected().get('name');
	parametersUpdate.paramform = new Ext.FormPanel({
		labelWidth: 85, // label settings here cascade unless overridden
        frame:false,
        id:'paramform',
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 400,
        height: 350,
		defaultType: 'textfield',
		items:[
			{
				fieldLabel:''+getResource('resourceParam1258')+'',
				value:pname,
				disabled:true,
				anchor:'95%'
			},
			{
				fieldLabel:''+getResource('resourceParam1529')+'',
				value:stringvalue,
				disabled:true,
				anchor:'95%'
			},
			{
				id:'updatedvalue',
				fieldLabel:''+getResource('resourceParam1531')+'',
				name:'paramvalue',
				anchor:'95%'
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam478')+'',
				handler: function()
					{	
						var paramid = grid.selModel.getSelected().get('pid');

						var newvalue = parametersUpdate.paramform.form.findField('paramvalue').getValue();
						if(newvalue == '')
							return;
						tempgrid = grid;
						var ids = paramid + '_' + newvalue;
						callSeam("tasklist_scxzParametersService","updateParamValue",[ids],updateBack);
					}
					
			},
			{   text: ''+getResource('resourceParam6002')+'', // 取消
				handler: function(){
						parametersUpdate.updateDialog.hide();
					}
			}]	
		});
	
	
	if (!parametersUpdate.updateDialog){	
		tlework.addHtml(tlework.divHtml,"paramsets");
		parametersUpdate.updateDialog = new Ext.Window({ 
		el:'paramsets',
		title: ''+getResource('resourceParam1530')+'',
		modal:true,
		layout:'fit',
		width:300,
		height:170,
		closeAction:'hide',
		plain: false,
		items: parametersUpdate.paramform	
		});
	}
	parametersUpdate.updateDialog.show();
	parametersUpdate.updateDialog.on("hide",function(){
		parametersUpdate.updateDialog.close();
		parametersUpdate.updateDialog.destroy();		
		parametersUpdate.updateDialog = null;
	});
};

var updateBack = function(response){
	if(response == 'sucess'){
//		Ext.MessageBox.alert('信息', '修改成功');
		parametersUpdate.updateDialog.hide();
		tempgrid.store.load();
	}else{
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam572')+'');
	}
}
