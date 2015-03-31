var piechartPanelForPlanTypeInspect = {
	startTime:null,
	endTime:null
};

piechartPanelForPlanTypeInspect.pictureWin = function(){
	var strurl = "";

	strurl = '../JSON/PlanTypeInspectRemote.GetAmoteAndQuantity?a='
		+ new Date();

	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'
			},
			 ['typeName','ramount','rquantity']);
	var store = new Ext.data.Store({
		proxy : proxy,
		reader : reader,
		remoteSort : true
	});
	
	store.reload({
		params:{
			params:{
				dateStart:piechartPanelForPlanTypeInspect.startTime,
				dateEnd:piechartPanelForPlanTypeInspect.endTime
			}
		}
	})
	var pieChartAmote = new Ext.Panel({
		width:400,
		height:100,
		title:'金额',
		region:'west',
		items:[{
			xtype:'piechart',
			url:'../lib/ext/resources/charts.swf',
			store:store,
//			hidleLabel:false,
			categoryField:'typeName',
			dataField:'ramount',
			disableCaching: true,
			//设定要选择的颜色
//			series:[{
//		        style:{
//			         colors:['red', 'green','blue']
//			        }
//		    }],
			extraStyle : {
		        legend : {
			        display : 'right',
			        padding : 5,
			        font : {
			          family : 'Tahoma',
			          size : 10,
			          bold : true
			         }
		        },
		        background : {
		         color : '#e2c2de'
		        }
		     }
//		     ,
//			listeners:{
//				itemclick:function(o){
//					var rec = store.getAt(o.index);
//					Ext.exapmle.msg('Item Selected','You chose{0}.',rec.get('name'));
//				}
//			}
		}]
	})
	
	var pieChartAmoteQuantity = new Ext.Panel({
		width:400,
		height:100,
//		layout:'fit',
		title:'计划项',
		region:'center',
		items:[{
			xtype:'piechart',
			url:'../lib/ext/resources/charts.swf',
			store:store,
//			hidleLabel:false,
			categoryField:'typeName',
			dataField:'rquantity',
			disableCaching: true,
			//设定要选择的颜色
//			series:[{
//		        style:{
//			         colors:['red', 'green','blue']
//			        }
//		    }],
			extraStyle : {
		        legend : {
			        display : 'right',
			        padding : 5,
			        font : {
			          family : 'Tahoma',
			          size : 10,
			          bold : true
			         }
		        },
		        background : {
		         color : '#e2c2de'
		        }
		     }
//		     ,
//			listeners:{
//				itemclick:function(o){
//					var rec = store.getAt(o.index);
//					Ext.exapmle.msg('Item Selected','You chose{0}.',rec.get('name'));
//				}
//			}
		}]
	})
	
	var panel = new Ext.Panel({
		title:'测试饼图弹出新界面',
		layout:'border',
		x:200,
		y:20,
		anchor:'80% 50%',
		items:[pieChartAmote,pieChartAmoteQuantity]
	})
	return panel;
}

piechartPanelForPlanTypeInspect.init = function() {
	//获取点击弹出本页面的值
	piechartPanelForPlanTypeInspect.startTime=window.opener.window.sTime;
	piechartPanelForPlanTypeInspect.endTime=window.opener.window.eTime;
	var panel = piechartPanelForPlanTypeInspect.pictureWin()
	
	var view = new Ext.Viewport({
		layout : 'absolute',
		autoScroll:true,
		id : 'piechartPanelForPlanTypeInspectPanel',
		items :[panel]
	});	
};

Ext.onReady(piechartPanelForPlanTypeInspect.init, piechartPanelForPlanTypeInspect, true);