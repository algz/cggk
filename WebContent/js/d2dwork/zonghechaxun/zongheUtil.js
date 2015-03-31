var zongheUtil = {
	sel : false
};
/**
 * 查询
 */
zongheUtil.Query = function() {
	zongheMain.baseargs = {
        projectid : null,
		model : null,
		batchs : null,
		sorties : null,

		actualstartstr : null,

		taskname : null,
		queryResult : "1",
		actualendstr : null,
		tablename : zongheMain.tablename,
		partsnum : null,

		taskcategoryname : null,
		taskcategoryid : null,
		//edit by suny 20101220
//		chargedmanid : departmentUser.userComb2.getValue(),
//		chargeddepid : departmentUser.departmentCombo2.getValue(),
		chargedmanid : departmentUser.userid,
		chargeddepid : departmentUser.codeid,
		chargedmanname : zongheNorth.manname,
		chargeddepname : zongheNorth.codename,
		taskstatusids : zongheMain.queryForm.getForm().getValues().taskstatusid,
		plannedstartstr : zongheMain.queryForm.getForm().getValues().plannedstartstr,
		plannedendstr : zongheMain.queryForm.getForm().getValues().plannedendstr
		// flag:'chaxuen'
	};
	// var str=Ext.util.JSON.encode(zongheMain.baseargs);
	// zongheMain.renwuInfogrid = gongyiInfoGrid.grid();
	myGrid.loadvalue(zongheMain.renwugrid.store, zongheMain.args,
			zongheMain.baseargs);
	zongheUtil.sel = true;
//	zongheUtil.Formatparams();
	// zongheMain.queryForm.getForm().reset();
}
/**
 * 清除查询条件
 */
zongheUtil.Formatparams = function() {
    departmentUser.userid = null,
    zongheNorth.manname = null,
    zongheNorth.codename = null,
    departmentUser.codeid = null,
    zongheNorth.applicationname = null,
    zongheNorth.projectname = null,
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
		taskstatusids : null,
		taskcategoryname : null,
		plannedendstr : null,
		applicationname : null

	};
}
/**
 * 高级查询
 */
zongheUtil.GQuery = function() {
	zongheMain.queryForm.getForm().reset();
	zongheMain.baseargs = {
		model : zongheQuery.zongheform.getForm().getValues().model,
		batchs : zongheQuery.zongheform.getForm().getValues().batchs,
		sorties : zongheQuery.zongheform.getForm().getValues().sorties,
		plannedstartstr : zongheQuery.zongheform.getForm().getValues().plannedstartstr,
		plannedendstr : zongheQuery.zongheform.getForm().getValues().plannedendstr,
		actualstartstr : zongheQuery.zongheform.getForm().getValues().actualstartstr,
		chargedmanname : zongheQuery.zongheform.getForm().getValues().chargedmanname,
		taskname : zongheQuery.zongheform.getForm().getValues().taskname,
		chargeddepname : zongheQuery.zongheform.getForm().getValues().chargeddepname,
		actualendstr : zongheQuery.zongheform.getForm().getValues().actualendstr,
		tablename : zongheMain.tablename,
		chargedmanid : departmentUser.userComb.getValue(),
		chargeddepid : departmentUser.departmentCombo.getValue(),
		partsnum : zongheQuery.zongheform.getForm().getValues().partsnum,
		taskstatusids : zongheQuery.zongheform.getForm().getValues().taskstatusid,
		taskcategoryname : zongheQuery.zongheform.getForm().getValues().taskcategoryname,
		taskcategoryid : zongheQuery.zongheform.getForm().getValues().taskcategoryid,
		queryResult : zongheQuery.queryResult,
		applicationname : zongheNorth.applicationname,
		projectid : zongheQuery.projectName.getValue()
		// flag:'chaxuen'
	};

	// zongheMain.baseargs=Ext.util.JSON.encode(zongheMain.baseargs);
	if (zongheQuery.queryResult == "1") {
		myGrid.loadvalue(zongheMain.renwugrid.store, zongheMain.args,
				zongheMain.baseargs);
	} else {
		if (zongheMain.renwugrid.store != null) {
			zongheMain.renwugrid.store.filterBy(function(record, id) {
				var flag = false;
				if (record.get('taskname') == zongheMain.baseargs.taskname
						|| zongheMain.baseargs.taskname.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('chargedmanid') == zongheMain.baseargs.chargedmanid
						|| zongheMain.baseargs.chargedmanid.length <= 0) {
					flag = true;
				} else {

					return false;
				}
				if (record.get('chargeddepid') == zongheMain.baseargs.chargeddepid
						|| zongheMain.baseargs.chargeddepid.length <= 0) {
					flag = true;
				} else {
					return false;
				}

				var tasksarray = zongheMain.baseargs.taskstatusids;
				var s = record.get('taskstatusid') + '';
				if (tasksarray != s && tasksarray != undefined
						&& tasksarray != null && tasksarray.length > 0) {
					var n = tasksarray.split(",");
					var h = 0;
					for (var i = 0; i < n.length; i++) {
						if (s == n[i]) {
							h++;
						}
					}
                    
					if (h == 0) {
						return false;
					}else
                    {
                      flag = true;
                    }

				} else {
					flag = true;
				}

				if (record.get('taskcategoryid') == zongheMain.baseargs.taskcategoryid
						|| zongheMain.baseargs.taskcategoryid.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('plannedstartstr') == zongheMain.baseargs.plannedstartstr
						|| zongheMain.baseargs.plannedstartstr.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('plannedendstr') == zongheMain.baseargs.plannedendstr
						|| zongheMain.baseargs.plannedendstr.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('actualstartstr') == zongheMain.baseargs.actualstartstr
						|| zongheMain.baseargs.actualstartstr.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('actualendstr') == zongheMain.baseargs.actualendstr
						|| zongheMain.baseargs.actualendstr.length <= 0) {
					flag = true;
				} else {
					return false;
				}
				if (record.get('applicationname') == zongheNorth.applicationname || Ext.isEmpty(zongheNorth.applicationname)) {
					flag = true;
				}else
                {
                    return false;
                }
				if (record.get('projectid') == zongheNorth.projectid || Ext.isEmpty(zongheNorth.projectid)) {
					flag = true;
				}
				else {
					return false;
				}
				return flag;

			});
		} else {
			return;
		}
	}
	zongheUtil.sel = true;
    zongheUtil.Formatparams();
	zongheQuery.zongheform.getForm().reset();
}
