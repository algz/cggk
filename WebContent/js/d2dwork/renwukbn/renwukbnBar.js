
var renwukbnBar = {showalltbar:null,selectbbar:null,allBtn:null,abtn:null,bbtn:null,cbtn:null,dbtn:null,ebtn:null,fbtn:null,gbtn:null,leixingming:null};

renwukbnBar.getbar = function(response){
	renwukbnBar.sign = response;
	renwukbnBar.allBtn = new Ext.Button({
				enableToggle:true,
		  		toggleGroup:'ztai',
				text:getResource('resourceParam6070') // 你有
					 +'<font  color="#0AA0A0">('+renwukbnBar.sign.ztaiall+')</font>'+getResource('resourceParam455')
					 +getResource('resourceParam6071')+renwukbnBar.leixingming, // 可监控的
				width:300,
				handler: function(is){
				    			renwukbnMain.ztai = null;
				    			renwukbnMain.isload = true;
//				    				if(is.text.substring(is.text.indexOf("(")+1,is.text.indexOf(")")) == "0"){
//			    						return null;
//			    					}
				    				//个人接收
							if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel1"){
								var leixing = renwukbnMain.combo1.value;
								if(leixing== ""+getResource('resourceParam1114')+""){
									leixing = -1;
								}
								renwukbnMain.baseargsfz = {
									role:'fuze',
									fanwei:'man',
									taskstatusid:renwukbnMain.ztai,
									taskcategoryid:leixing,
									plannedstartstr:null,
									plannedendstr:null,
									taskname:null
								}; 
								myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
							//个人派发	
							}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel2"){
								var leixing = renwukbnMain.combo2.value;
									if(leixing== ""+getResource('resourceParam1114')+""){
										leixing = -1;
									}
									renwukbnMain.baseargsfz = {
										role:'zhuanfa',
										fanwei:'man',
										taskstatusid:renwukbnMain.ztai,
										taskcategoryid:leixing,
										plannedstartstr:null,
										plannedendstr:null,
										taskname:null
									};		
								myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);
								//团队接收
						   }else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel3"){
								var leixing = renwukbnMain.combo1.value;
								if(leixing== ""+getResource('resourceParam1114')+""){
									leixing = -1;
								}
								renwukbnMain.baseargsfz = {
									role:'fuze',
									fanwei:'dep',
									taskstatusid:renwukbnMain.ztai,
									taskcategoryid:leixing,
									plannedstartstr:null,
									plannedendstr:null,
									taskname:null
								};	
								myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
							//团队派发	
							}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel4"){
								
								var leixing = renwukbnMain.combo2.value;
									if(leixing== ""+getResource('resourceParam1114')+""){
										leixing = -1;
									}
									renwukbnMain.baseargsfz = {
										role:'zhuanfa',
										fanwei:'dep',
										taskstatusid:renwukbnMain.ztai,
										taskcategoryid:leixing,
										plannedstartstr:null,
										plannedendstr:null,
										taskname:null
									};	
								myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);
								 
							}
								 
				    	}
			});	
	renwukbnBar.allBtn.sl = renwukbnBar.sign.ztaiall;

	renwukbnBar.selectbbar = new Ext.Toolbar();
	tlework.addHtml(tlework.divHtml,'bar');	
	renwukbnBar.selectbbar.render('bar');
	
	renwukbnBar.html1='<a style="cursor: hand" onclick="renwukbnBar.allclick('+renwukbnBar.sign.ztaiall
					 +')"><font id="allBar">'+getResource('resourceParam6070')+'<font  color="#0AA0A0">('+renwukbnBar.sign.ztaiall+')</font>' // 你有
					 +getResource('resourceParam455')+getResource('resourceParam6071')+renwukbnBar.leixingming+"</font></a>"; // 可监控的
	
	//总数点击
	renwukbnBar.allclick = function(num){
			renwukbnMain.ztai = null;
    		renwukbnMain.isload = true;
//			if(num== "0" || num == 0){
//				return null;
//			}
		    for(var i=0;i<renwukbnBar.sign.ztaiName.length;i++){
				var rtemp = "renwukbnBar"+i;
				document.getElementById(rtemp).color="black"; 
			}
			document.getElementById("allBar").color="blue"; 
    		//个人接收
			if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel1"){
				var leixing = renwukbnMain.combo1.value;
				if(leixing== ""+getResource('resourceParam1114')+""){
					leixing = -1;
				}
				renwukbnMain.baseargsfz = {
					role:'fuze',
					fanwei:'man',
					taskstatusid:renwukbnMain.ztai,
					taskcategoryid:leixing,
					plannedstartstr:null,
					plannedendstr:null,
					taskname:null
				}; 
			 	var cm = renwukbnMain.renwukbngrid1.getColumnModel();
				cm.setHidden(12,true);
				//隐藏接受按钮
		   		document.getElementById("jieshou").style.display='none';
				myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
			//个人派发	
			}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel2"){
				 
				var leixing = renwukbnMain.combo2.value;
					if(leixing== ""+getResource('resourceParam1114')+""){
						leixing = -1;
					}
					renwukbnMain.baseargsfz = {
						role:'zhuanfa',
						fanwei:'man',
						taskstatusid:renwukbnMain.ztai,
						taskcategoryid:leixing,
						plannedstartstr:null,
						plannedendstr:null,
						taskname:null
					};
//				var cm = renwukbnMain.renwukbngrid2.getColumnModel();
//				cm.setHidden(12,true);
				myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);
				//团队接收
		   }else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel3"){
				var leixing = renwukbnMain.combo1.value;
				if(leixing== ""+getResource('resourceParam1114')+""){
					leixing = -1;
				}
				renwukbnMain.baseargsfz = {
					role:'fuze',
					fanwei:'dep',
					taskstatusid:renwukbnMain.ztai,
					taskcategoryid:leixing,
					plannedstartstr:null,
					plannedendstr:null,
					taskname:null
				};
//				var cm = renwukbnMain.renwukbngrid1.getColumnModel();
//				cm.setHidden(13,true);
				myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
			//团队派发	
			}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel4"){
				
				var leixing = renwukbnMain.combo2.value;
					if(leixing== ""+getResource('resourceParam1114')+""){
						leixing = -1;
					}
					renwukbnMain.baseargsfz = {
						role:'zhuanfa',
						fanwei:'dep',
						taskstatusid:renwukbnMain.ztai,
						taskcategoryid:leixing,
						plannedstartstr:null,
						plannedendstr:null,
						taskname:null
					};	
//				var cm = renwukbnMain.renwukbngrid2.getColumnModel();
//				cm.setHidden(13,true);
				myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);
				 
			}
	}
	
	renwukbnBar.selectbbar.add(
			'-',
			///renwukbnBar.allBtn,
			renwukbnBar.html1,
		  	'-'
		  	);
	
	for(var i=0;i<renwukbnBar.sign.ztaiName.length;i++){
		renwukbnBar.bBtn = new Ext.Button({
			  		enableToggle:true,
			  		toggleGroup:'ztai',
			  		id:renwukbnBar.sign.ztaiId[i],
			        text:renwukbnBar.sign.ztaiName[i] + '<font  color="#2AA0A0">('+renwukbnBar.sign.ztaiNum[i]+')</font>',
			        handler: function(is){
			    	}
			        
			  	});
		renwukbnBar.bhtml = '<a  style="cursor: hand" onclick="renwukbnBar.lxclick('+renwukbnBar.sign.ztaiId[i]+','+renwukbnBar.sign.ztaiNum[i]+','+i+')">'
		+'<font id = "renwukbnBar'+i+'">'+renwukbnBar.sign.ztaiName[i] + '</font><font  color="#2AA0A0">('+renwukbnBar.sign.ztaiNum[i]+')</font></a>';
		//alert(renwukbnBar.bhtml);
		renwukbnBar.bBtn.sl = renwukbnBar.sign.ztaiNum[i];
		
		//renwukbnBar.selectbbar.add(renwukbnBar.bBtn);
		renwukbnBar.selectbbar.add(renwukbnBar.bhtml);
		renwukbnBar.selectbbar.add('-');
	}
	renwukbnBar.selectbbar.setHeight(25);
	
	if(renwukbnMain.ztai == undefined || renwukbnMain.ztai == null){
	 	document.getElementById("allBar").color="blue"; 
	}
	if(renwukbnMain.ztai==2){
		document.getElementById("renwukbnBar0").color="blue"; 
	}
	if(renwukbnMain.ztai==4){
		document.getElementById("renwukbnBar1").color="blue";
	}
	if(renwukbnMain.ztai==5){
		document.getElementById("renwukbnBar2").color="blue";
	}
	if(renwukbnMain.ztai==6){
		document.getElementById("renwukbnBar3").color="blue";
	}
	if(renwukbnMain.ztai==7){
		document.getElementById("renwukbnBar4").color="blue";
	}
	renwukbnBar.lxclick = function(num,count,all){
		renwukbnMain.ztai = num;
		renwukbnMain.isload = true;
//		if(count == "0" || count ==0){
//			return null;
//		}
		//如果状态为未接收
		if(num==2){
			//alert(all);
		}
		for(var i=0;i<renwukbnBar.sign.ztaiName.length;i++){
			var rtemp = "renwukbnBar"+i;
			document.getElementById(rtemp).color="black"; 
		}
		document.getElementById("allBar").color="black"; 
		var rrtemp ="renwukbnBar"+all; 
		document.getElementById(rrtemp).color="blue"; 
		//个人接收
		if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel1"){
			var leixing = renwukbnMain.combo1.value;
			if(leixing== ""+getResource('resourceParam1114')+""){
				leixing = -1;
			}
			renwukbnMain.baseargsfz = {
				role:'fuze',
				fanwei:'man',
				taskstatusid:renwukbnMain.ztai,
				taskcategoryid:leixing,
				plannedstartstr:null,
				plannedendstr:null,
				taskname:null			
				}; 
			//如果状态为未接收
			if(num==2){
				var cm = renwukbnMain.renwukbngrid1.getColumnModel();
		 		cm.setHidden(12,false);
		 		//接受按钮
				document.getElementById("jieshou").style.display=''; 		
			} else {
				var cm = renwukbnMain.renwukbngrid1.getColumnModel();
				cm.setHidden(12,true);
				//隐藏接受按钮
				document.getElementById("jieshou").style.display='none';
			}
			myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
		//个人派发	
		}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel2"){
			var leixing = renwukbnMain.combo2.value;
				if(leixing== ""+getResource('resourceParam1114')+""){
					leixing = -1;
				}
				renwukbnMain.baseargsfz = {
					role:'zhuanfa',
					fanwei:'man',
					taskstatusid:renwukbnMain.ztai,
					taskcategoryid:leixing,
					plannedstartstr:null,
					plannedendstr:null,
					taskname:null
				};
//			var cm = renwukbnMain.renwukbngrid2.getColumnModel();
//			cm.setHidden(11,true);
			myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);
			//团队接收
	   }else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel3"){
			var leixing = renwukbnMain.combo1.value;
			if(leixing== ""+getResource('resourceParam1114')+""){
				leixing = -1;
			}
			renwukbnMain.baseargsfz = {
				role:'fuze',
				fanwei:'dep',
				taskstatusid:renwukbnMain.ztai,
				taskcategoryid:leixing,
				plannedstartstr:null,
				plannedendstr:null,
				taskname:null
			};
//			if(num==2){
//				var cm = renwukbnMain.renwukbngrid1.getColumnModel();
//		 		cm.setHidden(13,true);
//			} else {
//				var cm = renwukbnMain.renwukbngrid1.getColumnModel();
//				cm.setHidden(13,true);
//			}
			myGrid.loadvalue(renwukbnMain.renwukbngrid1.store,renwukbnMain.args,renwukbnMain.baseargsfz);
		//团队派发	
		}else if(renwukbnMain.tabPanel.getActiveTab().id=="tabpanel4"){	
			var leixing = renwukbnMain.combo2.value;
				if(leixing== ""+getResource('resourceParam1114')+""){
					leixing = -1;
				}
				renwukbnMain.baseargsfz = {
					role:'zhuanfa',
					fanwei:'dep',
					taskstatusid:renwukbnMain.ztai,
					taskcategoryid:leixing,
					plannedstartstr:null,
					plannedendstr:null,
					taskname:null
				};
//			var cm = renwukbnMain.renwukbngrid2.getColumnModel();
//				cm.setHidden(13,true);
			myGrid.loadvalue(renwukbnMain.renwukbngrid2.store,renwukbnMain.args,renwukbnMain.baseargsfz);	 
		}
	}
}
