var conferenceFromUpdate = {
	issueDialog : null,
	form : null,
	temp : null,
	depid : null
};

departmentUser.department(''+ getResource('resourceParam1215') + '');
departmentUser.departmentCombo.anchor = '98%';
departmentUser.departmentCombo.setWidth(700);
departmentUser.departmentCombo.allowBlank = false;
departmentUser.departmentCombo.invalidText=getResource('resourceParam7106')+getResource('resourceParam1215');


var deptID = null;
departmentUser.departmentCombo.on('afterrender',function(){
       Seam.Component.getInstance("common_inst_InstSelectSvr").getDepartmentID('all',
			function(dept){
				deptID = dept;
			});
});
var ff = function(arrId, pos, dest){
		var node = departmentUser.treePanel.getNodeById(arrId[pos]);
		if (node) {
			node.expand(false, false, function(node){
				var tmpNode = departmentUser.treePanel.getNodeById(dest);
				if (tmpNode) {
					tmpNode.select();
				} else {
					ff(arrId, (pos + 1), dest);
				}
			});
		}
	}
departmentUser.departmentCombo.on('expand', function() {
	       departmentUser.treePanel.on('expandnode', function(node) {
				var arr = deptID.split('/');
				var dest = arr[arr.length - 1];
				arr.length = arr.length - 1;
				ff(arr, 0, dest);
		       });
		});
			
var conferenceFromPanel = {
	isUpdate : false,
	init : function (){
		var formPanel = new Ext.form.FormPanel({
			    id : 'news_form_panel',
			    hidden : true,
				frame : true,
				fit : true,
				plain : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent;',
				items : [{
					fieldLabel : getResource('resourceParam1216') + '', // 文本框
					id : 'textfield',
					name : 'title',
					xtype : 'textfield',
					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
					regexText : ''+getResource('resourceParam1092')+'！',
					invalidText : getResource('resourceParam1212') + '',
					maxLength : 50,
					maxLengthText : getResource('resourceParam1210') + '',
					allowBlank : false,
					anchor : '98%'
				}, departmentUser.departmentCombo, {
					fieldLabel : getResource('resourceParam1217') + '', // 文本框
					id : 'place',
					name : 'place',
					xtype : 'textfield',
					invalidText : getResource('resourceParam7125') + '',
					maxLength : 25,
					maxLengthText : getResource('resourceParam1211') + '',
					allowBlank : false,
					anchor : '98%'
				}, {
					height : 25,
					layout : 'column',
					items:[{
						columnWidth : .49,
						layout : 'form',
						items : [{
							fieldLabel : getResource('resourceParam1218') + '', // 文本框
							id : 'riqi',
							name : 'riqi',
							xtype : 'datefield',
							invalidText : getResource('resourceParam7106')+getResource('resourceParam1218')+ '',
							format : 'Y-m-d',
							editable : false,
							allowBlank : false,
							anchor : '98%' //gaoyn 应用到[1509]上 2011-6-28
						}]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [{
							fieldLabel : getResource('resourceParam1219') + '', // 文本框
							id : 'shijian',
							name : 'shijian',
							xtype : 'timefield',
							invalidText : getResource('resourceParam7106')+getResource('resourceParam1219')+ '',
							format : 'G:i',
							editable : false,
							allowBlank : false,
							anchor : '100%'
						}]
					}]}, {
						xtype:'label',fieldLabel:'会议内容'
					}, {id : 'richEditor'}
				],
				//bug:812 防止重复提交
				//gaoyn 2011-5-25
				buttons:[{id:'save', text:'保存', disabled:false,handler:function(){
						
					if(Ext.getCmp('save').disabled==false){
						
					    if(conferenceFromPanel.isUpdate){
					    	if (formPanel.getForm().isValid()) {
					    			var appVo = Seam.Remoting.createType("com.luck.itumserv.conference.MeetingsVo");
						            appVo.setId(myGrid.row.get("id"));
									appVo.setTitle(formPanel.getForm().getValues().title);
									appVo.setOrganizer(departmentUser.codeid);
									appVo.setPlace(formPanel.getForm().getValues().place);
									appVo.setRiqi(formPanel.getForm().getValues().riqi);
									appVo.setShijian(formPanel.getForm().getValues().shijian);
									var content=FCKeditorAPI.GetInstance("dictContent");
									appVo.content=content.GetXHTML(true);
									if(appVo.content==""){
									Ext.Msg.alert("提示","会议内容不能为空!");
									return;
								}
								Ext.getBody().mask("正在保存会议，请稍后...","x-mask-loading");
									Ext.getCmp('save').setDisabled (true);
									callSeam("meetings_meetingssvr", "conferenceUpdate", [appVo],
											function(result){
												Ext.getBody().unmask();
												var obj = Ext.util.JSON.decode(result);
												Ext.getCmp('save').setDisabled(false);
												if(true==obj.success){
														Ext.example.msg(
													"" + getResource('resourceParam575')
															+ "",
													"" + getResource('resourceParam1072')
															+ "");
															conferenceMain.cardpanel.getLayout().setActiveItem(0);
															//bug:879 gaoyn 2011-5-26 16:26	
													 		var ds = Ext.getCmp("conferenceGridPanel").getStore();
													 			ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null,
																		        start : 0,
																				limit : 25
																			 };
																		 });
																ds.load();
												}else{
														Ext.Msg.show({
																title : '提示',
																msg : 'error',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
												}
												conferenceFromPanel.isUpdate = false;
												Ext.getCmp('news_form_panel').form.reset();
												FCKeditorAPI.GetInstance("dictContent").SetHTML("");
												Ext.getCmp("conferenceGridPanel").selModel.clearSelections();
									});
								}
					    }else{
								if(formPanel.getForm().isValid()){
								var vo = Seam.Remoting.createType("com.luck.itumserv.conference.MeetingsVo");
								vo.setTitle(formPanel.getForm().getValues().title);
								vo.setOrganizer(departmentUser.codeid);
								vo.setPlace(formPanel.getForm().getValues().place);
								vo.setRiqi(formPanel.getForm().getValues().riqi);
								vo.setShijian(formPanel.getForm().getValues().shijian);
								var content=FCKeditorAPI.GetInstance("dictContent");
								vo.content=content.GetXHTML(true);
								if(vo.content==""){
									Ext.Msg.alert("提示","会议内容不能为空!");
									return;
								}
								Ext.getBody().mask("正在保存会议，请稍后...","x-mask-loading");
								Ext.getCmp('save').setDisabled (true);
								callSeam("meetings_meetingssvr",
											"conferenceAdd", [vo], function(result) {
												Ext.getBody().unmask();
												var obj = Ext.util.JSON.decode(result);
												Ext.getCmp('save').setDisabled(false);
												if(true==obj.success){
														Ext.example.msg(
													"" + getResource('resourceParam575')
															+ "",
													"" + getResource('resourceParam1072')
															+ "");
															conferenceMain.cardpanel.getLayout().setActiveItem(0);
															//bug:879 gaoyn 2011-5-26 16:26	
													 		var ds = Ext.getCmp("conferenceGridPanel").getStore();
													 			ds.on('beforeload', function() {
																			 ds.baseParams = {
																			 	typeid : null,
																		        title : null,
																		        start : 0,
																				limit : 25
																			 };
																		 });
																ds.load();
												}else{
														Ext.Msg.show({
																title : '提示',
																msg : 'error',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
												}
												Ext.getCmp('news_form_panel').form.reset();
												FCKeditorAPI.GetInstance("dictContent").SetHTML("");
												
											});
								}
			     			}
						}
				
				}},{text:'返回',handler:function(){
					   if(formPanel.getForm().getValues()){
					   		Ext.getCmp('news_form_panel').form.reset();
					   	    FCKeditorAPI.GetInstance("dictContent").SetHTML("");
					   }
					   conferenceMain.cardpanel.getLayout().setActiveItem(0);
				}}]
		});
		return formPanel;
	}
};

/**
 * 会议更新
 * @return {Boolean}
 */
conferenceFromUpdate.init = function() {
	myGrid.row = Ext.getCmp('conferenceGridPanel').selModel.getSelected();
	if (myGrid.row == null || conferenceGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam1232') + '!',
					width : 250,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	conferenceFromPanel.isUpdate = true;
	if(myGrid.row.get('isarchived') == 1){//判断已发布的会议
		Ext.MessageBox.confirm("信息提示","您选择的会议已发布，如果修改将自动取消发布，是否进行修改？",function(btn){
		     if(btn == 'yes'){
		     	    var appId = myGrid.row.get('id');
		     	    callSeam("meetings_meetingssvr", "meetingSend", [appId],function(result){
								var sign = result;
								if (sign == "true") {
								  	conferenceMain.setActiveItem(1,myGrid.row);
								} else {
									Ext.MessageBox.show({
												title : getResource('resourceParam651') + '',
												msg : sign,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											})
								}
		     	    });
		     		
		     }
		}).getDialog().setWidth(300);
	}else{
		conferenceMain.setActiveItem(1,myGrid.row);
	}
}