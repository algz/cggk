var zongheUtil = {
	sel : false
};

zongheUtil.Query = function() {

	//bug:gaoyn 2011-5-25 
	
	delete zongheMain.baseargs;
	zongheMain.queryForm.getForm().reset();
	zongheMain.baseargs = {
		sorties : zongheQuery.zongheform.getForm().getValues().sorties,
		plannedstartstr : zongheQuery.zongheform.getForm().getValues().plannedstartstr,
		plannedendstr : zongheQuery.zongheform.getForm().getValues().plannedendstr,
		actualstartstr : zongheQuery.zongheform.getForm().getValues().actualstartstr,
		projectname : zongheQuery.zongheform.getForm().getValues().projectname,
		actualendstr : zongheQuery.zongheform.getForm().getValues().actualendstr,
		chargeddepid : departmentUser.codeid,
		//by suny 20101220
//		chargedmanid : departmentUser.userComb.getValue(),
		chargedmanid : departmentUser.userid,
        projectnotes : zongheQuery.zongheform.getForm().getValues().projectnotes,
		why : enmusEntity.usersComb.getValue()
			// flag:'chaxuen'
	};
	

	myGrid.loadvalue(zongheMain.proejectGrid.store, zongheMain.args,
			zongheMain.baseargs);
	zongheMain.cenpanel.layout.setActiveItem(0);
	zongheMain.cenpanel.doLayout();

}
/**
 * 清除查询条件
 */
zongheUtil.Formatparams = function() {
	zongheMain.baseargs = {
		projectid : null,
		projectname : null,
		taskid : null,
		taskname : null,
		chargeddepid : null,
		chargeddepname : null,
		tablename : null,
		chargedmanid : null,
		chargedmanname : null,
		completeratio : null,
		type : null,
		batch : null,
		sortie : null,
		plannedstartstr : null,
		actualstartstr : null,
		actualendstr : null,
		partsnum : null,
		taskstatusid : null,
		taskcategoryname : null,
		plannedendstr : null

	};
}
/**
 * 高级查询
 */
zongheUtil.GQuery = function() {
	delete zongheMain.baseargs;
	zongheMain.queryForm.getForm().reset();
	zongheMain.baseargs = {
		sorties : zongheQuery.zongheform.getForm().getValues().sorties,
		plannedstartstr : zongheQuery.zongheform.getForm().getValues().plannedstartstr,
		plannedendstr : zongheQuery.zongheform.getForm().getValues().plannedendstr,
		actualstartstr : zongheQuery.zongheform.getForm().getValues().actualstartstr,
		projectname : zongheQuery.zongheform.getForm().getValues().projectname,
		actualendstr : zongheQuery.zongheform.getForm().getValues().actualendstr,
		chargeddepid : departmentUser.codeid,
		//by suny 20101220
//		chargedmanid : departmentUser.userComb.getValue(),
		chargedmanid : departmentUser.userid,
        projectnotes : zongheQuery.zongheform.getForm().getValues().projectnotes,
		why : enmusEntity.usersComb.getValue()
			// flag:'chaxuen'
	};

	zongheMain.cenpanel.layout.setActiveItem(1);
	zongheMain.cenpanel.doLayout();
	// zongheMain.baseargs=Ext.util.JSON.encode(zongheMain.baseargs);
	myGrid.loadvalue(zongheMain.renwugrid.store, zongheMain.args,
			zongheMain.baseargs);
	zongheUtil.sel = true;
	zongheQuery.zongheform.getForm().reset();
}
