var moneyPaymentMain = {
		window:null,
		isDirectAdd:false,
		contractId:null
	};

	moneyPaymentMain.init = function(contractId,cardItem, height,width) {
		moneyPaymentMain.contractId = contractId;
		moneyPaymentMain.gridCard = moneyPaymentGrid.gridPanel();//列表
		moneyPaymentMain.formCard = moneyPaymentForm.getForm();//表单
			
		//页面总布局
		var window = new Ext.Window({
			width : width,
			height : height,
			layout : 'card',
			activeItem : cardItem,
			items : [moneyPaymentMain.gridCard, moneyPaymentMain.formCard],
			listeners : {
				'beforeclose' : function(){
					moneyPaymentMain.window = null;
					moneyPaymentMain.contractId = null;
					moneyPaymentMain.isDirectAdd = false;
				}
			}
		
		});

		moneyPaymentMain.window = window;
		
		return window;
	}
