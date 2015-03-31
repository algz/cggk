
function _handleInfoObj(fieldsetObj,title,smessage){
	var message='';
	for(var i =0;i<smessage.length;i++){
			message=message+'<br>'+smessage[i].content;
	}
	fieldsetObj.title=title;
	fieldsetObj.xtype='fieldset';
	fieldsetObj.autoWidth=true;
	fieldsetObj.autoHeight=true;
	fieldsetObj.html=message;
}


function parseMsgInfo(datas,obj,submitflag,formObj){
				var wfieldset = new Array();
				var count =0 ;
				//解析 error信息
				//alert(Ext.decode(datas));
				if(Ext.decode(datas).root.msg.Error){
					wfieldset[count]=new Object();
					//_handleInfoObj(wfieldset[count],''+getResource("20111205_param_3841")/* 错误信息 */+'',Ext.decode(datas).root.msg.Error);
					_handleInfoObj(wfieldset[count],'错误信息',Ext.decode(datas).root.msg.Error);
					count++;
				}
				
				//解析 warn信息
				if(Ext.decode(datas).root.msg.Warn){
					wfieldset[count]=new Object();
					//_handleInfoObj(wfieldset[count],''+getResource("20111205_param_3842")/* 警告信息 */+'',Ext.decode(datas).root.msg.Warn);
					_handleInfoObj(wfieldset[count],'警告信息',Ext.decode(datas).root.msg.Warn);
					count++;
				}
				
				//解析 normal信息
				if(Ext.decode(datas).root.msg.Info){	
				    wfieldset[count]=new Object();
					//_handleInfoObj(wfieldset[count],''+getResource("20111205_param_3843")/* 提示信息 */+'',Ext.decode(datas).root.msg.Info);
				    _handleInfoObj(wfieldset[count],'提示信息',Ext.decode(datas).root.msg.Info);
				    count++;
				}
				
				
				var arywbutton ;
				//如果是警告或者正常信息调用回调函数
				var sflag = Ext.decode(datas).flag;
				if( sflag =='Error' ){
					 arywbutton = [{
			           //text: ''+getResource("20111205_param_3844")/* 关闭 */+'',
					   text: '关闭',
					   type:'button',
			           handler: function()
			           {
			           		awindow.close();
			           }
				      }];
				}
				
				if( sflag =='Warn' ){
					arywbutton = [{
				           //text: ''+getResource("20111205_param_3845")/* 继续 */+'',
						   text: '继续',
				           type:'button',
				           handler: function()
				           {
				           		obj.params.ignoreWarn = true;
				           		
				           		if(submitflag =='RSubmit'){
				           			HITBAjax.request(obj);
				           		}
				           		
				           		if(submitflag =='FSubmit'){
				           			//alert(Ext.encode(obj));
				           			//alert(formObj.id);
				           			//var bf=new Ext.form.BasicForm(formObj.id,formObj);
				           			//bf.submit(obj);
				           			 Ext.getCmp(formObj.id).getForm().submit(obj);
													           			
				           		}
				           		//obj.successCallBack=null;
				           		awindow.close();
				           }
				       }
				       ,{
				           //text: ''+getResource("20111205_param_3846")/* 取消 */+'',
				    	   text: '取消',
				           type:'button',
				           handler: function()
				           {
				           		obj.successCallBack=null;
				           		awindow.close();
				           }
				       }
				       ];
								
				}
				
				if( sflag =='Info' ){
						
					arywbutton = [{
			           //text: ''+getResource("20111205_param_3847")/* 确定 */+'',
					   text: '确定',
			           type:'button',
			           id:'login',
			           handler: function()
			           { 
			           		 
			           		awindow.close();
			           }
				     }];		
				}
				
				var msgCount = Ext.decode(datas).msgCount;
				
				var countHeight = msgCount*30;
				
				var winHeight = 0;
				
				if(countHeight<200){
					winHeight=200;
				}else{
					if(countHeight>500){
						winHeight=500;
					}else{
						winHeight=countHeight;
					}
				}
				
				
				//建立显示window
				var awindow = new Ext.Window({
						title: '提示',
						width: 500,
						height:winHeight,
						layout: 'fit',
						plain:true,
						modal	:true,
						autoScroll : true,
						bodyStyle:'padding:5px;',
						resizable:false,
						items: wfieldset,
						buttons: arywbutton
				});
				
				
				var datastatus = Ext.getCmp('data-status');
				awindow.show(); 
				
				
				
				//隐藏MessageBox，进度条
				Ext.MessageBox.hide();
}
