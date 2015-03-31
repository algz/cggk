var userSelectUI = {
	
} 
//fieldLabel为标签
//name为该combo的name
//jiaose=0时为选择主办人员，选择后需要将数据显示在参与人员表格中,并需要筛选人员数据
//jiaose=1时为选择协办人员，选择后需要将数据显示在参与人员表格中,并需要筛选人员数据
//jiaose=null时为选择一般人员，此时不需要将数据显示在参与人员表格中,并需要筛人员选数据
//jiaose=-1时为选择所有人员，此时不需要考虑人员数据的筛选
userSelectUI.getCombo = function(fieldLabel, name, jiaose, glianId, glianlx, value) {
	var combo = new Ext.form.ComboBox({
		fieldLabel:fieldLabel,
		name:name,
		store:userSelectAjax.getComboData(),
		triggerAction:'all',
		displayField:'yonghuxm',
		valueField:'yonghuId',
		hiddenName:name,
		listWidth:280,
		emptyText:''+getResource('resourceParam881')+'',
		loadingText:''+getResource('resourceParam889')+'.',
		allowBlank:false,
		pageSize:10,
		allQuery:'_all',
		minChars:100,
		anchor:"90%",
		value: value,
		lazyInit:false
	});
	
	//回车事件
	combo.on('specialkey', function(zhuban, e) {
		if(e.getKey() == e.ENTER) {
			combo.doQuery(encodeURIComponent(combo.getEl().dom.value), true);
		}
	}); 
	
	if(jiaose == -1) {
		return combo;
	}
	
	//下拉框出现时筛选数据,已经选择的人员不显示
	combo.on('expand', function(combo) {
		combo.store.clearFilter(true);
		combo.store.filterBy(function(record) {
			index = renyuanUI.ds.find('yonghuId', record.get('yonghuId'));
			if(index > -1) {
				return false;
			} else {
				return true;
			}
		});
	});
	//数据加载后筛选数据，已经选择的人员不显示
	combo.store.on('load', function() {
		combo.store.filterBy(function(record) {
			index = renyuanUI.ds.find('yonghuId', record.get('yonghuId'));
			if(index > -1) {
				return false;
			} else {
				return true;
			}
		});
	});

	if(jiaose <= 1) {
		//选择事件,将数据添加到参与人员数据中
		combo.on('select', function(combo) {
			var select = combo.store.getAt(combo.store.find('yonghuId', combo.getValue()));
			index = renyuanUI.ds.find('jiaose', jiaose);
			if(index > -1) {
				renyuanUI.ds.remove(renyuanUI.ds.getAt(index));
			}
			var record = new Ext.data.Record.create([
				{name:'yonghuId'},
				{name:'yonghuxm'},
				{name:'zhiwu'},
				{name:'jiaose'},
				{name:'renyleix'},
				{name:'instcode'},
				{name:'instname'},
				{name:'glianId'},
				{name:'glianlx'},
				{name:'sign', type:'boolean'}
			]);
			renyuanUI.ds.insert(0,new record({
				yonghuId:combo.getValue(),
				yonghuxm:combo.getRawValue(),
				zhiwu:select.get('zhiwu'),
				jiaose:jiaose,
				renyleix:'0',
				instcode:select.get('instcode'),
				instname:select.get('instname'),
				glianId:glianId,
				glianlx:glianlx,
				sign:true
			}));
		});
		
	}
	return combo;
}
