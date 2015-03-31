Ext.BLANK_IMAGE_URL = '../../lib/ext/resources/images/default/s.gif';
var mynewsOutboxDetails = {
	issueDialog : null,
    fileids : ''
}
mynewsOutboxDetails.init = function(messageid) {
	var appVo = Seam.Remoting
			.createType("com.luck.itumserv.message.messagereceive.MessageInBoxNewsVo");
	appVo.setMessageid(messageid);
	Seam.Component.getInstance("messageuser_MessageUserRemote")
			.getMessageInBoxNews(appVo, function(reslut) {
				var title = new Ext.form.TextField({
								fieldLabel : ''
										+ getResource('resourceParam504') + '', // 文本框
								name : 'messagetitle',
								anchor : '95%',
								disabled : true,
								value : reslut.messagetitle
							});
                 var flag=reslut.publishmode == 5 ?true:false;
				mynewsOutboxDetails.form = new Ext.FormPanel({
					labelWidth : 60, // label settings here cascade unless
					// overridden
					frame : false,
					fileUpload : true,
					autoScroll : true,
					plain : false,
					bodyStyle : 'padding:5px 5px 0;background:transparent;',
					defaultType : 'textfield',
					items : [title, 
			                {
			                    xtype : 'panel',
			                    bodyStyle : 'padding:0px 0px 5px 0px;background:transparent;border:0',
			                    html :(flag ?'<table id="tablefile"><tr><td valign=top><font size="2">'
			                          + getResource('resourceParam1408')
			                          + '：</font>'
			                          + '&nbsp;'+(Ext.isIE ? '&nbsp;&nbsp;': '' )+'<td><input class="x-form-text x-form-field" type="text" readOnly="true" id="btnuOutUsers" name="btnuOutUsers" size="60" value="'+reslut.truename+'"/></td><td>'
			                          + '<input id="userids" name="userids" type="hidden" value="'+reslut.userid+'"/></td></td><td valign=top><input type="button" id="btnuaOutUsers" name="btnuaOutUsers" value="'
			                          + getResource('resourceParam9155')
			                          + '" onclick="mynewsOutboxDetails.ininSelectUser();" />&nbsp;&nbsp;<input type="button" value="'+getResource('resourceParam557')+'" onclick="mynewsOutboxDetails.clearBtnuUsers();" /> </td></tr></table>':'')
			                 }, {
                                fieldLabel : ''
                                        + getResource('resourceParam1408') + '', // 文本框
                                name : 'usernames',
                                anchor : '95%',
                                disabled : true,
                                hidden:flag,
                                hideLabel:flag,
                                value : reslut.truename
                            }
							, {
								fieldLabel : ''
										+ getResource('resourceParam1120') + '', // 文本框
								name : 'messagedate',
								anchor : '95%',
								disabled : true,
                                hidden:true,
                                hideLabel:true,
								value : reslut.messagedate
							}, {
								fieldLabel : getResource('resourceParam5021'),
								xtype : 'textarea',
								enableColors : false,
								enableAlignments : false,
                                height:200,
								name : 'messagebody',
								value : reslut.messagebody,
//                                disabled:reslut.publishmode == 5 ? false : true,
								anchor : '95%'
							}, {
								xtype : 'panel',
								bodyStyle : 'padding:0px 0px 0;background:transparent;border:0',
								html : '<div id="filediv"><font size="2">'
                                        + getResource('resourceParam604')
                                        + '：</font>'
										+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
										+ reslut.filenames
                                        + "&nbsp;&nbsp;"
                                        +(flag ?"<input style='vertical-align:middle;margin-top:0px' type='button' onclick='deleteCheckboxFile()' value='"+getResource('resourceParam475')+"' /><br>"
                                        +'<table id="outtablefile"><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;'
				                          + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td valign=top><input type="button" id="outbtnAddFile" name="outbtnAddFile" value="'
				                          + getResource('resourceParam647')
				                          + '" onclick="outaddFile()" /></td><td><table id="outtableFiles"></table></td><td>'
				                          + '</td></tr></table>':'')
                                          + '</div>'
							}, {
//								id : 'messageida',
								name : 'messageid',
								value : messageid,
								hidden : true
							}, {
								name : 'messagereceiverid',
								value : reslut.messagereceiverid,
								hidden : true
							}, {
								name : 'sendmode',
								value : 'update',
								hidden : true
							},{
                                name : 'delfileids',
                                hidden : true
                            }]
				});
				if (reslut.publishmode == 5) {
					title.enable();
					mynewsOutboxDetails.form.addButton({
						text : getResource('resourceParam5019'),
						handler : function() {
                      
                           var s=mynewsOutboxDetails.form.getForm().findField("messagebody").getValue();
			                if(s.length>500)
			                {
			                   Ext.Msg.alert(getResource('resourceParam508'),getResource("resourceParam1401"));
			                   return;
			                }
//							if(!Ext.isNumber(departmentUser.userComb.getValue())){
//								departmentUser.userComb.setValue(reslut.userid);
//							}
                            mynewsOutboxDetails.form.getForm().findField("delfileids").setValue(mynewsOutboxDetails.fileids);
							mynewsOutboxDetails.form.getForm().submit({
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
										msg : ''
												+ getResource('resourceParam1402')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO,
										fn : function() {
                                        myGrid.loadvalue(mymessageMain.outboxgrid.store, {
					                            start : 0,
					                            limit : 25
					                        }, mymessageMain.baseargs);
                                            mynewsOutboxDetails.fileids = '';
											mynewsOutboxDetails.issueDialog
													.close();
                                                    
										}
									});
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam587')
												+ '',
										msg : ''
												+ getResource('resourceParam1403')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
                           mynewsOutboxDetails.fileids = '';
						}
                    
					});
				}else
                {
                   mynewsOutboxDetails.form.addButton({
                        text : getResource('resourceParam506'),
                        handler : function() {
                            mynewsOutboxDetails.issueDialog.hide();
                        }
                   });
                }
				tlework.addHtml(tlework.divHtml, 'mynewsOutboxDetails1'); // 动态生成需要绑定的div
				mynewsOutboxDetails.issueDialog = new Ext.Window({ // 创建对话框
					el : 'mynewsOutboxDetails1',
					title : '' + getResource('resourceParam857') + '',
					modal : true,
					layout : 'fit',
					width : 700,
					height : 430,
//                    autoHeight : true,
					closeAction : 'hide',
					plain : false,
					items : [mynewsOutboxDetails.form]
						// 将面板绑定到对话框
				});
				mynewsOutboxDetails.issueDialog.show();
                mynewsOutboxDetails.fileids = '';
			});
}

function outaddFile() {
    var Rows = document.getElementById("outtableFiles").rows;// 类似数组的Rows
    if(Rows.length>4)
    {
       Ext.Msg.alert(getResource("resourceParam508"),getResource("resourceParam9153"));
       return;
    }
    var newRow = document.getElementById("outtableFiles").insertRow(document
            .getElementById("outtableFiles").rows.length);// 插入新的一行
    newRow.id = "tr"+(Rows.length-1);
    var Cells = newRow.cells;// 类似数组的Cells

    var len=Rows.length-1;
    var newCell = Rows[newRow.rowIndex].insertCell(Cells.length);
    newCell.align = "center";
    newCell.innerHTML = "<input type='file' name='messagefile"
            + len + "' value='' contenteditable='false'/>";
    Cells=newRow.cells;
    newCell = Rows[newRow.rowIndex].insertCell(Cells.length);
    newCell.innerHTML = '<input type="button" id="outbtnAddFile'+len+'" name="outbtnAddFile" value="'
                          + getResource('resourceParam475')
                          + '" onclick="delFile('+len+')" />';
    
}

// 删除上传组件
function delFile() {
    if (document.getElementById("outtableFiles").rows.length > 0) {
        document.getElementById("outtableFiles").deleteRow(document
                .getElementById("outtableFiles").rows.length
                - 1);
    }
}
//删除指定的TR行
function delFile(len) {
    var tr=document.getElementById("tr"+len);
    tr.parentNode.removeChild(tr);
}

function deleteOtherFiles() {
    var a=document.getElementById("outtableFiles");
    var b=a.rows.length;
    while (b > 0) {
        a.deleteRow(b - 1);
    }
}
function deleteCheckboxFile()
{
   var str='';
   var fileElement=document.getElementById("filediv");
   var filediv=fileElement.childNodes;
   for(var i =0;i<filediv.length;i++)
   {
       var s=filediv[i].id;
       if(s!=null && s!=undefined && s.length>0 && s != "outtablefile")
       {
           var m=document.getElementById(s);
           var n=m.childNodes;
           for(var k=0;k<n.length;k++)
           {
              if(n[k].checked != undefined)
              {
                  if(n[k].checked == true)
                  {
                    mynewsOutboxDetails.fileids += n[k].name+",";
                    m.innerHTML='';
                  }
              }
              delete n;
              delete m;
           }
        delete s;
       }
   }
   delete filediv;
   delete fileEllement;
}
mynewsOutboxDetails.ininSelectUser = function()
{
    userMultiselect.init(mynewsOutboxDetails.ininCallBack,Ext.fly("userids").dom.value,"truename");
}

mynewsOutboxDetails.ininCallBack = function()
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
        var u=Ext.get("userids").dom;
        var name=Ext.get("btnuOutUsers").dom;
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

mynewsOutboxDetails.clearBtnuUsers = function()
{
   Ext.fly("userids").dom.value="";
   Ext.fly("btnuOutUsers").dom.value="";
}
