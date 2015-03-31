Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var collarbMain = {
    tpye : "2",
    args : {
        start : 0,
        limit : 25
    },
    baseargs : null
};
collarbMain.init = function() {
    collarbExtendForm.tpye="2";
    ProjectFolderForm.tpye="2";
    // 左边面板刷新按钮调用函数
    collarbMain.refresh = function(para) {
        if (para) {
            Ext.get('refreshProject').hide();
        }
        Ext.Ajax.request({
            url : "../JSON/project_ProjectRemote.refreshTreeNode",
            method : 'POST',
            success : function(response, options) {
                var obj = Ext.util.JSON.decode(response.responseText);
                var node = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
                updateTreeNode(node, obj);
                if (obj.success == true) {
                    Ext.get('refreshProject').fadeIn({
                        duration : 2
                    });
                    node.on('expand', function() {
                        Ext.get('refreshProject').fadeIn({
                            duration : 2
                        });
                    });
                    collarbMain.leftTree.fireEvent('beforeclick', node);// 点击该node
                    collarbMain.leftTree.fireEvent('click', node, Ext.EventObject.ctrlKey);// 点击该node
                    if (para) {
                        if (!node.isExpanded()) {
                            node.expand();
                        } else {
                            collarbMain.leftTree.getLoader().load(node);
                            node.expand();
                        }
                    }
                } else {
                    Ext.get('refreshProject').fadeIn({
                        duration : 2
                    });
                }
            },
            disableCaching : true,
            autoAbort : true,
            params : {
                node : leftNavigationTree.nodeId
                // 选中的节点
            }
        });
    }

    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'qtip';
    Ext.form.Field.prototype.labelSeparator = '';
    Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
    Ext.Ajax.timeout = 900000;

    // 初始化左边面板的树结构
    collarbMain.leftTree = leftNavigationTree.init("coop");
    // collarbMain.leftTree.selModel = new Ext.tree.MultiSelectionModel();
    collarbMain.leftTree.getRootNode().expand();
    collarbMain.tabPanel = collarbTabPanel.init();
    var config = {
        createByTemplateCallBack : collarbMain.refresh
    };
    collarbMain.createPanel = collarbCreatePanel.init(config);
    collarbMain.privilegeSet = null;// 权限设置面板
    collarbMain.columnTree = null;
    // collarbMain.approveFlowPanel = approveFlowInfo.init();
    // collarbMain.myApproveTask = myApproveTaskPanel.init();
    collarbMain.approvePanel = null// 审批面板
    collarbMain.project = null;// 新建项目面板
    collarbMain.task = null;// 新建任务面板
    collarbMain.updateProject = null; // 修改项目面板
    collarbMain.updateTask = null; // 修改任务面板
    
    // 新建按钮下拉菜单--创建项目
    var action = new Ext.Action({
        id : 'createProjectByManual',
        text : '' + getResource('resourceParam1549') + '',
        disabled : true,
        handler : function() {
            if (collarbMain.project == null) {
                collarbMain.project = collarbCardFrame.init();
                collarbCreatePanel.createProjectadd(collarbMain.project);
            } else {
                collarbCreatePanel.createProject.remove(collarbMain.project);
                collarbMain.project = collarbCardFrame.init();
                collarbCreatePanel.createProject.add(collarbMain.project);
            }
            collarbMain.cardPanel.getLayout().setActiveItem(1);
            collarbCreatePanel.cardPanel.getLayout().setActiveItem(0);
            collarbCreatePanel.cardPanel.doLayout();
            var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
            currentNode.expand();
        }
    });
    
    // 新建按钮下拉菜单--从任务流程模板创建
    var action5 = new Ext.Action({
        id : 'createByWBSTemplate',
        hidden : true,
        text : '从' + getResource('resourceParam943') + '模板创建',
        handler : function() {
            applyTemplateMain.load();
            // 模板创建的任务的目标Id
            applyTemplateMain.targetId = leftNavigationTree.nodeId;
            collarbMain.cardPanel.getLayout().setActiveItem(1);
            collarbCreatePanel.cardPanel.getLayout().setActiveItem(8);
            collarbCreatePanel.cardPanel.doLayout();
        }
    });
    
    // 新建按钮下拉菜单--创建审批任务
    var action6 = new Ext.Action({
        id : 'createApproveTask',
        hidden : true,
        text : '创建' + getResource('resourceParam1020') + '',
        handler : function() {
            collarbMain.kind = 'sub';
            // 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
            Ext.Ajax.request({
                url : "../JSON/task_TaskRemote.getTaskTimeScale",
                method : 'POST',
                success : function(response, options) {
                    var obj = Ext.util.JSON.decode(response.responseText);
                    var successCallback = function(obj) {
                        collarbMain.refresh(true);
                    }
                    if (obj.success == true) {
                        if (collarbMain.updateApproveTask) {
                            collarbCreatePanel.updateApproveTask.remove(collarbMain.updateApproveTask);
                            collarbMain.updateApproveTask = null;
                        }
                        if (collarbMain.approveTask == null) {
                            collarbMain.approveTask = createApproveTask.init(null, leftNavigationTree.nodeId,
                                "TaskDataType", canelApproveTask, '', successCallback);
                            collarbCreatePanel.createApproveTask.add(collarbMain.approveTask);
                        } else {
                            collarbCreatePanel.createApproveTask.remove(collarbMain.approveTask);
                            collarbMain.approveTask = createApproveTask.init(null, leftNavigationTree.nodeId,
                                "TaskDataType", canelApproveTask, '', successCallback);
                            collarbCreatePanel.createApproveTask.add(collarbMain.approveTask);
                        }
                        collarbMain.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.getLayout().setActiveItem(9);
                        collarbCreatePanel.cardPanel.doLayout();

                        var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
                        currentNode.expand();

                    } else {
                        Ext.MessageBox.show({
                            title : '' + getResource('resourceParam499') + '',
                            msg : obj.message,
                            buttons : Ext.MessageBox.OK,
                            icon : Ext.MessageBox.ERROR
                        });
                    }
                },
                disableCaching : true,
                autoAbort : true,
                params : {
                    node : leftNavigationTree.nodeId,
                    method : collarbMain.kind
                    // 同级任务，或子任务
                }
            });
        }
    });
    
    // 新建按钮下拉菜单--创建项目夹
    var action4 = new Ext.Action({
        id : 'createProjectFolder',
        disabled : true,
        text : '' + getResource('resourceParam1546') + '',
        handler : function() {
            collarbMain.projectFolder = ProjectFolderForm.init();
            collarbCreatePanel.createProjectFolder.add(collarbMain.projectFolder);
            collarbMain.cardPanel.getLayout().setActiveItem(1);
            collarbCreatePanel.cardPanel.getLayout().setActiveItem(5);
            collarbCreatePanel.cardPanel.doLayout();
            var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
            currentNode.expand();
        }
    });
    
    // 创建任务回调函数
    collarbMain.createTaskCallBack = function(mes) {
        var newNode = null;
        if (collarbMain.kind == 'sub') {
            // 创建子任务
            var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
            currentNode.attributes.leaf = false;
            currentNode.attributes.expandable = true;
            newNode = collarbMain.leftTree.getLoader().createNode({
                id : mes.nodeId,
                text : TaskBasicForm.name1,
                projectId : mes.projectId,
                chargedManId : TaskBasicForm.user1,
                iconCls : 'icon-planningTask',
                statusId : mes.statusId,
                nt : mes.nt,
                approval : mes.approval,
                allowDrop : mes.allowDrop,
                allowDrag : false,
                leaf : true
            });
            var lastChildNode = currentNode.lastChild;
            if (lastChildNode != null) {
                // 粘贴时，维护新节点于最后一个节点的
                // pre，nex
                newNode.attributes.pre = lastChildNode.attributes.id;
                newNode.attributes.nex = lastChildNode.attributes.nex;

                lastChildNode.attributes.nex = newNode.attributes.id;
            } else {
                newNode.attributes.pre = '';
                newNode.attributes.nex = '';
            }
            currentNode.beginUpdate();
            currentNode.appendChild(newNode);
            currentNode.endUpdate();
            currentNode.expand();
        } else if (collarbMain.kind == 'same') {
            // 创建同级任务
            var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
            var parentNode = currentNode.parentNode;
            newNode = collarbMain.leftTree.getLoader().createNode({
                id : mes.nodeId,
                text : TaskBasicForm.name1,
                projectId : mes.projectId,
                chargedManId : TaskBasicForm.user1,
                iconCls : 'icon-planningTask',
                statusId : mes.statusId,
                nt : mes.nt,
                approval : mes.approval,
                allowDrop : mes.allowDrop,
                allowDrag : false,
                leaf : true
            });
            newNode.attributes.pre = currentNode.attributes.id;
            newNode.attributes.nex = currentNode.attributes.nex;
            currentNode.attributes.next = newNode.attributes.id;

            var nextNode = currentNode.nextSibling;
            if (nextNode != null) {
                nextNode.attributes.pre = newNode.attributes.id;
                parentNode.insertBefore(newNode, nextNode);
            } else {
                parentNode.appendChild(newNode);
            }
        }
        collarbMain.leftTree.fireEvent('beforeclick', newNode);// 点击该node
        collarbMain.leftTree.fireEvent('click', newNode);// 点击该node
        newNode.select();
    }
    
    // 新建按钮下拉菜单--创建同级任务
    var action2 = new Ext.Action({
        id : 'createSameLevelTask',
        text : '' + getResource('resourceParam1188') + '',
        iconCls : 'icon-createTask',
        disabled : true,
        handler : function() {
            collarbMain.kind = 'same';
            // 任务的时间限制，任务时间限制在父project计划时间内，或父任务时间内
            Ext.Ajax.request({
                url : "../JSON/task_TaskRemote.getTaskTimeScale",
                method : 'POST',
                success : function(response, options) {
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj.success == true) {
                        if (collarbMain.task == null) {
                            collarbMain.task = TaskCardFrame
                                    .init(collarbMain.createTaskCallBack);
                            collarbCreatePanel.createTask.add(collarbMain.task);
                        } else {
                            collarbCreatePanel.createTask
                                    .remove(collarbMain.task);
                            collarbMain.task = TaskCardFrame
                                    .init(collarbMain.createTaskCallBack);
                            collarbCreatePanel.createTask.add(collarbMain.task);
                        }
                        TaskBasicForm.projectId = leftNavigationTree.node.attributes.projectId;
                        // 扩展页面参数
                        TaskExtendForm.kind = collarbMain.kind;
                        TaskExtendForm.nodeId = leftNavigationTree.nodeId;
                        collarbMain.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.doLayout();

                        TaskCardFrame.basicForm.setTitle('' + getResource('resourceParam1189') + '');
                        TaskCardFrame.card.layout.setActiveItem(0);
                        TaskCardFrame.basicForm.getForm().reset();
                        TaskBasicForm.constrain(obj);
                    } else {
                        Ext.MessageBox.show({
                            title : '' + getResource('resourceParam499') + '',
                            msg : obj.message,
                            buttons : Ext.MessageBox.OK,
                            icon : Ext.MessageBox.ERROR
                        });
                    }

                },
                disableCaching : true,
                autoAbort : true,
                params : {
                    node : leftNavigationTree.nodeId,
                    method : collarbMain.kind
                    // 同级任务，或子任务

                }
            });

        }
    });

    // 新建按钮下拉菜单--创建子任务
    var action3 = new Ext.Action({
        id : 'createSubLevelTask',
        text : '' + getResource('resourceParam1191') + '',
        iconCls : 'icon-createSubTask',
        disabled : true,
        handler : function() {
            collarbMain.kind = 'sub';
            // 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
            Ext.Ajax.request({
                url : "../JSON/task_TaskRemote.getTaskTimeScale",
                method : 'POST',
                success : function(response, options) {
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj.success == true) {
                        if (collarbMain.task == null) {
                            collarbMain.task = TaskCardFrame.init(collarbMain.createTaskCallBack);
                            collarbCreatePanel.createTask.add(collarbMain.task);
                        } else {
                            collarbCreatePanel.createTask.remove(collarbMain.task);
                            collarbMain.task = TaskCardFrame.init(collarbMain.createTaskCallBack);
                            collarbCreatePanel.createTask.add(collarbMain.task);
                        }

                        TaskBasicForm.projectId = leftNavigationTree.node.attributes.projectId;
                        // 扩展页面参数
                        TaskExtendForm.kind = collarbMain.kind;
                        TaskExtendForm.nodeId = leftNavigationTree.nodeId;
                        collarbMain.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.doLayout();

                        TaskCardFrame.basicForm.setTitle('' + getResource('resourceParam1192') + '');
                        TaskCardFrame.card.layout.setActiveItem(0);
                        TaskCardFrame.basicForm.getForm().reset();
                        var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
                        currentNode.expand();
                        TaskBasicForm.constrain(obj);
                    } else {
                        Ext.MessageBox.show({
                            title : '' + getResource('resourceParam499') + '',
                            msg : obj.message,
                            buttons : Ext.MessageBox.OK,
                            icon : Ext.MessageBox.ERROR
                        });
                    }
                },
                disableCaching : true,
                autoAbort : true,
                params : {
                    node : leftNavigationTree.nodeId,
                    method : collarbMain.kind
                    // 同级任务，或子任务
                }
            });
        }
    });

    var projectApprove = new Ext.Action({
        id : 'projectApprove',
        text : '' + getResource('resourceParam1365') + '',
        disabled : true,
        handler : function() {
            var info = "" + getResource('resourceParam1535') + "";
            if (leftNavigationTree.statusId == 4
                    || leftNavigationTree.statusId == '4') {
                info = "该操作会将所有未完成的子任务终止，是否进行操作？";
            }
            Ext.Msg.confirm('' + getResource('resourceParam575') + '', info,
            function(btn) {
                if (btn == 'yes') {
                    var approveMask = new Ext.LoadMask(document.body, {
                        msg : getResource('resourceParam5042')
                    });
                    approveMask.show();
                    Ext.Ajax.request({
                        url : "../JSON/project_ProjectRemote.approve",
                        method : 'POST',
                        success : function(response, options) {
                            approveMask.hide();
                            var obj = Ext.util.JSON
                                    .decode(response.responseText);
                            if (obj.success == true) {
                                collarbMain.refresh(true);
                            } else {
                                collarbMain.refresh();
                                Ext.MessageBox.show({
                                    title : ''
                                            + getResource('resourceParam499')
                                            + '',
                                    msg : obj.message,
                                    buttons : Ext.MessageBox.OK,
                                    icon : Ext.MessageBox.ERROR
                                });
                            }
                        },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                            node : leftNavigationTree.nodeId
                        }
                    });
                }
            });
        }
    });

    var projectVerify = new Ext.Action({
        id : 'projectVerify',
        text : '' + getResource('resourceParam1550') + '...',
        disabled : true,
        handler : function() {
            var contentNode = collarbMain.leftTree.getSelectionModel().getSelectedNode();
            if (contentNode == null) {
                Ext.MessageBox.show({
                    title : '' + getResource('resourceParam575') + '',
                    msg : '' + getResource('resourceParam1167') + '',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO
                });
                // 在点击文件夹节点的时候禁掉“权限菜单”
                return;
            }
            approvePanel.status = contentNode.attributes.statusId;
            collarbMain.dataid = contentNode.id.indexOf("p") == 0 ? contentNode.id.substring(1) : contentNode.id;// 设置项目id
            collarbMain.datatype = contentNode.id.indexOf("p") == 0 ? 'ProjectDataType' : 'TaskDataType';// 设置类型，这里需要设置为常量

            collarbMain.cardPanel.remove(collarbMain.approvePanel, true);
            approvePanel.status = contentNode.attributes.statusId;
            approvePanel.securityDegree = contentNode.attributes.securityDegree;
            if (approvePanel.status == '1') {
                collarbMain.approvePanel = approvePanel.init(collarbMain.cardPanel, collarbMain.dataid,
                    collarbMain.datatype, canelApproval, '' + getResource('resourceParam1547') + '', collarbMain.refresh);
            } else if (approvePanel.status == '4') {
                collarbMain.approvePanel = approvePanel.init(collarbMain.cardPanel, collarbMain.dataid,
                    collarbMain.datatype, canelApproval, '' + getResource('resourceParam1548') + '', collarbMain.refresh);
            }
            collarbMain.cardPanel.getLayout().setActiveItem(2);
            if(leftNavigationTree.statusId == '4' && leftNavigationTree.approval == 2) {
                Ext.Ajax.request({
                    url : "../JSON/mytask_MyTaskRemote.getSuperLeader",
                    method : 'POST',
                    params : {
                        taskid : leftNavigationTree.nodeId
                    },
                    success : function(response, options) {
                        var obj = Ext.util.JSON.decode(response.responseText);
                        approvePanel.participantsGrid.getTopToolbar().disable();
                        var approvalUserRecord = Ext.data.Record.create([{
                            name : 'userid'
                        }, {
                            name : 'truename'
                        }, {
                            name : 'ginstitutename'
                        }, {
                            name : 'usertype'
                        }]);
                        var record = new approvalUserRecord({
                            userid : obj.result.userid,
                            truename : obj.result.truename,
                            ginstitutename : obj.result.ginstitutename,
                            usertype : ''+getResource('resourceParam731')+''
                        });
                        var toDataStore = approvePanel.participantsGrid.getStore();
                        toDataStore.add(record);
                    }
                });
            }
            collarbMain.approvePanel.doLayout();
            function canelApproval() {
                collarbMain.cardPanel.getLayout().setActiveItem(0);
            }
        }
    });
    
    var examApprovalTab = new Ext.Action({
        id : 'examApprovalTab',
        text : '' + getResource('resourceParam1448') + '',
        disabled : true,
        handler : function() {
            var contentNode = collarbMain.leftTree.getSelectionModel().getSelectedNode();
            if (contentNode == null) {
                Ext.MessageBox.show({
                    title : '' + getResource('resourceParam575') + '',
                    msg : '' + getResource('resourceParam1167') + '',
                    buttons : Ext.MessageBox.OK,
                    icon : Ext.MessageBox.INFO
                });
                // 在点击文件夹节点的时候禁掉“权限菜单”
                return;
            }
            collarbMain.dataid = contentNode.id.indexOf("p") == 0 ? contentNode.id.substring(1) : contentNode.id;// 设置项目id
            collarbMain.datatype = contentNode.id.indexOf("p") == 0 ? 'ProjectDataType' : 'TaskDataType';// 设置类型，这里需要设置为常量
            collarbMain.cardPanel.remove(collarbMain.approvePanel, true);
            // collarbMain.approvePanel = examApproval.getGrid(
            // collarbMain.cardPanel, collarbMain.dataid,
            // collarbMain.datatype);
            collarbMain.approvePanel = examApproval.getCommentGrid(collarbMain.cardPanel, collarbMain.dataid, collarbMain.datatype);
            collarbMain.cardPanel.getLayout().setActiveItem(2);
            collarbMain.approvePanel.doLayout();
            // approveFlowSteps.refreshGrid();
        }
    });
    // 主面板 的 左侧面板
    collarbMain.westPanel = new Ext.Panel({
        region : 'west',
        width : 200,
        height : 800,
        boder : false,
        autoScroll : true,
        collapsible : true,
        split : true,
        layout : 'fit',
        title : "" + getResource('resourceParam724')
                + "<span id='refreshProject' style='padding-left:5px;'><a  href='javascript:void(0);'  onClick='collarbMain.refresh(true)' ><img ext:qtip=''+getResource('resourceParam1081')+'' src='../images/refresh.gif' style='width:12px;heigth:12px;paddin-left:40px'/></a></span>",
        items : [collarbMain.leftTree]
    });

    collarbMain.cardPanel = new Ext.Panel({
        id : 'collarbMain_cardPanel',
        frame : false,
        boder : false,
        layout : 'card',
        items : [collarbMain.tabPanel, collarbMain.createPanel],
        activeItem : 0
    });

    // 主面板 的 中间面板
    collarbMain.centerPanel = new Ext.Panel({
        region : 'center',
        height : 800,
        frame : false,
        boder : false,
        layout : 'fit',
        items : [collarbMain.cardPanel]

    });

    collarbMain.tbar = new Ext.Toolbar({
        items : [{
                    id : 'create',
                    text : '' + getResource('resourceParam483') + '',
                    disabled : true,
                    menu : [action, action2, action3, action4, action5, action6]
                }, new Ext.Toolbar.Separator({
                            id : 's_create'
                        }), {
                    id : 'update',
                    text : '' + getResource('resourceParam478') + '',
                    disabled : true,
                    handler : function() {
                                    if (leftNavigationTree.nodeId.indexOf('c') == 0) {
                                        updateContent();
                                    } else if (leftNavigationTree.nodeId
                                            .indexOf('p') == 0) {
                                        // 修改项目
                                        updateProject();
                                    } else {
                                        var node = collarbMain.leftTree
                                                .getNodeById(leftNavigationTree.nodeId);
                                        var nt = node.attributes.nt;
                                        if (nt == 0 || nt == '0') {
                                            // 更新普通任务
                                            updateTask();
                                        } else if (nt == 1 || nt == '1') {
                                            // 更新审批任务
                                            updateApproveTask();
                                        }
                                    }
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_update'
                        }), {
                    id : 'delete',
                    text : '' + getResource('resourceParam475') + '',
                    iconCls : 'icon-deleteTask',
                    disabled : true,
                    handler : function() {
                        if (leftNavigationTree.nodeId.indexOf('c') == 0) {
                            deleteFolder();
                        } else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
                            deleteProject();
                        } else if (leftNavigationTree.nodeId.indexOf('v') == 0) {
                            deleteVirtualRelation();
                        } else {
                            deleteTask();
                        }
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_delete'
                        }), {
                    id : 'terminate',
                    text : '' + getResource('resourceParam1170') + '',
                    disabled : true,
                    handler : function() {
                        if (leftNavigationTree.nodeId.indexOf('c') == 0) {

                        } else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
                            terminateProject();
                        } else {
                            terminateTask();
                        }
                    }

                }, new Ext.Toolbar.Separator({
                            id : 's_terminate'
                        }), {
                    id : 'approve',
                    text : '' + getResource('resourceParam1045') + '',
                    disabled : true,
                    menu : [projectApprove, projectVerify, examApprovalTab]
                }, new Ext.Toolbar.Separator({
                            id : 's_approve'
                        }), {
                    id : 'privilege',
                    text : '' + getResource('resourceParam582') + '',
                    disabled : true,
                    handler : function() {
                        // 获取树上的选择节点
                        var currentNode = collarbMain.leftTree
                                .getSelectionModel().getSelectedNode();
                        if (currentNode == null) {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam575')
                                                + '',
                                        msg : ""
                                                + getResource('resourceParam1541')
                                                + "",
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.INFO
                                    });
                            // 在点击文件夹节点的时候禁掉“权限菜单”
                            return;
                        }

                        // 判断选择的是项目还是任务
                        if (currentNode.id == '0') {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam575')
                                                + '',
                                        msg : ""
                                                + getResource('resourceParam1542')
                                                + "",
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.INFO
                                    });
                            return;
                        } else if (currentNode.id.indexOf('c') == 0) {// 项目夹
                            collarbMain.dataId = currentNode.id.substring(1);// 设置项目夹id
                            collarbMain.dataType = 'ContentDataType';// 设置项目类型，这里需要设置为常量
                        } else if (currentNode.id.indexOf('p') == 0) {// 项目
                            collarbMain.dataId = currentNode.id.substring(1);// 设置项目id
                            collarbMain.dataType = 'ProjectDataType';// 设置项目类型，这里需要设置为常量
                        } else {// 任务
                            collarbMain.dataId = currentNode.id;// 设置任务id
                            collarbMain.dataType = 'TaskDataType';// 设置任务类型，这里需要设置为常量
                        }

                        if (collarbMain.privilegeSet == null) {// 初始化界面
                            collarbMain.privilegeSet = setDataPrivilege.init({
                                        'dataId' : base
                                                .convertNodeId(collarbMain.dataId),
                                        'dataType' : collarbMain.dataType
                                    });
                            collarbCreatePanel.createDataprivilege
                                    .add(collarbMain.privilegeSet);
                            // collarbCreatePanel.createDataprivilege.doLayout();
                        } else {
                            collarbMain.privilegeSet.dataId = base
                                    .convertNodeId(collarbMain.dataId);
                            collarbMain.privilegeSet.dataType = collarbMain.dataType;
                        }
                        collarbMain.privilegeSet.refresh();// 刷新权限页面

                        collarbMain.cardPanel.getLayout().setActiveItem(1);
                        collarbCreatePanel.cardPanel.getLayout()
                                .setActiveItem(2);
                        collarbCreatePanel.cardPanel.doLayout();
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_privilege'
                        }), {
                    id : 'copyTask',
                    text : '' + getResource('resourceParam485') + '',
                    disabled : true,
                    handler : function() {
                        var nodeId = leftNavigationTree.nodeId;
                        if (nodeId.indexOf("p") == 0) {
                            // 项目
                            collarbMain.pasteCate = 'project';
                            collarbMain.copyProjectId = leftNavigationTree.nodeId;
                            collarbMain.copyProjectNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            collarbMain.pasteType = 'copy';
                            Ext.getCmp('pasteTask').disable();
                        } else if (nodeId.indexOf("vp") == 0) {
                            // 虚拟项目
                            collarbMain.pasteCate = '';
                            alert(getResource('resourceParam5037'));
                        } else {
                            // 任务复制
                            collarbMain.pasteCate = 'task';
                            collarbMain.copyTaskId = leftNavigationTree.nodeId;
                            collarbMain.copyTaskNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            collarbMain.pasteType = 'copy';
                            Ext.getCmp('pasteTask').disable();
                        }
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_copyTask'
                        }), {
                    id : 'cutTask',
                    text : '' + getResource('resourceParam486') + '',
                    disabled : true,
                    handler : function() {
                        var nodeId = leftNavigationTree.nodeId;
                        if (nodeId.indexOf("p") == 0) {
                            // 项目
                            collarbMain.pasteCate = 'project';
                            collarbMain.cutProjectId = leftNavigationTree.nodeId;
                            collarbMain.cutProjectNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            collarbMain.pasteType = 'cut';
                            Ext.getCmp('pasteTask').disable();
                            // cut时维护节点pre nex
                            var currentNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            var previousNode = currentNode.previousSibling;
                            var nextNode = currentNode.nextSibling;
                            // 维护节点的pre和 nex
                            if (previousNode != null) {
                                previousNode.attributes.nex = currentNode.attributes.nex;
                            }
                            if (nextNode != null) {
                                nextNode.attributes.pre = currentNode.attributes.pre;
                            }

                        } else if (nodeId.indexOf("vp") == 0) {
                            // 虚拟项目
                            collarbMain.pasteCate = '';
                            alert(getResource('resourceParam5038'));
                        } else {
                            // 任务剪切
                            collarbMain.pasteCate = 'task';
                            collarbMain.cutTaskId = leftNavigationTree.nodeId;
                            collarbMain.cutTaskNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            collarbMain.pasteType = 'cut';
                            Ext.getCmp('pasteTask').disable();
                            // cut时维护节点pre nex
                            var currentNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);
                            var previousNode = currentNode.previousSibling;
                            var nextNode = currentNode.nextSibling;
                            // 维护节点的pre和 nex
                            if (previousNode != null) {
                                previousNode.attributes.nex = currentNode.attributes.nex;
                            }
                            if (nextNode != null) {
                                nextNode.attributes.pre = currentNode.attributes.pre;
                            }
                        }
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_cutTask'
                        }), {
                    id : 'pasteTask',
                    iconCls : 'icon-pasteTask',
                    text : '' + getResource('resourceParam487') + '',
                    disabled : true,
                    handler : function() {
                        if (collarbMain.pasteCate == 'project') {
                            // 项目
                            Ext.Msg.confirm(''
                                            + getResource('resourceParam575')
                                            + '',
                                    getResource('resourceParam5039'), function(
                                            btn) {
                                        if (btn == 'yes') {
                                            var pasteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1539') + ''
            });
                                            pasteMask.show();
                                            Ext.Ajax.request({
                                                url : "../JSON/xac_project_ProjectRemote.paste_Project",
                                                method : 'POST',
                                                success : function(response,
                                                        options) {
                                                    pasteMask
                                                            .hide();
                                                    var obj = Ext.util.JSON
                                                            .decode(response.responseText);
                                                    if (obj.success == true) {
                                                        if (collarbMain.pasteType == 'cut') {
                                                            Ext
                                                                    .getCmp('pasteTask')
                                                                    .disable();
                                                            if (leftNavigationTree.nodeId
                                                                    .indexOf('c') == 0) {
                                                                leftNavigationTree.nodeId = 0;
                                                                collarbMain
                                                                        .refresh(true);
                                                            } else {
                                                                leftNavigationTree.nodeId = 0;
                                                                collarbMain
                                                                        .refresh(true);
                                                            }

                                                        } else if (collarbMain.pasteType == 'copy') {
                                                            if (leftNavigationTree.nodeId
                                                                    .indexOf('c') == 0) {
                                                                leftNavigationTree.nodeId = 0;
                                                                collarbMain
                                                                        .refresh(true);
                                                            } else {
                                                                leftNavigationTree.nodeId = 0;
                                                                collarbMain
                                                                        .refresh(true);

                                                            }

                                                        }

                                                    } else {
                                                        collarbMain.refresh();
                                                        Ext.MessageBox.show({
                                                            title : ''
                                                                    + getResource('resourceParam499')
                                                                    + '',
                                                            msg : obj.message,
                                                            buttons : Ext.MessageBox.OK,
                                                            icon : Ext.MessageBox.ERROR
                                                        });
                                                    }
                                                },
                                                disableCaching : true,
                                                autoAbort : true,
                                                params : {
                                                    node : leftNavigationTree.nodeId,// 当前选中的节点
                                                    copyProjectId : collarbMain.copyProjectId,// 
                                                    // id
                                                    cutProjectId : collarbMain.cutProjectId,// 
                                                    // id
                                                    pastType : collarbMain.pasteType,
                                                    // 复制还是剪切
                                                    tpye : '1'
                                                }
                                            });
                                        }
                                    });

                        } else if (collarbMain.pasteCate == 'task') {
                            Ext.Msg.confirm(''
                                            + getResource('resourceParam575')
                                            + '', ""
                                            + getResource('resourceParam1544')
                                            + "?", function(btn) {
                                        if (btn == 'yes') {
                                            var pasteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1539') + ''
            });
                                            pasteMask.show();
                                            Ext.Ajax.request({
                                                url : "../JSON/task_TaskRemote.paste_Task",
                                                method : 'POST',
                                                success : function(response,
                                                        options) {
                                                    pasteMask
                                                            .hide();
                                                    var obj = Ext.util.JSON
                                                            .decode(response.responseText);
                                                    if (obj.success == true) {

                                                        var projectId = null;
                                                        var chargedManId = null;
                                                        if (collarbMain.pasteType == 'cut') {
                                                            Ext
                                                                    .getCmp('pasteTask')
                                                                    .disable();
                                                            var cutTaskNode = collarbMain.leftTree
                                                                    .getNodeById(collarbMain.cutTaskId);
                                                            if (cutTaskNode == null) {
                                                                cutTaskNode = collarbMain.cutTaskNode;
                                                            }

                                                            projectId = cutTaskNode.attributes.projectId;
                                                            chargedManId = cutTaskNode.attributes.chargedManId;
                                                            collarbMain.cutTaskId = null;
                                                            collarbMain.cutTaskNode = null;
                                                            cutTaskNode
                                                                    .remove();
                                                        } else if (collarbMain.pasteType == 'copy') {
                                                            var copyTaskNode = collarbMain.leftTree
                                                                    .getNodeById(collarbMain.copyTaskId);
                                                            if (copyTaskNode == null) {
                                                                copyTaskNode = collarbMain.copyTaskNode;
                                                            }
                                                            projectId = copyTaskNode.attributes.projectId;
                                                            chargedManId = copyTaskNode.attributes.chargedManId;
                                                        }
                                                        // 创建子任务
                                                        var currentNode = collarbMain.leftTree
                                                                .getNodeById(leftNavigationTree.nodeId);
                                                        currentNode.attributes.leaf = false;
                                                        var expandable = !obj.leaf;
                                                        currentNode
                                                                .beginUpdate();
                                                        var newNode = collarbMain.leftTree
                                                                .getLoader()
                                                                .createNode({
                                                                    id : obj.nodeId,
                                                                    text : obj.text,
                                                                    projectId : obj.projectId,
                                                                    iconCls : obj.iconCls,
                                                                    statusId : obj.statusId,
                                                                    allowDrop : obj.allowDrop,
                                                                    allowDrag : false,
                                                                    chargedManId : obj.chargedManId,
                                                                    nt : obj.nt,
                                                                    leaf : obj.leaf,
                                                                    approval : obj.approval,
                                                                    expandable : expandable
                                                                });

                                                        var lastChildNode = currentNode.lastChild;
                                                        if (lastChildNode != null) {
                                                            // 粘贴时，维护新节点于最后一个节点的
                                                            // pre，nex
                                                            newNode.attributes.pre = lastChildNode.attributes.id;
                                                            newNode.attributes.nex = lastChildNode.attributes.nex;

                                                            lastChildNode.attributes.nex = newNode.attributes.id;
                                                        } else {
                                                            newNode.attributes.pre = '';
                                                            newNode.attributes.nex = '';
                                                        }

                                                        currentNode
                                                                .appendChild(newNode);
                                                        currentNode.endUpdate();
                                                        currentNode.expand();
                                                    } else {
                                                        collarbMain.refresh();
                                                        Ext.MessageBox.show({
                                                            title : ''
                                                                    + getResource('resourceParam499')
                                                                    + '',
                                                            msg : obj.message,
                                                            buttons : Ext.MessageBox.OK,
                                                            icon : Ext.MessageBox.ERROR
                                                        });
                                                    }
                                                },
                                                disableCaching : true,
                                                autoAbort : true,
                                                params : {
                                                    node : leftNavigationTree.nodeId,// 当前选中的节点
                                                    copyTaskId : collarbMain.copyTaskId,// 要复制的task
                                                    // id
                                                    cutTaskId : collarbMain.cutTaskId,// 要剪切的task
                                                    // id
                                                    pastType : collarbMain.pasteType
                                                    // 复制还是剪切
                                                }
                                            });
                                        }
                                    });
                        } else {
                            // 虚拟项目
                            alert(getResource('resourceParam5040'));
                        }
                    }

                }, new Ext.Toolbar.Separator({
                            id : 's_pasteTask'
                        }), {
                    id : 'moveUp',
                    iconCls : 'icon-taskUp',
                    text : '' + getResource('resourceParam488') + '',
                    disabled : true,
                    handler : function() {
                        var currentNode = collarbMain.leftTree
                                .getNodeById(leftNavigationTree.nodeId);
                        var pNode = currentNode.previousSibling;
                        var parentNode = currentNode.parentNode;
                        if (currentNode.attributes.pre == '') {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam575')
                                                + '',
                                        msg : ""
                                                + getResource('resourceParam1180')
                                                + "",
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.INFO
                                    });
                        } else {
                            Ext.Msg.confirm(''
                                            + getResource('resourceParam575')
                                            + '', ""
                                            + getResource('resourceParam1186')
                                            + "?", function(btn) {
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url : "../JSON/task_TaskRemote.moveUpTask",
                                                method : 'POST',
                                                success : function(response,
                                                        options) {
                                                    var obj = Ext.util.JSON
                                                            .decode(response.responseText);
                                                    if (obj.success == true) {
                                                        var newNode = collarbMain.leftTree
                                                                .getLoader()
                                                                .createNode({
                                                                    id : currentNode.id,
                                                                    text : currentNode.text,
                                                                    iconCls : obj.iconCls,
                                                                    leaf : currentNode.attributes.leaf,
                                                                    allowDrop : currentNode.attributes.allowDrop,
                                                                    allowDrag : false,
                                                                    nt : currentNode.attributes.nt,
                                                                    statusId : currentNode.attributes.statusId,
                                                                    approval : currentNode.attributes.approval,
                                                                    chargedManId : currentNode.attributes.chargedManId,
                                                                    projectId : currentNode.attributes.projectId,
                                                                    expandable : !currentNode.attributes.leaf
                                                                });
                                                        if (pNode != null) {// 处理不是页面首节点的情况
                                                            newNode.attributes.pre = pNode.attributes.pre;
                                                            newNode.attributes.nex = pNode.attributes.id;

                                                            pNode.attributes.pre = currentNode.attributes.id;
                                                            pNode.attributes.nex = currentNode.attributes.nex;

                                                            // newNode
                                                            // .on(
                                                            // 'beforeexpand',
                                                            // function(
                                                            // node)
                                                            // {
                                                            // collarbMain.leftTree
                                                            // .getLoader()
                                                            // .load(
                                                            // node);
                                                            // });
                                                            currentNode
                                                                    .remove();
                                                            parentNode
                                                                    .insertBefore(
                                                                            newNode,
                                                                            pNode);
                                                            collarbMain.leftTree
                                                                    .fireEvent(
                                                                            'click',
                                                                            newNode,
                                                                            Ext.EventObject.ctrlKey);// 刷新当前节点
                                                            newNode.select();
                                                        } else {
                                                            // 如果是页面首节点
                                                            leftNavigationTree.nodeId = parentNode.attributes.id;
                                                            collarbMain
                                                                    .refresh(true);
                                                        }

                                                    } else {
                                                        collarbMain.refresh();
                                                        Ext.MessageBox.show({
                                                            title : ''
                                                                    + getResource('resourceParam499')
                                                                    + '',
                                                            msg : obj.error,
                                                            buttons : Ext.MessageBox.OK,
                                                            icon : Ext.MessageBox.ERROR
                                                        });
                                                    }
                                                },
                                                disableCaching : true,
                                                autoAbort : true,
                                                params : {
                                                    node : leftNavigationTree.nodeId,
                                                    moveId : currentNode.attributes.pre
                                                }
                                            });
                                        }
                                    });
                        }
                    }
                }, new Ext.Toolbar.Separator({
                            id : 's_moveUp'
                        }), {
                    id : 'moveDown',
                    iconCls : 'icon-taskDown',
                    text : '' + getResource('resourceParam489') + '',
                    disabled : true,
                    handler : function() {
                        var currentNode = collarbMain.leftTree
                                .getNodeById(leftNavigationTree.nodeId);
                        var nextNode = currentNode.nextSibling;
                        var parentNode = currentNode.parentNode;
                        if (currentNode.attributes.nex == '') {
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam575')
                                                + '',
                                        msg : ""
                                                + getResource('resourceParam1179')
                                                + "",
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.INFO
                                    });
                        } else {
                            Ext.Msg.confirm(''
                                            + getResource('resourceParam575')
                                            + '', ""
                                            + getResource('resourceParam1185')
                                            + "", function(btn) {
                                        if (btn == 'yes') {
                                            Ext.Ajax.request({
                                                url : "../JSON/task_TaskRemote.moveDownTask",
                                                method : 'POST',
                                                success : function(response,
                                                        options) {
                                                    var obj = Ext.util.JSON
                                                            .decode(response.responseText);
                                                    if (obj.success == true) {
                                                        if (nextNode != null) {// 处理不是页面尾节点的情况
                                                            var nextnextNode = nextNode.nextSibling;
                                                            var newNode = collarbMain.leftTree
                                                                    .getLoader()
                                                                    .createNode(
                                                                            {
                                                                                id : currentNode.id,
                                                                                text : currentNode.text,
                                                                                iconCls : obj.iconCls,
                                                                                leaf : currentNode.attributes.leaf,
                                                                                allowDrop : currentNode.attributes.allowDrop,
                                                                                allowDrag : false,
                                                                                nt : currentNode.attributes.nt,
                                                                                statusId : currentNode.attributes.statusId,
                                                                                approval : currentNode.attributes.approval,
                                                                                chargedManId : currentNode.attributes.chargedManId,
                                                                                projectId : currentNode.attributes.projectId,
                                                                                expandable : !currentNode.attributes.leaf
                                                                            });
                                                            newNode.attributes.pre = nextNode.attributes.id;
                                                            newNode.attributes.nex = nextNode.attributes.nex;

                                                            nextNode.attributes.pre = currentNode.attributes.pre;
                                                            nextNode.attributes.nex = currentNode.attributes.id;
                                                            currentNode
                                                                    .remove();
                                                            parentNode
                                                                    .insertBefore(
                                                                            newNode,
                                                                            nextnextNode);
                                                            // newNode
                                                            // .on(
                                                            // 'beforeexpand',
                                                            // function(
                                                            // node)
                                                            // {
                                                            // collarbMain.leftTree
                                                            // .getLoader()
                                                            // .load(
                                                            // node);
                                                            // });
                                                            collarbMain.leftTree
                                                                    .fireEvent(
                                                                            'click',
                                                                            newNode,
                                                                            Ext.EventObject.ctrlKey);// 刷新当前节点
                                                            newNode.select();
                                                        } else {
                                                            // 如果是页面尾节点
                                                            leftNavigationTree.nodeId = parentNode.attributes.id;
                                                            collarbMain
                                                                    .refresh(true);

                                                        }

                                                    } else {
                                                        collarbMain.refresh();
                                                        Ext.MessageBox.show({
                                                            title : ''
                                                                    + getResource('resourceParam499')
                                                                    + '',
                                                            msg : obj.error,
                                                            buttons : Ext.MessageBox.OK,
                                                            icon : Ext.MessageBox.ERROR
                                                        });
                                                    }
                                                },
                                                disableCaching : true,
                                                autoAbort : true,
                                                params : {
                                                    node : leftNavigationTree.nodeId,
                                                    moveId : currentNode.attributes.nex
                                                }
                                            });
                                        }
                                    });
                        }
                    }
                } 
                        //关联工具栏按钮
//                ,new Ext.Toolbar.Separator({
//                          id : 's_virtualRelation'
//                      })
//                            ,{
//                  id : 'virtualRelation',
//                  // iconCls : 'icon-taskDown',
//                  text : '' + getResource('resourceParam1949') + '',
//                  disabled : true,
//                  handler : function() {
//                      Ext.getCmp('collarbMain_cardPanel').hide();
//                      if (!Ext.getCmp('virtualRelationPanel')) {
//                          collarbMain.virtualRelationTree = new Ext.tree.TreePanel(
//                                  {
//                                      id : 'virtualRelationTree',
//                                      width : 398,
//                                      rootVisible : false,
//                                      root : new Ext.tree.AsyncTreeNode({
//                                          id : '0',
//                                          text : leftNavigationTree.rootName,
//                                          iconCls : leftNavigationTree.rootIconCls
//                                      }),
//                                      loader : new Ext.ux.tree.PagingTreeLoader(
//                                              {
//                                                  dataUrl : '../JSON/xac_project_ProjectRemote.getProjectTreeById',
//                                                  pageSize : leftNavigationTree.pageSize,
//                                                  enableTextPaging : true,
//                                                  uiProviders : {
//                                                      "col" : Ext.tree.TreeNodeUI
//                                                  },
//                                                  baseParams : {
//                                                      contentId : 0
//                                                  },
//                                                  pagingModel : 'remote'
//                                              }),
//                                      autoScroll : true
//                                  });
//                          collarbMain.virtualRelationTree.getLoader().on(
//                                  'beforeload', function(treeLoader, node) {
//                                      treeLoader.dataUrl = '../JSON/xac_project_ProjectRemote.getProjectTreeById';
//                                      treeLoader.baseParams.contentId = 0;
//                                      treeLoader.baseParams.noTask = true;
//                                      treeLoader.baseParams.projectId = leftNavigationTree.nodeId;
//                                      treeLoader.baseParams.tpye = collarbMain.tpye;
//                                  });
//                          collarbMain.centerPanel.insert(0, new Ext.Panel({
//                              id : 'virtualRelationPanel',
//                              layout : 'fit',
//                              tbar : [new Ext.ux.ComboBoxTree({
//                                  id : 'virtualRelationPanel_combo',
//                                  width : 200,
//                                  tree : collarbMain.virtualRelationTree,
//                                  selectNodeModel : 'leaf',
//                                  autoExpand : true,
//                                  listeners : {
//                                      'select' : function(combo, record,
//                                              index) {
//                                          wbsdata.nodeId = combo.getValue();
//                                          wbsdata.checkbox = true;
//                                          Ext.getCmp('virtualRelationPanel')
//                                                  .add(new Ext.Panel({
//                                                      id : 'virtualRelation_gridPanel',
//                                                      layout : 'fit',
//                                                      items : [wbsdata.init({
//                                                                  tbar : null
//                                                              })]
//                                                  }));
//                                          Ext.getCmp('virtualRelationPanel')
//                                                  .doLayout();
//                                          wbsdata.sourceNodeId = leftNavigationTree.nodeId;
//                                          wbsdata.relationtypes = '1';
//                                          wbsdata.refresh();
//                                      },
//                                      'expand' : function(combo) {
//                                          collarbMain.virtualRelationTree
//                                                  .getRootNode().reload();
//                                      }
//                                  }
//                              }), {
//                                  text : ''
//                                          + getResource('resourceParam1950')
//                                          + '',
//                                  handler : function() {
//                                      if (leftNavigationTree.nodeId == '0') {
//                                          Ext.example
//                                                  .msg(
//                                                          ""
//                                                                  + getResource('resourceParam575')
//                                                                  + "",
//                                                          ""
//                                                                  + getResource('resourceParam1951')
//                                                                  + "！");
//                                          return false;
//                                      }
//                                      if (Ext
//                                              .getCmp('virtualRelationPanel_combo')
//                                              .getValue() == '') {
//                                          Ext.example
//                                                  .msg(
//                                                          ""
//                                                                  + getResource('resourceParam575')
//                                                                  + "",
//                                                          ""
//                                                                  + getResource('resourceParam1952')
//                                                                  + "！");
//                                          return false;
//                                      }
//                                      var ids;
//                                      if (wbsdata.getSelectIds() == '') {
//                                          ids = wbsdata.nodeId;
//                                      } else {
//                                          ids = wbsdata.getSelectIds();
//                                      }
//                                      Ext.Ajax.request({
//                                          url : '../JSON/project_ProjectRemote.addVirtualRelations',
//                                          method : 'POST',
//                                          success : function(response,
//                                                  options) {
//                                              var obj = Ext.util.JSON
//                                                      .decode(response.responseText);
//                                              if (obj.success == 'true') {
//                                                  Ext.example
//                                                          .msg(
//                                                                  ""
//                                                                          + getResource('resourceParam575')
//                                                                          + "",
//                                                                  ""
//                                                                          + getResource('resourceParam623')
//                                                                          + "！");
//                                              } else if (obj.success == 'false') {
//                                                  // Ext.example.msg(""+getResource('resourceParam575')+"",
//                                                  // ""+getResource('resourceParam594')+"！");
//                                                  Ext.example
//                                                          .msg(
//                                                                  ""
//                                                                          + getResource('resourceParam575')
//                                                                          + "",
//                                                                  ""
//                                                                          + getResource('resourceParam594')
//                                                                          + ","
//                                                                          + obj.message
//                                                                          + "！");
//                                              }
//                                          },
//                                          disableCaching : true,
//                                          autoAbort : true,
//                                          params : {
//                                              pid : leftNavigationTree.nodeId,
//                                              cids : ids
//                                          }
//                                      });
//                                  }
//                              }, new Ext.Toolbar.Separator({
//                                          id : 's_addVirtualRelation'
//                                      }), {
//                                  text : '' + getResource('resourceParam944')
//                                          + '',
//                                  handler : function() {
//                                      Ext.getCmp('virtualRelationPanel')
//                                              .hide();
//                                      Ext.getCmp('collarbMain_cardPanel')
//                                              .show();
//                                  }
//                              }]
//                          }));
//                      } else {
//                          Ext.getCmp('virtualRelationPanel').show();
//                          Ext.getCmp('collarbMain_cardPanel').hide();
//                      }
//                      collarbMain.centerPanel.doLayout();
//                  }
//              }
        // , new Ext.Toolbar.Separator({id:'s_moveDown'}),
        // {
        // {
        // text : '导入',
        // iconCls : 'icon-importTasks-2',
        // disabled : true,
        // handler : function() {
        // }
        // }, new Ext.Toolbar.Separator(), {
        // text : '导出',
        // iconCls : 'icon-exportTasks-2',
        // disabled : true,
        // handler : function() {
        // }
        // }, new Ext.Toolbar.Separator(), {
        // text : '查询',
        // disabled : true,
        // handler : function() {
        // }
        // }

//       , {
//       text : '接受',
//       iconCls : 'icon-importTasks-2',
//       handler : function() {
//       var nodeId = leftNavigationTree.nodeId;
//       if (nodeId.indexOf("p") == 0) {
//       } else if (nodeId.indexOf("vp") == 0) {
//       } else {
//       var ids = new Array();
//       ids[0] = nodeId;
//       callSeam("mytask_MyTaskRemote", "acceptTasks",
//       [ids], function(result){
//       console.dir(result)
//       });
//       }
//       }
//       }
        ]
    });

    // 主面板
    collarbMain.mainPanel = new Ext.Panel({
        region : 'center',
        layout : 'border', // 布局模式
        boder : false,
        items : [collarbMain.westPanel, collarbMain.centerPanel],
        listeners : {
            beforerender : function() {

            },
            render : function() {
                initButton(button);
            },
            afterlayout : function() {
            }
        },
        tbar : collarbMain.tbar
    });

    var viewport = new Ext.Viewport({ // 页面布局
        layout : 'border', // 布局模式
        items : [collarbMain.mainPanel]
    });

    window.onresize = function() {
        document.getElementById("coopProjectPanel") != undefined
                ? document.getElementById("coopProjectPanel").style.height = (document.body.clientHeight - 90)
                : "";
    };
//  collarbMain.deleteMask = new Ext.LoadMask(document.body, {
//              msg : '' + getResource('resourceParam1538') + ''
//          });
//  collarbMain.pasteMask = new Ext.LoadMask(document.body, {
//              msg : '' + getResource('resourceParam1539') + ''
//          });
//  collarbMain.terminateMask = new Ext.LoadMask(document.body, {
//              msg : getResource('resourceParam5041')
//          });
//  collarbMain.approveMask = new Ext.LoadMask(document.body, {
//              msg : getResource('resourceParam5042')
//          });
    var beforeclick = function(node, eventObject) {
        if (Ext.getCmp('virtualRelationPanel')) {
            Ext.getCmp('virtualRelationPanel_combo').clearValue();
            wbsdata.clear();
            Ext.getCmp('virtualRelationPanel').hide();
            Ext.getCmp('collarbMain_cardPanel').show();
        }
        //关联工具栏按钮
//      if (node.id.indexOf('v') == 0) {
//          Ext.getCmp('virtualRelation').disable();
//      } else {
//          Ext.getCmp('virtualRelation').enable();
//      }
        if (node.id == 0) {

            // 属性面板，只project和task时 enable
            Ext.getCmp('relationPanel').disable();
            // 在根节点下，如果可以建content,project则 create enable
            if (button.createProjectByManual || button.createProjectByFlow
                    || button.createProjectFolder) {
                Ext.getCmp('create').enable();
                if (button.createProjectByManual) {
                    Ext.getCmp('createProjectByManual').setVisible(true);
                    Ext.getCmp('createProjectByManual').enable();
                } else {
                    Ext.getCmp('createProjectByManual').setVisible(false);
                }
                Ext.getCmp('createByWBSTemplate').setVisible(false);
                if (button.createProjectFolder) {
                    Ext.getCmp('createProjectFolder').setVisible(true);
                    Ext.getCmp('createProjectFolder').enable();
                } else {
                    Ext.getCmp('createProjectFolder').setVisible(true);
                }
                Ext.getCmp('createSameLevelTask').setVisible(false);
                Ext.getCmp('createSubLevelTask').setVisible(false);
            } else {
                Ext.getCmp('create').disable();
            }

            Ext.getCmp('update').disable();
            Ext.getCmp('delete').disable();
            Ext.getCmp('terminate').disable();
            Ext.getCmp('approve').disable();

            Ext.getCmp('privilege').disable();
            Ext.getCmp('copyTask').disable();
            Ext.getCmp('cutTask').disable();
            Ext.getCmp('pasteTask').disable();
            Ext.getCmp('moveUp').disable();
            Ext.getCmp('moveDown').disable();
            Ext.getCmp("dataObjectPanel").disable();
            // 扩展属性链接设置为隐藏
            collarbViewTaskForm.link.setVisible(false);
            collarbViewProjectForm.link.setVisible(false);
            Ext.getCmp('createByWBSTemplate').setVisible(false);
            Ext.getCmp('createApproveTask').setVisible(false);
        } else if (node.id.indexOf('c') == 0) {
            Ext.getCmp('relationPanel').disable();

            if (button.createProjectByManual || button.createProjectByFlow
                    || button.createProjectFolder) {
                Ext.getCmp('create').enable();
                if (button.createProjectByManual) {
                    Ext.getCmp('createProjectByManual').setVisible(true);
                    Ext.getCmp('createProjectByManual').enable();
                } else {
                    Ext.getCmp('createProjectByManual').setVisible(false);
                }
                if (button.createProjectByFlow) {
                    Ext.getCmp('createByWBSTemplate').setVisible(true);
                    Ext.getCmp('createByWBSTemplate').enable();
                } else {
                    Ext.getCmp('createByWBSTemplate').setVisible(false);
                }
                if (button.createProjectFolder) {
                    Ext.getCmp('createProjectFolder').setVisible(true);
                    Ext.getCmp('createProjectFolder').enable();
                } else {
                    Ext.getCmp('createProjectFolder').setVisible(true);
                }
                Ext.getCmp('createSameLevelTask').setVisible(false);
                Ext.getCmp('createSubLevelTask').setVisible(false);
            } else {
                Ext.getCmp('create').disable();
            }
            collarbViewTaskForm.link.setVisible(false);
            collarbViewProjectForm.link.setVisible(false);
            Ext.getCmp("dataObjectPanel").disable();
            Ext.getCmp('createByWBSTemplate').setVisible(false);
            Ext.getCmp('createApproveTask').setVisible(false);
            // folder不用审批
            Ext.getCmp('projectApprove').disable();
            Ext.getCmp('projectVerify').disable();
            Ext.getCmp('examApprovalTab').disable();
        } else if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
            Ext.getCmp('relationPanel').enable();

            if (button.createSubLevelTask) {
                Ext.getCmp('create').enable();
                Ext.getCmp('createProjectByManual').setVisible(false);
                Ext.getCmp('createProjectFolder').setVisible(false);
                Ext.getCmp('createSameLevelTask').setVisible(false);
                Ext.getCmp('createSubLevelTask').setVisible(true);
                Ext.getCmp('createSubLevelTask').enable();
                Ext.getCmp('createByWBSTemplate').setVisible(true);
                Ext.getCmp('createApproveTask').setVisible(true);
                if (node.attributes.nt == 1 || node.attributes.nt == '1') {
                    // 审批任务，禁止 审批通过 审批
                    Ext.getCmp('projectApprove').setVisible(false);
                    Ext.getCmp('projectVerify').setVisible(false);
                } else {
                    Ext.getCmp('projectApprove').setVisible(true);
                    Ext.getCmp('projectVerify').setVisible(true);
                }
            } else {
                Ext.getCmp('create').disable();
            }
            collarbViewTaskForm.link.setVisible(false);
            collarbViewProjectForm.link.setVisible(true);
            Ext.getCmp("dataObjectPanel").enable();
        } else {
            Ext.getCmp('relationPanel').enable();
            Ext.getCmp("dataObjectPanel").enable();
            if (button.createSameLevelTask || button.createSubLevelTask) {
                Ext.getCmp('create').enable();
                Ext.getCmp('createProjectByManual').setVisible(false);
                Ext.getCmp('createProjectFolder').setVisible(false);
                if (button.createSameLevelTask) {
                    Ext.getCmp('createSameLevelTask').setVisible(true);
                    Ext.getCmp('createSameLevelTask').enable();
                } else {
                    Ext.getCmp('createSameLevelTask').setVisible(false);
                }
                if (button.createSubLevelTask) {
                    Ext.getCmp('createSubLevelTask').setVisible(true);
                    Ext.getCmp('createSubLevelTask').enable();
                } else {
                    Ext.getCmp('createSubLevelTask').setVisible(false);
                }

                if (node.attributes.nt == 1 || node.attributes.nt == '1') {
                    // 审批任务，禁止 审批通过 审批
                    Ext.getCmp('projectApprove').setVisible(false);
                    Ext.getCmp('projectVerify').setVisible(false);
                    Ext.getCmp('createSubLevelTask').setVisible(false);
                    Ext.getCmp('createSameLevelTask').setVisible(false);
                    Ext.getCmp('createByWBSTemplate').setVisible(false);
                    Ext.getCmp('createApproveTask').setVisible(false);
                } else {
                    Ext.getCmp('projectApprove').setVisible(true);
                    Ext.getCmp('projectVerify').setVisible(true);
                    Ext.getCmp('createSubLevelTask').setVisible(true);
                    Ext.getCmp('createSameLevelTask').setVisible(true);
                    Ext.getCmp('createByWBSTemplate').setVisible(true);
                    Ext.getCmp('createApproveTask').setVisible(true);
                }
                /*
                 * 任务置完成by suny
                 */
                // if (node.attributes.statusId == 4) {
                // Ext.getCmp('projectApprove').setVisible(false);
                // }
            } else {
                Ext.getCmp('create').disable();
            }
            collarbViewTaskForm.link.setVisible(true);
            collarbViewProjectForm.link.setVisible(false);
            // if (node.attributes.nt == "1") {
            // Ext.getCmp("dataObjectPanel").disable();
            // }
        }
    };
    // var logTag = 0;
    var click = function(node, eventObject) {
        // if (eventObject.ctrlKey) {
        // }
        if (templateDatail.conflict) {
            templateDatail.conflict = false;
            collarbMain.cardPanel.remove(0);
            collarbMain.tabPanel = collarbTabPanel.init();
            collarbMain.cardPanel.insert(0, collarbMain.tabPanel);
            collarbMain.cardPanel.remove(1);
            var config = {
                createByTemplateCallBack : collarbMain.refresh
            };
            collarbMain.createPanel = collarbCreatePanel.init(config);
            collarbMain.cardPanel.insert(1, collarbMain.createPanel);
        }

        Ext.get('refreshProject').show();

        collarbTabPanel.addloginfo.doLayout();
        leftNavigationTree.node = node;
        leftNavigationTree.nodeId = node.id;
        leftNavigationTree.statusId = node.attributes.statusId;
        leftNavigationTree.approval = node.attributes.approval;
        leftNavigationTree.nodeText = node.text;
        collarbMain.cardPanel.getLayout().setActiveItem(0);
        if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
            collarbTabPanel.feedbackPanel.enable();
            collarbTabPanel.tasklgoPanel.enable();

            collarbTabPanel.tasklogAddForm.setDisabled(true);
            collarbTabPanel.logAddForm.setDisabled(true);
            // collarbTabPanel.taskegridpanel12.setVisible(false);
            collarbTabPanel.egridpanel12.setVisible(false);
            // collarbTabPanel.tasklgoPanel.html = "无相关信息.";
            collarbTabPanel.feedbackPanel.html = ""
                    + getResource('resourceParam1545') + ".";

        } else if (node.id == 0 || node.id.indexOf('c') == 0) {
            collarbTabPanel.tasklogAddForm.setDisabled(true);
            collarbTabPanel.feedbackPanel.enable();
            collarbTabPanel.tasklgoPanel.enable();
            collarbTabPanel.logAddForm.setDisabled(true);
            // collarbTabPanel.taskegridpanel12.setVisible(false);
            collarbTabPanel.egridpanel12.setVisible(false);
            // collarbTabPanel.tasklgoPanel.html = "无相关信息.";
            collarbTabPanel.feedbackPanel.html = ""
                    + getResource('resourceParam1545') + ".";
            attributePanel.attributePanel.getLayout().setActiveItem(0);
            // attributePanel.projectPanel.getForm().reset();
            if (node.id != 0 || node.id.indexOf('c') == 0) {
                if (collarbMain.projectFolderDetail == null) {
                    collarbMain.projectFolderDetail = projectFolderDetail
                            .init();
                    collarbCreatePanel.projectFolderDetail
                            .add(collarbMain.projectFolderDetail);
                } else {
                    collarbMain.projectFolderDetail
                            .remove(collarbMain.projectFolderDetail);
                    collarbMain.projectFolderDetail = projectFolderDetail
                            .init();
                    collarbCreatePanel.projectFolderDetail
                            .add(collarbMain.projectFolderDetail);
                }
                collarbMain.cardPanel.getLayout().setActiveItem(1);
                collarbCreatePanel.cardPanel.getLayout().setActiveItem(7);
                collarbCreatePanel.cardPanel.doLayout();
            }
            // collarbCreatePanel.cardPanel.doLayout();
        } else if (node.id != 0 && node.id.indexOf('c') != 0) {
            collarbMain.chargedManId = node.attributes.chargedManId;
            collarbTabPanel.feedbackPanel.enable();
            collarbTabPanel.tasklgoPanel.enable();

            // collarbTabPanel.tasklgoPanel.html = null;
            collarbTabPanel.feedbackPanel.html = null;
            // collarbTabPanel.taskegridpanel12.setVisible(true);
            collarbTabPanel.egridpanel12.setVisible(true);
            collarbTabPanel.logAddForm.setDisabled(false);
            collarbTabPanel.tasklogAddForm.setDisabled(false);
            // collarbTabPanel.tasklgoPanel.html = "无相关信息.";
            collarbTabPanel.feedbackPanel.html = ""
                    + getResource('resourceParam1545') + ".";
            Ext.getCmp("logAttributeTask").setValue(escSpanTag(node.text));
            Ext.getCmp("logAttributeTaskId")
                    .setValue(leftNavigationTree.nodeId);
            Ext.getCmp("tasklogAttributeTask").setValue(escSpanTag(node.text));
            Ext.getCmp("tasklogAttributeTaskId")
                    .setValue(leftNavigationTree.nodeId);

            // if (logTag != 0) {
            // // document.getElementById("tasklogframe").src =
            // // "../logInfo.seam?temp="
            // // + new Date()
            // // + "&taskid= "
            // // + leftNavigationTree.nodeId
            // // + "&typeStr=1,";
            // // document.getElementById("remaininfoframe").src =
            // // "../logInfo.seam?temp="
            // // + new Date()
            // // + "&taskid= "
            // // + leftNavigationTree.nodeId
            // // + "&typeStr=3,";
            // } else {
            // alert(123);
            // collarbTabPanel.tasklgoPanel.html = "<iframe scrolling=auto
            // id='taskloginfoframe' frameborder=0 width=100% height=100%
            // src='../logInfo.seam?temp="
            // + new Date()
            // + "&taskid= "
            // + leftNavigationTree.nodeId
            // + "&typeStr=1,' ></iframe>";
            // // Ext.getCmp("taskremaininfo").html = "<iframe scrolling=auto
            // // id='remaininfoframe' frameborder=0 width=100% height=100%
            // // src='../logInfo.seam?temp="
            // // + new Date()
            // // + "&taskid= "
            // // + leftNavigationTree.nodeId
            // // + "&typeStr=3,' ></iframe>";
            //
            // }
            // logTag += 1;
        } else {
            collarbTabPanel.feedbackPanel.enable();
            collarbTabPanel.tasklgoPanel.enable();
            collarbTabPanel.tasklogAddForm.setDisabled(true);
            collarbTabPanel.logAddForm.setDisabled(true);
            // collarbTabPanel.taskegridpanel12.setVisible(false);
            collarbTabPanel.egridpanel12.setVisible(false);
            // collarbTabPanel.tasklgoPanel.html = "无相关信息.";
            collarbTabPanel.feedbackPanel.html = ""
                    + getResource('resourceParam1545') + ".";
            attributePanel.attributePanel.getLayout().setActiveItem(0);
            attributePanel.projectPanel.getForm().reset();
        }
        // 属性面板显示为选中的面板
        var activePanel = collarbMain.tabPanel.getActiveTab();
        var activeTabId = activePanel.getId();
        activePanel.fireEvent('activate');
    }
    leftNavigationTree.treePanel.on('beforeclick', beforeclick);
    leftNavigationTree.treePanel.on('click', click);

}
// 按钮id名称 与对应的功能权限的id，id名称不区分大小写，功能权限id可以不写，在后台会根据前台按钮名称，根据权限给与权限id
var message = "{'createProjectByManual':''," + "'createProjectByFlow':'',"
        + "'createProjectFolder':''," + "'createSameLevelTask':'',"
        + "'createSubLevelTask':''," + "'createApproveTask':''}";

var button = null;
Ext.Ajax.request({
            url : "../JSON/privilege_PrivilegeRemote.getPagePrivileges",
            method : 'POST',
            success : function(response, options) {
                var obj = Ext.util.JSON.decode(response.responseText);
                if (obj.success == true) {
                    // button = obj;
                    button = {
                        "createProjectByManual" : true,
                        "createProjectByFlow" : true,
                        "createProjectFolder" : true,
                        "createSameLevelTask" : true,
                        "createSubLevelTask" : true,
                        "createApproveTask" : true,

                        "success" : true
                    };
                    button.createProjectByManual = obj.createProjectByManual;
                    button.createProjectByFlow = obj.createProjectByFlow;
                    button.createProjectFolder = obj.createProjectFolder;
                    button.createSameLevelTask = obj.createSameLevelTask;
                    button.createSubLevelTask = obj.createSubLevelTask;
                    button.createApproveTask = obj.createApproveTask;
                    Ext.onReady(collarbMain.init, collarbMain, true);
                } else if (obj.success == false) {
                    Ext.MessageBox.show({
                                title : '' + getResource('resourceParam499')
                                        + '',
                                msg : obj.error,
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                }
            },
            disableCaching : true,
            autoAbort : true,
            params : {
                privilegename : message
                // 通过provilegename传参数
            }
        });

function initButton(obj) {
    // 根据权限，将用户不可操作菜单隐藏
    if (button.createProjectByManual == false
            && button.createProjectByFlow == false
            && button.createProjectFolder == false
            && button.createSameLevelTask == false
            && button.createSubLevelTask == false) {
        Ext.getCmp('create').setVisible(false);
        Ext.getCmp('s_create').hide();
    }
    // 为选中任何节点，默认为根节点时，按纽的状态
    if (button.createProjectByManual || button.createProjectByFlow
            || button.createProjectFolder) {
        Ext.getCmp('create').enable();
        Ext.getCmp('createSameLevelTask').setVisible(false);
        Ext.getCmp('createSubLevelTask').setVisible(false);
        if (button.createProjectByManual) {
            Ext.getCmp('createProjectByManual').setVisible(true);
            Ext.getCmp('createProjectByManual').enable();
        } else {
            Ext.getCmp('createProjectByManual').setVisible(false);
        }
        Ext.getCmp('createByWBSTemplate').setVisible(false);
        if (button.createProjectFolder) {
            Ext.getCmp('createProjectFolder').setVisible(true);
            Ext.getCmp('createProjectFolder').enable();
        } else {
            Ext.getCmp('createProjectFolder').setVisible(true);
        }
    } else {
        Ext.getCmp('create').disable();
    }

}

function updateContent() {
    if (collarbMain.updateProjectFolder == null) {
        collarbMain.updateProjectFolder = updateProjectFolder.init();
        collarbCreatePanel.updateProjectFolder
                .add(collarbMain.updateProjectFolder);
    } else {
        collarbMain.updateProjectFolder.remove(collarbMain.updateProjectFolder);
        collarbMain.updateProjectFolder = updateProjectFolder.init();
        collarbCreatePanel.updateProjectFolder
                .add(collarbMain.updateProjectFolder);
    }
    collarbMain.cardPanel.getLayout().setActiveItem(1);
    collarbCreatePanel.cardPanel.getLayout().setActiveItem(6);
    collarbCreatePanel.cardPanel.doLayout();
}

function updateProject() {

    if (collarbMain.updateProject == null) {
        collarbMain.updateProject = updateProjectCard.init();
        collarbCreatePanel.updateProject.add(collarbMain.updateProject);
    } else {
        collarbCreatePanel.updateProject.remove(collarbMain.updateProject);
        collarbMain.updateProject = updateProjectCard.init();
        collarbCreatePanel.updateProject.add(collarbMain.updateProject);
    }
    collarbMain.cardPanel.getLayout().setActiveItem(1);
    collarbCreatePanel.cardPanel.getLayout().setActiveItem(3);
    collarbCreatePanel.cardPanel.doLayout();

}
function updateTaskCardRefresh() {
    collarbMain.refresh();
    collarbMain.cardPanel.getLayout().setActiveItem(0);
}

function updateTask() {
    if (leftNavigationTree.nodeId != 0) {
        // 修改任务
        updateTaskBasic.nodeId = leftNavigationTree.nodeId;
        updateTaskBasic.projectId = leftNavigationTree.node.attributes.projectId;
        if (collarbMain.updateTask == null) {
            collarbMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
            collarbCreatePanel.updateTask.add(collarbMain.updateTask);
        } else {
            collarbCreatePanel.updateTask.remove(collarbMain.updateTask);
            collarbMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
            collarbCreatePanel.updateTask.add(collarbMain.updateTask);
        }
        updateTaskBasic.setBasic();
        collarbMain.cardPanel.getLayout().setActiveItem(1);
        collarbCreatePanel.cardPanel.getLayout().setActiveItem(4);
        collarbCreatePanel.cardPanel.doLayout();
    }
}
function canelApproveTask() {
    collarbMain.cardPanel.getLayout().setActiveItem(0);
}
function updateApproveTask() {
    if (leftNavigationTree.nodeId != 0) {
        // 修改审批任务
        if (collarbMain.approveTask) {
            collarbCreatePanel.createApproveTask
                    .remove(collarbMain.approveTask);
            collarbMain.approveTask = null;
        }
        var params = {
            title : '' + getResource('resourceParam478') + ''
                    + getResource('resourceParam1020') + '',
            update : true
        }
        if (collarbMain.updateApproveTask == null) {
            collarbMain.updateApproveTask = createApproveTask.init(null,
                    leftNavigationTree.nodeId, "TaskDataType",
                    canelApproveTask, '', collarbMain.refresh, params);
            collarbCreatePanel.updateApproveTask
                    .add(collarbMain.updateApproveTask);
        } else {
            collarbCreatePanel.updateApproveTask
                    .remove(collarbMain.updateApproveTask);
            collarbMain.updateApproveTask = createApproveTask.init(null,
                    leftNavigationTree.nodeId, "TaskDataType",
                    canelApproveTask, '', collarbMain.refresh, params);
            collarbCreatePanel.updateApproveTask
                    .add(collarbMain.updateApproveTask);
        }
        collarbMain.cardPanel.getLayout().setActiveItem(1);
        collarbCreatePanel.cardPanel.getLayout().setActiveItem(10);
        collarbCreatePanel.cardPanel.doLayout();
    }
}

function deleteProject() {
    Ext.Msg.show({
        title : '' + getResource('resourceParam575') + '',
        msg : '' + getResource('resourceParam1165') + '',
        width : 300,
        buttons : Ext.MessageBox.YESNO,
        fn : function(btn) {
            if (btn == 'yes') {
                // if (leftNavigationTree.statusId == '4') {
                // Ext.MessageBox.show({
                // title : '提示',
                // msg : '请先终止该工程!',
                // buttons : Ext.MessageBox.OK,
                // icon : Ext.MessageBox.INFO
                // });
                // } else if (leftNavigationTree.statusId == '11') {
                // Ext.MessageBox.show({
                // title : '提示',
                // msg : '正在审批，不能删除!',
                // buttons : Ext.MessageBox.OK,
                // icon : Ext.MessageBox.INFO
                // });
                // } else
                // {
                var deleteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1538') + ''
            });
                deleteMask.show();
                Ext.Ajax.request({
                    url : "../JSON/xac_project_ProjectRemote.deleteProject",
                    method : 'POST',
                    success : function(response, options) {
                        deleteMask.hide();
                        var obj = Ext.util.JSON.decode(response.responseText);
                        if (obj.success == true) {
                            var currentNode = collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId);

                            var previousNode = currentNode.previousSibling;
                            if (previousNode != null) {
                                collarbMain.leftTree.fireEvent('beforeclick',
                                        previousNode);// 刷新当前节点
                                collarbMain.leftTree.fireEvent('click',
                                        previousNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                                previousNode.select();
                            } else {
                                var parentNode = currentNode.parentNode;
                                leftNavigationTree.nodeId = parentNode.id;
                                // collarbMain.refresh();
                                parentNode.attributes.expandable = false;
                                parentNode.attributes.leaf = true;
                                collarbMain.leftTree.fireEvent('beforeclick',
                                        parentNode);// 刷新当前节点
                                collarbMain.leftTree.fireEvent('click',
                                        parentNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                                parentNode.select();
                            }
                            currentNode.remove();
                        } else {
                            collarbMain.refresh();
                            Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.error,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                        }
                    },
                    disableCaching : true,
                    autoAbort : true,
                    params : {
                        node : leftNavigationTree.nodeId,
                        tpye : collarbMain.tpye
                    }
                });// deleteProject
                // }
            }
        },
        icon : Ext.MessageBox.QUESTION
    });
}

function deleteVirtualRelation() {
    Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
                    + getResource('resourceParam1182') + "", function(btn) {
                if (btn == 'yes') {
                    var deleteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1538') + ''
            });
                    deleteMask.show();
                    Ext.Ajax.request({
                        url : "../JSON/taskNodeRelation_TaskNodeRelationRemote.deleteVirtualRelation",
                        method : 'POST',
                        success : function(response, options) {
                            deleteMask.hide();
                            var obj = Ext.util.JSON
                                    .decode(response.responseText);
                            if (obj.success == true) {
                                var currentNode = collarbMain.leftTree
                                        .getNodeById(leftNavigationTree.nodeId);
                                var previousNode = currentNode.previousSibling;
                                var nextNode = currentNode.nextSibling;
                                // 维护节点的pre和 nex
                                if (previousNode != null) {
                                    previousNode.attributes.nex = currentNode.attributes.nex;
                                }
                                if (nextNode != null) {
                                    nextNode.attributes.pre = currentNode.attributes.pre;
                                }
                                if (previousNode != null) {
                                    collarbMain.leftTree.fireEvent(
                                            'beforeclick', previousNode);// 刷新当前节点
                                    collarbMain.leftTree.fireEvent('click',
                                            previousNode,
                                            Ext.EventObject.ctrlKey);// 刷新当前节点
                                    previousNode.select();
                                } else {
                                    var parentNode = currentNode.parentNode;
                                    leftNavigationTree.nodeId = parentNode.id;
                                    parentNode.attributes.expandable = false;
                                    parentNode.attributes.leaf = true;
                                    collarbMain.leftTree.fireEvent(
                                            'beforeclick', parentNode);// 刷新当前节点
                                    collarbMain.leftTree
                                            .fireEvent('click', parentNode,
                                                    Ext.EventObject.ctrlKey);// 刷新当前节点
                                    parentNode.select();
                                }
                                var parentNode = currentNode.parentNode;
                                currentNode.remove();
                            } else {
                                collarbMain.refresh();
                                Ext.MessageBox.show({
                                            title : ''
                                                    + getResource('resourceParam499')
                                                    + '',
                                            msg : obj.error,
                                            buttons : Ext.MessageBox.OK,
                                            icon : Ext.MessageBox.ERROR
                                        });
                            }

                        },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                            pid : collarbMain.leftTree
                                    .getNodeById(leftNavigationTree.nodeId).parentNode.id,
                            cids : leftNavigationTree.nodeId
                        }
                    });// deleteTask

                    // }
                }
            });
}

function deleteTask() {
    Ext.Msg.confirm('' + getResource('resourceParam575') + '', "" + getResource('resourceParam1182') + "", function(btn) {
        if (btn == 'yes') {
            var deleteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1538') + ''
            });
            deleteMask.show();
            Ext.Ajax.request({
                url : "../JSON/task_TaskRemote.deleteTask",
                method : 'POST',
                success : function(response, options) {
                    deleteMask.hide();
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj.success == true) {
                        var currentNode = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
                        var previousNode = currentNode.previousSibling;
                        var nextNode = currentNode.nextSibling;
                        // 维护节点的pre和 nex
                        if (previousNode != null) {
                            previousNode.attributes.nex = currentNode.attributes.nex;
                        }
                        if (nextNode != null) {
                            nextNode.attributes.pre = currentNode.attributes.pre;
                        }
                        if (previousNode != null) {
                            collarbMain.leftTree.fireEvent('beforeclick', previousNode);// 刷新当前节点
                            collarbMain.leftTree.fireEvent('click', previousNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                            previousNode.select();
                        } else {
                            var parentNode = currentNode.parentNode;
                            leftNavigationTree.nodeId = parentNode.id;
                            parentNode.attributes.expandable = false;
                            parentNode.attributes.leaf = true;
                            collarbMain.leftTree.fireEvent('beforeclick', parentNode);// 刷新当前节点
                            collarbMain.leftTree.fireEvent('click', parentNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                            parentNode.select();
                        }
                        var parentNode = currentNode.parentNode;
                        currentNode.remove();
                    } else {
                        collarbMain.refresh();
                        Ext.MessageBox.show({
                            title : '' + getResource('resourceParam499') + '',
                            msg : obj.error,
                            buttons : Ext.MessageBox.OK,
                            icon : Ext.MessageBox.ERROR
                        });
                    }

                },
                disableCaching : true,
                autoAbort : true,
                params : {
                    node : leftNavigationTree.nodeId
                }
            });// deleteTask
        }
    });
}

function deleteFolder() {
    Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
                    + getResource('resourceParam1540') + "?", function(btn) {
                if (btn == 'yes') {
                    var currentNode = collarbMain.leftTree
                            .getNodeById(leftNavigationTree.nodeId);
                    var parentnode1 = currentNode.parentNode;

                    if (currentNode.hasChildNodes()) {
                        Ext.Msg.confirm('' + getResource('resourceParam575')
                                        + '', ""
                                        + getResource('resourceParam1543')
                                        + "?", function(btn) {
                                    if (btn == "yes") {
                                        var deleteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1538') + ''
            });
                                        deleteMask.show();
                                        Ext.Ajax.request({
                                            url : '../JSON/xac_project_ProjectRemote.deleteProjectFolderHasChild?a='
                                                    + new Date().getTime(),
                                            method : 'POST',
                                            success : function(response,
                                                    options) {
                                                deleteMask.hide();
                                                var obj = Ext.util.JSON
                                                        .decode(response.responseText);
                                                if (obj.success == true) {
                                                    leftNavigationTree.nodeId = 0;
                                                    collarbMain.refresh(true);
                                                } else {
                                                    leftNavigationTree.nodeId = 0;
                                                    collarbMain.refresh(true);
                                                    Ext.MessageBox.show({
                                                        title : ''
                                                                + getResource('resourceParam499')
                                                                + '',
                                                        msg : obj.error,
                                                        buttons : Ext.MessageBox.OK,
                                                        icon : Ext.MessageBox.ERROR
                                                    });
                                                }
                                            },
                                            disableCaching : true,
                                            autoAbort : true,
                                            params : {
                                                contentsid : leftNavigationTree.nodeId
                                                        .replace("c", ""),
                                                tpye : collarbMain.tpye
                                            }
                                        });

                                    }
                                });

                    } else {
                        var deleteMask = new Ext.LoadMask(document.body, {
                msg : '' + getResource('resourceParam1538') + ''
            });
                        deleteMask.show();
                        Ext.Ajax.request({
                            url : '../JSON/xac_project_ProjectRemote.deleteProjectFolder?a='
                                    + new Date().getTime(),
                            method : 'POST',
                            success : function(response, options) {
                                deleteMask.hide();
                                var obj = Ext.util.JSON
                                        .decode(response.responseText);
                                if (obj.success == true) {

                                    var previousNode = currentNode.previousSibling;
                                    var nextNode = currentNode.nextSibling;

                                    if (previousNode != null) {
                                        collarbMain.leftTree.fireEvent(
                                                'beforeclick', previousNode);// 刷新当前节点
                                        collarbMain.leftTree.fireEvent('click',
                                                previousNode,
                                                Ext.EventObject.ctrlKey);// 刷新当前节点
                                        previousNode.select();
                                    } else {
                                        parentnode1.attributes.expandable = false;
                                        parentnode1.attributes.leaf = true;
                                        collarbMain.leftTree.fireEvent(
                                                'beforeclick', parentnode1);// 刷新当前节点
                                        collarbMain.leftTree.fireEvent('click',
                                                parentnode1,
                                                Ext.EventObject.ctrlKey);// 刷新当前节点
                                        parentnode1.select();
                                    }
                                    currentNode.remove();

                                    // parentnode1
                                    // .removeChild(currentNode);
                                    // if (!parentnode1
                                    // .hasChildNodes()) {
                                    // parentnode1.attributes.leaf
                                    // = true;
                                    // parentnode1.attributes.expandable
                                    // = false;
                                    // }

                                } else {
                                    collarbMain.refresh();
                                    Ext.MessageBox.show({
                                        title : ''
                                                + getResource('resourceParam499')
                                                + '',
                                        msg : obj.error,
                                        buttons : Ext.MessageBox.OK,
                                        icon : Ext.MessageBox.ERROR
                                    });
                                }
                            },
                            disableCaching : true,
                            autoAbort : true,
                            params : {
                                contentsid : leftNavigationTree.nodeId.replace(
                                        "c", ""),
                                tpye : collarbMain.tpye
                            }
                        });
                    }

                }
            });
}

function terminateProject() {
    Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
                    + getResource('resourceParam1536') + "?", function(btn) {
                if (btn == 'yes') {
                    var terminateMask = new Ext.LoadMask(document.body, {
                msg : getResource('resourceParam5041')
            });
                    terminateMask.show();
                    Ext.Ajax.request({
                        url : '../JSON/project_ProjectRemote.terminateProject?a='
                                + new Date().getTime(),
                        method : 'POST',
                        success : function(response, options) {
                            terminateMask.hide();
                            var obj = Ext.util.JSON
                                    .decode(response.responseText);
                            if (obj.success == true) {
                                var node = collarbMain.leftTree
                                        .getNodeById(leftNavigationTree.nodeId);
                                var expandable = !node.attributes.leaf;
                                var newNode = collarbMain.leftTree.getLoader()
                                        .createNode({
                                            id : node.id,
                                            text : node.text,
                                            iconCls : 'icon-terminatedProject',
                                            leaf : node.attributes.leaf,
                                            statusId : obj.statusId,
                                            allowDrop : obj.allowDrop,
                                            chargedManId : node.attributes.chargedManId,
                                            expandable : expandable
                                        });
                                var parentNode = node.parentNode;
                                var nextNode = node.nextSibling;
                                var previousNode = node.previousSibling;
                                if (nextNode != null) {
                                    node.remove();
                                    parentNode.insertBefore(newNode, nextNode);
                                } else {
                                    if (previousNode == null) {
                                        var tempNode = new Ext.tree.TreeNode({
                                                    id : new Date().toString()
                                                });
                                        parentNode.appendChild(tempNode);
                                        node.remove();
                                        parentNode.appendChild(newNode);
                                        tempNode.remove();

                                    } else {
                                        node.remove();
                                        parentNode.appendChild(newNode);
                                    }
                                }
                                // newNode
                                // .on(
                                // 'beforeexpand',
                                // function(node) {
                                // collarbMain.leftTree
                                // .getLoader()
                                // .load(
                                // node);
                                // });
                                collarbMain.leftTree.fireEvent('beforeclick',
                                        newNode);// 刷新当前节点
                                collarbMain.leftTree.fireEvent('click',
                                        newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                                if (!parentNode.isExpanded()) {
                                    parentNode.expand();
                                }
                            } else {
                                collarbMain.refresh();
                                Ext.MessageBox.show({
                                            title : ''
                                                    + getResource('resourceParam499')
                                                    + '',
                                            msg : obj.error,
                                            buttons : Ext.MessageBox.OK,
                                            icon : Ext.MessageBox.ERROR
                                        });
                            }
                        },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                            node : leftNavigationTree.nodeId
                        }
                    });
                }
            });
}

function terminateTask() {
    Ext.Msg.confirm('' + getResource('resourceParam575') + '', "" + getResource('resourceParam1537') + "?", function(btn) {
        if (btn == 'yes') {
            var terminateMask = new Ext.LoadMask(document.body, {
                msg : getResource('resourceParam5041')
            });
             terminateMask.show();
            Ext.Ajax.request({
                url : "../JSON/task_TaskRemote.terminateTask",
                method : 'POST',
                success : function(response, options) {
                    terminateMask.hide();
                    var obj = Ext.util.JSON.decode(response.responseText);
                    if (obj.success == true) {
                        var node = collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId);
                        var expandable = !node.attributes.leaf;
                        var newNode = collarbMain.leftTree.getLoader().createNode({
                            id : node.id,
                            text : node.text,
                            iconCls : 'icon-terminatedTask',
                            statusId : obj.statusId,
                            allowDrop : obj.allowDrop,
                            allowDrag : false,
                            nt : node.attributes.nt,
                            approval : node.attributes.approval,
                            chargedManId : node.attributes.chargedManId,
                            projectId : node.attributes.projectId,
                            leaf : node.attributes.leaf,
                            expandable : expandable
                        });
                        var parentNode = node.parentNode;
                        var nextNode = node.nextSibling;
                        var previousNode = node.previousSibling;
                        if (nextNode != null) {
                            node.remove();
                            parentNode.insertBefore(newNode, nextNode);
                        } else {
                            if (previousNode == null) {
                                var tempNode = new Ext.tree.TreeNode({
                                    id : new Date().toString()
                                });
                                parentNode.appendChild(tempNode);
                                node.remove();
                                parentNode.appendChild(newNode);
                                tempNode.remove();
                            } else {
                                node.remove();
                                parentNode.appendChild(newNode);
                            }
                        }

                        collarbMain.leftTree.fireEvent('beforeclick', newNode);// 刷新当前节点
                        collarbMain.leftTree.fireEvent('click', newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
                        if (!parentNode.isExpanded()) {
                            parentNode.expand();
                        }
                    } else {
                        collarbMain.refresh();
                        Ext.MessageBox.show({
                            title : '' + getResource('resourceParam499') + '',
                            msg : obj.error,
                            buttons : Ext.MessageBox.OK,
                            icon : Ext.MessageBox.ERROR
                        });
                    }

                },
                disableCaching : true,
                autoAbort : true,
                params : {
                    node : leftNavigationTree.nodeId
                }
            });
        }
    });
}

function updateTreeNode(node, obj) {
    node.beginUpdate();
    var el = node.getUI().getIconEl();
    Ext.Element.fly(el).removeClass(node.attributes.iconCls);
    if (node.attributes.id == 0) {
        node.setText(leftNavigationTree.rootName);
        Ext.Element.fly(el).addClass(leftNavigationTree.rootIconCls);
    } else {
        node.setText(obj.text);
        Ext.Element.fly(el).addClass(obj.iconCls);
    }
    // node.getUI().getTextEl().innerHTML = obj.text;
    Ext.apply(node.attributes, obj);
    node.endUpdate();
}
function escSpanTag(text) {
    var reg = /<(span)\s*[^<>]*>([^<>]*)<\/\1\s*>/;
    while (reg.exec(text)) {
        text = text.replace(reg, "$2");
    }
    return text;
}