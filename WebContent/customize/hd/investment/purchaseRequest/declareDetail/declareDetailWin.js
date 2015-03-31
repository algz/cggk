Ext.ns("hd.investment.purchaseRequest.declareDetail.win");
/**
 * 新增、编辑申报记录详情window
 * @class Cnpdc.pm.tasks.milepostTask.win.window
 * @extends Ext.Window
 */
hd.investment.purchaseRequest.declareDetail.win.window = Ext.extend(Ext.Window, {
	width : 600,
	height : 320, 
	title : '修改记录详情',
	modal : true,	//遮蔽其他组件 
	layout:'fit',
	initComponent : function() { 
		var self = this;
		this.items = [{
			xtype : 'hd.investment.purchaseRequest.declareDetail.form.formPanel',
			id : 'declareDetailUpdateForm',
			border:false
			
		}];
		this.fbar = {
			xtype : 'toolbar',
			items : [{
				text : ' 确定 ',
				handler : function(){					
					 declareDetailAction.save(self,true);
				}		
			}, {
				text : ' 取消 ',
				handler : function(){	 
					self.close();
				}
			}]
		}
		hd.investment.purchaseRequest.declareDetail.win.window.superclass.initComponent.call(this);
	}
});

Ext.reg('hd.investment.purchaseRequest.declareDetail.win.window', 
		hd.investment.purchaseRequest.declareDetail.win.window);
