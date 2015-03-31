/**
 * 通用工具类
 * @author zgy
 * @description 通用工具类 2010-11-03
 * @version 1.0
 * @type 
 */
var common = {
	gridPanel:null,
	selectRow:null,
	gridPanelId:null,
	selectObj:null,
	comboSelectValue : null
};
/**
 * 通用的gridPanel
 * @param {} id
 * @param {} cm
 * @param {} store
 * @param {} tbar
 * @param {} bbar
 * @param {} sm
 * @param {} title
 * @return {}
 */
common.gridPanel = function(id,cm,store,tbar,bbar,sm,title){
	//底部工具条
	common.gridPanelId = id;
	var bb = new Ext.PagingToolbar({
		pageSize:20,
		store:store,
		displayInfo:true,
		displayMsg:'显示第{0}条到{1}条记录,一共{2}条',
		emptyMsg:'没有记录'
	});
	if(!bbar){//是否分页
		bb = null;
	}
	var gridPanel = new Ext.grid.GridPanel({
		id : id,
		cm : cm,
		sm : sm,
		store : store,
		autoScroll : true,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			enableRowBody : true
		},
		tbar : tbar,
		bbar : bb
	});
	
	var loadMask = new Ext.LoadMask(Ext.getBody(), {
		msg:'正在加载数据，请稍后...',
		store:store
	});
	
	if(title != null && title != ""){//是否有标题
		gridPanel.title = title;
	}
	//监听，档面板被激活时加载数据
	gridPanel.on('activate',function(){
		loadMask.enable();
		store.load({params:{start:0,limit:20}});
	});
	gridPanel.on('beforedestroy', function(e) {
		e.store.removeAll();
	});
	
	//监听行事件
	if(sm != null && sm != ''){
		sm.on('rowselect', function(sm, rowIndex, record) {
			common.selectRow = record;
		});
		sm.on('selectionchange', function(sm, t) {
			common.selectObj = sm.getSelections();
			if(!sm.getSelections() || sm.getSelections().length<1){
				common.selectRow = null;
			}
		});
	}
	return gridPanel;
}
/**
 * 重新加载数据
 * @author zgy 2010-11-03
 * @description gridpanel的附加方法，重新加载数据，适用：添加 删除 修改后的数据加载
 */
common.gridPanel.reload = function(){
	Ext.getCmp(common.gridPanelId).getStore().load({params:{start:0,limit:20}});
}
/**
 * 刷新
 * @author zgy 2010-11-03
 * @description gridpanel的附加方法，刷新数据，适用：查询后数据加载
 */
common.gridPanel.refush = function(id){
	if(id){
		common.gridPanelId = id;
	}
	var grid = Ext.getCmp(common.gridPanelId);
	grid.getStore().baseParams = null;
	grid.getStore().load({params:{start:0,limit:20}});
}
/**
 * 通用下拉框工具类
 * @param {} url
 * @param {} id
 * @param {} label
 * @param {} vf
 * @param {} df
 * @param {} qf
 * @description 生产下拉框的工具类
 */
common.comboTool = function(url,id,label,vf,df,qf){
	common.ComboBoxStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					method : 'POST',
					url : url
				}),
		reader : new Ext.data.JsonReader({
					id : vf,
					totalProperty : 'totalProperty',
					root : 'results'
				}, [{
							name : vf
						}, {
							name : df
						}, {
							name : qf
						}])
	});
	common.ComboBox = new Ext.form.ComboBox({
		id : id,
		store : common.ComboBoxStore,
		valueField : vf,
		displayField : qf,
		mode : 'remote',
		queryParam : qf,
		minChars : 0,
		pageSize : 10,
		forceSelection : true,
		hiddenName : vf,
		editable : true,
		triggerAction : 'all',
		fieldLabel : label,
		typeAhead : false,
		name : id,
		blankText : '请选择'+label+'...',
		allowBlank : false,
		enableKeyEvents : true,
		disableKeyFilter : true,
		anchor : '100%',
		tpl : '<tpl for="."><div ext:qtip="{'+qf+'}"  class="x-combo-list-item">'
				+ '<div style="float:left; text-align:left; padding-left:3px">{'+qf+'}</div>'
				+ '<div style="float:right; text-align:right padding-right:3px"><font color="green">{'+df+'}</font></div>'
				+ '</div></tpl>',
		emptyText : '请选择'+label
		
	});
	common.ComboBox.on('select', function(combo, record, index) {
		// 下拉列表文本值
		common.comboSelectValue = record;
	});
}
/**
 * 数据中心--枚举类型
 * 
 * @param {} label 字段名
 * @param {} id 字段id
 * @param {} hd 隐藏字段
 * @param {} dateCenterId 
 */
common.dataWorkBook = function(label,id,dateCenterId,hd){
	common.dataWorkBook.combox = new Ext.form.ComboBox({
		store : new Ext.data.JsonStore({
			method : 'GET',
			url : '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterID='+dateCenterId,
			root : 'results',
			fields : [{
				name : 'dataEntityName',
				mapping : 'dataEntityName'
			}]
		}),
		triggerAction : 'all',
		valueField : 'dataEntityName',
		displayField : 'dataEntityName',
		editable : false,
		hiddenName : hd,
		lazyRender : true,
		id : id,
		anchor : '95%',
		fieldLabel : label,
		onSelect : function(r, index) {
			if (this.fireEvent('beforeselect', this, r, index) !== false) {
				var value = r.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, r, index);
			}
		}
	});
	return common.dataWorkBook.combox;
}

/**
 * 数据中心--枚举类型(加权限使用机型)
 * 
 * @param {} label 字段名
 * @param {} id 字段id
 * @param {} hd 隐藏字段
 * @param {} dateCenterId 
 */
common.machineType = function(label,id,dateCenterId,hd,t){
	var url= '../JSON/material_MaterialRemote.getMachineType?description='+t;
	common.machineType.combox = new Ext.form.ComboBox({
		store : new Ext.data.JsonStore({
			method : 'GET',
			url : url,
			root : 'results',
			fields : [{
				name : 'modelname',
				mapping : 'modelname'
			}]
		}),
		pageSize : 10,
		triggerAction : 'all',
		valueField : 'modelname',
		displayField : 'modelname',
		editable : false,
		hiddenName : hd,
		lazyRender : true,
		id : id,
		anchor : '95%',
		fieldLabel : label,
		onSelect : function(r, index) {
			if (this.fireEvent('beforeselect', this, r, index) !== false) {
				var value = r.data[this.valueField || this.displayField];
				this.setValue(value);
				this.collapse();
				this.fireEvent('select', this, r, index);
			}
		}
	});
	return common.machineType.combox;
}








//无刷新返回数据
common.returnText = function(url){
	var conn = synchronize.createXhrObject();
	conn.open('POST', url, false);
	conn.send(null);
	return conn.responseText;
}

//产生六位随机数
common.MathRand = function(){
	var num="";
	for(var i=0;i<8;i++){
		num+=Math.floor(Math.random()*10);
	}
	return num;
}

//得到当前登录用户的用户名 
common.getUserName = function(){
	var name;
	var str = document.cookie.split(";");
	for(var i=0;i<str.length;i++){
		if(str[i].indexOf("trueName") != -1){
			name = decodeURI(str[i].substring(10));
			break;
		}
	}
	return name;
}


//根据输入的字符串化的字母,根据输入的小数位的长度,判断是否符合输入规则
common.checkTheAssignNumber = function(inputString,inputLengthInt){
	     var reg1 = new RegExp('^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$|^[0-9]+$');
         var regExpStr2 = '^[0-9]+\.[0-9]{0,'+inputLengthInt+'}$|^[0-9]+$';
	     var reg2 = new RegExp(regExpStr2);

         var result1 = reg1.test(inputString);
         var result2 = null;
		 if(result1){
             result2 = reg2.test(inputString);//判断小数位,位数为输入的长度
			 return result2;
		 }else{
		     return false;
		 }
}
//去除字符串所有空格
common.removeAllSpace = function(str){
     return str.replace(/\s+/g, "");
}
//删除左右两端的空格
common.myTrim = function(str){
     return str.replace(/(^\s*)|(\s*$)/g, "");
}
//去掉所有的html标记
common.delHtmlTag = function(str){
   return str.replace(/<[^>]+>/g,""); 
}
//去掉所有&nbsp;
common.delNbspTag = function(str){
   return str.replace(/&nbsp;/ig, "");  
}

//删除左右两端的空格
common.trimLeftAndright = function(str){
     return str.replace(/(^\s*)|(\s*$)/g, "");
}

//匹配正整数 
common.isNumber = function(str){
	 var reg=new RegExp("^[0-9]*[1-9][0-9]*$");  
     return (reg.test(str));//返回true或false
}