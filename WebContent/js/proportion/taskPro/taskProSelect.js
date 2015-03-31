
var taskProSelect = {selectDialog:null,taskProform:null,sel:false};

/**
 * 查询任务类型权重
 */
taskProSelect.init = function(){   
	
	if (!taskProSelect.selectDialog){	
		tlework.addHtml(tlework.divHtml,"taskProselect");
		taskProSelect.selectDialog = new Ext.Window({ 
		el:'taskProselect',
		title: ''+getResource('resourceParam652')+''+getResource('resourceParam1043')+'权重'+getResource('resourceParam508')+'',
		modal: true,
		layout:'fit',
		width:300,
		height:140,
		closeAction:'hide',
		plain: false,
		items: taskProSelect.selecttaskProform()						
		});
	}
	taskProSelect.selectDialog.show();
	taskProSelect.selectDialog.on("hide",function(){
		taskProSelect.selectDialog.close();
		taskProSelect.selectDialog.destroy();		
		taskProSelect.selectDialog = null;
		
	});
};

/**
 * 生成查询任务类型权重的Form面板
 */
taskProSelect.selecttaskProform = function(){
	taskProSelect.taskProform = new Ext.FormPanel({

		labelWidth: 75, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
        width: 350,
		defaults: {width: 230},
		defaultType: 'textfield',
		items:[
			{	
				xtype:'combo',
				width:175,
				store:new Ext.data.Store( {
						proxy : new Ext.data.HttpProxy( {
							url : "../JSON/tasklist_taskService.getSelectCombo"
						}),
						reader : new Ext.data.JsonReader( {
							totalProperty : 'totalProperty',
							root : 'results'
						}, [ {
							name : 'taskcategoryname'
						},{
							name : 'taskcategoryid'		
						}])
					}),
			
				valueField :"taskcategoryid",
				displayField: "taskcategoryname",
				mode: 'remote',
				forceSelection: true,
				hiddenName:'taskcategoryid',
				editable: false,
				triggerAction: 'all',
				fieldLabel: ''+getResource('resourceParam1853')+'',
				name: 'taskcategoryid'
			},
			{	fieldLabel: ''+getResource('resourceParam1851')+'',
				name: 'projectname',
				width:175
			}],										
		buttons: [
			{	text: ''+getResource('resourceParam652')+'',
				handler: function()
					{		
						var taskProVo = Seam.Remoting.createType("com.luck.itumserv.proportion.taskPro.TaskProVo");
						Ext.apply(taskProVo,taskProSelect.taskProform.getForm().getValues());
						taskProMain.baseargs={
							taskcategoryid:taskProVo.getTaskcategoryid(),
							projectname:taskProVo.getProjectname()
						}
						myGrid.loadvalue(taskProMain.taskProgrid.store,taskProMain.args,taskProMain.baseargs);
						taskProSelect.sel=true;
						taskProSelect.selectDialog.hide();
					}
					
			},
			{   text: '取消',
				handler: function(){
						taskProSelect.selectDialog.hide();
					}
			}]	
		});				
		return taskProSelect.taskProform;
};
