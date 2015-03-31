var dataCenterBase = {
	strurl : null,//
	isfile : null,//
	tempurl : '../temp/',//	
	/*******数字框*********/
	maxText : ''+getResource('resourceParam566')+'',
	maxValue : 1000,// 最大数值(可以设置不同的范围，各取所需)直接把数值框做成一个方法，直接用扩展对象的方式
	minText : ''+getResource('resourceParam565')+'',
	minValue : -1000,// 最小数值
	decimalPrecision : 10,
	curve1:null,
	bigimg:null,
	departmentCombo:null,
	codeid:null,
	codename:null,
	dbaseparams:null,
	manname:null,
	comboboxStore:null
	/***********/
}
//部门、用户、二级联动
dataCenterBase.combox=function(d,u)
{
	dataCenterBase.comboboxStore=new Ext.data.Store( {
	 	      			proxy : new Ext.data.HttpProxy( {
	 	      				method:'POST',
							url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="+new Date()
						}),
						reader : new Ext.data.JsonReader( {
							id:"userid",
							totalProperty : 'totalProperty',
							root : 'results'
							}, [ {
								name : 'truename'
							},{
								name : 'userid'
						     },{
						        name : 'loginname'
						     }])
						});
	//负责部门
	 dataCenterBase.departmentCombo = new Ext.ux.ComboBoxTree({
						width : 250,
						fieldLabel : d,
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
						selectNodeModel : 'all'
					});
			 dataCenterBase.departmentCombo.on('select', function(combo, record, index) {
			 			dataCenterBase.codeid = record.id;
		                dataCenterBase.codename=record.text;
		                dataCenterBase.userComb.clearValue();
		                dataCenterBase.userComb.setEmptyText=''+getResource('resourceParam569')+'';
		               	if(dataCenterBase.codeid!=null)
					 	{	
					 		if(dataCenterBase.codeid==-1)
					 		{
					 		   dataCenterBase.codeid=-1;
					 		   dataCenterBase.codename=null;
					 		}
					 		
					 		dataCenterBase.dbaseparams=dataCenterBase.codeid;
					 		dataCenterBase.comboboxStore.baseParams={instcode:dataCenterBase.codeid,start:0,limit:10}
					 		dataCenterBase.comboboxStore.load();	
					 	}
					});

	
	dataCenterBase.userComb=new Ext.form.ComboBox({
		           	store:dataCenterBase.comboboxStore,
					valueField :"userid",
					displayField: "truename",
					mode: 'remote',
					queryParam :'truename',
					minChars : 0,
					pageSize : 10,
					forceSelection: true,
					hiddenName:'userid',
					editable: true,
					triggerAction: 'all',
					fieldLabel: u,
					typeAhead : true,
					name: 'userid',
					blankText:''+getResource('resourceParam570')+'',
                    allowBlank:false,
					enableKeyEvents:true,
					disableKeyFilter:true,
					tpl:'<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">' +
							'<div style="float:left; text-align:left; padding-left:3px">{truename}</div>' +
							'<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>' +
							'</div></tpl>',
		     		emptyText:''+getResource('resourceParam569')+''					
	});
	dataCenterBase.userComb.on('select', function(combo, record, index){
		//下拉列表文本值
		dataCenterBase.manname=record.get(combo.displayField); 
		//var textvalue=dataCenterBase.userComb.getRawValue();
//		dataCenterBase.comboboxStore.baseParams={instcode:dataCenterBase.dbaseparams,name:textvalue}
	});
}

dataCenterBase.bigimg=function(url)
{

	if(url=='../images/blank.gif')
	   return;

	
	//document.location='../base/bigimg.jsp?url='+url;
	window.open ("../base/bigimg.jsp?url="+url); 
	 
}
dataCenterBase.strurl=function(name)
{
	var str;
	if(name==null || name.length<=0)
   {
   	  str='../images/blank.gif';
   }
   else
   {
   	  str='../temp/'+name;
   }
 
   return str;
}


dataCenterBase.isfile=function(name)
{
   var str;
   if(name==null || name.length<=0)
   {
   	  str=''+getResource('resourceParam574')+'';
   }
   else
   {
   	 str=name;
   }
   return str;
}



dataCenterBase.curve1 = function(id,value,divid){//发动机性能数据与曲线编辑grid
	var Axis = Ext.data.Record.create([{
		name : 'x',
		mapping : 0,
		type: 'float'		
	}, {
		name : 'y',
		mapping : 1,
		type: 'float'
	}]);
	var axisReader = new Ext.data.ArrayReader({
			// id: 0 
			}, Axis);	
//	var data = [[0.000234,0.001383],[0.000963,0.00302],[0.002191,0.004856],[0.00407,0.006989],[0.006938,0.00956],[0.011378,0.012738]];		
	var proxy = new Ext.data.MemoryProxy(value);
	var ds = new Ext.data.Store({"proxy":proxy, "reader":axisReader});

	var cm = new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [ {
			header : "X坐标",
			dataIndex : 'x',
			editor: new Ext.form.NumberField({
   				allowBlank: false,
   				nanText : ''+getResource('resourceParam571')+'',
   				maxText : ''+getResource('resourceParam566')+'',
   				maxValue:1000,
   				minText : ''+getResource('resourceParam565')+'',
   				minValue:-1000,
       			decimalPrecision : 10,
       			validationDelay : 100
			}),
			align : 'right'
		}, {
			header : "Y坐标",
			dataIndex : 'y',
			editor: new Ext.form.NumberField({
	               allowBlank: false,
	               nanText : ''+getResource('resourceParam571')+'',
	               maxText : ''+getResource('resourceParam566')+'',
	               maxValue:1000,
	               minText : ''+getResource('resourceParam565')+'',
	               minValue:-1000,
	               decimalPrecision : 10
	           }),
			align : 'right'
		}]
	});
	var sm = new Ext.grid.RowSelectionModel({
//		singleSelect : true,//提供多选，多行删除
		listeners : {
			rowselect : function(sm, row, rec) {
				sm.rowNumber = row;
			}
		}
	});
	
	//创建editor grid
    var grid = new Ext.grid.EditorGridPanel({
        store: ds,
        cm: cm,
        sm: sm,
//        width:600,
//        height:200,
        autoScroll:true,
        autoHeight:true,
        title:'坐标'+getResource('resourceParam490')+'',
        frame:true,
        region: 'east',
        clicksToEdit:2,

        tbar: [{
            text: ''+getResource('resourceParam466')+'',
            handler : function(){
                var p = new Axis({
                    x: 0,
                    y: 0
                });
                grid.stopEditing(); 
                var count = ds.getCount();
                ds.insert(count, p);
                grid.startEditing(count, 0);                            
            }
        },
        	{
            text: ''+getResource('resourceParam491')+'',
            handler : function(){
                var p = new Axis({
                    x: 0,
                    y: 0
                });
                grid.stopEditing();
                if(sm.rowNumber){
                	ds.insert(sm.rowNumber, p);//插入到最后选择的那行的前面
                	grid.startEditing(sm.rowNumber, 0);
                } else {
                	ds.insert(0, p);
                	grid.startEditing(0, 0);
                }                
            }
        },
        {
            text: ''+getResource('resourceParam475')+'',
            handler : function(){               
                grid.stopEditing();
//                var _selectedRow = grid.getSelectionModel().getSelected();
                var _selectedRows = grid.getSelectionModel().getSelections();
                if (_selectedRows){
//                	grid.getSelectionModel().selectNext();
                	var _selectedLen=_selectedRows.length
                	for(var i=0; i<_selectedLen; i++){
                		ds.remove(_selectedRows[i]); 
                	}
                	if (_selectedLen == 1)//如果是单行删除，则自动选中后面一行，如果存在的话。如果是多行删除，则不选择。
                		grid.getSelectionModel().selectRow(sm.rowNumber);            	
                } else {
                	Ext.Msg.alert(''+getResource('resourceParam575')+'', ""+getResource('resourceParam568')+"");
                }
            }
        },
        {
            text: '保存',
            handler : function(){               
                grid.stopEditing();
                Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam512')+''+getResource('resourceParam510')+'保存'+getResource('resourceParam508')+'并'+getResource('resourceParam576')+'曲线图?',
				function(btn, text) {
					if (btn == 'yes') {
				var saveData = '[';
                var count = ds.getCount();
                for(i=0; i<count; i++){
                	saveData += '[' + ds.getAt(i).data.x + ',' + ds.getAt(i).data.y + ']';
                	if (i != (count-1))
                		saveData += ',';                	
                }
                saveData += ']';
                var jsonValue =  '{' + id + ';'+ saveData + '}';
                callSeam("DataCenterViewService", "saveSingleData", [jsonValue],
						function(result) {
							var sign = result;
							if (sign == "false") {
								Ext.MessageBox.show({
									title : ''+getResource('resourceParam572')+'',
									msg : ''+getResource('resourceParam567')+'',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								}); 
							} else {								
								Ext.getDom(divid).innerHTML = '<a href="javascript:void(0);" onClick="dataCenterBase.bigimg(\''
						+result+'\')"><img src="' +result +  '" width ="500" height="400" /></a>';								
							}
						}
						);
				}
				});                
            }
        },
        {
			text : '预览曲线',//与保存方法，需抽象成一个公共方法
			handler : function() {
				// 在这里调用预览曲线的方法，并把图片地址赋值到src中，需要方法返回曲线图的地址
				//这种封装方式更好一些，但是为什么生成的json对象里面有"号
//				var rows = [];
//				ds.each(function(r) {
//					var row = [];
//					ds.fields.each(function(f) {
//						row.push(r.get(f.name));
//					});
//					rows.push(row);
//				});
//				alert(Ext.encode(rows));
//				Ext.getCmp('发动机性能数据与曲线').setValue(Ext.encode(rows));
				var saveData = '[';//抽象成公共的方法
                var count = ds.getCount();
                for(i=0; i<count; i++){
                	saveData += '[' + ds.getAt(i).data.x + ',' + ds.getAt(i).data.y + ']';
                	if (i != (count-1))
                		saveData += ',';                	
                }
                saveData += ']';
                var jsonValue =  '{' + id + ';'+ saveData + '}';
                 callSeam("DataCenterViewService", "viewCurve", [jsonValue],
						function(result) {				
							Ext.getDom(divid).innerHTML = '<a href="javascript:void(0);" onClick="dataCenterBase.bigimg(\''
						+result+'\')"><img src="' +result +  '" width ="500" height="400" /></a>';							
						}
						);
			}
		}
        ]
    });
    ds.load(); 
    return grid;
}
