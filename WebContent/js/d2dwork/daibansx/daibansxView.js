/**
 * 待办事项详细
 */
var daibansxView = {showDialog:null,showForm:null,neirtext:null};

daibansxView.init = function(daibsxid){
	Ext.Ajax.request({
		url: "../data/d2dwork/d2dwork_daibansx_DaibanSXSvr_getDaibansxById.text",
		success: daibansxView.getdialog,
		disableCaching: true,
		autoAbort: true
	});
}
daibansxView.getdialog=function(response){
	daibansxView.sign = Ext.util.JSON.decode(response.responseText);
	
	tlework.addHtml(tlework.divHtml,'daibansxView');
	if(!daibansxView.showDialog){
		daibansxView.showDialog = new Ext.Window({
			el:'daibansxView',
			title: ''+getResource('resourceParam729')+''+getResource('resourceParam508')+'',
           	layout:'fit',
			modal:true,
           	width:700,
           	autoScroll:true,
           	height:430,
           	closeAction:'hide',
           	plain: false,
			items:[daibansxView.getshowForm()]
		})
	}
	
	daibansxView.showDialog.show();
	daibansxView.neirtext.setValue(daibansxView.sign.dbsxneir);
	daibansxView.showDialog.on("hide",function(){
		daibansxView.showDialog.close();
		daibansxView.showDialog.destroy();		
		daibansxView.showDialog = null;
		
	}
	);
}

daibansxView.getshowForm = function(){

	daibansxView.neirtext = new Ext.form.TextArea({
						// text : 9036--事项    9042--内容
						fieldLabel: '' + getResource('resourceParam9036') + '' + getResource('resourceParam9042') + '',
						id:'dbsxneir',
						name: 'dbsxneir',
						style:'border:0px;background:transparent;',
						readOnly:true,
						//fieldClass:'areareadonly',
						grow:true,
						growMin:30,
						preventScrollbars:true,
						value:daibansxView.sign.dbsxneir,
						anchor:'96%'
				});
	daibansxView.dbsxcljg = new Ext.form.TextArea({
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam1243')+'',
						name: 'dbsxcljg',
						tabIndex:3,
						//cls:'readonly',
						value:daibansxView.sign.dbsxcljg,
						style:'border:0px;background:transparent;',
						readOnly:true,
						//fieldClass:'areareadonly',
						grow:true,
						growMin:30,
						preventScrollbars:true,
						anchor:'96%'
				});
	daibansxView.showForm = new Ext.FormPanel({

		labelAlign:'right',
        plain: false,
		frame:true,
		autoScroll:true,
		
		bodyStyle:'padding:5px 5px 0',
		labelWidth:80,
		items:[{
            layout:'column',
			items:[{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[
				{
						inputType:'hidden',
						id:'daibsxid',
						name: 'daibsxid',
						width:175,
						value:daibansxView.sign.daibsxid
				},
				{
						inputType:'hidden',
						id:'dbsxleix',
						name: 'dbsxleix',
						width:175,
						value:daibansxView.sign.dbsxleix
				},
				{
						inputType:'hidden',
						id:'dbsxcans',
						name: 'dbsxcans',
						width:175,
						value:daibansxView.sign.dbsxcans
				},
				{
						inputType:'hidden',
						id: 'dbsxcksj',
						name: 'dbsxcksj',
						value:daibansxView.sign.dbsxcksj,
						anchor:'95%'
				},
				{
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam504')+'',
						name:'daibsxbt',
						width:175,
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.daibsxbt,
						anchor:'95%'
				}]			
			},{
                columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam481')+'',
						name: 'leixstr',
						width:175,
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.leixstr,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam1236')+'',
						name: 'fqrname',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.fqrname,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam603')+'',
						name: 'jsrname',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.jsrname,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam512')+''+getResource('resourceParam510')+''+getResource('resourceParam482')+''+getResource('resourceParam1238')+'',
						name: 'sfyunxzf',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.zfstr,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项    9043--人
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam1238')+'' + getResource('resourceParam9043') + '',
						name: 'zfrname',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.zfrname,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9044--担任
						fieldLabel: '' + getResource('resourceParam9044') + ''+getResource('resourceParam803')+'',
						name: 'jsestr',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.jsestr,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项
						fieldLabel: '' + getResource('resourceParam9036') + ''+getResource('resourceParam500')+'',
						name: 'dbsxztai',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.ztaistr,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项    9045--生成
						fieldLabel: '' + getResource('resourceParam9036') + '' + getResource('resourceParam9045') + ''+getResource('resourceParam988')+'',
						id: 'dbsxscsj',
						name: 'dbsxscsj',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.dbsxscsj,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						// text : 9036--事项    9046--紧急程度
						fieldLabel: '' + getResource('resourceParam9036') + '' + getResource('resourceParam9046') + '',
						name: 'jinjstr',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.jinjstr,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam1241')+'',
						name: 'dbsxyjks',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.dbsxyjks,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam1242')+'',
						name: 'dbsxyjjs',
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.dbsxyjjs,
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
                
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam856')+'',
						id: 'dbsxsjks',
						name: 'dbsxsjks',
						tabIndex:1,
						format:'Y/m/d' ,
						cls:'readonly',
						readOnly:true,
						value:daibansxView.sign.dbsxsjks,
						/*validator:function(){
								var dbsxsjks = daibansxView.showForm.findById('dbsxsjks');
								var dbsxscsj = daibansxView.showForm.findById('dbsxscsj');
								var dbsxcksj = daibansxView.showForm.findById('dbsxcksj');
								if(dbsxsjks.value < dbsxscsj.value){
									dbsxsjks.invalidText = '开始时间不能早于生成时间';	
									dbsxsjks.focus();
									return false;
								}else if(dbsxsjks.value < dbsxcksj.value){
									dbsxsjks.invalidText = '开始时间不能早于激活时间';	
									dbsxsjks.focus();
									return false;
								}else{
									return true;
								}
						},*/
						anchor:'95%'
				}]
			},{columnWidth:.5,
                layout: 'form',
				defaultType: 'textfield',
				items:[{
						fieldLabel: ''+getResource('resourceParam992')+'',
						id: 'dbsxsjjs',
						name: 'dbsxsjjs',
						tabIndex:2,
						cls:'readonly',
						readOnly:true,
						format:'Y/m/d' ,
						validationEvent :true,
						value:daibansxView.sign.dbsxsjjs,
						/*validator:function(){
								var dbsxsjks = daibansxView.showForm.findById('dbsxsjks');
								var dbsxsjjs = daibansxView.showForm.findById('dbsxsjjs');
								if(dbsxsjks.value > dbsxsjjs.value){
									dbsxsjjs.invalidText = '结束时间不能早于开始时间';	
									dbsxsjks.focus();
									return false;
								}else{
									return true;
								}
						},*/
						anchor:'95%'
				}]
			},{columnWidth:1,
                layout: 'form',
				defaultType: 'textarea',
				items:[daibansxView.neirtext]
			},{columnWidth:1,
                layout: 'form',
				defaultType: 'textarea',
				
				items:[daibansxView.dbsxcljg]
			}]
		}],									
		buttons: [
			
			{   text: '' + getResource('resourceParam9002') + '', // text : 取消
				handler: function(){
					daibansxView.showDialog.hide();	
			}
		}]	
	});				
	return daibansxView.showForm;
};
