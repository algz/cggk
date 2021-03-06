var participant = {
    url : '../JSON/privilege_DataPrivilegeRemote.getDataPrivilegeVoList'
}
// 针对某个条数据，指定哪些用户和角色
participant.init = function() {
    Ext.grid.CheckboxSelectionModel.prototype.header = '<div id="hd-joe" class="x-grid3-hd-checker">&#160;</div>';
    var strurl = participant.url + '?a=' + new Date();

    participant.proxy = new Ext.data.HttpProxy({
                url : strurl,
                method : 'GET'
            });
    participant.reader = new Ext.data.JsonReader({
                root : 'results',
                totalProperty : 'totalProperty',
                messageProperty : 'msg',
                id : 'dataPrivilegeID'
            }, ['dataPrivilegeID', 'dataID', 'dataType', 'operatorID',
                    'operatorType', 'privilege', 'dataDetail', 'operatorName',
                    'operatorTypeName', 'dataTypeName']);

    participant.ds = new Ext.data.Store({
                proxy : participant.proxy,
                reader : participant.reader
            });
    participant.ds.on('load', function(store) {
                if (store.reader.jsonData.msg != '') {
//                  collarbMain.refresh();
                    Ext.MessageBox.show({
                                title : ''+getResource('resourceParam499')+'',
                                msg : store.reader.jsonData.msg,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                };
                if (Ext.fly(Ext.get('hd-joe').dom.parentNode)
                        .hasClass('x-grid3-hd-checker-on')) {
                    Ext.fly(Ext.get('hd-joe').dom.parentNode)
                            .removeClass('x-grid3-hd-checker-on');
                }
            })
    var addUserBt = {
        text : ''+getResource('resourceParam588')+'',
        iconCls : 'add1',
        handler : function() { // 此处的信息应该来自于树节点
            userMultiselect.init(participant.selectUserCallback,participant.grid.getStore(),"operatorName");
        }
    };
    var updateBt = {
        text : ''+getResource('resourceParam478')+'',
        iconCls : 'edit1',
        handler : function() {
            checkRole.init(participant.selectRoleCallback,setDataPrivilege.mainpanel.dataId,setDataPrivilege.mainpanel.dataType);
        }
    };
    var delBt = {
        text : ''+getResource('resourceParam475')+'',
        iconCls : 'del1',
        handler : participant.deleteOperator
    };

    var tb = ['-', addUserBt, '-', updateBt, '-', delBt, '-'];
    participant.setcm1();
    participant.grid = myGrid.initBox(participant.ds, participant.cm, tb,
            participant.sm);

    // 相应行单击事件，刷新权限界面
    participant.grid.on('rowclick', function(thisgrid) {
                // if (thisgrid.selModel.getSelected() != null) {
                // var dataPrivilegeID = thisgrid.selModel.getSelected()
                // .get('dataPrivilegeID');
                // alert(dataPrivilegeID);
                // dataPrivilege.refreshGrid(dataPrivilegeID);
                // }
            });

    participant.listpanel = new Ext.Panel({
                region : 'center',
                title : ''+getResource('resourceParam586')+'',
                id : 'participantListpanel',
                layout : 'fit',
                resizable : true,
                autoScroll : 'true',
                split : true,
                items : [participant.grid],
                listeners : {
                    bodyresize : function(panel, width, height) {
                        if (height < 150) {
                            panel.setHeight(150);
                        }
                    },
                    afterrender : function() {
                    }
                }
            });
    participant.baseargs = {}

    myGrid.loadvalue(participant.grid.store, {
                start : 0,
                limit : 25
            }, participant.baseargs);
    return participant.listpanel;

}
// 选择用户以后的回调函数
participant.selectUserCallback = function() {
    var dataStore = userMultiselect.usersore;
    var idObj = new Object();
    idObj['dataid'] = setDataPrivilege.mainpanel.dataId;
    idObj['datatype'] = setDataPrivilege.mainpanel.dataType;
    for (i = 0; i < dataStore.getCount(); i++) {
        var userid = dataStore.getAt(i).get('userid');
        idObj[userid] = userid;
    }
    // 保存到数据库，已经存在的用户不加入
    var strValue = Ext.util.JSON.encode(idObj);
    callSeam("privilege_DataPrivilegeRemote", "addDataPrivilegeUsers",
            [strValue], function(result) {
                var obj = Ext.util.JSON.decode(result);
                if (obj.success) {
                    participant.refreshGrid();
                } else {
                    participant.refreshGrid();
                    Ext.MessageBox.show({
                                title : ''+getResource('resourceParam499')+'',
                                msg : obj.message,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                }
            });

}
// 选择角色以后的回调函数
participant.selectRoleCallback = function() {
    var dataStore = checkRole.rolecheck;
    var idObj = new Object();
    idObj['dataid'] = setDataPrivilege.mainpanel.dataId;
    idObj['datatype'] = setDataPrivilege.mainpanel.dataType;
    for (i = 0; i < dataStore.getCount(); i++) {
        var roleid = dataStore.getAt(i).get('roleid');
        idObj[roleid] = roleid;
    }
    // 保存到数据库，已经存在的角色不加入
    var strValue = Ext.util.JSON.encode(idObj);
    callSeam("privilege_DataPrivilegeRemote", "addDataPrivilegeRoles",
            [strValue], function(result) {
                var obj = Ext.util.JSON.decode(result);
                if (obj.success) {
                    participant.refreshGrid();
                } else {
//                  collarbMain.refresh();
                    Ext.MessageBox.show({
                                title : ''+getResource('resourceParam499')+'',
                                msg : obj.message,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                }

            });
}

participant.setcm1 = function() {
    participant.sm = new Ext.grid.CheckboxSelectionModel({
                listeners : {
                    selectionchange : function(sm) {
                        
                    },
                    rowselect : function(sm, rowIndex, record) {
                        if (participant.ds.getCount() == sm.getCount()) {

                            Ext.fly(Ext.get('hd-joe').dom.parentNode)
                                    .addClass('x-grid3-hd-checker-on');
                        } else {
                            Ext.fly(Ext.get('hd-joe').dom.parentNode)
                                    .removeClass('x-grid3-hd-checker-on');
                        }
                        if (sm.getCount() == 0) {
                            dataPrivilege.flag = false;
                            dataPrivilege.refreshNullGrid();

                        } else if (sm.getCount() == 1) {
                            var dataPrivilegeID = sm.getSelected()
                                    .get('dataPrivilegeID');
                            dataPrivilege.flag = false;
                            dataPrivilege.refreshGrid(dataPrivilegeID);

                        } else if (sm.getCount() > 1) {
                            var dataPrivilegeID = sm.getSelected()
                                    .get('dataPrivilegeID');
                            dataPrivilege.flag = true;// 当check多个数据权限修改时，
                            dataPrivilege.refreshGrid(dataPrivilegeID, 0);
                        }
                    }
                }
            });
    participant.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
            new Ext.grid.RowNumberer(), participant.sm, {
                header : ""+getResource('resourceParam480')+"",
                width : 80,
                dataIndex : 'operatorName'
            }, {
                header : ""+getResource('resourceParam481')+"",
                width : 40,
                dataIndex : 'operatorTypeName'
            }]
    });
}
// 删除操作者
participant.deleteOperator = function() {
    var result = new Array();
    myGrid.rows = participant.sm.getSelections();
    if (myGrid.rows != null) {
        var size = myGrid.rows.length;
        if (size == 0) {
            Ext.MessageBox.show({
                        title : ''+getResource('resourceParam587')+'',
                        msg : ''+getResource('resourceParam584')+'',
                        buttons : Ext.MessageBox.OK,
                        icon : Ext.MessageBox.ERROR
                    });
            return;
        }
        Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam585')+"", function(btn) {
                    if (btn == 'yes') {
                        for (var i = 0; i < size; i++) {
                            result[i] = myGrid.rows[i].get('dataPrivilegeID');
                        }
                        callSeam("privilege_DataPrivilegeRemote",
                                "deleteDataPrivileges", [result],
                                participant.deleteResult);
                    }
                });
    } else {
        Ext.MessageBox.show({
                    title : ''+getResource('resourceParam587')+'',
                    msg : ''+getResource('resourceParam584')+'',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.ERROR
                });
    }
}

participant.deleteResult = function(result) {
    var obj = Ext.util.JSON.decode(result);
    if (obj.success) {// 删除成功以后无需提示
        // Ext.MessageBox.show({
        // title : '信息提示',
        // msg : '删除成功！',
        // buttons : Ext.MessageBox.OK,
        // icon : Ext.MessageBox.INFO
        // });
        participant.refreshGrid();// 刷新操作者grid
        dataPrivilege.refreshNullGrid();// 权限grid刷为空
    } else {
//      collarbMain.refresh();
        Ext.MessageBox.show({
                    title : ''+getResource('resourceParam499')+'',
                    msg : obj.message,
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.ERROR
                });
    }
}

participant.refreshGrid = function() {// 刷新操作者grid，刷新当前页
    // 需要加入分页
    var proxy = new Ext.data.HttpProxy({
                url : participant.url + '?dataID='
                        + setDataPrivilege.mainpanel.dataId + '&dataType='
                        + setDataPrivilege.mainpanel.dataType + '&a='
                        + new Date()
            });
    participant.grid.getStore().proxy = proxy;
    var lastOptions = participant.grid.store.lastOptions;
    var pageStart = 0;
    var pageLimit = 25;
    if (lastOptions && lastOptions.params) {// 设置刷新当前页
        pageStart = lastOptions.params.start;
        pageLimit = lastOptions.params.limit;
    }
//  participant.grid.getStore().baseParams = {
//      start : pageStart,
//      limit : pageLimit
//  };
    myGrid.loadvalue(participant.grid.store, {
                start : pageStart,
                limit : pageLimit
            }, participant.baseargs);
//  participant.grid.getStore().load();
}
