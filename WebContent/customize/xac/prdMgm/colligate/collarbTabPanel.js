var collarbTabPanel = {};
var data = {};
collarbTabPanel.init = function() {

    Ext.QuickTips.init();
    function buttonFunc() {
        if (leftNavigationTree.nodeId == 0) {
            var node = leftNavigationTree.node;
            if (collarbMain.pasteType == 'cut') {
                if (collarbMain.cutProjectId != null) {
                    var copiedNode = collarbMain.leftTree
                            .getNodeById(collarbMain.cutProjectId);
                    if (copiedNode != null) {
                        if (copiedNode.contains(node)) {
                            Ext.getCmp('pasteTask').disable();
                        } else if (copiedNode.id == node.id) {
                            Ext.getCmp('pasteTask').disable();
                        } else if (!copiedNode.contains(node)) {
                            Ext.getCmp('pasteTask').enable();
                        }
                    }
                } else {
                    Ext.getCmp('pasteTask').disable();
                }
            }
            if (collarbMain.pasteType == 'copy') {
                if (collarbMain.copyProjectId != null) {
                    var copiedNode = collarbMain.leftTree
                            .getNodeById(collarbMain.copyProjectId);
                    if (copiedNode != null) {
                        if (copiedNode.contains(node)) {
                            Ext.getCmp('pasteTask').disable();
                        } else if (copiedNode.id == node.id) {
                            Ext.getCmp('pasteTask').disable();
                        } else if (!copiedNode.contains(node)) {
                            Ext.getCmp('pasteTask').enable();
                        }
                    }
                }
            }

        } else if (leftNavigationTree.nodeId.indexOf('c') == 0) {
            if (data.modify) {
                Ext.getCmp('update').enable();
                var node = leftNavigationTree.node;
                if (collarbMain.pasteType == 'cut') {
                    if (collarbMain.cutProjectId != null) {
                        var copiedNode = collarbMain.leftTree
                                .getNodeById(collarbMain.cutProjectId);
                        if (copiedNode != null) {
                            if (copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (copiedNode.id == node.id) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (!copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').enable();
                            }
                        }
                    } else {
                        Ext.getCmp('pasteTask').disable();
                    }
                }
                if (collarbMain.pasteType == 'copy') {
                    if (collarbMain.copyProjectId != null) {
                        var copiedNode = collarbMain.leftTree
                                .getNodeById(collarbMain.copyProjectId);
                        if (copiedNode != null) {
                            if (copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (copiedNode.id == node.id) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (!copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').enable();
                            }
                        }
                    }
                }
            } else {
                Ext.getCmp('update').disable();
                Ext.getCmp('pasteTask').disable();
            }
            if (data.del) {
                Ext.getCmp('delete').enable();
            } else {
                Ext.getCmp('delete').disable();
            }
            Ext.getCmp('terminate').disable();
            Ext.getCmp('approve').disable();
            if (data.setprivilege) {
                Ext.getCmp('privilege').enable();
            } else {
                Ext.getCmp('privilege').disable();
            }
            Ext.getCmp('copyTask').disable();
            Ext.getCmp('cutTask').disable();
            Ext.getCmp('moveUp').disable();
            Ext.getCmp('moveDown').disable();
        } else if (leftNavigationTree.nodeId.indexOf('p') == 0
                || leftNavigationTree.nodeId.indexOf('vp') == 0) {
            if (data.modify) {

                if (leftNavigationTree.statusId == '6'
                        || leftNavigationTree.statusId == '7'
                        || leftNavigationTree.statusId == '5'
                        || leftNavigationTree.statusId == '11') {
                    Ext.getCmp('update').disable();
                } else {
                    Ext.getCmp('update').enable();
                }
                Ext.getCmp('examApprovalTab').enable();
                if (collarbMain.pasteType == 'cut') {
                    if (collarbMain.cutTaskId != null) {
                        Ext.getCmp('pasteTask').enable();
                    } else {
                        Ext.getCmp('pasteTask').disable();
                    }
                } else if (collarbMain.pasteType == 'copy') {
                    if (collarbMain.copyTaskId != null) {
                        Ext.getCmp('pasteTask').enable();
                    } else {
                        Ext.getCmp('pasteTask').disable();
                    }
                }
            } else {
                Ext.getCmp('update').disable();
                Ext.getCmp('pasteTask').disable();
                Ext.getCmp('examApprovalTab').disable();
            }
            Ext.getCmp('copyTask').enable();
            Ext.getCmp('cutTask').enable();
            Ext.getCmp('moveUp').disable();
            Ext.getCmp('moveDown').disable();
            if (data.del) {
                Ext.getCmp('delete').enable();
            } else {
                Ext.getCmp('delete').disable();
            }
            if (data.terminate) {
                Ext.getCmp('terminate').enable();
            } else {
                Ext.getCmp('terminate').disable();
            }
            if (data.approve || data.setpass || data.setcompleted
                    || data.modify) {
                // 送审下拉
                Ext.getCmp('approve').enable();
            } else {
                Ext.getCmp('approve').disable();
            }
            if (data.approve) {
                // 提交送审
                if (leftNavigationTree.statusId == '1'
                        || leftNavigationTree.statusId == '4') {
                    Ext.getCmp('projectVerify').enable();
                } else {
                    Ext.getCmp('projectVerify').disable();
                }
            } else {
                Ext.getCmp('projectVerify').disable();
            }
            if (data.setpass || data.setcompleted) {
                // 置通过、完成
                if (leftNavigationTree.statusId == '1') {
                    Ext.getCmp('projectApprove').setText(''
                            + getResource('resourceParam100') + '');
                    Ext.getCmp('projectApprove').enable();
                } else if (leftNavigationTree.statusId == '4') {
                    Ext.getCmp('projectApprove').setText(''
                            + getResource('resourceParam101') + '');
                    Ext.getCmp('projectApprove').enable();
                } else {
                    Ext.getCmp('projectApprove').disable();
                }
            } else {
                Ext.getCmp('projectApprove').disable();
            }

            if (data.setprivilege) {
                Ext.getCmp('privilege').enable();
            } else {
                Ext.getCmp('privilege').disable();
            }
        } else {
            var node = collarbMain.leftTree
                    .getNodeById(leftNavigationTree.nodeId);
            if (node.attributes.nt == 1 || node.attributes.nt == '1') {
                Ext.getCmp('create').disable();
            } else {
                Ext.getCmp('create').enable();
            }
            if (data.modify) {

                if (leftNavigationTree.statusId == '6'
                        || leftNavigationTree.statusId == '7'
                        || leftNavigationTree.statusId == '5'
                        || leftNavigationTree.statusId == '11') {
                    Ext.getCmp('update').disable();
                } else {
                    Ext.getCmp('update').enable();
                }
                Ext.getCmp('examApprovalTab').enable();
                Ext.getCmp('copyTask').enable();
                Ext.getCmp('cutTask').enable();
                var node = leftNavigationTree.node;
                if (collarbMain.pasteType == 'cut') {
                    if (collarbMain.cutTaskId != null) {
                        var copiedNode = collarbMain.leftTree
                                .getNodeById(collarbMain.cutTaskId);
                        if (copiedNode != null) {
                            if (copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (copiedNode.id == node.id) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (!copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').enable();
                            }
                        }
                    } else {
                        Ext.getCmp('pasteTask').disable();
                    }
                }
                if (collarbMain.pasteType == 'copy') {
                    if (collarbMain.copyTaskId != null) {
                        var copiedNode = collarbMain.leftTree
                                .getNodeById(collarbMain.copyTaskId);
                        if (copiedNode != null) {
                            if (copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (copiedNode.id == node.id) {
                                Ext.getCmp('pasteTask').disable();
                            } else if (!copiedNode.contains(node)) {
                                Ext.getCmp('pasteTask').enable();
                            }
                        }
                    }
                }
            } else {
                Ext.getCmp('copyTask').disable();
                Ext.getCmp('update').disable();
                Ext.getCmp('examApprovalTab').disable();
                Ext.getCmp('cutTask').disable();
                Ext.getCmp('pasteTask').disable();

            }
            if (data.del) {
                Ext.getCmp('delete').enable();
            } else {
                Ext.getCmp('delete').disable();
            }
            if (data.terminate) {
//              if (node.attributes.nt == 1 || node.attributes.nt == '1') {
//                  Ext.getCmp('terminate').disable();
//              } else {
                    Ext.getCmp('terminate').enable();
//              }
            } else {
                Ext.getCmp('terminate').disable();
            }
            if (data.approve || data.setpass || data.setcompleted
                    || data.modify) {
                Ext.getCmp('approve').enable();
            } else {
                Ext.getCmp('approve').disable();
            }
            // 提交审批
            if (data.approve) {
                leftNavigationTree.approval
                if (leftNavigationTree.statusId == '1') {
                    Ext.getCmp('projectVerify').enable();
                } else if (leftNavigationTree.statusId == '4' && leftNavigationTree.approval != 0) {
                    Ext.getCmp('projectVerify').enable();
                } else {
                    Ext.getCmp('projectVerify').disable();
                }
            } else {
                Ext.getCmp('projectVerify').disable();
            }
            if (data.setpass || data.setcompleted) {
                if (leftNavigationTree.statusId == '1') {
                    Ext.getCmp('projectApprove').setText(''
                            + getResource('resourceParam100') + '');
                    Ext.getCmp('projectApprove').enable();
                } else if (leftNavigationTree.statusId == '4') {
                    Ext.getCmp('projectApprove').setText(''
                            + getResource('resourceParam101') + '');
                    if(leftNavigationTree.approval == 2) {
                        Ext.getCmp('projectApprove').disable();
                    } else {
                        Ext.getCmp('projectApprove').enable();
                    }
                } else {
                    Ext.getCmp('projectApprove').disable();
                }
            } else {
                Ext.getCmp('projectApprove').disable();
            }
            if (data.setprivilege) {
                Ext.getCmp('privilege').enable();
            } else {
                Ext.getCmp('privilege').disable();
            }
            if (data.updown) {
                Ext.getCmp('moveUp').enable();
                Ext.getCmp('moveDown').enable();
            } else {
                Ext.getCmp('moveUp').disable();
                Ext.getCmp('moveDown').disable();
            }
        }

    }

    collarbTabPanel.attributePanelMain = attributePanel.init();
    collarbTabPanel.attributePanel = new Ext.Panel({
        id : 'attributePanel',
        itemId : 'attributePanel',
        title : getResource('resourceParam5001'),
        frame : false,
        boder : false,
        layout : 'fit',
        items : [collarbTabPanel.attributePanelMain],
        listeners : {
            activate : function() {
                this.removeClass('x-hide-display');
                if (leftNavigationTree.nodeId == 0) {
                    buttonFunc();
                } else if (leftNavigationTree.nodeId != 0) {
                    Ext.Ajax.request({
                        url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
                        method : 'POST',
                        success : function(response, options) {
                            var obj = Ext.util.JSON
                                    .decode(response.responseText);
                            var node = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            if (obj.remove) {
                                var el = node.getUI().getIconEl();
                                Ext.Element.fly(el)
                                        .removeClass(node.attributes.iconCls);
                                Ext.Element.fly(el).addClass(obj.iconCls);
                                Ext.MessageBox.show({
                                            title : ''
                                                    + getResource('resourceParam499')
                                                    + '',
                                            msg : obj.message,
                                            buttons : Ext.MessageBox.OK,
                                            icon : Ext.MessageBox.ERROR
                                        });
                            } else {
                                data = obj;
                                buttonFunc();
                                if (leftNavigationTree.nodeId.indexOf('p') == 0
                                        || leftNavigationTree.nodeId
                                                .indexOf('vp') == 0) {
                                    ProjectAttributePanel.setFirstPage();
                                    var errorCallBack = function(iconCls) {
                                        var node = collarbMain.leftTree
                                                .getNodeById(leftNavigationTree.nodeId);
                                        var el = node.getUI().getIconEl();
                                        Ext.Element
                                                .fly(el)
                                                .removeClass(node.attributes.iconCls);
                                        Ext.Element.fly(el).addClass(iconCls);
                                    }
                                    attributePanel.attributePanel.getLayout()
                                            .setActiveItem(0);
                                    ProjectAttributePanel.projectId = base
                                            .convertNodeId(leftNavigationTree.nodeId);
                                    ProjectAttributePanel.setBasicForm(
                                            ProjectAttributePanel.projectId,
                                            errorCallBack);
                                } else if (leftNavigationTree.nodeId != 0
                                        && leftNavigationTree.nodeId
                                                .indexOf('c') != 0) {
                                    TaskAttributePanel.setFirstPage();
                                    var errorCallBack = function(iconCls) {
                                        var node = collarbMain.leftTree
                                                .getNodeById(leftNavigationTree.nodeId);
                                        var el = node.getUI().getIconEl();
                                        Ext.Element
                                                .fly(el)
                                                .removeClass(node.attributes.iconCls);
                                        Ext.Element.fly(el).addClass(iconCls);
                                    }
                                    if (node.attributes.nt == 0
                                            || node.attributes.nt == '0') {
                                        attributePanel.attributePanel
                                                .getLayout().setActiveItem(1);
                                        TaskAttributePanel.setBasicForm(
                                                leftNavigationTree.nodeId,
                                                errorCallBack);
                                    } else if (node.attributes.nt == 1
                                            || node.attributes.nt == '1') {
                                        attributePanel.attributePanel
                                                .getLayout().setActiveItem(2);
                                        viewApproveTask.setBasicForm(
                                                leftNavigationTree.nodeId,
                                                errorCallBack);
                                    }

                                }
                            }
                        },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                            dataId : base
                                    .convertNodeId(leftNavigationTree.nodeId)
                        }
                    });
                }
            }
        }
    });

    function fnCallback(flag) {
        Ext.getCmp('dataObjectColumnTreeDel').disable();
        Ext.getCmp('dataObjectColumnTreeAdd').disable();
        Ext.getCmp('dataObjectColumnTreeUpdate').disable();
    }
    // 任务数据tab页
    var mydataObjectPanel = new dataObjectPanel();
    collarbTabPanel.dataPanel = mydataObjectPanel.init();
    collarbTabPanel.dataPanel.disable();
    collarbTabPanel.dataPanel.on('activate', function() {
        if (leftNavigationTree.nodeId != 0) {
                        buttonFunc();
                        var projectNode = collarbMain.leftTree
                                .getSelectionModel().getSelectedNode();
                        var enableEdit = !(projectNode.attributes.statusId == "6"
                                || projectNode.attributes.statusId == "7" || !data.modify)
                        if (projectNode.id.indexOf("c") != 0
                                && projectNode.id != 0) {
                            var selectedProjectId;
                            var selectedTaskId;
                            if (projectNode.id.indexOf("p") == 0
                                    || projectNode.id.indexOf("vp") == 0) {
                                selectedProjectId = base
                                        .convertNodeId(projectNode.id);
                                selectedTaskId = selectedProjectId.substr(1);
                            } else {
                                selectedProjectId = base
                                        .convertNodeId(projectNode.attributes.projectId)
                                selectedTaskId = base
                                        .convertNodeId(projectNode.id);
                            }
                            mydataObjectPanel.setConfigs(selectedProjectId,
                                    selectedTaskId, enableEdit);
                        }
        }
    })
    // end
    collarbTabPanel.relationPanel = new Ext.Panel({
        id : 'relationPanel',
        title : '' + getResource('resourceParam1154') + '',
        frame : false,
        boder : false,
        disabled : true,
        layout : 'fit',
        items : [relationPanel.init()],
        listeners : {
            activate : function() {
                var node = leftNavigationTree.node
				var projectid = '';
				if (leftNavigationTree.node.id.indexOf('p') == 0 ) {
					projectid = leftNavigationTree.node.id.substring(1, leftNavigationTree.node.id.length);
				} else if (leftNavigationTree.node.id.indexOf('vp') == 0) {
					projectid = leftNavigationTree.node.id.substring(2, leftNavigationTree.node.id.length);
				} else {
					projectid = leftNavigationTree.node.attributes.projectId;
				}
				relationPanel.active(projectid, node.id, node.attributes.name);
				buttonFunc();
            }
        }
    });
    collarbTabPanel.wbsContainer = new Ext.Panel({
                frame : false,
                boder : false,
                layout : 'fit'
            });
    collarbTabPanel.addColumnTree = function() {
        if (collarbTabPanel.wbs != null) {
            collarbTabPanel.wbsContainer.remove(collarbTabPanel.wbs);
        }
        wbsdata.nodeId = base.convertNodeId(leftNavigationTree.nodeId);
        wbsdata.checkbox = true;
        //西飞控制账目和工作包设置
//      var tbar = new Ext.Toolbar({
//          items : [{
//                      id : 'createTemplate1',
//                      text : '另存为' + getResource('resourceParam943') + '模板',
//                      disabled : true,
//                      handler : function() {
//                          // template.reset();//添加后保存会报错
//                          wbsdata.getSelectIds();
//                          template.ids = wbsdata.selections;
//                          wbsdata.main.getLayout().setActiveItem(1);
//                      }
//
//                  }, '-', {
//                      id : 'kongzhiid',
//                      text : '控制账目',
//                      disabled : true,
//                      handler : function() {
//                          wbsdata.getSelectIds();
//                          wbsdata.selections;
//                          var appVo = Seam.Remoting
//                                  .createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
//                          appVo.setTaskStr(wbsdata.selections);
//                          appVo.setType("1");
//                          // var appVo =
//                          // {taskStr:wbsdata.selections,type:"1"};
//                          callSeam("budgetPvAcRemote",
//                                  "establishWorkOrControl", [appVo],
//                                  wbsdata.establishWorkOrControl);
//                      }
//
//                  }, '-', {
//                      id : 'gongzuoid',
//                      text : '工作包',
//                      disabled : true,
//                      handler : function() {
//                          wbsdata.getSelectIds();
//                          wbsdata.selections;
//                          var appVo = Seam.Remoting
//                                  .createType("com.sysware.customize.xac.analysis.vo.BudgetpvacVo");
//                          appVo.setTaskStr(wbsdata.selections);
//                          appVo.setType("2");
//                          // var appVo =
//                          // {taskStr:wbsdata.selections,type:"2"};
//                          callSeam("budgetPvAcRemote",
//                                  "establishWorkOrControl", [appVo],
//                                  wbsdata.establishWorkOrControl);
//                      }
//
//                  }, '-']
//      });
//      collarbTabPanel.wbs = wbsdata.init({
//                  tbar : tbar
//              });
//      wbsdata.sm.on('selectionchange', function(sm) {
//                  if (sm.getCount() > 0) {
//                      Ext.getCmp("kongzhiid").enable();
//                      Ext.getCmp("gongzuoid").enable();
//                      Ext.getCmp("createTemplate1").enable();
//
//                  } else {
//                      Ext.getCmp("kongzhiid").disable();
//                      Ext.getCmp("gongzuoid").disable();
//                      Ext.getCmp("createTemplate1").disable();
//                  }
//              });
        collarbTabPanel.wbs = wbsdata.init();
        collarbTabPanel.wbsContainer.add(collarbTabPanel.wbs);
        collarbTabPanel.wbsContainer.doLayout();
    };

    collarbTabPanel.wbsPanel = new Ext.Panel({
        id : 'wbsPanelOnTab',
        title : 'WBS',
        frame : false,
        boder : false,
        layout : 'fit',
        items : [collarbTabPanel.wbsContainer],
        listeners : {
            activate : function() {
                Ext.Ajax.request({
                    url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
                    method : 'POST',
                    success : function(response, options) {
                        var obj = Ext.util.JSON.decode(response.responseText);
                        if (obj.remove) {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.message,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                        } else {
                            data = obj;
                            buttonFunc();
                            collarbTabPanel.addColumnTree();
                            wbsdata.sourceNodeId = '';
                            wbsdata.relationtypes = '1,2';
                            wbsdata.refresh();
                        }
                    },
                    disableCaching : true,
                    autoAbort : true,
                    params : {
                        dataId : base.convertNodeId(leftNavigationTree.nodeId)
                    }
                });
            }
        }
    });

    var logAttributeTaskId = new Ext.form.TextField({

                id : 'logAttributeTaskId',
                inputType : 'hidden'
            });

    var logAttributeTask = new Ext.form.TextField({
                fieldLabel : '' + getResource('resourceParam624') + '',
                id : 'logAttributeTask',
                style : 'margin-bottom: 5px;',
                readOnly : true,
                width : 300
            });
    var logName = new Ext.form.TextField({
                id : 'logName',
                fieldLabel : '' + getResource('resourceParam786') + '',
                style : 'margin-bottom: 5px;',
                width : 100,
                allowBlank : false,
                emptyText : '' + getResource('resourceParam1553') + '',
                maxLength : 50,
                minLengthText : '' + getResource('resourceParam786')
                        + '不能大于50!',
                msgTarget : 'side'
            });
    var logContent = new Ext.form.TextArea({
                id : 'logContent',
                fieldLabel : '' + getResource('resourceParam787') + '',
                style : 'margin-bottom: 5px;',
                width : 200,
                height : 100,
                allowBlank : false,
                emptyText : '' + getResource('resourceParam785') + '',
                maxLength : 500,
                maxLengthText : '' + getResource('resourceParam783') + ''
            });
    // var logFile1 = new Ext.form.TextField({
    // inputType : 'file',
    // allowBlank : true,
    // id : 'logFile1',
    // width : 200,
    // fieldLabel : '文件'
    // // ,
    // // buttonCfg : {
    // // text : '',
    // // iconCls : 'upload-icon'
    // // }
    //
    // });

    collarbTabPanel.logAddForm = new Ext.form.FormPanel({
                id : 'logAddForm',
                fileUpload : true,
                enctype : 'multipart/form-data',
                bodyStyle : 'padding:5px 5px 0',
                disabled : true,
                // height:800,
                labelWidth : 80,
                defaults : {
                    anchor : '62%',
                    // allowBlank : false,
                    msgTarget : 'side'
                },
                items : [logAttributeTaskId, logAttributeTask, logName,
                        logContent, {
                            xtype : 'fileuploadfield',
                            id : 'logfile1',
                            fieldLabel : '' + getResource('resourceParam469')
                                    + '',
                            buttonText : '' + getResource('resourceParam473')
                                    + ''

                        }],
                buttons : [{
                            text : '' + getResource('resourceParam605') + '',
                            handler : logSubmit
                        }, {
                            text : '' + getResource('resourceParam606') + '',
                            handler : logReset
                        }]
            });

    function logSubmit() {
        // alert(Ext.getCmp('logAttributeTaskId').getValue());
        // return ;
        var temp = Ext.getCmp('logContent').getValue();
        if ("" == collarbMain.chargedManId || null == collarbMain.chargedManId
                || undefined == collarbMain.chargedManId) {
            Ext.Msg.show({
                        title : '' + getResource('resourceParam596') + '',
                        msg : '' + getResource('resourceParam1551') + '',
                        width : 170,
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.INFO
                    });
            return;
        }

        if (!collarbTabPanel.logAddForm.getForm().isValid()) {
            return;
        }
        collarbTabPanel.logAddForm.getForm().submit({
            url : '../logupload?logAttributeTaskId='
                    + base.convertNodeId(Ext.getCmp('logAttributeTaskId')
                            .getValue()) + '&logAttributeTask='
                    + Ext.getCmp('logAttributeTask').getValue() + '&logName='
                    + Ext.getCmp('logName').getValue() + '&logContent='
                    + Ext.getCmp('logContent').getValue()
                    + '&messageType=3&publishMode=4&chargedManId='
                    + collarbMain.chargedManId,
            method : 'post',
            // params:logAddForm,
            success : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam597') + '',//改成发布成功 2011-4-28 gzj
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.INFO
                        });
                var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
                        .getValue();
                var logAttributeTasks = Ext.getCmp("logAttributeTask")
                        .getValue();
                collarbTabPanel.logAddForm.getForm().reset();
                Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
                Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
            },
            failure : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam623') + '',
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });
            }

        });
    }
    function logSave() {
        // alert(Ext.getCmp('logAttributeTaskId').getValue());
        // return ;
        var temp = Ext.getCmp('logContent').getValue();
        if (!collarbTabPanel.logAddForm.getForm().isValid()) {
            return;
        }
        collarbTabPanel.logAddForm.getForm().submit({
            url : '../logupload?logAttributeTaskId='
                    + base.convertNodeId(Ext.getCmp('logAttributeTaskId')
                            .getValue()) + '&logAttributeTask='
                    + Ext.getCmp('logAttributeTask').getValue() + '&logName='
                    + Ext.getCmp('logName').getValue() + '&logContent='
                    + Ext.getCmp('logContent').getValue()
                    + '&messageType=3&publishMode=1',
            method : 'post',
            // params:logAddForm,
            success : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam623') + '',
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.INFO
                        });
                var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
                        .getValue();
                var logAttributeTasks = Ext.getCmp("logAttributeTask")
                        .getValue();
                collarbTabPanel.logAddForm.getForm().reset();
                Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
                Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
            },
            failure : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam623') + '',
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });
            }

        });
    }
    function logReset() {
        Ext.getCmp('logName').setValue("");
        Ext.getCmp('logContent').setValue("");
        Ext.getCmp('logfile1').setValue("");
    }
    collarbTabPanel.addloginfo = new Ext.Panel({
        id : 'addloginfo',
        title : '  ' + getResource('resourceParam789') + '',
        // visible : false,
        //
        // autoScroll : true,
        layout : 'fit',
        items : [collarbTabPanel.logAddForm],
        listeners : {
            'activate' : function() {
                // logTabPanel.doLayout();
                Ext.Ajax.request({
                    url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
                    method : 'POST',
                    success : function(response, options) {
                        var obj = Ext.util.JSON.decode(response.responseText);
                        if (obj.remove) {
                            // collarbMain.refresh();
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.message,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                        } else {
                            data = obj;
                            buttonFunc();
                        }
                    },
                    disableCaching : true,
                    autoAbort : true,
                    params : {
                        dataId : base.convertNodeId(leftNavigationTree.nodeId)
                    }
                });
            }
        }
    });
    collarbTabPanel.logTabPanel1 = new Ext.TabPanel({
                id : 'logTabPanel1',
                layoutOnTabChange : true,
                activeTab : 0,
                autoScroll : true,
                animScroll : true,
                resizeTabs : true,
                enableTabScroll : true,
                deferredRender : false,
                tabMargin : 0,
                items : [collarbTabPanel.addloginfo]

            });
    collarbTabPanel.egridpanel12 = new Ext.Panel({
                id : 'egridpanel12',
                layout : 'fit',
                items : [collarbTabPanel.logTabPanel1]
            });
    collarbTabPanel.feedbackPanel = new Ext.Panel({
        title : '' + getResource('resourceParam790') + '', //提醒
        frame : false,
        boder : false,
        layout : 'fit',
        disabled : true,
        items : [collarbTabPanel.egridpanel12],
        listeners : {
            'activate' : function() {
                Ext.Ajax.request({
                    url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
                    method : 'POST',
                    success : function(response, options) {
                        var obj = Ext.util.JSON.decode(response.responseText);
                        if (obj.remove) {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.message,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                        } else {
                            data = obj;
                            buttonFunc();
                            if (data.modify) {
                                collarbTabPanel.feedbackPanel.enable();
                            } else {
                                collarbTabPanel.feedbackPanel.disable();
                            }
                            collarbTabPanel.logTabPanel1.setActiveTab(0);
                        }
                    },
                    disableCaching : true,
                    autoAbort : true,
                    params : {
                        dataId : base.convertNodeId(leftNavigationTree.nodeId)
                    }
                });

            }
        }

    });

    var tasklogAttributeTaskId = new Ext.form.TextField({

                id : 'tasklogAttributeTaskId',
                inputType : 'hidden'
            });

    var tasklogAttributeTask = new Ext.form.TextField({
                fieldLabel : '' + getResource('resourceParam624') + '',
                id : 'tasklogAttributeTask',
                readOnly : true,
                style : 'margin-bottom: 5px;',
                width : 300
            });
    var tasklogName = new Ext.form.TextField({
                id : 'tasklogName',
                fieldLabel : '' + getResource('resourceParam625') + '',
                style : 'margin-bottom: 5px;',
                width : 100,
                allowBlank : false,
                emptyText : '' + getResource('resourceParam1552') + '',
                maxLength : 95,
                minLengthText : '' + getResource('resourceParam1449') + '',
                msgTarget : 'side'
            });
    var tasklogContent = new Ext.form.TextArea({
                id : 'tasklogContent',
                fieldLabel : '' + getResource('resourceParam626') + '',
                style : 'margin-bottom: 5px;',
                width : 200,
                height : 100,
                allowBlank : false,
                emptyText : '' + getResource('resourceParam622') + '',
                maxLength : 2000,
                maxLengthText : '' + getResource('resourceParam591') + ''
            });

    collarbTabPanel.tasklogAddForm = new Ext.form.FormPanel({
                id : 'tasklogAddForm',
                fileUpload : true,
                enctype : 'multipart/form-data',
                bodyStyle : 'padding:5px 5px 0',
                disabled : true,
                labelWidth : 80,
                // height:800,
                defaults : {
                    anchor : '62%',
                    msgTarget : 'side'
                },
                items : [tasklogAttributeTaskId, tasklogAttributeTask,
                        tasklogName, tasklogContent, {
                            xtype : 'fileuploadfield',
                            id : 'tasklogfile1',
                            fieldLabel : '' + getResource('resourceParam469')
                                    + '',
                            buttonText : '' + getResource('resourceParam473')
                                    + ''

                        }],
                buttons : [{
                            text : getResource('resourceParam5019'),
                            handler : tasklogSubmit
                        }, {
                            text : '' + getResource('resourceParam606') + '',
                            handler : tasklogReset
                        }]
            });

    function tasklogSubmit() {
        var temp = Ext.getCmp('tasklogContent').getValue();
        if (!collarbTabPanel.tasklogAddForm.getForm().isValid()) {
            return;
        }
        collarbTabPanel.tasklogAddForm.getForm().submit({
            url : '../logupload?logAttributeTaskId='
                    + base.convertNodeId(Ext.getCmp('tasklogAttributeTaskId')
                            .getValue()) + '&logAttributeTask='
                    + Ext.getCmp('tasklogAttributeTask').getValue()
                    + '&logName=' + Ext.getCmp('tasklogName').getValue()
                    + '&logContent=' + Ext.getCmp('tasklogContent').getValue()
                    + '&messageType=1',
            method : 'post',
            // params:logAddForm,
            success : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam623') + '',
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.INFO
                        });
                var tasklogAttributeTaskIds = Ext
                        .getCmp('tasklogAttributeTaskId').getValue();
                var tasklogAttributeTasks = Ext.getCmp("tasklogAttributeTask")
                        .getValue();
                collarbTabPanel.tasklogAddForm.getForm().reset();
                Ext.getCmp("tasklogAttributeTask")
                        .setValue(tasklogAttributeTasks);
                Ext.getCmp("tasklogAttributeTaskId")
                        .setValue(tasklogAttributeTaskIds);
            },
            failure : function(form, action) {
                Ext.Msg.show({
                            title : '' + getResource('resourceParam596') + '',
                            msg : '' + getResource('resourceParam594') + '',
                            width : 170,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });
            }

        });
    }
    function tasklogReset() {
        Ext.getCmp('tasklogName').setValue("");
        Ext.getCmp('tasklogContent').setValue("");
    }
    collarbTabPanel.taskaddloginfo = new Ext.Panel({
                id : 'taskaddloginfo',
                title : '  ' + getResource('resourceParam628') + '',
                // visible : false,
                //
                // autoScroll : true,
                layout : 'fit',
                items : [collarbTabPanel.tasklogAddForm],
                listeners : {
                    'activate' : function() {
                        // logTabPanel.doLayout();
                    }
                }
            });

    collarbTabPanel.tasklgoPanel = new Ext.Panel({
        title : '' + getResource('resourceParam629') + '',//日志
        frame : false,
        boder : false,
        layout : 'fit',
        disabled : true,
        html : "<iframe scrolling=auto  id='taskloginfoframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
        listeners : {
            'activate' : function() {
                Ext.Ajax.request({
                    url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
                    method : 'POST',
                    success : function(response, options) {
                        var obj = Ext.util.JSON.decode(response.responseText);
                        if (obj.remove) {
                            // collarbMain.refresh();
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.message,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                        } else {
                            data = obj;
                            buttonFunc();
                            if (data.modify) {
                                collarbTabPanel.tasklgoPanel.enable();
                            } else {
                                collarbTabPanel.tasklgoPanel.disable();
                            }
                            var taskid = base
                                    .convertNodeId(leftNavigationTree.nodeId);
                            taskid = taskid.indexOf('p') == 0 ? taskid
                                    .substring(1) : taskid;
                            document.getElementById('taskloginfoframe').src = "../logInfo.seam?temp="
                                    + new Date()
                                    + "&taskid="
                                    + taskid
                                    + "&publics=1&publishMode=4&typeStr=1,3,4,";
                        }
                    },
                    disableCaching : true,
                    autoAbort : true,
                    params : {
                        dataId : base.convertNodeId(leftNavigationTree.nodeId)
                    }
                });

            }
        }

    });
    // 进度
    collarbTabPanel.t8 = processSharingPanel.init();
    collarbTabPanel.t8.on("activate", function() {
        Ext.Ajax.request({
            url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
            method : 'POST',
            success : function(response, options) {
                var obj = Ext.util.JSON.decode(response.responseText);
                if (obj.remove) {
                    Ext.MessageBox.show({
                                title : '' + getResource('resourceParam499')
                                        + '',
                                msg : obj.message,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                } else {
                    data = obj;
                    buttonFunc();
                    var taskname = base
                            .convertNodeId(leftNavigationTree.nodeId);
                    var proxy = new Ext.data.HttpProxy({
                        url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname='
                                + taskname
                    });
                    processSharingPanel.grid.getStore().proxy = proxy;
                    myGrid.loadvalue(processSharingPanel.grid.getStore(),
                            collarbMain.args, collarbMain.baseargs);
                }
            },
            disableCaching : true,
            autoAbort : true,
            params : {
                dataId : base.convertNodeId(leftNavigationTree.nodeId)
            }
        });
    });

    // 甘特图
    collarbTabPanel.t9 = ganttMain.init();
    // collarbTabPanel.t9
    // .on("activate", function() {
    // buttonFunc();
    // var taskname = base.convertNodeId(leftNavigationTree.nodeId);
    // // if(taskname==0)
    // // {return;}
    // var proxy = new Ext.data.HttpProxy(
    // {
    // url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid=' + taskname
    // // url:'tasks.json'
    // });
    // ganttMain.ganttGrid.getStore().proxy = proxy;
    // myGrid.loadvalue(ganttMain.ganttGrid.getStore(),
    // collarbMain.args, collarbMain.baseargs);
    // });

    collarbTabPanel.t9.on("activate", function() {
        Ext.Ajax.request({
            url : "../JSON/privilege_DataPrivilegeRemote.getDataManipultations",
            method : 'POST',
            success : function(response, options) {
                var obj = Ext.util.JSON.decode(response.responseText);
                if (obj.remove) {
                    Ext.MessageBox.show({
                                title : '' + getResource('resourceParam499')
                                        + '',
                                msg : obj.message,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                } else {
                    data = obj;
                    buttonFunc();
                    var taskname = base
                            .convertNodeId(leftNavigationTree.nodeId);
                    Seam.Component.getInstance("aofoquery_zongheChaxunSvr")
                            .getStartDate(taskname, function(reslut) {
                                var proxy = new Ext.data.HttpProxy({
                                    url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid='
                                            + taskname
                                });
                                var today = Date.parseDate(reslut, "Y-m-d");
                                if (today != null || today != undefined) {
                                    ganttMain.ganttGrid.setView(today, today
                                                    .add(Date.MONTH, 12),
                                            'monthAndQuarters');
                                    ganttMain.ganttGrid.getStore().proxy = proxy;
                                    myGrid.loadvalue(ganttMain.ganttGrid
                                                    .getStore(),
                                            collarbMain.args,
                                            collarbMain.baseargs);
                                    myGrid
                                            .loadvalue(
                                                    ganttMain.ganttGrid.dependencyStore,
                                                    collarbMain.args,
                                                    collarbMain.baseargs);
                                }
                            });
                }
            },
            disableCaching : true,
            autoAbort : true,
            params : {
                dataId : base.convertNodeId(leftNavigationTree.nodeId)
            }
        });

    });

    // 参与人
    // collarbTabPanel.t10=participant.init();
    // collarbTabPanel.t11=new Ext.Panel({
    // title:'参与人',
    // layout:'fit',
    // items:[collarbTabPanel.t10]
    // });
    // collarbTabPanel.t11

    // TAB面板
    collarbTabPanel.tabPanel = new Ext.sysTabPanel({
                id : 'tabe',
                minTabWidth : 300,
                resizeTabs : false,
                boder : false,
                layoutOnCardChange : true,
                enableTabScroll : true,
                hidden : false,
                items : [collarbTabPanel.attributePanel,
                        collarbTabPanel.dataPanel,
                        collarbTabPanel.relationPanel,
                        collarbTabPanel.wbsPanel, collarbTabPanel.t8,
                        collarbTabPanel.t9, collarbTabPanel.feedbackPanel,
                        collarbTabPanel.tasklgoPanel,
                        //任务关联视图
//                      departmentTaskRelationViewPanel.init(),
                        participants.init()],
                activeTab : 0
            });
    return collarbTabPanel.tabPanel;
}
