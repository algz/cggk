
/*构建查询表单的查询页面*/
qualityQueryForm = {};

qualityQueryForm.init = function (typeid, wsname, wsid, desc) {
	var fPanel = new Ext.form.FormPanel({
		bodyStyle : 'padding:5px 5px',
		width : '500',
		border : false,
		autoScroll : true,
		labelAlign : 'right',
		style : 'margin-bottom: 5px;',
		labelSeprator : ':',
		buttonAlign : 'center',
		buttons : [{
			text : '确定',
			handler : function() {
				var conditions = '';
				var count = 0;
				fPanel.items.eachKey(function(key, item){
					if (item.el.dom.type == 'text' && item.el.dom.value != '') {
						count++;
						conditions += item.el.dom.id + "|" + item.el.dom.value + ',';
					}
				})
				conditions = conditions.substring(0, conditions.length - 1);
				//alert(conditions);
				if (count == 0) {
					Ext.Msg.alert('提示','必须输入一个查询条件');
					return;
				}
				var cneterpanel = Ext.getCmp('centerpanel').items.get(0);
				if (cneterpanel) {
					Ext.getCmp('centerpanel').remove(cneterpanel);
				}
				Ext.getCmp('queryWind').close();
				var attributePanel = wareHouseAttribute.init(typeid, wsname, wsid, desc, conditions);
				wareHouseAttribute.baseargs = null;
				Ext.getCmp('centerpanel').add(attributePanel);
				Ext.getCmp('centerpanel').doLayout();
			}
		},{
			text : '取消',
			handler : function(){Ext.getCmp('queryWind').close();}
		}]
	});
	var a = null;
	if (wsid == '20100806211954000156d3c58129439843ea8ed5') {
		a = queryFormSelectionPanel.disignQuality();//设计质量单
	} else if (wsid == '20100805180440000750c1cff095ad9a486babf8') {
		a = queryFormSelectionPanel.faultInfo();//故障信息报告单
	} else if (wsid == '20100805185942000250f30bca7684af472dabff') {
		a = queryFormSelectionPanel.faultInfoUpdate();/*故障信息问题与改进措施报告单*/
	} else if (wsid == '20100805190314000125eae905c5ee93416bb615') {
		a = queryFormSelectionPanel.faultInfoAffirm();/*故障信息问题纠正措施效果确认单*/
	} else if (wsid == '20100805190855000484680cad0b5f1748f58c59') {
		a = queryFormSelectionPanel.boardInfoMg();/*场外信息管理*/
	} else if (wsid == '20100805191153000859837b6ec6228643e29606') {
		a = queryFormSelectionPanel.boardTecMg();/*场外技术通报归口管理*/
	} else if (wsid == '20100805191511000281bde438537a924111b6d4') {
		a = queryFormSelectionPanel.syndicIssue();/*评审问题归零管理*/
	} else if (wsid == '20100805191731000640f2916fc0c9154ad3a842') {
		a = queryFormSelectionPanel.outerAuditing();/*外部审核问题归零管理表*/
	} else if (wsid == '2010080519202800014082a337c7462d48739011') {
		a = queryFormSelectionPanel.innerAuditing();/*内部自我审核问题归零管理表*/
	} else if (wsid == '20100805192304000000a5f82be367c342c8bc11') {
		a = queryFormSelectionPanel.controlDatabaseMg();/*设计更改的控制，数据库的管理*/
	} else if (wsid == '2010080519285600028179294dfbaf6a427fb31b') {
		a = queryFormSelectionPanel.departureApplyDatabaseMg();/*偏离申请单数据库的管理*/
	} else if (wsid == '20100805193306000250a95e54490eb2439abbca') {
		a = queryFormSelectionPanel.noEligibleDatabaseMg();/*不合格品审理单数据库的管理*/
	} else if (wsid == '2010080519364700053103f56f43a0cb49908f18') {
		a = queryFormSelectionPanel.softEditionDatabase();/*机载软件版本清单库*/
	}
	for (var i = 0; i < a.length; i++) {
		fPanel.add(a[i]);
	}
	return fPanel;
};


