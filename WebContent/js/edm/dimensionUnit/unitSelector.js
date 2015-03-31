/**
 * 量纲、单位的选择框
 * eg.
 * =====================================================
 * Ext.onReady(function(){
 *      	var us = new UnitSelect().init(function(o){
 *          	alert(o.name);
 *          });
 *      });
 * =====================================================
 * 其中o为选中的单位数据实体，通过属性直接访问。
 * 提示：
 * init函数目前在一个document范围内只能调用一次，否则会有控件ID冲突，界面无法正常显示的问题。
 * 
 * 相关资源文件：
 * lib/ext/resources/css/ext-all.css
 * lib/ext/adapter/ext/ext-base.js
 * lib/ext/ext-all.js
 * js/edm/dimensionUnit/MultiSelect/MultiSelect.js
 * base/forum.css
 * 
 * @author YangJingang
 * @date 2010-09-03
 */

// Ext.BLANK_IMAGE_URL = '../../../lib/ext/resources/images/default/s.gif';

// 返回的数据对象
var unitRsObj = function(rec){
	this.id = rec.get('id');
	this.parentid = rec.get('parentid');
	this.name = rec.get('name').replace('【' + rec.get('abbreviation') + '】', '');
	this.englishname = rec.get('englishname');
	this.type = rec.get('type');
	this.abbreviation = rec.get('abbreviation');
	this.isbaseunit = rec.get('isbaseunit');
	this.conversionfactor = rec.get('conversionfactor');
	this.conversionexpression = rec.get('conversionexpression');
	this.reversalexpression = rec.get('reversalexpression');
	this.description = rec.get('description');
	this.unitssystem = rec.get('unitssystem');
	this.isusualunit = rec.get('isusualunit');
	this.baseabbreviation = rec.get('baseabbreviation');
	this.ordernumber = rec.get('ordernumber');
	this.pinyinname = rec.get('pinyinname');
	this.jianpinyinname = rec.get('jianpinyinname');
}

UnitSelect = function() {
    // constructor
    UnitSelect.superclass.constructor.call(this, {
        title: '' + getResource('resourceParam6084'), // 单位选择
        width: 375,
        height: 350,
        layout : 'table',
        xtype : 'form',
        modal : true,
        plain : false,
        orgDimension : null,
        orgUnit : null,
        fn : null,
        returnValue : null,
        dimensionDs : new Ext.data.ArrayStore({ // 量纲数据源，默认加载
            autoLoad : true,
            baseParams : {},
            // url : '../../../JSON/dimensionUnit_DimensionUnitRemote.loadDimensionUnit?type=0',
            url : '../JSON/dimensionUnit_DimensionUnitRemote.loadDimensionUnit?type=0',
            fields : ['id','parentid','name','englishname','type','abbreviation','isbaseunit','conversionfactor','conversionexpression',
                      'reversalexpression','description','unitssystem','isusualunit','baseabbreviation','ordernumber',
                      'pinyinname','jianpinyinname'],
            sortInfo : {
                field : 'id',
                direction : 'ASC'
            },
            listeners : {
            	"load" : function(o, rec, opts){
            		if (rec != null && rec != '') {
            			var od = Ext.getCmp('ID_dimensionOpts');
            			od.view.select([0]);
            			od.hiddenField.dom.value = od.getValue();
            		}
	            }
            },
            scope : this
        }),
        unitDs : new Ext.data.ArrayStore({ // 单位数据源，默认不加载
            autoLoad : true,
            baseParams : {},
            // url : '../../../JSON/dimensionUnit_DimensionUnitRemote.loadDimensionUnit?type=1',
            url : '../JSON/dimensionUnit_DimensionUnitRemote.loadDimensionUnit?type=1',
            fields : ['id','parentid','name','englishname','type','abbreviation','isbaseunit','conversionfactor','conversionexpression',
                      'reversalexpression','description','unitssystem','isusualunit','baseabbreviation','ordernumber',
                      'pinyinname','jianpinyinname'],
            sortInfo : {
                field : 'id',
                direction : 'ASC'
            },
            listeners : {
            	"load" : function(othis, rec, opts){
            		if (rec != null && rec != '') {
            			var o = Ext.getCmp('ID_dimensionOpts');
            			var selectedArrs = o.view.getSelectedIndexes();
            	        var op = selectedArrs[selectedArrs.length - 1];
            	        var dimentsionObj = o.view.store.getAt(op);
            	        var dimentsionID = dimentsionObj.get('id');
            	        // 为“单位”列表加载数据
            	        this.filterBy(function(recs, id){
            	        	if (recs.get('parentid') == dimentsionID) {
            	        		return true;
            	        	} else {
            	        		return false;
            	        	}
            	        });
            	        
            	        o.ownerCt.filterOpts(this);
        			}
	            }
            },
            scope : this
        }),
        resizable : false,
        layoutConfig : {
            columns : 3
        },
        buttons:[{
            text:'' + getResource('resourceParam6085'), // 确定
            iconCls: 'icon-drop-yes',
            tooltip: '' + getResource('resourceParam6085'), // 确定
            handler: function(){
        			// 判断是否选择了“单位”
		        	var o = Ext.getCmp('ID_unitOpts');
		            var selectedArrs = o.view.getSelectedIndexes();
		            Ext.MessageBox.buttonText.ok = '' + getResource('resourceParam6085'); // 确定
		            if (selectedArrs == '') {
		            	Ext.Msg.show({
		            		title : '' + getResource('resourceParam6086'), // 提示
		            		msg : '' + getResource('resourceParam6087') + '.', // 请选择具体“单位”之后再确定
		            		buttons : Ext.MessageBox.OK,
		            		icon : Ext.MessageBox.WARNING,
		            		maxWidth : 230,
		            		minWidth : 230
		            	});
		            	return;
		            }
        	
        			// 返回选择的数据行对象
		            var op = selectedArrs[selectedArrs.length - 1];
		            if (this.fn == null) {
		            	this.returnValue = new unitRsObj(o.view.store.getAt(op));
		            } else {
		            	this.fn.call(this, new unitRsObj(o.view.store.getAt(op)));
		            }
		            this.close();
                 },
                scope: this
            },{
                text:'' + getResource('resourceParam6088'), // 关闭
                iconCls: 'icon-drop-no',
                tooltip: '' + getResource('resourceParam6088'), // 关闭
                handler: function(){ this.close(); },
                scope: this
            }]
    })
};

Ext.extend(UnitSelect, Ext.Window, {
    // 初始化
    initComponent: function(){
        this.labelCls = 'font-weight:bold;text-align:center;';
        Ext.apply(this,{
                bodyStyle: 'padding:10px;',
                items:[{
                    xtype : 'fieldset',
                    name : 'toolset',
                    width : 340,
                    colspan : 3,
                    layout : 'table',
                    layoutConfig : {
                        columns : 4
                    },
                    defaults : {
                        style : 'font-size:12px;'
                    },
                    style : 'padding:5px;',
                    items : [
                        {
                            xtype : 'label',
                            column : .1,
                            html : getResource('resourceParam6089') + '&nbsp;:&nbsp;' // 单位制
                        },{
                            xtype: 'combo',
                            id : 'ID_types',
                            name: 'types',
                            // fieldLabel : '单位制',
                            width: 95,
                            height: 15,
                            columnWidth : .4,
                            emptyText : getResource('resourceParam6090') + '...', // 请选择分类
                            typeAhead : true,
                            mode : 'local',
                            forceSelection : true,
                            selectOnFocus : false,
                            triggerAction : 'all',
                            editable : false,
                            shadow : true,
                            disableKeyFilter : false,
                            allowBlank : true,
                            store : new Ext.data.ArrayStore({
                                	data: [['0','' + getResource('resourceParam6091')],  // 公制 和 英制
                                	       ['1', '' + getResource('resourceParam6092')],  // 公制
                                	       ['2', '' + getResource('resourceParam6093')]], // 英制
                                	fields: ['id','text'],
                                	sortInfo: {
                                       	field: 'id',
                                       	direction: 'ASC'
                                   	}
                               }),
                            valueField : 'id',
                            displayField : 'text',
                            listeners : {
                            	"beforerender" : function(o){
	                        		o.setValue('0');
                	            }
                            },
                            onSelect : this.chgTypes
                        },{
                            xtype : 'label',
                            column : .1,
                            html : '&nbsp;&nbsp;&nbsp;&nbsp;' + getResource('resourceParam6094') + '&nbsp;:&nbsp;' // 检索
                        },{
                            xtype: 'textfield',
                            // fieldLabel : '单位符号',
                            id : 'ID_searchText',
                            name: 'searchText',
                            width: 125,
                            column : .5,
                            emptyText : '' + getResource('resourceParam6095'), // 名称/符号/拼音首字母
                            enableKeyEvents: true,
                            listeners : {
	                        	keydown: {
		                            fn: this.chgKeyWords,
		                            buffer: 350
		                        }
                            }
                        }
                    ]
                },{
                    xtype : 'multiselect',
                    id : 'ID_dimensionOpts',
                    name : 'dimensionOpts',
                    maxSelections : 1,
                    width : 100,
                    height : 220,
                    allowBlank : true,
                    store: this.dimensionDs, // 量纲列表数组,默认加载
                    displayField : 'name',
                    valueField : 'id',
                    ddReorder : false,
                    listeners : {
                        'click' : this.dimensionClick
                    },
                    scope : this
                },{
                    xtype: 'multiselect',
                    id : 'ID_unitOpts',
                    name: 'unitOpts',
                    maxSelections : 1,
                    width: 100,
                    height: 220,
                    columnWidth : 135,
                    store: new Ext.data.ArrayStore({
                        	data: [],
                        	fields: ['id','name'],
                        	sortInfo: {
                               	field: 'id',
                               	direction: 'ASC'
                           	}
                       	}), // 单位列表数组,默认为空
                    displayField : 'name',
                    valueField : 'id',
                    ddReorder: false,
                    listeners : {
                        'click' : this.unitClick
                    },
                    scope : this
                },{
                    xtype: 'panel',
                    id : 'ID_memoLabel',
                    name: 'memoLabel',
                    baseCls : 'x-fieldset-body x-fieldset-body-noheader',
                    style : 'background-color:#DFE8F6;',
                    height : 220,
                    width : 130,
                    columnWidth : 175,
                    frame : false,
                    cls : 'ux-mselect',
                    html : '<div id="vid" style="overflow:auto;overflow-x:hidden;font-family:宋体;margin:0px;'
                    	 +                      'font-size:13px;width:100%;height:220;layout:fixed;word-break:break-all;">'
                    	 + '<b>' + getResource('resourceParam6096') + ':</b><div id="ID_unitName">&nbsp;</div><br>' // 名称
                    	 + '<b>' + getResource('resourceParam6097') + ':</b><div id="ID_unitSymble">&nbsp;</div><br>' // 符号
                    	 + '<b>' + getResource('resourceParam6098') + ':</b><div id="ID_convert">&nbsp;</div><br>' // 转换
                    	 + '<b>' + getResource('resourceParam6099') + ':</b><div id="ID_desc">&nbsp;</div>' // 描述
                    	 + '</div>'
                }
                ]
            }
        )

        UnitSelect.superclass.initComponent.call(this);
    },

    // 用于“单位”数据列表展示的临时中间Store
	tmpStore : new Ext.data.ArrayStore({
    	data: [],
    	fields: ['id','name'],
    	sortInfo: {
           	field: 'id',
           	direction: 'ASC'
       	}
   	}),
   	
    // 根据“单位制”的选择显示“单位”列表内容
    chgTypes : function(record, index){
		var strKey = Ext.getCmp('ID_searchText').getValue();
		this.ownerCt.ownerCt.setOpts(index, strKey);

    	if (this.fireEvent('beforeselect', this, record, index)) {
	    	this.setValue(record.data[this.valueField || this.displayField]);
	    	this.collapse();
	    	this.fireEvent('select', this, record, index);
    	}
    },
    
    // 根据“单位关键字”选择显示的“单位”列表内容
    chgKeyWords : function(newValue, orgValue){
    	var idIndex = Ext.getCmp('ID_types').getValue();
    	this.ownerCt.ownerCt.setOpts(idIndex, newValue.getValue());
    },
    
    // 将检索过后的结果放置到“单位”列表中
    setOpts : function(index, newValue){
    	var glDs = this.unitDs;
    	/** “单位制” 开始 */
    	// 公制 和 英制
    	if (index == '0' || index == '') {
    		// glDs.clearFilter(true);
    	// 公制 或 英制
    	} else {
    		glDs.filterBy(function(rec, _index){
    			if (rec.get('unitssystem') == index) {
            		return true;
            	} else {
            		return false;
            	}
    		});
    	}
    	
    	this.tmpStore.removeAll(true);
    	for (var i = 0; i < glDs.getCount(); i++) {
    		this.tmpStore.add(glDs.getAt(i));
    	}
    	glDs.clearFilter(true);
    	/** “单位制” 结束 */
    	
    	/** “检索” 开始 */
    	if (newValue.replace(/\s/g, '') == '') {
    		//this.tmpStore.filter('name', eval('/' + newValue + '/'), true);
    	} else if ("abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ".indexOf(newValue.charAt(0)) == -1) {
    		// 优先针对"name"列filte
    		this.tmpStore.filter('name', newValue, false);
    	} else {
    		// 输入的是字母或符号，则优先检索符号"abbreviation"，如果有结果则不再检索"jianpinyinname"
    		this.tmpStore.filter('abbreviation', newValue, false);
    		if (this.tmpStore.data.length == 0) {
    			// 如果结果为空，再对"jianpinyinname"列filte
    			this.tmpStore.filter('jianpinyinname', newValue, false);
    		}
    	}
    	/** “检索” 结束 */
		
    	/** 更新“单位”列表 开始 */
    	this.filterOpts(this.tmpStore);
    	
		this.tmpStore.clearFilter(true);
		this.tmpStore.removeAll(true);
		
		//Ext.getCmp('ID_unitOpts').view.refresh();
		/** 更新“单位”列表 结束 */
    },
    
    // 设置“单位”列表中的【符号】
    filterOpts : function(fromStore){
    	var tmpUnitStore = Ext.getCmp('ID_unitOpts').view.store;
    	tmpUnitStore.removeAll(true);
        for (var i = 0; i < fromStore.getCount(); i++) {
        	var row = fromStore.getAt(i);
        	if (row.get('name').indexOf('【') == -1) {
        		row.set('name', row.get('name') + '【' + row.get('abbreviation') + '】');
        	} else {
        		
        	}
			tmpUnitStore.add(row);
    	}
        Ext.getCmp('ID_unitOpts').view.refresh();
    },
	
    // 量纲列表的单击事件，为单位列表填充数据，及量纲说明
    dimensionClick : function(o, e){
        // 当前“量纲”最新选择的项，数组形式
        var selectedArrs = o.view.getSelectedIndexes();
        // 获取选择的“量纲”索引位置
        var op = selectedArrs[selectedArrs.length - 1];
        // 获取选择的量纲record
        var dimentsionObj = o.view.store.getAt(op);
        // 获取选择的“量纲”值
        var dimentsionID = dimentsionObj.get('id');
        if (o.ownerCt.orgDimension == dimentsionID) {
        	return ;
        }
        // 记录选择的量纲项
        o.ownerCt.orgDimension = dimentsionID;
        // 为“单位”列表加载数据
        o.ownerCt.unitDs.filterBy(function(rec, id){
        	if (rec.get('parentid') == dimentsionID) {
        		return true;
        	} else {
        		return false;
        	}
        });
        
        o.ownerCt.filterOpts(o.ownerCt.unitDs);
    },

    // 单位列表的单击事件，加载单位的说明
    unitClick : function(o, e){
        // 当前“单位”最新选择的项，数组形式
        var selectedArrs = o.view.getSelectedIndexes();
        // 获取选择的“单位”索引位置
        var op = selectedArrs[selectedArrs.length - 1];
        // 获取选择的单位record
        var unitObj = o.view.store.getAt(op);
        // 获取选择的“量纲”值
        var unitID = unitObj.get('id');
        if (o.ownerCt.orgUnit == unitID) {
        	return ;
        }
        // 记录选择的单位项
        o.ownerCt.orgUnit = unitID;
        // 设置“说明”栏
        o.ownerCt.setMemo(unitObj);
    },
    
    // 设置说明
    setMemo : function(rec){
    	// type=0时为量纲
    	if (rec.get('type') == '0') {
    		Ext.getDom('ID_dimensionName').innerHTML = rec.get('name') + '/' + rec.get('abbreviation');
    	// type=1时为单位
    	} else if (rec.get('type') == '1') {
    		Ext.getDom('ID_unitName').innerHTML = rec.get('name').replace('【' + rec.get('abbreviation') + '】', '');
    		Ext.getDom('ID_unitSymble').innerHTML = rec.get('baseabbreviation');
    		Ext.getDom('ID_convert').innerHTML = 
    			rec.get('conversionfactor') == 'null' ? 
    					(rec.get('conversionexpression') == 'null' ? rec.get('reversalexpression') : rec.get('conversionexpression')) : 
    					rec.get('conversionfactor') + '*' + rec.get('baseabbreviation');
    	}
    	Ext.getDom('ID_desc').innerHTML = rec.get('description');
    },
    init : function(fn){
    	this.show();
    	this.fn = fn;
    }
});