var baowenOther = {};

baowenOther.week_init = function(){
	
	baowenOther.sm_week = new Ext.grid.CheckboxSelectionModel();
	baowenOther.cm_week = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			new Ext.grid.RowNumberer(),
			baowenOther.sm_week,
			{header:getResource('resourceParam6008')+''+getResource('resourceParam988')+''+getResource('resourceParam481')+'', dataIndex:'zoubaobz',width:80}, // 6008报告
			{header:''+getResource('resourceParam1035')+'', dataIndex:'mingchen',width:80},
			{header:''+getResource('resourceParam1037')+'', dataIndex:'xiangmlx',width:120},
			{header:''+getResource('resourceParam1034')+'', dataIndex:'xmufuzer',width:80},
			{header:''+getResource('resourceParam1237')+''+getResource('resourceParam6017'), dataIndex:'fuzekesh',width:130}, // 6017科室
			{header:''+getResource('resourceParam6005'), dataIndex:'gzmubiao',width:80}, // 6005工作目标
			{header:''+getResource('resourceParam1693')+'', dataIndex:'ztigzjih',width:80},
			{header:''+getResource('resourceParam1113')+'', dataIndex:'zhuycjry',width:80},
			{header:''+getResource('resourceParam1691')+'', dataIndex:'bwanchqk',width:80},
			{header:''+getResource('resourceParam1694')+'(%)', dataIndex:'zongtijd',width:80, align:'center'},
			{header:''+getResource('resourceParam663')+'', dataIndex:'shifouxg',width:80,renderer: clewConver}
		]
	});
	baowenOther.tb_week = ['-',{
		text: ''+getResource('resourceParam466')+'',
		iconCls: 'news-add',
		tooltip: {text: ''+getResource('resourceParam466')+'一'+getResource('resourceParam455')+''+getResource('resourceParam6008')}, // 6008报告
		handler: baowenAdd.week_init
	},
	'-',
	{
		text: ''+getResource('resourceParam478')+'',
		iconCls: 'news-updata',
		tooltip: {text: ''+getResource('resourceParam478')+'' + getResource('resourceParam6018')}, // 6018所选的报告
		handler: baowenUpdate.week_init
	},
	'-',
	{
		text: ''+getResource('resourceParam1518')+'',
		iconCls: 'icon-zxt',
		tooltip: {text: ''+getResource('resourceParam1692')+''},
		handler: function(){
			baowenView.show("1");
		}
	},
	'-',
	{
		text: ''+getResource('resourceParam475')+'',
		iconCls: 'news-delete',
		tooltip: {text: ''+getResource('resourceParam475')+'' + getResource('resourceParam6019')}, // 6019所选的报文
		handler: baowenDel.week_init
	},
	'-',
	{
		text: ''+getResource('resourceParam652')+'',
		iconCls: 'news-select',
		tooltip: {text: '' + getResource('resourceParam6020') + '' +getResource('resourceParam455')+'' + getResource('resourceParam6021')}, // 6020按所选  | 6021件检索报文
		handler: baowenQuery.week_init
	},
	'-',
	{
		text: ''+getResource('resourceParam1520')+'',
		iconCls: 'copy',
		tooltip: {text: ''+getResource('resourceParam485')+'' + getResource('resourceParam6022')}, // 6022 所选中的所有报告
		handler: baowenCopy.week_init
	}];
}

baowenOther.month_init = function(){
	Ext.QuickTips.init();
	baowenOther.sm_month = new Ext.grid.CheckboxSelectionModel();
	baowenOther.cm_month = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			new Ext.grid.RowNumberer(),
			baowenOther.sm_month,
			{header:''+getResource('resourceParam6008')+getResource('resourceParam988')+''+getResource('resourceParam481')+'', dataIndex:'zoubaobz',width:100}, // 6008报告
			{header:''+getResource('resourceParam1686')+'', dataIndex:'mingchen',width:100},
			{header:''+getResource('resourceParam1237')+''+getResource('resourceParam6017'), dataIndex:'fuzekesh',width:130}, // 6017科室
			{header:''+getResource('resourceParam6005'), dataIndex:'gzmubiao',width:100}, // 6005工作目标
			{header:''+getResource('resourceParam1113')+'', dataIndex:'zhuycjry',width:100},
			{header:''+getResource('resourceParam1691')+'', dataIndex:'bwanchqk',width:100},
			{header:''+getResource('resourceParam663')+'', dataIndex:'shifouxg',width:100,width:100,renderer: clewConver}
		]
	});
	baowenOther.tb_month = ['-',{
		text: ''+getResource('resourceParam466')+'',
		iconCls: 'news-add',
		tooltip: {text: ''+getResource('resourceParam466')+'一'+getResource('resourceParam455')+''+getResource('resourceParam6008')}, // 6008报告
		handler: baowenAdd.month_init
	},
	'-',
	{
		text: ''+getResource('resourceParam478')+'',
		iconCls: 'news-updata',
		tooltip: {text: ''+getResource('resourceParam478')+''+getResource('resourceParam6018')}, // 6018所选的报告
		handler: baowenUpdate.month_init
	},
	'-',
	{
		text: ''+getResource('resourceParam1518')+'',
		iconCls: 'icon-zxt',
		tooltip: {text: ''+getResource('resourceParam1692')+''},
		handler: function(){
			baowenView.show("2");
		}
	},
	'-',
	{
		text: ''+getResource('resourceParam475')+'',
		iconCls: 'news-delete',
		tooltip: {text: ''+getResource('resourceParam475')+''+getResource('resourceParam6019')}, // 6019所选的报文
		handler: baowenDel.month_init
	},
	'-',
	{
		text: ''+getResource('resourceParam652')+'',
		iconCls: 'news-select',
		tooltip: {text: ''+getResource('resourceParam6020')+getResource('resourceParam455')+''+getResource('resourceParam6021')}, // 6020按所选 | 6021件检索报文
		handler: baowenQuery.month_init
	},
	'-',
	{
		text: ''+getResource('resourceParam1520')+'',
		iconCls: 'copy',
		tooltip: {text: ''+getResource('resourceParam485')+''+getResource('resourceParam6022')}, // 6022所选中的所有报告
		handler: baowenCopy.month_init
	}];
}

function timeConver(value){
	if (value == "0"){
		return ""+getResource('resourceParam1687')+"";
	}else if (value == "1"){
		return ""+getResource('resourceParam1688')+"";
	}else if (value == "3"){
		return ""+getResource('resourceParam1689')+"";
	}
}
function clewConver(value){
	if (value == "0"){
		return "";
	}else if (value == "1"){
		return "<font color='red'>"+getResource('resourceParam1519')+"</font>";
	}
}
