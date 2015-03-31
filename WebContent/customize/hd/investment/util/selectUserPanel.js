var selectUserPanel = {}


/**
 * 选择用户界面
 */
selectUserPanel.init = function(){	
	var data = '';
	
	var panel = new Ext.Panel({
		layout:'border',
		region:'center',
		height:300,
		width:600,
		items:[selectUserPanel.pingFenGrid(data),selectUserPanel.yiJianGrid(data)]
	})
	
	return panel;
}

/**
 * 选择用户信息后的处理
 */
selectUserPanel.callBack = function(){
	var dataStore = userMultiselect.usersore;
	var store = Ext.getCmp('pingFenGrid').getStore();
	var records =Ext.data.Record.create([
	                                         {name:'userid'},
	                                         {name:'truename'}
	                                         ]);
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		var truename = dataStore.getAt(i).get('truename');
//		var record = dataStore.getAt(i);
		var data = new records({
			userid:userid,
			truename:truename
		});
//		records.set('userid',userid);
//		records.set('truename',truename);
		store.add(data);
	}
}

selectUserPanel.pingFenGrid = function(data){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.ArrayStore({
				data:data==""?[]:datga,
				fields:['userid','truename']
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '用户编号 ',
				dataIndex : 'userid',
				width : 100
			},			
			{
				header : '用户名称',
				dataIndex : 'truename',
				width : 100
			}
			]);
	
	var pingFenBtn = {
			text : '选择评分人',	
			iconCls : 'add1',
			handler : function(){
					userMultiselect.init(selectUserPanel.callBack);
			}
		}
	
	var grid = new Ext.grid.GridPanel({
		 region:'west',
		 id:'pingFenGrid',
//		 title:'评分填写人',
		 tbar:['-',pingFenBtn,'-',{text:'删除',handler:function(){
		 var grid=Ext.getCmp('pingFenGrid');
		 grid.getStore().remove(grid.getSelectionModel().getSelections())
		 }}],
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 300,
	     width:300,
	     id : "pingFenGrid",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     } 
	});
//	store.baseParams={start:0,limit:20};
//	store.load();
	return grid;
}

selectUserPanel.yiJianGrid = function(data){
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.ArrayStore({
				data:data==""?[]:data,
				fields:['userid','truename']
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '用户编号 ',
				dataIndex : 'userid',
				width : 100
			},			
			{
				header : '用户名称',
				dataIndex : 'truename',
				width : 100
			}
			]);
	
	var yiJianBtn = {
		text : '选择意见报告人',
		iconCls : 'add1',
		handler : function() {
			var store = Ext.getCmp('yiJianGrid').getStore();
			if(store.getCount()>=1){
				Ext.Msg.alert("提示","请删除意见报告人后在选择!")
				return ;
			}
			userMultiselect.init(function() {
						var dataStore = userMultiselect.usersore;
						var store = Ext.getCmp('yiJianGrid').getStore();
						var records = Ext.data.Record.create([{
									name : 'userid'
								}, {
									name : 'truename'
								}]);
						
						if(dataStore.getCount()>1){
							return '意见报告人只能选择一个';
						}else if(dataStore.getCount()==1){
//							for (i = 0; i < dataStore.getCount(); i++) {
							var userid = dataStore.getAt(0).get('userid');
							var truename = dataStore.getAt(0).get('truename');
							// var record = dataStore.getAt(i);
							var data = new records({
										userid : userid,
										truename : truename
									});
							// records.set('userid',userid);
							// records.set('truename',truename);
							store.add(data);
//						}
						}

					});
		}
	}
	
	var grid = new Ext.grid.GridPanel({
		 region:'center',
		 tbar:['-',yiJianBtn,'-',{text:'删除',handler:function(){
		  var grid=Ext.getCmp('yiJianGrid');
		  grid.getStore().remove(grid.getSelectionModel().getSelections());
		 }}],
	     store : store,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 300,
	     width:300,
	     id : "yiJianGrid",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     } 
	});
//	store.baseParams={start:0,limit:20};
//	store.load();
	return grid;
}