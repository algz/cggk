var searchOpt={
	searchWin:null,
	searchForm:null,
	sysMenuData:null
};

searchOpt.initWindow = function() {
	searchOpt.searchWin = new Ext.Window({
		title:''+getResource('resourceParam652')+'业务',
		width:300,
	   	height:170,
		modal:true,
		resizable:false,
		plain:false,
		layout:'fit'
	});	
	searchOpt.searchWin.on('hide',searchOpt.closeWin);
};




searchOpt.closeWin = function(){
	if(searchOpt.searchWin != null) {
		searchOpt.searchWin.close();
		searchOpt.searchWin.destroy();
	}
};

searchOpt.submit = function() {
	var optSearchVO = Seam.Remoting.createType("com.luck.itumserv.base.operation.OptSearchVO");
	Ext.apply(optSearchVO, searchOpt.searchForm.form.getValues());
	
	operation.baseargs = {
		name:optSearchVO.getName(),
		subSysId:optSearchVO.getSubSysId()
	}
	
	myGrid.loadvalue(operation.ds,operation.args,operation.baseargs);
	searchOpt.closeWin();
}


searchOpt.initForm = function() {
	
	searchOpt.searchForm = {
		xtype:'form',
		labelAlign: "left",
		labelSeparator:':',
		labelWidth:70,
		frame:true,	
		bodyStyle:'padding:5px 5px 0;background:transparent',
		buttons:[{
			text:''+getResource('resourceParam505')+'',
			handler:searchOpt.submit
		}, {
			text:'取消',
			handler:searchOpt.closeWin
		}],
		defaultType:'textfield',
		items:[{
			id:'name',
			fieldLabel:"业务"+getResource('resourceParam480')+"",
			name:'name',
			anchor:'90%'
		}, {
			xtype:'combo',
			fieldLabel:"子"+getResource('resourceParam559')+"",
			name:"subSysId",					
			anchor:"90%",
			store:new Ext.data.SimpleStore({
				fields:['subSysId','name'],
				data:searchOpt.sysMenuData
			}),
			mode:'local',
			triggerAction:'all',
			displayField:'name',
			hiddenName:'subSysId',
			valueField:'subSysId',
			selectOnFocus:true,
			forceSelection:true,
			editable:false,
			emptyText:'Select ...',
			anchor:"90%",
			allowBlank:false
		}]
	}
	return searchOpt.searchForm;
}

searchOpt.init = function() {
	searchOpt.initWindow();
	Seam.Component.getInstance("base_subsystem_SubSystemSerivce").getSystemList(function(result) {
		searchOpt.sysMenuData = result;	
		searchOpt.searchForm = searchOpt.searchWin.add(searchOpt.initForm());
		searchOpt.searchWin.show(this);
	});
	
}
