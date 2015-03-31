/**
 * 修改评分信息界面
 * @type 
 */
var updateGradeMessagePanel = {}

updateGradeMessagePanel.init = function(contractId,contractCode,contractName){
	
	var panel = updateGradeMessagePanel.gradePanel(contractCode,contractName);

	wind = new Ext.Window({
		width : 350,
//		height : 350,
		layout:'fit',
		autoScrool:true,
		title : '评分信息界面',
		modal : true,
		//弹窗按钮的显示位置
		buttonAlign:'center',
		//防止窗口超出浏览器
		constrain:true,
//		closeAction:'hide',
		items : [panel],
		buttons:[
		{
			text:'查看他人评分情况',
			handler:function(){
				gradeMessageGrid.init(contractId,contractCode,contractName);
			}
		},
		{
			text:'确定',
			handler:function(){
				//判断个输入框的值是否满足条件
				if(Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)<1
					||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)<1
					||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)<1
					||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)<1
					||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)<1
					||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio)>100||Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio)<1){
					alert('全部值满足条件才能操作')
					return;
				}
				
				//将前台数据传递到后台
				Ext.Ajax.request({
					url:'../JSON/SelectGradePersonnelRemote.UpdateAnalysisDetail',
					method:'POST',
					disableCaching : true,
					autoAbort : true,
					success : function(response, options) {
						wind.close();
						//刷新效能评分当前页面的数据
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_code=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNum;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.contract_name=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeNmae;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.baseParams.department_b=pactEfficiencyGradeGrid.conditionForm.getForm().getValues().pactEfficiencyGradeSupplier;
						Ext.getCmp('pactEfficiencyGradeGridGrid').store.load({
							params:{
								start:Ext.getCmp('pactEfficiencyGradeGridGrid').getBottomToolbar().cursor,//获得当前页的起始位置
								limit:pactEfficiencyGradeMain.limit
							}
						})
					},
					params:{
						ratio_price:updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice,
						quantity_ratio:updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio,
						commit_date_ratio:updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio,
						get_way_retio:updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio,
						contract_sign_ratio:updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio,
						satisfy_ratio:updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio,
						composite_score:Ext.getCmp('updateCompositeScore').getValue(),
						contractId:contractId
					}
				})
			}
		},{
			text:'返回',
			handler:function(){
				wind.close();
			}
		}
		],
		resizable : false
	})
	wind.show();
}

//重写vtype的样式信息
Ext.apply(Ext.form.VTypes, {   
     //限制只能输入1-100
    "area":function(_v){   
        return  /^([1-9]|([1-9][0-9])|100)$/.test(_v); //利用正则来和传进来的值进行判断   
    },   
    "areaText": "在评分输入中您只能输入1-100的数字！",  //用来提示的作用   
    "areaMask":/[0-9]/i //只准用户填入 0-9其他的就接受不了   
}); 

updateGradeMessagePanel.gradePanel = function(contractCode,contractName){
	updateGradeMessagePanel.updatePanel = new Ext.form.FormPanel({
//		title:'评分信息修改界面',
		padding :5,
		autoHeight:true,
		id:'insertGradeMessagePanel',
		tbar:['合同编号：<font color="red">'+contractCode+'</font><font style="margin-left:100px;">合同名称：</font><font color="red">'+contractName+'</font>'],
//		frame:true,
		bbar:['评分说明：各项满分均为100，系统根据权重自动计算和积分。'],
		items:[
		{
			xtype:'numberfield',
			fieldLabel:'性价比',
			//不允许为空
			allowBlank:false, 
			name:'updateRatioPrice',
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			width:100,
			validator:'area',
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
				
			}}
		},{
			xtype:'numberfield',
			fieldLabel:'质量',
			allowBlank:false, 
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			name:'updateQuantityRatio',
			width:100,
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
			}}
		},{
			xtype:'numberfield',
			fieldLabel:'交货情况',
			allowBlank:false, 
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			name:'updateCommitDateRatio',
			width:100,
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
			}}
		},{
			xtype:'numberfield',
			fieldLabel:'采购方式',
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			allowBlank:false, 
			name:'updateGetWayRetio',
			width:100,
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
			}}
		},{
			xtype:'numberfield',
			fieldLabel:'合同方式',
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			allowBlank:false, 
			name:'updateContractSignRatio',
			width:100,
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
			}}
		},{
			xtype:'numberfield',
			fieldLabel:'用户满意度',
			//限制时能输入数字(重新添加了一个对1-100的数字验证)
			vtype:'area',
			allowBlank:false, 
			name:'updateSatisfyRatio',
			width:100,
			listeners:{'blur':function(){
				var num = parseInt((Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateQuantityRatio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateCommitDateRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateGetWayRetio)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateContractSignRatio)+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateRatioPrice)
					+Number(updateGradeMessagePanel.updatePanel.getForm().getValues().updateSatisfyRatio))/6);
				Ext.getCmp('updateCompositeScore').setValue(num)
			}}
		}
		,{
			xtype:'numberfield',
			fieldLabel:'合计',
			value:0,
			disabled:true, 
			id:'updateCompositeScore',
			name:'updateCompositeScore',
			width:100
		}
		]
	})
	return updateGradeMessagePanel.updatePanel;
}