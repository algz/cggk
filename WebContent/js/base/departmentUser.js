var departmentUser = {
    departmentCombo : null,
    codeid : null,
    roleId : null,// 对于角色的过滤
    codename : null,
    dbaseparams : null,
    manname : null,
    comboboxStore : null,
    onselectDepart : null,
    pagingUser : null,
    roleName:null
}
departmentUser.init = function(d, u, params) {

    departmentUser.codeid = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.roleId = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.userid = null;
    departmentUser.securityDegree =null;//  用户的密级
    var basePath = "..";
    if(params){
        basePath = params.basePath||basePath;
    }
    departmentUser.comboboxStore = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
                    method : 'POST',
                    url : basePath+"/JSON/base_user_UserSerivce.findpageDepartmentList?a="
                            + new Date()
                }),
        reader : new Ext.data.JsonReader({
                    id : "userid",
                    totalProperty : 'totalProperty',
                    root : 'results'
                }, [{
                            name : 'truename'
                        }, {
                            name : 'userid'
                        }, {
                            name : 'loginname'
                        }, {
                            name : 'ginstitutename'
                        }, {
                            name : 'instcode'
                        }])
    });
    departmentUser.treePanel = new Ext.tree.TreePanel({
                rootVisible : false,
//                autoScroll:true,
                containerScroll:true,
                loader : new Ext.tree.TreeLoader({
                            dataUrl : basePath+"/JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : new Ext.tree.AsyncTreeNode({
                            id : '0',
                            text : ''+getResource('resourceParam573')+''
                        })
            });
    // 负责部门
    departmentUser.departmentCombo = new Ext.ux.ComboBoxTree({
//              listWidth : 300,
                fieldLabel : d,
//                 autoScroll:true,
                tree : departmentUser.treePanel,
                // {
                // xtype : 'treepanel',
                // rootVisible : false,
                // loader : new Ext.tree.TreeLoader({
                // dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                // }),
                //
                // root : new Ext.tree.AsyncTreeNode({
                // id : '0',
                // text : '根结点'
                // })
                // },
                selectNodeModel : 'all',
                resizable:true,
                 width:250,
                onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
            });
    departmentUser.departmentCombo.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
                departmentUser.userComb.clearValue();
                departmentUser.userid=null;
                departmentUser.userComb.setEmptyText = ''+getResource('resourceParam569')+'';
                if (departmentUser.codeid != null) {
                    if (departmentUser.codeid == -1) {
                        departmentUser.codeid = -1;
                        departmentUser.codename = null;
                    }
                    departmentUser.dbaseparams = departmentUser.codeid;
                }
            });

    departmentUser.userComb = new Ext.form.ComboBox({
        store : departmentUser.comboboxStore,
        valueField : "userid",
        displayField : "truename",
        mode : 'remote',
        queryParam : 'truename',
        minChars : 0,
        pageSize : 10,
        forceSelection : true,
        hiddenName : 'userid',
        editable : true,
        triggerAction : 'all',
        fieldLabel : u,
        typeAhead : false,
        name : 'userid',
        resizable:true,
        blankText : ''+getResource('resourceParam570')+'',
        allowBlank : true,
        enableKeyEvents : true,
        disableKeyFilter : true,
        tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
                + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
                + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
                + '</div></tpl>',
        emptyText : ''+getResource('resourceParam569')+''
    });
    departmentUser.userComb.on('beforequery', function(qe) {

                if (departmentUser.keypress) {
                    departmentUser.comboboxStore.baseParams = {
                        truename : departmentUser.userComb.getRawValue(),
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                } else {
                    departmentUser.comboboxStore.baseParams = {
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                }
                departmentUser.keypress = false;
                delete qe.combo.lastQuery;
//              departmentUser.comboboxStore.load();
            });

    departmentUser.comboboxStore.on('load',function(store,records,options){
//      alert(records.length);
//      alert(store.getTotalCount());
        if(store.getTotalCount()<1){
            departmentUser.userid = null;
            departmentUser.codeid=null;
            departmentUser.departmentCombo.setRawValue('');
            departmentUser.userComb.setRawValue('');
        }
        
    });
    departmentUser.userComb.on('keypress', function(combo) {
                departmentUser.keypress = true;
            });

    departmentUser.userComb.on('select', function(combo, record, index) {
                // 下拉列表文本值
                departmentUser.manname = record.get(combo.displayField);
                departmentUser.userid = record.get(combo.valueField);
                // 在选择了人员后，设置人员所在部门id，部门名称
                departmentUser.departmentCombo.setRawValue(record
                        .get('ginstitutename'));
                departmentUser.codeid = record.get('instcode');
            });
}

departmentUser.init = function(d, u, params) {
	if(typeof(params)=='undefined')
	{
		params={};
	}
    departmentUser.codeid = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.roleId = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.userid = null;
    departmentUser.securityDegree =null;//  用户的密级
    departmentUser.currentDegree=null;
    departmentUser.comboboxStore = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
                    method : 'POST',
                    url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
                            + new Date()
                }),
        reader : new Ext.data.JsonReader({
                    id : "userid",
                    totalProperty : 'totalProperty',
                    root : 'results'
                }, [{
                            name : 'truename'
                        }, {
                            name : 'userid'
                        }, {
                            name : 'loginname'
                        }, {
                            name : 'ginstitutename'
                        }, {
                            name : 'instcode'
                        },{
                        	name : 'securityDegree'
                        }])
    });
    departmentUser.treePanel = new Ext.tree.TreePanel({
                rootVisible : false,
//                autoScroll:true,
                containerScroll:true,
                loader : new Ext.tree.TreeLoader({
                            dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : new Ext.tree.AsyncTreeNode({
                            id : '0',
                            text : ''+getResource('resourceParam573')+''
                        })
            });
    // 负责部门
    departmentUser.departmentCombo = new Ext.ux.ComboBoxTree({
                fieldLabel : d,
                tree : departmentUser.treePanel,
                 resizable:true,
               //修改滚动条出现异常的bug
                width:250,
                // {
                // xtype : 'treepanel',
                // rootVisible : false,
                // loader : new Ext.tree.TreeLoader({
                // dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                // }),
                //
                // root : new Ext.tree.AsyncTreeNode({
                // id : '0',
                // text : '根结点'
                // })
                // },
                selectNodeModel : 'all',
                onViewClick : function(doFocus) {

                     Seam.Remoting.log('2:'+doFocus);
            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
            });

    departmentUser.departmentCombo.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
                departmentUser.userComb.clearValue();
                departmentUser.userid=null;
                departmentUser.userComb.setEmptyText = ''+getResource('resourceParam569')+'';
                if (departmentUser.codeid != null) {
                    if (departmentUser.codeid == -1) {
                        departmentUser.codeid = -1;
                        departmentUser.codename = null;
                    }
                    departmentUser.dbaseparams = departmentUser.codeid;
                }
            });

    departmentUser.userComb = new Ext.form.ComboBox({
        store : departmentUser.comboboxStore,
        valueField : "userid",
        displayField : "truename",
        mode : 'remote',
        queryParam : 'truename',
        minChars : 0,
        pageSize : 10,
        forceSelection : true,
        hiddenName : 'userid',
        editable : true,
        triggerAction : 'all',
        fieldLabel : u,
        typeAhead : false,
        resizable:true,
        name : 'userid',
        blankText : ''+getResource('resourceParam570')+'',
        allowBlank : true,
        enableKeyEvents : true,
        disableKeyFilter : true,
        
        tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
                + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
                + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
                + '</div></tpl>',
        emptyText : params.userEmptyText?params.userEmptyText:''+getResource('resourceParam569')+''
    });
    departmentUser.userComb.on('beforequery', function(qe) {
                if (departmentUser.keypress) {
                    departmentUser.comboboxStore.baseParams = {
                        truename : departmentUser.userComb.getRawValue(),
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                } else {
                    departmentUser.comboboxStore.baseParams = {
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                }
                departmentUser.keypress = false;
               delete qe.combo.lastQuery;
//              departmentUser.comboboxStore.load();
            });

    departmentUser.comboboxStore.on('load',function(store,records,options){
//      alert(records.length);
//      alert(store.getTotalCount());
        if(store.getTotalCount()<1){
        	   var message=[];
        	   if (departmentUser.securityDegree != null
					&& departmentUser.securityDegree != ''&& departmentUser.securityDegree != 0) {
        		   message.push('密级');
			   }
               if (departmentUser.roleId != null
						&& departmentUser.roleId != '') {
            	   message.push('角色');
				}
				if (departmentUser.codeid != null
						&& departmentUser.codeid != '') {
					message.push('部门');
				}
				if(message.length>0){
					Ext.example.msg('提示','没有满足条件（'+message.join(',')+'）的用户！');
				}else{
					Ext.example.msg('提示','没有用户！');
				}
        	
        	//注释：部门任务时，部门不能回填
        	//如果部门下用户为空，则回填部门为空。
//            departmentUser.userid = null;
//            departmentUser.codeid=null;
//            departmentUser.departmentCombo.setRawValue('');
//            departmentUser.userComb.setRawValue('');
        }
//        alert("load加载数据。是否展开"+departmentUser.userComb.isExpanded());
    });
    departmentUser.userComb.on('expand',function(combo){
    
//        alert("expand展开列表");
    });
    departmentUser.userComb.on('keypress', function(combo) {
                departmentUser.keypress = true;
            });

    departmentUser.userComb.on('select', function(combo, record, index) {
                // 下拉列表文本值
                departmentUser.manname = record.get(combo.displayField);
                departmentUser.userid = record.get(combo.valueField);
                // 在选择了人员后，设置人员所在部门id，部门名称
                departmentUser.departmentCombo.setRawValue(record
                        .get('ginstitutename'));
                departmentUser.codeid = record.get('instcode');
                departmentUser.codename=record.get('ginstitutename');
                departmentUser.currentDegree=record.get('securityDegree');
                if(params.userSelectCallback){
                	params.userSelectCallback();
                }
            });
}

departmentUser.init2= function(d,u)
{
    
    departmentUser.codeid = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.roleId = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.userid = null;
    departmentUser.securityDegree =null;//  用户的密级
    departmentUser.comboboxStore2 = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
                    method : 'POST',
                    url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
                            + new Date()
                }),
        reader : new Ext.data.JsonReader({
                    id : "userid",
                    totalProperty : 'totalProperty',
                    root : 'results'
                }, [{
                            name : 'truename'
                        }, {
                            name : 'userid'
                        }, {
                            name : 'loginname'
                        }, {
                            name : 'ginstitutename'
                        }, {
                            name : 'instcode'
                        }])
    });
    departmentUser.treePanel = new Ext.tree.TreePanel({
                rootVisible : false,
//                autoScroll:true,
                containerScroll:true,
                loader : new Ext.tree.TreeLoader({
                            dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : new Ext.tree.AsyncTreeNode({
                            id : '0',
                            text : ''+getResource('resourceParam573')+''
                        })
            });
    // 负责部门
    departmentUser.departmentCombo2 = new Ext.ux.ComboBoxTree({
                fieldLabel : d,
//                 autoScroll:true,
                tree : departmentUser.treePanel,
                 resizable:true,
                  width:250,
                // {
                // xtype : 'treepanel',
                // rootVisible : false,
                // loader : new Ext.tree.TreeLoader({
                // dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                // }),
                //
                // root : new Ext.tree.AsyncTreeNode({
                // id : '0',
                // text : '根结点'
                // })
                // },
                selectNodeModel : 'all',
                onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
            });
    departmentUser.departmentCombo2.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
                departmentUser.userComb2.clearValue();
                departmentUser.userComb2.setEmptyText = ''+getResource('resourceParam569')+'';
                if (departmentUser.codeid != null) {
                    if (departmentUser.codeid == -1) {
                        departmentUser.codeid = -1;
                        departmentUser.codename = null;
                    }
                    departmentUser.dbaseparams = departmentUser.codeid;
                }
            });

    departmentUser.userComb2 = new Ext.form.ComboBox({
        store : departmentUser.comboboxStore2,
        valueField : "userid",
        displayField : "truename",
        mode : 'remote',
        queryParam : 'truename',
        minChars : 0,
        pageSize : 10,
        forceSelection : true,
        hiddenName : 'userid',
        editable : true,
        triggerAction : 'all',
        fieldLabel : u,
        typeAhead : false,
        name : 'userid',
        blankText : ''+getResource('resourceParam570')+'',
        allowBlank : true,
        enableKeyEvents : true,
          resizable:true,
        disableKeyFilter : true,
        tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
                + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
                + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
                + '</div></tpl>',
        emptyText : ''+getResource('resourceParam569')+''
    });
    departmentUser.userComb2.on('beforequery', function(qe) {

                if (departmentUser.keypress) {
                    departmentUser.comboboxStore2.baseParams = {
                        truename : departmentUser.userComb2.getRawValue(),
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                } else {
                    departmentUser.comboboxStore2.baseParams = {
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                }
                departmentUser.keypress = false;
                delete qe.combo.lastQuery;
//              departmentUser.comboboxStore.load();
            });
    departmentUser.userComb2.on('blur', function(field) {
            });
    departmentUser.userComb2.on('expand', function(combo) {
//      var total=departmentUser.comboboxStore.getCount();
//      alert(total);
            });
    departmentUser.comboboxStore2.on('load',function(store,records,options){
//      alert(records.length);
//      alert(store.getTotalCount());
        
        if(Ext.isEmpty(departmentUser.userComb2.getRawValue()))
        {
            departmentUser.userid = null;
        }
        if(store.getTotalCount()<1){
            departmentUser.userid = null;
            departmentUser.codeid=null;
            departmentUser.departmentCombo2.setRawValue('');
            departmentUser.userComb2.setRawValue('');
        }
        
    });
    departmentUser.userComb2.on('keypress', function(combo) {
                departmentUser.keypress = true;
            });

    departmentUser.userComb2.on('select', function(combo, record, index) {
                // 下拉列表文本值
                departmentUser.manname = record.get(combo.displayField);
                departmentUser.userid = record.get(combo.valueField);
                // 在选择了人员后，设置人员所在部门id，部门名称
                departmentUser.departmentCombo2.setRawValue(record
                        .get('ginstitutename'));
                departmentUser.codeid = record.get('instcode');
            });

}


departmentUser.users = function(d, u) {
    
    departmentUser.codeid = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.roleId = null;// init时置为null，否则再次点击时，会有影响
    departmentUser.userid = null;
    departmentUser.securityDegree =null;//  用户的密级
    departmentUser.comboboxStore3 = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
                    method : 'POST',
                    url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
                            + new Date()
                }),
        reader : new Ext.data.JsonReader({
                    id : "userid",
                    totalProperty : 'totalProperty',
                    root : 'results'
                }, [{
                            name : 'truename'
                        }, {
                            name : 'userid'
                        }, {
                            name : 'loginname'
                        }, {
                            name : 'ginstitutename'
                        }, {
                            name : 'instcode'
                        }])
    });
    departmentUser.treePanel = new Ext.tree.TreePanel({
                rootVisible : false,
//                autoScroll:true,
                containerScroll:true,
                loader : new Ext.tree.TreeLoader({
                            dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : new Ext.tree.AsyncTreeNode({
                            id : '0',
                            text : ''+getResource('resourceParam573')+''
                        })
            });
    // 负责部门
    departmentUser.departmentCombo3 = new Ext.ux.ComboBoxTree({
                fieldLabel : d,
//                 autoScroll:true,
                tree : departmentUser.treePanel,
                 resizable:true,
                  width:250,
                // {
                // xtype : 'treepanel',
                // rootVisible : false,
                // loader : new Ext.tree.TreeLoader({
                // dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                // }),
                //
                // root : new Ext.tree.AsyncTreeNode({
                // id : '0',
                // text : '根结点'
                // })
                // },
                selectNodeModel : 'all',
                onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
            });
    departmentUser.departmentCombo3.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
                departmentUser.userComb3.clearValue();
                departmentUser.userComb3.setEmptyText = '请选择负责人...';
                if (departmentUser.codeid != null) {
                    if (departmentUser.codeid == -1) {
                        departmentUser.codeid = -1;
                        departmentUser.codename = null;
                    }
                    departmentUser.dbaseparams = departmentUser.codeid;
                }
            });

    departmentUser.userComb3 = new Ext.form.ComboBox({
        store : departmentUser.comboboxStore3,
        valueField : "userid",
        displayField : "truename",
        mode : 'remote',
        queryParam : 'truename',
        minChars : 0,
        pageSize : 10,
        forceSelection : true,
        hiddenName : 'userid',
        editable : true,
        triggerAction : 'all',
        fieldLabel : u,
        typeAhead : false,
        name : 'userid',
        blankText : ''+getResource('resourceParam570')+'',
        allowBlank : true,
        enableKeyEvents : true,
          resizable:true,
        disableKeyFilter : true,
        tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">'
                + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>'
                + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>'
                + '</div></tpl>',
        emptyText : '请选择负责人...'
    });
    departmentUser.userComb3.on('beforequery', function(qe) {

                if (departmentUser.keypress) {
                    departmentUser.comboboxStore3.baseParams = {
                        truename : departmentUser.userComb3.getRawValue(),
                        instcode : departmentUser.codeid,
                        isTeam : 'true',
                        roleId : departmentUser.roleId,
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                } else {
                    departmentUser.comboboxStore3.baseParams = {
                        instcode : departmentUser.codeid,
                        roleId : departmentUser.roleId,
                          isTeam : 'true',
                        securityDegree: departmentUser.securityDegree,
                        start : 0,
                        limit : 10
                    }
                }
                departmentUser.keypress = false;
                delete qe.combo.lastQuery;
//              departmentUser.comboboxStore.load();
            });

    departmentUser.comboboxStore3.on('load',function(store,records,options){
//      alert(records.length);
//      alert(store.getTotalCount());
    	
        if(Ext.isEmpty(departmentUser.userComb3.getRawValue()))
        {
            departmentUser.userid = null;
        }
        if(store.getTotalCount()<1){
            departmentUser.userid = null;
            departmentUser.codeid=null;
            departmentUser.departmentCombo3.setRawValue('');
            departmentUser.userComb3.setRawValue('');
        }
        
    });
    departmentUser.userComb3.on('keypress', function(combo) {
                departmentUser.keypress = true;
            });

    departmentUser.userComb3.on('select', function(combo, record, index) {
                // 下拉列表文本值
                departmentUser.manname = record.get(combo.displayField);
                departmentUser.userid = record.get(combo.valueField);
                // 在选择了人员后，设置人员所在部门id，部门名称
                departmentUser.departmentCombo3.setRawValue(record
                        .get('ginstitutename'));
                departmentUser.codeid = record.get('instcode');
            });

}

departmentUser.department = function(fieldLabel) {
    var root = new Ext.tree.AsyncTreeNode({
                id : '0',
                text : ''+getResource('resourceParam573')+''
            });
    departmentUser.treePanel = new Ext.tree.TreePanel({
                rootVisible : false,
                loader : new Ext.tree.TreeLoader({
                            dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : root
            });
    // 
    // 负责部门
    // departmentUser.treePanel.getRootNode().expand(true, true);
    departmentUser.departmentCombo = new Ext.ux.ComboBoxTree({
        fieldLabel : fieldLabel,
        tree : departmentUser.treePanel,
        selectNodeModel : 'all',
         resizable:true,
          width:250,
//         autoScroll:true,
        onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
    });
    // departmentUser.treePanel.getRootNode().expand(true);
    departmentUser.departmentCombo.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
            });

}

departmentUser.onselectDepart = function(d) {
    departmentUser.treePanela = new Ext.tree.TreePanel({
                rootVisible : false,

                loader : new Ext.tree.TreeLoader({
                            dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                        }),

                root : new Ext.tree.AsyncTreeNode({
                            id : '0',
                            text : ''+getResource('resourceParam573')+''
                        })
            });
    // 负责部门
    departmentUser.departmentComboa = new Ext.ux.ComboBoxTree({
                fieldLabel : d,
                tree : departmentUser.treePanela,
                selectNodeModel : 'all',
                width:250,
                 resizable:true,
//                 autoScroll:true,
                onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
            });
         
}

departmentUser.pagingUser = function(d, u) {
    // 负责部门
    departmentUser.pagingCombo = new Ext.ux.ComboBoxTree({
        fieldLabel : d,
         resizable:true,
      width:250,

        tree : {
            xtype : 'treepanel',
            rootVisible : false,
            loader : new Ext.tree.TreeLoader({
                        dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
                    }),

            root : new Ext.tree.AsyncTreeNode({
                        id : '0',
                        text : ''+getResource('resourceParam573')+''
                    })
        },
        selectNodeModel : 'all',
        onViewClick : function(doFocus) {

            var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                    .getAt(index);
            if (r) {
                this.onSelect(r, index);
            } else {
                // this.collapse();
            }
            if (doFocus !== false) {
                this.el.focus();
            }

        }
    });
    departmentUser.pagingCombo.on('select', function(combo, record, index) {
                departmentUser.codeid = record.id;
                departmentUser.codename = record.text;
                departmentUser.userComb.clearValue();
                if (departmentUser.codeid != null) {
                    if (departmentUser.codeid == -1) {
                        departmentUser.codeid = -1;
                        departmentUser.codename = null;
                    }
                    departmentUser.dbaseparams = departmentUser.codeid;
                }
            });
}
