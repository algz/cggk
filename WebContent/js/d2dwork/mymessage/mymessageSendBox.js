var mymessageSendBox = {ids:null}
mymessageSendBox.init = function() {
    Ext.QuickTips.init();
	var strurl = "../../JSON/base_user_UserSerivce.findDepartmentList?a="
			+ new Date();
//	departmentUser.users('' + getResource('resourceParam1408') + '', strurl);
//	departmentUser.usersComb.style = 'margin-bottom: 5px;';
	
	
	var hemlEd = new Ext.form.HtmlEditor({
		fieldLabel : "&nbsp;"+getResource('resourceParam5021'),
		id : 'messagebody',
		anchor : '95%',
		name : 'messagebody',
		xtype : 'htmleditor',
		enableColors : true,
		//maxLength : 1000,
		//maxLengthText : '' + getResource('resourceParam1400') + '',
		enableAlignments : true,
		enableKeyEvents : true,
		fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
		defaultFont: '宋体'
	});
	//将htmleditor换成textarea update by chenzh
	var hemlEd = new Ext.form.TextArea({
		fieldLabel : "&nbsp;"+getResource('resourceParam5021'),//内容
		id : 'messagebody',
		anchor : '95%',
		name : 'messagebody',
		enableColors : true,
		//width : 200,
		height : 400,
		//allowBlank : false,
		//emptyText : '' + getResource('resourceParam622') + '',
		maxLength : 500,
		maxLengthText : '' + getResource('resourceParam591') + ''//长度不能大于500！
	});
//	hemlEd.addListener('keypress' , function(cur, evt){
//		alert("aaa");
//	});
//	hemlEd.on('keyup' , function(cur, evts) {alert("aaaa");});
	
	
	mymessageSendBox.form = new Ext.FormPanel({
		labelWidth : 60, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		fileUpload : true,
		autoScroll : true,
		enctype : 'multipart/form-data',
		bodyStyle : 'padding:5px 0px 0;background:transparent;',
		defaultType : 'textfield',
		items : [{
					fieldLabel : '&nbsp;' + getResource('resourceParam504') + '', // 文本框
					name : 'messagetitle',
					id : 'messagetitle',
					// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,:.])*$/,
					// regexText : '只能输入中文,字母,数字,英文逗号,英文句号和冒号!',
					// width:200,
					blankText : '' + getResource('resourceParam1407') + '',
					maxLength : 50,
					maxLengthText : '' + getResource('resourceParam1122') + '',
					allowBlank : false,
					anchor : '95%'
				},{
                    xtype : 'panel',
                    bodyStyle : 'padding:0px 0px 5px 0px;background:transparent;border:0',
                    html : '<table id="tablefile"><tr><td valign=top><font size="2">'
                          + getResource('resourceParam1408')
                          + '：</font>'
                          + '&nbsp;'+(Ext.isIE ? '&nbsp;&nbsp;': '' )+'<td><input class="x-form-text x-form-field" type="text" readOnly="true" id="btnuUsers" name="btnuUsers" size="60"/></td><td>'
                          + '<input id="userid" name="userid" type="hidden"/></td></td><td valign=top><input type="button" id="btnuUsers" name="btnuUsers" value="'
                          + getResource('resourceParam9155')
                          + '" onclick="mymessageSendBox.ininSelectUser();" />&nbsp;&nbsp;<input type="button" value="'+getResource('resourceParam557')+'" onclick="mymessageSendBox.clearBtnuUsers();" /> </td></tr></table>'
                }, 
//                {
//					fieldLabel : "&nbsp;"+getResource('resourceParam5021'),
//					id : 'messagebody',
//					anchor : '95%',
//					name : 'messagebody',
//					xtype : 'htmleditor',
//					enableColors : true,
//					maxLength : 2000,
//					maxLengthText : '' + getResource('resourceParam1400') + '',
//					enableAlignments : true,
//					enableKeyEvents : true,
//					listeners : {'keyup' : function(cur, evt) {
//                			alert("aa");
//							var curLen = cur.getValue().length;
//							if(curLen <= 2000) {
//								collarbForm.viewTi = '您还可以输入' + (2000 - curLen) + '个字';
//								Ext.get('addTaskWang').dom.innerHTML = collarbForm.viewTi;
//							} else {
//								collarbForm.viewTi = '<font color="red">字数已超过规定长度，请酌情删减！</font>';
//								Ext.get('addTaskWang').dom.innerHTML = collarbForm.viewTi;
//							}
//							
//						}
//					}
//				},
                
                hemlEd,
                
				new Ext.Panel({
					   width : 400,
					   border:false,
					   html:'<div id="addTaskWang" style="color:#0000FF;text-align:center;margin-left:-55px;"></div>'
				}),
				
				{
					xtype : 'panel',
					bodyStyle : 'padding:0px 0px 0px 0px;background:transparent;border:0',
                    html : '<table id="tablefile"><tr><td valign=top><font size="2">'
                          + getResource('resourceParam604')
                          + '：</font>'
                          + '&nbsp;&nbsp;'+(Ext.isIE ? '&nbsp;&nbsp;&nbsp;&nbsp;': '' )+'</td><td valign=top><input type="button" id="btnAddFile" name="btnAddFile" value="'
                          + getResource('resourceParam647')
                          + '" onclick="addFile()" /></td><td><table id="tableFiles" name="tableFiles"></table></td><td>'
                          + '</td></tr></table>'
				},{
                    id : 'sendmode',
                    name : 'sendmode',
                    value : 'send',
                    hidden : true,
                    hiddenLabel:true
                }, {
                    id : 'messageid',
                    name : 'messageid',
                    hidden : true,
                    hiddenLabel:true
                }],
		buttons : [ // 定义面板中的按钮
		{
            id:'sendboxbuttonid',
			text : getResource('resourceParam5019'),
			handler : function() {
                if (mymessageSendBox.form.form.isValid()) {
                //	2011-6-8 该判断和表单输入提示有冲突  故注释 gzj
           /*     	var strLen = 0;    
                	var str = mymessageSendBox.form.getForm().findField("messagebody").getValue();
					for (i = 0; i < str.length; i++) {
						if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
							strLen += 1;
						} else {
							strLen += 2;
						}
					}
					if (strLen > 1000) {
						Ext.MessageBox.show({
							title : '' + getResource('resourceParam634')+ '',
							msg : '' + getResource('resourceParam1226')+ '',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
						return ;
					}*/
				/*	if(str.length > 1000) {
						Ext.MessageBox.show({
							title : '' + getResource('resourceParam634')
									+ '',
							msg : '' + "字数不能超过1000，请酌情删减！" + '',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
						return ;
					} */
//                	var s=mymessageSendBox.form.getForm().findField("messagebody").getValue();
//                 	if(s.length>500) {
//                   	Ext.Msg.alert(getResource('resourceParam508'),getResource("resourceParam1401"));
//                   	return;
//                	}
	                if(Ext.isEmpty(Ext.fly("userid").dom.value)) {
	                   Ext.Msg.alert(getResource("resourceParam508"),getResource('resourceParam9156'));
	                   return;
	                }
					mymessageSendBox.form.getForm().findField('sendmode').setValue('save');
					mymessageSendBox.form.getForm().submit({
					url : '../../MessageFileServlet',
					method : 'post',
					loadMask : {
						msg : '' + getResource('resourceParam1406') + '...'
					},
					success : function(form, action) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam587')
											+ '',
									msg : '' + getResource('resourceParam1402')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO,
									fn : message2,
									width:200
								});
					},
					failure : function(form, action) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam587')
											+ '',
									msg : '' + getResource('resourceParam1403')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				});
                }
			}
		}, {
			text : '' + getResource('resourceParam605') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (mymessageSendBox.form.form.isValid()) {
					var strLen = 0;
                	var str = mymessageSendBox.form.getForm().findField("messagebody").getValue();
					for (i = 0; i < str.length; i++) {
						if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
							strLen += 1;
						} else {
							strLen += 2;
						}
					}
					if (strLen > 1000) {
						Ext.MessageBox.show({
							title : '' + getResource('resourceParam634')+ '',
							msg : '' + getResource('resourceParam591')+ '',//长度不能大于500！'
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
						return ;
					}
                if(Ext.isEmpty(Ext.fly("userid").dom.value)) {
                   Ext.Msg.alert(getResource("resourceParam508"),getResource('resourceParam9156'));
                   return;
                }
//                var s=mymessageSendBox.form.getForm().findField("messagebody").getValue();
//                if(s.length>500)
//                {
//                   Ext.Msg.alert(getResource('resourceParam508'),getResource("resourceParam1401"));
//                   return;
//                }
						mymessageSendBox.form.getForm().submit({
							url : '../../MessageFileServlet',
							method : 'post',
							loadMask : {
								msg : '' + getResource('resourceParam1406')
										+ '...'
							},
							success : function(form, action) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											width:200,	 //gaoyn bug 830 2011-6-7 14:47 信息提示一行显示	
											msg : ''
													+ getResource('resourceParam1404')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO,
											fn : message2
										});
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam1405')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						});
//					}
				}
			}
		}]
	}

	);

	return mymessageSendBox.form;
}
function message2() {
	mymessageMain.tabpanel.setActiveTab(1);
	mymessageSendBox.form.getForm().findField('sendmode').setValue('send');
}
// 添加上传组件
function addFile() {
	var Rows = document.getElementById("tableFiles").rows;// 类似数组的Rows
    if(Rows.length>4)
    {
       Ext.Msg.alert(getResource("resourceParam508"),getResource("resourceParam9153"));
       return;
    }
	var newRow = document.getElementById("tableFiles").insertRow(document
			.getElementById("tableFiles").rows.length);// 插入新的一行

    newRow.id = "tr"+(Rows.length-1);
	var Cells = newRow.cells;// 类似数组的Cells

    var len=Rows.length-1;
    
	var newCell = Rows[newRow.rowIndex].insertCell(Cells.length);
	newCell.align = "center";
	newCell.innerHTML = "<input type='file' name='messagefile"
			+ len + "' value='' contenteditable='false'/>";
            
//    newCell.innerHTML="<input type='file' name='messagefile" +
//            + len +"' style='position:absolute;opacity:0;filter:alpha(opacity=0);'" +
//                    " onchange='this.form.upfile.value=this.value;'/>" +
//                    "<input type='text' name='upfile'"+len+" size='20' readonly='readonly'" +
//                    " style='background-color:#FFFFFF;' border:1px solid #A7A6AA;" +
//                    " onclick='this.form.file.click();'/>" +
//                    "<input id='liuid'"+len+" type='button' value='浏览……' onclick='this.form.file.click();'/>";
   
    Cells=newRow.cells;
    newCell = Rows[newRow.rowIndex].insertCell(Cells.length);
    newCell.innerHTML = '<input type="button" id="btnAddFile'+len+'" name="btnAddFile" value="'
                          + getResource('resourceParam475')
                          + '" onclick="delFile('+len+')" />';
    
}

// 删除上传组件
function delFile() {
	if (document.getElementById("tableFiles").rows.length > 0) {
		document.getElementById("tableFiles").deleteRow(document
				.getElementById("tableFiles").rows.length
				- 1);
	}
}
//删除指定的TR行
function delFile(len) {
    var tr=document.getElementById("tr"+len);
    tr.parentNode.removeChild(tr);
}

function deleteOtherFiles() {
    var a=document.getElementById("tableFiles");
    var b=a.rows.length;
	while (b > 0) {
		a.deleteRow(b - 1);
	}
}
mymessageSendBox.ininSelectUser = function()
{
  userMultiselect.init(mymessageSendBox.ininCallBack,Ext.fly("userid").dom.value,"truename");
}
mymessageSendBox.ininCallBack = function()
{
    var names=new Array(),ids=new Array();
    var f=0;
    var dataStore = userMultiselect.usersore;
    if(!Ext.isEmpty(dataStore))
    {
	    dataStore.each(function(record){
	      names[f]=record.data.truename;
	      ids[f]=record.data.userid;
	      f++;
	    });
        var u=Ext.get("userid").dom;
        var name=Ext.get("btnuUsers").dom;
        var userids=ids.toString();
        var usernames=names.toString();
        if(Ext.isEmpty(u.value) && Ext.isEmpty(name.value))
        {
           u.value =  userids;
           name.value = usernames;
        }else
        {
	        u.value+=(Ext.isEmpty(userids) ? "":",")+ userids;
	        name.value+=(Ext.isEmpty(usernames) ? "":",")+usernames;
        }
    }
}
mymessageSendBox.clearBtnuUsers = function()
{
   Ext.fly("userid").dom.value="";
   Ext.fly("btnuUsers").dom.value="";
}
