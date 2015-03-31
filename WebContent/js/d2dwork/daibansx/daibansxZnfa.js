/**
 * 待办事项转发
 */
var daibansxZnfa = {showDialog:null,showForm:null,neirtext:null};

daibansxZnfa.init = function(daibsxid){
	Ext.Ajax.request({
		url: "../data/d2dwork/d2dwork_daibansx_DaibanSXSvr_getDaibansxZnfa.text",
		success: daibansxZnfa.getdialog,
		disableCaching: true,
		autoAbort: true
	});
}
daibansxZnfa.getdialog=function(response){
	daibansxZnfa.sign = Ext.util.JSON.decode(response.responseText);
	
	tlework.addHtml(tlework.divHtml,'daibansxZnfa');
	if(!daibansxZnfa.showDialog){
		daibansxZnfa.showDialog = new Ext.Window({
			el:'daibansxZnfa',
			title: ''+getResource('resourceParam729')+''+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:300,
           	autoScroll:true,
           	height:200,
           	closeAction:'hide',
           	plain: false,
			items:[daibansxZnfa.getshowForm()]
		})
	}
	
	daibansxZnfa.showDialog.show();
	daibansxZnfa.showDialog.on("hide",function(){
		daibansxZnfa.showDialog.close();
		daibansxZnfa.showDialog.destroy();		
		daibansxZnfa.showDialog = null;
		
	}
	);
}

daibansxZnfa.getshowForm = function(){

	daibansxZnfa.dbsxcljg = new Ext.form.TextArea({
						fieldLabel: ''+getResource('resourceParam1243')+'',
						name: 'dbsxcljg',
						width:175,
						//cls:'readonly',
						value:daibansxZnfa.sign.dbsxcljg
				});
	 var combo=new Ext.form.ComboBox({
				store: new Ext.data.SimpleStore({
					fields: ["userid", "username"],
					data:daibansxZnfa.sign.users
					}),	
			
				valueField :"userid",
				displayField: "username",
				mode: 'local',
				forceSelection: true,
				// text : 9036--事项
				blankText:''+getResource('resourceParam459')+'' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				emptyText:''+getResource('resourceParam503')+'' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				hiddenName:'userid',
				value:0,
				editable: false,
				triggerAction: 'all',
				allowBlank:false,
				fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
				name: 'dbsxzfrh',
				anchor:'95%'
			});
  	combo.on('select',function(combo,record,num){
						
						
				});
	daibansxZnfa.showForm = new Ext.FormPanel({

		labelAlign:'right',
        frame:false,
        plain: false,
        bodyStyle:'padding:5px 5px 0;background:transparent',
		autoScroll:true,
		defaultType: 'textfield',
		labelWidth:80,
		items:[
			{
					inputType:'hidden',
					id:'daibsxid',
					name: 'daibsxid',
					width:175,
					value:daibansxZnfa.sign.daibsxid
			},
			{
					// text : 9036--事项
					fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam504')+'',
					name:'daibsxbt',
					width:175,
					cls:'readonly',
					readOnly:true,
					value:daibansxZnfa.sign.daibsxbt,
					anchor:'95%'
			},			
			combo,
			daibansxZnfa.dbsxcljg
			],									
			buttons: [
				{   text: ''+getResource('resourceParam1238')+'',
					handler: function(){
						daibansxZnfa.showDialog.hide();	
					}
				},
				{   text: '' + getResource('resourceParam9002') + '', // text : 取消
					handler: function(){
						daibansxZnfa.showDialog.hide();	
					}
				}
				]	
	});				
	return daibansxZnfa.showForm;
};
