var planOther = {};

planOther.init = function(){
	planOther.sm = new Ext.grid.CheckboxSelectionModel();
	planOther.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			new Ext.grid.RowNumberer(),
			planOther.sm,
			{header:''+getResource('resourceParam481')+'', dataIndex:'jihlxing', width:100},
			{header:''+getResource('resourceParam480')+'', dataIndex:'jihuamc', width:100, renderer:intercept},
			{header:'来源', dataIndex:'jihualy', width:120, sortable:true},
			{header:''+getResource('resourceParam1237')+'处领导', dataIndex:'lindaoId', width:100},
			{header:''+getResource('resourceParam1237')+'科室/'+getResource('resourceParam689')+'', dataIndex:'fuzkeshi', width:100, renderer:intercept},
			{header:''+getResource('resourceParam731')+'', dataIndex:'fuzheren', width:100},
			{header:'B角', dataIndex:'bjiaoId', width:100},
			{header:''+getResource('resourceParam1113')+'', dataIndex:'canyuren', width:100, renderer:intercept},
			{header:''+getResource('resourceParam1517')+'', dataIndex:'jhjiessj', width:100},
			{header:''+getResource('resourceParam663')+'', dataIndex:'shifouxg',width:100,renderer: clewConver}
		]
	});
	planOther.tb = ['-',{
		text: ''+getResource('resourceParam466')+'',
		iconCls: 'news-add',
		tooltip: {text: ''+getResource('resourceParam466')+'一'+getResource('resourceParam455')+''+getResource('resourceParam1046')+''},
		handler: planAdd.init
	},
	'-',
	{
		text: ''+getResource('resourceParam478')+'',
		iconCls: 'news-updata',
		tooltip: {text: ''+getResource('resourceParam478')+'所选的'+getResource('resourceParam1046')+''},
		handler: planUpdate.init
	},
	'-',
	{
		text: ''+getResource('resourceParam1518')+'',
		iconCls: 'icon-zxt',
		tooltip: {text: ''+getResource('resourceParam576')+'所选'+getResource('resourceParam1046')+'的'+getResource('resourceParam857')+''},
		handler: planView.show
	},
	'-',
	{
		text: ''+getResource('resourceParam475')+'',
		iconCls: 'news-delete',
		tooltip: {text: ''+getResource('resourceParam475')+'所选的'+getResource('resourceParam1046')+''},
		handler: planDel.init
	},
	'-',
	{
		text: ''+getResource('resourceParam652')+'',
		iconCls: 'news-select',
		tooltip: {text: '按所选'+getResource('resourceParam455')+'件检索'+getResource('resourceParam1046')+''},
		handler: planQuery.init
	},
	'-',
	{
		text: ''+getResource('resourceParam1520')+'',
		iconCls: 'copy',
		tooltip: {text: ''+getResource('resourceParam466')+'所选中的所有'+getResource('resourceParam1046')+''},
		handler: planCopy.init
	}];
}

function typeConver(value){
	if (value == "0"){
		return ""+getResource('resourceParam463')+"类";
	}else if (value == "1"){
		return "制度类";
	}else if (value == "2"){
		return "培训类";
	}else if (value == "3"){
		return "管理类";
	}else if (value == "4"){
		return ""+getResource('resourceParam513')+"类";
	}
}
function intercept(value){
	var result;
	if (value.length > 10){
		result = value.substring(0, 10);
		result = result + "...";
	}else{
		result = value;
	}
	return result;
}
function fromConver(value){
	if (value == "0"){
		return "总行";
	}else if (value == "1"){
		return "总行要求分行自主开发";
	}else if (value == "2"){
		return "分行";
	}else if (value == "3"){
		return "中支";
	}
}
function clewConver(value){
	if (value == "0"){
		return "";
	}else if (value == "1"){
		return "<font color='red'>"+getResource('resourceParam1519')+"</font>";
	}
}
