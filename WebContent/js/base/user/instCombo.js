var instCombo = {
	
}

//viewType为0时，显示所有机构
//viewType为1时，显示所有科技处.且top为0时,不包括成都分行 top为1时包括
//viewType为2时，显示登陆机构所在二级级别（中支或分行级别）下属机构科技处
//viewType为3时，显示登陆机构所属及其下属所有机构
//viewType为4时，显示登陆机器IP地址所属2级机构下所有机构
//viewType为5时，显示全省所有中支以上（包括中支）级别的机构
//viewType为6时，显示登陆机构所在二级级别（中支或分行级别）所有下属机构
//viewType为7时，显示权限数据范围内的所有机构
//viewType为8时，显示分行机关科技处
instCombo.getCombo = function(fieldLabel, name, viewType, anchor, allowBlank,value) {
	url = '../JSON/base_organization_OrganizationService.getComboData';
//	if(viewType == 4) {
//		baseParams = {
//			viewType:viewType,
//			ip:ip
//		}
//	} else {
//		if(viewType == 1) {
//			baseParams = {
//				viewType:viewType,
//				top:top
//			}
//		} else {
//			baseParams = {
//				viewType:viewType
//			}
//		}
//		
//	}
	baseParams = {
				 
	}
	var store =  new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:url
		}),
		reader:new Ext.data.JsonReader({
			totalProperty:'totalProperty',
			root:'results'
		}, [
			{name:'instcode'},
			{name:'instname'},
			{name:'kind'}
		]),
		baseParams:baseParams
	});
	
	var combo = new Ext.form.ComboBox({
		fieldLabel:fieldLabel,
		queryParam:'instname',
		name:name,
		store:store,
		triggerAction:'all',
		displayField:'instname',
		valueField:'instcode',
		hiddenName:name,
		listWidth:240,
		emptyText:''+getResource('resourceParam890')+'',
		loadingText:''+getResource('resourceParam889')+'.',
//		allowBlank:false,
//		value:value,
		pageSize:10,
		allQuery:'_all',
		minChars:100,
		anchor:anchor,
		lazyInit:false,
		allowBlank:allowBlank,
		invalidText:''+getResource('resourceParam888')+'',
		validationEvent:'enter',
		validator:function() {
			if(combo.getValue() == null || combo.getValue() == '') {
				return false;	
			} else {
				return true;
			}
		}
	});
	if(!(value == null || value == '')) {
		combo.value = value
	}
	//回车事件
	combo.on('specialkey', function(select, e) {
		if(e.getKey() == e.ENTER) {
			combo.doQuery(combo.getEl().dom.value, true);
		}
	}); 

	return combo;
};

instCombo.getCombo_new = function(configerQueryVo,fieldLabel, name, viewType, anchor, allowBlank, ip, value) {

		if (configerQueryVo==null)
		{
			
			return instCombo.getCombo(fieldLabel, name, viewType, anchor, allowBlank, ip, value);
		}
		else
		{	
			url = '../JSON/common_combo_InstComboSvr.getComboData';
			if(viewType == 4) {
				baseParams = {
					viewType:viewType,
					ip:ip,
					configerQueryVoStr:Ext.util.JSON.encode(configerQueryVo)
				}
			} else {
				baseParams = {
					viewType:viewType,
					configerQueryVoStr:Ext.util.JSON.encode(configerQueryVo)
				}
			}
			var store =  new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({
				url:url
			}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'results'
			}, [
				{name:'instcode'},
				{name:'instname'},
				{name:'kind'}
			]),
			baseParams:baseParams
		});
		
		var combo = new Ext.form.ComboBox({
			fieldLabel:fieldLabel,
			queryParam:'instname',
			name:name,
			store:store,
			triggerAction:'all',
			displayField:'instname',
			valueField:'instcode',
			hiddenName:name,
			listWidth:240,
			emptyText:''+getResource('resourceParam890')+'',
			loadingText:''+getResource('resourceParam889')+'.',
	//		allowBlank:false,
			value:value,
			pageSize:10,
			allQuery:'_all',
			minChars:100,
			anchor:anchor,
			lazyInit:false,
			allowBlank:allowBlank,
			invalidText:''+getResource('resourceParam888')+'',
			validationEvent:'enter',
			validator:function() {
				if(combo.getValue() == null || combo.getValue() == '') {
					return false;	
				} else {
					return true;
				}
			}
		});
		
		//回车事件
		combo.on('specialkey', function(select, e) {
			if(e.getKey() == e.ENTER) {
				combo.doQuery(combo.getEl().dom.value, true);
			}
		}); 
		
			return combo;
		}
		
	
};



