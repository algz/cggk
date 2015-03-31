var myApproveTaskPanel = {
};

myApproveTaskPanel.init = function() {	//界面布局需要重新调整一下
	
myApproveTaskPanel.stepGrid = approveFlowSteps.getGrid();//抽象出功能的界面

myApproveTaskPanel.approvalObjectGrid = approvalObjectGrid.getGrid();

myApproveTaskPanel.approveForm = new Ext.FormPanel({
		labelWidth: 100, // label settings here cascade unless overridden
        frame:false,
        plain: false,
        height: 350,
        autoScroll : true,
        bodyStyle:'padding:5px 5px 0;background:transparent;',		
		items:[
			new Ext.form.TextArea({
				fieldLabel: ''+getResource('resourceParam727')+'',
				name: 'approveNote',
				width:400,
				height:120,
				maxLength : 500,
				maxLengthText :''+getResource('resourceParam1171')+''
			}),
			{
			baseCls : 'x-plain',
			xtype : 'panel',
			layout : 'table',
			fieldLabel : ''+getResource('resourceParam1045')+'',
			defaultType : 'radio',
			isFormField : true,
			items : [{
				name : 'isAgree',
				boxLabel :  '' + getResource('resourceParam9026') + '' , // text : 同意
				value : 'true',
				checked : true
			}, {
				name : 'isAgree',
				boxLabel : ''+getResource('resourceParam1176')+'',
				value : 'false'
			}]
		},{
			baseCls : 'x-plain',
			xtype : 'panel',
			layout : 'table',
			fieldLabel : ''+getResource('resourceParam1172')+'',
			defaultType : 'radio',
			isFormField : true,
			items : [{
				name : 'isNextStep',
				boxLabel : ''+getResource('resourceParam1173')+'',
				value : 'true',
				checked : false
			}, {
				name : 'isNextStep',
				boxLabel : ''+getResource('resourceParam1174')+'',
				value : 'false'
			}]
		}
			 ]
	});
	

	
		myApproveTaskPanel.approvalRecord = new Ext.Panel({				
		title :''+getResource('resourceParam1153')+'',		
		autoScroll : true,
		layout : 'fit',
		height : 300,
		items : [myApproveTaskPanel.stepGrid]
	});
	
	myApproveTaskPanel.approvalObject = new Ext.Panel({				
		title :''+getResource('resourceParam728')+'',		
		autoScroll : true,
		layout : 'fit',
		height : 150,
		items : [myApproveTaskPanel.approvalObjectGrid]
	});
	
		myApproveTaskPanel.participantsGrid = approvePanel.getUserGrid(false);//这里要抽象出公共的界面

	myApproveTaskPanel.approvePanel = new Ext.FormPanel({
		border : false,
		bodyStyle : 'padding-left:40px;',
		// layout:'fit',
		height : 300,
		// attoWidth : true,
		 //layout:'fit',
		// resizable:true,
		//width: 600,
		//autoScroll:'true',
		// split : true,
		items : [{
			xtype : 'fieldset',
			title : ''+getResource('resourceParam1015')+'',
			width : 420,
			region : 'center',
			// autoHeight : true,
			items : [{
				xtype : 'textfield',
				width : 130,
				fieldLabel : ''+getResource('resourceParam726')+'',
				id : 'approveStep2',
				allowBlank : false,
				maxLength : 20,
				maxLengthText :''+getResource('resourceParam1000')+'',
				minLength : 1,
				minLengthText :''+getResource('resourceParam1002')+'',
				blankText:''+getResource('resourceParam1010')+'',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : ''+getResource('resourceParam679')+'',
				anchor : '95%',
				/**
				 * 取消全角输入时的空格bug
				 * @author wangyf
				 * 2011-04-20 17:00
				 */
				enableKeyEvents : true,
				listeners : {'blur' : function(cur, evt) {
						var curStr = cur.getValue();
						for(var i = 0; i < curStr.length; i++) {
							var str = curStr.charCodeAt(i);
							if(str == 12288) {
								if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
									curStr = curStr.replace('　', ' ');
								}
							} 
						}
						Ext.getCmp('approveStep2').setValue(curStr);
					}
				}
			}, myApproveTaskPanel.participantsGrid]
		}]
	});
	
	myApproveTaskPanel.approvalObject.region='north';
	myApproveTaskPanel.approveForm.region='center';
	myApproveTaskPanel.approvePanel.region='south';
	
	approvalObjectGrid.refreshGrid();//刷新
	
	myApproveTaskPanel.approvalArea = new Ext.Panel({		
		 autoScroll:true,
		title :''+getResource('resourceParam727')+'',
		region:'center',
		layout: 'border',
		autoScroll : true,
		items : [myApproveTaskPanel.approvalObject, myApproveTaskPanel.approveForm, myApproveTaskPanel.approvePanel],
		buttonAlign : 'left',
		buttons : [{
			text : ''+getResource('resourceParam484')+'',
			style : 'margin-left:200px;',
			handler : function() {
				alert(""+getResource('resourceParam1175')+"");
			}
		}]
	});	
	
	
		myApproveTaskPanel.tab = new Ext.TabPanel({
				activeTab : 0,
				height : 700,
//				hidden:true,
//				autoScroll:true,
				plain : true,
				defaults : {
					autoScroll : true
				},
				items : [
				myApproveTaskPanel.approvalArea
				,myApproveTaskPanel.approvalRecord
				      ]
			});	

	return myApproveTaskPanel.tab;
}

